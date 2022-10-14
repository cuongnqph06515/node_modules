/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    cancel: [{ type: Input }],
    clearSelectedFiles: [{ type: Input }],
    dropFilesHere: [{ type: Input }],
    externalDropFilesHere: [{ type: Input }],
    filesBatchStatus: [{ type: Input }],
    filesBatchStatusFailed: [{ type: Input }],
    filesBatchStatusUploaded: [{ type: Input }],
    fileStatusFailed: [{ type: Input }],
    fileStatusUploaded: [{ type: Input }],
    headerStatusPaused: [{ type: Input }],
    headerStatusUploaded: [{ type: Input }],
    headerStatusUploading: [{ type: Input }],
    invalidFileExtension: [{ type: Input }],
    invalidMaxFileSize: [{ type: Input }],
    invalidMinFileSize: [{ type: Input }],
    pause: [{ type: Input }],
    remove: [{ type: Input }],
    resume: [{ type: Input }],
    retry: [{ type: Input }],
    select: [{ type: Input }],
    uploadSelectedFiles: [{ type: Input }]
};
