/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
/**
 * @hidden
 */
export var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
export var isTruthy = function (value) { return !!value; };
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var ɵ0 = toClassList;
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
export var Keys;
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
})(Keys || (Keys = {}));
/**
 * @hidden
 */
export var DIALOG_ELEMENTS_HANDLING_ESC_KEY = 'k-dialog-wrapper k-dialog-buttongroup k-dialog-action';
/**
 * @hidden
 */
export var DIALOG_ELEMENTS_HANDLING_ARROWS = 'k-dialog-buttongroup';
/**
 * @hidden
 */
export var WINDOW_CLASSES = 'k-window';
/**
 * @hidden
 */
export var hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */
export var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
export var isFocusable = function (element, checkVisibility) {
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
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
export var focusableSelector = [
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
export var preventDefault = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
export var isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
export var preventOnDblClick = function (release) { return function (mouseDown) {
    return of(mouseDown).pipe(delay(150), takeUntil(release));
}; };
/**
 * @hidden
 */
export var RESIZE_DIRECTIONS = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw'];
/**
 * @hidden
 */
export var OFFSET_STYLES = ['top', 'left', 'width', 'height'];
/**
 * @hidden
 */
export var isString = function (value) { return value instanceof String || typeof value === 'string'; };
/**
 * @hidden
 */
export var isNumber = function (value) { return typeof value === 'number' && isFinite(value); };
/**
 * @hidden
 */
export var createValueWithUnit = function (value) { return value + (isNumber(value) ? 'px' : ''); };
export { ɵ0 };
