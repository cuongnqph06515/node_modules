/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { FileRestrictions } from './types';
import { DropZoneBase } from './dropzone-base';
import { UploadService } from './upload.service';
/**
 * @hidden
 */
export declare class DropZoneInternalDirective extends DropZoneBase {
    private ngZone;
    protected uploadService: UploadService;
    disabled: boolean;
    multiple: boolean;
    restrictions: FileRestrictions;
    initialClassName: boolean;
    private unsubscribeDocumentDragEnter;
    private unsubscribeDocumentDragOver;
    private lastDragDocument;
    private hideIntervalDocument;
    private activeClass;
    constructor(element: ElementRef, renderer: Renderer2, ngZone: NgZone, uploadService: UploadService);
    ngOnDestroy(): void;
    onDocumentDragEnter(): boolean;
    /**
     * @hidden
     */
    onDocumentDragOver(): boolean;
    onDropListener(event: any): boolean;
}
