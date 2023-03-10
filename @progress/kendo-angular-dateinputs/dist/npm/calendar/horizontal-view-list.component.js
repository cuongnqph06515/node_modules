/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var bus_view_service_1 = require("./services/bus-view.service");
var view_enum_1 = require("./models/view.enum");
var defaults_1 = require("../defaults");
var util_1 = require("../util");
var DEFAULT_VIEWS_LENGTH = 2;
/**
 * @hidden
 */
var HorizontalViewListComponent = /** @class */ (function () {
    function HorizontalViewListComponent(bus, cdr) {
        this.bus = bus;
        this.cdr = cdr;
        this.activeView = view_enum_1.CalendarViewEnum.month;
        this.isActive = true;
        this.min = new Date(defaults_1.MIN_DATE);
        this.max = new Date(defaults_1.MAX_DATE);
        this.views = DEFAULT_VIEWS_LENGTH;
        this.valueChange = new core_1.EventEmitter();
        this.cellEnter = new core_1.EventEmitter();
        this.cellLeave = new core_1.EventEmitter();
        this.dates = [];
    }
    Object.defineProperty(HorizontalViewListComponent.prototype, "weekNumber", {
        get: function () {
            return this.showWeekNumbers && this.isMonthView();
        },
        set: function (showWeekNumbers) {
            this.showWeekNumbers = showWeekNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentMonthClass", {
        get: function () {
            return this.activeView === view_enum_1.CalendarViewEnum.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentYearClass", {
        get: function () {
            return this.activeView === view_enum_1.CalendarViewEnum.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentDecadeClass", {
        get: function () {
            return this.activeView === view_enum_1.CalendarViewEnum.decade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentCenturyClass", {
        get: function () {
            return this.activeView === view_enum_1.CalendarViewEnum.century;
        },
        enumerable: true,
        configurable: true
    });
    HorizontalViewListComponent.prototype.ngOnChanges = function (changes) {
        this.initService();
        if (!this.service) {
            return;
        }
        this.views = this.views || DEFAULT_VIEWS_LENGTH;
        var focusedDate = this.focusedDate;
        var viewDate = this.clampDate(this.service.viewDate(focusedDate, this.max, this.views));
        this.skip = this.service.skip(viewDate, this.min);
        this.total = this.service.total(this.min, this.max);
        var activeViewChanged = util_1.hasChange(changes, 'activeView');
        var viewsHasChanged = this.views > 0 && util_1.hasChange(changes, 'views');
        if (activeViewChanged || !this.isInDates(focusedDate) || viewsHasChanged || !this.activeDate) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
            this.activeDate = kendo_date_math_1.cloneDate(this.dates[0]);
        }
    };
    HorizontalViewListComponent.prototype.initService = function () {
        this.service = this.bus.service(this.activeView);
    };
    HorizontalViewListComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(candidate);
    };
    HorizontalViewListComponent.prototype.isMonthView = function () {
        return this.activeView === view_enum_1.CalendarViewEnum.month;
    };
    HorizontalViewListComponent.prototype.navigate = function (action) {
        var candidate = this.move(action);
        var list = this.service.datesList(candidate, this.getTake(this.skip));
        if (this.isListInRange(list)) {
            this.dates = list;
        }
        this.activeDate = kendo_date_math_1.cloneDate(this.dates[0]);
        this.focusedDate = kendo_date_math_1.cloneDate(candidate);
        this.cdr.markForCheck();
        return kendo_date_math_1.cloneDate(candidate);
    };
    HorizontalViewListComponent.prototype.canNavigate = function (action) {
        if (!this.service) {
            return false;
        }
        return this.isListInRange(this.service.datesList(this.move(action), this.getTake(this.skip)));
    };
    HorizontalViewListComponent.prototype.clampDate = function (value) {
        return util_1.dateInRange(value, this.min, this.max);
    };
    HorizontalViewListComponent.prototype.move = function (action) {
        return this.service.move(this.dates[0] || this.focusedDate, action);
    };
    HorizontalViewListComponent.prototype.isListInRange = function (list) {
        var lowerBound = this.service.beginningOfPeriod(this.min);
        var upperBound = this.service.beginningOfPeriod(this.service.addToDate(this.max, 1));
        return lowerBound <= list[0] && list[list.length - 1] < upperBound;
    };
    HorizontalViewListComponent.prototype.isInDates = function (value) {
        return this.service.isInArray(value, this.dates);
    };
    HorizontalViewListComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.views);
    };
    HorizontalViewListComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-horizontal',
                    template: "\n    <kendo-calendar-header\n        [activeView]=\"activeView\"\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [rangeLength]=\"views\"\n        [templateRef]=\"headerTitleTemplateRef\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-content\">\n        <tbody *kFor=\"let date of dates\"\n               kendoCalendarView\n               role=\"rowgroup\"\n               direction=\"horizontal\"\n               [activeView]=\"activeView\"\n               [isActive]=\"isActive\"\n               [min]=\"min\" [max]=\"max\"\n               [cellUID]=\"cellUID\"\n               [focusedDate]=\"focusedDate\"\n               [selectedDate]=\"value\"\n               [selectionRange]=\"selectionRange\"\n               [activeRangeEnd]=\"activeRangeEnd\"\n               [weekNumber]=\"weekNumber\"\n               [templateRef]=\"cellTemplateRef\"\n               [weekNumberTemplateRef]=\"weekNumberTemplateRef\"\n               [viewDate]=\"date\"\n               (change)=\"handleDateChange($event)\"\n               (cellEnter)=\"cellEnter.emit($event)\"\n               (cellLeave)=\"cellLeave.emit($event)\"\n        ></tbody>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    HorizontalViewListComponent.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    HorizontalViewListComponent.propDecorators = {
        cellTemplateRef: [{ type: core_1.Input }],
        weekNumberTemplateRef: [{ type: core_1.Input }],
        headerTitleTemplateRef: [{ type: core_1.Input }],
        activeRangeEnd: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        cellUID: [{ type: core_1.Input }],
        focusedDate: [{ type: core_1.Input }],
        isActive: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        selectionRange: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        views: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        cellEnter: [{ type: core_1.Output }],
        cellLeave: [{ type: core_1.Output }],
        getComponentClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-view",] }],
        getComponentMonthClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-monthview",] }],
        getComponentYearClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-yearview",] }],
        getComponentDecadeClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-decadeview",] }],
        getComponentCenturyClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-centuryview",] }]
    };
    return HorizontalViewListComponent;
}());
exports.HorizontalViewListComponent = HorizontalViewListComponent;
