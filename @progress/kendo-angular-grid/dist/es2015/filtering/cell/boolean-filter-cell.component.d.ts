/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BooleanFilterComponent } from '../boolean-filter.component';
/**
 * Represents a Boolean filter-cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-boolean-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-boolean-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export declare class BooleanFilterCellComponent extends BooleanFilterComponent {
    private cd;
    constructor(filterService: FilterService, localization: LocalizationService, cd: ChangeDetectorRef);
    protected localizationChange(): void;
}
