/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { isEqual } from '@progress/kendo-date-math';
import { IntlService } from '@progress/kendo-angular-intl';
import { MIDNIGHT_DATE } from '../../defaults';
import { range, setSeconds } from '../../util';
const SECONDS_IN_HOUR = 60;
const clampToRange = (rangeValue) => (value) => value % rangeValue;
const ɵ0 = clampToRange;
const clamp = clampToRange(SECONDS_IN_HOUR);
const stepper = (start, step) => (idx) => clamp(start + (idx * step));
const ɵ1 = stepper;
const distanceFromMin = (value, min) => clamp(SECONDS_IN_HOUR + value - min);
const ɵ2 = distanceFromMin;
const limit = (borderValue) => (barrier, value) => {
    const useBarrier = !value || barrier.getHours() === value.getHours() && barrier.getMinutes() === value.getMinutes();
    return useBarrier ? barrier : setSeconds(barrier, borderValue);
};
const ɵ3 = limit;
const limitDown = limit(0);
const limitUp = limit(SECONDS_IN_HOUR - 1);
/**
 * @hidden
 */
export class SecondsService {
    constructor(intl) {
        this.intl = intl;
        this.insertUndividedMax = false;
    }
    apply(value, candidate) {
        return setSeconds(value, candidate.getSeconds());
    }
    configure(settings) {
        const { insertUndividedMax = this.insertUndividedMax, min = this.min, max = this.max, part, step = this.step } = settings;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = (minute) => {
            const date = setSeconds(MIDNIGHT_DATE, minute);
            return {
                text: this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    }
    data(selectedValue) {
        const [min] = this.range(selectedValue);
        const getSecond = stepper(min, this.step);
        const convertToItem = (idx) => (this.toListItem(getSecond(idx)));
        const data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    }
    isRangeChanged(min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    }
    limitRange(min, max, value) {
        return [limitDown(min, value), limitUp(max, value)];
    }
    total(value) {
        const last = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        const missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last;
    }
    selectedIndex(value) {
        return Math.ceil(this.divideByStep(value));
    }
    valueInList(value) {
        if (!value) {
            return true;
        }
        const matchMax = this.insertUndividedMax && this.lastSecond(value) === value.getSeconds();
        return matchMax || !this.isMissing(value);
    }
    divideByStep(value) {
        return distanceFromMin(value.getSeconds(), this.min.getSeconds()) / this.step;
    }
    addLast(data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastSecond(value)));
        }
        return data;
    }
    addMissing(data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        const missingItem = this.toListItem(value.getSeconds());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    }
    countFromMin(value) {
        const [min, max] = this.range(value);
        return Math.floor(distanceFromMin(max, min) / this.step) + 1; /* include min */
    }
    isMissing(value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    }
    isLastMissing(value) {
        return this.isMissing(setSeconds(this.max, this.lastSecond(value)));
    }
    lastSecond(value) {
        return this.range(value)[1];
    }
    range(value) {
        const [min, max] = this.limitRange(this.min, this.max, value);
        return [min.getSeconds(), max.getSeconds()];
    }
}
SecondsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SecondsService.ctorParameters = () => [
    { type: IntlService }
];
export { ɵ0, ɵ1, ɵ2, ɵ3 };
