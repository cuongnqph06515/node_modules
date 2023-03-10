/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var DomEventsService = /** @class */ (function () {
    function DomEventsService() {
        this.cellClick = new EventEmitter();
        this.cellMousedown = new EventEmitter();
        this.click = new EventEmitter();
        this.keydown = new EventEmitter();
        this.focus = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.focusOut = new EventEmitter();
        this.windowBlur = new EventEmitter();
    }
    DomEventsService.decorators = [
        { type: Injectable },
    ];
    return DomEventsService;
}());
export { DomEventsService };
