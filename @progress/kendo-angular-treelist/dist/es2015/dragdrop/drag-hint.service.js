/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, Sanitizer, SecurityContext } from '@angular/core';
import { append, offset } from './common';
const updateClass = (element, valid) => {
    const icon = element.querySelector('.k-icon');
    icon.className = icon.className
        .replace(/(plus|cancel)/, valid ? 'plus' : 'cancel');
};
const ɵ0 = updateClass;
const updateLock = (element, locked = null) => {
    const icon = element.querySelectorAll('.k-icon')[1];
    const value = locked == null ? '' : (locked ? 'k-i-lock' : 'k-i-unlock');
    icon.className = icon.className
        .replace(/(k-i-unlock|k-i-lock)/, '') + ` ${value}`;
};
const ɵ1 = updateLock;
const decorate = (element, target) => {
    const targetStyles = getComputedStyle(target);
    element.className = 'k-header k-drag-clue';
    element.style.position = 'absolute';
    element.style.zIndex = '20000';
    element.style.paddingLeft = targetStyles.paddingLeft;
    element.style.paddingTop = targetStyles.paddingTop;
    element.style.paddingBottom = targetStyles.paddingBottom;
    element.style.paddingRight = targetStyles.paddingRight;
    element.style.width = targetStyles.width;
    element.style.height = targetStyles.height;
};
const ɵ2 = decorate;
/**
 * @hidden
 */
export class DragHintService {
    constructor(santizer) {
        this.santizer = santizer;
    }
    create(down, target, title) {
        this.initCoords(down);
        this.dom = document.createElement("div");
        decorate(this.dom, target);
        const safeTitle = this.santizer.sanitize(SecurityContext.HTML, title);
        this.dom.innerHTML = `
            <span class="k-icon k-drag-status k-i-cancel k-icon-with-modifier">
                <span class="k-icon k-icon-modifier"></span>
            </span>
            ${safeTitle}
        `;
    }
    attach() {
        return append(this.dom);
    }
    remove() {
        if (this.dom && this.dom.parentNode) {
            (function (el) {
                setTimeout(() => document.body.removeChild(el));
            })(this.dom); // hack for IE + pointer events!
            this.dom = null;
        }
    }
    show() {
        this.dom.style.display = "";
    }
    hide() {
        this.dom.style.display = "none";
    }
    enable() {
        updateClass(this.dom, true);
    }
    disable() {
        updateClass(this.dom, false);
    }
    removeLock() {
        updateLock(this.dom);
    }
    toggleLock(locked) {
        updateLock(this.dom, locked);
    }
    move(move) {
        this.dom.style.top = this.initialTop + move.pageY + 'px';
        this.dom.style.left = this.initialLeft + move.pageX + 'px';
    }
    initCoords(down) {
        const { top, left } = offset(down.originalEvent.target);
        this.initialTop = top - down.pageY;
        this.initialLeft = left - down.pageX;
    }
}
DragHintService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DragHintService.ctorParameters = () => [
    { type: Sanitizer }
];
export { ɵ0, ɵ1, ɵ2 };
