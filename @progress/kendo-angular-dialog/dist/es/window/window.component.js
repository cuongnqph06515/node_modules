/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, HostBinding, EventEmitter, ContentChild, ElementRef, Renderer2, ViewChildren, QueryList, HostListener, NgZone, ViewChild } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { Subscription } from 'rxjs';
import { DragResizeService } from './drag-resize.service';
import { OFFSET_STYLES, isPresent, isTruthy, hasClasses, WINDOW_CLASSES } from '../common/util';
import { RESIZE_DIRECTIONS } from "../common/util";
import { ResizeHandleDirective } from './window-resize-handle.directive';
import { WindowTitleBarComponent } from './window-titlebar.component';
import { NavigationService } from './navigation.service';
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
        this.dragStart = new EventEmitter();
        /**
         * Fires when the Window was moved by the user.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires when the user starts to resize the Window.
         */
        this.resizeStart = new EventEmitter();
        /**
         * Fires when the Window was resized by the user.
         */
        this.resizeEnd = new EventEmitter();
        /**
         * Fires when the user closes the Window.
         */
        this.close = new EventEmitter();
        /**
         * Fires when the `width` property of the component was updated. The event is triggered only after the resizing
         * has ended. The event data contains the new width. Allows a two-way binding of the `width` property.
         */
        this.widthChange = new EventEmitter();
        /**
         * Fires when the `height` property of the component was updated. The event is triggered only after the resizing
         * has ended. The event data contains the new height. Allows a two-way binding of the `height` property.
         */
        this.heightChange = new EventEmitter();
        /**
         * Fires when the `top` property of the component was updated. The event is triggered only after the dragging
         * and resizing have ended. The event data contains the new top offset. Allows a two-way binding of the `top` property.
         */
        this.topChange = new EventEmitter();
        /**
         * Fires when the `left` property of the component was updated. The event is triggered only after the dragging
         * and resizing have ended. The event data contains the new left offset. Allows a two-way binding of the `left` property.
         */
        this.leftChange = new EventEmitter();
        /**
         * Fires when the `state` property of the component was updated. The event data contains the new state. Allows a
         * two-way binding of the `state` property.
         */
        this.stateChange = new EventEmitter();
        this.tabIndex = 0;
        this.draged = false;
        this.resized = false;
        this.windowSubscription = new Subscription();
        this.direction = this.localization.rtl ? 'rtl' : 'ltr';
        this.localizationChangeSubscription = this.localization.changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.resizeDirections = RESIZE_DIRECTIONS;
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
        OFFSET_STYLES.forEach(function (style) {
            if (isChanged(style, changes)) {
                _this.setStyle(style, _this.options[style]);
            }
        });
        if (isChanged('draggable', changes)) {
            var titleBar = isPresent(this.titleBarContent) ? this.titleBarContent : this.titleBarView;
            if (isTruthy(changes.draggable.currentValue)) {
                titleBar.subscribeDrag();
            }
            else {
                titleBar.unsubscribeDrag();
            }
        }
        if (isChanged('state', changes)) {
            if (isPresent(this.service.lastAction)) {
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
        if (isPresent(wrapper)) {
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
            return !isPresent(this.titleBarContent);
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
        if (hasClasses(event.target, WINDOW_CLASSES)) {
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
        if (!isDocumentAvailable()) {
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
            OFFSET_STYLES.forEach(function (style) {
                if (isPresent(ev[style])) {
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
            if (isPresent(_this.service.lastAction)) {
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
            if (!isPresent(this.left) || !isPresent(this.top)) {
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
        OFFSET_STYLES.forEach(function (style) {
            if (isPresent(_this[style])) {
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
        { type: Component, args: [{
                    exportAs: 'kendoWindow',
                    providers: [
                        DragResizeService,
                        NavigationService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.window'
                        }
                    ],
                    selector: 'kendo-window',
                    template: "\n        <ng-container kendoWindowLocalizedMessages\n            i18n-closeTitle=\"kendo.window.closeTitle|The title of the close button\"\n            closeTitle=\"Close\"\n\n            i18n-restoreTitle=\"kendo.window.restoreTitle|The title of the restore button\"\n            restoreTitle=\"Restore\"\n\n            i18n-maximizeTitle=\"kendo.window.maximizeTitle|The title of the maximize button\"\n            maximizeTitle=\"Maximize\"\n\n            i18n-minimizeTitle=\"kendo.window.minimizeTitle|The title of the minimize button\"\n            minimizeTitle=\"Minimize\"\n        >\n        <ng-container>\n\n        <kendo-window-titlebar *ngIf=\"showDefaultTitleBar\" [template]=\"titleBarTemplate\">\n            <div class=\"k-window-title\">{{ title }}</div>\n            <div class=\"k-window-actions\">\n                <button kendoWindowMinimizeAction  [attr.title]=\"minimizeButtonTitle\" [attr.aria-label]=\"minimizeButtonTitle\"></button>\n                <button kendoWindowMaximizeAction [attr.title]=\"maximizeButtonTitle\" [attr.aria-label]=\"maximizeButtonTitle\"></button>\n                <button kendoWindowRestoreAction [attr.title]=\"restoreButtonTitle\" [attr.aria-label]=\"restoreButtonTitle\"></button>\n                <button kendoWindowCloseAction [attr.title]=\"closeButtonTitle\" [attr.aria-label]=\"closeButtonTitle\"></button>\n            </div>\n        </kendo-window-titlebar>\n        <ng-content select=\"kendo-window-titlebar\" *ngIf=\"!showDefaultTitleBar\"></ng-content>\n\n        <div *ngIf=\"state !== 'minimized' || keepContent\"\n            [hidden]=\"state === 'minimized' && keepContent\"\n            class=\"k-content k-window-content\"\n        >\n            <ng-content *ngIf=\"!contentTemplate\"></ng-content>\n            <ng-template [ngTemplateOutlet]=\"contentTemplate\" *ngIf=\"contentTemplate\"></ng-template>\n        </div>\n\n        <ng-template [ngIf]='resizable'>\n            <div *ngFor='let dir of resizeDirections'\n                [direction]=\"dir\"\n                kendoWindowResizeHandle\n                kendoDraggable>\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WindowComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService },
        { type: NavigationService },
        { type: NgZone },
        { type: LocalizationService }
    ]; };
    WindowComponent.propDecorators = {
        autoFocusedElement: [{ type: Input }],
        title: [{ type: Input }],
        draggable: [{ type: Input }],
        resizable: [{ type: Input }],
        keepContent: [{ type: Input }],
        state: [{ type: Input }],
        minWidth: [{ type: Input }],
        minHeight: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        top: [{ type: Input }],
        left: [{ type: Input }],
        dragStart: [{ type: Output }],
        dragEnd: [{ type: Output }],
        resizeStart: [{ type: Output }],
        resizeEnd: [{ type: Output }],
        close: [{ type: Output }],
        widthChange: [{ type: Output }],
        heightChange: [{ type: Output }],
        topChange: [{ type: Output }],
        leftChange: [{ type: Output }],
        stateChange: [{ type: Output }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-window',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        titleBarView: [{ type: ViewChild, args: [WindowTitleBarComponent,] }],
        titleBarContent: [{ type: ContentChild, args: [WindowTitleBarComponent,] }],
        resizeHandles: [{ type: ViewChildren, args: [ResizeHandleDirective,] }],
        styleMinWidth: [{ type: HostBinding, args: ['style.minWidth',] }],
        styleMinHeight: [{ type: HostBinding, args: ['style.minHeight',] }],
        stylePosition: [{ type: HostBinding, args: ['style.position',] }],
        wrapperMaximizedClass: [{ type: HostBinding, args: ['class.k-window-maximized',] }],
        wrapperMinimizedClass: [{ type: HostBinding, args: ['class.k-window-minimized',] }],
        onComponentKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onComponentFocus: [{ type: HostListener, args: ['focus',] }],
        onComponentBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return WindowComponent;
}());
export { WindowComponent };
