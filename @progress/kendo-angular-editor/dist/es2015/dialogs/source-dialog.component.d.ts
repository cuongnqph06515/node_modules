/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorLocalizationService } from '../localization/editor-localization.service';
/**
 * @hidden
 */
export declare class SourceDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: any;
    textarea: ElementRef;
    data: string;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngAfterViewInit(): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    getData(): string;
    setData(): void;
    textFor(key: string): string;
    private indent;
}
