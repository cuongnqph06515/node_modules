import { adjustDST, convertTimeZone } from './time-utils';
import { localeInfo } from '../cldr';
import { DEFAULT_LOCALE, EMPTY } from '../common/constants';
import { errors } from '../errors';
import formatNames from './format-names';
import datePattern from './date-pattern';
import round from '../common/round';
import isDate from '../common/is-date';

var timeZoneOffsetRegExp = /([+|\-]\d{1,2})(:?)(\d{2})?/;
var dateRegExp = /^\/Date\((.*?)\)\/$/;
var offsetRegExp = /[+-]\d*/;
var numberRegExp = {
    2: /^\d{1,2}/,
    3: /^\d{1,3}/,
    4: /^\d{4}/
};
var numberRegex = /\d+/;
var PLACEHOLDER = "{0}";

var standardDateFormats = [
    "yyyy/MM/dd HH:mm:ss",
    "yyyy/MM/dd HH:mm",
    "yyyy/MM/dd",
    "E MMM dd yyyy HH:mm:ss",
    "yyyy-MM-ddTHH:mm:ss.SSSSSSSXXX",
    "yyyy-MM-ddTHH:mm:ss.SSSXXX",
    "yyyy-MM-ddTHH:mm:ss.SSXXX",
    "yyyy-MM-ddTHH:mm:ssXXX",
    "yyyy-MM-ddTHH:mm:ss.SSSSSSS",
    "yyyy-MM-ddTHH:mm:ss.SSS",
    "yyyy-MM-ddTHH:mmXXX",
    "yyyy-MM-ddTHH:mmX",
    "yyyy-MM-ddTHH:mm:ss",
    "yyyy-MM-ddTHH:mm",
    "yyyy-MM-dd HH:mm:ss",
    "yyyy-MM-dd HH:mm",
    "yyyy-MM-dd",
    "HH:mm:ss",
    "HH:mm"
];
var FORMATS_SEQUENCE = [ "G", "g", "F", "Y", "y", "M", "m", "D", "d", "y", "T", "t" ];
var TWO_DIGIT_YEAR_MAX = 2029;

function outOfRange(value, start, end) {
    return !(value >= start && value <= end);
}

function lookAhead(match, state) {
    var format = state.format;
    var idx = state.idx;
    var i = 0;
    while (format[idx] === match) {
        i++;
        idx++;
    }
    if (i > 0) {
        idx -= 1;
    }
    state.idx = idx;
    return i;
}

function getNumber(size, state) {
    var regex = size ? (numberRegExp[size] || new RegExp('^\\d{1,' + size + '}')) : numberRegex,
        match = state.value.substr(state.valueIdx, size).match(regex);

    if (match) {
        match = match[0];
        state.valueIdx += match.length;
        return parseInt(match, 10);
    }
    return null;
}

function getIndexByName(names, state, lower) {
    var i = 0,
        length = names.length,
        name, nameLength,
        matchLength = 0,
        matchIdx = 0,
        subValue;

    for (; i < length; i++) {
        name = names[i];
        nameLength = name.length;
        subValue = state.value.substr(state.valueIdx, nameLength);

        if (lower) {
            subValue = subValue.toLowerCase();
        }

        if (subValue === name && nameLength > matchLength) {
            matchLength = nameLength;
            matchIdx = i;
        }
    }

    if (matchLength) {
        state.valueIdx += matchLength;
        return matchIdx + 1;
    }

    return null;
}

function checkLiteral(state) {
    var result = false;
    if (state.value.charAt(state.valueIdx) === state.format[state.idx]) {
        state.valueIdx++;
        result = true;
    }
    return result;
}

function calendarGmtFormats(calendar) {
    var gmtFormat = calendar.gmtFormat;
    var gmtZeroFormat = calendar.gmtZeroFormat;
    if (!gmtFormat) {
        throw errors.NoGMTInfo.error();
    }

    return [ gmtFormat.replace(PLACEHOLDER, EMPTY).toLowerCase(), gmtZeroFormat.replace(PLACEHOLDER, EMPTY).toLowerCase() ];
}

