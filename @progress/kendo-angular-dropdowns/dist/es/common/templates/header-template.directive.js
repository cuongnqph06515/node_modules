/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders the header content of the list. To define the header template, nest an `<ng-template>` tag
 * with the `kendo<ComponentName>HeaderTemplate` directive inside the component tag.
 *
 * - [Using `HeaderTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-header-template)
 * - [Using `HeaderTemplate` with the ComboBox]({% slug templates_combobox %}#toc-header-template)
 * - [Using `HeaderTemplate` with the DropDownList]({% slug templates_ddl %}#toc-header-template)
 * - [Using `HeaderTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-header-template)
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <ng-template kendoComboBoxHeaderTemplate>
 *      <h4>Header template</h4>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var HeaderTemplateDirective = /** @class */ (function () {
    function HeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    HeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownListHeaderTemplate],[kendoComboBoxHeaderTemplate],[kendoAutoCompleteHeaderTemplate],[kendoMultiSelectHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    HeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return HeaderTemplateDirective;
}());
export { HeaderTemplateDirective };
