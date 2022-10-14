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
import { getFileGroupCssClass, isPresent } from '../common/util';
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
            if (this.file.state === FileState.Uploaded) {
                return "" + this.textFor('fileStatusUploaded');
            }
            if (this.file.state === FileState.Failed) {
                return "" + this.textFor('fileStatusFailed');
            }
            if (!isPresent(errors)) {
                return this.getTotalFilesSizeMessage([this.file]);
            }
            return this.getFileValidationMessage(this.file);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "showProgress", {
        get: function () {
            var showProgress = this.file.state === FileState.Uploading || this.file.state === FileState.Paused;
            return showProgress ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "fileGroupClass", {
        get: function () {
            return getFileGroupCssClass(this.file.extension ? this.file.extension : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isUploadSuccessful", {
        get: function () {
            return this.file.state === FileState.Uploaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isUploadFailed", {
        get: function () {
            return this.file.state === FileState.Failed;
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
                    template: "\n      <div class=\"k-progressbar\" [@progressState]=\"showProgress\">\n        <span class=\"k-progress\" [style.width]=\"progressComplete + '%'\"></span>\n      </div>\n      <span class=\"k-file-group-wrapper\">\n        <span class=\"k-file-group k-icon\" [ngClass]=\"fileGroupClass\"></span>\n      </span>\n      <span class=\"k-file-name-size-wrapper\">\n        <span class=\"k-file-name\" [title]=\"file.name\">{{ file.name }}</span>\n        <span [ngClass]=\"{\n                'k-file-validation-message': file.validationErrors,\n                'k-file-size': !file.validationErrors && isNotYetUploaded,\n                'k-text-success': isUploadSuccessful,\n                'k-text-error': file.validationErrors || isUploadFailed,\n                'k-file-information': isUploadSuccessful || isUploadFailed\n              }\"\n        >{{fileStatusText}}</span>\n      </span>\n      <kendo-upload-file-list-item-action-button\n        [file]='file'\n        [disabled]='disabled'\n        [progress]='progressComplete'>\n      </kendo-upload-file-list-item-action-button>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListSingleItemComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: UploadService }
    ]; };
    FileListSingleItemComponent.propDecorators = {
        disabled: [{ type: Input }],
        file: [{ type: Input }]
    };
    return FileListSingleItemComponent;
}(FileListItemBase));
export { FileListSingleItemComponent };
