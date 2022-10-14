/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Subscription } from 'rxjs';
import { FileInfo } from '../types';
import { UploadProgressEvent } from '../events';
import { UploadService } from '../upload.service';
/**
 * @hidden
 */
export declare class FileListItemBase implements OnDestroy {
    protected uploadService: UploadService;
    progressComplete: Number;
    protected localization: LocalizationService;
    protected uploadProgressSubscription: Subscription;
    constructor(uploadService: UploadService);
    protected subscribeUploadProgress(uploadProgressHandler: (args: UploadProgressEvent) => void): void;
    protected fileHasValidationErrors(file: FileInfo): boolean;
    protected filesHaveValidationErrors(files: Array<FileInfo>): boolean;
    ngOnDestroy(): void;
    getFileValidationMessage(file: FileInfo): string;
    getTotalFilesSizeMessage(files: Array<FileInfo>): string;
    textFor(key: string): string;
}
