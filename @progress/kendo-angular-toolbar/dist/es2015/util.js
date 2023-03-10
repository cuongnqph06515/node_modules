/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
const focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
export function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += (parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0);
    return width;
}
/**
 * @hidden
 */
export function innerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width -= (parseFloat(style.paddingLeft) || 0 + parseFloat(style.borderLeftWidth) || 0);
    width -= (parseFloat(style.paddingRight) || 0 + parseFloat(style.borderRightWidth) || 0);
    return width;
}
/**
 * @hidden
 */
export function outerHeight(element) {
    var width = element.offsetHeight;
    var style = getComputedStyle(element);
    width += (parseFloat(style.marginTop) || 0 + parseFloat(style.marginBottom) || 0);
    return width;
}
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
export const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;
    const hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they should still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
export const findElement = (node, predicate, matchSelf = true) => {
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            const element = findElement(node, predicate);
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
export const isFocusable = (element, checkVisibility = true) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        let focusable = tabIndex !== null;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
export const findFocusable = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusable(node, checkVisibility));
};
/**
 * @hidden
 */
export const findFocusableChild = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusable(node, checkVisibility), false);
};
/**
 * @hidden
 */
export const findFocusableSibling = (element, checkVisibility = true, reverse) => {
    let node = reverse ? element.prevSibling : element.nextSibling;
    while (node) {
        if (node.nodeType === 1) {
            const result = findElement(node, (el) => isFocusable(el, checkVisibility));
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
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
export const getValueForLocation = (property, displayMode, overflows) => {
    switch (displayMode) {
        case 'toolbar':
            return overflows ? undefined : property;
        case 'overflow':
            return overflows ? property : undefined;
        default:
            return property;
    }
};
