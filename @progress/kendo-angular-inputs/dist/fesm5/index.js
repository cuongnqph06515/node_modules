/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { __extends, __assign } from 'tslib';
import { isDevMode, Directive, TemplateRef, Optional, Input, Output, HostBinding, ViewChild, ElementRef, ContentChild, EventEmitter, Component, forwardRef, Injector, Renderer2, NgZone, ChangeDetectorRef, Inject, Injectable, HostListener, ViewChildren, NgModule, ViewContainerRef, ContentChildren } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, RadioControlValueAccessor } from '@angular/forms';
import { Subscription, fromEvent, interval, merge, Observable } from 'rxjs';
import { take, filter, concatMap, startWith, takeUntil, skip, debounceTime } from 'rxjs/operators';
import { LocalizationService, L10N_PREFIX, RTL, ComponentMessages } from '@progress/kendo-angular-l10n';
import { Keys, guid, hasObservers, anyChanged, isDocumentAvailable, KendoInput, isChanged, DraggableModule, EventsModule, ResizeSensorModule } from '@progress/kendo-angular-common';
import { browser, mobileOS } from '@progress/kendo-common';
import { IntlService } from '@progress/kendo-angular-intl';
import { CommonModule } from '@angular/common';
import { PopupService, PopupModule } from '@progress/kendo-angular-popup';
import { Color, parseColor, namedColors } from '@progress/kendo-drawing';

/**
 * @hidden
 *
 * Checks if the value is `null` or `undefined`. Falsy values like '', 0, false, NaN, etc. are regarded as present.
 */
var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
var areSame = function (value1, value2) {
    return value1 === value2 || (value1 === null && value2 === undefined) || (value1 === undefined && value2 === null);
};
/**
 * @hidden
 */
var requiresZoneOnBlur = function (ngControl) { return ngControl &&
    (!ngControl.touched || (ngControl.control && ngControl.control.updateOn === 'blur')); };
/**
 * @hidden
 *
 * Fits the contender number into the specified bounds. If the number is NaN or null, the min is returned.
 *
 * @param contender Represents the number you want to fit into specified bounds.
 * @param min The inclusive lower bound number.
 * @param max The inclusive upper bound number.
 */
var fitIntoBounds = function (contender, min, max) {
    if (!isPresent(contender) || isNaN(contender)) {
        return min;
    }
    return contender <= min ? min : contender >= max ? max : contender;
};

/**
 * @hidden
 */
var MAX_PRECISION = 20;
/**
 * @hidden
 */
var limitPrecision = function (precision) { return Math.min(precision, MAX_PRECISION); };
/**
 * @hidden
 */
var fractionLength = function (value) {
    return (String(value).split('.')[1] || "").length;
};
var maxFractionLength = function (value1, value2) {
    return Math.max(fractionLength(value1), fractionLength(value2));
};
/**
 * @hidden
 */
var toFixedPrecision = function (value, precision) {
    var maxPrecision = limitPrecision(precision);
    return parseFloat(value.toFixed(maxPrecision));
};
/**
 * @hidden
 */
var add = function (value1, value2) {
    var maxPrecision = maxFractionLength(value1, value2);
    return toFixedPrecision(value1 + value2, maxPrecision);
};
/**
 * @hidden
 */
var subtract = function (value1, value2) {
    return add(value1, -value2);
};
/**
 * @hidden
 */
var multiply = function (value1, value2) {
    var maxPrecision = fractionLength(value1) + fractionLength(value2);
    return toFixedPrecision(value1 * value2, maxPrecision);
};
/**
 * @hidden
 */
var divide = function (dividend, divisor) {
    if (divisor === 0) {
        return NaN;
    }
    var power = maxFractionLength(dividend, divisor);
    var correctionValue = Math.pow(10, power);
    return ((correctionValue * dividend) / (correctionValue * divisor));
};
/**
 * @hidden
 */
var remainder = function (dividend, divisor) {
    return Math.abs(subtract(dividend, multiply(divisor, Math.floor(divide(dividend, divisor)))));
};

/**
 * @hidden
 */
var calculateFixedTrackSize = function (_a) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, fixedTickWidth = _a.fixedTickWidth;
    return ((max - min) / smallStep) * fixedTickWidth;
};
/**
 * @hidden
 */
var calculateTrackSize = function (wrapperWidth, offset, showButtons) {
    if (showButtons === void 0) { showButtons = true; }
    var BUTTONS_COUNT = 2;
    var trackOffset = showButtons ? parseFloat(offset) * BUTTONS_COUNT : 0;
    var trackWidth = wrapperWidth - trackOffset;
    return Math.floor(trackWidth);
};
/**
 * @hidden
 */
var calculateTicksCount = function (min, max, smallStep) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 0; }
    if (smallStep === void 0) { smallStep = 1; }
    if (smallStep <= 0) {
        throw new Error('Invalid argument: smallStep must be a positive number');
    }
    var adjustedRange = Math.abs(subtract(max, min));
    var adjustedRatio = Math.floor(divide(adjustedRange, smallStep));
    var result = add(adjustedRatio, 1);
    return result;
};
/**
 * @hidden
 */
var calculateValueFromTick = function (index, _a) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, reverse = _a.reverse, vertical = _a.vertical;
    var value = add(min, multiply(index, smallStep));
    return vertical || reverse ? Math.abs(subtract(value, max)) : value;
};
/**
 * @hidden
 */
var calculateHandlePosition = function (_a) {
    var handleWidth = _a.handleWidth, trackWidth = _a.trackWidth, min = _a.min, max = _a.max, reverse = _a.reverse, value = _a.value;
    var halfHandleWidth = Math.floor(handleWidth / 2);
    var step = trackWidth / Math.abs(max - min);
    var pos = isPresent(value) ? step * (value - min) : min;
    if (reverse) {
        pos = trackWidth - pos;
    }
    return Math.floor(pos - halfHandleWidth);
};
/**
 * @hidden
 */
var decreaseValueToStep = function (value, _a, large) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, largeStep = _a.largeStep;
    if (large === void 0) { large = false; }
    var step = large && largeStep ? multiply(smallStep, largeStep) : smallStep;
    var stepValue = subtract(value, min);
    var result;
    var stepRemainder = remainder(stepValue, step);
    if (stepRemainder === 0) {
        result = subtract(stepValue, step);
    }
    else {
        result = subtract(stepValue, stepRemainder);
    }
    return limitValue(add(result, min), min, max);
};
/**
 * @hidden
 */
var increaseValueToStep = function (value, _a, large) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, largeStep = _a.largeStep;
    if (large === void 0) { large = false; }
    var step = large && largeStep ? multiply(smallStep, largeStep) : smallStep;
    var stepValue = subtract(value, min);
    var stepRemainder = remainder(stepValue, step);
    var result = add(subtract(stepValue, stepRemainder), step);
    return limitValue(add(result, min), min, max);
};
/**
 * @hidden
 */
var isStartHandle = function (dragHandle) { return dragHandle.id.indexOf('k-start-handle') > -1; };
/**
 * @hidden
 */
var snapValue = function (value, options) {
    var smallStep = options.smallStep, min = options.min, max = options.max;
    var limited = limitValue(value, min, max);
    if (value !== limited) {
        return limited;
    }
    var left = decreaseValueToStep(value, options);
    var right = increaseValueToStep(value, options);
    if ((value - min) % smallStep === 0) {
        return value;
    }
    if (right - value <= (right - left) / 2) {
        return right;
    }
    return left;
};
/**
 * @hidden
 */
var trimValue = function (max, min, value) {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
};
/**
 * @hidden
 */
var trimValueRange = function (max, min, value) {
    return value ? [trimValue(max, min, value[0]), trimValue(max, min, value[1])] : [min, min];
};
/**
 * @hidden
 */
var identity = function (value) { return value; };
/**
 * @hidden
 */
var isSameRange = function (value1, value2) {
    return areSame(value1[0], value2[0]) && areSame(value1[1], value2[1]);
};
/**
 * @hidden
 */
var elementOffset = function (element) {
    var box = element.getBoundingClientRect();
    var documentElement = document.documentElement;
    return {
        left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0),
        top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0)
    };
};
/**
 * @hidden
 */
var limitValue = function (value, min, max) {
    return Math.max(Math.min(value, max), min);
};
/**
 * @hidden
 */
var eventValue = function (eventArgs, scaleElement, options) {
    var min = options.min, max = options.max, vertical = options.vertical, rtl = options.rtl;
    var trackOffset = elementOffset(scaleElement);
    var offset = vertical ? eventArgs.pageY - trackOffset.top : eventArgs.pageX - trackOffset.left;
    var scale = (max - min) / (vertical ? scaleElement.clientHeight : scaleElement.clientWidth);
    var offsetValue = offset * scale;
    var value = rtl || vertical ? max - offsetValue : min + offsetValue;
    var stepFractionLength = fractionLength(options.smallStep);
    value = toFixedPrecision(value, stepFractionLength + 1);
    return snapValue(value, options);
};
/**
 * @hidden
 */
var isButton = function (element) {
    return element.className.indexOf('k-button-increase') >= 0 || element.className.indexOf('k-button-decrease') >= 0;
};
/**
 * @hidden
 */
var increment = function (options) {
    return increaseValueToStep(options.value, options);
};
/**
 * @hidden
 */
var decrement = function (options) {
    return decreaseValueToStep(options.value, options);
};
/**
 * @hidden
 */
var incrementLarge = function (options) {
    return increaseValueToStep(options.value, options, true);
};
/**
 * @hidden
 */
var decrementLarge = function (options) {
    return decreaseValueToStep(options.value, options, true);
};
/**
 * @hidden
 */
var validateValue = function (value) {
    if (isDevMode && value && value[0] > value[1]) {
        throw new Error('[RangeSlider] The start value should not be greater than the end value.');
    }
};

/**
 * @hidden
 */
var SliderModelBase = /** @class */ (function () {
    function SliderModelBase(props, wrapper, track, renderer) {
        this.props = props;
        this.wrapper = wrapper;
        this.track = track;
        this.renderer = renderer;
        this.props = props;
        this.wrapper = wrapper;
        this.track = track;
        this.tickSizes = this.getTickSizes();
    }
    SliderModelBase.prototype.resizeTrack = function () {
        var orientation = this.props.vertical ? 'height' : 'width';
        var trackWidth = this.trackWidth();
        this.track.style[orientation] = trackWidth + "px";
    };
    SliderModelBase.prototype.resizeTicks = function (ticksContainer, ticks) {
        var _this = this;
        var dimension = this.props.vertical ? "height" : "width";
        ticks.slice().map(function (tick, index) { return tick.style[dimension] = _this.tickSizes[index] + "px"; });
        if (this.props.vertical) {
            this.adjustPadding(ticksContainer);
        }
    };
    SliderModelBase.prototype.resizeWrapper = function () {
        var dimension = this.props.vertical ? "height" : "width";
        var wrapperSize = this.elementSize(this.wrapper);
        var trackWidth = calculateTrackSize(wrapperSize, this.elementOffset(this.track));
        var fixedTrackWidth = calculateFixedTrackSize(this.props);
        var wrapperParentEl = this.wrapper.parentElement;
        if (trackWidth > fixedTrackWidth) {
            wrapperParentEl.style[dimension] = wrapperSize - (trackWidth - fixedTrackWidth) + "px";
        }
        else {
            wrapperParentEl.style[dimension] = wrapperSize + (fixedTrackWidth - trackWidth) + "px";
        }
    };
    SliderModelBase.prototype.trackWidth = function () {
        if (this.props.fixedTickWidth) {
            return calculateFixedTrackSize(this.props);
        }
        return calculateTrackSize(this.elementSize(this.wrapper), this.elementOffset(this.track), this.props.buttons);
    };
    SliderModelBase.prototype.getTickSizes = function () {
        var _a = this.props, min = _a.min, max = _a.max, smallStep = _a.smallStep;
        var count = calculateTicksCount(min, max, smallStep);
        var trackSize = this.trackWidth();
        var distStep = trackSize / subtract(max, min);
        var result = [];
        var usedSpace = 0;
        var endPoint = 0;
        for (var i = 0; i < count; i++) {
            if (i === 0 || i === count - 1) {
                endPoint += (smallStep / 2) * distStep;
            }
            else {
                endPoint += smallStep * distStep;
            }
            // ensure that the sum of the tick sizes does not exceed the track width
            endPoint = +endPoint.toFixed(2) - 0.01;
            var size = Math.round(endPoint - usedSpace);
            result.push(size);
            usedSpace += size;
        }
        if (usedSpace >= trackSize) {
            result[result.length - 1] -= 1;
        }
        return result;
    };
    SliderModelBase.prototype.adjustPadding = function (ticksContainer) {
        var totalTickSize = this.tickSizes.reduce(function (prev, curr) { return prev + curr; }, 0);
        var trackWidth = this.trackWidth();
        var reminder = trackWidth - totalTickSize;
        if (reminder !== 0) {
            var padding = reminder + this.elementOffset(this.track);
            ticksContainer.style.paddingTop = padding + "px";
        }
    };
    SliderModelBase.prototype.elementOffset = function (element) {
        var vertical = this.props.vertical;
        var style = getComputedStyle(element);
        return parseInt(vertical ? style.bottom : style.left, 10);
    };
    SliderModelBase.prototype.elementSize = function (element) {
        var vertical = this.props.vertical;
        return vertical ? element.clientHeight : element.clientWidth;
    };
    return SliderModelBase;
}());

/**
 * @hidden
 */
var SliderModel = /** @class */ (function (_super) {
    __extends(SliderModel, _super);
    function SliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderModel.prototype.positionHandle = function (dragHandle) {
        var _a = this.props, max = _a.max, min = _a.min, reverse = _a.reverse, vertical = _a.vertical;
        var position = vertical ? 'bottom' : 'left';
        var trackWidth = this.trackWidth();
        var value = trimValue(max, min, this.props.value);
        this.handlePosition = calculateHandlePosition({
            min: min,
            max: max,
            reverse: reverse,
            value: value,
            trackWidth: trackWidth,
            handleWidth: dragHandle.offsetWidth
        });
        this.renderer.setStyle(dragHandle, position, this.handlePosition + "px");
    };
    SliderModel.prototype.positionSelection = function (dragHandle, selection) {
        var _a = this.props, reverse = _a.reverse, vertical = _a.vertical;
        var dimension = vertical ? 'height' : 'width';
        var handleWidth = Math.floor(dragHandle.offsetWidth / 2);
        var size = this.handlePosition + handleWidth;
        if (reverse) {
            size = this.trackWidth() - size;
        }
        this.renderer.setStyle(selection, dimension, size + "px");
    };
    return SliderModel;
}(SliderModelBase));

var UNTOUCHED = 'ng-untouched';
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var hasClass = function (element, className) {
    return Boolean(toClassList(element.className).find(function (name) { return name === className; }));
};
/**
 * @hidden
 */
function invokeElementMethod(element, name) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (element && element.nativeElement) {
        return element.nativeElement[name].apply(element.nativeElement, args);
    }
}
/**
 * @hidden
 */
var isUntouched = function (element) {
    return element && element.nativeElement && hasClass(element.nativeElement, UNTOUCHED);
};
/**
 * @hidden
 */
var containsFocus = function (hostElement, contender) {
    return hostElement && contender && (hostElement === contender || hostElement.contains(contender));
};
/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};

/**
 * Represents the template for the labels of the Slider.
 * To define the labels template, nest an `<ng-template>` tag with the `kendoSliderLabelTemplate` directive inside
 * the `<kendo-slider>` tag. The template context is passed to the `label` value.
 *
 * @example
 * ```ts-no-run
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-slider [largeStep]="2">
 *           <ng-template kendoSliderLabelTemplate let-value="value">
 *             <b>{{value}}</b>
 *           </ng-template>
 *         </kendo-slider>
 *     `
 * })
 *
 * class AppComponent {
 * }
 *
 * ```
 */
var LabelTemplateDirective = /** @class */ (function () {
    function LabelTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    LabelTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSliderLabelTemplate]'
                },] },
    ];
    /** @nocollapse */
    LabelTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return LabelTemplateDirective;
}());

/**
 * @hidden
 */
