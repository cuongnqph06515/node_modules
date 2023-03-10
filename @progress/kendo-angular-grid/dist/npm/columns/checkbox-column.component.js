/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_base_1 = require("./column-base");
var cell_template_directive_1 = require("../rendering/cell-template.directive");
/**
 * Represents the checkbox for selecting columns in the Grid. If the column is
 * defined as empty, it renders a default checkbox for row selection.
 * You can also define the content of the column inside an `<ng-template>` tag.
 * The input requires you to include the `SelectionCheckbox` option.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current data row index. If inside a new item row, it will be `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * For more examples, refer to:
 * - [Selecting or deselecting all items on a page]({% slug selection_grid %}#toc-select-all-feature)
 * - [Persisting the selection]({% slug selection_grid %}#toc-in-combination-with-the-select-all-feature)
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{enabled: true, checkboxOnly: true}">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-checkbox-column title="Default checkbox">
 *          </kendo-grid-checkbox-column>
 *          <kendo-grid-checkbox-column title="Custom checkbox">
 *            <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *              Select row <input [kendoGridSelectionCheckbox]="idx" />
 *            </ng-template>
 *          </kendo-grid-checkbox-column>
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
var CheckboxColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxColumnComponent, _super);
    function CheckboxColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        /*
         * @hidden
         */
        _this.isCheckboxColumn = true;
        return _this;
    }
    Object.defineProperty(CheckboxColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxColumnComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: column_base_1.ColumnBase,
                            useExisting: core_1.forwardRef(function () { return CheckboxColumnComponent; })
                        }
                    ],
                    selector: 'kendo-grid-checkbox-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CheckboxColumnComponent.ctorParameters = function () { return [
        { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional }] }
    ]; };
    CheckboxColumnComponent.propDecorators = {
        showSelectAll: [{ type: core_1.Input }],
        template: [{ type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective,] }]
    };
    return CheckboxColumnComponent;
}(column_base_1.ColumnBase));
exports.CheckboxColumnComponent = CheckboxColumnComponent;
