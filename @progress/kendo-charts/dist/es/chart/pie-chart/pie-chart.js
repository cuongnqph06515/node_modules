import { drawing as draw } from '@progress/kendo-drawing';

import PieSegment from './pie-segment';
import PieChartMixin from '../mixins/pie-chart-mixin';
import { ChartElement, Ring, Box, Point } from '../../core';

import { OUTSIDE_END, FADEIN, COLUMN } from '../constants';
import { bindSegments, evalOptions } from '../utils';

import { CIRCLE, RIGHT, CENTER } from '../../common/constants';
import { deepExtend, defined, isFunction, last, round, setDefaultOptions, valueOrDefault } from '../../common';

var PIE_SECTOR_ANIM_DELAY = 70;

var PieChart = (function (ChartElement) {
    function PieChart(plotArea, options) {
        ChartElement.call(this, options);

        this.plotArea = plotArea;
        this.chartService = plotArea.chartService;
        this.points = [];
        this.legendItems = [];
        this.render();
    }

    if ( ChartElement ) PieChart.__proto__ = ChartElement;
    PieChart.prototype = Object.create( ChartElement && ChartElement.prototype );
    PieChart.prototype.constructor = PieChart;

    PieChart.prototype.render = function render () {
        this.traverseDataPoints(this.addValue.bind(this));
    };

    PieChart.prototype.traverseDataPoints = function traverseDataPoints (callback) {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var seriesColors = ref.plotArea.options.seriesColors; if ( seriesColors === void 0 ) seriesColors = [];
        var colorsCount = seriesColors.length;
        var series = options.series;
        var seriesCount = series.length;

        for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            var currentSeries = series[seriesIx];
            var data = currentSeries.data;
            var ref$1 = bindSegments(currentSeries);
            var total = ref$1.total;
            var points = ref$1.points;
            var count = ref$1.count;
            var anglePerValue = 360 / total;
            var constantAngle = (void 0);
            if (!isFinite(anglePerValue)) {
                constantAngle = 360 / count;
            }
            var currentAngle = (void 0);

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

            for (var i = 0; i < points.length; i++) {
                var pointData = points[i];
                if (!pointData) {
                    continue;
                }

                var fields = pointData.fields;
                var value = pointData.value;
                var visible = pointData.visible;
                var angle = value !== 0 ? (constantAngle || (value * anglePerValue)) : 0;
                var explode = data.length !== 1 && Boolean(fields.explode);

                if (!isFunction(currentSeries.color)) {
                    currentSeries.color = fields.color || seriesColors[i % colorsCount];
                }

                callback(pointData.valueFields.value, new Ring(null, 0, 0, currentAngle, angle), {
                    owner: this$1,
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
                    animationDelay: this$1.animationDelay(i, seriesIx, seriesCount)
                });

                if (visible !== false) {
                    currentAngle += angle;
                }
            }
        }
    };

    PieChart.prototype.evalSegmentOptions = function evalSegmentOptions (options, value, fields) {
        var series = fields.series;

        evalOptions(options, {
            value: value,
            series: series,
            dataItem: fields.dataItem,
            category: fields.category,
            percentage: fields.percentage
        }, { defaults: series._defaults, excluded: [ "data", "content", "template", "visual", "toggle" ] });
    };

    PieChart.prototype.addValue = function addValue (value, sector, fields) {
        var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
        this.evalSegmentOptions(segmentOptions, value, fields);

        this.createLegendItem(value, segmentOptions, fields);

        if (fields.visible === false) {
            return;
        }

        var segment = new PieSegment(value, sector, segmentOptions);
        Object.assign(segment, fields);
        this.append(segment);
        this.points.push(segment);
    };

    PieChart.prototype.reflow = function reflow (targetBox) {
        var ref = this;
        var options = ref.options;
        var points = ref.points;
        var seriesConfigs = ref.seriesConfigs; if ( seriesConfigs === void 0 ) seriesConfigs = [];
        var count = points.length;
        var box = targetBox.clone();
        var space = 5;
        var minWidth = Math.min(box.width(), box.height());
        var halfMinWidth = minWidth / 2;
        var defaultPadding = minWidth - minWidth * 0.85;
        var newBox = new Box(box.x1, box.y1, box.x1 + minWidth, box.y1 + minWidth);
        var newBoxCenter = newBox.center();
        var boxCenter = box.center();
        var seriesCount = options.series.length;
        var leftSideLabels = [];
        var rightSideLabels = [];
        var padding = valueOrDefault(options.padding, defaultPadding);

        this.targetBox = targetBox;

        padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
        newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);

        var radius = halfMinWidth - padding;
        var center = new Point(
            radius + newBox.x1 + padding,
            radius + newBox.y1 + padding
        );

        for (var i = 0; i < count; i++) {
            var segment = points[i];
            var sector = segment.sector;
            var seriesIndex = segment.seriesIx;
            sector.radius = radius;
            sector.center = center;

            if (seriesConfigs.length) {
                var seriesConfig = seriesConfigs[seriesIndex];
                sector.innerRadius = seriesConfig.innerRadius;
                sector.radius = seriesConfig.radius;
            }

            if (seriesIndex === seriesCount - 1 && segment.explode) {
                sector.center = sector.clone().setRadius(sector.radius * 0.15).point(sector.middle());
            }

            segment.reflow(newBox);

            var label = segment.label;
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
    };

    PieChart.prototype.leftLabelsReflow = function leftLabelsReflow (labels) {
        var distances = this.distanceBetweenLabels(labels);

        this.distributeLabels(distances, labels);
    };

    PieChart.prototype.rightLabelsReflow = function rightLabelsReflow (labels) {
        var distances = this.distanceBetweenLabels(labels);

        this.distributeLabels(distances, labels);
    };

    PieChart.prototype.distanceBetweenLabels = function distanceBetweenLabels (labels) {
        var segment = last(this.points);
        var sector = segment.sector;
        var count = labels.length - 1;
        var lr = sector.radius + segment.options.labels.distance;
        var distances = [];
        var firstBox = labels[0].box;
        var distance = round(firstBox.y1 - (sector.center.y - lr - firstBox.height() - firstBox.height() / 2));

        distances.push(distance);

        for (var i = 0; i < count; i++) {
            var secondBox = labels[i + 1].box;

            firstBox = labels[i].box;
            distance = round(secondBox.y1 - firstBox.y2);
            distances.push(distance);
        }
        distance = round(sector.center.y + lr - labels[count].box.y2 - labels[count].box.height() / 2);
        distances.push(distance);

        return distances;
    };

    PieChart.prototype.distributeLabels = function distributeLabels (distances, labels) {
        var this$1 = this;

        var count = distances.length;
        var left, right, remaining;

        for (var i = 0; i < count; i++) {
            remaining = -distances[i];
            left = right = i;

            while (remaining > 0 && (left >= 0 || right < count)) {
                remaining = this$1._takeDistance(distances, i, --left, remaining);
                remaining = this$1._takeDistance(distances, i, ++right, remaining);
            }
        }

        this.reflowLabels(distances, labels);
    };

    PieChart.prototype._takeDistance = function _takeDistance (distances, anchor, position, amount) {
        var result = amount;
        if (distances[position] > 0) {
            var available = Math.min(distances[position], result);
            result -= available;
            distances[position] -= available;
            distances[anchor] += available;
        }

        return result;
    };

    PieChart.prototype.reflowLabels = function reflowLabels (distances, labels) {
        var this$1 = this;

        var segment = last(this.points);
        var sector = segment.sector;
        var labelOptions = segment.options.labels;
        var labelsCount = labels.length;
        var labelDistance = labelOptions.distance;
        var boxY = sector.center.y - (sector.radius + labelDistance) - labels[0].box.height();
        var boxX;

        distances[0] += 2;
        for (var i = 0; i < labelsCount; i++) {
            var label = labels[i];
            var box = label.box;

            boxY += distances[i];
            boxX = this$1.hAlignLabel(
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
    };

    PieChart.prototype.createVisual = function createVisual () {
        var this$1 = this;

        var ref = this;
        var connectors = ref.options.connectors;
        var points = ref.points;
        var count = points.length;
        var space = 4;

        ChartElement.prototype.createVisual.call(this);

        this._connectorLines = [];

        for (var i = 0; i < count; i++) {
            var segment = points[i];
            var sector = segment.sector;
            var label = segment.label;
            var angle = sector.middle();
            var connectorsColor = (segment.options.connectors || {}).color || connectors.color;

            if (label) {
                var connectorLine = new draw.Path({
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
                    var box = label.box;
                    var centerPoint = sector.center;
                    var start = sector.point(angle);
                    var middle = new Point(box.x1, box.center().y);
                    var sr = (void 0), end = (void 0), crossing = (void 0);

                    start = sector.clone().expand(connectors.padding).point(angle);
                    connectorLine.moveTo(start.x, start.y);
                    // TODO: Extract into a method to remove duplication
                    if (label.orientation === RIGHT) {
                        end = new Point(box.x1 - connectors.padding, box.center().y);
                        crossing = intersection(centerPoint, start, middle, end);
                        middle = new Point(end.x - space, end.y);
                        crossing = crossing || middle;
                        crossing.x = Math.min(crossing.x, middle.x);

                        if (this$1.pointInCircle(crossing, sector.center, sector.radius + space) ||
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

                        if (this$1.pointInCircle(crossing, sector.center, sector.radius + space) ||
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

                    this$1._connectorLines.push(connectorLine);
                    this$1.visual.append(connectorLine);
                }
            }
        }
    };

    PieChart.prototype.renderVisual = function renderVisual () {
        ChartElement.prototype.renderVisual.call(this);

        if (this.options.series.find(function (options) { return options.autoFit; })) {
            var rect = this.targetBox.toRect();
            draw.fit(this.visual, rect);

            var transform = this.visual.transform();

            if (transform) {
                draw.align([ this.visual ], rect, 'center');

                var pieBox = this.box.toRect().transformCopy(transform); //transformed pie box

                transform.matrix().f += rect.center().y - pieBox.center().y; // move to targetbox center
            }
        }
    };

    PieChart.prototype.labelComparator = function labelComparator (reverse) {
        var reverseValue = reverse ? -1 : 1;

        return function(a, b) {
            var first = (a.parent.sector.middle() + 270) % 360;
            var second = (b.parent.sector.middle() + 270) % 360;
            return (first - second) * reverseValue;
        };
    };

    PieChart.prototype.hAlignLabel = function hAlignLabel (originalX, sector, y1, y2, direction) {
        var radius = sector.radius;
        var sector_center = sector.center;
        var cx = sector_center.x;
        var cy = sector_center.y;
        var t = Math.min(Math.abs(cy - y1), Math.abs(cy - y2));

        if (t > radius) {
            return originalX;
        }

        return cx + Math.sqrt((radius * radius) - (t * t)) * (direction ? 1 : -1);
    };

    PieChart.prototype.pointInCircle = function pointInCircle (point, center, radius) {
        return Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2) < Math.pow(radius, 2);
    };

    PieChart.prototype.formatPointValue = function formatPointValue (point, format) {
        return this.chartService.format.auto(format, point.value);
    };

    PieChart.prototype.animationDelay = function animationDelay (categoryIndex) {
        return categoryIndex * PIE_SECTOR_ANIM_DELAY;
    };

    PieChart.prototype.stackRoot = function stackRoot () {
        return this;
    };

    return PieChart;
}(ChartElement));

function intersection(a1, a2, b1, b2) {
    var uat = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    var result;
    if (ub !== 0) {
        var ua = (uat / ub);

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
