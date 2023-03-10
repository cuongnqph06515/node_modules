/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
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
export { LabelTemplateDirective };
