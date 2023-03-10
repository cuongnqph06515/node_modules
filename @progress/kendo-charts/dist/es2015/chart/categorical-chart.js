import ErrorRangeCalculator from './error-bars/error-range-calculator';
import CategoricalErrorBar from './error-bars/categorical-error-bar';

import SeriesBinder from './series-binder';
import { ERROR_LOW_FIELD, ERROR_HIGH_FIELD } from './constants';

import evalOptions from './utils/eval-options';
import categoriesCount from './utils/categories-count';

import { ChartElement, Box } from '../core';

import { VALUE, STRING, MIN_VALUE, MAX_VALUE } from '../common/constants';
import { convertableToNumber, deepExtend, defined, isNumber, last, setDefaultOptions, sparseArrayLimits } from '../common';

class CategoricalChart extends ChartElement {
    constructor(plotArea, options) {
        super(options);

        this.plotArea = plotArea;
        this.chartService = plotArea.chartService;
        this.categoryAxis = plotArea.seriesCategoryAxis(options.series[0]);

        // Value axis ranges grouped by axis name, e.g.:
        // primary: { min: 0, max: 1 }
        this.valueAxisRanges = {};

        this.points = [];
        this.categoryPoints = [];
        this.seriesPoints = [];
        this.seriesOptions = [];
        this._evalSeries = [];

        this.render();
    }

    render() {
        this.traverseDataPoints(this.addValue.bind(this));
    }

    pointOptions(series, seriesIx) {
        let options = this.seriesOptions[seriesIx];
        if (!options) {
            const defaults = this.pointType().prototype.defaults;
            this.seriesOptions[seriesIx] = options = deepExtend({ }, defaults, {
                vertical: !this.options.invertAxes
            }, series);
        }

        return options;
    }

    plotValue(point) {
        if (!point) {
            return 0;
        }

        if (this.options.isStacked100 && isNumber(point.value)) {
            const categoryIx = point.categoryIx;
            const categoryPoints = this.categoryPoints[categoryIx];
            const otherValues = [];
            let categorySum = 0;

            for (let i = 0; i < categoryPoints.length; i++) {
                const other = categoryPoints[i];
                if (other) {
                    const stack = point.series.stack;
                    const otherStack = other.series.stack;

                    if ((stack && otherStack) && stack.group !== otherStack.group) {
                        continue;
                    }

                    if (isNumber(other.value)) {
                        categorySum += Math.abs(other.value);
                        otherValues.push(Math.abs(other.value));
                    }
                }
            }

            if (categorySum > 0) {
                return point.value / categorySum;
            }
        }

        return point.value;
    }

    plotRange(point, startValue = 0) {
        const categoryPoints = this.categoryPoints[point.categoryIx];

        if (this.options.isStacked) {
            let plotValue = this.plotValue(point);
            const positive = plotValue >= 0;
            let prevValue = startValue;
            let isStackedBar = false;

            for (let i = 0; i < categoryPoints.length; i++) {
                const other = categoryPoints[i];

                if (point === other) {
                    break;
                }

                const stack = point.series.stack;
                const otherStack = other.series.stack;
                if (stack && otherStack) {
                    if (typeof stack === STRING && stack !== otherStack) {
                        continue;
                    }

                    if (stack.group && stack.group !== otherStack.group) {
                        continue;
                    }
                }

                const otherValue = this.plotValue(other);
                if ((otherValue >= 0 && positive) ||
                    (otherValue < 0 && !positive)) {
                    prevValue += otherValue;
                    plotValue += otherValue;
                    isStackedBar = true;

                    if (this.options.isStacked100) {
                        plotValue = Math.min(plotValue, 1);
                    }
                }
            }

            if (isStackedBar) {
                prevValue -= startValue;
            }

            return [ prevValue, plotValue ];
        }

        const series = point.series;
        const valueAxis = this.seriesValueAxis(series);
        const axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);

