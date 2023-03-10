/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { getMark, getSelectionText } from '@progress/kendo-editor-common';
import { schema } from '../config/schema';
import { isPresent } from '../util';
import { EditorLocalizationService } from '../localization/editor-localization.service';
/**
 * @hidden
 */
export class FileLinkDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.linkForm = new FormGroup({
            'href': new FormControl('', Validators.required),
            'text': new FormControl({ value: '', disabled: true }, Validators.required),
            'title': new FormControl('')
        });
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.hrefInput.nativeElement.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        const linkData = this.getData();
        this.editor.exec(this.command, linkData);
        this.dialog.close();
        this.editor.focus();
    }
    get titleText() {
        return this.localization.get(this.command);
    }
    setData(state) {
        if (this.command === 'createLink') {
            this.linkForm.addControl('target', new FormControl());
        }
        const linkMark = getMark(state, schema.marks.link);
        if (linkMark) {
            // const linkMarkRange = getMarkRange(state.selection.$cursor, schema.marks.link);
            // const mark = parentNode.child(cursorNodeIndex).marks.find(m => m.type === markType);
            this.linkForm.reset({
                href: linkMark.attrs.href,
                title: linkMark.attrs.title,
                target: isPresent(linkMark.attrs.target),
                text: this.setLinkText(state)
            });
            return;
        }
        if (!state.selection.empty) {
            this.linkForm.patchValue({
                'text': getSelectionText(state)
            });
        }
    }
    textForWithPrefix(key) {
        const prefix = this.command === 'createLink' ? 'link' : 'file';
        return this.textFor(prefix + key);
    }
    textFor(key) {
        return this.localization.get(key);
    }
    setLinkText(state) {
        const selection = state.selection;
        if (selection.empty && selection.$cursor) {
            const cursor = selection.$cursor;
            const cursorNodeIndex = cursor.index();
            const parentNode = cursor.parent;
            return parentNode.child(cursorNodeIndex).text;
        }
        else {
            return getSelectionText(state);
        }
    }
    getData() {
        let linkData = this.linkForm.value;
        if (isPresent(this.linkForm.controls.target)) {
            linkData.target = linkData.target ? '_blank' : null;
        }
        return linkData;
    }
}
FileLinkDialogComponent.decorators = [
    { type: Component, args: [{
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ titleText }}
        </kendo-dialog-titlebar>
        <div class="k-editor-dialog">
            <div class="k-editor-dialog k-popup-edit-form k-window-content k-content">
                <div class="k-edit-form-container k-window-content">
                    <form novalidate [formGroup]="linkForm">
                        <div class="k-edit-label">
                            <label (click)="hrefInput.focus()">{{ textForWithPrefix('WebAddress') }}</label>
                        </div>
                        <div class="k-edit-field">
                            <input #hrefInput formControlName="href" type="text" class="k-textbox" />
                        </div>

                        <div class="k-edit-label">
                            <label (click)="textInput.focus()">{{ textForWithPrefix('Text') }}</label>
                        </div>
                        <div class="k-edit-field">
                            <input #textInput formControlName="text" type="text" class="k-textbox" />
                        </div>

                        <div class="k-edit-label">
                            <label (click)="titleInput.focus()">{{ textForWithPrefix('Title') }}</label>
                        </div>
                        <div class="k-edit-field">
                            <input #titleInput formControlName="title" type="text" class="k-textbox" />
                        </div>
                        <ng-container *ngIf="command === 'createLink'">
                            <div class="k-edit-label"></div>
                            <div class="k-edit-field">
                                <input type="checkbox" id="k-target-blank" class="k-checkbox" formControlName="target" />
                                <label class="k-checkbox-label" for="k-target-blank">{{ textForWithPrefix('OpenInNewWindow') }}</label>
                            </div>
                        </ng-container>
                    </form>
                </div>
            </div>
        </div>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton [disabled]="linkForm.invalid" (click)="onConfirmAction()" [primary]="true">
                {{ textFor('dialogInsert') }}
            </button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
FileLinkDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
FileLinkDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    command: [{ type: Input }],
    hrefInput: [{ type: ViewChild, args: ['hrefInput', { read: ElementRef },] }]
};
