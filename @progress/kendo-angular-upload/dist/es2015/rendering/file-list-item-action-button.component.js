/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, Component } from '@angular/core';
import { FileState } from '../types';
import { UploadService } from '../upload.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class FileListItemActionButtonComponent {
    constructor(uploadService, localization) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.actionFocused = false;
        this.retryFocused = false;
        this.pauseResumeFocused = false;
    }
    onFocus(type) {
        if (type === 'action') {
            this.actionFocused = true;
        }
        if (type === 'retry') {
            this.retryFocused = true;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = true;
        }
    }
    onBlur(type) {
        if (type === 'retry') {
            this.retryFocused = false;
        }
        if (type === 'action') {
            this.actionFocused = false;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = false;
        }
    }
    onRetryClick() {
        if (this.disabled) {
            return;
        }
        this.uploadService.retryFiles(this.file.uid);
    }
    onRemoveCancelClick() {
        if (this.disabled) {
            return;
        }
        const uid = this.file.uid;
        if (this.file.state === FileState.Uploading) {
            this.uploadService.cancelFiles(uid);
        }
        else {
            this.uploadService.removeFiles(uid);
        }
    }
    onPauseResumeClick() {
        if (this.disabled) {
            return;
        }
        const uid = this.file.uid;
        if (this.file.state === FileState.Paused) {
            this.uploadService.resumeFile(uid);
        }
        else {
            this.uploadService.pauseFile(uid);
        }
    }
    get actionButtonTitle() {
        if (this.file.state === FileState.Uploading) {
            return this.localization.get('cancel');
        }
        return this.localization.get('remove');
    }
    get retryButtonTitle() {
        return this.localization.get('retry');
    }
    get pauseResumeButtonTitle() {
        if (this.file.state === FileState.Uploading) {
            return this.localization.get('pause');
        }
        return this.localization.get('resume');
    }
    get isUploading() {
        return this.file.state === FileState.Uploading;
    }
    get isFailed() {
        return this.file.state === FileState.Failed;
    }
    get isPaused() {
        return this.file.state === FileState.Paused;
    }
    get isResumable() {
        const service = this.uploadService;
        const isResumable = service.async.chunk && service.chunk.resumable;
        const isUploading = (this.file.state === FileState.Paused) || (this.file.state === FileState.Uploading);
        return isResumable && isUploading;
    }
    get isActionButtonVisible() {
        if ((this.file.state === FileState.Uploaded || this.file.state === FileState.Initial) &&
            !this.uploadService.async.removeUrl && this.uploadService.component === 'Upload') {
            return false;
        }
        return true;
    }
}
FileListItemActionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-upload-file-list-item-action-button',
                template: `
      <strong class="k-upload-status">
        <span class="k-upload-pct" *ngIf="isUploading || isPaused">{{progress}}%</span>

        <button type="button" *ngIf="isFailed" class="k-button k-button-icon k-flat k-upload-action"
          [ngClass]="{ 'k-state-focused': this.retryFocused }"
          [attr.tabIndex]="-1"
          (focus)="onFocus('retry')"
          (blur)="onBlur('retry')"
          (click)="onRetryClick()">
          <span class="k-icon k-retry k-i-refresh-sm"
            [attr.aria-label]="retryButtonTitle"
            [attr.title]="retryButtonTitle">
          </span>
        </button>

        <button *ngIf="isResumable" type="button" class="k-button k-button-icon k-flat k-upload-action"
          [ngClass]="{ 'k-state-focused': this.pauseResumeFocused }"
          [attr.tabIndex]="-1"
          (focus)="onFocus('pauseResume')"
          (blur)="onBlur('pauseResume')"
          (click)="onPauseResumeClick()">
          <span class="k-icon"
            [ngClass]="{
              'k-i-play-sm': isPaused,
              'k-i-pause-sm': !isPaused
            }"
            [attr.aria-label]='pauseResumeButtonTitle'
            [attr.title]='pauseResumeButtonTitle'>
          </span>
        </button>

        <button type="button" *ngIf="isActionButtonVisible" class="k-button k-button-icon k-flat k-upload-action"
          [ngClass]="{ 'k-state-focused': this.actionFocused }"
          [attr.tabIndex]="-1"
          (focus)="onFocus('action')"
          (blur)="onBlur('action')"
          (click)="onRemoveCancelClick()">
          <span class="k-icon"
            [ngClass]="{
              'k-i-cancel': isUploading,
              'k-delete k-i-x': !isUploading
            }"
            [attr.aria-label]='actionButtonTitle'
            [attr.title]='actionButtonTitle'>
          </span>
        </button>
      </strong>
    `
            },] },
];
/** @nocollapse */
FileListItemActionButtonComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService }
];
FileListItemActionButtonComponent.propDecorators = {
    file: [{ type: Input }],
    disabled: [{ type: Input }],
    progress: [{ type: Input }]
};
