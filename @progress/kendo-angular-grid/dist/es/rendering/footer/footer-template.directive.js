/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the column footer cell template of the Grid
 * ([more information and example]({% slug templates_columns_grid %}#toc-footer-template)).
 * Helps to customize the table footer cell for the column.
 * To define a footer template, nest an `<ng-template>` tag with the
 * [`kendoGridFooterTemplate`]({% slug api_grid_footertemplatedirective %}) directive inside the `<kendo-grid-column>` tag.
 *
 * The template context is set to the current column and the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_grid_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 *
 * For more information on how to display aggregates in the footer of the Grid,
 * refer to the article on [aggregates]({% slug groupable_grid_with_aggregates %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData" scrollable="none">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridFooterTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice">
 *                 <ng-template kendoGridFooterTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
var FooterTemplateDirective = /** @class */ (function () {
    function FooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    FooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FooterTemplateDirective;
}());
export { FooterTemplateDirective };
