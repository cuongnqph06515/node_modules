/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("./common/util");
var validation_util_1 = require("./common/validation-util");
var dropzone_service_1 = require("./dropzone.service");
var upload_component_1 = require("./upload.component");
var UploadDropZoneDirective = /** @class */ (function () {
    function UploadDropZoneDirective(dropZoneService) {
        this.dropZoneService = dropZoneService;
    }
    /**
     * @hidden
     */
    UploadDropZoneDirective.prototype.onElementDragEnter = function () {
        return false;
    };
    /**
     * @hidden
     */
    UploadDropZoneDirective.prototype.onElementDragOver = function () {
        return false;
    };
    /**
     * @hidden
     */
    UploadDropZoneDirective.prototype.onDropListener = function (event) {
        var components = this.componentInstance;
        if (!util_1.isPresent(components)) {
            return;
        }
        components.forEach(function (component) {
            var droppedFiles = event.dataTransfer.files;
            if (droppedFiles.length > 0 && !component.disabled) {
                var files = util_1.getAllFileInfo(droppedFiles);
                if (component instanceof upload_component_1.UploadComponent) {
                    files = util_1.assignGuidToFiles(files, !component.batch);
                }
                else {
                    files = util_1.assignGuidToFiles(files, true);
                }
                if (!component.multiple) {
                    files.splice(1, files.length - 1);
                    component.clearFiles();
                }
                validation_util_1.validateFiles(files, component.restrictions);
                component.addFiles(files);
            }
        });
        return false;
    };
    Object.defineProperty(UploadDropZoneDirective.prototype, "componentInstance", {
        /**
         * @hidden
         */
        get: function () {
            return this.dropZoneService.getComponents(this.zoneId);
        },
        enumerable: true,
        configurable: true
    });
    UploadDropZoneDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [
                        dropzone_service_1.DropZoneService
                    ],
                    selector: '[kendoUploadDropZone], [kendoFileSelectDropZone]'
                },] },
    ];
    /** @nocollapse */
    UploadDropZoneDirective.ctorParameters = function () { return [
        { type: dropzone_service_1.DropZoneService }
    ]; };
    UploadDropZoneDirective.propDecorators = {
        zoneId: [{ type: core_1.Input, args: ['kendoUploadDropZone',] }],
        onElementDragEnter: [{ type: core_1.HostListener, args: ['dragenter',] }],
        onElementDragOver: [{ type: core_1.HostListener, args: ['dragover',] }],
        onDropListener: [{ type: core_1.HostListener, args: ['drop', ['$event'],] }]
    };
    return UploadDropZoneDirective;
}());
exports.UploadDropZoneDirective = UploadDropZoneDirective;
