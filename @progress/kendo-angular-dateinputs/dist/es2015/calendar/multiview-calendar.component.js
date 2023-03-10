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
const BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
const TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
const MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
const MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
const VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
/**
 * @hidden
 */
export const RANGE_CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiViewCalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export const RANGE_CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MultiViewCalendarComponent) //tslint:disable-line:no-use-before-declare
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
export class MultiViewCalendarComponent {
    constructor(bus, element, localization, navigator, renderer, cdr, zone, disabledDatesService) {
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
        this.subscriptions = new Subscription(() => { });
        this.setClasses(element.nativeElement);
    }
    /**
     * Sets or gets the `focusedDate` property of the Calendar and
     * defines the focused date of the component
     * ([see example]({% slug dates_multiviewcalendar %}#toc-focused-dates)).
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    set focusedDate(focusedDate) {
        this._focusedDate = focusedDate || getToday();
    }
    get focusedDate() {
        return this._focusedDate;
    }
    /**
     * Sets or gets the `min` property of the Calendar and
     * defines the minimum allowed date value.
     * By default, the `min` value is `1900-1-1`.
     */
    set min(min) {
        this._min = min || new Date(MIN_DATE);
    }
    get min() {
        return this._min;
    }
    /**
     * Sets or gets the `max` property of the Calendar and
     * defines the maximum allowed date value.
     * By default, the `max` value is `2099-12-31`.
     */
    set max(max) {
        this._max = max || new Date(MAX_DATE);
    }
    get max() {
        return this._max;
    }
    /**
     * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    get value() {
        return this._value;
    }
    set value(candidate) {
        this.verifyValue(candidate);
        this._value = cloneDate(candidate);
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
     * Sets the dates of the MultiViewCalendar that will be disabled
     * ([see example]({% slug disabled_dates_multiviewcalendar %})).
     */
    set disabledDates(value) {
        this.disabledDatesService.initialize(value);
    }
    /**
     * Sets or gets the `selectionRange` property of the Calendar and
     * defines the selection range of the component
     * ([see example]({% slug dates_multiviewcalendar %}#toc-selection-range)).
     */
    set selectionRange(range) {
        this._selectionRange = range;
        if (this.disabledDatesRangeValidation) {
            this.onValidatorChange();
        }
    }
    get selectionRange() {
        return this._selectionRange;
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
    get activeViewEnum() {
        const activeView = CalendarViewEnum[this.activeView];
        return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
    }
    get bottomViewEnum() {
        return CalendarViewEnum[this.bottomView];
    }
    get topViewEnum() {
        return CalendarViewEnum[this.topView];
    }
    get widgetId() {
        return this.id;
    }
    get widgetRole() {
        return 'grid';
    }
    get calendarTabIndex() {
        return this.disabled ? undefined : this.tabIndex;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    get ariaActivedescendant() {
        return this.cellUID + this.focusedDate.getTime();
    }
    /**
     * @hidden
     */
    handleBlur() {
        this.onControlTouched();
        this.isActive = false;
        this.isHovered = false; //ensure that hovered is also not active
    }
    /**
     * @hidden
     */
    handleFocus() {
        this.isActive = true;
    }
    /**
     * @hidden
     */
    handleMouseEnter() {
        this.isHovered = true;
    }
    /**
     * @hidden
     */
    handleMouseLeave() {
        this.isHovered = false;
    }
    /**
     * @hidden
     */
    handleMousedown(event) {
        event.preventDefault();
    }
    /**
     * @hidden
     */
    handleClick() {
        if (this.isActive) {
            return;
        }
        this.focus();
    }
    /**
     * @hidden
     */
    keydown(event) {
        const candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event), this.activeViewEnum), this.min, this.max);
        if (isEqual(this.focusedDate, candidate)) {
            return;
        }
        this.focusedDate = candidate;
        event.preventDefault();
    }
    /**
     * @hidden
     */
    enter() {
        this.handleDateChange(this.focusedDate);
    }
    ngOnInit() {
        this.setMessages();
        this.subscriptions.add(this.localization.changes.subscribe(() => this.setMessages()));
        this.subscriptions.add(this.bus.viewChanged.subscribe(({ view }) => {
            this.activeView = CalendarViewEnum[view];
            this.activeViewChange.emit(this.activeView);
            this.cdr.detectChanges();
            this.updateButtonState();
        }));
    }
    ngOnChanges(changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        const useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        const focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
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
    }
    ngOnDestroy() {
        clearTimeout(this.messagesTimeout);
        this.subscriptions.unsubscribe();
    }
    ngAfterViewInit() {
        this.updateButtonState();
    }
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
    focus() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    }
    /**
     * Blurs the Calendar component.
     */
    blur() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    }
    /**
     * @hidden
     */
    handleDateChange(candidate) {
        const canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        const isSameDate = !canNavigateDown && isEqual(candidate, this.value);
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
    }
    /**
     * @hidden
     */
    writeValue(candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
        this.cdr.markForCheck();
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
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesRangeValidateFn(this.selectionRange);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * @hidden
     */
    activeCellTemplate() {
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
    }
    /**
     * @hidden
     */
    navigate(action) {
        this.focusedDate = this.viewList.navigate(action);
        this.updateButtonState();
    }
    /**
     * @hidden
     */
    emitCellEvent(emitter, args) {
        if (hasObservers(emitter)) {
            this.zone.run(() => {
                emitter.emit(args);
            });
        }
    }
    setClasses(element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
        this.renderer.addClass(element, 'k-calendar-range');
    }
    setMessages() {
        this.zone.runOutsideAngular(() => {
            clearTimeout(this.messagesTimeout);
            this.messagesTimeout = setTimeout(() => {
                this.prevButtonTitle = this.localization.get('prevButtonTitle');
                this.nextButtonTitle = this.localization.get('nextButtonTitle');
                this.cdr.detectChanges();
            });
        });
    }
    verifyChanges() {
        if (!isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK} and ${MAX_DOC_LINK}.`);
        }
        if (this.bottomViewEnum > this.topViewEnum) {
            throw new Error(`The topView should be greater than bottomView. See ${BOTTOM_VIEW_DOC_LINK} and ${TOP_VIEW_DOC_LINK}.`);
        }
    }
    verifyValue(candidate) {
        if (!isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK} for possible resolution.`);
        }
    }
    updateButtonState() {
        this.resolvedPromise.then(() => {
            this.isPrevDisabled = !this.viewList.canNavigate(this.prevView);
            this.isNextDisabled = !this.viewList.canNavigate(this.nextView);
            this.cdr.markForCheck();
        });
    }
}
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
                template: `
    <ng-container kendoMultiViewCalendarLocalizedMessages
        i18n-today="kendo.multiviewcalendar.today|The label for the today button in the calendar header"
        today="TODAY"

        i18n-prevButtonTitle="kendo.multiviewcalendar.prevButtonTitle|The label for the previous button in the Multiview calendar"
        prevButtonTitle="Navigate to previous view"

        i18n-nextButtonTitle="kendo.multiviewcalendar.nextButtonTitle|The label for the next button in the Multiview calendar"
        nextButtonTitle="Navigate to next view"
    >
    </ng-container>
    <button
        class="k-button k-prev-view" type="button"
        [attr.aria-disabled]="isPrevDisabled"
        [disabled]="isPrevDisabled"
        [title]="prevButtonTitle"
        (click)="navigate(prevView)"
    >
        <span class="k-icon k-i-arrow-chevron-left"></span>
    </button>
    <kendo-calendar-horizontal
        [activeView]="activeViewEnum"
        [isActive]="isActive || isHovered"
        [cellTemplateRef]="activeCellTemplate()?.templateRef"
        [headerTitleTemplateRef]="headerTitleTemplate?.templateRef"
        [weekNumberTemplateRef]="weekNumberTemplate?.templateRef"
        [cellUID]="cellUID"
        [views]="views"
        [min]="min"
        [max]="max"
        [focusedDate]="focusedDate"
        [weekNumber]="weekNumber"
        [activeRangeEnd]="activeRangeEnd"
        [selectionRange]="selectionRange"
        [value]="value"
        (valueChange)="handleDateChange($event)"
        (cellEnter)="emitCellEvent(cellEnter, $event)"
        (cellLeave)="emitCellEvent(cellLeave, $event)"
    >
    </kendo-calendar-horizontal>
    <button
        class="k-button k-next-view" type="button"
        [attr.aria-disabled]="isNextDisabled"
        [disabled]="isNextDisabled"
        [title]="nextButtonTitle"
        (click)="navigate(nextView)"
    >
        <span class="k-icon k-i-arrow-chevron-right"></span>
    </button>
  `
            },] },
];
/** @nocollapse */
MultiViewCalendarComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ElementRef },
    { type: LocalizationService },
    { type: NavigationService },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: DisabledDatesService }
];
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
