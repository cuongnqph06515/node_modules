/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
// tslint:disable:no-access-missing-member
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_component_1 = require("../../columns/column.component");
var filter_service_1 = require("../filter.service");
var base_filter_cell_component_1 = require("../base-filter-cell.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var stringOperators = base_filter_cell_component_1.localizeOperators({
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty"
});
/**
 * @hidden
 */
var AutoCompleteFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AutoCompleteFilterCellComponent, _super);
    function AutoCompleteFilterCellComponent(filterService, column, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        _this.showOperators = true;
        _this.defaultOperators = stringOperators(_this.localization);
        _this.column = column;
        return _this;
    }
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "valueField", {
        get: function () {
            return this._valueField ? this._valueField : this.column.field;
        },
        set: function (value) {
            this._valueField = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "currentFilter", {
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "currentOperator", {
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : "contains";
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteFilterCellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-autocomplete-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [showOperators]=\"showOperators\">\n            <kendo-autocomplete\n                kendoFilterInput\n                [data]=\"data\"\n                [valueField]=\"valueField\"\n                [value]=\"currentFilter?.value\">\n            </kendo-autocomplete>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    AutoCompleteFilterCellComponent.ctorParameters = function () { return [
        { type: filter_service_1.FilterService },
        { type: column_component_1.ColumnComponent },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    AutoCompleteFilterCellComponent.propDecorators = {
        showOperators: [{ type: core_1.Input }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        valueField: [{ type: core_1.Input }]
    };
    return AutoCompleteFilterCellComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
exports.AutoCompleteFilterCellComponent = AutoCompleteFilterCellComponent;
