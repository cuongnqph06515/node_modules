/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { GridComponent } from '../grid.component';
import { ResizeService } from "./resize.service";
/**
 * @hidden
 */
export class ResizableContainerDirective {
    constructor(el, renderer, resizeService, grid) {
        this.el = el;
        this.renderer = renderer;
        this.resizeService = resizeService;
        this.grid = grid;
        this.enabled = false;
    }
    set lockedWidth(value) {
        this._lockedWidth = value;
        if (this.enabled) {
            this.attachResize();
            this.resize();
        }
    }
    set kendoGridResizableContainer(enabled) {
        const refresh = enabled !== this.enabled;
        this.enabled = enabled;
        if (refresh) {
            this.attachResize();
            this.resize();
        }
    }
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    attachResize() {
        if (this.resizeSubscription && !this.enabled) {
            this.resizeSubscription.unsubscribe();
            this.resizeSubscription = null;
        }
        if (!this.resizeSubscription && this.enabled) {
            this.resizeSubscription = this.resizeService.changes.subscribe(this.resize.bind(this));
        }
    }
    resize() {
        if (this.grid && this.grid.wrapper) {
            const containerElement = this.grid.wrapper.nativeElement;
            const width = Math.max(containerElement.clientWidth - this._lockedWidth, 0);
            if (this.enabled && width > 0) {
                this.renderer.setStyle(this.el.nativeElement, "width", width + "px");
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, "width", "");
            }
        }
    }
}
ResizableContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridResizableContainer]'
            },] },
];
/** @nocollapse */
ResizableContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ResizeService },
    { type: GridComponent, decorators: [{ type: Optional }] }
];
ResizableContainerDirective.propDecorators = {
    lockedWidth: [{ type: Input, args: ['lockedWidth',] }],
    kendoGridResizableContainer: [{ type: Input }]
};
