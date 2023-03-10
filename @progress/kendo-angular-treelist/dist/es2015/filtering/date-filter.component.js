/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Input } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { isNullOrEmptyString, extractFormat } from "../utils";
import { toJSON } from './operators/filter-operator.base';
const dateOperators = localizeOperators({
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
export class DateFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        this.operator = "gte";
        /**
         * Defines the active view that the calendar initially renders.
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = "month";
        /**
         * Defines the bottommost calendar view, to which the user can navigate.
         */
        this.bottomView = "month";
        /**
         * Defines the topmost calendar view, to which the user can navigate.
         */
        this.topView = "century";
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar.
         */
        this.weekNumber = false;
        this.defaultOperators = dateOperators(this.localization);
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    /**
     * Specifies the date format that is used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    set format(value) {
        this._format = value;
    }
    /**
     * Specifies the date format that is used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     *
     * @readonly
     * @type {string}
     */
    get format() {
        return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
    }
    get columnFormat() {
        return this.column && !isNullOrEmptyString(this.column.format) ?
            extractFormat(this.column.format) : "d";
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.defaultOperators = dateOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
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
