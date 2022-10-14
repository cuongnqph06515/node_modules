/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var isUploadComponent = function (component) { return component.wrapper && component.wrapper.tagName === 'KENDO-UPLOAD'; };
/**
 * @hidden
 */
export var getNativeInputContent = function (element) { return element.querySelector('kendo-label > input, kendo-label > textarea, kendo-label > select'); };
/**
 * @hidden
 */
export var isActiveCheckboxOrRadio = function (component) { return component instanceof HTMLInputElement && /^(checkbox|radio)$/.test(component.type) && !component.hidden; };
/**
 * @hidden
 */
export var isNestedOrAssociated = function (component, label) { return component.parentElement === label || label.hasAttribute('for'); };
/**
 * @hidden
 */
export var shouldClickComponent = function (component, label) { return isActiveCheckboxOrRadio(component) && !isNestedOrAssociated(component, label); };
/**
 * @hidden
 */
export var getRootElement = function (element) {
    if (!element) {
        return null;
    }
    var rootElement = element;
    while (rootElement.parentElement) {
        rootElement = rootElement.parentElement;
    }
    return rootElement;
};
