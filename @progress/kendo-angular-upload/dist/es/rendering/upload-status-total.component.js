/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FileMap } from '../types/file-map';
import { FileState } from '../types';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var UploadStatusTotalComponent = /** @class */ (function () {
    function UploadStatusTotalComponent(localization) {
        this.localization = localization;
    }
    UploadStatusTotalComponent.prototype.ngDoCheck = function () {
        this.isPaused = this.fileList.hasFileWithState([FileState.Paused]);
        this.isFailed = this.fileList.hasFileWithState([FileState.Failed]);
        this.isUploading = this.fileList.hasFileWithState([FileState.Uploading]);
        if (this.isPaused && !this.isUploading) {
            this.statusText = this.localization.get('headerStatusPaused');
        }
        else {
            this.statusText = this.isUploading ? this.localization.get('headerStatusUploading')
                : this.localization.get('headerStatusUploaded');
        }
    };
    UploadStatusTotalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-upload-status-total',
                    template: "\n        <span class=\"k-icon\"\n            [ngClass]=\"{\n                'k-i-checkmark': !this.isUploading && !this.isFailed,\n                'k-i-exception': !this.isUploading && this.isFailed,\n                'k-i-upload': this.isUploading,\n                'k-i-pause-sm': this.isPaused\n            }\">\n        </span>\n        {{statusText}}\n    "
                },] },
    ];
    /** @nocollapse */
    UploadStatusTotalComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    UploadStatusTotalComponent.propDecorators = {
        fileList: [{ type: Input }]
    };
    return UploadStatusTotalComponent;
}());
export { UploadStatusTotalComponent };
