/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
// import { EditorService } from '../editor.service';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
/**
 * @hidden
 */
export class SourceDialogComponent extends DialogContentBase {
    constructor(dialog, localization) {
        super(dialog);
        this.dialog = dialog;
        this.localization = localization;
        this.data = '';
    }
    ngAfterViewInit() {
        Promise.resolve(null).then(() => {
            this.textarea.nativeElement.focus();
        });
    }
    onCancelAction() {
        this.dialog.close();
    }
    onConfirmAction() {
        this.editor.exec('setHTML', this.getData());
        this.dialog.close();
        this.editor.focus();
    }
    getData() {
        return this.textarea.nativeElement.value;
    }
    setData() {
        this.data = this.indent(this.editor.getSource());
    }
    textFor(key) {
        return this.localization.get(key);
    }
    indent(content) {
        return content
            .replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/gi, '</$1>\n')
            .replace(/<(ul|ol)([^>]*)><li/gi, '<$1$2>\n<li')
            .replace(/<br \/>/gi, '<br />\n')
            .replace(/\n$/, '');
    }
}
SourceDialogComponent.decorators = [
    { type: Component, args: [{
                styles: [
                    `
            >>> .k-editor-textarea {
                height: 100%;
            }
        `
                ],
                template: `
        <kendo-dialog-titlebar (close)="onCancelAction()">
            {{ textFor('viewSource') }}
        </kendo-dialog-titlebar>
        <textarea [value]="data" #textarea class="k-textarea k-editor-textarea"></textarea>
        <kendo-dialog-actions>
            <button kendoButton (click)="onCancelAction()">{{ textFor('dialogCancel') }}</button>
            <button kendoButton (click)="onConfirmAction()" [primary]="true">{{ textFor('dialogUpdate') }}</button>
        </kendo-dialog-actions>
    `
            },] },
];
/** @nocollapse */
SourceDialogComponent.ctorParameters = () => [
    { type: DialogRef },
    { type: EditorLocalizationService }
];
SourceDialogComponent.propDecorators = {
    editor: [{ type: Input }],
    textarea: [{ type: ViewChild, args: ['textarea',] }]
};
