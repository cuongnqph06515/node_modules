/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { ColumnComponent } from '../../columns/column.component';
import { isPresent, isNullOrEmptyString } from '../../utils';
import { cloneFilters } from '../../common/filter-descriptor-differ';
/**
 * @hidden
 */
export class FilterCellComponent {
    constructor() {
        this._templateContext = {};
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter = cloneFilters(value);
    }
    get templateContext() {
        this._templateContext.column = this.column;
        this._templateContext.filter = this.filter;
        // tslint:disable-next-line:no-string-literal
        this._templateContext["$implicit"] = this.filter;
        return this._templateContext;
    }
    get hasTemplate() {
        return isPresent(this.column.filterCellTemplateRef);
    }
    get isFilterable() {
        return isPresent(this.column) && !isNullOrEmptyString(this.column.field) && this.column.filterable;
    }
}
FilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListFilterCell]',
                template: `
        <ng-template [ngIf]="isFilterable">
            <ng-container [ngSwitch]="hasTemplate">
                <ng-container *ngSwitchCase="false">
                    <ng-container kendoFilterCellHost [column]="column" [filter]="filter"></ng-container>
                </ng-container>
                <ng-container *ngSwitchCase="true">
                    <ng-template
                        *ngIf="column.filterCellTemplateRef"
                        [ngTemplateOutlet]="column.filterCellTemplateRef"
                        [ngTemplateOutletContext]="templateContext">
                    </ng-template>
                </ng-container>
            </ng-container>
        </ng-template>
    `
            },] },
];
FilterCellComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }]
};
