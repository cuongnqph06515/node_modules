/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.isUploadComponent = function (component) { return component.wrapper && component.wrapper.tagName === 'KENDO-UPLOAD'; };
/**
 * @hidden
 */
exports.getNativeInputContent = function (element) { return element.querySelector('kendo-label > input, kendo-label > textarea, kendo-label > select'); };
/**
 * @hidden
 */
exports.isActiveCheckboxOrRadio = function (component) { return component instanceof HTMLInputElement && /^(checkbox|radio)$/.test(component.type) && !component.hidden; };
/**
 * @hidden
 */
exports.isNestedOrAssociated = function (component, label) { return component.parentElement === label || label.hasAttribute('for'); };
/**
 * @hidden
 */
exports.shouldClickComponent = function (component, label) { return exports.isActiveCheckboxOrRadio(component) && !exports.isNestedOrAssociated(component, label); };
/**
 * @hidden
 */
exports.getRootElement = function (element) {
    if (!element) {
        return null;
    }
    var rootElement = element;
    while (rootElement.parentElement) {
        rootElement = rootElement.parentElement;
    }
    return rootElement;
};
