/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += (parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0);
    return width;
}
exports.outerWidth = outerWidth;
/**
 * @hidden
 */
function innerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width -= (parseFloat(style.paddingLeft) || 0 + parseFloat(style.borderLeftWidth) || 0);
    width -= (parseFloat(style.paddingRight) || 0 + parseFloat(style.borderRightWidth) || 0);
    return width;
}
exports.innerWidth = innerWidth;
/**
 * @hidden
 */
function outerHeight(element) {
    var width = element.offsetHeight;
    var style = getComputedStyle(element);
    width += (parseFloat(style.marginTop) || 0 + parseFloat(style.marginBottom) || 0);
    return width;
}
exports.outerHeight = outerHeight;
/**
 * @hidden
 */
exports.closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
exports.isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    var hasSize = rect.width > 0 && rect.height > 0;
    var hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they should still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
exports.findElement = function (node, predicate, matchSelf) {
    if (matchSelf === void 0) { matchSelf = true; }
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            var element = exports.findElement(node, predicate);
            if (element) {
                return element;
            }
        }
        node = node.nextSibling;
    }
};
/**
 * @hidden
 */
exports.isFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var focusable = tabIndex !== null;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        return focusable && (!checkVisibility || exports.isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
exports.findFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return exports.findElement(element, function (node) { return exports.isFocusable(node, checkVisibility); });
};
/**
 * @hidden
 */
exports.findFocusableChild = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return exports.findElement(element, function (node) { return exports.isFocusable(node, checkVisibility); }, false);
};
/**
 * @hidden
 */
exports.findFocusableSibling = function (element, checkVisibility, reverse) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    var node = reverse ? element.prevSibling : element.nextSibling;
    while (node) {
        if (node.nodeType === 1) {
            var result = exports.findElement(node, function (el) { return exports.isFocusable(el, checkVisibility); });
            if (result) {
                return result;
            }
        }
        node = reverse ? node.prevSibling : node.nextSibling;
    }
};
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.getValueForLocation = function (property, displayMode, overflows) {
    switch (displayMode) {
        case 'toolbar':
            return overflows ? undefined : property;
        case 'overflow':
            return overflows ? property : undefined;
        default:
            return property;
    }
};
