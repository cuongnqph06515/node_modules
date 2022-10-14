/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
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
        { type: Component, args: [{
                    template: "\n        <kendo-dialog-titlebar (close)=\"onCancelAction()\">\n            {{ textFor('insertTable') }}\n        </kendo-dialog-titlebar>\n        <div class=\"k-editor-dialog\">\n            <div class=\"k-editor-dialog k-popup-edit-form k-window-content k-content\">\n                <div class=\"k-ct-popup k-window-content\" style=\"text-align: center;\">\n                    <kendo-popup-table-grid (cellClick)=\"onCellClick($event)\"></kendo-popup-table-grid>\n                </div>\n            </div>\n        </div>\n        <kendo-dialog-actions>\n            <button kendoButton (click)=\"onCancelAction()\">{{ textFor('dialogCancel') }}</button>\n        </kendo-dialog-actions>\n    "
                },] },
    ];
    /** @nocollapse */
    InsertTableDialogComponent.ctorParameters = function () { return [
        { type: DialogRef },
        { type: EditorLocalizationService }
    ]; };
    InsertTableDialogComponent.propDecorators = {
        editor: [{ type: Input }]
    };
    return InsertTableDialogComponent;
}(DialogContentBase));
export { InsertTableDialogComponent };
