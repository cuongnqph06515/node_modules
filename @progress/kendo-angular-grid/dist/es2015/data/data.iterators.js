/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { iterator } from '../utils';
import { isPresent } from '../utils';
/* tslint:disable:use-life-cycle-interface */
const isGroupItem = (source) => {
    return source.items !== undefined &&
        source.field !== undefined;
};
const ɵ0 = isGroupItem;
const isVirtualGroupItem = (source) => {
    return source.offset !== undefined &&
        source.skipHeader !== undefined;
};
const ɵ1 = isVirtualGroupItem;
const flattenGroups = (groups) => (groups.reduce((acc, curr) => {
    if (isGroupItem(curr)) {
        return acc.concat(flattenGroups(curr.items));
    }
    return acc.concat([curr]);
}, []) // tslint:disable-line:align
);
const ɵ2 = flattenGroups;
/**
 * @hidden
 */
export const itemAt = (data, index) => {
    const first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        return flattenGroups(data)[index];
    }
    return data[index];
};
/**
 * @hidden
 */
export const getIterator = (data, { footers, level, dataIndex, parentGroupIndex, groupIndex }) => {
    const first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        if (isVirtualGroupItem(first)) {
            groupIndex = isPresent(first.offset) ? first.offset : groupIndex;
        }
        //tslint:disable-next-line:no-use-before-declare
        return new GroupIterator(data, footers, level, dataIndex, parentGroupIndex, groupIndex);
    }
    //tslint:disable-next-line:no-use-before-declare
    return new ItemIterator(data, dataIndex, parentGroupIndex);
};
class ArrayIterator {
    constructor(arr, idx = 0) {
        this.arr = arr;
        this.idx = idx;
        this.arr = arr || [];
    }
    [iterator]() {
        return this;
    }
    next() {
        return this.idx < this.arr.length ? {
            done: false,
            value: this.arr[this.idx++]
        } : { done: true, value: undefined };
    }
}
/**
 * @hidden
 */
export class Iterator {
    constructor(arr, dataIndex = 0, resultMap = (x) => x) {
        this.dataIndex = dataIndex;
        this.resultMap = resultMap;
        const iter = arr[iterator];
        this._innerIterator = iter ? arr[iterator]() : new ArrayIterator(arr);
    }
    [iterator]() {
        return this;
    }
    next() {
        return this.resultMap(this._innerIterator.next(), this.dataIndex++);
    }
}
/**
 * @hidden
 */
export class ItemIterator extends Iterator {
    constructor(arr, dataIndex, groupIndex) {
        super(arr, dataIndex, (x, idx) => ({
            done: x.done,
            value: {
                data: x.value,
                groupIndex: groupIndex,
                index: idx,
                type: 'data'
            }
        }));
    }
    /**
     * The index of the next record.
     * @readonly
     * @type {number}
     */
    get index() {
        return this.dataIndex;
    }
}
const prefix = (s, n) => {
    const p = s ? s + "_" : s;
    return `${p}${n}`;
};
const ɵ3 = prefix;
/**
 * @hidden
 */
export class GroupIterator {
    constructor(arr, outputFooters = false, level = 0, dataIndex = 0, parentIndex = "", groupIndex = 0) {
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
    [iterator]() {
        return this;
    }
    nextGroupItem() {
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
    }
    footerItem() {
        if (this.current) {
            const group = this.current;
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
    }
    innerIterator(group) {
        if (!this._innerIterator) {
            this._innerIterator = getIterator(group.items, {
                dataIndex: this.dataIndex,
                footers: this.outputFooters,
                level: this.level + 1,
                parentGroupIndex: this.currentGroupIndex
            });
        }
        return this._innerIterator;
    }
    nextDataItem(group) {
        const iterator = this.innerIterator(group);
        const result = iterator.next();
        if (isPresent(result.value) && !result.done && result.value.type === "data") {
            this.dataIndex = result.value.index + 1;
        }
        return !result.done ? result : undefined;
    }
    next() {
        if (!isPresent(this.current)) {
            return this.nextGroupItem();
        }
        const item = this.nextDataItem(this.current);
        return item ? item : (this.outputFooters ? this.footerItem() : this.nextGroupItem());
    }
    /**
     * The index of the last iterated data record.
     * @readonly
     * @type {number}
     */
    get index() {
        return this.dataIndex + 1;
    }
}
export { ɵ0, ɵ1, ɵ2, ɵ3 };
