/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ColorPickerModule } from '@progress/kendo-angular-inputs';
import { NumericTextBoxModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { EditorComponent } from './editor.component';
import { ImageDialogComponent } from './dialogs/image-dialog.component';
import { SourceDialogComponent } from './dialogs/source-dialog.component';
import { FileLinkDialogComponent } from './dialogs/file-link-dialog.component';
import { FormatDialogComponent } from './dialogs/format-dialog.component';
import { ColorPickerDialogComponent } from './dialogs/colorpicker-dialog.component';
import { FontFamilyDialogComponent } from './dialogs/font-family-dialog.component';
import { InsertTableDialogComponent } from './dialogs/insert-table-dialog.component';
import { EditorFormatComponent } from './tools/format/editor-format.component';
import { EditorFontSizeComponent } from './tools/fontsize/editor-fontsize.component';
import { EditorFontFamilyComponent } from './tools/fontfamily/editor-fontfamily.component';
import { EditorColorPickerComponent } from './tools/colorpicker/editor-colorpicker.component';
import { EditorInsertTableButtonComponent } from './tools/tables/editor-insert-table-button.component';
import { PopupTableGridComponent } from './tools/tables/popup-table-grid.component';
import { EditorAlignLeftButtonDirective } from './tools/alignment/editor-align-left-button.directive';
import { EditorAlignCenterButtonDirective } from './tools/alignment/editor-align-center-button.directive';
import { EditorAlignRightButtonDirective } from './tools/alignment/editor-align-right-button.directive';
import { EditorAlignJustifyButtonDirective } from './tools/alignment/editor-align-justify-button.directive';
import { EditorRedoButtonDirective } from './tools/history/editor-redo-button.directive';
import { EditorUndoButtonDirective } from './tools/history/editor-undo-button.directive';
import { EditorInsertImageButtonDirective } from './tools/image/editor-insert-image-button.directive';
import { EditorIndentButtonDirective } from './tools/indentation/editor-indent-button.directive';
import { EditorOutdentButtonDirective } from './tools/indentation/editor-outdent-button.directive';
import { EditorCreateLinkButtonDirective } from './tools/link/editor-create-link-button.directive';
import { EditorUnlinkButtonDirective } from './tools/link/editor-unlink-button.directive';
import { EditorInsertOrderedListButtonDirective } from './tools/list/editor-insert-ordered-list-button.directive';
import { EditorInsertUnorderedListButtonDirective } from './tools/list/editor-insert-unordered-list-button.directive';
import { EditorViewSourceButtonDirective } from './tools/source/editor-view-source-button.directive';
import { EditorBoldButtonDirective } from './tools/typographical-emphasis/editor-bold-button.directive';
import { EditorItalicButtonDirective } from './tools/typographical-emphasis/editor-italic-button.directive';
import { EditorUnderlineButtonDirective } from './tools/typographical-emphasis/editor-underline-button.directive';
import { EditorStrikethroughButtonDirective } from './tools/typographical-emphasis/editor-strikethrough-button.directive';
import { EditorSubscriptButtonDirective } from './tools/typographical-emphasis/editor-subscript-button.directive';
import { EditorSuperscriptButtonDirective } from './tools/typographical-emphasis/editor-superscript-button.directive';
import { EditorInsertFileButtonDirective } from './tools/link/editor-insert-file-button.directive';
import { EditorForeColorDirective } from './tools/colorpicker/editor-fore-color.directive';
import { EditorBackColorDirective } from './tools/colorpicker/editor-back-color.directive';
import { EditorCleanFormattingButtonDirective } from './tools/editor-clean-formatting-button.directive';
import { EditorAddColumnBeforeButtonDirective } from './tools/tables/editor-add-column-before-button.directive';
import { EditorAddColumnAfterButtonDirective } from './tools/tables/editor-add-column-after-button.directive';
import { EditorAddRowBeforeButtonDirective } from './tools/tables/editor-add-row-before-button.directive';
import { EditorAddRowAfterButtonDirective } from './tools/tables/editor-add-row-after-button.directive';
import { EditorDeleteColumnButtonDirective } from './tools/tables/editor-delete-column-button.directive';
import { EditorDeleteRowButtonDirective } from './tools/tables/editor-delete-row-button.directive';
import { EditorDeleteTableButtonDirective } from './tools/tables/editor-delete-table-button.directive';
import { EditorMergeCellsButtonDirective } from './tools/tables/editor-merge-cells-button.directive';
import { EditorSplitCellButtonDirective } from './tools/tables/editor-split-cell-button.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { FormatDropDownListComponent } from './tools/format/editor-format-dropdownlist.component';
import { FontFamilyDropDownListComponent } from './tools/fontfamily/editor-fontfamily-dropdownlist.component';
import { FontSizeDropDownListComponent } from './tools/fontsize/editor-fontsize-dropdownlist.component';
import { FontSizeDialogComponent } from './dialogs/font-size-dialog.component';
var COMPONENT_DIRECTIVES = [
    //alignment
    EditorAlignLeftButtonDirective,
    EditorAlignCenterButtonDirective,
    EditorAlignRightButtonDirective,
    EditorAlignJustifyButtonDirective,
    //file
    EditorInsertFileButtonDirective,
    //history
    EditorRedoButtonDirective,
    EditorUndoButtonDirective,
    //image
    EditorInsertImageButtonDirective,
    //indent
    EditorIndentButtonDirective,
    EditorOutdentButtonDirective,
    //link
    EditorCreateLinkButtonDirective,
    EditorUnlinkButtonDirective,
    //list
    EditorInsertOrderedListButtonDirective,
    EditorInsertUnorderedListButtonDirective,
    //source
    EditorViewSourceButtonDirective,
    //typographical emphasis
    EditorBoldButtonDirective,
    EditorItalicButtonDirective,
    EditorUnderlineButtonDirective,
    EditorStrikethroughButtonDirective,
    EditorSubscriptButtonDirective,
    EditorSuperscriptButtonDirective,
    //color
    EditorForeColorDirective,
    EditorBackColorDirective,
    //clear format
    EditorCleanFormattingButtonDirective,
    //table
    EditorAddColumnBeforeButtonDirective,
    EditorAddColumnAfterButtonDirective,
    EditorAddRowBeforeButtonDirective,
    EditorAddRowAfterButtonDirective,
    EditorDeleteColumnButtonDirective,
    EditorDeleteRowButtonDirective,
    EditorDeleteTableButtonDirective,
    EditorMergeCellsButtonDirective,
    EditorSplitCellButtonDirective,
    // EditorTableWizardButtonDirective,
    //localization
    CustomMessagesComponent,
    LocalizedMessagesDirective
];
var TOOLBAR_TOOLS = [
    EditorFontSizeComponent,
    EditorFontFamilyComponent,
    EditorFormatComponent,
    EditorColorPickerComponent,
    EditorInsertTableButtonComponent
];
var TOOLBAR_DIALOGS = [
    FileLinkDialogComponent,
    ImageDialogComponent,
    SourceDialogComponent,
    FormatDialogComponent,
    ColorPickerDialogComponent,
    FontFamilyDialogComponent,
    FontSizeDialogComponent,
    InsertTableDialogComponent
    // TableWizardDialogComponent
    // Table Wizard Building Blocks
    // TableSettingsComponent,
    // CellSettingsComponent,
    // AccessibilitySettingsComponent
];
var INTERNAL_COMPONENTS = [
    PopupTableGridComponent,
    FormatDropDownListComponent,
    FontFamilyDropDownListComponent,
    FontSizeDropDownListComponent
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
        { type: NgModule, args: [{
                    declarations: [
                        EditorComponent,
                        COMPONENT_DIRECTIVES,
                        TOOLBAR_TOOLS,
                        TOOLBAR_DIALOGS,
                        INTERNAL_COMPONENTS
                    ],
                    entryComponents: [
                        TOOLBAR_DIALOGS
                    ],
                    exports: [
                        EditorComponent,
                        COMPONENT_DIRECTIVES,
                        TOOLBAR_TOOLS,
                        ToolBarModule,
                        ButtonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        //needed for unit tests
                        INTERNAL_COMPONENTS
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        //Kendo UI Angular Modules
                        ButtonModule,
                        ColorPickerModule,
                        DialogModule,
                        DropDownsModule,
                        NumericTextBoxModule,
                        ToolBarModule,
                        TextBoxModule
                    ]
                },] },
    ];
    return EditorModule;
}());
export { EditorModule };
