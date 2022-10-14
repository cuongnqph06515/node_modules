/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../../editor.component';
import { ItemDisabledFn } from '@progress/kendo-angular-dropdowns';
import { FontSizeItem } from '../../common/font-size-item.interface';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
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
export declare class EditorFontSizeComponent extends ToolBarToolComponent {
    private editor;
    private dialogService;
    private localization;
    value: string;
    disabled: boolean;
    tabindex: number;
    /**
     * Overrides the default font size list.
     */
    data: FontSizeItem[];
    /**
     * Fires when the user updates the value of the drop-down list.
     */
    valueChange: EventEmitter<FontSizeItem>;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    element: ElementRef;
    fontSizeDropDownList: FontSizeDropDownListComponent;
    fontSizeButton: ElementRef;
    /**
     * @hidden
     */
    defaultItem: FontSizeItem;
    /**
     * @hidden
     */
    itemDisabled: ItemDisabledFn;
    private subs;
    private _data;
    constructor(editor: EditorComponent, dialogService: DialogService, localization: EditorLocalizationService);
    ngOnInit(): void;
    /**
     * @hidden
     */
    onValueChange(ev: string): void;
    ngOnDestroy(): void;
    readonly outerWidth: number;
    readonly title: string;
    /**
     * @hidden
     */
    openDialog(): void;
    /**
     * @hidden
     */
    canFocus(): boolean;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    handleKey(): boolean;
}
