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
var editor_fontfamily_dropdownlist_component_1 = require("../tools/fontfamily/editor-fontfamily-dropdownlist.component");
/**
 * @hidden
 */
var FontFamilyDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FontFamilyDialogComponent, _super);
    function FontFamilyDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = [];
        return _this;
    }
    FontFamilyDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.fontFamilyDropDownList.dropDownList.focus();
        });
    };
    FontFamilyDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FontFamilyDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec('fontFamily', this.value);
        }
        this.dialog.close();
    };
    FontFamilyDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    };
    FontFamilyDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FontFamilyDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('fontFamily') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-editor-fontfamily-dropdownlist\n                        #fontFamilyDropDownList\n                        [defaultItem]=\"defaultItem\"\n                        [data]=\"data\"\n                        [(value)]=\"value\"\n                        [itemDisabled]=\"itemDisabled\"\n                    >\n                    </kendo-editor-fontfamily-dropdownlist>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FontFamilyDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    FontFamilyDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }],
        fontFamilyDropDownList: [{ type: core_1.ViewChild, args: ['fontFamilyDropDownList', { read: editor_fontfamily_dropdownlist_component_1.FontFamilyDropDownListComponent },] }]
    };
    return FontFamilyDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.FontFamilyDialogComponent = FontFamilyDialogComponent;
