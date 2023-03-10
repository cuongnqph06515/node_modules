/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var util_1 = require("../../util");
/**
 * @hidden
 */
var WeekNamesService = /** @class */ (function () {
    function WeekNamesService(intl) {
        this.intl = intl;
    }
    WeekNamesService.prototype.getWeekNames = function (includeWeekNumber) {
        if (includeWeekNumber === void 0) { includeWeekNumber = false; }
        var weekNames = util_1.shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return includeWeekNumber ? [''].concat(weekNames) : weekNames;
    };
    WeekNamesService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    WeekNamesService.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    return WeekNamesService;
}());
exports.WeekNamesService = WeekNamesService;
