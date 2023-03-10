/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDevMode, EventEmitter, NgZone, Injectable } from '@angular/core';
const SIZING_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/layout/splitter/panes/#toc-size';
/**
 * @hidden
 */
export class SplitterService {
    constructor(zone) {
        this.zone = zone;
        this.layoutChange = new EventEmitter();
        this.containerSize = () => { };
    }
    tryToggle(paneIndex) {
        const pane = this.pane(paneIndex);
        if (pane.collapsible) {
            pane.collapsed = !pane.collapsed;
            pane.collapsedChange.emit(pane.collapsed);
            this.emit(this.layoutChange, {});
            if (pane.collapsed) {
                pane.detectChanges();
            }
        }
        const notCollapsed = this.panes.filter(p => !p.collapsed);
        const allHaveFixedSize = notCollapsed.every(p => p.fixedSize);
        notCollapsed[notCollapsed.length - 1].forceExpand = allHaveFixedSize ? true : false;
        return pane.collapsible;
    }
    toggleContentOverlay(index, show) {
        this.pane(index).toggleOverlay(show);
        this.pane(index + 1).toggleOverlay(show);
    }
    dragState(splitbarIndex) {
        let prev = this.pane(splitbarIndex);
        let next = this.pane(splitbarIndex + 1);
        const total = prev.computedSize + next.computedSize;
        const px = s => this.toPixels(s);
        return {
            prev: {
                index: splitbarIndex,
                initialSize: prev.computedSize,
                min: px(prev.min) || total - px(next.max) || 0,
                max: px(prev.max) || total - px(next.min) || total
            },
            next: {
                index: splitbarIndex + 1,
                initialSize: next.computedSize,
                min: px(next.min) || total - px(prev.max) || 0,
                max: px(next.max) || total - px(prev.min) || total
            }
        };
    }
    setSize(state, delta) {
        const clamp = (min, max, v) => Math.min(max, Math.max(min, v));
        const resize = (paneState, change) => {
            const pane = this.pane(paneState.index);
            const splitterSize = this.containerSize();
            const newSize = clamp(paneState.min, paneState.max, paneState.initialSize + change);
            let size = "";
            if (this.isPercent(pane.size)) {
                size = (100 * newSize / splitterSize) + "%";
            }
            else {
                size = newSize + "px";
            }
            pane.size = size;
            this.emit(pane.sizeChange, size);
        };
        const prev = this.pane(state.prev.index);
        const next = this.pane(state.next.index);
        // determine which pane to resize
        if (prev.fixedSize && next.fixedSize) {
            // resizing both panes
            resize(state.prev, delta);
            resize(state.next, -delta);
        }
        else if (next.collapsible || next.fixedSize) {
            // resizing next
            resize(state.next, -delta);
        }
        else {
            // resizing prev
            resize(state.prev, delta);
        }
        this.emit(this.layoutChange, {});
    }
    isDraggable(splitBarIndex) {
        const prev = this.pane(splitBarIndex);
        const next = this.pane(splitBarIndex + 1);
        const betweenResizablePanes = prev.resizable && next.resizable;
        const nearCollapsedPane = prev.collapsed || next.collapsed;
        return betweenResizablePanes && !nearCollapsedPane;
    }
    isStatic(splitBarIndex) {
        const prev = this.pane(splitBarIndex);
        const next = this.pane(splitBarIndex + 1);
        const betweenResizablePanes = prev.resizable && next.resizable;
        const nearCollapsiblePane = prev.collapsible || next.collapsible;
        return !betweenResizablePanes && !nearCollapsiblePane;
    }
    pane(index) {
        if (!this.panes) {
            throw new Error("Panes not initialized");
        }
        if (index < 0 || index >= this.panes.length) {
            throw new Error("Index out of range");
        }
        return this.panes[index];
    }
    configure({ panes, orientation, containerSize }) {
        this.panes = panes;
        this.panes.forEach((pane, index) => {
            pane.order = index * 2;
            pane.orientation = orientation;
        });
        if (isDevMode()) {
            const allFixed = panes.length && !panes.some(pane => !pane.fixedSize);
            if (allFixed) {
                throw new Error(`
                    The Splitter should have at least one pane without a set size.
                    See ${SIZING_DOC_LINK} for more information.
                `);
            }
        }
        this.containerSize = containerSize;
    }
    isPercent(size) {
        return /%$/.test(size);
    }
    toPixels(size) {
        let result = parseFloat(size);
        if (this.isPercent(size)) {
            result = (this.containerSize() * result / 100);
        }
        return result;
    }
    emit(emitter, args) {
        if (emitter.observers.length) {
            this.zone.run(() => emitter.emit(args));
        }
    }
}
SplitterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SplitterService.ctorParameters = () => [
    { type: NgZone }
];
