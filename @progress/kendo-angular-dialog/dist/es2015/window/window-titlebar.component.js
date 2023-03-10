/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, HostListener, ElementRef, NgZone, TemplateRef, Input } from '@angular/core';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { DragResizeService } from './drag-resize.service';
import { of } from 'rxjs';
import { hasClasses, isFocusable } from '../common/util';
export class WindowTitleBarComponent {
    constructor(el, service, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.service = service;
    }
    ngOnInit() {
        this.dragDirective = new DraggableDirective(this.el, this.ngZone);
        this.dragDirective.ngOnInit();
        if (this.isDraggable) {
            this.subscribeDrag();
        }
        this.subscribeStateChange();
    }
    ngOnDestroy() {
        this.dragDirective.ngOnDestroy();
        this.unsubscribeDrag();
        this.unsubscribeState();
    }
    /**
     * @hidden
     */
    subscribeDrag() {
        this.unsubscribeDrag();
        this.dragSubscription = of(this.dragDirective).subscribe(titleBar => {
            this.service.onDrag(titleBar);
        });
    }
    /**
     * @hidden
     */
    subscribeStateChange() {
        this.stateSubscription = this.service.stateChange.subscribe((state) => {
            if (this.service.options.draggable) {
                if (state === 'maximized') {
                    this.unsubscribeDrag();
                }
                else {
                    this.subscribeDrag();
                }
            }
        });
    }
    /**
     * @hidden
     */
    unsubscribeDrag() {
        if (this.dragSubscription) {
            this.service.dragSubscription.unsubscribe();
            this.dragSubscription.unsubscribe();
            this.dragSubscription = null;
        }
    }
    /**
     * @hidden
     */
    unsubscribeState() {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
            this.stateSubscription = null;
        }
    }
    get className() {
        return true;
    }
    get touchAction() {
        if (this.isDraggable) {
            return 'none';
        }
    }
    /**
     * @hidden
     */
    handle(ev) {
        const target = ev.target;
        const state = this.service.options.state;
        if (!hasClasses(target, 'k-icon') && !isFocusable(target, false) && this.service.options.resizable) {
            if (state === 'default') {
                this.service.maximizeAction();
            }
            else if (state === 'maximized') {
                this.service.restoreAction();
            }
        }
    }
    get isDraggable() {
        const options = this.service.options;
        return options.draggable && options.state !== 'maximized';
    }
}
WindowTitleBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-window-titlebar',
                template: `
    <ng-content *ngIf="!template"></ng-content>
    <ng-template
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{'$implicit': service}" *ngIf="template">
    </ng-template>
  `
            },] },
];
/** @nocollapse */
WindowTitleBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DragResizeService },
    { type: NgZone }
];
WindowTitleBarComponent.propDecorators = {
    template: [{ type: Input }],
    className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    handle: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
};
