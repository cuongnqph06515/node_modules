/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { StringFilterComponent } from '../string-filter.component';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { setFilter, logicOperators } from '../base-filter-cell.component';
/**
 * Represents a string-filter menu component.
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-configuration-components-for-filter-templates)).
 */
export class StringFilterMenuComponent extends StringFilterComponent {
    constructor(localization) {
        super(null, localization);
        this.logicOperators = logicOperators(this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
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
StringFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-string-filter-menu',
                template: `
        <kendo-grid-string-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter">
        </kendo-grid-string-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true" (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-grid-string-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter">
        </kendo-grid-string-filter-menu-input>
    `
            },] },
];
/** @nocollapse */
StringFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
StringFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    extra: [{ type: Input }],
    filterService: [{ type: Input }]
};
