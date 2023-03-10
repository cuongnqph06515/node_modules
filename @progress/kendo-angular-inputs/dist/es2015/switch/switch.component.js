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
const FOCUSED = 'k-state-focused';
/**
 * Represents the [Kendo UI Switch component for Angular]({% slug overview_switch %}).
 */
export class SwitchComponent {
    constructor(renderer, hostElement, localizationService, injector, changeDetector, ngZone) {
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        this.injector = injector;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
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
        this.ngChange = (_) => { };
        this.ngTouched = () => { };
        /**
         * @hidden
         */
        this.handleFocus = () => {
            this.focused = true;
            if (hasObservers(this.onFocus)) {
                this.ngZone.run(() => {
                    this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = () => {
            this.changeDetector.markForCheck();
            this.focused = false;
            if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
                this.ngZone.run(() => {
                    this.ngTouched();
                    this.onBlur.emit();
                });
            }
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    get ieClass() {
        return browser && browser.msie;
    }
    get ariaDisabled() {
        return this.disabled ? true : undefined;
    }
    get ariaReadonly() {
        return this.readonly;
    }
    get hostClasses() {
        return true;
    }
    get switchOnClass() {
        return this.checked;
    }
    get switchOffClass() {
        return !this.checked;
    }
    get disabledClass() {
        return this.disabled;
    }
    /**
     * @hidden
     */
    get onLabelMessage() {
        return this.onLabel || this.localizationService.get('on');
    }
    /**
     * @hidden
     */
    get offLabelMessage() {
        return this.offLabel || this.localizationService.get('off');
    }
    get isEnabled() {
        return !this.disabled && !this.readonly;
    }
    ngOnInit() {
        if (this.hostElement) {
            const wrapper = this.hostElement.nativeElement;
            this.renderer.removeAttribute(wrapper, "tabindex");
        }
        this.localizationChangeSubscription = this.localizationService
            .changes
            .pipe(skip(1))
            .subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.control = this.injector.get(NgControl, null);
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
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
    focus() {
        if (!this.wrapper) {
            return;
        }
        this.wrapper.nativeElement.focus();
    }
    /**
     * Blurs the Switch.
     */
    blur() {
        if (!this.wrapper) {
            return;
        }
        this.wrapper.nativeElement.blur();
    }
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetector.markForCheck();
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.checked = value === null ? false : value;
        this.changeDetector.markForCheck();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.ngChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.ngTouched = fn;
    }
    /**
     * @hidden
     */
    keyDownHandler(e) {
        const keyCode = e.keyCode;
        if (this.isEnabled && (keyCode === Keys.Space || keyCode === Keys.Enter)) {
            this.changeValue(!this.checked);
            e.preventDefault();
        }
    }
    /**
     * @hidden
     */
    clickHandler() {
        if (this.isEnabled) {
            this.changeValue(!this.checked);
        }
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    changeValue(value) {
        if (this.checked !== value) {
            this.ngZone.run(() => {
                this.checked = value;
                this.ngChange(value);
                this.valueChange.emit(value);
                this.changeDetector.markForCheck();
            });
        }
    }
    set focused(value) {
        if (this.isFocused !== value && this.hostElement) {
            const element = this.hostElement.nativeElement;
            if (value) {
                this.renderer.addClass(element, FOCUSED);
            }
            else {
                this.renderer.removeClass(element, FOCUSED);
            }
            this.isFocused = value;
        }
    }
}
SwitchComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSwitch',
                providers: [
                    LocalizationService,
                    { provide: L10N_PREFIX, useValue: 'kendo.switch' },
                    {
                        multi: true,
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => SwitchComponent) /* tslint:disable-line */
                    },
                    {
                        provide: KendoInput,
                        useExisting: forwardRef(() => SwitchComponent)
                    }
                ],
                selector: 'kendo-switch',
                template: `
        <ng-container kendoSwitchLocalizedMessages
            i18n-on="kendo.switch.on|The **On** label of the Switch."
            on="ON"
            i18n-off="kendo.switch.off|The **Off** label of the Switch."
            off="OFF"
        >

        <span
            #wrapper
            class="k-switch-container"
            [id]="focusableId"
            role="switch"
            [attr.aria-checked]="checked"
            [attr.tabindex]="(disabled ? undefined : tabIndex)"
            [kendoEventsOutsideAngular]="{ click: clickHandler, keydown: keyDownHandler, focus: handleFocus, blur: handleBlur }"
        >
            <span class="k-switch-label-on" [attr.aria-hidden]="true" >{{onLabelMessage}}</span>
            <span class="k-switch-label-off" [attr.aria-hidden]="true">{{offLabelMessage}}</span>
            <span class="k-switch-handle"></span>
        </span>
  `
            },] },
];
/** @nocollapse */
SwitchComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: LocalizationService },
    { type: Injector },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
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
