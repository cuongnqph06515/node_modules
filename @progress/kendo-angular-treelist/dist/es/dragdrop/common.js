/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable: no-bitwise */
/**
 * @hidden
 */
export var append = function (element) {
    var appended = false;
    return function () {
        if (!appended) {
            document.body.appendChild(element);
            appended = true;
        }
        return element;
    };
};
/**
 * @hidden
 */
var getDocument = function (element) { return element.ownerDocument.documentElement; };
var ɵ0 = getDocument;
/**
 * @hidden
 */
var getWindow = function (element) { return element.ownerDocument.defaultView; };
var ɵ1 = getWindow;
/**
 * @hidden
 */
export var offset = function (element) {
    var _a = getDocument(element), clientTop = _a.clientTop, clientLeft = _a.clientLeft;
    var _b = getWindow(element), pageYOffset = _b.pageYOffset, pageXOffset = _b.pageXOffset;
    var _c = element.getBoundingClientRect(), top = _c.top, left = _c.left;
    return {
        top: top + pageYOffset - clientTop,
        left: left + pageXOffset - clientLeft
    };
};
/**
 * @hidden
 * If the target is before the draggable element, returns `true`.
 *
 * DOCUMENT_POSITION_FOLLOWING = 4
 */
export var isTargetBefore = function (draggable, target) {
    return (target.compareDocumentPosition(draggable) & 4) !== 0;
};
/**
 * @hidden
 * If the container and the element are the same
 * or if the container holds (contains) the element, returns `true`.
 *
 * DOCUMENT_POSITION_CONTAINED_BY = 16
 */
export var contains = function (element, container) {
    return element === container ||
        (container.compareDocumentPosition(element) & 16) !== 0;
};
/**
 * @hidden
 */
export var position = function (target, before) {
    var targetRect = offset(target);
    var offsetWidth = target.offsetWidth, offsetHeight = target.offsetHeight;
    var left = targetRect.left + (before ? 0 : offsetWidth);
    var top = targetRect.top;
    var height = offsetHeight;
    return { left: left, top: top, height: height };
};
export { ɵ0, ɵ1 };
