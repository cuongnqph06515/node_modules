/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FileInfo } from '../types';
import { FileListItemBase } from './file-list-item-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { UploadService } from '../upload.service';
/**
 * @hidden
 */
export declare class FileListSingleItemComponent extends FileListItemBase {
    protected localization: LocalizationService;
    disabled: boolean;
    file: FileInfo;
    constructor(localization: LocalizationService, uploadService: UploadService);
    readonly fileStatusText: string;
    readonly showProgress: string;
    readonly fileGroupClass: string;
    readonly isUploadSuccessful: boolean;
    readonly isUploadFailed: boolean;
    readonly isNotYetUploaded: boolean;
}
