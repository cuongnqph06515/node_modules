/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.isTruthy = function (value) { return !!value; };
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var ɵ0 = toClassList;
exports.ɵ0 = ɵ0;
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
var Keys;
(function (Keys) {
    Keys[Keys["esc"] = 27] = "esc";
    Keys[Keys["tab"] = 9] = "tab";
    Keys[Keys["enter"] = 13] = "enter";
    Keys[Keys["space"] = 32] = "space";
    Keys[Keys["ctrl"] = 17] = "ctrl";
    Keys[Keys["shift"] = 16] = "shift";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["right"] = 39] = "right";
    Keys[Keys["down"] = 40] = "down";
})(Keys = exports.Keys || (exports.Keys = {}));
/**
 * @hidden
 */
exports.DIALOG_ELEMENTS_HANDLING_ESC_KEY = 'k-dialog-wrapper k-dialog-buttongroup k-dialog-action';
/**
 * @hidden
 */
exports.DIALOG_ELEMENTS_HANDLING_ARROWS = 'k-dialog-buttongroup';
/**
 * @hidden
 */
exports.WINDOW_CLASSES = 'k-window';
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
exports.isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
exports.isFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var validTabIndex = tabIndex !== null && !isNaN(tabIndex) && tabIndex > -1;
        var focusable = false;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        else {
            focusable = validTabIndex;
        }
        return focusable && (!checkVisibility || exports.isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
exports.focusableSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]'
].join(',');
/**
 * @hidden
 */
exports.preventDefault = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
exports.isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
exports.preventOnDblClick = function (release) { return function (mouseDown) {
    return rxjs_1.of(mouseDown).pipe(operators_1.delay(150), operators_1.takeUntil(release));
}; };
/**
 * @hidden
 */
exports.RESIZE_DIRECTIONS = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw'];
/**
 * @hidden
 */
exports.OFFSET_STYLES = ['top', 'left', 'width', 'height'];
/**
 * @hidden
 */
exports.isString = function (value) { return value instanceof String || typeof value === 'string'; };
/**
 * @hidden
 */
exports.isNumber = function (value) { return typeof value === 'number' && isFinite(value); };
/**
 * @hidden
 */
exports.createValueWithUnit = function (value) { return value + (exports.isNumber(value) ? 'px' : ''); };
