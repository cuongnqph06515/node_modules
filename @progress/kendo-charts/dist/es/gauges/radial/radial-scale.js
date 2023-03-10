import { geometry as geo, drawing } from '@progress/kendo-drawing';
import { setDefaultOptions, deepExtend, defined, round } from '../../common';
import { BLACK, COORD_PRECISION } from '../../common/constants';
import { autoMajorUnit, Box, NumericAxis } from '../../core';
import { buildLabelElement, getRange } from '../utils';

import { DEGREE, DEFAULT_LINE_WIDTH, INSIDE, OUTSIDE } from '../constants';

var GEO_ARC_ADJUST_ANGLE = 180;

var Arc = drawing.Arc;
var Path = drawing.Path;
var Group = drawing.Group;

function drawTicks(arc, tickAngles, unit, tickOptions) {
    var ticks = new Group();
    var center = arc.center;
    var radius = arc.getRadiusX();

    if (tickOptions.visible) {
        for (var i = 0; i < tickAngles.length; i++) {
            var tickStart = arc.pointAt(tickAngles[i]);
            var tickEnd = new geo.Point(center.x + radius - tickOptions.size, center.y).rotate(tickAngles[i], center);

            ticks.append(new Path({
                stroke: {
                    color: tickOptions.color,
                    width: tickOptions.width
                }
            }).moveTo(tickStart).lineTo(tickEnd));
        }
    }

    return ticks;
}

function rangeSegment(from, to, color, opacity) {
    return { from: from, to: to, color: color, opacity: opacity };
}

