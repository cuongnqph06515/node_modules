/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { fileHasValidationErrors, filesHaveValidationErrors, getTotalFilesSizeMessage } from '../common/util';
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
        return fileHasValidationErrors(file);
    };
    FileListItemBase.prototype.filesHaveValidationErrors = function (files) {
        return filesHaveValidationErrors(files);
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
        return getTotalFilesSizeMessage(files);
    };
    FileListItemBase.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    return FileListItemBase;
}());
export { FileListItemBase };
