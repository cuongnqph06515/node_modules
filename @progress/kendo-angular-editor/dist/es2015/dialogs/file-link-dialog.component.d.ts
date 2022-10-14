/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { EditorState } from '@progress/kendo-editor-common';
import { DialogCommand } from '../common/commands';
import { EditorLocalizationService } from '../localization/editor-localization.service';
/**
 * @hidden
 */
export declare class FileLinkDialogComponent extends DialogContentBase {
    dialog: DialogRef;
    localization: EditorLocalizationService;
    editor: any;
    command: DialogCommand;
    hrefInput: ElementRef;
    linkForm: FormGroup;
    constructor(dialog: DialogRef, localization: EditorLocalizationService);
    ngAfterViewInit(): void;
    onCancelAction(): void;
    onConfirmAction(): void;
    readonly titleText: string;
    setData(state: EditorState): void;
    textForWithPrefix(key: string): string;
    textFor(key: string): string;
    private setLinkText;
    private getData;
}
