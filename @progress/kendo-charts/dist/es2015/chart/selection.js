import { DomEventsBuilder } from '../services';

import { DateCategoryAxis, Point } from '../core';

import { MOUSEWHEEL_DELAY, MOUSEWHEEL, SELECT_START, SELECT, SELECT_END } from './constants';

import { LEFT, RIGHT, MIN_VALUE, MAX_VALUE } from '../common/constants';
import { addClass, Class, removeClass, deepExtend, elementStyles, eventElement, setDefaultOptions, limitValue, round, bindEvents, unbindEvents, mousewheelDelta, hasClasses } from '../common';
import { parseDate } from '../date-utils';

const ZOOM_ACCELERATION = 3;
const SELECTOR_HEIGHT_ADJUST = 0.1;

function createDiv(className) {
    const element = document.createElement("div");
    if (className) {
        element.className = className;
    }

    return element;
}

function closestHandle(element) {
    let current = element;
    while (current && !hasClasses(current, "k-handle")) {
        current = current.parentNode;
    }

    return current;
}

class Selection extends Class {
    constructor(chart, categoryAxis, options, observer) {
        super();

        const chartElement = chart.element;

        this.options = deepExtend({}, this.options, options);
        this.chart = chart;
        this.observer = observer;
        this.chartElement = chartElement;
        this.categoryAxis = categoryAxis;
        this._dateAxis = this.categoryAxis instanceof DateCategoryAxis;

        this.initOptions();

        this.visible = this.options.visible && chartElement.offsetHeight;

        if (this.visible) {
            this.createElements();

            this.set(this._index(this.options.from), this._index(this.options.to));

            this.bindEvents();
        }
    }

    onPane(pane) {
        return this.categoryAxis.pane === pane;
    }

    createElements() {
        const options = this.options;
        const wrapper = this.wrapper = createDiv("k-selector");
        elementStyles(wrapper, {
            top: options.offset.top,
            left: options.offset.left,
            width: options.width,
            height: options.height,
            direction: 'ltr'
        });
        const selection = this.selection = createDiv("k-selection");
        this.leftMask = createDiv("k-mask");
        this.rightMask = createDiv("k-mask");

        wrapper.appendChild(this.leftMask);
        wrapper.appendChild(this.rightMask);
        wrapper.appendChild(selection);

        selection.appendChild(createDiv("k-selection-bg"));

        const leftHandle = this.leftHandle = createDiv("k-handle k-left-handle");
        const rightHandle = this.rightHandle = createDiv("k-handle k-right-handle");
        leftHandle.appendChild(createDiv());
        rightHandle.appendChild(createDiv());

        selection.appendChild(leftHandle);
        selection.appendChild(rightHandle);

        this.chartElement.appendChild(wrapper);
        const selectionStyles = elementStyles(selection, [ "borderLeftWidth", "borderRightWidth", "height" ]);
        const leftHandleHeight = elementStyles(leftHandle, "height").height;
        const rightHandleHeight = elementStyles(rightHandle, "height").height;

        options.selection = {
            border: {
                left: selectionStyles.borderLeftWidth,
                right: selectionStyles.borderRightWidth
            }
        };

        elementStyles(leftHandle, {
            top: (selectionStyles.height - leftHandleHeight) / 2
        });

        elementStyles(rightHandle, {
            top: (selectionStyles.height - rightHandleHeight) / 2
        });

        wrapper.style.cssText = wrapper.style.cssText;
    }

    bindEvents() {
        if (this.options.mousewheel !== false) {
            this._mousewheelHandler = this._mousewheel.bind(this);
            bindEvents(this.wrapper, {
                [ MOUSEWHEEL ]: this._mousewheelHandler
            });
        }

        this._domEvents = DomEventsBuilder.create(this.wrapper, {
            stopPropagation: true, // applicable for the jQuery UserEvents
            start: this._start.bind(this),
            move: this._move.bind(this),
            end: this._end.bind(this),
            tap: this._tap.bind(this),
            press: this._press.bind(this),
            gesturestart: this._gesturestart.bind(this),
            gesturechange: this._gesturechange.bind(this),
            gestureend: this._gestureend.bind(this)
        });
    }

    initOptions() {
        const { options, categoryAxis } = this;
        const box = categoryAxis.pane.chartsBox();
        const intlService = this.chart.chartService.intl;

        if (this._dateAxis) {
            deepExtend(options, {
                min: parseDate(intlService, options.min),
                max: parseDate(intlService, options.max),
                from: parseDate(intlService, options.from),
                to: parseDate(intlService, options.to)
            });
        }

        const { paddingLeft, paddingTop } = elementStyles(this.chartElement, [ "paddingLeft", "paddingTop" ]);

        this.options = deepExtend({}, {
            width: box.width(),
            height: box.height() + SELECTOR_HEIGHT_ADJUST, //workaround for sub-pixel hover on the paths in chrome
            padding: {
                left: paddingLeft,
                top: paddingTop
            },
            offset: {
                left: box.x1 + paddingLeft,
                top: box.y1 + paddingTop
            },
            from: options.min,
            to: options.max
        }, options);
    }

