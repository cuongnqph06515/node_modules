/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { FileState } from '../types';
import { NavigationService } from '../navigation.service';
import { filesHaveValidationErrors, hasClasses, IGNORE_TARGET_CLASSES, isFocusable } from '../common/util';
import { UploadService } from '../upload.service';
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
            return this.files[0].state === FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileInvalid", {
        get: function () {
            return filesHaveValidationErrors(this.files);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileProgress", {
        get: function () {
            return this.files[0].state === FileState.Uploading ||
                this.files[0].state === FileState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileSuccess", {
        get: function () {
            if (this.uploadService.component === 'Upload') {
                return this.files[0].state === FileState.Uploaded ||
                    this.files[0].state === FileState.Initial;
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
        if (!isFocusable(event.target) && !hasClasses(event.target, IGNORE_TARGET_CLASSES)) {
            this.navigationService.focusedIndex = this.index;
        }
    };
    FileListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoUploadFileListItem]'
                },] },
    ];
    /** @nocollapse */
    FileListItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NavigationService },
        { type: UploadService }
    ]; };
    FileListItemDirective.propDecorators = {
        files: [{ type: Input }],
        index: [{ type: Input }],
        fileClass: [{ type: HostBinding, args: ['class.k-file',] }],
        uidAttribute: [{ type: HostBinding, args: ['attr.data-uid',] }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
        kFileError: [{ type: HostBinding, args: ['class.k-file-error',] }],
        kFileInvalid: [{ type: HostBinding, args: ['class.k-file-invalid',] }],
        kFileProgress: [{ type: HostBinding, args: ['class.k-file-progress',] }],
        kFileSuccess: [{ type: HostBinding, args: ['class.k-file-success',] }],
        kStateFocused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        onFocus: [{ type: HostListener, args: ["focus",] }],
        onBlur: [{ type: HostListener, args: ["blur",] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return FileListItemDirective;
}());
export { FileListItemDirective };
