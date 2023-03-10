/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var databinding_directive_1 = require("../databinding.directive");
var grid_component_1 = require("../grid.component");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var utils_1 = require("../utils");
var filter_descriptor_differ_1 = require("../common/filter-descriptor-differ");
var local_data_changes_service_1 = require("../editing/local-data-changes.service");
var hasGroups = function (items) { return items && items.length && items[0].field && items[0].items; };
var ɵ0 = hasGroups;
exports.ɵ0 = ɵ0;
var groupDescriptorsPresent = function (descriptors) { return utils_1.isPresent(descriptors) && descriptors.length > 0; };
var ɵ1 = groupDescriptorsPresent;
exports.ɵ1 = ɵ1;
var processGroups = function (data, state) { return kendo_data_query_1.process(data, state).data; };
var ɵ2 = processGroups;
exports.ɵ2 = ɵ2;
var removeParentDescriptors = function (parents, owner) { return function (g) { return g.field !== owner.field && !parents.some(function (y) { return y.field === g.field; }); }; };
var ɵ3 = removeParentDescriptors;
exports.ɵ3 = ɵ3;
var findGroup = function (groupIndex, groups) {
    var parents = [];
    return {
        group: groupIndex.split("_").reduce(function (acc, x) {
            var idx = parseInt(x, 10);
            if (acc.items) {
                parents.push(acc);
                return acc.items[idx];
            }
            return utils_1.isArray(acc) ? acc[idx] : acc;
        }, groups),
        parents: parents
    };
};
var ɵ4 = findGroup;
exports.ɵ4 = ɵ4;
var findChildren = function (data, parents) {
    var filters = parents.map(function (p) { return ({ field: p.field, operator: "eq", value: p.value }); });
    return kendo_data_query_1.filterBy(data, {
        filters: filters,
        logic: "and"
    });
};
var ɵ5 = findChildren;
exports.ɵ5 = ɵ5;
/**
 * @hidden
 */
exports.count = function (groups, includeFooters) {
    if (includeFooters === void 0) { includeFooters = false; }
    return (groups.reduce(function (acc, group) {
        if (!group.skipHeader) {
            acc++;
        }
        if (group.items) {
            var children = exports.count(group.items, includeFooters);
            if (includeFooters && children && !group.hideFooter) {
                acc++;
            }
            acc += children;
        }
        return acc;
    }, 0) // tslint:disable-line:align
    );
};
/**
 * @hidden
 */
exports.slice = function (groups, skip, take, includeFooters) {
    if (includeFooters === void 0) { includeFooters = false; }
    if (!utils_1.isPresent(take)) {
        return groups;
    }
    var result = [];
    for (var idx = 0, length_1 = groups.length; idx < length_1; idx++) {
        if (take <= 0) {
            break;
        }
        var group = groups[idx];
        var groupItems = group.items;
        var itemCount = exports.count(groupItems, includeFooters);
        if (includeFooters && groupItems.length) {
            itemCount++;
        }
        var skipHeader = skip > 0;
        if (skip) {
            skip--;
            if (itemCount && skip >= itemCount) {
                skip -= itemCount;
                continue;
            }
        }
        if (!skipHeader || itemCount) {
            var items = [];
            var hideFooter = true;
            if (!skipHeader) {
                take--;
            }
            if (take) {
                if (hasGroups(groupItems)) {
                    var children = exports.slice(groupItems, skip, take, includeFooters);
                    items.push.apply(items, children);
                    take -= exports.count(children, includeFooters);
                }
                else {
                    items.push.apply(items, groupItems.slice(skip, Math.min(skip + take, groupItems.length)));
                    take -= items.length;
                }
                if (take && includeFooters) {
                    hideFooter = false;
                    take--;
                }
                skip = 0;
            }
            result.push({
                aggregates: group.aggregates,
                field: group.field,
                hideFooter: hideFooter,
                items: items,
                offset: idx,
                skipHeader: skipHeader,
                value: group.value
            });
        }
    }
    return result;
};
var skippedHeaders = function (groupItem) {
    var total = 0;
    while (groupItem) {
        if (groupItem.skipHeader) {
            total++;
        }
        groupItem = groupItem.items && groupItem.items[0] || null;
    }
    return total;
};
var ɵ6 = skippedHeaders;
exports.ɵ6 = ɵ6;
/**
 * A directive which encapsulates the in-memory handling of grouping with virtual scrolling.
 */
var GroupBindingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(GroupBindingDirective, _super);
    function GroupBindingDirective(grid, changeDetector, localDataChangesService) {
        return _super.call(this, grid, changeDetector, localDataChangesService) || this;
    }
    Object.defineProperty(GroupBindingDirective.prototype, "kendoGridGroupBinding", {
        /**
         * The array of data which will be used to populate the Grid.
         */
        set: function (value) {
            this.groups = null;
            this.grid.resetGroupsState();
            this.data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "data", {
        /**
         * @hidden
         */
        set: function (value) {
            this.originalData = value || [];
            this.dataChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "sort", {
        /**
         * Defines the descriptors by which the data will be sorted.
         */
        set: function (value) {
            var clear = this.state.sort !== value;
            this.grid.sort = this.state.sort = value;
            if (clear) {
                this.groups = null;
                this.grid.resetGroupsState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "filter", {
        /**
         * Defines the descriptor by which the data will be filtered.
         */
        set: function (value) {
            var clear = filter_descriptor_differ_1.diffFilters(this.state.filter, value);
            if (clear) {
                this.state.filter = value;
                this.grid.filter = filter_descriptor_differ_1.cloneFilters(value);
                this.groups = null;
                this.grid.resetGroupsState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "group", {
        /**
         * Defines the descriptors by which the data will be grouped.
         */
        set: function (value) {
            // don't clear if no groups are present in previous and current value
            var groupsPresent = groupDescriptorsPresent(this.state.group) || groupDescriptorsPresent(value);
            var clear = this.state.group !== value && groupsPresent;
            this.grid.group = this.state.group = value;
            if (clear) {
                this.groups = null;
                this.grid.resetGroupsState();
                this.skip = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    GroupBindingDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.grid.groupExpand.subscribe(this.groupExpand.bind(this));
        this.grid.groupCollapse.subscribe(this.groupCollapse.bind(this));
    };
    GroupBindingDirective.prototype.groupExpand = function (_a) {
        var groupIndex = _a.groupIndex;
        this.grid.expandGroupChildren(groupIndex);
        var _b = findGroup(groupIndex, this.groups), group = _b.group, parents = _b.parents;
        if (!group.items.length) {
            var descriptors = this.state.group.filter(removeParentDescriptors(parents, group));
            var children = findChildren(this.originalData, parents.concat(group));
            group.items = processGroups(children, {
                filter: this.state.filter,
                group: descriptors,
                sort: this.state.sort
            });
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    };
    GroupBindingDirective.prototype.groupCollapse = function (_a) {
        var groupIndex = _a.groupIndex;
        var group = findGroup(groupIndex, this.groups).group;
        if (group) {
            group.items = [];
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    };
    GroupBindingDirective.prototype.process = function (state) {
        if (state.group && state.group.length) {
            var groups = this.processGroups(state);
            this.grid.skip -= skippedHeaders(groups.data[0]);
            return groups;
        }
        else {
            this.groups = null;
        }
        return _super.prototype.process.call(this, state);
    };
    GroupBindingDirective.prototype.processGroups = function (state) {
        if (!this.groups || !this.groups.length) {
            this.groups = processGroups(this.originalData, {
                filter: state.filter,
                group: state.group,
                sort: state.sort
            });
        }
        return this.dataResult(state.skip, state.take);
    };
    GroupBindingDirective.prototype.dataResult = function (skip, take) {
        var includeFooters = this.grid.showGroupFooters;
        return {
            data: exports.slice(this.groups, skip, take, includeFooters),
            total: exports.count(this.groups, includeFooters)
        };
    };
    GroupBindingDirective.prototype.applyState = function (_a) {
        var skip = _a.skip, take = _a.take, sort = _a.sort, group = _a.group, filter = _a.filter;
        this.skip = skip;
        this.state.take = take;
        // this.pageSize = take; // do need to update take as the process with slice correctly
        this.sort = sort;
        this.group = group;
        this.filter = filter;
    };
    GroupBindingDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoGridGroupBinding]' },] },
    ];
    /** @nocollapse */
    GroupBindingDirective.ctorParameters = function () { return [
        { type: grid_component_1.GridComponent },
        { type: core_1.ChangeDetectorRef },
        { type: local_data_changes_service_1.LocalDataChangesService }
    ]; };
    GroupBindingDirective.propDecorators = {
        kendoGridGroupBinding: [{ type: core_1.Input, args: ["kendoGridGroupBinding",] }],
        sort: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        group: [{ type: core_1.Input }]
    };
    return GroupBindingDirective;
}(databinding_directive_1.DataBindingDirective));
exports.GroupBindingDirective = GroupBindingDirective;
