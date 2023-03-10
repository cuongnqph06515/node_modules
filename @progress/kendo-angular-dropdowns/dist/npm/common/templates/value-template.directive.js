/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoDropDownListValueTemplate]'
                },] },
    ];
    /** @nocollapse */
    ValueTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return ValueTemplateDirective;
}());
exports.ValueTemplateDirective = ValueTemplateDirective;
