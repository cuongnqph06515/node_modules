/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DateFilterComponent } from '../date-filter.component';
import { setFilter, logicOperators } from '../base-filter-cell.component';
/**
 * Represents a date-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-treelist-column field="OrderDate" title="Order Date">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-treelist-date-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-treelist-date-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
export class DateFilterMenuComponent extends DateFilterComponent {
    constructor(localization) {
        super(null, localization);
        this.logicOperators = logicOperators(this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will be displayed.
         */
        this.extra = true;
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    get firstFilter() {
        return setFilter(0, this.filter, (this.column || {}).field, this.operator);
    }
    get secondFilter() {
        return setFilter(1, this.filter, (this.column || {}).field, this.operator);
    }
    logicChange(value) {
        this.filter.logic = value;
    }
    localizationChange() {
        this.logicOperators = logicOperators(this.localization);
        super.localizationChange();
    }
}
DateFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-date-filter-menu',
                template: `
        <kendo-treelist-date-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [activeView]="activeView"
            [bottomView]="bottomView"
            [topView]="topView"
            [format]="format"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="min"
            [max]="max"
            [weekNumber]="weekNumber"
            >
        </kendo-treelist-date-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true"
            (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-treelist-date-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [activeView]="activeView"
            [bottomView]="bottomView"
            [topView]="topView"
            [format]="format"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="min"
            [max]="max"
            [weekNumber]="weekNumber"
            >
        </kendo-treelist-date-filter-menu-input>
    `
            },] },
];
/** @nocollapse */
DateFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
DateFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    extra: [{ type: Input }],
    filterService: [{ type: Input }]
};
