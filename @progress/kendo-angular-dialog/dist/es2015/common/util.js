/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
/**
 * @hidden
 */
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
export const isTruthy = (value) => !!value;
const toClassList = (classNames) => String(classNames).trim().split(' ');
const ɵ0 = toClassList;
const focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
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
export const DIALOG_ELEMENTS_HANDLING_ESC_KEY = 'k-dialog-wrapper k-dialog-buttongroup k-dialog-action';
/**
 * @hidden
 */
export const DIALOG_ELEMENTS_HANDLING_ARROWS = 'k-dialog-buttongroup';
/**
 * @hidden
 */
export const WINDOW_CLASSES = 'k-window';
/**
 * @hidden
 */
export const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
/**
 * @hidden
 */
export const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
export const isFocusable = (element, checkVisibility = true) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const validTabIndex = tabIndex !== null && !isNaN(tabIndex) && tabIndex > -1;
        let focusable = false;
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
export const focusableSelector = [
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
export const preventDefault = ({ originalEvent: event }) => {
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
export const isWindowAvailable = () => {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
export const preventOnDblClick = release => (mouseDown) => of(mouseDown).pipe(delay(150), takeUntil(release));
/**
 * @hidden
 */
export const RESIZE_DIRECTIONS = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw'];
/**
 * @hidden
 */
export const OFFSET_STYLES = ['top', 'left', 'width', 'height'];
/**
 * @hidden
 */
export const isString = (value) => value instanceof String || typeof value === 'string';
/**
 * @hidden
 */
export const isNumber = (value) => typeof value === 'number' && isFinite(value);
/**
 * @hidden
 */
export const createValueWithUnit = (value) => value + (isNumber(value) ? 'px' : '');
export { ɵ0 };
