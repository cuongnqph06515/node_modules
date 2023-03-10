/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { cloneDate } from '@progress/kendo-date-math';
import { IntlService } from '@progress/kendo-angular-intl';
const setHours = (date, hours) => {
    const clone = cloneDate(date);
    clone.setHours(hours);
    return clone;
};
const ɵ0 = setHours;
const isAM = (value) => value !== null && value < 12;
const ɵ1 = isAM;
const isPM = (value) => value !== null && (!value || value > 11);
const ɵ2 = isPM;
const inRange = (value, min, max) => ((!min && !max) || (value >= min && value <= max));
const ɵ3 = inRange;
const inReverseRange = (value, min, max) => ((!min && !max) || value >= min || value <= max);
const ɵ4 = inReverseRange;
/**
 * @hidden
 */
export class DayPeriodService {
    constructor(intl) {
        this.intl = intl;
    }
    /**
     * @hidden
     */
    apply(value, candidate) {
        const hour = value.getHours();
        const hourAM = isAM(hour);
        const candidateAM = isAM(candidate.getHours());
        if ((hourAM && candidateAM) || (!hourAM && !candidateAM)) {
            return value;
        }
        const [min, max = 24] = this.normalizedRange();
        const result = hour + (candidateAM ? -12 : 12);
        return setHours(value, Math.min(Math.max(min, result), (max || 24)));
    }
    /**
     * @hidden
     */
    configure(settings) {
        const { min = this.min, max = this.max, part = this.part } = settings;
        this.min = min;
        this.max = max;
        this.part = part;
    }
    /**
     * @hidden
     */
    data(_) {
        const names = this.part.names;
        if (!names) {
            return [];
        }
        const data = [];
        const [min, max] = this.normalizedRange();
        const dayPeriod = this.intl.dateFormatNames(names);
        if (isAM(min)) {
            data.push({ text: dayPeriod.am, value: setHours(this.min, min) });
        }
        if (isPM(max)) {
            data.push({ text: dayPeriod.pm, value: setHours(this.min, Math.max(12, max)) });
        }
        return this.min.getHours() !== min ? data.reverse() : data;
    }
    /**
     * @hidden
     */
    isRangeChanged(_, __) {
        return false;
    }
    /**
     * @hidden
     */
    limitRange(min, max, _) {
        return [min, max];
    }
    /**
     * @hidden
     */
    total() {
        const [min, max] = this.normalizedRange();
        if (!min && !max) {
            return 2;
        }
        if (min > 11 || max < 12) {
            return 1;
        }
        return 2;
    }
    /**
     * @hidden
     */
    selectedIndex(value) {
        if (!this.valueInList(value)) {
            return -1;
        }
        const index = Math.floor(value.getHours() / 12);
        return this.min.getHours() === this.normalizedRange()[0] ? index : (index === 0 ? 1 : 0);
    }
    /**
     * @hidden
     */
    valueInList(value) {
        const reverse = this.min.getHours() !== this.normalizedRange()[0];
        const isInRange = reverse ? inReverseRange : inRange;
        return isInRange(value.getHours(), this.min.getHours(), this.max.getHours());
    }
    normalizedRange() {
        const minHour = this.min.getHours();
        const maxHour = this.max.getHours();
        return [
            Math.min(minHour, maxHour),
            Math.max(minHour, maxHour)
        ];
    }
}
DayPeriodService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DayPeriodService.ctorParameters = () => [
    { type: IntlService }
];
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
