/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDevMode } from '@angular/core';
/**
 * @hidden
 */
var LocalEditService = /** @class */ (function () {
    function LocalEditService(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    LocalEditService.prototype.create = function (item) {
        if (this.hasLocalData && this.grid.skip) {
            this.localDataChangesService.data.splice(this.grid.skip, 0, item);
        }
        else {
            this.data.unshift(item);
        }
        this.dataChanged();
    };
    LocalEditService.prototype.update = function (_item) { }; // tslint:disable-line:no-empty
    LocalEditService.prototype.remove = function (item) {
        var data = this.data;
        for (var idx = 0; idx < data.length; idx++) {
            if (item === data[idx]) {
                data.splice(idx, 1);
                this.dataChanged({ action: 'remove', item: item });
                break;
            }
        }
    };
    LocalEditService.prototype.assignValues = function (target, source) {
        Object.assign(target, source);
    };
    LocalEditService.prototype.dataChanged = function (args) {
        if (args === void 0) { args = {}; }
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit(args);
        }
    };
    Object.defineProperty(LocalEditService.prototype, "hasLocalData", {
        get: function () {
            return Array.isArray(this.localDataChangesService.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalEditService.prototype, "data", {
        get: function () {
            if (this.hasLocalData) {
                return this.localDataChangesService.data;
            }
            var data = this.grid.data;
            if (Array.isArray(data)) {
                return data;
            }
            if (isDevMode()) {
                throw new Error('The default edit service of the editing directives works only when binding to plain array.' +
                    'Please provide an editService.');
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    return LocalEditService;
}());
export { LocalEditService };
