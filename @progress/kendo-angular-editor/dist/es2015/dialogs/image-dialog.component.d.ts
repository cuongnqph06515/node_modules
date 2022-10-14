/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { EditorState } from '@progress/kendo-editor-common';
import { ImageData } from '../common/image-data.interface';
import { EditorLocalizationService } from '../localization/editor-localization.service';
/**
 * @hidden
 */
export declare class ImageDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    private localization;
    editor: any;
    srcInput: ElementRef;
    src: FormControl;
    alt: FormControl;
    width: FormControl;
    height: FormControl;
    data: ImageData;
    imageData: FormGroup;
    srcInputId: string;
    altTextInputId: string;
    widthInputId: string;
    heightInputId: string;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    setData(state: EditorState): void;
    textFor(key: string): string;
    private getData;
    private normalizeDimension;
}