        return [ axisCrossingValue, convertableToNumber(point.value) ? point.value : axisCrossingValue ];
    }

    stackLimits(axisName, stackName) {
        let min = MAX_VALUE;
        let max = MIN_VALUE;

        for (let i = 0; i < this.categoryPoints.length; i++) {
            const categoryPoints = this.categoryPoints[i];
            if (!categoryPoints) {
                continue;
            }

            for (let pIx = 0; pIx < categoryPoints.length; pIx++) {
                const point = categoryPoints[pIx];
                if (point) {
                    if (point.series.stack === stackName || point.series.axis === axisName) {
                        const to = this.plotRange(point, 0)[1];
                        if (defined(to) && isFinite(to)) {
                            max = Math.max(max, to);
                            min = Math.min(min, to);
                        }
                    }
                }
            }
        }

        return { min: min, max: max };
    }

    updateStackRange() {
        const { isStacked, series: chartSeries } = this.options;
        const limitsCache = {};

        if (isStacked) {
            for (let i = 0; i < chartSeries.length; i++) {
                const series = chartSeries[i];
                const axisName = series.axis;
                const key = axisName + series.stack;

                let limits = limitsCache[key];
                if (!limits) {
                    limits = this.stackLimits(axisName, series.stack);

                    const errorTotals = this.errorTotals;
                    if (errorTotals) {
                        if (errorTotals.negative.length) {
                            limits.min = Math.min(limits.min, sparseArrayLimits(errorTotals.negative).min);
                        }
                        if (errorTotals.positive.length) {
                            limits.max = Math.max(limits.max, sparseArrayLimits(errorTotals.positive).max);
                        }
                    }

                    if (limits.min !== MAX_VALUE || limits.max !== MIN_VALUE) {
                        limitsCache[key] = limits;
                    } else {
                        limits = null;
                    }
                }

                if (limits) {
                    this.valueAxisRanges[axisName] = limits;
                }
            }
        }
    }

    addErrorBar(point, data, categoryIx) {
        const { value, series, seriesIx } = point;
        const errorBars = point.options.errorBars;
        const lowValue = data.fields[ERROR_LOW_FIELD];
        const highValue = data.fields[ERROR_HIGH_FIELD];
        let errorRange;

        if (isNumber(lowValue) && isNumber(highValue)) {
            errorRange = { low: lowValue, high: highValue };
        } else if (errorBars && defined(errorBars.value)) {
            this.seriesErrorRanges = this.seriesErrorRanges || [];
            this.seriesErrorRanges[seriesIx] = this.seriesErrorRanges[seriesIx] ||
                new ErrorRangeCalculator(errorBars.value, series, VALUE);

            errorRange = this.seriesErrorRanges[seriesIx].getErrorRange(value, errorBars.value);
        }

        if (errorRange) {
            point.low = errorRange.low;
            point.high = errorRange.high;
            this.addPointErrorBar(point, categoryIx);
        }
    }

    addPointErrorBar(point, categoryIx) {
        const isVertical = !this.options.invertAxes;
        const options = point.options.errorBars;
        let { series, low, high } = point;

        if (this.options.isStacked) {
            const stackedErrorRange = this.stackedErrorRange(point, categoryIx);
            low = stackedErrorRange.low;
            high = stackedErrorRange.high;
        } else {
            const fields = { categoryIx: categoryIx, series: series };
            this.updateRange({ value: low }, fields);
            this.updateRange({ value: high }, fields);
        }

        const errorBar = new CategoricalErrorBar(low, high, isVertical, this, series, options);
        point.errorBars = [ errorBar ];
        point.append(errorBar);
    }

    stackedErrorRange(point, categoryIx) {
        const plotValue = this.plotRange(point, 0)[1] - point.value;
        const low = point.low + plotValue;
        const high = point.high + plotValue;

        this.errorTotals = this.errorTotals || { positive: [], negative: [] };

        if (low < 0) {
            this.errorTotals.negative[categoryIx] = Math.min(this.errorTotals.negative[categoryIx] || 0, low);
        }

        if (high > 0) {
            this.errorTotals.positive[categoryIx] = Math.max(this.errorTotals.positive[categoryIx] || 0, high);
        }

        return { low: low, high: high };
    }

    addValue(data, fields) {
        const { categoryIx, series, seriesIx } = fields;

        let categoryPoints = this.categoryPoints[categoryIx];
        if (!categoryPoints) {
            this.categoryPoints[categoryIx] = categoryPoints = [];
        }

        let seriesPoints = this.seriesPoints[seriesIx];
        if (!seriesPoints) {
            this.seriesPoints[seriesIx] = seriesPoints = [];
        }

        const point = this.createPoint(data, fields);
        if (point) {
            Object.assign(point, fields);

            point.owner = this;
            point.noteText = data.fields.noteText;
            if (!defined(point.dataItem)) {
                point.dataItem = series.data[categoryIx];
            }
            this.addErrorBar(point, data, categoryIx);
        }

        this.points.push(point);
        seriesPoints.push(point);
        categoryPoints.push(point);

        this.updateRange(data.valueFields, fields);
    }

    evalPointOptions(options, value, category, categoryIx, series, seriesIx) {
        const state = { defaults: series._defaults, excluded: [ "data", "aggregate", "_events", "tooltip", "content", "template", "visual", "toggle", "_outOfRangeMinPoint", "_outOfRangeMaxPoint" ] };

        let doEval = this._evalSeries[seriesIx];
        if (!defined(doEval)) {
            this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
        }

        let pointOptions = options;
        if (doEval) {
            pointOptions = deepExtend({}, pointOptions);
            evalOptions(pointOptions, {
                value: value,
                category: category,
                index: categoryIx,
                series: series,
                dataItem: series.data[categoryIx]
            }, state);
        }

        return pointOptions;
    }

    updateRange(data, fields) {
        const axisName = fields.series.axis;
        const value = data.value;
        let axisRange = this.valueAxisRanges[axisName];

        if (isFinite(value) && value !== null) {
            axisRange = this.valueAxisRanges[axisName] =
                axisRange || { min: MAX_VALUE, max: MIN_VALUE };

            axisRange.min = Math.min(axisRange.min, value);
            axisRange.max = Math.max(axisRange.max, value);
        }
    }

    seriesValueAxis(series) {
        const plotArea = this.plotArea;
        const axisName = series.axis;
        const axis = axisName ? plotArea.namedValueAxes[axisName] : plotArea.valueAxis;

        if (!axis) {
            throw new Error("Unable to locate value axis with name " + axisName);
        }

        return axis;
    }

    reflow(targetBox) {
        const categorySlots = this.categorySlots = [];
        const chartPoints = this.points;
        const categoryAxis = this.categoryAxis;
        let pointIx = 0;

        this.traverseDataPoints((data, fields) => {
            const { categoryIx, series: currentSeries } = fields;

            const valueAxis = this.seriesValueAxis(currentSeries);
            const point = chartPoints[pointIx++];

            let categorySlot = categorySlots[categoryIx];
            if (!categorySlot) {
                categorySlots[categoryIx] = categorySlot =
                    this.categorySlot(categoryAxis, categoryIx, valueAxis);
            }

            if (point) {
                const plotRange = this.plotRange(point, valueAxis.startValue());
                const valueSlot = this.valueSlot(valueAxis, plotRange);
                if (valueSlot) {
                    const pointSlot = this.pointSlot(categorySlot, valueSlot);

                    point.aboveAxis = this.aboveAxis(point, valueAxis);
                    point.stackValue = plotRange[1];

                    if (this.options.isStacked100) {
                        point.percentage = this.plotValue(point);
                    }

                    this.reflowPoint(point, pointSlot);
                } else {
                    point.visible = false;
                }
            }
        });

        this.reflowCategories(categorySlots);
        if (!this.options.clip && this.options.limitPoints && this.points.length) {
            this.limitPoints();
        }

        this.box = targetBox;
    }

    valueSlot(valueAxis, plotRange) {
        return valueAxis.getSlot(plotRange[0], plotRange[1], !this.options.clip);
    }

    limitPoints() {
        const categoryPoints = this.categoryPoints;
        const points = categoryPoints[0].concat(last(categoryPoints));
        for (let idx = 0; idx < points.length; idx++) {
            if (points[idx]) {
                this.limitPoint(points[idx]);
            }
        }
    }

    limitPoint(point) {
        const limittedSlot = this.categoryAxis.limitSlot(point.box);
        if (!limittedSlot.equals(point.box)) {
            point.reflow(limittedSlot);
        }
    }

    aboveAxis(point, valueAxis) {
        const axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
        const value = point.value;

        return valueAxis.options.reverse ?
            value < axisCrossingValue : value >= axisCrossingValue;
    }

    categoryAxisCrossingValue(valueAxis) {
        const categoryAxis = this.categoryAxis;
        const options = valueAxis.options;
        const crossingValues = [].concat(
            options.axisCrossingValues || options.axisCrossingValue
        );

        return crossingValues[categoryAxis.axisIndex || 0] || 0;
    }

    reflowPoint(point, pointSlot) {
        point.reflow(pointSlot);
    }

    reflowCategories() { }

    pointSlot(categorySlot, valueSlot) {
        const options = this.options;
        const invertAxes = options.invertAxes;
        const slotX = invertAxes ? valueSlot : categorySlot;
        const slotY = invertAxes ? categorySlot : valueSlot;

        return new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
    }

    categorySlot(categoryAxis, categoryIx) {
        return categoryAxis.getSlot(categoryIx);
    }

    traverseDataPoints(callback) {
        const series = this.options.series;
        const count = categoriesCount(series);
        const seriesCount = series.length;

        for (let seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            this._outOfRangeCallback(series[seriesIx], "_outOfRangeMinPoint", seriesIx, callback);
        }

        for (let categoryIx = 0; categoryIx < count; categoryIx++) {
            for (let seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                const currentSeries = series[seriesIx];
                const currentCategory = this.categoryAxis.categoryAt(categoryIx);
                const pointData = this._bindPoint(currentSeries, seriesIx, categoryIx);

                callback(pointData, {
                    category: currentCategory,
                    categoryIx: categoryIx,
                    series: currentSeries,
                    seriesIx: seriesIx
                });
            }
        }

        for (let seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            this._outOfRangeCallback(series[seriesIx], "_outOfRangeMaxPoint", seriesIx, callback);
        }
    }

    _outOfRangeCallback(series, field, seriesIx, callback) {
        const outOfRangePoint = series[field];
        if (outOfRangePoint) {
            const categoryIx = outOfRangePoint.categoryIx;
            const pointData = this._bindPoint(series, seriesIx, categoryIx, outOfRangePoint.item);

            callback(pointData, {
                category: outOfRangePoint.category,
                categoryIx: categoryIx,
                series: series,
                seriesIx: seriesIx,
                dataItem: outOfRangePoint.item
            });
        }
    }

    _bindPoint(series, seriesIx, categoryIx, item) {
        if (!this._bindCache) {
            this._bindCache = [];
        }

        let bindCache = this._bindCache[seriesIx];
        if (!bindCache) {
            bindCache = this._bindCache[seriesIx] = [];
        }

        let data = bindCache[categoryIx];
        if (!data) {
            data = bindCache[categoryIx] = SeriesBinder.current.bindPoint(series, categoryIx, item);
        }

        return data;
    }

    formatPointValue(point, format) {
        if (point.value === null) {
            return "";
        }

        return this.chartService.format.auto(format, point.value);
    }

    pointValue(data) {
        return data.valueFields.value;
    }
}

setDefaultOptions(CategoricalChart, {
    series: [],
    invertAxes: false,
    isStacked: false,
    clip: true,
    limitPoints: true
});

export default CategoricalChart;