/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
/**
 * @hidden
 */
export declare class InsertTableDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: EditorComponent;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    onCancelAction(): void;
    onCellClick(args: {
        rows: number;
        cells: number;
    }): void;
    setData(args: any): void;
    textFor(key: string): string;
}
