/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from './util';
/**
 * @hidden
 */
export class NavigationService {
    constructor() {
        this.keydown = new EventEmitter();
        this.isPopupFocused = false;
        this.tools = [];
        this.isFocusLocked = false;
        this.isOverflowButtonFocused = false;
    }
    register(t) {
        this.tools.push(t);
    }
    unregister(t) {
        this.tools.splice(this.tools.indexOf(t), 1);
    }
    moveFocusToToolBar() {
        this.isPopupFocused = false;
        this.focusOverflowButton();
    }
    moveFocusToPopup() {
        this.isPopupFocused = true;
    }
    focus(tool, focusLast) {
        this.focused = tool;
        this.tools.filter(t => t !== this.focused).forEach(t => t.navigationService.defocus());
        this.isOverflowButtonFocused = false;
        tool.navigationService.focus(focusLast);
    }
    focusOverflowButton() {
        this.isOverflowButtonFocused = true;
        this.overflowButton.nativeElement.focus();
    }
    focusFirst() {
        if (this.isFocusLocked) {
            return;
        }
        const tool = this.tools.find((t) => {
            if (t.navigationService.canFocus()) {
                return true;
            }
            else {
                return false;
            }
        });
        if (tool) {
            this.focus(tool);
        }
    }
    focusPrev(index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusPrevSibling();
        //     return;
        // }
        if (!isPresent(index)) {
            if (this.isOverflowButtonFocused) {
                index = this.tools.length - 1;
            }
            else {
                index = this.tools.indexOf(this.focused) - 1;
            }
        }
        if (this.isFocusLocked || !this.tools.length || index < 0) {
            return;
        }
        const tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool, true);
        }
        else {
            this.focusPrev(index - 1);
        }
    }
    focusNext(index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusNextSibling();
        //     return;
        // }
        const overflowButtonIsVisible = this.overflowButton && this.overflowButton.nativeElement.style.visibility === 'visible';
        if (!isPresent(index)) {
            index = this.tools.indexOf(this.focused) + 1;
        }
        if (index >= this.tools.length && overflowButtonIsVisible && !this.isOverflowButtonFocused) {
            this.focusOverflowButton();
        }
        if (this.isFocusLocked || !this.tools.length || index >= this.tools.length) {
            return;
        }
        const tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool);
        }
        else {
            this.focusNext(index + 1);
        }
    }
    lock() {
        this.isFocusLocked = true;
    }
    unlock() {
        this.isFocusLocked = false;
    }
    focusEnter() {
        //TODO
        // if (this.focused.hasFocusableChild()) {
        //     this.isFocusLocked = true;
        //     this.focused.focusInside();
        // }
    }
    focusLeave() {
        //TODO
        // if (this.isFocusLocked) {
        //     this.isFocusLocked = false;
        //     this.focus(this.focused);
        // }
    }
    defocus(t) {
        t.navigationService.defocus();
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
