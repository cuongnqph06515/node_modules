/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var defaults_1 = require("../../defaults");
var util_1 = require("../../util");
var SECONDS_IN_HOUR = 60;
var clampToRange = function (rangeValue) { return function (value) { return value % rangeValue; }; };
var ɵ0 = clampToRange;
exports.ɵ0 = ɵ0;
var clamp = clampToRange(SECONDS_IN_HOUR);
var stepper = function (start, step) { return function (idx) { return clamp(start + (idx * step)); }; };
var ɵ1 = stepper;
exports.ɵ1 = ɵ1;
var distanceFromMin = function (value, min) { return clamp(SECONDS_IN_HOUR + value - min); };
var ɵ2 = distanceFromMin;
exports.ɵ2 = ɵ2;
var limit = function (borderValue) { return function (barrier, value) {
    var useBarrier = !value || barrier.getHours() === value.getHours() && barrier.getMinutes() === value.getMinutes();
    return useBarrier ? barrier : util_1.setSeconds(barrier, borderValue);
}; };
var ɵ3 = limit;
exports.ɵ3 = ɵ3;
var limitDown = limit(0);
var limitUp = limit(SECONDS_IN_HOUR - 1);
/**
 * @hidden
 */
var SecondsService = /** @class */ (function () {
    function SecondsService(intl) {
        this.intl = intl;
        this.insertUndividedMax = false;
    }
    SecondsService.prototype.apply = function (value, candidate) {
        return util_1.setSeconds(value, candidate.getSeconds());
    };
    SecondsService.prototype.configure = function (settings) {
        var _this = this;
        var _a = settings.insertUndividedMax, insertUndividedMax = _a === void 0 ? this.insertUndividedMax : _a, _b = settings.min, min = _b === void 0 ? this.min : _b, _c = settings.max, max = _c === void 0 ? this.max : _c, part = settings.part, _d = settings.step, step = _d === void 0 ? this.step : _d;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = function (minute) {
            var date = util_1.setSeconds(defaults_1.MIDNIGHT_DATE, minute);
            return {
                text: _this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    };
    SecondsService.prototype.data = function (selectedValue) {
        var _this = this;
        var min = this.range(selectedValue)[0];
        var getSecond = stepper(min, this.step);
        var convertToItem = function (idx) { return (_this.toListItem(getSecond(idx))); };
        var data = util_1.range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    };
    SecondsService.prototype.isRangeChanged = function (min, max) {
        return !kendo_date_math_1.isEqual(this.min, min) || !kendo_date_math_1.isEqual(this.max, max);
    };
    SecondsService.prototype.limitRange = function (min, max, value) {
        return [limitDown(min, value), limitUp(max, value)];
    };
    SecondsService.prototype.total = function (value) {
        var last = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        var missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last;
    };
    SecondsService.prototype.selectedIndex = function (value) {
        return Math.ceil(this.divideByStep(value));
    };
    SecondsService.prototype.valueInList = function (value) {
        if (!value) {
            return true;
        }
        var matchMax = this.insertUndividedMax && this.lastSecond(value) === value.getSeconds();
        return matchMax || !this.isMissing(value);
    };
    SecondsService.prototype.divideByStep = function (value) {
        return distanceFromMin(value.getSeconds(), this.min.getSeconds()) / this.step;
    };
    SecondsService.prototype.addLast = function (data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastSecond(value)));
        }
        return data;
    };
    SecondsService.prototype.addMissing = function (data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        var missingItem = this.toListItem(value.getSeconds());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    };
    SecondsService.prototype.countFromMin = function (value) {
        var _a = this.range(value), min = _a[0], max = _a[1];
        return Math.floor(distanceFromMin(max, min) / this.step) + 1; /* include min */
    };
    SecondsService.prototype.isMissing = function (value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    };
    SecondsService.prototype.isLastMissing = function (value) {
        return this.isMissing(util_1.setSeconds(this.max, this.lastSecond(value)));
    };
    SecondsService.prototype.lastSecond = function (value) {
        return this.range(value)[1];
    };
    SecondsService.prototype.range = function (value) {
        var _a = this.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        return [min.getSeconds(), max.getSeconds()];
    };
    SecondsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SecondsService.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    return SecondsService;
}());
exports.SecondsService = SecondsService;
