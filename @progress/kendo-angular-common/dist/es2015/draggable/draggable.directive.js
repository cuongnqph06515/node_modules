/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef, Directive, Output, NgZone, Input } from '@angular/core';
import { isDocumentAvailable, isChanged } from '../utils';
import Draggable from '@telerik/kendo-draggable';
export class DraggableDirective {
    constructor(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.enableDrag = true;
        this.kendoPress = new EventEmitter();
        this.kendoDrag = new EventEmitter();
        this.kendoRelease = new EventEmitter();
    }
    ngOnInit() {
        this.toggleDraggable();
    }
    ngOnChanges(changes) {
        if (isChanged('enableDrag', changes)) {
            this.toggleDraggable();
        }
    }
    ngOnDestroy() {
        this.destroyDraggable();
    }
    toggleDraggable() {
        if (isDocumentAvailable()) {
            this.destroyDraggable();
            if (this.enableDrag) {
                this.draggable = new Draggable({
                    drag: (e) => this.kendoDrag.next(e),
                    press: (e) => this.kendoPress.next(e),
                    release: (e) => this.kendoRelease.next(e)
                });
                this.ngZone.runOutsideAngular(() => this.draggable.bindTo(this.element.nativeElement));
            }
        }
    }
    destroyDraggable() {
        if (this.draggable) {
            this.draggable.destroy();
            this.draggable = null;
        }
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDraggable]'
            },] },
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
DraggableDirective.propDecorators = {
    enableDrag: [{ type: Input }],
    kendoPress: [{ type: Output }],
    kendoDrag: [{ type: Output }],
    kendoRelease: [{ type: Output }]
};
