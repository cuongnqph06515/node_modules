/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class RefreshService {
    constructor() {
        this.onRefresh = new EventEmitter();
    }
    refresh(tool) {
        this.onRefresh.emit(tool);
    }
}
RefreshService.decorators = [
    { type: Injectable },
];
