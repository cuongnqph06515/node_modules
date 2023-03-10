/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-forward-ref */
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ContentChild, EventEmitter, ElementRef, Renderer2, isDevMode, forwardRef, HostBinding, Input, Output, ViewChild, Optional, NgZone, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneDate, isEqual } from '@progress/kendo-date-math';
import { hasObservers, KendoInput, guid, Keys } from '@progress/kendo-angular-common';
import { NavigationComponent } from './navigation.component';
import { ViewListComponent } from './view-list.component';
import { CalendarDOMService } from './services/dom.service';
import { BusViewService } from './services/bus-view.service';
import { NavigationService } from './services/navigation.service';
import { ScrollSyncService } from './services/scroll-sync.service';
import { CellTemplateDirective } from './templates/cell-template.directive';
import { MonthCellTemplateDirective } from './templates/month-cell-template.directive';
import { YearCellTemplateDirective } from './templates/year-cell-template.directive';
import { DecadeCellTemplateDirective } from './templates/decade-cell-template.directive';
import { CenturyCellTemplateDirective } from './templates/century-cell-template.directive';
import { WeekNumberCellTemplateDirective } from './templates/weeknumber-cell-template.directive';
import { HeaderTitleTemplateDirective } from './templates/header-title-template.directive';
import { NavigationItemTemplateDirective } from './templates/navigation-item-template.directive';
import { PickerService } from '../common/picker.service';
import { CalendarViewEnum } from './models/view.enum';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, getToday, hasExistingValue, noop } from '../util';
import { closest } from '../common/dom-queries';
import { requiresZoneOnBlur, preventDefault, isPresent } from '../common/utils';
import { from as fromPromise } from 'rxjs';
import { DisabledDatesService } from './services/disabled-dates.service';
var BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
var TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
var virtualizationProp = function (x) { return x ? x.virtualization : null; };
var ɵ0 = virtualizationProp;
/**
 * @hidden
 */
