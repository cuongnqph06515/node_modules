/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var tabstrip_tab_component_1 = require("./tabstrip-tab.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var tabstrip_events_1 = require("./tabstrip-events");
var dom_queries_1 = require("../common/dom-queries");
/**
 * Represents the [Kendo UI TabStrip component for Angular]({% slug overview_tabstrip %}).
 */
var TabStripComponent = /** @class */ (function () {
    function TabStripComponent(localization, renderer, wrapper) {
        this.localization = localization;
        this.renderer = renderer;
        this.wrapper = wrapper;
        /**
         * Enables the tab animation.
         */
        this.animate = true;
        /**
         * Sets the position of the tabs. Defaults to `top`.
         */
        this.tabPosition = 'top';
        /**
         * When set to `true`, the component renders all tabs and they are persisted in the DOM.
         * By default, `keepTabContent` is `false`.
         */
        this.keepTabContent = false;
        /**
         * Fires each time the user selects a tab ([see example]({% slug overview_tabstrip %}#toc-basic-usage)).
         * The event data contains the index of the selected tab and its title.
         */
        this.tabSelect = new core_1.EventEmitter();
        this.hostClasses = true;
        /**
         * @hidden
         */
        this._animate = false;
        this.keyBindings = this.computedKeys;
    }
    Object.defineProperty(TabStripComponent.prototype, "height", {
        get: function () {
            return this._height;
        },
        /**
         * Sets the height of the TabStrip.
         */
        set: function (value) {
            this._height = value;
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtTop", {
        get: function () {
            return this.tabPosition === 'top';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtRight", {
        get: function () {
            return this.tabPosition === 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtBottom", {
        get: function () {
            return this.tabPosition === 'bottom';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtLeft", {
        get: function () {
            return this.tabPosition === 'left';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "dir", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TabStripComponent.prototype.contentClass = function (active) {
        var visible = !this.keepTabContent || active;
        return visible ? 'k-content k-state-active' : 'k-content';
    };
    Object.defineProperty(TabStripComponent.prototype, "computedKeys", {
        get: function () {
            var _this = this;
            var _a;
            return _a = {},
                _a[this.invertKeys(kendo_angular_common_1.Keys.ArrowLeft, kendo_angular_common_1.Keys.ArrowRight)] = function (selectedIndex) { return _this.prevNavigatableIndex(selectedIndex); },
                _a[this.invertKeys(kendo_angular_common_1.Keys.ArrowRight, kendo_angular_common_1.Keys.ArrowLeft)] = function (selectedIndex) { return _this.nextNavigatableIndex(selectedIndex); },
                _a[this.invertKeys(kendo_angular_common_1.Keys.ArrowDown, kendo_angular_common_1.Keys.ArrowUp)] = function (selectedIndex) { return _this.nextNavigatableIndex(selectedIndex); },
                _a[this.invertKeys(kendo_angular_common_1.Keys.ArrowUp, kendo_angular_common_1.Keys.ArrowDown)] = function (selectedIndex) { return _this.prevNavigatableIndex(selectedIndex); },
                _a[kendo_angular_common_1.Keys.Home] = function () { return _this.firstNavigatableIndex(); },
                _a[kendo_angular_common_1.Keys.End] = function () { return _this.lastNavigatableIndex(); },
                _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAlignment", {
        /**
         * @hidden
         */
        get: function () {
            return {
                start: 'flex-start',
                end: 'flex-end',
                center: 'center',
                justify: 'space-between'
            }[this.tabAlignment];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TabStripComponent.prototype.invertKeys = function (original, inverted) {
        return this.localization.rtl ? inverted : original;
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.onKeyDown = function (event) {
        if (event.currentTarget !== this.tablist.nativeElement) {
            return;
        }
        var isHorizontal = this.tabPosition === 'top' || this.tabPosition === 'bottom';
        var isArrowUp = event.keyCode === kendo_angular_common_1.Keys.ArrowUp;
        var isArrowDown = event.keyCode === kendo_angular_common_1.Keys.ArrowDown;
        var isArrowLeft = event.keyCode === kendo_angular_common_1.Keys.ArrowLeft;
        var isArrowRight = event.keyCode === kendo_angular_common_1.Keys.ArrowRight;
        if (isHorizontal && (isArrowUp || isArrowDown)) {
            return;
        }
        if (!isHorizontal && (isArrowLeft || isArrowRight)) {
            return;
        }
        if (event.keyCode === kendo_angular_common_1.Keys.Space || isArrowUp || isArrowDown || isArrowLeft || isArrowRight || event.keyCode === kendo_angular_common_1.Keys.Home ||
            event.keyCode === kendo_angular_common_1.Keys.End || event.keyCode === kendo_angular_common_1.Keys.PageUp || event.keyCode === kendo_angular_common_1.Keys.PageDown) {
            event.preventDefault();
        }
        var selectedIndex = this.tabs.toArray().findIndex(function (tab) { return tab.active && !tab.disabled; });
        if (selectedIndex === -1) {
            this.selectTab(this.firstNavigatableIndex());
        }
        else {
            var getTabIndex = this.keyBindings[event.keyCode];
            if (getTabIndex) {
                var nextIndex = getTabIndex(selectedIndex);
                if (selectedIndex !== nextIndex) {
                    this.selectTab(getTabIndex(selectedIndex));
                }
            }
        }
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.tabPanelId = function (id) {
        return 'k-tabstrip-tabpanel-' + id;
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.tabId = function (id) {
        return 'k-tabstrip-tab-' + id;
    };
    /**
     * Allows the user to select a tab programmatically.
     * @param {number} index - The index of the tab that will be selected.
     */
    TabStripComponent.prototype.selectTab = function (index) {
        var tab = this.tabs.toArray()[index];
        if (!tab || Boolean(tab.disabled)) {
            return;
        }
        this.tabHeadingContainers.toArray()[index].nativeElement.focus();
        this.emitEvent(tab, index);
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.onTabClick = function (originalEvent, tabIndex) {
        if (dom_queries_1.isFocusable(originalEvent.target)) {
            return;
        }
        this.selectTab(tabIndex);
    };
    TabStripComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function () {
            return _this.keyBindings = _this.computedKeys;
        });
    };
    TabStripComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    TabStripComponent.prototype.firstNavigatableIndex = function () {
        var tabs = this.tabs.toArray();
        for (var i = 0; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    };
    TabStripComponent.prototype.lastNavigatableIndex = function () {
        var tabs = this.tabs.toArray();
        for (var i = tabs.length - 1; i > 0; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    };
    TabStripComponent.prototype.prevNavigatableIndex = function (selectedIndex) {
        if (selectedIndex - 1 < 0) {
            return this.lastNavigatableIndex();
        }
        var tabs = this.tabs.toArray();
        for (var i = selectedIndex - 1; i > -1; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i === 0) {
                return this.lastNavigatableIndex();
            }
        }
        return selectedIndex;
    };
    TabStripComponent.prototype.nextNavigatableIndex = function (selectedIndex) {
        if (selectedIndex + 1 >= this.tabs.length) {
            return this.firstNavigatableIndex();
        }
        var tabs = this.tabs.toArray();
        for (var i = selectedIndex + 1; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i + 1 === tabs.length) {
                return this.firstNavigatableIndex();
            }
        }
    };
    TabStripComponent.prototype.emitEvent = function (tab, selectedIndex) {
        var selectArgs = new tabstrip_events_1.SelectEvent(selectedIndex, tab.title);
        this.tabSelect.emit(selectArgs);
        if (!selectArgs.isDefaultPrevented() && !tab.active) {
            this._animate = this.animate;
            this.deactivateAll();
            tab.active = true;
        }
    };
    TabStripComponent.prototype.deactivateAll = function () {
        this.tabs.forEach(function (tab) {
            tab.active = false;
        });
    };
    TabStripComponent.decorators = [
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('state', [
                            animations_1.state('active', animations_1.style({ opacity: 1 })),
                            animations_1.transition('* => active', [
                                animations_1.style({ opacity: 0 }),
                                animations_1.animate('400ms ease-in')
                            ])
                        ])
                    ],
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.tabstrip'
                        }
                    ],
                    exportAs: 'kendoTabStrip',
                    selector: 'kendo-tabstrip',
                    template: "\n        <ng-container *ngIf=\"!tabsAtBottom\">\n            <ng-container *ngTemplateOutlet=\"heading\">\n            </ng-container>\n            <ng-container *ngTemplateOutlet=\"content\">\n            </ng-container>\n        </ng-container>\n\n        <ng-container *ngIf=\"tabsAtBottom\">\n            <ng-container *ngTemplateOutlet=\"content\">\n            </ng-container>\n            <ng-container *ngTemplateOutlet=\"heading\">\n            </ng-container>\n        </ng-container>\n\n        <ng-template #heading>\n            <ul\n                class=\"k-reset k-tabstrip-items\"\n                [style.justifyContent]=\"tabsAlignment\"\n                role=\"tablist\"\n                (keydown)=\"onKeyDown($event)\"\n                #tablist\n            >\n                <li *ngFor=\"let tab of tabs; let i = index;\" (click)=\"onTabClick($event, i)\"\n                    #tabHeadingContainer\n                    role=\"tab\"\n                    [id]=\"tabId(i)\"\n                    [tabIndex]=\"tab.active ? 0 : -1\"\n                    [ngClass]=\"tab.cssClass\"\n                    [class.k-item]=\"true\"\n                    [class.k-state-default]=\"true\"\n                    [class.k-state-active]=\"tab.active\"\n                    [class.k-state-disabled]=\"tab.disabled\"\n                    [attr.aria-selected]=\"tab.active\"\n                    [attr.aria-controls]=\"tabPanelId(i)\"\n                    [attr.aria-disabled]=\"tab.disabled\"\n                ><span class=\"k-link\">{{ tab.title }}<ng-template [ngTemplateOutlet]=\"tab.tabTitle?.templateRef\"></ng-template></span></li>\n            </ul>\n        </ng-template>\n        <ng-template #content>\n            <ng-template ngFor let-tab [ngForOf]=\"tabs\" let-i=\"index\">\n                <div\n                    [@state]=\"tab.active && _animate ? 'active' : 'inactive'\"\n                    *ngIf=\"tab.active || keepTabContent\"\n                    [ngClass]=\"contentClass(tab.active)\"\n                    [tabIndex]=\"0\"\n                    role=\"tabpanel\"\n                    [id]=\"tabPanelId(i)\"\n                    [attr.aria-hidden]=\"!tab.active\"\n                    [attr.aria-expanded]=\"tab.active\"\n                    [attr.aria-labelledby]=\"tabId(i)\"\n                    [attr.aria-disabled]=\"tab.disabled\"\n                >\n                    <ng-template [ngTemplateOutlet]=\"tab.tabContent?.templateRef\"></ng-template>\n                </div>\n            </ng-template>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TabStripComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef }
    ]; };
    TabStripComponent.propDecorators = {
        height: [{ type: core_1.Input }],
        animate: [{ type: core_1.Input }],
        tabAlignment: [{ type: core_1.Input }],
        tabPosition: [{ type: core_1.Input }],
        keepTabContent: [{ type: core_1.Input }],
        tablist: [{ type: core_1.ViewChild, args: ['tablist',] }],
        tabSelect: [{ type: core_1.Output }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-tabstrip',] }, { type: core_1.HostBinding, args: ['class.k-floatwrap',] }, { type: core_1.HostBinding, args: ['class.k-header',] }],
        tabsAtTop: [{ type: core_1.HostBinding, args: ['class.k-tabstrip-top',] }],
        tabsAtRight: [{ type: core_1.HostBinding, args: ['class.k-tabstrip-right',] }],
        tabsAtBottom: [{ type: core_1.HostBinding, args: ['class.k-tabstrip-bottom',] }],
        tabsAtLeft: [{ type: core_1.HostBinding, args: ['class.k-tabstrip-left',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        tabs: [{ type: core_1.ContentChildren, args: [tabstrip_tab_component_1.TabStripTabComponent,] }],
        tabHeadingContainers: [{ type: core_1.ViewChildren, args: ['tabHeadingContainer',] }]
    };
    return TabStripComponent;
}());
exports.TabStripComponent = TabStripComponent;
