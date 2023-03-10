import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, HostBinding } from '@angular/core';
import { BaseSlotDirective } from '../view-items/base-slot.directive';
import { addUTCDays, toUTCTime, toUTCDate, dateWithTime, isWorkWeekDay } from '../utils';
import { DayTimeSlotService } from './day-time-slot.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { INVARIANT_END } from '../constants';
/**
 * @hidden
 */
var TimeSlotDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TimeSlotDirective, _super);
    function TimeSlotDirective(element, slotService, localization) {
        var _this = _super.call(this, element, slotService, localization) || this;
        _this.isDaySlot = false;
        return _this;
    }
    Object.defineProperty(TimeSlotDirective.prototype, "nonWorkHour", {
        get: function () {
            var date = this.date.getDay();
            return this.invariantStart < this.workDayStart || this.workDayEnd < this.invariantEnd || !isWorkWeekDay(date, this.workWeekStart, this.workWeekEnd);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "startLocalTime", {
        get: function () {
            if (!this.date || !this.invariantStart) {
                return null;
            }
            return dateWithTime(this.date, this.invariantStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "endLocalTime", {
        get: function () {
            if (!this.date || !this.invariantEnd) {
                return null;
            }
            return dateWithTime(this.date, this.invariantEnd);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "start", {
        get: function () {
            if (!this.date || !this.invariantStart) {
                return null;
            }
            return toUTCTime(this.date, this.invariantStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "end", {
        get: function () {
            if (!this.date || !this.invariantEnd) {
                return null;
            }
            var localEnd = toUTCTime(this.date, this.invariantEnd);
            if (INVARIANT_END.getTime() <= this.invariantEnd.getTime()) {
                return addUTCDays(localEnd, 1);
            }
            return localEnd;
        },
        enumerable: true,
        configurable: true
    });
    TimeSlotDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[timeSlot]',
                    exportAs: 'timeSlot'
                },] },
    ];
    /** @nocollapse */
    TimeSlotDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DayTimeSlotService },
        { type: LocalizationService }
    ]; };
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
    return TimeSlotDirective;
}(BaseSlotDirective));
export { TimeSlotDirective };
/**
 * @hidden
 */
var DaySlotDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DaySlotDirective, _super);
    function DaySlotDirective(element, slotService, localization) {
        var _this = _super.call(this, element, slotService, localization) || this;
        _this.isDaySlot = true;
        return _this;
    }
    Object.defineProperty(DaySlotDirective.prototype, "start", {
        get: function () {
            if (!this.startDate) {
                return null;
            }
            return toUTCDate(this.startDate);
        },
        set: function (value) {
            this.startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaySlotDirective.prototype, "end", {
        get: function () {
            if (!this.endDate) {
                return null;
            }
            return toUTCDate(this.endDate);
        },
        set: function (value) {
            this.endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaySlotDirective.prototype, "daySlot", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DaySlotDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[daySlot]'
                },] },
    ];
    /** @nocollapse */
    DaySlotDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DayTimeSlotService },
        { type: LocalizationService }
    ]; };
    DaySlotDirective.propDecorators = {
        start: [{ type: Input }],
        end: [{ type: Input }],
        daySlot: [{ type: HostBinding, args: ['attr.data-day-slot',] }]
    };
    return DaySlotDirective;
}(BaseSlotDirective));
export { DaySlotDirective };
