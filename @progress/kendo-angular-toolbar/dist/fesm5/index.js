/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Injectable, Input, NgModule, NgZone, Output, Renderer2, ViewChild, ViewChildren, ViewContainerRef, forwardRef } from '@angular/core';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { Keys, ResizeSensorModule, isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { __extends } from 'tslib';
import { Button, ButtonsModule, DropDownButtonComponent } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';

/**
 * @hidden
 */
var RefreshService = /** @class */ (function () {
    function RefreshService() {
        this.onRefresh = new EventEmitter();
    }
    RefreshService.prototype.refresh = function (tool) {
        this.onRefresh.emit(tool);
    };
    RefreshService.decorators = [
        { type: Injectable },
    ];
    return RefreshService;
}());

/**
 * @hidden
 */
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += (parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0);
    return width;
}
/**
 * @hidden
 */
function innerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width -= (parseFloat(style.paddingLeft) || 0 + parseFloat(style.borderLeftWidth) || 0);
    width -= (parseFloat(style.paddingRight) || 0 + parseFloat(style.borderRightWidth) || 0);
    return width;
}
/**
 * @hidden
 */

/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    var hasSize = rect.width > 0 && rect.height > 0;
    var hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they should still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
var findElement = function (node, predicate, matchSelf) {
    if (matchSelf === void 0) { matchSelf = true; }
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            var element = findElement(node, predicate);
            if (element) {
                return element;
            }
        }
        node = node.nextSibling;
    }
};
/**
 * @hidden
 */
var isFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var focusable = tabIndex !== null;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
var findFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return findElement(element, function (node) { return isFocusable(node, checkVisibility); });
};
/**
 * @hidden
 */
var findFocusableChild = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return findElement(element, function (node) { return isFocusable(node, checkVisibility); }, false);
};
/**
 * @hidden
 */
var findFocusableSibling = function (element, checkVisibility, reverse) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    var node = reverse ? element.prevSibling : element.nextSibling;
    while (node) {
        if (node.nodeType === 1) {
            var result = findElement(node, function (el) { return isFocusable(el, checkVisibility); });
            if (result) {
                return result;
            }
        }
        node = reverse ? node.prevSibling : node.nextSibling;
    }
};
/**
 * @hidden
 */
var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
var getValueForLocation = function (property, displayMode, overflows) {
    switch (displayMode) {
        case 'toolbar':
            return overflows ? undefined : property;
        case 'overflow':
            return overflows ? property : undefined;
        default:
            return property;
    }
};

/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService() {
        this.keydown = new EventEmitter();
        this.isPopupFocused = false;
        this.tools = [];
        this.isFocusLocked = false;
        this.isOverflowButtonFocused = false;
    }
    NavigationService.prototype.register = function (t) {
        this.tools.push(t);
    };
    NavigationService.prototype.unregister = function (t) {
        this.tools.splice(this.tools.indexOf(t), 1);
    };
    NavigationService.prototype.moveFocusToToolBar = function () {
        this.isPopupFocused = false;
        this.focusOverflowButton();
    };
    NavigationService.prototype.moveFocusToPopup = function () {
        this.isPopupFocused = true;
    };
    NavigationService.prototype.focus = function (tool, focusLast) {
        var _this = this;
        this.focused = tool;
        this.tools.filter(function (t) { return t !== _this.focused; }).forEach(function (t) { return t.navigationService.defocus(); });
        this.isOverflowButtonFocused = false;
        tool.navigationService.focus(focusLast);
    };
    NavigationService.prototype.focusOverflowButton = function () {
        this.isOverflowButtonFocused = true;
        this.overflowButton.nativeElement.focus();
    };
    NavigationService.prototype.focusFirst = function () {
        if (this.isFocusLocked) {
            return;
        }
        var tool = this.tools.find(function (t) {
            if (t.navigationService.canFocus()) {
                return true;
            }
            else {
                return false;
            }
        });
        if (tool) {
            this.focus(tool);
        }
    };
    NavigationService.prototype.focusPrev = function (index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusPrevSibling();
        //     return;
        // }
        if (!isPresent(index)) {
            if (this.isOverflowButtonFocused) {
                index = this.tools.length - 1;
            }
            else {
                index = this.tools.indexOf(this.focused) - 1;
            }
        }
        if (this.isFocusLocked || !this.tools.length || index < 0) {
            return;
        }
        var tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool, true);
        }
        else {
            this.focusPrev(index - 1);
        }
    };
    NavigationService.prototype.focusNext = function (index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusNextSibling();
        //     return;
        // }
        var overflowButtonIsVisible = this.overflowButton && this.overflowButton.nativeElement.style.visibility === 'visible';
        if (!isPresent(index)) {
            index = this.tools.indexOf(this.focused) + 1;
        }
        if (index >= this.tools.length && overflowButtonIsVisible && !this.isOverflowButtonFocused) {
            this.focusOverflowButton();
        }
        if (this.isFocusLocked || !this.tools.length || index >= this.tools.length) {
            return;
        }
        var tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool);
        }
        else {
            this.focusNext(index + 1);
        }
    };
    NavigationService.prototype.lock = function () {
        this.isFocusLocked = true;
    };
    NavigationService.prototype.unlock = function () {
        this.isFocusLocked = false;
    };
    NavigationService.prototype.focusEnter = function () {
        //TODO
        // if (this.focused.hasFocusableChild()) {
        //     this.isFocusLocked = true;
        //     this.focused.focusInside();
        // }
    };
    NavigationService.prototype.focusLeave = function () {
        //TODO
        // if (this.isFocusLocked) {
        //     this.isFocusLocked = false;
        //     this.focus(this.focused);
        // }
    };
    NavigationService.prototype.defocus = function (t) {
        t.navigationService.defocus();
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    return NavigationService;
}());

/**
 * @hidden
 */
