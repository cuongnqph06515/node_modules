/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, Renderer2, NgZone, Output, EventEmitter, HostBinding, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { parseColor, getHSV, getColorFromHSV, getColorFromHue } from './utils';
import { isPresent, fitIntoBounds } from '../common/utils';
import { isChanged, isDocumentAvailable, KendoInput } from '@progress/kendo-angular-common';
import { containsFocus, isUntouched } from '../common/dom-utils';
import { SliderComponent } from '../slider/slider.component';
var DEFAULT_OUTPUT_FORMAT = 'rgba';
var DEFAULT_BACKGROUND_COLOR = 'rgba(255, 0, 0, 1)';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
var serial = 0;
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
        this.id = "k-colorgradient-" + serial++;
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
            this._value = parseColor(value, this.format);
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
        var parsed = parseColor(color, this.format);
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
        this.setAlphaSliderBackground(getColorFromHSV(tslib_1.__assign({}, this.hsva, { a: 1 })));
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
export { ColorGradientComponent };
