/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders the group header content. To define the group template, nest an `<ng-template>` tag
 * with the `kendo<ComponentName>GroupTemplate` directive inside the component tag. The template context is
 * set to the current component. To get a reference to the current data item, use the `let-groupName` directive.
 *
 * - [Using `GroupTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-group-template)
 * - [Using `GroupTemplate` with the ComboBox]({% slug templates_combobox %}#toc-group-template)
 * - [Using `GroupTemplate` with the DropDownList]({% slug templates_ddl %}#toc-group-template)
 * - [Using `GroupTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-group-template)
 *
 * @example
 * ```ts
 * import { groupBy } from '@progress/kendo-data-query';
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="groupedData" [textField]="'name'" [valueField]="'name'">
 *    <ng-template kendoComboBoxGroupTemplate let-groupName>
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
export class GroupTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropDownListGroupTemplate],[kendoComboBoxGroupTemplate],[kendoAutoCompleteGroupTemplate],[kendoMultiSelectGroupTemplate]'
            },] },
];
/** @nocollapse */
GroupTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
