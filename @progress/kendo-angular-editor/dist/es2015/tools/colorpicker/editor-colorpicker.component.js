/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-forward-ref
import { Component, Input, Host, forwardRef, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { ColorPickerComponent } from '@progress/kendo-angular-inputs';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { outerWidth } from '../../util';
import { EditorComponent } from '../../editor.component';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ColorPickerDialogComponent } from '../../dialogs/colorpicker-dialog.component';
/**
 * A component which configures an existing ColorPickerComponent as a ToolBar tool.
 * To associate a `kendo-toolbar-colorpicker` with an Editor command that changes the
 * foreground or the background color of the text, use the `kendoEditorForeColor` or `kendoEditorBackColor` directive.
 */
export class EditorColorPickerComponent extends ToolBarToolComponent {
    constructor(editor, localization, dialogService) {
        super();
        this.editor = editor;
        this.localization = localization;
        this.dialogService = dialogService;
        this.tabindex = -1;
        /**
         * Specifies if the component should be disabled.
         */
        this.disabled = false;
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get(this.editorCommand);
    }
    ngOnInit() {
        this.subs = this.editor.stateChange.subscribe(({ style }) => {
            this.disabled = style.disabled;
        });
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    /**
     * @hidden
     */
    handleValueChange(color) {
        this.editor.exec(this.editorCommand, color);
        this.editor.focus();
    }
    /**
     * @hidden
     */
    handleActiveColorClick(event) {
        event.preventOpen();
        this.handleValueChange(event.color);
    }
    /**
     * @hidden
     */
    onOpen(picker) {
        this.valueCache = picker.value;
        picker.reset();
    }
    /**
     * @hidden
     */
    onClose(picker) {
        if (!picker.value) {
            picker.value = this.valueCache;
        }
    }
    /**
     * @hidden
     */
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: ColorPickerDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            value: this.value,
            title: this.title,
            editorCommand: this.editorCommand,
            paletteSettings: this.paletteSettings,
            icon: this.icon
        });
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.tabindex = 0;
        if (this.overflows) {
            this.colorPickerButton.nativeElement.focus();
        }
        else {
            this.colorPicker.focus();
        }
    }
    /**
     * @hidden
     */
    handleKey() {
        this.tabindex = -1;
        return false;
    }
}
EditorColorPickerComponent.decorators = [
    { type: Component, args: [{
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorColorPickerComponent) }],
                selector: 'kendo-toolbar-colorpicker',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-colorpicker
                #colorpicker
                [view]="'palette'"
                [format]="'hex'"
                [attr.title]="title"
                [icon]="icon"
                [value]="value"
                [paletteSettings]="paletteSettings"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="handleValueChange($event)"
                (activeColorClick)="handleActiveColorClick($event)"
                (open)="onOpen(colorpicker)"
                (close)="onClose(colorpicker)"
            >
            </kendo-colorpicker>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                tabindex="-1"
                type="button"
                kendoButton
                #colorPickerButton
                class="k-overflow-button"
                [icon]="icon"
                [attr.title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (click)="openDialog()"
            >
                {{ title }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorColorPickerComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService },
    { type: DialogService }
];
EditorColorPickerComponent.propDecorators = {
    value: [{ type: Input }],
    icon: [{ type: Input }],
    paletteSettings: [{ type: Input }],
    editorCommand: [{ type: Input }],
    disabled: [{ type: Input }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['colorpicker', { read: ElementRef },] }],
    colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }],
    colorPickerButton: [{ type: ViewChild, args: ['colorPickerButton', { read: ElementRef },] }]
};
