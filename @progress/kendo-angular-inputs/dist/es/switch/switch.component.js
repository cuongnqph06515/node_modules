/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, Component, EventEmitter, HostBinding, Input, Output, ViewChild, forwardRef, ChangeDetectorRef, NgZone, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { hasObservers, guid, Keys, KendoInput } from '@progress/kendo-angular-common';
import { requiresZoneOnBlur } from '../common/utils';
import { skip } from "rxjs/operators";
import { browser } from '@progress/kendo-common';
var FOCUSED = 'k-state-focused';
/**
 * Represents the [Kendo UI Switch component for Angular]({% slug overview_switch %}).
 */
var SwitchComponent = /** @class */ (function () {
    function SwitchComponent(renderer, hostElement, localizationService, injector, changeDetector, ngZone) {
        var _this = this;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        this.injector = injector;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Sets the current value of the Switch when it is initially displayed.
         */
        this.checked = false;
        /**
         * Determines whether the Switch is disabled ([see example]({% slug disabled_switch %})).
         */
        this.disabled = false;
        /**
         * Determines whether the Switch is in its read-only state ([see example]({% slug readonly_switch %})).
         */
        this.readonly = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the Switch.
         */
        this.tabindex = 0;
        /**
         * Fires each time the user focuses the `input` element.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the `input` element gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new EventEmitter();
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        /**
         * @hidden
         */
        this.handleFocus = function () {
            _this.focused = true;
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.onBlur.emit();
                });
            }
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    Object.defineProperty(SwitchComponent.prototype, "tabIndex", {
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
    Object.defineProperty(SwitchComponent.prototype, "ieClass", {
        get: function () {
            return browser && browser.msie;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "ariaReadonly", {
        get: function () {
            return this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "switchOnClass", {
        get: function () {
            return this.checked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "switchOffClass", {
        get: function () {
            return !this.checked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "onLabelMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.onLabel || this.localizationService.get('on');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "offLabelMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.offLabel || this.localizationService.get('off');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "isEnabled", {
        get: function () {
            return !this.disabled && !this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    SwitchComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.hostElement) {
            var wrapper = this.hostElement.nativeElement;
            this.renderer.removeAttribute(wrapper, "tabindex");
        }
        this.localizationChangeSubscription = this.localizationService
            .changes
            .pipe(skip(1))
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.control = this.injector.get(NgControl, null);
    };
    SwitchComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    /**
     * Focuses the Switch.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="switch.focus()">Focus</button>
     *  <kendo-switch #switch></kendo-switch>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    SwitchComponent.prototype.focus = function () {
        if (!this.wrapper) {
            return;
        }
        this.wrapper.nativeElement.focus();
    };
    /**
     * Blurs the Switch.
     */
    SwitchComponent.prototype.blur = function () {
        if (!this.wrapper) {
            return;
        }
        this.wrapper.nativeElement.blur();
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     */
    SwitchComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.changeDetector.markForCheck();
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.writeValue = function (value) {
        this.checked = value === null ? false : value;
        this.changeDetector.markForCheck();
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.keyDownHandler = function (e) {
        var keyCode = e.keyCode;
        if (this.isEnabled && (keyCode === Keys.Space || keyCode === Keys.Enter)) {
            this.changeValue(!this.checked);
            e.preventDefault();
        }
    };
    /**
     * @hidden
     */
    SwitchComponent.prototype.clickHandler = function () {
        if (this.isEnabled) {
            this.changeValue(!this.checked);
        }
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    SwitchComponent.prototype.isEmpty = function () {
        return false;
    };
    SwitchComponent.prototype.changeValue = function (value) {
        var _this = this;
        if (this.checked !== value) {
            this.ngZone.run(function () {
                _this.checked = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.changeDetector.markForCheck();
            });
        }
    };
    Object.defineProperty(SwitchComponent.prototype, "focused", {
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                var element = this.hostElement.nativeElement;
                if (value) {
                    this.renderer.addClass(element, FOCUSED);
                }
                else {
                    this.renderer.removeClass(element, FOCUSED);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SwitchComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSwitch',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.switch' },
                        {
                            multi: true,
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return SwitchComponent; }) /* tslint:disable-line */
                        },
                        {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return SwitchComponent; })
                        }
                    ],
                    selector: 'kendo-switch',
                    template: "\n        <ng-container kendoSwitchLocalizedMessages\n            i18n-on=\"kendo.switch.on|The **On** label of the Switch.\"\n            on=\"ON\"\n            i18n-off=\"kendo.switch.off|The **Off** label of the Switch.\"\n            off=\"OFF\"\n        >\n\n        <span\n            #wrapper\n            class=\"k-switch-container\"\n            [id]=\"focusableId\"\n            role=\"switch\"\n            [attr.aria-checked]=\"checked\"\n            [attr.tabindex]=\"(disabled ? undefined : tabIndex)\"\n            [kendoEventsOutsideAngular]=\"{ click: clickHandler, keydown: keyDownHandler, focus: handleFocus, blur: handleBlur }\"\n        >\n            <span class=\"k-switch-label-on\" [attr.aria-hidden]=\"true\" >{{onLabelMessage}}</span>\n            <span class=\"k-switch-label-off\" [attr.aria-hidden]=\"true\">{{offLabelMessage}}</span>\n            <span class=\"k-switch-handle\"></span>\n        </span>\n  "
                },] },
    ];
    /** @nocollapse */
    SwitchComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: LocalizationService },
        { type: Injector },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    SwitchComponent.propDecorators = {
        focusableId: [{ type: Input }],
        onLabel: [{ type: Input }],
        offLabel: [{ type: Input }],
        checked: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        valueChange: [{ type: Output }],
        wrapper: [{ type: ViewChild, args: ['wrapper',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        ieClass: [{ type: HostBinding, args: ['class.k-ie',] }],
        ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
        ariaReadonly: [{ type: HostBinding, args: ['attr.aria-readonly',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-switch',] }],
        switchOnClass: [{ type: HostBinding, args: ['class.k-switch-on',] }],
        switchOffClass: [{ type: HostBinding, args: ['class.k-switch-off',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
    };
    return SwitchComponent;
}());
export { SwitchComponent };
