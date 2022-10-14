/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FileInfo } from '../types';
import { UploadService } from '../upload.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class FileListItemActionButtonComponent {
    private uploadService;
    private localization;
    file: FileInfo;
    disabled: boolean;
    progress: Number;
    actionFocused: boolean;
    retryFocused: boolean;
    pauseResumeFocused: boolean;
    constructor(uploadService: UploadService, localization: LocalizationService);
    onFocus(type: string): void;
    onBlur(type: string): void;
    onRetryClick(): void;
    onRemoveCancelClick(): void;
    onPauseResumeClick(): void;
    readonly actionButtonTitle: string;
    readonly retryButtonTitle: string;
    readonly pauseResumeButtonTitle: string;
    readonly isUploading: boolean;
    readonly isFailed: boolean;
    readonly isPaused: boolean;
    readonly isResumable: boolean;
    readonly isActionButtonVisible: boolean;
}
