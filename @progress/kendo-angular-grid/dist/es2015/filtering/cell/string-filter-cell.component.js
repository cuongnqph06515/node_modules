/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { StringFilterComponent } from "../string-filter.component";
/**
 * Represents a string-filter cell component
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-configuration-components-for-filter-templates)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-string-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class StringFilterCellComponent extends StringFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
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
StringFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-string-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <input
                class="k-textbox"
                kendoGridFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [ngModel]="currentFilter?.value" />
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
StringFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
StringFilterCellComponent.propDecorators = {
    filterDelay: [{ type: Input }],
    showOperators: [{ type: Input }]
};
