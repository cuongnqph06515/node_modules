/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export declare class DateFilterCellComponent extends DateFilterComponent {
    protected localization: LocalizationService;
    /**
     * Determines if the drop-down filter operators will be displayed. The default value is `true`.
     * @type {boolean}
     */
    showOperators: boolean;
    constructor(filterService: FilterService, localization: LocalizationService);
    /**
     * @hidden
     */
    messageFor(key: string): string;
}
