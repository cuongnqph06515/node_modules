/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
import { ColorPickerComponent } from '@progress/kendo-angular-inputs';
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
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor(editorCommand) }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\" style=\"text-align: center;\">\n                    <kendo-colorpicker\n                        #colorpicker\n                        [view]=\"'palette'\"\n                        [format]=\"'hex'\"\n                        [attr.title]=\"title\"\n                        [icon]=\"icon\"\n                        [(value)]=\"value\"\n                        [paletteSettings]=\"paletteSettings\"\n                        (activeColorClick)=\"handleActiveColorClick($event)\"\n                    >\n                    </kendo-colorpicker>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogApply') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPickerDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    ColorPickerDialogComponent.propDecorators = {
        editor: [{ type: Input }],
        colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }]
    };
    return ColorPickerDialogComponent;
}(DialogContentBase));
export { ColorPickerDialogComponent };
