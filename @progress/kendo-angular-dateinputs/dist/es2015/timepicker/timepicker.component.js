/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, EventEmitter, HostBinding, Input, Output, NgZone, TemplateRef, ViewChild, ViewContainerRef, Inject, Optional, Renderer2, forwardRef, isDevMode, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { cloneDate, isEqual } from '@progress/kendo-date-math';
import { hasObservers, KendoInput, guid, Keys } from '@progress/kendo-angular-common';
import { MIDNIGHT_DATE, MIN_TIME, MAX_TIME } from '../defaults';
import { IntlService } from '@progress/kendo-angular-intl';
import { PickerService } from '../common/picker.service';
import { requiresZoneOnBlur, currentFocusTarget } from '../common/utils';
import { TIME_PART } from './models/time-part.default';
import { PreventableEvent } from '../preventable-event';
import { noop, setTime, isWindowAvailable } from '../util';
import { timeRangeValidator } from '../validators/time-range.validator';
import { TOUCH_ENABLED } from '../touch-enabled';
import { fromEvent } from 'rxjs';
import { incompleteDateValidator } from '../validators/incomplete-date.validator';
const VALUE_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/timepicker/#toc-integration-with-json';
const INTL_DATE_FORMAT = 'https://github.com/telerik/kendo-intl/blob/master/docs/date-formatting/index.md';
const formatRegExp = new RegExp(`${TIME_PART.hour}|${TIME_PART.minute}|${TIME_PART.second}|${TIME_PART.dayperiod}|literal`);
/**
 * Represents the [Kendo UI TimePicker component for Angular]({% slug overview_timepicker %}#toc-basic-usage).
 */
