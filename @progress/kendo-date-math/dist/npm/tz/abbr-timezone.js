"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zone_and_rule_1 = require("./zone-and-rule");
// tslint:disable:max-line-length
/**
 * A function which returns the abbreviated name of the timezone. You can specify an optional date for returning the timezone name at a different point in time. The corresponding UTC date is used for locating the relevant rule. Timezone names change both historically and when they reflect the Daylight Savings Time rules.
 *
 * @param timezone - The timezone name. For example, `America/Chicago`, `Europe/Sofia`.
 * @param date - A date for which to locate the zone rule. By default, the current time is used.
 *
 * @return - The abbreviated name of the timezone at the specified date or, if not set, returns now.
 *
 * @example
 * ```ts
 * import { abbrTimezone } from '@progress/kendo-date-math';
 * import '@progress/kendo-date-math/tz/Europe/Sofia';
 *
 * const dstDate = new Date('2018-04-01T00:00:00Z');
 * console.log(abbrTimezone('Europe/Sofia', dstDate)); // EEST
 *
 * const date = new Date('2018-01-01T00:00:00Z');
 * console.log(abbrTimezone('Europe/Sofia', date); // EET
 * ```
 */
// tslint:enable:max-line-length
exports.abbrTimezone = function (timezone, date) {
    if (date === void 0) { date = new Date(); }
    if (timezone === "Etc/UTC") {
        return 'UTC';
    }
    if (timezone === "Etc/GMT") {
        return 'GMT';
    }
    if (timezone === '') {
        return '';
    }
    var _a = zone_and_rule_1.zoneAndRule(timezone, date), zone = _a.zone, rule = _a.rule;
    var base = zone[2];
    if (base.indexOf("/") >= 0) {
        return base.split("/")[rule && +rule[6] ? 1 : 0];
    }
    else if (base.indexOf("%s") >= 0) {
        return base.replace("%s", (!rule || rule[7] === "-") ? '' : rule[7]);
    }
    return base;
};
