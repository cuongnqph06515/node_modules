/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ContentChildren, QueryList, HostBinding } from '@angular/core';
import { isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { isPresent, observe } from '../utils';
import { FilterOperatorBase, toJSON } from './operators/filter-operator.base';
import { map } from 'rxjs/operators';
const insertDefaultFilter = (index, rootFilter, filter) => {
    rootFilter = (rootFilter || { filters: [], logic: "and" });
    rootFilter.filters[index] = filter;
    return filter;
};
const ɵ0 = insertDefaultFilter;
/**
 * @hidden
 */
export const setFilter = (index, filter, field, defaultOperator) => {
    if (isPresent(filter) && isPresent(filter.filters) && filter.filters.length > index) {
        return filter.filters[index];
    }
    else {
        return insertDefaultFilter(index, filter, {
            field,
            operator: defaultOperator
        });
    }
};
/**
 * @hidden
 */
export const logicOperators = (localization) => [
    { text: localization.get("filterAndLogic"), value: "and" },
    { text: localization.get("filterOrLogic"), value: "or" }
];
/**
 * @hidden
 */
export const flatten = (filter) => {
    if (isPresent(filter.filters)) {
        return filter.filters.reduce((acc, curr) => acc.concat(isCompositeFilterDescriptor(curr) ? flatten(curr) : [curr]), []);
    }
    return [];
};
const trimFilterByField = (filter, field) => {
    if (isPresent(filter) && isPresent(filter.filters)) {
        filter.filters = filter.filters.filter(x => {
            if (isCompositeFilterDescriptor(x)) {
                trimFilterByField(x, field);
                return x.filters.length;
            }
            else {
                return x.field !== field;
            }
        });
    }
};
const ɵ1 = trimFilterByField;
/**
 * @hidden
 */
export const filtersByField = (filter, field) => flatten(filter || {}).filter(x => x.field === field);
/**
 * @hidden
 */
export const filterByField = (filter, field) => {
    let [currentFilter] = filtersByField(filter, field);
    return currentFilter;
};
/**
 * @hidden
 */
export const removeFilter = (filter, field) => {
    trimFilterByField(filter, field);
    return filter;
};
/**
 * @hidden
 */
export const localizeOperators = operators => localization => Object.keys(operators).map(key => ({
    text: localization.get(key),
    value: operators[key]
}));
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_treelist %}#toc-filter-row)).
 */
export class BaseFilterCellComponent {
    constructor(filterService) {
        this.filterService = filterService;
        this.operatorList = new QueryList();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return true;
    }
    get operators() {
        return this._operators.length ? this._operators : this.defaultOperators;
    }
    set operators(values) {
        this._operators = values;
    }
    /**
     * @hidden
     */
    ngAfterContentInit() {
        this.operationListSubscription = observe(this.operatorList)
            .pipe(map(q => q.toArray()), map(toJSON))
            .subscribe(x => {
            this.operators = x;
        });
    }
    ngOnDestroy() {
        if (this.operationListSubscription) {
            this.operationListSubscription.unsubscribe();
        }
    }
    filterByField(field) {
        return filterByField(this.filter, field);
    }
    filtersByField(field) {
        return filtersByField(this.filter, field);
    }
    removeFilter(field) {
        return removeFilter(this.filter, field);
    }
    updateFilter(filter) {
        const root = this.filter || {
            filters: [],
            logic: "and"
        };
        let [currentFilter] = flatten(root).filter(x => x.field === filter.field);
        if (!isPresent(currentFilter)) {
            root.filters.push(filter);
        }
        else {
            Object.assign(currentFilter, filter);
        }
        return root;
    }
    applyFilter(filter) {
        this.filterService.filter(filter);
    }
}
BaseFilterCellComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    operatorList: [{ type: ContentChildren, args: [FilterOperatorBase,] }]
};
export { ɵ0, ɵ1 };
