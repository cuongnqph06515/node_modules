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
var navigation_component_1 = require("./navigation.component");
var view_list_component_1 = require("./view-list.component");
var dom_service_1 = require("./services/dom.service");
var bus_view_service_1 = require("./services/bus-view.service");
var navigation_service_1 = require("./services/navigation.service");
var scroll_sync_service_1 = require("./services/scroll-sync.service");
var cell_template_directive_1 = require("./templates/cell-template.directive");
var month_cell_template_directive_1 = require("./templates/month-cell-template.directive");
var year_cell_template_directive_1 = require("./templates/year-cell-template.directive");
var decade_cell_template_directive_1 = require("./templates/decade-cell-template.directive");
var century_cell_template_directive_1 = require("./templates/century-cell-template.directive");
var weeknumber_cell_template_directive_1 = require("./templates/weeknumber-cell-template.directive");
var header_title_template_directive_1 = require("./templates/header-title-template.directive");
var navigation_item_template_directive_1 = require("./templates/navigation-item-template.directive");
var picker_service_1 = require("../common/picker.service");
var view_enum_1 = require("./models/view.enum");
var min_validator_1 = require("../validators/min.validator");
var max_validator_1 = require("../validators/max.validator");
var defaults_1 = require("../defaults");
var util_1 = require("../util");
var dom_queries_1 = require("../common/dom-queries");
var utils_1 = require("../common/utils");
var rxjs_1 = require("rxjs");
var disabled_dates_service_1 = require("./services/disabled-dates.service");
var BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
var TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
var virtualizationProp = function (x) { return x ? x.virtualization : null; };
var ɵ0 = virtualizationProp;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
exports.CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
exports.KENDO_INPUT_PROVIDER = {
    provide: kendo_angular_common_1.KendoInput,
    useExisting: core_1.forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * Represents the [Kendo UI Calendar component for Angular]({% slug overview_calendar %}#toc-basic-usage).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-calendar></kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(bus, dom, element, navigator, renderer, cdr, ngZone, injector, scrollSyncService, disabledDatesService, pickerService) {
        this.bus = bus;
        this.dom = dom;
        this.element = element;
        this.navigator = navigator;
        this.renderer = renderer;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.injector = injector;
        this.scrollSyncService = scrollSyncService;
        this.disabledDatesService = disabledDatesService;
        this.pickerService = pickerService;
        /**
         * @hidden
         */
        this.id = kendo_angular_common_1.guid();
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = false;
        /**
         * Sets or gets the `disabled` property of the Calendar and
         * determines whether the component is active
         * ([see example]({% slug disabled_calendar %})).
         */
        this.disabled = false;
        /**
         * Sets or gets the `tabindex` property of the Calendar. Based on the
         * [HTML `tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
         * it determines whether the component is focusable.
         */
        this.tabindex = 0;
        /**
         * Sets or gets the `navigation` property of the Calendar
         * and determines whether the navigation side-bar will be displayed
         * ([see example]({% slug sidebar_calendar %})).
         */
        this.navigation = true;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_calendar %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.month];
        /**
         * Defines the bottommost view to which the user can navigate
         * ([see example]({% slug dates_calendar %}#toc-partial-dates)).
         */
        this.bottomView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.month];
        /**
         * Defines the topmost view to which the user can navigate
         * ([see example]({% slug sidebar_calendar %}#toc-partial-dates)).
         */
        this.topView = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum.century];
        /**
         * Determines whether to display a week number column in the `month` view
         * ([see example]({% slug weeknumcolumn_calendar %})).
         */
        this.weekNumber = false;
        /**
         * Fires when the active view is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.activeViewChange = new core_1.EventEmitter();
        /**
         * Fires when the active view date is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.activeViewDateChange = new core_1.EventEmitter();
        /**
         * Fires when the value is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.valueChange = new core_1.EventEmitter();
        this.isActive = false;
        this.cellUID = kendo_angular_common_1.guid();
        this._min = new Date(defaults_1.MIN_DATE);
        this._max = new Date(defaults_1.MAX_DATE);
        this._focusedDate = util_1.getToday();
        this.onControlChange = util_1.noop;
        this.onControlTouched = util_1.noop;
        this.onValidatorChange = util_1.noop;
        this.minValidateFn = util_1.noop;
        this.maxValidateFn = util_1.noop;
        this.syncNavigation = true;
        this.domEvents = [];
        this.resolvedPromise = Promise.resolve(null);
        this.destroyed = false;
        this.setClasses(element.nativeElement);
        if (this.pickerService) {
            this.pickerService.calendar = this;
        }
    }
    Object.defineProperty(CalendarComponent.prototype, "focusedDate", {
        get: function () {
            return this._focusedDate;
        },
        /**
         * Sets or gets the `focusedDate` property of the Calendar and
         * defines the focused date of the component
         * ([see example]({% slug dates_calendar %}#toc-focused-dates)).
         *
         * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
         */
        set: function (focusedDate) {
            this._focusedDate = focusedDate || util_1.getToday();
            this.setAriaActivedescendant();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Sets or gets the `min` property of the Calendar and
         * defines the minimum allowed date value
         * ([see example]({% slug dateranges_calendar %})).
         * By default, the `min` value is `1900-1-1`.
         */
        set: function (min) {
            this._min = min || new Date(defaults_1.MIN_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Sets or gets the `max` property of the Calendar and
         * defines the maximum allowed date value
         * ([see example]({% slug dateranges_calendar %})).
         * By default, the `max` value is `2099-12-31`.
         */
        set: function (max) {
            this._max = max || new Date(defaults_1.MAX_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "value", {
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
    Object.defineProperty(CalendarComponent.prototype, "tabIndex", {
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
    Object.defineProperty(CalendarComponent.prototype, "disabledDates", {
        /**
         * Sets the dates of the Calendar that will be disabled
         * ([see example]({% slug disabled_dates_calendar %})).
         */
        set: function (value) {
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "cellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.cellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "monthCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.monthCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "yearCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.yearCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "decadeCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.decadeCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "centuryCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.centuryCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "weekNumberTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.weekNumberTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "headerTitleTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.headerTitleTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "navigationItemTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.navigationItemTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "activeViewEnum", {
        get: function () {
            var activeView = view_enum_1.CalendarViewEnum[this.activeView];
            return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "bottomViewEnum", {
        get: function () {
            return view_enum_1.CalendarViewEnum[this.bottomView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "topViewEnum", {
        get: function () {
            return view_enum_1.CalendarViewEnum[this.topView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "widgetId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "widgetRole", {
        get: function () {
            return 'grid';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "calendarTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dom.calculateHeights(this.element.nativeElement);
        this.scrollSyncService.configure(this.activeViewEnum);
        this.viewChangeSubscription = this.bus.viewChanged.subscribe(function (_a) {
            var view = _a.view;
            _this.activeView = view_enum_1.CalendarViewEnum[view];
            _this.emitEvent(_this.activeViewChange, _this.activeView);
            _this.scrollSyncService.configure(view);
            _this.detectChanges(); // requires zone if templates
        });
        this.control = this.injector.get(forms_1.NgControl, null);
        if (this.element) {
            this.ngZone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        this.scrollSyncService.configure(this.activeViewEnum);
        var useValue = util_1.hasExistingValue(changes, 'value') && !util_1.hasExistingValue(changes, 'focusedDate');
        var focusedDate = util_1.dateInRange(kendo_date_math_1.cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !kendo_date_math_1.isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max || changes.rangeValidation) {
            this.minValidateFn = this.rangeValidation ? min_validator_1.minValidator(this.min) : util_1.noop;
            this.maxValidateFn = this.rangeValidation ? max_validator_1.maxValidator(this.max) : util_1.noop;
            this.onValidatorChange();
        }
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        this.setAriaActivedescendant();
    };
    CalendarComponent.prototype.ngAfterViewChecked = function () {
        if (!this.syncNavigation) {
            return;
        }
        this.syncNavigation = false;
        this.scrollSyncService.sync(virtualizationProp(this.navigationView), virtualizationProp(this.monthView));
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.scrollSyncService.destroy();
        this.viewChangeSubscription.unsubscribe();
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
        if (this.pickerService) {
            this.pickerService.calendar = null;
        }
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
        this.destroyed = true;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.onResize = function () {
        this.focusedDate = new Date(this.focusedDate);
        this.cdr.detectChanges();
    };
    /**
     * Focuses the host element of the Calendar.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="calendar.focus()">Focus calendar</button>
     *  <kendo-calendar #calendar></kendo-calendar>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    CalendarComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the Calendar component.
     */
    CalendarComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.containsElement = function (element) {
        var _this = this;
        return Boolean(dom_queries_1.closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleNavigation = function (candidate) {
        if (this.disabled) {
            return;
        }
        var focusTarget = candidate ? new Date(kendo_date_math_1.cloneDate(candidate).setDate(1)) : this.focusedDate;
        this.focusedDate = util_1.dateInRange(focusTarget, this.min, this.max);
        this.detectChanges();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.onPageChange = function () {
        var _this = this;
        if (!core_1.NgZone.isInAngularZone()) {
            if (this.pageChangeSubscription) {
                this.pageChangeSubscription.unsubscribe();
            }
            this.pageChangeSubscription = rxjs_1.from(this.resolvedPromise)
                .subscribe(function () {
                _this.detectChanges(); // requires zone if templates
            });
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleDateChange = function (candidate) {
        var _this = this;
        var canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        var isSameDate = !canNavigateDown && kendo_date_math_1.isEqual(candidate, this.value);
        this.focusedDate = kendo_date_math_1.cloneDate(candidate) || this.focusedDate;
        if (this.disabled) {
            return;
        }
        if (isSameDate) {
            this.emitSameDate();
            return;
        }
        if (canNavigateDown) {
            this.bus.moveDown(this.activeViewEnum);
            return;
        }
        if (!this.disabledDatesService.isDateDisabled(candidate)) {
            this.ngZone.run(function () {
                _this.value = kendo_date_math_1.cloneDate(candidate);
                _this.onControlChange(kendo_date_math_1.cloneDate(candidate));
                _this.valueChange.emit(kendo_date_math_1.cloneDate(candidate));
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.writeValue = function (candidate) {
        this.verifyValue(candidate);
        this.focusedDate = util_1.dateInRange(kendo_date_math_1.cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = kendo_date_math_1.cloneDate(candidate);
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.activeCellTemplate = function () {
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
    CalendarComponent.prototype.emitEvent = function (emitter, args) {
        if (kendo_angular_common_1.hasObservers(emitter)) {
            this.ngZone.run(function () {
                emitter.emit(args);
            });
        }
    };
    CalendarComponent.prototype.setClasses = function (element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
    };
    CalendarComponent.prototype.verifyChanges = function () {
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
    CalendarComponent.prototype.verifyValue = function (candidate) {
        if (!core_1.isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    CalendarComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'blur', this.handleBlur.bind(this)), this.renderer.listen(element, 'focus', this.handleFocus.bind(this)), this.renderer.listen(element, 'mousedown', utils_1.preventDefault), this.renderer.listen(element, 'click', this.handleClick.bind(this)), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
    };
    CalendarComponent.prototype.emitBlur = function (args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    };
    CalendarComponent.prototype.emitFocus = function () {
        if (this.pickerService) {
            this.pickerService.onFocus.emit();
        }
    };
    CalendarComponent.prototype.handleBlur = function (args) {
        var _this = this;
        this.isActive = false;
        // the injector can get the NgControl instance of the parent component (for example, the DateTimePicker)
        // and enters the zone for no reason because the parent component is still untouched
        if (!this.pickerService && utils_1.requiresZoneOnBlur(this.control)) {
            this.ngZone.run(function () {
                _this.onControlTouched();
                _this.emitBlur(args);
                _this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
            this.detectChanges();
        }
    };
    CalendarComponent.prototype.handleFocus = function () {
        this.isActive = true;
        if (!core_1.NgZone.isInAngularZone()) {
            this.detectChanges();
        }
        this.emitFocus();
    };
    CalendarComponent.prototype.handleClick = function () {
        if (!this.isActive) {
            if (this.monthView.isScrolled()) {
                this.focusedDate = kendo_date_math_1.cloneDate(this.focusedDate); //XXX: forces change detect
                this.detectChanges();
            }
            this.focus();
        }
    };
    CalendarComponent.prototype.handleKeydown = function (args) {
        // reserve the alt + arrow key commands for the picker
        var arrowKeyPressed = [kendo_angular_common_1.Keys.ArrowUp, kendo_angular_common_1.Keys.ArrowRight, kendo_angular_common_1.Keys.ArrowDown, kendo_angular_common_1.Keys.ArrowLeft].indexOf(args.keyCode) !== -1;
        if (utils_1.isPresent(this.pickerService) && arrowKeyPressed && args.altKey) {
            return;
        }
        var candidate = util_1.dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(args), this.activeViewEnum), this.min, this.max);
        if (!kendo_date_math_1.isEqual(this.focusedDate, candidate)) {
            this.focusedDate = candidate;
            this.detectChanges();
            args.preventDefault();
        }
        if (args.keyCode === kendo_angular_common_1.Keys.Enter) {
            this.handleDateChange(this.focusedDate);
        }
    };
    CalendarComponent.prototype.detectChanges = function () {
        if (!this.destroyed) {
            this.cdr.detectChanges();
        }
    };
    CalendarComponent.prototype.emitSameDate = function () {
        if (this.pickerService) {
            this.pickerService.sameDateSelected.emit();
        }
    };
    CalendarComponent.prototype.setAriaActivedescendant = function () {
        if (!utils_1.isPresent(this.element)) {
            return;
        }
        var focusedCellId = this.cellUID + this.focusedDate.getTime();
        this.renderer.setAttribute(this.element.nativeElement, 'aria-activedescendant', focusedCellId);
    };
    CalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-calendar',
                    providers: [
                        bus_view_service_1.BusViewService,
                        exports.CALENDAR_VALUE_ACCESSOR,
                        exports.CALENDAR_RANGE_VALIDATORS,
                        exports.KENDO_INPUT_PROVIDER,
                        kendo_angular_l10n_1.LocalizationService,
                        disabled_dates_service_1.DisabledDatesService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.calendar'
                        },
                        navigation_service_1.NavigationService,
                        scroll_sync_service_1.ScrollSyncService
                    ],
                    selector: 'kendo-calendar',
                    template: "\n    <ng-container kendoCalendarLocalizedMessages\n        i18n-today=\"kendo.calendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n    >\n    </ng-container>\n    <kendo-calendar-navigation\n        *ngIf=\"navigation\"\n        [activeView]=\"activeViewEnum\"\n        [focusedDate]=\"focusedDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [templateRef]=\"navigationItemTemplate?.templateRef\"\n        (valueChange)=\"handleNavigation($event)\"\n        (pageChange)=\"onPageChange()\"\n    >\n    </kendo-calendar-navigation>\n    <kendo-calendar-viewlist\n        [activeView]=\"activeViewEnum\"\n        [isActive]=\"isActive\"\n        [cellTemplateRef]=\"activeCellTemplate()?.templateRef\"\n        [headerTitleTemplateRef]=\"headerTitleTemplate?.templateRef\"\n        [weekNumberTemplateRef]=\"weekNumberTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [weekNumber]=\"weekNumber\"\n        [value]=\"value\"\n        (valueChange)=\"handleDateChange($event)\"\n        (activeDateChange)=\"emitEvent(activeViewDateChange, $event)\"\n        (pageChange)=\"onPageChange()\"\n    >\n    </kendo-calendar-viewlist>\n    <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService },
        { type: dom_service_1.CalendarDOMService },
        { type: core_1.ElementRef },
        { type: navigation_service_1.NavigationService },
        { type: core_1.Renderer2 },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.NgZone },
        { type: core_1.Injector },
        { type: scroll_sync_service_1.ScrollSyncService },
        { type: disabled_dates_service_1.DisabledDatesService },
        { type: picker_service_1.PickerService, decorators: [{ type: core_1.Optional }] }
    ]; };
    CalendarComponent.propDecorators = {
        id: [{ type: core_1.Input }],
        focusedDate: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        rangeValidation: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        disabledDates: [{ type: core_1.Input }],
        navigation: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        bottomView: [{ type: core_1.Input }],
        topView: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }, { type: core_1.HostBinding, args: ['class.k-week-number',] }],
        activeViewChange: [{ type: core_1.Output }],
        activeViewDateChange: [{ type: core_1.Output }],
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
        navigationItemTemplate: [{ type: core_1.ContentChild, args: [navigation_item_template_directive_1.NavigationItemTemplateDirective, { static: true },] }],
        navigationItemTemplateRef: [{ type: core_1.Input, args: ['navigationItemTemplate',] }],
        navigationView: [{ type: core_1.ViewChild, args: [navigation_component_1.NavigationComponent,] }],
        monthView: [{ type: core_1.ViewChild, args: [view_list_component_1.ViewListComponent,] }],
        widgetId: [{ type: core_1.HostBinding, args: ['attr.id',] }],
        widgetRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        calendarTabIndex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        ariaDisabled: [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }, { type: core_1.HostBinding, args: ['class.k-state-disabled',] }]
    };
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
