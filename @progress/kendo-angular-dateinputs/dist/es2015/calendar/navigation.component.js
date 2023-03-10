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
const ITEMS_COUNT = 30;
/**
 * @hidden
 */
export class NavigationComponent {
    constructor(bus, dom, intl, cdr, renderer) {
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
    get getComponentClass() {
        return true;
    }
    ngOnInit() {
        this.dom.ensureHeights();
        const calendarHeight = this.dom.calendarHeight;
        this.itemHeight = this.dom.navigationItemHeight;
        this.maxViewHeight = this.dom.monthViewHeight;
        this.topOffset = (calendarHeight - this.itemHeight) / 2;
        this.bottomOffset = calendarHeight - this.itemHeight;
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    }
    ngOnChanges(changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        const viewDate = dateInRange(this.focusedDate, this.min, this.max);
        const total = this.service.total(this.min, this.max);
        const totalChanged = this.total && this.total !== total;
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        if (totalChanged || !this.service.isInArray(viewDate, this.dates)) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = this.service.skip(this.focusedDate, this.min);
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
        this.virtualization.scrollToIndex(this.indexToScroll);
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
    handleDateChange(args) {
        const item = closestInScope(args.target, node => node.hasAttribute('data-date-index'), this.list.nativeElement);
        if (item) {
            const index = parseInt(item.getAttribute('data-date-index'), 10);
            const candidate = this.dates[index];
            this.valueChange.emit(cloneDate(candidate));
        }
    }
    getTake(skip) {
        return Math.min(this.total - skip, this.take);
    }
    intlChange() {
        if (this.activeView === CalendarViewEnum.month) {
            this.cdr.markForCheck();
        }
    }
}
NavigationComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-navigation',
                template: `
    <span class="k-calendar-navigation-highlight"></span>
    <kendo-virtualization
        [skip]="skip"
        [take]="take"
        [total]="total"
        [itemHeight]="itemHeight"
        [topOffset]="topOffset"
        [bottomOffset]="bottomOffset"
        [maxScrollDifference]="maxViewHeight"
        (pageChange)="onPageChange($event)"
        (scrollChange)="scrollChange($event)"
    >
        <ul #list class="k-reset" [kendoEventsOutsideAngular]="{ click: handleDateChange }" [scope]="this">
            <li *kFor="let date of dates; let index=index" [attr.data-date-index]="index">
                <span [class.k-calendar-navigation-marker]="service.isRangeStart(date)">
                    <ng-template [ngIf]="!templateRef">{{service.navigationTitle(date)}}</ng-template>
                    <ng-template
                        [ngIf]="templateRef"
                        [ngTemplateOutlet]="templateRef"
                        [ngTemplateOutletContext]="{ $implicit: service.navigationTitle(date), activeView: activeViewValue, date: date }"
                    ></ng-template>
                </span>
            </li>
        </ul>
    </kendo-virtualization>
  `
            },] },
];
/** @nocollapse */
NavigationComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: CalendarDOMService },
    { type: IntlService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
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
