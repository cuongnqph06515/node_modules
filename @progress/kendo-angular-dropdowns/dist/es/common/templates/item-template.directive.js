/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders the list item content. To define the item template, nest an `<ng-template>` tag
 * with the `kendo<ComponentName>ItemTemplate` directive inside the component tag. The template context is
 * set to the current component. To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * - [Using `ItemTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-item-template)
 * - [Using `ItemTemplate` with the ComboBox]({% slug templates_combobox %}#toc-item-template)
 * - [Using `ItemTemplate` with the DropDownList]({% slug templates_ddl %}#toc-item-template)
 * - [Using `ItemTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-item-template)
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <ng-template kendoComboBoxItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var ItemTemplateDirective = /** @class */ (function () {
    function ItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownListItemTemplate],[kendoComboBoxItemTemplate],[kendoAutoCompleteItemTemplate],[kendoMultiSelectItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ItemTemplateDirective;
}());
export { ItemTemplateDirective };
