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
var util_1 = require("../common/util");
var WindowTitleBarComponent = /** @class */ (function () {
    function WindowTitleBarComponent(el, service, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.service = service;
    }
    WindowTitleBarComponent.prototype.ngOnInit = function () {
        this.dragDirective = new kendo_angular_common_1.DraggableDirective(this.el, this.ngZone);
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
        this.dragSubscription = rxjs_1.of(this.dragDirective).subscribe(function (titleBar) {
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
        if (!util_1.hasClasses(target, 'k-icon') && !util_1.isFocusable(target, false) && this.service.options.resizable) {
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-window-titlebar',
                    template: "\n    <ng-content *ngIf=\"!template\"></ng-content>\n    <ng-template\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{'$implicit': service}\" *ngIf=\"template\">\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    WindowTitleBarComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: drag_resize_service_1.DragResizeService },
        { type: core_1.NgZone }
    ]; };
    WindowTitleBarComponent.propDecorators = {
        template: [{ type: core_1.Input }],
        className: [{ type: core_1.HostBinding, args: ['class.k-window-titlebar',] }, { type: core_1.HostBinding, args: ['class.k-dialog-titlebar',] }],
        touchAction: [{ type: core_1.HostBinding, args: ['style.touch-action',] }],
        handle: [{ type: core_1.HostListener, args: ['dblclick', ['$event'],] }]
    };
    return WindowTitleBarComponent;
}());
exports.WindowTitleBarComponent = WindowTitleBarComponent;
