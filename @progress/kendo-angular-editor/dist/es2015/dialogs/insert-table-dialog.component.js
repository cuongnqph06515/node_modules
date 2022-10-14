/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
/**
 * @hidden
 */
export class InsertTableDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
    }
    onCancelAction() {
        this.dialog.close();
        this.editor.focus();
    }
    onCellClick(args) {
        this.dialog.close();
        this.editor.exec("insertTable", args);
        this.editor.focus();
    }
    setData(args) {
        this.editor = args.editor;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
InsertTableDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('insertTable') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-ct-popup k-window-content" style="text-align: center;">
                    <kendo-popup-table-grid (cellClick)="onCellClick($event)"></kendo-popup-table-grid>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
InsertTableDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
InsertTableDialogComponent.propDecorators = {
    editor: [{ type: Input }]
};
