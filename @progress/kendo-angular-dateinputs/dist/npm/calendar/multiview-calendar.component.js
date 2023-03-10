/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var horizontal_view_list_component_1 = require("./horizontal-view-list.component");
var bus_view_service_1 = require("./services/bus-view.service");
var navigation_service_1 = require("./services/navigation.service");
var disabled_dates_service_1 = require("./services/disabled-dates.service");
var cell_template_directive_1 = require("./templates/cell-template.directive");
var month_cell_template_directive_1 = require("./templates/month-cell-template.directive");
var year_cell_template_directive_1 = require("./templates/year-cell-template.directive");
var decade_cell_template_directive_1 = require("./templates/decade-cell-template.directive");
var century_cell_template_directive_1 = require("./templates/century-cell-template.directive");
var weeknumber_cell_template_directive_1 = require("./templates/weeknumber-cell-template.directive");
var header_title_template_directive_1 = require("./templates/header-title-template.directive");
var navigation_action_enum_1 = require("./models/navigation-action.enum");
var view_enum_1 = require("./models/view.enum");
var min_validator_1 = require("../validators/min.validator");
var max_validator_1 = require("../validators/max.validator");
var disabled_dates_range_validator_1 = require("../validators/disabled-dates-range.validator");
var defaults_1 = require("../defaults");
var util_1 = require("../util");
var rxjs_1 = require("rxjs");
var BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
var TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
/**
 * @hidden
 */
