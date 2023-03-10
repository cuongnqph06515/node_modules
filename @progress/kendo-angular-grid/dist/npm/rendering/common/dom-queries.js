/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var NODE_NAME_PREDICATES = {};
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var ɵ0 = toClassList;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */
exports.matchesClasses = function (classNames) {
    return function (element) { return exports.hasClasses(element, classNames); };
};
/**
 * @hidden
 */
exports.matchesNodeName = function (nodeName) {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = function (element) {
            return String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
        };
    }
    return NODE_NAME_PREDICATES[nodeName];
};
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
exports.closestInScope = function (node, predicate, scope) {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
exports.contains = function (parent, node, matchSelf) {
    if (matchSelf === void 0) { matchSelf = false; }
    var outside = !exports.closest(node, function (child) { return child === parent; });
    if (outside) {
        return false;
    }
    var el = exports.closest(node, function (child) { return child === node; });
    return el && (matchSelf || el !== parent);
};
/**
 * @hidden
 */
exports.isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    var hasSize = rect.width > 0 && rect.height > 0;
    var hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they will still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
exports.isFocusable = function (element) {
    if (!element.tagName) {
        return false;
    }
    var tagName = element.tagName.toLowerCase();
    var hasTabIndex = Boolean(element.getAttribute('tabIndex'));
    var focusable = !element.disabled && focusableRegex.test(tagName);
    return focusable || hasTabIndex;
};
/**
 * @hidden
 */
exports.isFocusableWithTabKey = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (!exports.isFocusable(element)) {
        return false;
    }
    var tabIndex = element.getAttribute('tabIndex');
    var visible = !checkVisibility || exports.isVisible(element);
    return visible && tabIndex !== '-1';
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
exports.findFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return exports.findElement(element, function (node) { return exports.isFocusableWithTabKey(node, checkVisibility); });
};
/**
 * @hidden
 */
exports.findFocusableChild = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return exports.findElement(element, function (node) { return exports.isFocusableWithTabKey(node, checkVisibility); }, false);
};
/**
 * @hidden
 */
function rtlScrollPosition(position, element, initial) {
    var result = position;
    if (initial < 0) {
        result = -position;
    }
    else if (initial > 0) {
        result = element.scrollWidth - element.offsetWidth - position;
    }
    return result;
}
exports.rtlScrollPosition = rtlScrollPosition;
