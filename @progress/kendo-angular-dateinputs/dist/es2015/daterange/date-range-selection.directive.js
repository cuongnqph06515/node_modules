/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Optional, Input, Output, Renderer2 } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { DateRangeService } from './date-range.service';
import { MultiViewCalendarComponent } from '../calendar/multiview-calendar.component';
import { EMPTY_SELECTIONRANGE } from '../calendar/models/selection-range.interface';
import { isEqual } from '@progress/kendo-date-math';
import { clampRange, either, isEqualRange } from '../util';
/**
 * A directive which manages the MultiViewCalendar range selection.
 */
export class DateRangeSelectionDirective {
    constructor(calendar, cdr, element, renderer, dateRangeService) {
        this.calendar = calendar;
        this.cdr = cdr;
        this.element = element;
        this.dateRangeService = dateRangeService;
        /**
         * Specifies the auto-correction behavior. If the start date is greater than the end date,
         * the directive fixes the date range to a single date either on input change or on blur
         * ([see example]({% slug autocorrect_daterange %}#toc-configuring-the-calendar-selection-directive)).
         *
         * By default, the auto-correction is triggered on change.
         * To disable this behavior, set the `autoCorrectOn` property to `none`.
         */
        this.autoCorrectOn = 'change';
        /**
         * Fires when the active range end is changed. For more information, refer to
         * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
         */
        this.activeRangeEndChange = new EventEmitter();
        /**
         * Fires when the selection range is changed. For more information, refer to
         * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
         */
        this.selectionRangeChange = new EventEmitter();
        this.calendarSubscriptions = new Subscription(() => { });
        this.dateRangeService = this.dateRangeService || new DateRangeService();
        renderer.setAttribute(element.nativeElement, 'aria-multiselectable', 'true');
    }
    /**
     * Gets or sets the selection range of the calendar. When a new range is set,
     * the connected DateRangeService notifies all related parties.
     */
    get selectionRange() {
        return this.calendar ? this.calendar.selectionRange : null;
    }
    set selectionRange(range) {
        if (!this.isEqualCalendarRange(range)) {
            this.setSelectionRange(range);
        }
        if (!isEqualRange(this.dateRangeService.selectionRange, range)) {
            this.dateRangeService.setRange(range);
        }
        this.updateFocusedDate(range);
    }
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
    get activeRangeEnd() {
        return this.calendar.activeRangeEnd;
    }
    set activeRangeEnd(activeRange) {
        if (this.dateRangeService.activeRangeEnd === activeRange) {
            return;
        }
        this.calendar.activeRangeEnd = activeRange;
        this.dateRangeService.setActiveRangeEnd(activeRange);
    }
    get calendarRange() {
        return this.selectionRange || EMPTY_SELECTIONRANGE;
    }
    ngOnInit() {
        const calendar = this.calendar;
        const dateRangeService = this.dateRangeService;
        calendar.min = either(dateRangeService.min, calendar.min);
        calendar.max = either(dateRangeService.max, calendar.max);
        this.addSubscriptions(calendar.cellEnter.subscribe((value) => this.handleHover(value)), calendar.valueChange.subscribe((value) => this.handleChange(value)), dateRangeService.focusedDate$.subscribe(focusedDate => {
            if (!isEqual(calendar.focusedDate, focusedDate)) {
                calendar.focusedDate = focusedDate;
            }
        }), dateRangeService.activeRangeEnd$.subscribe(rangeEnd => {
            if (calendar.activeRangeEnd === rangeEnd) {
                return;
            }
            calendar.activeRangeEnd = rangeEnd;
            this.activeRangeEndChange.emit(rangeEnd);
            this.cdr.markForCheck();
        }), dateRangeService.range$.subscribe(range => {
            if (!this.isEqualCalendarRange(range)) {
                this.acceptAndEmit(range);
            }
            this.updateFocusedDate(range);
        }), fromEvent(this.element.nativeElement, 'blur').subscribe(() => this.handleBlur()));
    }
    ngOnDestroy() {
        this.calendarSubscriptions.unsubscribe();
    }
    addSubscriptions(...subscriptions) {
        subscriptions.map(s => this.calendarSubscriptions.add(s));
    }
    isEqualCalendarRange(range) {
        return isEqualRange(this.calendar.selectionRange, range);
    }
    handleBlur() {
        const { start, end } = this.calendarRange;
        const autoCorrect = this.autoCorrectOn === 'blur' && start !== null && end !== null && end < start;
        if (autoCorrect) {
            this.dateRangeService.setRange(clampRange(start));
        }
    }
    handleChange(value) {
        const service = this.dateRangeService;
        const autoCorrect = this.autoCorrectOn === 'change' && this.shouldAutoCorrect(value);
        const activeEnd = this.calendar.activeRangeEnd !== 'end' ? 'end' : (autoCorrect ? 'end' : 'start');
        const range = autoCorrect ? clampRange(value) : this.updateRange(value);
        if (!isEqualRange(service.selectionRange, range)) {
            this.acceptAndEmit(range);
            service.setActiveRangeEnd(activeEnd);
            service.setRange(range);
        }
    }
    handleHover(value) {
        if (this.hasCompleteRange()) {
            return;
        }
        const { start, end } = this.calendarRange;
        const activeRangeEnd = this.calendar.activeRangeEnd;
        const updateRange = (start && activeRangeEnd === 'end') || (end && activeRangeEnd === 'start');
        if (updateRange) {
            this.setSelectionRange(this.updateRange(value));
        }
    }
    hasCompleteRange() {
        const { start, end } = this.dateRangeService.selectionRange || EMPTY_SELECTIONRANGE;
        return Boolean(start) && Boolean(end);
    }
    shouldAutoCorrect(value) {
        const { end, start } = this.calendarRange;
        if (this.calendar.activeRangeEnd !== 'end') {
            return end !== null && value > end;
        }
        else {
            return start !== null && value < start;
        }
    }
    updateFocusedDate(range) {
        if (!range || this.dateRangeService.focusedDate) {
            return;
        }
        this.dateRangeService.setFocusedDate(range.start || range.end);
    }
    updateRange(value) {
        const { end, start } = this.calendarRange;
        return this.calendar.activeRangeEnd !== 'end' ? ({ start: value, end }) : ({ start, end: value });
    }
    setSelectionRange(range) {
        this.calendar.selectionRange = range;
        this.calendar.writeValue(null);
    }
    acceptAndEmit(range) {
        this.setSelectionRange(range);
        this.selectionRangeChange.emit(range);
    }
}
DateRangeSelectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDateRangeSelection]'
            },] },
];
/** @nocollapse */
DateRangeSelectionDirective.ctorParameters = () => [
    { type: MultiViewCalendarComponent },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: DateRangeService, decorators: [{ type: Optional }] }
];
DateRangeSelectionDirective.propDecorators = {
    autoCorrectOn: [{ type: Input }],
    selectionRange: [{ type: Input }],
    activeRangeEnd: [{ type: Input }],
    activeRangeEndChange: [{ type: Output }],
    selectionRangeChange: [{ type: Output }]
};
