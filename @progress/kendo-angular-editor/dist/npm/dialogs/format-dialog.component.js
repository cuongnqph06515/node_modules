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
var editor_format_dropdownlist_component_1 = require("../tools/format/editor-format-dropdownlist.component");
/**
 * @hidden
 */
var FormatDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormatDialogComponent, _super);
    function FormatDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = [];
        return _this;
    }
    FormatDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.formatDropDownList.dropDownList.focus();
        });
    };
    FormatDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FormatDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec('format', { tag: this.value });
        }
        this.dialog.close();
    };
    FormatDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    };
    FormatDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FormatDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('format') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-editor-format-dropdownlist\n                        #formatDropDownList\n                        [defaultItem]=\"defaultItem\"\n                        [data]=\"data\"\n                        [(value)]=\"value\"\n                        [itemDisabled]=\"itemDisabled\"\n                    >\n                    </kendo-editor-format-dropdownlist>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FormatDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    FormatDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }],
        formatDropDownList: [{ type: core_1.ViewChild, args: ['formatDropDownList', { read: editor_format_dropdownlist_component_1.FormatDropDownListComponent },] }]
    };
    return FormatDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.FormatDialogComponent = FormatDialogComponent;
