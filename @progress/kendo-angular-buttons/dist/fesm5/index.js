/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, InjectionToken, Input, NgModule, NgZone, Optional, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject, fromEvent, merge } from 'rxjs';
import { Keys, guid, hasObservers, isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { __extends } from 'tslib';

/**
 * @hidden
 */
var KendoButtonService = /** @class */ (function () {
    function KendoButtonService() {
        this.buttonLookChange = new BehaviorSubject('default');
        this.buttonClicked = new Subject();
        this.buttonClicked$ = this.buttonClicked.asObservable();
    }
    KendoButtonService.prototype.click = function (button) {
        this.buttonClicked.next(button);
    };
    KendoButtonService.prototype.setButtonLook = function (look) {
        this.buttonLookChange.next(look);
    };
    KendoButtonService.decorators = [
        { type: Injectable },
    ];
    return KendoButtonService;
}());

var SPAN_TAG_NAME = 'SPAN';
/**
 * Represents the Kendo UI Button component for Angular.
 */
var ButtonDirective = /** @class */ (function () {
    function ButtonDirective(element, renderer, service, localization, ngZone) {
        var _this = this;
        this.service = service;
        this.ngZone = ngZone;
        /**
         * Provides visual styling that indicates if the Button is active.
         * By default, `toggleable` is set to `false`.
         */
        this.toggleable = false;
        /**
         * Adds visual weight to the Button and makes it primary.
         */
        this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options
         * ([more information and examples]({% slug appearance_button %})).
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * @hidden
         */
        this.role = 'button';
        /**
         * Fires each time the selected state of a toggleable button is changed.
         *
         * The event argument is the new selected state (boolean).
         */
        this.selectedChange = new EventEmitter();
        this.isDisabled = false;
        this.isIcon = false;
        this.isIconClass = false;
        this._focused = false;
        this.domEvents = [];
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.localizationChangeSubscription = localization.changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.element = element.nativeElement;
        this.renderer = renderer;
    }
    Object.defineProperty(ButtonDirective.prototype, "togglable", {
        /**
         * Backwards-compatible alias
         *
         * @hidden
         */
        get: function () {
            return this.toggleable;
        },
        /**
         * @hidden
         */
        set: function (value) {
            this.toggleable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "selected", {
        /**
         * Sets the selected state of the Button.
         */
        get: function () {
            return this._selected || false;
        },
        set: function (value) {
            this._selected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "icon", {
        /**
         * Defines the name for an existing icon in a Kendo UI theme.
         * The icon is rendered inside the Button by a `span.k-icon` element.
         */
        set: function (icon) {
            var _this = this;
            if (icon) {
                this.iconSetter(icon, function () {
                    _this.isIcon = true;
                    var classes = 'k-icon k-i-' + icon;
                    _this.addIcon(classes);
                });
            }
            else {
                this.isIcon = false;
                this.updateIconNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "iconClass", {
        /**
         * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
         * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
         */
        set: function (iconClassName) {
            var _this = this;
            if (iconClassName) {
                this.iconSetter(iconClassName, function () {
                    _this.isIconClass = true;
                    _this.addIcon(iconClassName);
                });
            }
            else {
                this.isIconClass = false;
                this.updateIconNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "imageUrl", {
        /**
         * Defines a URL which is used for an `img` element inside the Button.
         * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
         */
        set: function (imageUrl) {
            if (imageUrl) {
                this.iconSetter(imageUrl, this.addImgIcon.bind(this));
            }
            else {
                this.removeImageNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "disabled", {
        /**
         * If set to `true`, it disables the Button.
         */
        set: function (disabled) {
            this.isDisabled = disabled;
            this.renderer.setProperty(this.element, 'disabled', disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "isFocused", {
        get: function () {
            return this._focused;
        },
        set: function (isFocused) {
            this.toggleClass('k-state-focused', isFocused);
            this._focused = isFocused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classButton", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classDisabled", {
        get: function () {
            return this.isDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classPrimary", {
        get: function () {
            return this.primary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "isFlat", {
        get: function () {
            return this.look === 'flat';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "isBare", {
        get: function () {
            return this.look === 'bare';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "isOutline", {
        get: function () {
            return this.look === 'outline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classActive", {
        get: function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "getDirection", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ButtonDirective.prototype.onFocus = function () {
        this.isFocused = true;
    };
    /**
     * @hidden
     */
    ButtonDirective.prototype.onBlur = function () {
        this.isFocused = false;
    };
    ButtonDirective.prototype.ngOnInit = function () {
        var _this = this;
        var isSpan = this.element.tagName === SPAN_TAG_NAME;
        if (this.service) {
            this.buttonLookChangeSubscription = this.service.buttonLookChange
                .pipe(filter(function (look) { return look !== 'default'; }))
                .subscribe(function (look) { return _this.look = look; });
        }
        if (!this.element.hasAttribute('role') && this.togglable) {
            this.toggleAriaCheckbox(this.toggleable);
        }
        if (this.role) {
            this.setAttribute('role', this.role);
        }
        this.ngZone.runOutsideAngular(function () {
            _this.domEvents.push(_this.renderer.listen(_this.element, 'click', _this._onButtonClick.bind(_this)));
            _this.domEvents.push(_this.renderer.listen(_this.element, 'keydown', function (event) {
                if (isSpan && (event.keyCode === Keys.Space || event.keyCode === Keys.Enter)) {
                    _this._onButtonClick();
                }
            }));
        });
    };
    ButtonDirective.prototype.ngOnChanges = function (change) {
        if (isChanged('togglable', change) || isChanged('toggleable', change)) {
            this.toggleAriaCheckbox(this.toggleable);
        }
    };
    ButtonDirective.prototype.ngAfterViewChecked = function () {
        this.setIconTextClasses();
    };
    ButtonDirective.prototype.ngOnDestroy = function () {
        this.imageNode = null;
        this.iconNode = null;
        this.renderer = null;
        this.localizationChangeSubscription.unsubscribe();
        if (this.service && this.buttonLookChangeSubscription) {
            this.buttonLookChangeSubscription.unsubscribe();
        }
        clearTimeout(this.deferTimeout);
        this.domEvents.forEach(function (unbindHandler) { return unbindHandler(); });
    };
    /**
     * Focuses the Button component.
     */
    ButtonDirective.prototype.focus = function () {
        if (isDocumentAvailable()) {
            this.element.focus();
            this.isFocused = true;
        }
    };
    /**
     * Blurs the Button component.
     */
    ButtonDirective.prototype.blur = function () {
        if (isDocumentAvailable()) {
            this.element.blur();
            this.isFocused = false;
        }
    };
    /**
     * @hidden
     */
    ButtonDirective.prototype.setAttribute = function (attribute, value) {
        this.renderer.setAttribute(this.element, attribute, value);
    };
    /**
     * @hidden
     */
    ButtonDirective.prototype.removeAttribute = function (attribute) {
        this.renderer.removeAttribute(this.element, attribute);
    };
    /**
     * @hidden
     *
     * Internal setter that triggers selectedChange
     */
    ButtonDirective.prototype.setSelected = function (value) {
        var _this = this;
        var changed = this.selected !== value;
        this.selected = value;
        this.setAttribute('aria-checked', this.selected.toString());
        this.toggleClass('k-state-active', this.selected);
        if (changed && hasObservers(this.selectedChange)) {
            this.ngZone.run(function () {
                _this.selectedChange.emit(value);
            });
        }
    };
    ButtonDirective.prototype.toggleAriaCheckbox = function (shouldSet) {
        if (!isDocumentAvailable()) {
            return;
        }
        if (shouldSet) {
            this.role = 'checkbox';
            this.setAttribute('role', this.role);
            this.setAttribute('aria-checked', this.selected.toString());
        }
        else {
            this.role = 'button';
            this.setAttribute('role', this.role);
            this.removeAttribute('aria-checked');
        }
    };
    ButtonDirective.prototype.hasText = function () {
        if (isDocumentAvailable()) {
            return String(this.element.textContent).trim().length > 0;
        }
        else {
            return false;
        }
    };
    ButtonDirective.prototype.addImgIcon = function (imageUrl) {
        var renderer = this.renderer;
        if (this.imageNode) {
            renderer.setProperty(this.imageNode, 'src', imageUrl);
        }
        else if (isDocumentAvailable()) {
            this.imageNode = renderer.createElement('img');
            renderer.setProperty(this.imageNode, 'src', imageUrl);
            renderer.setProperty(this.imageNode, 'className', 'k-image');
            renderer.setAttribute(this.imageNode, 'role', 'presentation');
            this.prependChild(this.imageNode);
        }
    };
    ButtonDirective.prototype.addIcon = function (classNames) {
        var renderer = this.renderer;
        if (this.iconNode) {
            renderer.setProperty(this.iconNode, 'className', classNames);
        }
        else if (isDocumentAvailable()) {
            this.iconNode = renderer.createElement('span');
            renderer.setProperty(this.iconNode, 'className', classNames);
            renderer.setAttribute(this.iconNode, 'role', 'presentation');
            this.prependChild(this.iconNode);
        }
    };
    ButtonDirective.prototype.prependChild = function (node) {
        var _this = this;
        this.defer(function () {
            if (_this.renderer && node !== _this.element.firstChild) {
                _this.renderer.insertBefore(_this.element, node, _this.element.firstChild);
            }
        });
    };
    ButtonDirective.prototype.defer = function (callback) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.deferTimeout = setTimeout(callback, 0);
        });
    };
    ButtonDirective.prototype.iconSetter = function (icon, insertIcon) {
        if (icon) {
            insertIcon(icon);
        }
        this.setIconTextClasses();
    };
    ButtonDirective.prototype.removeImageNode = function () {
        if (this.imageNode && this.renderer.parentNode(this.imageNode)) {
            this.renderer.removeChild(this.element, this.imageNode);
            this.imageNode = null;
        }
    };
    ButtonDirective.prototype.removeIconNode = function () {
        if (this.iconNode && this.renderer.parentNode(this.iconNode)) {
            this.renderer.removeChild(this.element, this.iconNode);
            this.iconNode = null;
        }
    };
    ButtonDirective.prototype.updateIconNode = function () {
        if (!this.isIcon && !this.isIconClass) {
            this.removeIconNode();
        }
    };
    ButtonDirective.prototype.setIconTextClasses = function () {
        var hasIcon = this.isIcon || this.isIconClass || this.imageNode;
        var hasText = this.hasText();
        this.toggleClass('k-button-icon', hasIcon && !hasText);
        this.toggleClass('k-button-icontext', hasIcon && hasText);
    };
    ButtonDirective.prototype.toggleClass = function (className, add) {
        if (add) {
            this.renderer.addClass(this.element, className);
        }
        else {
            this.renderer.removeClass(this.element, className);
        }
    };
    ButtonDirective.prototype._onButtonClick = function () {
        var _this = this;
        if (!this.disabled && this.service) {
            this.ngZone.run(function () {
                _this.service.click(_this);
            });
        }
        if (this.togglable && !this.service) {
            this.setSelected(!this.selected);
        }
    };
    ButtonDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoButton',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoButton], span[kendoButton]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    ButtonDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: KendoButtonService, decorators: [{ type: Optional }] },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    ButtonDirective.propDecorators = {
        toggleable: [{ type: Input }],
        togglable: [{ type: Input }],
        primary: [{ type: Input }],
        look: [{ type: Input }],
        selected: [{ type: Input }],
        tabIndex: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        disabled: [{ type: Input }],
        role: [{ type: Input }],
        selectedChange: [{ type: Output }],
        classButton: [{ type: HostBinding, args: ['class.k-button',] }],
        classDisabled: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        classPrimary: [{ type: HostBinding, args: ['class.k-primary',] }],
        isFlat: [{ type: HostBinding, args: ['class.k-flat',] }],
        isBare: [{ type: HostBinding, args: ['class.k-bare',] }],
        isOutline: [{ type: HostBinding, args: ['class.k-outline',] }],
        classActive: [{ type: HostBinding, args: ['attr.ariaPressed',] }, { type: HostBinding, args: ['class.k-state-active',] }],
        getDirection: [{ type: HostBinding, args: ['attr.dir',] }],
        onFocus: [{ type: HostListener, args: ['focus',] }],
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ButtonDirective;
}());

/* tslint:disable:no-null-keyword */
/* tslint:disable:no-bitwise */
var resolvedPromise = Promise.resolve(null);
/**
 * @hidden
 */
var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
var tick = function (f) { return (resolvedPromise.then(f)); };

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
        this.navigate = new EventEmitter();
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
        if (isChanged('disabled', change)) {
            this.buttons.forEach(function (button) {
                if (isPresent(_this.disabled)) {
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
        var eventArgs = new PreventableEvent();
        if (event.keyCode === Keys.ArrowRight && focusedIndex < lastIndex) {
            this.navigate.emit(eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                this.defocus(this.buttons.toArray());
                this.focus(this.buttons.filter(function (_current, index) {
                    return index === focusedIndex + 1;
                }));
            }
        }
        if (event.keyCode === Keys.ArrowLeft && focusedIndex > firstIndex) {
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
        if (isDevMode()) {
            if (this.isSelectionSingle() && this.buttons.filter(function (button) { return button.selected; }).length > 1) {
                throw new Error('Having multiple selected buttons with single selection mode is not supported');
            }
        }
    };
    ButtonGroupComponent.prototype.isSelectionSingle = function () {
        return this.selection === 'single';
    };
    ButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoButtonGroup',
                    providers: [
                        KendoButtonService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.buttongroup'
                        }
                    ],
                    selector: 'kendo-buttongroup',
                    template: "\n        <ng-content select=\"[kendoButton]\"></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    ButtonGroupComponent.ctorParameters = function () { return [
        { type: KendoButtonService },
        { type: LocalizationService },
        { type: ElementRef }
    ]; };
    ButtonGroupComponent.propDecorators = {
        disabled: [{ type: Input, args: ['disabled',] }],
        selection: [{ type: Input, args: ['selection',] }],
        width: [{ type: Input, args: ['width',] }],
        look: [{ type: Input }],
        tabIndex: [{ type: Input }],
        navigate: [{ type: Output }],
        buttons: [{ type: ContentChildren, args: [ButtonDirective,] }],
        wrapperClass: [{ type: HostBinding, args: ['class.k-button-group',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        stretchedClass: [{ type: HostBinding, args: ['class.k-button-group-stretched',] }],
        isFlat: [{ type: HostBinding, args: ['class.k-button-group-flat',] }],
        isBare: [{ type: HostBinding, args: ['class.k-button-group-bare',] }],
        isOutline: [{ type: HostBinding, args: ['class.k-button-group-outline',] }],
        getRole: [{ type: HostBinding, args: ['attr.role',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disalbed',] }],
        wrapperWidth: [{ type: HostBinding, args: ['style.width',] }],
        wrapperTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onFocus: [{ type: HostListener, args: ['focus',] }],
        focusout: [{ type: HostListener, args: ['focusout', ['$event'],] }]
    };
    return ButtonGroupComponent;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmodules'] }})
 * definition for the Button directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Buttons module
 * import { ButtonModule } from '@progress/kendo-angular-buttons';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ButtonModule], // import Button module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ButtonDirective],
                    exports: [ButtonDirective]
                },] },
    ];
    return ButtonModule;
}());

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ButtonGroupComponent`&mdash;The ButtonGroupComponent component class.
 */
var ButtonGroupModule = /** @class */ (function () {
    function ButtonGroupModule() {
    }
    ButtonGroupModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ButtonGroupComponent],
                    exports: [ButtonGroupComponent],
                    imports: [CommonModule, ButtonModule]
                },] },
    ];
    return ButtonGroupModule;
}());

/* tslint:disable:directive-selector-name */
/**
 * Used for rendering the list item content.
 *
 * To define the item template, nest a `<ng-template>` tag with the `kendo<ComponentName>ItemTemplate` directive inside the component tag.
 *
 * For the DropDownButton, use the `kendoDropDownButtonItemTemplate` directive.
 * For the SplitButton, use the `kendoSplitButtonItemTemplate` directive.
 *
 * The template context is set to the current component. To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="listItems">
 *    <ng-template kendoSplitButtonItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-splitbutton>
 *  <kendo-dropdownbutton [data]="listItems">
 *    <ng-template kendoDropDownButtonItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<any> = [{
 *      text: 'item1',
 *      icon: 'refresh',
 *      disabled: false,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }, {
 *      text: 'item2',
 *      icon: 'refresh',
 *      disabled: false,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }]
 * }
 * ```
 *
 * For more examples, refer to the article on the [DropDownList templates]({% slug overview_ddl %}#templates).
 */
var ButtonItemTemplateDirective = /** @class */ (function () {
    function ButtonItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ButtonItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownButtonItemTemplate],[kendoSplitButtonItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    ButtonItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ButtonItemTemplateDirective;
}());

/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent() {
        this.onItemClick = new EventEmitter();
        this.onItemBlur = new EventEmitter();
    }
    ListComponent.prototype.getText = function (dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    };
    ListComponent.prototype.getIconClasses = function (dataItem) {
        var icon = dataItem.icon ? 'k-icon k-i-' + dataItem.icon : undefined;
        var classes = {};
        classes[icon || dataItem.iconClass] = true;
        return classes;
    };
    ListComponent.prototype.onClick = function (index) {
        this.onItemClick.emit(index);
    };
    ListComponent.prototype.onBlur = function () {
        this.onItemBlur.emit();
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-button-list',
                    template: "\n        <ul class=\"k-list k-reset\" unselectable=\"on\">\n            <li role=\"menuItem\" unselectable=\"on\" tabindex=\"-1\"\n                kendoButtonFocusable\n                *ngFor=\"let dataItem of data; let index = index;\"\n                [index]=\"index\"\n                [ngClass]=\"{'k-item': true, 'k-state-disabled': dataItem.disabled}\"\n                (click)=\"onClick(index)\"\n                (blur)=\"onBlur()\"\n                [attr.aria-disabled]=\"dataItem.disabled ? true : false\">\n                <ng-template *ngIf=\"itemTemplate?.templateRef\"\n                    [templateContext]=\"{\n                        templateRef: itemTemplate?.templateRef,\n                        $implicit: dataItem\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!itemTemplate?.templateRef\">\n                    <span\n                        *ngIf=\"dataItem.icon || dataItem.iconClass\"\n                        [ngClass]=\"getIconClasses(dataItem)\"\n                    ></span>\n                    <img\n                        *ngIf=\"dataItem.imageUrl\"\n                        class=\"k-image\"\n                        [src]=\"dataItem.imageUrl\"\n                        alt=\"\"\n                    >\n                    {{ getText(dataItem) }}\n                </ng-template>\n            </li>\n        </ul>\n      "
                },] },
    ];
    ListComponent.propDecorators = {
        data: [{ type: Input }],
        textField: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        onItemClick: [{ type: Output }],
        onItemBlur: [{ type: Output }]
    };
    return ListComponent;
}());

/**
 * @hidden
 */
var FocusService = /** @class */ (function () {
    function FocusService() {
        this.onFocus = new EventEmitter();
    }
    FocusService.prototype.isFocused = function (index) {
        return index === this.focused;
    };
    FocusService.prototype.focus = function (index) {
        if (this.isFocused(index)) {
            return;
        }
        this.focused = index;
        this.onFocus.emit(index);
    };
    FocusService.prototype.resetFocus = function () {
        this.focused = -1;
    };
    Object.defineProperty(FocusService.prototype, "focused", {
        get: function () {
            return this.focusedIndex;
        },
        set: function (index) {
            this.focusedIndex = index;
            this.onFocus.emit(index);
        },
        enumerable: true,
        configurable: true
    });
    FocusService.decorators = [
        { type: Injectable },
    ];
    return FocusService;
}());

/**
 * @hidden
 */
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(focusService, elementRef) {
        this.focusService = focusService;
        this.element = elementRef.nativeElement;
        this.subscribeEvents();
    }
    Object.defineProperty(FocusableDirective.prototype, "focusedClassName", {
        get: function () {
            return this.focusService.isFocused(this.index);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FocusableDirective.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    FocusableDirective.prototype.subscribeEvents = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.focusSubscription = this.focusService.onFocus.subscribe(function (index) {
            if (_this.index === index) {
                _this.element.focus();
            }
        });
    };
    FocusableDirective.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.focusSubscription) {
            this.focusSubscription.unsubscribe();
        }
    };
    FocusableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoButtonFocusable]'
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: FocusService },
        { type: ElementRef }
    ]; };
    FocusableDirective.propDecorators = {
        index: [{ type: Input }],
        focusedClassName: [{ type: HostBinding, args: ['class.k-state-focused',] }]
    };
    return FocusableDirective;
}());

/**
 * @hidden
 */
var TemplateContextDirective = /** @class */ (function () {
    function TemplateContextDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplateContextDirective.prototype, "templateContext", {
        set: function (context) {
            if (this.insertedViewRef) {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
                this.insertedViewRef = undefined;
            }
            if (context.templateRef) {
                this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
            }
        },
        enumerable: true,
        configurable: true
    });
    TemplateContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[templateContext]' // tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    TemplateContextDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    TemplateContextDirective.propDecorators = {
        templateContext: [{ type: Input }]
    };
    return TemplateContextDirective;
}());

var EXPORTED_DIRECTIVES = [
    ListComponent,
    FocusableDirective,
    ButtonItemTemplateDirective,
    TemplateContextDirective
];
/**
 * @hidden
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [EXPORTED_DIRECTIVES],
                    exports: [EXPORTED_DIRECTIVES],
                    imports: [CommonModule]
                },] },
    ];
    return ListModule;
}());

/**
 * @hidden
 */
var KeyEvents;
(function (KeyEvents) {
    KeyEvents[KeyEvents["keydown"] = 0] = "keydown";
    KeyEvents[KeyEvents["keypress"] = 1] = "keypress";
    KeyEvents[KeyEvents["keyup"] = 2] = "keyup";
})(KeyEvents || (KeyEvents = {}));

/**
 * @hidden
 */
var NavigationAction;
(function (NavigationAction) {
    NavigationAction[NavigationAction["Undefined"] = 0] = "Undefined";
    NavigationAction[NavigationAction["Open"] = 1] = "Open";
    NavigationAction[NavigationAction["Close"] = 2] = "Close";
    NavigationAction[NavigationAction["Enter"] = 3] = "Enter";
    NavigationAction[NavigationAction["EnterPress"] = 4] = "EnterPress";
    NavigationAction[NavigationAction["EnterUp"] = 5] = "EnterUp";
    NavigationAction[NavigationAction["Tab"] = 6] = "Tab";
    NavigationAction[NavigationAction["Esc"] = 7] = "Esc";
    NavigationAction[NavigationAction["Navigate"] = 8] = "Navigate";
})(NavigationAction || (NavigationAction = {}));

/* tslint:disable:deprecation */
/**
 * @hidden
 */
var ListButton = /** @class */ (function () {
    function ListButton(focusService, navigationService, wrapperRef, _zone, localization) {
        var _this = this;
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapperRef = wrapperRef;
        this._zone = _zone;
        this._open = false;
        this._disabled = false;
        this._active = false;
        this._popupSettings = { animate: true, popupClass: '' };
        this.listId = guid();
        this._isFocused = false;
        this.wrapperBlurred = new EventEmitter();
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapper = wrapperRef.nativeElement;
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.subscribeEvents();
    }
    Object.defineProperty(ListButton.prototype, "popupClasses", {
        get: function () {
            var popupClasses = [
                'k-list-container',
                'k-reset',
                'k-group'
            ];
            if (this._popupSettings.popupClass) {
                popupClasses.push(this._popupSettings.popupClass);
            }
            return popupClasses.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListButton.prototype, "openState", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ListButton.prototype.togglePopupVisibility = function () {
        if (this._disabled) {
            return;
        }
        this.openState = !this.openState;
        if (!this.openState) {
            this.focusService.focus(-1);
        }
    };
    /**
     * @hidden
     */
    ListButton.prototype.onItemClick = function (index) {
        var _this = this;
        this.emitItemClickHandler(index);
        setTimeout(function () { _this.focusWrapper(); }, 1);
    };
    ListButton.prototype.ngOnDestroy = function () {
        this.openState = false;
        this.unsubscribeEvents();
        clearTimeout(this.focusFirstTimeout);
        clearTimeout(this.blurTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    ListButton.prototype.subscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.subscribeListItemFocusEvent();
        this.subscribeComponentBlurredEvent();
        this.subscribeNavigationEvents();
    };
    ListButton.prototype.subscribeListItemFocusEvent = function () {
        var _this = this;
        this.focusSubscription = this.focusService.onFocus.subscribe(function () {
            _this._isFocused = true;
        });
    };
    ListButton.prototype.subscribeComponentBlurredEvent = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this.documentClick = fromEvent(document, 'click').pipe(filter(function (event) {
                return !_this.wrapperContains(event.target);
            }));
            _this.tabSubscription = _this.navigationService.tab.pipe(filter(function () { return _this._isFocused; })).subscribe(_this.handleTab.bind(_this));
            _this.componentBlurredSubscription = merge(_this.documentClick, _this.wrapperBlurred).pipe(filter(function () { return _this._isFocused; })).subscribe(function () { return _this._zone.run(function () { return _this.blurWrapper(); }); });
        });
    };
    ListButton.prototype.subscribeNavigationEvents = function () {
        var _this = this;
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.focusService.focus.bind(this.focusService));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(function () {
            if (!_this._disabled && !_this._open) {
                _this._active = true;
            }
        });
        this.enterUpSubscription = this.navigationService.enterup.subscribe(function () {
            if (!_this._open) {
                _this._active = false;
            }
            _this.enterHandler();
            _this.focusWrapper();
        });
        this.openSubscription = this.navigationService.open.subscribe(function () {
            if (!_this._open) {
                _this.togglePopupVisibility();
                _this.focusFirstItem();
            }
            else {
                _this.focusWrapper();
            }
        });
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(function () { return _this.focusWrapper(); });
    };
    ListButton.prototype.enterHandler = function () { }; // tslint:disable-line
    ListButton.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.unsubscribe(this.componentBlurredSubscription);
        this.unsubscribe(this.focusSubscription);
        this.unsubscribe(this.navigationSubscription);
        this.unsubscribe(this.enterPressSubscription);
        this.unsubscribe(this.enterUpSubscription);
        this.unsubscribe(this.openSubscription);
        this.unsubscribe(this.closeSubscription);
        this.unsubscribe(this.tabSubscription);
    };
    ListButton.prototype.unsubscribe = function (subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyDownHandler = function (event) {
        this.keyHandler(event);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyPressHandler = function (event) {
        this.keyHandler(event, KeyEvents.keypress);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyUpHandler = function (event) {
        this.keyHandler(event, KeyEvents.keyup);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyHandler = function (event, keyEvent) {
        if (this._disabled) {
            return;
        }
        var focused = this.focusService.focused || 0;
        var eventData = event;
        var action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused,
            keyCode: eventData.keyCode,
            keyEvent: keyEvent,
            max: this._data ? this._data.length - 1 : 0,
            min: 0
        });
        if (action !== NavigationAction.Undefined &&
            action !== NavigationAction.Tab &&
            (action !== NavigationAction.Enter || (action === NavigationAction.Enter && this._open))) {
            eventData.preventDefault();
        }
    };
    ListButton.prototype.emitItemClickHandler = function (index) {
        var dataItem = this._data[index];
        if (this._itemClick) {
            this._itemClick.emit(dataItem);
        }
        if (dataItem && dataItem.click && !dataItem.disabled) {
            dataItem.click(dataItem);
        }
    };
    ListButton.prototype.focusFirstItem = function () {
        var _this = this;
        if (this._data && isPresent(this._data[0])) {
            this.focusFirstTimeout = setTimeout(function () { _this.focusService.focus(0); }, 1);
        }
    };
    ListButton.prototype.focusWrapper = function () {
        if (this._open) {
            this.togglePopupVisibility();
            this.focusButton();
        }
    };
    /**
     * @hidden
     */
    ListButton.prototype.blurHandler = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.blurTimeout = setTimeout(function () {
            if (!_this.wrapperContains(document.activeElement)) {
                _this.blurWrapper();
            }
        });
    };
    ListButton.prototype.wrapperContains = function (element) {
        return this.wrapper === element || this.wrapper.contains(element);
    };
    ListButton.prototype.blurWrapper = function () {
        if (this._open) {
            this.togglePopupVisibility();
        }
        this._isFocused = false;
        this._blur.emit();
    };
    ListButton.prototype.focusButton = function () {
        if (this.button) {
            this.button.nativeElement.focus();
        }
    };
    ListButton.prototype.handleTab = function () {
        this.focusButton();
        this.blurWrapper();
    };
    return ListButton;
}());

/**
 * @hidden
 */
var NAVIGATION_CONFIG = new InjectionToken('navigation.config');

/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(config) {
        this.navigate = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.enter = new EventEmitter();
        this.enterpress = new EventEmitter();
        this.enterup = new EventEmitter();
        this.tab = new EventEmitter();
        this.esc = new EventEmitter();
        this.useLeftRightArrows = config.useLeftRightArrows;
    }
    NavigationService.prototype.process = function (args) {
        var keyCode = args.keyCode;
        var keyEvent = args.keyEvent;
        var index;
        var action = NavigationAction.Undefined;
        if (keyEvent === KeyEvents.keypress) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterPress;
            }
        }
        else if (keyEvent === KeyEvents.keyup) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterUp;
            }
        }
        else {
            if (args.altKey && keyCode === Keys.ArrowDown) {
                action = NavigationAction.Open;
            }
            else if (args.altKey && keyCode === Keys.ArrowUp) {
                action = NavigationAction.Close;
            }
            else if (this.isEnter(keyCode)) {
                action = NavigationAction.Enter;
            }
            else if (keyCode === Keys.Escape) {
                action = NavigationAction.Esc;
            }
            else if (keyCode === Keys.Tab) {
                action = NavigationAction.Tab;
            }
            else if (keyCode === Keys.ArrowUp || (this.useLeftRightArrows && keyCode === Keys.ArrowLeft)) {
                index = this.next({
                    current: args.current,
                    start: args.max,
                    end: args.min,
                    step: -1
                });
                action = NavigationAction.Navigate;
            }
            else if (keyCode === Keys.ArrowDown || (this.useLeftRightArrows && keyCode === Keys.ArrowRight)) {
                index = this.next({
                    current: args.current,
                    start: args.min,
                    end: args.max,
                    step: 1
                });
                action = NavigationAction.Navigate;
            }
        }
        if (action !== NavigationAction.Undefined) {
            this[NavigationAction[action].toLowerCase()].emit(index);
        }
        return action;
    };
    NavigationService.prototype.isEnter = function (keyCode) {
        return keyCode === Keys.Enter || keyCode === Keys.Space;
    };
    NavigationService.prototype.next = function (args) {
        if (!isPresent(args.current)) {
            return args.start;
        }
        else {
            return args.current !== args.end ? args.current + args.step : args.end;
        }
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NAVIGATION_CONFIG,] }] }
    ]; };
    return NavigationService;
}());

/* tslint:disable:no-access-missing-member */
var NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
var ɵ0 = NAVIGATION_SETTINGS;
var NAVIGATION_SETTINGS_PROVIDER = {
    provide: NAVIGATION_CONFIG,
    useValue: ɵ0
};
/**
 * Represents the Kendo UI SplitButton component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="data" [icon]="'paste'"
 *      (itemClick)="onSplitButtonItemClick($event)"
 *      (buttonClick)="onSplitButtonClick()">Paste</kendo-splitbutton>
 * `
 * })
 *
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'Keep Text Only',
 *       icon: 'paste-plain-text',
 *       click: () => { console.log('Keep Text Only click handler'); }
 *   }, {
 *       text: 'Paste as HTML',
 *       icon: 'paste-as-html'
 *   }, {
 *       text: 'Paste Markdown',
 *       icon: 'paste-markdown'
 *   }, {
 *       text: 'Set Default Paste'
 *   }];
 *
 *   public onSplitButtonClick(dataItem: any): void {
 *       console.log('Paste');
 *   }
 *
 *   public onSplitButtonItemClick(dataItem: any): void {
 *       if (dataItem) {
 *           console.log(dataItem.text);
 *       }
 *   }
 * }
 * ```
 */
var SplitButtonComponent = /** @class */ (function (_super) {
    __extends(SplitButtonComponent, _super);
    function SplitButtonComponent(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        var _this = _super.call(this, focusService, navigationService, wrapperRef, zone, localization) || this;
        _this.popupService = popupService;
        _this.elRef = elRef;
        /**
         * Sets the text of the SplitButton.
         */
        _this.text = '';
        /**
         * Defines an icon to be rendered next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        _this.icon = '';
        /**
         * Defines an icon with a custom CSS class to be rendered next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        _this.iconClass = '';
        /**
         * Defines the location of an image to be displayed next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        _this.imageUrl = '';
        /**
         * Changes the visual appearance by using alternative styling options.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        _this.tabIndex = 0;
        /**
         * Specifies the name of the [font icon]({% slug icons %}#toc-list-of-font-icons) that will
         * be rendered for the button which opens the popup.
         */
        _this.arrowButtonIcon = 'arrow-s';
        /**
         * Fires each time the user clicks the main button.
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-splitbutton (buttonClick)="onSplitButtonClick()" [data]="data">
         *            Reply
         *        </kendo-splitbutton>
         *    `
         * })
         * class AppComponent {
         *    public data: Array<any> = ['Reply All', 'Forward', 'Reply & Delete'];
         *
         *    public onSplitButtonClick(): void {
         *      console.log('SplitButton click');
         *    }
         * }
         * ```
         *
         */
        _this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks on the drop-down list. The event data contains the data item bound to the clicked list item.
         *
         * @example
         * ```ts
         * _@Component({
         *     selector: 'my-app',
         *    template: `
         *        <kendo-splitbutton (itemClick)="onSplitButtonItemClick($event)" [data]="data">
         *          Reply
         *      </kendo-splitbutton>
         *    `
         * })
         * class AppComponent {
         *    public data: Array<any> = ['Reply All', 'Forward', 'Reply & Delete'];
         *
         *   public onSplitButtonItemClick(dataItem?: string): void {
         *        if (dataItem) {
         *            console.log(dataItem);
         *       }
         *    }
         * }
         * ```
         *
         */
        _this.itemClick = new EventEmitter();
        /**
         * Fires each time the SplitButton gets focused.
         */
        _this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the SplitButton gets blurred.
         */
        _this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        _this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         */
        _this.close = new EventEmitter();
        _this.listId = guid();
        _this.buttonText = '';
        _this._itemClick = _this.itemClick;
        _this._blur = _this.onBlur;
        return _this;
    }
    Object.defineProperty(SplitButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /**
         * When set to `true`, disables a SplitButton item
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the SplitButton.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
         * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.data = [];
            }
            return this._data;
        },
        /**
         * Sets the data of the SplitButton.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "openState", {
        /**
         * @hidden
         */
        get: function () {
            return this._open;
        },
        /**
         * @hidden
         */
        set: function (open) {
            if (this.disabled) {
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
            this._toggle(open);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "active", {
        /**
         * @hidden
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "componentTabIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled ? (-1) : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "isFocused", {
        get: function () {
            return this._isFocused && !this._disabled;
        },
        set: function (value) {
            this._isFocused = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "ariaLabel", {
        /**
         * @hidden
         */
        get: function () {
            return this.buttonText + " splitbutton";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.onButtonFocus = function () {
        if (!this.isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.onButtonClick = function () {
        this.buttonClick.emit();
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.keydown = function (event) {
        this.keyDownHandler(event);
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.keypress = function (event) {
        this.keyPressHandler(event);
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.keyup = function (event) {
        this.keyUpHandler(event);
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.ngAfterViewInit = function () {
        this.updateButtonText();
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('text')) {
            this.updateButtonText();
        }
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.togglePopupVisibility = function () {
        _super.prototype.togglePopupVisibility.call(this);
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.wrapperContains = function (element) {
        return this.wrapper === element
            || this.wrapper.contains(element)
            || (this.popupRef && this.popupRef.popupElement.contains(element));
    };
    Object.defineProperty(SplitButtonComponent.prototype, "anchorAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: this.popupSettings.align || 'left', vertical: 'bottom' };
            if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "popupAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: this.popupSettings.align || 'left', vertical: 'top' };
            if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focuses the SplitButton component.
     */
    SplitButtonComponent.prototype.focus = function () {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    };
    /**
     * Blurs the SplitButton component.
     */
    SplitButtonComponent.prototype.blur = function () {
        if (isDocumentAvailable()) {
            this.button.nativeElement.blur();
            this.blurWrapper();
        }
    };
    SplitButtonComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.destroyPopup();
    };
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    SplitButtonComponent.prototype.toggle = function (open) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        tick(function () { return (_this._toggle((open === undefined) ? !_this._open : open)); });
    };
    Object.defineProperty(SplitButtonComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.openState;
        },
        enumerable: true,
        configurable: true
    });
    SplitButtonComponent.prototype.enterHandler = function () {
        if (this.disabled) {
            return;
        }
        if (this.openState) {
            var focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        else {
            this.buttonClick.emit();
        }
    };
    SplitButtonComponent.prototype.updateButtonText = function () {
        var _this = this;
        if (isDocumentAvailable()) {
            var innerText_1 = this.wrapper.innerText.split('\n').join('').trim();
            //setTimout is needed because of `Expression has changed after it was checked.` error;
            setTimeout(function () { _this.buttonText = innerText_1; }, 0);
        }
    };
    Object.defineProperty(SplitButtonComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.containerRef : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    SplitButtonComponent.prototype._toggle = function (open) {
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    SplitButtonComponent.prototype.createPopup = function () {
        var _this = this;
        this.popupRef = this.popupService.open({
            anchor: this.elRef,
            anchorAlign: this.anchorAlign,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: this.popupAlign,
            popupClass: this.popupClasses
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.openState = false; });
        this.popupRef.popupOpen.subscribe(this.focusFirstItem.bind(this));
    };
    SplitButtonComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    SplitButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSplitButton',
                    providers: [
                        FocusService,
                        NavigationService,
                        NAVIGATION_SETTINGS_PROVIDER,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.splitbutton'
                        }
                    ],
                    selector: 'kendo-splitbutton',
                    template: "\n        <button kendoButton\n            #button\n            role=\"listbox\"\n            type=\"button\"\n            [look]=\"look\"\n            [tabindex]=\"componentTabIndex\"\n            [disabled]=\"disabled\"\n            [icon]=\"icon\"\n            [class.k-state-active]=\"active\"\n            [iconClass]=\"iconClass\"\n            [imageUrl]=\"imageUrl\"\n            [ngClass]=\"buttonClass\"\n            (focus)=\"onButtonFocus()\"\n            (click)=\"onButtonClick()\"\n            [attr.aria-disabled]=\"disabled\"\n            [attr.aria-expanded]=\"openState\"\n            [attr.aria-haspopup]=\"true\"\n            [attr.aria-owns]=\"listId\"\n            [attr.aria-label]=\"ariaLabel\"\n            >\n            {{text}}<ng-content></ng-content>\n        </button>\n        <button kendoButton\n            type=\"button\"\n            [disabled]=\"disabled\"\n            [icon]=\"arrowButtonIcon\"\n            [look]=\"look\"\n            [tabindex]=\"-1\"\n            [ngClass]=\"arrowButtonClass\"\n            (click)=\"togglePopupVisibility()\">\n        </button>\n        <ng-template #popupTemplate>\n            <kendo-button-list\n                [id]=\"listId\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [itemTemplate]=\"itemTemplate\"\n                (onItemBlur)=\"blurHandler()\"\n                (onItemClick)=\"onItemClick($event)\"\n                (keydown)=\"keyDownHandler($event)\"\n                (keypress)=\"keyPressHandler($event)\"\n                (keyup)=\"keyUpHandler($event)\"\n            >\n            </kendo-button-list>\n        </ng-template>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitButtonComponent.ctorParameters = function () { return [
        { type: FocusService },
        { type: NavigationService },
        { type: ElementRef },
        { type: NgZone },
        { type: PopupService },
        { type: ElementRef },
        { type: LocalizationService }
    ]; };
    SplitButtonComponent.propDecorators = {
        text: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        look: [{ type: Input }],
        disabled: [{ type: Input }],
        popupSettings: [{ type: Input }],
        tabIndex: [{ type: Input }],
        textField: [{ type: Input }],
        data: [{ type: Input }],
        buttonClass: [{ type: Input }],
        arrowButtonClass: [{ type: Input }],
        arrowButtonIcon: [{ type: Input }],
        buttonClick: [{ type: Output }],
        itemClick: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        itemTemplate: [{ type: ContentChild, args: [ButtonItemTemplateDirective,] }],
        button: [{ type: ViewChild, args: ['button',] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
        containerRef: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        isFocused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-split-button',] }, { type: HostBinding, args: ['class.k-button-group',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        keypress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
        keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }]
    };
    return SplitButtonComponent;
}(ListButton));

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `SplitButtonComponent`&mdash;The SplitButtonComponent component class.
 */
var SplitButtonModule = /** @class */ (function () {
    function SplitButtonModule() {
    }
    SplitButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SplitButtonComponent],
                    exports: [SplitButtonComponent, ListModule],
                    imports: [CommonModule, PopupModule, ButtonModule, ListModule]
                },] },
    ];
    return SplitButtonModule;
}());

/* tslint:disable:no-access-missing-member */
var NAVIGATION_SETTINGS$1 = {
    useLeftRightArrows: true
};
var ɵ0$1 = NAVIGATION_SETTINGS$1;
var NAVIGATION_SETTINGS_PROVIDER$1 = {
    provide: NAVIGATION_CONFIG,
    useValue: ɵ0$1
};
/**
 * Represents the Kendo UI DropDownButton component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownbutton [data]="data">
 *    User Settings
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'My Profile'
 *   }, {
 *       text: 'Friend Requests'
 *   }, {
 *       text: 'Account Settings'
 *   }, {
 *       text: 'Support'
 *   }, {
 *       text: 'Log Out'
 *   }];
 * }
 * ```
 */
var DropDownButtonComponent = /** @class */ (function (_super) {
    __extends(DropDownButtonComponent, _super);
    function DropDownButtonComponent(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        var _this = _super.call(this, focusService, navigationService, wrapperRef, zone, localization) || this;
        _this.popupService = popupService;
        _this.elRef = elRef;
        /**
         * Defines the name of an existing icon in a Kendo UI theme.
         */
        _this.icon = '';
        /**
         * Defines the list of CSS classes which are used for styling the Button with custom icons.
         */
        _this.iconClass = '';
        /**
         * Defines a URL for styling the button with a custom image.
         */
        _this.imageUrl = '';
        /**
         * Adds visual weight to the default button and makes it primary.
         */
        _this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        _this.tabIndex = 0;
        /**
         * Fires each time the user clicks on a drop-down list item. The event data contains the data item bound to the clicked list item.
         */
        _this.itemClick = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        _this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         */
        _this.close = new EventEmitter();
        /**
         * Fires each time the DropDownButton gets focused.
         */
        _this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the DropDownButton gets blurred.
         */
        _this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        _this.listId = guid();
        _this._itemClick = _this.itemClick;
        _this._blur = _this.onBlur;
        return _this;
    }
    Object.defineProperty(DropDownButtonComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownButton.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
         * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /**
         * Sets the disabled state of the DropDownButton.
         */
        set: function (value) {
            if (value && this.openState) {
                this.openState = false;
            }
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets or gets the data of the DropDownButton.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "openState", {
        /**
         * @hidden
         */
        get: function () {
            return this._open;
        },
        /**
         * @hidden
         */
        set: function (open) {
            if (this.disabled) {
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
            this._toggle(open);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "componentTabIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled ? (-1) : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "appendTo", {
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
    Object.defineProperty(DropDownButtonComponent.prototype, "focused", {
        get: function () {
            return this._isFocused && !this._disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "active", {
        /**
         * @hidden
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keydown = function (event) {
        this.keyDownHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keypress = function (event) {
        this.keyPressHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keyup = function (event) {
        this.keyUpHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.mousedown = function (event) {
        if (this._disabled) {
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.openPopup = function () {
        this.togglePopupVisibility();
    };
    Object.defineProperty(DropDownButtonComponent.prototype, "anchorAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: this.popupSettings.align || 'left', vertical: 'bottom' };
            if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "popupAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: this.popupSettings.align || 'left', vertical: 'top' };
            if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focuses the DropDownButton component.
     */
    DropDownButtonComponent.prototype.focus = function () {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    };
    /**
     * Blurs the DropDownButton component.
     */
    DropDownButtonComponent.prototype.blur = function () {
        if (isDocumentAvailable()) {
            this.button.nativeElement.blur();
            this.blurWrapper();
        }
    };
    DropDownButtonComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.destroyPopup();
    };
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    DropDownButtonComponent.prototype.toggle = function (open) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        tick(function () { return (_this._toggle((open === undefined) ? !_this._open : open)); });
    };
    Object.defineProperty(DropDownButtonComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.openState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.handleFocus = function () {
        if (!this._disabled && !this._isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.wrapperContains = function (element) {
        return this.wrapper === element
            || this.wrapper.contains(element)
            || (this.popupRef && this.popupRef.popupElement.contains(element));
    };
    DropDownButtonComponent.prototype.subscribeNavigationEvents = function () {
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.onArrowKeyNavigate.bind(this));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(this.onNavigationEnterPress.bind(this));
        this.enterUpSubscription = this.navigationService.enterup.subscribe(this.onNavigationEnterUp.bind(this));
        this.openSubscription = this.navigationService.open.subscribe(this.onNavigationOpen.bind(this));
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(this.onNavigationClose.bind(this));
    };
    DropDownButtonComponent.prototype.onNavigationEnterPress = function () {
        if (!this._disabled && !this.openState) {
            this._active = true;
        }
    };
    DropDownButtonComponent.prototype.onNavigationEnterUp = function () {
        if (!this._disabled && !this.openState) {
            this._active = false;
        }
        if (this.openState) {
            var focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        this.togglePopupVisibility();
        if (!this.openState && isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    };
    DropDownButtonComponent.prototype.onNavigationOpen = function () {
        if (!this._disabled && !this.openState) {
            this.togglePopupVisibility();
        }
    };
    DropDownButtonComponent.prototype.onNavigationClose = function () {
        if (this.openState) {
            this.togglePopupVisibility();
            if (isDocumentAvailable()) {
                this.button.nativeElement.focus();
            }
        }
    };
    DropDownButtonComponent.prototype.onArrowKeyNavigate = function (index) {
        this.focusService.focus(index);
    };
    DropDownButtonComponent.prototype._toggle = function (open) {
        if (this._open === open) {
            return;
        }
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    DropDownButtonComponent.prototype.createPopup = function () {
        var _this = this;
        this.popupRef = this.popupService.open({
            anchor: this.elRef,
            anchorAlign: this.anchorAlign,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: this.popupAlign,
            popupClass: this.popupClasses
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.openState = false; });
        this.popupRef.popupOpen.subscribe(this.focusFirstItem.bind(this));
    };
    DropDownButtonComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    DropDownButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoDropDownButton',
                    providers: [
                        FocusService,
                        NavigationService,
                        NAVIGATION_SETTINGS_PROVIDER$1,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.dropdownbutton'
                        }
                    ],
                    selector: 'kendo-dropdownbutton',
                    template: "\n        <button kendoButton #button\n            role=\"menu\"\n            type=\"button\"\n            [tabindex]=\"componentTabIndex\"\n            [class.k-state-active]=\"active\"\n            [disabled]=\"disabled\"\n            [icon]=\"icon\"\n            [iconClass]=\"iconClass\"\n            [imageUrl]=\"imageUrl\"\n            [ngClass]=\"buttonClass\"\n            (click)=\"openPopup()\"\n            (focus)=\"handleFocus()\"\n            [attr.aria-disabled]=\"disabled\"\n            [attr.aria-expanded]=\"openState\"\n            [attr.aria-haspopup]=\"true\"\n            [attr.aria-owns]=\"listId\"\n            [look]=\"look\"\n            [primary]=\"primary\"\n            >\n            <ng-content></ng-content>\n        </button>\n        <ng-template #popupTemplate>\n            <kendo-button-list\n                #buttonList\n                [id]=\"listId\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [itemTemplate]=\"itemTemplate\"\n                (onItemClick)=\"onItemClick($event)\"\n                (keydown)=\"keyDownHandler($event)\"\n                (keypress)=\"keyPressHandler($event)\"\n                (keyup)=\"keyUpHandler($event)\"\n            >\n            </kendo-button-list>\n        </ng-template>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DropDownButtonComponent.ctorParameters = function () { return [
        { type: FocusService },
        { type: NavigationService },
        { type: ElementRef },
        { type: NgZone },
        { type: PopupService },
        { type: ElementRef },
        { type: LocalizationService }
    ]; };
    DropDownButtonComponent.propDecorators = {
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        popupSettings: [{ type: Input }],
        textField: [{ type: Input }],
        disabled: [{ type: Input }],
        data: [{ type: Input }],
        primary: [{ type: Input }],
        look: [{ type: Input }],
        buttonClass: [{ type: Input }],
        tabIndex: [{ type: Input }],
        itemClick: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-dropdown-button',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        itemTemplate: [{ type: ContentChild, args: [ButtonItemTemplateDirective,] }],
        button: [{ type: ViewChild, args: ['button',] }],
        buttonList: [{ type: ViewChild, args: ['buttonList',] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        keypress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
        keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }],
        mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return DropDownButtonComponent;
}(ListButton));

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `DropDownButtonComponent`&mdash;The DropDownButtonComponent component class.
 */
var DropDownButtonModule = /** @class */ (function () {
    function DropDownButtonModule() {
    }
    DropDownButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DropDownButtonComponent],
                    exports: [DropDownButtonComponent, ListModule],
                    imports: [CommonModule, PopupModule, ListModule, ButtonModule]
                },] },
    ];
    return DropDownButtonModule;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmodules'] }})
 * definition for the Buttons components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Buttons module
 * import { ButtonsModule } from '@progress/kendo-angular-buttons';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ButtonsModule], // import Buttons module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ButtonsModule = /** @class */ (function () {
    function ButtonsModule() {
    }
    ButtonsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ButtonGroupModule, ButtonModule, SplitButtonModule, DropDownButtonModule]
                },] },
    ];
    return ButtonsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { KendoButtonService, FocusService, FocusableDirective, ButtonItemTemplateDirective, ListButton, ListComponent, ListModule, TemplateContextDirective, NAVIGATION_CONFIG, NavigationService, ButtonDirective, ButtonDirective as Button, ButtonGroupComponent, ButtonGroupComponent as ButtonGroup, ButtonGroupModule, ButtonModule, ButtonsModule, SplitButtonComponent, SplitButtonComponent as SplitButton, SplitButtonModule, DropDownButtonComponent, DropDownButtonComponent as DropDownButton, DropDownButtonModule };
