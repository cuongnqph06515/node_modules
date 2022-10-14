/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { fileHasValidationErrors, filesHaveValidationErrors, getTotalFilesSizeMessage } from '../common/util';
/**
 * @hidden
 */
export class FileListItemBase {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.progressComplete = 0;
    }
    subscribeUploadProgress(uploadProgressHandler) {
        this.uploadProgressSubscription = this.uploadService.uploadProgressEvent.subscribe(uploadProgressHandler);
    }
    fileHasValidationErrors(file) {
        return fileHasValidationErrors(file);
    }
    filesHaveValidationErrors(files) {
        return filesHaveValidationErrors(files);
    }
    ngOnDestroy() {
        this.uploadProgressSubscription.unsubscribe();
    }
    getFileValidationMessage(file) {
        let validationMessage;
        if (file.validationErrors && file.validationErrors.length > 0) {
            validationMessage = this.localization.get(file.validationErrors[0]);
        }
        return validationMessage;
    }
    getTotalFilesSizeMessage(files) {
        return getTotalFilesSizeMessage(files);
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
