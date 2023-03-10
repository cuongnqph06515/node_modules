import { drawing as draw } from '@progress/kendo-drawing';

import PieSegment from './pie-segment';
import PieChartMixin from '../mixins/pie-chart-mixin';
import { ChartElement, Ring, Box, Point } from '../../core';

import { OUTSIDE_END, FADEIN, COLUMN } from '../constants';
import { bindSegments, evalOptions } from '../utils';

import { CIRCLE, RIGHT, CENTER } from '../../common/constants';
import { deepExtend, defined, isFunction, last, round, setDefaultOptions, valueOrDefault } from '../../common';

const PIE_SECTOR_ANIM_DELAY = 70;

class PieChart extends ChartElement {
    constructor(plotArea, options) {
        super(options);

        this.plotArea = plotArea;
        this.chartService = plotArea.chartService;
        this.points = [];
        this.legendItems = [];
        this.render();
    }

    render() {
        this.traverseDataPoints(this.addValue.bind(this));
    }

    traverseDataPoints(callback) {
        const { options, plotArea: { options: { seriesColors = [] } } } = this;
        const colorsCount = seriesColors.length;
        const series = options.series;
        const seriesCount = series.length;

        for (let seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            const currentSeries = series[seriesIx];
            const data = currentSeries.data;
            const { total, points, count } = bindSegments(currentSeries);
            const anglePerValue = 360 / total;
            let constantAngle;
            if (!isFinite(anglePerValue)) {
                constantAngle = 360 / count;
            }
            let currentAngle;

            if (defined(currentSeries.startAngle)) {
                currentAngle = currentSeries.startAngle;
            } else {
                currentAngle = options.startAngle;
            }

            if (seriesIx !== seriesCount - 1) {
                if (currentSeries.labels.position === OUTSIDE_END) {
                    currentSeries.labels.position = CENTER;
                }
            }

            for (let i = 0; i < points.length; i++) {
                const pointData = points[i];
                if (!pointData) {
                    continue;
                }

                const { fields, value, visible } = pointData;
                const angle = value !== 0 ? (constantAngle || (value * anglePerValue)) : 0;
                const explode = data.length !== 1 && Boolean(fields.explode);

                if (!isFunction(currentSeries.color)) {
                    currentSeries.color = fields.color || seriesColors[i % colorsCount];
                }

                callback(pointData.valueFields.value, new Ring(null, 0, 0, currentAngle, angle), {
                    owner: this,
                    category: defined(fields.category) ? fields.category : "",
                    index: i,
                    series: currentSeries,
                    seriesIx: seriesIx,
                    dataItem: data[i],
                    percentage: total !== 0 ? value / total : 0,
                    explode: explode,
                    visibleInLegend: fields.visibleInLegend,
                    visible: visible,
                    zIndex: seriesCount - seriesIx,
                    animationDelay: this.animationDelay(i, seriesIx, seriesCount)
                });

                if (visible !== false) {
                    currentAngle += angle;
                }
            }
        }
    }

    evalSegmentOptions(options, value, fields) {
        const series = fields.series;

        evalOptions(options, {
            value: value,
            series: series,
            dataItem: fields.dataItem,
            category: fields.category,
            percentage: fields.percentage
        }, { defaults: series._defaults, excluded: [ "data", "content", "template", "visual", "toggle" ] });
    }

    addValue(value, sector, fields) {
        const segmentOptions = deepExtend({}, fields.series, { index: fields.index });
        this.evalSegmentOptions(segmentOptions, value, fields);

        this.createLegendItem(value, segmentOptions, fields);

        if (fields.visible === false) {
            return;
        }

        const segment = new PieSegment(value, sector, segmentOptions);
        Object.assign(segment, fields);
        this.append(segment);
        this.points.push(segment);
    }

    reflow(targetBox) {
        const { options, points, seriesConfigs = [] } = this;
        const count = points.length;
        const box = targetBox.clone();
        const space = 5;
        const minWidth = Math.min(box.width(), box.height());
        const halfMinWidth = minWidth / 2;
        const defaultPadding = minWidth - minWidth * 0.85;
        const newBox = new Box(box.x1, box.y1, box.x1 + minWidth, box.y1 + minWidth);
        const newBoxCenter = newBox.center();
        const boxCenter = box.center();
        const seriesCount = options.series.length;
        const leftSideLabels = [];
        const rightSideLabels = [];
        let padding = valueOrDefault(options.padding, defaultPadding);

        this.targetBox = targetBox;

        padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
        newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);

        const radius = halfMinWidth - padding;
        const center = new Point(
            radius + newBox.x1 + padding,
            radius + newBox.y1 + padding
        );

