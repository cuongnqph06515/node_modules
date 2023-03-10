/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        cancel: [{ type: core_1.Input }],
        clearSelectedFiles: [{ type: core_1.Input }],
        dropFilesHere: [{ type: core_1.Input }],
        externalDropFilesHere: [{ type: core_1.Input }],
        filesBatchStatus: [{ type: core_1.Input }],
        filesBatchStatusFailed: [{ type: core_1.Input }],
        filesBatchStatusUploaded: [{ type: core_1.Input }],
        fileStatusFailed: [{ type: core_1.Input }],
        fileStatusUploaded: [{ type: core_1.Input }],
        headerStatusPaused: [{ type: core_1.Input }],
        headerStatusUploaded: [{ type: core_1.Input }],
        headerStatusUploading: [{ type: core_1.Input }],
        invalidFileExtension: [{ type: core_1.Input }],
        invalidMaxFileSize: [{ type: core_1.Input }],
        invalidMinFileSize: [{ type: core_1.Input }],
        pause: [{ type: core_1.Input }],
        remove: [{ type: core_1.Input }],
        resume: [{ type: core_1.Input }],
        retry: [{ type: core_1.Input }],
        select: [{ type: core_1.Input }],
        uploadSelectedFiles: [{ type: core_1.Input }]
    };
    return Messages;
}(kendo_angular_l10n_1.ComponentMessages));
exports.Messages = Messages;
