/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { getDate, isEqual } from '@progress/kendo-date-math';
import { IntlService } from '@progress/kendo-angular-intl';
import { MIDNIGHT_DATE } from '../../defaults';
import { range, setHours } from '../../util';
var HOURS_IN_DAY = 24;
var clampToRange = function (rangeValue) { return function (value) { return value % rangeValue; }; };
var ɵ0 = clampToRange;
var clamp = clampToRange(HOURS_IN_DAY);
var stepper = function (start, step) { return function (idx) { return clamp(start + (idx * step)); }; };
var ɵ1 = stepper;
var distanceFromMin = function (value, min) { return clamp(HOURS_IN_DAY + value - min); };
var ɵ2 = distanceFromMin;
var limit = function (borderValue) { return function (barrier, value) {
    var useBarrier = !value || getDate(barrier).getTime() === getDate(value).getTime();
    return useBarrier ? barrier : setHours(barrier, borderValue);
}; };
var ɵ3 = limit;
var limitDown = limit(0);
var limitUp = limit(HOURS_IN_DAY - 1);
/**
 * @hidden
 */
var HoursService = /** @class */ (function () {
    function HoursService(intl) {
        this.intl = intl;
        this.boundRange = false;
        this.insertUndividedMax = false;
    }
    HoursService.prototype.apply = function (value, candidate) {
        return setHours(value, candidate.getHours());
    };
    HoursService.prototype.configure = function (settings) {
        var _this = this;
        var _a = settings.boundRange, boundRange = _a === void 0 ? this.boundRange : _a, _b = settings.insertUndividedMax, insertUndividedMax = _b === void 0 ? this.insertUndividedMax : _b, _c = settings.min, min = _c === void 0 ? this.min : _c, _d = settings.max, max = _d === void 0 ? this.max : _d, part = settings.part, _e = settings.step, step = _e === void 0 ? this.step : _e;
        this.boundRange = boundRange;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = function (hour) {
            var date = setHours(MIDNIGHT_DATE, hour);
            return {
                text: _this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    };
    HoursService.prototype.data = function (selectedValue) {
        var _this = this;
        var min = this.range(selectedValue)[0];
        var getHour = stepper(min, this.step);
        var convertToItem = function (idx) { return (_this.toListItem(getHour(idx))); };
        var data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    };
    HoursService.prototype.isRangeChanged = function (min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    };
    HoursService.prototype.limitRange = function (min, max, value) {
        return this.boundRange ? [limitDown(min, value), limitUp(max, value)] : [min, max];
    };
    HoursService.prototype.total = function (value) {
        var last = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        var missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last;
    };
    HoursService.prototype.selectedIndex = function (value) {
        return Math.ceil(this.divideByStep(value));
    };
    HoursService.prototype.valueInList = function (value) {
        if (!value) {
            return true;
        }
        var matchMax = this.insertUndividedMax && this.lastHour(value) === value.getHours();
        return matchMax || !this.isMissing(value);
    };
    HoursService.prototype.addLast = function (data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastHour(value)));
        }
        return data;
    };
    HoursService.prototype.addMissing = function (data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        var missingItem = this.toListItem(value.getHours());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    };
    HoursService.prototype.countFromMin = function (value) {
        var _a = this.range(value), min = _a[0], max = _a[1];
        return Math.floor(distanceFromMin(max, min) / this.step) + 1; /* include min */
    };
    HoursService.prototype.isMissing = function (value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    };
    HoursService.prototype.isLastMissing = function (value) {
        return this.isMissing(setHours(this.max, this.lastHour(value)));
    };
    HoursService.prototype.divideByStep = function (value) {
        return distanceFromMin(value.getHours(), this.min.getHours()) / this.step;
    };
    HoursService.prototype.lastHour = function (value) {
        return this.range(value)[1];
    };
    HoursService.prototype.range = function (value) {
        var _a = this.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        return [min.getHours(), max.getHours()];
    };
    HoursService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HoursService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return HoursService;
}());
export { HoursService };
export { ɵ0, ɵ1, ɵ2, ɵ3 };
