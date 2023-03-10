/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var header_template_directive_1 = require("../rendering/header/header-template.directive");
var footer_template_directive_1 = require("../rendering/footer/footer-template.directive");
var column_menu_template_directive_1 = require("../column-menu/column-menu-template.directive");
/**
 * @hidden
 */
exports.isSpanColumn = function (column) { return column.isSpanColumn; };
/**
 * @hidden
 */
exports.isCheckboxColumn = function (column) { return column.isCheckboxColumn; };
var isColumnContainer = function (column) { return column.isColumnGroup || exports.isSpanColumn(column); };
var ɵ0 = isColumnContainer;
exports.ɵ0 = ɵ0;
/**
 * The base class for the column components of the Grid.
 */
var ColumnBase = /** @class */ (function () {
    function ColumnBase(parent) {
        this.parent = parent;
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
         * Toggles the locked (frozen) state of the columns ([more information and example]({% slug locked_columns_grid %})).
         *
         * @default false
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
         *          <kendo-grid-column field="ProductID" title="Product ID" width="120" [locked]="true">
         *          </kendo-grid-column>
         *          <kendo-grid-column field="ProductName" title="Product Name" width="200">
         *          </kendo-grid-column>
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
        this.headerTemplates = new core_1.QueryList();
        /**
         * @hidden
         */
        this.columnMenuTemplates = new core_1.QueryList();
        if (parent && !isColumnContainer(parent)) {
            throw new Error('Columns can be nested only inside ColumnGroupComponent');
        }
    }
    Object.defineProperty(ColumnBase.prototype, "width", {
        get: function () { return this._width; },
        /**
         * The width of the column (in pixels).
         */
        set: function (value) {
            this._width = parseInt(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "level", {
        /**
         * @hidden
         */
        get: function () {
            if (this.parent && exports.isSpanColumn(this.parent)) {
                return this.parent.level;
            }
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.parent ? this.parent.isLocked : this.locked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnBase.prototype.rowspan = function (totalColumnLevels) {
        return this.level < totalColumnLevels ? (totalColumnLevels - this.level) + 1 : 1;
    };
    Object.defineProperty(ColumnBase.prototype, "headerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.headerTemplates.first;
            return template ? template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "footerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            return this.footerTemplate ? this.footerTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "columnMenuTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.columnMenuTemplates.first;
            return template ? template.templateRef : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "displayTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase.prototype, "isVisible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.hidden && this.matchesMedia;
        },
        enumerable: true,
        configurable: true
    });
    ColumnBase.propDecorators = {
        resizable: [{ type: core_1.Input }],
        reorderable: [{ type: core_1.Input }],
        minResizableWidth: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        autoSize: [{ type: core_1.Input }],
        locked: [{ type: core_1.Input }],
        hidden: [{ type: core_1.Input }],
        media: [{ type: core_1.Input }],
        lockable: [{ type: core_1.Input }],
        columnMenu: [{ type: core_1.Input }],
        includeInChooser: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        headerStyle: [{ type: core_1.Input }],
        footerStyle: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.Input, args: ['class',] }],
        headerClass: [{ type: core_1.Input }],
        footerClass: [{ type: core_1.Input }],
        headerTemplates: [{ type: core_1.ContentChildren, args: [header_template_directive_1.HeaderTemplateDirective, { descendants: false },] }],
        footerTemplate: [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] }],
        columnMenuTemplates: [{ type: core_1.ContentChildren, args: [column_menu_template_directive_1.ColumnMenuTemplateDirective,] }]
    };
    return ColumnBase;
}());
exports.ColumnBase = ColumnBase;
