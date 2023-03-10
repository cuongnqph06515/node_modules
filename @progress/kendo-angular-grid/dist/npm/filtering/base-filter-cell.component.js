/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var utils_1 = require("../utils");
var filter_operator_base_1 = require("./operators/filter-operator.base");
var operators_1 = require("rxjs/operators");
var insertDefaultFilter = function (index, rootFilter, filter) {
    rootFilter = (rootFilter || { filters: [], logic: "and" });
    rootFilter.filters[index] = filter;
    return filter;
};
var ɵ0 = insertDefaultFilter;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.setFilter = function (index, filter, field, defaultOperator) {
    if (utils_1.isPresent(filter) && utils_1.isPresent(filter.filters) && filter.filters.length > index) {
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
exports.logicOperators = function (localization) { return [
    { text: localization.get("filterAndLogic"), value: "and" },
    { text: localization.get("filterOrLogic"), value: "or" }
]; };
/**
 * @hidden
 */
exports.flatten = function (filter) {
    if (utils_1.isPresent(filter.filters)) {
        return filter.filters.reduce(function (acc, curr) {
            return acc.concat(kendo_data_query_1.isCompositeFilterDescriptor(curr) ? exports.flatten(curr) : [curr]);
        }, []);
    }
    return [];
};
var trimFilterByField = function (filter, field) {
    if (utils_1.isPresent(filter) && utils_1.isPresent(filter.filters)) {
        filter.filters = filter.filters.filter(function (x) {
            if (kendo_data_query_1.isCompositeFilterDescriptor(x)) {
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
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
exports.filtersByField = function (filter, field) {
    return exports.flatten(filter || {}).filter(function (x) { return x.field === field; });
};
/**
 * @hidden
 */
exports.filterByField = function (filter, field) {
    var currentFilter = exports.filtersByField(filter, field)[0];
    return currentFilter;
};
/**
 * @hidden
 */
exports.removeFilter = function (filter, field) {
    trimFilterByField(filter, field);
    return filter;
};
/**
 * @hidden
 */
exports.localizeOperators = function (operators) { return function (localization) { return Object.keys(operators).map(function (key) { return ({
    text: localization.get(key),
    value: operators[key]
}); }); }; };
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-row)).
 */
var BaseFilterCellComponent = /** @class */ (function () {
    function BaseFilterCellComponent(filterService) {
        this.filterService = filterService;
        this.operatorList = new core_1.QueryList();
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
        this.operationListSubscription = utils_1.observe(this.operatorList)
            .pipe(operators_1.map(function (q) { return q.toArray(); }), operators_1.map(filter_operator_base_1.toJSON))
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
        return exports.filterByField(this.filter, field);
    };
    BaseFilterCellComponent.prototype.filtersByField = function (field) {
        return exports.filtersByField(this.filter, field);
    };
    BaseFilterCellComponent.prototype.removeFilter = function (field) {
        return exports.removeFilter(this.filter, field);
    };
    BaseFilterCellComponent.prototype.updateFilter = function (filter) {
        var root = this.filter || {
            filters: [],
            logic: "and"
        };
        var currentFilter = exports.flatten(root).filter(function (x) { return x.field === filter.field; })[0];
        if (!utils_1.isPresent(currentFilter)) {
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
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-filtercell',] }],
        operatorList: [{ type: core_1.ContentChildren, args: [filter_operator_base_1.FilterOperatorBase,] }]
    };
    return BaseFilterCellComponent;
}());
exports.BaseFilterCellComponent = BaseFilterCellComponent;
