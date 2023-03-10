/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
// tslint:disable:no-access-missing-member
import { Input } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { isNullOrEmptyString, extractFormat } from '../utils';
import { toJSON } from './operators/filter-operator.base';
var numericOperators = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterGteOperator": "gte",
    "filterGtOperator": "gt",
    "filterLteOperator": "lte",
    "filterLtOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * Represents a base numeric filter component.
 */
var NumericFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NumericFilterComponent, _super);
    function NumericFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * The default filter operator. Defaults to `eq`.
         * @type {string}
         */
        _this.operator = "eq";
        /**
         * Specifies the value that is used to increment or decrement the component value.
         * @type {numeric}
         */
        _this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        _this.spinners = true;
        _this.defaultOperators = numericOperators(_this.localization);
        return _this;
    }
    Object.defineProperty(NumericFilterComponent.prototype, "format", {
        /**
         * Specifies the number format used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
        },
        /**
         * Specifies the number format used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         */
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterComponent.prototype, "currentOperator", {
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
    Object.defineProperty(NumericFilterComponent.prototype, "columnFormat", {
        get: function () {
            return this.column && !isNullOrEmptyString(this.column.format) ?
                extractFormat(this.column.format) : "n2";
        },
        enumerable: true,
        configurable: true
    });
    NumericFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    NumericFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    NumericFilterComponent.prototype.localizationChange = function () {
        this.defaultOperators = numericOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    };
    NumericFilterComponent.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }],
        operator: [{ type: Input }],
        step: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        spinners: [{ type: Input }],
        decimals: [{ type: Input }],
        format: [{ type: Input }]
    };
    return NumericFilterComponent;
}(BaseFilterCellComponent));
export { NumericFilterComponent };
