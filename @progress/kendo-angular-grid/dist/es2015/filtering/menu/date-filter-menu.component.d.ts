/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DateFilterComponent } from '../date-filter.component';
/**
 * Represents a date-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-date-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-date-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export declare class DateFilterMenuComponent extends DateFilterComponent {
    logicOperators: Array<{
        text: string;
        value: "and" | "or";
    }>;
    /**
     * @hidden
     */
    readonly hostClasses: boolean;
    /**
     * The column with which the filter is associated.
     * @type {ColumnComponent}
     */
    column: ColumnComponent;
    /**
     * The current menu filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * Determines if the inputs of second criteria will be displayed.
     */
    extra: boolean;
    /**
     * The `FilterService` instance which is responsible for handling the changes in the filter descriptor.
     */
    filterService: FilterService;
    constructor(localization: LocalizationService);
    readonly firstFilter: FilterDescriptor;
    readonly secondFilter: FilterDescriptor;
    logicChange(value: 'and' | 'or'): void;
    protected localizationChange(): void;
}
