"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
// TODO: Move to @progress/kendo-common
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
exports.closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
exports.firstElementChild = function (node) {
    var children = node.children;
    var length = children.length;
    for (var idx = 0; idx < length; idx++) {
        if (children[idx].nodeType === 1) {
            return children[idx];
        }
    }
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
exports.wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
/**
 * @hidden
 */
exports.preventLockedScroll = function (el) { return function (event) {
    var delta = exports.wheelDeltaY(event);
    var scrollTop = el.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
}; };
var cachedScrollbarWidth = 0;
/**
 * @hidden
 */
function scrollbarWidth() {
    if (!cachedScrollbarWidth && kendo_angular_common_1.isDocumentAvailable()) {
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        cachedScrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return cachedScrollbarWidth;
}
exports.scrollbarWidth = scrollbarWidth;
/**
 * @hidden
 */
function hasScrollbar(element, type) {
    var sizeField = type === 'vertical' ? 'Height' : 'Width';
    return element["scroll" + sizeField] > element["client" + sizeField];
}
exports.hasScrollbar = hasScrollbar;
/**
 * @hidden
 */
function rtlScrollPosition(element, position) {
    var initial = element.scrollLeft;
    var result = position;
    element.scrollLeft = -1;
    if (element.scrollLeft < 0) {
        result = -position;
    }
    else if (initial > 0) {
        result = element.scrollWidth - element.offsetWidth - position;
    }
    return result;
}
exports.rtlScrollPosition = rtlScrollPosition;
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
