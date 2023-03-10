/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { HeaderTemplateDirective } from '../rendering/header/header-template.directive';
import { FooterTemplateDirective } from '../rendering/footer-template.directive';
import { ColumnMenuTemplateDirective } from '../column-menu/column-menu-template.directive';
/**
 * @hidden
 */
export const isSpanColumn = column => column.isSpanColumn;
/**
 * @hidden
 */
export const isCheckboxColumn = column => column.isCheckboxColumn;
const isColumnContainer = column => column.isColumnGroup || isSpanColumn(column);
const ɵ0 = isColumnContainer;
/**
 * The base class for the column components of the TreeList.
 */
export class ColumnBase {
    /**
     * @hidden
     */
    constructor(parent, optionChanges) {
        this.parent = parent;
        this.optionChanges = optionChanges;
        /**
         * @hidden
         */
        this.matchesMedia = true;
        /**
         * The column index after reordering.
         *
         * > `orderIndex` is a read-only property. Setting this field does not affect column order.
         */
        this.orderIndex = 0;
        /**
         * @hidden
         */
        this.isColumnGroup = false;
        /**
         * @hidden
         */
        this.isSpanColumn = false;
        /**
         * Indicates whether the column is resizable.
         * @default true
         */
        this.resizable = true;
        /**
         * Indicates whether the column is reorderable.
         * @default true
         */
        this.reorderable = true;
        /**
         * The width (in pixels) below which the user is not able to resize the column by using the UI.
         */
        this.minResizableWidth = 10;
        /**
         * Toggles the locked (frozen) state of the columns ([more information and example]({% slug locked_columns_treelist %})).
         *
         * @default false
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-treelist [data]="treelistData" [scrollable]="scrollable" style="height: 200px">
         *          <kendo-treelist-column field="ProductID" title="Product ID" width="120" [locked]="true">
         *          </kendo-treelist-column>
         *          <kendo-treelist-column field="ProductName" title="Product Name" width="200">
         *          </kendo-treelist-column>
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
        this.locked = false;
        /**
         * Specifies if the column can be locked or unlocked from the column menu or by reordering the columns.
         */
        this.lockable = true;
        /**
         * Specifies if the column menu will be shown for the column.
         */
        this.columnMenu = true;
        /**
         * Specifies if the column will be included in the column-chooser list.
         */
        this.includeInChooser = true;
        /**
         * @hidden
         */
        this.headerTemplates = new QueryList();
        /**
         * @hidden
         */
        this.columnMenuTemplates = new QueryList();
        if (parent && !isColumnContainer(parent)) {
            throw new Error('Columns can be nested only inside ColumnGroupComponent');
        }
    }
    /**
     * The width of the column (in pixels).
     */
    set width(value) {
        this._width = parseInt(value, 10);
    }
    get width() { return this._width; }
    /**
     * @hidden
     */
    get level() {
        if (this.parent && isSpanColumn(this.parent)) {
            return this.parent.level;
        }
        return this.parent ? this.parent.level + 1 : 0;
    }
    /**
     * @hidden
     */
    get isLocked() {
        return this.parent ? this.parent.isLocked : this.locked;
    }
    /**
     * @hidden
     */
    get colspan() {
        return 1;
    }
    /**
     * @hidden
     */
    rowspan(totalColumnLevels) {
        return this.level < totalColumnLevels ? (totalColumnLevels - this.level) + 1 : 1;
    }
    /**
     * @hidden
     */
    get headerTemplateRef() {
        const template = this.headerTemplates.first;
        return template ? template.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get footerTemplateRef() {
        return this.footerTemplate ? this.footerTemplate.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get columnMenuTemplateRef() {
        const template = this.columnMenuTemplates.first;
        return template ? template.templateRef : null;
    }
    /**
     * @hidden
     */
    get displayTitle() {
        return this.title;
    }
    /**
     * @hidden
     */
    get isVisible() {
        return !this.hidden && this.matchesMedia;
    }
    /**
     * @hidden
     */
    get isEditable() {
        return false;
    }
    ngOnChanges(_changes) {
        if (this.optionChanges) {
            this.optionChanges.columnChanged();
        }
    }
}
ColumnBase.propDecorators = {
    resizable: [{ type: Input }],
    reorderable: [{ type: Input }],
    minResizableWidth: [{ type: Input }],
    title: [{ type: Input }],
    width: [{ type: Input }],
    autoSize: [{ type: Input }],
    locked: [{ type: Input }],
    hidden: [{ type: Input }],
    media: [{ type: Input }],
    lockable: [{ type: Input }],
    columnMenu: [{ type: Input }],
    includeInChooser: [{ type: Input }],
    style: [{ type: Input }],
    headerStyle: [{ type: Input }],
    footerStyle: [{ type: Input }],
    cssClass: [{ type: Input, args: ['class',] }],
    headerClass: [{ type: Input }],
    footerClass: [{ type: Input }],
    headerTemplates: [{ type: ContentChildren, args: [HeaderTemplateDirective, { descendants: false },] }],
    footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }],
    columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }]
};
export { ɵ0 };
