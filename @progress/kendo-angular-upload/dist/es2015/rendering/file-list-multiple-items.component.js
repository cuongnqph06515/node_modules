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
import { isPresent } from '../common/util';
/**
 * @hidden
 */
export class FileListMultipleItemsComponent extends FileListItemBase {
    constructor(localization, uploadService) {
        super(uploadService);
        this.localization = localization;
        this.subscribeUploadProgress((args) => {
            if (args.files[0].uid === this.files[0].uid) {
                this.progressComplete = args.percentComplete;
            }
        });
    }
    get showProgress() {
        const showProgress = this.files[0].state === FileState.Uploading || this.files[0].state === FileState.Paused;
        return showProgress ? 'active' : 'inactive';
    }
    ngOnInit() {
        this.filesHaveErrors = super.filesHaveValidationErrors(this.files);
    }
    fileStatusText(file) {
        const errors = file.validationErrors;
        if (!isPresent(errors)) {
            return this.getTotalFilesSizeMessage([file]);
        }
        return this.getFileValidationMessage(file);
    }
    get batchStatusText() {
        const state = this.files[0].state;
        const fileCount = this.files.length;
        if (state === FileState.Uploaded) {
            return `${fileCount} ${this.textFor('filesBatchStatusUploaded')}`;
        }
        if (state === FileState.Failed) {
            return `${fileCount} ${this.textFor('filesBatchStatusFailed')}`;
        }
        return `${fileCount} ${this.textFor('filesBatchStatus')}`;
    }
    get isUploadSuccessful() {
        return this.files[0].state === FileState.Uploaded;
    }
    get isUploadFailed() {
        return this.files[0].state === FileState.Failed;
    }
}
FileListMultipleItemsComponent.decorators = [
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
                selector: 'kendo-upload-file-list-multiple-items',
                template: `
      <div class="k-progressbar" [@progressState]="showProgress">
        <span class="k-progress" [style.width]="progressComplete + '%'"></span>
      </div>
      <span class="k-multiple-files-group-wrapper">
        <span class="k-file-group k-icon k-i-copy"></span>
      </span>
      <span class="k-multiple-files-wrapper">
        <span *ngFor="let file of files" class="k-file-name-size-wrapper">
            <span [title]="file.name" class="k-file-name">
                {{file.name}}
            </span>
            <span [ngClass]="{
                    'k-text-error': file.validationErrors,
                    'k-file-validation-message': file.validationErrors,
                    'k-file-size': !file.validationErrors
                  }"
            >{{fileStatusText(file)}}</span>
        </span>
        <span class="k-file-information"
          [ngClass]="{
            'k-text-success': isUploadSuccessful,
            'k-text-error': isUploadFailed
          }"
        >{{batchStatusText}}</span>
      </span>
      <kendo-upload-file-list-item-action-button
        [file]='files[0]'
        [disabled]='disabled'
        [progress]='progressComplete'>
      </kendo-upload-file-list-item-action-button>
    `
            },] },
];
/** @nocollapse */
FileListMultipleItemsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: UploadService }
];
FileListMultipleItemsComponent.propDecorators = {
    disabled: [{ type: Input }],
    files: [{ type: Input }]
};
