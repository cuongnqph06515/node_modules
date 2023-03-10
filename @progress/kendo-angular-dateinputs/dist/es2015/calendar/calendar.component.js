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
const BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
const TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
const MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
const MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
const VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
const virtualizationProp = x => x ? x.virtualization : null;
const ɵ0 = virtualizationProp;
/**
 * @hidden
 */
export const CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export const CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
export const KENDO_INPUT_PROVIDER = {
    provide: KendoInput,
    useExisting: forwardRef(() => CalendarComponent) //tslint:disable-line:no-use-before-declare
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
export class CalendarComponent {
    constructor(bus, dom, element, navigator, renderer, cdr, ngZone, injector, scrollSyncService, disabledDatesService, pickerService) {
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
    /**
     * Sets or gets the `focusedDate` property of the Calendar and
     * defines the focused date of the component
     * ([see example]({% slug dates_calendar %}#toc-focused-dates)).
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    set focusedDate(focusedDate) {
        this._focusedDate = focusedDate || getToday();
        this.setAriaActivedescendant();
    }
    get focusedDate() {
        return this._focusedDate;
    }
    /**
     * Sets or gets the `min` property of the Calendar and
     * defines the minimum allowed date value
     * ([see example]({% slug dateranges_calendar %})).
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
     * defines the maximum allowed date value
     * ([see example]({% slug dateranges_calendar %})).
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
     * Sets the dates of the Calendar that will be disabled
     * ([see example]({% slug disabled_dates_calendar %})).
     */
    set disabledDates(value) {
        this.disabledDatesService.initialize(value);
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
    ngOnInit() {
        this.dom.calculateHeights(this.element.nativeElement);
        this.scrollSyncService.configure(this.activeViewEnum);
        this.viewChangeSubscription = this.bus.viewChanged.subscribe(({ view }) => {
            this.activeView = CalendarViewEnum[view];
            this.emitEvent(this.activeViewChange, this.activeView);
            this.scrollSyncService.configure(view);
            this.detectChanges(); // requires zone if templates
        });
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.ngZone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngOnChanges(changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        this.scrollSyncService.configure(this.activeViewEnum);
        const useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        const focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max || changes.rangeValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.onValidatorChange();
        }
    }
    ngAfterViewInit() {
        this.setAriaActivedescendant();
    }
    ngAfterViewChecked() {
        if (!this.syncNavigation) {
            return;
        }
        this.syncNavigation = false;
        this.scrollSyncService.sync(virtualizationProp(this.navigationView), virtualizationProp(this.monthView));
    }
    ngOnDestroy() {
        this.scrollSyncService.destroy();
        this.viewChangeSubscription.unsubscribe();
        this.domEvents.forEach(unbindCallback => unbindCallback());
        if (this.pickerService) {
            this.pickerService.calendar = null;
        }
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
        this.destroyed = true;
    }
    /**
     * @hidden
     */
    onResize() {
        this.focusedDate = new Date(this.focusedDate);
        this.cdr.detectChanges();
    }
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
    containsElement(element) {
        return Boolean(closest(element, node => node === this.element.nativeElement));
    }
    /**
     * @hidden
     */
    handleNavigation(candidate) {
        if (this.disabled) {
            return;
        }
        const focusTarget = candidate ? new Date(cloneDate(candidate).setDate(1)) : this.focusedDate;
        this.focusedDate = dateInRange(focusTarget, this.min, this.max);
        this.detectChanges();
    }
    /**
     * @hidden
     */
    onPageChange() {
        if (!NgZone.isInAngularZone()) {
            if (this.pageChangeSubscription) {
                this.pageChangeSubscription.unsubscribe();
            }
            this.pageChangeSubscription = fromPromise(this.resolvedPromise)
                .subscribe(() => {
                this.detectChanges(); // requires zone if templates
            });
        }
    }
    /**
     * @hidden
     */
    handleDateChange(candidate) {
        const canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        const isSameDate = !canNavigateDown && isEqual(candidate, this.value);
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
            this.ngZone.run(() => {
                this.value = cloneDate(candidate);
                this.onControlChange(cloneDate(candidate));
                this.valueChange.emit(cloneDate(candidate));
                this.cdr.markForCheck();
            });
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
        return this.minValidateFn(control) || this.maxValidateFn(control);
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
    emitEvent(emitter, args) {
        if (hasObservers(emitter)) {
            this.ngZone.run(() => {
                emitter.emit(args);
            });
        }
    }
    setClasses(element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
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
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'blur', this.handleBlur.bind(this)), this.renderer.listen(element, 'focus', this.handleFocus.bind(this)), this.renderer.listen(element, 'mousedown', preventDefault), this.renderer.listen(element, 'click', this.handleClick.bind(this)), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
    }
    emitBlur(args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    }
    emitFocus() {
        if (this.pickerService) {
            this.pickerService.onFocus.emit();
        }
    }
    handleBlur(args) {
        this.isActive = false;
        // the injector can get the NgControl instance of the parent component (for example, the DateTimePicker)
        // and enters the zone for no reason because the parent component is still untouched
        if (!this.pickerService && requiresZoneOnBlur(this.control)) {
            this.ngZone.run(() => {
                this.onControlTouched();
                this.emitBlur(args);
                this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
            this.detectChanges();
        }
    }
    handleFocus() {
        this.isActive = true;
        if (!NgZone.isInAngularZone()) {
            this.detectChanges();
        }
        this.emitFocus();
    }
    handleClick() {
        if (!this.isActive) {
            if (this.monthView.isScrolled()) {
                this.focusedDate = cloneDate(this.focusedDate); //XXX: forces change detect
                this.detectChanges();
            }
            this.focus();
        }
    }
    handleKeydown(args) {
        // reserve the alt + arrow key commands for the picker
        const arrowKeyPressed = [Keys.ArrowUp, Keys.ArrowRight, Keys.ArrowDown, Keys.ArrowLeft].indexOf(args.keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && args.altKey) {
            return;
        }
        const candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(args), this.activeViewEnum), this.min, this.max);
        if (!isEqual(this.focusedDate, candidate)) {
            this.focusedDate = candidate;
            this.detectChanges();
            args.preventDefault();
        }
        if (args.keyCode === Keys.Enter) {
            this.handleDateChange(this.focusedDate);
        }
    }
    detectChanges() {
        if (!this.destroyed) {
            this.cdr.detectChanges();
        }
    }
    emitSameDate() {
        if (this.pickerService) {
            this.pickerService.sameDateSelected.emit();
        }
    }
    setAriaActivedescendant() {
        if (!isPresent(this.element)) {
            return;
        }
        const focusedCellId = this.cellUID + this.focusedDate.getTime();
        this.renderer.setAttribute(this.element.nativeElement, 'aria-activedescendant', focusedCellId);
    }
}
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
                template: `
    <ng-container kendoCalendarLocalizedMessages
        i18n-today="kendo.calendar.today|The label for the today button in the calendar header"
        today="TODAY"
    >
    </ng-container>
    <kendo-calendar-navigation
        *ngIf="navigation"
        [activeView]="activeViewEnum"
        [focusedDate]="focusedDate"
        [min]="min"
        [max]="max"
        [templateRef]="navigationItemTemplate?.templateRef"
        (valueChange)="handleNavigation($event)"
        (pageChange)="onPageChange()"
    >
    </kendo-calendar-navigation>
    <kendo-calendar-viewlist
        [activeView]="activeViewEnum"
        [isActive]="isActive"
        [cellTemplateRef]="activeCellTemplate()?.templateRef"
        [headerTitleTemplateRef]="headerTitleTemplate?.templateRef"
        [weekNumberTemplateRef]="weekNumberTemplate?.templateRef"
        [cellUID]="cellUID"
        [min]="min"
        [max]="max"
        [focusedDate]="focusedDate"
        [weekNumber]="weekNumber"
        [value]="value"
        (valueChange)="handleDateChange($event)"
        (activeDateChange)="emitEvent(activeViewDateChange, $event)"
        (pageChange)="onPageChange()"
    >
    </kendo-calendar-viewlist>
    <kendo-resize-sensor (resize)="onResize()"></kendo-resize-sensor>
  `
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
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
];
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
export { ɵ0 };
