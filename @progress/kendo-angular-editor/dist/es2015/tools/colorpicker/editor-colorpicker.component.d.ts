/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { PaletteSettings, ActiveColorClickEvent, ColorPickerComponent } from '@progress/kendo-angular-inputs';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { EditorComponent } from '../../editor.component';
import { DialogService } from '@progress/kendo-angular-dialog';
/**
 * A component which configures an existing ColorPickerComponent as a ToolBar tool.
 * To associate a `kendo-toolbar-colorpicker` with an Editor command that changes the
 * foreground or the background color of the text, use the `kendoEditorForeColor` or `kendoEditorBackColor` directive.
 */
export declare class EditorColorPickerComponent extends ToolBarToolComponent {
    private editor;
    private localization;
    private dialogService;
    tabindex: number;
    /**
     * Specifies the initial value of the color picker.
     */
    value: string;
    /**
     * Specifies the Kendo UI font icon that will be used.
     */
    icon: string;
    /**
     * Overrides the default [color palette settings]({% slug api_inputs_palettesettings %}).
     */
    paletteSettings: PaletteSettings;
    /**
     * Specifies the color-related command that will be executed.
     */
    editorCommand: 'foreColor' | 'backColor';
    /**
     * Specifies if the component should be disabled.
     */
    disabled: boolean;
    /**
     * @hidden
     */
    readonly title: string;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    private element;
    private colorPicker;
    private colorPickerButton;
    private subs;
    private valueCache;
    constructor(editor: EditorComponent, localization: EditorLocalizationService, dialogService: DialogService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    handleValueChange(color: string): void;
    /**
     * @hidden
     */
    handleActiveColorClick(event: ActiveColorClickEvent): void;
    /**
     * @hidden
     */
    onOpen(picker: ColorPickerComponent): void;
    /**
     * @hidden
     */
    onClose(picker: ColorPickerComponent): void;
    /**
     * @hidden
     */
    readonly outerWidth: number;
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