    destroy() {
        if (this._domEvents) {
            this._domEvents.destroy();
            delete this._domEvents;
        }

        clearTimeout(this._mwTimeout);
        this._state = null;

        if (this.wrapper) {
            if (this._mousewheelHandler) {
                unbindEvents(this.wrapper, {
                    [ MOUSEWHEEL ]: this._mousewheelHandler
                });
                this._mousewheelHandler = null;
            }
            this.chartElement.removeChild(this.wrapper);
            this.wrapper = null;
        }
    }

    _rangeEventArgs(range) {

        return {
            axis: this.categoryAxis.options,
            from: this._value(range.from),
            to: this._value(range.to)
        };
    }

    _start(e) {
        const options = this.options;
        const target = eventElement(e);

        if (this._state || !target) {
            return;
        }

        this.chart._unsetActivePoint();
        this._state = {
            moveTarget: closestHandle(target) || target,
            startLocation: e.x ? e.x.location : 0,
            range: {
                from: this._index(options.from),
                to: this._index(options.to)
            }
        };

        const args = this._rangeEventArgs({
            from: this._index(options.from),
            to: this._index(options.to)
        });

        if (this.trigger(SELECT_START, args)) {
            this._state = null;
        }
    }

    _press(e) {
        let handle;
        if (this._state) {
            handle = this._state.moveTarget;
        } else {
            handle = closestHandle(eventElement(e));
        }
        if (handle) {
            addClass(handle, "k-handle-active");
        }
    }

    _move(e) {
        if (!this._state) {
            return;
        }

        const { _state: state, options, categoryAxis } = this;
        const { range, moveTarget: target } = state;
        const reverse = categoryAxis.options.reverse;
        const from = this._index(options.from);
        const to = this._index(options.to);
        const min = this._index(options.min);
        const max = this._index(options.max);
        const delta = state.startLocation - e.x.location;
        const oldRange = { from: range.from, to: range.to };
        const span = range.to - range.from;
        const scale = elementStyles(this.wrapper, "width").width / (categoryAxis.categoriesCount() - 1);
        const offset = Math.round(delta / scale) * (reverse ? -1 : 1);

        if (!target) {
            return;
        }

        const leftHandle = hasClasses(target, "k-left-handle");
        const rightHandle = hasClasses(target, "k-right-handle");

        if (hasClasses(target, "k-selection k-selection-bg")) {
            range.from = Math.min(
                Math.max(min, from - offset),
                max - span
            );
            range.to = Math.min(
                range.from + span,
                max
            );
        } else if ((leftHandle && !reverse) || (rightHandle && reverse)) {
            range.from = Math.min(
                Math.max(min, from - offset),
                max - 1
            );
            range.to = Math.max(range.from + 1, range.to);
        } else if ((leftHandle && reverse) || (rightHandle && !reverse)) {
            range.to = Math.min(
                Math.max(min + 1, to - offset),
                max
            );
            range.from = Math.min(range.to - 1, range.from);
        }

        if (range.from !== oldRange.from || range.to !== oldRange.to) {
            this.move(range.from, range.to);
            this.trigger(SELECT, this._rangeEventArgs(range));
        }
    }

    _end() {
        if (this._state) {
            const moveTarget = this._state.moveTarget;
            if (moveTarget) {
                removeClass(moveTarget, "k-handle-active");
            }

            const range = this._state.range;
            this.set(range.from, range.to);
            this.trigger(SELECT_END, this._rangeEventArgs(range));

            delete this._state;
        }
    }

    _tap(e) {
        const { options, categoryAxis } = this;
        const coords = this.chart._eventCoordinates(e);
        const categoryIx = categoryAxis.pointCategoryIndex(new Point(coords.x, categoryAxis.box.y1));
        const from = this._index(options.from);
        const to = this._index(options.to);
        const min = this._index(options.min);
        const max = this._index(options.max);
        const span = to - from;
        const mid = from + span / 2;
        const range = {};
        const rightClick = e.event.which === 3;
        let offset = Math.round(mid - categoryIx);

        if (this._state || rightClick) {
            return;
        }


        this.chart._unsetActivePoint();

        if (!categoryAxis.options.justified) {
            offset--;
        }

        range.from = Math.min(
            Math.max(min, from - offset),
            max - span
        );

        range.to = Math.min(range.from + span, max);

        this._start(e);
        if (this._state) {
            this._state.range = range;
            this.trigger(SELECT, this._rangeEventArgs(range));
            this._end();
        }
    }

