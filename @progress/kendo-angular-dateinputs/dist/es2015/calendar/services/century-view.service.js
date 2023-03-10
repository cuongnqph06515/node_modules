/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { addDecades, addCenturies, cloneDate, durationInCenturies, firstYearOfDecade, firstDecadeOfCentury, lastDecadeOfCentury, createDate } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
const EMPTY_DATA = [[]];
const CELLS_LENGTH = 5;
const ROWS_LENGTH = 2;
const ACTIONS = {
    [Action.Left]: (date) => addDecades(date, -1),
    [Action.Up]: (date) => addDecades(date, -5),
    [Action.Right]: (date) => addDecades(date, 1),
    [Action.Down]: (date) => addDecades(date, 5),
    [Action.PrevView]: (date) => addCenturies(date, -1),
    [Action.NextView]: (date) => addCenturies(date, 1),
    [Action.FirstInView]: (date) => firstDecadeOfCentury(date),
    [Action.LastInView]: (date) => lastDecadeOfCentury(date)
};
/**
 * @hidden
 */
export class CenturyViewService {
    addToDate(min, skip) {
        return addCenturies(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addCenturies(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate } = options;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        const cells = range(0, CELLS_LENGTH);
        const firstDate = firstDecadeOfCentury(viewDate);
        const lastDate = lastDecadeOfCentury(viewDate);
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const today = getToday();
        return range(0, ROWS_LENGTH).map(rowOffset => {
            const baseDate = addDecades(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addDecades(baseDate, cellOffset), min, max);
                if (!this.isInRange(cellDate, min, max)) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: this.value(cellDate),
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
        return firstYearOfDecade(candidate).getFullYear() === firstYearOfDecade(expected).getFullYear();
    }
    isInArray(date, dates) {
        if (!dates.length) {
            return false;
        }
        const year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 99);
    }
    isInRange(candidate, min, max) {
        const year = firstYearOfDecade(candidate).getFullYear();
        const aboveMin = !min || firstYearOfDecade(min).getFullYear() <= year;
        const belowMax = !max || year <= firstYearOfDecade(max).getFullYear();
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        const firstYear = firstYearOfDecade(firstDecadeOfCentury(date));
        return createDate(firstYear.getFullYear(), 0, 1);
    }
    isRangeStart(value) {
        return value.getFullYear() % 1000 === 0;
    }
    move(value, action) {
        const modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return firstYearOfDecade(value).getFullYear().toString();
    }
    navigationTitle(value) {
        return value ? firstDecadeOfCentury(value).getFullYear().toString() : '';
    }
    title(value) {
        if (!value) {
            return '';
        }
        return `${firstDecadeOfCentury(value).getFullYear()} - ${lastDecadeOfCentury(value).getFullYear()}`;
    }
    rowLength(_) {
        return CELLS_LENGTH;
    }
    skip(value, min) {
        return durationInCenturies(min, value);
    }
    total(min, max) {
        return durationInCenturies(min, max) + 1;
    }
    value(current) {
        return current ? firstYearOfDecade(current).getFullYear().toString() : '';
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const centuriesToSubtract = viewsCount - viewsInRange;
            return addCenturies(date, -1 * centuriesToSubtract);
        }
        return date;
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
CenturyViewService.decorators = [
    { type: Injectable },
];
