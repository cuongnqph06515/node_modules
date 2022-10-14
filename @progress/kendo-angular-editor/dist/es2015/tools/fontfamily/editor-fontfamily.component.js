/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, ViewChild, ElementRef, forwardRef, Input, Output, Host, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { outerWidth, isPresent, getUniqueStyleValues } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
import { FontFamilyDialogComponent } from '../../dialogs/font-family-dialog.component';
import { FontFamilyDropDownListComponent } from './editor-fontfamily-dropdownlist.component';
/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-toolbar-dropdownlist` with an Editor command that changes the font family of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFontFamily></kendo-toolbar-dropdownlist>
 * ```
 */
export class EditorFontFamilyComponent extends ToolBarToolComponent {
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
            { text: 'Arial', fontName: 'Arial,"Helvetica Neue",Helvetica,sans-serif' },
            { text: 'Courier New', fontName: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace' },
            { text: 'Georgia', fontName: 'Georgia,Times,"Times New Roman",serif' },
            {
                fontName: 
                // tslint:disable-next-line:max-line-length
                'Impact,Haettenschweiler,"Franklin Gothic Bold",Charcoal,"Helvetica Inserat","Bitstream Vera Sans Bold","Arial Black","sans serif"',
                text: 'Impact'
            },
            { text: 'Lucida Console', fontName: '"Lucida Console","Lucida Sans Typewriter",monaco,"Bitstream Vera Sans Mono",monospace' },
            { text: 'Tahoma', fontName: 'Tahoma,Verdana,Segoe,sans-serif' },
            { text: 'Times New Roman', fontName: 'TimesNewRoman,"Times New Roman",Times,Baskerville,Georgia,serif' },
            { text: 'Trebuchet MS', fontName: '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Tahoma,sans-serif' },
            { text: 'Verdana', fontName: 'Verdana,Geneva,sans-serif' }
        ];
    }
    /**
     * Overrides the default font list.
     */
    set data(fonts) {
        this._data = fonts || this._data;
    }
    get data() {
        return this._data;
    }
    ngOnInit() {
        this.itemDisabled = (itemArgs) => {
            if (!this.overflows && this.fontFamilyDropDownList && !this.fontFamilyDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.fontName === null;
            }
        };
        setTimeout(() => (this.defaultItem = { text: this.title, fontName: null }));
        this.subs = this.editor.stateChange.subscribe(({ style }) => {
            this.value = getUniqueStyleValues(style.selected, 'font-family') || null;
            this.disabled = style.disabled;
        });
    }
    /**
     * @hidden
     */
    onValueChange(ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontFamily', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(f => f.fontName === ev));
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
        return this.localization.get('fontFamily');
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontFamilyDialogComponent
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
            this.fontFamilyButton.nativeElement.focus();
        }
        else {
            this.fontFamilyDropDownList.focus();
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
EditorFontFamilyComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorFontFamilyComponent) }],
                selector: 'kendo-toolbar-dropdownlist[kendoEditorFontFamily]',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-editor-fontfamily-dropdownlist
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
            </kendo-editor-fontfamily-dropdownlist>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                tabindex="-1"
                type="button"
                kendoButton
                #fontFamilyButton
                class="k-overflow-button"
                [icon]="'font-family'"
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
EditorFontFamilyComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: DialogService },
    { type: EditorLocalizationService }
];
EditorFontFamilyComponent.propDecorators = {
    data: [{ type: Input }],
    valueChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['element',] }],
    fontFamilyDropDownList: [{ type: ViewChild, args: ['element', { read: FontFamilyDropDownListComponent },] }],
    fontFamilyButton: [{ type: ViewChild, args: ['fontFamilyButton',] }]
};
