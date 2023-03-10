/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ColumnComponent } from '../../columns/column.component';
import { FilterService } from '../filter.service';
import { BaseFilterCellComponent, localizeOperators } from '../base-filter-cell.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
var stringOperators = localizeOperators({
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
        { type: Component, args: [{
                    selector: 'kendo-grid-autocomplete-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [showOperators]=\"showOperators\">\n            <kendo-autocomplete\n                kendoFilterInput\n                [data]=\"data\"\n                [valueField]=\"valueField\"\n                [value]=\"currentFilter?.value\">\n            </kendo-autocomplete>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    AutoCompleteFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: ColumnComponent },
        { type: LocalizationService }
    ]; };
    AutoCompleteFilterCellComponent.propDecorators = {
        showOperators: [{ type: Input }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        data: [{ type: Input }],
        valueField: [{ type: Input }]
    };
    return AutoCompleteFilterCellComponent;
}(BaseFilterCellComponent));
export { AutoCompleteFilterCellComponent };
