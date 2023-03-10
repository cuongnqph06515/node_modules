/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
/* tslint:disable:use-life-cycle-interface */
var isGroupItem = function (source) {
    return source.items !== undefined &&
        source.field !== undefined;
};
var ɵ0 = isGroupItem;
exports.ɵ0 = ɵ0;
var isVirtualGroupItem = function (source) {
    return source.offset !== undefined &&
        source.skipHeader !== undefined;
};
var ɵ1 = isVirtualGroupItem;
exports.ɵ1 = ɵ1;
var flattenGroups = function (groups) { return (groups.reduce(function (acc, curr) {
    if (isGroupItem(curr)) {
        return acc.concat(flattenGroups(curr.items));
    }
    return acc.concat([curr]);
}, []) // tslint:disable-line:align
); };
var ɵ2 = flattenGroups;
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
exports.itemAt = function (data, index) {
    var first = data[0];
    if (utils_2.isPresent(first) && isGroupItem(first)) {
        return flattenGroups(data)[index];
    }
    return data[index];
};
/**
 * @hidden
 */
exports.getIterator = function (data, _a) {
    var footers = _a.footers, level = _a.level, dataIndex = _a.dataIndex, parentGroupIndex = _a.parentGroupIndex, groupIndex = _a.groupIndex;
    var first = data[0];
    if (utils_2.isPresent(first) && isGroupItem(first)) {
        if (isVirtualGroupItem(first)) {
            groupIndex = utils_2.isPresent(first.offset) ? first.offset : groupIndex;
        }
        //tslint:disable-next-line:no-use-before-declare
        return new GroupIterator(data, footers, level, dataIndex, parentGroupIndex, groupIndex);
    }
    //tslint:disable-next-line:no-use-before-declare
    return new ItemIterator(data, dataIndex, parentGroupIndex);
};
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(arr, idx) {
        if (idx === void 0) { idx = 0; }
        this.arr = arr;
        this.idx = idx;
        this.arr = arr || [];
    }
    ArrayIterator.prototype[utils_1.iterator] = function () {
        return this;
    };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.arr.length ? {
            done: false,
            value: this.arr[this.idx++]
        } : { done: true, value: undefined };
    };
    return ArrayIterator;
}());
/**
 * @hidden
 */
var Iterator = /** @class */ (function () {
    function Iterator(arr, dataIndex, resultMap) {
        if (dataIndex === void 0) { dataIndex = 0; }
        if (resultMap === void 0) { resultMap = function (x) { return x; }; }
        this.dataIndex = dataIndex;
        this.resultMap = resultMap;
        var iter = arr[utils_1.iterator];
        this._innerIterator = iter ? arr[utils_1.iterator]() : new ArrayIterator(arr);
    }
    Iterator.prototype[utils_1.iterator] = function () {
        return this;
    };
    Iterator.prototype.next = function () {
        return this.resultMap(this._innerIterator.next(), this.dataIndex++);
    };
    return Iterator;
}());
exports.Iterator = Iterator;
/**
 * @hidden
 */
var ItemIterator = /** @class */ (function (_super) {
    tslib_1.__extends(ItemIterator, _super);
    function ItemIterator(arr, dataIndex, groupIndex) {
        return _super.call(this, arr, dataIndex, function (x, idx) { return ({
            done: x.done,
            value: {
                data: x.value,
                groupIndex: groupIndex,
                index: idx,
                type: 'data'
            }
        }); }) || this;
    }
    Object.defineProperty(ItemIterator.prototype, "index", {
        /**
         * The index of the next record.
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.dataIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ItemIterator;
}(Iterator));
exports.ItemIterator = ItemIterator;
var prefix = function (s, n) {
    var p = s ? s + "_" : s;
    return "" + p + n;
};
var ɵ3 = prefix;
exports.ɵ3 = ɵ3;
/**
 * @hidden
 */
var GroupIterator = /** @class */ (function () {
    function GroupIterator(arr, outputFooters, level, dataIndex, parentIndex, groupIndex) {
        if (outputFooters === void 0) { outputFooters = false; }
        if (level === void 0) { level = 0; }
        if (dataIndex === void 0) { dataIndex = 0; }
        if (parentIndex === void 0) { parentIndex = ""; }
        if (groupIndex === void 0) { groupIndex = 0; }
        this.arr = arr;
        this.outputFooters = outputFooters;
        this.level = level;
        this.dataIndex = dataIndex;
        this.parentIndex = parentIndex;
        this.groupIndex = groupIndex;
        this.currentGroupIndex = "";
        this.arr = arr || [];
        this._iterator = new Iterator(this.arr, this.dataIndex);
    }
    GroupIterator.prototype[utils_1.iterator] = function () {
        return this;
    };
    GroupIterator.prototype.nextGroupItem = function () {
        this.current = this._iterator.next().value;
        this._innerIterator = null;
        if (this.current) {
            this.currentGroupIndex = prefix(this.parentIndex, this.groupIndex++);
            return {
                done: false,
                value: {
                    data: this.current,
                    index: this.currentGroupIndex,
                    level: this.level,
                    type: 'group'
                }
            };
        }
        else {
            this.current = null;
            return { done: true, value: undefined };
        }
    };
    GroupIterator.prototype.footerItem = function () {
        if (this.current) {
            var group = this.current;
            this.current = null;
            return {
                done: false,
                value: {
                    data: group,
                    groupIndex: this.currentGroupIndex,
                    level: this.level,
                    type: 'footer'
                }
            };
        }
        else {
            this.current = null;
            return { done: true, value: undefined };
        }
    };
    GroupIterator.prototype.innerIterator = function (group) {
        if (!this._innerIterator) {
            this._innerIterator = exports.getIterator(group.items, {
                dataIndex: this.dataIndex,
                footers: this.outputFooters,
                level: this.level + 1,
                parentGroupIndex: this.currentGroupIndex
            });
        }
        return this._innerIterator;
    };
    GroupIterator.prototype.nextDataItem = function (group) {
        var iterator = this.innerIterator(group);
        var result = iterator.next();
        if (utils_2.isPresent(result.value) && !result.done && result.value.type === "data") {
            this.dataIndex = result.value.index + 1;
        }
        return !result.done ? result : undefined;
    };
    GroupIterator.prototype.next = function () {
        if (!utils_2.isPresent(this.current)) {
            return this.nextGroupItem();
        }
        var item = this.nextDataItem(this.current);
        return item ? item : (this.outputFooters ? this.footerItem() : this.nextGroupItem());
    };
    Object.defineProperty(GroupIterator.prototype, "index", {
        /**
         * The index of the last iterated data record.
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.dataIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    return GroupIterator;
}());
exports.GroupIterator = GroupIterator;
