/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { closest, findFocusable, isVisible, matchesNodeName } from '../rendering/common/dom-queries';
const isButton = matchesNodeName('button');
const isInputTag = matchesNodeName('input');
const navigableRegex = /(button|checkbox|color|file|radio|reset|submit)/i;
const isNavigableInput = element => isInputTag(element) && navigableRegex.test(element.type);
const ɵ0 = isNavigableInput;
const isNavigable = element => !element.disabled && (isButton(element) || isNavigableInput(element));
const ɵ1 = isNavigable;
/**
 * @hidden
 */
export class DefaultFocusableElement {
    constructor(host, renderer) {
        this.renderer = renderer;
        this.element = host.nativeElement;
        this.focusable = findFocusable(this.element, false) || this.element;
    }
    get enabled() {
        return this.focusable && !this.focusable.disabled;
    }
    get visible() {
        return this.focusable && isVisible(this.focusable);
    }
    isNavigable() {
        return this.canFocus() && isNavigable(this.element);
    }
    toggle(active) {
        this.renderer.setAttribute(this.focusable, 'tabIndex', active ? '0' : '-1');
    }
    focus() {
        if (this.focusable) {
            this.focusable.focus();
        }
    }
    canFocus() {
        return this.visible && this.enabled;
    }
    hasFocus() {
        return document.activeElement !== this.element && closest(document.activeElement, e => e === this.element);
    }
}
export { ɵ0, ɵ1 };