export var CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export var CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export var KENDO_INPUT_PROVIDER = {
    provide: KendoInput,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
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
        this.id = guid();
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
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost view to which the user can navigate
         * ([see example]({% slug dates_calendar %}#toc-partial-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost view to which the user can navigate
         * ([see example]({% slug sidebar_calendar %}#toc-partial-dates)).
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
        /**
         * Determines whether to display a week number column in the `month` view
         * ([see example]({% slug weeknumcolumn_calendar %})).
         */
        this.weekNumber = false;
        /**
         * Fires when the active view is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Fires when the active view date is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.activeViewDateChange = new EventEmitter();
        /**
         * Fires when the value is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        this.isActive = false;
        this.cellUID = guid();
        this._min = new Date(MIN_DATE);
        this._max = new Date(MAX_DATE);
        this._focusedDate = getToday();
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
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
            this._focusedDate = focusedDate || getToday();
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
            this._min = min || new Date(MIN_DATE);
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
            this._max = max || new Date(MAX_DATE);
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
            this._value = cloneDate(candidate);
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
            var activeView = CalendarViewEnum[this.activeView];
            return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "bottomViewEnum", {
        get: function () {
            return CalendarViewEnum[this.bottomView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "topViewEnum", {
        get: function () {
            return CalendarViewEnum[this.topView];
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
            _this.activeView = CalendarViewEnum[view];
            _this.emitEvent(_this.activeViewChange, _this.activeView);
            _this.scrollSyncService.configure(view);
            _this.detectChanges(); // requires zone if templates
        });
        this.control = this.injector.get(NgControl, null);
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
        var useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        var focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max || changes.rangeValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
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
        return Boolean(closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleNavigation = function (candidate) {
        if (this.disabled) {
            return;
        }
        var focusTarget = candidate ? new Date(cloneDate(candidate).setDate(1)) : this.focusedDate;
        this.focusedDate = dateInRange(focusTarget, this.min, this.max);
        this.detectChanges();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.onPageChange = function () {
        var _this = this;
        if (!NgZone.isInAngularZone()) {
            if (this.pageChangeSubscription) {
                this.pageChangeSubscription.unsubscribe();
            }
            this.pageChangeSubscription = fromPromise(this.resolvedPromise)
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
        var isSameDate = !canNavigateDown && isEqual(candidate, this.value);
        this.focusedDate = cloneDate(candidate) || this.focusedDate;
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
                _this.value = cloneDate(candidate);
                _this.onControlChange(cloneDate(candidate));
                _this.valueChange.emit(cloneDate(candidate));
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.writeValue = function (candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
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
            case CalendarViewEnum.month:
                return this.monthCellTemplate || this.cellTemplate;
            case CalendarViewEnum.year:
                return this.yearCellTemplate;
            case CalendarViewEnum.decade:
                return this.decadeCellTemplate;
            case CalendarViewEnum.century:
                return this.centuryCellTemplate;
            default:
                return null;
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.emitEvent = function (emitter, args) {
        if (hasObservers(emitter)) {
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
        if (!isDevMode()) {
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
        if (!isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    CalendarComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'blur', this.handleBlur.bind(this)), this.renderer.listen(element, 'focus', this.handleFocus.bind(this)), this.renderer.listen(element, 'mousedown', preventDefault), this.renderer.listen(element, 'click', this.handleClick.bind(this)), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
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
        if (!this.pickerService && requiresZoneOnBlur(this.control)) {
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
        if (!NgZone.isInAngularZone()) {
            this.detectChanges();
        }
        this.emitFocus();
    };
    CalendarComponent.prototype.handleClick = function () {
        if (!this.isActive) {
            if (this.monthView.isScrolled()) {
                this.focusedDate = cloneDate(this.focusedDate); //XXX: forces change detect
                this.detectChanges();
            }
            this.focus();
        }
    };
    CalendarComponent.prototype.handleKeydown = function (args) {
        // reserve the alt + arrow key commands for the picker
        var arrowKeyPressed = [Keys.ArrowUp, Keys.ArrowRight, Keys.ArrowDown, Keys.ArrowLeft].indexOf(args.keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && args.altKey) {
            return;
        }
        var candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(args), this.activeViewEnum), this.min, this.max);
        if (!isEqual(this.focusedDate, candidate)) {
            this.focusedDate = candidate;
            this.detectChanges();
            args.preventDefault();
        }
        if (args.keyCode === Keys.Enter) {
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
        if (!isPresent(this.element)) {
            return;
        }
        var focusedCellId = this.cellUID + this.focusedDate.getTime();
        this.renderer.setAttribute(this.element.nativeElement, 'aria-activedescendant', focusedCellId);
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-calendar',
                    providers: [
                        BusViewService,
                        CALENDAR_VALUE_ACCESSOR,
                        CALENDAR_RANGE_VALIDATORS,
                        KENDO_INPUT_PROVIDER,
                        LocalizationService,
                        DisabledDatesService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.calendar'
                        },
                        NavigationService,
                        ScrollSyncService
                    ],
                    selector: 'kendo-calendar',
                    template: "\n    <ng-container kendoCalendarLocalizedMessages\n        i18n-today=\"kendo.calendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n    >\n    </ng-container>\n    <kendo-calendar-navigation\n        *ngIf=\"navigation\"\n        [activeView]=\"activeViewEnum\"\n        [focusedDate]=\"focusedDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [templateRef]=\"navigationItemTemplate?.templateRef\"\n        (valueChange)=\"handleNavigation($event)\"\n        (pageChange)=\"onPageChange()\"\n    >\n    </kendo-calendar-navigation>\n    <kendo-calendar-viewlist\n        [activeView]=\"activeViewEnum\"\n        [isActive]=\"isActive\"\n        [cellTemplateRef]=\"activeCellTemplate()?.templateRef\"\n        [headerTitleTemplateRef]=\"headerTitleTemplate?.templateRef\"\n        [weekNumberTemplateRef]=\"weekNumberTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [weekNumber]=\"weekNumber\"\n        [value]=\"value\"\n        (valueChange)=\"handleDateChange($event)\"\n        (activeDateChange)=\"emitEvent(activeViewDateChange, $event)\"\n        (pageChange)=\"onPageChange()\"\n    >\n    </kendo-calendar-viewlist>\n    <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: CalendarDOMService },
        { type: ElementRef },
        { type: NavigationService },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Injector },
        { type: ScrollSyncService },
        { type: DisabledDatesService },
        { type: PickerService, decorators: [{ type: Optional }] }
    ]; };
    CalendarComponent.propDecorators = {
        id: [{ type: Input }],
        focusedDate: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        rangeValidation: [{ type: Input }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        disabledDates: [{ type: Input }],
        navigation: [{ type: Input }],
        activeView: [{ type: Input }],
        bottomView: [{ type: Input }],
        topView: [{ type: Input }],
        weekNumber: [{ type: Input }, { type: HostBinding, args: ['class.k-week-number',] }],
        activeViewChange: [{ type: Output }],
        activeViewDateChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective, { static: true },] }],
        cellTemplateRef: [{ type: Input, args: ['cellTemplate',] }],
        monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective, { static: true },] }],
        monthCellTemplateRef: [{ type: Input, args: ['monthCellTemplate',] }],
        yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective, { static: true },] }],
        yearCellTemplateRef: [{ type: Input, args: ['yearCellTemplate',] }],
        decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective, { static: true },] }],
        decadeCellTemplateRef: [{ type: Input, args: ['decadeCellTemplate',] }],
        centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective, { static: true },] }],
        centuryCellTemplateRef: [{ type: Input, args: ['centuryCellTemplate',] }],
        weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective, { static: true },] }],
        weekNumberTemplateRef: [{ type: Input, args: ['weekNumberTemplate',] }],
        headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective, { static: true },] }],
        headerTitleTemplateRef: [{ type: Input, args: ['headerTitleTemplate',] }],
        navigationItemTemplate: [{ type: ContentChild, args: [NavigationItemTemplateDirective, { static: true },] }],
        navigationItemTemplateRef: [{ type: Input, args: ['navigationItemTemplate',] }],
        navigationView: [{ type: ViewChild, args: [NavigationComponent,] }],
        monthView: [{ type: ViewChild, args: [ViewListComponent,] }],
        widgetId: [{ type: HostBinding, args: ['attr.id',] }],
        widgetRole: [{ type: HostBinding, args: ['attr.role',] }],
        calendarTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] }]
    };
    return CalendarComponent;
}());
export { CalendarComponent };
export { ɵ0 };
