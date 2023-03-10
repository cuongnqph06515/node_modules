import { isDocumentAvailable } from '@progress/kendo-angular-common';
// TODO: Move to @progress/kendo-common
const toClassList = (classNames) => String(classNames).trim().split(' ');
const ɵ0 = toClassList;
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
export const matchesClasses = (classNames) => (element) => hasClasses(element, classNames);
/**
 * @hidden
 */
export const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
export const firstElementChild = (node) => {
    const children = node.children;
    const length = children.length;
    for (let idx = 0; idx < length; idx++) {
        if (children[idx].nodeType === 1) {
            return children[idx];
        }
    }
};
/**
 * @hidden
 */
export const closestInScope = (node, predicate, scope) => {
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
export const wheelDeltaY = (e) => {
    const deltaY = e.wheelDeltaY;
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
export const preventLockedScroll = el => event => {
    const delta = wheelDeltaY(event);
    const scrollTop = el.scrollTop;
    const allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
};
let cachedScrollbarWidth = 0;
/**
 * @hidden
 */
export function scrollbarWidth() {
    if (!cachedScrollbarWidth && isDocumentAvailable()) {
        const div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        cachedScrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return cachedScrollbarWidth;
}
/**
 * @hidden
 */
export function hasScrollbar(element, type) {
    const sizeField = type === 'vertical' ? 'Height' : 'Width';
    return element[`scroll${sizeField}`] > element[`client${sizeField}`];
}
/**
 * @hidden
 */
export function rtlScrollPosition(element, position) {
    const initial = element.scrollLeft;
    let result = position;
    element.scrollLeft = -1;
    if (element.scrollLeft < 0) {
        result = -position;
    }
    else if (initial > 0) {
        result = element.scrollWidth - element.offsetWidth - position;
    }
    return result;
}
/**
 * @hidden
 */
export const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;
    const hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they will still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
export { ɵ0 };
