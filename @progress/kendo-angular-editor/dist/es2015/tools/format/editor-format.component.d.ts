/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, EventEmitter, ElementRef } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { ItemDisabledFn } from '@progress/kendo-angular-dropdowns';
import { DialogService } from '@progress/kendo-angular-dialog';
import { EditorComponent } from '../../editor.component';
import { FormatItem } from '../../common/format-item.interface';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
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
export declare class EditorFormatComponent extends ToolBarToolComponent {
    private editor;
    private dialogService;
    private localization;
    value: string;
    defaultItem: FormatItem;
    itemDisabled: ItemDisabledFn;
    disabled: boolean;
    tabindex: number;
    /**
     * Overrides the default format items list.
     */
    data: FormatItem[];
    /**
     * Fires when the user updates the value of the drop-down list.
     */
    valueChange: EventEmitter<FormatItem>;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    formatDropDownList: FormatDropDownListComponent;
    formatButton: ElementRef;
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
