/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_component_1 = require("../columns/column.component");
var filter_input_directive_1 = require("./filter-input.directive");
var utils_1 = require("../utils");
var base_filter_cell_component_1 = require("./base-filter-cell.component");
var EMPTY_VALUE_OPERATORS = new Set(['isnull', 'isnotnull', 'isempty', 'isnotempty']);
var isEmptyValueOperator = function (operator) { return EMPTY_VALUE_OPERATORS.has(operator); };
var ɵ0 = isEmptyValueOperator;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var FilterInputWrapperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilterInputWrapperComponent, _super);
    function FilterInputWrapperComponent(filterService) {
        var _this = _super.call(this, filterService) || this;
        _this.operators = [];
        return _this;
    }
    Object.defineProperty(FilterInputWrapperComponent.prototype, "currentFilter", {
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputWrapperComponent.prototype, "currentOperator", {
        get: function () {
            var filter = this.currentFilter;
            if (!this._operator) {
                this._operator = filter ? filter.operator : this.defaultOperator;
            }
            return this._operator;
        },
        set: function (value) {
            this._operator = value;
            var emptyValueOperator = isEmptyValueOperator(value);
            this.filterInputDisabled = emptyValueOperator;
            if (emptyValueOperator) {
                this.applyNoValueFilter(value);
            }
            else if (!utils_1.isBlank(value) && utils_1.isPresent(this.currentFilter)) {
                this.onChange(this.currentFilter.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputWrapperComponent.prototype, "defaultOperator", {
        get: function () {
            if (!utils_1.isNullOrEmptyString(this._defaultOperator)) {
                return this._defaultOperator;
            }
            else if (this.operators && this.operators.length) {
                return this.operators[0].value;
            }
            return "eq";
        },
        set: function (value) {
            this._defaultOperator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputWrapperComponent.prototype, "filterInputDisabled", {
        set: function (disabled) {
            if (!this.input) {
                return;
            }
            this.input.disabled = disabled;
        },
        enumerable: true,
        configurable: true
    });
    FilterInputWrapperComponent.prototype.ngAfterContentInit = function () {
        if (utils_1.isPresent(this.input)) {
            this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    };
    FilterInputWrapperComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    };
    FilterInputWrapperComponent.prototype.onChange = function (value) {
        if (!utils_1.isNullOrEmptyString(value) || this.filterByField(this.column.field)) {
            this.filterChange(utils_1.isNullOrEmptyString(value) ?
                this.removeFilter(this.column.field) :
                this.updateFilter({
                    field: this.column.field,
                    operator: this.currentOperator,
                    value: value
                }));
        }
    };
    FilterInputWrapperComponent.prototype.onClear = function () {
        this.onChange(null);
        this.filterInputDisabled = isEmptyValueOperator(this.defaultOperator);
    };
    FilterInputWrapperComponent.prototype.applyNoValueFilter = function (operator) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: operator,
            value: null
        }));
    };
    FilterInputWrapperComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("filter", changes, false)) {
            this._operator = null;
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    };
    FilterInputWrapperComponent.propDecorators = {
        operators: [{ type: core_1.Input }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        input: [{ type: core_1.ContentChild, args: [filter_input_directive_1.FilterInputDirective,] }],
        defaultOperator: [{ type: core_1.Input }]
    };
    return FilterInputWrapperComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
exports.FilterInputWrapperComponent = FilterInputWrapperComponent;
