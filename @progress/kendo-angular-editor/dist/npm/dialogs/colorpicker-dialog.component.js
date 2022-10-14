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
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
/**
 * @hidden
 */
var ColorPickerDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPickerDialogComponent, _super);
    function ColorPickerDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        return _this;
    }
    ColorPickerDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.colorPicker.focus();
        });
    };
    ColorPickerDialogComponent.prototype.handleActiveColorClick = function (event) {
        event.preventOpen();
        this.value = event.color;
    };
    ColorPickerDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    ColorPickerDialogComponent.prototype.onConfirmAction = function () {
        if (this.value) {
            this.editor.exec(this.editorCommand, this.value);
        }
        this.dialog.close();
    };
    ColorPickerDialogComponent.prototype.setData = function (args) {
        this.editor = args.editor;
        this.value = args.value;
        this.editorCommand = args.editorCommand;
        this.paletteSettings = args.paletteSettings;
        this.icon = args.icon;
    };
    ColorPickerDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    ColorPickerDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor(editorCommand) }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-colorpicker\n                        #colorpicker\n                        [view]=\"'palette'\"\n                        [format]=\"'hex'\"\n                        [attr.title]=\"title\"\n                        [icon]=\"icon\"\n                        [(value)]=\"value\"\n                        [paletteSettings]=\"paletteSettings\"\n                        (activeColorClick)=\"handleActiveColorClick($event)\"\n                    >\n                    </kendo-colorpicker>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPickerDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    ColorPickerDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }],
        colorPicker: [{ type: core_1.ViewChild, args: ['colorpicker', { read: kendo_angular_inputs_1.ColorPickerComponent },] }]
    };
    return ColorPickerDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.ColorPickerDialogComponent = ColorPickerDialogComponent;
