/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:component-selector-name  component-selector-type */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
import { cloneDate } from '@progress/kendo-date-math';
import { BusViewService } from './services/bus-view.service';
import { CalendarViewEnum } from './models/view.enum';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, hasChange } from '../util';
var DEFAULT_VIEWS_LENGTH = 2;
/**
 * @hidden
 */
var HorizontalViewListComponent = /** @class */ (function () {
    function HorizontalViewListComponent(bus, cdr) {
        this.bus = bus;
        this.cdr = cdr;
        this.activeView = CalendarViewEnum.month;
        this.isActive = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.views = DEFAULT_VIEWS_LENGTH;
        this.valueChange = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
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
            return this.activeView === CalendarViewEnum.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentYearClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentDecadeClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.decade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentCenturyClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.century;
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
        var activeViewChanged = hasChange(changes, 'activeView');
        var viewsHasChanged = this.views > 0 && hasChange(changes, 'views');
        if (activeViewChanged || !this.isInDates(focusedDate) || viewsHasChanged || !this.activeDate) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
            this.activeDate = cloneDate(this.dates[0]);
        }
    };
    HorizontalViewListComponent.prototype.initService = function () {
        this.service = this.bus.service(this.activeView);
    };
    HorizontalViewListComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(candidate);
    };
    HorizontalViewListComponent.prototype.isMonthView = function () {
        return this.activeView === CalendarViewEnum.month;
    };
    HorizontalViewListComponent.prototype.navigate = function (action) {
        var candidate = this.move(action);
        var list = this.service.datesList(candidate, this.getTake(this.skip));
        if (this.isListInRange(list)) {
            this.dates = list;
        }
        this.activeDate = cloneDate(this.dates[0]);
        this.focusedDate = cloneDate(candidate);
        this.cdr.markForCheck();
        return cloneDate(candidate);
    };
    HorizontalViewListComponent.prototype.canNavigate = function (action) {
        if (!this.service) {
            return false;
        }
        return this.isListInRange(this.service.datesList(this.move(action), this.getTake(this.skip)));
    };
    HorizontalViewListComponent.prototype.clampDate = function (value) {
        return dateInRange(value, this.min, this.max);
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-horizontal',
                    template: "\n    <kendo-calendar-header\n        [activeView]=\"activeView\"\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [rangeLength]=\"views\"\n        [templateRef]=\"headerTitleTemplateRef\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-content\">\n        <tbody *kFor=\"let date of dates\"\n               kendoCalendarView\n               role=\"rowgroup\"\n               direction=\"horizontal\"\n               [activeView]=\"activeView\"\n               [isActive]=\"isActive\"\n               [min]=\"min\" [max]=\"max\"\n               [cellUID]=\"cellUID\"\n               [focusedDate]=\"focusedDate\"\n               [selectedDate]=\"value\"\n               [selectionRange]=\"selectionRange\"\n               [activeRangeEnd]=\"activeRangeEnd\"\n               [weekNumber]=\"weekNumber\"\n               [templateRef]=\"cellTemplateRef\"\n               [weekNumberTemplateRef]=\"weekNumberTemplateRef\"\n               [viewDate]=\"date\"\n               (change)=\"handleDateChange($event)\"\n               (cellEnter)=\"cellEnter.emit($event)\"\n               (cellLeave)=\"cellLeave.emit($event)\"\n        ></tbody>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    HorizontalViewListComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ChangeDetectorRef }
    ]; };
    HorizontalViewListComponent.propDecorators = {
        cellTemplateRef: [{ type: Input }],
        weekNumberTemplateRef: [{ type: Input }],
        headerTitleTemplateRef: [{ type: Input }],
        activeRangeEnd: [{ type: Input }],
        activeView: [{ type: Input }],
        cellUID: [{ type: Input }],
        focusedDate: [{ type: Input }],
        isActive: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        selectionRange: [{ type: Input }],
        value: [{ type: Input }],
        views: [{ type: Input }],
        weekNumber: [{ type: Input }],
        valueChange: [{ type: Output }],
        cellEnter: [{ type: Output }],
        cellLeave: [{ type: Output }],
        getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-view",] }],
        getComponentMonthClass: [{ type: HostBinding, args: ["class.k-calendar-monthview",] }],
        getComponentYearClass: [{ type: HostBinding, args: ["class.k-calendar-yearview",] }],
        getComponentDecadeClass: [{ type: HostBinding, args: ["class.k-calendar-decadeview",] }],
        getComponentCenturyClass: [{ type: HostBinding, args: ["class.k-calendar-centuryview",] }]
    };
    return HorizontalViewListComponent;
}());
export { HorizontalViewListComponent };
