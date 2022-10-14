/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var types_1 = require("../types");
var file_list_item_base_1 = require("./file-list-item-base");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var upload_service_1 = require("../upload.service");
var util_1 = require("../common/util");
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
            var showProgress = this.files[0].state === types_1.FileState.Uploading || this.files[0].state === types_1.FileState.Paused;
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
        if (!util_1.isPresent(errors)) {
            return this.getTotalFilesSizeMessage([file]);
        }
        return this.getFileValidationMessage(file);
    };
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "batchStatusText", {
        get: function () {
            var state = this.files[0].state;
            var fileCount = this.files.length;
            if (state === types_1.FileState.Uploaded) {
                return fileCount + " " + this.textFor('filesBatchStatusUploaded');
            }
            if (state === types_1.FileState.Failed) {
                return fileCount + " " + this.textFor('filesBatchStatusFailed');
            }
            return fileCount + " " + this.textFor('filesBatchStatus');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "isUploadSuccessful", {
        get: function () {
            return this.files[0].state === types_1.FileState.Uploaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "isUploadFailed", {
        get: function () {
            return this.files[0].state === types_1.FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    FileListMultipleItemsComponent.decorators = [
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('progressState', [
                            animations_1.state('active', animations_1.style({ opacity: 1 })),
                            animations_1.state('inactive', animations_1.style({ opacity: 0 })),
                            animations_1.transition('void => active', animations_1.style({ opacity: 0 })),
                            animations_1.transition('inactive => active', animations_1.style({ opacity: 1 })),
                            animations_1.transition('active => inactive', animations_1.animate('1s 2s ease-out'))
                        ])
                    ],
                    selector: 'kendo-upload-file-list-multiple-items',
                    template: "\n      <div class=\"k-progressbar\" [@progressState]=\"showProgress\">\n        <span class=\"k-progress\" [style.width]=\"progressComplete + '%'\"></span>\n      </div>\n      <span class=\"k-multiple-files-group-wrapper\">\n        <span class=\"k-file-group k-icon k-i-copy\"></span>\n      </span>\n      <span class=\"k-multiple-files-wrapper\">\n        <span *ngFor=\"let file of files\" class=\"k-file-name-size-wrapper\">\n            <span [title]=\"file.name\" class=\"k-file-name\">\n                {{file.name}}\n            </span>\n            <span [ngClass]=\"{\n                    'k-text-error': file.validationErrors,\n                    'k-file-validation-message': file.validationErrors,\n                    'k-file-size': !file.validationErrors\n                  }\"\n            >{{fileStatusText(file)}}</span>\n        </span>\n        <span class=\"k-file-information\"\n          [ngClass]=\"{\n            'k-text-success': isUploadSuccessful,\n            'k-text-error': isUploadFailed\n          }\"\n        >{{batchStatusText}}</span>\n      </span>\n      <kendo-upload-file-list-item-action-button\n        [file]='files[0]'\n        [disabled]='disabled'\n        [progress]='progressComplete'>\n      </kendo-upload-file-list-item-action-button>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListMultipleItemsComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: upload_service_1.UploadService }
    ]; };
    FileListMultipleItemsComponent.propDecorators = {
        disabled: [{ type: core_1.Input }],
        files: [{ type: core_1.Input }]
    };
    return FileListMultipleItemsComponent;
}(file_list_item_base_1.FileListItemBase));
exports.FileListMultipleItemsComponent = FileListMultipleItemsComponent;
