/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, TemplateRef, ViewChild, ElementRef, forwardRef, Output, Host, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { outerWidth, isPresent, getUniqueStyleValues } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
import { FontSizeDialogComponent } from '../../dialogs/font-size-dialog.component';
import { FontSizeDropDownListComponent } from './editor-fontsize-dropdownlist.component';
/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-dropdownlist` with an Editor command that changes the font size of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFontSize></kendo-toolbar-dropdownlist>
 * ```
 */
export class EditorFontSizeComponent extends ToolBarToolComponent {
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
            { text: '8px', size: 8 },
            { text: '10px', size: 10 },
            { text: '12px', size: 12 },
            { text: '14px', size: 14 },
            { text: '18px', size: 18 },
            { text: '24px', size: 24 },
            { text: '36px', size: 36 }
        ];
    }
    /**
     * Overrides the default font size list.
     */
    set data(sizes) {
        this._data = sizes || this._data;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.itemDisabled = itemArgs => {
            if (!this.overflows && this.fontSizeDropDownList && !this.fontSizeDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.size === null;
            }
        };
        setTimeout(() => (this.defaultItem = { text: this.title, size: null }));
        this.subs = this.editor.stateChange.subscribe(({ style }) => {
            // remove units(px, em, rem...)
            // string#match returns array
            this.value = (getUniqueStyleValues(style.selected, 'font-size').match(/\d+/g) || [null])[0];
            this.disabled = style.disabled;
        });
    }
    /**
     * @hidden
     */
    onValueChange(ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontSize', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(d => d.size === parseInt(ev, 10)));
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('fontSize');
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontSizeDialogComponent
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
            this.fontSizeButton.nativeElement.focus();
        }
        else {
            this.fontSizeDropDownList.focus();
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
EditorFontSizeComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorFontSizeComponent) }],
                selector: 'kendo-toolbar-dropdownlist[kendoEditorFontSize]',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-editor-fontsize-dropdownlist
                #element
                [defaultItem]="defaultItem"
                [data]="data"
                [(value)]="value"
                [itemDisabled]="itemDisabled"
                [title]="title"
                [disabled]="disabled"
                [tabindex]="tabindex"
                (valueChange)="onValueChange($event)"
            >
            </kendo-editor-fontsize-dropdownlist>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                tabindex="-1"
                type="button"
                kendoButton
                #fontSizeButton
                class="k-overflow-button"
                [icon]="'font-size'"
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
EditorFontSizeComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: DialogService },
    { type: EditorLocalizationService }
];
EditorFontSizeComponent.propDecorators = {
    data: [{ type: Input }],
    valueChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['element',] }],
    fontSizeDropDownList: [{ type: ViewChild, args: ['element', { read: FontSizeDropDownListComponent },] }],
    fontSizeButton: [{ type: ViewChild, args: ['fontSizeButton',] }]
};
