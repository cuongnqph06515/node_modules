/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var RefreshService = /** @class */ (function () {
    function RefreshService() {
        this.onRefresh = new core_1.EventEmitter();
    }
    RefreshService.prototype.refresh = function (tool) {
        this.onRefresh.emit(tool);
    };
    RefreshService.decorators = [
        { type: core_1.Injectable },
    ];
    return RefreshService;
}());
exports.RefreshService = RefreshService;
