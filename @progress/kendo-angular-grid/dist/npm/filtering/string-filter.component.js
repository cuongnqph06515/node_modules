/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
// tslint:disable:no-access-missing-member
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_component_1 = require("../columns/column.component");
var base_filter_cell_component_1 = require("./base-filter-cell.component");
var filter_operator_base_1 = require("./operators/filter-operator.base");
var stringOperators = base_filter_cell_component_1.localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty"
});
/**
 * Represents a base string filter component.
 */
var StringFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StringFilterComponent, _super);
    function StringFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        _this.operator = "contains";
        return _this;
    }
    Object.defineProperty(StringFilterComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField((this.column || {}).field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterComponent.prototype, "currentOperator", {
        /**
         * The current filter operator for the associated column field.
         * @readonly
         * @type {string}
         */
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : this.operator;
        },
        enumerable: true,
        configurable: true
    });
    StringFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    StringFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    StringFilterComponent.prototype.localizationChange = function () {
        this.defaultOperators = stringOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = filter_operator_base_1.toJSON(this.operatorList.toArray());
        }
    };
    StringFilterComponent.propDecorators = {
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        operator: [{ type: core_1.Input }]
    };
    return StringFilterComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
exports.StringFilterComponent = StringFilterComponent;
