"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var rxjs_1 = require("rxjs");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
var base_view_1 = require("../common/base-view");
var constants_1 = require("../constants");
var util_1 = require("../../common/util");
var dom_queries_1 = require("../../common/dom-queries");
var getStartDate = function (date) { return kendo_date_math_1.getDate(date); };
var ɵ0 = getStartDate;
exports.ɵ0 = ɵ0;
var getEndDate = function (start, numberOfDays) { return kendo_date_math_1.getDate(kendo_date_math_1.addDays(start, numberOfDays || 1)); };
var ɵ1 = getEndDate;
exports.ɵ1 = ɵ1;
var getNextDate = function (date, count, numberOfDays) { return kendo_date_math_1.getDate(kendo_date_math_1.addDays(date, numberOfDays * count)); };
var ɵ2 = getNextDate;
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
var DayTimeViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DayTimeViewComponent, _super);
    function DayTimeViewComponent(changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) {
        var _this = _super.call(this, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) || this;
        _this.changeDetector = changeDetector;
        _this.numberOfDays = 1;
        _this.startTime = '00:00';
        _this.endTime = '00:00';
        _this.workDayStart = '08:00';
        _this.workDayEnd = '17:00';
        _this.workWeekStart = 1;
        _this.workWeekEnd = 5;
        _this.slotDuration = 60;
        _this.slotDivisions = 2;
        _this.showWorkHours = false;
        _this.getStartDate = getStartDate;
        _this.getEndDate = getEndDate;
        _this.getNextDate = getNextDate;
        _this.daySlots = [];
        _this.timeSlots = [];
        _this.resizeHintFormat = 't';
        _this.showCurrentTime = false;
        _this.verticalTime = true;
        _this.initialUpdate = true;
        _this.updateCurrentTime = _this.updateCurrentTime.bind(_this);
        return _this;
    }
    Object.defineProperty(DayTimeViewComponent.prototype, "classNames", {
        get: function () {
            return "k-scheduler-" + this.name + "view";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewComponent.prototype, "timeSlotTemplateRef", {
        get: function () {
            return this.timeSlotTemplate || (this.schedulerTimeSlotTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewComponent.prototype, "dateHeaderTemplateRef", {
        get: function () {
            return this.dateHeaderTemplate || (this.schedulerDateHeaderTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.startTime || changes.endTime || changes.showWorkHours || changes.workDayStart || changes.workDayEnd ||
            changes.workWeekStart || changes.workWeekEnd || changes.slotDivisions || changes.slotDuration) {
            this.timeSlots = this.createTimeSlots();
            this.initWorkDay();
            this.changes.next(null);
        }
        if (kendo_angular_common_1.isChanged('currentTimeMarker', changes)) {
            this.showCurrentTime = this.enableCurrentTime();
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    DayTimeViewComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        clearTimeout(this.currentTimeTimeout);
    };
    DayTimeViewComponent.prototype.verticalItem = function (leafIndex, resourceIndex) {
        var data = this.verticalResources[resourceIndex].data || [];
        var resources = this.verticalResources;
        var result = 1;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= ((resources[idx].data || []).length || 1);
        }
        return data[(leafIndex / result) % data.length];
    };
    DayTimeViewComponent.prototype.timeSlotClass = function (slot, date, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: utils_1.dateWithTime(date, slot.start),
                end: utils_1.dateWithTime(date, slot.end),
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: false
            });
        }
    };
    DayTimeViewComponent.prototype.scrollToTime = function (time) {
        if (time === void 0) { time = this.scrollTime; }
        var scrollDate = this.intl.parseDate(time);
        if (!scrollDate) {
            return;
        }
        var date = utils_1.toUTCTime(this.daySlots[0].start, scrollDate);
        var position = this.slotService.timePosition(date, 0, this.verticalTime);
        if (util_1.isNumber(position)) {
            var contentElement = this.content.nativeElement;
            contentElement[this.verticalTime ? 'scrollTop' : 'scrollLeft'] =
                (this.localization.rtl && !this.verticalTime) ? dom_queries_1.rtlScrollPosition(contentElement, position) : position;
        }
    };
    DayTimeViewComponent.prototype.optionsChange = function (options) {
        this.schedulerTimeSlotTemplate = options.timeSlotTemplate;
        this.schedulerDateHeaderTemplate = options.dateHeaderTemplate;
        _super.prototype.optionsChange.call(this, options);
    };
    DayTimeViewComponent.prototype.updateView = function () {
        _super.prototype.updateView.call(this);
        this.updateCurrentTime();
        if (this.initialUpdate) {
            this.scrollToTime();
            this.initialUpdate = false;
        }
    };
    DayTimeViewComponent.prototype.enableCurrentTime = function () {
        if (!this.currentTimeMarker || this.currentTimeMarker.enabled === false || !this.selectedDate) {
            return false;
        }
        var dateRange = this.dateRange();
        this.currentDate = kendo_date_math_1.ZonedDate.fromLocalDate(this.currentTime(), this.currentTimeMarker.localTimezone !== false ? '' : this.timezone);
        var localTime = this.currentDate.toLocalDate();
        var invariantTime = utils_1.toInvariantTime(localTime);
        var timeSlots = this.timeSlots;
        var inDateRange = utils_1.dateInRange(localTime, dateRange.start, dateRange.end);
        var inTimeRange = timeSlots.length && utils_1.dateInRange(invariantTime, timeSlots[0].start, timeSlots[timeSlots.length - 1].end);
        return inDateRange && inTimeRange;
    };
    DayTimeViewComponent.prototype.currentTime = function () {
        return new Date();
    };
    DayTimeViewComponent.prototype.updateCurrentTime = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        var enable = this.enableCurrentTime();
        if (enable !== this.showCurrentTime) {
            this.showCurrentTime = enable;
            this.changeDetector.detectChanges();
        }
        clearTimeout(this.currentTimeTimeout);
        if (enable) {
            this.zone.runOutsideAngular(function () {
                _this.currentTimeTimeout = setTimeout(_this.updateCurrentTime, _this.currentTimeMarker.updateInterval || constants_1.MS_PER_MINUTE);
            });
            this.positionCurrentTime();
        }
    };
    DayTimeViewComponent.prototype.positionCurrentTime = function () {
        var _this = this;
        if (this.currentTimeElements && this.currentTimeElements.length) {
            var date_1 = this.currentDate.toUTCDate();
            var currentTimeArrows_1 = this.currentTimeArrows ? this.currentTimeArrows.toArray() : [];
            var arrowOffset_1 = currentTimeArrows_1.length ? this.currentTimeArrowOffset() : 0;
            var arrowMid_1 = currentTimeArrows_1.length ? (currentTimeArrows_1[0].nativeElement.offsetHeight / 2) : 4;
            var tableWidth_1 = this.contentTable.nativeElement.clientWidth;
            var tableHeight_1 = this.contentTable.nativeElement.clientHeight;
            var vertical_1 = this.verticalTime;
            this.currentTimeElements.forEach(function (element, index) {
                var position = _this.slotService.timePosition(date_1, index, vertical_1);
                if (position !== undefined) {
                    var line = element.nativeElement;
                    if (currentTimeArrows_1[index]) {
                        var arrow = currentTimeArrows_1[index].nativeElement;
                        var origin_1 = vertical_1 ? arrowOffset_1 : position - arrowMid_1;
                        utils_1.setCoordinates(arrow, {
                            top: vertical_1 ? position - arrowMid_1 : arrowOffset_1,
                            left: origin_1,
                            right: origin_1
                        });
                    }
                    var origin = vertical_1 ? 0 : position;
                    utils_1.setCoordinates(line, {
                        top: vertical_1 ? position : 0,
                        left: origin,
                        right: origin,
                        width: vertical_1 ? tableWidth_1 : 1,
                        height: vertical_1 ? 1 : tableHeight_1
                    });
                }
            });
        }
    };
    DayTimeViewComponent.prototype.bindEvents = function () {
        var _this = this;
        _super.prototype.bindEvents.call(this);
        this.zone.runOutsideAngular(function () {
            _this.subs.add(util_1.fromClick(_this.headerWrap.nativeElement)
                .subscribe(function (e) { return _this.onHeaderClick(e); }));
            _this.subs.add(rxjs_1.fromEvent(_this.headerWrap.nativeElement, 'contextmenu')
                .subscribe(function (e) { return _this.onClick(e); }));
            _this.subs.add(util_1.fromDoubleClick(_this.headerWrap.nativeElement)
                .subscribe(function (e) { return _this.onClick(e, 'dblclick'); }));
        });
    };
    DayTimeViewComponent.prototype.onHeaderClick = function (e) {
        var _this = this;
        this.onClick(e);
        if (this.daySlots.length <= 1) {
            return;
        }
        var daySlotIndex = e.target.getAttribute('data-dayslot-index');
        if (daySlotIndex) {
            var slot_1 = this.daySlots[parseInt(daySlotIndex, 10)];
            this.zone.run(function () {
                _this.viewState.navigateTo({ viewName: 'day', date: slot_1.start });
            });
        }
    };
    DayTimeViewComponent.prototype.slotByIndex = function (slotIndex, args) {
        return this.slotService.slotByIndex(slotIndex, args.target.hasAttribute('data-day-slot'));
    };
    DayTimeViewComponent.prototype.onSelectDate = function (date) {
        this.selectedDate = date;
        this.daySlots = this.createDaySlots();
        this.showCurrentTime = this.enableCurrentTime();
        this.viewState.notifyDateRange(this.dateRange());
    };
    DayTimeViewComponent.prototype.onAction = function (e) {
        var now = kendo_date_math_1.getDate(this.selectedDate);
        if (e.type === 'next') {
            var next = this.getNextDate(now, 1, this.numberOfDays);
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            var next = this.getNextDate(now, -1, this.numberOfDays);
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'scroll-time') {
            this.scrollToTime(e.time);
        }
    };
    DayTimeViewComponent.prototype.dateRange = function (date) {
        if (date === void 0) { date = this.selectedDate; }
        var start = this.getStartDate(date);
        var end = this.getEndDate(start, this.numberOfDays);
        var rangeEnd = this.getEndDate(start, this.numberOfDays - 1);
        var text = this.intl.format(this.selectedDateFormat, start, rangeEnd);
        var shortText = this.intl.format(this.selectedShortDateFormat, start, rangeEnd);
        return { start: start, end: end, text: text, shortText: shortText };
    };
    DayTimeViewComponent.prototype.createDaySlots = function () {
        var current = this.getStartDate(this.selectedDate);
        var end = this.getEndDate(current, this.numberOfDays);
        var dates = [];
        while (current < end) {
            var next = kendo_date_math_1.addDays(current, 1);
            dates.push({
                start: current,
                end: next
            });
            current = next;
        }
        return dates;
    };
    DayTimeViewComponent.prototype.createTimeSlots = function () {
        return utils_2.createTimeSlots(this.intl, {
            showWorkHours: this.showWorkHours,
            startTime: this.startTime,
            endTime: this.endTime,
            workDayStart: this.workDayStart,
            workDayEnd: this.workDayEnd,
            slotDivisions: this.slotDivisions,
            slotDuration: this.slotDuration
        });
    };
    DayTimeViewComponent.prototype.initWorkDay = function () {
        var startDate = this.intl.parseDate(this.workDayStart);
        this.workDayStartTime = utils_1.toInvariantTime(startDate);
        var endDate = this.intl.parseDate(this.workDayEnd);
        this.workDayEndTime = utils_1.toInvariantTime(endDate);
    };
    DayTimeViewComponent.prototype.slotByPosition = function (x, y, container) {
        var isDaySlot = container ? dom_queries_1.hasClasses(container.parentNode, 'k-scheduler-header-wrap') : y < 0;
        return this.slotService.slotByPosition(x, y, isDaySlot, Boolean(this.verticalResources.length));
    };
    DayTimeViewComponent.prototype.slotFields = function (slot) {
        var fields = _super.prototype.slotFields.call(this, slot);
        if (slot.isDaySlot) {
            fields.isAllDay = true;
        }
        else {
            fields.start = this.convertDate(slot.start);
            fields.end = this.convertDate(slot.end);
        }
        return fields;
    };
    DayTimeViewComponent.propDecorators = {
        timeSlotTemplate: [{ type: core_1.Input }],
        dateHeaderTemplate: [{ type: core_1.Input }],
        numberOfDays: [{ type: core_1.Input }],
        scrollTime: [{ type: core_1.Input }],
        startTime: [{ type: core_1.Input }],
        endTime: [{ type: core_1.Input }],
        workDayStart: [{ type: core_1.Input }],
        workDayEnd: [{ type: core_1.Input }],
        workWeekStart: [{ type: core_1.Input }],
        workWeekEnd: [{ type: core_1.Input }],
        slotDuration: [{ type: core_1.Input }],
        slotDivisions: [{ type: core_1.Input }],
        showWorkHours: [{ type: core_1.Input }],
        getStartDate: [{ type: core_1.Input }],
        getEndDate: [{ type: core_1.Input }],
        getNextDate: [{ type: core_1.Input }],
        currentTimeMarker: [{ type: core_1.Input }],
        currentTimeElements: [{ type: core_1.ViewChildren, args: ['currentTimeMarker',] }],
        currentTimeArrows: [{ type: core_1.ViewChildren, args: ['currentTimeArrow',] }]
    };
    return DayTimeViewComponent;
}(base_view_1.BaseView));
exports.DayTimeViewComponent = DayTimeViewComponent;
