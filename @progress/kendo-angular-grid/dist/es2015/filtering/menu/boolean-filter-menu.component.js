/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BooleanFilterComponent } from '../boolean-filter.component';
import { guid } from '@progress/kendo-angular-common';
/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
export class BooleanFilterMenuComponent extends BooleanFilterComponent {
    constructor(localization) {
        super(null, localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        this.idPrefix = guid();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    /**
     * @hidden
     */
    radioId(value) {
        return `${this.idPrefix}_${value}`;
    }
    /**
     * @hidden
     */
    onChange(value) {
        this.applyFilter(this.updateFilter({
            field: this.column.field,
            operator: "eq",
            value: value
        }));
    }
    /**
     * @hidden
     */
    isSelected(radioValue) {
        return this.filtersByField(this.column.field).some(({ value }) => value === radioValue);
    }
}
BooleanFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-boolean-filter-menu',
                template: `
        <ul class="k-radio-list k-reset">
            <li *ngFor="let item of items">
                <input type="radio"
                    [name]="idPrefix"
                    class="k-radio"
                    [checked]="isSelected(item.value)"
                    [attr.id]="radioId(item.value)"
                    (change)="onChange(item.value)"
                />
                <label class="k-radio-label" [attr.for]="radioId(item.value)">{{item.text}}</label>
            </li>
        </ul>
    `
            },] },
];
/** @nocollapse */
BooleanFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
BooleanFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    filter: [{ type: Input }],
    filterService: [{ type: Input }]
};
