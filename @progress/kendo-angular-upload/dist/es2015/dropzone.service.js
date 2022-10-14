/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
let components = {};
/**
 * @hidden
 */
export class DropZoneService {
    addComponent(component, zoneId) {
        if (this.has(zoneId)) {
            components[zoneId].push(component);
        }
        else {
            components[zoneId] = [component];
        }
    }
    getComponents(zoneId) {
        return components[zoneId];
    }
    has(id) {
        return id in components;
    }
}
DropZoneService.decorators = [
    { type: Injectable },
];
