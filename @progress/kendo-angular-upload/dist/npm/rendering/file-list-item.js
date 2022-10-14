/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var types_1 = require("../types");
var navigation_service_1 = require("../navigation.service");
var util_1 = require("../common/util");
var upload_service_1 = require("../upload.service");
/**
 * @hidden
 */
var FileListItemDirective = /** @class */ (function () {
    function FileListItemDirective(el, navigationService, uploadService) {
        this.navigationService = navigationService;
        this.uploadService = uploadService;
        this.fileClass = true;
        this.focused = false;
        this.element = el;
    }
    FileListItemDirective.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    Object.defineProperty(FileListItemDirective.prototype, "uidAttribute", {
        get: function () {
            return this.files[0].uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "tabIndex", {
        get: function () {
            return "-1";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileError", {
        get: function () {
            return this.files[0].state === types_1.FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileInvalid", {
        get: function () {
            return util_1.filesHaveValidationErrors(this.files);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileProgress", {
        get: function () {
            return this.files[0].state === types_1.FileState.Uploading ||
                this.files[0].state === types_1.FileState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileSuccess", {
        get: function () {
            if (this.uploadService.component === 'Upload') {
                return this.files[0].state === types_1.FileState.Uploaded ||
                    this.files[0].state === types_1.FileState.Initial;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kStateFocused", {
        get: function () {
            return this.focused;
        },
        enumerable: true,
        configurable: true
    });
    FileListItemDirective.prototype.onFocus = function () {
        this.focused = true;
    };
    FileListItemDirective.prototype.onBlur = function () {
        this.focused = false;
    };
    FileListItemDirective.prototype.onClick = function (event) {
        if (!util_1.isFocusable(event.target) && !util_1.hasClasses(event.target, util_1.IGNORE_TARGET_CLASSES)) {
            this.navigationService.focusedIndex = this.index;
        }
    };
    FileListItemDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoUploadFileListItem]'
                },] },
    ];
    /** @nocollapse */
    FileListItemDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: navigation_service_1.NavigationService },
        { type: upload_service_1.UploadService }
    ]; };
    FileListItemDirective.propDecorators = {
        files: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        fileClass: [{ type: core_1.HostBinding, args: ['class.k-file',] }],
        uidAttribute: [{ type: core_1.HostBinding, args: ['attr.data-uid',] }],
        tabIndex: [{ type: core_1.HostBinding, args: ['attr.tabIndex',] }],
        kFileError: [{ type: core_1.HostBinding, args: ['class.k-file-error',] }],
        kFileInvalid: [{ type: core_1.HostBinding, args: ['class.k-file-invalid',] }],
        kFileProgress: [{ type: core_1.HostBinding, args: ['class.k-file-progress',] }],
        kFileSuccess: [{ type: core_1.HostBinding, args: ['class.k-file-success',] }],
        kStateFocused: [{ type: core_1.HostBinding, args: ['class.k-state-focused',] }],
        onFocus: [{ type: core_1.HostListener, args: ["focus",] }],
        onBlur: [{ type: core_1.HostListener, args: ["blur",] }],
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return FileListItemDirective;
}());
exports.FileListItemDirective = FileListItemDirective;
