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
/**
 * @hidden
 */
var SourceDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SourceDialogComponent, _super);
    function SourceDialogComponent(dialog, localization) {
        var _this = _super.call(this, dialog) || this;
        _this.dialog = dialog;
        _this.localization = localization;
        _this.data = '';
        return _this;
    }
    SourceDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this.textarea.nativeElement.focus();
        });
    };
    SourceDialogComponent.prototype.onCancelAction = function () {
        this.dialog.close();
    };
    SourceDialogComponent.prototype.onConfirmAction = function () {
        this.editor.exec('setHTML', this.getData());
        this.dialog.close();
        this.editor.focus();
    };
    SourceDialogComponent.prototype.getData = function () {
        return this.textarea.nativeElement.value;
    };
    SourceDialogComponent.prototype.setData = function () {
        this.data = this.indent(this.editor.getSource());
    };
    SourceDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    SourceDialogComponent.prototype.indent = function (content) {
        return content
            .replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/gi, '</$1>\n')
            .replace(/<(ul|ol)([^>]*)><li/gi, '<$1$2>\n<li')
            .replace(/<br \/>/gi, '<br />\n')
            .replace(/\n$/, '');
    };
    SourceDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    styles: [
                        "\n            >>> .k-editor-textarea {\n                height: 100%;\n            }\n        "
                    ],
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('viewSource') }}\n        </kendo-dialog-titlebar>\n        <textarea [value]=\"data\" #textarea class=\"k-textarea k-editor-textarea\"></textarea>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n            <button kendoButton (click)=\"onConfirmAction()\" [primary]=\"true\">{{ textFor('dialogUpdate') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    SourceDialogComponent.ctorParameters = function () { return [
        { type: kendo_angular_dialog_1.DialogRef },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    SourceDialogComponent.propDecorators = {
        editor: [{ type: core_1.Input }],
        textarea: [{ type: core_1.ViewChild, args: ['textarea',] }]
    };
    return SourceDialogComponent;
}(kendo_angular_dialog_1.DialogContentBase));
exports.SourceDialogComponent = SourceDialogComponent;
