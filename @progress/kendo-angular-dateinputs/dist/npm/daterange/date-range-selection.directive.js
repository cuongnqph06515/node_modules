/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var date_range_service_1 = require("./date-range.service");
var multiview_calendar_component_1 = require("../calendar/multiview-calendar.component");
var selection_range_interface_1 = require("../calendar/models/selection-range.interface");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
/**
 * A directive which manages the MultiViewCalendar range selection.
 */
var DateRangeSelectionDirective = /** @class */ (function () {
    function DateRangeSelectionDirective(calendar, cdr, element, renderer, dateRangeService) {
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
        this.activeRangeEndChange = new core_1.EventEmitter();
        /**
         * Fires when the selection range is changed. For more information, refer to
         * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
         */
        this.selectionRangeChange = new core_1.EventEmitter();
        this.calendarSubscriptions = new rxjs_1.Subscription(function () { });
        this.dateRangeService = this.dateRangeService || new date_range_service_1.DateRangeService();
        renderer.setAttribute(element.nativeElement, 'aria-multiselectable', 'true');
    }
    Object.defineProperty(DateRangeSelectionDirective.prototype, "selectionRange", {
        /**
         * Gets or sets the selection range of the calendar. When a new range is set,
         * the connected DateRangeService notifies all related parties.
         */
        get: function () {
            return this.calendar ? this.calendar.selectionRange : null;
        },
        set: function (range) {
            if (!this.isEqualCalendarRange(range)) {
                this.setSelectionRange(range);
            }
            if (!util_1.isEqualRange(this.dateRangeService.selectionRange, range)) {
                this.dateRangeService.setRange(range);
            }
            this.updateFocusedDate(range);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeSelectionDirective.prototype, "activeRangeEnd", {
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
        get: function () {
            return this.calendar.activeRangeEnd;
        },
        set: function (activeRange) {
            if (this.dateRangeService.activeRangeEnd === activeRange) {
                return;
            }
            this.calendar.activeRangeEnd = activeRange;
            this.dateRangeService.setActiveRangeEnd(activeRange);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeSelectionDirective.prototype, "calendarRange", {
        get: function () {
            return this.selectionRange || selection_range_interface_1.EMPTY_SELECTIONRANGE;
        },
        enumerable: true,
        configurable: true
    });
    DateRangeSelectionDirective.prototype.ngOnInit = function () {
        var _this = this;
        var calendar = this.calendar;
        var dateRangeService = this.dateRangeService;
        calendar.min = util_1.either(dateRangeService.min, calendar.min);
        calendar.max = util_1.either(dateRangeService.max, calendar.max);
        this.addSubscriptions(calendar.cellEnter.subscribe(function (value) { return _this.handleHover(value); }), calendar.valueChange.subscribe(function (value) { return _this.handleChange(value); }), dateRangeService.focusedDate$.subscribe(function (focusedDate) {
            if (!kendo_date_math_1.isEqual(calendar.focusedDate, focusedDate)) {
                calendar.focusedDate = focusedDate;
            }
        }), dateRangeService.activeRangeEnd$.subscribe(function (rangeEnd) {
            if (calendar.activeRangeEnd === rangeEnd) {
                return;
            }
            calendar.activeRangeEnd = rangeEnd;
            _this.activeRangeEndChange.emit(rangeEnd);
            _this.cdr.markForCheck();
        }), dateRangeService.range$.subscribe(function (range) {
            if (!_this.isEqualCalendarRange(range)) {
                _this.acceptAndEmit(range);
            }
            _this.updateFocusedDate(range);
        }), rxjs_1.fromEvent(this.element.nativeElement, 'blur').subscribe(function () { return _this.handleBlur(); }));
    };
    DateRangeSelectionDirective.prototype.ngOnDestroy = function () {
        this.calendarSubscriptions.unsubscribe();
    };
    DateRangeSelectionDirective.prototype.addSubscriptions = function () {
        var _this = this;
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        subscriptions.map(function (s) { return _this.calendarSubscriptions.add(s); });
    };
    DateRangeSelectionDirective.prototype.isEqualCalendarRange = function (range) {
        return util_1.isEqualRange(this.calendar.selectionRange, range);
    };
    DateRangeSelectionDirective.prototype.handleBlur = function () {
        var _a = this.calendarRange, start = _a.start, end = _a.end;
        var autoCorrect = this.autoCorrectOn === 'blur' && start !== null && end !== null && end < start;
        if (autoCorrect) {
            this.dateRangeService.setRange(util_1.clampRange(start));
        }
    };
    DateRangeSelectionDirective.prototype.handleChange = function (value) {
        var service = this.dateRangeService;
        var autoCorrect = this.autoCorrectOn === 'change' && this.shouldAutoCorrect(value);
        var activeEnd = this.calendar.activeRangeEnd !== 'end' ? 'end' : (autoCorrect ? 'end' : 'start');
        var range = autoCorrect ? util_1.clampRange(value) : this.updateRange(value);
        if (!util_1.isEqualRange(service.selectionRange, range)) {
            this.acceptAndEmit(range);
            service.setActiveRangeEnd(activeEnd);
            service.setRange(range);
        }
    };
    DateRangeSelectionDirective.prototype.handleHover = function (value) {
        if (this.hasCompleteRange()) {
            return;
        }
        var _a = this.calendarRange, start = _a.start, end = _a.end;
        var activeRangeEnd = this.calendar.activeRangeEnd;
        var updateRange = (start && activeRangeEnd === 'end') || (end && activeRangeEnd === 'start');
        if (updateRange) {
            this.setSelectionRange(this.updateRange(value));
        }
    };
    DateRangeSelectionDirective.prototype.hasCompleteRange = function () {
        var _a = this.dateRangeService.selectionRange || selection_range_interface_1.EMPTY_SELECTIONRANGE, start = _a.start, end = _a.end;
        return Boolean(start) && Boolean(end);
    };
    DateRangeSelectionDirective.prototype.shouldAutoCorrect = function (value) {
        var _a = this.calendarRange, end = _a.end, start = _a.start;
        if (this.calendar.activeRangeEnd !== 'end') {
            return end !== null && value > end;
        }
        else {
            return start !== null && value < start;
        }
    };
    DateRangeSelectionDirective.prototype.updateFocusedDate = function (range) {
        if (!range || this.dateRangeService.focusedDate) {
            return;
        }
        this.dateRangeService.setFocusedDate(range.start || range.end);
    };
    DateRangeSelectionDirective.prototype.updateRange = function (value) {
        var _a = this.calendarRange, end = _a.end, start = _a.start;
        return this.calendar.activeRangeEnd !== 'end' ? ({ start: value, end: end }) : ({ start: start, end: value });
    };
    DateRangeSelectionDirective.prototype.setSelectionRange = function (range) {
        this.calendar.selectionRange = range;
        this.calendar.writeValue(null);
    };
    DateRangeSelectionDirective.prototype.acceptAndEmit = function (range) {
        this.setSelectionRange(range);
        this.selectionRangeChange.emit(range);
    };
    DateRangeSelectionDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDateRangeSelection]'
                },] },
    ];
    /** @nocollapse */
    DateRangeSelectionDirective.ctorParameters = function () { return [
        { type: multiview_calendar_component_1.MultiViewCalendarComponent },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: date_range_service_1.DateRangeService, decorators: [{ type: core_1.Optional }] }
    ]; };
    DateRangeSelectionDirective.propDecorators = {
        autoCorrectOn: [{ type: core_1.Input }],
        selectionRange: [{ type: core_1.Input }],
        activeRangeEnd: [{ type: core_1.Input }],
        activeRangeEndChange: [{ type: core_1.Output }],
        selectionRangeChange: [{ type: core_1.Output }]
    };
    return DateRangeSelectionDirective;
}());
exports.DateRangeSelectionDirective = DateRangeSelectionDirective;