    _mousewheel(e) {
        let delta = mousewheelDelta(e);

        this._start({ target: this.selection });

        if (this._state) {
            const range = this._state.range;

            e.preventDefault();
            e.stopPropagation();

            if (Math.abs(delta) > 1) {
                delta *= ZOOM_ACCELERATION;
            }

            if (this.options.mousewheel.reverse) {
                delta *= -1;
            }

            if (this.expand(delta)) {
                this.trigger(SELECT, {
                    axis: this.categoryAxis.options,
                    delta: delta,
                    originalEvent: e,
                    from: this._value(range.from),
                    to: this._value(range.to)
                });
            }

            if (this._mwTimeout) {
                clearTimeout(this._mwTimeout);
            }

            this._mwTimeout = setTimeout(() => {
                this._end();
            }, MOUSEWHEEL_DELAY);
        }
    }

    _gesturestart(e) {
        const options = this.options;

        this._state = {
            range: {
                from: this._index(options.from),
                to: this._index(options.to)
            }
        };
        const args = this._rangeEventArgs(this._state.range);

        if (this.trigger(SELECT_START, args)) {
            this._state = null;
        } else {
            e.preventDefault();
        }
    }

    _gestureend() {
        if (this._state) {
            this.trigger(SELECT_END, this._rangeEventArgs(this._state.range));
            delete this._state;
        }
    }

    _gesturechange(e) {
        const { chart, _state: state, options, categoryAxis } = this;
        const range = state.range;
        const p0 = chart._toModelCoordinates(e.touches[0].x.location).x;
        const p1 = chart._toModelCoordinates(e.touches[1].x.location).x;
        const left = Math.min(p0, p1);
        const right = Math.max(p0, p1);

        e.preventDefault();

        range.from = categoryAxis.pointCategoryIndex(new Point(left)) || options.min;

        range.to = categoryAxis.pointCategoryIndex(new Point(right)) || options.max;

        this.move(range.from, range.to);

        this.trigger(SELECT, this._rangeEventArgs(range));
    }

    _index(value) {
        let index = value;

        if (value instanceof Date) {
            index = this.categoryAxis.categoryIndex(value);
        }

        return index;
    }

    _value(index) {
        let value = index;
        if (this._dateAxis) {
            value = this.categoryAxis.categoryAt(index);
            if (value > this.options.max) {
                value = this.options.max;
            }
        }

        return value;
    }

    _slot(value) {
        const categoryAxis = this.categoryAxis;
        const index = this._index(value);

        return categoryAxis.getSlot(index, index, true);
    }

    move(from, to) {
        const options = this.options;
        const reverse = this.categoryAxis.options.reverse;
        const { offset, padding, selection: { border } } = options;
        const left = reverse ? to : from;
        const right = reverse ? from : to;
        const edge = 'x' + (reverse ? 2 : 1);

        let box = this._slot(left);
        const leftMaskWidth = round(box[edge] - offset.left + padding.left);

        elementStyles(this.leftMask, {
            width: leftMaskWidth
        });
        elementStyles(this.selection, {
            left: leftMaskWidth
        });

        box = this._slot(right);

        const rightMaskWidth = round(options.width - (box[edge] - offset.left + padding.left));
        elementStyles(this.rightMask, {
            width: rightMaskWidth
        });

        let distance = options.width - rightMaskWidth;
        if (distance !== options.width) {
            distance += border.right;
        }

        elementStyles(this.rightMask, {
            left: distance
        });
        elementStyles(this.selection, {
            width: Math.max(options.width - (leftMaskWidth + rightMaskWidth) - border.right, 0)
        });
    }

    set(from, to) {
        const options = this.options;
        const min = this._index(options.min);
        const max = this._index(options.max);
        const fromValue = limitValue(this._index(from), min, max);
        const toValue = limitValue(this._index(to), fromValue + 1, max);

        if (options.visible) {
            this.move(fromValue, toValue);
        }

        options.from = this._value(fromValue);
        options.to = this._value(toValue);
    }

    expand(delta) {
        const options = this.options;
        const min = this._index(options.min);
        const max = this._index(options.max);
        const zDir = options.mousewheel.zoom;
        const from = this._index(options.from);
        const to = this._index(options.to);
        let range = { from: from, to: to };
        const oldRange = deepExtend({}, range);

        if (this._state) {
            range = this._state.range;
        }

        if (zDir !== RIGHT) {
            range.from = limitValue(
                limitValue(from - delta, 0, to - 1),
                min, max
            );
        }

        if (zDir !== LEFT) {
            range.to = limitValue(
                limitValue(to + delta, range.from + 1, max),
                min,
                max
             );
        }

        if (range.from !== oldRange.from || range.to !== oldRange.to) {
            this.set(range.from, range.to);
            return true;
        }
    }

    trigger(name, args) {
        return (this.observer || this.chart).trigger(name, args);
    }
}

setDefaultOptions(Selection, {
    visible: true,
    mousewheel: {
        zoom: "both"
    },
    min: MIN_VALUE,
    max: MAX_VALUE
});

export default Selection;
