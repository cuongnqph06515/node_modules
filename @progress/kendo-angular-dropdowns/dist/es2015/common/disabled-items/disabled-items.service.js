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
export class DisabledItemsService {
    constructor(dataService) {
        this.dataService = dataService;
        this.itemDisabled = null;
    }
    isIndexDisabled(index) {
        if (this.itemDisabled) {
            const item = this.dataService.itemAt(index);
            if (isPresent(item)) {
                return this.itemDisabled({ dataItem: item, index });
            }
            else if (isPresent(this.defaultItem)) {
                return this.itemDisabled({ dataItem: this.defaultItem, index: -1 });
            }
        }
    }
    isItemDisabled(item) {
        if (this.itemDisabled) {
            const index = this.dataService.indexOf(item);
            if (index !== -1) {
                return this.itemDisabled({ dataItem: item, index });
            }
            else if (isPresent(this.defaultItem)) {
                return this.itemDisabled({ dataItem: this.defaultItem, index: -1 });
            }
        }
    }
}
DisabledItemsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DisabledItemsService.ctorParameters = () => [
    { type: DataService }
];
