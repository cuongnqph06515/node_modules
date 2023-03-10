/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var rxjs_1 = require("rxjs");
var drag_resize_service_1 = require("./drag-resize.service");
var util_1 = require("../common/util");
var util_2 = require("../common/util");
var window_resize_handle_directive_1 = require("./window-resize-handle.directive");
var window_titlebar_component_1 = require("./window-titlebar.component");
var navigation_service_1 = require("./navigation.service");
/**
 * Represents the [Kendo UI Window component for Angular]({% slug overview_window_dialogs %}).
 */
var WindowComponent = /** @class */ (function () {
    function WindowComponent(el, renderer, service, navigation, ngZone, localization) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.navigation = navigation;
        this.ngZone = ngZone;
        this.localization = localization;
        /**
         * Specifies if the content of the component is persisted in the DOM when minimized.
         * @default false
         */
        this.keepContent = false;
        /**
         * Fires when the user starts to move the Window.
         */
        this.dragStart = new core_1.EventEmitter();
        /**
         * Fires when the Window was moved by the user.
         */
        this.dragEnd = new core_1.EventEmitter();
        /**
         * Fires when the user starts to resize the Window.
         */
        this.resizeStart = new core_1.EventEmitter();
        /**
         * Fires when the Window was resized by the user.
         */
        this.resizeEnd = new core_1.EventEmitter();
        /**
         * Fires when the user closes the Window.
         */
        this.close = new core_1.EventEmitter();
        /**
         * Fires when the `width` property of the component was updated. The event is triggered only after the resizing
         * has ended. The event data contains the new width. Allows a two-way binding of the `width` property.
         */
        this.widthChange = new core_1.EventEmitter();
        /**
         * Fires when the `height` property of the component was updated. The event is triggered only after the resizing
         * has ended. The event data contains the new height. Allows a two-way binding of the `height` property.
         */
        this.heightChange = new core_1.EventEmitter();
        /**
         * Fires when the `top` property of the component was updated. The event is triggered only after the dragging
         * and resizing have ended. The event data contains the new top offset. Allows a two-way binding of the `top` property.
         */
        this.topChange = new core_1.EventEmitter();
        /**
         * Fires when the `left` property of the component was updated. The event is triggered only after the dragging
         * and resizing have ended. The event data contains the new left offset. Allows a two-way binding of the `left` property.
         */
        this.leftChange = new core_1.EventEmitter();
        /**
         * Fires when the `state` property of the component was updated. The event data contains the new state. Allows a
         * two-way binding of the `state` property.
         */
        this.stateChange = new core_1.EventEmitter();
        this.tabIndex = 0;
        this.draged = false;
        this.resized = false;
        this.windowSubscription = new rxjs_1.Subscription();
        this.direction = this.localization.rtl ? 'rtl' : 'ltr';
        this.localizationChangeSubscription = this.localization.changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.resizeDirections = util_2.RESIZE_DIRECTIONS;
        this.subscribeEvents();
    }
    Object.defineProperty(WindowComponent.prototype, "draggable", {
        get: function () {
            return this.options.draggable;
        },
        /**
         * Specifies whether the user will be able to drag the component.
         * @default true
         */
        set: function (value) {
            this.options.draggable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "resizable", {
        get: function () {
            return this.options.resizable;
        },
        /**
         * Specifies whether the user will be able to resize the component.
         * @default true
         */
        set: function (value) {
            this.options.resizable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "state", {
        get: function () {
            return this.options.state;
        },
        /**
         * Specifies the initial state of the component.
         * If not specified, the value is set to `default`.
         *
         * The possible values are:
         * * `minimized`
         * * `maximized`
         * * `default`
         */
        set: function (value) {
            this.options.state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "minWidth", {
        get: function () {
            return this.options.minWidth;
        },
        /**
         * Specifies the minimum width of the component.
         * The `minWidth` property has to be set in pixels.
         * @default 120
         */
        set: function (value) {
            this.setOption('minWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "minHeight", {
        get: function () {
            return this.options.minHeight;
        },
        /**
         * Specifies the minimum height of the Window.
         * The `minHeight` property has to be set in pixels.
         * @default 100
         */
        set: function (value) {
            this.setOption('minHeight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "width", {
        get: function () {
            return this.options.width;
        },
        /**
         * Specifies the width of the Window.
         * The `width` property has to be set in pixels.
         */
        set: function (value) {
            this.setOption('width', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "height", {
        get: function () {
            return this.options.height;
        },
        /**
         * Specifies the height of the Window.
         * The `height` property has to be set in pixels.
         */
        set: function (value) {
            this.setOption('height', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "top", {
        get: function () {
            return this.options.top;
        },
        /**
         * Specifies the initial top offset of the Window.
         * The `top` property has to be set in pixels.
         */
        set: function (value) {
            this.setOption('top', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "left", {
        get: function () {
            return this.options.left;
        },
        /**
         * Specifies the initial left offset of the Window.
         * Numeric values are treated as pixels.
         */
        set: function (value) {
            this.setOption('left', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "closeButtonTitle", {
        get: function () {
            if (this.messages && this.messages.closeTitle) {
                return this.messages.closeTitle;
            }
            return this.localization.get('closeTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "restoreButtonTitle", {
        get: function () {
            if (this.messages && this.messages.restoreTitle) {
                return this.messages.restoreTitle;
            }
            return this.localization.get('restoreTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "maximizeButtonTitle", {
        get: function () {
            if (this.messages && this.messages.maximizeTitle) {
                return this.messages.maximizeTitle;
            }
            return this.localization.get('maximizeTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "minimizeButtonTitle", {
        get: function () {
            if (this.messages && this.messages.minimizeTitle) {
                return this.messages.minimizeTitle;
            }
            return this.localization.get('minimizeTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    WindowComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.setNextZIndex();
        this.handleInitialFocus();
        this.ngZone.runOutsideAngular(function () {
            return Promise.resolve(null).then(function () { return _this.setInitialOffset(); });
        });
    };
    WindowComponent.prototype.ngOnInit = function () {
        this.renderer.removeAttribute(this.el.nativeElement, 'title');
        this.service.init(this.el);
    };
    WindowComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        util_1.OFFSET_STYLES.forEach(function (style) {
            if (kendo_angular_common_1.isChanged(style, changes)) {
                _this.setStyle(style, _this.options[style]);
            }
        });
        if (kendo_angular_common_1.isChanged('draggable', changes)) {
            var titleBar = util_1.isPresent(this.titleBarContent) ? this.titleBarContent : this.titleBarView;
            if (util_1.isTruthy(changes.draggable.currentValue)) {
                titleBar.subscribeDrag();
            }
            else {
                titleBar.unsubscribeDrag();
            }
        }
        if (kendo_angular_common_1.isChanged('state', changes)) {
            if (util_1.isPresent(this.service.lastAction)) {
                this.service.lastAction = null;
            }
            else {
                this.service.applyManualState();
                this.updateAllOffset();
            }
        }
    };
    WindowComponent.prototype.ngOnDestroy = function () {
        if (this.windowSubscription) {
            this.windowSubscription.unsubscribe();
        }
        this.localizationChangeSubscription.unsubscribe();
    };
    /**
     * Focuses the wrapper of the Window component.
     */
    WindowComponent.prototype.focus = function () {
        var wrapper = this.el.nativeElement;
        if (util_1.isPresent(wrapper)) {
            wrapper.focus();
        }
    };
    /**
     * Brings the current Window component on top of other Window components on the page.
     */
    WindowComponent.prototype.bringToFront = function () {
        this.setNextZIndex();
    };
    /**
     * Manually updates the `width` or `height` option of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for sizing dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowDimensionSetting} dimension - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    WindowComponent.prototype.setDimension = function (dimension, value) {
        this.setOption(dimension, value);
        this.setStyle(dimension, value);
    };
    /**
     * Manually updates the `top` or `left` offset of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for positioning dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowOffsetSetting} offset - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    WindowComponent.prototype.setOffset = function (offset, value) {
        this.setOption(offset, value);
        this.setStyle(offset, value);
    };
    Object.defineProperty(WindowComponent.prototype, "showDefaultTitleBar", {
        get: function () {
            return !util_1.isPresent(this.titleBarContent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "styleMinWidth", {
        get: function () {
            return this.minWidth + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "styleMinHeight", {
        get: function () {
            return this.minHeight + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "stylePosition", {
        get: function () {
            return this.options.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "wrapperMaximizedClass", {
        get: function () {
            return this.state === 'maximized';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "wrapperMinimizedClass", {
        get: function () {
            return this.state === 'minimized';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WindowComponent.prototype.onComponentKeydown = function (event) {
        if (util_1.hasClasses(event.target, util_1.WINDOW_CLASSES)) {
            this.navigation.process(event);
        }
    };
    /**
     * @hidden
     */
    WindowComponent.prototype.onComponentFocus = function () {
        this.renderer.addClass(this.el.nativeElement, 'k-state-focused');
        this.setNextZIndex();
    };
    /**
     * @hidden
     */
    WindowComponent.prototype.onComponentBlur = function () {
        this.renderer.removeClass(this.el.nativeElement, 'k-state-focused');
    };
    WindowComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.windowSubscription.add(this.service.focus.subscribe(function () {
            _this.el.nativeElement.focus();
        }));
        this.windowSubscription.add(this.service.dragStart.subscribe(function () {
            _this.draged = true;
            _this.ngZone.run(function () {
                _this.dragStart.emit();
            });
        }));
        this.windowSubscription.add(this.service.dragEnd.subscribe(function () {
            if (_this.draged) {
                _this.draged = false;
                _this.ngZone.run(function () {
                    _this.dragEnd.emit();
                });
            }
        }));
        this.windowSubscription.add(this.service.close.subscribe(function () {
            _this.close.emit();
        }));
        this.windowSubscription.add(this.service.resizeStart.subscribe(function () {
            _this.resized = true;
            _this.ngZone.run(function () {
                _this.resizeStart.emit();
            });
        }));
        this.windowSubscription.add(this.service.resizeEnd.subscribe(function () {
            if (_this.resized) {
                _this.resized = false;
                _this.ngZone.run(function () {
                    _this.resizeEnd.emit();
                });
            }
        }));
        this.windowSubscription.add(this.service.change.subscribe(function (ev) {
            util_1.OFFSET_STYLES.forEach(function (style) {
                if (util_1.isPresent(ev[style])) {
                    _this.setStyle(style, ev[style]);
                    if (_this.state !== 'maximized') {
                        var emitter_1 = _this[style + 'Change'];
                        if (emitter_1.observers.length) {
                            _this.ngZone.run(function () {
                                emitter_1.emit(ev[style]);
                            });
                        }
                    }
                }
            });
        }));
        this.windowSubscription.add(this.service.stateChange.subscribe(function (state) {
            if (util_1.isPresent(_this.service.lastAction)) {
                _this.updateAllOffset();
                _this.stateChange.emit(state);
            }
        }));
    };
    WindowComponent.prototype.setNextZIndex = function () {
        var currentZIndex = this.el.nativeElement.style['z-index'];
        var nextPossibleZIndex = this.service.nextPossibleZIndex;
        if (!currentZIndex || (nextPossibleZIndex - currentZIndex > 1)) {
            this.renderer.setStyle(this.el.nativeElement, "z-index", this.service.nextZIndex);
        }
    };
    WindowComponent.prototype.setInitialOffset = function () {
        if (this.state !== 'maximized') {
            this.updateAllOffset();
            if (!util_1.isPresent(this.left) || !util_1.isPresent(this.top)) {
                this.service.center();
            }
        }
        else {
            var viewPort = this.service.windowViewPort;
            this.setStyle('width', viewPort.width);
            this.setStyle('height', viewPort.height);
            this.setStyle('top', 0);
            this.setStyle('left', 0);
        }
    };
    WindowComponent.prototype.updateAllOffset = function () {
        var _this = this;
        util_1.OFFSET_STYLES.forEach(function (style) {
            if (util_1.isPresent(_this[style])) {
                _this.setStyle(style, _this[style]);
            }
            else {
                _this.removeStyle(style);
            }
        });
    };
    WindowComponent.prototype.setStyle = function (style, value) {
        this.renderer.setStyle(this.el.nativeElement, style, value + 'px');
    };
    WindowComponent.prototype.removeStyle = function (style) {
        this.renderer.removeStyle(this.el.nativeElement, style);
    };
    Object.defineProperty(WindowComponent.prototype, "options", {
        get: function () {
            return this.service.options;
        },
        enumerable: true,
        configurable: true
    });
    WindowComponent.prototype.setOption = function (style, value) {
        if (typeof value !== 'number' && typeof value !== 'string') {
            return;
        }
        var parsedValue = (typeof value === 'number') ? value : parseInt(value, 10);
        this.options[style] = parsedValue;
        this.service.setRestoreOption(style, parsedValue);
    };
    WindowComponent.prototype.handleInitialFocus = function () {
        var wrapper = this.el.nativeElement;
        if (this.autoFocusedElement) {
            var initiallyFocusedElement = wrapper.querySelector(this.autoFocusedElement);
            if (initiallyFocusedElement) {
                initiallyFocusedElement.focus();
            }
        }
        else {
            this.focus();
        }
    };
    WindowComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoWindow',
                    providers: [
                        drag_resize_service_1.DragResizeService,
                        navigation_service_1.NavigationService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.window'
                        }
                    ],
                    selector: 'kendo-window',
                    template: "\n        <ng-container kendoWindowLocalizedMessages\n            i18n-closeTitle=\"kendo.window.closeTitle|The title of the close button\"\n            closeTitle=\"Close\"\n\n            i18n-restoreTitle=\"kendo.window.restoreTitle|The title of the restore button\"\n            restoreTitle=\"Restore\"\n\n            i18n-maximizeTitle=\"kendo.window.maximizeTitle|The title of the maximize button\"\n            maximizeTitle=\"Maximize\"\n\n            i18n-minimizeTitle=\"kendo.window.minimizeTitle|The title of the minimize button\"\n            minimizeTitle=\"Minimize\"\n        >\n        <ng-container>\n\n        <kendo-window-titlebar *ngIf=\"showDefaultTitleBar\" [template]=\"titleBarTemplate\">\n            <div class=\"k-window-title\">{{ title }}</div>\n            <div class=\"k-window-actions\">\n                <button kendoWindowMinimizeAction  [attr.title]=\"minimizeButtonTitle\" [attr.aria-label]=\"minimizeButtonTitle\"></button>\n                <button kendoWindowMaximizeAction [attr.title]=\"maximizeButtonTitle\" [attr.aria-label]=\"maximizeButtonTitle\"></button>\n                <button kendoWindowRestoreAction [attr.title]=\"restoreButtonTitle\" [attr.aria-label]=\"restoreButtonTitle\"></button>\n                <button kendoWindowCloseAction [attr.title]=\"closeButtonTitle\" [attr.aria-label]=\"closeButtonTitle\"></button>\n            </div>\n        </kendo-window-titlebar>\n        <ng-content select=\"kendo-window-titlebar\" *ngIf=\"!showDefaultTitleBar\"></ng-content>\n\n        <div *ngIf=\"state !== 'minimized' || keepContent\"\n            [hidden]=\"state === 'minimized' && keepContent\"\n            class=\"k-content k-window-content\"\n        >\n            <ng-content *ngIf=\"!contentTemplate\"></ng-content>\n            <ng-template [ngTemplateOutlet]=\"contentTemplate\" *ngIf=\"contentTemplate\"></ng-template>\n        </div>\n\n        <ng-template [ngIf]='resizable'>\n            <div *ngFor='let dir of resizeDirections'\n                [direction]=\"dir\"\n                kendoWindowResizeHandle\n                kendoDraggable>\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WindowComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: drag_resize_service_1.DragResizeService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.NgZone },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    WindowComponent.propDecorators = {
        autoFocusedElement: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        draggable: [{ type: core_1.Input }],
        resizable: [{ type: core_1.Input }],
        keepContent: [{ type: core_1.Input }],
        state: [{ type: core_1.Input }],
        minWidth: [{ type: core_1.Input }],
        minHeight: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        top: [{ type: core_1.Input }],
        left: [{ type: core_1.Input }],
        dragStart: [{ type: core_1.Output }],
        dragEnd: [{ type: core_1.Output }],
        resizeStart: [{ type: core_1.Output }],
        resizeEnd: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        widthChange: [{ type: core_1.Output }],
        heightChange: [{ type: core_1.Output }],
        topChange: [{ type: core_1.Output }],
        leftChange: [{ type: core_1.Output }],
        stateChange: [{ type: core_1.Output }],
        tabIndex: [{ type: core_1.HostBinding, args: ['attr.tabIndex',] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-window',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        titleBarView: [{ type: core_1.ViewChild, args: [window_titlebar_component_1.WindowTitleBarComponent,] }],
        titleBarContent: [{ type: core_1.ContentChild, args: [window_titlebar_component_1.WindowTitleBarComponent,] }],
        resizeHandles: [{ type: core_1.ViewChildren, args: [window_resize_handle_directive_1.ResizeHandleDirective,] }],
        styleMinWidth: [{ type: core_1.HostBinding, args: ['style.minWidth',] }],
        styleMinHeight: [{ type: core_1.HostBinding, args: ['style.minHeight',] }],
        stylePosition: [{ type: core_1.HostBinding, args: ['style.position',] }],
        wrapperMaximizedClass: [{ type: core_1.HostBinding, args: ['class.k-window-maximized',] }],
        wrapperMinimizedClass: [{ type: core_1.HostBinding, args: ['class.k-window-minimized',] }],
        onComponentKeydown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }],
        onComponentFocus: [{ type: core_1.HostListener, args: ['focus',] }],
        onComponentBlur: [{ type: core_1.HostListener, args: ['blur',] }]
    };
    return WindowComponent;
}());
exports.WindowComponent = WindowComponent;
