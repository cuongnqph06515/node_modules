/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragAndDropService } from './drag-and-drop.service';
import { filter } from 'rxjs/operators';
/**
 * @hidden
 */
export class DropTargetDirective {
    constructor(element, service) {
        this.element = element;
        this.service = service;
        this.context = {};
        this.enter = new EventEmitter();
        this.leave = new EventEmitter();
        this.drop = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.service.add(this);
        const changes = this.service.changes.pipe(filter(({ target }) => target === this));
        this.subscriptions.add(changes.pipe(filter(({ type }) => type === 'leave'))
            .subscribe(e => {
            this.leave.next(this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(({ type }) => type === 'enter'))
            .subscribe(e => {
            this.enter.next(this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(({ type }) => type === 'drop'))
            .subscribe(e => {
            this.drop.next(this.eventArgs(e));
        }));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    eventArgs(e) {
        return {
            target: this,
            mouseEvent: e.mouseEvent,
            draggable: e.draggable
        };
    }
}
DropTargetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropTarget]'
            },] },
];
/** @nocollapse */
DropTargetDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DragAndDropService }
];
DropTargetDirective.propDecorators = {
    context: [{ type: Input }],
    enter: [{ type: Output }],
    leave: [{ type: Output }],
    drop: [{ type: Output }]
};
