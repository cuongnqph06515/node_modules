/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, TemplateRef, EventEmitter, HostBinding, Renderer2, Input, Output, ContentChild, ViewChild, ViewContainerRef, NgZone, Inject, Optional, forwardRef, isDevMode, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { cloneDate } from '@progress/kendo-date-math';
import { hasObservers, KendoInput, guid, Keys } from '@progress/kendo-angular-common';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { PreventableEvent } from '../preventable-event';
import { CalendarViewEnum } from '../calendar/models/view.enum';
import { CellTemplateDirective } from '../calendar/templates/cell-template.directive';
import { MonthCellTemplateDirective } from '../calendar/templates/month-cell-template.directive';
import { YearCellTemplateDirective } from '../calendar/templates/year-cell-template.directive';
import { DecadeCellTemplateDirective } from '../calendar/templates/decade-cell-template.directive';
import { CenturyCellTemplateDirective } from '../calendar/templates/century-cell-template.directive';
import { WeekNumberCellTemplateDirective } from '../calendar/templates/weeknumber-cell-template.directive';
import { HeaderTitleTemplateDirective } from '../calendar/templates/header-title-template.directive';
import { NavigationItemTemplateDirective } from '../calendar/templates/navigation-item-template.directive';
import { PickerService } from '../common/picker.service';
import { DisabledDatesService } from '../calendar/services/disabled-dates.service';
import { noop, isValidRange, setTime, isWindowAvailable } from '../util';
import { TOUCH_ENABLED } from '../touch-enabled';
import { requiresZoneOnBlur, currentFocusTarget } from '../common/utils';
import { fromEvent } from 'rxjs';
import { incompleteDateValidator } from '../validators/incomplete-date.validator';
import { disabledDatesValidator } from '../validators/disabled-date.validator';
const MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-min';
const MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-max';
const VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/datepicker/#toc-using-with-json';
/**
 * Represents the [Kendo UI DatePicker component for Angular]({% slug overview_datepicker %}#toc-basic-usage).
 */
