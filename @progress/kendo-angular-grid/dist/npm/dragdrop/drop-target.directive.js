/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var drag_and_drop_service_1 = require("./drag-and-drop.service");
var operators_1 = require("rxjs/operators");
/**
 * @hidden
 */
var DropTargetDirective = /** @class */ (function () {
    function DropTargetDirective(element, service) {
        this.element = element;
        this.service = service;
        this.context = {};
        this.enter = new core_1.EventEmitter();
        this.leave = new core_1.EventEmitter();
        this.drop = new core_1.EventEmitter();
        this.subscriptions = new rxjs_1.Subscription();
    }
    DropTargetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.service.add(this);
        var changes = this.service.changes.pipe(operators_1.filter(function (_a) {
            var target = _a.target;
            return target === _this;
        }));
        this.subscriptions.add(changes.pipe(operators_1.filter(function (_a) {
            var type = _a.type;
            return type === 'leave';
        }))
            .subscribe(function (e) {
            _this.leave.next(_this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(operators_1.filter(function (_a) {
            var type = _a.type;
            return type === 'enter';
        }))
            .subscribe(function (e) {
            _this.enter.next(_this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(operators_1.filter(function (_a) {
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoDropTarget]'
                },] },
    ];
    /** @nocollapse */
    DropTargetDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: drag_and_drop_service_1.DragAndDropService }
    ]; };
    DropTargetDirective.propDecorators = {
        context: [{ type: core_1.Input }],
        enter: [{ type: core_1.Output }],
        leave: [{ type: core_1.Output }],
        drop: [{ type: core_1.Output }]
    };
    return DropTargetDirective;
}());
exports.DropTargetDirective = DropTargetDirective;
