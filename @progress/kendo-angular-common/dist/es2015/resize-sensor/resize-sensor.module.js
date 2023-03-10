/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { ResizeSensorComponent } from './resize-sensor.component';
import { ResizeBatchService } from './resize-batch.service';
const COMPONENT_DIRECTIVES = [ResizeSensorComponent];
/**
 * Resize Sensor module
 */
export class ResizeSensorModule {
}
ResizeSensorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES],
                providers: [ResizeBatchService]
            },] },
];
