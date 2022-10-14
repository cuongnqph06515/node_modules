/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DropZoneService } from './dropzone.service';
import { UploadComponent } from './upload.component';
import { FileSelectComponent } from './fileselect.component';
export declare class UploadDropZoneDirective {
    private dropZoneService;
    /**
     * Specifies the id of the drop zone. It is used to associate it with
     * an existing Upload or FileSelect component.
     */
    zoneId: string;
    constructor(dropZoneService: DropZoneService);
    /**
     * @hidden
     */
    onElementDragEnter(): boolean;
    /**
     * @hidden
     */
    onElementDragOver(): boolean;
    /**
     * @hidden
     */
    onDropListener(event: any): boolean;
    /**
     * @hidden
     */
    readonly componentInstance: Array<UploadComponent | FileSelectComponent>;
}
