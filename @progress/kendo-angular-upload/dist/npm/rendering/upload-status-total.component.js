/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var file_map_1 = require("../types/file-map");
var types_1 = require("../types");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var UploadStatusTotalComponent = /** @class */ (function () {
    function UploadStatusTotalComponent(localization) {
        this.localization = localization;
    }
    UploadStatusTotalComponent.prototype.ngDoCheck = function () {
        this.isPaused = this.fileList.hasFileWithState([types_1.FileState.Paused]);
        this.isFailed = this.fileList.hasFileWithState([types_1.FileState.Failed]);
        this.isUploading = this.fileList.hasFileWithState([types_1.FileState.Uploading]);
        if (this.isPaused && !this.isUploading) {
            this.statusText = this.localization.get('headerStatusPaused');
        }
        else {
            this.statusText = this.isUploading ? this.localization.get('headerStatusUploading')
                : this.localization.get('headerStatusUploaded');
        }
    };
    UploadStatusTotalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-upload-status-total',
                    template: "\n        <span class=\"k-icon\"\n            [ngClass]=\"{\n                'k-i-checkmark': !this.isUploading && !this.isFailed,\n                'k-i-exception': !this.isUploading && this.isFailed,\n                'k-i-upload': this.isUploading,\n                'k-i-pause-sm': this.isPaused\n            }\">\n        </span>\n        {{statusText}}\n    "
                },] },
    ];
    /** @nocollapse */
    UploadStatusTotalComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    UploadStatusTotalComponent.propDecorators = {
        fileList: [{ type: core_1.Input }]
    };
    return UploadStatusTotalComponent;
}());
exports.UploadStatusTotalComponent = UploadStatusTotalComponent;
