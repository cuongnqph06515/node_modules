/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { addMonths, addYears, cloneDate, createDate, durationInYears, firstMonthOfYear, lastMonthOfYear } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
const EMPTY_DATA = [[]];
const CELLS_LENGTH = 5;
const ROWS_LENGTH = 3;
const upStep = (month) => {
    if (month > 4) {
        return -5;
    }
    if (month < 2) {
        return -2;
    }
    return -7;
};
const ɵ0 = upStep;
const downStep = (month) => {
    if (month < 7) {
        return 5;
    }
    if (month < 10) {
        return 7;
    }
    return 2;
};
const ɵ1 = downStep;
const ACTIONS = {
    [Action.Left]: (date) => addMonths(date, -1),
    [Action.Up]: (date) => addMonths(date, upStep(date.getMonth())),
    [Action.Right]: (date) => addMonths(date, 1),
    [Action.Down]: (date) => addMonths(date, downStep(date.getMonth())),
    [Action.PrevView]: (date) => addYears(date, -1),
    [Action.NextView]: (date) => addYears(date, 1),
    [Action.FirstInView]: (date) => firstMonthOfYear(date),
    [Action.LastInView]: (date) => lastMonthOfYear(date)
};
/**
 * @hidden
 */
export class YearViewService {
    constructor(_intlService) {
        this._intlService = _intlService;
    }
    addToDate(min, skip) {
        return addYears(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addYears(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate } = options;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        const months = this.abbrMonthNames();
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const firstDate = firstMonthOfYear(viewDate);
        const lastDate = lastMonthOfYear(viewDate);
        const currentYear = firstDate.getFullYear();
        const cells = range(0, CELLS_LENGTH);
        const today = getToday();
        return range(0, ROWS_LENGTH).map(rowOffset => {
            const baseDate = addMonths(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addMonths(baseDate, cellOffset), min, max);
                const changedYear = currentYear < cellDate.getFullYear();
                if (!this.isInRange(cellDate, min, max) || changedYear) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: months[cellDate.getMonth()],
                    id: `${cellUID}${cellDate.getTime()}`,
                    isFocused: this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && this.isEqual(cellDate, selectedDate),
                    isWeekend: false,
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitEnd: isRangeMid && this.isEqual(cellDate, lastDate),
                    isRangeSplitStart: isRangeMid && this.isEqual(cellDate, firstDate),
                    isToday: this.isEqual(cellDate, today),
                    title: this.cellTitle(cellDate),
                    value: cellDate
                };
            });
        });
    }
    isEqual(candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return candidate.getFullYear() === expected.getFullYear() &&
            candidate.getMonth() === expected.getMonth();
    }
    isInArray(date, dates) {
        if (!dates.length) {
            return false;
        }
        const year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= dates[dates.length - 1].getFullYear();
    }
    isInRange(candidate, min, max) {
        const candidateValue = createDate(candidate.getFullYear(), candidate.getMonth(), 1);
        const aboveMin = !min || createDate(min.getFullYear(), min.getMonth(), 1) <= candidateValue;
        const belowMax = !max || candidateValue <= createDate(max.getFullYear(), max.getMonth(), 1);
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        return createDate(date.getFullYear(), 0, 1);
    }
    isRangeStart(value) {
        return value.getFullYear() % 10 === 0;
    }
    move(value, action) {
        const modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return `${value.getFullYear()} ${this.value(value)}`;
    }
    navigationTitle(value) {
        return this.title(value);
    }
    title(current) {
        return current ? current.getFullYear().toString() : '';
    }
    rowLength(_) {
        return CELLS_LENGTH;
    }
    skip(value, min) {
        return durationInYears(min, value);
    }
    total(min, max) {
        return durationInYears(min, max) + 1;
    }
    value(current) {
        return current ? this.abbrMonthNames()[current.getMonth()] : '';
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const yearsToSubtract = viewsCount - viewsInRange;
            return addYears(date, -1 * yearsToSubtract);
        }
        return date;
    }
    abbrMonthNames() {
        return this._intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    }
    normalize(cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    }
}
YearViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
YearViewService.ctorParameters = () => [
    { type: IntlService }
];
export { ɵ0, ɵ1 };
