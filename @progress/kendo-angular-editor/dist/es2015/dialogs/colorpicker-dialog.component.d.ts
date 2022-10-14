/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
import { PaletteSettings, ActiveColorClickEvent, ColorPickerComponent } from '@progress/kendo-angular-inputs';
/**
 * @hidden
 */
export declare class ColorPickerDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: EditorComponent;
    colorPicker: ColorPickerComponent;
    value: string;
    title: string;
    editorCommand: 'foreColor' | 'backColor';
    paletteSettings: PaletteSettings;
    icon: string;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngAfterViewInit(): void;
    handleActiveColorClick(event: ActiveColorClickEvent): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    setData(args: any): void;
    textFor(key: string): string;
}
