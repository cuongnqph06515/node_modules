/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Messages;
}(ComponentMessages));
export { Messages };