export class TimePickerComponent {
    constructor(zone, localization, cdr, popupService, element, renderer, injector, pickerService, intl, touchEnabled) {
        this.zone = zone;
        this.localization = localization;
        this.cdr = cdr;
        this.popupService = popupService;
        this.element = element;
        this.renderer = renderer;
        this.injector = injector;
        this.pickerService = pickerService;
        this.intl = intl;
        this.touchEnabled = touchEnabled;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Sets or gets the `disabled` property of the TimePicker and
         * determines whether the component is active
         * ([see example]({% slug disabled_timepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the TimePicker
         * ([see example]({% slug readonly_timepicker %}#toc-read-only-timepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the TimePicker input field
         * ([see example]({% slug readonly_timepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_timepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Specifies the time format that is used to display the input value
         * ([see example]({% slug formats_timepicker %})).
         */
        this.format = 't';
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
        this.placeholder = null;
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Determines whether to display the **Cancel** button in the popup.
         */
        this.cancelButton = true;
        /**
         * Determines whether to display the **Now** button in the popup.
         *
         * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        this.nowButton = true;
        /**
         * Sets or gets the `tabindex` property of the TimePicker.
         */
        this.tabindex = 0;
        /**
         * Sets the title of the input element of the TimePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when a form is being validated.
         */
        this.rangeValidation = true;
        /**
         * Fires each time the user selects a new value.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.valueChange = new EventEmitter();
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
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
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
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.popupUID = guid();
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.resolvedPromise = Promise.resolve(null);
        this.timeRangeValidateFn = noop;
        this.incompleteValidator = noop;
        this._min = cloneDate(MIN_TIME);
        this._max = cloneDate(MAX_TIME);
        this._popupSettings = { animate: true };
        this._show = false;
        this._steps = {};
        this._value = null;
        this._active = false;
        this.domEvents = [];
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    /**
     * Specifies the smallest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    set min(min) {
        this._min = cloneDate(min || MIN_TIME);
    }
    get min() {
        return this._min;
    }
    /**
     * Specifies the biggest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    set max(max) {
        this._max = cloneDate(max || MAX_TIME);
    }
    get max() {
        return this._max;
    }
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
    set steps(steps) {
        this._steps = steps || {};
    }
    get steps() {
        return this._steps;
    }
    /**
     * Configures the popup of the TimePicker.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, { animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
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
    /**
     * Specifies the value of the TimePicker component.
     */
    set value(value) {
        this.verifyValue(value);
        this._value = cloneDate(value);
    }
    get value() {
        return this._value;
    }
    /**
     * @hidden
     */
    get disabledClass() {
        return this.disabled;
    }
    /**
     * @hidden
     */
    get inputRole() {
        return this.readOnlyInput ? 'listbox' : 'spinbutton';
    }
    get isActive() {
        return this._active;
    }
    set isActive(value) {
        this._active = value;
        if (!this.wrapper) {
            return;
        }
        const element = this.wrapper.nativeElement;
        if (value) {
            this.renderer.addClass(element, 'k-state-focused');
        }
        else {
            this.renderer.removeClass(element, 'k-state-focused');
        }
    }
    get show() {
        return this._show;
    }
    set show(show) {
        if (show && (this.disabled || this.readonly)) {
            return;
        }
        const skipZone = !show && (!this._show || !hasObservers(this.close));
        if (!skipZone) {
            this.zone.run(() => {
                this.togglePopup(show);
            });
        }
        else {
            this.togglePopup(show);
        }
    }
    get input() {
        return this.pickerService.input;
    }
    get timeSelector() {
        return this.pickerService.timeSelector;
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    isEmpty() {
        return !this.value && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.cdr.markForCheck());
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.min || changes.max || changes.rangeValidation || changes.incompleteDateValidation) {
            this.timeRangeValidateFn = this.rangeValidation ? timeRangeValidator(this.min, this.max) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
        if (changes.format) {
            this.verifyFormat();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
        this.pickerSubscriptions.unsubscribe();
    }
    /**
     * @hidden
     */
    handleKeydown(event) {
        const { altKey, keyCode } = event;
        if (keyCode === Keys.Escape) {
            this.show = false;
            return;
        }
        if (altKey) {
            if (keyCode === Keys.ArrowUp) {
                this.show = false;
            }
            if (keyCode === Keys.ArrowDown && !this.show) {
                this.show = true;
            }
        }
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.verifyValue(value);
        this.value = cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.timeRangeValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
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
    focus() {
        this.input.focus();
    }
    /**
     * Blurs the TimePicker component.
     */
    blur() {
        (this.timeSelector || this.input)['blur'](); //tslint:disable-line:no-string-literal
    }
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    toggle(show) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(() => {
            this._toggle((show === undefined) ? !this.show : show);
        });
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.show;
    }
    /**
     * @hidden
     */
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    /**
     * @hidden
     */
    handleChange(value) {
        if (isEqual(this.value, value)) {
            this.focusInput();
            this.show = false;
            return;
        }
        this.value = cloneDate(value);
        this.zone.run(() => {
            this.focusInput();
            this.show = false;
            this.onControlChange(cloneDate(value));
            this.valueChange.emit(cloneDate(value));
        });
    }
    /**
     * @hidden
     */
    handleReject() {
        this.show = false;
    }
    /**
     * @hidden
     */
    handleInputChange(value) {
        const val = this.input.formatSections.date ? value : this.mergeTime(value);
        this.handleChange(val);
    }
    /**
     * @hidden
     */
    handleMousedown(args) {
        args.preventDefault();
    }
    /**
     * @hidden
     */
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicit call handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
    }
    /**
     * @hidden
     */
    get popupClasses() {
        return [
            'k-group',
            'k-reset'
        ].concat(this.popupSettings.popupClass || []);
    }
    /**
     * @hidden
     */
    normalizeTime(date) {
        return setTime(MIDNIGHT_DATE, date);
    }
    /**
     * @hidden
     */
    mergeTime(value) {
        return this.value && value ? setTime(this.value, value) : value;
    }
    togglePopup(show) {
        const event = new PreventableEvent();
        if (!this._show && show) {
            this.open.emit(event);
        }
        else if (this._show && !show) {
            this.close.emit(event);
        }
        if (event.isDefaultPrevented()) {
            return;
        }
        this._toggle(show);
        this.toggleFocus();
    }
    _toggle(show) {
        if (show === this.isOpen) {
            return;
        }
        this._show = show;
        this.cdr.markForCheck();
        if (show) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.wrapper,
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                animate: this.popupSettings.animate,
                appendTo: this.appendTo,
                content: this.popupTemplate,
                popupAlign: { vertical: 'top', horizontal: direction },
                popupClass: this.popupClasses,
                positionMode: 'absolute'
            });
            this.popupRef.popupElement.setAttribute('id', this.popupUID);
            this.popupRef.popupAnchorViewportLeave.subscribe(() => this.show = false);
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    focusInput() {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    }
    toggleFocus() {
        if (!this.isActive) {
            return;
        }
        if (this.show) {
            if (!this.timeSelector) {
                this.cdr.detectChanges();
            }
            if (this.isActive) {
                this.timeSelector.focus();
            }
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    }
    verifyValue(value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK} for possible resolution.`);
        }
    }
    verifyFormat() {
        if (!isDevMode()) {
            return;
        }
        const formatContainsDateParts = this.intl.splitDateFormat(this.format).some(part => !formatRegExp.test(part.type));
        if (formatContainsDateParts) {
            throw new Error(`Provided format is not supported. Supported specifiers are T|t|H|h|m|s|a. See ${INTL_DATE_FORMAT}`);
        }
    }
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    }
    handleWindowBlur() {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    }
    handleFocus() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.zone.run(() => {
                this.onFocus.emit();
            });
        }
    }
    handleBlur(args) {
        const currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.timeSelector && this.timeSelector.containsElement(currentTarget)))) {
            return;
        }
        if (hasObservers(this.onBlur) || (this.show && hasObservers(this.close)) || requiresZoneOnBlur(this.control)) {
            this.zone.run(() => {
                this.blurComponent();
                this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    }
    blurComponent() {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.onControlTouched();
        this.onBlur.emit();
    }
    handleDateCompletenessChange() {
        this.cdr.markForCheck();
        this.zone.run(() => this.onValidatorChange());
    }
}
TimePickerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-timepicker',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimePickerComponent), multi: true },
                    { provide: KendoInput, useExisting: forwardRef(() => TimePickerComponent) },
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.timepicker'
                    },
                    PickerService
                ],
                selector: 'kendo-timepicker',
                template: `
        <ng-container kendoTimePickerLocalizedMessages
            i18n-accept="kendo.timepicker.accept|The Accept button text in the timepicker component"
            accept="Set"

            i18n-acceptLabel="kendo.timepicker.acceptLabel|The label for the Accept button in the timepicker component"
            acceptLabel="Set time"

            i18n-cancel="kendo.timepicker.cancel|The Cancel button text in the timepicker component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.timepicker.cancelLabel|The label for the Cancel button in the timepicker component"
            cancelLabel="Cancel changes"

            i18n-now="kendo.timepicker.now|The Now button text in the timepicker component"
            now="Now"

            i18n-nowLabel="kendo.timepicker.nowLabel|The label for the Now button in the timepicker component"
            nowLabel="Select now"

            i18n-toggle="kendo.timepicker.toggle|The label for the toggle button in the timepicker component"
            toggle="Toggle time list"
        >
        </ng-container>
        <span #wrapper
            class="k-picker-wrap"
            [class.k-state-disabled]="disabled"
        >
            <kendo-dateinput
                #input
                [focusableId]="focusableId"
                [hasPopup]="true"
                [isPopupOpen]="show"
                [disabled]="disabled"
                [readonly]="readonly || readOnlyInput"
                [role]="inputRole"
                [ariaReadOnly]="readonly"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [min]="normalizeTime(min)"
                [max]="normalizeTime(max)"
                [incompleteDateValidation]="incompleteDateValidation"
                [steps]="steps"
                [tabindex]="!show ? tabindex : -1"
                [title]="title"
                [value]="value"
                (valueChange)="handleInputChange($event)"
            ></kendo-dateinput>
            <span class="k-select"
                role="button"
                [attr.title]="localization.get('toggle')"
                [attr.aria-label]="localization.get('toggle')"
                [kendoEventsOutsideAngular]="{
                    click: handleIconClick,
                    mousedown: handleMousedown
                }"
                [scope]="this"
            >
                <span class="k-icon k-i-clock"></span>
            </span>
            <ng-template #popupTemplate>
                <kendo-timeselector
                    #timeSelector
                    [cancelButton]="cancelButton"
                    [nowButton]="nowButton"
                    [format]="format"
                    [min]="min"
                    [max]="max"
                    [steps]="steps"
                    [value]="value"
                    [kendoEventsOutsideAngular]="{
                        keydown: handleKeydown,
                        mousedown: handleMousedown
                    }"
                    [scope]="this"
                    (valueChange)="handleChange($event)"
                    (valueReject)="handleReject()"
                >
                    <kendo-timeselector-messages
                        [acceptLabel]="localization.get('acceptLabel')"
                        [accept]="localization.get('accept')"
                        [cancelLabel]="localization.get('cancelLabel')"
                        [cancel]="localization.get('cancel')"
                        [nowLabel]="localization.get('nowLabel')"
                        [now]="localization.get('now')"
                    >
                    </kendo-timeselector-messages>
                </kendo-timeselector>
            </ng-template>
        </span>
        <ng-container #container></ng-container>
    `
            },] },
];
/** @nocollapse */
TimePickerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PopupService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: PickerService },
    { type: IntlService },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
];
TimePickerComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    focusableId: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    readOnlyInput: [{ type: Input }],
    format: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    incompleteDateValidation: [{ type: Input }],
    cancelButton: [{ type: Input }],
    nowButton: [{ type: Input }],
    steps: [{ type: Input }],
    popupSettings: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    title: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    wrapperClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-timepicker',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
};
