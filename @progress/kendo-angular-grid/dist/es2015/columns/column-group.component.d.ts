/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * @hidden
 */
export declare function isColumnGroupComponent(column: any): column is ColumnGroupComponent;
/**
 * Represents the column group header of the Grid
 * ([more information and examples]({% slug multicolumnheaders_columns_grid %})).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *     <kendo-grid [data]="gridData">
 *       <kendo-grid-column-group title="Product Info">
 *         <ng-template kendoGridHeaderTemplate let-columnIndex="columnIndex" let-column="column">
 *               Column index: {{columnIndex}} / column title: {{column.title}}
 *         </ng-template>
 *         <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *         </kendo-grid-column>
 *         <kendo-grid-column field="ProductName" title="Product Name">
 *         </kendo-grid-column>
 *       </kendo-grid-column-group>
 *       <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="Discontinued" width="120">
 *           <ng-template kendoGridCellTemplate let-dataItem>
 *               <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *           </ng-template>
 *       </kendo-grid-column>
 *     </kendo-grid>
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
export declare class ColumnGroupComponent extends ColumnBase {
    parent?: ColumnBase;
    /**
     * @hidden
     */
    includeInChooser: boolean;
    /**
     * @hidden
     */
    isColumnGroup: boolean;
    /**
     * @hidden
     */
    minResizableWidth: number;
    /**
     * @hidden
     */
    children: QueryList<ColumnBase>;
    constructor(parent?: ColumnBase);
    /**
     * @hidden
     */
    rowspan(): number;
    /**
     * @hidden
     */
    readonly colspan: number;
    /**
     * @hidden
     */
    readonly leafIndex: number;
    readonly childrenArray: any[];
    readonly hasChildren: boolean;
    private readonly firstChild;
}
