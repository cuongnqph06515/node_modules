import { Directive, Input, ElementRef, HostBinding } from '@angular/core';
import { BaseSlotDirective } from '../view-items/base-slot.directive';
import { addUTCDays, toUTCTime, toUTCDate, dateWithTime, isWorkWeekDay } from '../utils';
import { DayTimeSlotService } from './day-time-slot.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { INVARIANT_END } from '../constants';
/**
 * @hidden
 */
export class TimeSlotDirective extends BaseSlotDirective {
    constructor(element, slotService, localization) {
        super(element, slotService, localization);
        this.isDaySlot = false;
    }
    get nonWorkHour() {
        const date = this.date.getDay();
        return this.invariantStart < this.workDayStart || this.workDayEnd < this.invariantEnd || !isWorkWeekDay(date, this.workWeekStart, this.workWeekEnd);
    }
    get startLocalTime() {
        if (!this.date || !this.invariantStart) {
            return null;
        }
        return dateWithTime(this.date, this.invariantStart);
    }
    get endLocalTime() {
        if (!this.date || !this.invariantEnd) {
            return null;
        }
        return dateWithTime(this.date, this.invariantEnd);
    }
    get start() {
        if (!this.date || !this.invariantStart) {
            return null;
        }
        return toUTCTime(this.date, this.invariantStart);
    }
    get end() {
        if (!this.date || !this.invariantEnd) {
            return null;
        }
        const localEnd = toUTCTime(this.date, this.invariantEnd);
        if (INVARIANT_END.getTime() <= this.invariantEnd.getTime()) {
            return addUTCDays(localEnd, 1);
        }
        return localEnd;
    }
}
TimeSlotDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[timeSlot]',
                exportAs: 'timeSlot'
            },] },
];
/** @nocollapse */
TimeSlotDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DayTimeSlotService },
    { type: LocalizationService }
];
TimeSlotDirective.propDecorators = {
    invariantStart: [{ type: Input }],
    invariantEnd: [{ type: Input }],
    workDayStart: [{ type: Input }],
    workDayEnd: [{ type: Input }],
    workWeekStart: [{ type: Input }],
    workWeekEnd: [{ type: Input }],
    date: [{ type: Input }],
    nonWorkHour: [{ type: HostBinding, args: ['class.k-nonwork-hour',] }]
};
/**
 * @hidden
 */
export class DaySlotDirective extends BaseSlotDirective {
    constructor(element, slotService, localization) {
        super(element, slotService, localization);
        this.isDaySlot = true;
    }
    set start(value) {
        this.startDate = value;
    }
    get start() {
        if (!this.startDate) {
            return null;
        }
        return toUTCDate(this.startDate);
    }
    set end(value) {
        this.endDate = value;
    }
    get end() {
        if (!this.endDate) {
            return null;
        }
        return toUTCDate(this.endDate);
    }
    get daySlot() {
        return true;
    }
}
DaySlotDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[daySlot]'
            },] },
];
/** @nocollapse */
DaySlotDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DayTimeSlotService },
    { type: LocalizationService }
];
DaySlotDirective.propDecorators = {
    start: [{ type: Input }],
    end: [{ type: Input }],
    daySlot: [{ type: HostBinding, args: ['attr.data-day-slot',] }]
};
