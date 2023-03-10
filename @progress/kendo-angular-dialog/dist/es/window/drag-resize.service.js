/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';
import { isPresent, OFFSET_STYLES, preventDefault } from '../common/util';
import { scrollPosition, offset, getDocumentElement, positionWithScroll, getWindowViewPort } from '@progress/kendo-popup-common';
/**
 * @hidden
 */
var newZIndex = 10002;
/**
 * @hidden
 */
var DEFAULT_OPTIONS = {
    draggable: true,
    height: null,
    left: null,
    minHeight: 100,
    minWidth: 120,
    position: 'absolute',
    resizable: true,
    state: 'default',
    top: null,
    width: null
};
/**
 * @hidden
 */
var createMoveStream = function (el, ev) { return function (mouseDown) {
    return el.kendoDrag
        .pipe(takeUntil(el.kendoRelease.pipe(tap(function () { ev.emit(); }))), map(function (_a) {
        var pageX = _a.pageX, pageY = _a.pageY;
        return ({
            originalX: mouseDown.pageX,
            originalY: mouseDown.pageY,
            pageX: pageX,
            pageY: pageY
        });
    }));
}; };
var ɵ0 = createMoveStream;
/**
 * @hidden
 */
var DragResizeService = /** @class */ (function () {
    function DragResizeService(ngZone) {
        this.ngZone = ngZone;
        this.close = new EventEmitter();
        this.focus = new EventEmitter();
        this.change = new EventEmitter();
        this.stateChange = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.resizeStart = new EventEmitter();
        this.resizeEnd = new EventEmitter();
        this.options = Object.assign({}, DEFAULT_OPTIONS);
        this.lastAction = null;
        this.subscriptions = new Subscription();
        this.dragSubscription = new Subscription();
    }
    DragResizeService.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.dragSubscription) {
            this.dragSubscription.unsubscribe();
        }
    };
    DragResizeService.prototype.init = function (el) {
        var state = this.options.state;
        var options = this.options;
        this.window = el;
        if (state !== 'default') {
            this.restoreOptions = Object.assign({}, options);
        }
        if (state === 'minimized') {
            options.height = 0;
            options.minHeight = 0;
        }
        if (state === 'maximized') {
            options.position = 'fixed';
        }
    };
    DragResizeService.prototype.onDrag = function (el) {
        var _this = this;
        this.subscriptions.add(this.ngZone.runOutsideAngular(function () {
            var startPosition;
            var dragStarted;
            _this.dragSubscription = el.kendoPress
                .pipe(tap(function (ev) {
                if (!ev.isTouch) {
                    preventDefault(ev);
                }
                _this.focus.emit();
                startPosition = _this.currentPosition();
                dragStarted = false;
            }), switchMap(createMoveStream(el, _this.dragEnd)))
                .subscribe(function (_a) {
                var pageX = _a.pageX, pageY = _a.pageY, originalX = _a.originalX, originalY = _a.originalY;
                if (!dragStarted) {
                    _this.ensureWidth();
                    _this.dragStart.emit();
                    dragStarted = true;
                }
                _this.handleDrag({
                    originalX: originalX, originalY: originalY,
                    pageX: pageX, pageY: pageY, startPosition: startPosition
                });
            });
        }));
    };
    DragResizeService.prototype.handleDrag = function (_a) {
        var originalX = _a.originalX, originalY = _a.originalY, pageX = _a.pageX, pageY = _a.pageY, startPosition = _a.startPosition;
        this.options.left = startPosition.x + pageX - originalX;
        this.options.top = startPosition.y + pageY - originalY;
        if (this.options.state === 'minimized' && isPresent(this.restoreOptions)) {
            this.restoreOptions.left = this.options.left;
            this.restoreOptions.top = this.options.top;
        }
        this.change.emit({
            left: startPosition.x + pageX - originalX,
            top: startPosition.y + pageY - originalY
        });
    };
    DragResizeService.prototype.onResize = function (handle, direction) {
        var _this = this;
        this.subscriptions.add(this.ngZone.runOutsideAngular(function () {
            var startOffsetAndPosition;
            var resizeStarted = false;
            handle.kendoPress.pipe(tap(function (ev) {
                preventDefault(ev);
                _this.focus.emit();
                startOffsetAndPosition = _this.currentOffsetAndPosition();
                resizeStarted = false;
            }), switchMap(createMoveStream(handle, _this.resizeEnd)))
                .subscribe(function (_a) {
                var pageX = _a.pageX, pageY = _a.pageY, originalX = _a.originalX, originalY = _a.originalY;
                if (!resizeStarted) {
                    _this.resizeStart.emit(direction);
                    resizeStarted = true;
                }
                var deltaX = pageX - originalX;
                var deltaY = pageY - originalY;
                _this.handleResize(startOffsetAndPosition, direction, deltaX, deltaY);
            });
        }));
    };
    DragResizeService.prototype.handleResize = function (initial, dir, deltaX, deltaY) {
        var _this = this;
        var old = this.options;
        var ev = {};
        if (dir.indexOf('e') >= 0) {
            var newWidth = initial.width + deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth) {
                ev.width = newWidth;
            }
        }
        if (dir.indexOf('n') >= 0) {
            var newHeight = initial.height - deltaY;
            var newTop = initial.y + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight && newTop !== old.top) {
                ev.height = newHeight;
                ev.top = newTop;
            }
        }
        if (dir.indexOf('s') >= 0) {
            var newHeight = initial.height + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight) {
                ev.height = newHeight;
            }
        }
        if (dir.indexOf('w') >= 0) {
            var newLeft = initial.x + deltaX;
            var newWidth = initial.width - deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth && newLeft !== old.left) {
                ev.width = newWidth;
                ev.left = newLeft;
            }
        }
        if (isPresent(ev.width) || isPresent(ev.height)) {
            OFFSET_STYLES.forEach(function (style) {
                if (isPresent(ev[style])) {
                    _this.options[style] = ev[style];
                }
            });
            this.change.emit(ev);
        }
    };
    DragResizeService.prototype.restoreAction = function () {
        this.lastAction = 'restore';
        this.defaultState();
    };
    DragResizeService.prototype.defaultState = function () {
        if (isPresent(this.restoreOptions)) {
            this.options = Object.assign({}, this.restoreOptions);
        }
        this.options.state = 'default';
        this.stateChange.emit('default');
    };
    DragResizeService.prototype.storeOptions = function () {
        this.restoreOptions = Object.assign({}, this.options);
    };
    DragResizeService.prototype.maximizeAction = function () {
        this.lastAction = 'maximize';
        this.maximizeState();
    };
    DragResizeService.prototype.maximizeState = function () {
        this.storeOptions();
        var wnd = this.windowViewPort;
        this.options = Object.assign({}, this.options, {
            height: wnd.height,
            left: 0,
            position: 'fixed',
            state: 'maximized',
            top: 0,
            width: wnd.width
        });
        this.stateChange.emit('maximized');
    };
    DragResizeService.prototype.minimizeAction = function () {
        this.lastAction = 'minimize';
        this.minimizeState();
    };
    DragResizeService.prototype.minimizeState = function () {
        this.storeOptions();
        this.options = Object.assign({}, this.options, {
            height: null,
            minHeight: 0,
            state: 'minimized'
        });
        this.stateChange.emit('minimized');
    };
    /**
     * Handles manual changes of the 'state' property.
     * Required to distinguish them from action clicks.
     */
    DragResizeService.prototype.applyManualState = function () {
        var state = this.options.state;
        switch (state) {
            case 'default':
                this.clearHeight();
                this.defaultState();
                break;
            case 'maximized':
                this.clearHeight();
                this.maximizeState();
                break;
            case 'minimized':
                this.minimizeState();
                break;
            default:
                break;
        }
    };
    DragResizeService.prototype.closeAction = function () {
        this.close.emit();
    };
    DragResizeService.prototype.ensureWidth = function () {
        var windowOffset = offset(this.window.nativeElement);
        if (!isPresent(this.options.width)) {
            this.options.width = windowOffset.width;
            this.change.emit({ width: windowOffset.width });
        }
    };
    DragResizeService.prototype.clearHeight = function () {
        if (this.options.height === 0) {
            delete this.options.height;
        }
        if (this.options.minHeight === 0) {
            delete this.options.minHeight;
        }
    };
    DragResizeService.prototype.center = function () {
        if (this.options.state === 'maximized') {
            return;
        }
        var scroll = scrollPosition(this.window.nativeElement);
        var wnd = this.windowViewPort;
        var wrapper = offset(this.window.nativeElement);
        var ev = {};
        if (!isPresent(this.options.left)) {
            this.options.left = scroll.x + Math.max(0, (wnd.width - wrapper.width) / 2);
            ev.left = this.options.left;
        }
        if (!isPresent(this.options.top)) {
            this.options.top = scroll.y + Math.max(0, (wnd.height - wrapper.height) / 2);
            ev.top = this.options.top;
        }
        this.change.emit(ev);
    };
    DragResizeService.prototype.currentOffsetAndPosition = function () {
        var o = this.options;
        var off = offset(this.window.nativeElement);
        return Object.assign({}, this.currentPosition(), {
            height: o.height ? o.height : off.height,
            width: o.width ? o.width : off.width
        });
    };
    DragResizeService.prototype.currentPosition = function () {
        var o = this.options;
        if (!o.top || !o.left) {
            this.setPosition();
        }
        return {
            x: this.options.left,
            y: this.options.top
        };
    };
    DragResizeService.prototype.setPosition = function () {
        var wrapper = positionWithScroll(this.window.nativeElement, getDocumentElement(this.window.nativeElement));
        this.options.left = wrapper.left;
        this.options.top = wrapper.top;
    };
    DragResizeService.prototype.setRestoreOption = function (style, value) {
        if (isPresent(this.restoreOptions)) {
            this.restoreOptions[style] = value;
        }
    };
    Object.defineProperty(DragResizeService.prototype, "nextPossibleZIndex", {
        get: function () {
            return newZIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragResizeService.prototype, "nextZIndex", {
        get: function () {
            return newZIndex++;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragResizeService.prototype, "windowViewPort", {
        get: function () {
            return getWindowViewPort(this.window.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    DragResizeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DragResizeService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return DragResizeService;
}());
export { DragResizeService };
export { ɵ0 };
