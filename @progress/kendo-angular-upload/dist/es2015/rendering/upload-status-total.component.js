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
export class UploadStatusTotalComponent {
    constructor(localization) {
        this.localization = localization;
    }
    ngDoCheck() {
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
    }
}
UploadStatusTotalComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-upload-status-total',
                template: `
        <span class="k-icon"
            [ngClass]="{
                'k-i-checkmark': !this.isUploading && !this.isFailed,
                'k-i-exception': !this.isUploading && this.isFailed,
                'k-i-upload': this.isUploading,
                'k-i-pause-sm': this.isPaused
            }">
        </span>
        {{statusText}}
    `
            },] },
];
/** @nocollapse */
UploadStatusTotalComponent.ctorParameters = () => [
    { type: LocalizationService }
];
UploadStatusTotalComponent.propDecorators = {
    fileList: [{ type: Input }]
};
