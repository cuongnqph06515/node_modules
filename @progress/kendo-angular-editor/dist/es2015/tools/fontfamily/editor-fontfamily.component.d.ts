/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../../editor.component';
import { FontFamilyItem } from '../../common/font-family-item.interface';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
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
export declare class EditorFontFamilyComponent extends ToolBarToolComponent {
    private editor;
    private dialogService;
    private localization;
    value: string;
    disabled: boolean;
    tabindex: number;
    /**
     * Overrides the default font list.
     */
    data: FontFamilyItem[];
    /**
     * Fires when the user updates the value of the drop-down list.
     */
    valueChange: EventEmitter<FontFamilyItem>;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    element: ElementRef;
    fontFamilyDropDownList: FontFamilyDropDownListComponent;
    fontFamilyButton: ElementRef;
    /**
     * @hidden
     */
    defaultItem: FontFamilyItem;
    /**
     * @hidden
     */
    itemDisabled: (itemArgs: {
        dataItem: any;
        index: number;
    }) => boolean;
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
