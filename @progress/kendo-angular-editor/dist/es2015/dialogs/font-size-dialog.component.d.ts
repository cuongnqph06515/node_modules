/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { ItemDisabledFn } from '@progress/kendo-angular-dropdowns';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
import { FontSizeItem } from '../common/font-size-item.interface';
import { FontSizeDropDownListComponent } from '../tools/fontsize/editor-fontsize-dropdownlist.component';
/**
 * @hidden
 */
export declare class FontSizeDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: EditorComponent;
    fontSizeDropDownList: FontSizeDropDownListComponent;
    data: FontSizeItem[];
    defaultItem: FontSizeItem;
    value: string;
    itemDisabled: ItemDisabledFn;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngAfterViewInit(): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    setData(args: any): void;
    textFor(key: string): string;
}