exports.RANGE_CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiViewCalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
exports.RANGE_CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MultiViewCalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * Represents the Kendo UI MultiViewCalendar component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiviewcalendar></kendo-multiviewcalendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
var MultiViewCalendarComponent = /** @class */ (function () {
    function MultiViewCalendarComponent(bus, element, localization, navigator, renderer, cdr, zone, disabledDatesService) {
        this.bus = bus;
        this.element = element;
        this.localization = localization;
        this.navigator = navigator;
        this.renderer = renderer;
        this.cdr = cdr;
        this.zone = zone;
        this.disabledDatesService = disabledDatesService;
        /**
         * @hidden
         */
        this.id = kendo_angular_common_1.guid();
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = false;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_multiviewcalendar %}#toc-validation)).
         */
        this.disabledDatesRangeValidation = false;
        /**
         * Sets or gets the `disabled` property of the Calendar and
         * determines whether the component is active
         * ([see example]({% slug disabled_multiviewcalendar %})).
         */
        this.disabled = false;
        /**
         * Sets or gets the `tabindex` property of the Calendar. Based on the
         * [HTML `tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
         * it determines whether the component is focusable.
         */
        this.tabindex = 0;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_multiviewcalendar %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.month];
        /**
         * Defines the bottommost view, to which the user can navigate
         * ([see example]({% slug dates_multiviewcalendar %}#toc-partial-dates)).
         */
        this.bottomView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.month];
        /**
         * Defines the topmost view, to which the user can navigate.
         */
        this.topView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.century];
        /**
         * Determines whether to display a week number column in the `month` view
         * ([see example]({% slug weeknumcolumn_multiviewcalendar %})).
         */
        this.weekNumber = false;
        /**
         * Sets or gets the `views` property of the Calendar and
         * defines the number of rendered months.
         */
        this.views = 2;
        /**
         * Fires when the active view is changed
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.activeViewChange = new core_1.EventEmitter();
        /**
         * Fires when a view cell is entered
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.cellEnter = new core_1.EventEmitter();
        /**
         * Fires when a view cell is leaved
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.cellLeave = new core_1.EventEmitter();
        /**
         * Fires when the value is changed
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.valueChange = new core_1.EventEmitter();
        this.cellUID = kendo_angular_common_1.guid();
        this.isActive = false;
        this.isHovered = false;
        this.isPrevDisabled = true;
        this.isNextDisabled = true;
        this.prevView = navigation_action_enum_1.Action.PrevView;
        this.nextView = navigation_action_enum_1.Action.NextView;
        this._min = new Date(defaults_1.MIN_DATE);
        this._max = new Date(defaults_1.MAX_DATE);
        this._focusedDate = util_1.getToday();
        this.resolvedPromise = Promise.resolve();
        this.onControlChange = util_1.noop;
        this.onControlTouched = util_1.noop;
        this.onValidatorChange = util_1.noop;
        this.minValidateFn = util_1.noop;
        this.maxValidateFn = util_1.noop;
        this.disabledDatesRangeValidateFn = util_1.noop;
        this.subscriptions = new rxjs_1.Subscription(function () { });
        this.setClasses(element.nativeElement);
    }
    Object.defineProperty(MultiViewCalendarComponent.prototype, "focusedDate", {
        get: function () {
            return this._focusedDate;
        },
        /**
         * Sets or gets the `focusedDate` property of the Calendar and
         * defines the focused date of the component
         * ([see example]({% slug dates_multiviewcalendar %}#toc-focused-dates)).
         *
         * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
         */
        set: function (focusedDate) {
            this._focusedDate = focusedDate || util_1.getToday();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Sets or gets the `min` property of the Calendar and
         * defines the minimum allowed date value.
         * By default, the `min` value is `1900-1-1`.
         */
        set: function (min) {
            this._min = min || new Date(defaults_1.MIN_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Sets or gets the `max` property of the Calendar and
         * defines the maximum allowed date value.
         * By default, the `max` value is `2099-12-31`.
         */
        set: function (max) {
            this._max = max || new Date(defaults_1.MAX_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "value", {
        /**
         * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
         *
         * > The `value` has to be a valid
         * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        get: function () {
            return this._value;
        },
        set: function (candidate) {
            this.verifyValue(candidate);
            this._value = kendo_date_math_1.cloneDate(candidate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "tabIndex", {
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
    Object.defineProperty(MultiViewCalendarComponent.prototype, "disabledDates", {
        /**
         * Sets the dates of the MultiViewCalendar that will be disabled
         * ([see example]({% slug disabled_dates_multiviewcalendar %})).
         */
        set: function (value) {
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "selectionRange", {
        get: function () {
            return this._selectionRange;
        },
        /**
         * Sets or gets the `selectionRange` property of the Calendar and
         * defines the selection range of the component
         * ([see example]({% slug dates_multiviewcalendar %}#toc-selection-range)).
         */
        set: function (range) {
            this._selectionRange = range;
            if (this.disabledDatesRangeValidation) {
                this.onValidatorChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "cellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.cellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "monthCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.monthCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "yearCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.yearCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "decadeCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.decadeCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "centuryCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.centuryCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "weekNumberTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.weekNumberTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "headerTitleTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.headerTitleTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "activeViewEnum", {
        get: function () {
            var activeView = view_enum_1.CalendarViewEnum[this.activeView];
            return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "bottomViewEnum", {
        get: function () {
            return view_enum_1.CalendarViewEnum[this.bottomView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "topViewEnum", {
        get: function () {
            return view_enum_1.CalendarViewEnum[this.topView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "widgetId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "widgetRole", {
        get: function () {
            return 'grid';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "calendarTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "ariaActivedescendant", {
        get: function () {
            return this.cellUID + this.focusedDate.getTime();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleBlur = function () {
        this.onControlTouched();
        this.isActive = false;
        this.isHovered = false; //ensure that hovered is also not active
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleFocus = function () {
        this.isActive = true;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleMouseEnter = function () {
        this.isHovered = true;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleMouseLeave = function () {
        this.isHovered = false;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleMousedown = function (event) {
        event.preventDefault();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleClick = function () {
        if (this.isActive) {
            return;
        }
        this.focus();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.keydown = function (event) {
        var candidate = util_1.dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event), this.activeViewEnum), this.min, this.max);
        if (kendo_date_math_1.isEqual(this.focusedDate, candidate)) {
            return;
        }
        this.focusedDate = candidate;
        event.preventDefault();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.enter = function () {
        this.handleDateChange(this.focusedDate);
    };
    MultiViewCalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setMessages();
        this.subscriptions.add(this.localization.changes.subscribe(function () { return _this.setMessages(); }));
        this.subscriptions.add(this.bus.viewChanged.subscribe(function (_a) {
            var view = _a.view;
            _this.activeView = view_enum_1.CalendarViewEnum[view];
            _this.activeViewChange.emit(_this.activeView);
            _this.cdr.detectChanges();
            _this.updateButtonState();
        }));
    };
    MultiViewCalendarComponent.prototype.ngOnChanges = function (changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        var useValue = util_1.hasExistingValue(changes, 'value') && !util_1.hasExistingValue(changes, 'focusedDate');
        var focusedDate = util_1.dateInRange(kendo_date_math_1.cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !kendo_date_math_1.isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDates || changes.disabledDatesRangeValidation) {
            this.minValidateFn = this.rangeValidation ? min_validator_1.minValidator(this.min) : util_1.noop;
            this.maxValidateFn = this.rangeValidation ? max_validator_1.maxValidator(this.max) : util_1.noop;
            this.disabledDatesRangeValidateFn = this.disabledDatesRangeValidation ? disabled_dates_range_validator_1.disabledDatesRangeValidator(this.disabledDatesService.isDateDisabled) : util_1.noop;
            this.onValidatorChange();
        }
        if (changes.min || changes.max || changes.focusedDate || changes.activeView) {
            this.updateButtonState();
        }
    };
    MultiViewCalendarComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.messagesTimeout);
        this.subscriptions.unsubscribe();
    };
    MultiViewCalendarComponent.prototype.ngAfterViewInit = function () {
        this.updateButtonState();
    };
    /**
     * Focuses the host element of the Calendar.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="multiviewcalendar.focus()">Focus calendar</button>
     *  <kendo-multiviewcalendar #multiviewcalendar></kendo-multiviewcalendar>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    MultiViewCalendarComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the Calendar component.
     */
    MultiViewCalendarComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleDateChange = function (candidate) {
        var canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        var isSameDate = !canNavigateDown && kendo_date_math_1.isEqual(candidate, this.value);
        this.focusedDate = kendo_date_math_1.cloneDate(candidate) || this.focusedDate;
        if (this.disabled || isSameDate) {
            return;
        }
        if (canNavigateDown) {
            this.bus.moveDown(this.activeViewEnum);
            return;
        }
        if (!this.disabledDatesService.isDateDisabled(candidate)) {
            this.value = kendo_date_math_1.cloneDate(candidate);
            this.onControlChange(kendo_date_math_1.cloneDate(candidate));
            this.valueChange.emit(kendo_date_math_1.cloneDate(candidate));
        }
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.writeValue = function (candidate) {
        this.verifyValue(candidate);
        this.focusedDate = util_1.dateInRange(kendo_date_math_1.cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = kendo_date_math_1.cloneDate(candidate);
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesRangeValidateFn(this.selectionRange);
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.activeCellTemplate = function () {
        switch (this.activeViewEnum) {
            case view_enum_1.CalendarViewEnum.month:
                return this.monthCellTemplate || this.cellTemplate;
            case view_enum_1.CalendarViewEnum.year:
                return this.yearCellTemplate;
            case view_enum_1.CalendarViewEnum.decade:
                return this.decadeCellTemplate;
            case view_enum_1.CalendarViewEnum.century:
                return this.centuryCellTemplate;
            default:
                return null;
        }
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.navigate = function (action) {
        this.focusedDate = this.viewList.navigate(action);
        this.updateButtonState();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.emitCellEvent = function (emitter, args) {
        if (kendo_angular_common_1.hasObservers(emitter)) {
            this.zone.run(function () {
                emitter.emit(args);
            });
        }
    };
    MultiViewCalendarComponent.prototype.setClasses = function (element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
        this.renderer.addClass(element, 'k-calendar-range');
    };
    MultiViewCalendarComponent.prototype.setMessages = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            clearTimeout(_this.messagesTimeout);
            _this.messagesTimeout = setTimeout(function () {
                _this.prevButtonTitle = _this.localization.get('prevButtonTitle');
                _this.nextButtonTitle = _this.localization.get('nextButtonTitle');
                _this.cdr.detectChanges();
            });
        });
    };
    MultiViewCalendarComponent.prototype.verifyChanges = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
        if (this.bottomViewEnum > this.topViewEnum) {
            throw new Error("The topView should be greater than bottomView. See " + BOTTOM_VIEW_DOC_LINK + " and " + TOP_VIEW_DOC_LINK + ".");
        }
    };
    MultiViewCalendarComponent.prototype.verifyValue = function (candidate) {
        if (!core_1.isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    MultiViewCalendarComponent.prototype.updateButtonState = function () {
        var _this = this;
        this.resolvedPromise.then(function () {
            _this.isPrevDisabled = !_this.viewList.canNavigate(_this.prevView);
            _this.isNextDisabled = !_this.viewList.canNavigate(_this.nextView);
            _this.cdr.markForCheck();
        });
    };
    MultiViewCalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-multiviewcalendar',
                    providers: [
                        bus_view_service_1.BusViewService,
                        exports.RANGE_CALENDAR_VALUE_ACCESSOR,
                        exports.RANGE_CALENDAR_RANGE_VALIDATORS,
                        kendo_angular_l10n_1.LocalizationService,
                        disabled_dates_service_1.DisabledDatesService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.multiviewcalendar'
                        },
                        navigation_service_1.NavigationService
                    ],
                    selector: 'kendo-multiviewcalendar',
                    template: "\n    <ng-container kendoMultiViewCalendarLocalizedMessages\n        i18n-today=\"kendo.multiviewcalendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n\n        i18n-prevButtonTitle=\"kendo.multiviewcalendar.prevButtonTitle|The label for the previous button in the Multiview calendar\"\n        prevButtonTitle=\"Navigate to previous view\"\n\n        i18n-nextButtonTitle=\"kendo.multiviewcalendar.nextButtonTitle|The label for the next button in the Multiview calendar\"\n        nextButtonTitle=\"Navigate to next view\"\n    >\n    </ng-container>\n    <button\n        class=\"k-button k-prev-view\" type=\"button\"\n        [attr.aria-disabled]=\"isPrevDisabled\"\n        [disabled]=\"isPrevDisabled\"\n        [title]=\"prevButtonTitle\"\n        (click)=\"navigate(prevView)\"\n    >\n        <span class=\"k-icon k-i-arrow-chevron-left\"></span>\n    </button>\n    <kendo-calendar-horizontal\n        [activeView]=\"activeViewEnum\"\n        [isActive]=\"isActive || isHovered\"\n        [cellTemplateRef]=\"activeCellTemplate()?.templateRef\"\n        [headerTitleTemplateRef]=\"headerTitleTemplate?.templateRef\"\n        [weekNumberTemplateRef]=\"weekNumberTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [views]=\"views\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [weekNumber]=\"weekNumber\"\n        [activeRangeEnd]=\"activeRangeEnd\"\n        [selectionRange]=\"selectionRange\"\n        [value]=\"value\"\n        (valueChange)=\"handleDateChange($event)\"\n        (cellEnter)=\"emitCellEvent(cellEnter, $event)\"\n        (cellLeave)=\"emitCellEvent(cellLeave, $event)\"\n    >\n    </kendo-calendar-horizontal>\n    <button\n        class=\"k-button k-next-view\" type=\"button\"\n        [attr.aria-disabled]=\"isNextDisabled\"\n        [disabled]=\"isNextDisabled\"\n        [title]=\"nextButtonTitle\"\n        (click)=\"navigate(nextView)\"\n    >\n        <span class=\"k-icon k-i-arrow-chevron-right\"></span>\n    </button>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarComponent.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService },
        { type: core_1.ElementRef },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.Renderer2 },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.NgZone },
        { type: disabled_dates_service_1.DisabledDatesService }
    ]; };
    MultiViewCalendarComponent.propDecorators = {
        id: [{ type: core_1.Input }],
        focusedDate: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        rangeValidation: [{ type: core_1.Input }],
        disabledDatesRangeValidation: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        disabledDates: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        bottomView: [{ type: core_1.Input }],
        topView: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }],
        activeRangeEnd: [{ type: core_1.Input }],
        selectionRange: [{ type: core_1.Input }],
        views: [{ type: core_1.Input }],
        activeViewChange: [{ type: core_1.Output }],
        cellEnter: [{ type: core_1.Output }],
        cellLeave: [{ type: core_1.Output }],
        valueChange: [{ type: core_1.Output }],
        cellTemplate: [{ type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective, { static: true },] }],
        cellTemplateRef: [{ type: core_1.Input, args: ['cellTemplate',] }],
        monthCellTemplate: [{ type: core_1.ContentChild, args: [month_cell_template_directive_1.MonthCellTemplateDirective, { static: true },] }],
        monthCellTemplateRef: [{ type: core_1.Input, args: ['monthCellTemplate',] }],
        yearCellTemplate: [{ type: core_1.ContentChild, args: [year_cell_template_directive_1.YearCellTemplateDirective, { static: true },] }],
        yearCellTemplateRef: [{ type: core_1.Input, args: ['yearCellTemplate',] }],
        decadeCellTemplate: [{ type: core_1.ContentChild, args: [decade_cell_template_directive_1.DecadeCellTemplateDirective, { static: true },] }],
        decadeCellTemplateRef: [{ type: core_1.Input, args: ['decadeCellTemplate',] }],
        centuryCellTemplate: [{ type: core_1.ContentChild, args: [century_cell_template_directive_1.CenturyCellTemplateDirective, { static: true },] }],
        centuryCellTemplateRef: [{ type: core_1.Input, args: ['centuryCellTemplate',] }],
        weekNumberTemplate: [{ type: core_1.ContentChild, args: [weeknumber_cell_template_directive_1.WeekNumberCellTemplateDirective, { static: true },] }],
        weekNumberTemplateRef: [{ type: core_1.Input, args: ['weekNumberTemplate',] }],
        headerTitleTemplate: [{ type: core_1.ContentChild, args: [header_title_template_directive_1.HeaderTitleTemplateDirective, { static: true },] }],
        headerTitleTemplateRef: [{ type: core_1.Input, args: ['headerTitleTemplate',] }],
        viewList: [{ type: core_1.ViewChild, args: [horizontal_view_list_component_1.HorizontalViewListComponent,] }],
        widgetId: [{ type: core_1.HostBinding, args: ['attr.id',] }],
        widgetRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        calendarTabIndex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        ariaDisabled: [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }, { type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        ariaActivedescendant: [{ type: core_1.HostBinding, args: ['attr.aria-activedescendant',] }],
        handleBlur: [{ type: core_1.HostListener, args: ["blur",] }],
        handleFocus: [{ type: core_1.HostListener, args: ["focus",] }],
        handleMouseEnter: [{ type: core_1.HostListener, args: ["mouseenter",] }],
        handleMouseLeave: [{ type: core_1.HostListener, args: ["mouseleave",] }],
        handleMousedown: [{ type: core_1.HostListener, args: ["mousedown", ['$event'],] }],
        handleClick: [{ type: core_1.HostListener, args: ["click",] }],
        keydown: [{ type: core_1.HostListener, args: ["keydown", ["$event"],] }],
        enter: [{ type: core_1.HostListener, args: ["keydown.enter",] }]
    };
    return MultiViewCalendarComponent;
}());
exports.MultiViewCalendarComponent = MultiViewCalendarComponent;
