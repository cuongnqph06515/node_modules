/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var refresh_service_1 = require("./refresh.service");
var navigation_service_1 = require("./navigation.service");
var toolbar_tool_component_1 = require("./tools/toolbar-tool.component");
var util_1 = require("./util");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var preventable_event_1 = require("./common/preventable-event");
var renderer_component_1 = require("./renderer.component");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_common_3 = require("@progress/kendo-angular-common");
var getInitialPopupSettings = function (isRtl) { return ({
    animate: true,
    anchorAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'bottom' },
    popupAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'top' }
}); };
var ɵ0 = getInitialPopupSettings;
exports.ɵ0 = ɵ0;
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
        this.open = new core_1.EventEmitter();
        /**
         * Fires when the overflow popup of the ToolBar is closed.
         */
        this.close = new core_1.EventEmitter();
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
            var eventArgs = new preventable_event_1.PreventableEvent();
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
        var prev = this.direction === 'ltr' ? event.keyCode === kendo_angular_common_2.Keys.ArrowLeft : event.keyCode === kendo_angular_common_2.Keys.ArrowRight;
        var next = this.direction === 'ltr' ? event.keyCode === kendo_angular_common_2.Keys.ArrowRight : event.keyCode === kendo_angular_common_2.Keys.ArrowLeft;
        if (prev) {
            event.preventDefault();
            this.navigationService.focusPrev();
        }
        if (next) {
            event.preventDefault();
            this.navigationService.focusNext();
        }
        if (event.keyCode === kendo_angular_common_2.Keys.Tab) {
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
            this.resizeSubscription = this.resizeSensor.resize.pipe(operators_1.filter(function () { return _this.overflow; })).subscribe(function () {
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
        if (kendo_angular_common_3.isDocumentAvailable()) {
            this.zone.runOutsideAngular(function () {
                return (_this.closeOverflowSubscription = rxjs_1.fromEvent(document, 'click')
                    .pipe(operators_1.filter(function () { return !!_this.popupRef; }), operators_1.filter(function (ev) { return !_this.popupRef.popup.instance.container.nativeElement.contains(ev.target); }), operators_1.filter(function (ev) { return !_this.overflowButton.nativeElement.contains(ev.target); }))
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
        var containerWidth = util_1.innerWidth(this.element.nativeElement) - this.overflowAnchorWidth;
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
                this.cachedOverflowAnchorWidth = util_1.outerWidth(this.overflowButton.nativeElement);
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
        { type: core_1.Component, args: [{
                    exportAs: 'kendoToolBar',
                    providers: [
                        refresh_service_1.RefreshService,
                        navigation_service_1.NavigationService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.toolbar'
                        }
                    ],
                    selector: 'kendo-toolbar',
                    template: "\n        <ng-container *ngFor=\"let tool of allTools; let index = index\">\n            <kendo-toolbar-renderer [location]=\"'toolbar'\" [resizable]=\"overflow\" [tool]=\"tool\"></kendo-toolbar-renderer>\n        </ng-container>\n        <button\n            #overflowButton\n            tabindex=\"-1\"\n            *ngIf=\"overflow\"\n            [style.visibility]=\"displayAnchor\"\n            class=\"k-overflow-anchor k-button\"\n            (click)=\"showPopup()\"\n        >\n            <span class=\"k-icon k-i-more-vertical\"></span>\n        </button>\n        <ng-template #popupTemplate>\n            <ul class=\"k-overflow-container k-list-container k-reset\">\n                <ng-container *ngFor=\"let tool of allTools; let index = index\">\n                    <li class=\"k-item\">\n                        <kendo-toolbar-renderer [location]=\"'overflow'\" [resizable]=\"overflow\" [tool]=\"tool\"></kendo-toolbar-renderer>\n                    </li>\n                </ng-container>\n            </ul>\n        </ng-template>\n        <ng-container #container></ng-container>\n        <kendo-resize-sensor *ngIf=\"overflow\" [rateLimit]=\"1000\" #resizeSensor></kendo-resize-sensor>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: kendo_angular_popup_1.PopupService },
        { type: refresh_service_1.RefreshService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.ElementRef },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.NgZone }
    ]; };
    ToolBarComponent.propDecorators = {
        overflow: [{ type: core_1.Input }],
        resizable: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input, args: ['tabIndex',] }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        allTools: [{ type: core_1.ContentChildren, args: [toolbar_tool_component_1.ToolBarToolComponent,] }],
        overflowButton: [{ type: core_1.ViewChild, args: ['overflowButton',] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        resizeSensor: [{ type: core_1.ViewChild, args: ['resizeSensor',] }],
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        renderedTools: [{ type: core_1.ViewChildren, args: [renderer_component_1.ToolBarRendererComponent,] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-toolbar',] }],
        onFocus: [{ type: core_1.HostListener, args: ['focus',] }],
        onKeyDown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }],
        getTabIndex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        getRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        getDir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        resizableClass: [{ type: core_1.HostBinding, args: ['class.k-toolbar-resizable',] }]
    };
    return ToolBarComponent;
}());
exports.ToolBarComponent = ToolBarComponent;
