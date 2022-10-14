/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { HostListener } from '@angular/core';
/**
 * @hidden
 */
export class DropZoneBase {
    constructor(element, renderer, hoverClass) {
        this.element = element;
        this.renderer = renderer;
        this.hideIntervalElement = null;
        this.hoverClass = hoverClass;
    }
    /**
     * @hidden
     */
    onElementDragEnterListener() {
        this.addClass(this.hoverClass);
        this.lastDragElement = new Date();
        if (!this.hideIntervalElement) {
            this.hideIntervalElement = setInterval(() => {
                if (this.calculateTimeDiff(this.lastDragElement) < 100) {
                    return;
                }
                this.removeClass(this.hoverClass);
                clearInterval(this.hideIntervalElement);
                this.hideIntervalElement = null;
            }, 100);
        }
        return false;
    }
    /**
     * @hidden
     */
    onElementDragOverListener() {
        this.lastDragElement = new Date();
        return false;
    }
    calculateTimeDiff(prevEvent) {
        return new Date().getTime() - prevEvent.getTime();
    }
    addClass(className) {
        this.renderer.addClass(this.element.nativeElement, className);
    }
    removeClass(className) {
        this.renderer.removeClass(this.element.nativeElement, className);
    }
}
DropZoneBase.propDecorators = {
    onElementDragEnterListener: [{ type: HostListener, args: ['dragenter',] }],
    onElementDragOverListener: [{ type: HostListener, args: ['dragover',] }]
};
