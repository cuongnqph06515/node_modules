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
var FileListSingleItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FileListSingleItemComponent, _super);
    function FileListSingleItemComponent(localization, uploadService) {
        var _this = _super.call(this, uploadService) || this;
        _this.localization = localization;
        _this.subscribeUploadProgress(function (args) {
            if (args.files[0].uid === _this.file.uid) {
                _this.progressComplete = args.percentComplete;
            }
        });
        return _this;
    }
    Object.defineProperty(FileListSingleItemComponent.prototype, "fileStatusText", {
        get: function () {
            var errors = this.file.validationErrors;
            if (this.file.state === types_1.FileState.Uploaded) {
                return "" + this.textFor('fileStatusUploaded');
            }
            if (this.file.state === types_1.FileState.Failed) {
                return "" + this.textFor('fileStatusFailed');
            }
            if (!util_1.isPresent(errors)) {
                return this.getTotalFilesSizeMessage([this.file]);
            }
            return this.getFileValidationMessage(this.file);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "showProgress", {
        get: function () {
            var showProgress = this.file.state === types_1.FileState.Uploading || this.file.state === types_1.FileState.Paused;
            return showProgress ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "fileGroupClass", {
        get: function () {
            return util_1.getFileGroupCssClass(this.file.extension ? this.file.extension : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isUploadSuccessful", {
        get: function () {
            return this.file.state === types_1.FileState.Uploaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isUploadFailed", {
        get: function () {
            return this.file.state === types_1.FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isNotYetUploaded", {
        get: function () {
            return !this.isUploadFailed && !this.isUploadSuccessful;
        },
        enumerable: true,
        configurable: true
    });
    FileListSingleItemComponent.decorators = [
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
                    selector: 'kendo-upload-file-list-single-item',
                    template: "\n      <div class=\"k-progressbar\" [@progressState]=\"showProgress\">\n        <span class=\"k-progress\" [style.width]=\"progressComplete + '%'\"></span>\n      </div>\n      <span class=\"k-file-group-wrapper\">\n        <span class=\"k-file-group k-icon\" [ngClass]=\"fileGroupClass\"></span>\n      </span>\n      <span class=\"k-file-name-size-wrapper\">\n        <span class=\"k-file-name\" [title]=\"file.name\">{{ file.name }}</span>\n        <span [ngClass]=\"{\n                'k-file-validation-message': file.validationErrors,\n                'k-file-size': !file.validationErrors && isNotYetUploaded,\n                'k-text-success': isUploadSuccessful,\n                'k-text-error': file.validationErrors || isUploadFailed,\n                'k-file-information': isUploadSuccessful || isUploadFailed\n              }\"\n        >{{fileStatusText}}</span>\n      </span>\n      <kendo-upload-file-list-item-action-button\n        [file]='file'\n        [disabled]='disabled'\n        [progress]='progressComplete'>\n      </kendo-upload-file-list-item-action-button>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListSingleItemComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: upload_service_1.UploadService }
    ]; };
    FileListSingleItemComponent.propDecorators = {
        disabled: [{ type: core_1.Input }],
        file: [{ type: core_1.Input }]
    };
    return FileListSingleItemComponent;
}(file_list_item_base_1.FileListItemBase));
exports.FileListSingleItemComponent = FileListSingleItemComponent;
