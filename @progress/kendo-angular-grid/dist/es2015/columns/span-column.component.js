/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { forwardRef, Component, SkipSelf, Host, Optional, QueryList, ContentChildren, Input } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { ColumnBase } from './column-base';
import { ColumnComponent } from "./column.component";
import { isPresent } from "../utils";
/**
 * @hidden
 */
export function isSpanColumnComponent(column) {
    return column.isSpanColumn;
}
/**
 * Represents a column which can be spanned over multiple data cells while the individual
 * header and footer cells are retained ([see example]({% slug spanned_columns_grid %})).
 * Enables you to achieve more flexible layout while keeping the built-in UI element for
 * [sorting]({% slug sorting_grid %}), [filtering]({% slug filtering_grid %}), and
 * [grouping]({% slug groupingbasics_grid %}). Wrap the columns that will be
 * merged inside the `<kendo-grid-span-column>` tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid
 *              [sortable]="true"
 *              [filterable]="true"
 *              [kendoGridBinding]="products">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-span-column>
 *              <kendo-grid-column field="ProductName" title="Product Name">
 *              </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice" title="Unit Price" filter="numeric" width="180" format="{0:c}">
 *              </kendo-grid-column>
 *          </kendo-grid-span-column>
 *          <kendo-grid-column field="Discontinued" width="120" filter="boolean">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *   public products = [{
 *      "ProductID": 1,
 *      "ProductName": "Chai",
 *      "UnitPrice": 18.0000,
 *      "Discontinued": true
 *    }, {
 *      "ProductID": 2,
 *      "ProductName": "Chang",
 *      "UnitPrice": 19.0000,
 *      "Discontinued": false
 *    }
 *   ];
 * }
 *
 * ```
 *
 * By default, the data cell displays the data for the specified fields. To further customize
 * the span-column functionality, use a [cell template]({% slug api_grid_celltemplatedirective %}).
 *
 * ```html-no-run
 * <kendo-grid-span-column>
 *  <kendo-grid-column field="field1" title="Field 1"></kendo-grid-column>
 *  <kendo-grid-column field="field2" title="Field 2"></kendo-grid-column>
 *    <ng-template kendoGridCellTemplate let-dataItem>
 *        <h5>{{ dataItem.field1 }}</h5>
 *        <p>{{ dataItem.field2 }}</p>
 *    </ng-template>
 *  </kendo-grid-span-column>
 * ```
 */
export class SpanColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        /*
         * @hidden
         */
        this.isSpanColumn = true;
        this.template = new QueryList();
        this.editTemplate = new QueryList();
        /**
         * @hidden
         */
        this.childColumns = new QueryList();
        /**
         * @hidden
         */
        this.includeInChooser = false;
        this._editable = true;
        this._locked = false;
        if (parent && parent.isSpanColumn) {
            throw new Error('SpanColumn cannot be nested inside another SpanColumn');
        }
    }
    /**
     * Defines whether the edit template of the column will be rendered. The default value is `false`.
     *
     * > To enable the editing functionality for a spanned column, set an edit template for it.
     *
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-span-column [editable]="false">
     *      <kendo-grid-column field="UnitPrice">
     *      </kendo-grid-column>
     *      <kendo-grid-column field="ProductName">
     *      </kendo-grid-column>
     *      <ng-template kendoGridEditTemplate>
     *         .....
     *      </ng-template>
     *    </kendo-grid-span-column>
     * </kendo-grid>
     * ```
     */
    set editable(value) {
        this._editable = value;
    }
    get editable() {
        return isPresent(this.editTemplateRef) && this._editable;
    }
    /**
     * @hidden
     * added for backwards compitability
     */
    set width(_value) {
    }
    get width() {
        return this.childColumns.reduce((total, column) => total + column.width, 0);
    }
    /**
     * @hidden
     */
    get leafIndex() {
        return this.childColumns.first.leafIndex;
    }
    /**
     * @hidden
     */
    get templateRef() {
        const template = this.template.first;
        return template ? template.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get editTemplateRef() {
        const editTemplate = this.editTemplate.first;
        return editTemplate ? editTemplate.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get colspan() {
        return this.childColumns.filter(c => c.isVisible).length;
    }
    /**
     * Toggles the locked (frozen) state of the columns. Locked columns are visible
     * at all times during the horizontal scrolling of the Grid.
     *
     * For the option to work properly, make sure that:
     * - Scrolling is enabled.
     * - The `height` option of the Grid is set.
     * - The widths of all Grid columns are explicitly set in pixels. In this way,
     * the Grid adjusts the layout of the locked and unlocked columns.
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-grid-span-column [locked]="true">
     *             <kendo-grid-column field="ProductID" title="Product ID" width="120">
     *             </kendo-grid-column>
     *             <kendo-grid-column field="ProductName" title="Product Name" width="200">
     *             </kendo-grid-column>
     *          </kendo-grid-span-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
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
    set locked(value) {
        this._locked = value;
    }
    get locked() {
        return this._locked || this.childColumns.some(c => c.locked);
    }
    get childrenArray() {
        return this.childColumns.toArray();
    }
    get hasChildren() {
        return this.childColumns.length > 0;
    }
}
SpanColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => SpanColumnComponent)
                    }
                ],
                selector: 'kendo-grid-span-column',
                template: ``
            },] },
];
/** @nocollapse */
SpanColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
SpanColumnComponent.propDecorators = {
    template: [{ type: ContentChildren, args: [CellTemplateDirective, { descendants: false },] }],
    editTemplate: [{ type: ContentChildren, args: [EditTemplateDirective, { descendants: false },] }],
    childColumns: [{ type: ContentChildren, args: [ColumnComponent,] }],
    editable: [{ type: Input }],
    locked: [{ type: Input }]
};
