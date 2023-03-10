/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var setHours = function (date, hours) {
    var clone = kendo_date_math_1.cloneDate(date);
    clone.setHours(hours);
    return clone;
};
var ɵ0 = setHours;
exports.ɵ0 = ɵ0;
var isAM = function (value) { return value !== null && value < 12; };
var ɵ1 = isAM;
exports.ɵ1 = ɵ1;
var isPM = function (value) { return value !== null && (!value || value > 11); };
var ɵ2 = isPM;
exports.ɵ2 = ɵ2;
var inRange = function (value, min, max) { return ((!min && !max) || (value >= min && value <= max)); };
var ɵ3 = inRange;
exports.ɵ3 = ɵ3;
var inReverseRange = function (value, min, max) { return ((!min && !max) || value >= min || value <= max); };
var ɵ4 = inReverseRange;
exports.ɵ4 = ɵ4;
/**
 * @hidden
 */
var DayPeriodService = /** @class */ (function () {
    function DayPeriodService(intl) {
        this.intl = intl;
    }
    /**
     * @hidden
     */
    DayPeriodService.prototype.apply = function (value, candidate) {
        var hour = value.getHours();
        var hourAM = isAM(hour);
        var candidateAM = isAM(candidate.getHours());
        if ((hourAM && candidateAM) || (!hourAM && !candidateAM)) {
            return value;
        }
        var _a = this.normalizedRange(), min = _a[0], _b = _a[1], max = _b === void 0 ? 24 : _b;
        var result = hour + (candidateAM ? -12 : 12);
        return setHours(value, Math.min(Math.max(min, result), (max || 24)));
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.configure = function (settings) {
        var _a = settings.min, min = _a === void 0 ? this.min : _a, _b = settings.max, max = _b === void 0 ? this.max : _b, _c = settings.part, part = _c === void 0 ? this.part : _c;
        this.min = min;
        this.max = max;
        this.part = part;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.data = function (_) {
        var names = this.part.names;
        if (!names) {
            return [];
        }
        var data = [];
        var _a = this.normalizedRange(), min = _a[0], max = _a[1];
        var dayPeriod = this.intl.dateFormatNames(names);
        if (isAM(min)) {
            data.push({ text: dayPeriod.am, value: setHours(this.min, min) });
        }
        if (isPM(max)) {
            data.push({ text: dayPeriod.pm, value: setHours(this.min, Math.max(12, max)) });
        }
        return this.min.getHours() !== min ? data.reverse() : data;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.isRangeChanged = function (_, __) {
        return false;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.limitRange = function (min, max, _) {
        return [min, max];
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.total = function () {
        var _a = this.normalizedRange(), min = _a[0], max = _a[1];
        if (!min && !max) {
            return 2;
        }
        if (min > 11 || max < 12) {
            return 1;
        }
        return 2;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.selectedIndex = function (value) {
        if (!this.valueInList(value)) {
            return -1;
        }
        var index = Math.floor(value.getHours() / 12);
        return this.min.getHours() === this.normalizedRange()[0] ? index : (index === 0 ? 1 : 0);
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.valueInList = function (value) {
        var reverse = this.min.getHours() !== this.normalizedRange()[0];
        var isInRange = reverse ? inReverseRange : inRange;
        return isInRange(value.getHours(), this.min.getHours(), this.max.getHours());
    };
    DayPeriodService.prototype.normalizedRange = function () {
        var minHour = this.min.getHours();
        var maxHour = this.max.getHours();
        return [
            Math.min(minHour, maxHour),
            Math.max(minHour, maxHour)
        ];
    };
    DayPeriodService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DayPeriodService.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    return DayPeriodService;
}());
exports.DayPeriodService = DayPeriodService;