var ToolNavigationService = /** @class */ (function () {
    function ToolNavigationService() {
    }
    ToolNavigationService.prototype.register = function (rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    };
    ToolNavigationService.prototype.canFocus = function () {
        return false;
    };
    ToolNavigationService.prototype.focus = function () { };
    ToolNavigationService.prototype.defocus = function () { };
    ToolNavigationService.prototype.hasFocus = function () {
        return false;
    };
    ToolNavigationService.decorators = [
        { type: Injectable },
    ];
    return ToolNavigationService;
}());

/**
 * Represents the Base ToolBar Tool component for Angular.
 * Extend this class to create custom tools.
 */
var ToolBarToolComponent = /** @class */ (function () {
    function ToolBarToolComponent() {
        this.tabIndex = -1; //Focus movement inside the toolbar is managed using roving tabindex.
        this.overflows = true;
        // this should be replaced with showTool: DisplayMode = 'both';
        /**
         * @hidden
         */
        this.responsive = true;
        if (!this.navigationService) {
            this.navigationService = new ToolNavigationService();
        }
    }
    Object.defineProperty(ToolBarToolComponent.prototype, "toolbarDisplay", {
        get: function () {
            return this.overflows ? 'none' : 'inline-block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarToolComponent.prototype, "overflowDisplay", {
        get: function () {
            return this.overflows ? 'block' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    ToolBarToolComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'toolbar-tool',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ToolBarToolComponent.ctorParameters = function () { return []; };
    ToolBarToolComponent.propDecorators = {
        responsive: [{ type: Input }]
    };
    return ToolBarToolComponent;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * @hidden
 */
var RendererService = /** @class */ (function () {
    function RendererService() {
    }
    RendererService.prototype.getElement = function () {
        return this.element.nativeElement;
    };
    RendererService.prototype.querySelector = function (selector) {
        return this.element.nativeElement.querySelector(selector);
    };
    RendererService.prototype.querySelectorAll = function (selector) {
        return this.element.nativeElement.querySelectorAll(selector);
    };
    RendererService.prototype.findFocusable = function () {
        return findFocusable(this.element.nativeElement, false);
    };
    RendererService.prototype.findFocusableChild = function (element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableChild(element, false);
    };
    RendererService.prototype.findNextFocusableSibling = function (element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableSibling(element, false);
    };
    RendererService.prototype.findPrevFocusableSibling = function (element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableSibling(element, false, true);
    };
    RendererService.prototype.setAttribute = function (element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    };
    RendererService.decorators = [
        { type: Injectable },
    ];
    return RendererService;
}());

/**
 * @hidden
 */
var ToolBarRendererComponent = /** @class */ (function () {
    function ToolBarRendererComponent(element, renderer, rendererService, refreshService, navigationService) {
        var _this = this;
        this.element = element;
        this.renderer = renderer;
        this.rendererService = rendererService;
        this.refreshService = refreshService;
        this.navigationService = navigationService;
        this.rendererService.element = element;
        this.rendererService.renderer = this;
        this.refreshSubscription = this.refreshService.onRefresh.subscribe(function (tool) {
            if (_this.tool === tool) {
                _this.refresh();
            }
        });
    }
    ToolBarRendererComponent.prototype.onFocus = function () {
        this.navigationService.focused = this.tool;
    };
    ToolBarRendererComponent.prototype.ngOnInit = function () {
        if (this.resizable) {
            if (this.location === 'toolbar') {
                this.template = this.tool.toolbarTemplate;
                this.renderer.setStyle(this.element.nativeElement, 'visibility', 'hidden');
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
            else {
                this.template = this.tool.popupTemplate;
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
        }
        else {
            this.tool.overflows = false;
            this.template = this.tool.toolbarTemplate;
            this.renderer.setStyle(this.element.nativeElement, 'visibility', 'display');
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inline-block');
        }
        this.navigationService.register(this.tool);
        this.tool.navigationService.register(this.rendererService, this.location);
        this.tool.navigationService.toolbarNavigation = this.navigationService;
    };
    ToolBarRendererComponent.prototype.ngOnDestroy = function () {
        this.navigationService.unregister(this.tool);
        this.refreshSubscription.unsubscribe();
    };
    ToolBarRendererComponent.prototype.ngAfterViewInit = function () {
        // this.focusableElement = this.rendererService.findFocusable();
        if (this.resizable) {
            this.refresh();
        }
    };
    Object.defineProperty(ToolBarRendererComponent.prototype, "width", {
        /**
         * @hidden
         */
        get: function () {
            return this.tool.overflows ? 0 : outerWidth(this.element.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ToolBarRendererComponent.prototype.isDisplayed = function () {
        return this.element.nativeElement.style.display !== 'none';
    };
    /**
     * @hidden
     */
    ToolBarRendererComponent.prototype.refresh = function () {
        if (this.resizable) {
            if (this.location === 'toolbar') {
                this.renderer.setStyle(this.element.nativeElement, 'visibility', this.tool.visibility);
                this.renderer.setStyle(this.element.nativeElement, 'display', this.tool.toolbarDisplay);
            }
            else {
                this.renderer.setStyle(this.element.nativeElement, 'display', this.tool.overflowDisplay);
            }
        }
    };
    /**
     * @hidden
     */
    ToolBarRendererComponent.prototype.setAttribute = function (element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    };
    ToolBarRendererComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarRenderer',
                    providers: [RendererService],
                    selector: 'kendo-toolbar-renderer',
                    template: "\n        <ng-container *ngIf=\"location === 'toolbar'\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"location === 'overflow' && tool.responsive\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarRendererComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: RendererService },
        { type: RefreshService },
        { type: NavigationService }
    ]; };
    ToolBarRendererComponent.propDecorators = {
        tool: [{ type: Input }],
        location: [{ type: Input }],
        resizable: [{ type: Input }],
        onFocus: [{ type: HostListener, args: ['focusin',] }]
    };
    return ToolBarRendererComponent;
}());

var getInitialPopupSettings = function (isRtl) { return ({
    animate: true,
    anchorAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'bottom' },
    popupAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'top' }
}); };
/**
 * Represents the [Kendo UI ToolBar component for Angular]({% slug overview_toolbar %}).
 */
var ToolBarComponent = /** @class */ (function () {
    function ToolBarComponent(localization, popupService, refreshService, navigationService, element, cdr, zone) {
        this.localization = localization;
        this.popupService = popupService;
        this.refreshService = refreshService;
        this.navigationService = navigationService;
        this.element = element;
        this.cdr = cdr;
        this.zone = zone;
        /**
         * Hides the overflowing tools in a popup.
         */
        this.overflow = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the ToolBar.
         */
        this.tabindex = 0;
        /**
         * Fires when the overflow popup of the ToolBar is opened.
         */
        this.open = new EventEmitter();
        /**
         * Fires when the overflow popup of the ToolBar is closed.
         */
        this.close = new EventEmitter();
        this.hostClasses = true;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(ToolBarComponent.prototype, "resizable", {
        get: function () {
            return this.overflow;
        },
        /**
         * @hidden
         */
        set: function (value) {
            this.overflow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings || getInitialPopupSettings(this.localization.rtl);
        },
        /**
         * Configures the popup of the ToolBar drop-down list.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({}, getInitialPopupSettings(this.localization.rtl), settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "popupOpen", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            if (this.popupOpen === open) {
                return;
            }
            var eventArgs = new PreventableEvent();
            if (open) {
                this.open.emit(eventArgs);
            }
            else {
                this.close.emit(eventArgs);
            }
            if (eventArgs.isDefaultPrevented()) {
                return;
            }
            this.toggle(open);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ToolBarComponent.prototype.onFocus = function () {
        var focused = this.navigationService.focused;
        focused ? this.navigationService.focus(focused) : this.navigationService.focusFirst();
    };
    /**
     * @hidden
     */
    ToolBarComponent.prototype.onKeyDown = function (event) {
        var prev = this.direction === 'ltr' ? event.keyCode === Keys.ArrowLeft : event.keyCode === Keys.ArrowRight;
        var next = this.direction === 'ltr' ? event.keyCode === Keys.ArrowRight : event.keyCode === Keys.ArrowLeft;
        if (prev) {
            event.preventDefault();
            this.navigationService.focusPrev();
        }
        if (next) {
            event.preventDefault();
            this.navigationService.focusNext();
        }
        if (event.keyCode === Keys.Tab) {
            this.element.nativeElement.blur();
        }
        this.navigationService.keydown.emit(event);
    };
    Object.defineProperty(ToolBarComponent.prototype, "getTabIndex", {
        get: function () {
            return this.tabindex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "getRole", {
        get: function () {
            return 'toolbar';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "getDir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "resizableClass", {
        get: function () {
            return this.overflow;
        },
        enumerable: true,
        configurable: true
    });
    ToolBarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.overflow) {
            this.resizeSubscription = this.resizeSensor.resize.pipe(filter(function () { return _this.overflow; })).subscribe(function () {
                _this.onResize();
            });
            // because of https://github.com/telerik/kendo-angular-buttons/pull/276
            this.zone.runOutsideAngular(function () { return setTimeout(function () { return _this.onResize(); }); });
            this.navigationService.overflowButton = this.overflowButton;
        }
    };
    ToolBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangesSubscription = this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return (_this.direction = rtl ? 'rtl' : 'ltr');
        });
        if (isDocumentAvailable()) {
            this.zone.runOutsideAngular(function () {
                return (_this.closeOverflowSubscription = fromEvent(document, 'click')
                    .pipe(filter(function () { return !!_this.popupRef; }), filter(function (ev) { return !_this.popupRef.popup.instance.container.nativeElement.contains(ev.target); }), filter(function (ev) { return !_this.overflowButton.nativeElement.contains(ev.target); }))
                    .subscribe(function () {
                    _this.zone.run(function () {
                        _this.popupOpen = false;
                    });
                }));
            });
        }
    };
    ToolBarComponent.prototype.ngOnDestroy = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        if (this.localizationChangesSubscription) {
            this.localizationChangesSubscription.unsubscribe();
        }
        if (this.closeOverflowSubscription) {
            this.closeOverflowSubscription.unsubscribe();
        }
        if (this.popupRef) {
            this.popupRef.close();
        }
    };
    /**
     * @hidden
     */
    ToolBarComponent.prototype.showPopup = function () {
        this.popupOpen = !this.popupOpen;
    };
    /**
     * Toggles the visibility of the overflow popup.
     */
    ToolBarComponent.prototype.toggle = function (popupOpen) {
        var _this = this;
        this._open = popupOpen !== undefined ? popupOpen : !this.popupOpen;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (this.popupOpen) {
            this.popupRef = this.popupService.open({
                anchor: this.overflowButton,
                anchorAlign: this.popupSettings.anchorAlign,
                popupAlign: this.popupSettings.popupAlign,
                content: this.popupTemplate,
                appendTo: this.appendTo,
                animate: this.popupSettings.animate,
                popupClass: this.popupSettings.popupClass,
                positionMode: 'absolute'
            });
            this.popupRef.popupOpen.subscribe(this.onPopupOpen.bind(this));
            this.popupRef.popupClose.subscribe(this.onPopupClose.bind(this));
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return (_this.popupOpen = false); });
        }
    };
    /**
     * @hidden
     */
    ToolBarComponent.prototype.onResize = function () {
        this.toggle(false);
        var containerWidth = innerWidth(this.element.nativeElement) - this.overflowAnchorWidth;
        this.shrink(containerWidth, this.childrenWidth);
        this.stretch(containerWidth, this.childrenWidth);
        this.cdr.detectChanges();
        this.resizeSensor.acceptSize();
    };
    /**
     * @hidden
     */
    ToolBarComponent.prototype.onPopupOpen = function () {
        this.navigationService.moveFocusToPopup();
        this.navigationService.focusFirst();
    };
    /**
     * @hidden
     */
    ToolBarComponent.prototype.onPopupClose = function () {
        this.navigationService.moveFocusToToolBar();
    };
    Object.defineProperty(ToolBarComponent.prototype, "displayAnchor", {
        get: function () {
            return this.allTools.filter(function (t) { return t.overflows && t.responsive; }).length > 0 ? 'visible' : 'hidden';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "overflowAnchorWidth", {
        get: function () {
            if (!this.overflow) {
                return 0;
            }
            if (!this.cachedOverflowAnchorWidth) {
                this.cachedOverflowAnchorWidth = outerWidth(this.overflowButton.nativeElement);
            }
            return this.cachedOverflowAnchorWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "childrenWidth", {
        get: function () {
            var width = this.renderedTools.reduce(function (totalWidth, tool) { return tool.width + totalWidth; }, 0);
            return Math.ceil(width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "visibleTools", {
        get: function () {
            return this.allTools.filter(function (tool) {
                return tool.overflows === false;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarComponent.prototype, "overflowTools", {
        get: function () {
            return this.allTools.filter(function (tool) {
                return tool.overflows === true;
            });
        },
        enumerable: true,
        configurable: true
    });
    ToolBarComponent.prototype.shrink = function (containerWidth, childrenWidth) {
        var width;
        if (containerWidth < childrenWidth) {
            for (var i = this.visibleTools.length - 1; i >= 0; i--) {
                if (containerWidth > childrenWidth) {
                    break;
                }
                else {
                    width = this.hideLastVisibleTool();
                    childrenWidth -= width;
                }
            }
        }
    };
    ToolBarComponent.prototype.stretch = function (containerWidth, childrenWidth) {
        var width;
        if (containerWidth > childrenWidth) {
            for (var i = this.overflowTools.length - 1; i >= 0; i--) {
                width = this.showFirstHiddenTool(containerWidth, childrenWidth);
                if (width) {
                    childrenWidth += width;
                }
                else {
                    break;
                }
            }
        }
    };
    ToolBarComponent.prototype.hideLastVisibleTool = function () {
        var tool = this.visibleTools[this.visibleTools.length - 1];
        var renderedElement = this.renderedTools.find(function (r) {
            return r.tool === tool;
        });
        var width = renderedElement.width;
        tool.overflows = true;
        this.refreshService.refresh(tool);
        return width;
    };
    ToolBarComponent.prototype.showFirstHiddenTool = function (containerWidth, childrenWidth) {
        var tool = this.overflowTools[0];
        var renderedElement = this.renderedTools.find(function (r) { return r.tool === tool; });
        tool.overflows = false;
        tool.visibility = 'hidden';
        this.refreshService.refresh(tool);
        if (containerWidth > childrenWidth + renderedElement.width) {
            tool.visibility = 'visible';
            this.refreshService.refresh(tool);
        }
        else {
            tool.overflows = true;
            this.refreshService.refresh(tool);
        }
        return renderedElement.width; // returns 0 if `overflows` is true
    };
    ToolBarComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBar',
                    providers: [
                        RefreshService,
                        NavigationService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.toolbar'
                        }
                    ],
                    selector: 'kendo-toolbar',
                    template: "\n        <ng-container *ngFor=\"let tool of allTools; let index = index\">\n            <kendo-toolbar-renderer [location]=\"'toolbar'\" [resizable]=\"overflow\" [tool]=\"tool\"></kendo-toolbar-renderer>\n        </ng-container>\n        <button\n            #overflowButton\n            tabindex=\"-1\"\n            *ngIf=\"overflow\"\n            [style.visibility]=\"displayAnchor\"\n            class=\"k-overflow-anchor k-button\"\n            (click)=\"showPopup()\"\n        >\n            <span class=\"k-icon k-i-more-vertical\"></span>\n        </button>\n        <ng-template #popupTemplate>\n            <ul class=\"k-overflow-container k-list-container k-reset\">\n                <ng-container *ngFor=\"let tool of allTools; let index = index\">\n                    <li class=\"k-item\">\n                        <kendo-toolbar-renderer [location]=\"'overflow'\" [resizable]=\"overflow\" [tool]=\"tool\"></kendo-toolbar-renderer>\n                    </li>\n                </ng-container>\n            </ul>\n        </ng-template>\n        <ng-container #container></ng-container>\n        <kendo-resize-sensor *ngIf=\"overflow\" [rateLimit]=\"1000\" #resizeSensor></kendo-resize-sensor>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PopupService },
        { type: RefreshService },
        { type: NavigationService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    ToolBarComponent.propDecorators = {
        overflow: [{ type: Input }],
        resizable: [{ type: Input }],
        popupSettings: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input, args: ['tabIndex',] }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        allTools: [{ type: ContentChildren, args: [ToolBarToolComponent,] }],
        overflowButton: [{ type: ViewChild, args: ['overflowButton',] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        resizeSensor: [{ type: ViewChild, args: ['resizeSensor',] }],
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        renderedTools: [{ type: ViewChildren, args: [ToolBarRendererComponent,] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-toolbar',] }],
        onFocus: [{ type: HostListener, args: ['focus',] }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        getTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        getRole: [{ type: HostBinding, args: ['attr.role',] }],
        getDir: [{ type: HostBinding, args: ['attr.dir',] }],
        resizableClass: [{ type: HostBinding, args: ['class.k-toolbar-resizable',] }]
    };
    return ToolBarComponent;
}());

/**
 * @hidden
 */
var SingleFocusableNavigationService = /** @class */ (function () {
    function SingleFocusableNavigationService() {
    }
    SingleFocusableNavigationService.prototype.register = function (rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    };
    SingleFocusableNavigationService.prototype.canFocus = function () {
        var element = this.findFocusable();
        return element && element.offsetParent && !this.hasFocus(element) && !element.disabled;
    };
    SingleFocusableNavigationService.prototype.focus = function () {
        if (this.canFocus()) {
            var element = this.findFocusable();
            this.setAttribute(element, 'tabindex', '0');
            element.focus();
        }
    };
    SingleFocusableNavigationService.prototype.defocus = function () {
        var element = this.findFocusable();
        if (element) {
            this.setAttribute(element, 'tabindex', '-1');
            if (this.hasFocus(element)) {
                element.blur();
            }
        }
    };
    SingleFocusableNavigationService.prototype.hasFocus = function (element) {
        return document.activeElement !== element && closest(document.activeElement, function (e) { return e === element; });
    };
    SingleFocusableNavigationService.prototype.findFocusable = function () {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer.findFocusable() : this.toolbarRenderer.findFocusable();
    };
    SingleFocusableNavigationService.prototype.setAttribute = function (element, attr, value) {
        if (this.toolbarNavigation.isPopupFocused) {
            this.overflowRenderer.setAttribute(element, attr, value);
        }
        else {
            this.toolbarRenderer.setAttribute(element, attr, value);
        }
    };
    SingleFocusableNavigationService.decorators = [
        { type: Injectable },
    ];
    return SingleFocusableNavigationService;
}());

/**
 * Represents the [Kendo UI ToolBar Button tool for Angular]({% slug controltypes_toolbar %}#toc-buttons).
 */
var ToolBarButtonComponent = /** @class */ (function (_super) {
    __extends(ToolBarButtonComponent, _super);
    function ToolBarButtonComponent() {
        var _this = _super.call(this) || this;
        // showText and showIcon showIcon should be declared first
        /**
         * Specifies where button text should be displayed
         */
        _this.showText = 'both';
        /**
         * Specifies where button icon should be displayed
         */
        _this.showIcon = 'both';
        /**
         * Provides visual styling that indicates if the Button is active
         * ([see example]({% slug controltypes_toolbar %}#toc-toggle-buttons)).
         * By default, `toggleable` is set to `false`.
         */
        _this.toggleable = false;
        /**
         * Adds visual weight to the Button and makes it primary
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        _this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        /**
         * Sets the selected state of the Button.
         */
        _this.selected = false;
        /**
         * Fires each time the Button is clicked.
         */
        _this.click = new EventEmitter();
        /**
         * Fires each time the selected state of a Toggle Button is changed.
         * The event argument is the new selected state (Boolean).
         */
        _this.selectedChange = new EventEmitter();
        _this.internalState = { selected: undefined };
        _this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this.navigationService = new SingleFocusableNavigationService();
        return _this;
    }
    Object.defineProperty(ToolBarButtonComponent.prototype, "text", {
        /**
         * Specifies the text of the Button ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        set: function (text) {
            this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "togglable", {
        /**
         * @hidden
         */
        get: function () {
            return this.toggleable;
        },
        set: function (value) {
            this.toggleable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "icon", {
        /**
         * Defines the name for an existing icon in a Kendo UI theme
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         * The icon is rendered inside the Button by a `span.k-icon` element.
         */
        set: function (icon) {
            this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "iconClass", {
        /**
         * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
         * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
         */
        set: function (iconClass) {
            this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "imageUrl", {
        /**
         * Defines a URL which is used for an `img` element inside the Button.
         * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
         */
        set: function (imageUrl) {
            this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    ToolBarButtonComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('selected', changes)) {
            this.internalState.selected = this.selected;
        }
    };
    ToolBarButtonComponent.prototype.selectedChangeHandler = function (state) {
        this.internalState.selected = state;
        this.selectedChange.emit(state);
    };
    ToolBarButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarButtonComponent; }) }],
                    selector: 'kendo-toolbar-button',
                    template: "\n        <ng-template #toolbarTemplate>\n            <button\n                #toolbarButton\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                [ngStyle]=\"style\"\n                [ngClass]=\"className\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [toggleable]=\"toggleable\"\n                [primary]=\"primary\"\n                [selected]=\"internalState.selected\"\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [look]=\"look\"\n                (click)=\"click.emit($event)\"\n                (selectedChange)=\"selectedChangeHandler($event)\"\n            >\n                {{ toolbarOptions.text }}\n            </button>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                #overflowButton\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [ngStyle]=\"style\"\n                [ngClass]=\"className\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [toggleable]=\"toggleable\"\n                [primary]=\"primary\"\n                [selected]=\"internalState.selected\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n                [look]=\"look\"\n                (click)=\"click.emit($event)\"\n                (selectedChange)=\"selectedChangeHandler($event)\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarButtonComponent.ctorParameters = function () { return []; };
    ToolBarButtonComponent.propDecorators = {
        showText: [{ type: Input }],
        showIcon: [{ type: Input }],
        text: [{ type: Input }],
        style: [{ type: Input }],
        className: [{ type: Input }],
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        toggleable: [{ type: Input }],
        togglable: [{ type: Input }],
        primary: [{ type: Input }],
        look: [{ type: Input }],
        selected: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        click: [{ type: Output }],
        selectedChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        button: [{ type: ViewChild, args: ['toolbarButton', { read: Button },] }]
    };
    return ToolBarButtonComponent;
}(ToolBarToolComponent));

/**
 * @hidden
 */
var ButtonGroupNavigationService = /** @class */ (function () {
    function ButtonGroupNavigationService() {
    }
    Object.defineProperty(ButtonGroupNavigationService.prototype, "toolbarNavigation", {
        get: function () {
            return this._navigationService;
        },
        set: function (service) {
            this._navigationService = service;
            if (this.keydownSubscription) {
                this.keydownSubscription.unsubscribe();
            }
            this.keydownSubscription = this._navigationService.keydown.subscribe(this.onKeydown.bind(this));
        },
        enumerable: true,
        configurable: true
    });
    ButtonGroupNavigationService.prototype.ngOnDestroy = function () {
        if (this.keydownSubscription) {
            this.keydownSubscription.unsubscribe();
        }
    };
    ButtonGroupNavigationService.prototype.register = function (rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    };
    ButtonGroupNavigationService.prototype.canFocus = function () {
        return true;
    };
    ButtonGroupNavigationService.prototype.focus = function (focusPrev) {
        var buttons = this.buttons();
        var button = focusPrev ? buttons[buttons.length - 1] : buttons[0];
        this.toolbarNavigation.lock();
        this.renderer().setAttribute(button, 'tabindex', '0');
        button.focus();
        this.current = button;
        this.isActive = true;
    };
    ButtonGroupNavigationService.prototype.defocus = function () {
        var _this = this;
        var buttons = this.buttons();
        buttons.forEach(function (button) {
            _this.renderer().setAttribute(button, 'tabindex', '-1');
            if (_this.hasFocus(button)) {
                button.blur();
            }
        });
        this.current = undefined;
        this.isActive = false;
    };
    ButtonGroupNavigationService.prototype.hasFocus = function (element) {
        return document.activeElement !== element;
    };
    ButtonGroupNavigationService.prototype.buttons = function () {
        return Array.prototype.slice.call(this.renderer().querySelectorAll('.k-button'));
    };
    ButtonGroupNavigationService.prototype.renderer = function () {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer : this.toolbarRenderer;
    };
    ButtonGroupNavigationService.prototype.onKeydown = function (event) {
        if (!this.isActive) {
            return;
        }
        if (event.keyCode === Keys.ArrowLeft) {
            if (this.buttons().indexOf(this.current) === 0) {
                this.toolbarNavigation.unlock();
                this.toolbarNavigation.focusPrev();
            }
        }
        if (event.keyCode === Keys.ArrowRight) {
            if (this.buttons().indexOf(this.current) === this.buttons().length - 1) {
                this.toolbarNavigation.unlock();
                this.toolbarNavigation.focusNext();
            }
        }
        this.current = this.buttons().find(function (button) {
            return button.tabIndex === 0;
        });
    };
    ButtonGroupNavigationService.decorators = [
        { type: Injectable },
    ];
    return ButtonGroupNavigationService;
}());

/**
 * Represents the Kendo UI Toolbar ButtonGroup for Angular.
 */
var ToolBarButtonGroupComponent = /** @class */ (function (_super) {
    __extends(ToolBarButtonGroupComponent, _super);
    function ToolBarButtonGroupComponent() {
        var _this = _super.call(this) || this;
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        _this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options.
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        _this.navigationService = new ButtonGroupNavigationService();
        return _this;
    }
    ToolBarButtonGroupComponent.prototype.selectedChangeHandler = function (state, button) {
        button.selected = state;
        button.selectedChange.emit(state);
    };
    ToolBarButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarButtonGroup',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarButtonGroupComponent; }) }],
                    selector: 'kendo-toolbar-buttongroup',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-buttongroup [tabIndex]=\"tabIndex\" [selection]=\"selection\" [disabled]=\"disabled\" [look]=\"look\" [width]=\"width\">\n                <button\n                    type=\"button\"\n                    kendoButton\n                    *ngFor=\"let button of buttons\"\n                    [ngStyle]=\"button.style\"\n                    [ngClass]=\"button.className\"\n                    [attr.title]=\"button.title\"\n                    [disabled]=\"button.disabled\"\n                    [togglable]=\"button.togglable\"\n                    [primary]=\"button.primary\"\n                    [selected]=\"button.selected\"\n                    [icon]=\"button.toolbarOptions.icon\"\n                    [iconClass]=\"button.toolbarOptions.iconClass\"\n                    [imageUrl]=\"button.toolbarOptions.imageUrl\"\n                    (click)=\"button.click.emit($event)\"\n                    (selectedChange)=\"selectedChangeHandler($event, button)\"\n                >\n                    {{ button.toolbarOptions.text }}\n                </button>\n            </kendo-buttongroup>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <kendo-buttongroup\n                class=\"k-overflow-button\"\n                [tabIndex]=\"tabIndex\"\n                [selection]=\"selection\"\n                [disabled]=\"disabled\"\n                [look]=\"look\"\n                [width]=\"width\"\n            >\n                <button\n                    type=\"button\"\n                    kendoButton\n                    class=\"k-overflow-button\"\n                    *ngFor=\"let button of buttons\"\n                    [ngStyle]=\"button.style\"\n                    [ngClass]=\"button.className\"\n                    [attr.title]=\"button.title\"\n                    [disabled]=\"button.disabled\"\n                    [togglable]=\"button.togglable\"\n                    [primary]=\"button.primary\"\n                    [selected]=\"button.selected\"\n                    [icon]=\"button.overflowOptions.icon\"\n                    [iconClass]=\"button.overflowOptions.iconClass\"\n                    [imageUrl]=\"button.overflowOptions.imageUrl\"\n                    (click)=\"button.click.emit($event)\"\n                    (selectedChange)=\"selectedChangeHandler($event, button)\"\n                >\n                    {{ button.overflowOptions.text }}\n                </button>\n            </kendo-buttongroup>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarButtonGroupComponent.ctorParameters = function () { return []; };
    ToolBarButtonGroupComponent.propDecorators = {
        disabled: [{ type: Input }],
        selection: [{ type: Input }],
        width: [{ type: Input }],
        look: [{ type: Input }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        buttons: [{ type: ContentChildren, args: [forwardRef(function () { return ToolBarButtonComponent; }),] }]
    };
    return ToolBarButtonGroupComponent;
}(ToolBarToolComponent));

/**
 * @hidden
 */
var DropdownButtonNavigationService = /** @class */ (function () {
    function DropdownButtonNavigationService(component) {
        this.component = component;
    }
    DropdownButtonNavigationService.prototype.register = function (rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    };
    DropdownButtonNavigationService.prototype.canFocus = function () {
        return !this.component.disabled;
    };
    DropdownButtonNavigationService.prototype.hasFocus = function () {
        return this.component.focused;
    };
    DropdownButtonNavigationService.prototype.focus = function () {
        if (this.canFocus()) {
            this.component.focus();
        }
    };
    DropdownButtonNavigationService.prototype.defocus = function () {
        this.component.blur();
    };
    return DropdownButtonNavigationService;
}());

/**
 * Represents the [Kendo UI ToolBar DropDownButton for Angular]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
 */
var ToolBarDropDownButtonComponent = /** @class */ (function (_super) {
    __extends(ToolBarDropDownButtonComponent, _super);
    function ToolBarDropDownButtonComponent() {
        var _this = _super.call(this) || this;
        // showText and showIcon showIcon should be declared first
        /**
         * Defines the location of the button text that will be displayed.
         */
        _this.showText = 'both';
        /**
         * Defines the location of the button icon that will be displayed.
         */
        _this.showIcon = 'both';
        /**
         * Fires each time the user clicks a DropDownButton item.
         * The event data contains the data item that is bound to the clicked list item.
         */
        _this.itemClick = new EventEmitter();
        _this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this._popupSettings = { animate: true, popupClass: '' };
        return _this;
    }
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "text", {
        /**
         * Sets the text of the DropDownButton
         * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
         */
        set: function (text) {
            this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "icon", {
        /**
         * Defines an icon that will be rendered next to the button text.
         */
        set: function (icon) {
            this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "iconClass", {
        /**
         * Defines an icon with a custom CSS class that will be rendered next to the button text.
         */
        set: function (iconClass) {
            this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "imageUrl", {
        /**
         * Defines the location of an image that will be displayed next to the button text.
         */
        set: function (imageUrl) {
            this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownButton.
         *
         * The available options are:
         * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.data = [];
            }
            return this._data;
        },
        /**
         * Sets the data of the DropDownButton
         * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons)).
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    ToolBarDropDownButtonComponent.prototype.ngAfterViewInit = function () {
        this.navigationService = new DropdownButtonNavigationService(this.dropdwonButtonComponent);
    };
    ToolBarDropDownButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarDropDownButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarDropDownButtonComponent; }) }],
                    selector: 'kendo-toolbar-dropdownbutton',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-dropdownbutton\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"tabIndex\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [popupSettings]=\"popupSettings\"\n                (itemClick)=\"itemClick.emit($event)\"\n            >\n                {{ toolbarOptions.text }}\n            </kendo-dropdownbutton>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                type=\"button\"\n                tabindex=\"-1\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [disabled]=\"true\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n                (click)=\"itemClick.emit($event)\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n            <kendo-toolbar-buttonlist [data]=\"data\" [textField]=\"textField\" (itemClick)=\"itemClick.emit($event)\">\n            </kendo-toolbar-buttonlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarDropDownButtonComponent.ctorParameters = function () { return []; };
    ToolBarDropDownButtonComponent.propDecorators = {
        showText: [{ type: Input }],
        showIcon: [{ type: Input }],
        text: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        popupSettings: [{ type: Input }],
        textField: [{ type: Input }],
        disabled: [{ type: Input }],
        data: [{ type: Input }],
        itemClick: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        dropdownButton: [{ type: ViewChild, args: ['dropdownButton', { read: ElementRef },] }],
        dropdwonButtonComponent: [{ type: ViewChild, args: [DropDownButtonComponent,] }]
    };
    return ToolBarDropDownButtonComponent;
}(ToolBarToolComponent));

/**
 * Represents the [Kendo UI ToolBar SplitButton for Angular]({% slug controltypes_toolbar %}#toc-splitbuttons).
 */
var ToolBarSplitButtonComponent = /** @class */ (function (_super) {
    __extends(ToolBarSplitButtonComponent, _super);
    function ToolBarSplitButtonComponent() {
        var _this = _super.call(this) || this;
        // showText and showIcon showIcon should be declared first
        /**
         * Specifies where button text should be displayed
         */
        _this.showText = 'both';
        /**
         * Specifies where button icon should be displayed
         */
        _this.showIcon = 'both';
        /**
         * Configures the text field of the button-list popup.
         */
        _this.textField = 'text';
        /**
         * Fires each time the user clicks the main button.
         */
        _this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks the drop-down list.
         * The event data contains the data item that is bound to the clicked list item.
         */
        _this.itemClick = new EventEmitter();
        _this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this._popupSettings = { animate: true, popupClass: '' };
        _this.navigationService = new SingleFocusableNavigationService();
        return _this;
    }
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "text", {
        /**
         * Sets the text of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons).
         */
        set: function (text) {
            this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "icon", {
        /**
         * Defines the icon that will be rendered next to the button text
         * ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
         */
        set: function (icon) {
            this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "iconClass", {
        /**
         * Defines an icon with a custom CSS class that will be rendered next to the button text.
         */
        set: function (iconClass) {
            this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "imageUrl", {
        /**
         * Defines the location of an image that will be displayed next to the button text.
         */
        set: function (imageUrl) {
            this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "popupSettings", {
        get: function () {
            if (!this._popupSettings) {
                this._popupSettings = { animate: true, popupClass: '' };
            }
            return this._popupSettings;
        },
        /**
         * Configures the popup of the SplitButton.
         *
         * The available options are:
         * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (value) {
            this._popupSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.data = [];
            }
            return this._data;
        },
        /**
         * Sets the data of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    ToolBarSplitButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarSplitButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarSplitButtonComponent; }) }],
                    selector: 'kendo-toolbar-splitbutton',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-splitbutton\n                [data]=\"data\"\n                [text]=\"toolbarOptions.text\"\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"tabIndex\"\n                [textField]=\"textField\"\n                [popupSettings]=\"popupSettings\"\n                (buttonClick)=\"buttonClick.emit($event)\"\n                (itemClick)=\"itemClick.emit($event)\"\n            >\n            </kendo-splitbutton>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                type=\"button\"\n                tabindex=\"-1\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [disabled]=\"disabled\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n            <kendo-toolbar-buttonlist [data]=\"data\" [textField]=\"textField\" (itemClick)=\"itemClick.emit($event)\">\n            </kendo-toolbar-buttonlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarSplitButtonComponent.ctorParameters = function () { return []; };
    ToolBarSplitButtonComponent.propDecorators = {
        showText: [{ type: Input }],
        showIcon: [{ type: Input }],
        text: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        disabled: [{ type: Input }],
        popupSettings: [{ type: Input }],
        textField: [{ type: Input }],
        data: [{ type: Input }],
        buttonClick: [{ type: Output }],
        itemClick: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        splitButton: [{ type: ViewChild, args: ['splitButton', { read: ElementRef },] }]
    };
    return ToolBarSplitButtonComponent;
}(ToolBarToolComponent));

/**
 * Represents the [Kendo UI ToolBar Separator for Angular]({% slug controltypes_toolbar %}#toc-separators).
 */
var ToolBarSeparatorComponent = /** @class */ (function (_super) {
    __extends(ToolBarSeparatorComponent, _super);
    function ToolBarSeparatorComponent() {
        var _this = _super.call(this) || this;
        _this.navigationService = new ToolNavigationService();
        return _this;
    }
    ToolBarSeparatorComponent.prototype.ngAfterViewInit = function () {
        if (!this.popupTemplate) {
            this.popupTemplate = this.toolbarTemplate;
        }
    };
    ToolBarSeparatorComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarSeparator',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarSeparatorComponent; }) }],
                    selector: 'kendo-toolbar-separator',
                    template: "\n        <ng-template #toolbarTemplate>\n            <div class=\"k-separator\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarSeparatorComponent.ctorParameters = function () { return []; };
    ToolBarSeparatorComponent.propDecorators = {
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        separator: [{ type: ViewChild, args: ['separator',] }]
    };
    return ToolBarSeparatorComponent;
}(ToolBarToolComponent));

/**
 * @hidden
 */
var ToolBarButtonListComponent = /** @class */ (function (_super) {
    __extends(ToolBarButtonListComponent, _super);
    function ToolBarButtonListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemClick = new EventEmitter();
        return _this;
    }
    ToolBarButtonListComponent.prototype.getText = function (dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    };
    ToolBarButtonListComponent.prototype.onClick = function (item) {
        var dataItem = this.data[this.data.indexOf(item)];
        if (item.click) {
            item.click(dataItem);
        }
        this.itemClick.emit(dataItem);
    };
    ToolBarButtonListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-toolbar-buttonlist',
                    template: "\n        <button\n            type=\"button\"\n            tabindex=\"-1\"\n            kendoButton\n            style=\"padding-left: 16px\"\n            class=\"k-overflow-button\"\n            *ngFor=\"let item of data\"\n            [disabled]=\"item.disabled\"\n            [icon]=\"item.icon\"\n            [iconClass]=\"item.iconClass\"\n            [imageUrl]=\"item.imageUrl\"\n            (click)=\"onClick(item)\"\n        >\n            {{ getText(item) }}\n        </button>\n    "
                },] },
    ];
    ToolBarButtonListComponent.propDecorators = {
        data: [{ type: Input }],
        textField: [{ type: Input }],
        itemClick: [{ type: Output }]
    };
    return ToolBarButtonListComponent;
}(ToolBarToolComponent));

var TOOLBAR_TOOLS = [
    ToolBarToolComponent,
    ToolBarButtonComponent,
    ToolBarButtonGroupComponent,
    ToolBarDropDownButtonComponent,
    ToolBarSplitButtonComponent,
    ToolBarSeparatorComponent
];
var TOOLBAR_COMMON = [
    ToolBarRendererComponent,
    ToolBarButtonListComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the ToolBar component.
 *
 * The package exports:
 * - `ToolBarComponent`&mdash;The ToolBarComponent class.
 * - `ToolBarToolComponent`&mdash;The base Tool component class.
 * - `ToolBarButtonComponent`&mdash;The Button Tool component class.
 * - `ToolBarButtonGroupComponent`&mdash;The ButtonGroup Tool component class.
 * - `ToolBarDropDownButtonComponent`&mdash;The DropDownButton Tool component class.
 * - `ToolBarSplitButtonComponent`&mdash;The SplitButton Tool component class.
 * - `ToolBarSeparatorComponent`&mdash;The Separator Tool component class.
 */
var ToolBarModule = /** @class */ (function () {
    function ToolBarModule() {
    }
    ToolBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ToolBarComponent, TOOLBAR_TOOLS, TOOLBAR_COMMON],
                    exports: [ToolBarComponent, TOOLBAR_TOOLS],
                    imports: [CommonModule, ButtonsModule, PopupModule, ResizeSensorModule]
                },] },
    ];
    return ToolBarModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { NavigationService, RefreshService, ToolBarRendererComponent, RendererService, ToolBarButtonListComponent, ToolBarComponent, ToolBarToolComponent, ToolBarButtonComponent, ToolBarButtonGroupComponent, ToolBarDropDownButtonComponent, ToolBarSplitButtonComponent, ToolBarSeparatorComponent, ToolBarModule };
