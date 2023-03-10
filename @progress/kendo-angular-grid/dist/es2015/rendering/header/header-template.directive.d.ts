/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
/**
 * Represents the column header cell template of the Grid
 * ([more information and example]({% slug templates_columns_grid %}#toc-header-template)).
 * Helps to customize the table header cell for the column.
 * To define a header template, nest an `<ng-template>` tag with the
 * [`kendoGridHeaderTemplate`]({% slug api_grid_headertemplatedirective %}) directive inside the `<kendo-grid-column>` tag.
 *
 *  The template context is set to the current column and then the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_grid_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice">
 *                 <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
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
export declare class HeaderTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
