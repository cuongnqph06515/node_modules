/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ViewChild } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
import { ColorPickerComponent } from '@progress/kendo-angular-inputs';
/**
 * @hidden
 */
export class ColorPickerDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.colorPicker.focus();
        });
    }
    handleActiveColorClick(event) {
        event.preventOpen();
        this.value = event.color;
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.value) {
            this.editor.exec(this.editorCommand, this.value);
        }
        this.dialog.close();
    }
    setData(args) {
        this.editor = args.editor;
        this.value = args.value;
        this.editorCommand = args.editorCommand;
        this.paletteSettings = args.paletteSettings;
        this.icon = args.icon;
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
ColorPickerDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor(editorCommand) }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content" style="text-align: center;">
                    <kendo-colorpicker
                        #colorpicker
                        [view]="'palette'"
                        [format]="'hex'"
                        [attr.title]="title"
                        [icon]="icon"
                        [(value)]="value"
                        [paletteSettings]="paletteSettings"
                        (activeColorClick)="handleActiveColorClick($event)"
                    >
                    </kendo-colorpicker>
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
ColorPickerDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
ColorPickerDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }]
};
