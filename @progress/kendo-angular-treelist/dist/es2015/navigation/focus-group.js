/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { FocusRoot } from './focus-root';
/**
 * @hidden
 */
export class FocusGroup {
    constructor(root) {
        this.root = root;
        this.active = true;
        this.children = [];
        this.root.registerGroup(this);
    }
    get focusableChildren() {
        return this.children.filter(el => el.canFocus());
    }
    get isActive() {
        return this.active;
    }
    ngOnDestroy() {
        this.root.unregisterGroup(this);
    }
    registerElement(element) {
        this.unregisterElement(element);
        this.children.push(element);
    }
    unregisterElement(element) {
        this.children = this.children.filter(f => f !== element);
    }
    /**
     * Returns a Boolean value which indicates if the group will receive focus when the cell is focused.
     * Requires a single "simple" focusable element such as a button or a checkbox.
     */
    isNavigable() {
        const focusable = this.focusableChildren;
        return focusable.length === 1 && focusable[0].isNavigable();
    }
    canFocus() {
        return this.focusableChildren.length > 0;
    }
    focus() {
        if (this.canFocus() && !this.hasFocus()) {
            this.focusableChildren[0].focus();
        }
    }
    activate() {
        this.toggleState(true);
    }
    deactivate() {
        this.toggleState(false);
    }
    hasFocus() {
        return this.children.reduce((focused, element) => focused || element.hasFocus(), false);
    }
    toggleState(active) {
        if (this.active !== active) {
            this.active = active;
            this.children.forEach(f => f.toggle(active));
        }
    }
}
FocusGroup.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FocusGroup.ctorParameters = () => [
    { type: FocusRoot }
];
