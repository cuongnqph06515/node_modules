/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, EventEmitter, ElementRef, Renderer2, AfterViewChecked, OnChanges, OnDestroy, NgZone, Injector, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { Day } from '@progress/kendo-date-math';
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
import { CalendarView } from './models/view.type';
import { CalendarViewEnum } from './models/view.enum';
import { DisabledDatesService } from './services/disabled-dates.service';
/**
 * @hidden
 */
export declare const CALENDAR_VALUE_ACCESSOR: any;
/**
 * @hidden
 */
export declare const CALENDAR_RANGE_VALIDATORS: any;
/**
 * @hidden
 */
export declare const KENDO_INPUT_PROVIDER: any;
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
export declare class CalendarComponent implements ControlValueAccessor, OnChanges, OnDestroy, AfterViewChecked, AfterViewInit, Validator {
    private bus;
    dom: CalendarDOMService;
    private element;
    private navigator;
    private renderer;
    private cdr;
    private ngZone;
    private injector;
    scrollSyncService: ScrollSyncService;
    private disabledDatesService;
    private pickerService?;
    /**
     * @hidden
     */
    id: string;
    /**
     * Sets or gets the `focusedDate` property of the Calendar and
     * defines the focused date of the component
     * ([see example]({% slug dates_calendar %}#toc-focused-dates)).
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    focusedDate: Date;
    /**
     * Sets or gets the `min` property of the Calendar and
     * defines the minimum allowed date value
     * ([see example]({% slug dateranges_calendar %})).
     * By default, the `min` value is `1900-1-1`.
     */
    min: Date;
    /**
     * Sets or gets the `max` property of the Calendar and
     * defines the maximum allowed date value
     * ([see example]({% slug dateranges_calendar %})).
     * By default, the `max` value is `2099-12-31`.
     */
    max: Date;
    /**
     * Determines whether the built-in min or max validators are enforced when validating a form.
     */
    rangeValidation: boolean;
    /**
     * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    value: Date;
    /**
     * Sets or gets the `disabled` property of the Calendar and
     * determines whether the component is active
     * ([see example]({% slug disabled_calendar %})).
     */
    disabled: boolean;
    /**
     * Sets or gets the `tabindex` property of the Calendar. Based on the
     * [HTML `tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
     * it determines whether the component is focusable.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Sets the dates of the Calendar that will be disabled
     * ([see example]({% slug disabled_dates_calendar %})).
     */
    disabledDates: ((date: Date) => boolean) | Date[] | Day[];
    /**
     * Sets or gets the `navigation` property of the Calendar
     * and determines whether the navigation side-bar will be displayed
     * ([see example]({% slug sidebar_calendar %})).
     */
    navigation: boolean;
    /**
     * Defines the active view that the Calendar initially renders
     * ([see example]({% slug activeview_calendar %})).
     * By default, the active view is `month`.
     *
     * > You have to set `activeView` within the `topView`-`bottomView` range.
     */
    activeView: CalendarView;
    /**
     * Defines the bottommost view to which the user can navigate
     * ([see example]({% slug dates_calendar %}#toc-partial-dates)).
     */
    bottomView: CalendarView;
    /**
     * Defines the topmost view to which the user can navigate
     * ([see example]({% slug sidebar_calendar %}#toc-partial-dates)).
     */
    topView: CalendarView;
    /**
     * Determines whether to display a week number column in the `month` view
     * ([see example]({% slug weeknumcolumn_calendar %})).
     */
    weekNumber: boolean;
    /**
     * Fires when the active view is changed
     * ([more information and example]({% slug overview_calendar %}#toc-events)).
     */
    activeViewChange: EventEmitter<CalendarView>;
    /**
     * Fires when the active view date is changed
     * ([more information and example]({% slug overview_calendar %}#toc-events)).
     */
    activeViewDateChange: EventEmitter<Date>;
    /**
     * Fires when the value is changed
     * ([more information and example]({% slug overview_calendar %}#toc-events)).
     */
    valueChange: EventEmitter<Date>;
    /**
     * @hidden
     */
    cellTemplate: CellTemplateDirective;
    /**
     * @hidden
     */
    cellTemplateRef: CellTemplateDirective;
    /**
     * @hidden
     */
    monthCellTemplate: MonthCellTemplateDirective;
    /**
     * @hidden
     */
    monthCellTemplateRef: MonthCellTemplateDirective;
    /**
     * @hidden
     */
    yearCellTemplate: YearCellTemplateDirective;
    /**
     * @hidden
     */
    yearCellTemplateRef: YearCellTemplateDirective;
    /**
     * @hidden
     */
    decadeCellTemplate: DecadeCellTemplateDirective;
    /**
     * @hidden
     */
    decadeCellTemplateRef: DecadeCellTemplateDirective;
    /**
     * @hidden
     */
    centuryCellTemplate: CenturyCellTemplateDirective;
    /**
     * @hidden
     */
    centuryCellTemplateRef: CenturyCellTemplateDirective;
    /**
     * @hidden
     */
    weekNumberTemplate: WeekNumberCellTemplateDirective;
    /**
     * @hidden
     */
    weekNumberTemplateRef: WeekNumberCellTemplateDirective;
    /**
     * @hidden
     */
    headerTitleTemplate: HeaderTitleTemplateDirective;
    /**
     * @hidden
     */
    headerTitleTemplateRef: HeaderTitleTemplateDirective;
    /**
     * @hidden
     */
    navigationItemTemplate: NavigationItemTemplateDirective;
    /**
     * @hidden
     */
    navigationItemTemplateRef: NavigationItemTemplateDirective;
    navigationView: NavigationComponent;
    monthView: ViewListComponent;
    isActive: boolean;
    cellUID: string;
    private _min;
    private _max;
    private _focusedDate;
    private _value;
    private onControlChange;
    private onControlTouched;
    private onValidatorChange;
    private minValidateFn;
    private maxValidateFn;
    private syncNavigation;
    private viewChangeSubscription;
    readonly activeViewEnum: CalendarViewEnum;
    readonly bottomViewEnum: CalendarViewEnum;
    readonly topViewEnum: CalendarViewEnum;
    readonly widgetId: string;
    readonly widgetRole: string;
    readonly calendarTabIndex: number;
    readonly ariaDisabled: boolean;
    private domEvents;
    private control;
    private pageChangeSubscription;
    private resolvedPromise;
    private destroyed;
    constructor(bus: BusViewService, dom: CalendarDOMService, element: ElementRef, navigator: NavigationService, renderer: Renderer2, cdr: ChangeDetectorRef, ngZone: NgZone, injector: Injector, scrollSyncService: ScrollSyncService, disabledDatesService: DisabledDatesService, pickerService?: PickerService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    onResize(): void;
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
    focus(): void;
    /**
     * Blurs the Calendar component.
     */
    blur(): void;
    /**
     * @hidden
     */
    containsElement(element: any): boolean;
    /**
     * @hidden
     */
    handleNavigation(candidate: Date): void;
    /**
     * @hidden
     */
    onPageChange(): void;
    /**
     * @hidden
     */
    handleDateChange(candidate: Date): void;
    /**
     * @hidden
     */
    writeValue(candidate: Date): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    registerOnValidatorChange(fn: Function): void;
    /**
     * @hidden
     */
    activeCellTemplate(): any;
    /**
     * @hidden
     */
    emitEvent(emitter: any, args: any): void;
    private setClasses;
    private verifyChanges;
    private verifyValue;
    private bindEvents;
    private emitBlur;
    private emitFocus;
    private handleBlur;
    private handleFocus;
    private handleClick;
    private handleKeydown;
    private detectChanges;
    private emitSameDate;
    private setAriaActivedescendant;
}