function parseTimeZoneOffset(state, info, options) {
    var shortHours = options.shortHours;
    var noSeparator = options.noSeparator;
    var optionalMinutes = options.optionalMinutes;
    var localizedName = options.localizedName;
    var zLiteral = options.zLiteral;
    state.UTC = true;

    if (zLiteral && state.value.charAt(state.valueIdx) === "Z") {
        state.valueIdx++;
        return false;
    }

    if (localizedName && !getIndexByName(calendarGmtFormats(info.calendar), state, true)) {
        return true;
    }

    var matches = timeZoneOffsetRegExp.exec(state.value.substr(state.valueIdx, 6));
    if (!matches) {
        return !localizedName;
    }

    var hoursMatch = matches[1];
    var minutesMatch = matches[3];
    var hoursOffset = parseInt(hoursMatch, 10);
    var separator = matches[2];
    var minutesOffset = parseInt(minutesMatch, 10);

    if (isNaN(hoursOffset) || (!shortHours && hoursMatch.length !== 3) || (!optionalMinutes && isNaN(minutesOffset)) || (noSeparator && separator)) {
        return true;
    }

    if (isNaN(minutesOffset)) {
        minutesOffset = null;
    }

    if (outOfRange(hoursOffset, -12, 13) || (minutesOffset && outOfRange(minutesOffset, 0, 59))) {
        return true;
    }

    state.valueIdx += matches[0].length;
    state.hoursOffset = hoursOffset;
    state.minutesOffset = minutesOffset;
}

function parseMonth(ch, state, info) {
    var count = lookAhead(ch, state);
    var names = formatNames(info, "months", count, ch === "L", true);

    var month = count < 3 ? getNumber(2, state) : getIndexByName(names, state, true);

    if (month === null || outOfRange(month, 1, 12)) {
        return true;
    }
    state.month = month - 1;
}

function parseDayOfWeek(ch, state, info) {
    var count = lookAhead(ch, state);
    var names = formatNames(info, "days", count, ch === "c", true);
    var dayOfWeek = count < 3 ? getNumber(1, state) : getIndexByName(names, state, true);
    if ((!dayOfWeek && dayOfWeek !== 0) || outOfRange(dayOfWeek, 1, 7)) {
        return true;
    }
}

var parsers = {};

parsers.d = function(state) {
    lookAhead("d", state);
    var day = getNumber(2, state);

    if (day === null || outOfRange(day, 1, 31)) {
        return true;
    }

    if (state.day === null) {
        state.day = day;
    }
};

parsers.E = function(state, info) {
    var count = lookAhead("E", state);
    //validate if it matches the day?
    var dayOfWeek = getIndexByName(formatNames(info, "days", count, false, true), state, true);
    if (dayOfWeek === null) {
        return true;
    }
};

parsers.M = function(state, info) {
    return parseMonth("M", state, info);
};

parsers.L = function(state, info) {
    return parseMonth("L", state, info);
};

parsers.y = function(state) {
    var count = lookAhead("y", state);
    var year = getNumber(count === 1 ? undefined : count, state);

    if (year === null) {
        return true;
    }

    if (count === 2) {
        var currentYear = new Date().getFullYear();
        year = (currentYear - currentYear % 100) + year;
        if (year > TWO_DIGIT_YEAR_MAX) {
            year -= 100;
        }
    }

    state.year = year;
};

parsers.h = function(state) {
    lookAhead("h", state);

    var hours = getNumber(2, state);
    if (hours === 12) {
        hours = 0;
    }

    if (hours === null || outOfRange(hours, 0, 11)) {
        return true;
    }

    state.hours = hours;
};

