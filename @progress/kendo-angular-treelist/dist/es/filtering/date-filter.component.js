/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { isNullOrEmptyString, extractFormat } from "../utils";
import { toJSON } from './operators/filter-operator.base';
var dateOperators = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterAfterOrEqualOperator": "gte",
    "filterAfterOperator": "gt",
    "filterBeforeOrEqualOperator": "lte",
    "filterBeforeOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * @hidden
 */
var DateFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DateFilterComponent, _super);
    function DateFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        _this.operator = "gte";
        /**
         * Defines the active view that the calendar initially renders.
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        _this.activeView = "month";
        /**
         * Defines the bottommost calendar view, to which the user can navigate.
         */
        _this.bottomView = "month";
        /**
         * Defines the topmost calendar view, to which the user can navigate.
         */
        _this.topView = "century";
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar.
         */
        _this.weekNumber = false;
        _this.defaultOperators = dateOperators(_this.localization);
        return _this;
    }
    Object.defineProperty(DateFilterComponent.prototype, "currentFilter", {
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
    Object.defineProperty(DateFilterComponent.prototype, "format", {
        /**
         * Specifies the date format that is used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
        },
        /**
         * Specifies the date format that is used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         */
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterComponent.prototype, "columnFormat", {
        get: function () {
            return this.column && !isNullOrEmptyString(this.column.format) ?
                extractFormat(this.column.format) : "d";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterComponent.prototype, "currentOperator", {
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
    DateFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    DateFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    DateFilterComponent.prototype.localizationChange = function () {
        this.defaultOperators = dateOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    };
    DateFilterComponent.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }],
        operator: [{ type: Input }],
        format: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        formatPlaceholder: [{ type: Input }],
        placeholder: [{ type: Input }],
        activeView: [{ type: Input }],
        bottomView: [{ type: Input }],
        topView: [{ type: Input }],
        weekNumber: [{ type: Input }]
    };
    return DateFilterComponent;
}(BaseFilterCellComponent));
export { DateFilterComponent };
