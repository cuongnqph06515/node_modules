/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { findFocusable, findFocusableChild, findFocusableSibling } from './util';
/**
 * @hidden
 */
export class RendererService {
    getElement() {
        return this.element.nativeElement;
    }
    querySelector(selector) {
        return this.element.nativeElement.querySelector(selector);
    }
    querySelectorAll(selector) {
        return this.element.nativeElement.querySelectorAll(selector);
    }
    findFocusable() {
        return findFocusable(this.element.nativeElement, false);
    }
    findFocusableChild(element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableChild(element, false);
    }
    findNextFocusableSibling(element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableSibling(element, false);
    }
    findPrevFocusableSibling(element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableSibling(element, false, true);
    }
    setAttribute(element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    }
}
RendererService.decorators = [
    { type: Injectable },
];
