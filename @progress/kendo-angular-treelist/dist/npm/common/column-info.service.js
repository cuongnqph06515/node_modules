/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var columns_container_1 = require("../columns/columns-container");
var column_common_1 = require("../columns/column-common");
var kendo_data_query_1 = require("@progress/kendo-data-query");
/**
 * @hidden
 */
var ColumnInfoService = /** @class */ (function () {
    function ColumnInfoService() {
        this.visibilityChange = new core_1.EventEmitter();
        this.lockedChange = new core_1.EventEmitter();
        this.columnRangeChange = new core_1.EventEmitter();
        this.columnsContainer = new columns_container_1.ColumnsContainer(function () { return []; });
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
            var columns = column_common_1.expandColumns(this.list().filterSort(function (column) { return !column.isColumnGroup; }))
                .filter(function (column) { return column.matchesMedia && column.displayTitle; });
            return kendo_data_query_1.orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
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
        { type: core_1.Injectable },
    ];
    return ColumnInfoService;
}());
exports.ColumnInfoService = ColumnInfoService;
