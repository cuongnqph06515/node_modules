/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var types_1 = require("../types");
var upload_service_1 = require("../upload.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var FileListItemActionButtonComponent = /** @class */ (function () {
    function FileListItemActionButtonComponent(uploadService, localization) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.actionFocused = false;
        this.retryFocused = false;
        this.pauseResumeFocused = false;
    }
    FileListItemActionButtonComponent.prototype.onFocus = function (type) {
        if (type === 'action') {
            this.actionFocused = true;
        }
        if (type === 'retry') {
            this.retryFocused = true;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = true;
        }
    };
    FileListItemActionButtonComponent.prototype.onBlur = function (type) {
        if (type === 'retry') {
            this.retryFocused = false;
        }
        if (type === 'action') {
            this.actionFocused = false;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = false;
        }
    };
    FileListItemActionButtonComponent.prototype.onRetryClick = function () {
        if (this.disabled) {
            return;
        }
        this.uploadService.retryFiles(this.file.uid);
    };
    FileListItemActionButtonComponent.prototype.onRemoveCancelClick = function () {
        if (this.disabled) {
            return;
        }
        var uid = this.file.uid;
        if (this.file.state === types_1.FileState.Uploading) {
            this.uploadService.cancelFiles(uid);
        }
        else {
            this.uploadService.removeFiles(uid);
        }
    };
    FileListItemActionButtonComponent.prototype.onPauseResumeClick = function () {
        if (this.disabled) {
            return;
        }
        var uid = this.file.uid;
        if (this.file.state === types_1.FileState.Paused) {
            this.uploadService.resumeFile(uid);
        }
        else {
            this.uploadService.pauseFile(uid);
        }
    };
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "actionButtonTitle", {
        get: function () {
            if (this.file.state === types_1.FileState.Uploading) {
                return this.localization.get('cancel');
            }
            return this.localization.get('remove');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "retryButtonTitle", {
        get: function () {
            return this.localization.get('retry');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "pauseResumeButtonTitle", {
        get: function () {
            if (this.file.state === types_1.FileState.Uploading) {
                return this.localization.get('pause');
            }
            return this.localization.get('resume');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isUploading", {
        get: function () {
            return this.file.state === types_1.FileState.Uploading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isFailed", {
        get: function () {
            return this.file.state === types_1.FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isPaused", {
        get: function () {
            return this.file.state === types_1.FileState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isResumable", {
        get: function () {
            var service = this.uploadService;
            var isResumable = service.async.chunk && service.chunk.resumable;
            var isUploading = (this.file.state === types_1.FileState.Paused) || (this.file.state === types_1.FileState.Uploading);
            return isResumable && isUploading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isActionButtonVisible", {
        get: function () {
            if ((this.file.state === types_1.FileState.Uploaded || this.file.state === types_1.FileState.Initial) &&
                !this.uploadService.async.removeUrl && this.uploadService.component === 'Upload') {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    FileListItemActionButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-upload-file-list-item-action-button',
                    template: "\n      <strong class=\"k-upload-status\">\n        <span class=\"k-upload-pct\" *ngIf=\"isUploading || isPaused\">{{progress}}%</span>\n\n        <button type=\"button\" *ngIf=\"isFailed\" class=\"k-button k-button-icon k-flat k-upload-action\"\n          [ngClass]=\"{ 'k-state-focused': this.retryFocused }\"\n          [attr.tabIndex]=\"-1\"\n          (focus)=\"onFocus('retry')\"\n          (blur)=\"onBlur('retry')\"\n          (click)=\"onRetryClick()\">\n          <span class=\"k-icon k-retry k-i-refresh-sm\"\n            [attr.aria-label]=\"retryButtonTitle\"\n            [attr.title]=\"retryButtonTitle\">\n          </span>\n        </button>\n\n        <button *ngIf=\"isResumable\" type=\"button\" class=\"k-button k-button-icon k-flat k-upload-action\"\n          [ngClass]=\"{ 'k-state-focused': this.pauseResumeFocused }\"\n          [attr.tabIndex]=\"-1\"\n          (focus)=\"onFocus('pauseResume')\"\n          (blur)=\"onBlur('pauseResume')\"\n          (click)=\"onPauseResumeClick()\">\n          <span class=\"k-icon\"\n            [ngClass]=\"{\n              'k-i-play-sm': isPaused,\n              'k-i-pause-sm': !isPaused\n            }\"\n            [attr.aria-label]='pauseResumeButtonTitle'\n            [attr.title]='pauseResumeButtonTitle'>\n          </span>\n        </button>\n\n        <button type=\"button\" *ngIf=\"isActionButtonVisible\" class=\"k-button k-button-icon k-flat k-upload-action\"\n          [ngClass]=\"{ 'k-state-focused': this.actionFocused }\"\n          [attr.tabIndex]=\"-1\"\n          (focus)=\"onFocus('action')\"\n          (blur)=\"onBlur('action')\"\n          (click)=\"onRemoveCancelClick()\">\n          <span class=\"k-icon\"\n            [ngClass]=\"{\n              'k-i-cancel': isUploading,\n              'k-delete k-i-x': !isUploading\n            }\"\n            [attr.aria-label]='actionButtonTitle'\n            [attr.title]='actionButtonTitle'>\n          </span>\n        </button>\n      </strong>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListItemActionButtonComponent.ctorParameters = function () { return [
        { type: upload_service_1.UploadService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    FileListItemActionButtonComponent.propDecorators = {
        file: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        progress: [{ type: core_1.Input }]
    };
    return FileListItemActionButtonComponent;
}());
exports.FileListItemActionButtonComponent = FileListItemActionButtonComponent;
