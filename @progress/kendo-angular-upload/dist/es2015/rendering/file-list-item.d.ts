/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { FileInfo } from '../types';
import { NavigationService } from '../navigation.service';
import { UploadService } from '../upload.service';
/**
 * @hidden
 */
export declare class FileListItemDirective {
    private navigationService;
    private uploadService;
    files: Array<FileInfo>;
    index: number;
    fileClass: boolean;
    focused: boolean;
    element: ElementRef;
    constructor(el: ElementRef, navigationService: NavigationService, uploadService: UploadService);
    focus(): void;
    readonly uidAttribute: string;
    readonly tabIndex: string;
    readonly kFileError: boolean;
    readonly kFileInvalid: boolean;
    readonly kFileProgress: boolean;
    readonly kFileSuccess: boolean;
    readonly kStateFocused: boolean;
    onFocus(): void;
    onBlur(): void;
    onClick(event: any): void;
}
