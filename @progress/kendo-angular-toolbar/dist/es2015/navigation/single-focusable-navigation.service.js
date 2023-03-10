/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { closest } from '../util';
/**
 * @hidden
 */
export class SingleFocusableNavigationService {
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        const element = this.findFocusable();
        return element && element.offsetParent && !this.hasFocus(element) && !element.disabled;
    }
    focus() {
        if (this.canFocus()) {
            const element = this.findFocusable();
            this.setAttribute(element, 'tabindex', '0');
            element.focus();
        }
    }
    defocus() {
        const element = this.findFocusable();
        if (element) {
            this.setAttribute(element, 'tabindex', '-1');
            if (this.hasFocus(element)) {
                element.blur();
            }
        }
    }
    hasFocus(element) {
        return document.activeElement !== element && closest(document.activeElement, e => e === element);
    }
    findFocusable() {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer.findFocusable() : this.toolbarRenderer.findFocusable();
    }
    setAttribute(element, attr, value) {
        if (this.toolbarNavigation.isPopupFocused) {
            this.overflowRenderer.setAttribute(element, attr, value);
        }
        else {
            this.toolbarRenderer.setAttribute(element, attr, value);
        }
    }
}
SingleFocusableNavigationService.decorators = [
    { type: Injectable },
];
