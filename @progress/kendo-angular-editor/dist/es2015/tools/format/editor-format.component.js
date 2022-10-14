/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, ViewChild, Input, forwardRef, Output, Host, EventEmitter, ElementRef } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { DialogService } from '@progress/kendo-angular-dialog';
import { outerWidth, isPresent } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { FormatDialogComponent } from '../../dialogs/format-dialog.component';
import { FormatDropDownListComponent } from './editor-format-dropdownlist.component';
/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-dropdownlist` with an Editor command that changes the format of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFormat></kendo-toolbar-dropdownlist>
 * ```
 */
export class EditorFormatComponent extends ToolBarToolComponent {
    constructor(editor, dialogService, localization) {
        super();
        this.editor = editor;
        this.dialogService = dialogService;
        this.localization = localization;
        this.disabled = false;
        this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        this.valueChange = new EventEmitter();
        this._data = [
            { text: 'Paragraph', tag: 'p' },
            { text: 'Quotation', tag: 'blockquote' },
            { text: 'Heading 1', tag: 'h1' },
            { text: 'Heading 2', tag: 'h2' },
            { text: 'Heading 3', tag: 'h3' },
            { text: 'Heading 4', tag: 'h4' },
            { text: 'Heading 5', tag: 'h5' },
            { text: 'Heading 6', tag: 'h6' }
        ];
    }
    /**
     * Overrides the default format items list.
     */
    set data(formatItems) {
        this._data = formatItems || this._data;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.itemDisabled = (itemArgs) => {
            if (!this.overflows && this.formatDropDownList && !this.formatDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.tag === null;
            }
        };
        setTimeout(() => (this.defaultItem = { text: this.title, tag: null }));
        this.subs = this.editor.stateChange.subscribe(({ format }) => {
            const index = this.data.findIndex(item => item.tag === format.selected.tag);
            this.value = index !== -1 ? format.selected.tag : null;
            this.disabled = format.disabled;
        });
    }
    /**
     * @hidden
     */
    onValueChange(ev) {
        if (isPresent(ev)) {
            this.editor.exec('format', { tag: ev });
            this.editor.focus();
            this.valueChange.emit(this.data.find(d => d.tag === ev));
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    get outerWidth() {
        const element = this.formatDropDownList.element;
        if (element) {
            return outerWidth(element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('format');
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FormatDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
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
            this.formatButton.nativeElement.focus();
        }
        else {
            this.formatDropDownList.focus();
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
EditorFormatComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorFormatComponent) }],
                selector: 'kendo-toolbar-dropdownlist[kendoEditorFormat]',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-editor-format-dropdownlist
                #formatDropDownList
                [defaultItem]="defaultItem"
                [data]="data"
                [(value)]="value"
                [itemDisabled]="itemDisabled"
                [title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="onValueChange($event)"
            >
            </kendo-editor-format-dropdownlist>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                #formatButton
                [tabindex]="tabindex"
                type="button"
                kendoButton
                class="k-overflow-button"
                [icon]="'apply-format'"
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
EditorFormatComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: DialogService },
    { type: EditorLocalizationService }
];
EditorFormatComponent.propDecorators = {
    data: [{ type: Input }],
    valueChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList',] }],
    formatButton: [{ type: ViewChild, args: ['formatButton',] }]
};
