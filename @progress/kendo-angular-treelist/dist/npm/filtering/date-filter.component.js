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
var utils_1 = require("../utils");
var filter_operator_base_1 = require("./operators/filter-operator.base");
var dateOperators = base_filter_cell_component_1.localizeOperators({
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
            return !utils_1.isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
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
            return this.column && !utils_1.isNullOrEmptyString(this.column.format) ?
                utils_1.extractFormat(this.column.format) : "d";
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
            this.operators = filter_operator_base_1.toJSON(this.operatorList.toArray());
        }
    };
    DateFilterComponent.propDecorators = {
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        operator: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        formatPlaceholder: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        bottomView: [{ type: core_1.Input }],
        topView: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }]
    };
    return DateFilterComponent;
}(base_filter_cell_component_1.BaseFilterCellComponent));
exports.DateFilterComponent = DateFilterComponent;
