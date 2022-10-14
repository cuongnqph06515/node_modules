/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, Input } from '@angular/core';
import { assignGuidToFiles, getAllFileInfo, isPresent } from './common/util';
import { validateFiles } from './common/validation-util';
import { DropZoneService } from './dropzone.service';
import { UploadComponent } from './upload.component';
export class UploadDropZoneDirective {
    constructor(dropZoneService) {
        this.dropZoneService = dropZoneService;
    }
    /**
     * @hidden
     */
    onElementDragEnter() {
        return false;
    }
    /**
     * @hidden
     */
    onElementDragOver() {
        return false;
    }
    /**
     * @hidden
     */
    onDropListener(event) {
        const components = this.componentInstance;
        if (!isPresent(components)) {
            return;
        }
        components.forEach((component) => {
            let droppedFiles = event.dataTransfer.files;
            if (droppedFiles.length > 0 && !component.disabled) {
                let files = getAllFileInfo(droppedFiles);
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
    }
    /**
     * @hidden
     */
    get componentInstance() {
        return this.dropZoneService.getComponents(this.zoneId);
    }
}
UploadDropZoneDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    DropZoneService
                ],
                selector: '[kendoUploadDropZone], [kendoFileSelectDropZone]'
            },] },
];
/** @nocollapse */
UploadDropZoneDirective.ctorParameters = () => [
    { type: DropZoneService }
];
UploadDropZoneDirective.propDecorators = {
    zoneId: [{ type: Input, args: ['kendoUploadDropZone',] }],
    onElementDragEnter: [{ type: HostListener, args: ['dragenter',] }],
    onElementDragOver: [{ type: HostListener, args: ['dragover',] }],
    onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
