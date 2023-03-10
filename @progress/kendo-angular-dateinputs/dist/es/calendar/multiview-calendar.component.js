/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-forward-ref */
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ContentChild, EventEmitter, ElementRef, Renderer2, isDevMode, forwardRef, HostBinding, HostListener, Input, Output, ViewChild, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneDate, isEqual } from '@progress/kendo-date-math';
import { hasObservers, guid } from '@progress/kendo-angular-common';
import { HorizontalViewListComponent } from './horizontal-view-list.component';
import { BusViewService } from './services/bus-view.service';
import { NavigationService } from './services/navigation.service';
import { DisabledDatesService } from './services/disabled-dates.service';
import { CellTemplateDirective } from './templates/cell-template.directive';
import { MonthCellTemplateDirective } from './templates/month-cell-template.directive';
import { YearCellTemplateDirective } from './templates/year-cell-template.directive';
import { DecadeCellTemplateDirective } from './templates/decade-cell-template.directive';
import { CenturyCellTemplateDirective } from './templates/century-cell-template.directive';
import { WeekNumberCellTemplateDirective } from './templates/weeknumber-cell-template.directive';
import { HeaderTitleTemplateDirective } from './templates/header-title-template.directive';
import { Action } from './models/navigation-action.enum';
import { CalendarViewEnum } from './models/view.enum';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { disabledDatesRangeValidator } from '../validators/disabled-dates-range.validator';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, getToday, hasExistingValue, noop } from '../util';
import { Subscription } from 'rxjs';
var BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
var TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
/**
 * @hidden
 */
