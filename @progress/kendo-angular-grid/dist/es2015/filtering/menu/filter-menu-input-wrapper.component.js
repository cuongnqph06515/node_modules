/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { FilterInputWrapperComponent } from "../filter-input-wrapper.component";
/**
 * @hidden
 */
export class FilterMenuInputWrapperComponent extends FilterInputWrapperComponent {
    constructor() {
        super(null);
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    operatorChange(dataItem) {
        this.currentOperator = dataItem;
    }
    filterChange(filter) {
        this.applyFilter(filter);
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this._currentFilter;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    set currentFilter(value) {
        this._currentFilter = value;
    }
    updateFilter(filter) {
        Object.assign(this.currentFilter, filter);
        return this.filter;
    }
    onChange(value) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: this.currentOperator,
            value: value
        }));
    }
}
FilterMenuInputWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-filter-menu-input-wrapper',
                template: `
        <kendo-dropdownlist
            [data]="operators"
            (valueChange)="operatorChange($event)"
            [value]="currentOperator"
            [valuePrimitive]="true"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <ng-content></ng-content>
    `
            },] },
];
/** @nocollapse */
FilterMenuInputWrapperComponent.ctorParameters = () => [];
FilterMenuInputWrapperComponent.propDecorators = {
    filterService: [{ type: Input }],
    currentFilter: [{ type: Input }]
};
