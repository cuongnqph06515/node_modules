/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, EventEmitter, OnChanges, TemplateRef } from '@angular/core';
import { BusViewService } from './services/bus-view.service';
import { ViewService } from './models/view-service.interface';
import { SelectionRangeEnd } from './models/selection-range-end.type';
import { SelectionRange } from './models/selection-range.interface';
import { Action } from './models/navigation-action.enum';
import { CalendarViewEnum } from './models/view.enum';
/**
 * @hidden
 */
export declare class HorizontalViewListComponent implements OnChanges {
    private bus;
    private cdr;
    cellTemplateRef: TemplateRef<any>;
    weekNumberTemplateRef: TemplateRef<any>;
    headerTitleTemplateRef: TemplateRef<any>;
    activeRangeEnd: SelectionRangeEnd;
    activeView: CalendarViewEnum;
    cellUID: string;
    focusedDate: Date;
    isActive: boolean;
    min: Date;
    max: Date;
    selectionRange: SelectionRange;
    value: Date;
    views: number;
    weekNumber: boolean;
    valueChange: EventEmitter<Date>;
    cellEnter: EventEmitter<Date>;
    cellLeave: EventEmitter<Date>;
    readonly getComponentClass: boolean;
    readonly getComponentMonthClass: boolean;
    readonly getComponentYearClass: boolean;
    readonly getComponentDecadeClass: boolean;
    readonly getComponentCenturyClass: boolean;
    service: ViewService;
    activeDate: Date;
    dates: Date[];
    skip: number;
    total: number;
    private showWeekNumbers;
    constructor(bus: BusViewService, cdr: ChangeDetectorRef);
    ngOnChanges(changes: any): void;
    initService(): void;
    handleDateChange(candidate: Date): void;
    isMonthView(): boolean;
    navigate(action: Action): Date;
    canNavigate(action: Action): boolean;
    private clampDate;
    private move;
    private isListInRange;
    private isInDates;
    private getTake;
}
