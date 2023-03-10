/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var drag_resize_service_1 = require("./drag-resize.service");
var rxjs_1 = require("rxjs");
/**
 * @hidden
 */
var ResizeHandleDirective = /** @class */ (function () {
    function ResizeHandleDirective(draggable, el, renderer, service) {
        this.draggable = draggable;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.subscriptions = new rxjs_1.Subscription();
    }
    Object.defineProperty(ResizeHandleDirective.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    ResizeHandleDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.setDisplay();
        this.renderer.addClass(this.el.nativeElement, 'k-resize-' + this.direction);
        this.subscriptions.add(rxjs_1.of(this.draggable).subscribe(function (handle) {
            _this.service.onResize(handle, _this.direction);
        }));
        this.subscriptions.add(this.service.resizeStart.subscribe(function (dir) {
            if (dir !== _this.direction) {
                _this.setDisplay('none');
            }
        }));
        this.subscriptions.add(this.service.dragStart.subscribe(function () {
            _this.setDisplay('none');
        }));
        this.subscriptions.add(rxjs_1.merge(this.service.resizeEnd, this.service.dragEnd).subscribe(function () {
            _this.setDisplay('block');
        }));
        this.subscriptions.add(this.service.stateChange.subscribe(function (state) {
            _this.setDisplay(state === 'default' ? 'block' : 'none');
        }));
    };
    ResizeHandleDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    ResizeHandleDirective.prototype.setDisplay = function (value) {
        if (value === void 0) { value = 'block'; }
        this.renderer.setStyle(this.el.nativeElement, 'display', this.service.options.state === 'default' ? value : 'none');
    };
    ResizeHandleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoWindowResizeHandle]'
                },] },
    ];
    /** @nocollapse */
    ResizeHandleDirective.ctorParameters = function () { return [
        { type: kendo_angular_common_1.DraggableDirective, decorators: [{ type: core_1.Host }] },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: drag_resize_service_1.DragResizeService }
    ]; };
    ResizeHandleDirective.propDecorators = {
        direction: [{ type: core_1.Input }],
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-resize-handle',] }]
    };
    return ResizeHandleDirective;
}());
exports.ResizeHandleDirective = ResizeHandleDirective;
