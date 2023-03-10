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
var schema_1 = require("../config/schema");
var util_1 = require("../util");
var editor_localization_service_1 = require("../localization/editor-localization.service");
/**
 * @hidden
 */
var FileLinkDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FileLinkDialogComponent, _super);
    function FileLinkDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.linkForm = new forms_1.FormGroup({
            'href': new forms_1.FormControl('', forms_1.Validators.required),
            'text': new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.required),
            'title': new forms_1.FormControl('')
        });
        return _this;
    }
    FileLinkDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.hrefInput.nativeElement.focus();
        });
    };
    FileLinkDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    FileLinkDialogComponent.prototype.onConfirmAction = function () {
        var linkData = this.getData();
        this.editor.exec(this.command, linkData);
        this.dialog.close();
        this.editor.focus();
    };
    Object.defineProperty(FileLinkDialogComponent.prototype, "titleText", {
        get: function () {
            return this.localization.get(this.command);
        },
        enumerable: true,
        configurable: true
    });
    FileLinkDialogComponent.prototype.setData = function (state) {
        if (this.command === 'createLink') {
            this.linkForm.addControl('target', new forms_1.FormControl());
        }
        var linkMark = kendo_editor_common_1.getMark(state, schema_1.schema.marks.link);
        if (linkMark) {
            // const linkMarkRange = getMarkRange(state.selection.$cursor, schema.marks.link);
            // const mark = parentNode.child(cursorNodeIndex).marks.find(m => m.type === markType);
            this.linkForm.reset({
                href: linkMark.attrs.href,
                title: linkMark.attrs.title,
                target: util_1.isPresent(linkMark.attrs.target),
                text: this.setLinkText(state)
            });
            return;
        }
        if (!state.selection.empty) {
            this.linkForm.patchValue({
                'text': kendo_editor_common_1.getSelectionText(state)
            });
        }
    };
    FileLinkDialogComponent.prototype.textForWithPrefix = function (key) {
        var prefix = this.command === 'createLink' ? 'link' : 'file';
        return this.textFor(prefix + key);
    };
    FileLinkDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FileLinkDialogComponent.prototype.setLinkText = function (state) {
        var selection = state.selection;
        if (selection.empty && selection.$cursor) {
            var cursor = selection.$cursor;
            var cursorNodeIndex = cursor.index();
            var parentNode = cursor.parent;
            return parentNode.child(cursorNodeIndex).text;
        }
        else {
            return kendo_editor_common_1.getSelectionText(state);
        }
    };
    FileLinkDialogComponent.prototype.getData = function () {
        var linkData = this.linkForm.value;
        if (util_1.isPresent(this.linkForm.controls.target)) {
            linkData.target = linkData.target ? '_blank' : null;
        }
        return linkData;
    };
    FileLinkDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ titleText }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-edit-form-container k-window-content\">\n                    <form novalidate [formGroup]=\"linkForm\">\n                        <div class=\"k-edit-label\">\n                            <label (click)=\"hrefInput.focus()\">{{ textForWithPrefix('WebAddress') }}</label>\n                        </div>\n                        <div class=\"k-edit-field\">\n                            <input #hrefInput formControlName=\"href\" type=\"text\" class=\"k-textbox\" />\n                        </div>\n\n                        <div class=\"k-edit-label\">\n                            <label (click)=\"textInput.focus()\">{{ textForWithPrefix('Text') }}</label>\n                        </div>\n                        <div class=\"k-edit-field\">\n                            <input #textInput formControlName=\"text\" type=\"text\" class=\"k-textbox\" />\n                        </div>\n\n                        <div class=\"k-edit-label\">\n                            <label (click)=\"titleInput.focus()\">{{ textForWithPrefix('Title') }}</label>\n                        </div>\n                        <div class=\"k-edit-field\">\n                            <input #titleInput formControlName=\"title\" type=\"text\" class=\"k-textbox\" />\n                        </div>\n                        <ng-container *ngIf=\"command === 'createLink'\">\n                            <div class=\"k-edit-label\"></div>\n                            <div class=\"k-edit-field\">\n                                <input type=\"checkbox\" id=\"k-target-blank\" class=\"k-checkbox\" formControlName=\"target\" />\n                                <label class=\"k-checkbox-label\" for=\"k-target-blank\">{{ textForWithPrefix('OpenInNewWindow') }}</label>\n                            </div>\n                        </ng-container>\n                    </form>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton [disabled]=\"linkForm.invalid\" (click)=\"onConfirmAction()\" [primary]=\"true\">\n                {{ textFor('dialogInsert') }}\n            </button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    FileLinkDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    FileLinkDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }],
        command: [{ type: core_1.Input }],
        hrefInput: [{ type: core_1.ViewChild, args: ['hrefInput', { read: core_1.ElementRef },] }]
    };
    return FileLinkDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.FileLinkDialogComponent = FileLinkDialogComponent;
