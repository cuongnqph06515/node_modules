/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ContentChildren, QueryList, HostBinding } from '@angular/core';
import { isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { isPresent, observe } from '../utils';
import { FilterOperatorBase, toJSON } from './operators/filter-operator.base';
import { map } from 'rxjs/operators';
var insertDefaultFilter = function (index, rootFilter, filter) {
    rootFilter = (rootFilter || { filters: [], logic: "and" });
    rootFilter.filters[index] = filter;
    return filter;
};
var ɵ0 = insertDefaultFilter;
/**
 * @hidden
 */
export var setFilter = function (index, filter, field, defaultOperator) {
    if (isPresent(filter) && isPresent(filter.filters) && filter.filters.length > index) {
        return filter.filters[index];
    }
    else {
        return insertDefaultFilter(index, filter, {
            field: field,
            operator: defaultOperator
        });
    }
};
/**
 * @hidden
 */
export var logicOperators = function (localization) { return [
    { text: localization.get("filterAndLogic"), value: "and" },
    { text: localization.get("filterOrLogic"), value: "or" }
]; };
/**
 * @hidden
 */
export var flatten = function (filter) {
    if (isPresent(filter.filters)) {
        return filter.filters.reduce(function (acc, curr) {
            return acc.concat(isCompositeFilterDescriptor(curr) ? flatten(curr) : [curr]);
        }, []);
    }
    return [];
};
var trimFilterByField = function (filter, field) {
    if (isPresent(filter) && isPresent(filter.filters)) {
        filter.filters = filter.filters.filter(function (x) {
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
var ɵ1 = trimFilterByField;
/**
 * @hidden
 */
export var filtersByField = function (filter, field) {
    return flatten(filter || {}).filter(function (x) { return x.field === field; });
};
/**
 * @hidden
 */
export var filterByField = function (filter, field) {
    var currentFilter = filtersByField(filter, field)[0];
    return currentFilter;
};
/**
 * @hidden
 */
export var removeFilter = function (filter, field) {
    trimFilterByField(filter, field);
    return filter;
};
/**
 * @hidden
 */
export var localizeOperators = function (operators) { return function (localization) { return Object.keys(operators).map(function (key) { return ({
    text: localization.get(key),
    value: operators[key]
}); }); }; };
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_treelist %}#toc-filter-row)).
 */
var BaseFilterCellComponent = /** @class */ (function () {
    function BaseFilterCellComponent(filterService) {
        this.filterService = filterService;
        this.operatorList = new QueryList();
    }
    Object.defineProperty(BaseFilterCellComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFilterCellComponent.prototype, "operators", {
        get: function () {
            return this._operators.length ? this._operators : this.defaultOperators;
        },
        set: function (values) {
            this._operators = values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BaseFilterCellComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.operationListSubscription = observe(this.operatorList)
            .pipe(map(function (q) { return q.toArray(); }), map(toJSON))
            .subscribe(function (x) {
            _this.operators = x;
        });
    };
    BaseFilterCellComponent.prototype.ngOnDestroy = function () {
        if (this.operationListSubscription) {
            this.operationListSubscription.unsubscribe();
        }
    };
    BaseFilterCellComponent.prototype.filterByField = function (field) {
        return filterByField(this.filter, field);
    };
    BaseFilterCellComponent.prototype.filtersByField = function (field) {
        return filtersByField(this.filter, field);
    };
    BaseFilterCellComponent.prototype.removeFilter = function (field) {
        return removeFilter(this.filter, field);
    };
    BaseFilterCellComponent.prototype.updateFilter = function (filter) {
        var root = this.filter || {
            filters: [],
            logic: "and"
        };
        var currentFilter = flatten(root).filter(function (x) { return x.field === filter.field; })[0];
        if (!isPresent(currentFilter)) {
            root.filters.push(filter);
        }
        else {
            Object.assign(currentFilter, filter);
        }
        return root;
    };
    BaseFilterCellComponent.prototype.applyFilter = function (filter) {
        this.filterService.filter(filter);
    };
    BaseFilterCellComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        operatorList: [{ type: ContentChildren, args: [FilterOperatorBase,] }]
    };
    return BaseFilterCellComponent;
}());
export { BaseFilterCellComponent };
export { ɵ0, ɵ1 };
