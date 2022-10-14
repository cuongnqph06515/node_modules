/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, NgZone } from '@angular/core';
import { assignGuidToFiles, getAllFileInfo } from './common/util';
import { validateFiles } from './common/validation-util';
import { DropZoneBase } from './dropzone-base';
import { UploadService } from './upload.service';
/**
 * @hidden
 */
export class DropZoneInternalDirective extends DropZoneBase {
    constructor(element, renderer, ngZone, uploadService) {
        super(element, renderer, 'k-dropzone-hover');
        this.ngZone = ngZone;
        this.uploadService = uploadService;
        this.initialClassName = true;
        this.hideIntervalDocument = null;
        this.activeClass = 'k-dropzone-active';
        this.ngZone.runOutsideAngular(() => {
            this.unsubscribeDocumentDragEnter = this.renderer.listen('document', 'dragenter', () => this.onDocumentDragEnter());
            this.unsubscribeDocumentDragOver = this.renderer.listen('document', 'dragover', () => this.onDocumentDragOver());
        });
    }
    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            if (this.unsubscribeDocumentDragEnter) {
                this.unsubscribeDocumentDragEnter();
            }
            if (this.unsubscribeDocumentDragOver) {
                this.unsubscribeDocumentDragOver();
            }
        });
    }
    onDocumentDragEnter() {
        this.addClass(this.activeClass);
        this.lastDragDocument = new Date();
        if (!this.hideIntervalDocument) {
            this.hideIntervalDocument = setInterval(() => {
                if (this.calculateTimeDiff(this.lastDragDocument) < 100) {
                    return;
                }
                this.removeClass(this.activeClass);
                clearInterval(this.hideIntervalDocument);
                this.hideIntervalDocument = null;
            }, 100);
        }
        return false;
    }
    /**
     * @hidden
     */
    onDocumentDragOver() {
        this.lastDragDocument = new Date();
        return false;
    }
    onDropListener(event) {
        let droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0 && !this.disabled) {
            let files = getAllFileInfo(droppedFiles);
            files = assignGuidToFiles(files, !this.uploadService.async.batch);
            if (!this.multiple) {
                files.splice(1, files.length - 1);
                this.uploadService.clearFiles();
            }
            validateFiles(files, this.restrictions);
            this.uploadService.addFiles(files);
        }
        return false;
    }
}
DropZoneInternalDirective.decorators = [
    { type: Directive, args: [{
                selector: `
      [kendoUploadInternalDropZone],
      [kendoFileSelectInternalDropZone]
    `
            },] },
];
/** @nocollapse */
DropZoneInternalDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: UploadService }
];
DropZoneInternalDirective.propDecorators = {
    disabled: [{ type: Input }],
    multiple: [{ type: Input }],
    restrictions: [{ type: Input }],
    initialClassName: [{ type: HostBinding, args: ['class.k-dropzone',] }],
    onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
