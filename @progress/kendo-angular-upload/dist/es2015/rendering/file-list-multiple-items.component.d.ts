/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit } from '@angular/core';
import { FileInfo } from '../types';
import { FileListItemBase } from './file-list-item-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { UploadService } from '../upload.service';
/**
 * @hidden
 */
export declare class FileListMultipleItemsComponent extends FileListItemBase implements OnInit {
    protected localization: LocalizationService;
    disabled: boolean;
    files: Array<FileInfo>;
    filesHaveErrors: boolean;
    constructor(localization: LocalizationService, uploadService: UploadService);
    readonly showProgress: string;
    ngOnInit(): void;
    fileStatusText(file: FileInfo): any;
    readonly batchStatusText: string;
    readonly isUploadSuccessful: boolean;
    readonly isUploadFailed: boolean;
}
