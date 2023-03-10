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
import { OptionChangesService } from '../common/option-changes.service';
/**
 * @hidden
 */
export function isSpanColumnComponent(column) {
    return column.isSpanColumn;
}
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
export class SpanColumnComponent extends ColumnBase {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
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
    set locked(value) {
        this._locked = value;
    }
    get locked() {
        return this._locked || this.childColumns.some(c => c.locked);
    }
    get isEditable() {
        return Boolean(this.editTemplateRef);
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
                selector: 'kendo-treelist-span-column',
                template: ``
            },] },
];
/** @nocollapse */
SpanColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
];
SpanColumnComponent.propDecorators = {
    template: [{ type: ContentChildren, args: [CellTemplateDirective, { descendants: false },] }],
    editTemplate: [{ type: ContentChildren, args: [EditTemplateDirective, { descendants: false },] }],
    childColumns: [{ type: ContentChildren, args: [ColumnComponent,] }],
    editable: [{ type: Input }],
    locked: [{ type: Input }]
};
