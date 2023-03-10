/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { StringFilterComponent } from "../string-filter.component";
/**
 * Represents a string-filter cell component
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-string-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
export declare class StringFilterCellComponent extends StringFilterComponent {
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
