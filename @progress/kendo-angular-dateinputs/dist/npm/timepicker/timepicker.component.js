/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var defaults_1 = require("../defaults");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var picker_service_1 = require("../common/picker.service");
var utils_1 = require("../common/utils");
var time_part_default_1 = require("./models/time-part.default");
var preventable_event_1 = require("../preventable-event");
var util_1 = require("../util");
var time_range_validator_1 = require("../validators/time-range.validator");
var touch_enabled_1 = require("../touch-enabled");
var rxjs_1 = require("rxjs");
var incomplete_date_validator_1 = require("../validators/incomplete-date.validator");
var VALUE_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/timepicker/#toc-integration-with-json';
var INTL_DATE_FORMAT = 'https://github.com/telerik/kendo-intl/blob/master/docs/date-formatting/index.md';
var formatRegExp = new RegExp(time_part_default_1.TIME_PART.hour + "|" + time_part_default_1.TIME_PART.minute + "|" + time_part_default_1.TIME_PART.second + "|" + time_part_default_1.TIME_PART.dayperiod + "|literal");
/**
 * Represents the [Kendo UI TimePicker component for Angular]({% slug overview_timepicker %}#toc-basic-usage).
 */
var TimePickerComponent = /** @class */ (function () {
    function TimePickerComponent(zone, localization, cdr, popupService, element, renderer, injector, pickerService, intl, touchEnabled) {
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
        this.focusableId = "k-" + kendo_angular_common_1.guid();
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
        this.valueChange = new core_1.EventEmitter();
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
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
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
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.close = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.popupUID = kendo_angular_common_1.guid();
        this.onControlChange = util_1.noop;
        this.onControlTouched = util_1.noop;
        this.onValidatorChange = util_1.noop;
        this.resolvedPromise = Promise.resolve(null);
        this.timeRangeValidateFn = util_1.noop;
        this.incompleteValidator = util_1.noop;
        this._min = kendo_date_math_1.cloneDate(defaults_1.MIN_TIME);
        this._max = kendo_date_math_1.cloneDate(defaults_1.MAX_TIME);
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
    Object.defineProperty(TimePickerComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Specifies the smallest valid time value
         * ([see example]({% slug timeranges_timepicker %})).
         */
        set: function (min) {
            this._min = kendo_date_math_1.cloneDate(min || defaults_1.MIN_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Specifies the biggest valid time value
         * ([see example]({% slug timeranges_timepicker %})).
         */
        set: function (max) {
            this._max = kendo_date_math_1.cloneDate(max || defaults_1.MAX_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "steps", {
        get: function () {
            return this._steps;
        },
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
        set: function (steps) {
            this._steps = steps || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the TimePicker.
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
    Object.defineProperty(TimePickerComponent.prototype, "tabIndex", {
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
    Object.defineProperty(TimePickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the TimePicker component.
         */
        set: function (value) {
            this.verifyValue(value);
            this._value = kendo_date_math_1.cloneDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "inputRole", {
        /**
         * @hidden
         */
        get: function () {
            return this.readOnlyInput ? 'listbox' : 'spinbutton';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "isActive", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (!this.wrapper) {
                return;
            }
            var element = this.wrapper.nativeElement;
            if (value) {
                this.renderer.addClass(element, 'k-state-focused');
            }
            else {
                this.renderer.removeClass(element, 'k-state-focused');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (show) {
            var _this = this;
            if (show && (this.disabled || this.readonly)) {
                return;
            }
            var skipZone = !show && (!this._show || !kendo_angular_common_1.hasObservers(this.close));
            if (!skipZone) {
                this.zone.run(function () {
                    _this.togglePopup(show);
                });
            }
            else {
                this.togglePopup(show);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "input", {
        get: function () {
            return this.pickerService.input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "timeSelector", {
        get: function () {
            return this.pickerService.timeSelector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    TimePickerComponent.prototype.isEmpty = function () {
        return !this.value && this.input.isEmpty();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function () { return _this.cdr.markForCheck(); });
        this.control = this.injector.get(forms_1.NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.min || changes.max || changes.rangeValidation || changes.incompleteDateValidation) {
            this.timeRangeValidateFn = this.rangeValidation ? time_range_validator_1.timeRangeValidator(this.min, this.max) : util_1.noop;
            this.incompleteValidator = this.incompleteDateValidation ? incomplete_date_validator_1.incompleteDateValidator() : util_1.noop;
            this.onValidatorChange();
        }
        if (changes.format) {
            this.verifyFormat();
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.ngOnDestroy = function () {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
        this.pickerSubscriptions.unsubscribe();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleKeydown = function (event) {
        var altKey = event.altKey, keyCode = event.keyCode;
        if (keyCode === kendo_angular_common_1.Keys.Escape) {
            this.show = false;
            return;
        }
        if (altKey) {
            if (keyCode === kendo_angular_common_1.Keys.ArrowUp) {
                this.show = false;
            }
            if (keyCode === kendo_angular_common_1.Keys.ArrowDown && !this.show) {
                this.show = true;
            }
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        this.value = kendo_date_math_1.cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.validate = function (control) {
        return this.timeRangeValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
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
    TimePickerComponent.prototype.focus = function () {
        this.input.focus();
    };
    /**
     * Blurs the TimePicker component.
     */
    TimePickerComponent.prototype.blur = function () {
        (this.timeSelector || this.input)['blur'](); //tslint:disable-line:no-string-literal
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    TimePickerComponent.prototype.toggle = function (show) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(function () {
            _this._toggle((show === undefined) ? !_this.show : show);
        });
    };
    Object.defineProperty(TimePickerComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.show;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "appendTo", {
        /**
         * @hidden
         */
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
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleChange = function (value) {
        var _this = this;
        if (kendo_date_math_1.isEqual(this.value, value)) {
            this.focusInput();
            this.show = false;
            return;
        }
        this.value = kendo_date_math_1.cloneDate(value);
        this.zone.run(function () {
            _this.focusInput();
            _this.show = false;
            _this.onControlChange(kendo_date_math_1.cloneDate(value));
            _this.valueChange.emit(kendo_date_math_1.cloneDate(value));
        });
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleReject = function () {
        this.show = false;
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleInputChange = function (value) {
        var val = this.input.formatSections.date ? value : this.mergeTime(value);
        this.handleChange(val);
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleMousedown = function (args) {
        args.preventDefault();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleIconClick = function (event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicit call handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
    };
    Object.defineProperty(TimePickerComponent.prototype, "popupClasses", {
        /**
         * @hidden
         */
        get: function () {
            return [
                'k-group',
                'k-reset'
            ].concat(this.popupSettings.popupClass || []);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TimePickerComponent.prototype.normalizeTime = function (date) {
        return util_1.setTime(defaults_1.MIDNIGHT_DATE, date);
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.mergeTime = function (value) {
        return this.value && value ? util_1.setTime(this.value, value) : value;
    };
    TimePickerComponent.prototype.togglePopup = function (show) {
        var event = new preventable_event_1.PreventableEvent();
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
    };
    TimePickerComponent.prototype._toggle = function (show) {
        var _this = this;
        if (show === this.isOpen) {
            return;
        }
        this._show = show;
        this.cdr.markForCheck();
        if (show) {
            var direction = this.localization.rtl ? 'right' : 'left';
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
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.show = false; });
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    TimePickerComponent.prototype.focusInput = function () {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    };
    TimePickerComponent.prototype.toggleFocus = function () {
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
    };
    TimePickerComponent.prototype.verifyValue = function (value) {
        if (!core_1.isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    TimePickerComponent.prototype.verifyFormat = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        var formatContainsDateParts = this.intl.splitDateFormat(this.format).some(function (part) { return !formatRegExp.test(part.type); });
        if (formatContainsDateParts) {
            throw new Error("Provided format is not supported. Supported specifiers are T|t|H|h|m|s|a. See " + INTL_DATE_FORMAT);
        }
    };
    TimePickerComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (util_1.isWindowAvailable()) {
            this.windowBlurSubscription = rxjs_1.fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    };
    TimePickerComponent.prototype.handleWindowBlur = function () {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    };
    TimePickerComponent.prototype.handleFocus = function () {
        var _this = this;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (kendo_angular_common_1.hasObservers(this.onFocus)) {
            this.zone.run(function () {
                _this.onFocus.emit();
            });
        }
    };
    TimePickerComponent.prototype.handleBlur = function (args) {
        var _this = this;
        var currentTarget = args && utils_1.currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.timeSelector && this.timeSelector.containsElement(currentTarget)))) {
            return;
        }
        if (kendo_angular_common_1.hasObservers(this.onBlur) || (this.show && kendo_angular_common_1.hasObservers(this.close)) || utils_1.requiresZoneOnBlur(this.control)) {
            this.zone.run(function () {
                _this.blurComponent();
                _this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    };
    TimePickerComponent.prototype.blurComponent = function () {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.onControlTouched();
        this.onBlur.emit();
    };
    TimePickerComponent.prototype.handleDateCompletenessChange = function () {
        var _this = this;
        this.cdr.markForCheck();
        this.zone.run(function () { return _this.onValidatorChange(); });
    };
    TimePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-timepicker',
                    providers: [
                        { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return TimePickerComponent; }), multi: true },
                        { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return TimePickerComponent; }), multi: true },
                        { provide: kendo_angular_common_1.KendoInput, useExisting: core_1.forwardRef(function () { return TimePickerComponent; }) },
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.timepicker'
                        },
                        picker_service_1.PickerService
                    ],
                    selector: 'kendo-timepicker',
                    template: "\n        <ng-container kendoTimePickerLocalizedMessages\n            i18n-accept=\"kendo.timepicker.accept|The Accept button text in the timepicker component\"\n            accept=\"Set\"\n\n            i18n-acceptLabel=\"kendo.timepicker.acceptLabel|The label for the Accept button in the timepicker component\"\n            acceptLabel=\"Set time\"\n\n            i18n-cancel=\"kendo.timepicker.cancel|The Cancel button text in the timepicker component\"\n            cancel=\"Cancel\"\n\n            i18n-cancelLabel=\"kendo.timepicker.cancelLabel|The label for the Cancel button in the timepicker component\"\n            cancelLabel=\"Cancel changes\"\n\n            i18n-now=\"kendo.timepicker.now|The Now button text in the timepicker component\"\n            now=\"Now\"\n\n            i18n-nowLabel=\"kendo.timepicker.nowLabel|The label for the Now button in the timepicker component\"\n            nowLabel=\"Select now\"\n\n            i18n-toggle=\"kendo.timepicker.toggle|The label for the toggle button in the timepicker component\"\n            toggle=\"Toggle time list\"\n        >\n        </ng-container>\n        <span #wrapper\n            class=\"k-picker-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n        >\n            <kendo-dateinput\n                #input\n                [focusableId]=\"focusableId\"\n                [hasPopup]=\"true\"\n                [isPopupOpen]=\"show\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly || readOnlyInput\"\n                [role]=\"inputRole\"\n                [ariaReadOnly]=\"readonly\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [min]=\"normalizeTime(min)\"\n                [max]=\"normalizeTime(max)\"\n                [incompleteDateValidation]=\"incompleteDateValidation\"\n                [steps]=\"steps\"\n                [tabindex]=\"!show ? tabindex : -1\"\n                [title]=\"title\"\n                [value]=\"value\"\n                (valueChange)=\"handleInputChange($event)\"\n            ></kendo-dateinput>\n            <span class=\"k-select\"\n                role=\"button\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleIconClick,\n                    mousedown: handleMousedown\n                }\"\n                [scope]=\"this\"\n            >\n                <span class=\"k-icon k-i-clock\"></span>\n            </span>\n            <ng-template #popupTemplate>\n                <kendo-timeselector\n                    #timeSelector\n                    [cancelButton]=\"cancelButton\"\n                    [nowButton]=\"nowButton\"\n                    [format]=\"format\"\n                    [min]=\"min\"\n                    [max]=\"max\"\n                    [steps]=\"steps\"\n                    [value]=\"value\"\n                    [kendoEventsOutsideAngular]=\"{\n                        keydown: handleKeydown,\n                        mousedown: handleMousedown\n                    }\"\n                    [scope]=\"this\"\n                    (valueChange)=\"handleChange($event)\"\n                    (valueReject)=\"handleReject()\"\n                >\n                    <kendo-timeselector-messages\n                        [acceptLabel]=\"localization.get('acceptLabel')\"\n                        [accept]=\"localization.get('accept')\"\n                        [cancelLabel]=\"localization.get('cancelLabel')\"\n                        [cancel]=\"localization.get('cancel')\"\n                        [nowLabel]=\"localization.get('nowLabel')\"\n                        [now]=\"localization.get('now')\"\n                    >\n                    </kendo-timeselector-messages>\n                </kendo-timeselector>\n            </ng-template>\n        </span>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return [
        { type: core_1.NgZone },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: kendo_angular_popup_1.PopupService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.Injector },
        { type: picker_service_1.PickerService },
        { type: kendo_angular_intl_1.IntlService },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [touch_enabled_1.TOUCH_ENABLED,] }] }
    ]; };
    TimePickerComponent.propDecorators = {
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        wrapper: [{ type: core_1.ViewChild, args: ['wrapper',] }],
        focusableId: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        readOnlyInput: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        formatPlaceholder: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        incompleteDateValidation: [{ type: core_1.Input }],
        cancelButton: [{ type: core_1.Input }],
        nowButton: [{ type: core_1.Input }],
        steps: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        rangeValidation: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        wrapperClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-timepicker',] }],
        disabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }]
    };
    return TimePickerComponent;
}());
exports.TimePickerComponent = TimePickerComponent;
