/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../common/util");
/**
 * @hidden
 */
var FileListItemBase = /** @class */ (function () {
    function FileListItemBase(uploadService) {
        this.uploadService = uploadService;
        this.progressComplete = 0;
    }
    FileListItemBase.prototype.subscribeUploadProgress = function (uploadProgressHandler) {
        this.uploadProgressSubscription = this.uploadService.uploadProgressEvent.subscribe(uploadProgressHandler);
    };
    FileListItemBase.prototype.fileHasValidationErrors = function (file) {
        return util_1.fileHasValidationErrors(file);
    };
    FileListItemBase.prototype.filesHaveValidationErrors = function (files) {
        return util_1.filesHaveValidationErrors(files);
    };
    FileListItemBase.prototype.ngOnDestroy = function () {
        this.uploadProgressSubscription.unsubscribe();
    };
    FileListItemBase.prototype.getFileValidationMessage = function (file) {
        var validationMessage;
        if (file.validationErrors && file.validationErrors.length > 0) {
            validationMessage = this.localization.get(file.validationErrors[0]);
        }
        return validationMessage;
    };
    FileListItemBase.prototype.getTotalFilesSizeMessage = function (files) {
        return util_1.getTotalFilesSizeMessage(files);
    };
    FileListItemBase.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    return FileListItemBase;
}());
exports.FileListItemBase = FileListItemBase;
