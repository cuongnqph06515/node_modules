/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FileState } from '../types';
import { FileListItemBase } from './file-list-item-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { UploadService } from '../upload.service';
import { getFileGroupCssClass, isPresent } from '../common/util';
/**
 * @hidden
 */
export class FileListSingleItemComponent extends FileListItemBase {
    constructor(localization, uploadService) {
        super(uploadService);
        this.localization = localization;
        this.subscribeUploadProgress((args) => {
            if (args.files[0].uid === this.file.uid) {
                this.progressComplete = args.percentComplete;
            }
        });
    }
    get fileStatusText() {
        const errors = this.file.validationErrors;
        if (this.file.state === FileState.Uploaded) {
            return `${this.textFor('fileStatusUploaded')}`;
        }
        if (this.file.state === FileState.Failed) {
            return `${this.textFor('fileStatusFailed')}`;
        }
        if (!isPresent(errors)) {
            return this.getTotalFilesSizeMessage([this.file]);
        }
        return this.getFileValidationMessage(this.file);
    }
    get showProgress() {
        const showProgress = this.file.state === FileState.Uploading || this.file.state === FileState.Paused;
        return showProgress ? 'active' : 'inactive';
    }
    get fileGroupClass() {
        return getFileGroupCssClass(this.file.extension ? this.file.extension : '');
    }
    get isUploadSuccessful() {
        return this.file.state === FileState.Uploaded;
    }
    get isUploadFailed() {
        return this.file.state === FileState.Failed;
    }
    get isNotYetUploaded() {
        return !this.isUploadFailed && !this.isUploadSuccessful;
    }
}
FileListSingleItemComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('progressState', [
                        state('active', style({ opacity: 1 })),
                        state('inactive', style({ opacity: 0 })),
                        transition('void => active', style({ opacity: 0 })),
                        transition('inactive => active', style({ opacity: 1 })),
                        transition('active => inactive', animate('1s 2s ease-out'))
                    ])
                ],
                selector: 'kendo-upload-file-list-single-item',
                template: `
      <div class="k-progressbar" [@progressState]="showProgress">
        <span class="k-progress" [style.width]="progressComplete + '%'"></span>
      </div>
      <span class="k-file-group-wrapper">
        <span class="k-file-group k-icon" [ngClass]="fileGroupClass"></span>
      </span>
      <span class="k-file-name-size-wrapper">
        <span class="k-file-name" [title]="file.name">{{ file.name }}</span>
        <span [ngClass]="{
                'k-file-validation-message': file.validationErrors,
                'k-file-size': !file.validationErrors && isNotYetUploaded,
                'k-text-success': isUploadSuccessful,
                'k-text-error': file.validationErrors || isUploadFailed,
                'k-file-information': isUploadSuccessful || isUploadFailed
              }"
        >{{fileStatusText}}</span>
      </span>
      <kendo-upload-file-list-item-action-button
        [file]='file'
        [disabled]='disabled'
        [progress]='progressComplete'>
      </kendo-upload-file-list-item-action-button>
    `
            },] },
];
/** @nocollapse */
FileListSingleItemComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: UploadService }
];
FileListSingleItemComponent.propDecorators = {
    disabled: [{ type: Input }],
    file: [{ type: Input }]
};
