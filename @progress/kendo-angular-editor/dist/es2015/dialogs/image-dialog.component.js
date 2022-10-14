/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { getNodeFromSelection } from '@progress/kendo-editor-common';
import { safeString } from '../util';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { guid } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class ImageDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.src = new FormControl('', Validators.required);
        this.alt = new FormControl('');
        this.width = new FormControl('', Validators.min(1));
        this.height = new FormControl('', Validators.min(1));
        this.data = {
            alt: '',
            height: '',
            src: '',
            width: ''
        };
        this.imageData = new FormGroup({
            alt: this.alt,
            height: this.height,
            src: this.src,
            width: this.width
        });
    }
    ngOnInit() {
        this.srcInputId = `k-${guid()}`;
        this.altTextInputId = `k-${guid()}`;
        this.widthInputId = `k-${guid()}`;
        this.heightInputId = `k-${guid()}`;
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.srcInput.nativeElement.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        if (this.src.value) {
            this.editor.exec('insertImage', this.getData());
            this.dialog.close();
            this.editor.focus();
        }
    }
    setData(state) {
        const node = getNodeFromSelection(state);
        if (node) {
            this.src.patchValue(node.attrs.src);
            this.alt.patchValue(node.attrs.alt);
            this.width.patchValue(node.attrs.width);
            this.height.patchValue(node.attrs.height);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    getData() {
        return {
            alt: this.alt.value,
            height: this.normalizeDimension(this.height.value),
            src: this.src.value,
            width: this.normalizeDimension(this.width.value)
        };
    }
    normalizeDimension(value) {
        return Number.isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0 ? '' : safeString(parseInt(value, 10));
    }
}
ImageDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('insertImage') }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content">
                    <div class="k-edit-label">
                        <label [for]="srcInputId">{{ textFor('imageWebAddress') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="srcInputId" #srcInput [formControl]="src" type="text" class="k-textbox" />
                    </div>
                    <div class="k-edit-label">
                        <label [for]="altTextInputId">{{ textFor('imageAltText') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="altTextInputId" [formControl]="alt" type="text" class="k-textbox" />
                    </div>
                    <div class="k-edit-label">
                        <label [for]="widthInputId">{{ textFor('imageWidth') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="widthInputId" [formControl]="width" type="text" class="k-textbox" />
                    </div>
                    <div class="k-edit-label">
                        <label [for]="heightInputId">{{ textFor('imageHeight') }}</label>
                    </div>
                    <div class="k-edit-field">
                        <input [id]="heightInputId" [formControl]="height" type="text" class="k-textbox" />
                    </div>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton [disabled]="imageData.invalid"
                    (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogInsert') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
ImageDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
ImageDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    srcInput: [{ type: ViewChild, args: ['srcInput', { read: ElementRef },] }]
};