var SliderBase = /** @class */ (function () {
    function SliderBase(localizationService, injector, renderer, ngZone, changeDetector, hostElement) {
        var _this = this;
        this.localizationService = localizationService;
        this.injector = injector;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.hostElement = hostElement;
        /**
         * Defines the title of the ticks ([see example]({% slug ticks_slider %}#toc-titles)). The default title
         * for each tick is its Slider value. If you use a callback function, the function accepts an argument
         * that holds the value of the component and returns a string with the new title.
         */
        this.title = identity;
        /**
         * Denotes the location of the tick marks in the Slider ([see example]({% slug ticks_slider %}#toc-placement)).
         *
         * The available options are:
         * * `before`&mdash;The tick marks are located to the top side of the horizontal track or to the left side of a vertical track.
         * * `after`&mdash;The tick marks are located to the bottom side of the horizontal track or to the right side of the vertical track.
         * * `both`&mdash; (Default) The tick marks are located on both sides of the track.
         * * `none`&mdash;The tick marks are not visible. The actual elements are not added to the DOM tree.
         */
        this.tickPlacement = 'both';
        /**
         * If `vertical` is set to `true`, the orientation of the Slider changes from horizontal to vertical
         * ([see example]({% slug orientation_slider %})).
         */
        this.vertical = false;
        /**
         * The minimum value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
         * The attribute accepts both integers and floating-point numbers.
         */
        this.min = 0;
        /**
         * The maximum value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
         * The attribute accepts both integers and floating-point numbers.
         */
        this.max = 10;
        /**
         * The step value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
         * Accepts positive values only. Can be an integer or a floating-point number.
         */
        this.smallStep = 1;
        /**
         * Specifies that every n<sup>th</sup> tick will be large and will have a label
         * ([see example]({% slug predefinedsteps_slider %}#toc-large-steps)).
         * Accepts positive integer values only.
         */
        this.largeStep = null;
        /**
         * Determines whether the Slider is disabled ([see example]({% slug disabledstate_slider %})).
         */
        this.disabled = false;
        /**
         * Determines whether the Slider is in its read-only state ([see example]({% slug readonly_slider %})).
         */
        this.readonly = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the Slider.
         */
        this.tabindex = 0;
        /**
         * Fires each time the user focuses the component.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the component is blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new EventEmitter();
        this.sliderClass = true;
        this.widgetClass = true;
        this.subscriptions = new Subscription();
        /**
         * @hidden
         */
        this.ifEnabled = function (callback, event) {
            if (!_this.isDisabled) {
                callback.call(_this, event);
            }
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(SliderBase.prototype, "horizontalClass", {
        get: function () {
            return !this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderBase.prototype, "verticalClass", {
        get: function () {
            return this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderBase.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    SliderBase.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    SliderBase.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.localizationService
            .changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.sizeComponent();
        }));
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    };
    Object.defineProperty(SliderBase.prototype, "isDisabled", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled || this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the FloatingLabel to determine if the component is empty.
     */
    SliderBase.prototype.isEmpty = function () {
        return false;
    };
    Object.defineProperty(SliderBase.prototype, "reverse", {
        get: function () {
            return this.localizationService.rtl && !this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderBase.prototype, "keyBinding", {
        get: function () {
            var _a;
            var reverse = this.reverse;
            return _a = {},
                _a[Keys.ArrowLeft] = reverse ? increment : decrement,
                _a[Keys.ArrowRight] = reverse ? decrement : increment,
                _a[Keys.ArrowDown] = decrement,
                _a[Keys.ArrowUp] = increment,
                _a[Keys.PageUp] = incrementLarge,
                _a[Keys.PageDown] = decrementLarge,
                _a[Keys.Home] = function (_a) {
                    var min = _a.min;
                    return min;
                },
                _a[Keys.End] = function (_a) {
                    var max = _a.max;
                    return max;
                },
                _a;
        },
        enumerable: true,
        configurable: true
    });
    SliderBase.prototype.resetStyles = function (elements) {
        var _this = this;
        elements.forEach(function (el) {
            if (el) {
                if (_this.vertical) {
                    _this.renderer.removeStyle(el, 'width');
                    _this.renderer.removeStyle(el, 'left');
                    _this.renderer.removeStyle(el, 'right');
                }
                else {
                    _this.renderer.removeStyle(el, 'height');
                    _this.renderer.removeStyle(el, 'bottom');
                }
                _this.renderer.removeStyle(el, 'padding-top');
            }
        });
    };
    SliderBase.propDecorators = {
        title: [{ type: Input }],
        tickPlacement: [{ type: Input }],
        vertical: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        smallStep: [{ type: Input }],
        largeStep: [{ type: Input }],
        fixedTickWidth: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        tabindex: [{ type: Input }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        valueChange: [{ type: Output }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        horizontalClass: [{ type: HostBinding, args: ['class.k-slider-horizontal',] }],
        verticalClass: [{ type: HostBinding, args: ['class.k-slider-vertical',] }],
        sliderClass: [{ type: HostBinding, args: ['class.k-slider',] }],
        widgetClass: [{ type: HostBinding, args: ['class.k-widget',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        wrapper: [{ type: ViewChild, args: ['wrap', { static: true },] }],
        track: [{ type: ViewChild, args: ['track', { static: true },] }],
        sliderSelection: [{ type: ViewChild, args: ['sliderSelection', { static: true },] }],
        ticksContainer: [{ type: ViewChild, args: ['ticks', { read: ElementRef },] }],
        ticks: [{ type: ViewChild, args: ['ticks',] }],
        labelTemplate: [{ type: ContentChild, args: [LabelTemplateDirective,] }]
    };
    return SliderBase;
}());

var FOCUSED = 'k-state-focused';
var PRESSED = 'k-pressed';
/**
 * Represents the [Kendo UI Slider component for Angular]({% slug overview_slider %}).
 */
var SliderComponent = /** @class */ (function (_super) {
    __extends(SliderComponent, _super);
    function SliderComponent(localization, injector, renderer, ngZone, changeDetector, hostElement) {
        var _this = _super.call(this, localization, injector, renderer, ngZone, changeDetector, hostElement) || this;
        _this.localization = localization;
        _this.injector = injector;
        _this.renderer = renderer;
        _this.ngZone = ngZone;
        _this.changeDetector = changeDetector;
        _this.hostElement = hostElement;
        /**
         * @hidden
         */
        _this.focusableId = "k-" + guid();
        /**
         * Determines if the animation will be played on value change.
         * Regardless of this setting, no animation will be played during the initial rendering.
         */
        _this.animate = true;
        /**
         * Renders the arrow side buttons of the Slider ([see example]({% slug sidebuttons_slider %}#toc-hidden-state)).
         * When `showButtons` is set to `false`, the buttons are not displayed.
         */
        _this.showButtons = true;
        /**
         * The current value of the Slider when it is initially displayed.
         * The component can use either NgModel or the `value` binding but not both of them at the same time.
         */
        _this.value = _this.min;
        /**
         * @hidden
         */
        _this.handleFocus = function () {
            _this.focused = true;
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        _this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.onBlur.emit();
                });
            }
        };
        /**
         * @hidden
         */
        _this.onWrapClick = function (args) {
            var target = args.target;
            if (!_this.isDisabled && !(isButton(target) || isButton(target.parentNode))) {
                var value = eventValue(args, _this.track.nativeElement, _this.getProps());
                _this.changeValue(value);
            }
        };
        /**
         * @hidden
         */
        _this.onKeyDown = function (e) {
            var options = _this.getProps();
            var max = options.max, min = options.min;
            var handler = _this.keyBinding[e.keyCode];
            if (_this.isDisabled || !handler) {
                return;
            }
            var value = handler(options);
            _this.changeValue(trimValue(max, min, value));
            e.preventDefault();
        };
        _this.ngChange = function (_) { };
        _this.ngTouched = function () { };
        _this.decreaseValue = function () {
            _this.changeValue(decreaseValueToStep(_this.value, _this.getProps()));
        };
        _this.increaseValue = function () {
            _this.changeValue(increaseValueToStep(_this.value, _this.getProps()));
        };
        return _this;
    }
    Object.defineProperty(SliderComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focuses the Slider.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="slider.focus()">Focus</button>
     *  <kendo-slider #slider></kendo-slider>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    SliderComponent.prototype.focus = function () {
        invokeElementMethod(this.wrapper, 'focus');
    };
    /**
     * Blurs the Slider.
     */
    SliderComponent.prototype.blur = function () {
        invokeElementMethod(this.wrapper, 'blur');
    };
    SliderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (anyChanged(['value', 'fixedTickWidth', 'tickPlacement'], changes, true)) {
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                _this.sizeComponent(false);
            });
        }
    };
    SliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.showButtons) {
            this.setValueChangeInterval(this.increaseButton.nativeElement, function () { return _this.increaseValue(); });
            this.setValueChangeInterval(this.decreaseButton.nativeElement, function () { return _this.decreaseValue(); });
        }
        this.sizeComponent(false);
        if (this.ticks) {
            this.ticks.tickElements
                .changes
                .subscribe(function () { return _this.sizeComponent(false); });
        }
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(SliderComponent.prototype, "incrementMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.incrementTitle || this.localizationService.get('increment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "decrementMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.decrementTitle || this.localizationService.get('decrement');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "dragHandleMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.dragHandleTitle || this.localizationService.get('dragHandle');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SliderComponent.prototype.handleDragPress = function (args) {
        if (args.originalEvent) {
            args.originalEvent.preventDefault();
        }
        this.focus();
        this.renderer.removeClass(this.hostElement.nativeElement, 'k-slider-transitions');
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onHandleDrag = function (args) {
        this.dragging = true;
        this.changeValue(eventValue(args, this.track.nativeElement, this.getProps()));
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onHandleRelease = function () {
        this.dragging = false; //needed for animation
        this.renderer.addClass(this.hostElement.nativeElement, 'k-slider-transitions');
    };
    //ngModel binding
    /**
     * @hidden
     */
    SliderComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.sizeComponent(this.animate);
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.changeValue = function (value) {
        var _this = this;
        if (!areSame(this.value, value)) {
            this.ngZone.run(function () {
                _this.value = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.sizeComponent(_this.animate);
            });
        }
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.sizeComponent = function (animate) {
        if (!isDocumentAvailable()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        var track = this.track.nativeElement;
        var selectionEl = this.sliderSelection.nativeElement;
        var dragHandleEl = this.draghandle.nativeElement;
        var ticks = this.ticks ? this.ticksContainer.nativeElement : null;
        if (!animate) {
            this.renderer.removeClass(this.hostElement.nativeElement, 'k-slider-transitions');
        }
        this.resetStyles([track, selectionEl, dragHandleEl, ticks, this.hostElement.nativeElement]);
        var props = this.getProps();
        var model = new SliderModel(props, wrapper, track, this.renderer);
        model.resizeTrack();
        if (this.ticks) { //for case when tickPlacement: none
            model.resizeTicks(this.ticksContainer.nativeElement, this.ticks.tickElements.map(function (element) { return element.nativeElement; }));
        }
        model.positionHandle(dragHandleEl);
        model.positionSelection(dragHandleEl, selectionEl);
        if (!animate) {
            this.hostElement.nativeElement.getBoundingClientRect();
            this.renderer.addClass(this.hostElement.nativeElement, 'k-slider-transitions');
        }
        if (this.fixedTickWidth) {
            model.resizeWrapper();
        }
    };
    Object.defineProperty(SliderComponent.prototype, "focused", {
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                var element = this.hostElement.nativeElement;
                if (value) {
                    this.renderer.addClass(element, FOCUSED);
                }
                else {
                    this.renderer.removeClass(element, FOCUSED);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "dragging", {
        set: function (value) {
            if (this.isDragged !== value && this.sliderSelection && this.draghandle) {
                var sliderSelection = this.sliderSelection.nativeElement;
                var draghandle = this.draghandle.nativeElement;
                if (value) {
                    this.renderer.addClass(sliderSelection, PRESSED);
                    this.renderer.addClass(draghandle, PRESSED);
                }
                else {
                    this.renderer.removeClass(sliderSelection, PRESSED);
                    this.renderer.removeClass(draghandle, PRESSED);
                }
                this.isDragged = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SliderComponent.prototype.setValueChangeInterval = function (element, callback) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var mousedown = fromEvent(element, 'mousedown');
            var mouseup = fromEvent(element, 'mouseup');
            var mouseout = fromEvent(element, 'mouseout');
            var subscription = mousedown.pipe(filter(function (e) { return e.button === 0 && !_this.isDisabled; }), concatMap(function () {
                return interval(150).pipe(startWith(-1), takeUntil(merge(mouseup, mouseout)));
            })).subscribe(function () {
                _this.focus();
                callback();
            });
            _this.subscriptions.add(subscription);
        });
    };
    SliderComponent.prototype.getProps = function () {
        return {
            buttons: this.showButtons,
            disabled: this.disabled,
            fixedTickWidth: this.fixedTickWidth,
            largeStep: this.largeStep,
            max: this.max,
            min: this.min,
            readonly: this.readonly,
            reverse: this.reverse,
            rtl: this.localizationService.rtl,
            smallStep: this.smallStep,
            value: trimValue(this.max, this.min, this.value),
            vertical: this.vertical
        };
    };
    SliderComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSlider',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.slider' },
                        { multi: true, provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return SliderComponent; }) },
                        { provide: KendoInput, useExisting: forwardRef(function () { return SliderComponent; }) }
                    ],
                    selector: 'kendo-slider',
                    template: "\n        <ng-container kendoSliderLocalizedMessages\n            i18n-increment=\"kendo.slider.increment|The title of the **Increase** button of the Slider.\"\n            increment=\"increment\"\n            i18n-decrement=\"kendo.slider.decrement|The title of the **Decrease** button of the Slider.\"\n            decrement=\"decrement\"\n            i18n-dragHandle=\"kendo.slider.dragHandle|The title of the drag handle of the Slider.\"\n            dragHandle=\"Drag\"\n        >\n        <div class=\"k-slider-wrap\" #wrap\n            [id]=\"focusableId\"\n            [class.k-slider-buttons]=\"showButtons\"\n            [class.k-slider-topleft]=\"tickPlacement === 'before'\"\n            [class.k-slider-bottomright]=\"tickPlacement === 'after'\"\n            [attr.tabindex]=\"disabled ? undefined : tabIndex\"\n            [kendoEventsOutsideAngular]=\"{ focus: handleFocus, blur: handleBlur, click: onWrapClick, keydown: onKeyDown }\"\n            >\n            <a\n                #decreaseButton\n                *ngIf=\"showButtons\"\n                class=\"k-button k-button-decrease\"\n                [title]=\"decrementMessage\"\n                [attr.aria-label]=\"decrementMessage\"\n            >\n                <span class=\"k-icon\"\n                    [class.k-i-arrow-w]=\"!vertical\"\n                    [class.k-i-arrow-s]=\"vertical\"\n                >\n                </span>\n            </a>\n            <a\n                *ngIf=\"showButtons\"\n                #increaseButton\n                class=\"k-button k-button-increase\"\n                [title]=\"incrementMessage\"\n                [attr.aria-label]=\"incrementMessage\"\n            >\n                <span class=\"k-icon\"\n                    [class.k-i-arrow-e]=\"!vertical\"\n                    [class.k-i-arrow-n]=\"vertical\"\n                >\n                </span>\n            </a>\n            <ul kendoSliderTicks\n                #ticks\n                *ngIf=\"tickPlacement !== 'none'\"\n                [tickTitle]=\"title\"\n                [vertical]=\"vertical\"\n                [step]=\"smallStep\"\n                [largeStep]=\"largeStep\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [labelTemplate]=\"labelTemplate?.templateRef\"\n            >\n            </ul>\n        <div #track class=\"k-slider-track\">\n            <div #sliderSelection class=\"k-slider-selection\">\n            </div>\n                <a #draghandle\n                    role=\"slider\"\n                    [attr.aria-valuemin]=\"min\"\n                    [attr.aria-valuemax]=\"max\"\n                    [attr.aria-valuenow]=\"value\"\n                    [attr.aria-disabled]=\"disabled ? true : undefined\"\n                    [attr.aria-readonly]=\"readonly ? true : undefined\"\n                    [attr.aria-orientation]=\"vertical ? 'vertical' : 'horizontal'\"\n                    [style.touch-action]=\"isDisabled ? '' : 'none'\"\n                    class=\"k-draghandle\"\n                    [title]=\"dragHandleMessage\"\n                    kendoDraggable\n                    (kendoPress)=\"ifEnabled(handleDragPress, $event)\"\n                    (kendoDrag)=\"ifEnabled(onHandleDrag, $event)\"\n                    (kendoRelease)=\"ifEnabled(onHandleRelease, $event)\"\n                ></a>\n            </div>\n            <kendo-resize-sensor (resize)=\"sizeComponent(false)\"></kendo-resize-sensor>\n        </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SliderComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: Injector },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    SliderComponent.propDecorators = {
        focusableId: [{ type: Input }],
        dragHandleTitle: [{ type: Input }],
        incrementTitle: [{ type: Input }],
        animate: [{ type: Input }],
        decrementTitle: [{ type: Input }],
        showButtons: [{ type: Input }],
        value: [{ type: Input }],
        tabIndex: [{ type: Input }],
        draghandle: [{ type: ViewChild, args: ['draghandle', { static: true },] }],
        decreaseButton: [{ type: ViewChild, args: ['decreaseButton',] }],
        increaseButton: [{ type: ViewChild, args: ['increaseButton',] }]
    };
    return SliderComponent;
}(SliderBase));

/**
 * @hidden
 */
var RangeSliderModel = /** @class */ (function (_super) {
    __extends(RangeSliderModel, _super);
    function RangeSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSliderModel.prototype.positionHandle = function (dragHandle) {
        if (!dragHandle.id) {
            return;
        }
        var _a = this.props, max = _a.max, min = _a.min, reverse = _a.reverse, vertical = _a.vertical;
        var position = vertical ? 'bottom' : 'left';
        var trackWidth = this.trackWidth();
        var value = isStartHandle(dragHandle) ? trimValueRange(max, min, this.props.value)[0]
            : trimValueRange(max, min, this.props.value)[1];
        if (isStartHandle(dragHandle)) {
            this.startHandlePosition = calculateHandlePosition({
                min: min,
                max: max,
                reverse: reverse,
                value: value,
                trackWidth: trackWidth,
                handleWidth: dragHandle.offsetWidth
            });
            this.renderer.setStyle(dragHandle, position, this.startHandlePosition + "px");
        }
        else {
            this.endHandlePosition = calculateHandlePosition({
                min: min,
                max: max,
                reverse: reverse,
                value: value,
                trackWidth: trackWidth,
                handleWidth: dragHandle.offsetWidth
            });
            this.renderer.setStyle(dragHandle, position, this.endHandlePosition + "px");
        }
    };
    RangeSliderModel.prototype.positionSelection = function (dragHandle, selection) {
        var _a = this.props, reverse = _a.reverse, vertical = _a.vertical;
        var dimension = vertical ? 'height' : 'width';
        var position = vertical ? 'bottom' : reverse ? 'right' : 'left';
        var handleWidth = Math.floor(dragHandle.offsetWidth / 2);
        var size = Math.abs(this.endHandlePosition - this.startHandlePosition);
        var currentSelectionPosition = vertical ? dragHandle.style.bottom : dragHandle.style.left;
        this.renderer.setStyle(selection, dimension, size + "px");
        this.renderer.setStyle(selection, position, reverse ? this.trackWidth() - parseFloat(currentSelectionPosition) - handleWidth + 'px'
            : parseFloat(currentSelectionPosition) + handleWidth + 'px');
    };
    return RangeSliderModel;
}(SliderModelBase));

var PRESSED$1 = 'k-pressed';
/**
 * Represents the [Kendo UI RangeSlider component for Angular]({% slug overview_rangeslider %}).
 */
var RangeSliderComponent = /** @class */ (function (_super) {
    __extends(RangeSliderComponent, _super);
    function RangeSliderComponent(localization, injector, renderer, ngZone, changeDetector, hostElement) {
        var _this = _super.call(this, localization, injector, renderer, ngZone, changeDetector, hostElement) || this;
        _this.localization = localization;
        _this.injector = injector;
        _this.renderer = renderer;
        _this.ngZone = ngZone;
        _this.changeDetector = changeDetector;
        _this.hostElement = hostElement;
        /**
         * @hidden
         */
        _this.startHandleId = "k-start-handle-" + guid();
        /**
         * @hidden
         */
        _this.endHandleId = "k-end-handle-" + guid();
        /**
         * @hidden
         */
        _this.focusableId = _this.startHandleId;
        _this.handleZIndex = 0;
        _this.activeHandle = 'startHandle';
        _this.focusChangedProgrammatically = false;
        /**
         * @hidden
         */
        _this.onWrapClick = function (args) {
            if (!_this.isDisabled) {
                _this.value = _this.value || [_this.min, _this.min];
                var trackValue = eventValue(args, _this.track.nativeElement, _this.getProps());
                var newRangeValue = void 0;
                var _a = newRangeValue = _this.value, startValue = _a[0], endValue = _a[1];
                if (trackValue <= startValue) {
                    newRangeValue = [trackValue, endValue];
                    _this.activeHandle = 'startHandle';
                }
                else if (startValue < trackValue && trackValue < endValue) {
                    if (trackValue < (startValue + endValue) / 2) {
                        newRangeValue = [trackValue, endValue];
                        _this.activeHandle = 'startHandle';
                    }
                    else {
                        newRangeValue = [startValue, trackValue];
                        _this.activeHandle = 'endHandle';
                    }
                }
                else if (trackValue >= endValue) {
                    newRangeValue = [startValue, trackValue];
                    _this.activeHandle = 'endHandle';
                }
                var activeHandle = _this.activeHandle === 'startHandle' ? _this.draghandleStart : _this.draghandleEnd;
                invokeElementMethod(activeHandle, 'focus');
                _this.changeValue(newRangeValue);
            }
        };
        /**
         * @hidden
         */
        _this.onKeyDown = function (e) {
            _this.value = _this.value || [_this.min, _this.min];
            var options = _this.getProps();
            var max = options.max, min = options.min;
            var handler = _this.keyBinding[e.keyCode];
            if (_this.isDisabled || !handler) {
                return;
            }
            _this.renderer.setStyle(e.target, 'zIndex', ++_this.handleZIndex);
            var startHandleIsActive = isStartHandle(e.target);
            var value = handler(__assign({}, options, { value: startHandleIsActive ? _this.value[0] : _this.value[1] }));
            if (startHandleIsActive) {
                if (value > _this.value[1]) {
                    _this.value[1] = value;
                }
            }
            else {
                if (value < _this.value[0]) {
                    _this.value[0] = value;
                }
            }
            var trimmedValue = trimValue(max, min, value);
            var newValue = startHandleIsActive ? [trimmedValue, _this.value[1]]
                : [_this.value[0], trimmedValue];
            _this.changeValue(newValue);
            e.preventDefault();
        };
        _this.ngChange = function (_) { };
        _this.ngTouched = function () { };
        _this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    if (!_this.focusChangedProgrammatically) {
                        _this.onBlur.emit();
                    }
                });
            }
        };
        return _this;
    }
    /**
     * Focuses the RangeSlider.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *     <div>
     *         <button class="k-button" (click)="slider.focus()">Focus</button>
     *     </div>
     *     <kendo-rangeslider #slider></kendo-rangeslider>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    RangeSliderComponent.prototype.focus = function () {
        this.focusChangedProgrammatically = true;
        invokeElementMethod(this.draghandleStart, 'focus');
        this.focusChangedProgrammatically = false;
    };
    /**
     * Blurs the RangeSlider.
     */
    RangeSliderComponent.prototype.blur = function () {
        this.focusChangedProgrammatically = true;
        var activeHandle = this.activeHandle === 'startHandle' ? this.draghandleStart : this.draghandleEnd;
        invokeElementMethod(activeHandle, 'blur');
        this.handleBlur();
        this.focusChangedProgrammatically = false;
    };
    RangeSliderComponent.prototype.ngOnInit = function () {
        if (!this.value) {
            this.value = [this.min, this.max];
        }
        _super.prototype.ngOnInit.call(this);
    };
    RangeSliderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (anyChanged(['value', 'fixedTickWidth', 'tickPlacement'], changes, true)) {
            if (changes.value && changes.value.currentValue) {
                validateValue(changes.value.currentValue);
            }
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                _this.sizeComponent();
            });
        }
    };
    RangeSliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.sizeComponent();
        if (this.ticks) {
            this.ticks.tickElements
                .changes
                .subscribe(function () { return _this.sizeComponent(); });
        }
        this.attachElementEventHandlers();
    };
    RangeSliderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    Object.defineProperty(RangeSliderComponent.prototype, "valueText", {
        /**
         * @hidden
         */
        get: function () {
            return this.value ? this.value[0] + " - " + this.value[1] : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.handleDragPress = function (args) {
        if (args.originalEvent) {
            args.originalEvent.preventDefault();
        }
        var target = args.originalEvent.target;
        this.draggedHandle = target;
        this.renderer.setStyle(target, 'zIndex', ++this.handleZIndex);
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.onHandleDrag = function (args) {
        var _this = this;
        this.value = this.value || [this.min, this.min];
        var target = args.originalEvent.target;
        var lastCoords = this.draggedHandle.getBoundingClientRect();
        this.lastHandlePosition = { x: lastCoords.left, y: lastCoords.top };
        this.dragging = { value: true, target: target };
        var left = args.pageX < this.lastHandlePosition.x;
        var right = args.pageX > this.lastHandlePosition.x;
        var up = args.pageY > this.lastHandlePosition.y;
        var moveStartHandle = function () { return _this.changeValue([eventValue(args, _this.track.nativeElement, _this.getProps()), _this.value[1]]); };
        var moveEndHandle = function () { return _this.changeValue([_this.value[0], eventValue(args, _this.track.nativeElement, _this.getProps())]); };
        var moveBothHandles = function () { return _this.changeValue([eventValue(args, _this.track.nativeElement, _this.getProps()), eventValue(args, _this.track.nativeElement, _this.getProps())]); };
        var activeStartHandle = isStartHandle(this.draggedHandle);
        var vertical = this.vertical;
        var horizontal = !vertical;
        var forward = (vertical && up) || (this.reverse ? horizontal && right : horizontal && left);
        // const forward = (this.reverse ? (!this.vertical && !left) : (!this.vertical && left)) || (this.vertical && up);
        if (this.value[0] === this.value[1]) {
            if (forward) {
                activeStartHandle ? moveStartHandle() : moveBothHandles();
            }
            else {
                activeStartHandle ? moveBothHandles() : moveEndHandle();
            }
        }
        else {
            activeStartHandle ? moveStartHandle() : moveEndHandle();
        }
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.onHandleRelease = function (args) {
        this.dragging = { value: false, target: args.originalEvent.target }; //needed for animation
        this.draggedHandle = undefined;
    };
    //ngModel binding
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.writeValue = function (value) {
        validateValue(value);
        this.value = value;
        this.sizeComponent();
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.changeValue = function (value) {
        var _this = this;
        if (!this.value || !isSameRange(this.value, value)) {
            this.ngZone.run(function () {
                _this.value = value;
                _this.ngChange(value);
                if (_this.value) {
                    _this.valueChange.emit(value);
                }
                _this.sizeComponent();
            });
        }
    };
    /**
     * @hidden
     */
    RangeSliderComponent.prototype.sizeComponent = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        var track = this.track.nativeElement;
        var selectionEl = this.sliderSelection.nativeElement;
        var dragHandleStartEl = this.draghandleStart.nativeElement;
        var dragHandleEndEl = this.draghandleEnd.nativeElement;
        var ticks = this.ticks ? this.ticksContainer.nativeElement : null;
        this.resetStyles([track, selectionEl, dragHandleStartEl, dragHandleEndEl, ticks, this.hostElement.nativeElement]);
        var props = this.getProps();
        var model = new RangeSliderModel(props, wrapper, track, this.renderer);
        model.resizeTrack();
        if (this.ticks) { //for case when tickPlacement: none
            model.resizeTicks(this.ticksContainer.nativeElement, this.ticks.tickElements.map(function (element) { return element.nativeElement; }));
        }
        model.positionHandle(dragHandleStartEl);
        model.positionHandle(dragHandleEndEl);
        model.positionSelection(dragHandleStartEl, selectionEl);
        if (this.fixedTickWidth) {
            model.resizeWrapper();
        }
    };
    Object.defineProperty(RangeSliderComponent.prototype, "isDisabled", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled || this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the FloatingLabel to determine if the component is empty.
     */
    RangeSliderComponent.prototype.isEmpty = function () {
        return false;
    };
    Object.defineProperty(RangeSliderComponent.prototype, "focused", {
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSliderComponent.prototype, "dragging", {
        set: function (data) {
            if (this.isDragged !== data.value && this.sliderSelection && this.draghandleStart && this.draghandleEnd) {
                var sliderSelection = this.sliderSelection.nativeElement;
                var draghandle = data.target;
                if (data.value) {
                    this.renderer.addClass(sliderSelection, PRESSED$1);
                    this.renderer.addClass(draghandle, PRESSED$1);
                }
                else {
                    this.renderer.removeClass(sliderSelection, PRESSED$1);
                    this.renderer.removeClass(draghandle, PRESSED$1);
                }
                this.isDragged = data.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    RangeSliderComponent.prototype.getProps = function () {
        return {
            disabled: this.disabled,
            fixedTickWidth: this.fixedTickWidth,
            largeStep: this.largeStep,
            max: this.max,
            min: this.min,
            readonly: this.readonly,
            reverse: this.reverse,
            rtl: this.localizationService.rtl,
            smallStep: this.smallStep,
            value: trimValueRange(this.max, this.min, this.value),
            vertical: this.vertical,
            buttons: false
        };
    };
    RangeSliderComponent.prototype.attachElementEventHandlers = function () {
        var _this = this;
        var hostElement = this.hostElement.nativeElement;
        var tabbing = false;
        var cursorInsideWrapper = false;
        this.ngZone.runOutsideAngular(function () {
            // focusIn and focusOut are relative to the host element
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'focusin', function () {
                if (!_this.isFocused) {
                    _this.ngZone.run(function () {
                        if (!_this.focusChangedProgrammatically) {
                            _this.onFocus.emit();
                        }
                        _this.focused = true;
                    });
                }
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'focusout', function (args) {
                if (!_this.isFocused) {
                    return;
                }
                if (tabbing) {
                    if (args.relatedTarget !== _this.draghandleStart.nativeElement && args.relatedTarget !== _this.draghandleEnd.nativeElement) {
                        _this.handleBlur();
                    }
                    tabbing = false;
                }
                else {
                    if (!cursorInsideWrapper) {
                        _this.handleBlur();
                    }
                }
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'mouseenter', function () {
                cursorInsideWrapper = true;
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'mouseleave', function () {
                cursorInsideWrapper = false;
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'keydown', function (args) {
                if (args.keyCode === Keys.Tab) {
                    tabbing = true;
                }
                else {
                    tabbing = false;
                }
            }));
        });
    };
    RangeSliderComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoRangeSlider',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.rangeslider' },
                        { multi: true, provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return RangeSliderComponent; }) },
                        { provide: KendoInput, useExisting: forwardRef(function () { return RangeSliderComponent; }) }
                    ],
                    selector: 'kendo-rangeslider',
                    template: "\n        <ng-container kendoSliderLocalizedMessages\n            i18n-dragHandleStart=\"kendo.rangeslider.dragHandleStart|The title of the **Start** drag handle of the Slider.\"\n            dragHandleStart=\"Drag\"\n            i18n-dragHandleEnd=\"kendo.rangeslider.dragHandleEnd|The title of the **End** drag handle of the Slider.\"\n            dragHandleEnd=\"Drag\"\n        >\n\n        <div class=\"k-slider-wrap\" #wrap\n            [class.k-slider-topleft]=\"tickPlacement === 'before'\"\n            [class.k-slider-bottomright]=\"tickPlacement === 'after'\"\n            [kendoEventsOutsideAngular]=\"{ click: onWrapClick, keydown: onKeyDown }\"\n            >\n            <ul kendoSliderTicks\n                #ticks\n                *ngIf=\"tickPlacement !== 'none'\"\n                [tickTitle]=\"title\"\n                [vertical]=\"vertical\"\n                [step]=\"smallStep\"\n                [largeStep]=\"largeStep\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [labelTemplate]=\"labelTemplate?.templateRef\"\n            >\n            </ul>\n            <div #track class=\"k-slider-track\">\n                <div #sliderSelection class=\"k-slider-selection\">\n                </div>\n                <a #draghandleStart\n                    role=\"slider\"\n                    [id]=\"startHandleId\"\n                    [attr.tabindex]=\"disabled ? undefined : tabindex\"\n                    [attr.aria-valuemin]=\"min\"\n                    [attr.aria-valuemax]=\"max\"\n                    [attr.aria-valuenow]=\"value ? value[0] : null\"\n                    [attr.aria-valuetext]=\"valueText\"\n                    [attr.aria-disabled]=\"disabled ? true : undefined\"\n                    [attr.aria-readonly]=\"readonly ? true : undefined\"\n                    [attr.aria-orientation]=\"vertical ? 'vertical' : 'horizontal'\"\n                    [style.touch-action]=\"isDisabled ? '' : 'none'\"\n                    class=\"k-draghandle\"\n                    [title]=\"textFor('dragHandleStart')\"\n                    kendoDraggable\n                    (kendoPress)=\"ifEnabled(handleDragPress ,$event)\"\n                    (kendoDrag)=\"ifEnabled(onHandleDrag ,$event)\"\n                    (kendoRelease)=\"ifEnabled(onHandleRelease, $event)\"\n                ></a>\n                <a #draghandleEnd\n                    role=\"slider\"\n                    [id]=\"endHandleId\"\n                    [attr.tabindex]=\"disabled ? undefined : tabindex\"\n                    [attr.aria-valuemin]=\"min\"\n                    [attr.aria-valuemax]=\"max\"\n                    [attr.aria-valuenow]=\"value ? value[1] : null\"\n                    [attr.aria-valuetext]=\"valueText\"\n                    [attr.aria-disabled]=\"disabled ? true : undefined\"\n                    [attr.aria-readonly]=\"readonly ? true : undefined\"\n                    [attr.aria-orientation]=\"vertical ? 'vertical' : 'horizontal'\"\n                    [style.touch-action]=\"isDisabled ? '' : 'none'\"\n                    class=\"k-draghandle\"\n                    [title]=\"textFor('dragHandleEnd')\"\n                    kendoDraggable\n                    (kendoPress)=\"ifEnabled(handleDragPress ,$event)\"\n                    (kendoDrag)=\"ifEnabled(onHandleDrag ,$event)\"\n                    (kendoRelease)=\"ifEnabled(onHandleRelease, $event)\"\n                ></a>\n            </div>\n\n            <kendo-resize-sensor (resize)=\"sizeComponent()\"></kendo-resize-sensor>\n        </div>\n  "
                },] },
    ];
    /** @nocollapse */
    RangeSliderComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: Injector },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    RangeSliderComponent.propDecorators = {
        value: [{ type: Input }],
        draghandleStart: [{ type: ViewChild, args: ['draghandleStart', { static: true },] }],
        draghandleEnd: [{ type: ViewChild, args: ['draghandleEnd', { static: true },] }]
    };
    return RangeSliderComponent;
}(SliderBase));

var FOCUSED$1 = 'k-state-focused';
/**
 * Represents the [Kendo UI Switch component for Angular]({% slug overview_switch %}).
 */
var SwitchComponent = /** @class */ (function () {
    function SwitchComponent(renderer, hostElement, localizationService, injector, changeDetector, ngZone) {
        var _this = this;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        this.injector = injector;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Sets the current value of the Switch when it is initially displayed.
         */
        this.checked = false;
        /**
         * Determines whether the Switch is disabled ([see example]({% slug disabled_switch %})).
         */
        this.disabled = false;
        /**
         * Determines whether the Switch is in its read-only state ([see example]({% slug readonly_switch %})).
         */
        this.readonly = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the Switch.
         */
        this.tabindex = 0;
        /**
         * Fires each time the user focuses the `input` element.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the `input` element gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new EventEmitter();
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        /**
         * @hidden
         */
        this.handleFocus = function () {
            _this.focused = true;
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.onBlur.emit();
                });
            }
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    Object.defineProperty(SwitchComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "ieClass", {
        get: function () {
            return browser && browser.msie;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "ariaReadonly", {
        get: function () {
            return this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "switchOnClass", {
        get: function () {
            return this.checked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "switchOffClass", {
        get: function () {
            return !this.checked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "onLabelMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.onLabel || this.localizationService.get('on');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "offLabelMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.offLabel || this.localizationService.get('off');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "isEnabled", {
        get: function () {
            return !this.disabled && !this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    SwitchComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.hostElement) {
            var wrapper = this.hostElement.nativeElement;
            this.renderer.removeAttribute(wrapper, "tabindex");
        }
        this.localizationChangeSubscription = this.localizationService
            .changes
            .pipe(skip(1))
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.control = this.injector.get(NgControl, null);
    };
    SwitchComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    /**
     * Focuses the Switch.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="switch.focus()">Focus</button>
     *  <kendo-switch #switch></kendo-switch>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    SwitchComponent.prototype.focus = function () {
        if (!this.wrapper) {
            return;
        }
        this.wrapper.nativeElement.focus();
    };
    /**
     * Blurs the Switch.
     */
    SwitchComponent.prototype.blur = function () {
        if (!this.wrapper) {
            return;
        }
        this.wrapper.nativeElement.blur();
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     */
    SwitchComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.changeDetector.markForCheck();
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.writeValue = function (value) {
        this.checked = value === null ? false : value;
        this.changeDetector.markForCheck();
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.keyDownHandler = function (e) {
        var keyCode = e.keyCode;
        if (this.isEnabled && (keyCode === Keys.Space || keyCode === Keys.Enter)) {
            this.changeValue(!this.checked);
            e.preventDefault();
        }
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.clickHandler = function () {
        if (this.isEnabled) {
            this.changeValue(!this.checked);
        }
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    SwitchComponent.prototype.isEmpty = function () {
        return false;
    };
    SwitchComponent.prototype.changeValue = function (value) {
        var _this = this;
        if (this.checked !== value) {
            this.ngZone.run(function () {
                _this.checked = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.changeDetector.markForCheck();
            });
        }
    };
    Object.defineProperty(SwitchComponent.prototype, "focused", {
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                var element = this.hostElement.nativeElement;
                if (value) {
                    this.renderer.addClass(element, FOCUSED$1);
                }
                else {
                    this.renderer.removeClass(element, FOCUSED$1);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SwitchComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSwitch',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.switch' },
                        {
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return SwitchComponent; }) /* tslint:disable-line */
                        },
                        {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return SwitchComponent; })
                        }
                    ],
                    selector: 'kendo-switch',
                    template: "\n        <ng-container kendoSwitchLocalizedMessages\n            i18n-on=\"kendo.switch.on|The **On** label of the Switch.\"\n            on=\"ON\"\n            i18n-off=\"kendo.switch.off|The **Off** label of the Switch.\"\n            off=\"OFF\"\n        >\n\n        <span\n            #wrapper\n            class=\"k-switch-container\"\n            [id]=\"focusableId\"\n            role=\"switch\"\n            [attr.aria-checked]=\"checked\"\n            [attr.tabindex]=\"(disabled ? undefined : tabIndex)\"\n            [kendoEventsOutsideAngular]=\"{ click: clickHandler, keydown: keyDownHandler, focus: handleFocus, blur: handleBlur }\"\n        >\n            <span class=\"k-switch-label-on\" [attr.aria-hidden]=\"true\" >{{onLabelMessage}}</span>\n            <span class=\"k-switch-label-off\" [attr.aria-hidden]=\"true\">{{offLabelMessage}}</span>\n            <span class=\"k-switch-handle\"></span>\n        </span>\n  "
                },] },
    ];
    /** @nocollapse */
    SwitchComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: LocalizationService },
        { type: Injector },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    SwitchComponent.propDecorators = {
        focusableId: [{ type: Input }],
        onLabel: [{ type: Input }],
        offLabel: [{ type: Input }],
        checked: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        valueChange: [{ type: Output }],
        wrapper: [{ type: ViewChild, args: ['wrapper',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        ieClass: [{ type: HostBinding, args: ['class.k-ie',] }],
        ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
        ariaReadonly: [{ type: HostBinding, args: ['attr.aria-readonly',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-switch',] }],
        switchOnClass: [{ type: HostBinding, args: ['class.k-switch-on',] }],
        switchOffClass: [{ type: HostBinding, args: ['class.k-switch-off',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
    };
    return SwitchComponent;
}());

/**
 * Represents the [Kendo UI TextArea directive for the Inputs components for Angular]({% slug overview_textarea %}).
 * Provides floating labels to `textarea` elements.
 *
 * @example
 * ```ts-no-run
 * <textarea kendoTextArea></textarea>
 * ```
 */
var TextAreaDirective = /** @class */ (function () {
    function TextAreaDirective(renderer, element, zone, changeDetector, injector, rtl) {
        this.renderer = renderer;
        this.element = element;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.injector = injector;
        this.elementClass = true;
        this.autofillClass = true;
        /**
         * Fires each time the textarea value is changed.
         */
        this.valueChange = new EventEmitter();
        /**
         * Specifies if the `textarea` element will resize its height automatically
         * ([see example]({% slug overview_textarea %}#toc-auto-resizing)).
         *
         * @default false
         */
        this.autoSize = false;
        /**
         * @hidden
         */
        this.onFocus = new EventEmitter();
        /**
         * @hidden
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         */
        this.onValueChange = new EventEmitter();
        /**
         * @hidden
         */
        this.autoFillStart = new EventEmitter();
        /**
         * @hidden
         */
        this.autoFillEnd = new EventEmitter();
        this.listeners = [];
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        this.direction = rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(TextAreaDirective.prototype, "id", {
        get: function () {
            return this.element.nativeElement.id;
        },
        set: function (id) {
            this.renderer.setAttribute(this.element.nativeElement, 'id', id);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TextAreaDirective.prototype.writeValue = function (value) {
        this.elementValue = value;
        this.resize();
    };
    /**
     * @hidden
     */
    TextAreaDirective.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    TextAreaDirective.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    TextAreaDirective.prototype.setDisabledState = function (isDisabled) {
        this.setElementProperty('disabled', isDisabled);
    };
    TextAreaDirective.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.element.nativeElement;
        this.zone.runOutsideAngular(function () {
            _this.listeners = [
                _this.renderer.listen(element, 'focus', _this.handleFocus.bind(_this)),
                _this.renderer.listen(element, 'blur', _this.handleBlur.bind(_this)),
                _this.renderer.listen(element, 'animationstart', function (e) {
                    if (e.animationName === 'autoFillStart') {
                        _this.autoFillStart.emit();
                    }
                    else if (e.animationName === 'autoFillEnd') {
                        _this.autoFillEnd.emit();
                    }
                })
            ];
            if (isDocumentAvailable() && _this.autoSize) {
                _this.resizeSubscription = fromEvent(window, 'resize')
                    .pipe((debounceTime(50)))
                    .subscribe(function () { return _this.resize(); });
            }
            _this.inputSubscription = fromEvent(element, 'input')
                .subscribe(_this.handleInput.bind(_this));
        });
        this.control = this.injector.get(NgControl, null);
    };
    TextAreaDirective.prototype.ngOnChanges = function (changes) {
        var element = this.element.nativeElement;
        if (changes.value) {
            this.elementValue = this.value;
        }
        if (changes.autoSize) {
            if (this.autoSize) {
                this.initialHeight = element.offsetHeight;
                this.renderer.setStyle(element, 'resize', 'none');
            }
            else {
                this.renderer.setStyle(element, 'overflow-y', 'auto');
                this.renderer.setStyle(element, 'resize', 'both');
                element.style.height = this.initialHeight + "px";
            }
        }
        this.resize();
    };
    TextAreaDirective.prototype.ngOnDestroy = function () {
        this.listeners.forEach(function (listener) { return listener(); });
        if (this.inputSubscription) {
            this.inputSubscription.unsubscribe();
        }
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    Object.defineProperty(TextAreaDirective.prototype, "elementValue", {
        get: function () {
            if (this.element) {
                return this.element.nativeElement.value;
            }
            return '';
        },
        set: function (value) {
            this.setElementProperty('value', (value === undefined || value === null) ? '' : value);
        },
        enumerable: true,
        configurable: true
    });
    TextAreaDirective.prototype.setElementProperty = function (name, value) {
        if (this.element) {
            this.renderer.setProperty(this.element.nativeElement, name, value);
        }
    };
    TextAreaDirective.prototype.resize = function () {
        if (!this.autoSize) {
            return;
        }
        var element = this.element.nativeElement;
        this.renderer.setStyle(element, 'overflow-y', 'hidden');
        element.style.height = this.initialHeight + "px";
        var scrollHeight = element.scrollHeight;
        if (scrollHeight > this.initialHeight) {
            element.style.height = scrollHeight + "px";
        }
    };
    TextAreaDirective.prototype.handleInput = function () {
        var _this = this;
        var value = this.elementValue;
        this.value = value;
        if (this.control || hasObservers(this.onValueChange) || hasObservers(this.valueChange)) {
            this.zone.run(function () {
                _this.ngChange(value);
                _this.onValueChange.emit(value);
                _this.valueChange.emit(value);
                _this.changeDetector.markForCheck();
            });
        }
        this.resize();
    };
    TextAreaDirective.prototype.handleFocus = function () {
        var _this = this;
        if (hasObservers(this.onFocus)) {
            this.zone.run(function () {
                _this.onFocus.emit();
            });
        }
    };
    TextAreaDirective.prototype.handleBlur = function () {
        var _this = this;
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
            this.zone.run(function () {
                _this.ngTouched();
                _this.onBlur.emit();
                _this.changeDetector.markForCheck();
            });
        }
    };
    TextAreaDirective.decorators = [
        { type: Directive, args: [{
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TextAreaDirective; }),
                            multi: true
                        }, {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return TextAreaDirective; })
                        }],
                    selector: 'textarea[kendoTextArea]'
                },] },
    ];
    /** @nocollapse */
    TextAreaDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: Injector },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    TextAreaDirective.propDecorators = {
        elementClass: [{ type: HostBinding, args: ['class.k-textarea',] }],
        autofillClass: [{ type: HostBinding, args: ['class.k-autofill',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        valueChange: [{ type: Output }],
        autoSize: [{ type: Input }],
        value: [{ type: Input }]
    };
    return TextAreaDirective;
}());

/**
 * @hidden
 */
var FloatingLabelInputAdapter = /** @class */ (function () {
    function FloatingLabelInputAdapter(component, formControl) {
        this.component = component;
        var isObservableOrEventEmitter = function (event) { return event instanceof Observable || event instanceof EventEmitter; };
        if (isObservableOrEventEmitter(component.onFocus)) {
            this.onFocus = component.onFocus;
        }
        if (isObservableOrEventEmitter(component.autoFillStart)) {
            this.autoFillStart = component.autoFillStart;
        }
        if (isObservableOrEventEmitter(component.autoFillEnd)) {
            this.autoFillEnd = component.autoFillEnd;
        }
        if (isObservableOrEventEmitter(component.onBlur)) {
            this.onBlur = component.onBlur;
        }
        if (formControl) {
            this.onValueChange = formControl.valueChanges;
        }
        else if (component.onValueChange) {
            this.onValueChange = component.onValueChange;
        }
    }
    Object.defineProperty(FloatingLabelInputAdapter.prototype, "focusableId", {
        get: function () {
            var component = this.component;
            if ('focusableId' in component) {
                return component.focusableId;
            }
            else if ('id' in component) {
                return component.id;
            }
            return "";
        },
        set: function (value) {
            var component = this.component;
            if ('focusableId' in component) {
                component.focusableId = value;
            }
            else if ('id' in component) {
                component.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FloatingLabelInputAdapter;
}());

var isFunction = function (x) { return Object.prototype.toString.call(x) === '[object Function]'; };
/**
 * @hidden
 */
var TextBoxContainerComponent = /** @class */ (function () {
    function TextBoxContainerComponent(elementRef, renderer, changeDetectorRef, rtl) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * @hidden
         */
        this.focused = false;
        /**
         * @hidden
         */
        this.empty = true;
        /**
         * @hidden
         */
        this.invalid = false;
        this._subscriptions = [];
        this.autoFillStarted = false;
        this.direction = rtl ? 'rtl' : 'ltr';
        this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
    }
    Object.defineProperty(TextBoxContainerComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxContainerComponent.prototype, "textareaElementClass", {
        get: function () {
            return !!this.textarea;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxContainerComponent.prototype, "focusedClass", {
        get: function () {
            return this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxContainerComponent.prototype, "invalidClass", {
        get: function () {
            return this.invalid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TextBoxContainerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.formControl && !this.kendoInput) {
            if (isDevMode()) {
                throw new Error("The TextBoxContainer requires a Kendo Input component" +
                    " or a forms-bound component to function properly.");
            }
            return;
        }
        // add focus/blur/valueChange handlers
        var control = new FloatingLabelInputAdapter(this.kendoInput || this.formControl.valueAccessor, this.formControl);
        var setFocus = function (isFocused) { return function () {
            _this.focused = isFocused;
            _this.updateState();
        }; };
        this.subscribe(control, 'onFocus', setFocus(true));
        this.subscribe(control, 'onBlur', setFocus(false));
        this.subscribe(control, 'autoFillStart', function () {
            _this.autoFillStarted = true;
            _this.renderer.removeClass(_this.elementRef.nativeElement, 'k-state-empty');
        });
        this.subscribe(control, 'autoFillEnd', function () {
            if (_this.autoFillStarted) {
                _this.autoFillStarted = false;
                if (_this.empty) {
                    _this.renderer.addClass(_this.elementRef.nativeElement, 'k-state-empty');
                }
            }
        });
        var updateState = function () { return _this.updateState(); };
        updateState();
        this.subscribe(control, 'onValueChange', updateState);
        // set label id for floating label
        if (this.id && control.focusableId) {
            // input wins
            this.id = control.focusableId;
        }
        else if (this.id) {
            control.focusableId = this.id;
        }
        else if (control.focusableId) {
            this.id = control.focusableId;
        }
        else {
            var id = "_" + guid();
            control.focusableId = id;
            this.id = id;
        }
    };
    /**
     * @hidden
     */
    TextBoxContainerComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._subscriptions = [];
    };
    TextBoxContainerComponent.prototype.subscribe = function (control, eventName, handler) {
        if (control[eventName] instanceof EventEmitter) {
            var subscription = control[eventName].subscribe(handler);
            this._subscriptions.push(subscription);
        }
    };
    TextBoxContainerComponent.prototype.updateState = function () {
        var empty = function (value) {
            // zero is not an empty value (e.g., NumericTextBox)
            if (value === 0 || value === false) {
                return false;
            }
            // empty arrays are an empty value (e.g., MultiSelect)
            if (Array.isArray(value) && !value.length) {
                return true;
            }
            return !value;
        };
        var formControl = this.formControl;
        if (formControl) {
            var valueAccessor = formControl.valueAccessor;
            if (isFunction(valueAccessor.isEmpty)) {
                this.empty = valueAccessor.isEmpty();
            }
            else {
                this.empty = empty(formControl.value);
            }
            this.invalid = formControl.invalid && (formControl.touched || formControl.dirty);
        }
        else {
            this.empty = isFunction(this.kendoInput.isEmpty) ?
                this.kendoInput.isEmpty() : empty(this.kendoInput.value);
        }
        if (this.empty) {
            this.renderer.addClass(this.elementRef.nativeElement, 'k-state-empty');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'k-state-empty');
        }
        this.changeDetectorRef.markForCheck();
    };
    TextBoxContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-textbox-container',
                    template: "\n        <ng-content></ng-content>\n        <label *ngIf=\"floatingLabel\" [for]=\"id\" class=\"k-label\">{{ floatingLabel }}</label>\n    "
                },] },
    ];
    /** @nocollapse */
    TextBoxContainerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    TextBoxContainerComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-textbox-container',] }],
        textareaElementClass: [{ type: HostBinding, args: ['class.k-textarea-wrapper',] }],
        focusedClass: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        invalidClass: [{ type: HostBinding, args: ['class.k-state-invalid',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        id: [{ type: Input }],
        floatingLabel: [{ type: Input }],
        kendoInput: [{ type: ContentChild, args: [KendoInput,] }],
        textarea: [{ type: ContentChild, args: [TextAreaDirective,] }],
        formControl: [{ type: ContentChild, args: [NgControl,] }]
    };
    return TextBoxContainerComponent;
}());

/**
 * Represents the [Kendo UI TextBox directive]({% slug overview_textbox %}) for the Inputs components for Angular.
 * Used to style the textbox of any `input` element.
 *
 * @example
 * ```ts-no-run
 * <input kendoTextBox />
 * <input kendoTextBox type="email" />
 * <input kendoTextBox type="password" />
 * ```
 */
var TextBoxDirective = /** @class */ (function () {
    function TextBoxDirective(renderer, inputElement, ngZone) {
        this.renderer = renderer;
        this.inputElement = inputElement;
        this.ngZone = ngZone;
        this.hostClass = true;
        /**
         * @hidden
         */
        this.onFocus = new EventEmitter();
        /**
         * @hidden
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         */
        this.onValueChange = new EventEmitter();
        /**
         * @hidden
         */
        this.autoFillStart = new EventEmitter();
        /**
         * @hidden
         */
        this.autoFillEnd = new EventEmitter();
        this.listeners = [];
    }
    Object.defineProperty(TextBoxDirective.prototype, "value", {
        /**
         * @hidden
         */
        get: function () {
            return this.inputElement.nativeElement.value;
        },
        /**
         * @hidden
         */
        set: function (text) {
            if (!this.inputElement) {
                return;
            }
            this.inputElement.nativeElement.value = (text === undefined || text === null) ? '' : text;
            this.onValueChange.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxDirective.prototype, "id", {
        get: function () {
            return this.inputElement.nativeElement.id;
        },
        set: function (id) {
            this.renderer.setAttribute(this.inputElement.nativeElement, 'id', id);
        },
        enumerable: true,
        configurable: true
    });
    TextBoxDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var input = this.inputElement.nativeElement;
        this.listeners = [
            this.renderer.listen(input, 'focus', function () { return _this.onFocus.emit(); }),
            this.renderer.listen(input, 'blur', function () { return _this.onBlur.emit(); })
        ];
        this.ngZone.runOutsideAngular(function () {
            _this.renderer.listen(input, 'animationstart', function (e) {
                if (e.animationName === 'autoFillStart') {
                    _this.autoFillStart.emit();
                }
                else if (e.animationName === 'autoFillEnd') {
                    _this.autoFillEnd.emit();
                }
            });
        });
    };
    TextBoxDirective.prototype.ngOnDestroy = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    TextBoxDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[kendoTextBox]',
                    providers: [{
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return TextBoxDirective; })
                        }]
                },] },
    ];
    /** @nocollapse */
    TextBoxDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    TextBoxDirective.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-textbox',] }],
        value: [{ type: Input }]
    };
    return TextBoxDirective;
}());

/**
 * @hidden
 */
var createMaxValidator = function (maxValue) {
    return function (c) {
        if (!isPresent(maxValue) || !isPresent(c.value) || c.value <= maxValue) {
            return null;
        }
        return {
            maxError: {
                maxValue: maxValue,
                value: c.value
            }
        };
    };
};

/**
 * @hidden
 */
var createMinValidator = function (minValue) {
    return function (c) {
        if (!isPresent(minValue) || !isPresent(c.value) || c.value >= minValue) {
            return null;
        }
        return {
            minError: {
                minValue: minValue,
                value: c.value
            }
        };
    };
};

/**
 * @hidden
 */
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/inputs/api/NumericTextBoxComponent/#toc-min';
/**
 * @hidden
 */
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/inputs/api/NumericTextBoxComponent/#toc-max';
/**
 * @hidden
 */
var POINT = ".";
/**
 * @hidden
 */
var INITIAL_SPIN_DELAY = 500;
/**
 * @hidden
 */
var SPIN_DELAY = 50;
/**
 * @hidden
 */
var EXPONENT_REGEX = /[eE][\-+]?([0-9]+)/;

/**
 * @hidden
 */
var numericRegex = function (options) {
    var autoCorrect = options.autoCorrect, decimals = options.decimals, min = options.min;
    var separator = options.separator;
    if (separator === POINT) {
        separator = '\\' + separator;
    }
    var signPattern = autoCorrect && min !== null && min >= 0 ? '' : '-?';
    var numberPattern;
    if (decimals === 0) {
        numberPattern = '\\d*';
    }
    else {
        numberPattern = "(?:(?:\\d+(" + separator + "\\d*)?)|(?:" + separator + "\\d*))?";
    }
    return new RegExp("^" + signPattern + numberPattern + "$");
};
/**
 * @hidden
 */
var decimalPart = function (value) {
    return value >= 0 ? Math.floor(value) : Math.ceil(value);
};
/**
 * @hidden
 */
var noop = function (_) { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
var defined = function (value) {
    return typeof value !== 'undefined';
};
/**
 * @hidden
 */
var isNumber = function (value) {
    return !isNaN(value) && value !== null;
};
/**
 * @hidden
 */
function pad(value, digits) {
    var count = digits - String(value).length;
    var result = value;
    if (count > 0) {
        var padString = new Array(count + 1).join("0");
        result = parseFloat(value + padString);
    }
    return result;
}
/**
 * @hidden
 */
var getDeltaFromMouseWheel = function (e) {
    var delta = 0;
    if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
        delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
    }
    else if (e.detail) {
        delta = Math.round(-e.detail / 3);
    }
    return delta;
};
/**
 * @hidden
 */
var getCaretPosition = function (element) { return element.selectionStart; };
/**
 * @hidden
 */
var extractSignificantNumericChars = function (formattedString, separator) {
    var significantCharacters = separator + "0123456789-";
    return formattedString.split('').reduce(function (acc, curr) { return significantCharacters.includes(curr) ? ++acc : acc; }, 0);
};

/**
 * @hidden
 */
var ArrowDirection;
(function (ArrowDirection) {
    ArrowDirection[ArrowDirection["Down"] = -1] = "Down";
    ArrowDirection[ArrowDirection["None"] = 0] = "None";
    ArrowDirection[ArrowDirection["Up"] = 1] = "Up";
})(ArrowDirection || (ArrowDirection = {}));

var PARSABLE_OPTIONS = ['min', 'max', 'step', 'decimals'];
var PARSABLE_DEFAULTS = {
    decimals: null,
    max: null,
    min: null,
    step: 1
};
var FOCUSED$2 = 'k-state-focused';
var FORMATTED_VALUE = 'k-formatted-value';
/**
 * Represents the [Kendo UI NumericTextBox component for Angular]({% slug overview_numerictextbox %}).
 */
var NumericTextBoxComponent = /** @class */ (function () {
    function NumericTextBoxComponent(intl, renderer, localizationService, injector, ngZone, changeDetector, hostElement) {
        var _this = this;
        this.intl = intl;
        this.renderer = renderer;
        this.localizationService = localizationService;
        this.injector = injector;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.hostElement = hostElement;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Determines whether the NumericTextBox is disabled ([see example]({% slug disabled_numerictextbox %})).
         */
        this.disabled = false;
        /**
         * Determines whether the NumericTextBox is in its read-only state ([see example]({% slug readonly_numerictextbox %})).
         */
        this.readonly = false;
        /**
         * Sets the title of the `input` element of the NumericTextBox.
         */
        this.title = '';
        /**
         * Specifies whether the value will be auto-corrected based on the minimum and maximum values
         * ([see example]({% slug precision_numerictextbox %})).
         */
        this.autoCorrect = false;
        /**
         * Specifies the number of decimals that the user can enter when the input is focused
         * ([see example]({% slug precision_numerictextbox %})).
         */
        this.decimals = null;
        /**
         * Specifies the value that is used to increment or decrement the component value
         * ([see example]({% slug predefinedsteps_numerictextbox %})).
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered
         * ([see example]({% slug spinbuttons_numerictextbox %})).
         */
        this.spinners = true;
        /**
         * Determines whether the built-in minimum or maximum validators are enforced when a form is validated.
         *
         * > The 4.2.0 Angular version introduces the `min` and `max` validation directives. As a result, even if you set `rangeValidation`
         * to `false`, the built-in Angular validators will be executed.
         */
        this.rangeValidation = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Determines whether the whole value will be selected when the NumericTextBox is clicked. Defaults to `true`.
         */
        this.selectOnFocus = true;
        /**
         * Specifies the value of the NumericTextBox
         * ([see example]({% slug formats_numerictextbox %})).
         */
        this.value = null;
        /**
         * Fires each time the user selects a new value ([see example]({% slug overview_numerictextbox %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the `input` element ([see example]({% slug overview_numerictextbox %}#toc-events)).
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the `input` element gets blurred ([see example]({% slug overview_numerictextbox %}#toc-events)).
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         */
        this.ArrowDirection = ArrowDirection;
        /**
         * @hidden
         */
        this.arrowDirection = ArrowDirection.None;
        this.inputValue = '';
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this._format = "n2";
        this.isPasted = false;
        this.mouseDown = false;
        this.ngChange = noop;
        this.ngTouched = noop;
        this.ngValidatorChange = noop;
        /**
         * @hidden
         */
        this.increasePress = function (e) {
            _this.arrowPress(ArrowDirection.Up, e);
        };
        /**
         * @hidden
         */
        this.decreasePress = function (e) {
            _this.arrowPress(ArrowDirection.Down, e);
        };
        /**
         * @hidden
         */
        this.releaseArrow = function () {
            clearTimeout(_this.spinTimeout);
            if (_this.arrowDirection !== ArrowDirection.None) {
                _this.arrowDirection = ArrowDirection.None;
                _this.changeDetector.detectChanges();
            }
        };
        /**
         * @hidden
         */
        this.handlePaste = function () {
            _this.isPasted = true;
        };
        /**
         * @hidden
         */
        this.handleInput = function () {
            var input = _this.numericInput.nativeElement;
            var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd, inputValue = input.value;
            if (_this.pressedKey === Keys.NumpadDecimal) {
                inputValue = _this.replaceNumpadDotValue();
            }
            if (_this.isPasted) {
                inputValue = _this.formatInputValue(_this.intl.parseNumber(inputValue));
            }
            if (!_this.isValid(inputValue)) {
                input.value = _this.inputValue;
                _this.setSelection(selectionStart - 1, selectionEnd - 1);
                return;
            }
            var parsedValue = _this.intl.parseNumber(inputValue);
            var value = _this.restrictDecimals(parsedValue);
            if (_this.autoCorrect) {
                var limited = _this.limitInputValue(value);
                value = limited.value;
                selectionStart = limited.selectionStart;
                selectionEnd = limited.selectionEnd;
            }
            if (parsedValue !== value || _this.hasTrailingZeros(inputValue) || !_this.focused) {
                _this.setInputValue(value);
                _this.setSelection(selectionStart, selectionEnd);
            }
            else {
                _this.inputValue = inputValue;
            }
            if (_this.isPasted) {
                input.value = _this.inputValue;
            }
            _this.updateValue(value);
            _this.previousSelection = null;
            _this.isPasted = false;
        };
        /**
         * @hidden
         */
        this.handleDragEnter = function () {
            if (!_this.focused && !_this.isDisabled) {
                _this.setInputValue(_this.value, true);
            }
        };
        /**
         * @hidden
         */
        this.handleMouseDown = function () {
            _this.mouseDown = true;
        };
        /**
         * @hidden
         */
        this.handleFocus = function () {
            if (!_this.focused) {
                _this.focused = true;
                if (!_this.isDisabled) {
                    var shouldSelectAll_1 = _this.selectOnFocus || !_this.mouseDown;
                    _this.ngZone.runOutsideAngular(function () {
                        setTimeout(function () {
                            if (shouldSelectAll_1) {
                                _this.selectAll();
                            }
                            else {
                                _this.selectCaret();
                            }
                        }, 0);
                    });
                }
            }
            _this.mouseDown = false;
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            //blur is thrown before input when dragging the input text in IE
            if (_this.inputValue !== _this.elementValue) {
                _this.handleInput();
            }
            _this.setInputValue();
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.onBlur.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleKeyDown = function (e) {
            if (_this.isDisabled) {
                return;
            }
            var step;
            if (e.keyCode === Keys.ArrowDown) {
                step = -1;
            }
            else if (e.keyCode === Keys.ArrowUp) {
                step = 1;
            }
            if (step && _this.step) {
                e.preventDefault();
                _this.addStep(step);
            }
            var input = _this.numericInput.nativeElement;
            _this.previousSelection = {
                end: input.selectionEnd,
                start: input.selectionStart
            };
            _this.pressedKey = e.keyCode;
        };
        /**
         * @hidden
         */
        this.handleWheel = function (e) {
            if (_this.focused && !_this.isDisabled) {
                e.preventDefault();
                var delta = getDeltaFromMouseWheel(e);
                _this.addStep(delta);
            }
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(NumericTextBoxComponent.prototype, "format", {
        /**
         * Specifies the number format which is used when the NumericTextBox is not focused
         * ([see example]({% slug formats_numerictextbox %})).
         * If `format` is set to `null` or `undefined`, the default format will be used.
         */
        get: function () {
            var format = this._format;
            return format !== null && format !== undefined ? format : 'n2';
        },
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions = this.localizationService
            .changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.subscriptions.add(this.intl.changes.subscribe(this.intlChange.bind(this)));
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.ngOnChanges = function (changes) {
        if (anyChanged(PARSABLE_OPTIONS, changes, false)) {
            this.parseOptions(PARSABLE_OPTIONS.filter(function (option) { return changes[option]; }));
        }
        this.verifySettings();
        if (anyChanged(['min', 'max', 'rangeValidation'], changes, false)) {
            this.minValidateFn = this.rangeValidation ? createMinValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? createMaxValidator(this.max) : noop;
            this.ngValidatorChange();
        }
        if (anyChanged(['autoCorrect', 'decimals', 'min'], changes)) {
            delete this.numericRegex;
        }
        if (anyChanged(['value', 'format'], changes, false)) {
            this.verifyValue(this.value);
            this.value = this.restrictModelValue(this.value);
            if (!this.focused || (this.intl.parseNumber(this.elementValue) !== this.value)) {
                this.setInputValue();
            }
        }
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        clearTimeout(this.spinTimeout);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnValidatorChange = function (fn) {
        this.ngValidatorChange = fn;
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        var restrictedValue = this.restrictModelValue(value);
        this.value = restrictedValue;
        this.setInputValue();
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    NumericTextBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Focuses the NumericTextBox.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="numerictextbox.focus()">Focus NumericTextBox</button>
     *  <kendo-numerictextbox #numerictextbox></kendo-numerictextbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    NumericTextBoxComponent.prototype.focus = function () {
        invokeElementMethod(this.numericInput, 'focus');
    };
    /**
     * Blurs the NumericTextBox.
     */
    NumericTextBoxComponent.prototype.blur = function () {
        invokeElementMethod(this.numericInput, 'blur');
    };
    /**
     * Notifies the `NumericTextBoxComponent` that the input value should be changed.
     * Can be used to update the input after setting the component properties directly.
     */
    NumericTextBoxComponent.prototype.notifyValueChange = function () {
        this.setInputValue();
    };
    Object.defineProperty(NumericTextBoxComponent.prototype, "incrementTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.localizationService.get('increment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "decrementTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.localizationService.get('decrement');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "decimalSeparator", {
        get: function () {
            var numberSymbols = this.intl.numberSymbols();
            return numberSymbols.decimal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "elementValue", {
        get: function () {
            return this.numericInput.nativeElement.value;
        },
        set: function (value) {
            this.renderer.setProperty(this.numericInput.nativeElement, 'value', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "focused", {
        get: function () {
            return this.isFocused;
        },
        set: function (value) {
            if (this.isFocused !== value && this.numericWrap) {
                var wrap = this.numericWrap.nativeElement;
                var input = this.numericInput.nativeElement;
                if (value) {
                    this.renderer.addClass(wrap, FOCUSED$2);
                    if (!this.isDisabled) {
                        this.renderer.removeClass(input, FORMATTED_VALUE);
                    }
                }
                else {
                    this.renderer.removeClass(wrap, FOCUSED$2);
                    this.renderer.addClass(input, FORMATTED_VALUE);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "hasDecimals", {
        get: function () {
            return this.decimals !== null && this.decimals >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled || this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxComponent.prototype.arrowPress = function (direction, e) {
        e.preventDefault();
        if (this.isDisabled) {
            return;
        }
        if (!mobileOS) {
            this.focused = true;
            this.focus();
        }
        if (this.arrowDirection !== direction) {
            this.arrowDirection = direction;
            this.changeDetector.detectChanges();
        }
        if (this.step) {
            this.spin(direction, INITIAL_SPIN_DELAY);
        }
        else {
            this.setInputValue();
        }
    };
    NumericTextBoxComponent.prototype.updateValue = function (value) {
        var _this = this;
        if (!areSame(this.value, value)) {
            this.ngZone.run(function () {
                _this.value = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.changeDetector.markForCheck();
            });
        }
    };
    NumericTextBoxComponent.prototype.replaceNumpadDotValue = function () {
        var value = this.inputValue || "";
        if (this.previousSelection) {
            var input = this.numericInput.nativeElement;
            var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd;
            var _a = this.previousSelection, start = _a.start, end = _a.end;
            input.value = value = value.substring(0, start) + this.decimalSeparator + value.substring(end);
            this.setSelection(selectionStart, selectionEnd);
        }
        return value;
    };
    NumericTextBoxComponent.prototype.isValid = function (value) {
        if (!this.numericRegex) {
            this.numericRegex = numericRegex({
                autoCorrect: this.autoCorrect,
                decimals: this.decimals,
                min: this.min,
                separator: this.decimalSeparator
            });
        }
        return this.numericRegex.test(value);
    };
    NumericTextBoxComponent.prototype.spin = function (step, timeout) {
        var _this = this;
        clearTimeout(this.spinTimeout);
        this.spinTimeout = window.setTimeout(function () {
            _this.spin(step, SPIN_DELAY);
        }, timeout);
        this.addStep(step);
    };
    NumericTextBoxComponent.prototype.addStep = function (step) {
        var value = add(this.value || 0, this.step * step);
        value = this.limitValue(value);
        value = this.restrictDecimals(value);
        this.setInputValue(value);
        this.updateValue(value);
    };
    NumericTextBoxComponent.prototype.setSelection = function (start, end) {
        if (this.focused) {
            invokeElementMethod(this.numericInput, 'setSelectionRange', start, end);
        }
    };
    NumericTextBoxComponent.prototype.limitValue = function (value) {
        var result = value;
        if (!this.isInRange(value)) {
            if (isNumber(this.max) && value > this.max) {
                result = this.max;
            }
            if (isNumber(this.min) && value < this.min) {
                result = this.min;
            }
        }
        return result;
    };
    NumericTextBoxComponent.prototype.limitInputValue = function (value) {
        var _a = this.numericInput.nativeElement, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd, enteredValue = _a.value;
        var limitedValue = value;
        var selectToEnd = false;
        if (!this.isInRange(value)) {
            var lengthChange = enteredValue.length - String(this.inputValue).length;
            var _b = this, min = _b.min, max = _b.max;
            var hasMax = isNumber(max);
            var hasMin = isNumber(min);
            var padLimit = void 0, replaceNext = void 0;
            var correctedValue = value;
            if (selectionStart === 0 && this.inputValue.substr(1) === enteredValue) {
                return {
                    selectionEnd: selectionEnd,
                    selectionStart: selectionStart,
                    value: null
                };
            }
            if (hasMax && value > max) {
                if (value > 0) {
                    replaceNext = true;
                }
                else {
                    padLimit = max;
                }
            }
            else if (hasMin && value < min) {
                if (value > 0) {
                    padLimit = min;
                }
                else {
                    replaceNext = true;
                }
            }
            if (padLimit) {
                var paddedValue = this.tryPadValue(value, padLimit);
                if (paddedValue && decimalPart(value) !== decimalPart(padLimit)) {
                    correctedValue = paddedValue;
                    selectToEnd = true;
                }
            }
            else if (replaceNext) {
                if (this.inputValue && selectionStart !== enteredValue.length) {
                    correctedValue = parseFloat(enteredValue.substr(0, selectionStart) +
                        enteredValue.substr(selectionStart + lengthChange));
                }
            }
            limitedValue = this.limitValue(correctedValue);
            selectToEnd = (selectToEnd || limitedValue !== correctedValue) && this.previousSelection &&
                (this.previousSelection.end - this.previousSelection.start + lengthChange) > 0;
        }
        return {
            selectionEnd: selectToEnd ? String(limitedValue).length : selectionEnd,
            selectionStart: selectionStart,
            value: limitedValue
        };
    };
    NumericTextBoxComponent.prototype.tryPadValue = function (value, limit) {
        var limitLength = String(Math.floor(limit)).length;
        var zeroPadded = pad(value, limitLength);
        var zeroPaddedNext = pad(value, limitLength + 1);
        var result;
        if (this.isInRange(zeroPadded)) {
            result = zeroPadded;
        }
        else if (this.isInRange(zeroPaddedNext)) {
            result = zeroPaddedNext;
        }
        return result;
    };
    NumericTextBoxComponent.prototype.isInRange = function (value) {
        return !isNumber(value) || ((!isNumber(this.min) || this.min <= value) && (!isNumber(this.max) || value <= this.max));
    };
    NumericTextBoxComponent.prototype.restrictModelValue = function (value) {
        var result = this.restrictDecimals(value, true);
        if (this.autoCorrect && this.limitValue(result) !== result) {
            result = null;
        }
        return result;
    };
    NumericTextBoxComponent.prototype.restrictDecimals = function (value, round) {
        var result = value;
        if (value && this.hasDecimals) {
            var decimals = this.decimals;
            var stringValue = String(value);
            if (round || EXPONENT_REGEX.test(stringValue)) {
                result = toFixedPrecision(value, decimals);
            }
            else {
                var parts = stringValue.split(POINT);
                var fraction = parts[1];
                if (fraction && fraction.length > decimals) {
                    fraction = fraction.substr(0, decimals);
                    result = parseFloat("" + parts[0] + POINT + fraction);
                }
            }
        }
        return result;
    };
    NumericTextBoxComponent.prototype.formatInputValue = function (value) {
        var stringValue = String(value);
        var exponentMatch = EXPONENT_REGEX.exec(stringValue);
        if (exponentMatch) {
            stringValue = value.toFixed(limitPrecision(parseInt(exponentMatch[1], 10)));
        }
        return stringValue.replace(POINT, this.decimalSeparator);
    };
    NumericTextBoxComponent.prototype.formatValue = function (value, focused) {
        var formattedValue;
        if (value === null || !defined(value) || value === '') {
            formattedValue = '';
        }
        else if (focused && !this.readonly) {
            formattedValue = this.formatInputValue(value);
        }
        else {
            formattedValue = this.intl.formatNumber(value, this.format);
        }
        return formattedValue;
    };
    NumericTextBoxComponent.prototype.setInputValue = function (value, focused) {
        if (value === void 0) { value = this.value; }
        if (focused === void 0) { focused = this.focused; }
        var formattedValue = this.formatValue(value, focused);
        this.elementValue = formattedValue;
        this.inputValue = formattedValue;
    };
    NumericTextBoxComponent.prototype.verifySettings = function () {
        if (!isDevMode()) {
            return;
        }
        if (this.min !== null && this.max !== null && this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    NumericTextBoxComponent.prototype.verifyValue = function (value) {
        if (isDevMode() && value && typeof value !== 'number') {
            throw new Error("The NumericTextBox component requires value of type Number and " + JSON.stringify(value) + " was set.");
        }
    };
    NumericTextBoxComponent.prototype.parseOptions = function (options) {
        for (var idx = 0; idx < options.length; idx++) {
            var name_1 = options[idx];
            var value = this[name_1];
            if (typeof value === 'string') {
                var parsed = parseFloat(value);
                var valid = !isNaN(parsed);
                if (isDevMode() && !valid && value !== '') {
                    throw new Error('The NumericTextBox component requires value of type Number or a String representing ' +
                        ("a number for the " + name_1 + " property and " + JSON.stringify(value) + " was set."));
                }
                this[name_1] = valid ? parsed : PARSABLE_DEFAULTS[name_1];
            }
        }
    };
    NumericTextBoxComponent.prototype.intlChange = function () {
        delete this.numericRegex;
        if (this.numericInput && (!this.focused || !this.isValid(this.elementValue))) {
            this.setInputValue();
        }
    };
    NumericTextBoxComponent.prototype.hasTrailingZeros = function (inputValue) {
        if (this.hasDecimals && this.focused) {
            var fraction = inputValue.split(this.decimalSeparator)[1];
            return fraction && fraction.length > this.decimals && fraction.lastIndexOf('0') === fraction.length - 1;
        }
    };
    NumericTextBoxComponent.prototype.selectAll = function () {
        this.setInputValue();
        this.setSelection(0, this.inputValue.length);
    };
    NumericTextBoxComponent.prototype.selectCaret = function () {
        var caretPosition = getCaretPosition(this.numericInput.nativeElement);
        var formattedValue = this.elementValue;
        var partialValue = formattedValue.substring(0, caretPosition);
        this.setInputValue();
        if (partialValue.length) {
            var significantCharsInFormattedValue = extractSignificantNumericChars(partialValue, this.decimalSeparator);
            var adjustedSignificantChars = this.adjustSignificantChars(formattedValue, significantCharsInFormattedValue);
            this.setSelection(adjustedSignificantChars, adjustedSignificantChars);
        }
        else {
            this.setSelection(0, 0);
        }
    };
    NumericTextBoxComponent.prototype.numberOfLeadingZeroes = function (formattedValue) {
        var separatorIndex = formattedValue.indexOf(this.decimalSeparator);
        var matchedLeadingZeroes = formattedValue.match(/^[^1-9]*?(0+)/);
        if (matchedLeadingZeroes) {
            var lengthOfMatch = matchedLeadingZeroes[0].length;
            var lengthOfLeadingZeroesMatch = matchedLeadingZeroes[1].length;
            return lengthOfMatch === separatorIndex ? lengthOfLeadingZeroesMatch - 1 : lengthOfLeadingZeroesMatch;
        }
        return 0;
    };
    NumericTextBoxComponent.prototype.adjustSignificantChars = function (formattedValue, significantChars) {
        var leadingZeroes = this.numberOfLeadingZeroes(formattedValue);
        if (leadingZeroes > 0) {
            return Math.max(0, significantChars - leadingZeroes);
        }
        return significantChars;
    };
    NumericTextBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoNumericTextBox',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.numerictextbox' },
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return NumericTextBoxComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return NumericTextBoxComponent; }), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(function () { return NumericTextBoxComponent; }) }
                    ],
                    selector: 'kendo-numerictextbox',
                    template: "\n        <ng-container kendoNumericTextBoxLocalizedMessages\n            i18n-increment=\"kendo.numerictextbox.increment|The title for the **Increment** button in the NumericTextBox\"\n            increment=\"Increase value\"\n            i18n-decrement=\"kendo.numerictextbox.decrement|The title for the **Decrement** button in the NumericTextBox\"\n            decrement=\"Decrease value\"\n        >\n        </ng-container>\n        <span\n            class=\"k-numeric-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n            [kendoEventsOutsideAngular]=\"{ mousewheel: handleWheel, DOMMouseScroll: handleWheel }\"\n            #numericWrap>\n            <input\n            role=\"spinbutton\"\n            class=\"k-input k-formatted-value\"\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            [id]=\"focusableId\"\n            [attr.aria-valuemin]=\"min\"\n            [attr.aria-valuemax]=\"max\"\n            [attr.aria-valuenow]=\"value\"\n            [attr.title]=\"title\"\n            [attr.placeholder]=\"placeholder\"\n            [tabindex]=\"tabIndex\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [kendoEventsOutsideAngular]=\"{\n                mousedown: handleMouseDown,\n                dragenter: handleDragEnter,\n                keydown: handleKeyDown,\n                input: handleInput,\n                focus: handleFocus,\n                blur: handleBlur,\n                paste: handlePaste\n            }\"\n            #numericInput />\n            <span class=\"k-select\" *ngIf=\"spinners\" [kendoEventsOutsideAngular]=\"{ mouseup: releaseArrow, mouseleave: releaseArrow }\">\n                <span\n                    [kendoEventsOutsideAngular]=\"{ mousedown: increasePress }\"\n                    [attr.aria-label]=\"incrementTitle\"\n                    [title]=\"incrementTitle\"\n                    [class.k-state-active]=\"arrowDirection === ArrowDirection.Up\"\n                    class=\"k-link k-link-increase\"\n                >\n                    <span class=\"k-icon k-i-arrow-n\"></span>\n                </span>\n                <span\n                    [kendoEventsOutsideAngular]=\"{ mousedown: decreasePress }\"\n                    [attr.aria-label]=\"decrementTitle\"\n                    [title]=\"decrementTitle\"\n                    [class.k-state-active]=\"arrowDirection === ArrowDirection.Down\"\n                    class=\"k-link k-link-decrease\"\n                >\n                    <span class=\"k-icon k-i-arrow-s\"></span>\n                </span>\n            </span>\n        </span>\n      "
                },] },
    ];
    /** @nocollapse */
    NumericTextBoxComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: Injector },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    NumericTextBoxComponent.propDecorators = {
        focusableId: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        title: [{ type: Input }],
        autoCorrect: [{ type: Input }],
        format: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        decimals: [{ type: Input }],
        placeholder: [{ type: Input }],
        step: [{ type: Input }],
        spinners: [{ type: Input }],
        rangeValidation: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        selectOnFocus: [{ type: Input }],
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        numericInput: [{ type: ViewChild, args: ['numericInput', { static: true },] }],
        numericWrap: [{ type: ViewChild, args: ['numericWrap',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-numerictextbox',] }]
    };
    return NumericTextBoxComponent;
}());

/**
 * @hidden
 */
var NumericTextBoxMessages = /** @class */ (function (_super) {
    __extends(NumericTextBoxMessages, _super);
    function NumericTextBoxMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericTextBoxMessages.propDecorators = {
        decrement: [{ type: Input }],
        increment: [{ type: Input }]
    };
    return NumericTextBoxMessages;
}(ComponentMessages));

/**
 * Custom component messages override default component messages.
 */
var NumericTextBoxCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(NumericTextBoxCustomMessagesComponent, _super);
    function NumericTextBoxCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(NumericTextBoxCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: NumericTextBoxMessages,
                            useExisting: forwardRef(function () { return NumericTextBoxCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-numerictextbox-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    NumericTextBoxCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return NumericTextBoxCustomMessagesComponent;
}(NumericTextBoxMessages));

/**
 * @hidden
 */
var ResultType;
(function (ResultType) {
    ResultType[ResultType["Literal"] = 0] = "Literal";
    ResultType[ResultType["Mask"] = 1] = "Mask";
    ResultType[ResultType["Undefined"] = 2] = "Undefined";
})(ResultType || (ResultType = {}));
/**
 * @hidden
 */
var Result = /** @class */ (function () {
    function Result(value, rest, type) {
        if (type === void 0) { type = ResultType.Undefined; }
        this.value = value;
        this.rest = rest;
        this.type = type;
    }
    //map :: Functor f => f a ~> (a -> b) -> f b
    Result.prototype.map = function (fn) {
        return new Result(fn(this.value), this.rest);
    };
    //chain :: Chain m => m a ~> (a -> m b) -> m b
    Result.prototype.chain = function (fn) {
        return fn(this.value, this.rest);
    };
    Result.prototype.fold = function (s, _ /*we don't need it*/) {
        return s(this.value, this.rest);
    };
    Result.prototype.concat = function (r) {
        return this.map(function (vs, _) { return r.chain(function (v, __) { return vs.concat([v]); }); });
    };
    Result.prototype.toString = function () {
        return "Result({ value: '" + this.value + "', rest: " + this.rest + " })";
    };
    return Result;
}());

/**
 * @hidden
 */
var Stream = /** @class */ (function () {
    function Stream(input, control) {
        if (input === void 0) { input = []; }
        if (control === void 0) { control = []; }
        this.input = input;
        this.control = control;
        this.inputCursor = 0;
        this.controlCursor = 0;
    }
    Stream.prototype.eof = function () {
        return this.inputCursor >= this.input.length;
    };
    // Get the first value from the input.
    Stream.prototype.next = function () {
        return {
            char: this.input[this.inputCursor++],
            control: this.control[this.controlCursor++]
        };
    };
    Stream.prototype.peek = function () {
        return {
            char: this.input[this.inputCursor],
            control: this.control[this.controlCursor]
        };
    };
    Stream.prototype.eat_input = function () {
        this.inputCursor++;
    };
    Stream.prototype.eat_control = function () {
        this.controlCursor++;
    };
    Stream.prototype.eat = function () {
        this.inputCursor++;
        this.controlCursor++;
    };
    return Stream;
}());

var toArray = function (value) { return (value || '').split(''); };
var ESCAPE_CHARACTER = '\\';
/**
 * @hidden
 */
var Parser = /** @class */ (function () {
    function Parser(parse) {
        this.parse = parse;
    }
    Parser.prototype.run = function (input, control) {
        if (control === void 0) { control = ''; }
        if (input instanceof Stream) {
            return this.parse(input);
        }
        else {
            return this.parse(new Stream(toArray(input), toArray(control)));
        }
    };
    //map :: Functor f => f a ~> (a -> b) -> f b
    Parser.prototype.map = function (f) {
        var _this = this;
        return new Parser(function (stream) { return _this.parse(stream).map(f); });
    };
    //chain :: Chain m => m a ~> (a -> m b) -> m b
    Parser.prototype.chain = function (f) {
        var _this = this;
        return new Parser(function (stream) { return _this.parse(stream).chain(function (v, s) { return f(v).run(s); }); });
    };
    Parser.prototype.isLiteral = function (c) {
        return this.run(c).type === ResultType.Literal;
    };
    return Parser;
}());
/**
 * @hidden
 */
var mask = function (_a) {
    var prompt = _a.prompt, promptPlaceholder = _a.promptPlaceholder;
    return function (rule) { return new Parser(function (stream) {
        while (!stream.eof()) {
            var _a = stream.peek(), char = _a.char, control = _a.control;
            if (char === control && control === prompt) {
                stream.eat();
                return new Result(prompt, stream, ResultType.Mask);
            }
            if (rule.test(char)) {
                stream.eat();
                return new Result(char, stream, ResultType.Mask);
            }
            if (char === promptPlaceholder) {
                stream.eat();
                return new Result(prompt, stream, ResultType.Mask);
            }
            stream.eat_input();
        }
        stream.eat();
        return new Result(prompt, stream, ResultType.Mask);
    }); };
};
/**
 * @hidden
 */
var literal = function (_token) { return new Parser(function (stream) {
    //    let {char, control} = stream.peek();
    var char = stream.peek().char;
    if (char === _token) {
        stream.eat();
        return new Result(_token, stream, ResultType.Literal);
    }
    //    if (control === _token) {
    //        while (!stream.eof() && char !== _token) {
    //            stream.eat_input();
    //            char = stream.peek().char;
    //        }
    //    }
    //
    //    if (control !== undefined) {
    //        stream.eat();
    //    }
    return new Result(_token, stream, ResultType.Literal);
}); };
/**
 * @hidden
 */
var unmask = function (prompt) { return function (rule) { return new Parser(function (stream) {
    while (!stream.eof()) {
        var _a = stream.peek(), char = _a.char, control = _a.control;
        if (char === prompt && control === prompt) {
            stream.eat();
            return new Result(char, stream);
        }
        if (rule.test(char)) {
            stream.eat();
            return new Result(char, stream);
        }
        stream.eat_input();
    }
    stream.eat();
    return new Result('', stream);
}); }; };
/**
 * @hidden
 */
var unliteral = function (_token) { return new Parser(function (stream) {
    if (stream.eof()) {
        return new Result('', stream);
    }
    var char = stream.peek().char;
    if (char === _token) {
        stream.eat();
    }
    return new Result(_token, stream);
}); };
/**
 * @hidden
 */
var token = function (rules, creator) { return new Parser(function (stream) {
    var char = stream.next().char;
    var rule = rules[char];
    if (char === ESCAPE_CHARACTER) {
        char = stream.next().char;
        return new Result(creator.literal(char), stream);
    }
    if (!rule) {
        return new Result(creator.literal(char), stream);
    }
    return new Result(creator.mask(rule), stream);
}); };
/**
 * @hidden
 */
var rawMask = function (_a) {
    var prompt = _a.prompt, promptPlaceholder = _a.promptPlaceholder;
    return new Parser(function (stream) {
        var char = stream.next().char;
        if (char === prompt) {
            return new Result(promptPlaceholder, stream);
        }
        return new Result(char, stream);
    });
};
/**
 * @hidden
 */
var rawLiteral = function (includeLiterals) { return new Parser(function (stream) {
    var char = stream.next().char;
    if (includeLiterals) {
        return new Result(char, stream);
    }
    return new Result('', stream);
}); };

/**
 * @hidden
 */
var always = function (value) { return new Parser(function (stream) { return new Result(value, stream); }); };
/**
 * @hidden
 */
var append = function (p1, p2) { return p1.chain(function (vs) { return p2.map(function (v) { return vs.concat([v]); }); }); };
/**
 * @hidden
 */
var sequence = function (list) { return list.reduce(function (acc, parser) { return append(acc, parser); }, always([])); };
/**
 * @hidden
 */
var greedy = function (parser) { return new Parser(function (stream) {
    var result = new Result([], stream);
    while (!stream.eof()) {
        result = result.concat(parser.run(stream));
    }
    return result;
}); };

/**
 * @hidden
 */
var MaskingService = /** @class */ (function () {
    function MaskingService() {
        this.rules = {};
        this.prompt = "_";
        this.mask = "";
        this.promptPlaceholder = " ";
        this.includeLiterals = false;
        this.maskTokens = [];
        this.unmaskTokens = [];
        this.rawTokens = [];
        this.validationTokens = [];
    }
    MaskingService.prototype.update = function (_a) {
        var _b = _a.mask, mask$$1 = _b === void 0 ? '' : _b, _c = _a.prompt, prompt = _c === void 0 ? '' : _c, _d = _a.promptPlaceholder, promptPlaceholder = _d === void 0 ? ' ' : _d, _e = _a.rules, rules = _e === void 0 ? {} : _e, _f = _a.includeLiterals, includeLiterals = _f === void 0 ? false : _f;
        this.mask = mask$$1;
        this.prompt = prompt;
        this.promptPlaceholder = promptPlaceholder;
        this.rules = rules;
        this.includeLiterals = includeLiterals;
        this.tokenize();
    };
    MaskingService.prototype.validationValue = function (maskedValue) {
        if (maskedValue === void 0) { maskedValue = ''; }
        var value = maskedValue;
        sequence(this.validationTokens)
            .run(maskedValue)
            .fold(function (unmasked) {
            value = unmasked.join('');
        });
        return value;
    };
    MaskingService.prototype.rawValue = function (maskedValue) {
        if (maskedValue === void 0) { maskedValue = ''; }
        var value = maskedValue;
        if (!this.rawTokens.length) {
            return value;
        }
        sequence(this.rawTokens)
            .run(maskedValue)
            .fold(function (unmasked) {
            value = unmasked.join('');
        });
        return value;
    };
    /**
     * @hidden
     */
    MaskingService.prototype.maskRaw = function (rawValue) {
        if (rawValue === void 0) { rawValue = ''; }
        var value = rawValue;
        if (!this.maskTokens.length) {
            return value;
        }
        sequence(this.maskTokens)
            .run(rawValue)
            .fold(function (masked) {
            value = masked.join('');
        });
        return value;
    };
    MaskingService.prototype.maskInput = function (input, control, splitPoint) {
        if (input.length < control.length) {
            return this.maskRemoved(input, control, splitPoint);
        }
        return this.maskInserted(input, control, splitPoint);
    };
    MaskingService.prototype.maskInRange = function (pasted, oldValue, start, end) {
        var value = '';
        var selection = end;
        var beforeChange = oldValue.split('').slice(0, start);
        var afterChange = oldValue.split('').slice(end);
        sequence(this.maskTokens.slice(start, end))
            .run(pasted)
            .fold(function (masked) {
            value = beforeChange
                .concat(masked)
                .concat(afterChange)
                .join('');
        });
        return {
            selection: selection,
            value: value
        };
    };
    MaskingService.prototype.maskRemoved = function (input, control, splitPoint) {
        var _this = this;
        var value = '';
        var selection = splitPoint;
        var unchanged = input.split('').slice(splitPoint);
        var changed = input.split('').slice(0, splitPoint).join('');
        var take$$1 = this.maskTokens.length - (input.length - splitPoint);
        sequence(this.maskTokens.slice(0, take$$1))
            .run(changed, control)
            .fold(function (masked) {
            selection = _this.adjustPosition(masked, selection);
            value = masked.concat(unchanged).join('');
        });
        return {
            selection: selection,
            value: value
        };
    };
    MaskingService.prototype.adjustPosition = function (input, selection) {
        var caretChar = input[selection];
        var isLiteral = this.maskTokens[selection].isLiteral(caretChar);
        if (!isLiteral && caretChar !== this.prompt) {
            return selection + 1;
        }
        return selection;
    };
    MaskingService.prototype.maskInserted = function (input, control, splitPoint) {
        var _this = this;
        var value = '';
        var selection = splitPoint;
        var changed = input.slice(0, splitPoint);
        sequence(this.unmaskTokens)
            .run(changed, control)
            .chain(function (unmasked) {
            selection = unmasked.join('').length;
            var unchanged = control.slice(selection);
            return sequence(_this.maskTokens)
                .run(unmasked.join('') + unchanged, control);
        })
            .fold(function (masked) {
            value = masked.join('');
        });
        return {
            selection: selection,
            value: value
        };
    };
    Object.defineProperty(MaskingService.prototype, "maskTokenCreator", {
        get: function () {
            var _a = this, prompt = _a.prompt, promptPlaceholder = _a.promptPlaceholder;
            return {
                literal: function (rule) { return literal(rule); },
                mask: function (rule) { return mask({ prompt: prompt, promptPlaceholder: promptPlaceholder })(rule); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskingService.prototype, "unmaskTokenCreator", {
        get: function () {
            var _this = this;
            return {
                literal: function (rule) { return unliteral(rule); },
                mask: function (rule) { return unmask(_this.prompt)(rule); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskingService.prototype, "rawTokenCreator", {
        get: function () {
            var _a = this, prompt = _a.prompt, promptPlaceholder = _a.promptPlaceholder, includeLiterals = _a.includeLiterals;
            return {
                literal: function (_) { return rawLiteral(includeLiterals); },
                mask: function (_) { return rawMask({ prompt: prompt, promptPlaceholder: promptPlaceholder }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskingService.prototype, "validationTokenCreator", {
        get: function () {
            var prompt = this.prompt;
            return {
                literal: function (_) { return rawLiteral(false); },
                mask: function (_) { return rawMask({ prompt: prompt, promptPlaceholder: '' }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    MaskingService.prototype.tokenize = function () {
        var _this = this;
        greedy(token(this.rules, this.maskTokenCreator))
            .run(this.mask)
            .fold(function (tokens, _) {
            _this.maskTokens = tokens;
        });
        greedy(token(this.rules, this.unmaskTokenCreator))
            .run(this.mask)
            .fold(function (tokens, _) {
            _this.unmaskTokens = tokens;
        });
        greedy(token(this.rules, this.rawTokenCreator))
            .run(this.mask)
            .fold(function (tokens, _) {
            _this.rawTokens = tokens;
        });
        greedy(token(this.rules, this.validationTokenCreator))
            .run(this.mask)
            .fold(function (tokens, _) {
            _this.validationTokens = tokens;
        });
    };
    MaskingService.decorators = [
        { type: Injectable },
    ];
    return MaskingService;
}());

var resolvedPromise = Promise.resolve(null);
var FOCUSED$3 = 'k-state-focused';
/**
 * Represents the [Kendo UI MaskedTextBox component for Angular]({% slug overview_maskedtextbox %}).
 *
 * @example
 * ```ts-no-run
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *      <kendo-maskedtextbox
 *          [mask]="mask"
 *          [value]="value">
 *      </kendo-maskedtextbox>
 *     `
 * })
 *
 * class AppComponent {
 *  public value: string = "9580128055807792";
 *  public mask: string = "0000-0000-0000-0000";
 * }
 * ```
 */
var MaskedTextBoxComponent = /** @class */ (function () {
    function MaskedTextBoxComponent(service, renderer, hostElement, ngZone, injector, changeDetector, rtl) {
        var _this = this;
        this.service = service;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.injector = injector;
        this.changeDetector = changeDetector;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Determines whether the MaskedTextBox is disabled ([see example]({% slug disabled_maskedtextbox %})).
         */
        this.disabled = false;
        /**
         * Determines whether the MaskedTextBox is in its read-only state ([see example]({% slug readonly_maskedtextbox %})).
         */
        this.readonly = false;
        this.hostClasses = true;
        /**
         * Represents a prompt character for the masked value.
         * @default `_`
         */
        this.prompt = '_';
        /**
         * Indicates a character which represents an empty position in the raw value.
         * @default ' '
         */
        this.promptPlaceholder = ' ';
        /**
         * Indicates whether to include literals in the raw value  ([see example]({% slug value_maskedtextbox %})).
         * @default false
         */
        this.includeLiterals = false;
        /**
         * Specifies if the mask should be shown on focus for empty value.
         */
        this.maskOnFocus = false;
        /**
         * Determines whether the built-in mask validator is enforced when a form is validated
         * ([see example]({% slug validation_maskedtextbox %})).
         * @default true
         */
        this.maskValidation = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Fires each time the user focuses the `input` element.
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts-no-run
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-maskedtextbox (focus)="handleFocus()"></kendo-maskedtextbox>
         * `
         * })
         * class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the `input` element gets blurred.
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts-no-run
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-maskedtextbox (blur)="handleBlur()"></kendo-maskedtextbox>
         * `
         * })
         * class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the value changes.
         */
        this.valueChange = new EventEmitter();
        this.focusClick = false;
        this.defaultRules = {
            "#": /[\d\s\+\-]/,
            "&": /[\S]/,
            "0": /[\d]/,
            "9": /[\d\s]/,
            "?": /[a-zA-Z\s]/,
            "A": /[a-zA-Z0-9]/,
            "C": /./,
            "L": /[a-zA-Z]/,
            "a": /[a-zA-Z0-9\s]/
        };
        this.isPasted = false;
        this.selection = [0, 0];
        /**
         * @hidden
         */
        this.handleFocus = function () {
            _this.focused = true;
            if (_this.maskOnFocus && _this.emptyMask) {
                _this.updateInput(_this.service.maskRaw(_this.value));
                _this.ngZone.runOutsideAngular(function () {
                    setTimeout(function () { _this.setSelection(0, 0); }, 0);
                });
            }
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleClick = function () {
            if (_this.focused && !_this.focusClick) {
                _this.focusClick = true;
                var _a = _this.input.nativeElement, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
                if (selectionStart === selectionEnd) {
                    _this.setFocusSelection();
                }
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            _this.focusClick = false;
            if (_this.maskOnFocus && _this.emptyMask) {
                _this.updateInput(_this.maskedValue);
            }
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.onTouched();
                    _this.onBlur.emit();
                });
            }
        };
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.updateService();
    }
    Object.defineProperty(MaskedTextBoxComponent.prototype, "hostDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedTextBoxComponent.prototype, "rules", {
        /**
         * Exposes the RegExp-based mask validation array ([see example]({% slug masks_maskedtextbox %})).
         */
        get: function () {
            return this._rules || this.defaultRules;
        },
        set: function (value) {
            this._rules = Object.assign({}, this.defaultRules, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedTextBoxComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    MaskedTextBoxComponent.prototype.ngOnInit = function () {
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the MaskedTextBox is empty.
     */
    MaskedTextBoxComponent.prototype.isEmpty = function () {
        if (this.input) {
            return !Boolean(this.input.nativeElement.value);
        }
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.handleDragDrop = function () {
        return false;
    };
    /**
     * Focuses the MaskedTextBox.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="maskedinput.focus()">Focus the input</button>
     *  <kendo-maskedtextbox #maskedinput></kendo-maskedtextbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    MaskedTextBoxComponent.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.focus();
        this.setFocusSelection();
    };
    /**
     * Blurs the MaskedTextBox.
     */
    MaskedTextBoxComponent.prototype.blur = function () {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.blur();
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.pasteHandler = function (e) {
        var _a = e.target, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
        if (selectionEnd === selectionStart) {
            return;
        }
        this.isPasted = true;
        this.selection = [selectionStart, selectionEnd];
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.inputHandler = function (e) {
        var value = e.target.value;
        var _a = this.selection, start = _a[0], end = _a[1];
        if (!this.mask) {
            this.updateValue(value);
            this.isPasted = false;
            return;
        }
        var result;
        if (this.isPasted) {
            this.isPasted = false;
            var rightPart = this.maskedValue.length - end;
            var to = value.length - rightPart;
            result = this.service.maskInRange(value.slice(start, to), this.maskedValue, start, end);
        }
        else {
            result = this.service.maskInput(value, this.maskedValue, e.target.selectionStart);
        }
        this.updateInput(result.value, result.selection);
        this.updateValue(result.value);
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.value) {
            this.value = this.normalizeValue();
        }
        if (!this.mask) {
            this.updateInput(this.value);
            return;
        }
        var next = this.extractChanges(changes);
        this.updateService(next);
        if (isChanged('value', changes)) {
            var maskedValue = this.service.maskRaw(this.value);
            if (maskedValue !== this.maskedValue) {
                this.updateInput(maskedValue);
            }
        }
        else if (anyChanged(['promptPlaceholder', 'includeLiterals'], changes)) {
            resolvedPromise.then(function () {
                _this.updateValue(_this.maskedValue);
            });
        }
        else {
            this.updateInput(this.service.maskRaw(this.value));
        }
    };
    /**
     * @hidden
     * Writes a new value to the element.
     */
    MaskedTextBoxComponent.prototype.writeValue = function (value) {
        this.value = this.normalizeValue(value);
        this.updateInput(this.service.maskRaw(this.value));
    };
    /**
     * @hidden
     * Sets the function that will be called when a `change` event is triggered.
     */
    MaskedTextBoxComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @hidden
     * Sets the function that will be called when a `touch` event is triggered.
     */
    MaskedTextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    MaskedTextBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.validate = function (_) {
        if (this.maskValidation === false || !this.mask) {
            return null;
        }
        if (!this.service.validationValue(this.maskedValue)) {
            return null;
        }
        if (this.maskedValue.indexOf(this.prompt) !== -1) {
            return {
                patternError: {
                    mask: this.mask,
                    maskedValue: this.maskedValue,
                    value: this.value
                }
            };
        }
        return null;
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.updateValue = function (maskedValue) {
        if (this.mask && !this.service.validationValue(maskedValue)) {
            this.value = '';
        }
        else {
            this.value = this.service.rawValue(maskedValue);
        }
        this.onChange(this.value);
        this.valueChange.emit(this.value);
    };
    MaskedTextBoxComponent.prototype.updateInput = function (maskedValue, selection) {
        if (maskedValue === void 0) { maskedValue = ''; }
        this.maskedValue = maskedValue;
        var value = this.maskOnFocus && !this.focused && this.emptyMask ? '' : maskedValue;
        this.renderer.setProperty(this.input.nativeElement, "value", value);
        if (selection !== undefined) {
            this.setSelection(selection, selection);
        }
    };
    MaskedTextBoxComponent.prototype.extractChanges = function (changes) {
        return Object.keys(changes).filter(function (key) { return key !== 'rules'; }).reduce(function (obj, key) {
            obj[key] = changes[key].currentValue;
            return obj;
        }, {}); // tslint:disable-line:align
    };
    MaskedTextBoxComponent.prototype.updateService = function (extra) {
        var config = Object.assign({
            includeLiterals: this.includeLiterals,
            mask: this.mask,
            prompt: this.prompt,
            promptPlaceholder: this.promptPlaceholder,
            rules: this.rules
        }, extra); // tslint:disable-line:align
        this.service.update(config);
    };
    MaskedTextBoxComponent.prototype.setSelection = function (start, end) {
        if (start === void 0) { start = this.selection[0]; }
        if (end === void 0) { end = this.selection[1]; }
        if (this.focused) {
            invokeElementMethod(this.input, 'setSelectionRange', start, end);
        }
    };
    Object.defineProperty(MaskedTextBoxComponent.prototype, "emptyMask", {
        get: function () {
            return this.service.maskRaw() === this.maskedValue;
        },
        enumerable: true,
        configurable: true
    });
    MaskedTextBoxComponent.prototype.setFocusSelection = function () {
        var selectionStart = this.input.nativeElement.selectionStart;
        var index = this.maskedValue ? this.maskedValue.indexOf(this.prompt) : 0;
        if (index >= 0 && index < selectionStart) {
            this.selection = [index, index];
            this.setSelection();
        }
    };
    Object.defineProperty(MaskedTextBoxComponent.prototype, "focused", {
        get: function () {
            return this.isFocused;
        },
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                var element = this.hostElement.nativeElement;
                if (value) {
                    this.renderer.addClass(element, FOCUSED$3);
                }
                else {
                    this.renderer.removeClass(element, FOCUSED$3);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    MaskedTextBoxComponent.prototype.normalizeValue = function (value) {
        if (value === void 0) { value = this.value; }
        var present = isPresent(value);
        if (present && typeof value !== 'string') {
            if (isDevMode()) {
                throw new Error('The MaskedTextBox component supports only string values.');
            }
            return String(value);
        }
        return present ? value : '';
    };
    MaskedTextBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoMaskedTextBox',
                    providers: [
                        MaskingService,
                        {
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MaskedTextBoxComponent; }) /* tslint:disable-line */
                        },
                        {
                            multi: true,
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(function () { return MaskedTextBoxComponent; }) /* tslint:disable-line */
                        },
                        {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return MaskedTextBoxComponent; })
                        }
                    ],
                    selector: 'kendo-maskedtextbox',
                    template: "\n        <input type=\"text\"\n            #input\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            autocapitalize=\"off\"\n            spellcheck=\"false\"\n            class=\"k-textbox\"\n            [id]=\"focusableId\"\n            [tabindex]=\"tabIndex\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [kendoEventsOutsideAngular]=\"{\n                focus: handleFocus,\n                blur: handleBlur,\n                click: handleClick,\n                dragstart: handleDragDrop,\n                drop: handleDragDrop\n            }\"\n        />\n    "
                },] },
    ];
    /** @nocollapse */
    MaskedTextBoxComponent.ctorParameters = function () { return [
        { type: MaskingService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: Injector },
        { type: ChangeDetectorRef },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    MaskedTextBoxComponent.propDecorators = {
        focusableId: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        title: [{ type: Input }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-maskedtextbox',] }],
        hostDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        mask: [{ type: Input }],
        value: [{ type: Input }],
        rules: [{ type: Input }],
        prompt: [{ type: Input }],
        promptPlaceholder: [{ type: Input }],
        includeLiterals: [{ type: Input }],
        maskOnFocus: [{ type: Input }],
        maskValidation: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        valueChange: [{ type: Output }],
        input: [{ type: ViewChild, args: ['input', { static: true },] }],
        pasteHandler: [{ type: HostListener, args: ['paste', ['$event'],] }],
        inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }]
    };
    return MaskedTextBoxComponent;
}());

/* tslint:disable:component-selector */
/**
 * @hidden
 */
var SliderTick = /** @class */ (function () {
    function SliderTick(value) {
        this.value = value;
        this.classes = {
            'k-tick': true
        };
    }
    return SliderTick;
}());
/**
 * @hidden
 */
var SliderTicksComponent = /** @class */ (function () {
    function SliderTicksComponent(rtl) {
        this.rtl = rtl;
        this.wrapperClasses = 'k-reset k-slider-items';
        this.ticks = [];
    }
    SliderTicksComponent.prototype.ngOnChanges = function (_) {
        this.createTicks();
    };
    SliderTicksComponent.prototype.createTicks = function () {
        var count = calculateTicksCount(this.min, this.max, this.step);
        var largeStep = this.largeStep;
        var tickValueProps = {
            max: this.max,
            min: this.min,
            smallStep: this.step
        };
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(new SliderTick(calculateValueFromTick(i, tickValueProps)));
            if (largeStep && i % largeStep === 0) {
                result[i].large = true;
                result[i].classes['k-tick-large'] = true;
            }
        }
        if (this.rtl || this.vertical) {
            result = result.reverse();
        }
        if (result.length > 0) {
            Object.assign(result[0].classes, this.endTickClasses(true));
            Object.assign(result[result.length - 1].classes, this.endTickClasses(false));
        }
        this.ticks = result;
    };
    SliderTicksComponent.prototype.endTickClasses = function (first) {
        return {
            'k-first': (first && !this.vertical) || (!first && this.vertical),
            'k-last': (!first && !this.vertical) || (first && this.vertical)
        };
    };
    SliderTicksComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoSliderTicks]',
                    template: "\n    <li #tickElement *ngFor=\"let tick of ticks;\"\n        [ngClass]=\"tick.classes\"\n        title=\"{{ tickTitle(tick.value) }}\"\n        role=\"presentation\"\n     >\n         <ng-container [ngSwitch]=\"tick.large\">\n            <span class=\"k-label\" *ngSwitchCase=\"true\">\n                <ng-container [ngTemplateOutlet]=\"labelTemplate || defaultLabel\" [ngTemplateOutletContext]=\"tick\">\n                </ng-container>\n            </span>\n            <ng-container *ngSwitchCase=\"false\">&nbsp;</ng-container>\n         </ng-container>\n     </li>\n\n     <ng-template #defaultLabel let-value=\"value\">\n        {{ tickTitle(value) }}\n     </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    SliderTicksComponent.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    SliderTicksComponent.propDecorators = {
        wrapperClasses: [{ type: HostBinding, args: ['class',] }],
        tickTitle: [{ type: Input }],
        vertical: [{ type: Input }],
        step: [{ type: Input }],
        largeStep: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        labelTemplate: [{ type: Input }],
        tickElements: [{ type: ViewChildren, args: ['tickElement',] }]
    };
    return SliderTicksComponent;
}());

/**
 * @hidden
 */
var SlidersCommonModule = /** @class */ (function () {
    function SlidersCommonModule() {
    }
    SlidersCommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SliderTicksComponent,
                        LabelTemplateDirective
                    ],
                    exports: [
                        LabelTemplateDirective,
                        SliderTicksComponent,
                        DraggableModule,
                        EventsModule,
                        ResizeSensorModule
                    ],
                    imports: [CommonModule, DraggableModule, EventsModule, ResizeSensorModule]
                },] },
    ];
    return SlidersCommonModule;
}());

/**
 * @hidden
 */
var SliderMessages = /** @class */ (function (_super) {
    __extends(SliderMessages, _super);
    function SliderMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderMessages.propDecorators = {
        decrement: [{ type: Input }],
        increment: [{ type: Input }],
        dragHandle: [{ type: Input }]
    };
    return SliderMessages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedSliderMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedSliderMessagesDirective, _super);
    function LocalizedSliderMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedSliderMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: SliderMessages,
                            useExisting: forwardRef(function () { return LocalizedSliderMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoSliderLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedSliderMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedSliderMessagesDirective;
}(SliderMessages));

/**
 * Custom component messages override default component messages.
 */
var SliderCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(SliderCustomMessagesComponent, _super);
    function SliderCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(SliderCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SliderCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: SliderMessages,
                            useExisting: forwardRef(function () { return SliderCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-slider-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SliderCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return SliderCustomMessagesComponent;
}(SliderMessages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Slider component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Inputs module
 * import { SliderModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, SliderModule], // import Slider module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var SliderModule = /** @class */ (function () {
    function SliderModule() {
    }
    SliderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SliderComponent,
                        SliderCustomMessagesComponent,
                        LocalizedSliderMessagesDirective
                    ],
                    exports: [
                        SliderComponent,
                        SliderCustomMessagesComponent,
                        LabelTemplateDirective,
                        LocalizedSliderMessagesDirective
                    ],
                    imports: [CommonModule, SlidersCommonModule]
                },] },
    ];
    return SliderModule;
}());

/**
 * @hidden
 */
var RangeSliderMessages = /** @class */ (function (_super) {
    __extends(RangeSliderMessages, _super);
    function RangeSliderMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSliderMessages.propDecorators = {
        dragHandleStart: [{ type: Input }],
        dragHandleEnd: [{ type: Input }]
    };
    return RangeSliderMessages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedRangeSliderMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedRangeSliderMessagesDirective, _super);
    function LocalizedRangeSliderMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedRangeSliderMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: RangeSliderMessages,
                            useExisting: forwardRef(function () { return LocalizedRangeSliderMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoSliderLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedRangeSliderMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedRangeSliderMessagesDirective;
}(RangeSliderMessages));

/**
 * Custom component messages override default component messages.
 */
var RangeSliderCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(RangeSliderCustomMessagesComponent, _super);
    function RangeSliderCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(RangeSliderCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RangeSliderCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: RangeSliderMessages,
                            useExisting: forwardRef(function () { return RangeSliderCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-rangeslider-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    RangeSliderCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return RangeSliderCustomMessagesComponent;
}(RangeSliderMessages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the RangeSlider component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Inputs module
 * import { RangeSliderModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, RangeSliderModule], // import RangeSlider module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var RangeSliderModule = /** @class */ (function () {
    function RangeSliderModule() {
    }
    RangeSliderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        RangeSliderComponent,
                        RangeSliderCustomMessagesComponent,
                        LocalizedRangeSliderMessagesDirective
                    ],
                    exports: [
                        RangeSliderComponent,
                        RangeSliderCustomMessagesComponent,
                        LocalizedRangeSliderMessagesDirective,
                        LabelTemplateDirective
                    ],
                    imports: [CommonModule, SlidersCommonModule]
                },] },
    ];
    return RangeSliderModule;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        on: [{ type: Input }],
        off: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedSwitchMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedSwitchMessagesDirective, _super);
    function LocalizedSwitchMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedSwitchMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedSwitchMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoSwitchLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedSwitchMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedSwitchMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages.
 */
var SwitchCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(SwitchCustomMessagesComponent, _super);
    function SwitchCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(SwitchCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SwitchCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return SwitchCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-switch-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SwitchCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return SwitchCustomMessagesComponent;
}(Messages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Switch component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Switch module
 * import { SwitchModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, SwitchModule], // import Switch module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var SwitchModule = /** @class */ (function () {
    function SwitchModule() {
    }
    SwitchModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SwitchComponent,
                        SwitchCustomMessagesComponent,
                        LocalizedSwitchMessagesDirective
                    ],
                    exports: [
                        SwitchComponent,
                        SwitchCustomMessagesComponent,
                        LocalizedSwitchMessagesDirective
                    ],
                    imports: [CommonModule, EventsModule, ResizeSensorModule]
                },] },
    ];
    return SwitchModule;
}());

/**
 * @hidden
 */
var LocalizedNumericTextBoxMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedNumericTextBoxMessagesDirective, _super);
    function LocalizedNumericTextBoxMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedNumericTextBoxMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: NumericTextBoxMessages,
                            useExisting: forwardRef(function () { return LocalizedNumericTextBoxMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoNumericTextBoxLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedNumericTextBoxMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedNumericTextBoxMessagesDirective;
}(NumericTextBoxMessages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the NumericTextBox component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the NumericTextBox module
 * import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, NumericTextBoxModule], // import NumericTextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var NumericTextBoxModule = /** @class */ (function () {
    function NumericTextBoxModule() {
    }
    NumericTextBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        LocalizedNumericTextBoxMessagesDirective,
                        NumericTextBoxComponent,
                        NumericTextBoxCustomMessagesComponent
                    ],
                    exports: [
                        NumericTextBoxComponent,
                        NumericTextBoxCustomMessagesComponent
                    ],
                    imports: [CommonModule, EventsModule]
                },] },
    ];
    return NumericTextBoxModule;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the MaskedTextBox component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the MaskedTextBox module
 * import { MaskedTextBoxModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, MaskedTextBoxModule], // import MaskedTextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var MaskedTextBoxModule = /** @class */ (function () {
    function MaskedTextBoxModule() {
    }
    MaskedTextBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MaskedTextBoxComponent],
                    exports: [MaskedTextBoxComponent],
                    imports: [CommonModule, EventsModule]
                },] },
    ];
    return MaskedTextBoxModule;
}());

/**
 * Specifies the adornments in the suffix container ([see examples]({% slug adornments_textbox %}#toc-suffixadornments)).
 *  @example
 * ```ts-no-run
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-textbox>
 *    <ng-template kendoTextBoxSuffixTemplate>
 *        <button kendoButton look="clear" icon="image"></button>
 *    </ng-template>
 *  </kendo-textbox>
 * `
 * })
 * class AppComponent {}
 * ```
 */
var TextBoxSuffixTemplateDirective = /** @class */ (function () {
    function TextBoxSuffixTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TextBoxSuffixTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTextBoxSuffixTemplate]'
                },] },
    ];
    /** @nocollapse */
    TextBoxSuffixTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return TextBoxSuffixTemplateDirective;
}());

/**
 * Specifies the adornments in the prefix container ([see examples]({% slug adornments_textbox %}#toc-prefixadornments)).
 * @example
 * ```ts-no-run
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-textbox>
 *    <ng-template kendoTextBoxPrefixTemplate>
 *        <button kendoButton look="clear" icon="image"></button>
 *    </ng-template>
 *  </kendo-textbox>
 * `
 * })
 * class AppComponent {}
 * ```
 */
var TextBoxPrefixTemplateDirective = /** @class */ (function () {
    function TextBoxPrefixTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TextBoxPrefixTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTextBoxPrefixTemplate]'
                },] },
    ];
    /** @nocollapse */
    TextBoxPrefixTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return TextBoxPrefixTemplateDirective;
}());

var TextBoxComponent = /** @class */ (function () {
    function TextBoxComponent(localizationService, ngZone, changeDetector, renderer, injector, hostElement) {
        var _this = this;
        this.localizationService = localizationService;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        this.injector = injector;
        this.hostElement = hostElement;
        /**
         * Sets the `title` attribute of the `input` element of the TextBox.
         */
        this.title = '';
        /**
         * Sets the disabled state of the component.
         *
         * @default false
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         *
         * @default false
         */
        this.readonly = false;
        /**
         * Specifies the `tabindex` of the TextBox.
         *
         * @default 0
         */
        this.tabindex = 0;
        /**
         * Provides a value for the TextBox.
         */
        this.value = null;
        /**
         * Determines whether the whole value will be selected when the TextBox is clicked. Defaults to `false`.
         *
         * @default false
         */
        this.selectOnFocus = false;
        /**
         * Specifies when the Success icon will be shown ([see example]({% slug validation_textbox %})).
         *
         * The possible values are:
         *
         * `boolean`&mdash;The Success icon is displayed, if the condition given by the developer is met.
         *
         * `initial`&mdash;The Success icon will be displayed when the component state is neither `invalid` nor `touched` or `dirty`.
         *
         * @default false
         */
        this.showSuccessIcon = false;
        /**
         * Specifies when the Error icon will be shown ([see example]({% slug validation_textbox %})).
         *
         * The possible values are:
         *
         * * `initial`&mdash;The Error icon will be displayed when the component state is
         * `invalid` and `touched` or `dirty`.
         * * `boolean`&mdash;The Error icon is displayed, if the condition given by the developer is met.
         *
         * @default false
         */
        this.showErrorIcon = false;
        /**
         * Specifies whether a Clear button will be rendered.
         *
         * @default false
         */
        this.clearButton = false;
        /**
         * Fires each time the value is changed&mdash;
         * when the component is blurred or the value is cleared through the **Clear** button
         * ([see example]({% slug overview_textbox %}#toc-events)).
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the `input` element.
         */
        this.inputFocus = new EventEmitter();
        /**
         * Fires each time the `input` element gets blurred.
         */
        this.inputBlur = new EventEmitter();
        /**
         * Fires each time the user focuses the TextBox component.
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts-no-run
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-textbox (focus)="handleFocus()"></kendo-textbox>
         * `
         * })
         * class AppComponent {
         *   public handleFocus(): void {
         *      console.log('Component is isFocused');
         *   }
         * }
         * ```
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the TextBox component gets blurred.
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts-no-run
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-textbox (blur)="handleBlur()"></kendo-textbox>
         * `
         * })
         * class AppComponent {
         *   public handleBlur(): void {
         *      console.log('Component is blurred');
         *   }
         * }
         * ```
         */
        this.onBlur = new EventEmitter();
        this.hostClass = true;
        this._isFocused = false;
        this.focusChangedProgrammatically = false;
        /**
         * @hidden
         */
        this.handleInputFocus = function () {
            if (!_this.disabled) {
                if (_this.selectOnFocus && _this.value) {
                    _this.ngZone.run(function () {
                        setTimeout(function () { _this.selectAll(); });
                    });
                }
                if (hasObservers(_this.onFocus)) {
                    if (!_this.isFocused) {
                        _this.ngZone.run(function () {
                            _this.onFocus.emit();
                        });
                    }
                }
                if (hasObservers(_this.inputFocus)) {
                    if (!_this.focusChangedProgrammatically || (_this.focusChangedProgrammatically && _this.clearButtonClicked)) {
                        _this.ngZone.run(function () {
                            _this.inputFocus.emit();
                        });
                    }
                }
                _this.ngZone.run(function () {
                    _this.isFocused = true;
                });
            }
        };
        /**
         * @hidden
         */
        this.handleInputBlur = function () {
            _this.changeDetector.markForCheck();
            if (hasObservers(_this.inputBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.inputBlur.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleInput = function (ev) {
            var incomingValue = ev.target.value;
            _this.updateValue(incomingValue);
        };
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(TextBoxComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxComponent.prototype, "isFocused", {
        get: function () {
            return this.disabled ? false : this._isFocused;
        },
        set: function (isFocused) {
            this._isFocused = isFocused;
        },
        enumerable: true,
        configurable: true
    });
    TextBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.control = this.injector.get(NgControl, null);
        this.checkClearButton();
        this.subscriptions = this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    };
    TextBoxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var hostElement = this.hostElement.nativeElement;
        var cursorInsideWrapper = false;
        var tabbing = false;
        this.ngZone.runOutsideAngular(function () {
            // focusIn and focusOut are relative to the host element
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'focusin', function () {
                if (!_this.isFocused) {
                    _this.ngZone.run(function () {
                        _this.onFocus.emit();
                        _this.isFocused = true;
                    });
                }
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'focusout', function (args) {
                if (!_this.isFocused) {
                    return;
                }
                if (tabbing) {
                    var closestTextbox = closest(args.relatedTarget, function (element) { return element === _this.hostElement.nativeElement; });
                    if (!closestTextbox) {
                        _this.handleBlur();
                    }
                    tabbing = false;
                }
                else {
                    if (!cursorInsideWrapper && !_this.clearButtonClicked) {
                        _this.handleBlur();
                    }
                }
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'mouseenter', function () {
                cursorInsideWrapper = true;
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'mouseleave', function () {
                cursorInsideWrapper = false;
            }));
            _this.subscriptions.add(_this.renderer.listen(hostElement, 'keydown', function (args) {
                if (args.keyCode === Keys.Tab) {
                    tabbing = true;
                }
                else {
                    tabbing = false;
                }
            }));
        });
    };
    TextBoxComponent.prototype.ngOnChanges = function (changes) {
        if (changes.disabled || changes.readonly) {
            this.checkClearButton();
        }
    };
    TextBoxComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    /**
     * Focuses the TextBox.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="input.focus()">Focus the input</button>
     *  <kendo-textbox #input></kendo-textbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    TextBoxComponent.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.focusChangedProgrammatically = true;
        this.isFocused = true;
        this.input.nativeElement.focus();
        this.focusChangedProgrammatically = false;
    };
    /**
     * Blurs the TextBox.
     */
    TextBoxComponent.prototype.blur = function () {
        this.focusChangedProgrammatically = true;
        var isFocusedElement = this.hostElement.nativeElement.querySelector(':focus');
        if (isFocusedElement) {
            isFocusedElement.blur();
        }
        this.isFocused = false;
        this.focusChangedProgrammatically = false;
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.clearTitle = function () {
        return this.localizationService.get('clear');
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.checkClearButton = function () {
        this.showClearButton =
            !this.disabled &&
                !this.readonly &&
                this.clearButton &&
                !!this.value;
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.clearValue = function (ev) {
        if (ev) {
            ev.preventDefault();
        }
        this.clearButtonClicked = true;
        this.input.nativeElement.value = '';
        this.input.nativeElement.focus();
        this.updateValue(null);
        this.checkClearButton();
        this.clearButtonClicked = false;
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.checkClearButton();
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    TextBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.showErrorsInitial = function () {
        if (!this.control) {
            return false;
        }
        var _a = this.control, invalid = _a.invalid, dirty = _a.dirty, touched = _a.touched;
        return invalid && (dirty || touched);
    };
    /**
     * @hidden
     */
    TextBoxComponent.prototype.showSuccessInitial = function () {
        if (!this.control) {
            return false;
        }
        var _a = this.control, valid = _a.valid, dirty = _a.dirty, touched = _a.touched;
        return valid && (dirty || touched);
    };
    Object.defineProperty(TextBoxComponent.prototype, "successIconClasses", {
        /**
         * @hidden
         */
        get: function () {
            return this.successIcon
                ? "k-text-success " + this.successIcon
                : "k-text-success k-icon k-i-check-outline";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxComponent.prototype, "errorIconClasses", {
        /**
         * @hidden
         */
        get: function () {
            return this.errorIcon
                ? "k-text-error " + this.errorIcon
                : "k-text-error k-icon k-i-warning";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxComponent.prototype, "clearButtonClasses", {
        /**
         * @hidden
         */
        get: function () {
            return this.clearButtonIcon
                ? this.clearButtonIcon
                : "k-icon k-i-close-circle";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxComponent.prototype, "hasErrors", {
        /**
         * @hidden
         */
        get: function () {
            return this.showErrorIcon === 'initial'
                ? this.showErrorsInitial()
                : this.showErrorIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxComponent.prototype, "isSuccessful", {
        /**
         * @hidden
         */
        get: function () {
            return this.showSuccessIcon === 'initial'
                ? this.showSuccessInitial()
                : this.showSuccessIcon;
        },
        enumerable: true,
        configurable: true
    });
    TextBoxComponent.prototype.setSelection = function (start, end) {
        if (this.isFocused) {
            invokeElementMethod(this.input, 'setSelectionRange', start, end);
        }
    };
    TextBoxComponent.prototype.selectAll = function () {
        if (this.value) {
            this.setSelection(0, this.value.length);
        }
    };
    TextBoxComponent.prototype.updateValue = function (value) {
        var _this = this;
        if (!areSame(this.value, value)) {
            this.ngZone.run(function () {
                _this.value = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.checkClearButton();
                _this.changeDetector.markForCheck();
            });
        }
    };
    TextBoxComponent.prototype.handleBlur = function () {
        var _this = this;
        this.ngZone.run(function () {
            if (!_this.focusChangedProgrammatically) {
                _this.onBlur.emit();
            }
            _this.isFocused = false;
        });
    };
    TextBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoTextBox',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.textbox' },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TextBoxComponent; }),
                            multi: true
                        },
                        { provide: KendoInput, useExisting: forwardRef(function () { return TextBoxComponent; }) }
                    ],
                    selector: 'kendo-textbox',
                    template: "\n        <ng-container kendoTextBoxLocalizedMessages\n            i18n-clear=\"kendo.textbox.clear|The title for the **Clear** button in the TextBox.\"\n            clear=\"Clear\">\n        </ng-container>\n        <span class=\"k-input-prefix\">\n            <ng-template\n                *ngIf=\"prefixTemplate\"\n                [ngTemplateOutlet]=\"prefixTemplate?.templateRef\">\n            </ng-template>\n        </span>\n        <input\n            class=\"k-input\"\n            #input\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [attr.tabindex]=\"disabled ? undefined : tabindex\"\n            [value]=\"value\"\n            [attr.placeholder]=\"placeholder\"\n            [attr.title]=\"title\"\n            [kendoEventsOutsideAngular]=\"{\n                focus: handleInputFocus,\n                blur: handleInputBlur,\n                input: handleInput}\"/>\n        <span class=\"k-input-suffix\">\n            <span *ngIf=\"hasErrors\" [ngClass]=\"errorIconClasses\"></span>\n            <span *ngIf=\"isSuccessful\" [ngClass]=\"successIconClasses\"></span>\n            <span\n                role=\"button\"\n                class=\"k-clear-value\"\n                *ngIf=\"showClearButton\"\n                (click)=\"clearValue()\"\n                (mousedown)=\"$event.preventDefault()\"\n                [tabindex]=\"tabIndex\"\n                [attr.aria-label]=\"clearTitle()\"\n                [title]=\"clearTitle()\"\n                (keydown.enter)=\"clearValue($event)\"\n                (keydown.space)=\"clearValue($event)\"\n                >\n                <span [ngClass]=\"clearButtonClasses\"></span>\n            </span>\n            <ng-template\n                *ngIf=\"suffixTemplate\"\n                [ngTemplateOutlet]=\"suffixTemplate?.templateRef\">\n            </ng-template>\n        </span>\n    "
                },] },
    ];
    /** @nocollapse */
    TextBoxComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ElementRef }
    ]; };
    TextBoxComponent.propDecorators = {
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        tabindex: [{ type: Input }],
        value: [{ type: Input }],
        selectOnFocus: [{ type: Input }],
        showSuccessIcon: [{ type: Input }],
        showErrorIcon: [{ type: Input }],
        clearButton: [{ type: Input }],
        successIcon: [{ type: Input }],
        errorIcon: [{ type: Input }],
        clearButtonIcon: [{ type: Input }],
        tabIndex: [{ type: Input }],
        placeholder: [{ type: Input }],
        valueChange: [{ type: Output }],
        inputFocus: [{ type: Output }],
        inputBlur: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        input: [{ type: ViewChild, args: ['input', { static: true },] }],
        suffixTemplate: [{ type: ContentChild, args: [TextBoxSuffixTemplateDirective,] }],
        prefixTemplate: [{ type: ContentChild, args: [TextBoxPrefixTemplateDirective,] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        hostClass: [{ type: HostBinding, args: ['class.k-textbox',] }],
        isFocused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }]
    };
    return TextBoxComponent;
}());

/**
 * Specifies a separator in the content of the TextBox ([see examples]({% slug adornments_textbox %}#toc-separator)).
 * @example
 * ```ts-no-run
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-textbox>
 *    <ng-template kendoTextBoxSuffixTemplate>
 *        <button kendoButton look="clear" icon="image"></button>
 *        <kendo-textbox-separator></kendo-textbox-separator>
 *    </ng-template>
 *  </kendo-textbox>
 * `
 * })
 * class AppComponent {}
 * ```
 */
var TextBoxSeparatorComponent = /** @class */ (function () {
    function TextBoxSeparatorComponent() {
        this.hostClass = true;
    }
    TextBoxSeparatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-textbox-separator',
                    template: ""
                },] },
    ];
    TextBoxSeparatorComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-textbox-separator',] }]
    };
    return TextBoxSeparatorComponent;
}());

/**
 * @hidden
 */
var TextBoxMessages = /** @class */ (function (_super) {
    __extends(TextBoxMessages, _super);
    function TextBoxMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBoxMessages.propDecorators = {
        clear: [{ type: Input }]
    };
    return TextBoxMessages;
}(ComponentMessages));

/**
 * Custom component messages override default component messages.
 */
var TextBoxCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(TextBoxCustomMessagesComponent, _super);
    function TextBoxCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(TextBoxCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TextBoxCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: TextBoxMessages,
                            useExisting: forwardRef(function () { return TextBoxCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-textbox-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    TextBoxCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TextBoxCustomMessagesComponent;
}(TextBoxMessages));

/**
 * @hidden
 */
var LocalizedTextBoxMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedTextBoxMessagesDirective, _super);
    function LocalizedTextBoxMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedTextBoxMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: TextBoxMessages,
                            useExisting: forwardRef(function () { return LocalizedTextBoxMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoTextBoxLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedTextBoxMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedTextBoxMessagesDirective;
}(TextBoxMessages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TextBox directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TextBox module
 * import { TextBoxModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, TextBoxModule], // import TextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var TextBoxModule = /** @class */ (function () {
    function TextBoxModule() {
    }
    TextBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TextBoxDirective,
                        TextAreaDirective,
                        TextBoxContainerComponent,
                        TextBoxComponent,
                        TextBoxSeparatorComponent,
                        TextBoxSuffixTemplateDirective,
                        TextBoxPrefixTemplateDirective,
                        TextBoxCustomMessagesComponent,
                        LocalizedTextBoxMessagesDirective
                    ],
                    exports: [
                        TextBoxDirective,
                        TextAreaDirective,
                        TextBoxContainerComponent,
                        TextBoxComponent,
                        TextBoxSeparatorComponent,
                        TextBoxSuffixTemplateDirective,
                        TextBoxPrefixTemplateDirective,
                        EventsModule,
                        TextBoxCustomMessagesComponent,
                        LocalizedTextBoxMessagesDirective
                    ],
                    imports: [CommonModule, EventsModule]
                },] },
    ];
    return TextBoxModule;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns - `true` if the default action was prevented. Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * Fires each time the left side of the ColorPicker wrapper is clicked.
 * The event is triggered regardless of whether a ColorPicker icon is set or not.
 *
 * Provides information about the current active color and gives the option to prevent the opening of the popup.
 *
 * @example
 *
 * ```ts-no-run
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-colorpicker
 *           [icon]="'edit-tools'"
 *           [value]="'#900'"
 *           (activeColorClick)="handleActiveColorClick($event)"
 *       >
 *       </kendo-colorpicker>
 *   `
 * })
 * class AppComponent {
 *     public handleActiveColorClick(event: ActiveColorClickEvent): void {
 *         event.preventOpen();
 *
 *         console.log('Open prevented:', event.isOpenPrevented());
 *         console.log('Current color:', event.color);
 *     }
 *  }
 * ```
 */
var ActiveColorClickEvent = /** @class */ (function () {
    /**
     * @hidden
     * @param color Represents the current value of the ColorPicker.
     */
    function ActiveColorClickEvent(color) {
        this.color = color;
        this.openPrevented = false;
    }
    /**
     * Prevents the opening of the popup.
     */
    ActiveColorClickEvent.prototype.preventOpen = function () {
        this.openPrevented = true;
    };
    /**
     * Returns `true` if the popup opening is prevented by any of its subscribers.
     *
     * @returns - Returns `true` if the open action was prevented. Otherwise, returns `false`.
     */
    ActiveColorClickEvent.prototype.isOpenPrevented = function () {
        return this.openPrevented;
    };
    return ActiveColorClickEvent;
}());

/**
 * @hidden
 *
 * Returns the hex or rgba string representation of the color.
 */
var parseColor$1 = function (value, format, safe) {
    if (safe === void 0) { safe = true; }
    var allowedFormats = ['hex', 'rgba', 'name'];
    if (allowedFormats.indexOf(format) === -1) {
        throw new Error("Unsupported color output format '" + format + "'. The available options are 'hex', 'rgba' or 'name'.");
    }
    if (!isPresent(value)) {
        return;
    }
    if (format === 'name') {
        return nameFormat(value, safe);
    }
    var parsedColor = parseColor(value.trim(), safe);
    if (!isPresent(parsedColor)) {
        return;
    }
    return format === 'hex' ? parsedColor.toCss() : parsedColor.toCssRgba();
};
/**
 * @hidden
 *
 * Returns an HSV object representation of the color string.
 */
var getHSV = function (value, safe) {
    if (safe === void 0) { safe = true; }
    var parsed = parseColor(value, safe);
    if (!isPresent(parsed)) {
        return {};
    }
    return parsed.toHSV();
};
/**
 * @hidden
 *
 * Returns an RGBA object representation of the color string.
 */
var getRGBA = function (value, safe) {
    if (safe === void 0) { safe = true; }
    var parsed = parseColor(value, safe);
    if (!isPresent(parsed)) {
        return {};
    }
    return parsed.toBytes();
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color.
 */
var getColorFromHSV = function (hsva) {
    var hue = fitIntoBounds(hsva.h, 0, 359.9);
    var saturation = fitIntoBounds(hsva.s, 0, 1);
    var value = fitIntoBounds(hsva.v, 0, 1);
    var alpha = fitIntoBounds(hsva.a, 0, 1);
    return Color.fromHSV(hue, saturation, value, alpha).toCssRgba();
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color based on the `hue`, assuming the `value`, `saturation` and `alpha` have value of `1`.
 */
var getColorFromHue = function (hue) {
    return getColorFromHSV({ h: hue, s: 1, v: 1, a: 1 });
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color.
 */
var getColorFromRGBA = function (rgba) {
    var red = fitIntoBounds(rgba.r, 0, 255);
    var green = fitIntoBounds(rgba.g, 0, 255);
    var blue = fitIntoBounds(rgba.b, 0, 255);
    var alpha = fitIntoBounds(rgba.a, 0, 1);
    return Color.fromBytes(red, green, blue, alpha).toCssRgba();
};
/**
 *
 * @hidden
 */
function nameFormat(value, safe) {
    value = value.toLowerCase().trim();
    if (isPresent(namedColors[value])) {
        return value;
    }
    if (parseColor(value, safe)) {
        value = parseColor(value, safe).toHex();
    }
    var key = Object.keys(namedColors).find(function (key) { return namedColors[key] === value; });
    if (!key && !safe) {
        throw new Error("The provided color " + value + " is not supported for 'format=\"name\"' property.To display " + value + " color, the component 'format' property shoud be set to 'hex' or 'rgba' ");
    }
    return key;
}

// tslint:disable:max-line-length
/**
 * @hidden
 */
var PALETTEPRESETS = {
    basic: {
        colors: '000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7',
        columns: 10
    },
    office: {
        colors: 'ffffff, 000000, e6e6e6, 435569, 4371c4, ed7e32, a5a4a5, febf04, 5a9bd5, 71ae48, f2f2f3, 7f7f7f, d1cece, d5dde3, dae1f4, fce5d4, deeded, fff2cc, deeaf6, e1efd9, d7d8d8, 585959, aeabab, adbaca, b4c5e7, f6caac, dbdbdb, ffe498, bcd6ee, c5e0b2, bfbfc0, 3f3f3f, 767070, 8595b1, 8fabdb, f5b183, c9c8c9, fed965, 9bc4e5, a8d08d, a5a5a6, 262625, 393939, 334050, 2e5496, c45a11, 7b7b7a, bf9000, 2f75b5, 548235, 7f7f7f, 0b0c0c, 161616, 222a34, 203764, 843d0b, 525252, 7f6000, 1d4d79, 375623',
        columns: 10
    },
    apex: {
        colors: 'ffffff, 000000, c9c2d1, 69676d, ceb966, 9cb084, 6bb1c9, 6585cf, 7e6bc9, a379bb, f2f2f2, 7f7f7f, f4f2f5, e0e0e2, f5f1e0, ebefe6, e1eff4, e0e6f5, e5e1f4, ece4f1, d8d8d8, 595959, e9e6ec, c2c1c5, ebe3c1, d7dfcd, c3dfe9, c1ceeb, cbc3e9, dac9e3, bfbfbf, 3f3f3f, dedae3, a4a3a8, e1d5a3, c3cfb5, a6d0de, a2b5e2, b1a6de, c7aed6, a5a5a5, 262626, 9688a5, 4e4d51, ae9638, 758c5a, 3d8da9, 365bb0, 533da9, 7d4d99, 7f7f7f, 0c0c0c, 635672, 343336, 746425, 4e5d3c, 295e70, 243c75, 372970, 533366',
        columns: 10
    },
    austin: {
        colors: 'ffffff, 000000, caf278, 3e3d2d, 94c600, 71685a, ff6700, 909465, 956b43, fea022, f2f2f2, 7f7f7f, f4fce4, dddcd0, efffc0, e3e1dc, ffe0cb, e8e9df, ece1d6, feecd2, d8d8d8, 595959, e9f9c9, bbb9a1, dfff82, c8c3ba, ffc299, d2d4c0, dac3ad, fed9a6, bfbfbf, 3f3f3f, dff7ae, ada598, cfff43, ada598, ffa365, bcbfa1, c8a585, fec67a, a5a5a5, 262626, a9ea25, 2e2d21, 6f9400, 544e43, bf4d00, 6c6f4b, 6f5032, d77b00, 7f7f7f, 0c0c0c, 74a50f, 1f1e16, 4a6300, 38342d, 7f3300, 484a32, 4a3521, 8f5200',
        columns: 10
    },
    clarity: {
        colors: 'ffffff, 292934, f3f2dc, d2533c, 93a299, ad8f67, 726056, 4c5a6a, 808da0, 79463d, f2f2f2, e7e7ec, e7e5b9, f6dcd8, e9ecea, eee8e0, e4dedb, d8dde3, e5e8ec, e9d6d3, d8d8d8, c4c4d1, d5d185, edbab1, d3d9d6, ded2c2, c9beb8, b2bcc8, ccd1d9, d3aea7, bfbfbf, 8a8aa3, aca73b, e4978a, bec7c1, cdbba3, af9e94, 8c9bac, b2bac6, bd857c, a5a5a5, 56566e, 56531d, a43925, 6b7c72, 866b48, 554840, 39434f, 5c697b, 5a342d, 7f7f7f, 3b3b4b, 22210b, 6d2619, 47534c, 594730, 39302b, 262d35, 3d4652, 3c231e',
        columns: 10
    },
    slipstream: {
        colors: 'ffffff, 000000, b4dcfa, 212745, 4e67c8, 5eccf3, a7ea52, 5dceaf, ff8021, f14124, f2f2f2, 7f7f7f, 8bc9f7, c7cce4, dbe0f4, def4fc, edfadc, def5ef, ffe5d2, fcd9d3, d8d8d8, 595959, 4facf3, 909aca, b8c2e9, beeafa, dbf6b9, beebdf, ffcca6, f9b3a7, bfbfbf, 3f3f3f, 0d78c9, 5967af, 94a3de, 9ee0f7, caf297, 9de1cf, ffb279, f68d7b, a5a5a5, 262626, 063c64, 181d33, 31479f, 11b2eb, 81d319, 34ac8b, d85c00, c3260c, 7f7f7f, 0c0c0c, 021828, 101322, 202f6a, 0b769c, 568c11, 22725c, 903d00, 821908',
        columns: 10
    },
    metro: {
        colors: 'ffffff, 000000, d6ecff, 4e5b6f, 7fd13b, ea157a, feb80a, 00addc, 738ac8, 1ab39f, f2f2f2, 7f7f7f, a7d6ff, d9dde4, e5f5d7, fad0e4, fef0cd, c5f2ff, e2e7f4, c9f7f1, d8d8d8, 595959, 60b5ff, b3bcca, cbecb0, f6a1c9, fee29c, 8be6ff, c7d0e9, 94efe3, bfbfbf, 3f3f3f, 007dea, 8d9baf, b2e389, f272af, fed46b, 51d9ff, aab8de, 5fe7d5, a5a5a5, 262626, 003e75, 3a4453, 5ea226, af0f5b, c58c00, 0081a5, 425ea9, 138677, 7f7f7f, 0c0c0c, 00192e, 272d37, 3f6c19, 750a3d, 835d00, 00566e, 2c3f71, 0c594f',
        columns: 10
    },
    flow: {
        colors: 'ffffff, 000000, dbf5f9, 04617b, 0f6fc6, 009dd9, 0bd0d9, 10cf9b, 7cca62, a5c249, f2f2f2, 7f7f7f, b2e9f2, b4ecfc, c7e2fa, c4eeff, c9fafc, c9faed, e4f4df, edf2da, d8d8d8, 595959, 76d9e8, 6adafa, 90c6f6, 89deff, 93f5f9, 94f6db, cae9c0, dbe6b6, bfbfbf, 3f3f3f, 21b2c8, 20c8f7, 59a9f2, 4fceff, 5df0f6, 5ff2ca, b0dfa0, c9da91, a5a5a5, 262626, 105964, 02485c, 0b5394, 0075a2, 089ca2, 0b9b74, 54a838, 7e9532, 7f7f7f, 0c0c0c, 062328, 01303d, 073763, 004e6c, 05686c, 07674d, 387025, 546321',
        columns: 10
    },
    hardcover: {
        colors: 'ffffff, 000000, ece9c6, 895d1d, 873624, d6862d, d0be40, 877f6c, 972109, aeb795, f2f2f2, 7f7f7f, e1dca5, f2e0c6, f0d0c9, f6e6d5, f5f2d8, e7e5e1, fbc7bc, eef0e9, d8d8d8, 595959, d0c974, e6c28d, e2a293, eeceaa, ece5b2, cfccc3, f78f7a, dee2d4, bfbfbf, 3f3f3f, a29a36, daa454, d4735e, e6b681, e2d88c, b7b2a5, f35838, ced3bf, a5a5a5, 262626, 514d1b, 664515, 65281a, a2641f, a39428, 655f50, 711806, 879464, 7f7f7f, 0c0c0c, 201e0a, 442e0e, 431b11, 6c4315, 6d621a, 433f35, 4b1004, 5a6243',
        columns: 10
    },
    trek: {
        colors: 'ffffff, 000000, fbeec9, 4e3b30, f0a22e, a5644e, b58b80, c3986d, a19574, c17529, f2f2f2, 7f7f7f, f7e09e, e1d6cf, fcecd5, eddfda, f0e7e5, f3eae1, ece9e3, f5e3d1, d8d8d8, 595959, f3cc5f, c4ad9f, f9d9ab, dcc0b6, e1d0cc, e7d5c4, d9d4c7, ebc7a3, bfbfbf, 3f3f3f, d29f0f, a78470, f6c781, cba092, d2b9b2, dbc1a7, c6bfab, e1ac76, a5a5a5, 262626, 694f07, 3a2c24, c87d0e, 7b4b3a, 926255, a17242, 7b7153, 90571e, 7f7f7f, 0c0c0c, 2a1f03, 271d18, 855309, 523226, 614138, 6b4c2c, 524b37, 603a14',
        columns: 10
    },
    verve: {
        colors: 'ffffff, 000000, d2d2d2, 666666, ff388c, e40059, 9c007f, 68007f, 005bd3, 00349e, f2f2f2, 7f7f7f, bdbdbd, e0e0e0, ffd7e8, ffc6dc, ffb8f1, f1b2ff, c3dcff, b8cfff, d8d8d8, 595959, 9d9d9d, c1c1c1, ffafd1, ff8eba, ff71e4, e365ff, 87baff, 72a0ff, bfbfbf, 3f3f3f, 696969, a3a3a3, ff87ba, ff5597, ff2ad7, d519ff, 4b98ff, 2b71ff, a5a5a5, 262626, 343434, 4c4c4c, e90062, ab0042, 75005f, 4e005f, 00449e, 002676, 7f7f7f, 0c0c0c, 151515, 333333, 9b0041, 72002c, 4e003f, 34003f, 002d69, 00194f',
        columns: 10
    },
    monochrome: {
        colors: '000000, 1a1a1a, 333333, 4d4d4d, 666666, 808080, 999999, b3b3b3, cccccc, e6e6e6, f2f2f2, ffffff',
        columns: 12
    },
    accessible: {
        colors: 'black, grey, darkred, red, darkorange, gold, green, blue, darkblue, purple, white, darkgrey, saddlebrown, pink, orange, yellow, lightgreen, lightskyblue, lightblue, mediumpurple',
        columns: 10
    }
};

var DEFAULT_PRESET = 'office';
var DEFAULT_ACCESSIBLE_PRESET = 'accessible';
var serial = 0;
/**
 * Represents the [Kendo UI ColorPicker component for Angular]({% slug overview_colorpicker %}).
 * Designed to replace the `<input type="color">` HTML5 tag which is not widely supported in browsers.
 */
var ColorPickerComponent = /** @class */ (function () {
    function ColorPickerComponent(popupService, localizationService) {
        var _this = this;
        this.popupService = popupService;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.focusableId = "k-colorpicker-" + serial++;
        /**
         * Sets what view the ColorPicker will render in the popup.
         */
        this.view = 'gradient';
        /**
         * Sets the read-only state of the ColorPicker.
         */
        this.readonly = false;
        /**
         * Sets the disabled state of the ColorPicker.
         */
        this.disabled = false;
        /**
         * Specifies the output format of the ColorPicker.
         * The input value may be in a different format. However, it will be parsed into the output `format`
         * after the component processes it.
         *
         * If the `gradient` view is used with the `opacity` option set to true, this setting will be ignored and `rgba` will be used instead.
         *
         * The supported values are:
         * * `rgba` (default)
         * * `hex`
         * * [`name`](https://www.w3.org/wiki/CSS/Properties/color/keywords)
         */
        this.format = 'rgba';
        /**
         * Fires each time the value is changed.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time ColorPicker is focused.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the ColorPicker is blurred.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires each time the left side of the ColorPicker wrapper is clicked.
         * The event is triggered regardless of whether a ColorPicker icon is set or not.
         *
         * The [`ActiveColorClickEvent`]({% slug api_inputs_activecolorclickevent %}) event provides the option to prevent the popup opening.
         */
        this.activeColorClick = new EventEmitter();
        this._tabindex = 0;
        this._popupSettings = { animate: true };
        this._paletteSettings = {};
        this._gradientSettings = { opacity: true, clearButton: false };
        this.notifyNgTouched = function () { };
        this.notifyNgChanged = function () { };
        this.dynamicRTLSubscription = localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ColorPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the initially selected color.
         */
        set: function (value) {
            this._value = parseColor$1(value, this.format);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the ColorPicker.
         */
        set: function (value) {
            this._popupSettings = Object.assign(this._popupSettings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "paletteSettings", {
        get: function () {
            return this._paletteSettings;
        },
        /**
         * Configures the palette that is displayed in the ColorPicker popup.
         */
        set: function (value) {
            this._paletteSettings = Object.assign(this._paletteSettings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "gradientSettings", {
        get: function () {
            return this._gradientSettings;
        },
        /**
         * Configures the gradient that is displayed in the ColorPicker popup.
         */
        set: function (value) {
            this._gradientSettings = Object.assign(this._gradientSettings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "tabindex", {
        get: function () {
            return !this.disabled ? this._tabindex : undefined;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "isOpen", {
        /**
         * Indicates whether the ColorPicker popup is open.
         */
        get: function () {
            return isPresent(this.popupRef);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "iconStyles", {
        /**
         * @hidden
         */
        get: function () {
            if (this.iconClass) {
                return this.iconClass;
            }
            if (this.icon) {
                return "k-icon k-i-" + this.icon;
            }
        },
        enumerable: true,
        configurable: true
    });
    ColorPickerComponent.prototype.ngOnInit = function () {
        var defaultPreset = (this.format !== 'name') ? DEFAULT_PRESET : DEFAULT_ACCESSIBLE_PRESET;
        var settingsPalette = this._paletteSettings.palette;
        var presetColumns = typeof settingsPalette === 'string' && PALETTEPRESETS[settingsPalette] ?
            PALETTEPRESETS[settingsPalette].columns :
            undefined;
        this._paletteSettings = {
            palette: settingsPalette || defaultPreset,
            tileSize: this._paletteSettings.tileSize || 24,
            columns: this._paletteSettings.columns || presetColumns || 10
        };
    };
    ColorPickerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.format && changes.format.currentValue === 'name') {
            this.view = 'palette';
        }
        if (this.view === 'gradient' && this.gradientSettings.opacity) {
            this.format = 'rgba';
            this.value = parseColor$1(this.value, this.format);
        }
    };
    ColorPickerComponent.prototype.ngOnDestroy = function () {
        this.closePopup();
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperClick = function () {
        this.toggleWithEvents(!this.isOpen);
        this.focus();
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleActiveColorClick = function () {
        this.focus();
        var event = new ActiveColorClickEvent(this.value);
        this.activeColorClick.emit(event);
        if (!event.isOpenPrevented() || this.isOpen) {
            this.handleWrapperClick();
        }
    };
    /**
     * Focuses the wrapper of the ColorPicker.
     */
    ColorPickerComponent.prototype.focus = function () {
        if (this.disabled) {
            return;
        }
        this.wrapper.nativeElement.focus();
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperFocus = function () {
        if (isPresent(this.palette)) {
            this.palette.nativeElement.focus();
        }
        if (this.isFocused) {
            return;
        }
        this.isFocused = true;
        this.onFocus.emit();
    };
    /**
     * Blurs the ColorPicker.
     */
    ColorPickerComponent.prototype.blur = function () {
        this.wrapper.nativeElement.blur();
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperBlur = function () {
        if (this.isOpen) {
            return;
        }
        this.isFocused = false;
        this.onBlur.emit();
        this.notifyNgTouched();
    };
    /**
     * Clears the color value of the ColorPicker.
     */
    ColorPickerComponent.prototype.reset = function () {
        if (!isPresent(this.value)) {
            return;
        }
        this._value = undefined;
        this.notifyNgChanged(undefined);
    };
    /**
     * Toggles the popup of the ColorPicker.
     * Does not trigger the `open` and `close` events of the component.
     *
     * @param open An optional parameter. Specifies whether the popup will be opened or closed.
     */
    ColorPickerComponent.prototype.toggle = function (open) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.closePopup();
        open = isPresent(open) ? open : !this.isOpen;
        if (open) {
            this.openPopup();
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleValueChange = function (color, closePopup) {
        var parsedColor = parseColor$1(color, this.format);
        var valueChange = parsedColor !== this.value;
        if (closePopup) {
            this.toggleWithEvents(false);
            this.focus();
        }
        if (valueChange) {
            this.value = parsedColor;
            this.valueChange.emit(parsedColor);
            this.notifyNgChanged(parsedColor);
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handlePopupBlur = function (event) {
        var focusInPopupElement = this.popupRef.popupElement.contains(event.relatedTarget);
        var wrapperClicked = event.relatedTarget === this.wrapper.nativeElement;
        if (!this.isFocused || wrapperClicked || focusInPopupElement) {
            return;
        }
        this.isFocused = false;
        this.onBlur.emit();
        this.notifyNgTouched();
        this.toggleWithEvents(false);
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.registerOnChange = function (fn) {
        this.notifyNgChanged = fn;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.registerOnTouched = function (fn) {
        this.notifyNgTouched = fn;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperKeyDown = function (event) {
        if (event.keyCode === Keys.ArrowDown || event.keyCode === Keys.Enter) {
            event.preventDefault();
            this.toggleWithEvents(true);
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handlePopupKeyDown = function (keyCode) {
        if (keyCode === Keys.Tab || keyCode === Keys.Escape) {
            this.toggleWithEvents(false);
            this.wrapper.nativeElement.focus();
        }
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    ColorPickerComponent.prototype.isEmpty = function () {
        return false;
    };
    ColorPickerComponent.prototype.toggleWithEvents = function (open) {
        var sameState = this.isOpen === open;
        if (this.disabled || this.readonly || sameState) {
            return;
        }
        var eventArgs = new PreventableEvent();
        open ? this.open.emit(eventArgs) : this.close.emit(eventArgs);
        if (!eventArgs.isDefaultPrevented()) {
            this.toggle(open);
        }
    };
    ColorPickerComponent.prototype.openPopup = function () {
        var _this = this;
        var horizontalAlign = this.direction === "rtl" ? "right" : "left";
        var anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        var popupPosition = { horizontal: horizontalAlign, vertical: "top" };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            animate: this.popupSettings.animate,
            appendTo: this.popupSettings.appendTo,
            popupAlign: popupPosition,
            anchorAlign: anchorPosition,
            popupClass: 'k-colorpicker-popup',
            content: this.popupTemplate,
            positionMode: 'absolute'
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () {
            _this.toggleWithEvents(false);
            if (!_this.isOpen) {
                _this.wrapper.nativeElement.focus({
                    preventScroll: true
                });
            }
        });
    };
    ColorPickerComponent.prototype.closePopup = function () {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.close();
        this.popupRef = null;
        this.palette = null;
    };
    ColorPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-colorpicker',
                    providers: [{
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ColorPickerComponent; })
                        }, {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return ColorPickerComponent; })
                        },
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.colorpicker'
                        }
                    ],
                    template: "\n        <span\n            #wrapper\n            [ngClass]=\"{\n                'k-picker-wrap': true,\n                'k-state-disabled': this.disabled,\n                'k-state-focused': this.isFocused\n            }\"\n            role=\"listbox\"\n            [attr.aria-expanded]=\"isOpen\"\n            [id]=\"focusableId\"\n            [attr.tabindex]=\"tabindex\"\n            (focus)=\"handleWrapperFocus()\"\n            (blur)=\"handleWrapperBlur()\"\n            (mousedown)=\"$event.preventDefault()\"\n            (keydown)=\"handleWrapperKeyDown($event)\"\n        >\n            <span *ngIf=\"!iconStyles\" class=\"k-selected-color\" [style.background-color]=\"value\" (click)=\"handleActiveColorClick()\">\n                <span class=\"k-icon k-i-line\" *ngIf=\"!value\"></span>\n            </span>\n            <span *ngIf=\"iconStyles\" class=\"k-tool-icon\" [ngClass]=\"iconStyles\" (click)=\"handleActiveColorClick()\">\n                <span class=\"k-selected-color\" [style.background-color]=\"value\"></span>\n            </span>\n            <span class=\"k-select\" (click)=\"handleWrapperClick()\">\n                <span class=\"k-icon k-i-arrow-s\"></span>\n            </span>\n        </span>\n        <ng-template #popupTemplate>\n            <kendo-colorgradient\n                *ngIf=\"view === 'gradient' || view === 'combo'\"\n                kendoFocusOnDomReady\n                [value]=\"value\"\n                [format]=\"format\"\n                [opacity]=\"gradientSettings.opacity\"\n                [clearButton]=\"gradientSettings.clearButton\"\n                (focusout)=\"handlePopupBlur($event)\"\n                (valueChange)=\"handleValueChange($event, false)\"\n                (keydown)=\"handlePopupKeyDown($event.keyCode)\"\n            >\n            </kendo-colorgradient>\n            <kendo-colorpalette\n                #palette\n                *ngIf=\"view === 'palette' || view === 'combo'\"\n                kendoFocusOnDomReady\n                [palette]=\"paletteSettings.palette\"\n                [columns]=\"paletteSettings.columns\"\n                [tileSize]=\"paletteSettings.tileSize\"\n                [format]=\"format\"\n                [value]=\"value\"\n                (blur)=\"handlePopupBlur($event)\"\n                (cellSelection)=\"handleValueChange($event, true)\"\n                (mousedown)=\"$event.preventDefault()\"\n                (keydown)=\"handlePopupKeyDown($event.keyCode)\"\n            >\n            </kendo-colorpalette>\n        </ng-template>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPickerComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: LocalizationService }
    ]; };
    ColorPickerComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-colorpicker',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        focusableId: [{ type: Input }],
        view: [{ type: Input }],
        readonly: [{ type: Input }],
        disabled: [{ type: Input }],
        format: [{ type: Input }],
        value: [{ type: Input }],
        popupSettings: [{ type: Input }],
        paletteSettings: [{ type: Input }],
        gradientSettings: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        tabindex: [{ type: Input }],
        valueChange: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        activeColorClick: [{ type: Output }],
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        wrapper: [{ type: ViewChild, args: ['wrapper',] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
        palette: [{ type: ViewChild, args: ['palette', { read: ElementRef },] }]
    };
    return ColorPickerComponent;
}());

/**
 * @hidden
 */
var ColorPaletteService = /** @class */ (function () {
    function ColorPaletteService() {
        this.colorRows = [];
    }
    ColorPaletteService.prototype.setColorMatrix = function (palette, columns) {
        this.colorRows = [];
        if (!(isPresent(palette) && palette.length)) {
            return;
        }
        columns = columns || palette.length;
        for (var start = 0; start < palette.length; start += columns) {
            var row = palette.slice(start, columns + start);
            this.colorRows.push(row);
        }
    };
    ColorPaletteService.prototype.getCellCoordsFor = function (color) {
        if (!isPresent(color)) {
            return;
        }
        for (var row = 0; row < this.colorRows.length; row++) {
            for (var col = 0; col < this.colorRows[row].length; col++) {
                if (this.colorRows[row][col] === color) {
                    return { row: row, col: col };
                }
            }
        }
    };
    ColorPaletteService.prototype.getColorAt = function (cellCoords) {
        if (!(isPresent(cellCoords) && isPresent(this.colorRows[cellCoords.row]))) {
            return;
        }
        return this.colorRows[cellCoords.row][cellCoords.col];
    };
    ColorPaletteService.prototype.getNextCell = function (current, horizontalStep, verticalStep) {
        if (!(isPresent(current) && isPresent(current.row) && isPresent(current.col))) {
            return { row: 0, col: 0 };
        }
        var row = this.clampIndex(current.row + verticalStep, this.colorRows.length - 1);
        var col = this.clampIndex(current.col + horizontalStep, this.colorRows[row].length - 1);
        return { row: row, col: col };
    };
    ColorPaletteService.prototype.clampIndex = function (index, max) {
        var minArrayIndex = 0;
        if (index < minArrayIndex) {
            return minArrayIndex;
        }
        if (index > max) {
            return max;
        }
        return index;
    };
    ColorPaletteService.decorators = [
        { type: Injectable },
    ];
    return ColorPaletteService;
}());

var DEFAULT_TILE_SIZE = 24;
var DEFAULT_COLUMNS_COUNT = 10;
var DEFAULT_PRESET$1 = 'office';
var DEFAULT_ACCESSIBLE_PRESET$1 = 'accessible';
var serial$1 = 0;
/**
 * The ColorPalette component provides a set of predefined palette presets and enables you to implement a custom color palette.
 * The ColorPalette is independently used by `kendo-colorpicker` and can be directly added to the page.
 */
var ColorPaletteComponent = /** @class */ (function () {
    function ColorPaletteComponent(service, localizationService) {
        var _this = this;
        this.service = service;
        /**
         * @hidden
         */
        this.id = "k-colorpalette-" + serial$1++;
        /**
         * Specifies the output format of the ColorPaletteComponent.
         * The input value may be in a different format. However, it will be parsed into the output `format`
         * after the component processes it.
         *
         * The supported values are:
         * * (Default) `hex`
         * * `rgba`
         * * `name`
         */
        this.format = 'hex';
        /**
         * Specifies the size of a color cell.
         *
         * The possible values are:
         * * (Default) `tileSize = 24`
         * * `{ width: number, height: number }`
         */
        this.tileSize = { width: DEFAULT_TILE_SIZE, height: DEFAULT_TILE_SIZE };
        /**
         * Fires each time the color selection is changed.
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires each time the value is changed.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user selects a cell with the mouse or presses `Enter`.
         *
         * @hidden
         */
        this.cellSelection = new EventEmitter();
        /**
         * @hidden
         */
        this.hostClasses = true;
        this._tabindex = 0;
        this.notifyNgTouched = function () { };
        this.notifyNgChanged = function () { };
        this.dynamicRTLSubscription = localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ColorPaletteComponent.prototype, "paletteId", {
        /**
         * @hidden
         */
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the initially selected color.
         */
        set: function (value) {
            this._value = parseColor$1(value, this.format);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        /**
         * Specifies the number of columns that will be displayed.
         * Defaults to `10`.
         */
        set: function (value) {
            var minColumnsCount = 1;
            this._columns = value > minColumnsCount ? value : minColumnsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "palette", {
        get: function () {
            return this._palette;
        },
        /**
         * The color palette that will be displayed.
         *
         * The supported values are:
         * * The name of the predefined palette preset (for example, `office`, `basic`, and `apex`).
         * * A string with comma-separated colors.
         * * A string array.
         */
        set: function (value) {
            var _this = this;
            if (!isPresent(value)) {
                value = DEFAULT_PRESET$1;
            }
            if (typeof value === 'string' && isPresent(PALETTEPRESETS[value])) {
                this.columns = this.columns || PALETTEPRESETS[value].columns;
                value = PALETTEPRESETS[value].colors;
            }
            var colors = (typeof value === 'string') ? value.split(',') : value;
            this._palette = colors.map(function (color) { return parseColor$1(color, _this.format, false); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "tabindex", {
        get: function () {
            return !this.disabled ? this._tabindex : undefined;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "tileLayout", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.tileSize !== 'number') {
                return this.tileSize;
            }
            return { width: this.tileSize, height: this.tileSize };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "colorRows", {
        /**
         * @hidden
         */
        get: function () {
            return this.service.colorRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "hostTabindex", {
        /**
         * @hidden
         */
        get: function () { return this.tabindex; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPaletteComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () { return this.disabled; },
        enumerable: true,
        configurable: true
    });
    ColorPaletteComponent.prototype.ngOnInit = function () {
        if (this.colorRows.length === 0) {
            var defaultPreset = (this.format !== 'name') ? DEFAULT_PRESET$1 : DEFAULT_ACCESSIBLE_PRESET$1;
            this.palette = this.palette || defaultPreset;
            this.setRows();
            this.focusedCell = this.service.getCellCoordsFor(this.value);
        }
    };
    ColorPaletteComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    ColorPaletteComponent.prototype.ngOnChanges = function (changes) {
        if (changes.palette || changes.columns) {
            this.setRows();
        }
        if (changes.palette || changes.value || changes.columns) {
            this.focusedCell = this.service.getCellCoordsFor(this.value);
        }
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.handleKeydown = function (event) {
        var isRTL = this.direction === 'rtl';
        switch (event.keyCode) {
            case Keys.ArrowDown:
                this.handleCellNavigation(0, 1);
                break;
            case Keys.ArrowUp:
                this.handleCellNavigation(0, -1);
                break;
            case Keys.ArrowRight:
                this.handleCellNavigation(isRTL ? -1 : 1, 0);
                break;
            case Keys.ArrowLeft:
                this.handleCellNavigation(isRTL ? 1 : -1, 0);
                break;
            case Keys.Enter:
                this.handleEnter();
                break;
            default: return;
        }
        event.preventDefault();
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.handleHostBlur = function () {
        this.notifyNgTouched();
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.handleCellSelection = function (value, focusedCell) {
        if (this.readonly) {
            return;
        }
        this.focusedCell = focusedCell;
        var parsedColor = parseColor$1(value, this.format, false);
        this.cellSelection.emit(parsedColor);
        if (this.value !== parsedColor) {
            this.value = parsedColor;
            this.valueChange.emit(parsedColor);
            this.notifyNgChanged(parsedColor);
        }
        if (this.selection !== parsedColor) {
            this.selection = parsedColor;
            this.selectionChange.emit(parsedColor);
        }
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.focusedCell = this.service.getCellCoordsFor(this.value);
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.registerOnChange = function (fn) {
        this.notifyNgChanged = fn;
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.registerOnTouched = function (fn) {
        this.notifyNgTouched = fn;
    };
    /**
     * @hidden
     */
    ColorPaletteComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    ColorPaletteComponent.prototype.isEmpty = function () {
        return false;
    };
    /**
     * Clears the color value of the ColorPalette.
     */
    ColorPaletteComponent.prototype.reset = function () {
        this.focusedCell = null;
        if (isPresent(this.value)) {
            this._value = undefined;
            this.notifyNgChanged(undefined);
        }
    };
    ColorPaletteComponent.prototype.setRows = function () {
        if (!isPresent(this.palette)) {
            return;
        }
        this.columns = this.columns || DEFAULT_COLUMNS_COUNT;
        this.service.setColorMatrix(this.palette, this.columns);
    };
    ColorPaletteComponent.prototype.handleCellNavigation = function (horizontalStep, verticalStep) {
        if (this.readonly) {
            return;
        }
        this.focusedCell = this.service.getNextCell(this.focusedCell, horizontalStep, verticalStep);
        var selection = this.service.getColorAt(this.focusedCell);
        if (this.selection !== selection) {
            this.selection = selection;
            this.selectionChange.emit(selection);
        }
    };
    ColorPaletteComponent.prototype.handleEnter = function () {
        if (!isPresent(this.focusedCell)) {
            return;
        }
        var selectedColor = this.service.getColorAt(this.focusedCell);
        this.handleCellSelection(selectedColor, this.focusedCell);
    };
    ColorPaletteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-colorpalette',
                    providers: [
                        {
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ColorPaletteComponent; }) // tslint:disable-line:no-forward-ref
                        }, {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return ColorPaletteComponent; })
                        },
                        ColorPaletteService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.colorpalette'
                        }
                    ],
                    template: "\n        <div role=\"grid\">\n            <table class=\"k-palette k-reset\" role=\"presentation\">\n                <tbody>\n                    <tr role=\"row\" *ngFor=\"let row of colorRows; let rowIndex = index\">\n                        <td *ngFor=\"let color of row; let colIndex = index\"\n                            [class.k-state-selected]=\"focusedCell?.row === rowIndex && focusedCell?.col === colIndex\"\n                            class=\"k-item\"\n                            [attr.value]=\"color\"\n                            (click)=\"handleCellSelection(color, { row: rowIndex, col: colIndex })\"\n                            [ngStyle]=\"{\n                                backgroundColor: color,\n                                width: tileLayout.width + 'px',\n                                height: tileLayout.height + 'px',\n                                minWidth: tileLayout.width + 'px'\n                            }\">\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPaletteComponent.ctorParameters = function () { return [
        { type: ColorPaletteService },
        { type: LocalizationService }
    ]; };
    ColorPaletteComponent.propDecorators = {
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        paletteId: [{ type: HostBinding, args: ['attr.id',] }],
        id: [{ type: Input }],
        format: [{ type: Input }],
        value: [{ type: Input }],
        columns: [{ type: Input }],
        palette: [{ type: Input }],
        tabindex: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        tileSize: [{ type: Input }],
        selectionChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        cellSelection: [{ type: Output }],
        hostTabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-colorpalette',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        handleHostBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ColorPaletteComponent;
}());

var DEFAULT_OUTPUT_FORMAT = 'rgba';
var DEFAULT_BACKGROUND_COLOR = 'rgba(255, 0, 0, 1)';
var serial$2 = 0;
/**
 * The ColorGradient component enables smooth color transitions and provides options for selecting specific colors over the drag handle.
 * The ColorGradient is independently used by `kendo-colorpicker` and can be directly added to the page.
 */
var ColorGradientComponent = /** @class */ (function () {
    function ColorGradientComponent(host, ngZone, renderer, cdr, localizationService) {
        var _this = this;
        this.host = host;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.cdr = cdr;
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.id = "k-colorgradient-" + serial$2++;
        /**
         * Defines whether the alpha slider will be displayed.
         */
        this.opacity = true;
        /**
         * Sets the disabled state of the ColorGradient.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the ColorGradient.
         */
        this.readonly = false;
        /**
         * Specifies whether the ColorGradient should display a 'Clear color' button.
         */
        this.clearButton = false;
        /**
         * Fires each time the user selects a new color.
         */
        this.valueChange = new EventEmitter();
        /**
         * @hidden
         */
        this.backgroundColor = DEFAULT_BACKGROUND_COLOR;
        /**
         * @hidden
         *
         * Represents the currently selected `hue`, `saturation`, `value`, and `alpha` values.
         * The values are initially set in `ngOnInit` or in `ngOnChanges` and are
         * updated on moving the drag handle or the sliders.
         */
        this.hsva = {};
        /**
         * Specifies the output format of the ColorGradientComponent.
         * The input value may be in a different format. However, it will be parsed into the output `format`
         * after the component processes it.
         *
         * The supported values are:
         * * (Default) `rgba`
         * * `hex`
         */
        this.format = DEFAULT_OUTPUT_FORMAT;
        this._tabindex = 0;
        this.listeners = [];
        this.notifyNgChanged = function () { };
        this.notifyNgTouched = function () { };
        this.dynamicRTLSubscription = localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ColorGradientComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "hostTabindex", {
        get: function () {
            return this.tabindex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "gradientId", {
        /**
         * @hidden
         */
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the initially selected color.
         */
        set: function (value) {
            this._value = parseColor$1(value, this.format);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "tabindex", {
        get: function () {
            return !this.disabled ? this._tabindex : undefined;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "isFocused", {
        /**
         * Indicates whether the ColorGradient or any of its content is focused.
         */
        get: function () {
            if (!(isDocumentAvailable() && isPresent(this.host))) {
                return false;
            }
            return this.host.nativeElement === document.activeElement || this.host.nativeElement.contains(document.activeElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "alphaSliderValue", {
        /**
         * @hidden
         */
        get: function () {
            // setting the initial value to undefined to force the slider to recalculate the height of the slider track on the next cdr run
            if (!(isPresent(this.hsva) && isPresent(this.hsva.a))) {
                return;
            }
            return this.hsva.a * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorGradientComponent.prototype, "gradientRect", {
        get: function () {
            return this.gradientWrapper.nativeElement.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    ColorGradientComponent.prototype.ngAfterViewInit = function () {
        this.updateUI();
        this.cdr.detectChanges();
        this.addEventListeners();
    };
    ColorGradientComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('value', changes) && !this.isFocused) {
            this.updateUI();
        }
    };
    ColorGradientComponent.prototype.ngOnDestroy = function () {
        this.listeners.forEach(function (removeListener) { return removeListener(); });
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    /**
     * Focuses the component.
     */
    ColorGradientComponent.prototype.focus = function () {
        if (this.disabled) {
            return;
        }
        this.host.nativeElement.focus();
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.reset = function () {
        this.handleValueChange(undefined);
        this.updateUI();
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.handleDragPress = function (args) {
        if (this.disabled || this.readonly || !isPresent(args.originalEvent)) {
            return;
        }
        this.focus();
        args.originalEvent.preventDefault();
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.onHandleDrag = function (args) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.renderer.addClass(this.gradientWrapper.nativeElement, 'k-dragging');
        this.changePosition(args);
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.onHandleRelease = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        this.renderer.removeClass(this.gradientWrapper.nativeElement, 'k-dragging');
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.changePosition = function (position) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.ngZone.run(function () { return _this.moveDragHandle(position); });
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.handleHueSliderChange = function (hue) {
        this.handleValueChange(getColorFromHSV(this.hsva));
        this.backgroundColor = getColorFromHue(hue);
        this.setAlphaSliderBackground(this.backgroundColor);
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.handleAlphaSliderChange = function (alpha) {
        this.hsva.a = alpha / 100;
        this.handleValueChange(getColorFromHSV(this.hsva));
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.handleInputsValueChange = function (color) {
        var parsed = parseColor$1(color, this.format);
        if (this.value !== parsed) {
            this.handleValueChange(parsed);
            this.updateUI();
        }
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (isPresent(this.gradientWrapper)) {
            this.updateUI();
        }
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.registerOnChange = function (fn) {
        this.notifyNgChanged = fn;
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.registerOnTouched = function (fn) {
        this.notifyNgTouched = fn;
    };
    /**
     * @hidden
     */
    ColorGradientComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    ColorGradientComponent.prototype.isEmpty = function () {
        return false;
    };
    ColorGradientComponent.prototype.moveDragHandle = function (position) {
        var deltaX = position.clientX - this.gradientRect.left;
        var deltaY = position.clientY - this.gradientRect.top;
        var top = fitIntoBounds(deltaY, 0, this.gradientRect.height);
        var left = fitIntoBounds(deltaX, 0, this.gradientRect.width);
        this.setDragHandleElementPosition(top, left);
        this.hsva.s = left / this.gradientRect.width;
        this.hsva.v = 1 - top / this.gradientRect.height;
        this.handleValueChange(getColorFromHSV(this.hsva));
        this.setAlphaSliderBackground(getColorFromHSV(__assign({}, this.hsva, { a: 1 })));
    };
    ColorGradientComponent.prototype.updateUI = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.hsva = this.value ? getHSV(this.value) : { h: 0, s: 0, v: 1, a: 1 };
        var top = (1 - this.hsva.v) * this.gradientRect.height;
        var left = this.hsva.s * this.gradientRect.width;
        this.setDragHandleElementPosition(top, left);
        this.backgroundColor = getColorFromHue(this.hsva.h);
        this.setAlphaSliderBackground(this.backgroundColor);
    };
    ColorGradientComponent.prototype.handleValueChange = function (color) {
        if (this.value === color) {
            return;
        }
        this.value = color;
        this.valueChange.emit(color);
        this.notifyNgChanged(color);
    };
    ColorGradientComponent.prototype.setDragHandleElementPosition = function (top, left) {
        var dragHandle = this.dragHandle.nativeElement;
        this.renderer.setStyle(dragHandle, 'top', top + "px");
        this.renderer.setStyle(dragHandle, 'left', left + "px");
    };
    ColorGradientComponent.prototype.setAlphaSliderBackground = function (backgroundColor) {
        if (!isPresent(this.alphaSlider)) {
            return;
        }
        var sliderTrack = this.alphaSlider.track.nativeElement;
        this.renderer.setStyle(sliderTrack, 'background', "linear-gradient(to top, transparent, " + backgroundColor + ")");
    };
    ColorGradientComponent.prototype.addEventListeners = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var focusOutListener = _this.renderer.listen(_this.host.nativeElement, 'focusout', function (event) {
                if (!containsFocus(_this.host.nativeElement, event.relatedTarget) && isUntouched(_this.host)) {
                    _this.ngZone.run(function () { return _this.notifyNgTouched(); });
                }
            });
            _this.listeners.push(focusOutListener);
        });
    };
    ColorGradientComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-colorgradient',
                    providers: [{
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ColorGradientComponent; })
                        }, {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return ColorGradientComponent; })
                        },
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.colorgradient'
                        }
                    ],
                    template: "\n        <div class=\"k-hbox k-hsv-wrap\">\n            <div class=\"k-hsv-rectangle\" [style.background-color]=\"backgroundColor\">\n                <div\n                    #gradientWrapper\n                    kendoDraggable\n                    class=\"k-hsv-gradient\"\n                    (click)=\"changePosition($event)\"\n                    (kendoPress)=\"handleDragPress($event)\"\n                    (kendoDrag)=\"onHandleDrag($event)\"\n                    (kendoRelease)=\"onHandleRelease()\">\n                    <div\n                        #dragHandle\n                        class=\"k-draghandle\"\n                    >\n                    </div>\n                </div>\n            </div>\n            <div class=\"k-hbox k-sliders-wrap {{ clearButton ? 'k-sliders-wrap-clearable' : '' }}\">\n                <span class=\"k-clear-color k-button k-bare k-button-icon\" *ngIf=\"clearButton\" (click)=\"reset()\">\n                    <span class=\"k-icon k-i-reset-color\"></span>\n                </span>\n                <kendo-slider\n                    class=\"k-hue-slider\"\n                    [disabled]=\"disabled\"\n                    [readonly]=\"readonly\"\n                    [showButtons]=\"false\"\n                    [tickPlacement]=\"'none'\"\n                    [vertical]=\"true\"\n                    [min]=\"0\"\n                    [max]=\"360\"\n                    [smallStep]=\"5\"\n                    [largeStep]=\"10\"\n                    [(value)]=\"hsva.h\"\n                    (valueChange)=\"handleHueSliderChange($event)\"\n                >\n                </kendo-slider>\n                <kendo-slider\n                    *ngIf=\"opacity && format === 'rgba'\"\n                    #alphaSlider\n                    class=\"k-alpha-slider\"\n                    [disabled]=\"disabled\"\n                    [readonly]=\"readonly\"\n                    [showButtons]=\"false\"\n                    [tickPlacement]=\"'none'\"\n                    [vertical]=\"true\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    [smallStep]=\"1\"\n                    [largeStep]=\"10\"\n                    [value]=\"alphaSliderValue\"\n                    (valueChange)=\"handleAlphaSliderChange($event)\"\n                >\n                </kendo-slider>\n            </div>\n        </div>\n        <kendo-colorinput\n            [opacity]=\"opacity\"\n            [value]=\"value\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            (valueChange)=\"handleInputsValueChange($event)\"\n        >\n        </kendo-colorinput>\n"
                },] },
    ];
    /** @nocollapse */
    ColorGradientComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: LocalizationService }
    ]; };
    ColorGradientComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-flatcolorpicker',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        hostTabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        gradientId: [{ type: HostBinding, args: ['attr.id',] }],
        id: [{ type: Input }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        opacity: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        clearButton: [{ type: Input }],
        value: [{ type: Input }],
        tabindex: [{ type: Input }],
        valueChange: [{ type: Output }],
        format: [{ type: Input }],
        alphaSlider: [{ type: ViewChild, args: ['alphaSlider',] }],
        gradientWrapper: [{ type: ViewChild, args: ['gradientWrapper',] }],
        dragHandle: [{ type: ViewChild, args: ['dragHandle',] }]
    };
    return ColorGradientComponent;
}());

/**
 * @hidden
 */
var ColorInputComponent = /** @class */ (function () {
    function ColorInputComponent(host) {
        this.host = host;
        /**
         * Sets whether the alpha slider will be shown.
         */
        this.opacity = true;
        /**
         * Sets the disabled state of the ColorInput.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the ColorInput.
         */
        this.readonly = false;
        /**
         * Emits a parsed rgba string color.
         */
        this.valueChange = new EventEmitter();
        this.colorInputClass = true;
        /**
         * The rgba inputs values.
         */
        this.rgba = {};
    }
    Object.defineProperty(ColorInputComponent.prototype, "isFocused", {
        /**
         * Indicates whether any of the inputs are focused.
         */
        get: function () {
            if (!(isDocumentAvailable() && isPresent(this.host))) {
                return false;
            }
            var activeElement = document.activeElement;
            return this.host.nativeElement.contains(activeElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorInputComponent.prototype, "rgbaInputValid", {
        /**
         * Indicates whether any of the rgba inputs have value.
         */
        get: function () {
            var _this = this;
            return Object.keys(this.rgba).every(function (key) { return isPresent(_this.rgba[key]); });
        },
        enumerable: true,
        configurable: true
    });
    ColorInputComponent.prototype.ngOnChanges = function (changes) {
        if (isPresent(changes.value) && !this.isFocused) {
            this.hex = parseColor$1(this.value, 'hex');
            this.rgba = getRGBA(this.value);
            this.rgba.a = parseColor$1(this.value, 'rgba') ? this.rgba.a : 1;
        }
    };
    ColorInputComponent.prototype.handleRgbaValueChange = function () {
        var color = getColorFromRGBA(this.rgba);
        if (!this.rgbaInputValid || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = getRGBA(this.value);
        this.hex = parseColor$1(color, 'hex');
        this.valueChange.emit(color);
    };
    ColorInputComponent.prototype.handleHexValueChange = function (hex) {
        this.hex = hex;
        var color = parseColor$1(hex, 'rgba');
        if (!isPresent(color) || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = getRGBA(color);
        this.valueChange.emit(color);
    };
    ColorInputComponent.prototype.handleRgbaInputBlur = function () {
        if (!this.rgbaInputValid) {
            this.rgba = getRGBA(this.value);
        }
    };
    ColorInputComponent.prototype.handleHexInputBlur = function () {
        this.hex = parseColor$1(this.value, 'hex');
    };
    ColorInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-colorinput',
                    template: "\n        <div class=\"k-hbox k-gradient-values\">\n            <input\n                #hexInput\n                class=\"k-textbox k-hex-value\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [value]=\"hex || ''\"\n                placeholder=\"no color\"\n                (blur)=\"handleHexInputBlur()\"\n                (input)=\"handleHexValueChange(hexInput.value)\"\n            />\n            <kendo-numerictextbox\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"255\"\n                placeholder=\"R\"\n                [(value)]=\"rgba.r\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [format]=\"'n'\"\n                [decimals]=\"0\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n            <kendo-numerictextbox\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"255\"\n                placeholder=\"G\"\n                [(value)]=\"rgba.g\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [format]=\"'n'\"\n                [decimals]=\"0\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n            <kendo-numerictextbox\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"255\"\n                placeholder=\"B\"\n                [(value)]=\"rgba.b\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [format]=\"'n'\"\n                [decimals]=\"0\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n            <kendo-numerictextbox\n                *ngIf=\"opacity\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"1\"\n                placeholder=\"A\"\n                [(value)]=\"rgba.a\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [step]=\"0.01\"\n                [format]=\"'n2'\"\n                [decimals]=\"2\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n        </div>\n        <div class=\"k-hbox k-gradient-values\">\n            <div class=\"k-hex-value\">hex</div>\n            <div>r</div>\n            <div>g</div>\n            <div>b</div>\n            <div *ngIf=\"opacity\">a</div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorInputComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ColorInputComponent.propDecorators = {
        value: [{ type: Input }],
        opacity: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        valueChange: [{ type: Output }],
        colorInputClass: [{ type: HostBinding, args: ['class.k-colorinputs',] }]
    };
    return ColorInputComponent;
}());

/**
 * @hidden
 */
var FocusOnDomReadyDirective = /** @class */ (function () {
    function FocusOnDomReadyDirective(host, ngZone) {
        this.host = host;
        this.ngZone = ngZone;
    }
    FocusOnDomReadyDirective.prototype.ngAfterContentInit = function () {
        this.focusOnNextTick();
    };
    FocusOnDomReadyDirective.prototype.focusOnNextTick = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () { return setTimeout(function () { return _this.host.nativeElement.focus(); }); });
    };
    FocusOnDomReadyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFocusOnDomReady]'
                },] },
    ];
    /** @nocollapse */
    FocusOnDomReadyDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    return FocusOnDomReadyDirective;
}());

var PUBLIC_DIRECTIVES = [
    ColorPickerComponent,
    ColorPaletteComponent,
    ColorGradientComponent
];
var INTERNAL_DIRECTIVES = [
    ColorInputComponent,
    FocusOnDomReadyDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ColorPicker.
 */
var ColorPickerModule = /** @class */ (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PUBLIC_DIRECTIVES,
                        INTERNAL_DIRECTIVES
                    ],
                    exports: [PUBLIC_DIRECTIVES],
                    imports: [
                        SliderModule,
                        NumericTextBoxModule,
                        CommonModule,
                        PopupModule,
                        DraggableModule
                    ]
                },] },
    ];
    return ColorPickerModule;
}());

/**
 * Represents the directive that renders the [Kendo UI CheckBox]({% slug overview_checkbox %}) input component.
 * The directive is placed on input type="checkbox" elements.
 *
 * @example
 * ```ts-no-run
 * <input type="checkbox" kendoCheckBox />
 * ```
 */
var CheckBoxDirective = /** @class */ (function () {
    function CheckBoxDirective() {
        this.kendoClass = true;
    }
    CheckBoxDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[kendoCheckBox]'
                },] },
    ];
    CheckBoxDirective.propDecorators = {
        kendoClass: [{ type: HostBinding, args: ['class.k-checkbox',] }]
    };
    return CheckBoxDirective;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the CheckBox directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the CheckBox module
 * import { CheckBoxModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, CheckBoxModule], // import CheckBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var CheckBoxModule = /** @class */ (function () {
    function CheckBoxModule() {
    }
    CheckBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CheckBoxDirective],
                    exports: [CheckBoxDirective],
                    imports: [CommonModule]
                },] },
    ];
    return CheckBoxModule;
}());

/**
 * Represents the directive that renders the [Kendo UI RadioButton]({% slug overview_checkbox %}) input component.
 * The directive is placed on input type="radio" elements.
 *
 * @example
 * ```ts-no-run
 * <input type="radio" kendoRadioButton />
 * ```
 */
var RadioButtonDirective = /** @class */ (function () {
    function RadioButtonDirective() {
        this.kendoClass = true;
    }
    RadioButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[kendoRadioButton]'
                },] },
    ];
    RadioButtonDirective.propDecorators = {
        kendoClass: [{ type: HostBinding, args: ['class.k-radio',] }]
    };
    return RadioButtonDirective;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the RadioButton directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the RadioButton module
 * import { RadioButtonModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, RadioButtonModule], // import RadioButton module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var RadioButtonModule = /** @class */ (function () {
    function RadioButtonModule() {
    }
    RadioButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [RadioButtonDirective],
                    exports: [RadioButtonDirective],
                    imports: [CommonModule]
                },] },
    ];
    return RadioButtonModule;
}());

var serial$3 = 0;
/**
 * Represents an error message that will be shown underneath
 * a Kendo control or native HTML form-bound component after a validation.
 */
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent() {
        this.hostClass = true;
        /**
         * Specifies the alignment of the Error message.
         *
         * The possible values are:
         * * (Default) `start`
         * * `end`
         */
        this.align = 'start';
        /**
         * @hidden
         */
        this.id = "kendo-error-" + serial$3++;
        this.roleAttribute = 'alert';
    }
    Object.defineProperty(ErrorComponent.prototype, "startClass", {
        get: function () {
            return this.align === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorComponent.prototype, "endClass", {
        get: function () {
            return this.align === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorComponent.prototype, "idAttribute", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    ErrorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-formerror',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    ErrorComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-form-error',] }],
        align: [{ type: Input }],
        roleAttribute: [{ type: HostBinding, args: ['attr.role',] }],
        startClass: [{ type: HostBinding, args: ['class.k-text-start',] }],
        endClass: [{ type: HostBinding, args: ['class.k-text-end',] }],
        idAttribute: [{ type: HostBinding, args: ['attr.id',] }]
    };
    return ErrorComponent;
}());

var serial$4 = 0;
/**
 * Represents a hint message that will be shown underneath a form-bound component.
 */
var HintComponent = /** @class */ (function () {
    function HintComponent() {
        /**
         * Specifies the alignment of the Hint message.
         *
         * The possible values are:
         * * (Default) `start`
         * * `end`
         */
        this.align = 'start';
        /**
         * @hidden
         */
        this.id = "kendo-hint-" + serial$4++;
        this.hostClass = true;
    }
    Object.defineProperty(HintComponent.prototype, "startClass", {
        get: function () {
            return this.align === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HintComponent.prototype, "endClass", {
        get: function () {
            return this.align === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HintComponent.prototype, "idAttribute", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    HintComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-formhint',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    HintComponent.propDecorators = {
        align: [{ type: Input }],
        hostClass: [{ type: HostBinding, args: ['class.k-form-hint',] }],
        startClass: [{ type: HostBinding, args: ['class.k-text-start',] }],
        endClass: [{ type: HostBinding, args: ['class.k-text-end',] }],
        idAttribute: [{ type: HostBinding, args: ['attr.id',] }]
    };
    return HintComponent;
}());

/**
 * Specifies a container for form-bound controls (Kendo controls or native HTML controls).
 * Applies styling and behavior rules.
 */
var FormFieldComponent = /** @class */ (function () {
    function FormFieldComponent(renderer, localizationService) {
        var _this = this;
        this.renderer = renderer;
        this.localizationService = localizationService;
        this.hostClass = true;
        /**
         *
         * Specifies when the Hint messages will be shown.
         *
         * The possible values are:
         *
         * * (Default) `initial`&mdash;Allows displaying hints when the form-bound component state is
         * `valid` or `untouched` and `pristine`.
         * * `always`&mdash;Allows full control over the visibility of the hints.
         *
         */
        this.showHints = 'initial';
        /**
         * Specifies the layout orientation of the form field.
         *
         * * The possible values are:
         *
         * * (Default) `vertical`
         * * `horizontal`
         */
        this.orientation = 'vertical';
        /**
         * Specifies when the Error messages will be shown.
         *
         * The possible values are:
         *
         * * (Default) `initial`&mdash;Allows displaying errors when the form-bound component state is
         * `invalid` and `touched` or `dirty`.
         * * `always`&mdash;Allows full control over the visibility of the errors.
         *
         */
        this.showErrors = 'initial';
        this.subscriptions = new Subscription();
        this.rtl = false;
        this.subscriptions.add(this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        }));
    }
    Object.defineProperty(FormFieldComponent.prototype, "errorClass", {
        get: function () {
            if (!this.control) {
                return false;
            }
            return this.control.invalid && (this.control.touched || this.control.dirty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormFieldComponent.prototype, "disabledClass", {
        get: function () {
            if (!this.control) {
                return false;
            }
            // radiobutton group
            if (this.isRadioControl(this.control)) {
                return false;
            }
            return this.disabledControl() ||
                this.disabledElement() ||
                this.disabledKendoInput();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormFieldComponent.prototype, "formControls", {
        set: function (formControls) {
            this.validateFormControl(formControls);
            this.control = formControls.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormFieldComponent.prototype, "horizontal", {
        /**
         * @hidden
         */
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormFieldComponent.prototype, "hasHints", {
        /**
         * @hidden
         */
        get: function () {
            return this.showHints === 'always' ? true : this.showHintsInitial();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormFieldComponent.prototype, "hasErrors", {
        /**
         * @hidden
         */
        get: function () {
            return this.showErrors === 'always' ? true : this.showErrorsInitial();
        },
        enumerable: true,
        configurable: true
    });
    FormFieldComponent.prototype.ngAfterViewInit = function () {
        this.setDescription();
    };
    FormFieldComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    FormFieldComponent.prototype.disabledKendoInput = function () {
        return this.kendoInput && this.kendoInput.disabled;
    };
    FormFieldComponent.prototype.disabledControl = function () {
        return this.control.disabled;
    };
    FormFieldComponent.prototype.disabledElement = function () {
        var elements = this.controlElementRefs.toArray();
        return elements.every(function (e) { return e.nativeElement.hasAttribute('disabled'); });
    };
    FormFieldComponent.prototype.validateFormControl = function (formControls) {
        if (isDevMode() && formControls.length !== 1 && !this.isControlGroup(formControls)) {
            throw new Error('The `kendo-formfield` component should contain ' +
                'only one control of type NgControl with a formControlName(https://angular.io/api/forms/FormControlName)' +
                'or an ngModel(https://angular.io/api/forms/NgModel) binding.');
        }
    };
    FormFieldComponent.prototype.isControlGroup = function (formControls) {
        var _this = this;
        if (!formControls.length) {
            return false;
        }
        var name = formControls.first.name;
        return formControls.toArray().every(function (c) { return c.name === name && (_this.isRadioControl(c)); });
    };
    FormFieldComponent.prototype.isRadioControl = function (control) {
        return control.valueAccessor instanceof RadioControlValueAccessor;
    };
    FormFieldComponent.prototype.updateDescription = function () {
        var _this = this;
        var controls = this.findControlElements();
        if (!controls) {
            return;
        }
        controls.forEach(function (control) {
            var ariaIds = _this.generateDescriptionIds(control);
            _this.renderer.setAttribute(control, 'aria-describedby', ariaIds);
        });
    };
    FormFieldComponent.prototype.findControlElements = function () {
        if (!this.controlElementRefs) {
            return;
        }
        // if the control is KendoInput and has focusableId - dropdowns, dateinputs
        if (this.kendoInput && this.kendoInput.focusableId && isDocumentAvailable()) {
            return [document.getElementById(this.kendoInput.focusableId)];
        }
        return this.controlElementRefs.map(function (el) { return el.nativeElement; });
    };
    FormFieldComponent.prototype.generateDescriptionIds = function (control) {
        var ids = new Set();
        if (control.hasAttribute('aria-describedby')) {
            var attributes = control.getAttribute('aria-describedby').split(' ');
            attributes.forEach(function (attr) {
                if (attr.includes('kendo-hint-') || attr.includes('kendo-error-')) {
                    return;
                }
                ids.add(attr);
            });
        }
        this.hintChildren.forEach(function (hint) {
            ids.add(hint.id);
        });
        this.errorChildren.forEach(function (error) {
            ids.add(error.id);
        });
        return Array.from(ids).join(' ');
    };
    FormFieldComponent.prototype.showHintsInitial = function () {
        if (!this.control) {
            return true;
        }
        var _a = this.control, valid = _a.valid, untouched = _a.untouched, pristine = _a.pristine;
        return valid || (untouched && pristine);
    };
    FormFieldComponent.prototype.showErrorsInitial = function () {
        if (!this.control) {
            return false;
        }
        var _a = this.control, invalid = _a.invalid, dirty = _a.dirty, touched = _a.touched;
        return invalid && (dirty || touched);
    };
    FormFieldComponent.prototype.setDescription = function () {
        var _this = this;
        this.updateDescription();
        this.subscriptions.add(this.errorChildren.changes.subscribe(function () { return _this.updateDescription(); }));
        this.subscriptions.add(this.hintChildren.changes.subscribe(function () { return _this.updateDescription(); }));
    };
    FormFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-formfield',
                    template: "\n        <ng-content select=\"label, kendo-label\"></ng-content>\n        <div [class.k-form-field-wrap]=\"horizontal\">\n            <ng-content></ng-content>\n            <ng-content select=\"kendo-formhint\" *ngIf=\"hasHints\"></ng-content>\n            <ng-content select=\"kendo-formerror\" *ngIf=\"hasErrors\"></ng-content>\n        </div>\n    ",
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.formfield'
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    FormFieldComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: LocalizationService }
    ]; };
    FormFieldComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-form-field',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        errorClass: [{ type: HostBinding, args: ['class.k-form-field-error',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-form-field-disabled',] }],
        formControls: [{ type: ContentChildren, args: [NgControl, { descendants: true, static: true },] }],
        controlElementRefs: [{ type: ContentChildren, args: [NgControl, { read: ElementRef, descendants: true, static: true },] }],
        kendoInput: [{ type: ContentChild, args: [KendoInput, { static: true },] }],
        errorChildren: [{ type: ContentChildren, args: [ErrorComponent, { descendants: true, static: true },] }],
        hintChildren: [{ type: ContentChildren, args: [HintComponent, { descendants: true, static: true },] }],
        showHints: [{ type: Input }],
        orientation: [{ type: Input }],
        showErrors: [{ type: Input }]
    };
    return FormFieldComponent;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the FormField, Error and Hint components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the FormField module
 * import { FormFieldModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, FormFieldModule], // import FormField module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var FormFieldModule = /** @class */ (function () {
    function FormFieldModule() {
    }
    FormFieldModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [HintComponent, ErrorComponent, FormFieldComponent],
                    exports: [HintComponent, ErrorComponent, FormFieldComponent],
                    imports: [CommonModule]
                },] },
    ];
    return FormFieldModule;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Inputs components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Inputs module
 * import { InputsModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, InputsModule], // import Inputs module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var InputsModule = /** @class */ (function () {
    function InputsModule() {
    }
    InputsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [TextBoxModule, SliderModule, RangeSliderModule, SwitchModule, NumericTextBoxModule, MaskedTextBoxModule, ColorPickerModule, CheckBoxModule, RadioButtonModule, FormFieldModule],
                    imports: [CommonModule]
                },] },
    ];
    return InputsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { CheckBoxModule, ColorInputComponent, FocusOnDomReadyDirective, ColorPaletteService, MaskingService, NumericTextBoxMessages, RadioButtonModule, RangeSliderCustomMessagesComponent, RangeSliderMessages, SliderCustomMessagesComponent, SliderMessages, SliderBase, SlidersCommonModule, SwitchCustomMessagesComponent, Messages, TextBoxCustomMessagesComponent, LocalizedTextBoxMessagesDirective, TextBoxMessages, TextBoxPrefixTemplateDirective, TextBoxSeparatorComponent, TextBoxSuffixTemplateDirective, TextBoxComponent, SliderComponent, RangeSliderComponent, LabelTemplateDirective, SwitchComponent, TextBoxContainerComponent, TextBoxDirective, TextAreaDirective, NumericTextBoxComponent, NumericTextBoxCustomMessagesComponent, MaskedTextBoxComponent, InputsModule, SliderTicksComponent, SliderModule, RangeSliderModule, SwitchModule, NumericTextBoxModule, MaskedTextBoxModule, TextBoxModule, ColorPickerComponent, ColorPaletteComponent, ColorGradientComponent, ColorPickerModule, ActiveColorClickEvent, CheckBoxDirective, RadioButtonDirective, HintComponent, ErrorComponent, FormFieldComponent, FormFieldModule, LocalizedNumericTextBoxMessagesDirective, LocalizedSliderMessagesDirective, LocalizedRangeSliderMessagesDirective, LocalizedSwitchMessagesDirective };
