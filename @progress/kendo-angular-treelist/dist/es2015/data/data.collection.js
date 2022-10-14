/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:use-life-cycle-interface */
import { isObservable, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
const LOADING = 'loading';
/**
 * @hidden
 */
export class ViewItemFactory {
    constructor(expandState, editState, loaded, fieldAccessor, rootItem) {
        this.expandState = expandState;
        this.editState = editState;
        this.loaded = loaded;
        this.fieldAccessor = fieldAccessor;
        this.observables = [];
        this.rowIndex = 0;
        const { data, fetchChildren, hasChildren, pageable, skip, pageSize, idGetter, hasFooter } = this.fieldAccessor();
        this.fetchChildren = fetchChildren;
        this.hasChildren = hasChildren;
        this.pageable = pageable && Boolean(pageSize);
        this.skip = skip;
        this.pageSize = pageSize;
        this.idGetter = idGetter;
        this.hasFooter = hasFooter;
        if (rootItem) {
            this.rootLevel = this.loadChildren(rootItem);
        }
        else {
            this.rootLevel = this.dataLevel({
                level: -1,
                id: null,
                expanded: true
            }, data);
        }
    }
    generate() {
        const result = [];
        const dataLevels = [this.rootLevel];
        let itemIndex = 0;
        let itemCount = 0;
        this.addNew(result);
        while (dataLevels.length) {
            while (dataLevels[0] && dataLevels[0].idx >= dataLevels[0].items.length) {
                const dataLevel = dataLevels.shift();
                if (this.hasFooter && dataLevel.expanded && dataLevel.items.length) {
                    if (dataLevel.inPage) {
                        result.push({
                            type: 'footer',
                            items: dataLevel.items,
                            aggregates: dataLevel.aggregates,
                            level: dataLevel.level,
                            parentIndex: dataLevel.parentIndex,
                            rowIndex: this.rowIndex
                        });
                    }
                    this.rowIndex++;
                }
            }
            if (!dataLevels.length) {
                break;
            }
            const currentLevel = dataLevels[0];
            const dataItem = currentLevel.items[currentLevel.idx++];
            const viewItem = {
                type: 'data',
                data: dataItem,
                id: this.idGetter(dataItem),
                rowIndex: this.rowIndex,
                index: itemIndex,
                level: currentLevel.level,
                hasChildren: this.hasChildren(dataItem),
                parent: currentLevel.parent
            };
            if (currentLevel.expanded) {
                this.rowIndex++;
                if (this.inPageRange(itemIndex)) {
                    result.push(viewItem);
                    viewItem.editContext = this.editState.context(viewItem.data);
                    this.addNew(result, dataItem);
                }
                itemIndex++;
            }
            itemCount++;
            const expanded = viewItem.hasChildren && this.expandState.isExpanded(viewItem.id);
            if (viewItem.hasChildren && (expanded || this.pageable)) {
                viewItem.expanded = expanded && currentLevel.expanded;
                const children = this.loadChildren(viewItem);
                if (children) {
                    dataLevels.unshift(children);
                    children.parentLevel = currentLevel;
                    if (this.pageable && children.inPage && viewItem.expanded) {
                        let parentLevel = currentLevel;
                        while (parentLevel && !parentLevel.inPage) {
                            parentLevel.inPage = true;
                            parentLevel = parentLevel.parentLevel;
                        }
                    }
                }
            }
        }
        return {
            items: result,
            observables: this.observables,
            total: itemCount,
            totalVisible: itemIndex
        };
    }
    loadChildren(parent) {
        const parentId = parent.id;
        if (this.loaded.has(parentId)) {
            const children = this.loaded.get(parentId);
            if (children === LOADING) {
                parent.loading = true;
            }
            else {
                return this.dataLevel(parent, children);
            }
        }
        else {
            const children = this.fetchChildren(parent.data);
            if (isObservable(children)) {
                this.observables.push({
                    observable: children,
                    parentId: parentId
                });
                parent.loading = true;
            }
            else if (children) {
                this.loaded.set(parentId, children);
                return this.dataLevel(parent, children);
            }
        }
    }
    inPageRange(index) {
        return !this.pageable || (this.skip <= index && index < this.skip + this.pageSize);
    }
    intersectsPageRange(start, end) {
        return !this.pageable || (this.skip <= end && start < this.skip + this.pageSize);
    }
    dataLevel(parent, children) {
        children = children || {};
        const data = children.data || children;
        const items = data && data.length ? data : [];
        return {
            idx: 0,
            level: parent.level + 1,
            items: items,
            aggregates: children.aggregates,
            expanded: parent.expanded,
            inPage: parent.level === -1 || this.intersectsPageRange(parent.index + 1, parent.index + items.length),
            parentIndex: parent.index,
            parent: parent
        };
    }
    addNew(result, parent) {
        if (this.editState.hasNew(parent)) {
            result.push({
                parent: parent,
                isNew: true,
                type: 'data',
                data: this.editState.newItem.dataItem,
                editContext: this.editState.newItem,
                rowIndex: this.rowIndex++
            });
        }
    }
}
/**
 * @hidden
 */
export class ViewCollection {
    constructor(fieldAccessor, expandState, editState) {
        this.fieldAccessor = fieldAccessor;
        this.expandState = expandState;
        this.editState = editState;
        this.childrenLoaded = new EventEmitter();
        this.dataLoaded = new EventEmitter();
        this.total = 0;
        this.totalVisible = 0;
        this.loaded = new Map();
        this.loading = false;
        this.loadingCount = 0;
    }
    get data() {
        if (!this._data) {
            this.loadData();
        }
        return this._data;
    }
    get length() { return this.data.length; }
    get first() { return this.data[0]; }
    get last() { return this.data[this.data.length - 1]; }
    at(index) {
        return this.data[index];
    }
    itemIndex(item) {
        const idGetter = this.fieldAccessor().idGetter;
        return this.data.findIndex(i => i.id === idGetter(item));
    }
    map(fn) { return this.data.map(fn); }
    filter(fn) {
        return this.data.filter(fn);
    }
    reduce(fn, init) {
        return this.data.reduce(fn, init);
    }
    forEach(fn) {
        this.data.forEach(fn);
    }
    some(fn) {
        return this.data.some(fn);
    }
    find(fn) {
        return this.data.find(fn);
    }
    toString() { return this.data.toString(); }
    reset() {
        this.loaded.clear();
        this.clear();
        this.unsubscribeChildren();
    }
    resetItem(item, resetChildren) {
        const idGetter = this.fieldAccessor().idGetter;
        const toReset = [item];
        while (toReset.length) {
            const current = toReset.shift();
            const id = idGetter(current);
            if (this.loaded.has(id)) {
                const children = this.loaded.get(id);
                this.loaded.delete(id);
                if (resetChildren) {
                    toReset.push.apply(toReset, children.data || children);
                }
            }
        }
        this.clear();
    }
    clear() {
        this._data = null;
    }
    loadData() {
        const itemFactory = new ViewItemFactory(this.expandState, this.editState, this.loaded, this.fieldAccessor);
        const result = itemFactory.generate();
        this._data = result.items;
        this.total = result.total;
        this.totalVisible = result.totalVisible;
        if (result.observables && result.observables.length) {
            this.loading = true;
            this.loadingCount += result.observables.length;
            if (!this.childrenSubscription) {
                this.childrenSubscription = new Subscription();
            }
            result.observables.forEach(o => {
                this.loaded.set(o.parentId, LOADING);
                this.childrenSubscription.add(o.observable.subscribe(children => {
                    this.clear();
                    this.loaded.set(o.parentId, children);
                    this.childrenLoaded.emit();
                    this.loadingCount--;
                    if (this.loadingCount === 0) {
                        this.loading = false;
                        this.unsubscribeChildren();
                        this.dataLoaded.emit();
                    }
                }));
            });
        }
        else {
            this.dataLoaded.emit();
        }
    }
    unsubscribeChildren() {
        if (this.childrenSubscription) {
            this.childrenSubscription.unsubscribe();
            this.childrenSubscription = null;
            this.loadingCount = 0;
        }
    }
}
