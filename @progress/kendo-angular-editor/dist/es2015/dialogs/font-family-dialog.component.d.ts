/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { ItemDisabledFn } from '@progress/kendo-angular-dropdowns';
import { EditorLocalizationService } from '../localization/editor-localization.service';
import { EditorComponent } from '../editor.component';
import { FontFamilyItem } from '../common/font-family-item.interface';
import { FontFamilyDropDownListComponent } from '../tools/fontfamily/editor-fontfamily-dropdownlist.component';
/**
 * @hidden
 */
export declare class FontFamilyDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: EditorComponent;
    fontFamilyDropDownList: FontFamilyDropDownListComponent;
    data: FontFamilyItem[];
    defaultItem: FontFamilyItem;
    value: string;
    itemDisabled: ItemDisabledFn;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngAfterViewInit(): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    setData(args: any): void;
    textFor(key: string): string;
}
