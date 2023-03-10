import { ElementRef } from '@angular/core';
import { BaseSlotDirective } from '../view-items/base-slot.directive';
import { DayTimeSlotService } from './day-time-slot.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class TimeSlotDirective extends BaseSlotDirective {
    invariantStart: Date;
    invariantEnd: Date;
    workDayStart: Date;
    workDayEnd: Date;
    workWeekStart: number;
    workWeekEnd: number;
    date: Date;
    readonly nonWorkHour: boolean;
    readonly isDaySlot: boolean;
    readonly startLocalTime: Date;
    readonly endLocalTime: Date;
    readonly start: Date;
    readonly end: Date;
    constructor(element: ElementRef, slotService: DayTimeSlotService, localization: LocalizationService);
}
/**
 * @hidden
 */
export declare class DaySlotDirective extends BaseSlotDirective {
    start: Date;
    end: Date;
    readonly daySlot: boolean;
    readonly isDaySlot: boolean;
    private startDate;
    private endDate;
    constructor(element: ElementRef, slotService: DayTimeSlotService, localization: LocalizationService);
}
