/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var kendo_editor_common_1 = require("@progress/kendo-editor-common");
var util_1 = require("../util");
var editor_localization_service_1 = require("../localization/editor-localization.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * @hidden
 */
var ImageDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ImageDialogComponent, _super);
    function ImageDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.src = new forms_1.FormControl('', forms_1.Validators.required);
        _this.alt = new forms_1.FormControl('');
        _this.width = new forms_1.FormControl('', forms_1.Validators.min(1));
        _this.height = new forms_1.FormControl('', forms_1.Validators.min(1));
        _this.data = {
            alt: '',
            height: '',
            src: '',
            width: ''
        };
        _this.imageData = new forms_1.FormGroup({
            alt: _this.alt,
            height: _this.height,
            src: _this.src,
            width: _this.width
        });
        return _this;
    }
    ImageDialogComponent.prototype.ngOnInit = function () {
        this.srcInputId = "k-" + kendo_angular_common_1.guid();
        this.altTextInputId = "k-" + kendo_angular_common_1.guid();
        this.widthInputId = "k-" + kendo_angular_common_1.guid();
        this.heightInputId = "k-" + kendo_angular_common_1.guid();
    };
    ImageDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.srcInput.nativeElement.focus();
        });
    };
    ImageDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    ImageDialogComponent.prototype.onConfirmAction = function () {
        if (this.src.value) {
            this.editor.exec('insertImage', this.getData());
            this.dialog.close();
            this.editor.focus();
        }
    };
    ImageDialogComponent.prototype.setData = function (state) {
        var node = kendo_editor_common_1.getNodeFromSelection(state);
        if (node) {
            this.src.patchValue(node.attrs.src);
            this.alt.patchValue(node.attrs.alt);
            this.width.patchValue(node.attrs.width);
            this.height.patchValue(node.attrs.height);
        }
    };
    ImageDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    ImageDialogComponent.prototype.getData = function () {
        return {
            alt: this.alt.value,
            height: this.normalizeDimension(this.height.value),
            src: this.src.value,
            width: this.normalizeDimension(this.width.value)
        };
    };
    ImageDialogComponent.prototype.normalizeDimension = function (value) {
        return Number.isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0 ? '' : util_1.safeString(parseInt(value, 10));
    };
    ImageDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('insertImage') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\">\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"srcInputId\">{{ textFor('imageWebAddress') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"srcInputId\" #srcInput [formControl]=\"src\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"altTextInputId\">{{ textFor('imageAltText') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"altTextInputId\" [formControl]=\"alt\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"widthInputId\">{{ textFor('imageWidth') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"widthInputId\" [formControl]=\"width\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                    <div class=\"k-edit-label\">\n                        <label [for]=\"heightInputId\">{{ textFor('imageHeight') }}</label>\n                    </div>\n                    <div class=\"k-edit-field\">\n                        <input [id]=\"heightInputId\" [formControl]=\"height\" type=\"text\" class=\"k-textbox\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton [disabled]=\"imageData.invalid\"\n                    (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogInsert') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    ImageDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    ImageDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }],
        srcInput: [{ type: core_1.ViewChild, args: ['srcInput', { read: core_1.ElementRef },] }]
    };
    return ImageDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.ImageDialogComponent = ImageDialogComponent;
