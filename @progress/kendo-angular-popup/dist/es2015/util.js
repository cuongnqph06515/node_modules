/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { parents, siblingContainer } from '@progress/kendo-popup-common';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export const eitherRect = (rect, offset) => {
    if (!rect) {
        return { height: 0, left: offset.left, top: offset.top, width: 0 };
    }
    return rect;
};
/**
 * @hidden
 */
export const replaceOffset = (rect, offset) => {
    if (!offset) {
        return rect;
    }
    const result = {
        height: rect.height,
        left: offset.left,
        top: offset.top,
        width: rect.width
    };
    return result;
};
/**
 * @hidden
 */
export const removeStackingOffset = (rect, stackingOffset) => {
    if (!stackingOffset) {
        return rect;
    }
    const result = {
        height: rect.height,
        left: rect.left - stackingOffset.left,
        top: rect.top - stackingOffset.top,
        width: rect.width
    };
    return result;
};
/**
 * @hidden
 */
export const isDifferentOffset = (oldOffset, newOffset) => {
    const { left: oldLeft, top: oldTop } = oldOffset;
    const { left: newLeft, top: newTop } = newOffset;
    return Math.abs(oldLeft - newLeft) >= 1 || Math.abs(oldTop - newTop) >= 1;
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
export const hasBoundingRect = (elem) => !!elem.getBoundingClientRect;
/**
 * @hidden
 */
export const OVERFLOW_REGEXP = /auto|scroll/;
const overflowElementStyle = (element) => {
    return `${element.style.overflow}${element.style.overflowX}${element.style.overflowY}`;
};
const ɵ0 = overflowElementStyle;
const overflowComputedStyle = (element) => {
    const styles = window.getComputedStyle(element);
    return `${styles.overflow}${styles.overflowX}${styles.overflowY}`;
};
const ɵ1 = overflowComputedStyle;
const overflowStyle = (element) => {
    return overflowElementStyle(element) || overflowComputedStyle(element);
};
const ɵ2 = overflowStyle;
/**
 * @hidden
 */
export const scrollableParents = (element) => {
    const parentElements = [];
    if (!isDocumentAvailable() || !isWindowAvailable()) {
        return parentElements;
    }
    let parent = element.parentElement;
    while (parent) {
        if (OVERFLOW_REGEXP.test(overflowStyle(parent)) || parent.hasAttribute('data-scrollable')) {
            parentElements.push(parent);
        }
        parent = parent.parentElement;
    }
    parentElements.push(window);
    return parentElements;
};
/**
 * @hidden
 */
export const FRAME_DURATION = 1000 / 60; //1000ms divided by 60fps
function memoize(fun) {
    let result;
    let called = false;
    return (...args) => {
        if (called) {
            return result;
        }
        result = fun(...args);
        called = true;
        return result;
    };
}
/**
 * @hidden
 */
export const hasRelativeStackingContext = memoize(() => {
    if (!isDocumentAvailable() && document.body !== null) {
        return false;
    }
    const top = 10;
    const parent = document.createElement("div");
    parent.style.transform = "matrix(10, 0, 0, 10, 0, 0)";
    parent.innerHTML = `<div style="position: fixed; top: ${top}px;">child</div>`;
    document.body.appendChild(parent);
    const isDifferent = parent.children[0].getBoundingClientRect().top !== top;
    document.body.removeChild(parent);
    return isDifferent;
});
/**
 * @hidden
 */
export const zIndex = (anchor, container) => {
    if (!anchor || !isDocumentAvailable() || !isWindowAvailable()) {
        return null;
    }
    const sibling = siblingContainer(anchor, container);
    if (!sibling) {
        return null;
    }
    const result = [anchor].concat(parents(anchor, sibling)).reduce((index, p) => {
        const zIndexStyle = p.style.zIndex || window.getComputedStyle(p).zIndex;
        const current = parseInt(zIndexStyle, 10);
        return current > index ? current : index;
    }, 0);
    return result ? (result + 1) : null;
};
/**
 * @hidden
 */
export const scaleRect = (rect, scale) => {
    if (!rect || scale === 1) {
        return rect;
    }
    return {
        height: rect.height / scale,
        left: rect.left / scale,
        top: rect.top / scale,
        width: rect.width / scale
    };
};
export { ɵ0, ɵ1, ɵ2 };
