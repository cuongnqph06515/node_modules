/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from "@angular/core";
import { ColumnsContainer } from "../columns/columns-container";
import { expandColumns } from "../columns/column-common";
import { orderBy } from '@progress/kendo-data-query';
/**
 * @hidden
 */
var ColumnInfoService = /** @class */ (function () {
    function ColumnInfoService() {
        this.visibilityChange = new EventEmitter();
        this.lockedChange = new EventEmitter();
        this.columnRangeChange = new EventEmitter();
        this.columnsContainer = new ColumnsContainer(function () { return []; });
    }
    Object.defineProperty(ColumnInfoService.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "totalLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "leafNamedColumns", {
        get: function () {
            var columns = expandColumns(this.list().filterSort(function (column) { return !column.isColumnGroup; }))
                .filter(function (column) { return column.matchesMedia && column.displayTitle; });
            return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "unlockedRootCount", {
        get: function () {
            return this.list().rootColumns().filter(function (column) { return !column.locked && column.isVisible; }).length;
        },
        enumerable: true,
        configurable: true
    });
    ColumnInfoService.prototype.init = function (columns, list) {
        this.columnsContainer = columns;
        this.list = list;
    };
    ColumnInfoService.prototype.changeVisibility = function (columns) {
        this.visibilityChange.emit(columns);
    };
    ColumnInfoService.prototype.changeLocked = function (columns) {
        this.lockedChange.emit(columns);
    };
    ColumnInfoService.decorators = [
        { type: Injectable },
    ];
    return ColumnInfoService;
}());
export { ColumnInfoService };
