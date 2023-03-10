/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Input, HostBinding } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { BaseFilterCellComponent } from './base-filter-cell.component';
/**
 * @hidden
 */
export class BooleanFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * @hidden
         */
        this.operator = "eq";
        /**
         * @hidden
         */
        this.items = [
            { text: this.localization.get("filterIsTrue"), value: true },
            { text: this.localization.get("filterIsFalse"), value: false }
        ];
        /**
         * @hidden
         */
        this.defaultItem = { text: this.localization.get("filterBooleanAll"), value: null };
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return true;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.items = [
            { text: this.localization.get("filterIsTrue"), value: true },
            { text: this.localization.get("filterIsFalse"), value: false }
        ];
        this.defaultItem = { text: this.localization.get("filterBooleanAll"), value: null };
    }
}
BooleanFilterComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-boolean',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }]
};
