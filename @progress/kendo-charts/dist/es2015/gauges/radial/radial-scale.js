import { geometry as geo, drawing } from '@progress/kendo-drawing';
import { setDefaultOptions, deepExtend, defined, round } from '../../common';
import { BLACK, COORD_PRECISION } from '../../common/constants';
import { autoMajorUnit, Box, NumericAxis } from '../../core';
import { buildLabelElement, getRange } from '../utils';

import { DEGREE, DEFAULT_LINE_WIDTH, INSIDE, OUTSIDE } from '../constants';

const GEO_ARC_ADJUST_ANGLE = 180;

const { Arc, Path, Group } = drawing;

function drawTicks(arc, tickAngles, unit, tickOptions) {
    const ticks = new Group();
    const center = arc.center;
    const radius = arc.getRadiusX();

    if (tickOptions.visible) {
        for (let i = 0; i < tickAngles.length; i++) {
            const tickStart = arc.pointAt(tickAngles[i]);
            const tickEnd = new geo.Point(center.x + radius - tickOptions.size, center.y).rotate(tickAngles[i], center);

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

class RadialScale extends NumericAxis {
    constructor(options, service) {
        super(0, 1, options, service);
    }

    initUserOptions(options) {
        const scaleOptions = deepExtend({}, this.options, options);
        scaleOptions.majorUnit = scaleOptions.majorUnit || autoMajorUnit(scaleOptions.min, scaleOptions.max);
        scaleOptions.minorUnit = scaleOptions.minorUnit || scaleOptions.majorUnit / 10;

        return scaleOptions;
    }

    initFields() {
    }

    render(center, radius) {
        const arc = this.renderArc(center, radius);

        this.bbox = arc.bbox();
        this.labelElements = this.renderLabels();
        this.ticks = this.renderTicks();
        this.ranges = this.renderRanges();
    }

    reflow(bbox) {
        const center = bbox.center();
        const radius = Math.min(bbox.height(), bbox.width()) / 2;

        if (defined(this.bbox)) {
            this.bbox = this.arc.bbox();
            this.radius(this.arc.getRadiusX());
            this.repositionRanges();
            this.renderLabels();
        } else {
            return this.render(center, radius);
        }
    }

    slotAngle(value) {
        const { min, max, reverse, startAngle, endAngle } = this.options;
        const angle = endAngle - startAngle;
        let result;

        if (reverse) {
            result = endAngle - (value - min) / (max - min) * angle;
        } else {
            result = ((value - min) / (max - min) * angle) + startAngle;
        }

        return result + GEO_ARC_ADJUST_ANGLE;
    }

    hasRanges() {
        const ranges = this.options.ranges;

        return ranges && ranges.length;
    }

    ticksSize() {
        const { majorTicks, minorTicks } = this.options;
        let size = 0;
        if (majorTicks.visible) {
            size = majorTicks.size;
        }

        if (minorTicks.visible) {
            size = Math.max(minorTicks.size, size);
        }

        return size;
    }

    renderLabels() {
        const options = this.options;
        const arc = this.arc.clone();
        let radius = arc.getRadiusX();
        const tickAngles = this.tickAngles(arc, options.majorUnit);
        const rangeSize = options.rangeSize = options.rangeSize || radius * 0.1;
        const labelsGroup = new Group();

        let rangeDistance = radius * 0.05;
        if (defined(options.rangeDistance)) {
            rangeDistance = options.rangeDistance;
        } else {
            options.rangeDistance = rangeDistance;
        }

        const labelsOptions = options.labels;
        const isInside = labelsOptions.position === INSIDE;
        const hasLabelElements = defined(this.labelElements);

        if (isInside) {
            radius -= this.ticksSize();

            if (this.hasRanges() && !hasLabelElements) {
                radius -= rangeSize + rangeDistance;
            }
            arc.setRadiusX(radius).setRadiusY(radius);
        }

        const labels = this.labels;
        const count = labels.length;
        const padding = labelsOptions.padding;

        for (let i = 0; i < count; i++) {
            const label = labels[i];
            const halfWidth = label.box.width() / 2;
            const halfHeight = label.box.height() / 2;
            const angle = tickAngles[i];
            const labelAngle = (angle - GEO_ARC_ADJUST_ANGLE) * DEGREE;

            const lp = arc.pointAt(angle);
            const cx = lp.x + (Math.cos(labelAngle) * (halfWidth + padding) * (isInside ? 1 : -1));
            const cy = lp.y + (Math.sin(labelAngle) * (halfHeight + padding) * (isInside ? 1 : -1));

            label.reflow(new Box(cx - halfWidth, cy - halfHeight, cx + halfWidth, cy + halfHeight));
            const labelPos = new geo.Point(label.box.x1, label.box.y1);

            let labelElement;
            if (!hasLabelElements) {
                labelElement = buildLabelElement(label, options.labels);
                labelsGroup.append(labelElement);
            } else {
                labelElement = this.labelElements.children[i];
                const prevLabelPos = labelElement.bbox().origin;

                const labelTransform = labelElement.transform() || geo.transform();
                labelTransform.translate(labelPos.x - prevLabelPos.x, labelPos.y - prevLabelPos.y);
                labelElement.transform(labelTransform);
            }

            this.bbox = geo.Rect.union(this.bbox, labelElement.bbox());
        }

        return labelsGroup;
    }

    repositionRanges() {
        const ranges = this.ranges.children;

        if (ranges.length > 0) {
            const { rangeDistance, rangeSize } = this.options;
            let rangeRadius = this.getRangeRadius();

            if (this.options.labels.position === INSIDE) {
                rangeRadius += rangeSize + rangeDistance;
            }

            const newRadius = rangeRadius + (rangeSize / 2);

            for (let i = 0; i < ranges.length; i++) {
                ranges[i]._geometry.setRadiusX(newRadius).setRadiusY(newRadius);
            }

            this.bbox = geo.Rect.union(this.bbox, this.ranges.bbox());
        }
    }

    renderRanges() {
        const segments = this.rangeSegments();
        const segmentsCount = segments.length;
        const result = new Group();

        if (segmentsCount) {
            const { rangeSize, reverse, rangeDistance } = this.options;
            const rangeRadius = this.getRangeRadius();

            // move the ticks with a range distance and a range size
            this.radius(this.radius() - rangeSize - rangeDistance);

            for (let i = 0; i < segmentsCount; i++) {
                const segment = segments[i];
                const from = this.slotAngle(segment[reverse ? "to" : "from"]);
                const to = this.slotAngle(segment[!reverse ? "to" : "from"]);

                if (to - from !== 0) {
                    result.append(this.createRange(from, to, rangeRadius, segment));
                }
            }
        }

        return result;
    }

    createRange(startAngle, endAngle, rangeRadius, options) {
        const rangeSize = this.options.rangeSize;
        const rangeGeom = new geo.Arc(this.arc.center, {
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
    }

    rangeSegments() {
        const options = this.options;
        const ranges = options.ranges || [];
        const count = ranges.length;
        const segments = [];

        if (count) {
            const { min, max, rangePlaceholderColor: defaultColor } = options;
            segments.push(rangeSegment(min, max, defaultColor));

            for (let i = 0; i < count; i++) {
                const range = getRange(ranges[i], min, max);
                const segmentsCount = segments.length;

                for (let j = 0; j < segmentsCount; j++) {
                    const segment = segments[j];

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
    }

    getRangeRadius() {
        const { arc, options } = this;
        const { rangeSize, rangeDistance, majorTicks: { size: majorTickSize } } = options;
        let radius;

        if (options.labels.position === OUTSIDE) {
            radius = arc.getRadiusX() - majorTickSize - rangeDistance - rangeSize;
        } else {
            radius = arc.getRadiusX() - rangeSize;
        }

        return radius;
    }

    renderArc(center, radius) {
        const options = this.options;

        const arc = this.arc = new geo.Arc(center, {
            radiusX: radius,
            radiusY: radius,
            startAngle: options.startAngle + GEO_ARC_ADJUST_ANGLE,
            endAngle: options.endAngle + GEO_ARC_ADJUST_ANGLE
        });

        return arc;
    }

    renderTicks() {
        const { arc, options } = this;
        const tickArc = arc.clone();

        this.majorTickAngles = this.tickAngles(arc, options.majorUnit);
        this.majorTicks = drawTicks(tickArc, this.majorTickAngles, options.majorUnit, options.majorTicks);

        const allTicks = new Group();
        allTicks.append(this.majorTicks);

        const majorTickSize = options.majorTicks.size;
        const minorTickSize = options.minorTicks.size;

        this._tickDifference = majorTickSize - minorTickSize;

        if (options.labels.position === OUTSIDE) {
            const radius = tickArc.getRadiusX();
            tickArc.setRadiusX(radius - majorTickSize + minorTickSize)
                   .setRadiusY(radius - majorTickSize + minorTickSize);
        }

        this.minorTickAngles = this.normalizeTickAngles(this.tickAngles(arc, options.minorUnit));
        this.minorTicks = drawTicks(tickArc, this.minorTickAngles, options.minorUnit, options.minorTicks);
        allTicks.append(this.minorTicks);

        return allTicks;
    }

    normalizeTickAngles(angles) {
        const options = this.options;
        const skip = options.majorUnit / options.minorUnit;

        for (let i = angles.length - 1; i >= 0; i--) {
            if (i % skip === 0) {
                angles.splice(i, 1);
            }
        }

        return angles;
    }

    tickAngles(ring, stepValue) {
        const options = this.options;
        const reverse = options.reverse;
        const range = options.max - options.min;
        const angle = ring.endAngle - ring.startAngle;
        const tickCount = range / stepValue;
        let pos = ring.startAngle;
        let step = angle / tickCount;

        if (reverse) {
            pos += angle;
            step = -step;
        }

        const positions = [];
        for (let i = 0; i < tickCount; i++) {
            positions.push(round(pos, COORD_PRECISION));
            pos += step;
        }

        if (round(pos) <= ring.endAngle) {
            positions.push(pos);
        }

        return positions;
    }

    radius(value) {
        if (value) {
            this.arc.setRadiusX(value).setRadiusY(value);
            this.repositionTicks(this.majorTicks.children, this.majorTickAngles);
            this.repositionTicks(this.minorTicks.children, this.minorTickAngles, true);
        } else {
            return this.arc.getRadiusX();
        }
    }

    repositionTicks(ticks, tickAngles, minor) {
        const diff = minor ? (this._tickDifference || 0) : 0;
        let tickArc = this.arc;
        const radius = tickArc.getRadiusX();

        if (minor && this.options.labels.position === OUTSIDE && diff !== 0) {
            tickArc = this.arc.clone();
            tickArc.setRadiusX(radius - diff).setRadiusY(radius - diff);
        }

        for (let i = 0; i < ticks.length; i++) {
            const newPoint = tickArc.pointAt(tickAngles[i]);
            const segments = ticks[i].segments;
            const xDiff = newPoint.x - segments[0].anchor().x;
            const yDiff = newPoint.y - segments[0].anchor().y;

            ticks[i].transform(new geo.transform().translate(xDiff, yDiff));
        }
    }
}

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