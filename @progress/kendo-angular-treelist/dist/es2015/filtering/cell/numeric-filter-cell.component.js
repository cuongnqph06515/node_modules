/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NumericFilterComponent } from '../numeric-filter.component';
/**
 * Represents a numeric filter cell.
 *
 * @example
 *  ```html-no-run
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
export class NumericFilterCellComponent extends NumericFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        this.showOperators = true;
    }
}
NumericFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-numeric-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <kendo-numerictextbox
                kendoTreeListFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step">
            </kendo-numerictextbox>
        </kendo-treelist-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
NumericFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
NumericFilterCellComponent.propDecorators = {
    filterDelay: [{ type: Input }],
    showOperators: [{ type: Input }]
};
