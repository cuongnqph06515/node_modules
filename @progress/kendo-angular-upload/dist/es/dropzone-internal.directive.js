/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, NgZone } from '@angular/core';
import { assignGuidToFiles, getAllFileInfo } from './common/util';
import { validateFiles } from './common/validation-util';
import { DropZoneBase } from './dropzone-base';
import { UploadService } from './upload.service';
/**
 * @hidden
 */
var DropZoneInternalDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DropZoneInternalDirective, _super);
    function DropZoneInternalDirective(element, renderer, ngZone, uploadService) {
        var _this = _super.call(this, element, renderer, 'k-dropzone-hover') || this;
        _this.ngZone = ngZone;
        _this.uploadService = uploadService;
        _this.initialClassName = true;
        _this.hideIntervalDocument = null;
        _this.activeClass = 'k-dropzone-active';
        _this.ngZone.runOutsideAngular(function () {
            _this.unsubscribeDocumentDragEnter = _this.renderer.listen('document', 'dragenter', function () { return _this.onDocumentDragEnter(); });
            _this.unsubscribeDocumentDragOver = _this.renderer.listen('document', 'dragover', function () { return _this.onDocumentDragOver(); });
        });
        return _this;
    }
    DropZoneInternalDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            if (_this.unsubscribeDocumentDragEnter) {
                _this.unsubscribeDocumentDragEnter();
            }
            if (_this.unsubscribeDocumentDragOver) {
                _this.unsubscribeDocumentDragOver();
            }
        });
    };
    DropZoneInternalDirective.prototype.onDocumentDragEnter = function () {
        var _this = this;
        this.addClass(this.activeClass);
        this.lastDragDocument = new Date();
        if (!this.hideIntervalDocument) {
            this.hideIntervalDocument = setInterval(function () {
                if (_this.calculateTimeDiff(_this.lastDragDocument) < 100) {
                    return;
                }
                _this.removeClass(_this.activeClass);
                clearInterval(_this.hideIntervalDocument);
                _this.hideIntervalDocument = null;
            }, 100);
        }
        return false;
    };
    /**
     * @hidden
     */
    DropZoneInternalDirective.prototype.onDocumentDragOver = function () {
        this.lastDragDocument = new Date();
        return false;
    };
    DropZoneInternalDirective.prototype.onDropListener = function (event) {
        var droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0 && !this.disabled) {
            var files = getAllFileInfo(droppedFiles);
            files = assignGuidToFiles(files, !this.uploadService.async.batch);
            if (!this.multiple) {
                files.splice(1, files.length - 1);
                this.uploadService.clearFiles();
            }
            validateFiles(files, this.restrictions);
            this.uploadService.addFiles(files);
        }
        return false;
    };
    DropZoneInternalDirective.decorators = [
        { type: Directive, args: [{
                    selector: "\n      [kendoUploadInternalDropZone],\n      [kendoFileSelectInternalDropZone]\n    "
                },] },
    ];
    /** @nocollapse */
    DropZoneInternalDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: UploadService }
    ]; };
    DropZoneInternalDirective.propDecorators = {
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        restrictions: [{ type: Input }],
        initialClassName: [{ type: HostBinding, args: ['class.k-dropzone',] }],
        onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return DropZoneInternalDirective;
}(DropZoneBase));
export { DropZoneInternalDirective };
