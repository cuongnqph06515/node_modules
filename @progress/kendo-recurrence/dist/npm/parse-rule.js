"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var normalizeWeekDay = function (day, weekStart) { return (day + (day < weekStart ? 7 : 0)); };
var daySortPredicate = function (weekStart) { return function (a, b) { return (normalizeWeekDay(a.day, weekStart) - normalizeWeekDay(b.day, weekStart)); }; };
var sortDays = function (rrule) {
    var byWeekDay = rrule.byWeekDay, weekStart = rrule.weekStart;
    if (!byWeekDay) {
        return;
    }
    byWeekDay.sort(daySortPredicate(weekStart));
};
/**
 * @hidden
 *
 * Internal method for parsing of iCal recurrence rule string.
 */
exports.parseRule = function (options) {
    if (!options) {
        return null;
    }
    var recurrenceRule = options.recurrenceRule, _a = options.weekStart, weekStart = _a === void 0 ? 0 : _a;
    var rule = {};
    var splits, value;
    var idx = 0, length;
    var parts;
    var property;
    if (!recurrenceRule) {
        return null;
    }
    var lines = recurrenceRule.split('\n');
    if (!lines[1] && (recurrenceRule.indexOf('DTSTART') !== -1 ||
        recurrenceRule.indexOf('DTEND') !== -1 ||
        recurrenceRule.indexOf('EXDATE') !== -1)) {
        lines = recurrenceRule.split(' ');
    }
    for (idx = 0, length = lines.length; idx < length; idx++) {
        var line = (lines[idx] || '').trim();
        if (line.indexOf('DTSTART') !== -1) {
            rule.start = utils_1.parseDateTime(line);
        }
        else if (line.indexOf('DTEND') !== -1) {
            rule.end = utils_1.parseDateTime(line);
        }
        else if (line.indexOf('EXDATE') !== -1) {
            rule.exceptionDates = utils_1.parseDateTimeList(line);
        }
        else if (line.indexOf('RRULE') !== -1) {
            parts = line.substring(6);
        }
        else if (line.trim()) {
            parts = line;
        }
    }
    parts = parts.split(';');
    for (idx = 0, length = parts.length; idx < length; idx++) {
        property = parts[idx];
        splits = property.split('=');
        value = (splits[1] || '').trim().split(',');
        switch (splits[0].trim().toUpperCase()) {
            case 'FREQ':
                rule.freq = value[0].toLowerCase();
                break;
            case 'UNTIL':
                rule.until = utils_1.parseISODate(value[0]);
                break;
            case 'COUNT':
                rule.count = parseInt(value[0], 10);
                break;
            case 'INTERVAL':
                rule.interval = parseInt(value[0], 10);
                break;
            case 'BYSECOND':
                rule.bySecond = utils_1.parseArray(value, { start: 0, end: 60 });
                break;
            case 'BYMINUTE':
                rule.byMinute = utils_1.parseArray(value, { start: 0, end: 59 });
                break;
            case 'BYHOUR':
                rule.byHour = utils_1.parseArray(value, { start: 0, end: 23 });
                break;
            case 'BYMONTHDAY':
                rule.byMonthDay = utils_1.parseArray(value, { start: -31, end: 31 });
                break;
            case 'BYYEARDAY':
                rule.byYearDay = utils_1.parseArray(value, { start: -366, end: 366 });
                break;
            case 'BYMONTH':
                rule.byMonth = utils_1.parseArray(value, { start: 1, end: 12 });
                break;
            case 'BYDAY':
                rule.byWeekDay = utils_1.parseWeekDayList(value);
                break;
            case 'BYWEEKNO':
                rule.byWeekNumber = utils_1.parseArray(value, { start: -53, end: 53 });
                break;
            case 'BYSETPOS':
                rule.bySetPosition = utils_1.parseArray(value, { start: -366, end: 366 });
                break;
            case 'WKST':
                rule.weekStart = utils_1.parseWeekDay(value[0]);
                break;
            default:
                break;
        }
    }
    if (rule.freq === undefined || (rule.count !== undefined && rule.until)) {
        return null;
    }
    if (rule.weekStart === undefined) {
        rule.weekStart = weekStart;
    }
    if (!rule.interval) {
        rule.interval = 1;
    }
    if (rule.bySetPosition && !utils_1.hasModifiers(rule)) {
        rule.bySetPosition = [];
    }
    sortDays(rule);
    return rule;
};
