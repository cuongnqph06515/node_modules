/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders the fixed group header content. To define the fixed group template, nest an `<ng-template>` tag
 * with the `kendo<ComponentName>FixedGroupTemplate` directive inside the component tag. The template context is
 * set to the current component. To get a reference to the current data item, use the `let-groupName` directive.
 *
 * - [Using `FixedGroupTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-fixed-group-template)
 * - [Using `FixedGroupTemplate` with the ComboBox]({% slug templates_combobox %}#toc-fixed-group-template)
 * - [Using `FixedGroupTemplate` with the DropDownList]({% slug templates_ddl %}#toc-fixed-group-template)
 * - [Using `FixedGroupTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-fixed-group-template)
 *
 * @example
 * ```ts
 * import { groupBy } from '@progress/kendo-data-query';
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="groupedData" [textField]="'name'" [valueField]="'name'">
 *    <ng-template kendoComboBoxFixedGroupTemplate let-groupName>
 *      <span>Food type: {{groupName}} option</span>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public data = [
 *       { name: "Pork", category: "Food", subcategory: "Meat" },
 *       { name: "Pepper", category: "Food", subcategory: "Vegetables" },
 *       { name: "Beef", category: "Food", subcategory: "Meat" }
 *   ];
 *   public groupedData = groupBy(this.data, [{field: "subcategory"}]);
 * }
 * ```
 */
export class FixedGroupTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FixedGroupTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropDownListFixedGroupTemplate],[kendoComboBoxFixedGroupTemplate],[kendoAutoCompleteFixedGroupTemplate],[kendoMultiSelectFixedGroupTemplate]'
            },] },
];
/** @nocollapse */
FixedGroupTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
