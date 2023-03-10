/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("./utils");
var utils_2 = require("../common/utils");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
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
        this.valueChange = new core_1.EventEmitter();
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
            if (!(kendo_angular_common_1.isDocumentAvailable() && utils_2.isPresent(this.host))) {
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
            return Object.keys(this.rgba).every(function (key) { return utils_2.isPresent(_this.rgba[key]); });
        },
        enumerable: true,
        configurable: true
    });
    ColorInputComponent.prototype.ngOnChanges = function (changes) {
        if (utils_2.isPresent(changes.value) && !this.isFocused) {
            this.hex = utils_1.parseColor(this.value, 'hex');
            this.rgba = utils_1.getRGBA(this.value);
            this.rgba.a = utils_1.parseColor(this.value, 'rgba') ? this.rgba.a : 1;
        }
    };
    ColorInputComponent.prototype.handleRgbaValueChange = function () {
        var color = utils_1.getColorFromRGBA(this.rgba);
        if (!this.rgbaInputValid || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = utils_1.getRGBA(this.value);
        this.hex = utils_1.parseColor(color, 'hex');
        this.valueChange.emit(color);
    };
    ColorInputComponent.prototype.handleHexValueChange = function (hex) {
        this.hex = hex;
        var color = utils_1.parseColor(hex, 'rgba');
        if (!utils_2.isPresent(color) || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = utils_1.getRGBA(color);
        this.valueChange.emit(color);
    };
    ColorInputComponent.prototype.handleRgbaInputBlur = function () {
        if (!this.rgbaInputValid) {
            this.rgba = utils_1.getRGBA(this.value);
        }
    };
    ColorInputComponent.prototype.handleHexInputBlur = function () {
        this.hex = utils_1.parseColor(this.value, 'hex');
    };
    ColorInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-colorinput',
                    template: "\n        <div class=\"k-hbox k-gradient-values\">\n            <input\n                #hexInput\n                class=\"k-textbox k-hex-value\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [value]=\"hex || ''\"\n                placeholder=\"no color\"\n                (blur)=\"handleHexInputBlur()\"\n                (input)=\"handleHexValueChange(hexInput.value)\"\n            />\n            <kendo-numerictextbox\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"255\"\n                placeholder=\"R\"\n                [(value)]=\"rgba.r\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [format]=\"'n'\"\n                [decimals]=\"0\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n            <kendo-numerictextbox\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"255\"\n                placeholder=\"G\"\n                [(value)]=\"rgba.g\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [format]=\"'n'\"\n                [decimals]=\"0\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n            <kendo-numerictextbox\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"255\"\n                placeholder=\"B\"\n                [(value)]=\"rgba.b\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [format]=\"'n'\"\n                [decimals]=\"0\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n            <kendo-numerictextbox\n                *ngIf=\"opacity\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [min]=\"0\"\n                [max]=\"1\"\n                placeholder=\"A\"\n                [(value)]=\"rgba.a\"\n                [autoCorrect]=\"true\"\n                [spinners]=\"false\"\n                [step]=\"0.01\"\n                [format]=\"'n2'\"\n                [decimals]=\"2\"\n                (blur)=\"handleRgbaInputBlur()\"\n                (valueChange)=\"handleRgbaValueChange()\"\n            >\n            </kendo-numerictextbox>\n        </div>\n        <div class=\"k-hbox k-gradient-values\">\n            <div class=\"k-hex-value\">hex</div>\n            <div>r</div>\n            <div>g</div>\n            <div>b</div>\n            <div *ngIf=\"opacity\">a</div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorInputComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef }
    ]; };
    ColorInputComponent.propDecorators = {
        value: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        colorInputClass: [{ type: core_1.HostBinding, args: ['class.k-colorinputs',] }]
    };
    return ColorInputComponent;
}());
exports.ColorInputComponent = ColorInputComponent;
