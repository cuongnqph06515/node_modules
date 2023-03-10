/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { shiftWeekNames } from '../../util';
/**
 * @hidden
 */
var WeekNamesService = /** @class */ (function () {
    function WeekNamesService(intl) {
        this.intl = intl;
    }
    WeekNamesService.prototype.getWeekNames = function (includeWeekNumber) {
        if (includeWeekNumber === void 0) { includeWeekNumber = false; }
        var weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return includeWeekNumber ? [''].concat(weekNames) : weekNames;
    };
    WeekNamesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WeekNamesService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return WeekNamesService;
}());
export { WeekNamesService };
