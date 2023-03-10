/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, Renderer2, AfterViewChecked, AfterViewInit, TemplateRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { PageAction, ScrollAction } from '../virtualization/services/scroller.service';
import { VirtualizationComponent } from '../virtualization/virtualization.component';
import { BusViewService } from './services/bus-view.service';
import { CalendarDOMService } from './services/dom.service';
import { ViewService } from './models/view-service.interface';
import { CalendarViewEnum } from './models/view.enum';
/**
 * @hidden
 */
export declare class ViewListComponent implements OnChanges, OnDestroy, AfterViewInit, AfterViewChecked {
    private bus;
    private cdr;
    private intl;
    private dom;
    private renderer;
    cellTemplateRef: TemplateRef<any>;
    weekNumberTemplateRef: TemplateRef<any>;
    headerTitleTemplateRef: TemplateRef<any>;
    activeView: CalendarViewEnum;
    cellUID: string;
    focusedDate: Date;
    isActive: boolean;
    min: Date;
    max: Date;
    value: Date;
    weekNumber: boolean;
    activeDateChange: EventEmitter<Date>;
    valueChange: EventEmitter<Date>;
    pageChange: EventEmitter<any>;
    virtualization: VirtualizationComponent;
    list: ElementRef;
    readonly getComponentClass: boolean;
    readonly getComponentMonthClass: boolean;
    readonly getComponentYearClass: boolean;
    readonly getComponentDecadeClass: boolean;
    readonly getComponentCenturyClass: boolean;
    service: ViewService;
    activeDate: Date;
    dates: Date[];
    cols: number[];
    colWidth: number;
    weekNames: string[];
    take: number;
    skip: number;
    total: number;
    bottomOffset: number;
    viewHeight: number;
    viewOffset: number;
    private animateToIndex;
    private indexToScroll;
    private showWeekNumbers;
    private minViewsToRender;
    private intlSubscription;
    constructor(bus: BusViewService, cdr: ChangeDetectorRef, intl: IntlService, dom: CalendarDOMService, renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    onPageChange({ skip }: PageAction): void;
    scrollChange({ offset }: ScrollAction): void;
    setActiveDate(index: number): void;
    handleDateChange(candidate: Date): void;
    isMonthView(): boolean;
    isScrolled(): boolean;
    private getBottomOffset;
    private getScrollableHeight;
    private getTake;
    private getWeekNames;
    private intlChange;
}
