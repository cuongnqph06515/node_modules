/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The settings for the Dialog actions when the Dialog is opened through `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogAction = /** @class */ (function () {
    function DialogAction() {
    }
    return DialogAction;
}());
exports.DialogAction = DialogAction;
/**
 * Indicates that the **Close** button is clicked. Used when the results from
 * the Dialogs that are opened through `DialogService` are filtered
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogCloseResult = /** @class */ (function () {
    function DialogCloseResult() {
    }
    return DialogCloseResult;
}());
exports.DialogCloseResult = DialogCloseResult;
/**
 * The settings that can be used when the Dialog is opened through `DialogService`.
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogSettings = /** @class */ (function () {
    function DialogSettings() {
    }
    return DialogSettings;
}());
exports.DialogSettings = DialogSettings;
/**
 * Holds references to the object instance and published events of the Dialog.
 * Controls the Dialogs that were opened through the `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogRef = /** @class */ (function () {
    function DialogRef() {
    }
    return DialogRef;
}());
exports.DialogRef = DialogRef;
