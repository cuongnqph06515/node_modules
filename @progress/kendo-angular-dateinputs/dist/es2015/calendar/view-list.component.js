/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { cloneDate, isEqual } from '@progress/kendo-date-math';
import { IntlService } from '@progress/kendo-angular-intl';
import { VirtualizationComponent } from '../virtualization/virtualization.component';
import { BusViewService } from './services/bus-view.service';
import { CalendarDOMService } from './services/dom.service';
import { CalendarViewEnum } from './models/view.enum';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, hasChange, shiftWeekNames } from '../util';
const VIEWS_COUNT = 5;
const isEqualMonthYear = (date1, date2) => (date1 && date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth());
const ɵ0 = isEqualMonthYear;
/**
 * @hidden
 */
export class ViewListComponent {
    constructor(bus, cdr, intl, dom, renderer) {
        this.bus = bus;
        this.cdr = cdr;
        this.intl = intl;
        this.dom = dom;
        this.renderer = renderer;
        this.isActive = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.activeDateChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.dates = [];
        this.cols = [];
        this.weekNames = [];
        this.take = VIEWS_COUNT;
        this.animateToIndex = true;
        this.indexToScroll = -1;
        this.minViewsToRender = 1;
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
    ngOnInit() {
        this.weekNames = this.getWeekNames();
        this.bottomOffset = this.getBottomOffset();
        this.viewOffset = -1 * this.dom.headerHeight;
        this.viewHeight = this.dom.viewHeight(this.activeView);
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    }
    ngOnChanges(changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.cols = new Array(this.service.rowLength(this.weekNumber)).fill('');
        this.colWidth = Math.round(100 / this.cols.length);
        this.weekNames = hasChange(changes, 'weekNumber') && this.weekNumber ? this.getWeekNames() : this.weekNames;
        const activeViewChanged = hasChange(changes, 'activeView');
        const focusedDate = this.focusedDate;
        const viewDate = dateInRange(this.service.viewDate(focusedDate, this.max, this.minViewsToRender), this.min, this.max);
        const total = this.service.total(this.min, this.max);
        const totalChanged = this.total && this.total !== total;
        const generateDates = totalChanged || !this.service.isInArray(focusedDate, this.dates);
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        this.animateToIndex = !activeViewChanged;
        this.bottomOffset = this.getBottomOffset();
        this.viewHeight = this.dom.viewHeight(this.activeView);
        if (generateDates) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!isEqualMonthYear(this.activeDate, focusedDate)) {
            this.activeDate = cloneDate(focusedDate);
        }
        const updateIndex = hasChange(changes, 'focusedDate') || activeViewChanged;
        if (generateDates || updateIndex || this.virtualization.isIndexVisible(this.skip)) {
            this.indexToScroll = this.service.skip(focusedDate, this.min);
        }
    }
    ngOnDestroy() {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    }
    ngAfterViewInit() {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    }
    ngAfterViewChecked() {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization[this.animateToIndex ? 'animateToIndex' : 'scrollToIndex'](this.indexToScroll);
        this.animateToIndex = true;
        this.indexToScroll = -1;
    }
    onPageChange({ skip }) {
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    }
    scrollChange({ offset }) {
        const el = this.list.nativeElement;
        const translate = `translateY(${offset}px)`;
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    }
    setActiveDate(index) {
        const candidate = this.service.addToDate(this.min, index);
        if (isEqual(this.activeDate, candidate)) {
            return;
        }
        this.activeDate = candidate;
        this.activeDateChange.emit(candidate);
        this.cdr.detectChanges();
    }
    handleDateChange(candidate) {
        this.valueChange.emit(candidate);
    }
    isMonthView() {
        return this.activeView === CalendarViewEnum.month;
    }
    isScrolled() {
        return this.virtualization.isListScrolled(this.service.skip(this.focusedDate, this.min));
    }
    getBottomOffset() {
        return this.getScrollableHeight() - this.dom.viewHeight(this.activeView);
    }
    getScrollableHeight() {
        return this.activeView === CalendarViewEnum.month ?
            this.dom.scrollableContentHeight :
            this.dom.scrollableYearContentHeight;
    }
    getTake(skip) {
        return Math.min(this.total - skip, this.take);
    }
    getWeekNames() {
        const weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return this.weekNumber ? [''].concat(weekNames) : weekNames;
    }
    intlChange() {
        this.weekNames = this.getWeekNames();
        if (this.isMonthView()) {
            this.cdr.markForCheck();
        }
    }
}
ViewListComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-viewlist',
                template: `
    <kendo-calendar-header
        [currentDate]="activeDate"
        [min]="min"
        [max]="max"
        [activeView]="activeView"
        [templateRef]="headerTitleTemplateRef"
        (today)="handleDateChange($event)"
    >
    </kendo-calendar-header>
    <table class="k-calendar-weekdays" style="table-layout: auto;" *ngIf="isMonthView()">
        <thead>
            <tr>
                <th *ngFor="let name of weekNames" [style.width.%]="colWidth">{{name}}</th>
            </tr>
        </thead>
    </table>
    <kendo-virtualization
        [tabindex]="-1"
        [skip]="skip"
        [take]="take"
        [total]="total"
        [itemHeight]="viewHeight"
        [topOffset]="viewOffset"
        [bottomOffset]="bottomOffset"
        [scrollOffsetSize]="viewOffset"
        [maxScrollDifference]="viewHeight"
        (pageChange)="onPageChange($event)"
        (scrollChange)="scrollChange($event)"
        (activeIndexChange)="setActiveDate($event)"
        >
        <table #list>
            <colgroup><col *ngFor="let _ of cols" /></colgroup>

            <tbody *kFor="let date of dates"
                   kendoCalendarView
                   role="rowgroup"
                   [activeView]="activeView"
                   [isActive]="isActive"
                   [min]="min" [max]="max"
                   [cellUID]="cellUID"
                   [focusedDate]="focusedDate"
                   [selectedDate]="value"
                   [weekNumber]="weekNumber"
                   [templateRef]="cellTemplateRef"
                   [weekNumberTemplateRef]="weekNumberTemplateRef"
                   [viewDate]="date"
                   (change)="handleDateChange($event)"
            ></tbody>
        </table>
    </kendo-virtualization>
  `
            },] },
];
/** @nocollapse */
ViewListComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ChangeDetectorRef },
    { type: IntlService },
    { type: CalendarDOMService },
    { type: Renderer2 }
];
ViewListComponent.propDecorators = {
    cellTemplateRef: [{ type: Input }],
    weekNumberTemplateRef: [{ type: Input }],
    headerTitleTemplateRef: [{ type: Input }],
    activeView: [{ type: Input }],
    cellUID: [{ type: Input }],
    focusedDate: [{ type: Input }],
    isActive: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    value: [{ type: Input }],
    weekNumber: [{ type: Input }],
    activeDateChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    virtualization: [{ type: ViewChild, args: [VirtualizationComponent,] }],
    list: [{ type: ViewChild, args: ['list', { static: true },] }],
    getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-view",] }],
    getComponentMonthClass: [{ type: HostBinding, args: ["class.k-calendar-monthview",] }],
    getComponentYearClass: [{ type: HostBinding, args: ["class.k-calendar-yearview",] }],
    getComponentDecadeClass: [{ type: HostBinding, args: ["class.k-calendar-decadeview",] }],
    getComponentCenturyClass: [{ type: HostBinding, args: ["class.k-calendar-centuryview",] }]
};
export { ɵ0 };
