/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export class RowHeightService {
    constructor(total = 0, rowHeight) {
        this.total = total;
        this.rowHeight = rowHeight;
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
}
