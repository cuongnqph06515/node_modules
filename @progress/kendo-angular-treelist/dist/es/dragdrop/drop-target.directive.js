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
var DropTargetDirective = /** @class */ (function () {
    function DropTargetDirective(element, service) {
        this.element = element;
        this.service = service;
        this.context = {};
        this.enter = new EventEmitter();
        this.leave = new EventEmitter();
        this.drop = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    DropTargetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.service.add(this);
        var changes = this.service.changes.pipe(filter(function (_a) {
            var target = _a.target;
            return target === _this;
        }));
        this.subscriptions.add(changes.pipe(filter(function (_a) {
            var type = _a.type;
            return type === 'leave';
        }))
            .subscribe(function (e) {
            _this.leave.next(_this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(function (_a) {
            var type = _a.type;
            return type === 'enter';
        }))
            .subscribe(function (e) {
            _this.enter.next(_this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(function (_a) {
            var type = _a.type;
            return type === 'drop';
        }))
            .subscribe(function (e) {
            _this.drop.next(_this.eventArgs(e));
        }));
    };
    DropTargetDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    DropTargetDirective.prototype.eventArgs = function (e) {
        return {
            target: this,
            mouseEvent: e.mouseEvent,
            draggable: e.draggable
        };
    };
    DropTargetDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropTarget]'
                },] },
    ];
    /** @nocollapse */
    DropTargetDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragAndDropService }
    ]; };
    DropTargetDirective.propDecorators = {
        context: [{ type: Input }],
        enter: [{ type: Output }],
        leave: [{ type: Output }],
        drop: [{ type: Output }]
    };
    return DropTargetDirective;
}());
export { DropTargetDirective };