parsers.K = function(state) {
    lookAhead("K", state);

    var hours = getNumber(2, state);

    if (hours === null || outOfRange(hours, 0, 11)) {
        return true;
    }

    state.hours = hours;
};

parsers.a = function(state, info) {
    var count = lookAhead("a", state);
    var periodFormats = formatNames(info, "dayPeriods", count, false, true);

    var pmHour = getIndexByName([ periodFormats.pm ], state, true);
    if (!pmHour && !getIndexByName([ periodFormats.am ], state, true)) {
        return true;
    }

    state.pmHour = pmHour;
};

parsers.H = function(state) {
    lookAhead("H", state);
    var hours = getNumber(2, state);
    if (hours === null || outOfRange(hours, 0, 23)) {
        return true;
    }
    state.hours = hours;
};

parsers.k = function(state) {
    lookAhead("k", state);

    var hours = getNumber(2, state);

    if (hours === null || outOfRange(hours, 1, 24)) {
        return true;
    }

    state.hours = hours === 24 ? 0 : hours;
};

parsers.m = function(state) {
    lookAhead("m", state);
    var minutes = getNumber(2, state);

    if (minutes === null || outOfRange(minutes, 0, 59)) {
        return true;
    }

    state.minutes = minutes;
};

parsers.s = function(state) {
    lookAhead("s", state);
    var seconds = getNumber(2, state);
    if (seconds === null || outOfRange(seconds, 0, 59)) {
        return true;
    }
    state.seconds = seconds;
};

parsers.S = function(state) {
    var count = lookAhead("S", state);
    var match = state.value.substr(state.valueIdx, count);
    var milliseconds = null;

    if (!isNaN(parseInt(match, 10))) {
        milliseconds = parseFloat("0." + match, 10);
        milliseconds = round(milliseconds, 3);
        milliseconds *= 1000;
        state.valueIdx += count;
    }

    if (milliseconds === null || outOfRange(milliseconds, 0, 999)) {
        return true;
    }

    state.milliseconds = milliseconds;
};

parsers.z = function(state, info) {
    var count = lookAhead("z", state);

    var shortFormat = count < 4;

    var invalid = parseTimeZoneOffset(state, info, {
        shortHours: shortFormat,
        optionalMinutes: shortFormat,
        localizedName: true
    });

    if (invalid) {
        return invalid;
    }
};

parsers.Z = function(state, info) {
    var count = lookAhead("Z", state);

    var invalid = parseTimeZoneOffset(state, info, {
        noSeparator: count < 4,
        zLiteral: count === 5,
        localizedName: count === 4
    });

    if (invalid) {
        return invalid;
    }
};

parsers.x = function(state, info) {
    var count = lookAhead("x", state);

    var invalid = parseTimeZoneOffset(state, info, {
        noSeparator: count !== 3 && count !== 5,
        optionalMinutes: count === 1
    });
    if (invalid) {
        return invalid;
    }
};

parsers.X = function(state, info) {
    var count = lookAhead("X", state);

    var invalid = parseTimeZoneOffset(state, info, {
        noSeparator: count !== 3 && count !== 5,
        optionalMinutes: count === 1,
        zLiteral: true
    });
    if (invalid) {
        return invalid;
    }
};

parsers.G = function(state, info) {
    var count = lookAhead("G", state);
    var eras = formatNames(info, "eras", count, false, true);
    var era = getIndexByName([ eras[0], eras[1] ], state, true);

    if (era === null) {
        return true;
    }
};

parsers.e = function(state, info) {
    return parseDayOfWeek("e", state, info);
};

parsers.c = function(state, info) {
    return parseDayOfWeek("c", state, info);
};

