/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, Input } from '@angular/core';
import { assignGuidToFiles, getAllFileInfo, isPresent } from './common/util';
import { validateFiles } from './common/validation-util';
import { DropZoneService } from './dropzone.service';
import { UploadComponent } from './upload.component';
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
        if (!isPresent(components)) {
            return;
        }
        components.forEach(function (component) {
            var droppedFiles = event.dataTransfer.files;
            if (droppedFiles.length > 0 && !component.disabled) {
                var files = getAllFileInfo(droppedFiles);
                if (component instanceof UploadComponent) {
                    files = assignGuidToFiles(files, !component.batch);
                }
                else {
                    files = assignGuidToFiles(files, true);
                }
                if (!component.multiple) {
                    files.splice(1, files.length - 1);
                    component.clearFiles();
                }
                validateFiles(files, component.restrictions);
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
        { type: Directive, args: [{
                    providers: [
                        DropZoneService
                    ],
                    selector: '[kendoUploadDropZone], [kendoFileSelectDropZone]'
                },] },
    ];
    /** @nocollapse */
    UploadDropZoneDirective.ctorParameters = function () { return [
        { type: DropZoneService }
    ]; };
    UploadDropZoneDirective.propDecorators = {
        zoneId: [{ type: Input, args: ['kendoUploadDropZone',] }],
        onElementDragEnter: [{ type: HostListener, args: ['dragenter',] }],
        onElementDragOver: [{ type: HostListener, args: ['dragover',] }],
        onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return UploadDropZoneDirective;
}());
export { UploadDropZoneDirective };
