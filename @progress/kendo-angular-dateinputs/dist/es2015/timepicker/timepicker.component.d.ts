/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, TemplateRef, ViewContainerRef, OnInit, OnChanges, OnDestroy, Renderer2, Injector } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { DateInputFormatPlaceholder } from '../dateinput/models/format-placeholder.model';
import { IntlService } from '@progress/kendo-angular-intl';
import { PickerService } from '../common/picker.service';
import { TimePickerIncrementalSteps } from './models/incremental-steps.model';
import { TimeSelectorComponent } from './timeselector.component';
import { DateInputComponent } from '../dateinput/dateinput.component';
import { PopupSettings } from '../popup-settings.model';
import { PreventableEvent } from '../preventable-event';
/**
 * Represents the [Kendo UI TimePicker component for Angular]({% slug overview_timepicker %}#toc-basic-usage).
 */
export declare class TimePickerComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy, Validator {
    zone: NgZone;
    localization: LocalizationService;
    private cdr;
    private popupService;
    private element;
    private renderer;
    private injector;
    private pickerService;
    private intl;
    private touchEnabled;
    container: ViewContainerRef;
    popupTemplate: TemplateRef<any>;
    wrapper: ElementRef;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Sets or gets the `disabled` property of the TimePicker and
     * determines whether the component is active
     * ([see example]({% slug disabled_timepicker %})).
     */
    disabled: boolean;
    /**
     * Sets the read-only state of the TimePicker
     * ([see example]({% slug readonly_timepicker %}#toc-read-only-timepicker)).
     */
    readonly: boolean;
    /**
     * Sets the read-only state of the TimePicker input field
     * ([see example]({% slug readonly_timepicker %}#toc-read-only-input)).
     *
     * > Note that if you set the [`readonly`]({% slug api_dateinputs_timepickercomponent %}#toc-readonly) property value to `true`,
     * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
     */
    readOnlyInput: boolean;
    /**
     * Specifies the time format that is used to display the input value
     * ([see example]({% slug formats_timepicker %})).
     */
    format: string;
    /**
     * Defines the descriptions of the format sections in the input field.
     * For more information, refer to the article on
     * [placeholders]({% slug placeholders_timepicker %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     * <div class="row example-wrapper" style="min-height: 450px;">
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Full-length format description:</p>
     *    <kendo-timepicker formatPlaceholder="wide"></kendo-timepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Narrow-length format description:</p>
     *    <kendo-timepicker formatPlaceholder="narrow"></kendo-timepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Short-length format description:</p>
     *    <kendo-timepicker formatPlaceholder="short"></kendo-timepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Display defined format:</p>
     *    <kendo-timepicker format="HH:mm:ss" formatPlaceholder="formatPattern"></kendo-timepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Custom defined format descriptions</p>
     *    <kendo-timepicker format="HH:mm:ss"
     *      [formatPlaceholder]="{ hour: 'H', minute: 'm', second: 's' }"
     *    ></kendo-timepicker>
     *  </div>
     * </div>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    formatPlaceholder: DateInputFormatPlaceholder;
    /**
     * Specifies the hint the TimePicker displays when its value is `null`.
     * For more information, refer to the article on
     * [placeholders]({% slug placeholders_timepicker %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timepicker placeholder="Enter start..."></kendo-timepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    placeholder: string;
    /**
     * Specifies the smallest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    min: Date;
    /**
     * Specifies the biggest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    max: Date;
    /**
     * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
     */
    incompleteDateValidation: boolean;
    /**
     * Determines whether to display the **Cancel** button in the popup.
     */
    cancelButton: boolean;
    /**
     * Determines whether to display the **Now** button in the popup.
     *
     * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
     */
    nowButton: boolean;
    /**
     * Configures the incremental steps of the TimePicker.
     * For more information, refer to the article on
     * [incremental steps]({% slug incrementalsteps_timepicker %}).
     *
     * > If the incremental step is greater than `1`, the **Now** button will be hidden.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timepicker format="HH:mm:ss" [steps]="steps"></kendo-timepicker>
     * `
     * })
     * export class AppComponent {
     *   public steps = { hour: 2, minute: 15, second: 15 };
     * }
     * ```
     *
     */
    steps: TimePickerIncrementalSteps;
    /**
     * Configures the popup of the TimePicker.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets or gets the `tabindex` property of the TimePicker.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Sets the title of the input element of the TimePicker.
     */
    title: string;
    /**
     * Determines whether the built-in min or max validators are enforced when a form is being validated.
     */
    rangeValidation: boolean;
    /**
     * Specifies the value of the TimePicker component.
     */
    value: Date;
    /**
     * Fires each time the user selects a new value.
     * For more information, refer to the section on
     * [events]({% slug overview_timepicker %}#toc-events).
     */
    valueChange: EventEmitter<Date>;
    /**
     * Fires each time the user focuses the input element.
     * For more information, refer to the section on
     * [events]({% slug overview_timepicker %}#toc-events).
     *
     * > To wire the event programmatically, use the `onFocus` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timepicker (focus)="handleFocus()"></kendo-timepicker>
     * `
     * })
     * export class AppComponent {
     *   public handleFocus(): void {
     *      console.log("Component is focused");
     *   }
     * }
     * ```
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the input element gets blurred.
     * For more information, refer to the section on
     * [events]({% slug overview_timepicker %}#toc-events).
     *
     * > To wire the event programmatically, use the `onBlur` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timepicker (blur)="handleBlur()"></kendo-timepicker>
     * `
     * })
     * export class AppComponent {
     *   public handleBlur(): void {
     *      console.log("Component is blurred");
     *   }
     * }
     * ```
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel the event, the popup will remain closed.
     * For more information, refer to the section on
     * [events]({% slug overview_timepicker %}#toc-events).
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel the event, the popup will remain open.
     * For more information, refer to the section on
     * [events]({% slug overview_timepicker %}#toc-events).
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * @hidden
     */
    wrapperClasses: boolean;
    /**
     * @hidden
     */
    readonly disabledClass: boolean;
    popupUID: string;
    popupRef: PopupRef;
    /**
     * @hidden
     */
    readonly inputRole: string;
    isActive: boolean;
    show: boolean;
    readonly input: DateInputComponent;
    readonly timeSelector: TimeSelectorComponent;
    private onControlChange;
    private onControlTouched;
    private onValidatorChange;
    private resolvedPromise;
    private timeRangeValidateFn;
    private incompleteValidator;
    private _min;
    private _max;
    private _popupSettings;
    private _show;
    private _steps;
    private _value;
    private _active;
    private localizationChangeSubscription;
    private pickerSubscriptions;
    private windowBlurSubscription;
    private control;
    private domEvents;
    constructor(zone: NgZone, localization: LocalizationService, cdr: ChangeDetectorRef, popupService: PopupService, element: ElementRef, renderer: Renderer2, injector: Injector, pickerService: PickerService, intl: IntlService, touchEnabled: boolean);
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    isEmpty(): boolean;
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    handleKeydown(event: any): void;
    /**
     * @hidden
     */
    writeValue(value: Date): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    registerOnValidatorChange(fn: Function): void;
    /**
     * Focuses the TimePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timepicker.focus()">Focus time picker</button>
     *  <kendo-timepicker #timepicker></kendo-timepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus(): void;
    /**
     * Blurs the TimePicker component.
     */
    blur(): void;
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    toggle(show?: boolean): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    /**
     * @hidden
     */
    readonly appendTo: ViewContainerRef;
    /**
     * @hidden
     */
    handleChange(value: Date): void;
    /**
     * @hidden
     */
    handleReject(): void;
    /**
     * @hidden
     */
    handleInputChange(value: Date): void;
    /**
     * @hidden
     */
    handleMousedown(args: any): void;
    /**
     * @hidden
     */
    handleIconClick(event: MouseEvent): void;
    /**
     * @hidden
     */
    readonly popupClasses: string[];
    /**
     * @hidden
     */
    normalizeTime(date: Date): Date;
    /**
     * @hidden
     */
    mergeTime(value: Date): Date;
    private togglePopup;
    private _toggle;
    private focusInput;
    private toggleFocus;
    private verifyValue;
    private verifyFormat;
    private bindEvents;
    private handleWindowBlur;
    private handleFocus;
    private handleBlur;
    private blurComponent;
    private handleDateCompletenessChange;
}