function createDate(state) {
    var year = state.year;
    var month = state.month;
    var day = state.day;
    var hours = state.hours;
    var minutes = state.minutes;
    var seconds = state.seconds;
    var milliseconds = state.milliseconds;
    var pmHour = state.pmHour;
    var UTC = state.UTC;
    var hoursOffset = state.hoursOffset;
    var minutesOffset = state.minutesOffset;
    var hasTime = hours !== null || minutes !== null || seconds || null;
    var date = new Date();
    var result;

    if (year === null && month === null && day === null && hasTime) {
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDate();
    } else {
        if (year === null) {
            year = date.getFullYear();
        }

        if (day === null) {
            day = 1;
        }
    }

    if (pmHour && hours < 12) {
        hours += 12;
    }

    if (UTC) {
        if (hoursOffset) {
            hours += -hoursOffset;
        }

        if (minutesOffset) {
            minutes += -minutesOffset * (hoursOffset < 0 ? -1 : 1);
        }

        result = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
    } else {
        result = new Date(year, month, day, hours, minutes, seconds, milliseconds);
        adjustDST(result, hours);
    }

    if (year < 100) {
        result.setFullYear(year);
    }

    if (result.getDate() !== day && UTC === undefined) {
        return null;
    }

    return result;
}

function parseExact(value, format, info) {
    var pattern = datePattern(format, info).split(EMPTY);

    var state = {
        format: pattern,
        idx: 0,
        value: value,
        valueIdx: 0,
        year: null,
        month: null,
        day: null,
        hours: null,
        minutes: null,
        seconds: null,
        milliseconds: null
    };
    var length = pattern.length;
    var literal = false;

    for (; state.idx < length; state.idx++) {
        var ch = pattern[state.idx];

        if (literal) {
            if (ch === "'") {
                literal = false;
            }

            checkLiteral(state);
        } else {
            if (parsers[ch]) {
                var invalid = parsers[ch](state, info);
                if (invalid) {
                    return null;
                }
            } else if (ch === "'") {
                literal = true;
                checkLiteral(state);
            } else if (!checkLiteral(state)) {
                return null;
            }
        }
    }

    if (state.valueIdx < value.length) {
        return null;
    }

    return createDate(state) || null;
}

function parseMicrosoftDateOffset(offset) {
    var sign = offset.substr(0, 1) === "-" ? -1 : 1;

    var result = offset.substring(1);
    result = (parseInt(result.substr(0, 2), 10) * 60) + parseInt(result.substring(2), 10);

    return sign * result;
}

function parseMicrosoftDateFormat(value) {
    if (value && value.indexOf("/D") === 0) {
        var date = dateRegExp.exec(value);
        if (date) {
            date = date[1];
            var tzoffset = offsetRegExp.exec(date.substring(1));

            date = new Date(parseInt(date, 10));

            if (tzoffset) {
                tzoffset = parseMicrosoftDateOffset(tzoffset[0]);
                date = convertTimeZone(date, date.getTimezoneOffset(), 0);
                date = convertTimeZone(date, 0, -1 * tzoffset);
            }

            return date;
        }
    }
}

function defaultFormats(calendar) {
    var formats = [];
    var patterns = calendar.patterns;
    var length = FORMATS_SEQUENCE.length;

    for (var idx = 0; idx < length; idx++) {
        formats.push(patterns[FORMATS_SEQUENCE[idx]]);
    }

    return formats.concat(standardDateFormats);
}

export default function parseDate(value, formats, locale) {
    if ( locale === void 0 ) locale = DEFAULT_LOCALE;

    if (!value) {
        return null;
    }

    if (isDate(value)) {
        return value;
    }

    var parseValue = String(value).trim();
    var date = parseMicrosoftDateFormat(parseValue);
    if (date) {
        return date;
    }

    var info = localeInfo(locale);
    var parseFormats = formats || defaultFormats(info.calendar);
    parseFormats = Array.isArray(parseFormats) ? parseFormats : [ parseFormats ];

    var length = parseFormats.length;

    for (var idx = 0; idx < length; idx++) {
        date = parseExact(parseValue, parseFormats[idx], info);
        if (date) {
            return date;
        }
    }

    return date;
}