        for (let i = 0; i < count; i++) {
            const segment = points[i];
            const sector = segment.sector;
            const seriesIndex = segment.seriesIx;
            sector.radius = radius;
            sector.center = center;

            if (seriesConfigs.length) {
                const seriesConfig = seriesConfigs[seriesIndex];
                sector.innerRadius = seriesConfig.innerRadius;
                sector.radius = seriesConfig.radius;
            }

            if (seriesIndex === seriesCount - 1 && segment.explode) {
                sector.center = sector.clone().setRadius(sector.radius * 0.15).point(sector.middle());
            }

            segment.reflow(newBox);

            const label = segment.label;
            if (label) {
                if (label.options.position === OUTSIDE_END) {
                    if (seriesIndex === seriesCount - 1) {
                        if (label.orientation === RIGHT) {
                            rightSideLabels.push(label);
                        } else {
                            leftSideLabels.push(label);
                        }
                    }
                }
            }
        }

        if (leftSideLabels.length > 0) {
            leftSideLabels.sort(this.labelComparator(true));
            this.leftLabelsReflow(leftSideLabels);
        }

        if (rightSideLabels.length > 0) {
            rightSideLabels.sort(this.labelComparator(false));
            this.rightLabelsReflow(rightSideLabels);
        }

        this.box = newBox;
    }

    leftLabelsReflow(labels) {
        const distances = this.distanceBetweenLabels(labels);

        this.distributeLabels(distances, labels);
    }

    rightLabelsReflow(labels) {
        const distances = this.distanceBetweenLabels(labels);

        this.distributeLabels(distances, labels);
    }

    distanceBetweenLabels(labels) {
        const segment = last(this.points);
        const sector = segment.sector;
        const count = labels.length - 1;
        const lr = sector.radius + segment.options.labels.distance;
        const distances = [];
        let firstBox = labels[0].box;
        let distance = round(firstBox.y1 - (sector.center.y - lr - firstBox.height() - firstBox.height() / 2));

        distances.push(distance);

        for (let i = 0; i < count; i++) {
            const secondBox = labels[i + 1].box;

            firstBox = labels[i].box;
            distance = round(secondBox.y1 - firstBox.y2);
            distances.push(distance);
        }
        distance = round(sector.center.y + lr - labels[count].box.y2 - labels[count].box.height() / 2);
        distances.push(distance);

        return distances;
    }

    distributeLabels(distances, labels) {
        const count = distances.length;
        let left, right, remaining;

        for (let i = 0; i < count; i++) {
            remaining = -distances[i];
            left = right = i;

            while (remaining > 0 && (left >= 0 || right < count)) {
                remaining = this._takeDistance(distances, i, --left, remaining);
                remaining = this._takeDistance(distances, i, ++right, remaining);
            }
        }

        this.reflowLabels(distances, labels);
    }

    _takeDistance(distances, anchor, position, amount) {
        let result = amount;
        if (distances[position] > 0) {
            const available = Math.min(distances[position], result);
            result -= available;
            distances[position] -= available;
            distances[anchor] += available;
        }

        return result;
    }

    reflowLabels(distances, labels) {
        const segment = last(this.points);
        const sector = segment.sector;
        const labelOptions = segment.options.labels;
        const labelsCount = labels.length;
        const labelDistance = labelOptions.distance;
        let boxY = sector.center.y - (sector.radius + labelDistance) - labels[0].box.height();
        let boxX;

        distances[0] += 2;
        for (let i = 0; i < labelsCount; i++) {
            const label = labels[i];
            const box = label.box;

            boxY += distances[i];
            boxX = this.hAlignLabel(
                box.x2,
                sector.clone().expand(labelDistance),
                boxY,
                boxY + box.height(),
                label.orientation === RIGHT);

            if (label.orientation === RIGHT) {
                if (labelOptions.align !== CIRCLE) {
                    boxX = sector.radius + sector.center.x + labelDistance;
                }
                label.reflow(new Box(boxX + box.width(), boxY, boxX, boxY));
            } else {
                if (labelOptions.align !== CIRCLE) {
                    boxX = sector.center.x - sector.radius - labelDistance;
                }
                label.reflow(new Box(boxX - box.width(), boxY, boxX, boxY));
            }

            boxY += box.height();
        }
    }

    createVisual() {
        const { options: { connectors }, points } = this;
        const count = points.length;
        const space = 4;

        super.createVisual();

        this._connectorLines = [];

        for (let i = 0; i < count; i++) {
            const segment = points[i];
            const { sector, label } = segment;
            const angle = sector.middle();
            const connectorsColor = (segment.options.connectors || {}).color || connectors.color;

            if (label) {
                const connectorLine = new draw.Path({
                    stroke: {
                        color: connectorsColor,
                        width: connectors.width
                    },
                    animation: {
                        type: FADEIN,
                        delay: segment.animationDelay
                    }
                });

                if (label.options.position === OUTSIDE_END) {
                    const box = label.box;
                    const centerPoint = sector.center;
                    let start = sector.point(angle);
                    let middle = new Point(box.x1, box.center().y);
                    let sr, end, crossing;

                    start = sector.clone().expand(connectors.padding).point(angle);
                    connectorLine.moveTo(start.x, start.y);
                    // TODO: Extract into a method to remove duplication
                    if (label.orientation === RIGHT) {
                        end = new Point(box.x1 - connectors.padding, box.center().y);
                        crossing = intersection(centerPoint, start, middle, end);
                        middle = new Point(end.x - space, end.y);
                        crossing = crossing || middle;
                        crossing.x = Math.min(crossing.x, middle.x);

                        if (this.pointInCircle(crossing, sector.center, sector.radius + space) ||
                            crossing.x < sector.center.x) {
                            sr = sector.center.x + sector.radius + space;
                            if (segment.options.labels.align !== COLUMN) {
                                if (sr < middle.x) {
                                    connectorLine.lineTo(sr, start.y);
                                } else {
                                    connectorLine.lineTo(start.x + space * 2, start.y);
                                }
                            } else {
                                connectorLine.lineTo(sr, start.y);
                            }
                            connectorLine.lineTo(middle.x, end.y);
                        } else {
                            crossing.y = end.y;
                            connectorLine.lineTo(crossing.x, crossing.y);
                        }
                    } else {
                        end = new Point(box.x2 + connectors.padding, box.center().y);
                        crossing = intersection(centerPoint, start, middle, end);
                        middle = new Point(end.x + space, end.y);
                        crossing = crossing || middle;
                        crossing.x = Math.max(crossing.x, middle.x);

                        if (this.pointInCircle(crossing, sector.center, sector.radius + space) ||
                            crossing.x > sector.center.x) {
                            sr = sector.center.x - sector.radius - space;
                            if (segment.options.labels.align !== COLUMN) {
                                if (sr > middle.x) {
                                    connectorLine.lineTo(sr, start.y);
                                } else {
                                    connectorLine.lineTo(start.x - space * 2, start.y);
                                }
                            } else {
                                connectorLine.lineTo(sr, start.y);
                            }
                            connectorLine.lineTo(middle.x, end.y);
                        } else {
                            crossing.y = end.y;
                            connectorLine.lineTo(crossing.x, crossing.y);
                        }
                    }

                    connectorLine.lineTo(end.x, end.y);

                    this._connectorLines.push(connectorLine);
                    this.visual.append(connectorLine);
                }
            }
        }
    }

    renderVisual() {
        super.renderVisual();

        if (this.options.series.find(options => options.autoFit)) {
            const rect = this.targetBox.toRect();
            draw.fit(this.visual, rect);

            const transform = this.visual.transform();

            if (transform) {
                draw.align([ this.visual ], rect, 'center');

                const pieBox = this.box.toRect().transformCopy(transform); //transformed pie box

                transform.matrix().f += rect.center().y - pieBox.center().y; // move to targetbox center
            }
        }
    }

    labelComparator(reverse) {
        const reverseValue = reverse ? -1 : 1;

        return function(a, b) {
            const first = (a.parent.sector.middle() + 270) % 360;
            const second = (b.parent.sector.middle() + 270) % 360;
            return (first - second) * reverseValue;
        };
    }

    hAlignLabel(originalX, sector, y1, y2, direction) {
        const { radius, center: { x: cx, y: cy } } = sector;
        const t = Math.min(Math.abs(cy - y1), Math.abs(cy - y2));

        if (t > radius) {
            return originalX;
        }

        return cx + Math.sqrt((radius * radius) - (t * t)) * (direction ? 1 : -1);
    }

    pointInCircle(point, center, radius) {
        return Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2) < Math.pow(radius, 2);
    }

    formatPointValue(point, format) {
        return this.chartService.format.auto(format, point.value);
    }

    animationDelay(categoryIndex) {
        return categoryIndex * PIE_SECTOR_ANIM_DELAY;
    }

    stackRoot() {
        return this;
    }
}

function intersection(a1, a2, b1, b2) {
    const uat = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    const ub = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    let result;
    if (ub !== 0) {
        const ua = (uat / ub);

        result = new Point(
            a1.x + ua * (a2.x - a1.x),
            a1.y + ua * (a2.y - a1.y)
        );
    }

    return result;
}

setDefaultOptions(PieChart, {
    startAngle: 90,
    connectors: {
        width: 2,
        color: "#939393",
        padding: 8
    },
    inactiveItems: {
        markers: {},
        labels: {}
    }
});

deepExtend(PieChart.prototype, PieChartMixin);

PieChart.prototype.isStackRoot = true;

export default PieChart;
