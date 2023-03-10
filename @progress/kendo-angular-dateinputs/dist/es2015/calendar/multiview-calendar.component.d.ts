/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, EventEmitter, ElementRef, Renderer2, AfterViewInit, OnChanges, OnDestroy, NgZone } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Day } from '@progress/kendo-date-math';
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
import { KeyDown } from './models/keydown.interface';
import { CalendarView } from './models/view.type';
import { CalendarViewEnum } from './models/view.enum';
import { SelectionRangeEnd } from './models/selection-range-end.type';
import { SelectionRange } from './models/selection-range.interface';
/**
 * @hidden
 */
export declare const RANGE_CALENDAR_VALUE_ACCESSOR: any;
/**
 * @hidden
 */
export declare const RANGE_CALENDAR_RANGE_VALIDATORS: any;
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
export declare class MultiViewCalendarComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy, Validator {
    bus: BusViewService;
    element: ElementRef;
    private localization;
    private navigator;
    private renderer;
    private cdr;
    private zone;
    private disabledDatesService;
    /**
     * @hidden
     */
    id: string;
    /**
     * Sets or gets the `focusedDate` property of the Calendar and
     * defines the focused date of the component
     * ([see example]({% slug dates_multiviewcalendar %}#toc-focused-dates)).
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    focusedDate: Date;
    /**
     * Sets or gets the `min` property of the Calendar and
     * defines the minimum allowed date value.
     * By default, the `min` value is `1900-1-1`.
     */
    min: Date;
    /**
     * Sets or gets the `max` property of the Calendar and
     * defines the maximum allowed date value.
     * By default, the `max` value is `2099-12-31`.
     */
    max: Date;
    /**
     * Determines whether the built-in min or max validators are enforced when validating a form.
     */
    rangeValidation: boolean;
    /**
     * Determines whether the built-in validator for disabled
     * date ranges is enforced when validating a form
     * ([see example]({% slug disabled_dates_multiviewcalendar %}#toc-validation)).
     */
    disabledDatesRangeValidation: boolean;
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
     * ([see example]({% slug disabled_multiviewcalendar %})).
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
     * Sets the dates of the MultiViewCalendar that will be disabled
     * ([see example]({% slug disabled_dates_multiviewcalendar %})).
     */
    disabledDates: ((date: Date) => boolean) | Date[] | Day[];
    /**
     * Defines the active view that the Calendar initially renders
     * ([see example]({% slug activeview_multiviewcalendar %})).
     * By default, the active view is `month`.
     *
     * > You have to set `activeView` within the `topView`-`bottomView` range.
     */
    activeView: CalendarView;
    /**
     * Defines the bottommost view, to which the user can navigate
     * ([see example]({% slug dates_multiviewcalendar %}#toc-partial-dates)).
     */
    bottomView: CalendarView;
    /**
     * Defines the topmost view, to which the user can navigate.
     */
    topView: CalendarView;
    /**
     * Determines whether to display a week number column in the `month` view
     * ([see example]({% slug weeknumcolumn_multiviewcalendar %})).
     */
    weekNumber: boolean;
    /**
     * Specify, which end of the defined selection range should be marked as active.
     *
     * > Value will be ignored if the selection range is undefined.
     */
    activeRangeEnd: SelectionRangeEnd;
    /**
     * Sets or gets the `selectionRange` property of the Calendar and
     * defines the selection range of the component
     * ([see example]({% slug dates_multiviewcalendar %}#toc-selection-range)).
     */
    selectionRange: SelectionRange;
    /**
     * Sets or gets the `views` property of the Calendar and
     * defines the number of rendered months.
     */
    views: number;
    /**
     * Fires when the active view is changed
     * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
     */
    activeViewChange: EventEmitter<CalendarView>;
    /**
     * Fires when a view cell is entered
     * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
     */
    cellEnter: EventEmitter<Date>;
    /**
     * Fires when a view cell is leaved
     * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
     */
    cellLeave: EventEmitter<Date>;
    /**
     * Fires when the value is changed
     * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
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
    viewList: HorizontalViewListComponent;
    cellUID: string;
    isActive: boolean;
    isHovered: boolean;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    prevButtonTitle: string;
    nextButtonTitle: string;
    prevView: Action;
    nextView: Action;
    private _min;
    private _max;
    private _focusedDate;
    private _value;
    private _selectionRange;
    private messagesTimeout;
    private resolvedPromise;
    private onControlChange;
    private onControlTouched;
    private onValidatorChange;
    private minValidateFn;
    private maxValidateFn;
    private disabledDatesRangeValidateFn;
    private subscriptions;
    readonly activeViewEnum: CalendarViewEnum;
    readonly bottomViewEnum: CalendarViewEnum;
    readonly topViewEnum: CalendarViewEnum;
    readonly widgetId: string;
    readonly widgetRole: string;
    readonly calendarTabIndex: number;
    readonly ariaDisabled: boolean;
    readonly ariaActivedescendant: string;
    /**
     * @hidden
     */
    handleBlur(): void;
    /**
     * @hidden
     */
    handleFocus(): void;
    /**
     * @hidden
     */
    handleMouseEnter(): void;
    /**
     * @hidden
     */
    handleMouseLeave(): void;
    /**
     * @hidden
     */
    handleMousedown(event: any): void;
    /**
     * @hidden
     */
    handleClick(): void;
    /**
     * @hidden
     */
    keydown(event: KeyDown): void;
    /**
     * @hidden
     */
    enter(): void;
    constructor(bus: BusViewService, element: ElementRef, localization: LocalizationService, navigator: NavigationService, renderer: Renderer2, cdr: ChangeDetectorRef, zone: NgZone, disabledDatesService: DisabledDatesService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
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
    focus(): void;
    /**
     * Blurs the Calendar component.
     */
    blur(): void;
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
    navigate(action: Action): void;
    /**
     * @hidden
     */
    emitCellEvent(emitter: any, args: any): void;
    private setClasses;
    private setMessages;
    private verifyChanges;
    private verifyValue;
    private updateButtonState;
}
