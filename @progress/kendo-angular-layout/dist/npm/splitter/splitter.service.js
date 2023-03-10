/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SIZING_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/layout/splitter/panes/#toc-size';
/**
 * @hidden
 */
var SplitterService = /** @class */ (function () {
    function SplitterService(zone) {
        this.zone = zone;
        this.layoutChange = new core_1.EventEmitter();
        this.containerSize = function () { };
    }
    SplitterService.prototype.tryToggle = function (paneIndex) {
        var pane = this.pane(paneIndex);
        if (pane.collapsible) {
            pane.collapsed = !pane.collapsed;
            pane.collapsedChange.emit(pane.collapsed);
            this.emit(this.layoutChange, {});
            if (pane.collapsed) {
                pane.detectChanges();
            }
        }
        var notCollapsed = this.panes.filter(function (p) { return !p.collapsed; });
        var allHaveFixedSize = notCollapsed.every(function (p) { return p.fixedSize; });
        notCollapsed[notCollapsed.length - 1].forceExpand = allHaveFixedSize ? true : false;
        return pane.collapsible;
    };
    SplitterService.prototype.toggleContentOverlay = function (index, show) {
        this.pane(index).toggleOverlay(show);
        this.pane(index + 1).toggleOverlay(show);
    };
    SplitterService.prototype.dragState = function (splitbarIndex) {
        var _this = this;
        var prev = this.pane(splitbarIndex);
        var next = this.pane(splitbarIndex + 1);
        var total = prev.computedSize + next.computedSize;
        var px = function (s) { return _this.toPixels(s); };
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
    };
    SplitterService.prototype.setSize = function (state, delta) {
        var _this = this;
        var clamp = function (min, max, v) { return Math.min(max, Math.max(min, v)); };
        var resize = function (paneState, change) {
            var pane = _this.pane(paneState.index);
            var splitterSize = _this.containerSize();
            var newSize = clamp(paneState.min, paneState.max, paneState.initialSize + change);
            var size = "";
            if (_this.isPercent(pane.size)) {
                size = (100 * newSize / splitterSize) + "%";
            }
            else {
                size = newSize + "px";
            }
            pane.size = size;
            _this.emit(pane.sizeChange, size);
        };
        var prev = this.pane(state.prev.index);
        var next = this.pane(state.next.index);
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
    };
    SplitterService.prototype.isDraggable = function (splitBarIndex) {
        var prev = this.pane(splitBarIndex);
        var next = this.pane(splitBarIndex + 1);
        var betweenResizablePanes = prev.resizable && next.resizable;
        var nearCollapsedPane = prev.collapsed || next.collapsed;
        return betweenResizablePanes && !nearCollapsedPane;
    };
    SplitterService.prototype.isStatic = function (splitBarIndex) {
        var prev = this.pane(splitBarIndex);
        var next = this.pane(splitBarIndex + 1);
        var betweenResizablePanes = prev.resizable && next.resizable;
        var nearCollapsiblePane = prev.collapsible || next.collapsible;
        return !betweenResizablePanes && !nearCollapsiblePane;
    };
    SplitterService.prototype.pane = function (index) {
        if (!this.panes) {
            throw new Error("Panes not initialized");
        }
        if (index < 0 || index >= this.panes.length) {
            throw new Error("Index out of range");
        }
        return this.panes[index];
    };
    SplitterService.prototype.configure = function (_a) {
        var panes = _a.panes, orientation = _a.orientation, containerSize = _a.containerSize;
        this.panes = panes;
        this.panes.forEach(function (pane, index) {
            pane.order = index * 2;
            pane.orientation = orientation;
        });
        if (core_1.isDevMode()) {
            var allFixed = panes.length && !panes.some(function (pane) { return !pane.fixedSize; });
            if (allFixed) {
                throw new Error("\n                    The Splitter should have at least one pane without a set size.\n                    See " + SIZING_DOC_LINK + " for more information.\n                ");
            }
        }
        this.containerSize = containerSize;
    };
    SplitterService.prototype.isPercent = function (size) {
        return /%$/.test(size);
    };
    SplitterService.prototype.toPixels = function (size) {
        var result = parseFloat(size);
        if (this.isPercent(size)) {
            result = (this.containerSize() * result / 100);
        }
        return result;
    };
    SplitterService.prototype.emit = function (emitter, args) {
        if (emitter.observers.length) {
            this.zone.run(function () { return emitter.emit(args); });
        }
    };
    SplitterService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SplitterService.ctorParameters = function () { return [
        { type: core_1.NgZone }
    ]; };
    return SplitterService;
}());
exports.SplitterService = SplitterService;
