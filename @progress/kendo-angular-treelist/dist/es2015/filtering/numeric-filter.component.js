/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Input } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { isNullOrEmptyString, extractFormat } from '../utils';
import { toJSON } from './operators/filter-operator.base';
const numericOperators = localizeOperators({
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
export class NumericFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `eq`.
         * @type {string}
         */
        this.operator = "eq";
        /**
         * Specifies the value that is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
        this.defaultOperators = numericOperators(this.localization);
    }
    /**
     * Specifies the number format used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    set format(value) {
        this._format = value;
    }
    /**
     * Specifies the number format used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     *
     * @readonly
     * @type {string}
     */
    get format() {
        return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
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
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    get columnFormat() {
        return this.column && !isNullOrEmptyString(this.column.format) ?
            extractFormat(this.column.format) : "n2";
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
        this.defaultOperators = numericOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
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
