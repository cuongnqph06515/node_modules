/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Host, HostBinding, HostListener, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DraggableDirective, Keys } from '@progress/kendo-angular-common';
import { SplitterService } from './splitter.service';
import { Subscription, of } from 'rxjs';
import { delay, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
var stopPropagation = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
var ɵ0 = stopPropagation;
var preventOnDblClick = function (release) { return function (mouseDown) {
    return of(mouseDown).pipe(delay(150), takeUntil(release));
}; };
var ɵ1 = preventOnDblClick;
var classFromObject = function (classes) { return Object.keys(classes).filter(function (c) { return classes[c]; }).join(' '); };
var ɵ2 = classFromObject;
var createMoveStream = function (draggable) { return function (mouseDown) {
    return draggable.kendoDrag
        .pipe(takeUntil(draggable.kendoRelease), map(function (_a) {
        var pageX = _a.pageX, pageY = _a.pageY;
        return ({
            originalX: mouseDown.pageX,
            originalY: mouseDown.pageY,
            pageX: pageX,
            pageY: pageY
        });
    }));
}; };
var ɵ3 = createMoveStream;
/**
 * @hidden
 */
var SplitterBarComponent = /** @class */ (function () {
    function SplitterBarComponent(draggable, splitter, localization) {
        this.draggable = draggable;
        this.splitter = splitter;
        this.localization = localization;
        this.orientation = 'horizontal';
        this.index = 0;
        this.ariaRole = 'separator';
        this.focused = false;
        this.subscriptions = new Subscription();
    }
    Object.defineProperty(SplitterBarComponent.prototype, "direction", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "tabIndex", {
        get: function () {
            return this.splitter.isStatic(this.index) ? -1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "hostClasses", {
        get: function () {
            var isHorizontal = this.orientation === 'horizontal';
            var isDraggable = this.splitter.isDraggable(this.index);
            var isStatic = this.splitter.isStatic(this.index);
            return classFromObject({
                'k-state-focused': this.focused,
                'k-splitbar': true,
                'k-splitbar-horizontal': isHorizontal,
                'k-splitbar-vertical': !isHorizontal,
                'k-splitbar-draggable-horizontal': isHorizontal && isDraggable,
                'k-splitbar-draggable-vertical': !isHorizontal && isDraggable,
                'k-splitbar-static-horizontal': isHorizontal && isStatic,
                'k-splitbar-static-vertical': !isHorizontal && isStatic
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "touchAction", {
        get: function () {
            if (this.splitter.isDraggable(this.index)) {
                return 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "order", {
        get: function () {
            return 2 * this.index + 1;
        },
        enumerable: true,
        configurable: true
    });
    SplitterBarComponent.prototype.collapseAny = function () {
        if (this.expandLast) {
            this.toggleNext();
        }
        else {
            this.tryToggleNearest();
        }
    };
    SplitterBarComponent.prototype.onFocusIn = function () {
        this.focused = true;
    };
    SplitterBarComponent.prototype.onFocusOut = function () {
        this.focused = false;
    };
    SplitterBarComponent.prototype.onKeyDown = function (event) {
        var _this = this;
        var keyCode = event && event.keyCode;
        var isHorizontal = this.orientation === 'horizontal';
        var resize = function (delta) {
            event.preventDefault();
            var state = _this.splitter.dragState(_this.index);
            _this.splitter.setSize(state, delta);
        };
        if (keyCode === Keys.Enter) {
            event.preventDefault();
            this.collapseAny();
        }
        else if (isHorizontal && keyCode === Keys.ArrowLeft) {
            resize(-10);
        }
        else if (isHorizontal && keyCode === Keys.ArrowRight) {
            resize(10);
        }
        else if (!isHorizontal && keyCode === Keys.ArrowUp) {
            resize(-10);
        }
        else if (!isHorizontal && keyCode === Keys.ArrowDown) {
            resize(10);
        }
    };
    Object.defineProperty(SplitterBarComponent.prototype, "expandLast", {
        get: function () {
            var panes = this.splitter.panes;
            return panes.length === 2 && panes[1].collapsed;
        },
        enumerable: true,
        configurable: true
    });
    SplitterBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        var state;
        var listener = this.draggable.kendoPress.pipe(tap(stopPropagation), filter(function () { return _this.splitter.isDraggable(_this.index); }), tap(function () { return state = _this.splitter.dragState(_this.index); }), tap(function () { return _this.splitter.toggleContentOverlay(_this.index, true); }), switchMap(preventOnDblClick(this.draggable.kendoRelease)), switchMap(createMoveStream(this.draggable))).subscribe(function (_a) {
            var pageX = _a.pageX, pageY = _a.pageY, originalX = _a.originalX, originalY = _a.originalY;
            var delta;
            if (_this.orientation === 'vertical') {
                delta = pageY - originalY;
            }
            else if (_this.direction === 'rtl') {
                delta = originalX - pageX;
            }
            else {
                delta = pageX - originalX;
            }
            _this.splitter.setSize(state, delta);
        });
        this.subscriptions.add(listener);
        this.subscriptions.add(this.draggable.kendoRelease.subscribe(function () { return _this.splitter.toggleContentOverlay(_this.index, false); }));
    };
    SplitterBarComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    SplitterBarComponent.prototype.togglePrevious = function () {
        this.splitter.tryToggle(this.index);
    };
    SplitterBarComponent.prototype.toggleNext = function () {
        this.splitter.tryToggle(this.index + 1);
    };
    SplitterBarComponent.prototype.previousArrowClass = function () {
        var pane = this.splitter.pane(this.index);
        var nextPane = this.splitter.pane(this.index + 1);
        var isCollapsible = pane.collapsible;
        var isCollapsed = pane.collapsed;
        var isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || nextPane.isHidden,
            'k-collapse-prev': isCollapsible,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && isCollapsed
        });
    };
    SplitterBarComponent.prototype.nextArrowClass = function () {
        var pane = this.splitter.pane(this.index + 1);
        var prevPane = this.splitter.pane(this.index);
        var isCollapsible = pane.collapsible;
        var isCollapsed = pane.collapsed;
        var isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || prevPane.isHidden,
            'k-collapse-next': isCollapsible,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && isCollapsed
        });
    };
    SplitterBarComponent.prototype.tryToggleNearest = function () {
        var prev = this.index;
        var next = this.index + 1;
        if (!this.splitter.tryToggle(prev)) {
            this.splitter.tryToggle(next);
        }
    };
    SplitterBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-splitter-bar',
                    template: "\n      <div [class]=\"previousArrowClass()\" (click)=\"togglePrevious()\"></div>\n      <div class=\"k-resize-handle\"></div>\n      <div [class]=\"nextArrowClass()\" (click)=\"toggleNext()\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterBarComponent.ctorParameters = function () { return [
        { type: DraggableDirective, decorators: [{ type: Host }] },
        { type: SplitterService },
        { type: LocalizationService }
    ]; };
    SplitterBarComponent.propDecorators = {
        orientation: [{ type: Input }, { type: HostBinding, args: ['attr.aria-orientation',] }],
        index: [{ type: Input }],
        ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
        focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        hostClasses: [{ type: HostBinding, args: ['class',] }],
        touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
        order: [{ type: HostBinding, args: ['style.-ms-flex-order',] }, { type: HostBinding, args: ['style.order',] }],
        collapseAny: [{ type: HostListener, args: ['dblclick',] }],
        onFocusIn: [{ type: HostListener, args: ['focusin',] }],
        onFocusOut: [{ type: HostListener, args: ['focusout',] }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return SplitterBarComponent;
}());
export { SplitterBarComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3 };
