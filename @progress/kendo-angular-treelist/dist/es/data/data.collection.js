/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:use-life-cycle-interface */
import { isObservable, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
var LOADING = 'loading';
/**
 * @hidden
 */
var ViewItemFactory = /** @class */ (function () {
    function ViewItemFactory(expandState, editState, loaded, fieldAccessor, rootItem) {
        this.expandState = expandState;
        this.editState = editState;
        this.loaded = loaded;
        this.fieldAccessor = fieldAccessor;
        this.observables = [];
        this.rowIndex = 0;
        var _a = this.fieldAccessor(), data = _a.data, fetchChildren = _a.fetchChildren, hasChildren = _a.hasChildren, pageable = _a.pageable, skip = _a.skip, pageSize = _a.pageSize, idGetter = _a.idGetter, hasFooter = _a.hasFooter;
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
    ViewItemFactory.prototype.generate = function () {
        var result = [];
        var dataLevels = [this.rootLevel];
        var itemIndex = 0;
        var itemCount = 0;
        this.addNew(result);
        while (dataLevels.length) {
            while (dataLevels[0] && dataLevels[0].idx >= dataLevels[0].items.length) {
                var dataLevel = dataLevels.shift();
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
            var currentLevel = dataLevels[0];
            var dataItem = currentLevel.items[currentLevel.idx++];
            var viewItem = {
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
            var expanded = viewItem.hasChildren && this.expandState.isExpanded(viewItem.id);
            if (viewItem.hasChildren && (expanded || this.pageable)) {
                viewItem.expanded = expanded && currentLevel.expanded;
                var children = this.loadChildren(viewItem);
                if (children) {
                    dataLevels.unshift(children);
                    children.parentLevel = currentLevel;
                    if (this.pageable && children.inPage && viewItem.expanded) {
                        var parentLevel = currentLevel;
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
    };
    ViewItemFactory.prototype.loadChildren = function (parent) {
        var parentId = parent.id;
        if (this.loaded.has(parentId)) {
            var children = this.loaded.get(parentId);
            if (children === LOADING) {
                parent.loading = true;
            }
            else {
                return this.dataLevel(parent, children);
            }
        }
        else {
            var children = this.fetchChildren(parent.data);
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
    };
    ViewItemFactory.prototype.inPageRange = function (index) {
        return !this.pageable || (this.skip <= index && index < this.skip + this.pageSize);
    };
    ViewItemFactory.prototype.intersectsPageRange = function (start, end) {
        return !this.pageable || (this.skip <= end && start < this.skip + this.pageSize);
    };
    ViewItemFactory.prototype.dataLevel = function (parent, children) {
        children = children || {};
        var data = children.data || children;
        var items = data && data.length ? data : [];
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
    };
    ViewItemFactory.prototype.addNew = function (result, parent) {
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
    };
    return ViewItemFactory;
}());
export { ViewItemFactory };
/**
 * @hidden
 */
var ViewCollection = /** @class */ (function () {
    function ViewCollection(fieldAccessor, expandState, editState) {
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
    Object.defineProperty(ViewCollection.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.loadData();
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewCollection.prototype, "length", {
        get: function () { return this.data.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewCollection.prototype, "first", {
        get: function () { return this.data[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewCollection.prototype, "last", {
        get: function () { return this.data[this.data.length - 1]; },
        enumerable: true,
        configurable: true
    });
    ViewCollection.prototype.at = function (index) {
        return this.data[index];
    };
    ViewCollection.prototype.itemIndex = function (item) {
        var idGetter = this.fieldAccessor().idGetter;
        return this.data.findIndex(function (i) { return i.id === idGetter(item); });
    };
    ViewCollection.prototype.map = function (fn) { return this.data.map(fn); };
    ViewCollection.prototype.filter = function (fn) {
        return this.data.filter(fn);
    };
    ViewCollection.prototype.reduce = function (fn, init) {
        return this.data.reduce(fn, init);
    };
    ViewCollection.prototype.forEach = function (fn) {
        this.data.forEach(fn);
    };
    ViewCollection.prototype.some = function (fn) {
        return this.data.some(fn);
    };
    ViewCollection.prototype.find = function (fn) {
        return this.data.find(fn);
    };
    ViewCollection.prototype.toString = function () { return this.data.toString(); };
    ViewCollection.prototype.reset = function () {
        this.loaded.clear();
        this.clear();
        this.unsubscribeChildren();
    };
    ViewCollection.prototype.resetItem = function (item, resetChildren) {
        var idGetter = this.fieldAccessor().idGetter;
        var toReset = [item];
        while (toReset.length) {
            var current = toReset.shift();
            var id = idGetter(current);
            if (this.loaded.has(id)) {
                var children = this.loaded.get(id);
                this.loaded.delete(id);
                if (resetChildren) {
                    toReset.push.apply(toReset, children.data || children);
                }
            }
        }
        this.clear();
    };
    ViewCollection.prototype.clear = function () {
        this._data = null;
    };
    ViewCollection.prototype.loadData = function () {
        var _this = this;
        var itemFactory = new ViewItemFactory(this.expandState, this.editState, this.loaded, this.fieldAccessor);
        var result = itemFactory.generate();
        this._data = result.items;
        this.total = result.total;
        this.totalVisible = result.totalVisible;
        if (result.observables && result.observables.length) {
            this.loading = true;
            this.loadingCount += result.observables.length;
            if (!this.childrenSubscription) {
                this.childrenSubscription = new Subscription();
            }
            result.observables.forEach(function (o) {
                _this.loaded.set(o.parentId, LOADING);
                _this.childrenSubscription.add(o.observable.subscribe(function (children) {
                    _this.clear();
                    _this.loaded.set(o.parentId, children);
                    _this.childrenLoaded.emit();
                    _this.loadingCount--;
                    if (_this.loadingCount === 0) {
                        _this.loading = false;
                        _this.unsubscribeChildren();
                        _this.dataLoaded.emit();
                    }
                }));
            });
        }
        else {
            this.dataLoaded.emit();
        }
    };
    ViewCollection.prototype.unsubscribeChildren = function () {
        if (this.childrenSubscription) {
            this.childrenSubscription.unsubscribe();
            this.childrenSubscription = null;
            this.loadingCount = 0;
        }
    };
    return ViewCollection;
}());
export { ViewCollection };
