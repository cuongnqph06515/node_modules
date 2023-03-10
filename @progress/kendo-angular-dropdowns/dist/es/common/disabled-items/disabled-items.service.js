/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { isPresent } from '../util';
import { DataService } from '../data.service';
/**
 * @hidden
 */
var DisabledItemsService = /** @class */ (function () {
    function DisabledItemsService(dataService) {
        this.dataService = dataService;
        this.itemDisabled = null;
    }
    DisabledItemsService.prototype.isIndexDisabled = function (index) {
        if (this.itemDisabled) {
            var item = this.dataService.itemAt(index);
            if (isPresent(item)) {
                return this.itemDisabled({ dataItem: item, index: index });
            }
            else if (isPresent(this.defaultItem)) {
                return this.itemDisabled({ dataItem: this.defaultItem, index: -1 });
            }
        }
    };
    DisabledItemsService.prototype.isItemDisabled = function (item) {
        if (this.itemDisabled) {
            var index = this.dataService.indexOf(item);
            if (index !== -1) {
                return this.itemDisabled({ dataItem: item, index: index });
            }
            else if (isPresent(this.defaultItem)) {
                return this.itemDisabled({ dataItem: this.defaultItem, index: -1 });
            }
        }
    };
    DisabledItemsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DisabledItemsService.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    return DisabledItemsService;
}());
export { DisabledItemsService };