export var RANGE_CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiViewCalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export var RANGE_CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MultiViewCalendarComponent; }) //tslint:disable-line:no-use-before-declare
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
        this.id = guid();
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
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost view, to which the user can navigate
         * ([see example]({% slug dates_multiviewcalendar %}#toc-partial-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost view, to which the user can navigate.
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
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
        this.activeViewChange = new EventEmitter();
        /**
         * Fires when a view cell is entered
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.cellEnter = new EventEmitter();
        /**
         * Fires when a view cell is leaved
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.cellLeave = new EventEmitter();
        /**
         * Fires when the value is changed
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        this.cellUID = guid();
        this.isActive = false;
        this.isHovered = false;
        this.isPrevDisabled = true;
        this.isNextDisabled = true;
        this.prevView = Action.PrevView;
        this.nextView = Action.NextView;
        this._min = new Date(MIN_DATE);
        this._max = new Date(MAX_DATE);
        this._focusedDate = getToday();
        this.resolvedPromise = Promise.resolve();
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesRangeValidateFn = noop;
        this.subscriptions = new Subscription(function () { });
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
            this._focusedDate = focusedDate || getToday();
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
            this._min = min || new Date(MIN_DATE);
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
            this._max = max || new Date(MAX_DATE);
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
            this._value = cloneDate(candidate);
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
            var activeView = CalendarViewEnum[this.activeView];
            return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "bottomViewEnum", {
        get: function () {
            return CalendarViewEnum[this.bottomView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "topViewEnum", {
        get: function () {
            return CalendarViewEnum[this.topView];
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
        var candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event), this.activeViewEnum), this.min, this.max);
        if (isEqual(this.focusedDate, candidate)) {
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
            _this.activeView = CalendarViewEnum[view];
            _this.activeViewChange.emit(_this.activeView);
            _this.cdr.detectChanges();
            _this.updateButtonState();
        }));
    };
    MultiViewCalendarComponent.prototype.ngOnChanges = function (changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        var useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        var focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDates || changes.disabledDatesRangeValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesRangeValidateFn = this.disabledDatesRangeValidation ? disabledDatesRangeValidator(this.disabledDatesService.isDateDisabled) : noop;
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
        var isSameDate = !canNavigateDown && isEqual(candidate, this.value);
        this.focusedDate = cloneDate(candidate) || this.focusedDate;
        if (this.disabled || isSameDate) {
            return;
        }
        if (canNavigateDown) {
            this.bus.moveDown(this.activeViewEnum);
            return;
        }
        if (!this.disabledDatesService.isDateDisabled(candidate)) {
            this.value = cloneDate(candidate);
            this.onControlChange(cloneDate(candidate));
            this.valueChange.emit(cloneDate(candidate));
        }
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.writeValue = function (candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
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
    MultiViewCalendarComponent.prototype.navigate = function (action) {
        this.focusedDate = this.viewList.navigate(action);
        this.updateButtonState();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.emitCellEvent = function (emitter, args) {
        if (hasObservers(emitter)) {
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
    MultiViewCalendarComponent.prototype.verifyValue = function (candidate) {
        if (!isDevMode()) {
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-multiviewcalendar',
                    providers: [
                        BusViewService,
                        RANGE_CALENDAR_VALUE_ACCESSOR,
                        RANGE_CALENDAR_RANGE_VALIDATORS,
                        LocalizationService,
                        DisabledDatesService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.multiviewcalendar'
                        },
                        NavigationService
                    ],
                    selector: 'kendo-multiviewcalendar',
                    template: "\n    <ng-container kendoMultiViewCalendarLocalizedMessages\n        i18n-today=\"kendo.multiviewcalendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n\n        i18n-prevButtonTitle=\"kendo.multiviewcalendar.prevButtonTitle|The label for the previous button in the Multiview calendar\"\n        prevButtonTitle=\"Navigate to previous view\"\n\n        i18n-nextButtonTitle=\"kendo.multiviewcalendar.nextButtonTitle|The label for the next button in the Multiview calendar\"\n        nextButtonTitle=\"Navigate to next view\"\n    >\n    </ng-container>\n    <button\n        class=\"k-button k-prev-view\" type=\"button\"\n        [attr.aria-disabled]=\"isPrevDisabled\"\n        [disabled]=\"isPrevDisabled\"\n        [title]=\"prevButtonTitle\"\n        (click)=\"navigate(prevView)\"\n    >\n        <span class=\"k-icon k-i-arrow-chevron-left\"></span>\n    </button>\n    <kendo-calendar-horizontal\n        [activeView]=\"activeViewEnum\"\n        [isActive]=\"isActive || isHovered\"\n        [cellTemplateRef]=\"activeCellTemplate()?.templateRef\"\n        [headerTitleTemplateRef]=\"headerTitleTemplate?.templateRef\"\n        [weekNumberTemplateRef]=\"weekNumberTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [views]=\"views\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [weekNumber]=\"weekNumber\"\n        [activeRangeEnd]=\"activeRangeEnd\"\n        [selectionRange]=\"selectionRange\"\n        [value]=\"value\"\n        (valueChange)=\"handleDateChange($event)\"\n        (cellEnter)=\"emitCellEvent(cellEnter, $event)\"\n        (cellLeave)=\"emitCellEvent(cellLeave, $event)\"\n    >\n    </kendo-calendar-horizontal>\n    <button\n        class=\"k-button k-next-view\" type=\"button\"\n        [attr.aria-disabled]=\"isNextDisabled\"\n        [disabled]=\"isNextDisabled\"\n        [title]=\"nextButtonTitle\"\n        (click)=\"navigate(nextView)\"\n    >\n        <span class=\"k-icon k-i-arrow-chevron-right\"></span>\n    </button>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ElementRef },
        { type: LocalizationService },
        { type: NavigationService },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: DisabledDatesService }
    ]; };
    MultiViewCalendarComponent.propDecorators = {
        id: [{ type: Input }],
        focusedDate: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        rangeValidation: [{ type: Input }],
        disabledDatesRangeValidation: [{ type: Input }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        disabledDates: [{ type: Input }],
        activeView: [{ type: Input }],
        bottomView: [{ type: Input }],
        topView: [{ type: Input }],
        weekNumber: [{ type: Input }],
        activeRangeEnd: [{ type: Input }],
        selectionRange: [{ type: Input }],
        views: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        cellEnter: [{ type: Output }],
        cellLeave: [{ type: Output }],
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
        viewList: [{ type: ViewChild, args: [HorizontalViewListComponent,] }],
        widgetId: [{ type: HostBinding, args: ['attr.id',] }],
        widgetRole: [{ type: HostBinding, args: ['attr.role',] }],
        calendarTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] }],
        ariaActivedescendant: [{ type: HostBinding, args: ['attr.aria-activedescendant',] }],
        handleBlur: [{ type: HostListener, args: ["blur",] }],
        handleFocus: [{ type: HostListener, args: ["focus",] }],
        handleMouseEnter: [{ type: HostListener, args: ["mouseenter",] }],
        handleMouseLeave: [{ type: HostListener, args: ["mouseleave",] }],
        handleMousedown: [{ type: HostListener, args: ["mousedown", ['$event'],] }],
        handleClick: [{ type: HostListener, args: ["click",] }],
        keydown: [{ type: HostListener, args: ["keydown", ["$event"],] }],
        enter: [{ type: HostListener, args: ["keydown.enter",] }]
    };
    return MultiViewCalendarComponent;
}());
export { MultiViewCalendarComponent };
