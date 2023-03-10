/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_queries_1 = require("../rendering/common/dom-queries");
var isButton = dom_queries_1.matchesNodeName('button');
var isInputTag = dom_queries_1.matchesNodeName('input');
var navigableRegex = /(button|checkbox|color|file|radio|reset|submit)/i;
var isNavigableInput = function (element) { return isInputTag(element) && navigableRegex.test(element.type); };
var ɵ0 = isNavigableInput;
exports.ɵ0 = ɵ0;
var isNavigable = function (element) { return !element.disabled && (isButton(element) || isNavigableInput(element)); };
var ɵ1 = isNavigable;
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
var DefaultFocusableElement = /** @class */ (function () {
    function DefaultFocusableElement(host, renderer) {
        this.renderer = renderer;
        this.element = host.nativeElement;
        this.focusable = dom_queries_1.findFocusable(this.element, false) || this.element;
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
            return this.focusable && dom_queries_1.isVisible(this.focusable);
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
        return document.activeElement !== this.element && dom_queries_1.closest(document.activeElement, function (e) { return e === _this.element; });
    };
    return DefaultFocusableElement;
}());
exports.DefaultFocusableElement = DefaultFocusableElement;
