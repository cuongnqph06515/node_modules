/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:component-selector-name  component-selector-type */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { BusViewService } from './services/bus-view.service';
import { CalendarDOMService } from './services/dom.service';
import { CalendarViewEnum } from './models/view.enum';
import { VirtualizationComponent } from '../virtualization/virtualization.component';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { cloneDate } from '@progress/kendo-date-math';
import { dateInRange } from '../util';
import { closestInScope } from '../common/dom-queries';
var ITEMS_COUNT = 30;
/**
 * @hidden
 */
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(bus, dom, intl, cdr, renderer) {
        this.bus = bus;
        this.dom = dom;
        this.intl = intl;
        this.cdr = cdr;
        this.renderer = renderer;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.focusedDate = new Date();
        this.valueChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.dates = [];
        this.take = ITEMS_COUNT;
        this.indexToScroll = -1;
    }
    Object.defineProperty(NavigationComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NavigationComponent.prototype.ngOnInit = function () {
        this.dom.ensureHeights();
        var calendarHeight = this.dom.calendarHeight;
        this.itemHeight = this.dom.navigationItemHeight;
        this.maxViewHeight = this.dom.monthViewHeight;
        this.topOffset = (calendarHeight - this.itemHeight) / 2;
        this.bottomOffset = calendarHeight - this.itemHeight;
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    };
    NavigationComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        var viewDate = dateInRange(this.focusedDate, this.min, this.max);
        var total = this.service.total(this.min, this.max);
        var totalChanged = this.total && this.total !== total;
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        if (totalChanged || !this.service.isInArray(viewDate, this.dates)) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = this.service.skip(this.focusedDate, this.min);
        }
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    };
    NavigationComponent.prototype.ngAfterViewInit = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    NavigationComponent.prototype.ngAfterViewChecked = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    NavigationComponent.prototype.onPageChange = function (_a) {
        var skip = _a.skip;
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    };
    NavigationComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        var el = this.list.nativeElement;
        var translate = "translateY(" + offset + "px)";
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    };
    NavigationComponent.prototype.handleDateChange = function (args) {
        var item = closestInScope(args.target, function (node) { return node.hasAttribute('data-date-index'); }, this.list.nativeElement);
        if (item) {
            var index = parseInt(item.getAttribute('data-date-index'), 10);
            var candidate = this.dates[index];
            this.valueChange.emit(cloneDate(candidate));
        }
    };
    NavigationComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    NavigationComponent.prototype.intlChange = function () {
        if (this.activeView === CalendarViewEnum.month) {
            this.cdr.markForCheck();
        }
    };
    NavigationComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-navigation',
                    template: "\n    <span class=\"k-calendar-navigation-highlight\"></span>\n    <kendo-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [maxScrollDifference]=\"maxViewHeight\"\n        (pageChange)=\"onPageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n    >\n        <ul #list class=\"k-reset\" [kendoEventsOutsideAngular]=\"{ click: handleDateChange }\" [scope]=\"this\">\n            <li *kFor=\"let date of dates; let index=index\" [attr.data-date-index]=\"index\">\n                <span [class.k-calendar-navigation-marker]=\"service.isRangeStart(date)\">\n                    <ng-template [ngIf]=\"!templateRef\">{{service.navigationTitle(date)}}</ng-template>\n                    <ng-template\n                        [ngIf]=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngTemplateOutletContext]=\"{ $implicit: service.navigationTitle(date), activeView: activeViewValue, date: date }\"\n                    ></ng-template>\n                </span>\n            </li>\n        </ul>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    NavigationComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: CalendarDOMService },
        { type: IntlService },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    NavigationComponent.propDecorators = {
        activeView: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        focusedDate: [{ type: Input }],
        templateRef: [{ type: Input }],
        valueChange: [{ type: Output }],
        pageChange: [{ type: Output }],
        virtualization: [{ type: ViewChild, args: [VirtualizationComponent,] }],
        list: [{ type: ViewChild, args: ['list', { static: true },] }],
        getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-navigation",] }]
    };
    return NavigationComponent;
}());
export { NavigationComponent };
