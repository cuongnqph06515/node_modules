/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders the selected value of the DropDownList
 * ([see example]({% slug templates_ddl %}#toc-value-template)).
 * The template context is set to the current component.
 * To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * > The `ValueTemplate` directive can only be used with the DropDownList component.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownlist [data]="listItems">
 *    <ng-template kendoDropDownListValueTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var ValueTemplateDirective = /** @class */ (function () {
    function ValueTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ValueTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownListValueTemplate]'
                },] },
    ];
    /** @nocollapse */
    ValueTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ValueTemplateDirective;
}());
export { ValueTemplateDirective };
