/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Component, Input } from '@angular/core';
import { ColumnComponent } from '../../columns/column.component';
import { FilterService } from '../filter.service';
import { BaseFilterCellComponent, localizeOperators } from '../base-filter-cell.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
const stringOperators = localizeOperators({
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
export class AutoCompleteFilterCellComponent extends BaseFilterCellComponent {
    constructor(filterService, column, localization) {
        super(filterService);
        this.localization = localization;
        this.showOperators = true;
        this.defaultOperators = stringOperators(this.localization);
        this.column = column;
    }
    set valueField(value) {
        this._valueField = value;
    }
    get valueField() {
        return this._valueField ? this._valueField : this.column.field;
    }
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : "contains";
    }
}
AutoCompleteFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-autocomplete-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [showOperators]="showOperators">
            <kendo-autocomplete
                kendoFilterInput
                [data]="data"
                [valueField]="valueField"
                [value]="currentFilter?.value">
            </kendo-autocomplete>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
AutoCompleteFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: ColumnComponent },
    { type: LocalizationService }
];
AutoCompleteFilterCellComponent.propDecorators = {
    showOperators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    data: [{ type: Input }],
    valueField: [{ type: Input }]
};
