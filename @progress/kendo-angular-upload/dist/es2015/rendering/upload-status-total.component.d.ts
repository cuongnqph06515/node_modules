/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DoCheck } from '@angular/core';
import { FileMap } from '../types/file-map';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class UploadStatusTotalComponent implements DoCheck {
    private localization;
    fileList: FileMap;
    isFailed: boolean;
    isPaused: boolean;
    isUploading: boolean;
    statusText: string;
    constructor(localization: LocalizationService);
    ngDoCheck(): void;
}
