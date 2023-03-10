/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { DateRangeService } from './date-range.service';
import { MultiViewCalendarComponent } from '../calendar/multiview-calendar.component';
import { SelectionRange } from '../calendar/models/selection-range.interface';
import { SelectionRangeEnd } from '../calendar/models/selection-range-end.type';
import { AutoCorrectOn } from './auto-correct-on.type';
/**
 * A directive which manages the MultiViewCalendar range selection.
 */
export declare class DateRangeSelectionDirective implements OnInit {
    private calendar;
    private cdr;
    private element;
    private dateRangeService;
    /**
     * Specifies the auto-correction behavior. If the start date is greater than the end date,
     * the directive fixes the date range to a single date either on input change or on blur
     * ([see example]({% slug autocorrect_daterange %}#toc-configuring-the-calendar-selection-directive)).
     *
     * By default, the auto-correction is triggered on change.
     * To disable this behavior, set the `autoCorrectOn` property to `none`.
     */
    autoCorrectOn: AutoCorrectOn;
    /**
     * Gets or sets the selection range of the calendar. When a new range is set,
     * the connected DateRangeService notifies all related parties.
     */
    selectionRange: SelectionRange;
    /**
     * Gets or sets the active end of the selection range. This option determines which range end will be updated on
     * user interaction. When a new active end is set, the connected DateRangeService notifies all related parties.
     */
    /**
     * Specifies which end of the selection range will be marked as active. The active end gets modified upon user
     * interaction. When a new active end is set, the wired DateRangeService notifies all related components. For
     * example, the start and end DateInput components.
     *
     * > If the selection range is undefined, the value is ignored.
     */
    activeRangeEnd: SelectionRangeEnd;
    /**
     * Fires when the active range end is changed. For more information, refer to
     * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
     */
    activeRangeEndChange: EventEmitter<SelectionRangeEnd>;
    /**
     * Fires when the selection range is changed. For more information, refer to
     * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
     */
    selectionRangeChange: EventEmitter<SelectionRange>;
    private readonly calendarRange;
    private calendarSubscriptions;
    constructor(calendar: MultiViewCalendarComponent, cdr: ChangeDetectorRef, element: ElementRef, renderer: Renderer2, dateRangeService: DateRangeService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private addSubscriptions;
    private isEqualCalendarRange;
    private handleBlur;
    private handleChange;
    private handleHover;
    private hasCompleteRange;
    private shouldAutoCorrect;
    private updateFocusedDate;
    private updateRange;
    private setSelectionRange;
    private acceptAndEmit;
}
