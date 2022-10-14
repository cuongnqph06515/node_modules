/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var FileListMultipleItemsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FileListMultipleItemsComponent, _super);
    function FileListMultipleItemsComponent(localization, uploadService) {
        var _this = _super.call(this, uploadService) || this;
        _this.localization = localization;
        _this.subscribeUploadProgress(function (args) {
            if (args.files[0].uid === _this.files[0].uid) {
                _this.progressComplete = args.percentComplete;
            }
        });
        return _this;
    }
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "showProgress", {
        get: function () {
            var showProgress = this.files[0].state === FileState.Uploading || this.files[0].state === FileState.Paused;
            return showProgress ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    FileListMultipleItemsComponent.prototype.ngOnInit = function () {
        this.filesHaveErrors = _super.prototype.filesHaveValidationErrors.call(this, this.files);
    };
    FileListMultipleItemsComponent.prototype.fileStatusText = function (file) {
        var errors = file.validationErrors;
        if (!isPresent(errors)) {
            return this.getTotalFilesSizeMessage([file]);
        }
        return this.getFileValidationMessage(file);
    };
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "batchStatusText", {
        get: function () {
            var state = this.files[0].state;
            var fileCount = this.files.length;
            if (state === FileState.Uploaded) {
                return fileCount + " " + this.textFor('filesBatchStatusUploaded');
            }
            if (state === FileState.Failed) {
                return fileCount + " " + this.textFor('filesBatchStatusFailed');
            }
            return fileCount + " " + this.textFor('filesBatchStatus');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "isUploadSuccessful", {
        get: function () {
            return this.files[0].state === FileState.Uploaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "isUploadFailed", {
        get: function () {
            return this.files[0].state === FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n      <div class=\"k-progressbar\" [@progressState]=\"showProgress\">\n        <span class=\"k-progress\" [style.width]=\"progressComplete + '%'\"></span>\n      </div>\n      <span class=\"k-multiple-files-group-wrapper\">\n        <span class=\"k-file-group k-icon k-i-copy\"></span>\n      </span>\n      <span class=\"k-multiple-files-wrapper\">\n        <span *ngFor=\"let file of files\" class=\"k-file-name-size-wrapper\">\n            <span [title]=\"file.name\" class=\"k-file-name\">\n                {{file.name}}\n            </span>\n            <span [ngClass]=\"{\n                    'k-text-error': file.validationErrors,\n                    'k-file-validation-message': file.validationErrors,\n                    'k-file-size': !file.validationErrors\n                  }\"\n            >{{fileStatusText(file)}}</span>\n        </span>\n        <span class=\"k-file-information\"\n          [ngClass]=\"{\n            'k-text-success': isUploadSuccessful,\n            'k-text-error': isUploadFailed\n          }\"\n        >{{batchStatusText}}</span>\n      </span>\n      <kendo-upload-file-list-item-action-button\n        [file]='files[0]'\n        [disabled]='disabled'\n        [progress]='progressComplete'>\n      </kendo-upload-file-list-item-action-button>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListMultipleItemsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: UploadService }
    ]; };
    FileListMultipleItemsComponent.propDecorators = {
        disabled: [{ type: Input }],
        files: [{ type: Input }]
    };
    return FileListMultipleItemsComponent;
}(FileListItemBase));
export { FileListMultipleItemsComponent };
