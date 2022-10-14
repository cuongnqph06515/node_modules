/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { ItemDisabledFn } from '@progress/kendo-angular-dropdowns';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { FormatItem } from '../common/format-item.interface';
import { EditorComponent } from '../editor.component';
import { FormatDropDownListComponent } from '../tools/format/editor-format-dropdownlist.component';
/**
 * @hidden
 */
export declare class FormatDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: EditorComponent;
    formatDropDownList: FormatDropDownListComponent;
    data: FormatItem[];
    defaultItem: FormatItem;
    value: string;
    itemDisabled: ItemDisabledFn;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngAfterViewInit(): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    setData(args: any): void;
    textFor(key: string): string;
}
