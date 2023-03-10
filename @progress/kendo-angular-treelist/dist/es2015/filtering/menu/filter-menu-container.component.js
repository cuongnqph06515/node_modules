/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, SkipSelf, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from "../filter.service";
import { removeFilter, filtersByField } from "../base-filter-cell.component";
import { isPresent, isNullOrEmptyString } from "../../utils";
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneFilters } from '../../common/filter-descriptor-differ';
const isNoValueOperator = operator => (operator === "isnull"
    || operator === "isnotnull"
    || operator === "isempty"
    || operator === "isnotempty");
const ɵ0 = isNoValueOperator;
const validFilters = ({ value, operator }) => !isNullOrEmptyString(value) || isNoValueOperator(operator);
const ɵ1 = validFilters;
const trimFilters = filter => {
    filter.filters = filter.filters.filter(validFilters);
    return filter;
};
const ɵ2 = trimFilters;
const findParent = (filters, field, parent) => {
    return filters.reduce((acc, filter) => {
        if (acc) {
            return acc;
        }
        if (filter.filters) {
            return findParent(filter.filters, field, filter);
        }
        else if (filter.field === field) {
            return parent;
        }
        return acc;
    }, undefined); // tslint:disable-line:align
};
const ɵ3 = findParent;
const parentLogicOfDefault = (filter, field, def = "and") => {
    const parent = findParent(((filter || {}).filters || []), field);
    return isPresent(parent) ? parent.logic : def;
};
const ɵ4 = parentLogicOfDefault;
/**
 * @hidden
 */
export class FilterMenuContainerComponent {
    constructor(parentService, childService, localization, cd) {
        this.parentService = parentService;
        this.childService = childService;
        this.localization = localization;
        this.cd = cd;
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.actionsClass = 'k-action-buttons k-button-group';
        this._templateContext = {};
    }
    get filter() {
        return this._filter;
    }
    /**
     * The current root filter.
     * @type {CompositeFilterDescriptor}
     */
    set filter(value) {
        this._filter = cloneFilters(value);
    }
    get childFilter() {
        if (!isPresent(this._childFilter)) {
            this._childFilter = {
                filters: filtersByField(this.filter, (this.column || {}).field),
                logic: parentLogicOfDefault(this.filter, (this.column || {}).field)
            };
        }
        return this._childFilter;
    }
    ngOnInit() {
        this.subscription = this.childService.changes.subscribe(filter => this._childFilter = filter);
        this.subscription.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    get disabled() {
        return !this.childFilter.filters.some(validFilters);
    }
    get templateContext() {
        this._templateContext.column = this.column;
        this._templateContext.filter = this.childFilter;
        this._templateContext.filterService = this.childService;
        // tslint:disable-next-line:no-string-literal
        this._templateContext["$implicit"] = this.childFilter;
        return this._templateContext;
    }
    get hasTemplate() {
        return isPresent(this.column) && isPresent(this.column.filterMenuTemplateRef);
    }
    submit() {
        const filter = trimFilters(this.childFilter);
        if (filter.filters.length) {
            const root = this.filter || {
                filters: [],
                logic: "and"
            };
            removeFilter(root, this.column.field);
            root.filters.push(filter);
            this.parentService.filter(root);
        }
        this.close.emit();
        return false;
    }
    reset() {
        const root = this.filter || {
            filters: [],
            logic: "and"
        };
        removeFilter(root, this.column.field);
        this.parentService.filter(root);
        this.close.emit();
    }
    get clearText() {
        return this.localization.get("filterClearButton");
    }
    get filterText() {
        return this.localization.get("filterFilterButton");
    }
}
FilterMenuContainerComponent.decorators = [
    { type: Component, args: [{
                providers: [FilterService],
                selector: 'kendo-treelist-filter-menu-container',
                template: `
        <form (submit)="submit()" (reset)="reset()"
            class="k-filter-menu k-group k-reset k-state-border-up">
            <div class="k-filter-menu-container">
                <ng-container [ngSwitch]="hasTemplate">
                    <ng-container *ngSwitchCase="false">
                        <ng-container
                            kendoFilterMenuHost
                            [filterService]="childService"
                            [column]="column"
                            [filter]="childFilter">
                        </ng-container>
                    </ng-container>
                    <ng-container *ngSwitchCase="true">
                        <ng-template
                            *ngIf="column.filterMenuTemplateRef"
                            [ngTemplateOutlet]="column.filterMenuTemplateRef"
                            [ngTemplateOutletContext]="templateContext"
                            >
                        </ng-template>
                    </ng-container>
                </ng-container>
                <div [ngClass]="actionsClass">
                    <button type="reset" class="k-button">{{clearText}}</button>
                    <button type="submit" class="k-button k-primary" [disabled]="disabled">{{filterText}}</button>
                </div>
            </div>
        </form>
    `
            },] },
];
/** @nocollapse */
FilterMenuContainerComponent.ctorParameters = () => [
    { type: FilterService, decorators: [{ type: SkipSelf }] },
    { type: FilterService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
FilterMenuContainerComponent.propDecorators = {
    close: [{ type: Output }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    actionsClass: [{ type: Input }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
