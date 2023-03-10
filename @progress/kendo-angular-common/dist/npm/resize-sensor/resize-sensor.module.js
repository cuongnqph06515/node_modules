/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var resize_sensor_component_1 = require("./resize-sensor.component");
var resize_batch_service_1 = require("./resize-batch.service");
var COMPONENT_DIRECTIVES = [resize_sensor_component_1.ResizeSensorComponent];
/**
 * Resize Sensor module
 */
var ResizeSensorModule = /** @class */ (function () {
    function ResizeSensorModule() {
    }
    ResizeSensorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    providers: [resize_batch_service_1.ResizeBatchService]
                },] },
    ];
    return ResizeSensorModule;
}());
exports.ResizeSensorModule = ResizeSensorModule;
