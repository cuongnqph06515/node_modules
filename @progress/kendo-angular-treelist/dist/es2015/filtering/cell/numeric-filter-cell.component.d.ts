/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export declare class NumericFilterCellComponent extends NumericFilterComponent {
    protected localization: LocalizationService;
    /**
     * Determines the delay time (in milliseconds) before the filter value is submitted.
     * A value of `0` indicates no delay. The default value is `500`.
     * @type {boolean}
     */
    filterDelay: number;
    /**
     * Determines if the drop-down filter operators will be displayed.
     * The default value is `true`.
     * @type {boolean}
     */
    showOperators: boolean;
    constructor(filterService: FilterService, localization: LocalizationService);
}
