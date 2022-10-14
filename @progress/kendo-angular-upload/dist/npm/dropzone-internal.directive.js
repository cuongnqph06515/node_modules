/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var util_1 = require("./common/util");
var validation_util_1 = require("./common/validation-util");
var dropzone_base_1 = require("./dropzone-base");
var upload_service_1 = require("./upload.service");
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
            var files = util_1.getAllFileInfo(droppedFiles);
            files = util_1.assignGuidToFiles(files, !this.uploadService.async.batch);
            if (!this.multiple) {
                files.splice(1, files.length - 1);
                this.uploadService.clearFiles();
            }
            validation_util_1.validateFiles(files, this.restrictions);
            this.uploadService.addFiles(files);
        }
        return false;
    };
    DropZoneInternalDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "\n      [kendoUploadInternalDropZone],\n      [kendoFileSelectInternalDropZone]\n    "
                },] },
    ];
    /** @nocollapse */
    DropZoneInternalDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone },
        { type: upload_service_1.UploadService }
    ]; };
    DropZoneInternalDirective.propDecorators = {
        disabled: [{ type: core_1.Input }],
        multiple: [{ type: core_1.Input }],
        restrictions: [{ type: core_1.Input }],
        initialClassName: [{ type: core_1.HostBinding, args: ['class.k-dropzone',] }],
        onDropListener: [{ type: core_1.HostListener, args: ['drop', ['$event'],] }]
    };
    return DropZoneInternalDirective;
}(dropzone_base_1.DropZoneBase));
exports.DropZoneInternalDirective = DropZoneInternalDirective;
