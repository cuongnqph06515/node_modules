/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var splitter_service_1 = require("./splitter.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var stopPropagation = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
var ɵ0 = stopPropagation;
exports.ɵ0 = ɵ0;
var preventOnDblClick = function (release) { return function (mouseDown) {
    return rxjs_1.of(mouseDown).pipe(operators_1.delay(150), operators_1.takeUntil(release));
}; };
var ɵ1 = preventOnDblClick;
exports.ɵ1 = ɵ1;
var classFromObject = function (classes) { return Object.keys(classes).filter(function (c) { return classes[c]; }).join(' '); };
var ɵ2 = classFromObject;
exports.ɵ2 = ɵ2;
var createMoveStream = function (draggable) { return function (mouseDown) {
    return draggable.kendoDrag
        .pipe(operators_1.takeUntil(draggable.kendoRelease), operators_1.map(function (_a) {
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
exports.ɵ3 = ɵ3;
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
        this.subscriptions = new rxjs_1.Subscription();
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
        if (keyCode === kendo_angular_common_1.Keys.Enter) {
            event.preventDefault();
            this.collapseAny();
        }
        else if (isHorizontal && keyCode === kendo_angular_common_1.Keys.ArrowLeft) {
            resize(-10);
        }
        else if (isHorizontal && keyCode === kendo_angular_common_1.Keys.ArrowRight) {
            resize(10);
        }
        else if (!isHorizontal && keyCode === kendo_angular_common_1.Keys.ArrowUp) {
            resize(-10);
        }
        else if (!isHorizontal && keyCode === kendo_angular_common_1.Keys.ArrowDown) {
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
        var listener = this.draggable.kendoPress.pipe(operators_1.tap(stopPropagation), operators_1.filter(function () { return _this.splitter.isDraggable(_this.index); }), operators_1.tap(function () { return state = _this.splitter.dragState(_this.index); }), operators_1.tap(function () { return _this.splitter.toggleContentOverlay(_this.index, true); }), operators_1.switchMap(preventOnDblClick(this.draggable.kendoRelease)), operators_1.switchMap(createMoveStream(this.draggable))).subscribe(function (_a) {
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-splitter-bar',
                    template: "\n      <div [class]=\"previousArrowClass()\" (click)=\"togglePrevious()\"></div>\n      <div class=\"k-resize-handle\"></div>\n      <div [class]=\"nextArrowClass()\" (click)=\"toggleNext()\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterBarComponent.ctorParameters = function () { return [
        { type: kendo_angular_common_1.DraggableDirective, decorators: [{ type: core_1.Host }] },
        { type: splitter_service_1.SplitterService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    SplitterBarComponent.propDecorators = {
        orientation: [{ type: core_1.Input }, { type: core_1.HostBinding, args: ['attr.aria-orientation',] }],
        index: [{ type: core_1.Input }],
        ariaRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        focused: [{ type: core_1.HostBinding, args: ['class.k-state-focused',] }],
        tabIndex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class',] }],
        touchAction: [{ type: core_1.HostBinding, args: ['style.touch-action',] }],
        order: [{ type: core_1.HostBinding, args: ['style.-ms-flex-order',] }, { type: core_1.HostBinding, args: ['style.order',] }],
        collapseAny: [{ type: core_1.HostListener, args: ['dblclick',] }],
        onFocusIn: [{ type: core_1.HostListener, args: ['focusin',] }],
        onFocusOut: [{ type: core_1.HostListener, args: ['focusout',] }],
        onKeyDown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }]
    };
    return SplitterBarComponent;
}());
exports.SplitterBarComponent = SplitterBarComponent;
