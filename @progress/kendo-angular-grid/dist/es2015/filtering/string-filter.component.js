/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Input } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { BaseFilterCellComponent, localizeOperators } from './base-filter-cell.component';
import { toJSON } from './operators/filter-operator.base';
const stringOperators = localizeOperators({
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
export class StringFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        this.operator = "contains";
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField((this.column || {}).field);
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
        this.defaultOperators = stringOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
StringFilterComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }]
};
