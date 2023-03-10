/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { GroupHeaderTemplateDirective } from '../grouping/group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from '../grouping/group-header-column-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { GroupFooterTemplateDirective } from '../grouping/group-footer-template.directive';
import { ColumnBase } from './column-base';
import { isPresent } from '../utils';
import { FilterCellTemplateDirective } from '../filtering/cell/filter-cell-template.directive';
import { FilterMenuTemplateDirective } from '../filtering/menu/filter-menu-template.directive';
/**
 * @hidden
 */
export function isColumnComponent(column) {
    return isPresent(column.field);
}
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
var ColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        _this.sortable = true;
        /**
         * Determines if the column can be dragged to the group panel. The default value is `true`.
         * If set to `false`, you can group the columns by the column field by using the API of the Grid.
         */
        _this.groupable = true;
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
        _this.editor = 'text';
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
        _this.filter = 'text';
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
        _this.filterable = true;
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
        _this.editable = true;
        return _this;
    }
    Object.defineProperty(ColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupHeaderTemplateRef", {
        get: function () {
            return this.groupHeaderTemplate ? this.groupHeaderTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupHeaderColumnTemplateRef", {
        get: function () {
            return this.groupHeaderColumnTemplate ? this.groupHeaderColumnTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupFooterTemplateRef", {
        get: function () {
            return this.groupFooterTemplate ? this.groupFooterTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "editTemplateRef", {
        get: function () {
            return this.editTemplate ? this.editTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterCellTemplateRef", {
        get: function () {
            return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterMenuTemplateRef", {
        get: function () {
            return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "displayTitle", {
        get: function () {
            return this.title === undefined ? this.field : this.title;
        },
        enumerable: true,
        configurable: true
    });
    ColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnComponent; })
                        }
                    ],
                    selector: 'kendo-grid-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    ColumnComponent.propDecorators = {
        field: [{ type: Input }],
        format: [{ type: Input }],
        sortable: [{ type: Input }],
        groupable: [{ type: Input }],
        editor: [{ type: Input }],
        filter: [{ type: Input }],
        filterable: [{ type: Input }],
        editable: [{ type: Input }],
        template: [{ type: ContentChild, args: [CellTemplateDirective,] }],
        groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }],
        groupHeaderColumnTemplate: [{ type: ContentChild, args: [GroupHeaderColumnTemplateDirective,] }],
        groupFooterTemplate: [{ type: ContentChild, args: [GroupFooterTemplateDirective,] }],
        editTemplate: [{ type: ContentChild, args: [EditTemplateDirective,] }],
        filterCellTemplate: [{ type: ContentChild, args: [FilterCellTemplateDirective,] }],
        filterMenuTemplate: [{ type: ContentChild, args: [FilterMenuTemplateDirective,] }]
    };
    return ColumnComponent;
}(ColumnBase));
export { ColumnComponent };
