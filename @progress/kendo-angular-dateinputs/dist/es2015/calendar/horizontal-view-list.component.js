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
const DEFAULT_VIEWS_LENGTH = 2;
/**
 * @hidden
 */
export class HorizontalViewListComponent {
    constructor(bus, cdr) {
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
    get weekNumber() {
        return this.showWeekNumbers && this.isMonthView();
    }
    set weekNumber(showWeekNumbers) {
        this.showWeekNumbers = showWeekNumbers;
    }
    get getComponentClass() {
        return true;
    }
    get getComponentMonthClass() {
        return this.activeView === CalendarViewEnum.month;
    }
    get getComponentYearClass() {
        return this.activeView === CalendarViewEnum.year;
    }
    get getComponentDecadeClass() {
        return this.activeView === CalendarViewEnum.decade;
    }
    get getComponentCenturyClass() {
        return this.activeView === CalendarViewEnum.century;
    }
    ngOnChanges(changes) {
        this.initService();
        if (!this.service) {
            return;
        }
        this.views = this.views || DEFAULT_VIEWS_LENGTH;
        const focusedDate = this.focusedDate;
        const viewDate = this.clampDate(this.service.viewDate(focusedDate, this.max, this.views));
        this.skip = this.service.skip(viewDate, this.min);
        this.total = this.service.total(this.min, this.max);
        const activeViewChanged = hasChange(changes, 'activeView');
        const viewsHasChanged = this.views > 0 && hasChange(changes, 'views');
        if (activeViewChanged || !this.isInDates(focusedDate) || viewsHasChanged || !this.activeDate) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
            this.activeDate = cloneDate(this.dates[0]);
        }
    }
    initService() {
        this.service = this.bus.service(this.activeView);
    }
    handleDateChange(candidate) {
        this.valueChange.emit(candidate);
    }
    isMonthView() {
        return this.activeView === CalendarViewEnum.month;
    }
    navigate(action) {
        const candidate = this.move(action);
        const list = this.service.datesList(candidate, this.getTake(this.skip));
        if (this.isListInRange(list)) {
            this.dates = list;
        }
        this.activeDate = cloneDate(this.dates[0]);
        this.focusedDate = cloneDate(candidate);
        this.cdr.markForCheck();
        return cloneDate(candidate);
    }
    canNavigate(action) {
        if (!this.service) {
            return false;
        }
        return this.isListInRange(this.service.datesList(this.move(action), this.getTake(this.skip)));
    }
    clampDate(value) {
        return dateInRange(value, this.min, this.max);
    }
    move(action) {
        return this.service.move(this.dates[0] || this.focusedDate, action);
    }
    isListInRange(list) {
        const lowerBound = this.service.beginningOfPeriod(this.min);
        const upperBound = this.service.beginningOfPeriod(this.service.addToDate(this.max, 1));
        return lowerBound <= list[0] && list[list.length - 1] < upperBound;
    }
    isInDates(value) {
        return this.service.isInArray(value, this.dates);
    }
    getTake(skip) {
        return Math.min(this.total - skip, this.views);
    }
}
HorizontalViewListComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-horizontal',
                template: `
    <kendo-calendar-header
        [activeView]="activeView"
        [currentDate]="activeDate"
        [min]="min"
        [max]="max"
        [rangeLength]="views"
        [templateRef]="headerTitleTemplateRef"
        (today)="handleDateChange($event)"
    >
    </kendo-calendar-header>
    <table class="k-content">
        <tbody *kFor="let date of dates"
               kendoCalendarView
               role="rowgroup"
               direction="horizontal"
               [activeView]="activeView"
               [isActive]="isActive"
               [min]="min" [max]="max"
               [cellUID]="cellUID"
               [focusedDate]="focusedDate"
               [selectedDate]="value"
               [selectionRange]="selectionRange"
               [activeRangeEnd]="activeRangeEnd"
               [weekNumber]="weekNumber"
               [templateRef]="cellTemplateRef"
               [weekNumberTemplateRef]="weekNumberTemplateRef"
               [viewDate]="date"
               (change)="handleDateChange($event)"
               (cellEnter)="cellEnter.emit($event)"
               (cellLeave)="cellLeave.emit($event)"
        ></tbody>
    </table>
  `
            },] },
];
/** @nocollapse */
HorizontalViewListComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ChangeDetectorRef }
];
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
