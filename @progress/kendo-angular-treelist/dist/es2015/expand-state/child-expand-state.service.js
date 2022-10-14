/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { ExpandStateService } from '../common/expand-state.service';
import { ExpandEvent } from './expand-event';
/**
 * @hidden
 */
export class ChildExpandStateService extends ExpandStateService {
    constructor() {
        super(true);
    }
    emitEvent(args) {
        const expandArgs = new ExpandEvent(args);
        this.changes.next(expandArgs);
        return expandArgs.isDefaultPrevented();
    }
}
ChildExpandStateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ChildExpandStateService.ctorParameters = () => [];
