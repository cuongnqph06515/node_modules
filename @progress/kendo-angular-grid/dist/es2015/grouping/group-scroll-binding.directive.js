/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input, ChangeDetectorRef } from '@angular/core';
import { DataBindingDirective } from "../databinding.directive";
import { GridComponent } from "../grid.component";
import { filterBy, process } from "@progress/kendo-data-query";
import { isPresent, isArray } from "../utils";
import { diffFilters, cloneFilters } from "../common/filter-descriptor-differ";
import { LocalDataChangesService } from "../editing/local-data-changes.service";
const hasGroups = (items) => items && items.length && items[0].field && items[0].items;
const ɵ0 = hasGroups;
const groupDescriptorsPresent = (descriptors) => isPresent(descriptors) && descriptors.length > 0;
const ɵ1 = groupDescriptorsPresent;
const processGroups = (data, state) => process(data, state).data;
const ɵ2 = processGroups;
const removeParentDescriptors = (parents, owner) => g => g.field !== owner.field && !parents.some(y => y.field === g.field);
const ɵ3 = removeParentDescriptors;
const findGroup = (groupIndex, groups) => {
    const parents = [];
    return {
        group: groupIndex.split("_").reduce((acc, x) => {
            const idx = parseInt(x, 10);
            if (acc.items) {
                parents.push(acc);
                return acc.items[idx];
            }
            return isArray(acc) ? acc[idx] : acc;
        }, groups),
        parents
    };
};
const ɵ4 = findGroup;
const findChildren = (data, parents) => {
    const filters = parents.map(p => ({ field: p.field, operator: "eq", value: p.value }));
    return filterBy(data, {
        filters: filters,
        logic: "and"
    });
};
const ɵ5 = findChildren;
/**
 * @hidden
 */
export const count = (groups, includeFooters = false) => (groups.reduce((acc, group) => {
    if (!group.skipHeader) {
        acc++;
    }
    if (group.items) {
        const children = count(group.items, includeFooters);
        if (includeFooters && children && !group.hideFooter) {
            acc++;
        }
        acc += children;
    }
    return acc;
}, 0) // tslint:disable-line:align
);
/**
 * @hidden
 */
export const slice = (groups, skip, take, includeFooters = false) => {
    if (!isPresent(take)) {
        return groups;
    }
    const result = [];
    for (let idx = 0, length = groups.length; idx < length; idx++) {
        if (take <= 0) {
            break;
        }
        const group = groups[idx];
        const groupItems = group.items;
        let itemCount = count(groupItems, includeFooters);
        if (includeFooters && groupItems.length) {
            itemCount++;
        }
        const skipHeader = skip > 0;
        if (skip) {
            skip--;
            if (itemCount && skip >= itemCount) {
                skip -= itemCount;
                continue;
            }
        }
        if (!skipHeader || itemCount) {
            const items = [];
            let hideFooter = true;
            if (!skipHeader) {
                take--;
            }
            if (take) {
                if (hasGroups(groupItems)) {
                    const children = slice(groupItems, skip, take, includeFooters);
                    items.push(...children);
                    take -= count(children, includeFooters);
                }
                else {
                    items.push(...groupItems.slice(skip, Math.min(skip + take, groupItems.length)));
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
                hideFooter,
                items,
                offset: idx,
                skipHeader,
                value: group.value
            });
        }
    }
    return result;
};
const skippedHeaders = (groupItem) => {
    let total = 0;
    while (groupItem) {
        if (groupItem.skipHeader) {
            total++;
        }
        groupItem = groupItem.items && groupItem.items[0] || null;
    }
    return total;
};
const ɵ6 = skippedHeaders;
/**
 * A directive which encapsulates the in-memory handling of grouping with virtual scrolling.
 */
export class GroupBindingDirective extends DataBindingDirective {
    constructor(grid, changeDetector, localDataChangesService) {
        super(grid, changeDetector, localDataChangesService);
    }
    /**
     * The array of data which will be used to populate the Grid.
     */
    set kendoGridGroupBinding(value) {
        this.groups = null;
        this.grid.resetGroupsState();
        this.data = value;
    }
    /**
     * @hidden
     */
    set data(value) {
        this.originalData = value || [];
        this.dataChanged = true;
    }
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    set sort(value) {
        const clear = this.state.sort !== value;
        this.grid.sort = this.state.sort = value;
        if (clear) {
            this.groups = null;
            this.grid.resetGroupsState();
        }
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set filter(value) {
        const clear = diffFilters(this.state.filter, value);
        if (clear) {
            this.state.filter = value;
            this.grid.filter = cloneFilters(value);
            this.groups = null;
            this.grid.resetGroupsState();
        }
    }
    /**
     * Defines the descriptors by which the data will be grouped.
     */
    set group(value) {
        // don't clear if no groups are present in previous and current value
        const groupsPresent = groupDescriptorsPresent(this.state.group) || groupDescriptorsPresent(value);
        const clear = this.state.group !== value && groupsPresent;
        this.grid.group = this.state.group = value;
        if (clear) {
            this.groups = null;
            this.grid.resetGroupsState();
            this.skip = 0;
        }
    }
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.grid.groupExpand.subscribe(this.groupExpand.bind(this));
        this.grid.groupCollapse.subscribe(this.groupCollapse.bind(this));
    }
    groupExpand({ groupIndex }) {
        this.grid.expandGroupChildren(groupIndex);
        const { group, parents } = findGroup(groupIndex, this.groups);
        if (!group.items.length) {
            const descriptors = this.state.group.filter(removeParentDescriptors(parents, group));
            const children = findChildren(this.originalData, parents.concat(group));
            group.items = processGroups(children, {
                filter: this.state.filter,
                group: descriptors,
                sort: this.state.sort
            });
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    }
    groupCollapse({ groupIndex }) {
        const { group } = findGroup(groupIndex, this.groups);
        if (group) {
            group.items = [];
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    }
    process(state) {
        if (state.group && state.group.length) {
            const groups = this.processGroups(state);
            this.grid.skip -= skippedHeaders(groups.data[0]);
            return groups;
        }
        else {
            this.groups = null;
        }
        return super.process(state);
    }
    processGroups(state) {
        if (!this.groups || !this.groups.length) {
            this.groups = processGroups(this.originalData, {
                filter: state.filter,
                group: state.group,
                sort: state.sort
            });
        }
        return this.dataResult(state.skip, state.take);
    }
    dataResult(skip, take) {
        const includeFooters = this.grid.showGroupFooters;
        return {
            data: slice(this.groups, skip, take, includeFooters),
            total: count(this.groups, includeFooters)
        };
    }
    applyState({ skip, take, sort, group, filter }) {
        this.skip = skip;
        this.state.take = take;
        // this.pageSize = take; // do need to update take as the process with slice correctly
        this.sort = sort;
        this.group = group;
        this.filter = filter;
    }
}
GroupBindingDirective.decorators = [
    { type: Directive, args: [{ selector: '[kendoGridGroupBinding]' },] },
];
/** @nocollapse */
GroupBindingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: ChangeDetectorRef },
    { type: LocalDataChangesService }
];
GroupBindingDirective.propDecorators = {
    kendoGridGroupBinding: [{ type: Input, args: ["kendoGridGroupBinding",] }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    group: [{ type: Input }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };
