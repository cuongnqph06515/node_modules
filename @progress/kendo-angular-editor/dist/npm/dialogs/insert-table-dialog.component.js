/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var editor_localization_service_1 = require("../localization/editor-localization.service");
var editor_component_1 = require("../editor.component");
/**
 * @hidden
 */
var InsertTableDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InsertTableDialogComponent, _super);
    function InsertTableDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        return _this;
    }
    InsertTableDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
        this.editor.focus();
    };
    InsertTableDialogComponent.prototype.onCellClick = function (args) {
        this.dialog.close();
        this.editor.exec("insertTable", args);
        this.editor.focus();
    };
    InsertTableDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
    };
    InsertTableDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    InsertTableDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('insertTable') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-ct-popup k-window-content\" style=\"text-align: center;\">\n                    <kendo-popup-table-grid (cellClick)=\"onCellClick($event)\"></kendo-popup-table-grid>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    InsertTableDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    InsertTableDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }]
    };
    return InsertTableDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.InsertTableDialogComponent = InsertTableDialogComponent;
