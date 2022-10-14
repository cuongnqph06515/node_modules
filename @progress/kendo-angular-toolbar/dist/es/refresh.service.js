/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var RefreshService = /** @class */ (function () {
    function RefreshService() {
        this.onRefresh = new EventEmitter();
    }
    RefreshService.prototype.refresh = function (tool) {
        this.onRefresh.emit(tool);
    };
    RefreshService.decorators = [
        { type: Injectable },
    ];
    return RefreshService;
}());
export { RefreshService };
