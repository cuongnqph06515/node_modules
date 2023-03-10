/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef } from '@angular/core';
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
export class BooleanFilterCellComponent extends BooleanFilterComponent {
    constructor(filterService, localization, cd) {
        super(filterService, localization);
        this.cd = cd;
    }
    localizationChange() {
        super.localizationChange();
        this.cd.markForCheck();
    }
}
BooleanFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-boolean-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [showOperators]="false"
            [defaultOperator]="operator">
            <kendo-dropdownlist
                kendoFilterInput
                [defaultItem]="defaultItem"
                [data]="items"
                textField="text"
                valueField="value"
                [popupSettings]="{ width: 'auto' }"
                [valuePrimitive]="true"
                [value]="currentFilter?.value">
            </kendo-dropdownlist>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
BooleanFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
