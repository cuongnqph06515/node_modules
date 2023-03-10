/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ViewChild, ElementRef, Input, isDevMode, TemplateRef, ChangeDetectorRef, Output, EventEmitter, NgZone, ViewContainerRef, forwardRef, ContentChild, Inject, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cloneDate, isEqual, getDate } from '@progress/kendo-date-math';
import { PopupService } from '@progress/kendo-angular-popup';
import { IntlService } from '@progress/kendo-angular-intl';
import { hasObservers, KendoInput, Keys, guid } from '@progress/kendo-angular-common';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PickerService } from '../common/picker.service';
import { DisabledDatesService } from '../calendar/services/disabled-dates.service';
import { isPresent } from '../common/utils';
import { mergeDateAndTime, noop, lastMillisecondOfDate, isInRange, isValidRange, isWindowAvailable } from '../util';
import { PreventableEvent } from '../preventable-event';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { disabledDatesValidator } from '../validators/disabled-date.validator';
import { TIME_PART } from '../timepicker/models/time-part.default';
import { MIN_DATE, MAX_DATE, MIN_TIME, MAX_TIME } from '../defaults';
import { TOUCH_ENABLED } from '../touch-enabled';
import { CellTemplateDirective } from '../calendar/templates/cell-template.directive';
import { MonthCellTemplateDirective } from '../calendar/templates/month-cell-template.directive';
import { YearCellTemplateDirective } from '../calendar/templates/year-cell-template.directive';
import { DecadeCellTemplateDirective } from '../calendar/templates/decade-cell-template.directive';
import { CenturyCellTemplateDirective } from '../calendar/templates/century-cell-template.directive';
import { WeekNumberCellTemplateDirective } from '../calendar/templates/weeknumber-cell-template.directive';
import { HeaderTitleTemplateDirective } from '../calendar/templates/header-title-template.directive';
import { incompleteDateValidator } from '../validators/incomplete-date.validator';
var timeFormatRegExp = new RegExp(TIME_PART.hour + "|" + TIME_PART.minute + "|" + TIME_PART.second + "|" + TIME_PART.dayperiod + "|literal");
var VALUE_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/datetimepicker/integration-with-json/';
var MIN_MAX_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/datetimepicker/date-time-limits/';
var DEFAULT_ACTIVE_TAB = 'date';
var DEFAULT_DATEINPUT_FORMAT = 'g';
var DEFAULT_TIMESELECTOR_FORMAT = 't';
/**
 * Represents the [Kendo UI DateTimePicker component for Angular]({% slug overview_datetimepicker %}).
 */
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(popupService, intl, cdr, pickerService, ngZone, host, touchEnabled, localization, disabledDatesService, renderer) {
        this.popupService = popupService;
        this.intl = intl;
        this.cdr = cdr;
        this.pickerService = pickerService;
        this.ngZone = ngZone;
        this.host = host;
        this.touchEnabled = touchEnabled;
        this.localization = localization;
        this.disabledDatesService = disabledDatesService;
        this.renderer = renderer;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Sets the title of the input element of the DateTimePicker.
         */
        this.title = '';
        /**
         * Sets or gets the `disabled` property of the DateTimePicker and determines whether the component is active
         * ([see example]({% slug disabled_datetimepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the DateTimePicker
         * ([see example]({% slug readonly_datetimepicker %}#toc-read-only-datetimepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the DateTimePicker input field
         * ([see example]({% slug readonly_datetimepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_datetimepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Determines whether to display the **Cancel** button in the popup
         * ([see example]({% slug datetimepicker_popup_options %}#toc-toggling-the-cancel-button)).
         */
        this.cancelButton = true;
        /**
         * Determines whether to display a week number column in the `month` view of the popup Calendar
         * ([see example]({% slug datetimepicker_calendar_options %}#toc-week-number-column)).
         */
        this.weekNumber = false;
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form
         * ([see example]({% slug dateranges_datetimepicker %}#toc-prevent-invalid-input)).
         */
        this.rangeValidation = true;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_datetimepicker %}#toc-validation)).
         */
        this.disabledDatesValidation = true;
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Fires each time the user selects a new value.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event by setting `event.preventDefault()`, the popup will remain closed.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event by setting `event.preventDefault()`, the popup will remain open.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the user focuses the component.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the user blurs the component.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         *
         * Controls whether the Calendar or the TimeSelector will be displayed.
         */
        this.activeTab = DEFAULT_ACTIVE_TAB;
        /**
         * @hidden
         *
         * Specifies the stripped time-related format that is used in the TimeSelector.
         * Updates each time the `format` property value changes.
         */
        this.timeSelectorFormat = DEFAULT_TIMESELECTOR_FORMAT;
        /**
         * @hidden
         */
        this.timeSelectorMin = cloneDate(MIN_TIME);
        /**
         * @hidden
         */
        this.timeSelectorMax = cloneDate(MAX_TIME);
        /**
         * @hidden
         */
        this.calendarValue = null;
        /**
         * @hidden
         */
        this.calendarMin = cloneDate(MIN_DATE);
        /**
         * @hidden
         */
        this.calendarMax = lastMillisecondOfDate(MAX_DATE);
        this._popupSettings = { animate: true };
        this._value = null;
        this._format = DEFAULT_DATEINPUT_FORMAT;
        this._tabindex = 0;
        this._defaultTab = DEFAULT_ACTIVE_TAB;
        this._min = mergeDateAndTime(MIN_DATE, MIN_TIME);
        this._max = mergeDateAndTime(MAX_DATE, MAX_TIME);
        this._isActive = false;
        this.onControlTouched = noop;
        this.onControlChange = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesValidateFn = noop;
        this.incompleteValidator = noop;
        this.subscriptions = new Subscription();
    }
    Object.defineProperty(DateTimePickerComponent.prototype, "input", {
        /**
         * @hidden
         */
        get: function () {
            return this.pickerService.input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "calendar", {
        /**
         * @hidden
         */
        get: function () {
            return this.pickerService.calendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timeSelector", {
        /**
         * @hidden
         */
        get: function () {
            return this.pickerService.timeSelector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the DateTimePicker component.
         *
         * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        set: function (value) {
            this.verifyValue(value);
            this._value = cloneDate(value);
            this.setCalendarValue(value);
            this.cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "format", {
        get: function () {
            return this._format;
        },
        /**
         * Specifies the date format for displaying the input value
         * ([see example]({% slug formats_datetimepicker %})).
         */
        set: function (value) {
            this._format = value;
            this.timeSelectorFormat = this.getTimeSelectorFormat(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "tabindex", {
        get: function () {
            return this.disabled ? -1 : this._tabindex;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the DateTimePicker.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "disabledDates", {
        get: function () {
            return this._disabledDates;
        },
        /**
         * Sets the dates of the DateTimePicker that will be disabled
         * ([see example]({% slug disabled_dates_datetimepicker %})).
         */
        set: function (value) {
            this._disabledDates = value;
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup settings of the DateTimePicker
         * ([see example]({% slug datetimepicker_popup_options %}#toc-customizing-the-popup)).
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({}, { animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Specifies the smallest valid date.
         * The Calendar will not display dates before this value.
         * If the `min` value of the Calendar is selected, the TimePicker will not display
         * time entries before the specified time portion of this value
         * ([see example]({% slug dateranges_datetimepicker %})).
         */
        set: function (value) {
            if (!isPresent(value)) {
                return;
            }
            this._min = cloneDate(value);
            this.calendarMin = getDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Specifies the biggest valid date.
         * The Calendar will not display dates after this value.
         * If the `max` value of the Calendar is selected, the TimePicker will not display
         * time entries after the specified time portion of this value
         * ([see example]({% slug dateranges_datetimepicker %})).
         */
        set: function (value) {
            if (!isPresent(value)) {
                return;
            }
            this._max = cloneDate(value);
            this.calendarMax = lastMillisecondOfDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "isOpen", {
        /**
         * Indicates whether the component is currently open.
         */
        get: function () {
            return isPresent(this.popupRef);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "isActive", {
        /**
         * Indicates whether the component or its popup content is focused.
         */
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            if (value) {
                this.renderer.addClass(this.wrapper.nativeElement, 'k-state-focused');
            }
            else {
                this.renderer.removeClass(this.wrapper.nativeElement, 'k-state-focused');
            }
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "defaultTab", {
        get: function () {
            return this._defaultTab;
        },
        /**
         * Sets the active tab on opening the popup
         * ([see example]({% slug datetimepicker_popup_options %}#toc-setting-the-default-tab)).
         */
        set: function (tab) {
            this._defaultTab = tab || DEFAULT_ACTIVE_TAB;
            this.activeTab = this.defaultTab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "tabSwitchTransition", {
        /**
         * @hidden
         */
        get: function () {
            /*
             When the popup is opening, disables the set transition in the themes. When `defaultTab` is set to `time`,
             the popup opens with an active **Time** tab and the animation of the initial transition is undesired.
             Setting the inline transition style to `none` overrides the set animation in the themes.
             Setting the inline transition style to `null` does not apply any inline styles or override the themes CSS.
            */
            return this.isOpen ? null : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "disableCalendar", {
        /**
         * @hidden
         *
         * Indicates whether the Calendar will be disabled.
         * The inactive tab component gets disabled and becomes inaccessible on tab click.
         */
        get: function () {
            return this.activeTab !== 'date' && !this.calendar.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "inputRole", {
        /**
         * @hidden
         */
        get: function () {
            return this.readOnlyInput ? 'listbox' : 'spinbutton';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "disableTimeSelector", {
        /**
         * @hidden
         *
         * Indicates whether the TimeSelector will be disabled.
         * The inactive tab component gets disabled and becomes inaccessible on tab click.
         */
        get: function () {
            return this.activeTab !== 'time' && !this.timeSelector.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "activeTabComponent", {
        get: function () {
            if (!this.isOpen) {
                return;
            }
            if (!(isPresent(this.calendar) || isPresent(this.timeSelector))) {
                this.cdr.detectChanges();
            }
            return this.activeTab === 'date' ? this.calendar : this.timeSelector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!isPresent(appendTo) || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.pickerService.onFocus
            // detect popup changes to disable the inactive view mark-up when the popup is open
            .pipe(tap(this.detectPopupChanges.bind(this)))
            .subscribe(this.handleFocus.bind(this)));
        this.subscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.subscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleCalendarValueChange.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(function () { return _this.cdr.markForCheck(); }));
        this.subscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
        if (isWindowAvailable()) {
            this.subscriptions.add(this.ngZone.runOutsideAngular(function () { return fromEvent(window, 'blur').subscribe(_this.handleCancel.bind(_this)); }));
        }
    };
    DateTimePickerComponent.prototype.ngOnChanges = function (changes) {
        if (isPresent(changes.min) || isPresent(changes.max)) {
            this.verifyMinMaxRange();
        }
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabledDatesValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
    };
    DateTimePickerComponent.prototype.ngOnDestroy = function () {
        if (this.isOpen) {
            this.closePopup();
        }
        this.subscriptions.unsubscribe();
    };
    /**
     * * If the popup is closed, focuses the DateTimePicker input.
     * * If the popup is open, the focus is moved to its content.
     */
    DateTimePickerComponent.prototype.focus = function () {
        if (this.disabled) {
            return;
        }
        if (this.isOpen) {
            this.activeTabComponent.focus();
        }
        else {
            this.input.focus();
        }
    };
    /**
     * Blurs the DateTimePicker.
     */
    DateTimePickerComponent.prototype.blur = function () {
        if (this.isOpen && this.activeTabComponent.isActive) {
            this.activeTabComponent.blur();
        }
        else {
            this.input.blur();
        }
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
     *
     * @param show - The state of the popup.
     */
    DateTimePickerComponent.prototype.toggle = function (show) {
        if (this.disabled || this.readonly || show === this.isOpen) {
            return;
        }
        var shouldOpen = isPresent(show) ? show : !this.isOpen;
        if (shouldOpen) {
            this.openPopup();
        }
        else {
            this.closePopup();
            // Changes the tab and the calendar or clock icon to the designated default.
            if (this.activeTab !== this.defaultTab) {
                this.activeTab = this.defaultTab;
                this.cdr.detectChanges();
            }
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     *
     * Used by the TextBoxContainer to determine if the floating label will render in the input.
     */
    DateTimePickerComponent.prototype.isEmpty = function () {
        return !isPresent(this.value) && this.input.isEmpty();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleIconClick = function (event) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        // prevents the event default to evade focusing the DateInput input when placed inside a label (FF/IE/Edge)
        event.preventDefault();
        var runInZone = !this.isOpen || hasObservers(this.close);
        this.run(runInZone, function () {
            var shouldOpen = !_this.isOpen;
            // handle focus first to maintain correct event order `focus` => `open`
            _this.handleFocus();
            _this.togglePopup(shouldOpen);
            _this.switchFocus();
        });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleFocus = function () {
        var _this = this;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.ngZone.run(function () { return _this.onFocus.emit(); });
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleBlur = function (event) {
        var _this = this;
        if (!this.isActive || this.focusTargetInComponent(event)) {
            return;
        }
        this.isActive = false;
        var isNgControlUntouched = this.host.nativeElement.classList.contains('ng-untouched');
        var runInZone = isNgControlUntouched || hasObservers(this.onBlur) || (this.isOpen && hasObservers(this.close));
        this.run(runInZone, function () {
            _this.onBlur.emit();
            _this.onControlTouched();
            _this.togglePopup(false);
            _this.cdr.markForCheck();
        });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.changeActiveTab = function (tab) {
        if (!this.isOpen || this.activeTab === tab) {
            return;
        }
        // persists the Tcurrent value of the TimeSelector when switching between tabs
        if (!isEqual(this.timeSelector.value, this.timeSelector.current)) {
            this.timeSelector.handleAccept();
        }
        this.activeTab = tab;
        this.cdr.detectChanges();
        this.detectPopupChanges();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleTabChangeTransitionEnd = function (dateTimeSelector, event) {
        // handle only the .k-datetime-selector element transition, ignore any child element transitions
        if (event.target !== dateTimeSelector) {
            return;
        }
        this.activeTabComponent.focus();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleAccept = function () {
        var _this = this;
        if (!this.isOpen) {
            return;
        }
        var candidate = mergeDateAndTime(this.calendar.value, this.timeSelector.current);
        var valueChangePresent = !isEqual(this.value, candidate);
        var runInZone = valueChangePresent || hasObservers(this.close);
        this.run(runInZone, function () {
            _this.handleValueChange(candidate);
            _this.togglePopup(false);
        });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleCancel = function () {
        var _this = this;
        if (!this.isOpen) {
            return;
        }
        var runInZone = hasObservers(this.close);
        this.run(runInZone, function () { return _this.togglePopup(false); });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleInputValueChange = function (value) {
        this.handleValueChange(value);
        if (this.isOpen) {
            this.togglePopup(false);
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleCalendarValueChange = function () {
        this.setTimeSelectorMinMax(this.calendar.value);
        this.changeActiveTab('time');
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleKeyDown = function (event) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        var _a = event, keyCode = _a.keyCode, altKey = _a.altKey;
        switch (keyCode) {
            case altKey && Keys.ArrowUp:
            case Keys.Escape:
                this.handleCancel();
                break;
            case !this.isOpen && altKey && Keys.ArrowDown:
                this.ngZone.run(function () { return _this.togglePopup(true); });
                break;
            case altKey && Keys.ArrowRight:
                this.changeActiveTab('time');
                break;
            case altKey && Keys.ArrowLeft:
                this.changeActiveTab('date');
                break;
            case this.isOpen && this.timeSelector.isActive && isPresent(this.calendarValue) && Keys.Enter:
                this.handleAccept();
                break;
            default: return;
        }
        event.preventDefault();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleTabOut = function (event) {
        var _a = event, keyCode = _a.keyCode, shiftKey = _a.shiftKey, target = _a.target;
        // if no focusable next sibling elements exist in the controls sections, the user is tabbing out of the popup
        var focusableSiblingAvailable = isPresent(target.nextElementSibling) && !target.nextElementSibling.disabled;
        if (keyCode === Keys.Tab && !shiftKey && !focusableSiblingAvailable) {
            this.input.focus();
            this.handleCancel();
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleBackTabOut = function (event) {
        var _a = event, keyCode = _a.keyCode, shiftKey = _a.shiftKey;
        if (keyCode === Keys.Tab && shiftKey) {
            this.input.focus();
        }
    };
    /**
     * @hidden
     *
     * Prevents the diversion of the focus from the currently active element in the component.
     */
    DateTimePickerComponent.prototype.preventMouseDown = function (event) {
        event.preventDefault();
    };
    DateTimePickerComponent.prototype.verifyValue = function (value) {
        if (!isDevMode()) {
            return;
        }
        if (isPresent(value) && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    DateTimePickerComponent.prototype.verifyMinMaxRange = function () {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_MAX_DOC_LINK + ".");
        }
    };
    /**
     * Extracts the time slots and the literals that are not preceded by date parts
     * and concatenates the resulting parts into a string.
     * If the provided format value does not contain any time parts,
     * returns the designated format of the default popup component of the TimePicker.
     */
    DateTimePickerComponent.prototype.getTimeSelectorFormat = function (format) {
        var timeSelectorFormat = this.intl
            .splitDateFormat(format)
            .filter(this.timeFormatPartFilter)
            .reduce(function (format, part) { return format += part.pattern; }, '');
        return timeSelectorFormat || DEFAULT_TIMESELECTOR_FORMAT;
    };
    /**
     * The filter expression that filters out all format parts
     * except for `hour`, `minute`, `second`, `dayperiod`, and specific literals.
     * Literals will be left only if they are not preceded by date parts.
     */
    DateTimePickerComponent.prototype.timeFormatPartFilter = function (part, index, parts) {
        var previousPart = index >= 1 && parts[index - 1];
        if (previousPart && part.type === 'literal') {
            return timeFormatRegExp.test(previousPart.type);
        }
        return timeFormatRegExp.test(part.type);
    };
    DateTimePickerComponent.prototype.togglePopup = function (open) {
        if (open === this.isOpen) {
            return;
        }
        var event = new PreventableEvent();
        open ? this.open.emit(event) : this.close.emit(event);
        if (event.isDefaultPrevented()) {
            return;
        }
        this.toggle(open);
        this.switchFocus();
    };
    DateTimePickerComponent.prototype.switchFocus = function () {
        if (!this.isActive) {
            return;
        }
        if (this.isOpen) {
            this.activeTabComponent.focus();
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    };
    DateTimePickerComponent.prototype.openPopup = function () {
        var _this = this;
        this.setCalendarValue(this.value);
        this.setTimeSelectorMinMax(this.value);
        var direction = this.localization.rtl ? 'right' : 'left';
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            content: this.popupTemplate,
            positionMode: 'absolute',
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            popupClass: "k-datetime-container " + (this.popupSettings.popupClass || ''),
            anchorAlign: { vertical: 'bottom', horizontal: direction },
            popupAlign: { vertical: 'top', horizontal: direction }
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.handleCancel(); });
    };
    DateTimePickerComponent.prototype.closePopup = function () {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.close();
        this.popupRef = null;
    };
    DateTimePickerComponent.prototype.handleValueChange = function (value) {
        if (isEqual(this.value, value)) {
            return;
        }
        this.value = cloneDate(value);
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    };
    /**
     * Indicates whether the focus target is part of this component,
     * that is, whether the focus target is inside the component wrapper or in the popup.
     */
    DateTimePickerComponent.prototype.focusTargetInComponent = function (event) {
        if (!isPresent(event)) {
            return false;
        }
        var relatedTarget = event.relatedTarget || document.activeElement;
        var focusInPopup = isPresent(this.popupRef) && this.popupRef.popupElement.contains(relatedTarget);
        var focusInWrapper = this.wrapper.nativeElement.contains(relatedTarget);
        return focusInPopup || focusInWrapper;
    };
    DateTimePickerComponent.prototype.setTimeSelectorMinMax = function (selectedDate) {
        var minDateSelected = isPresent(selectedDate) && isEqual(getDate(selectedDate), getDate(this.min));
        this.timeSelectorMin = cloneDate(minDateSelected ? this.min : MIN_TIME);
        var maxDateSelected = isPresent(selectedDate) && isEqual(getDate(selectedDate), getDate(this.max));
        this.timeSelectorMax = cloneDate(maxDateSelected ? this.max : MAX_TIME);
    };
    DateTimePickerComponent.prototype.setCalendarValue = function (value) {
        var isInCalendarRange = isPresent(value) && isInRange(value, this.calendarMin, this.calendarMax);
        this.calendarValue = isInCalendarRange ? getDate(value) : null;
    };
    /**
     * If the popup is available, runs a popup change detection.
     */
    DateTimePickerComponent.prototype.detectPopupChanges = function () {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.popup.changeDetectorRef.detectChanges();
    };
    /**
     * Depending on the predicate `runInZone` value that is passed,
     * runs the provided function either in the Angular or in the current zone.
     */
    DateTimePickerComponent.prototype.run = function (runInZone, fn) {
        if (runInZone) {
            this.ngZone.run(function () { return fn(); });
        }
        else {
            fn();
        }
    };
    DateTimePickerComponent.prototype.handleDateCompletenessChange = function () {
        var _this = this;
        this.cdr.markForCheck();
        this.ngZone.run(function () { return _this.onValidatorChange(); });
    };
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-datetimepicker',
                    exportAs: 'kendo-datetimepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        PickerService,
                        LocalizationService,
                        DisabledDatesService,
                        { provide: L10N_PREFIX, useValue: 'kendo.datetimepicker' },
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return DateTimePickerComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DateTimePickerComponent; }), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(function () { return DateTimePickerComponent; }) }
                    ],
                    template: "\n        <ng-container\n            kendoDateTimePickerLocalizedMessages\n\n            i18n-dateTab=\"kendo.datetimepicker.dateTab|The Date tab text in the datetimepicker popup header\"\n            dateTab=\"Date\"\n\n            i18n-dateTabLabel=\"kendo.datetimepicker.dateTabLabel|The label for the Date tab in the datetimepicker popup header\"\n            dateTabLabel=\"Date tab\"\n\n            i18n-timeTab=\"kendo.datetimepicker.timeTab|The Time tab text in the datetimepicker popup header\"\n            timeTab=\"Time\"\n\n            i18n-timeTabLabel=\"kendo.datetimepicker.timeTabLabel|The label for the Time tab in the datetimepicker popup header\"\n            timeTabLabel=\"Time tab\"\n\n            i18n-toggle=\"kendo.datetimepicker.toggle|The label for the toggle button in the datetimepicker component\"\n            toggle=\"Toggle popup\"\n\n            i18n-accept=\"kendo.datetimepicker.accept|The Accept button text in the datetimepicker component\"\n            accept=\"Set\"\n\n            i18n-acceptLabel=\"kendo.datetimepicker.acceptLabel|The label for the Accept button in the datetimepicker component\"\n            acceptLabel=\"Set\"\n\n            i18n-cancel=\"kendo.datetimepicker.cancel|The Cancel button text in the datetimepicker component\"\n            cancel=\"Cancel\"\n\n            i18n-cancelLabel=\"kendo.datetimepicker.cancelLabel|The label for the Cancel button in the datetimepicker component\"\n            cancelLabel=\"Cancel\"\n\n            i18n-now=\"kendo.datetimepicker.now|The Now button text in the timepicker component\"\n            now=\"NOW\"\n\n            i18n-nowLabel=\"kendo.datetimepicker.nowLabel|The label for the Now button in the timepicker component\"\n            nowLabel=\"Select now\"\n\n            i18n-today=\"kendo.datetimepicker.today|The label for the today button in the calendar header\"\n            today=\"TODAY\"\n        >\n        </ng-container>\n\n        <span\n            #wrapper\n            class=\"k-picker-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n        >\n            <kendo-dateinput\n                [value]=\"value\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [incompleteDateValidation]=\"incompleteDateValidation\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly || readOnlyInput\"\n                [role]=\"inputRole\"\n                [ariaReadOnly]=\"readonly\"\n                [steps]=\"steps\"\n                [tabindex]=\"tabindex\"\n                [title]=\"title\"\n                [focusableId]=\"focusableId\"\n                [hasPopup]=\"true\"\n                [isPopupOpen]=\"isOpen\"\n                (valueChange)=\"handleInputValueChange($event)\"\n                [kendoEventsOutsideAngular]=\"{\n                    keydown: handleKeyDown\n                }\"\n                [scope]=\"this\"\n            >\n            </kendo-dateinput>\n            <span class=\"k-select\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [kendoEventsOutsideAngular]=\"{\n                    mousedown: preventMouseDown,\n                    click: handleIconClick\n                }\"\n                [scope]=\"this\"\n            >\n                <span class=\"k-link k-link-date\">\n                    <span\n                        class=\"k-icon\"\n                        [class.k-i-calendar]=\"activeTab === 'date'\"\n                        [class.k-i-clock]=\"activeTab === 'time'\"\n                    >\n                    </span>\n                </span>\n            </span>\n        </span>\n\n        <ng-container #container></ng-container>\n\n        <ng-template #popupTemplate>\n            <div\n                class=\"k-datetime-wrap k-{{activeTab}}-tab\"\n                [kendoEventsOutsideAngular]=\"{\n                    mousedown: preventMouseDown,\n                    keydown: handleKeyDown\n                }\"\n                [scope]=\"this\"\n            >\n                <div class=\"k-datetime-buttongroup\"\n                    [kendoEventsOutsideAngular]=\"{\n                        focusin: handleFocus,\n                        focusout: handleBlur\n                    }\"\n                    [scope]=\"this\"\n                >\n                    <div class=\"k-button-group k-button-group-stretched\">\n                        <button\n                            type=\"button\"\n                            class=\"k-button k-date-tab\"\n                            [class.k-state-active]=\"activeTab === 'date'\"\n                            [attr.title]=\"localization.get('dateTabLabel')\"\n                            [attr.aria-label]=\"localization.get('dateTabLabel')\"\n                            [kendoEventsOutsideAngular]=\"{\n                                click: changeActiveTab.bind(this, 'date'),\n                                keydown: handleBackTabOut\n                            }\"\n                            [scope]=\"this\"\n                        >\n                            {{localization.get('dateTab')}}\n                        </button>\n                        <button\n                            type=\"button\"\n                            class=\"k-button k-time-tab\"\n                            [class.k-state-active]=\"activeTab === 'time'\"\n                            [attr.title]=\"localization.get('timeTabLabel')\"\n                            [attr.aria-label]=\"localization.get('timeTabLabel')\"\n                            [kendoEventsOutsideAngular]=\"{\n                                click: changeActiveTab.bind(this, 'time')\n                            }\"\n                        >\n                            {{localization.get('timeTab')}}\n                        </button>\n                    </div>\n                </div>\n                <div\n                    #dateTimeSelector\n                    class=\"k-datetime-selector\"\n                    [style.transition]=\"tabSwitchTransition\"\n                    [kendoEventsOutsideAngular]=\"{\n                        transitionend: handleTabChangeTransitionEnd.bind(this, dateTimeSelector)\n                    }\"\n                >\n                    <div class=\"k-datetime-calendar-wrap\">\n                        <kendo-calendar\n                            [(value)]=\"calendarValue\"\n                            [min]=\"calendarMin\"\n                            [max]=\"calendarMax\"\n                            [focusedDate]=\"focusedDate\"\n                            [weekNumber]=\"weekNumber\"\n                            [navigation]=\"false\"\n                            [cellTemplate]=\"cellTemplate\"\n                            [monthCellTemplate]=\"monthCellTemplate\"\n                            [yearCellTemplate]=\"yearCellTemplate\"\n                            [decadeCellTemplate]=\"decadeCellTemplate\"\n                            [centuryCellTemplate]=\"centuryCellTemplate\"\n                            [weekNumberTemplate]=\"weekNumberTemplate\"\n                            [headerTitleTemplate]=\"headerTitleTemplate\"\n                            [disabled]=\"disableCalendar\"\n                            [disabledDates]=\"disabledDates\"\n                            (valueChange)=\"handleCalendarValueChange()\"\n                        >\n                            <kendo-calendar-messages\n                                [today]=\"localization.get('today')\"\n                            >\n                            </kendo-calendar-messages>\n                        </kendo-calendar>\n                    </div>\n                    <div class=\"k-datetime-time-wrap\">\n                        <kendo-timeselector\n                            [value]=\"value\"\n                            [format]=\"timeSelectorFormat\"\n                            [min]=\"timeSelectorMin\"\n                            [max]=\"timeSelectorMax\"\n                            [setButton]=\"false\"\n                            [cancelButton]=\"false\"\n                            [steps]=\"steps\"\n                            [disabled]=\"disableTimeSelector\"\n                        >\n                            <kendo-timeselector-messages\n                                [now]=\"localization.get('now')\"\n                                [nowLabel]=\"localization.get('nowLabel')\"\n                            >\n                            </kendo-timeselector-messages>\n                        </kendo-timeselector>\n                    </div>\n                </div>\n                <div\n                    class=\"k-datetime-footer k-action-buttons\"\n                    [kendoEventsOutsideAngular]=\"{\n                        keydown: handleTabOut,\n                        focusin: handleFocus,\n                        focusout: handleBlur\n                    }\"\n                    [scope]=\"this\"\n                >\n                    <button\n                        *ngIf=\"cancelButton\"\n                        type=\"button\"\n                        class=\"k-button k-time-cancel\"\n                        [attr.title]=\"localization.get('cancelLabel')\"\n                        [attr.aria-label]=\"localization.get('cancelLabel')\"\n                        [kendoEventsOutsideAngular]=\"{\n                            click: handleCancel\n                        }\"\n                        [scope]=\"this\"\n                    >\n                        {{localization.get('cancel')}}\n                    </button>\n                    <button\n                        type=\"button\"\n                        class=\"k-time-accept k-button k-primary\"\n                        [attr.title]=\"localization.get('acceptLabel')\"\n                        [attr.aria-label]=\"localization.get('acceptLabel')\"\n                        [disabled]=\"!calendarValue\"\n                        [kendoEventsOutsideAngular]=\"{\n                            click: handleAccept\n                        }\"\n                        [scope]=\"this\"\n                    >\n                        {{localization.get('accept')}}\n                    </button>\n                </div>\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: IntlService },
        { type: ChangeDetectorRef },
        { type: PickerService },
        { type: NgZone },
        { type: ElementRef },
        { type: Boolean, decorators: [{ type: Inject, args: [TOUCH_ENABLED,] }] },
        { type: LocalizationService },
        { type: DisabledDatesService },
        { type: Renderer2 }
    ]; };
    DateTimePickerComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-datetimepicker',] }],
        wrapper: [{ type: ViewChild, args: ['wrapper',] }],
        value: [{ type: Input }],
        format: [{ type: Input }],
        tabindex: [{ type: Input }],
        disabledDates: [{ type: Input }],
        popupSettings: [{ type: Input }],
        focusableId: [{ type: Input }],
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        readOnlyInput: [{ type: Input }],
        cancelButton: [{ type: Input }],
        formatPlaceholder: [{ type: Input }],
        placeholder: [{ type: Input }],
        steps: [{ type: Input }],
        focusedDate: [{ type: Input }],
        weekNumber: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        rangeValidation: [{ type: Input }],
        disabledDatesValidation: [{ type: Input }],
        incompleteDateValidation: [{ type: Input }],
        valueChange: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        defaultTab: [{ type: Input }],
        cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective,] }],
        monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective,] }],
        yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective,] }],
        decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective,] }],
        centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective,] }],
        weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective,] }],
        headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective,] }],
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { read: TemplateRef },] }]
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
