/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef, NgZone, Injector } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Subscription } from "rxjs";
/**
 * Represents the [Kendo UI Switch component for Angular]({% slug overview_switch %}).
 */
export declare class SwitchComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private renderer;
    private hostElement;
    private localizationService;
    private injector;
    private changeDetector;
    private ngZone;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Changes the **On** label so that it can be localized ([see example]({% slug labels_switch %})).
     */
    onLabel: string;
    /**
     * Changes the **Off** label so that it can be localized ([see example]({% slug labels_switch %})).
     */
    offLabel: string;
    /**
     * Sets the current value of the Switch when it is initially displayed.
     */
    checked: boolean;
    /**
     * Determines whether the Switch is disabled ([see example]({% slug disabled_switch %})).
     */
    disabled: boolean;
    /**
     * Determines whether the Switch is in its read-only state ([see example]({% slug readonly_switch %})).
     */
    readonly: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the Switch.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Fires each time the user focuses the `input` element.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the `input` element gets blurred.
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the user selects a new value.
     */
    valueChange: EventEmitter<any>;
    wrapper: any;
    direction: string;
    readonly ieClass: boolean;
    readonly ariaDisabled: boolean;
    readonly ariaReadonly: boolean;
    readonly hostClasses: boolean;
    readonly switchOnClass: boolean;
    readonly switchOffClass: boolean;
    readonly disabledClass: boolean;
    protected localizationChangeSubscription: Subscription;
    protected isFocused: boolean;
    protected control: NgControl;
    constructor(renderer: Renderer2, hostElement: ElementRef, localizationService: LocalizationService, injector: Injector, changeDetector: ChangeDetectorRef, ngZone: NgZone);
    /**
     * @hidden
     */
    readonly onLabelMessage: string;
    /**
     * @hidden
     */
    readonly offLabelMessage: string;
    protected ngChange: Function;
    protected ngTouched: Function;
    protected readonly isEnabled: boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
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
    focus(): void;
    /**
     * Blurs the Switch.
     */
    blur(): void;
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    handleFocus: () => void;
    /**
     * @hidden
     */
    handleBlur: () => void;
    /**
     * @hidden
     */
    writeValue(value: boolean): void;
    /**
     * @hidden
     */
    registerOnChange(fn: () => any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: () => any): void;
    /**
     * @hidden
     */
    keyDownHandler(e: any): void;
    /**
     * @hidden
     */
    clickHandler(): void;
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    private changeValue;
    private focused;
}
