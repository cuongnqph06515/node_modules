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
let newZIndex = 10002;
/**
 * @hidden
 */
const DEFAULT_OPTIONS = {
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
const createMoveStream = (el, ev) => mouseDown => {
    return el.kendoDrag
        .pipe(takeUntil(el.kendoRelease.pipe(tap(() => { ev.emit(); }))), map(({ pageX, pageY }) => ({
        originalX: mouseDown.pageX,
        originalY: mouseDown.pageY,
        pageX,
        pageY
    })));
};
const ɵ0 = createMoveStream;
/**
 * @hidden
 */
export class DragResizeService {
    constructor(ngZone) {
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
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.dragSubscription) {
            this.dragSubscription.unsubscribe();
        }
    }
    init(el) {
        const state = this.options.state;
        let options = this.options;
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
    }
    onDrag(el) {
        this.subscriptions.add(this.ngZone.runOutsideAngular(() => {
            let startPosition;
            let dragStarted;
            this.dragSubscription = el.kendoPress
                .pipe(tap((ev) => {
                if (!ev.isTouch) {
                    preventDefault(ev);
                }
                this.focus.emit();
                startPosition = this.currentPosition();
                dragStarted = false;
            }), switchMap(createMoveStream(el, this.dragEnd)))
                .subscribe(({ pageX, pageY, originalX, originalY }) => {
                if (!dragStarted) {
                    this.ensureWidth();
                    this.dragStart.emit();
                    dragStarted = true;
                }
                this.handleDrag({
                    originalX, originalY,
                    pageX, pageY, startPosition
                });
            });
        }));
    }
    handleDrag({ originalX, originalY, pageX, pageY, startPosition }) {
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
    }
    onResize(handle, direction) {
        this.subscriptions.add(this.ngZone.runOutsideAngular(() => {
            let startOffsetAndPosition;
            let resizeStarted = false;
            handle.kendoPress.pipe(tap((ev) => {
                preventDefault(ev);
                this.focus.emit();
                startOffsetAndPosition = this.currentOffsetAndPosition();
                resizeStarted = false;
            }), switchMap(createMoveStream(handle, this.resizeEnd)))
                .subscribe(({ pageX, pageY, originalX, originalY }) => {
                if (!resizeStarted) {
                    this.resizeStart.emit(direction);
                    resizeStarted = true;
                }
                let deltaX = pageX - originalX;
                let deltaY = pageY - originalY;
                this.handleResize(startOffsetAndPosition, direction, deltaX, deltaY);
            });
        }));
    }
    handleResize(initial, dir, deltaX, deltaY) {
        const old = this.options;
        let ev = {};
        if (dir.indexOf('e') >= 0) {
            const newWidth = initial.width + deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth) {
                ev.width = newWidth;
            }
        }
        if (dir.indexOf('n') >= 0) {
            const newHeight = initial.height - deltaY;
            const newTop = initial.y + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight && newTop !== old.top) {
                ev.height = newHeight;
                ev.top = newTop;
            }
        }
        if (dir.indexOf('s') >= 0) {
            const newHeight = initial.height + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight) {
                ev.height = newHeight;
            }
        }
        if (dir.indexOf('w') >= 0) {
            const newLeft = initial.x + deltaX;
            const newWidth = initial.width - deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth && newLeft !== old.left) {
                ev.width = newWidth;
                ev.left = newLeft;
            }
        }
        if (isPresent(ev.width) || isPresent(ev.height)) {
            OFFSET_STYLES.forEach((style) => {
                if (isPresent(ev[style])) {
                    this.options[style] = ev[style];
                }
            });
            this.change.emit(ev);
        }
    }
    restoreAction() {
        this.lastAction = 'restore';
        this.defaultState();
    }
    defaultState() {
        if (isPresent(this.restoreOptions)) {
            this.options = Object.assign({}, this.restoreOptions);
        }
        this.options.state = 'default';
        this.stateChange.emit('default');
    }
    storeOptions() {
        this.restoreOptions = Object.assign({}, this.options);
    }
    maximizeAction() {
        this.lastAction = 'maximize';
        this.maximizeState();
    }
    maximizeState() {
        this.storeOptions();
        const wnd = this.windowViewPort;
        this.options = Object.assign({}, this.options, {
            height: wnd.height,
            left: 0,
            position: 'fixed',
            state: 'maximized',
            top: 0,
            width: wnd.width
        });
        this.stateChange.emit('maximized');
    }
    minimizeAction() {
        this.lastAction = 'minimize';
        this.minimizeState();
    }
    minimizeState() {
        this.storeOptions();
        this.options = Object.assign({}, this.options, {
            height: null,
            minHeight: 0,
            state: 'minimized'
        });
        this.stateChange.emit('minimized');
    }
    /**
     * Handles manual changes of the 'state' property.
     * Required to distinguish them from action clicks.
     */
    applyManualState() {
        const state = this.options.state;
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
    }
    closeAction() {
        this.close.emit();
    }
    ensureWidth() {
        const windowOffset = offset(this.window.nativeElement);
        if (!isPresent(this.options.width)) {
            this.options.width = windowOffset.width;
            this.change.emit({ width: windowOffset.width });
        }
    }
    clearHeight() {
        if (this.options.height === 0) {
            delete this.options.height;
        }
        if (this.options.minHeight === 0) {
            delete this.options.minHeight;
        }
    }
    center() {
        if (this.options.state === 'maximized') {
            return;
        }
        let scroll = scrollPosition(this.window.nativeElement);
        let wnd = this.windowViewPort;
        let wrapper = offset(this.window.nativeElement);
        let ev = {};
        if (!isPresent(this.options.left)) {
            this.options.left = scroll.x + Math.max(0, (wnd.width - wrapper.width) / 2);
            ev.left = this.options.left;
        }
        if (!isPresent(this.options.top)) {
            this.options.top = scroll.y + Math.max(0, (wnd.height - wrapper.height) / 2);
            ev.top = this.options.top;
        }
        this.change.emit(ev);
    }
    currentOffsetAndPosition() {
        const o = this.options;
        const off = offset(this.window.nativeElement);
        return Object.assign({}, this.currentPosition(), {
            height: o.height ? o.height : off.height,
            width: o.width ? o.width : off.width
        });
    }
    currentPosition() {
        const o = this.options;
        if (!o.top || !o.left) {
            this.setPosition();
        }
        return {
            x: this.options.left,
            y: this.options.top
        };
    }
    setPosition() {
        const wrapper = positionWithScroll(this.window.nativeElement, getDocumentElement(this.window.nativeElement));
        this.options.left = wrapper.left;
        this.options.top = wrapper.top;
    }
    setRestoreOption(style, value) {
        if (isPresent(this.restoreOptions)) {
            this.restoreOptions[style] = value;
        }
    }
    get nextPossibleZIndex() {
        return newZIndex;
    }
    get nextZIndex() {
        return newZIndex++;
    }
    get windowViewPort() {
        return getWindowViewPort(this.window.nativeElement);
    }
}
DragResizeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DragResizeService.ctorParameters = () => [
    { type: NgZone }
];
export { ɵ0 };
