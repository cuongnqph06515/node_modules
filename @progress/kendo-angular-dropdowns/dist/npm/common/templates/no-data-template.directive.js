/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Renders content when no data is available. To define the no-data template, nest a `<ng-template>` tag
 * with the `kendo<ComponentName>NoDataTemplate` directive inside the component tag.
 *
 * - [Using `NoDataTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-no-data-template)
 * - [Using `NoDataTemplate` with the ComboBox]({% slug templates_combobox %}#toc-no-data-template)
 * - [Using `NoDataTemplate` with the DropDownList]({% slug templates_ddl %}#toc-no-data-template)
 * - [Using `NoDataTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-no-data-template)
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <ng-template kendoComboBoxNoDataTemplate>
 *      <h4>No data!</h4>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = [];
 * }
 * ```
 */
var NoDataTemplateDirective = /** @class */ (function () {
    function NoDataTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NoDataTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDropDownListNoDataTemplate],[kendoComboBoxNoDataTemplate],[kendoAutoCompleteNoDataTemplate],[kendoMultiSelectNoDataTemplate]'
                },] },
    ];
    /** @nocollapse */
    NoDataTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return NoDataTemplateDirective;
}());
exports.NoDataTemplateDirective = NoDataTemplateDirective;
