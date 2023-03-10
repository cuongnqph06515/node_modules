"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var base_slot_directive_1 = require("../view-items/base-slot.directive");
var utils_1 = require("../utils");
var day_time_slot_service_1 = require("./day-time-slot.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var constants_1 = require("../constants");
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
            return this.invariantStart < this.workDayStart || this.workDayEnd < this.invariantEnd || !utils_1.isWorkWeekDay(date, this.workWeekStart, this.workWeekEnd);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "startLocalTime", {
        get: function () {
            if (!this.date || !this.invariantStart) {
                return null;
            }
            return utils_1.dateWithTime(this.date, this.invariantStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "endLocalTime", {
        get: function () {
            if (!this.date || !this.invariantEnd) {
                return null;
            }
            return utils_1.dateWithTime(this.date, this.invariantEnd);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "start", {
        get: function () {
            if (!this.date || !this.invariantStart) {
                return null;
            }
            return utils_1.toUTCTime(this.date, this.invariantStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "end", {
        get: function () {
            if (!this.date || !this.invariantEnd) {
                return null;
            }
            var localEnd = utils_1.toUTCTime(this.date, this.invariantEnd);
            if (constants_1.INVARIANT_END.getTime() <= this.invariantEnd.getTime()) {
                return utils_1.addUTCDays(localEnd, 1);
            }
            return localEnd;
        },
        enumerable: true,
        configurable: true
    });
    TimeSlotDirective.decorators = [
        { type: core_1.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[timeSlot]',
                    exportAs: 'timeSlot'
                },] },
    ];
    /** @nocollapse */
    TimeSlotDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: day_time_slot_service_1.DayTimeSlotService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    TimeSlotDirective.propDecorators = {
        invariantStart: [{ type: core_1.Input }],
        invariantEnd: [{ type: core_1.Input }],
        workDayStart: [{ type: core_1.Input }],
        workDayEnd: [{ type: core_1.Input }],
        workWeekStart: [{ type: core_1.Input }],
        workWeekEnd: [{ type: core_1.Input }],
        date: [{ type: core_1.Input }],
        nonWorkHour: [{ type: core_1.HostBinding, args: ['class.k-nonwork-hour',] }]
    };
    return TimeSlotDirective;
}(base_slot_directive_1.BaseSlotDirective));
exports.TimeSlotDirective = TimeSlotDirective;
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
            return utils_1.toUTCDate(this.startDate);
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
            return utils_1.toUTCDate(this.endDate);
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
        { type: core_1.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[daySlot]'
                },] },
    ];
    /** @nocollapse */
    DaySlotDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: day_time_slot_service_1.DayTimeSlotService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    DaySlotDirective.propDecorators = {
        start: [{ type: core_1.Input }],
        end: [{ type: core_1.Input }],
        daySlot: [{ type: core_1.HostBinding, args: ['attr.data-day-slot',] }]
    };
    return DaySlotDirective;
}(base_slot_directive_1.BaseSlotDirective));
exports.DaySlotDirective = DaySlotDirective;
