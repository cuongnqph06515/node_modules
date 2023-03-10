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
var ResizeHandleDirective = /** @class */ (function () {
    function ResizeHandleDirective(draggable, el, renderer, service) {
        this.draggable = draggable;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.subscriptions = new Subscription();
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
        this.subscriptions.add(of(this.draggable).subscribe(function (handle) {
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
        this.subscriptions.add(merge(this.service.resizeEnd, this.service.dragEnd).subscribe(function () {
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
        { type: Directive, args: [{
                    selector: '[kendoWindowResizeHandle]'
                },] },
    ];
    /** @nocollapse */
    ResizeHandleDirective.ctorParameters = function () { return [
        { type: DraggableDirective, decorators: [{ type: Host }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService }
    ]; };
    ResizeHandleDirective.propDecorators = {
        direction: [{ type: Input }],
        hostClass: [{ type: HostBinding, args: ['class.k-resize-handle',] }]
    };
    return ResizeHandleDirective;
}());
export { ResizeHandleDirective };
