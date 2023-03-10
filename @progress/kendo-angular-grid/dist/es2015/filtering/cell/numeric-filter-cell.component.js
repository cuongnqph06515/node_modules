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
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
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
    /**
     * @hidden
     */
    messageFor(key) {
        return this.localization.get(key);
    }
}
NumericFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-numeric-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-numerictextbox
                kendoGridFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step"
            >
                <kendo-numerictextbox-messages
                    [increment]="messageFor('filterNumericIncrement')"
                    [decrement]="messageFor('filterNumericDecrement')"
                >
                </kendo-numerictextbox-messages>
            </kendo-numerictextbox>
        </kendo-grid-filter-wrapper-cell>
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
