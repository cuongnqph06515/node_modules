/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, HostListener, ElementRef, NgZone, TemplateRef, Input } from '@angular/core';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { DragResizeService } from './drag-resize.service';
import { of } from 'rxjs';
import { hasClasses, isFocusable } from '../common/util';
var WindowTitleBarComponent = /** @class */ (function () {
    function WindowTitleBarComponent(el, service, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.service = service;
    }
    WindowTitleBarComponent.prototype.ngOnInit = function () {
        this.dragDirective = new DraggableDirective(this.el, this.ngZone);
        this.dragDirective.ngOnInit();
        if (this.isDraggable) {
            this.subscribeDrag();
        }
        this.subscribeStateChange();
    };
    WindowTitleBarComponent.prototype.ngOnDestroy = function () {
        this.dragDirective.ngOnDestroy();
        this.unsubscribeDrag();
        this.unsubscribeState();
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.subscribeDrag = function () {
        var _this = this;
        this.unsubscribeDrag();
        this.dragSubscription = of(this.dragDirective).subscribe(function (titleBar) {
            _this.service.onDrag(titleBar);
        });
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.subscribeStateChange = function () {
        var _this = this;
        this.stateSubscription = this.service.stateChange.subscribe(function (state) {
            if (_this.service.options.draggable) {
                if (state === 'maximized') {
                    _this.unsubscribeDrag();
                }
                else {
                    _this.subscribeDrag();
                }
            }
        });
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.unsubscribeDrag = function () {
        if (this.dragSubscription) {
            this.service.dragSubscription.unsubscribe();
            this.dragSubscription.unsubscribe();
            this.dragSubscription = null;
        }
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.unsubscribeState = function () {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
            this.stateSubscription = null;
        }
    };
    Object.defineProperty(WindowTitleBarComponent.prototype, "className", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowTitleBarComponent.prototype, "touchAction", {
        get: function () {
            if (this.isDraggable) {
                return 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.handle = function (ev) {
        var target = ev.target;
        var state = this.service.options.state;
        if (!hasClasses(target, 'k-icon') && !isFocusable(target, false) && this.service.options.resizable) {
            if (state === 'default') {
                this.service.maximizeAction();
            }
            else if (state === 'maximized') {
                this.service.restoreAction();
            }
        }
    };
    Object.defineProperty(WindowTitleBarComponent.prototype, "isDraggable", {
        get: function () {
            var options = this.service.options;
            return options.draggable && options.state !== 'maximized';
        },
        enumerable: true,
        configurable: true
    });
    WindowTitleBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-window-titlebar',
                    template: "\n    <ng-content *ngIf=\"!template\"></ng-content>\n    <ng-template\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{'$implicit': service}\" *ngIf=\"template\">\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    WindowTitleBarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragResizeService },
        { type: NgZone }
    ]; };
    WindowTitleBarComponent.propDecorators = {
        template: [{ type: Input }],
        className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }],
        touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
        handle: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
    };
    return WindowTitleBarComponent;
}());
export { WindowTitleBarComponent };
