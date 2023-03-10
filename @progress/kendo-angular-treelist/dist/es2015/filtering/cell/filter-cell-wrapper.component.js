/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { FilterService } from '../filter.service';
import { isPresent, isNullOrEmptyString } from '../../utils';
import { FilterInputWrapperComponent } from "../filter-input-wrapper.component";
const EMPTY_FILTER_OPERATORS = ['isnull', 'isnotnull', 'isempty', 'isnotempty'];
/**
 * @hidden
 */
export class FilterCellWrapperComponent extends FilterInputWrapperComponent {
    constructor(filterService) {
        super(filterService);
        this.showOperators = true;
    }
    get hostClasses() {
        return true;
    }
    get overrideBaseClasses() {
        return false;
    }
    get showButton() {
        const filter = this.currentFilter;
        return isPresent(filter) && (!isNullOrEmptyString(filter.value) ||
            EMPTY_FILTER_OPERATORS.indexOf(String(filter.operator)) >= 0);
    }
    filterChange(filter) {
        this.applyFilter(filter);
    }
}
FilterCellWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-filter-wrapper-cell',
                template: `
        <ng-content></ng-content>
        <kendo-treelist-filter-cell-operators
            [showOperators]="showOperators"
            [operators]="operators"
            (clear)="onClear()"
            [showButton]="showButton"
            [(value)]="currentOperator">
        </kendo-treelist-filter-cell-operators>
    `
            },] },
];
/** @nocollapse */
FilterCellWrapperComponent.ctorParameters = () => [
    { type: FilterService }
];
FilterCellWrapperComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-wrapper',] }],
    overrideBaseClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    showOperators: [{ type: Input }]
};