var RadialScale = (function (NumericAxis) {
    function RadialScale(options, service) {
        NumericAxis.call(this, 0, 1, options, service);
    }

    if ( NumericAxis ) RadialScale.__proto__ = NumericAxis;
    RadialScale.prototype = Object.create( NumericAxis && NumericAxis.prototype );
    RadialScale.prototype.constructor = RadialScale;

    RadialScale.prototype.initUserOptions = function initUserOptions (options) {
        var scaleOptions = deepExtend({}, this.options, options);
        scaleOptions.majorUnit = scaleOptions.majorUnit || autoMajorUnit(scaleOptions.min, scaleOptions.max);
        scaleOptions.minorUnit = scaleOptions.minorUnit || scaleOptions.majorUnit / 10;

        return scaleOptions;
    };

    RadialScale.prototype.initFields = function initFields () {
    };

    RadialScale.prototype.render = function render (center, radius) {
        var arc = this.renderArc(center, radius);

        this.bbox = arc.bbox();
        this.labelElements = this.renderLabels();
        this.ticks = this.renderTicks();
        this.ranges = this.renderRanges();
    };

    RadialScale.prototype.reflow = function reflow (bbox) {
        var center = bbox.center();
        var radius = Math.min(bbox.height(), bbox.width()) / 2;

        if (defined(this.bbox)) {
            this.bbox = this.arc.bbox();
            this.radius(this.arc.getRadiusX());
            this.repositionRanges();
            this.renderLabels();
        } else {
            return this.render(center, radius);
        }
    };

    RadialScale.prototype.slotAngle = function slotAngle (value) {
        var ref = this.options;
        var min = ref.min;
        var max = ref.max;
        var reverse = ref.reverse;
        var startAngle = ref.startAngle;
        var endAngle = ref.endAngle;
        var angle = endAngle - startAngle;
        var result;

        if (reverse) {
            result = endAngle - (value - min) / (max - min) * angle;
        } else {
            result = ((value - min) / (max - min) * angle) + startAngle;
        }

        return result + GEO_ARC_ADJUST_ANGLE;
    };

    RadialScale.prototype.hasRanges = function hasRanges () {
        var ranges = this.options.ranges;

        return ranges && ranges.length;
    };

    RadialScale.prototype.ticksSize = function ticksSize () {
        var ref = this.options;
        var majorTicks = ref.majorTicks;
        var minorTicks = ref.minorTicks;
        var size = 0;
        if (majorTicks.visible) {
            size = majorTicks.size;
        }

        if (minorTicks.visible) {
            size = Math.max(minorTicks.size, size);
        }

        return size;
    };

    RadialScale.prototype.renderLabels = function renderLabels () {
        var this$1 = this;

        var options = this.options;
        var arc = this.arc.clone();
        var radius = arc.getRadiusX();
        var tickAngles = this.tickAngles(arc, options.majorUnit);
        var rangeSize = options.rangeSize = options.rangeSize || radius * 0.1;
        var labelsGroup = new Group();

        var rangeDistance = radius * 0.05;
        if (defined(options.rangeDistance)) {
            rangeDistance = options.rangeDistance;
        } else {
            options.rangeDistance = rangeDistance;
        }

        var labelsOptions = options.labels;
        var isInside = labelsOptions.position === INSIDE;
        var hasLabelElements = defined(this.labelElements);

        if (isInside) {
            radius -= this.ticksSize();

            if (this.hasRanges() && !hasLabelElements) {
                radius -= rangeSize + rangeDistance;
            }
            arc.setRadiusX(radius).setRadiusY(radius);
        }

        var labels = this.labels;
        var count = labels.length;
        var padding = labelsOptions.padding;

        for (var i = 0; i < count; i++) {
            var label = labels[i];
            var halfWidth = label.box.width() / 2;
            var halfHeight = label.box.height() / 2;
            var angle = tickAngles[i];
            var labelAngle = (angle - GEO_ARC_ADJUST_ANGLE) * DEGREE;

            var lp = arc.pointAt(angle);
            var cx = lp.x + (Math.cos(labelAngle) * (halfWidth + padding) * (isInside ? 1 : -1));
            var cy = lp.y + (Math.sin(labelAngle) * (halfHeight + padding) * (isInside ? 1 : -1));

            label.reflow(new Box(cx - halfWidth, cy - halfHeight, cx + halfWidth, cy + halfHeight));
            var labelPos = new geo.Point(label.box.x1, label.box.y1);

            var labelElement = (void 0);
            if (!hasLabelElements) {
                labelElement = buildLabelElement(label, options.labels);
                labelsGroup.append(labelElement);
            } else {
                labelElement = this$1.labelElements.children[i];
                var prevLabelPos = labelElement.bbox().origin;

                var labelTransform = labelElement.transform() || geo.transform();
                labelTransform.translate(labelPos.x - prevLabelPos.x, labelPos.y - prevLabelPos.y);
                labelElement.transform(labelTransform);
            }

            this$1.bbox = geo.Rect.union(this$1.bbox, labelElement.bbox());
        }

        return labelsGroup;
    };

    RadialScale.prototype.repositionRanges = function repositionRanges () {
        var ranges = this.ranges.children;

        if (ranges.length > 0) {
            var ref = this.options;
            var rangeDistance = ref.rangeDistance;
            var rangeSize = ref.rangeSize;
            var rangeRadius = this.getRangeRadius();

            if (this.options.labels.position === INSIDE) {
                rangeRadius += rangeSize + rangeDistance;
            }

            var newRadius = rangeRadius + (rangeSize / 2);

            for (var i = 0; i < ranges.length; i++) {
                ranges[i]._geometry.setRadiusX(newRadius).setRadiusY(newRadius);
            }

            this.bbox = geo.Rect.union(this.bbox, this.ranges.bbox());
        }
    };

    RadialScale.prototype.renderRanges = function renderRanges () {
        var this$1 = this;

        var segments = this.rangeSegments();
        var segmentsCount = segments.length;
        var result = new Group();

        if (segmentsCount) {
            var ref = this.options;
            var rangeSize = ref.rangeSize;
            var reverse = ref.reverse;
            var rangeDistance = ref.rangeDistance;
            var rangeRadius = this.getRangeRadius();

            // move the ticks with a range distance and a range size
            this.radius(this.radius() - rangeSize - rangeDistance);

            for (var i = 0; i < segmentsCount; i++) {
                var segment = segments[i];
                var from = this$1.slotAngle(segment[reverse ? "to" : "from"]);
                var to = this$1.slotAngle(segment[!reverse ? "to" : "from"]);

                if (to - from !== 0) {
                    result.append(this$1.createRange(from, to, rangeRadius, segment));
                }
            }
        }

        return result;
    };

    RadialScale.prototype.createRange = function createRange (startAngle, endAngle, rangeRadius, options) {
        var rangeSize = this.options.rangeSize;
        var rangeGeom = new geo.Arc(this.arc.center, {
            radiusX: rangeRadius + (rangeSize / 2),
            radiusY: rangeRadius + (rangeSize / 2),
            startAngle: startAngle,
            endAngle: endAngle
        });

        return new Arc(rangeGeom, {
            stroke: {
                width: rangeSize,
                color: options.color,
                opacity: options.opacity,
                lineCap: options.lineCap
            }
        });
    };

    RadialScale.prototype.rangeSegments = function rangeSegments () {
        var options = this.options;
        var ranges = options.ranges || [];
        var count = ranges.length;
        var segments = [];

        if (count) {
            var min = options.min;
            var max = options.max;
            var defaultColor = options.rangePlaceholderColor;
            segments.push(rangeSegment(min, max, defaultColor));

            for (var i = 0; i < count; i++) {
                var range = getRange(ranges[i], min, max);
                var segmentsCount = segments.length;

                for (var j = 0; j < segmentsCount; j++) {
                    var segment = segments[j];

                    if (segment.from <= range.from && range.from <= segment.to) {
                        segments.push(rangeSegment(range.from, range.to, range.color, range.opacity));

                        if (segment.from <= range.to && range.to <= segment.to) {
                            segments.push(rangeSegment(range.to, segment.to, defaultColor, range.opacity));
                        }

                        segment.to = range.from;

                        break;
                    }
                }
            }
        }

        return segments;
    };

    RadialScale.prototype.getRangeRadius = function getRangeRadius () {
        var ref = this;
        var arc = ref.arc;
        var options = ref.options;
        var rangeSize = options.rangeSize;
        var rangeDistance = options.rangeDistance;
        var majorTickSize = options.majorTicks.size;
        var radius;

        if (options.labels.position === OUTSIDE) {
            radius = arc.getRadiusX() - majorTickSize - rangeDistance - rangeSize;
        } else {
            radius = arc.getRadiusX() - rangeSize;
        }

        return radius;
    };

    RadialScale.prototype.renderArc = function renderArc (center, radius) {
        var options = this.options;

        var arc = this.arc = new geo.Arc(center, {
            radiusX: radius,
            radiusY: radius,
            startAngle: options.startAngle + GEO_ARC_ADJUST_ANGLE,
            endAngle: options.endAngle + GEO_ARC_ADJUST_ANGLE
        });

        return arc;
    };

    RadialScale.prototype.renderTicks = function renderTicks () {
        var ref = this;
        var arc = ref.arc;
        var options = ref.options;
        var tickArc = arc.clone();

        this.majorTickAngles = this.tickAngles(arc, options.majorUnit);
        this.majorTicks = drawTicks(tickArc, this.majorTickAngles, options.majorUnit, options.majorTicks);

        var allTicks = new Group();
        allTicks.append(this.majorTicks);

        var majorTickSize = options.majorTicks.size;
        var minorTickSize = options.minorTicks.size;

        this._tickDifference = majorTickSize - minorTickSize;

        if (options.labels.position === OUTSIDE) {
            var radius = tickArc.getRadiusX();
            tickArc.setRadiusX(radius - majorTickSize + minorTickSize)
                   .setRadiusY(radius - majorTickSize + minorTickSize);
        }

        this.minorTickAngles = this.normalizeTickAngles(this.tickAngles(arc, options.minorUnit));
        this.minorTicks = drawTicks(tickArc, this.minorTickAngles, options.minorUnit, options.minorTicks);
        allTicks.append(this.minorTicks);

        return allTicks;
    };

    RadialScale.prototype.normalizeTickAngles = function normalizeTickAngles (angles) {
        var options = this.options;
        var skip = options.majorUnit / options.minorUnit;

        for (var i = angles.length - 1; i >= 0; i--) {
            if (i % skip === 0) {
                angles.splice(i, 1);
            }
        }

        return angles;
    };

    RadialScale.prototype.tickAngles = function tickAngles (ring, stepValue) {
        var options = this.options;
        var reverse = options.reverse;
        var range = options.max - options.min;
        var angle = ring.endAngle - ring.startAngle;
        var tickCount = range / stepValue;
        var pos = ring.startAngle;
        var step = angle / tickCount;

        if (reverse) {
            pos += angle;
            step = -step;
        }

        var positions = [];
        for (var i = 0; i < tickCount; i++) {
            positions.push(round(pos, COORD_PRECISION));
            pos += step;
        }

        if (round(pos) <= ring.endAngle) {
            positions.push(pos);
        }

        return positions;
    };

    RadialScale.prototype.radius = function radius (value) {
        if (value) {
            this.arc.setRadiusX(value).setRadiusY(value);
            this.repositionTicks(this.majorTicks.children, this.majorTickAngles);
            this.repositionTicks(this.minorTicks.children, this.minorTickAngles, true);
        } else {
            return this.arc.getRadiusX();
        }
    };

    RadialScale.prototype.repositionTicks = function repositionTicks (ticks, tickAngles, minor) {
        var diff = minor ? (this._tickDifference || 0) : 0;
        var tickArc = this.arc;
        var radius = tickArc.getRadiusX();

        if (minor && this.options.labels.position === OUTSIDE && diff !== 0) {
            tickArc = this.arc.clone();
            tickArc.setRadiusX(radius - diff).setRadiusY(radius - diff);
        }

        for (var i = 0; i < ticks.length; i++) {
            var newPoint = tickArc.pointAt(tickAngles[i]);
            var segments = ticks[i].segments;
            var xDiff = newPoint.x - segments[0].anchor().x;
            var yDiff = newPoint.y - segments[0].anchor().y;

            ticks[i].transform(new geo.transform().translate(xDiff, yDiff));
        }
    };

    return RadialScale;
}(NumericAxis));

setDefaultOptions(RadialScale, {
    min: 0,
    max: 100,

    majorTicks: {
        size: 15,
        align: INSIDE,
        color: BLACK,
        width: DEFAULT_LINE_WIDTH,
        visible: true
    },

    minorTicks: {
        size: 10,
        align: INSIDE,
        color: BLACK,
        width: DEFAULT_LINE_WIDTH,
        visible: true
    },

    startAngle: -30,
    endAngle: 210,

    labels: {
        position: INSIDE,
        padding: 2
    }
});

export default RadialScale;