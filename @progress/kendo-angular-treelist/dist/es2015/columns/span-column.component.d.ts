/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, QueryList } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { ColumnBase } from './column-base';
import { ColumnComponent } from "./column.component";
import { OptionChangesService } from '../common/option-changes.service';
/**
 * @hidden
 */
export declare function isSpanColumnComponent(column: any): column is SpanColumnComponent;
/**
 * Represents a column which can be spanned over multiple data cells while the individual
 * header and footer cells are retained ([see example]({% slug spanned_columns_treelist %})).
 * Enables you to achieve more flexible layout while keeping the built-in UI element for
 * [sorting]({% slug sorting_treelist %}) and [filtering]({% slug filtering_treelist %}). Wrap the columns that will be
 * merged inside the `<kendo-treelist-span-column>` tag.
 *
 * {% meta height:570 %}
 * {% embed_file configuration/span-column/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 *
 * By default, the data cell displays the data for the specified fields. To further customize
 * the span-column functionality, use a [cell template]({% slug api_treelist_celltemplatedirective %}).
 *
 * ```html-no-run
 * <kendo-treelist-span-column>
 *  <kendo-treelist-column field="field1" title="Field 1"></kendo-treelist-column>
 *  <kendo-treelist-column field="field2" title="Field 2"></kendo-treelist-column>
 *    <ng-template kendoTreeListCellTemplate let-dataItem>
 *        <h5>{{ dataItem.field1 }}</h5>
 *        <p>{{ dataItem.field2 }}</p>
 *    </ng-template>
 *  </kendo-treelist-span-column>
 * ```
 */
export declare class SpanColumnComponent extends ColumnBase {
    readonly isSpanColumn: boolean;
    template: QueryList<CellTemplateDirective>;
    editTemplate: QueryList<EditTemplateDirective>;
    /**
     * @hidden
     */
    childColumns: QueryList<ColumnComponent>;
    /**
     * @hidden
     */
    title: string;
    /**
     * @hidden
     */
    headerStyle: {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    footerStyle: {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    headerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    footerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    includeInChooser: boolean;
    /**
     * Defines whether the edit template of the column will be rendered. The default value is `false`.
     *
     * > To enable the editing functionality for a spanned column, set an edit template for it.
     *
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-span-column [editable]="false">
     *      <kendo-treelist-column field="UnitPrice">
     *      </kendo-treelist-column>
     *      <kendo-treelist-column field="ProductName">
     *      </kendo-treelist-column>
     *      <ng-template kendoTreeListEditTemplate>
     *         .....
     *      </ng-template>
     *    </kendo-treelist-span-column>
     * </kendo-treelist>
     * ```
     */
    editable: boolean;
    /**
     * @hidden
     * added for backwards compitability
     */
    width: number;
    /**
     * @hidden
     */
    readonly leafIndex: number;
    private _editable;
    private _locked;
    constructor(parent?: ColumnBase, optionChanges?: OptionChangesService);
    /**
     * @hidden
     */
    readonly templateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly editTemplateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly colspan: number;
    /**
     * Toggles the locked (frozen) state of the columns. Locked columns are visible
     * at all times during the horizontal scrolling of the TreeList.
     *
     * For the option to work properly, make sure that:
     * - Scrolling is enabled.
     * - The `height` option of the TreeList is set.
     * - The widths of all TreeList columns are explicitly set in pixels. In this way,
     * the TreeList adjusts the layout of the locked and unlocked columns.
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-treelist [data]="treelistData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-treelist-span-column [locked]="true">
     *             <kendo-treelist-column field="ProductID" title="Product ID" width="120">
     *             </kendo-treelist-column>
     *             <kendo-treelist-column field="ProductName" title="Product Name" width="200">
     *             </kendo-treelist-column>
     *          </kendo-treelist-span-column>
     *          <kendo-treelist-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-treelist-column>
     *        </kendo-treelist>
     *    `
     * })
     *
     * class AppComponent {
     *    public treelistData: any[];
     *
     *    constructor() {
     *        this.treelistData = products;
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
    locked: boolean;
    readonly isEditable: boolean;
}
