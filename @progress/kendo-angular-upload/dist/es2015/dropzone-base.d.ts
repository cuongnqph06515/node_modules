/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2 } from '@angular/core';
/**
 * @hidden
 */
export declare abstract class DropZoneBase {
    protected element: ElementRef;
    protected renderer: Renderer2;
    protected hoverClass: string;
    protected lastDragElement: Date;
    protected hideIntervalElement: any;
    /**
     * @hidden
     */
    onElementDragEnterListener(): boolean;
    /**
     * @hidden
     */
    onElementDragOverListener(): boolean;
    constructor(element: ElementRef, renderer: Renderer2, hoverClass: string);
    protected calculateTimeDiff(prevEvent: Date): Number;
    protected addClass(className: string): void;
    protected removeClass(className: string): void;
}
