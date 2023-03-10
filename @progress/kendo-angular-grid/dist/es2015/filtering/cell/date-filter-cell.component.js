/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DateFilterComponent } from '../date-filter.component';
/**
 * Represents a date-filter cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-date-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class DateFilterCellComponent extends DateFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
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
DateFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-date-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-datepicker
                kendoFilterInput
                [value]="currentFilter?.value"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [min]="min"
                [max]="max"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
DateFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
DateFilterCellComponent.propDecorators = {
    showOperators: [{ type: Input }]
};
