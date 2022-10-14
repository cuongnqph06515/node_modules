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
export class FileListItemDirective {
    constructor(el, navigationService, uploadService) {
        this.navigationService = navigationService;
        this.uploadService = uploadService;
        this.fileClass = true;
        this.focused = false;
        this.element = el;
    }
    focus() {
        this.element.nativeElement.focus();
    }
    get uidAttribute() {
        return this.files[0].uid;
    }
    get tabIndex() {
        return "-1";
    }
    get kFileError() {
        return this.files[0].state === FileState.Failed;
    }
    get kFileInvalid() {
        return filesHaveValidationErrors(this.files);
    }
    get kFileProgress() {
        return this.files[0].state === FileState.Uploading ||
            this.files[0].state === FileState.Paused;
    }
    get kFileSuccess() {
        if (this.uploadService.component === 'Upload') {
            return this.files[0].state === FileState.Uploaded ||
                this.files[0].state === FileState.Initial;
        }
        return false;
    }
    get kStateFocused() {
        return this.focused;
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    onClick(event) {
        if (!isFocusable(event.target) && !hasClasses(event.target, IGNORE_TARGET_CLASSES)) {
            this.navigationService.focusedIndex = this.index;
        }
    }
}
FileListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoUploadFileListItem]'
            },] },
];
/** @nocollapse */
FileListItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NavigationService },
    { type: UploadService }
];
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
