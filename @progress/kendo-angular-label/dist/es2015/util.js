/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export const isUploadComponent = (component) => component.wrapper && component.wrapper.tagName === 'KENDO-UPLOAD';
/**
 * @hidden
 */
export const getNativeInputContent = (element) => element.querySelector('kendo-label > input, kendo-label > textarea, kendo-label > select');
/**
 * @hidden
 */
export const isActiveCheckboxOrRadio = (component) => component instanceof HTMLInputElement && /^(checkbox|radio)$/.test(component.type) && !component.hidden;
/**
 * @hidden
 */
export const isNestedOrAssociated = (component, label) => component.parentElement === label || label.hasAttribute('for');
/**
 * @hidden
 */
export const shouldClickComponent = (component, label) => isActiveCheckboxOrRadio(component) && !isNestedOrAssociated(component, label);
/**
 * @hidden
 */
export const getRootElement = (element) => {
    if (!element) {
        return null;
    }
    let rootElement = element;
    while (rootElement.parentElement) {
        rootElement = rootElement.parentElement;
    }
    return rootElement;
};
