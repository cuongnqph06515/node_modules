/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class FocusService {
    constructor() {
        this.onFocus = new EventEmitter();
    }
    isFocused(index) {
        return index === this.focused;
    }
    focus(index) {
        if (this.isFocused(index)) {
            return;
        }
        this.focused = index;
        this.onFocus.emit(index);
    }
    resetFocus() {
        this.focused = -1;
    }
    get focused() {
        return this.focusedIndex;
    }
    set focused(index) {
        this.focusedIndex = index;
        this.onFocus.emit(index);
    }
}
FocusService.decorators = [
    { type: Injectable },
];
