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
var VIEWS_COUNT = 5;
var isEqualMonthYear = function (date1, date2) { return (date1 && date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()); };
var ɵ0 = isEqualMonthYear;
/**
 * @hidden
 */
var ViewListComponent = /** @class */ (function () {
    function ViewListComponent(bus, cdr, intl, dom, renderer) {
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
    Object.defineProperty(ViewListComponent.prototype, "weekNumber", {
        get: function () {
            return this.showWeekNumbers && this.isMonthView();
        },
        set: function (showWeekNumbers) {
            this.showWeekNumbers = showWeekNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentMonthClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentYearClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentDecadeClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.decade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentCenturyClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.century;
        },
        enumerable: true,
        configurable: true
    });
    ViewListComponent.prototype.ngOnInit = function () {
        this.weekNames = this.getWeekNames();
        this.bottomOffset = this.getBottomOffset();
        this.viewOffset = -1 * this.dom.headerHeight;
        this.viewHeight = this.dom.viewHeight(this.activeView);
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    };
    ViewListComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.cols = new Array(this.service.rowLength(this.weekNumber)).fill('');
        this.colWidth = Math.round(100 / this.cols.length);
        this.weekNames = hasChange(changes, 'weekNumber') && this.weekNumber ? this.getWeekNames() : this.weekNames;
        var activeViewChanged = hasChange(changes, 'activeView');
        var focusedDate = this.focusedDate;
        var viewDate = dateInRange(this.service.viewDate(focusedDate, this.max, this.minViewsToRender), this.min, this.max);
        var total = this.service.total(this.min, this.max);
        var totalChanged = this.total && this.total !== total;
        var generateDates = totalChanged || !this.service.isInArray(focusedDate, this.dates);
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
        var updateIndex = hasChange(changes, 'focusedDate') || activeViewChanged;
        if (generateDates || updateIndex || this.virtualization.isIndexVisible(this.skip)) {
            this.indexToScroll = this.service.skip(focusedDate, this.min);
        }
    };
    ViewListComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    };
    ViewListComponent.prototype.ngAfterViewInit = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    ViewListComponent.prototype.ngAfterViewChecked = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization[this.animateToIndex ? 'animateToIndex' : 'scrollToIndex'](this.indexToScroll);
        this.animateToIndex = true;
        this.indexToScroll = -1;
    };
    ViewListComponent.prototype.onPageChange = function (_a) {
        var skip = _a.skip;
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    };
    ViewListComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        var el = this.list.nativeElement;
        var translate = "translateY(" + offset + "px)";
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    };
    ViewListComponent.prototype.setActiveDate = function (index) {
        var candidate = this.service.addToDate(this.min, index);
        if (isEqual(this.activeDate, candidate)) {
            return;
        }
        this.activeDate = candidate;
        this.activeDateChange.emit(candidate);
        this.cdr.detectChanges();
    };
    ViewListComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(candidate);
    };
    ViewListComponent.prototype.isMonthView = function () {
        return this.activeView === CalendarViewEnum.month;
    };
    ViewListComponent.prototype.isScrolled = function () {
        return this.virtualization.isListScrolled(this.service.skip(this.focusedDate, this.min));
    };
    ViewListComponent.prototype.getBottomOffset = function () {
        return this.getScrollableHeight() - this.dom.viewHeight(this.activeView);
    };
    ViewListComponent.prototype.getScrollableHeight = function () {
        return this.activeView === CalendarViewEnum.month ?
            this.dom.scrollableContentHeight :
            this.dom.scrollableYearContentHeight;
    };
    ViewListComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    ViewListComponent.prototype.getWeekNames = function () {
        var weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return this.weekNumber ? [''].concat(weekNames) : weekNames;
    };
    ViewListComponent.prototype.intlChange = function () {
        this.weekNames = this.getWeekNames();
        if (this.isMonthView()) {
            this.cdr.markForCheck();
        }
    };
    ViewListComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-viewlist',
                    template: "\n    <kendo-calendar-header\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [activeView]=\"activeView\"\n        [templateRef]=\"headerTitleTemplateRef\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-calendar-weekdays\" style=\"table-layout: auto;\" *ngIf=\"isMonthView()\">\n        <thead>\n            <tr>\n                <th *ngFor=\"let name of weekNames\" [style.width.%]=\"colWidth\">{{name}}</th>\n            </tr>\n        </thead>\n    </table>\n    <kendo-virtualization\n        [tabindex]=\"-1\"\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"viewHeight\"\n        [topOffset]=\"viewOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [scrollOffsetSize]=\"viewOffset\"\n        [maxScrollDifference]=\"viewHeight\"\n        (pageChange)=\"onPageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n        (activeIndexChange)=\"setActiveDate($event)\"\n        >\n        <table #list>\n            <colgroup><col *ngFor=\"let _ of cols\" /></colgroup>\n\n            <tbody *kFor=\"let date of dates\"\n                   kendoCalendarView\n                   role=\"rowgroup\"\n                   [activeView]=\"activeView\"\n                   [isActive]=\"isActive\"\n                   [min]=\"min\" [max]=\"max\"\n                   [cellUID]=\"cellUID\"\n                   [focusedDate]=\"focusedDate\"\n                   [selectedDate]=\"value\"\n                   [weekNumber]=\"weekNumber\"\n                   [templateRef]=\"cellTemplateRef\"\n                   [weekNumberTemplateRef]=\"weekNumberTemplateRef\"\n                   [viewDate]=\"date\"\n                   (change)=\"handleDateChange($event)\"\n            ></tbody>\n        </table>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    ViewListComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ChangeDetectorRef },
        { type: IntlService },
        { type: CalendarDOMService },
        { type: Renderer2 }
    ]; };
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
    return ViewListComponent;
}());
export { ViewListComponent };
export { ɵ0 };
