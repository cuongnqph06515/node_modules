/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { GroupHeaderTemplateDirective } from '../grouping/group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from '../grouping/group-header-column-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { ColumnSortSettings } from './sort-settings';
import { GroupFooterTemplateDirective } from '../grouping/group-footer-template.directive';
import { ColumnBase } from './column-base';
import { FilterCellTemplateDirective } from '../filtering/cell/filter-cell-template.directive';
import { FilterMenuTemplateDirective } from '../filtering/menu/filter-menu-template.directive';
/**
 * @hidden
 */
export declare function isColumnComponent(column: any): column is ColumnComponent;
/**
 * Represents the columns of the [Angular Data Grid]({% slug overview_grid %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="Discontinued" width="120">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
export declare class ColumnComponent extends ColumnBase {
    /**
     * The field to which the column is bound.
     */
    field: string;
    /**
     * The format that is applied to the value before it is displayed.
     * Takes the `{0:format}` form where `format` is a standard number format, a custom number format,
     * a standard date format, a custom date format or a format object. For more information on the supported date and number formats,
     * refer to the [kendo-intl](https://github.com/telerik/kendo-intl/blob/develop/docs/index.md) documentation.
     *
     * Standard format:
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" format="{0:c}">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     *
     * Format object for currency:
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [format]="{ style: 'currency', currency: 'EUR' }">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     *
     * Format object for dates:
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="FirstOrderedOn" [format]="{ date: 'short' }">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    format: any;
    /**
     * Allows the column headers to be clicked and the `sortChange` event emitted.
     * You have to handle the `sortChange` event yourself and sort the data.
     */
    sortable: boolean | ColumnSortSettings;
    /**
     * Determines if the column can be dragged to the group panel. The default value is `true`.
     * If set to `false`, you can group the columns by the column field by using the API of the Grid.
     */
    groupable: boolean;
    /**
     * Defines the editor type ([see example]({% slug editing_reactive_forms_grid %}#toc-setup)).
     * Used when the column enters the edit mode. The default value is `text`.
     *
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" editor="numeric">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    editor: 'text' | 'numeric' | 'date' | 'boolean';
    /**
     * Defines the filter type that is displayed inside the filter row. The default value is `text`.
     *
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" filter="numeric">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    filter: 'text' | 'numeric' | 'boolean' | 'date';
    /**
     * Defines if a filter UI will be displayed for this column. The default value is `true`.
     *
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [filterable]="false">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    filterable: boolean;
    /**
     * Defines whether the column is editable. The default value is `true`.
     *
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [editable]="false">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    editable: boolean;
    template: CellTemplateDirective;
    groupHeaderTemplate: GroupHeaderTemplateDirective;
    groupHeaderColumnTemplate: GroupHeaderColumnTemplateDirective;
    groupFooterTemplate: GroupFooterTemplateDirective;
    editTemplate: EditTemplateDirective;
    filterCellTemplate: FilterCellTemplateDirective;
    filterMenuTemplate: FilterMenuTemplateDirective;
    constructor(parent?: ColumnBase);
    readonly templateRef: TemplateRef<any>;
    readonly groupHeaderTemplateRef: TemplateRef<any>;
    readonly groupHeaderColumnTemplateRef: TemplateRef<any>;
    readonly groupFooterTemplateRef: TemplateRef<any>;
    readonly editTemplateRef: TemplateRef<any>;
    readonly filterCellTemplateRef: TemplateRef<any>;
    readonly filterMenuTemplateRef: TemplateRef<any>;
    readonly displayTitle: string;
}
