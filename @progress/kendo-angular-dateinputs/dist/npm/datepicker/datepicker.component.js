/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:max-line-length */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var defaults_1 = require("../defaults");
var min_validator_1 = require("../validators/min.validator");
var max_validator_1 = require("../validators/max.validator");
var preventable_event_1 = require("../preventable-event");
var view_enum_1 = require("../calendar/models/view.enum");
var cell_template_directive_1 = require("../calendar/templates/cell-template.directive");
var month_cell_template_directive_1 = require("../calendar/templates/month-cell-template.directive");
var year_cell_template_directive_1 = require("../calendar/templates/year-cell-template.directive");
var decade_cell_template_directive_1 = require("../calendar/templates/decade-cell-template.directive");
var century_cell_template_directive_1 = require("../calendar/templates/century-cell-template.directive");
var weeknumber_cell_template_directive_1 = require("../calendar/templates/weeknumber-cell-template.directive");
var header_title_template_directive_1 = require("../calendar/templates/header-title-template.directive");
var navigation_item_template_directive_1 = require("../calendar/templates/navigation-item-template.directive");
var picker_service_1 = require("../common/picker.service");
var disabled_dates_service_1 = require("../calendar/services/disabled-dates.service");
var util_1 = require("../util");
var touch_enabled_1 = require("../touch-enabled");
var utils_1 = require("../common/utils");
var rxjs_1 = require("rxjs");
var incomplete_date_validator_1 = require("../validators/incomplete-date.validator");
var disabled_date_validator_1 = require("../validators/disabled-date.validator");
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/datepicker/#toc-using-with-json';
/**
 * Represents the [Kendo UI DatePicker component for Angular]({% slug overview_datepicker %}#toc-basic-usage).
 */
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent(zone, localization, cdr, popupService, element, renderer, injector, pickerService, disabledDatesService, touchEnabled) {
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
        this.focusableId = "k-" + kendo_angular_common_1.guid();
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_datepicker %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.month];
        /**
         * Defines the bottommost Calendar view to which the user can navigate
         * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
         */
        this.bottomView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.month];
        /**
         * Defines the topmost Calendar view to which the user can navigate
         * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
         */
        this.topView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.century];
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
        this.min = kendo_date_math_1.cloneDate(defaults_1.MIN_DATE);
        /**
         * Specifies the biggest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         */
        this.max = kendo_date_math_1.cloneDate(defaults_1.MAX_DATE);
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
        this.valueChange = new core_1.EventEmitter();
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
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
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
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.close = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.popupUID = kendo_angular_common_1.guid();
        this._popupSettings = { animate: true };
        this._show = false;
        this._value = null;
        this._active = false;
        this.onControlChange = util_1.noop;
        this.onControlTouched = util_1.noop;
        this.onValidatorChange = util_1.noop;
        this.minValidateFn = util_1.noop;
        this.maxValidateFn = util_1.noop;
        this.disabledDatesValidateFn = util_1.noop;
        this.incompleteValidator = util_1.noop;
        this.resolvedPromise = Promise.resolve(null);
        this.domEvents = [];
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleSameSelection.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    Object.defineProperty(DatePickerComponent.prototype, "cellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.cellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "monthCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.monthCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "yearCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.yearCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "decadeCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.decadeCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "centuryCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.centuryCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "weekNumberTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.weekNumberTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "headerTitleTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.headerTitleTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "navigationItemTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.navigationItemTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup options of the DatePicker.
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
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the DatePicker component.
         *
         * > The `value` has to be a valid
         * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        set: function (value) {
            this.verifyValue(value);
            this._value = kendo_date_math_1.cloneDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "tabIndex", {
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
    Object.defineProperty(DatePickerComponent.prototype, "disabledDates", {
        get: function () {
            return this._disabledDates;
        },
        /**
         * Sets the dates of the DatePicker that will be disabled
         * ([see example]({% slug disabled_dates_datepicker %})).
         */
        set: function (value) {
            this._disabledDates = value;
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "inputRole", {
        /**
         * @hidden
         */
        get: function () {
            return this.readOnlyInput ? 'listbox' : 'spinbutton';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "isActive", {
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
    Object.defineProperty(DatePickerComponent.prototype, "show", {
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
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    DatePickerComponent.prototype.isEmpty = function () {
        return !this.value && this.input.isEmpty();
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(function () { return _this.cdr.markForCheck(); });
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
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        this.verifySettings();
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? min_validator_1.minValidator(this.min) : util_1.noop;
            this.maxValidateFn = this.rangeValidation ? max_validator_1.maxValidator(this.max) : util_1.noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabled_date_validator_1.disabledDatesValidator(this.disabledDatesService.isDateDisabled) : util_1.noop;
            this.incompleteValidator = this.incompleteDateValidation ? incomplete_date_validator_1.incompleteDateValidator() : util_1.noop;
            this.onValidatorChange();
        }
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnDestroy = function () {
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
    Object.defineProperty(DatePickerComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DatePickerComponent.prototype.writeValue = function (value) {
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
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
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
    DatePickerComponent.prototype.focus = function () {
        this.input.focus();
    };
    /**
     * Blurs the DatePicker component.
     */
    DatePickerComponent.prototype.blur = function () {
        (this.calendar || this.input)['blur'](); //tslint:disable-line:no-string-literal
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    DatePickerComponent.prototype.toggle = function (show) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(function () {
            _this._toggle((show === undefined) ? !_this.show : show);
        });
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleIconClick = function (event) {
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
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleMousedown = function (args) {
        args.preventDefault();
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleChange = function (value) {
        this.cdr.markForCheck();
        this.focusInput();
        this.value = value;
        this.show = false;
        this.onControlChange(kendo_date_math_1.cloneDate(value));
        this.valueChange.emit(kendo_date_math_1.cloneDate(value));
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleInputChange = function (value) {
        this.handleChange(this.input.formatSections.time ? value : this.mergeTime(value));
    };
    Object.defineProperty(DatePickerComponent.prototype, "popupClasses", {
        /**
         * @hidden
         */
        get: function () {
            return [
                'k-calendar-container',
                'k-group',
                'k-reset'
            ].concat(this.popupSettings.popupClass || []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "appendTo", {
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
    Object.defineProperty(DatePickerComponent.prototype, "input", {
        get: function () {
            return this.pickerService.input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "calendar", {
        get: function () {
            return this.pickerService.calendar;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DatePickerComponent.prototype.mergeTime = function (value) {
        return this.value && value ? util_1.setTime(value, this.value) : value;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleKeydown = function (e) {
        var altKey = e.altKey, keyCode = e.keyCode;
        if (keyCode === kendo_angular_common_1.Keys.Escape) {
            this.show = false;
        }
        if (altKey) {
            if (keyCode === kendo_angular_common_1.Keys.ArrowDown && !this.show) {
                this.show = true;
            }
            if (keyCode === kendo_angular_common_1.Keys.ArrowUp) {
                this.show = false;
            }
        }
        if (keyCode === kendo_angular_common_1.Keys.Tab && this.show && this.calendar.isActive) {
            this.input.focus();
            this.show = false;
        }
    };
    DatePickerComponent.prototype.togglePopup = function (show) {
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
    DatePickerComponent.prototype._toggle = function (show) {
        var _this = this;
        if (show === this._show) {
            return;
        }
        this._show = show;
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
            this.subscription = this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.show = false; });
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
            this.subscription.unsubscribe();
        }
    };
    DatePickerComponent.prototype.focusInput = function () {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    };
    DatePickerComponent.prototype.toggleFocus = function () {
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
    };
    DatePickerComponent.prototype.verifySettings = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (!util_1.isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    DatePickerComponent.prototype.verifyValue = function (value) {
        if (!core_1.isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    DatePickerComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (util_1.isWindowAvailable()) {
            this.windowBlurSubscription = rxjs_1.fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    };
    DatePickerComponent.prototype.handleFocus = function () {
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
    DatePickerComponent.prototype.handleWindowBlur = function () {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    };
    DatePickerComponent.prototype.handleBlur = function (args) {
        var _this = this;
        var currentTarget = args && utils_1.currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.calendar && this.calendar.containsElement(currentTarget)))) {
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
    DatePickerComponent.prototype.blurComponent = function () {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.cdr.detectChanges();
        this.onControlTouched();
        this.onBlur.emit();
    };
    DatePickerComponent.prototype.handleSameSelection = function () {
        if (this.show) {
            this.focusInput();
            this.show = false;
        }
    };
    DatePickerComponent.prototype.handleDateCompletenessChange = function () {
        var _this = this;
        this.cdr.markForCheck();
        this.zone.run(function () { return _this.onValidatorChange(); });
    };
    DatePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-datepicker',
                    providers: [
                        { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return DatePickerComponent; }), multi: true },
                        { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return DatePickerComponent; }), multi: true },
                        { provide: kendo_angular_common_1.KendoInput, useExisting: core_1.forwardRef(function () { return DatePickerComponent; }) },
                        kendo_angular_l10n_1.LocalizationService,
                        picker_service_1.PickerService,
                        disabled_dates_service_1.DisabledDatesService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.datepicker'
                        }
                    ],
                    selector: 'kendo-datepicker',
                    template: "\n        <ng-container kendoDatePickerLocalizedMessages\n            i18n-today=\"kendo.datepicker.today|The label for the today button in the calendar header\"\n            today=\"TODAY\"\n\n            i18n-toggle=\"kendo.datepicker.toggle|The label for the toggle button in the datepicker component\"\n            toggle=\"Toggle calendar\"\n        >\n        </ng-container>\n        <span #wrapper\n            class=\"k-picker-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n        >\n            <kendo-dateinput\n                #input\n                [role]=\"inputRole\"\n                [focusableId]=\"focusableId\"\n                [hasPopup]=\"true\"\n                [isPopupOpen]=\"show\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly || readOnlyInput\"\n                [ariaReadOnly]=\"readonly\"\n                [tabindex]=\"tabindex\"\n                [title]=\"title\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [incompleteDateValidation]=\"incompleteDateValidation\"\n                [value]=\"value\"\n                (valueChange)=\"handleInputChange($event)\"\n            ></kendo-dateinput>\n            <span class=\"k-select\"\n                role=\"button\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleIconClick,\n                    mousedown: handleMousedown\n                }\"\n                [scope]=\"this\"\n            >\n                <span class=\"k-icon k-i-calendar\"></span>\n            </span>\n        </span>\n        <ng-container #container></ng-container>\n        <ng-template #popupTemplate>\n            <kendo-calendar\n                #calendar\n                [min]=\"min\"\n                [max]=\"max\"\n                [navigation]=\"navigation\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [weekNumber]=\"weekNumber\"\n                [cellTemplate]=\"cellTemplate\"\n                [monthCellTemplate]=\"monthCellTemplate\"\n                [yearCellTemplate]=\"yearCellTemplate\"\n                [decadeCellTemplate]=\"decadeCellTemplate\"\n                [centuryCellTemplate]=\"centuryCellTemplate\"\n                [weekNumberTemplate]=\"weekNumberTemplate\"\n                [headerTitleTemplate]=\"headerTitleTemplate\"\n                [navigationItemTemplate]=\"navigationItemTemplate\"\n                [focusedDate]=\"focusedDate\"\n                [value]=\"value\"\n                (valueChange)=\"handleChange(mergeTime($event))\"\n                [kendoEventsOutsideAngular]=\"{\n                    keydown: handleKeydown\n                }\"\n                [scope]=\"this\"\n                [disabledDates]=\"disabledDates\"\n            >\n                <kendo-calendar-messages [today]=\"localization.get('today')\">\n                </kendo-calendar-messages>\n            </kendo-calendar>\n        <ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: core_1.NgZone },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: kendo_angular_popup_1.PopupService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.Injector },
        { type: picker_service_1.PickerService },
        { type: disabled_dates_service_1.DisabledDatesService },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [touch_enabled_1.TOUCH_ENABLED,] }] }
    ]; };
    DatePickerComponent.propDecorators = {
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        wrapper: [{ type: core_1.ViewChild, args: ['wrapper',] }],
        cellTemplate: [{ type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective,] }],
        cellTemplateRef: [{ type: core_1.Input, args: ['cellTemplate',] }],
        monthCellTemplate: [{ type: core_1.ContentChild, args: [month_cell_template_directive_1.MonthCellTemplateDirective,] }],
        monthCellTemplateRef: [{ type: core_1.Input, args: ['monthCellTemplate',] }],
        yearCellTemplate: [{ type: core_1.ContentChild, args: [year_cell_template_directive_1.YearCellTemplateDirective,] }],
        yearCellTemplateRef: [{ type: core_1.Input, args: ['yearCellTemplate',] }],
        decadeCellTemplate: [{ type: core_1.ContentChild, args: [decade_cell_template_directive_1.DecadeCellTemplateDirective,] }],
        decadeCellTemplateRef: [{ type: core_1.Input, args: ['decadeCellTemplate',] }],
        centuryCellTemplate: [{ type: core_1.ContentChild, args: [century_cell_template_directive_1.CenturyCellTemplateDirective,] }],
        centuryCellTemplateRef: [{ type: core_1.Input, args: ['centuryCellTemplate',] }],
        weekNumberTemplate: [{ type: core_1.ContentChild, args: [weeknumber_cell_template_directive_1.WeekNumberCellTemplateDirective,] }],
        weekNumberTemplateRef: [{ type: core_1.Input, args: ['weekNumberTemplate',] }],
        headerTitleTemplate: [{ type: core_1.ContentChild, args: [header_title_template_directive_1.HeaderTitleTemplateDirective,] }],
        headerTitleTemplateRef: [{ type: core_1.Input, args: ['headerTitleTemplate',] }],
        navigationItemTemplate: [{ type: core_1.ContentChild, args: [navigation_item_template_directive_1.NavigationItemTemplateDirective,] }],
        navigationItemTemplateRef: [{ type: core_1.Input, args: ['navigationItemTemplate',] }],
        focusableId: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        bottomView: [{ type: core_1.Input }],
        topView: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        readOnlyInput: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        navigation: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        incompleteDateValidation: [{ type: core_1.Input }],
        focusedDate: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        formatPlaceholder: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        disabledDates: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        rangeValidation: [{ type: core_1.Input }],
        disabledDatesValidation: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        wrapperClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-datepicker',] }],
        disabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }]
    };
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
