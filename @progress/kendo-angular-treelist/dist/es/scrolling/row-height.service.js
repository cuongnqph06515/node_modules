/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var RowHeightService = /** @class */ (function () {
    function RowHeightService(total, rowHeight) {
        if (total === void 0) { total = 0; }
        this.total = total;
        this.rowHeight = rowHeight;
        this.offsets = [];
        this.heights = [];
        var agg = 0;
        for (var idx = 0; idx < total; idx++) {
            this.offsets.push(agg);
            agg += rowHeight;
            this.heights.push(rowHeight);
        }
    }
    RowHeightService.prototype.height = function (rowIndex) {
        return this.heights[rowIndex];
    };
    RowHeightService.prototype.isExpanded = function (rowIndex) {
        return this.height(rowIndex) > this.rowHeight;
    };
    RowHeightService.prototype.index = function (position) {
        if (position < 0) {
            return undefined;
        }
        var result = this.offsets.reduce(function (prev, current, idx) {
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
    };
    RowHeightService.prototype.offset = function (rowIndex) {
        return this.offsets[rowIndex];
    };
    RowHeightService.prototype.totalHeight = function () {
        return this.heights.reduce(function (prev, curr) { return prev + curr; }, 0);
    };
    return RowHeightService;
}());
export { RowHeightService };
