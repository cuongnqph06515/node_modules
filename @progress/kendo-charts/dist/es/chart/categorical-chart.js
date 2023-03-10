import ErrorRangeCalculator from './error-bars/error-range-calculator';
import CategoricalErrorBar from './error-bars/categorical-error-bar';

import SeriesBinder from './series-binder';
import { ERROR_LOW_FIELD, ERROR_HIGH_FIELD } from './constants';

import evalOptions from './utils/eval-options';
import categoriesCount from './utils/categories-count';

import { ChartElement, Box } from '../core';

import { VALUE, STRING, MIN_VALUE, MAX_VALUE } from '../common/constants';
import { convertableToNumber, deepExtend, defined, isNumber, last, setDefaultOptions, sparseArrayLimits } from '../common';

var CategoricalChart = (function (ChartElement) {
    function CategoricalChart(plotArea, options) {
        ChartElement.call(this, options);

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

    if ( ChartElement ) CategoricalChart.__proto__ = ChartElement;
    CategoricalChart.prototype = Object.create( ChartElement && ChartElement.prototype );
    CategoricalChart.prototype.constructor = CategoricalChart;

    CategoricalChart.prototype.render = function render () {
        this.traverseDataPoints(this.addValue.bind(this));
    };

    CategoricalChart.prototype.pointOptions = function pointOptions (series, seriesIx) {
        var options = this.seriesOptions[seriesIx];
        if (!options) {
            var defaults = this.pointType().prototype.defaults;
            this.seriesOptions[seriesIx] = options = deepExtend({ }, defaults, {
                vertical: !this.options.invertAxes
            }, series);
        }

        return options;
    };

    CategoricalChart.prototype.plotValue = function plotValue (point) {
        if (!point) {
            return 0;
        }

        if (this.options.isStacked100 && isNumber(point.value)) {
            var categoryIx = point.categoryIx;
            var categoryPoints = this.categoryPoints[categoryIx];
            var otherValues = [];
            var categorySum = 0;

            for (var i = 0; i < categoryPoints.length; i++) {
                var other = categoryPoints[i];
                if (other) {
                    var stack = point.series.stack;
                    var otherStack = other.series.stack;

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
    };

    CategoricalChart.prototype.plotRange = function plotRange (point, startValue) {
        var this$1 = this;
        if ( startValue === void 0 ) startValue = 0;

        var categoryPoints = this.categoryPoints[point.categoryIx];

        if (this.options.isStacked) {
            var plotValue = this.plotValue(point);
            var positive = plotValue >= 0;
            var prevValue = startValue;
            var isStackedBar = false;

            for (var i = 0; i < categoryPoints.length; i++) {
                var other = categoryPoints[i];

                if (point === other) {
                    break;
                }

                var stack = point.series.stack;
                var otherStack = other.series.stack;
                if (stack && otherStack) {
                    if (typeof stack === STRING && stack !== otherStack) {
                        continue;
                    }

                    if (stack.group && stack.group !== otherStack.group) {
                        continue;
                    }
                }

                var otherValue = this$1.plotValue(other);
                if ((otherValue >= 0 && positive) ||
                    (otherValue < 0 && !positive)) {
                    prevValue += otherValue;
                    plotValue += otherValue;
                    isStackedBar = true;

                    if (this$1.options.isStacked100) {
                        plotValue = Math.min(plotValue, 1);
                    }
                }
            }

            if (isStackedBar) {
                prevValue -= startValue;
            }

            return [ prevValue, plotValue ];
        }

        var series = point.series;
        var valueAxis = this.seriesValueAxis(series);
        var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);

        return [ axisCrossingValue, convertableToNumber(point.value) ? point.value : axisCrossingValue ];
    };

    CategoricalChart.prototype.stackLimits = function stackLimits (axisName, stackName) {
        var this$1 = this;

        var min = MAX_VALUE;
        var max = MIN_VALUE;

        for (var i = 0; i < this.categoryPoints.length; i++) {
            var categoryPoints = this$1.categoryPoints[i];
            if (!categoryPoints) {
                continue;
            }

            for (var pIx = 0; pIx < categoryPoints.length; pIx++) {
                var point = categoryPoints[pIx];
                if (point) {
                    if (point.series.stack === stackName || point.series.axis === axisName) {
                        var to = this$1.plotRange(point, 0)[1];
                        if (defined(to) && isFinite(to)) {
                            max = Math.max(max, to);
                            min = Math.min(min, to);
                        }
                    }
                }
            }
        }

        return { min: min, max: max };
    };

    CategoricalChart.prototype.updateStackRange = function updateStackRange () {
        var this$1 = this;

        var ref = this.options;
        var isStacked = ref.isStacked;
        var chartSeries = ref.series;
        var limitsCache = {};

        if (isStacked) {
            for (var i = 0; i < chartSeries.length; i++) {
                var series = chartSeries[i];
                var axisName = series.axis;
                var key = axisName + series.stack;

                var limits = limitsCache[key];
                if (!limits) {
                    limits = this$1.stackLimits(axisName, series.stack);

                    var errorTotals = this$1.errorTotals;
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
                    this$1.valueAxisRanges[axisName] = limits;
                }
            }
        }
    };

    CategoricalChart.prototype.addErrorBar = function addErrorBar (point, data, categoryIx) {
        var value = point.value;
        var series = point.series;
        var seriesIx = point.seriesIx;
        var errorBars = point.options.errorBars;
        var lowValue = data.fields[ERROR_LOW_FIELD];
        var highValue = data.fields[ERROR_HIGH_FIELD];
        var errorRange;

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
    };

    CategoricalChart.prototype.addPointErrorBar = function addPointErrorBar (point, categoryIx) {
        var isVertical = !this.options.invertAxes;
        var options = point.options.errorBars;
        var series = point.series;
        var low = point.low;
        var high = point.high;

        if (this.options.isStacked) {
            var stackedErrorRange = this.stackedErrorRange(point, categoryIx);
            low = stackedErrorRange.low;
            high = stackedErrorRange.high;
        } else {
            var fields = { categoryIx: categoryIx, series: series };
            this.updateRange({ value: low }, fields);
            this.updateRange({ value: high }, fields);
        }

        var errorBar = new CategoricalErrorBar(low, high, isVertical, this, series, options);
        point.errorBars = [ errorBar ];
        point.append(errorBar);
    };

    CategoricalChart.prototype.stackedErrorRange = function stackedErrorRange (point, categoryIx) {
        var plotValue = this.plotRange(point, 0)[1] - point.value;
        var low = point.low + plotValue;
        var high = point.high + plotValue;

        this.errorTotals = this.errorTotals || { positive: [], negative: [] };

        if (low < 0) {
            this.errorTotals.negative[categoryIx] = Math.min(this.errorTotals.negative[categoryIx] || 0, low);
        }

        if (high > 0) {
            this.errorTotals.positive[categoryIx] = Math.max(this.errorTotals.positive[categoryIx] || 0, high);
        }

        return { low: low, high: high };
    };

    CategoricalChart.prototype.addValue = function addValue (data, fields) {
        var categoryIx = fields.categoryIx;
        var series = fields.series;
        var seriesIx = fields.seriesIx;

        var categoryPoints = this.categoryPoints[categoryIx];
        if (!categoryPoints) {
            this.categoryPoints[categoryIx] = categoryPoints = [];
        }

        var seriesPoints = this.seriesPoints[seriesIx];
        if (!seriesPoints) {
            this.seriesPoints[seriesIx] = seriesPoints = [];
        }

        var point = this.createPoint(data, fields);
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
    };

    CategoricalChart.prototype.evalPointOptions = function evalPointOptions (options, value, category, categoryIx, series, seriesIx) {
        var state = { defaults: series._defaults, excluded: [ "data", "aggregate", "_events", "tooltip", "content", "template", "visual", "toggle", "_outOfRangeMinPoint", "_outOfRangeMaxPoint" ] };

        var doEval = this._evalSeries[seriesIx];
        if (!defined(doEval)) {
            this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
        }

        var pointOptions = options;
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
    };

    CategoricalChart.prototype.updateRange = function updateRange (data, fields) {
        var axisName = fields.series.axis;
        var value = data.value;
        var axisRange = this.valueAxisRanges[axisName];

        if (isFinite(value) && value !== null) {
            axisRange = this.valueAxisRanges[axisName] =
                axisRange || { min: MAX_VALUE, max: MIN_VALUE };

            axisRange.min = Math.min(axisRange.min, value);
            axisRange.max = Math.max(axisRange.max, value);
        }
    };

    CategoricalChart.prototype.seriesValueAxis = function seriesValueAxis (series) {
        var plotArea = this.plotArea;
        var axisName = series.axis;
        var axis = axisName ? plotArea.namedValueAxes[axisName] : plotArea.valueAxis;

        if (!axis) {
            throw new Error("Unable to locate value axis with name " + axisName);
        }

        return axis;
    };

    CategoricalChart.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var categorySlots = this.categorySlots = [];
        var chartPoints = this.points;
        var categoryAxis = this.categoryAxis;
        var pointIx = 0;

        this.traverseDataPoints(function (data, fields) {
            var categoryIx = fields.categoryIx;
            var currentSeries = fields.series;

            var valueAxis = this$1.seriesValueAxis(currentSeries);
            var point = chartPoints[pointIx++];

            var categorySlot = categorySlots[categoryIx];
            if (!categorySlot) {
                categorySlots[categoryIx] = categorySlot =
                    this$1.categorySlot(categoryAxis, categoryIx, valueAxis);
            }

            if (point) {
                var plotRange = this$1.plotRange(point, valueAxis.startValue());
                var valueSlot = this$1.valueSlot(valueAxis, plotRange);
                if (valueSlot) {
                    var pointSlot = this$1.pointSlot(categorySlot, valueSlot);

                    point.aboveAxis = this$1.aboveAxis(point, valueAxis);
                    point.stackValue = plotRange[1];

                    if (this$1.options.isStacked100) {
                        point.percentage = this$1.plotValue(point);
                    }

                    this$1.reflowPoint(point, pointSlot);
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
    };

    CategoricalChart.prototype.valueSlot = function valueSlot (valueAxis, plotRange) {
        return valueAxis.getSlot(plotRange[0], plotRange[1], !this.options.clip);
    };

    CategoricalChart.prototype.limitPoints = function limitPoints () {
        var this$1 = this;

        var categoryPoints = this.categoryPoints;
        var points = categoryPoints[0].concat(last(categoryPoints));
        for (var idx = 0; idx < points.length; idx++) {
            if (points[idx]) {
                this$1.limitPoint(points[idx]);
            }
        }
    };

    CategoricalChart.prototype.limitPoint = function limitPoint (point) {
        var limittedSlot = this.categoryAxis.limitSlot(point.box);
        if (!limittedSlot.equals(point.box)) {
            point.reflow(limittedSlot);
        }
    };

    CategoricalChart.prototype.aboveAxis = function aboveAxis (point, valueAxis) {
        var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
        var value = point.value;

        return valueAxis.options.reverse ?
            value < axisCrossingValue : value >= axisCrossingValue;
    };

    CategoricalChart.prototype.categoryAxisCrossingValue = function categoryAxisCrossingValue (valueAxis) {
        var categoryAxis = this.categoryAxis;
        var options = valueAxis.options;
        var crossingValues = [].concat(
            options.axisCrossingValues || options.axisCrossingValue
        );

        return crossingValues[categoryAxis.axisIndex || 0] || 0;
    };

    CategoricalChart.prototype.reflowPoint = function reflowPoint (point, pointSlot) {
        point.reflow(pointSlot);
    };

    CategoricalChart.prototype.reflowCategories = function reflowCategories () { };

    CategoricalChart.prototype.pointSlot = function pointSlot (categorySlot, valueSlot) {
        var options = this.options;
        var invertAxes = options.invertAxes;
        var slotX = invertAxes ? valueSlot : categorySlot;
        var slotY = invertAxes ? categorySlot : valueSlot;

        return new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
    };

    CategoricalChart.prototype.categorySlot = function categorySlot (categoryAxis, categoryIx) {
        return categoryAxis.getSlot(categoryIx);
    };

    CategoricalChart.prototype.traverseDataPoints = function traverseDataPoints (callback) {
        var this$1 = this;

        var series = this.options.series;
        var count = categoriesCount(series);
        var seriesCount = series.length;

        for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            this$1._outOfRangeCallback(series[seriesIx], "_outOfRangeMinPoint", seriesIx, callback);
        }

        for (var categoryIx = 0; categoryIx < count; categoryIx++) {
            for (var seriesIx$1 = 0; seriesIx$1 < seriesCount; seriesIx$1++) {
                var currentSeries = series[seriesIx$1];
                var currentCategory = this$1.categoryAxis.categoryAt(categoryIx);
                var pointData = this$1._bindPoint(currentSeries, seriesIx$1, categoryIx);

                callback(pointData, {
                    category: currentCategory,
                    categoryIx: categoryIx,
                    series: currentSeries,
                    seriesIx: seriesIx$1
                });
            }
        }

        for (var seriesIx$2 = 0; seriesIx$2 < seriesCount; seriesIx$2++) {
            this$1._outOfRangeCallback(series[seriesIx$2], "_outOfRangeMaxPoint", seriesIx$2, callback);
        }
    };

    CategoricalChart.prototype._outOfRangeCallback = function _outOfRangeCallback (series, field, seriesIx, callback) {
        var outOfRangePoint = series[field];
        if (outOfRangePoint) {
            var categoryIx = outOfRangePoint.categoryIx;
            var pointData = this._bindPoint(series, seriesIx, categoryIx, outOfRangePoint.item);

            callback(pointData, {
                category: outOfRangePoint.category,
                categoryIx: categoryIx,
                series: series,
                seriesIx: seriesIx,
                dataItem: outOfRangePoint.item
            });
        }
    };

    CategoricalChart.prototype._bindPoint = function _bindPoint (series, seriesIx, categoryIx, item) {
        if (!this._bindCache) {
            this._bindCache = [];
        }

        var bindCache = this._bindCache[seriesIx];
        if (!bindCache) {
            bindCache = this._bindCache[seriesIx] = [];
        }

        var data = bindCache[categoryIx];
        if (!data) {
            data = bindCache[categoryIx] = SeriesBinder.current.bindPoint(series, categoryIx, item);
        }

        return data;
    };

    CategoricalChart.prototype.formatPointValue = function formatPointValue (point, format) {
        if (point.value === null) {
            return "";
        }

        return this.chartService.format.auto(format, point.value);
    };

    CategoricalChart.prototype.pointValue = function pointValue (data) {
        return data.valueFields.value;
    };

    return CategoricalChart;
}(ChartElement));

setDefaultOptions(CategoricalChart, {
    series: [],
    invertAxes: false,
    isStacked: false,
    clip: true,
    limitPoints: true
});

export default CategoricalChart;