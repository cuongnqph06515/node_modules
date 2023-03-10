/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { closest, findFocusable, isVisible, matchesNodeName } from '../rendering/common/dom-queries';
var isButton = matchesNodeName('button');
var isInputTag = matchesNodeName('input');
var navigableRegex = /(button|checkbox|color|file|radio|reset|submit)/i;
var isNavigableInput = function (element) { return isInputTag(element) && navigableRegex.test(element.type); };
var ɵ0 = isNavigableInput;
var isNavigable = function (element) { return !element.disabled && (isButton(element) || isNavigableInput(element)); };
var ɵ1 = isNavigable;
/**
 * @hidden
 */
var DefaultFocusableElement = /** @class */ (function () {
    function DefaultFocusableElement(host, renderer) {
        this.renderer = renderer;
        this.element = host.nativeElement;
        this.focusable = findFocusable(this.element, false) || this.element;
    }
    Object.defineProperty(DefaultFocusableElement.prototype, "enabled", {
        get: function () {
            return this.focusable && !this.focusable.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultFocusableElement.prototype, "visible", {
        get: function () {
            return this.focusable && isVisible(this.focusable);
        },
        enumerable: true,
        configurable: true
    });
    DefaultFocusableElement.prototype.isNavigable = function () {
        return this.canFocus() && isNavigable(this.element);
    };
    DefaultFocusableElement.prototype.toggle = function (active) {
        this.renderer.setAttribute(this.focusable, 'tabIndex', active ? '0' : '-1');
    };
    DefaultFocusableElement.prototype.focus = function () {
        if (this.focusable) {
            this.focusable.focus();
        }
    };
    DefaultFocusableElement.prototype.canFocus = function () {
        return this.visible && this.enabled;
    };
    DefaultFocusableElement.prototype.hasFocus = function () {
        var _this = this;
        return document.activeElement !== this.element && closest(document.activeElement, function (e) { return e === _this.element; });
    };
    return DefaultFocusableElement;
}());
export { DefaultFocusableElement };
export { ɵ0, ɵ1 };
