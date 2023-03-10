/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
const update = (arr, idx, value) => ([
    ...arr.slice(0, idx + 1),
    ...(arr.slice(idx + 1).map(x => x + value))
]);
const ɵ0 = update;
/**
 * @hidden
 */
export class RowHeightService {
    constructor(total = 0, rowHeight, detailRowHeight) {
        this.total = total;
        this.rowHeight = rowHeight;
        this.detailRowHeight = detailRowHeight;
        this.offsets = [];
        this.heights = [];
        let agg = 0;
        for (let idx = 0; idx < total; idx++) {
            this.offsets.push(agg);
            agg += rowHeight;
            this.heights.push(rowHeight);
        }
    }
    height(rowIndex) {
        return this.heights[rowIndex];
    }
    expandDetail(rowIndex) {
        if (this.height(rowIndex) === this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight);
        }
    }
    collapseDetail(rowIndex) {
        if (this.height(rowIndex) > this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight * -1);
        }
    }
    isExpanded(rowIndex) {
        return this.height(rowIndex) > this.rowHeight;
    }
    index(position) {
        if (position < 0) {
            return undefined;
        }
        const result = this.offsets.reduce((prev, current, idx) => {
            if (prev !== undefined) {
                return prev;
            }
            else if (current === position) {
                return idx;
            }
            else if (current > position) {
                return idx - 1;
            }
            return undefined;
        }, undefined); // tslint:disable-line:align
        return result === undefined ? this.total - 1 : result;
    }
    offset(rowIndex) {
        return this.offsets[rowIndex];
    }
    totalHeight() {
        return this.heights.reduce((prev, curr) => prev + curr, 0);
    }
    updateRowHeight(rowIndex, value) {
        if (this.total > 0) {
            this.heights[rowIndex] += value;
            this.offsets = update(this.offsets, rowIndex, value);
        }
    }
}
export { ɵ0 };
