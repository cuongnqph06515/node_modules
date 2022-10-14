/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var kendo_angular_toolbar_1 = require("@progress/kendo-angular-toolbar");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_inputs_2 = require("@progress/kendo-angular-inputs");
var editor_component_1 = require("./editor.component");
var image_dialog_component_1 = require("./dialogs/image-dialog.component");
var source_dialog_component_1 = require("./dialogs/source-dialog.component");
var file_link_dialog_component_1 = require("./dialogs/file-link-dialog.component");
var format_dialog_component_1 = require("./dialogs/format-dialog.component");
var colorpicker_dialog_component_1 = require("./dialogs/colorpicker-dialog.component");
var font_family_dialog_component_1 = require("./dialogs/font-family-dialog.component");
var insert_table_dialog_component_1 = require("./dialogs/insert-table-dialog.component");
var editor_format_component_1 = require("./tools/format/editor-format.component");
var editor_fontsize_component_1 = require("./tools/fontsize/editor-fontsize.component");
var editor_fontfamily_component_1 = require("./tools/fontfamily/editor-fontfamily.component");
var editor_colorpicker_component_1 = require("./tools/colorpicker/editor-colorpicker.component");
var editor_insert_table_button_component_1 = require("./tools/tables/editor-insert-table-button.component");
var popup_table_grid_component_1 = require("./tools/tables/popup-table-grid.component");
var editor_align_left_button_directive_1 = require("./tools/alignment/editor-align-left-button.directive");
var editor_align_center_button_directive_1 = require("./tools/alignment/editor-align-center-button.directive");
var editor_align_right_button_directive_1 = require("./tools/alignment/editor-align-right-button.directive");
var editor_align_justify_button_directive_1 = require("./tools/alignment/editor-align-justify-button.directive");
var editor_redo_button_directive_1 = require("./tools/history/editor-redo-button.directive");
var editor_undo_button_directive_1 = require("./tools/history/editor-undo-button.directive");
var editor_insert_image_button_directive_1 = require("./tools/image/editor-insert-image-button.directive");
var editor_indent_button_directive_1 = require("./tools/indentation/editor-indent-button.directive");
var editor_outdent_button_directive_1 = require("./tools/indentation/editor-outdent-button.directive");
var editor_create_link_button_directive_1 = require("./tools/link/editor-create-link-button.directive");
var editor_unlink_button_directive_1 = require("./tools/link/editor-unlink-button.directive");
var editor_insert_ordered_list_button_directive_1 = require("./tools/list/editor-insert-ordered-list-button.directive");
var editor_insert_unordered_list_button_directive_1 = require("./tools/list/editor-insert-unordered-list-button.directive");
var editor_view_source_button_directive_1 = require("./tools/source/editor-view-source-button.directive");
var editor_bold_button_directive_1 = require("./tools/typographical-emphasis/editor-bold-button.directive");
var editor_italic_button_directive_1 = require("./tools/typographical-emphasis/editor-italic-button.directive");
var editor_underline_button_directive_1 = require("./tools/typographical-emphasis/editor-underline-button.directive");
var editor_strikethrough_button_directive_1 = require("./tools/typographical-emphasis/editor-strikethrough-button.directive");
var editor_subscript_button_directive_1 = require("./tools/typographical-emphasis/editor-subscript-button.directive");
var editor_superscript_button_directive_1 = require("./tools/typographical-emphasis/editor-superscript-button.directive");
var editor_insert_file_button_directive_1 = require("./tools/link/editor-insert-file-button.directive");
var editor_fore_color_directive_1 = require("./tools/colorpicker/editor-fore-color.directive");
var editor_back_color_directive_1 = require("./tools/colorpicker/editor-back-color.directive");
var editor_clean_formatting_button_directive_1 = require("./tools/editor-clean-formatting-button.directive");
var editor_add_column_before_button_directive_1 = require("./tools/tables/editor-add-column-before-button.directive");
var editor_add_column_after_button_directive_1 = require("./tools/tables/editor-add-column-after-button.directive");
var editor_add_row_before_button_directive_1 = require("./tools/tables/editor-add-row-before-button.directive");
var editor_add_row_after_button_directive_1 = require("./tools/tables/editor-add-row-after-button.directive");
var editor_delete_column_button_directive_1 = require("./tools/tables/editor-delete-column-button.directive");
var editor_delete_row_button_directive_1 = require("./tools/tables/editor-delete-row-button.directive");
var editor_delete_table_button_directive_1 = require("./tools/tables/editor-delete-table-button.directive");
var editor_merge_cells_button_directive_1 = require("./tools/tables/editor-merge-cells-button.directive");
var editor_split_cell_button_directive_1 = require("./tools/tables/editor-split-cell-button.directive");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var editor_format_dropdownlist_component_1 = require("./tools/format/editor-format-dropdownlist.component");
var editor_fontfamily_dropdownlist_component_1 = require("./tools/fontfamily/editor-fontfamily-dropdownlist.component");
var editor_fontsize_dropdownlist_component_1 = require("./tools/fontsize/editor-fontsize-dropdownlist.component");
var font_size_dialog_component_1 = require("./dialogs/font-size-dialog.component");
var COMPONENT_DIRECTIVES = [
    //alignment
    editor_align_left_button_directive_1.EditorAlignLeftButtonDirective,
    editor_align_center_button_directive_1.EditorAlignCenterButtonDirective,
    editor_align_right_button_directive_1.EditorAlignRightButtonDirective,
    editor_align_justify_button_directive_1.EditorAlignJustifyButtonDirective,
    //file
    editor_insert_file_button_directive_1.EditorInsertFileButtonDirective,
    //history
    editor_redo_button_directive_1.EditorRedoButtonDirective,
    editor_undo_button_directive_1.EditorUndoButtonDirective,
    //image
    editor_insert_image_button_directive_1.EditorInsertImageButtonDirective,
    //indent
    editor_indent_button_directive_1.EditorIndentButtonDirective,
    editor_outdent_button_directive_1.EditorOutdentButtonDirective,
    //link
    editor_create_link_button_directive_1.EditorCreateLinkButtonDirective,
    editor_unlink_button_directive_1.EditorUnlinkButtonDirective,
    //list
    editor_insert_ordered_list_button_directive_1.EditorInsertOrderedListButtonDirective,
    editor_insert_unordered_list_button_directive_1.EditorInsertUnorderedListButtonDirective,
    //source
    editor_view_source_button_directive_1.EditorViewSourceButtonDirective,
    //typographical emphasis
    editor_bold_button_directive_1.EditorBoldButtonDirective,
    editor_italic_button_directive_1.EditorItalicButtonDirective,
    editor_underline_button_directive_1.EditorUnderlineButtonDirective,
    editor_strikethrough_button_directive_1.EditorStrikethroughButtonDirective,
    editor_subscript_button_directive_1.EditorSubscriptButtonDirective,
    editor_superscript_button_directive_1.EditorSuperscriptButtonDirective,
    //color
    editor_fore_color_directive_1.EditorForeColorDirective,
    editor_back_color_directive_1.EditorBackColorDirective,
    //clear format
    editor_clean_formatting_button_directive_1.EditorCleanFormattingButtonDirective,
    //table
    editor_add_column_before_button_directive_1.EditorAddColumnBeforeButtonDirective,
    editor_add_column_after_button_directive_1.EditorAddColumnAfterButtonDirective,
    editor_add_row_before_button_directive_1.EditorAddRowBeforeButtonDirective,
    editor_add_row_after_button_directive_1.EditorAddRowAfterButtonDirective,
    editor_delete_column_button_directive_1.EditorDeleteColumnButtonDirective,
    editor_delete_row_button_directive_1.EditorDeleteRowButtonDirective,
    editor_delete_table_button_directive_1.EditorDeleteTableButtonDirective,
    editor_merge_cells_button_directive_1.EditorMergeCellsButtonDirective,
    editor_split_cell_button_directive_1.EditorSplitCellButtonDirective,
    // EditorTableWizardButtonDirective,
    //localization
    custom_messages_component_1.CustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective
];
var TOOLBAR_TOOLS = [
    editor_fontsize_component_1.EditorFontSizeComponent,
    editor_fontfamily_component_1.EditorFontFamilyComponent,
    editor_format_component_1.EditorFormatComponent,
    editor_colorpicker_component_1.EditorColorPickerComponent,
    editor_insert_table_button_component_1.EditorInsertTableButtonComponent
];
var TOOLBAR_DIALOGS = [
    file_link_dialog_component_1.FileLinkDialogComponent,
    image_dialog_component_1.ImageDialogComponent,
    source_dialog_component_1.SourceDialogComponent,
    format_dialog_component_1.FormatDialogComponent,
    colorpicker_dialog_component_1.ColorPickerDialogComponent,
    font_family_dialog_component_1.FontFamilyDialogComponent,
    font_size_dialog_component_1.FontSizeDialogComponent,
    insert_table_dialog_component_1.InsertTableDialogComponent
    // TableWizardDialogComponent
    // Table Wizard Building Blocks
    // TableSettingsComponent,
    // CellSettingsComponent,
    // AccessibilitySettingsComponent
];
var INTERNAL_COMPONENTS = [
    popup_table_grid_component_1.PopupTableGridComponent,
    editor_format_dropdownlist_component_1.FormatDropDownListComponent,
    editor_fontfamily_dropdownlist_component_1.FontFamilyDropDownListComponent,
    editor_fontsize_dropdownlist_component_1.FontSizeDropDownListComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the Editor component.
 *
 * The package exports:
 * - `EditorComponent`&mdash;The `EditorComponent` class.
 * - `EditorButtonDirective`&mdash;The `EditorButton` directive class.
 * - `EditorDropDownDirective`&mdash;The `EditorDropDown` directive class.
 * - `EditorDialogDirective`&mdash;The `EditorDialog` directive class.
 * - `ToolBarDropDownListComponent`&mdash;The `ToolBarDropDownListComponent` directive class.
 * - `ButtonModule`&mdash;The `KendoButton` module.
 * - `ToolBarModule`&mdash;The `KendoToolBar` module.
 *
 *  * @example
 *
 * ```ts-no-run
 * // Import the Editor module
 * import { EditorModule } from '@progress/kendo-angular-editor';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare the app component
 *     imports:      [BrowserModule, EditorModule], // import the Editor module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        editor_component_1.EditorComponent,
                        COMPONENT_DIRECTIVES,
                        TOOLBAR_TOOLS,
                        TOOLBAR_DIALOGS,
                        INTERNAL_COMPONENTS
                    ],
                    entryComponents: [
                        TOOLBAR_DIALOGS
                    ],
                    exports: [
                        editor_component_1.EditorComponent,
                        COMPONENT_DIRECTIVES,
                        TOOLBAR_TOOLS,
                        kendo_angular_toolbar_1.ToolBarModule,
                        kendo_angular_buttons_1.ButtonModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        //needed for unit tests
                        INTERNAL_COMPONENTS
                    ],
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        //Kendo UI Angular Modules
                        kendo_angular_buttons_1.ButtonModule,
                        kendo_angular_inputs_1.ColorPickerModule,
                        kendo_angular_dialog_1.DialogModule,
                        kendo_angular_dropdowns_1.DropDownsModule,
                        kendo_angular_inputs_2.NumericTextBoxModule,
                        kendo_angular_toolbar_1.ToolBarModule,
                        kendo_angular_inputs_2.TextBoxModule
                    ]
                },] },
    ];
    return EditorModule;
}());
exports.EditorModule = EditorModule;