export class DatePickerComponent {
    constructor(zone, localization, cdr, popupService, element, renderer, injector, pickerService, disabledDatesService, touchEnabled) {
        this.zone = zone;
        this.localization = localization;
        this.cdr = cdr;
        this.popupService = popupService;
        this.element = element;
        this.renderer = renderer;
        this.injector = injector;
        this.pickerService = pickerService;
        this.disabledDatesService = disabledDatesService;
        this.touchEnabled = touchEnabled;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_datepicker %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost Calendar view to which the user can navigate
         * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost Calendar view to which the user can navigate
         * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
        /**
         * Sets or gets the `disabled` property of the DatePicker and determines whether the component is active
         * ([see example]({% slug disabled_datepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the DatePicker
         * ([see example]({% slug readonly_datepicker %}#toc-read-only-datepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the DatePicker input field
         * ([see example]({% slug readonly_datepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_datepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Sets or gets the `navigation` property of the Calendar
         * and determines whether the navigation side-bar is displayed.
         * ([see example]({% slug sidebar_datepicker %})).
         */
        this.navigation = true;
        /**
         * Specifies the smallest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         */
        this.min = cloneDate(MIN_DATE);
        /**
         * Specifies the biggest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         */
        this.max = cloneDate(MAX_DATE);
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Specifies the focused date of the Calendar component
         * ([see example]({% slug dates_datepicker %})).
         */
        this.focusedDate = null;
        /**
         * Specifies the date format that is used to display the input value
         * ([see example]({% slug formats_datepicker %})).
         */
        this.format = "d";
        /**
         * Specifies the hint the DatePicker displays when its value is `null`.
         * ([more information and exaples]({% slug placeholders_datepicker %})).
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker placeholder="Enter birth date..."></kendo-datepicker>
         * `
         * })
         * export class AppComponent { }
         * ```
         */
        this.placeholder = null;
        /**
         * Sets or gets the `tabindex` property of the DatePicker.
         */
        this.tabindex = 0;
        /**
         * Sets the title of the input element of the DatePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = true;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_datepicker %}#toc-validation)).
         */
        this.disabledDatesValidation = true;
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar
         * ([see example]({% slug weeknumcolumn_datepicker %})).
         */
        this.weekNumber = false;
        /**
         * Fires each time the user selects a new value
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the input element
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (focus)="handleFocus()"></kendo-datepicker>
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
         * Fires each time the input element gets blurred
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (blur)="handleBlur()"></kendo-datepicker>
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
         * This event is preventable. If you cancel the event, the popup will remain closed
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.popupUID = guid();
        this._popupSettings = { animate: true };
        this._show = false;
        this._value = null;
        this._active = false;
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesValidateFn = noop;
        this.incompleteValidator = noop;
        this.resolvedPromise = Promise.resolve(null);
        this.domEvents = [];
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleSameSelection.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    /**
     * @hidden
     */
    set cellTemplateRef(template) {
        this.cellTemplate = template;
    }
    /**
     * @hidden
     */
    set monthCellTemplateRef(template) {
        this.monthCellTemplate = template;
    }
    /**
     * @hidden
     */
    set yearCellTemplateRef(template) {
        this.yearCellTemplate = template;
    }
    /**
     * @hidden
     */
    set decadeCellTemplateRef(template) {
        this.decadeCellTemplate = template;
    }
    /**
     * @hidden
     */
    set centuryCellTemplateRef(template) {
        this.centuryCellTemplate = template;
    }
    /**
     * @hidden
     */
    set weekNumberTemplateRef(template) {
        this.weekNumberTemplate = template;
    }
    /**
     * @hidden
     */
    set headerTitleTemplateRef(template) {
        this.headerTitleTemplate = template;
    }
    /**
     * @hidden
     */
    set navigationItemTemplateRef(template) {
        this.navigationItemTemplate = template;
    }
    /**
     * Configures the popup options of the DatePicker.
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
     * Specifies the value of the DatePicker component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
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
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Sets the dates of the DatePicker that will be disabled
     * ([see example]({% slug disabled_dates_datepicker %})).
     */
    set disabledDates(value) {
        this._disabledDates = value;
        this.disabledDatesService.initialize(value);
    }
    get disabledDates() {
        return this._disabledDates;
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
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return !this.value && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(() => this.cdr.markForCheck());
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
        this.verifySettings();
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabledDatesValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
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
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.show;
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
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * Focuses the DatePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="datepicker.focus()">Focus date picker</button>
     *  <kendo-datepicker #datepicker></kendo-datepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        this.input.focus();
    }
    /**
     * Blurs the DatePicker component.
     */
    blur() {
        (this.calendar || this.input)['blur'](); //tslint:disable-line:no-string-literal
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
     * @hidden
     */
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicitly call the handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
        this.cdr.markForCheck();
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
    handleChange(value) {
        this.cdr.markForCheck();
        this.focusInput();
        this.value = value;
        this.show = false;
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    }
    /**
     * @hidden
     */
    handleInputChange(value) {
        this.handleChange(this.input.formatSections.time ? value : this.mergeTime(value));
    }
    /**
     * @hidden
     */
    get popupClasses() {
        return [
            'k-calendar-container',
            'k-group',
            'k-reset'
        ].concat(this.popupSettings.popupClass || []);
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
    get input() {
        return this.pickerService.input;
    }
    get calendar() {
        return this.pickerService.calendar;
    }
    /**
     * @hidden
     */
    mergeTime(value) {
        return this.value && value ? setTime(value, this.value) : value;
    }
    /**
     * @hidden
     */
    handleKeydown(e) {
        const { altKey, keyCode } = e;
        if (keyCode === Keys.Escape) {
            this.show = false;
        }
        if (altKey) {
            if (keyCode === Keys.ArrowDown && !this.show) {
                this.show = true;
            }
            if (keyCode === Keys.ArrowUp) {
                this.show = false;
            }
        }
        if (keyCode === Keys.Tab && this.show && this.calendar.isActive) {
            this.input.focus();
            this.show = false;
        }
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
        if (show === this._show) {
            return;
        }
        this._show = show;
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
            this.subscription = this.popupRef.popupAnchorViewportLeave.subscribe(() => this.show = false);
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
            this.subscription.unsubscribe();
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
            if (!this.calendar) {
                this.cdr.detectChanges();
            }
            if (this.calendar) {
                this.calendar.focus();
            }
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    }
    verifySettings() {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK} and ${MAX_DOC_LINK}.`);
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
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
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
    handleWindowBlur() {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    }
    handleBlur(args) {
        const currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.calendar && this.calendar.containsElement(currentTarget)))) {
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
        this.cdr.detectChanges();
        this.onControlTouched();
        this.onBlur.emit();
    }
    handleSameSelection() {
        if (this.show) {
            this.focusInput();
            this.show = false;
        }
    }
    handleDateCompletenessChange() {
        this.cdr.markForCheck();
        this.zone.run(() => this.onValidatorChange());
    }
}
DatePickerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-datepicker',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerComponent), multi: true },
                    { provide: KendoInput, useExisting: forwardRef(() => DatePickerComponent) },
                    LocalizationService,
                    PickerService,
                    DisabledDatesService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.datepicker'
                    }
                ],
                selector: 'kendo-datepicker',
                template: `
        <ng-container kendoDatePickerLocalizedMessages
            i18n-today="kendo.datepicker.today|The label for the today button in the calendar header"
            today="TODAY"

            i18n-toggle="kendo.datepicker.toggle|The label for the toggle button in the datepicker component"
            toggle="Toggle calendar"
        >
        </ng-container>
        <span #wrapper
            class="k-picker-wrap"
            [class.k-state-disabled]="disabled"
        >
            <kendo-dateinput
                #input
                [role]="inputRole"
                [focusableId]="focusableId"
                [hasPopup]="true"
                [isPopupOpen]="show"
                [disabled]="disabled"
                [readonly]="readonly || readOnlyInput"
                [ariaReadOnly]="readonly"
                [tabindex]="tabindex"
                [title]="title"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [min]="min"
                [max]="max"
                [incompleteDateValidation]="incompleteDateValidation"
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
                <span class="k-icon k-i-calendar"></span>
            </span>
        </span>
        <ng-container #container></ng-container>
        <ng-template #popupTemplate>
            <kendo-calendar
                #calendar
                [min]="min"
                [max]="max"
                [navigation]="navigation"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
                [cellTemplate]="cellTemplate"
                [monthCellTemplate]="monthCellTemplate"
                [yearCellTemplate]="yearCellTemplate"
                [decadeCellTemplate]="decadeCellTemplate"
                [centuryCellTemplate]="centuryCellTemplate"
                [weekNumberTemplate]="weekNumberTemplate"
                [headerTitleTemplate]="headerTitleTemplate"
                [navigationItemTemplate]="navigationItemTemplate"
                [focusedDate]="focusedDate"
                [value]="value"
                (valueChange)="handleChange(mergeTime($event))"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeydown
                }"
                [scope]="this"
                [disabledDates]="disabledDates"
            >
                <kendo-calendar-messages [today]="localization.get('today')">
                </kendo-calendar-messages>
            </kendo-calendar>
        <ng-template>
    `
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PopupService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: PickerService },
    { type: DisabledDatesService },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
];
DatePickerComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective,] }],
    cellTemplateRef: [{ type: Input, args: ['cellTemplate',] }],
    monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective,] }],
    monthCellTemplateRef: [{ type: Input, args: ['monthCellTemplate',] }],
    yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective,] }],
    yearCellTemplateRef: [{ type: Input, args: ['yearCellTemplate',] }],
    decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective,] }],
    decadeCellTemplateRef: [{ type: Input, args: ['decadeCellTemplate',] }],
    centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective,] }],
    centuryCellTemplateRef: [{ type: Input, args: ['centuryCellTemplate',] }],
    weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective,] }],
    weekNumberTemplateRef: [{ type: Input, args: ['weekNumberTemplate',] }],
    headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective,] }],
    headerTitleTemplateRef: [{ type: Input, args: ['headerTitleTemplate',] }],
    navigationItemTemplate: [{ type: ContentChild, args: [NavigationItemTemplateDirective,] }],
    navigationItemTemplateRef: [{ type: Input, args: ['navigationItemTemplate',] }],
    focusableId: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    readOnlyInput: [{ type: Input }],
    popupSettings: [{ type: Input }],
    navigation: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    incompleteDateValidation: [{ type: Input }],
    focusedDate: [{ type: Input }],
    value: [{ type: Input }],
    format: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    disabledDates: [{ type: Input }],
    title: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    disabledDatesValidation: [{ type: Input }],
    weekNumber: [{ type: Input }],
    valueChange: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    wrapperClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-datepicker',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
};
