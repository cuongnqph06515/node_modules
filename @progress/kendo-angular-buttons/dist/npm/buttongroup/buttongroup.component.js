/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_directive_1 = require("../button/button.directive");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var button_service_1 = require("../button/button.service");
var util_1 = require("../util");
var preventable_event_1 = require("../preventable-event");
/**
 * @hidden
 */
var ariaChecked = 'aria-checked';
/**
 * @hidden
 */
var tabindex = 'tabindex';
/**
 * Represents the Kendo UI ButtonGroup component for Angular.
 */
var ButtonGroupComponent = /** @class */ (function () {
    function ButtonGroupComponent(service, localization, element) {
        var _this = this;
        this.service = service;
        this.element = element;
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options
         * ([more information and examples]({% slug styling_buttongroup %})).
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Fires every time keyboard navigation occurs.
         */
        this.navigate = new core_1.EventEmitter();
        this._tabIndex = 0;
        this.currentTabIndex = 0;
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ButtonGroupComponent.prototype, "tabIndex", {
        get: function () {
            return this._tabIndex;
        },
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        set: function (value) {
            this._tabIndex = value;
            this.currentTabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "wrapperClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "stretchedClass", {
        get: function () {
            return !!this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "isFlat", {
        get: function () {
            return this.look === 'flat';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "isBare", {
        get: function () {
            return this.look === 'bare';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "isOutline", {
        get: function () {
            return this.look === 'outline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "getRole", {
        get: function () {
            return this.isSelectionSingle() ? 'radiogroup' : 'group';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "wrapperWidth", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "wrapperTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.currentTabIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ButtonGroupComponent.prototype.keydown = function (event) {
        if (!this.disabled) {
            this.navigateFocus(event);
        }
    };
    /**
     * @hidden
     */
    ButtonGroupComponent.prototype.onFocus = function () {
        this.currentTabIndex = -1;
        var focusedIndex = this.buttons.toArray().findIndex(function (current) { return current.element.tabIndex !== -1; });
        var index = focusedIndex === -1 ? 0 : focusedIndex;
        this.focus(this.buttons.filter(function (_current, i) {
            return i === index;
        }));
    };
    /**
     * @hidden
     */
    ButtonGroupComponent.prototype.focusout = function (event) {
        if (event.relatedTarget && event.relatedTarget.parentNode !== this.element.nativeElement) {
            this.defocus(this.buttons.toArray());
            this.currentTabIndex = this.tabIndex;
        }
    };
    ButtonGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.setButtonLook(this.look);
        this.subscription = this.service.buttonClicked$.subscribe(function (button) {
            var newSelectionValue;
            if (_this.isSelectionSingle()) {
                newSelectionValue = true;
                _this.deactivate(_this.buttons.filter(function (current) { return current !== button; }));
            }
            else {
                _this.defocus(_this.buttons.toArray());
                newSelectionValue = !button.selected;
            }
            if (button.togglable) {
                button.setSelected(newSelectionValue);
                button.setAttribute(ariaChecked, newSelectionValue.toString());
            }
            button.setAttribute(tabindex, "0");
        });
    };
    ButtonGroupComponent.prototype.ngOnChanges = function (change) {
        var _this = this;
        if (kendo_angular_common_1.isChanged('disabled', change)) {
            this.buttons.forEach(function (button) {
                if (util_1.isPresent(_this.disabled)) {
                    button.disabled = _this.disabled;
                }
            });
        }
    };
    ButtonGroupComponent.prototype.ngAfterContentInit = function () {
        var isRadioGroup = this.isSelectionSingle();
        var buttonsRole = isRadioGroup ? 'radio' : 'checkbox';
        this.buttons.forEach(function (button) {
            if (button.togglable) {
                button.setAttribute(ariaChecked, button.selected.toString());
                button.setAttribute('role', buttonsRole);
            }
            if (button.selected) {
                button.setAttribute(tabindex, "0");
            }
            else {
                button.setAttribute(tabindex, "-1");
            }
        });
    };
    ButtonGroupComponent.prototype.ngAfterViewChecked = function () {
        if (this.buttons.length) {
            this.buttons.first.renderer.addClass(this.buttons.first.element, 'k-group-start');
            this.buttons.last.renderer.addClass(this.buttons.last.element, 'k-group-end');
        }
    };
    ButtonGroupComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.localizationChangeSubscription.unsubscribe();
    };
    ButtonGroupComponent.prototype.ngAfterContentChecked = function () {
        this.verifySettings();
    };
    ButtonGroupComponent.prototype.navigateFocus = function (event) {
        var focusedIndex = this.buttons.toArray().findIndex(function (current) { return current.element.tabIndex !== -1; });
        var firstIndex = 0;
        var lastIndex = this.buttons.length - 1;
        var eventArgs = new preventable_event_1.PreventableEvent();
        if (event.keyCode === kendo_angular_common_1.Keys.ArrowRight && focusedIndex < lastIndex) {
            this.navigate.emit(eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                this.defocus(this.buttons.toArray());
                this.focus(this.buttons.filter(function (_current, index) {
                    return index === focusedIndex + 1;
                }));
            }
        }
        if (event.keyCode === kendo_angular_common_1.Keys.ArrowLeft && focusedIndex > firstIndex) {
            this.navigate.emit(eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                this.defocus(this.buttons.toArray());
                this.focus(this.buttons.filter(function (_current, index) {
                    return index === focusedIndex - 1;
                }));
            }
        }
    };
    ButtonGroupComponent.prototype.deactivate = function (buttons) {
        buttons.forEach(function (button) {
            button.setSelected(false);
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "-1");
        });
    };
    ButtonGroupComponent.prototype.activate = function (buttons) {
        buttons.forEach(function (button) {
            button.setSelected(true);
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "0");
            button.focus();
        });
    };
    ButtonGroupComponent.prototype.defocus = function (buttons) {
        buttons.forEach(function (button) {
            button.setAttribute(tabindex, "-1");
        });
    };
    ButtonGroupComponent.prototype.focus = function (buttons) {
        buttons.forEach(function (button) {
            button.setAttribute(tabindex, "0");
            button.focus();
        });
    };
    ButtonGroupComponent.prototype.verifySettings = function () {
        if (core_1.isDevMode()) {
            if (this.isSelectionSingle() && this.buttons.filter(function (button) { return button.selected; }).length > 1) {
                throw new Error('Having multiple selected buttons with single selection mode is not supported');
            }
        }
    };
    ButtonGroupComponent.prototype.isSelectionSingle = function () {
        return this.selection === 'single';
    };
    ButtonGroupComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoButtonGroup',
                    providers: [
                        button_service_1.KendoButtonService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.buttongroup'
                        }
                    ],
                    selector: 'kendo-buttongroup',
                    template: "\n        <ng-content select=\"[kendoButton]\"></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    ButtonGroupComponent.ctorParameters = function () { return [
        { type: button_service_1.KendoButtonService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ElementRef }
    ]; };
    ButtonGroupComponent.propDecorators = {
        disabled: [{ type: core_1.Input, args: ['disabled',] }],
        selection: [{ type: core_1.Input, args: ['selection',] }],
        width: [{ type: core_1.Input, args: ['width',] }],
        look: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        navigate: [{ type: core_1.Output }],
        buttons: [{ type: core_1.ContentChildren, args: [button_directive_1.ButtonDirective,] }],
        wrapperClass: [{ type: core_1.HostBinding, args: ['class.k-button-group',] }],
        disabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        stretchedClass: [{ type: core_1.HostBinding, args: ['class.k-button-group-stretched',] }],
        isFlat: [{ type: core_1.HostBinding, args: ['class.k-button-group-flat',] }],
        isBare: [{ type: core_1.HostBinding, args: ['class.k-button-group-bare',] }],
        isOutline: [{ type: core_1.HostBinding, args: ['class.k-button-group-outline',] }],
        getRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        ariaDisabled: [{ type: core_1.HostBinding, args: ['attr.aria-disalbed',] }],
        wrapperWidth: [{ type: core_1.HostBinding, args: ['style.width',] }],
        wrapperTabIndex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        keydown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }],
        onFocus: [{ type: core_1.HostListener, args: ['focus',] }],
        focusout: [{ type: core_1.HostListener, args: ['focusout', ['$event'],] }]
    };
    return ButtonGroupComponent;
}());
exports.ButtonGroupComponent = ButtonGroupComponent;
