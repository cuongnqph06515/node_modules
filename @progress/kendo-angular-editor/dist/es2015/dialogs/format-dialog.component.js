/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ViewChild } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
import { FormatDropDownListComponent } from '../tools/format/editor-format-dropdownlist.component';
/**
 * @hidden
 */
export class FormatDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.data = [];
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.formatDropDownList.dropDownList.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.value) {
            this.editor.exec('format', { tag: this.value });
        }
        this.dialog.close();
    }
    setData(args) {
        this.editor = args.editor;
        this.data = args.data;
        this.defaultItem = args.defaultItem;
        this.value = args.value;
        this.itemDisabled = args.itemDisabled;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
FormatDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('format') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content" style="text-align: center;">
                    <kendo-editor-format-dropdownlist
                        #formatDropDownList
                        [defaultItem]="defaultItem"
                        [data]="data"
                        [(value)]="value"
                        [itemDisabled]="itemDisabled"
                    >
                    </kendo-editor-format-dropdownlist>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogApply') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
FormatDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
FormatDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList', { read: FormatDropDownListComponent },] }]
};
