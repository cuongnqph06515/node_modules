/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var components = {};
/**
 * @hidden
 */
var DropZoneService = /** @class */ (function () {
    function DropZoneService() {
    }
    DropZoneService.prototype.addComponent = function (component, zoneId) {
        if (this.has(zoneId)) {
            components[zoneId].push(component);
        }
        else {
            components[zoneId] = [component];
        }
    };
    DropZoneService.prototype.getComponents = function (zoneId) {
        return components[zoneId];
    };
    DropZoneService.prototype.has = function (id) {
        return id in components;
    };
    DropZoneService.decorators = [
        { type: core_1.Injectable },
    ];
    return DropZoneService;
}());
exports.DropZoneService = DropZoneService;
