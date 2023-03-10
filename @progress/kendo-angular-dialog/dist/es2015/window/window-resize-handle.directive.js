/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Host, ElementRef, Input, HostBinding, Renderer2 } from '@angular/core';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { DragResizeService } from './drag-resize.service';
import { Subscription, of, merge } from 'rxjs';
/**
 * @hidden
 */
export class ResizeHandleDirective {
    constructor(draggable, el, renderer, service) {
        this.draggable = draggable;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.subscriptions = new Subscription();
    }
    get hostClass() {
        return true;
    }
    ngOnInit() {
        this.setDisplay();
        this.renderer.addClass(this.el.nativeElement, 'k-resize-' + this.direction);
        this.subscriptions.add(of(this.draggable).subscribe(handle => {
            this.service.onResize(handle, this.direction);
        }));
        this.subscriptions.add(this.service.resizeStart.subscribe((dir) => {
            if (dir !== this.direction) {
                this.setDisplay('none');
            }
        }));
        this.subscriptions.add(this.service.dragStart.subscribe(() => {
            this.setDisplay('none');
        }));
        this.subscriptions.add(merge(this.service.resizeEnd, this.service.dragEnd).subscribe(() => {
            this.setDisplay('block');
        }));
        this.subscriptions.add(this.service.stateChange.subscribe((state) => {
            this.setDisplay(state === 'default' ? 'block' : 'none');
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    setDisplay(value = 'block') {
        this.renderer.setStyle(this.el.nativeElement, 'display', this.service.options.state === 'default' ? value : 'none');
    }
}
ResizeHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoWindowResizeHandle]'
            },] },
];
/** @nocollapse */
ResizeHandleDirective.ctorParameters = () => [
    { type: DraggableDirective, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService }
];
ResizeHandleDirective.propDecorators = {
    direction: [{ type: Input }],
    hostClass: [{ type: HostBinding, args: ['class.k-resize-handle',] }]
};
