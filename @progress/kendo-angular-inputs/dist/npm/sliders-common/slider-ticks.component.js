/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var sliders_util_1 = require("./sliders-util");
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
        var count = sliders_util_1.calculateTicksCount(this.min, this.max, this.step);
        var largeStep = this.largeStep;
        var tickValueProps = {
            max: this.max,
            min: this.min,
            smallStep: this.step
        };
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(new SliderTick(sliders_util_1.calculateValueFromTick(i, tickValueProps)));
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
        { type: core_1.Component, args: [{
                    selector: '[kendoSliderTicks]',
                    template: "\n    <li #tickElement *ngFor=\"let tick of ticks;\"\n        [ngClass]=\"tick.classes\"\n        title=\"{{ tickTitle(tick.value) }}\"\n        role=\"presentation\"\n     >\n         <ng-container [ngSwitch]=\"tick.large\">\n            <span class=\"k-label\" *ngSwitchCase=\"true\">\n                <ng-container [ngTemplateOutlet]=\"labelTemplate || defaultLabel\" [ngTemplateOutletContext]=\"tick\">\n                </ng-container>\n            </span>\n            <ng-container *ngSwitchCase=\"false\">&nbsp;</ng-container>\n         </ng-container>\n     </li>\n\n     <ng-template #defaultLabel let-value=\"value\">\n        {{ tickTitle(value) }}\n     </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    SliderTicksComponent.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] }] }
    ]; };
    SliderTicksComponent.propDecorators = {
        wrapperClasses: [{ type: core_1.HostBinding, args: ['class',] }],
        tickTitle: [{ type: core_1.Input }],
        vertical: [{ type: core_1.Input }],
        step: [{ type: core_1.Input }],
        largeStep: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        labelTemplate: [{ type: core_1.Input }],
        tickElements: [{ type: core_1.ViewChildren, args: ['tickElement',] }]
    };
    return SliderTicksComponent;
}());
exports.SliderTicksComponent = SliderTicksComponent;
