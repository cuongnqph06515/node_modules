function mod(n, x) {
    return (n % x + x) % x;
}
function absFloor(num) {
    return num < 0 ? Math.ceil(num) || 0 : Math.floor(num);
}

function isString(str) {
    return typeof str === 'string';
}
function isDate(value) {
    return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
}
function isBoolean(value) {
    return value === true || value === false;
}
function isDateValid(date) {
    return date && date.getTime && !isNaN(date.getTime());
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(fn) {
    return (fn instanceof Function ||
        Object.prototype.toString.call(fn) === '[object Function]');
}
function isNumber(value) {
    return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}
function isArray(input) {
    return (input instanceof Array ||
        Object.prototype.toString.call(input) === '[object Array]');
}
function hasOwnProp(a /*object*/, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}
function isObject(input /*object*/) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return (input != null && Object.prototype.toString.call(input) === '[object Object]');
}
function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    }
    let k;
    for (k in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}
function isUndefined(input) {
    return input === void 0;
}
function toInt(argumentForCoercion) {
    const coercedNumber = +argumentForCoercion;
    let value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }
    return value;
}

const aliases = {};
const _mapUnits = {
    date: 'day',
    hour: 'hours',
    minute: 'minutes',
    second: 'seconds',
    millisecond: 'milliseconds'
};
function addUnitAlias(unit, shorthand) {
    const lowerCase = unit.toLowerCase();
    let _unit = unit;
    if (lowerCase in _mapUnits) {
        _unit = _mapUnits[lowerCase];
    }
    aliases[lowerCase] = aliases[`${lowerCase}s`] = aliases[shorthand] = _unit;
}
function normalizeUnits(units) {
    return isString(units) ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}
function normalizeObjectUnits(inputObject) {
    const normalizedInput = {};
    let normalizedProp;
    let prop;
    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }
    return normalizedInput;
}

// place in new Date([array])
const YEAR = 0;
const MONTH = 1;
const DATE = 2;
const HOUR = 3;
const MINUTE = 4;
const SECOND = 5;
const MILLISECOND = 6;
const WEEK = 7;
const WEEKDAY = 8;

function zeroFill(num, targetLength, forceSign) {
    const absNumber = `${Math.abs(num)}`;
    const zerosToFill = targetLength - absNumber.length;
    const sign = num >= 0;
    const _sign = sign ? (forceSign ? '+' : '') : '-';
    // todo: this is crazy slow
    const _zeros = Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1);
    return (_sign + _zeros + absNumber);
}

const formatFunctions = {};
const formatTokenFunctions = {};
const formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken(token, padded, ordinal, callback) {
    if (token) {
        formatTokenFunctions[token] = callback;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(callback.apply(null, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function (date, opts) {
            return opts.locale.ordinal(callback.apply(null, arguments), token);
        };
    }
}
function makeFormatFunction(format) {
    const array = format.match(formattingTokens);
    const length = array.length;
    const formatArr = new Array(length);
    for (let i = 0; i < length; i++) {
        formatArr[i] = formatTokenFunctions[array[i]]
            ? formatTokenFunctions[array[i]]
            : removeFormattingTokens(array[i]);
    }
    return function (date, locale, isUTC, offset = 0) {
        let output = '';
        for (let j = 0; j < length; j++) {
            output += isFunction(formatArr[j])
                ? formatArr[j].call(null, date, { format, locale, isUTC, offset })
                : formatArr[j];
        }
        return output;
    };
}
function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createUTCDate(y, m, d) {
    // eslint-disable-next-line prefer-rest-params
    const date = new Date(Date.UTC.apply(null, arguments));
    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}
function createDate(y, m = 0, d = 1, h = 0, M = 0, s = 0, ms = 0) {
    const date = new Date(y, m, d, h, M, s, ms);
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function getHours(date, isUTC = false) {
    return isUTC ? date.getUTCHours() : date.getHours();
}
function getMinutes(date, isUTC = false) {
    return isUTC ? date.getUTCMinutes() : date.getMinutes();
}
function getSeconds(date, isUTC = false) {
    return isUTC ? date.getUTCSeconds() : date.getSeconds();
}
function getMilliseconds(date, isUTC = false) {
    return isUTC ? date.getUTCMilliseconds() : date.getMilliseconds();
}
function getTime(date) {
    return date.getTime();
}
function getDay(date, isUTC = false) {
    return isUTC ? date.getUTCDay() : date.getDay();
}
function getDate(date, isUTC = false) {
    return isUTC ? date.getUTCDate() : date.getDate();
}
function getMonth(date, isUTC = false) {
    return isUTC ? date.getUTCMonth() : date.getMonth();
}
function getFullYear(date, isUTC = false) {
    return isUTC ? date.getUTCFullYear() : date.getFullYear();
}
function getUnixTime(date) {
    return Math.floor(date.valueOf() / 1000);
}
function unix(date) {
    return Math.floor(date.valueOf() / 1000);
}
function getFirstDayOfMonth(date) {
    return createDate(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes(), date.getSeconds());
}
function daysInMonth(date) {
    return _daysInMonth(date.getFullYear(), date.getMonth());
}
function _daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
function isFirstDayOfWeek(date, firstDayOfWeek) {
    return date.getDay() === Number(firstDayOfWeek);
}
function isSameMonth(date1, date2) {
    if (!date1 || !date2) {
        return false;
    }
    return isSameYear(date1, date2) && getMonth(date1) === getMonth(date2);
}
function isSameYear(date1, date2) {
    if (!date1 || !date2) {
        return false;
    }
    return getFullYear(date1) === getFullYear(date2);
}
function isSameDay(date1, date2) {
    if (!date1 || !date2) {
        return false;
    }
    return (isSameYear(date1, date2) &&
        isSameMonth(date1, date2) &&
        getDate(date1) === getDate(date2));
}

const match1 = /\d/; //       0 - 9
const match2 = /\d\d/; //      00 - 99
const match3 = /\d{3}/; //     000 - 999
const match4 = /\d{4}/; //    0000 - 9999
const match6 = /[+-]?\d{6}/; // -999999 - 999999
const match1to2 = /\d\d?/; //       0 - 99
const match3to4 = /\d\d\d\d?/; //     999 - 9999
const match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
const match1to3 = /\d{1,3}/; //       0 - 999
const match1to4 = /\d{1,4}/; //       0 - 9999
const match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999
const matchUnsigned = /\d+/; //       0 - inf
const matchSigned = /[+-]?\d+/; //    -inf - inf
const matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
const matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
const matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
const matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
const regexes = {};
function addRegexToken(token, regex, strictRegex) {
    if (isFunction(regex)) {
        regexes[token] = regex;
        return;
    }
    regexes[token] = function (isStrict, locale) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}
function getParseRegexForToken(token, locale) {
    const _strict = false;
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }
    return regexes[token](_strict, locale);
}
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(str) {
    return regexEscape(str
        .replace('\\', '')
        .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (matched, p1, p2, p3, p4) => p1 || p2 || p3 || p4));
}
function regexEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const tokens = {};
function addParseToken(token, callback) {
    const _token = isString(token) ? [token] : token;
    let func = callback;
    if (isNumber(callback)) {
        func = function (input, array, config) {
            array[callback] = toInt(input);
            return config;
        };
    }
    if (isArray(_token) && isFunction(func)) {
        let i;
        for (i = 0; i < _token.length; i++) {
            tokens[_token[i]] = func;
        }
    }
}
function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, _token) {
        config._w = config._w || {};
        return callback(input, config._w, config, _token);
    });
}
function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
    return config;
}

const priorities = {};
function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}
/*
export function getPrioritizedUnits(unitsObj) {
  const units = [];
  let unit;
  for (unit in unitsObj) {
    if (unitsObj.hasOwnProperty(unit)) {
      units.push({ unit, priority: priorities[unit] });
    }
  }
  units.sort(function (a, b) {
    return a.priority - b.priority;
  });

  return units;
}
*/

function initDayOfMonth() {
    // FORMATTING
    addFormatToken('D', ['DD', 2, false], 'Do', function (date, opts) {
        return getDate(date, opts.isUTC)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('date', 'D');
    // PRIOROITY
    addUnitPriority('date', 9);
    // PARSING
    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return locale._dayOfMonthOrdinalParse || locale._ordinalParse;
    });
    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array, config) {
        array[DATE] = toInt(input.match(match1to2)[0]);
        return config;
    });
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
    };
}
function getParsingFlags(config) {
    if (config._pf == null) {
        config._pf = defaultParsingFlags();
    }
    return config._pf;
}

// FORMATTING
function getYear(date, opts) {
    if (opts.locale.getFullYear) {
        return opts.locale.getFullYear(date, opts.isUTC).toString();
    }
    return getFullYear(date, opts.isUTC).toString();
}
function initYear() {
    addFormatToken('Y', null, null, function (date, opts) {
        const y = getFullYear(date, opts.isUTC);
        return y <= 9999 ? y.toString(10) : `+${y}`;
    });
    addFormatToken(null, ['YY', 2, false], null, function (date, opts) {
        return (getFullYear(date, opts.isUTC) % 100).toString(10);
    });
    addFormatToken(null, ['YYYY', 4, false], null, getYear);
    addFormatToken(null, ['YYYYY', 5, false], null, getYear);
    addFormatToken(null, ['YYYYYY', 6, true], null, getYear);
    // ALIASES
    addUnitAlias('year', 'y');
    // PRIORITIES
    addUnitPriority('year', 1);
    // PARSING
    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);
    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array, config) {
        array[YEAR] = input.length === 2 ? parseTwoDigitYear(input) : toInt(input);
        return config;
    });
    addParseToken('YY', function (input, array, config) {
        array[YEAR] = parseTwoDigitYear(input);
        return config;
    });
    addParseToken('Y', function (input, array, config) {
        array[YEAR] = parseInt(input, 10);
        return config;
    });
}
function parseTwoDigitYear(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// todo: this is duplicate, source in date-getters.ts
function daysInMonth$1(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    const modMonth = mod(month, 12);
    const _year = year + (month - modMonth) / 12;
    return modMonth === 1
        ? isLeapYear(_year) ? 29 : 28
        : (31 - modMonth % 7 % 2);
}
function initMonth() {
    // FORMATTING
    addFormatToken('M', ['MM', 2, false], 'Mo', function (date, opts) {
        return (getMonth(date, opts.isUTC) + 1).toString(10);
    });
    addFormatToken('MMM', null, null, function (date, opts) {
        return opts.locale.monthsShort(date, opts.format, opts.isUTC);
    });
    addFormatToken('MMMM', null, null, function (date, opts) {
        return opts.locale.months(date, opts.format, opts.isUTC);
    });
    // ALIASES
    addUnitAlias('month', 'M');
    // PRIORITY
    addUnitPriority('month', 8);
    // PARSING
    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });
    addParseToken(['M', 'MM'], function (input, array, config) {
        array[MONTH] = toInt(input) - 1;
        return config;
    });
    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        const month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        }
        else {
            getParsingFlags(config).invalidMonth = !!input;
        }
        return config;
    });
}

const defaultTimeUnit = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    seconds: 0
};
function shiftDate(date, unit) {
    const _unit = Object.assign({}, defaultTimeUnit, unit);
    const year = date.getFullYear() + (_unit.year || 0);
    const month = date.getMonth() + (_unit.month || 0);
    let day = date.getDate() + (_unit.day || 0);
    if (_unit.month && !_unit.day) {
        day = Math.min(day, daysInMonth$1(year, month));
    }
    return createDate(year, month, day, date.getHours() + (_unit.hour || 0), date.getMinutes() + (_unit.minute || 0), date.getSeconds() + (_unit.seconds || 0));
}
function setFullDate(date, unit) {
    return createDate(getNum(date.getFullYear(), unit.year), getNum(date.getMonth(), unit.month), 1, // day, to avoid issue with wrong months selection at the end of current month (#5371)
    getNum(date.getHours(), unit.hour), getNum(date.getMinutes(), unit.minute), getNum(date.getSeconds(), unit.seconds), getNum(date.getMilliseconds(), unit.milliseconds));
}
function getNum(def, num) {
    return isNumber(num) ? num : def;
}
function setFullYear(date, value, isUTC) {
    const _month = getMonth(date, isUTC);
    const _date = getDate(date, isUTC);
    const _year = getFullYear(date, isUTC);
    if (isLeapYear(_year) && _month === 1 && _date === 29) {
        const _daysInMonth = daysInMonth$1(value, _month);
        isUTC ? date.setUTCFullYear(value, _month, _daysInMonth) : date.setFullYear(value, _month, _daysInMonth);
    }
    isUTC ? date.setUTCFullYear(value) : date.setFullYear(value);
    return date;
}
function setMonth(date, value, isUTC) {
    const dayOfMonth = Math.min(getDate(date), daysInMonth$1(getFullYear(date), value));
    isUTC ? date.setUTCMonth(value, dayOfMonth) : date.setMonth(value, dayOfMonth);
    return date;
}
function setDay(date, value, isUTC) {
    isUTC ? date.setUTCDate(value) : date.setDate(value);
    return date;
}
function setHours(date, value, isUTC) {
    isUTC ? date.setUTCHours(value) : date.setHours(value);
    return date;
}
function setMinutes(date, value, isUTC) {
    isUTC ? date.setUTCMinutes(value) : date.setMinutes(value);
    return date;
}
function setSeconds(date, value, isUTC) {
    isUTC ? date.setUTCSeconds(value) : date.setSeconds(value);
    return date;
}
function setMilliseconds(date, value, isUTC) {
    isUTC ? date.setUTCMilliseconds(value) : date.setMilliseconds(value);
    return date;
}
function setDate(date, value, isUTC) {
    isUTC ? date.setUTCDate(value) : date.setDate(value);
    return date;
}
function setTime(date, value) {
    date.setTime(value);
    return date;
}

// fastest way to clone date
// https://jsperf.com/clone-date-object2
function cloneDate(date) {
    return new Date(date.getTime());
}

function startOf(date, unit, isUTC) {
    const _date = cloneDate(date);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (unit) {
        case 'year':
            setMonth(_date, 0, isUTC);
        /* falls through */
        case 'quarter':
        case 'month':
            setDate(_date, 1, isUTC);
        /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            setHours(_date, 0, isUTC);
        /* falls through */
        case 'hours':
            setMinutes(_date, 0, isUTC);
        /* falls through */
        case 'minutes':
            setSeconds(_date, 0, isUTC);
        /* falls through */
        case 'seconds':
            setMilliseconds(_date, 0, isUTC);
    }
    // weeks are a special case
    if (unit === 'week') {
        setLocaleDayOfWeek(_date, 0, { isUTC });
    }
    if (unit === 'isoWeek') {
        setISODayOfWeek(_date, 1);
    }
    // quarters are also special
    if (unit === 'quarter') {
        setMonth(_date, Math.floor(getMonth(_date, isUTC) / 3) * 3, isUTC);
    }
    return _date;
}
function endOf(date, unit, isUTC) {
    let _unit = unit;
    // 'date' is an alias for 'day', so it should be considered as such.
    if (_unit === 'date') {
        _unit = 'day';
    }
    const start = startOf(date, _unit, isUTC);
    const _step = add(start, 1, _unit === 'isoWeek' ? 'week' : _unit, isUTC);
    const res = subtract(_step, 1, 'milliseconds', isUTC);
    return res;
}

function initDayOfYear() {
    // FORMATTING
    addFormatToken('DDD', ['DDDD', 3, false], 'DDDo', function (date) {
        return getDayOfYear(date)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('dayOfYear', 'DDD');
    // PRIORITY
    addUnitPriority('dayOfYear', 4);
    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
        return config;
    });
}
function getDayOfYear(date, isUTC) {
    const date1 = +startOf(date, 'day', isUTC);
    const date2 = +startOf(date, 'year', isUTC);
    const someDate = date1 - date2;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round(someDate / oneDay) + 1;
}
function setDayOfYear(date, input) {
    const dayOfYear = getDayOfYear(date);
    return add(date, (input - dayOfYear), 'day');
}

/**
 *
 * @param {number} year
 * @param {number} dow - start-of-first-week
 * @param {number} doy - start-of-year
 * @returns {number}
 */
function firstWeekOffset(year, dow, doy) {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = dow - doy + 7;
    // first-week day local weekday -- which local weekday is fwd
    const fwdlw = (createUTCDate(year, 0, fwd).getUTCDay() - dow + 7) % 7;
    return -fwdlw + fwd - 1;
}
// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    const localWeekday = (7 + weekday - dow) % 7;
    const weekOffset = firstWeekOffset(year, dow, doy);
    const dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset;
    let resYear;
    let resDayOfYear;
    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    }
    else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    }
    else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }
    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}
function weekOfYear(date, dow, doy, isUTC) {
    const weekOffset = firstWeekOffset(getFullYear(date, isUTC), dow, doy);
    const week = Math.floor((getDayOfYear(date, isUTC) - weekOffset - 1) / 7) + 1;
    let resWeek;
    let resYear;
    if (week < 1) {
        resYear = getFullYear(date, isUTC) - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    }
    else if (week > weeksInYear(getFullYear(date, isUTC), dow, doy)) {
        resWeek = week - weeksInYear(getFullYear(date, isUTC), dow, doy);
        resYear = getFullYear(date, isUTC) + 1;
    }
    else {
        resYear = getFullYear(date, isUTC);
        resWeek = week;
    }
    return {
        week: resWeek,
        year: resYear
    };
}
function weeksInYear(year, dow, doy) {
    const weekOffset = firstWeekOffset(year, dow, doy);
    const weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

const MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
const defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
const defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
const defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
const defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
const defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
const defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
const defaultOrdinal = '%d';
const defaultDayOfMonthOrdinalParse = /\d{1,2}/;
const defaultMonthsShortRegex = matchWord;
const defaultMonthsRegex = matchWord;
class Locale {
    constructor(config) {
        if (config) {
            this.set(config);
        }
    }
    set(config) {
        let confKey;
        for (confKey in config) {
            // eslint-disable-next-line no-prototype-builtins
            if (!config.hasOwnProperty(confKey)) {
                continue;
            }
            const prop = config[confKey];
            const key = (isFunction(prop) ? confKey : `_${confKey}`);
            this[key] = prop;
        }
        this._config = config;
    }
    calendar(key, date, now) {
        const output = this._calendar[key] || this._calendar.sameElse;
        return isFunction(output) ? output.call(null, date, now) : output;
    }
    longDateFormat(key) {
        const format = this._longDateFormat[key];
        const formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) {
            return format;
        }
        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });
        return this._longDateFormat[key];
    }
    get invalidDate() {
        return this._invalidDate;
    }
    set invalidDate(val) {
        this._invalidDate = val;
    }
    ordinal(num, token) {
        return this._ordinal.replace('%d', num.toString(10));
    }
    preparse(str, format) {
        return str;
    }
    getFullYear(date, isUTC = false) {
        return getFullYear(date, isUTC);
    }
    postformat(str) {
        return str;
    }
    relativeTime(num, withoutSuffix, str, isFuture) {
        const output = this._relativeTime[str];
        return (isFunction(output)) ?
            output(num, withoutSuffix, str, isFuture) :
            output.replace(/%d/i, num.toString(10));
    }
    pastFuture(diff, output) {
        const format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }
    months(date, format, isUTC = false) {
        if (!date) {
            return isArray(this._months)
                ? this._months
                : this._months.standalone;
        }
        if (isArray(this._months)) {
            return this._months[getMonth(date, isUTC)];
        }
        const key = (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
            ? 'format'
            : 'standalone';
        return this._months[key][getMonth(date, isUTC)];
    }
    monthsShort(date, format, isUTC = false) {
        if (!date) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort.standalone;
        }
        if (isArray(this._monthsShort)) {
            return this._monthsShort[getMonth(date, isUTC)];
        }
        const key = MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone';
        return this._monthsShort[key][getMonth(date, isUTC)];
    }
    monthsParse(monthName, format, strict) {
        let date;
        let regex;
        if (this._monthsParseExact) {
            return this.handleMonthStrictParse(monthName, format, strict);
        }
        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }
        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        let i;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            date = new Date(Date.UTC(2000, i));
            if (strict && !this._longMonthsParse[i]) {
                const _months = this.months(date, '', true).replace('.', '');
                const _shortMonths = this.monthsShort(date, '', true).replace('.', '');
                this._longMonthsParse[i] = new RegExp(`^${_months}$`, 'i');
                this._shortMonthsParse[i] = new RegExp(`^${_shortMonths}$`, 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = `^${this.months(date, '', true)}|^${this.monthsShort(date, '', true)}`;
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // testing the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            }
            if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            }
            if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }
    monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this.computeMonthsParse();
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            }
            return this._monthsRegex;
        }
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
    monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this.computeMonthsParse();
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            }
            return this._monthsShortRegex;
        }
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
    /** Week */
    week(date, isUTC) {
        return weekOfYear(date, this._week.dow, this._week.doy, isUTC).week;
    }
    firstDayOfWeek() {
        return this._week.dow;
    }
    firstDayOfYear() {
        return this._week.doy;
    }
    weekdays(date, format, isUTC) {
        if (!date) {
            return isArray(this._weekdays)
                ? this._weekdays
                : this._weekdays.standalone;
        }
        if (isArray(this._weekdays)) {
            return this._weekdays[getDay(date, isUTC)];
        }
        const _key = this._weekdays.isFormat.test(format)
            ? 'format'
            : 'standalone';
        return this._weekdays[_key][getDay(date, isUTC)];
    }
    weekdaysMin(date, format, isUTC) {
        return date ? this._weekdaysMin[getDay(date, isUTC)] : this._weekdaysMin;
    }
    weekdaysShort(date, format, isUTC) {
        return date ? this._weekdaysShort[getDay(date, isUTC)] : this._weekdaysShort;
    }
    // proto.weekdaysParse  =        localeWeekdaysParse;
    weekdaysParse(weekdayName, format, strict) {
        let i;
        let regex;
        if (this._weekdaysParseExact) {
            return this.handleWeekStrictParse(weekdayName, format, strict);
        }
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            // fix: here is the issue
            const date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(`^${this.weekdays(date, '', true).replace('.', '\.?')}$`, 'i');
                this._shortWeekdaysParse[i] = new RegExp(`^${this.weekdaysShort(date, '', true).replace('.', '\.?')}$`, 'i');
                this._minWeekdaysParse[i] = new RegExp(`^${this.weekdaysMin(date, '', true).replace('.', '\.?')}$`, 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = `^${this.weekdays(date, '', true)}|^${this.weekdaysShort(date, '', true)}|^${this.weekdaysMin(date, '', true)}`;
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            if (!isArray(this._fullWeekdaysParse)
                || !isArray(this._shortWeekdaysParse)
                || !isArray(this._minWeekdaysParse)
                || !isArray(this._weekdaysParse)) {
                return;
            }
            // testing the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            }
            else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            }
            else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            }
            else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }
    // proto.weekdaysRegex       =        weekdaysRegex;
    weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this.computeWeekdaysParse();
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            }
            else {
                return this._weekdaysRegex;
            }
        }
        else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = matchWord;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }
    // proto.weekdaysShortRegex  =        weekdaysShortRegex;
    // proto.weekdaysMinRegex    =        weekdaysMinRegex;
    weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this.computeWeekdaysParse();
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            }
            else {
                return this._weekdaysShortRegex;
            }
        }
        else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = matchWord;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }
    weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this.computeWeekdaysParse();
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            }
            else {
                return this._weekdaysMinRegex;
            }
        }
        else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = matchWord;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }
    isPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return input.toLowerCase().charAt(0) === 'p';
    }
    meridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        }
        return isLower ? 'am' : 'AM';
    }
    formatLongDate(key) {
        this._longDateFormat = this._longDateFormat ? this._longDateFormat : defaultLongDateFormat;
        const format = this._longDateFormat[key];
        const formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) {
            return format;
        }
        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, (val) => {
            return val.slice(1);
        });
        return this._longDateFormat[key];
    }
    handleMonthStrictParse(monthName, format, strict) {
        const llc = monthName.toLocaleLowerCase();
        let i;
        let ii;
        let mom;
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = new Date(2000, i);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }
        if (strict) {
            if (format === 'MMM') {
                ii = this._shortMonthsParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            ii = this._longMonthsParse.indexOf(llc);
            return ii !== -1 ? ii : null;
        }
        if (format === 'MMM') {
            ii = this._shortMonthsParse.indexOf(llc);
            if (ii !== -1) {
                return ii;
            }
            ii = this._longMonthsParse.indexOf(llc);
            return ii !== -1 ? ii : null;
        }
        ii = this._longMonthsParse.indexOf(llc);
        if (ii !== -1) {
            return ii;
        }
        ii = this._shortMonthsParse.indexOf(llc);
        return ii !== -1 ? ii : null;
    }
    handleWeekStrictParse(weekdayName, format, strict) {
        let ii;
        const llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            let i;
            for (i = 0; i < 7; ++i) {
                const date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
                this._minWeekdaysParse[i] = this.weekdaysMin(date).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(date).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(date, '').toLocaleLowerCase();
            }
        }
        if (!isArray(this._weekdaysParse)
            || !isArray(this._shortWeekdaysParse)
            || !isArray(this._minWeekdaysParse)) {
            return;
        }
        if (strict) {
            if (format === 'dddd') {
                ii = this._weekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else if (format === 'ddd') {
                ii = this._shortWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else {
                ii = this._minWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
        }
        else {
            if (format === 'dddd') {
                ii = this._weekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._shortWeekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._minWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else if (format === 'ddd') {
                ii = this._shortWeekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._weekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._minWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
            else {
                ii = this._minWeekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._weekdaysParse.indexOf(llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = this._shortWeekdaysParse.indexOf(llc);
                return ii !== -1 ? ii : null;
            }
        }
    }
    computeMonthsParse() {
        const shortPieces = [];
        const longPieces = [];
        const mixedPieces = [];
        let date;
        let i;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            date = new Date(2000, i);
            shortPieces.push(this.monthsShort(date, ''));
            longPieces.push(this.months(date, ''));
            mixedPieces.push(this.months(date, ''));
            mixedPieces.push(this.monthsShort(date, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }
        this._monthsRegex = new RegExp(`^(${mixedPieces.join('|')})`, 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(`^(${longPieces.join('|')})`, 'i');
        this._monthsShortStrictRegex = new RegExp(`^(${shortPieces.join('|')})`, 'i');
    }
    computeWeekdaysParse() {
        const minPieces = [];
        const shortPieces = [];
        const longPieces = [];
        const mixedPieces = [];
        let i;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            // let mom = createUTC([2000, 1]).day(i);
            const date = setDayOfWeek(new Date(Date.UTC(2000, 1)), i, null, true);
            const minp = this.weekdaysMin(date);
            const shortp = this.weekdaysShort(date);
            const longp = this.weekdays(date);
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }
        this._weekdaysRegex = new RegExp(`^(${mixedPieces.join('|')})`, 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp(`^(${longPieces.join('|')})`, 'i');
        this._weekdaysShortStrictRegex = new RegExp(`^(${shortPieces.join('|')})`, 'i');
        this._weekdaysMinStrictRegex = new RegExp(`^(${minPieces.join('|')})`, 'i');
    }
}
function cmpLenRev(a, b) {
    return b.length - a.length;
}

const defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
};

const defaultInvalidDate = 'Invalid date';
const defaultLocaleWeek = {
    dow: 0,
    doy: 6 // The week that contains Jan 1st is the first week of the year.
};
const defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
const defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
};
const baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
};

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    const len = Math.min(array1.length, array2.length);
    const lengthDiff = Math.abs(array1.length - array2.length);
    let diffs = 0;
    let i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i])
            || (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

// FORMATTING
function initWeek() {
    addFormatToken('w', ['ww', 2, false], 'wo', function (date, opts) {
        return getWeek(date, opts.locale)
            .toString(10);
    });
    addFormatToken('W', ['WW', 2, false], 'Wo', function (date) {
        return getISOWeek(date)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');
    // PRIORITIES
    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);
    // PARSING
    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);
    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
        return config;
    });
    // export function getSetWeek (input) {
    //   var week = this.localeData().week(this);
    //   return input == null ? week : this.add((input - week) * 7, 'd');
    // }
}
function setWeek(date, input, locale = getLocale()) {
    const week = getWeek(date, locale);
    return add(date, (input - week) * 7, 'day');
}
function getWeek(date, locale = getLocale(), isUTC) {
    return locale.week(date, isUTC);
}
// export function getSetISOWeek (input) {
//   var week = weekOfYear(this, 1, 4).week;
//   return input == null ? week : this.add((input - week) * 7, 'd');
// }
function setISOWeek(date, input) {
    const week = getISOWeek(date);
    return add(date, (input - week) * 7, 'day');
}
function getISOWeek(date, isUTC) {
    return weekOfYear(date, 1, 4, isUTC).week;
}

// FORMATTING
function initWeekYear() {
    addFormatToken(null, ['gg', 2, false], null, function (date, opts) {
        // return this.weekYear() % 100;
        return (getWeekYear(date, opts.locale) % 100).toString();
    });
    addFormatToken(null, ['GG', 2, false], null, function (date) {
        // return this.isoWeekYear() % 100;
        return (getISOWeekYear(date) % 100).toString();
    });
    addWeekYearFormatToken('gggg', _getWeekYearFormatCb);
    addWeekYearFormatToken('ggggg', _getWeekYearFormatCb);
    addWeekYearFormatToken('GGGG', _getISOWeekYearFormatCb);
    addWeekYearFormatToken('GGGGG', _getISOWeekYearFormatCb);
    // ALIASES
    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');
    // PRIORITY
    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);
    // PARSING
    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);
    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
        return config;
    });
    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = parseTwoDigitYear(input);
        return config;
    });
}
function addWeekYearFormatToken(token, getter) {
    addFormatToken(null, [token, token.length, false], null, getter);
}
function _getWeekYearFormatCb(date, opts) {
    return getWeekYear(date, opts.locale).toString();
}
function _getISOWeekYearFormatCb(date) {
    return getISOWeekYear(date).toString();
}
// MOMENTS
function getSetWeekYear(date, input, locale = getLocale(), isUTC) {
    return getSetWeekYearHelper(date, input, 
    // this.week(),
    getWeek(date, locale, isUTC), 
    // this.weekday(),
    getLocaleDayOfWeek(date, locale, isUTC), locale.firstDayOfWeek(), locale.firstDayOfYear(), isUTC);
}
function getWeekYear(date, locale = getLocale(), isUTC) {
    return weekOfYear(date, locale.firstDayOfWeek(), locale.firstDayOfYear(), isUTC).year;
}
function getSetISOWeekYear(date, input, isUTC) {
    return getSetWeekYearHelper(date, input, getISOWeek(date, isUTC), getISODayOfWeek(date, isUTC), 1, 4);
}
function getISOWeekYear(date, isUTC) {
    return weekOfYear(date, 1, 4, isUTC).year;
}
function getISOWeeksInYear(date, isUTC) {
    return weeksInYear(getFullYear(date, isUTC), 1, 4);
}
function getWeeksInYear(date, isUTC, locale = getLocale()) {
    return weeksInYear(getFullYear(date, isUTC), locale.firstDayOfWeek(), locale.firstDayOfYear());
}
function getSetWeekYearHelper(date, input, week, weekday, dow, doy, isUTC) {
    if (!input) {
        return getWeekYear(date, void 0, isUTC);
    }
    const weeksTarget = weeksInYear(input, dow, doy);
    const _week = week > weeksTarget ? weeksTarget : week;
    return setWeekAll(date, input, _week, weekday, dow, doy);
}
function setWeekAll(date, weekYear, week, weekday, dow, doy) {
    const dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    const _date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    setFullYear(date, getFullYear(_date, true), true);
    setMonth(date, getMonth(_date, true), true);
    setDate(date, getDate(_date, true), true);
    return date;
}

// todo: add support for timezones
function initTimezone() {
    // FORMATTING
    addFormatToken('z', null, null, function (date, opts) {
        return opts.isUTC ? 'UTC' : '';
    });
    addFormatToken('zz', null, null, function (date, opts) {
        return opts.isUTC ? 'Coordinated Universal Time' : '';
    });
}
// MOMENTS
function getZoneAbbr(isUTC) {
    return isUTC ? 'UTC' : '';
}
function getZoneName(isUTC) {
    return isUTC ? 'Coordinated Universal Time' : '';
}

function initTimestamp() {
    // FORMATTING
    addFormatToken('X', null, null, function (date) {
        return unix(date)
            .toString(10);
    });
    addFormatToken('x', null, null, function (date) {
        return date.valueOf()
            .toString(10);
    });
    // PARSING
    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
        return config;
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
        return config;
    });
}

function initSecond() {
    // FORMATTING
    addFormatToken('s', ['ss', 2, false], null, function (date, opts) {
        return getSeconds(date, opts.isUTC)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('second', 's');
    // PRIORITY
    addUnitPriority('second', 15);
    // PARSING
    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);
}

function initQuarter() {
    // FORMATTING
    addFormatToken('Q', null, 'Qo', function (date, opts) {
        return getQuarter(date, opts.isUTC)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('quarter', 'Q');
    // PRIORITY
    addUnitPriority('quarter', 7);
    // PARSING
    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array, config) {
        array[MONTH] = (toInt(input) - 1) * 3;
        return config;
    });
}
// MOMENTS
function getQuarter(date, isUTC = false) {
    return Math.ceil((getMonth(date, isUTC) + 1) / 3);
}
function setQuarter(date, quarter, isUTC) {
    return setMonth(date, (quarter - 1) * 3 + getMonth(date, isUTC) % 3, isUTC);
}
// export function getSetQuarter(input) {
//   return input == null
//     ? Math.ceil((this.month() + 1) / 3)
//     : this.month((input - 1) * 3 + this.month() % 3);
// }

// FORMATTING
function addOffsetFormatToken(token, separator) {
    addFormatToken(token, null, null, function (date, config) {
        let offset = getUTCOffset(date, { _isUTC: config.isUTC, _offset: config.offset });
        let sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}
function initOffset() {
    addOffsetFormatToken('Z', ':');
    addOffsetFormatToken('ZZ', '');
    // PARSING
    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
        return config;
    });
}
// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
const chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, str) {
    const matches = (str || '').match(matcher);
    if (matches === null) {
        return null;
    }
    const chunk = matches[matches.length - 1];
    const parts = chunk.match(chunkOffset) || ['-', '0', '0'];
    const minutes = parseInt(parts[1], 10) * 60 + toInt(parts[2]);
    const _min = parts[0] === '+' ? minutes : -minutes;
    return minutes === 0 ? 0 : _min;
}
// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, date, config = {}) {
    if (!config._isUTC) {
        return input;
    }
    const res = cloneDate(date);
    // todo: input._d - res._d + ((res._offset || 0) - (input._offset || 0))*60000
    const offsetDiff = (config._offset || 0) * 60000;
    const diff = input.valueOf() - res.valueOf() + offsetDiff;
    // Use low-level api, because this fn is low-level api.
    res.setTime(res.valueOf() + diff);
    // todo: add timezone handling
    // hooks.updateOffset(res, false);
    return res;
}
function getDateOffset(date) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(date.getTimezoneOffset() / 15) * 15;
}
// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
// todo: it's from moment timezones
// hooks.updateOffset = function () {
// };
// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getUTCOffset(date, config = {}) {
    const _offset = config._offset || 0;
    return config._isUTC ? _offset : getDateOffset(date);
}
function setUTCOffset(date, input, keepLocalTime, keepMinutes, config = {}) {
    const offset = config._offset || 0;
    let localAdjust;
    let _input = input;
    let _date = date;
    if (isString(_input)) {
        _input = offsetFromString(matchShortOffset, _input);
        if (_input === null) {
            return _date;
        }
    }
    else if (isNumber(_input) && Math.abs(_input) < 16 && !keepMinutes) {
        _input = _input * 60;
    }
    if (!config._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(_date);
    }
    config._offset = _input;
    config._isUTC = true;
    if (localAdjust != null) {
        _date = add(_date, localAdjust, 'minutes');
    }
    if (offset !== _input) {
        if (!keepLocalTime || config._changeInProgress) {
            _date = add(_date, _input - offset, 'minutes', config._isUTC);
            // addSubtract(this, createDuration(_input - offset, 'm'), 1, false);
        }
        else if (!config._changeInProgress) {
            config._changeInProgress = true;
            // todo: add timezone handling
            // hooks.updateOffset(this, true);
            config._changeInProgress = null;
        }
    }
    return _date;
}
/*
export function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== 'string') {
      input = -input;
    }

    this.utcOffset(input, keepLocalTime);

    return this;
  } else {
    return -this.utcOffset();
  }
}
*/
function setOffsetToUTC(date, keepLocalTime) {
    return setUTCOffset(date, 0, keepLocalTime);
}
function isDaylightSavingTime(date) {
    return (getUTCOffset(date) > getUTCOffset(setMonth(cloneDate(date), 0))
        || getUTCOffset(date) > getUTCOffset(setMonth(cloneDate(date), 5)));
}
/*export function setOffsetToLocal(date: Date, isUTC?: boolean, keepLocalTime?: boolean) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;

    if (keepLocalTime) {
      this.subtract(getDateOffset(this), 'm');
    }
  }
  return this;
}*/
function setOffsetToParsedOffset(date, input, config = {}) {
    if (config._tzm != null) {
        return setUTCOffset(date, config._tzm, false, true, config);
    }
    if (isString(input)) {
        const tZone = offsetFromString(matchOffset, input);
        if (tZone != null) {
            return setUTCOffset(date, tZone, false, false, config);
        }
        return setUTCOffset(date, 0, true, false, config);
    }
    return date;
}
function hasAlignedHourOffset(date, input) {
    const _input = input ? getUTCOffset(input, { _isUTC: false }) : 0;
    return (getUTCOffset(date) - _input) % 60 === 0;
}
// DEPRECATED
/*export function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }

  const c = {};

  copyConfig(c, this);
  c = prepareConfig(c);

  if (c._a) {
    const other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() &&
      compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }

  return this._isDSTShifted;
}*/
// in Khronos
/*export function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}

export function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}

export function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}*/

function initMinute() {
    // FORMATTING
    addFormatToken('m', ['mm', 2, false], null, function (date, opts) {
        return getMinutes(date, opts.isUTC)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('minute', 'm');
    // PRIORITY
    addUnitPriority('minute', 14);
    // PARSING
    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);
}

// FORMATTING
function initMillisecond() {
    addFormatToken('S', null, null, function (date, opts) {
        return (~~(getMilliseconds(date, opts.isUTC) / 100)).toString(10);
    });
    addFormatToken(null, ['SS', 2, false], null, function (date, opts) {
        return (~~(getMilliseconds(date, opts.isUTC) / 10)).toString(10);
    });
    addFormatToken(null, ['SSS', 3, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC)).toString(10);
    });
    addFormatToken(null, ['SSSS', 4, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC) * 10).toString(10);
    });
    addFormatToken(null, ['SSSSS', 5, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC) * 100).toString(10);
    });
    addFormatToken(null, ['SSSSSS', 6, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC) * 1000).toString(10);
    });
    addFormatToken(null, ['SSSSSSS', 7, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC) * 10000).toString(10);
    });
    addFormatToken(null, ['SSSSSSSS', 8, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC) * 100000).toString(10);
    });
    addFormatToken(null, ['SSSSSSSSS', 9, false], null, function (date, opts) {
        return (getMilliseconds(date, opts.isUTC) * 1000000).toString(10);
    });
    // ALIASES
    addUnitAlias('millisecond', 'ms');
    // PRIORITY
    addUnitPriority('millisecond', 16);
    // PARSING
    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);
    let token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }
    function parseMs(input, array, config) {
        array[MILLISECOND] = toInt(parseFloat(`0.${input}`) * 1000);
        return config;
    }
    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS
}

function initHour() {
    // FORMATTING
    function hFormat(date, isUTC) {
        return getHours(date, isUTC) % 12 || 12;
    }
    function kFormat(date, isUTC) {
        return getHours(date, isUTC) || 24;
    }
    addFormatToken('H', ['HH', 2, false], null, function (date, opts) {
        return getHours(date, opts.isUTC)
            .toString(10);
    });
    addFormatToken('h', ['hh', 2, false], null, function (date, opts) {
        return hFormat(date, opts.isUTC)
            .toString(10);
    });
    addFormatToken('k', ['kk', 2, false], null, function (date, opts) {
        return kFormat(date, opts.isUTC)
            .toString(10);
    });
    addFormatToken('hmm', null, null, function (date, opts) {
        const _h = hFormat(date, opts.isUTC);
        const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
        return `${_h}${_mm}`;
    });
    addFormatToken('hmmss', null, null, function (date, opts) {
        const _h = hFormat(date, opts.isUTC);
        const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
        const _ss = zeroFill(getSeconds(date, opts.isUTC), 2);
        return `${_h}${_mm}${_ss}`;
    });
    addFormatToken('Hmm', null, null, function (date, opts) {
        const _H = getHours(date, opts.isUTC);
        const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
        return `${_H}${_mm}`;
    });
    addFormatToken('Hmmss', null, null, function (date, opts) {
        const _H = getHours(date, opts.isUTC);
        const _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
        const _ss = zeroFill(getSeconds(date, opts.isUTC), 2);
        return `${_H}${_mm}${_ss}`;
    });
    function meridiem(token, lowercase) {
        addFormatToken(token, null, null, function (date, opts) {
            return opts.locale.meridiem(getHours(date, opts.isUTC), getMinutes(date, opts.isUTC), lowercase);
        });
    }
    meridiem('a', true);
    meridiem('A', false);
    // ALIASES
    addUnitAlias('hour', 'h');
    // PRIORITY
    addUnitPriority('hour', 13);
    // PARSING
    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }
    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);
    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);
    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        const kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
        return config;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
        return config;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
        return config;
    });
    addParseToken('hmm', function (input, array, config) {
        const pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
        return config;
    });
    addParseToken('hmmss', function (input, array, config) {
        const pos1 = input.length - 4;
        const pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
        return config;
    });
    addParseToken('Hmm', function (input, array, config) {
        const pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        return config;
    });
    addParseToken('Hmmss', function (input, array, config) {
        const pos1 = input.length - 4;
        const pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        return config;
    });
}

// internal storage for locale config files
const locales = {};
const localeFamilies = {};
let globalLocale;
function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least,
// but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    let next;
    let locale;
    let i = 0;
    while (i < names.length) {
        const split = normalizeLocale(names[i]).split('-');
        let j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                // the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}
function mergeConfigs(parentConfig, childConfig) {
    const res = Object.assign({}, parentConfig);
    for (const childProp in childConfig) {
        if (!hasOwnProp(childConfig, childProp)) {
            continue;
        }
        if (isObject(parentConfig[childProp]) && isObject(childConfig[childProp])) {
            res[childProp] = {};
            Object.assign(res[childProp], parentConfig[childProp]);
            Object.assign(res[childProp], childConfig[childProp]);
        }
        else if (childConfig[childProp] != null) {
            res[childProp] = childConfig[childProp];
        }
        else {
            delete res[childProp];
        }
    }
    for (const parentProp in parentConfig) {
        if (hasOwnProp(parentConfig, parentProp) &&
            !hasOwnProp(childConfig, parentProp) &&
            isObject(parentConfig[parentProp])) {
            // make sure changes to properties don't modify parent config
            res[parentProp] = Object.assign({}, res[parentProp]);
        }
    }
    return res;
}
function loadLocale(name) {
    // no way!
    /* var oldLocale = null;
     // TODO: Find a better way to register and load all the locales in Node
     if (!locales[name] && (typeof module !== 'undefined') &&
       module && module.exports) {
       try {
         oldLocale = globalLocale._abbr;
         var aliasedRequire = require;
         aliasedRequire('./locale/' + name);
         getSetGlobalLocale(oldLocale);
       } catch (e) {}
     }*/
    if (!locales[name]) {
        console.error(`Khronos locale error: please load locale "${name}" before using it`);
        // throw new Error(`Khronos locale error: please load locale "${name}" before using it`);
    }
    return locales[name];
}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale(key, values) {
    let data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else if (isString(key)) {
            data = defineLocale(key, values);
        }
        if (data) {
            globalLocale = data;
        }
    }
    return globalLocale && globalLocale._abbr;
}
function defineLocale(name, config) {
    if (config === null) {
        // useful for testing
        delete locales[name];
        globalLocale = getLocale('en');
        return null;
    }
    if (!config) {
        return;
    }
    let parentConfig = baseConfig;
    config.abbr = name;
    if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
        }
        else {
            if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
            }
            localeFamilies[config.parentLocale].push({ name, config });
            return null;
        }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
            defineLocale(x.name, x.config);
        });
    }
    // backwards compat for now: also set the locale
    // make sure we set the locale AFTER all child locales have been
    // created, so we won't end up with the child locale set.
    getSetGlobalLocale(name);
    return locales[name];
}
function updateLocale(name, config) {
    let _config = config;
    if (_config != null) {
        let parentConfig = baseConfig;
        // MERGE
        const tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        _config = mergeConfigs(parentConfig, _config);
        const locale = new Locale(_config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    }
    else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            }
            else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}
// returns locale data
function getLocale(key) {
    setDefaultLocale();
    if (!key) {
        return globalLocale;
    }
    // let locale;
    const _key = isArray(key) ? key : [key];
    return chooseLocale(_key);
}
function listLocales() {
    return Object.keys(locales);
}
function setDefaultLocale() {
    if (locales[`en`]) {
        return undefined;
    }
    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal(num) {
            const b = num % 10;
            const output = toInt((num % 100) / 10) === 1
                ? 'th'
                : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return num + output;
        }
    });
    initWeek();
    initWeekYear();
    initYear();
    initTimezone();
    initTimestamp();
    initSecond();
    initQuarter();
    initOffset();
    initMonth();
    initMinute();
    initMillisecond();
    initHour();
    initDayOfYear();
    initDayOfWeek();
    initDayOfMonth();
}

const ordering = ['year', 'quarter', 'month', 'week', 'day', 'hours', 'minutes', 'seconds', 'milliseconds'];
const ??0 = (mem, order) => {
    mem[order] = true;
    return mem;
};
const orderingHash = ordering.reduce(??0, {});
function isDurationValid(duration) {
    const durationKeys = Object.keys(duration);
    if (durationKeys
        .some((key) => {
        return (key in orderingHash)
            && duration[key] === null
            || isNaN(duration[key]);
    })) {
        return false;
    }
    // for (let key in duration) {
    //   if (!(indexOf.call(ordering, key) !== -1 && (duration[key] == null || !isNaN(duration[key])))) {
    //     return false;
    //   }
    // }
    let unitHasDecimal = false;
    for (let i = 0; i < ordering.length; ++i) {
        if (duration[ordering[i]]) {
            // only allow non-integers for smallest unit
            if (unitHasDecimal) {
                return false;
            }
            if (duration[ordering[i]] !== toInt(duration[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }
    return true;
}
// export function isValid() {
//   return this._isValid;
// }
//
// export function createInvalid(): Duration {
//   return createDuration(NaN);
// }

function absCeil(number) {
    return number < 0 ? Math.floor(number) : Math.ceil(number);
}

function bubble(dur) {
    let milliseconds = dur._milliseconds;
    let days = dur._days;
    let months = dur._months;
    const data = dur._data;
    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
        (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }
    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;
    const seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    const minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    const hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24);
    // convert days to months
    const monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));
    // 12 months -> 1 year
    const years = absFloor(months / 12);
    months %= 12;
    data.day = days;
    data.month = months;
    data.year = years;
    return dur;
}
function daysToMonths(day) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return day * 4800 / 146097;
}
function monthsToDays(month) {
    // the reverse of daysToMonths
    return month * 146097 / 4800;
}

let round = Math.round;
const thresholds = {
    ss: 44,
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    M: 11 // months to year
};
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(str, num, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(num || 1, !!withoutSuffix, str, isFuture);
}
function relativeTime(posNegDuration, withoutSuffix, locale) {
    const duration = createDuration(posNegDuration).abs();
    const seconds = round(duration.as('s'));
    const minutes = round(duration.as('m'));
    const hours = round(duration.as('h'));
    const days = round(duration.as('d'));
    const months = round(duration.as('M'));
    const years = round(duration.as('y'));
    const a = seconds <= thresholds.ss && ['s', seconds] ||
        seconds < thresholds.s && ['ss', seconds] ||
        minutes <= 1 && ['m'] ||
        minutes < thresholds.m && ['mm', minutes] ||
        hours <= 1 && ['h'] ||
        hours < thresholds.h && ['hh', hours] ||
        days <= 1 && ['d'] ||
        days < thresholds.d && ['dd', days] ||
        months <= 1 && ['M'] ||
        months < thresholds.M && ['MM', months] ||
        years <= 1 && ['y'] || ['yy', years];
    const b = [a[0], a[1], withoutSuffix, +posNegDuration > 0, locale];
    // a[2] = withoutSuffix;
    // a[3] = +posNegDuration > 0;
    // a[4] = locale;
    return substituteTimeAgo.apply(null, b);
}
// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof (roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}
// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}
// export function humanize(withSuffix) {
//   if (!this.isValid()) {
//     return this.localeData().invalidDate();
//   }
//
//   const locale = this.localeData();
//   let output = relativeTime(this, !withSuffix, locale);
//
//   if (withSuffix) {
//     output = locale.pastFuture(+this, output);
//   }
//
//   return locale.postformat(output);
// }

class Duration {
    constructor(duration, config = {}) {
        this._data = {};
        this._locale = getLocale();
        this._locale = config && config._locale || getLocale();
        // const normalizedInput = normalizeObjectUnits(duration);
        const normalizedInput = duration;
        const years = normalizedInput.year || 0;
        const quarters = normalizedInput.quarter || 0;
        const months = normalizedInput.month || 0;
        const weeks = normalizedInput.week || 0;
        const days = normalizedInput.day || 0;
        const hours = normalizedInput.hours || 0;
        const minutes = normalizedInput.minutes || 0;
        const seconds = normalizedInput.seconds || 0;
        const milliseconds = normalizedInput.milliseconds || 0;
        this._isValid = isDurationValid(normalizedInput);
        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1000 +
            minutes * 60 * 1000 + // 1000 * 60
            hours * 1000 * 60 * 60; // using 1000 * 60 * 60
        // instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;
        // this._data = {};
        // this._locale = getLocale();
        // this._bubble();
        return bubble(this);
    }
    isValid() {
        return this._isValid;
    }
    humanize(withSuffix) {
        // throw new Error(`TODO: implement`);
        if (!this.isValid()) {
            return this.localeData().invalidDate;
        }
        const locale = this.localeData();
        let output = relativeTime(this, !withSuffix, locale);
        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }
        return locale.postformat(output);
    }
    localeData() {
        return this._locale;
    }
    locale(localeKey) {
        if (!localeKey) {
            return this._locale._abbr;
        }
        this._locale = getLocale(localeKey) || this._locale;
        return this;
    }
    abs() {
        const mathAbs = Math.abs;
        const data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.month = mathAbs(data.month);
        data.year = mathAbs(data.year);
        return this;
    }
    as(_units) {
        if (!this.isValid()) {
            return NaN;
        }
        let days;
        let months;
        const milliseconds = this._milliseconds;
        const units = normalizeUnits(_units);
        if (units === 'month' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        }
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week':
                return days / 7 + milliseconds / 6048e5;
            case 'day':
                return days + milliseconds / 864e5;
            case 'hours':
                return days * 24 + milliseconds / 36e5;
            case 'minutes':
                return days * 1440 + milliseconds / 6e4;
            case 'seconds':
                return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'milliseconds':
                return Math.floor(days * 864e5) + milliseconds;
            default:
                throw new Error(`Unknown unit ${units}`);
        }
    }
    valueOf() {
        if (!this.isValid()) {
            return NaN;
        }
        return (this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6);
    }
}
function isDuration(obj) {
    return obj instanceof Duration;
}

function isValid(config) {
    if (config._isValid == null) {
        const flags = getParsingFlags(config);
        const parsedParts = Array.prototype.some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        let isNowValid = !isNaN(config._d && config._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));
        if (config._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }
        if (Object.isFrozen == null || !Object.isFrozen(config)) {
            config._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return config._isValid;
}
function createInvalid(config, flags) {
    config._d = new Date(NaN);
    Object.assign(getParsingFlags(config), flags || { userInvalidated: true });
    return config;
}
function markInvalid(config) {
    config._isValid = false;
    return config;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
const extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
const isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/, true],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/, true],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/, true],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/, true],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/, true],
    ['YYYYMMDD', /\d{8}/, true],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/, true],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/, true]
];
// iso time formats and regexes
const isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];
const aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
const obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};
// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
// date from iso format
function configFromISO(config) {
    if (!isString(config._i)) {
        return config;
    }
    const input = config._i;
    const match = extendedIsoRegex.exec(input) || basicIsoRegex.exec(input);
    let allowTime;
    let dateFormat;
    let timeFormat;
    let tzFormat;
    if (!match) {
        config._isValid = false;
        return config;
    }
    // getParsingFlags(config).iso = true;
    let i;
    let l;
    for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = isoDates[i][2] !== false;
            break;
        }
    }
    if (dateFormat == null) {
        config._isValid = false;
        return config;
    }
    if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
            if (isoTimes[i][1].exec(match[3])) {
                // match[2] should be 'T' or space
                timeFormat = (match[2] || ' ') + isoTimes[i][0];
                break;
            }
        }
        if (timeFormat == null) {
            config._isValid = false;
            return config;
        }
    }
    if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return config;
    }
    if (match[4]) {
        if (tzRegex.exec(match[4])) {
            tzFormat = 'Z';
        }
        else {
            config._isValid = false;
            return config;
        }
    }
    config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
    return configFromStringAndFormat(config);
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    const result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];
    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }
    return result;
}
function untruncateYear(yearStr) {
    const year = parseInt(yearStr, 10);
    return year <= 49 ? year + 2000 : year;
}
function preprocessRFC2822(str) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return str
        .replace(/\([^)]*\)|[\n\t]/g, ' ')
        .replace(/(\s\s+)/g, ' ').trim();
}
function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        const weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr);
        const weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    }
    else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    }
    else {
        const hm = parseInt(numOffset, 10);
        const m = hm % 100;
        const h = (hm - m) / 100;
        return h * 60 + m;
    }
}
// date and time from ref 2822 format
function configFromRFC2822(config) {
    if (!isString(config._i)) {
        return config;
    }
    const match = rfc2822.exec(preprocessRFC2822(config._i));
    if (!match) {
        return markInvalid(config);
    }
    const parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
    if (!checkWeekday(match[1], parsedArray, config)) {
        return config;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
    return config;
}
// date from iso format or fallback
function configFromString(config) {
    if (!isString(config._i)) {
        return config;
    }
    const matched = aspNetJsonRegex.exec(config._i);
    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return config;
    }
    // todo: update logic processing
    // isISO -> configFromISO
    // isRFC -> configFromRFC
    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    }
    else {
        return config;
    }
    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    }
    else {
        return config;
    }
    // Final attempt, use Input Fallback
    // hooks.createFromInputFallback(config);
    return createInvalid(config);
}
// hooks.createFromInputFallback = deprecate(
//     'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
//     'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
//     'discouraged and will be removed in an upcoming major release. Please refer to ' +
//     'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
//     function (config) {
//         config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
//     }
// );

// moment.js
function formatDate(date, format, locale, isUTC, offset = 0) {
    const _locale = getLocale(locale || 'en');
    if (!_locale) {
        throw new Error(`Locale "${locale}" is not defined, please add it with "defineLocale(...)"`);
    }
    const _format = format || (isUTC ? 'YYYY-MM-DDTHH:mm:ss[Z]' : 'YYYY-MM-DDTHH:mm:ssZ');
    const output = formatMoment(date, _format, _locale, isUTC, offset);
    if (!output) {
        return output;
    }
    return _locale.postformat(output);
}
// format date using native date object
function formatMoment(date, _format, locale, isUTC, offset = 0) {
    if (!isDateValid(date)) {
        return locale.invalidDate;
    }
    const format = expandFormat(_format, locale);
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](date, locale, isUTC, offset);
}
function expandFormat(_format, locale) {
    let format = _format;
    let i = 5;
    const localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
    const replaceLongDateFormatTokens = (input) => {
        return locale.formatLongDate(input) || input;
    };
    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }
    return format;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    const nowValue = new Date();
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray(config) {
    const input = [];
    let i;
    let date;
    let yearToUse;
    if (config._d) {
        return config;
    }
    const currentDate = currentDateArray(config);
    // compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }
    // if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }
        date = new Date(Date.UTC(yearToUse, 0, config._dayOfYear));
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }
    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }
    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }
    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
        config._a[MINUTE] === 0 &&
        config._a[SECOND] === 0 &&
        config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }
    // eslint-disable-next-line prefer-spread
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    const expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }
    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
    return config;
}
function dayOfYearFromWeekInfo(config) {
    let weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    const w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(new Date(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    }
    else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        const curWeek = weekOfYear(new Date(), dow, doy);
        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
        // Default to current week.
        week = defaults(w.w, curWeek.week);
        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        }
        else if (w.e != null) {
            // local weekday -- counting starts from beginning of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        }
        else {
            // default to beginning of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    }
    else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    }
    else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
    return config;
}

function checkOverflow(config) {
    let overflow;
    const a = config._a;
    if (a && getParsingFlags(config).overflow === -2) {
        // todo: fix this sh*t
        overflow =
            a[MONTH] < 0 || a[MONTH] > 11 ? MONTH :
                a[DATE] < 1 || a[DATE] > daysInMonth$1(a[YEAR], a[MONTH]) ? DATE :
                    a[HOUR] < 0 || a[HOUR] > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                        a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE :
                            a[SECOND] < 0 || a[SECOND] > 59 ? SECOND :
                                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                                    -1;
        if (getParsingFlags(config)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(config)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(config)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }
        getParsingFlags(config).overflow = overflow;
    }
    return config;
}

// constant that refers to the ISO standard
// hooks.ISO_8601 = function () {};
const ISO_8601 = 'ISO_8601';
// constant that refers to the RFC 2822 form
// hooks.RFC_2822 = function () {};
const RFC_2822 = 'RFC_2822';
// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === ISO_8601) {
        return configFromISO(config);
    }
    if (config._f === RFC_2822) {
        return configFromRFC2822(config);
    }
    config._a = [];
    getParsingFlags(config).empty = true;
    if (isArray(config._f) || (!config._i && config._i !== 0)) {
        return config;
    }
    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    let input = config._i.toString();
    let totalParsedInputLength = 0;
    const inputLength = input.length;
    const tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
    let i;
    let token;
    let parsedInput;
    let skipped;
    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (input.match(getParseRegexForToken(token, config._locale)) || [])[0];
        if (parsedInput) {
            skipped = input.substr(0, input.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            input = input.slice(input.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }
    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = inputLength - totalParsedInputLength;
    if (input.length > 0) {
        getParsingFlags(config).unusedInput.push(input);
    }
    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = void 0;
    }
    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
    configFromArray(config);
    return checkOverflow(config);
}
function meridiemFixWrap(locale, _hour, meridiem) {
    let hour = _hour;
    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    }
    if (locale.isPM == null) {
        // this is not supposed to happen
        return hour;
    }
    // Fallback
    const isPm = locale.isPM(meridiem);
    if (isPm && hour < 12) {
        hour += 12;
    }
    if (!isPm && hour === 12) {
        hour = 0;
    }
    return hour;
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    let tempConfig;
    let bestMoment;
    let scoreToBeat;
    let currentScore;
    if (!config._f || config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        return createInvalid(config);
    }
    let i;
    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = Object.assign({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);
        if (!isValid(tempConfig)) {
            continue;
        }
        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;
        // or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
        getParsingFlags(tempConfig).score = currentScore;
        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }
    return Object.assign(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return config;
    }
    const input = config._i;
    if (isObject(input)) {
        const i = normalizeObjectUnits(input);
        config._a = [i.year, i.month, i.day, i.hours, i.minutes, i.seconds, i.milliseconds]
            // todo: obsolete -> remove it
            .map(obj => isString(obj) ? parseInt(obj, 10) : obj);
    }
    return configFromArray(config);
}

function createFromConfig(config) {
    const res = checkOverflow(prepareConfig(config));
    // todo: remove, in moment.js it's never called cuz of moment constructor
    res._d = new Date(res._d != null ? res._d.getTime() : NaN);
    if (!isValid(Object.assign({}, res, { _isValid: null }))) {
        res._d = new Date(NaN);
    }
    // todo: update offset
    /*if (res._nextDay) {
      // Adding is smart enough around DST
      res._d = add(res._d, 1, 'day');
      res._nextDay = undefined;
    }*/
    return res;
}
function prepareConfig(config) {
    let input = config._i;
    const format = config._f;
    config._locale = config._locale || getLocale(config._l);
    if (input === null || (format === undefined && input === '')) {
        return createInvalid(config, { nullInput: true });
    }
    if (isString(input)) {
        config._i = input = config._locale.preparse(input, format);
    }
    if (isDate(input)) {
        config._d = cloneDate(input);
        return config;
    }
    // todo: add check for recursion
    if (isArray(format)) {
        configFromStringAndArray(config);
    }
    else if (format) {
        configFromStringAndFormat(config);
    }
    else {
        configFromInput(config);
    }
    if (!isValid(config)) {
        config._d = null;
    }
    return config;
}
function configFromInput(config) {
    const input = config._i;
    if (isUndefined(input)) {
        config._d = new Date();
    }
    else if (isDate(input)) {
        config._d = cloneDate(input);
    }
    else if (isString(input)) {
        configFromString(config);
    }
    else if (isArray(input) && input.length) {
        const _arr = input.slice(0);
        config._a = _arr.map(obj => isString(obj) ? parseInt(obj, 10) : obj);
        configFromArray(config);
    }
    else if (isObject(input)) {
        configFromObject(config);
    }
    else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    }
    else {
        //   hooks.createFromInputFallback(config);
        return createInvalid(config);
    }
    return config;
}
function createLocalOrUTC(input, format, localeKey, strict, isUTC) {
    const config = {};
    let _input = input;
    // params switch -> skip; testing it well
    // if (localeKey === true || localeKey === false) {
    //     strict = localeKey;
    //     localeKey = undefined;
    // }
    // todo: fail fast and return not valid date
    if ((isObject(_input) && isObjectEmpty(_input)) || (isArray(_input) && _input.length === 0)) {
        _input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    // config._isAMomentObject = true;
    config._useUTC = config._isUTC = isUTC;
    config._l = localeKey;
    config._i = _input;
    config._f = format;
    config._strict = strict;
    return createFromConfig(config);
}

function parseDate(input, format, localeKey, strict, isUTC) {
    if (isDate(input)) {
        return input;
    }
    const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
    return config._d;
}
function utcAsLocal(date) {
    if (!(date instanceof Date)) {
        return null;
    }
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

function absRound(num) {
    return num < 0 ? Math.round(num * -1) * -1 : Math.round(num);
}

function isAfter(date1, date2, units = 'milliseconds') {
    if (!date1 || !date2) {
        return false;
    }
    if (units === 'milliseconds') {
        return date1.valueOf() > date2.valueOf();
    }
    return date2.valueOf() < startOf(date1, units).valueOf();
}
function isBefore(date1, date2, units = 'milliseconds') {
    if (!date1 || !date2) {
        return false;
    }
    if (units === 'milliseconds') {
        return date1.valueOf() < date2.valueOf();
    }
    return endOf(date1, units).valueOf() < date2.valueOf();
}
function isDisabledDay(date, daysDisabled) {
    if (typeof daysDisabled === 'undefined' || !daysDisabled || !daysDisabled.length) {
        return false;
    }
    return daysDisabled.some((day) => day === date.getDay());
}
function isBetween(date, from, to, units, inclusivity = '()') {
    const leftBound = inclusivity[0] === '('
        ? isAfter(date, from, units)
        : !isBefore(date, from, units);
    const rightBound = inclusivity[1] === ')'
        ? isBefore(date, to, units)
        : !isAfter(date, to, units);
    return leftBound && rightBound;
}
function isSame(date1, date2, units = 'milliseconds') {
    if (!date1 || !date2) {
        return false;
    }
    if (units === 'milliseconds') {
        return date1.valueOf() === date2.valueOf();
    }
    const inputMs = date2.valueOf();
    return (startOf(date1, units).valueOf() <= inputMs &&
        inputMs <= endOf(date1, units).valueOf());
}
function isSameDay$1(date1, date2) {
    return (date1.getDay() == date2.getDay());
}
function isSameOrAfter(date1, date2, units) {
    return isSame(date1, date2, units) || isAfter(date1, date2, units);
}
function isSameOrBefore(date1, date2, units) {
    return isSame(date1, date2, units) || isBefore(date1, date2, units);
}

// ASP.NET json date format regex
const aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key, config = {}) {
    const duration = convertDuration(input, key);
    // matching against regexp is expensive, do it on demand
    return new Duration(duration, config);
}
function convertDuration(input, key) {
    // checks for null or undefined
    if (input == null) {
        return {};
    }
    if (isDuration(input)) {
        return {
            milliseconds: input._milliseconds,
            day: input._days,
            month: input._months
        };
    }
    if (isNumber(input)) {
        // duration = {};
        return key ? { [key]: input } : { milliseconds: input };
    }
    if (isString(input)) {
        let match = aspNetRegex.exec(input);
        if (match) {
            const sign = (match[1] === '-') ? -1 : 1;
            return {
                year: 0,
                day: toInt(match[DATE]) * sign,
                hours: toInt(match[HOUR]) * sign,
                minutes: toInt(match[MINUTE]) * sign,
                seconds: toInt(match[SECOND]) * sign,
                // the millisecond decimal point is included in the match
                milliseconds: toInt(absRound(toInt(match[MILLISECOND]) * 1000)) * sign
            };
        }
        match = isoRegex.exec(input);
        if (match) {
            const sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
            return {
                year: parseIso(match[2], sign),
                month: parseIso(match[3], sign),
                week: parseIso(match[4], sign),
                day: parseIso(match[5], sign),
                hours: parseIso(match[6], sign),
                minutes: parseIso(match[7], sign),
                seconds: parseIso(match[8], sign)
            };
        }
    }
    if (isObject(input) && ('from' in input || 'to' in input)) {
        const diffRes = momentsDifference(parseDate(input.from), parseDate(input.to));
        return {
            milliseconds: diffRes.milliseconds,
            month: diffRes.months
        };
    }
    return input;
}
// createDuration.fn = Duration.prototype;
// createDuration.invalid = invalid;
function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    const res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}
function positiveMomentsDifference(base, other) {
    const res = { milliseconds: 0, months: 0 };
    res.months = getMonth(other) - getMonth(base) +
        (getFullYear(other) - getFullYear(base)) * 12;
    const _basePlus = add(cloneDate(base), res.months, 'month');
    if (isAfter(_basePlus, other)) {
        --res.months;
    }
    res.milliseconds = +other - +(add(cloneDate(base), res.months, 'month'));
    return res;
}
function momentsDifference(base, other) {
    if (!(isDateValid(base) && isDateValid(other))) {
        return { milliseconds: 0, months: 0 };
    }
    let res;
    const _other = cloneWithOffset(other, base, { _offset: base.getTimezoneOffset() });
    if (isBefore(base, _other)) {
        res = positiveMomentsDifference(base, _other);
    }
    else {
        res = positiveMomentsDifference(_other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }
    return res;
}

function add(date, val, period, isUTC) {
    const dur = createDuration(val, period);
    return addSubtract(date, dur, 1, isUTC);
}
function subtract(date, val, period, isUTC) {
    const dur = createDuration(val, period);
    return addSubtract(date, dur, -1, isUTC);
}
function addSubtract(date, duration, isAdding, isUTC) {
    const milliseconds = duration._milliseconds;
    const days = absRound(duration._days);
    const months = absRound(duration._months);
    // todo: add timezones support
    // const _updateOffset = updateOffset == null ? true : updateOffset;
    if (months) {
        setMonth(date, getMonth(date, isUTC) + months * isAdding, isUTC);
    }
    if (days) {
        setDate(date, getDate(date, isUTC) + days * isAdding, isUTC);
    }
    if (milliseconds) {
        setTime(date, getTime(date) + milliseconds * isAdding);
    }
    return cloneDate(date);
    // todo: add timezones support
    // if (_updateOffset) {
    //   hooks.updateOffset(date, days || months);
    // }
}

function initDayOfWeek() {
    // FORMATTING
    addFormatToken('d', null, 'do', function (date, opts) {
        return getDay(date, opts.isUTC)
            .toString(10);
    });
    addFormatToken('dd', null, null, function (date, opts) {
        return opts.locale.weekdaysMin(date, opts.format, opts.isUTC);
    });
    addFormatToken('ddd', null, null, function (date, opts) {
        return opts.locale.weekdaysShort(date, opts.format, opts.isUTC);
    });
    addFormatToken('dddd', null, null, function (date, opts) {
        return opts.locale.weekdays(date, opts.format, opts.isUTC);
    });
    addFormatToken('e', null, null, function (date, opts) {
        return getLocaleDayOfWeek(date, opts.locale, opts.isUTC)
            .toString(10);
        // return getDay(date, opts.isUTC).toString(10);
    });
    addFormatToken('E', null, null, function (date, opts) {
        return getISODayOfWeek(date, opts.isUTC)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');
    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);
    // PARSING
    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });
    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        const weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        }
        else {
            getParsingFlags(config).invalidWeekday = !!input;
        }
        return config;
    });
    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
        return config;
    });
}
// HELPERS
function parseWeekday(input, locale) {
    if (!isString(input)) {
        return input;
    }
    const _num = parseInt(input, 10);
    if (!isNaN(_num)) {
        return _num;
    }
    const _weekDay = locale.weekdaysParse(input);
    if (isNumber(_weekDay)) {
        return _weekDay;
    }
    return null;
}
function parseIsoWeekday(input, locale = getLocale()) {
    if (isString(input)) {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNumber(input) && isNaN(input) ? null : input;
}
// MOMENTS
function getSetDayOfWeek(date, input, opts) {
    if (!input) {
        return getDayOfWeek(date, opts.isUTC);
    }
    return setDayOfWeek(date, input, opts.locale, opts.isUTC);
}
function setDayOfWeek(date, input, locale = getLocale(), isUTC) {
    const day = getDay(date, isUTC);
    const _input = parseWeekday(input, locale);
    return add(date, _input - day, 'day');
}
function getDayOfWeek(date, isUTC) {
    return getDay(date, isUTC);
}
/********************************************/
// todo: utc
// getSetLocaleDayOfWeek
function getLocaleDayOfWeek(date, locale = getLocale(), isUTC) {
    return (getDay(date, isUTC) + 7 - locale.firstDayOfWeek()) % 7;
}
function setLocaleDayOfWeek(date, input, opts = {}) {
    const weekday = getLocaleDayOfWeek(date, opts.locale, opts.isUTC);
    return add(date, input - weekday, 'day');
}
// getSetISODayOfWeek
function getISODayOfWeek(date, isUTC) {
    return getDay(date, isUTC) || 7;
}
function setISODayOfWeek(date, input, opts = {}) {
    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.
    const weekday = parseIsoWeekday(input, opts.locale);
    return setDayOfWeek(date, getDayOfWeek(date) % 7 ? weekday : weekday - 7);
}

//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi
const symbolMap = {
    1: '??',
    2: '??',
    3: '??',
    4: '??',
    5: '??',
    6: '??',
    7: '??',
    8: '??',
    9: '??',
    0: '??'
};
const numberMap = {
    '??': '1',
    '??': '2',
    '??': '3',
    '??': '4',
    '??': '5',
    '??': '6',
    '??': '7',
    '??': '8',
    '??': '9',
    '??': '0'
};
const pluralForm = function (num) {
    return num === 0 ? 0 : num === 1 ? 1 : num === 2 ? 2 : num % 100 >= 3 && num % 100 <= 10 ? 3 : num % 100 >= 11 ? 4 : 5;
};
const ??0$1 = pluralForm;
const plurals = {
    s: ['?????? ???? ??????????', '?????????? ??????????', ['??????????????', '??????????????'], '%d ????????', '%d ??????????', '%d ??????????'],
    m: ['?????? ???? ??????????', '?????????? ??????????', ['??????????????', '??????????????'], '%d ??????????', '%d ??????????', '%d ??????????'],
    h: ['?????? ???? ????????', '???????? ??????????', ['????????????', '????????????'], '%d ??????????', '%d ????????', '%d ????????'],
    d: ['?????? ???? ??????', '?????? ????????', ['??????????', '??????????'], '%d ????????', '%d ??????????', '%d ??????'],
    M: ['?????? ???? ??????', '?????? ????????', ['??????????', '??????????'], '%d ????????', '%d ????????', '%d ??????'],
    y: ['?????? ???? ??????', '?????? ????????', ['??????????', '??????????'], '%d ??????????', '%d ??????????', '%d ??????']
};
const pluralize = function (u) {
    return function (num, withoutSuffix) {
        const f = pluralForm(num);
        let str = plurals[u][pluralForm(num)];
        if (f === 2) {
            str = str[withoutSuffix ? 0 : 1];
        }
        return str.replace(/%d/i, num.toString());
    };
};
const ??1 = pluralize;
const months = [
    '??????????',
    '????????????',
    '????????',
    '??????????',
    '????????',
    '??????????',
    '??????????',
    '??????????',
    '????????????',
    '????????????',
    '????????????',
    '????????????'
];
const arLocale = {
    abbr: 'ar',
    months,
    monthsShort: months,
    weekdays: '??????????_??????????????_????????????????_????????????????_????????????_????????????_??????????'.split('_'),
    weekdaysShort: '??????_??????????_????????????_????????????_????????_????????_??????'.split('_'),
    weekdaysMin: '??_??_??_??_??_??_??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'D/\u200FM/\u200FYYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /??|??/,
    isPM(input) {
        return '??' === input;
    },
    meridiem(hour, minute, isLower) {
        if (hour < 12) {
            return '??';
        }
        else {
            return '??';
        }
    },
    calendar: {
        sameDay: '[?????????? ?????? ????????????] LT',
        nextDay: '[???????? ?????? ????????????] LT',
        nextWeek: 'dddd [?????? ????????????] LT',
        lastDay: '[?????? ?????? ????????????] LT',
        lastWeek: 'dddd [?????? ????????????] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '?????? %s',
        past: '?????? %s',
        s: pluralize('s'),
        ss: pluralize('s'),
        m: pluralize('m'),
        mm: pluralize('m'),
        h: pluralize('h'),
        hh: pluralize('h'),
        d: pluralize('d'),
        dd: pluralize('d'),
        M: pluralize('M'),
        MM: pluralize('M'),
        y: pluralize('y'),
        yy: pluralize('y')
    },
    preparse(str) {
        return str.replace(/[????????????????????]/g, function (match) {
            return numberMap[match];
        }).replace(/??/g, ',');
    },
    postformat(str) {
        return str.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '??');
    },
    week: {
        dow: 6,
        doy: 12 // The week that contains Jan 1st is the first week of the year.
    }
};

const ??0$2 = function (d) {
    switch (d) {
        case 0:
        case 3:
        case 6:
            return '[?? ????????????????????] dddd [??] LT';
        case 1:
        case 2:
        case 4:
        case 5:
            return '[?? ??????????????????] dddd [??] LT';
    }
};
//! moment.js locale configuration
//! locale : Bulgarian [bg]
//! author : Iskren Ivov Chernev : https://github.com/ichernev
//! author : Kunal Marwaha : https://github.com/marwahaha
//! author : Matt Grande : https://github.com/mattgrande
//! author : Isaac Cambron : https://github.com/icambron
//! author : Venelin Manchev : https://github.com/vmanchev
const bgLocale = {
    abbr: 'bg',
    months: '????????????_????????????????_????????_??????????_??????_??????_??????_????????????_??????????????????_????????????????_??????????????_????????????????'.split('_'),
    monthsShort: '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdays: '????????????_????????????????????_??????????????_??????????_??????????????????_??????????_????????????'.split('_'),
    weekdaysShort: '??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdaysMin: '????_????_????_????_????_????_????'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'D.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[???????? ??] LT',
        nextDay: '[???????? ??] LT',
        nextWeek: 'dddd [??] LT',
        lastDay: '[?????????? ??] LT',
        lastWeek: ??0$2,
        sameElse: 'L'
    },
    relativeTime: {
        future: '???????? %s',
        past: '?????????? %s',
        s: '?????????????? ??????????????',
        ss: '%d ??????????????',
        m: '????????????',
        mm: '%d ????????????',
        h: '??????',
        hh: '%d ????????',
        d: '??????',
        dd: '%d ??????',
        M: '??????????',
        MM: '%d ????????????',
        y: '????????????',
        yy: '%d ????????????'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(????|????|????|????|????|????)/,
    ordinal: function (_num) {
        const number = Number(_num);
        let lastDigit = number % 10, last2Digits = number % 100;
        if (number === 0) {
            return number + '-????';
        }
        else if (last2Digits === 0) {
            return number + '-????';
        }
        else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-????';
        }
        else if (lastDigit === 1) {
            return number + '-????';
        }
        else if (lastDigit === 2) {
            return number + '-????';
        }
        else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-????';
        }
        else {
            return number + '-????';
        }
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Xavier Arbat : https://github.com/XavisaurusRex
let monthsShortDot = 'gen._feb._mar._abr._mai._jun._jul._ago._set._oct._nov._des.'.split('_'), monthsShort = 'ene_feb_mar_abr_mai_jun_jul_ago_set_oct_nov_des'.split('_');
let monthsParse = [/^gen/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^oct/i, /^nov/i, /^des/i];
let monthsRegex = /^(gener|febrer|mar??|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre|gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i;
const caLocale = {
    abbr: 'ca',
    months: 'gener_febrer_mar??_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortDot;
        }
        if (/-MMM-/.test(format)) {
            return monthsShort[getMonth(date, isUTC)];
        }
        return monthsShortDot[getMonth(date, isUTC)];
    },
    monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(gener|febrer|mar??|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i,
    monthsShortStrictRegex: /^(gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i,
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
    weekdaysShort: 'diu._dil._dim._dix._dij._div._dis.'.split('_'),
    weekdaysMin: 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY H:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar: {
        sameDay(date) {
            return '[avui a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
        },
        nextDay(date) {
            return '[dema a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
        },
        nextWeek(date) {
            return 'dddd [a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
        },
        lastDay(date) {
            return '[ahir a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
        },
        lastWeek(date) {
            return '[el] dddd [' + ('passada la ' + (getHours(date) !== 1) ? 'passades les' : '') + '] LT';
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'fa %s',
        s: 'uns segons',
        ss: '%d segons',
        m: 'un minut',
        mm: '%d minuts',
        h: 'una hora',
        hh: '%d hores',
        d: 'un dia',
        dd: '%d dies',
        M: 'un mes',
        MM: '%d mesos',
        y: 'un any',
        yy: '%d anys'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|on|er|rt|??)/,
    ordinal(_num) {
        const num = Number(_num);
        const output = (num > 4) ? '??' :
            (num === 1 || num === 3) ? 'r' :
                (num === 2) ? 'n' :
                    (num === 4) ? 't' : '??';
        return num + output;
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Czech [cs]
//! author : petrbela : https://github.com/petrbela
const months$1 = 'leden_??nor_b??ezen_duben_kv??ten_??erven_??ervenec_srpen_z??????_????jen_listopad_prosinec'.split('_');
const monthsShort$1 = 'led_??no_b??e_dub_kv??_??vn_??vc_srp_z????_????j_lis_pro'.split('_');
function plural(num) {
    return (num > 1) && (num < 5) && (~~(num / 10) !== 1);
}
function translate(num, withoutSuffix, key, isFuture) {
    const result = num + ' ';
    switch (key) {
        case 's': // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'p??r sekund' : 'p??r sekundami';
        case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
            if (withoutSuffix || isFuture) {
                return result + (plural(num) ? 'sekundy' : 'sekund');
            }
            else {
                return result + 'sekundami';
            }
        // break;
        case 'm': // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(num) ? 'minuty' : 'minut');
            }
            else {
                return result + 'minutami';
            }
        // break;
        case 'h': // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(num) ? 'hodiny' : 'hodin');
            }
            else {
                return result + 'hodinami';
            }
        // break;
        case 'd': // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(num) ? 'dny' : 'dn??');
            }
            else {
                return result + 'dny';
            }
        // break;
        case 'M': // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'm??s??c' : 'm??s??cem';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(num) ? 'm??s??ce' : 'm??s??c??');
            }
            else {
                return result + 'm??s??ci';
            }
        // break;
        case 'y': // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(num) ? 'roky' : 'let');
            }
            else {
                return result + 'lety';
            }
        // break;
    }
}
const ??0$3 = function (months, monthsShort) {
    let i, _monthsParse = [];
    for (i = 0; i < 12; i++) {
        // use custom parser to solve problem with July (??ervenec)
        _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
    }
    return _monthsParse;
}, ??1$1 = function (monthsShort) {
    let i, _shortMonthsParse = [];
    for (i = 0; i < 12; i++) {
        _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
    }
    return _shortMonthsParse;
}, ??2 = function (months) {
    let i, _longMonthsParse = [];
    for (i = 0; i < 12; i++) {
        _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
    }
    return _longMonthsParse;
};
const csLocale = {
    abbr: 'cs',
    months: months$1,
    monthsShort: monthsShort$1,
    monthsParse: (??0$3(months$1, monthsShort$1)),
    shortMonthsParse: (??1$1(monthsShort$1)),
    longMonthsParse: (??2(months$1)),
    weekdays: 'ned??le_pond??l??_??ter??_st??eda_??tvrtek_p??tek_sobota'.split('_'),
    weekdaysShort: 'ne_po_??t_st_??t_p??_so'.split('_'),
    weekdaysMin: 'ne_po_??t_st_??t_p??_so'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd D. MMMM YYYY H:mm',
        l: 'D. M. YYYY'
    },
    calendar: {
        sameDay: '[dnes v] LT',
        nextDay: '[z??tra v] LT',
        nextWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[v ned??li v] LT';
                case 1:
                case 2:
                    return '[v] dddd [v] LT';
                case 3:
                    return '[ve st??edu v] LT';
                case 4:
                    return '[ve ??tvrtek v] LT';
                case 5:
                    return '[v p??tek v] LT';
                case 6:
                    return '[v sobotu v] LT';
            }
        },
        lastDay: '[v??era v] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[minulou ned??li v] LT';
                case 1:
                case 2:
                    return '[minul??] dddd [v] LT';
                case 3:
                    return '[minulou st??edu v] LT';
                case 4:
                case 5:
                    return '[minul??] dddd [v] LT';
                case 6:
                    return '[minulou sobotu v] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: 'p??ed %s',
        s: translate,
        ss: translate,
        m: translate,
        mm: translate,
        h: translate,
        hh: translate,
        d: translate,
        dd: translate,
        M: translate,
        MM: translate,
        y: translate,
        yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Danish (Denmark) [da]
//! author : Per Hansen : https://github.com/perhp
const daLocale = {
    abbr: 'da',
    months: 'Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'S??ndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_L??rdag'.split('_'),
    weekdaysShort: 'S??n_Man_Tir_Ons_Tor_Fre_L??r'.split('_'),
    weekdaysMin: 'S??_Ma_Ti_On_To_Fr_L??'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'p?? dddd [kl.] LT',
        lastDay: '[i g??r kl.] LT',
        lastWeek: '[i] dddd[s kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'f?? sekunder',
        m: 'et minut',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dage',
        M: 'en m??ned',
        MM: '%d m??neder',
        y: 'et ??r',
        yy: '%d ??r'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elens??le: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj
function processRelativeTime(num, withoutSuffix, key, isFuture) {
    const format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [num + ' Tage', num + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [num + ' Monate', num + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [num + ' Jahre', num + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}
const deLocale = {
    abbr: 'de',
    months: 'Januar_Februar_M??rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Feb._M??rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime: {
        future: 'in %s',
        past: 'vor %s',
        s: 'ein paar Sekunden',
        ss: '%d Sekunden',
        m: processRelativeTime,
        mm: '%d Minuten',
        h: processRelativeTime,
        hh: '%d Stunden',
        d: processRelativeTime,
        dd: processRelativeTime,
        M: processRelativeTime,
        MM: processRelativeTime,
        y: processRelativeTime,
        yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim
const enGbLocale = {
    abbr: 'en-gb',
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal(_num) {
        const num = Number(_num);
        const b = num % 10, output = (~~(num % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                    (b === 3) ? 'rd' : 'th';
        return num + output;
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]
let monthsShortDot$1 = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'), monthsShort$2 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
let monthsParse$1 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
let monthsRegex$1 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
const esDoLocale = {
    abbr: 'es-do',
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortDot$1;
        }
        else if (/-MMM-/.test(format)) {
            return monthsShort$2[getMonth(date, isUTC)];
        }
        else {
            return monthsShortDot$1[getMonth(date, isUTC)];
        }
    },
    monthsRegex: monthsRegex$1,
    monthsShortRegex: monthsRegex$1,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: monthsParse$1,
    longMonthsParse: monthsParse$1,
    shortMonthsParse: monthsParse$1,
    weekdays: 'domingo_lunes_martes_mi??rcoles_jueves_viernes_s??bado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mi??._jue._vie._s??b.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_s??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'h:mm A',
        LTS: 'h:mm:ss A',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY h:mm A',
        LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
    },
    calendar: {
        sameDay(date) {
            return '[hoy a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextDay(date) {
            return '[ma??ana a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextWeek(date) {
            return 'dddd [a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastDay(date) {
            return '[ayer a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastWeek(date) {
            return '[el] dddd [pasado a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'hace %s',
        s: 'unos segundos',
        ss: '%d segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un d??a',
        dd: '%d d??as',
        M: 'un mes',
        MM: '%d meses',
        y: 'un a??o',
        yy: '%d a??os'
    },
    dayOfMonthOrdinalParse: /\d{1,2}??/,
    ordinal: '%d??',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napur?? : https://github.com/julionc
let monthsShortDot$2 = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'), monthsShort$3 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
let monthsParse$2 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
let monthsRegex$2 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
const esLocale = {
    abbr: 'es',
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortDot$2;
        }
        if (/-MMM-/.test(format)) {
            return monthsShort$3[getMonth(date, isUTC)];
        }
        return monthsShortDot$2[getMonth(date, isUTC)];
    },
    monthsRegex: monthsRegex$2,
    monthsShortRegex: monthsRegex$2,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: monthsParse$2,
    longMonthsParse: monthsParse$2,
    shortMonthsParse: monthsParse$2,
    weekdays: 'domingo_lunes_martes_mi??rcoles_jueves_viernes_s??bado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mi??._jue._vie._s??b.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_s??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY H:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar: {
        sameDay(date) {
            return '[hoy a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextDay(date) {
            return '[ma??ana a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextWeek(date) {
            return 'dddd [a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastDay(date) {
            return '[ayer a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastWeek(date) {
            return '[el] dddd [pasado a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'hace %s',
        s: 'unos segundos',
        ss: '%d segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un d??a',
        dd: '%d d??as',
        M: 'un mes',
        MM: '%d meses',
        y: 'un a??o',
        yy: '%d a??os'
    },
    dayOfMonthOrdinalParse: /\d{1,2}??/,
    ordinal: '%d??',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Spanish (United States) [es-us]
//! author : bustta : https://github.com/bustta
let monthsShortDot$3 = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
let monthsShort$4 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
const esUsLocale = {
    abbr: 'es-us',
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortDot$3;
        }
        else if (/-MMM-/.test(format)) {
            return monthsShort$4[getMonth(date, isUTC)];
        }
        else {
            return monthsShortDot$3[getMonth(date, isUTC)];
        }
    },
    monthsParseExact: true,
    weekdays: 'domingo_lunes_martes_mi??rcoles_jueves_viernes_s??bado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mi??._jue._vie._s??b.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_s??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'h:mm A',
        LTS: 'h:mm:ss A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM [de] D [de] YYYY',
        LLL: 'MMMM [de] D [de] YYYY h:mm A',
        LLLL: 'dddd, MMMM [de] D [de] YYYY h:mm A'
    },
    calendar: {
        sameDay(date) {
            return '[hoy a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextDay(date) {
            return '[ma??ana a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextWeek(date) {
            return 'dddd [a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastDay(date) {
            return '[ayer a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastWeek(date) {
            return '[el] dddd [pasado a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'hace %s',
        s: 'unos segundos',
        ss: '%d segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un d??a',
        dd: '%d d??as',
        M: 'un mes',
        MM: '%d meses',
        y: 'un a??o',
        yy: '%d a??os'
    },
    dayOfMonthOrdinalParse: /\d{1,2}??/,
    ordinal: '%d??',
    week: {
        dow: 0,
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Chris Gedrim : https://github.com/a90machado
const processRelativeTime$1 = function (num, withoutSuffix, key, isFuture) {
    const format = {
        s: ['m??ne sekundi', 'm??ni sekund', 'paar sekundit'],
        ss: [num + 'sekundi', num + 'sekundit'],
        m: ['??he minuti', '??ks minut'],
        mm: [num + ' minuti', num + ' minutit'],
        h: ['??he tunni', 'tund aega', '??ks tund'],
        hh: [num + ' tunni', num + ' tundi'],
        d: ['??he p??eva', '??ks p??ev'],
        M: ['kuu aja', 'kuu aega', '??ks kuu'],
        MM: [num + ' kuu', num + ' kuud'],
        y: ['??he aasta', 'aasta', '??ks aasta'],
        yy: [num + ' aasta', num + ' aastat']
    };
    if (withoutSuffix) {
        return format[key][2] ? format[key][2] : format[key][1];
    }
    return isFuture ? format[key][0] : format[key][1];
};
const ??0$4 = processRelativeTime$1;
const etLocale = {
    abbr: 'et',
    months: 'jaanuar_veebruar_m??rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
    monthsShort: 'jaan_veebr_m??rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
    weekdays: 'p??hap??ev_esmasp??ev_teisip??ev_kolmap??ev_neljap??ev_reede_laup??ev'.split('_'),
    weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
    weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[T??na,] LT',
        nextDay: '[Homme,] LT',
        nextWeek: '[J??rgmine] dddd LT',
        lastDay: '[Eile,] LT',
        lastWeek: '[Eelmine] dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s p??rast',
        past: '%s tagasi',
        s: processRelativeTime$1,
        ss: processRelativeTime$1,
        m: processRelativeTime$1,
        mm: processRelativeTime$1,
        h: processRelativeTime$1,
        hh: processRelativeTime$1,
        d: processRelativeTime$1,
        dd: '%d p??eva',
        M: processRelativeTime$1,
        MM: processRelativeTime$1,
        y: processRelativeTime$1,
        yy: processRelativeTime$1
    },
    dayOfMonthOrdinalParse: /\d{1,2}./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
// https://github.com/moment/moment/blob/develop/locale/fi.js
var numbersPast = 'nolla yksi kaksi kolme nelj?? viisi kuusi seitsem??n kahdeksan yhdeks??n'.split(' '), numbersFuture = [
    'nolla', 'yhden', 'kahden', 'kolmen', 'nelj??n', 'viiden', 'kuuden',
    numbersPast[7], numbersPast[8], numbersPast[9]
];
function translate$1(num, withoutSuffix, key, isFuture) {
    var result = '';
    switch (key) {
        case 's':
            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
        case 'ss':
            return isFuture ? 'sekunnin' : 'sekuntia';
        case 'm':
            return isFuture ? 'minuutin' : 'minuutti';
        case 'mm':
            result = isFuture ? 'minuutin' : 'minuuttia';
            break;
        case 'h':
            return isFuture ? 'tunnin' : 'tunti';
        case 'hh':
            result = isFuture ? 'tunnin' : 'tuntia';
            break;
        case 'd':
            return isFuture ? 'p??iv??n' : 'p??iv??';
        case 'dd':
            result = isFuture ? 'p??iv??n' : 'p??iv????';
            break;
        case 'M':
            return isFuture ? 'kuukauden' : 'kuukausi';
        case 'MM':
            result = isFuture ? 'kuukauden' : 'kuukautta';
            break;
        case 'y':
            return isFuture ? 'vuoden' : 'vuosi';
        case 'yy':
            result = isFuture ? 'vuoden' : 'vuotta';
            break;
    }
    result = verbalNumber(num, isFuture) + ' ' + result;
    return result;
}
function verbalNumber(num, isFuture) {
    return num < 10 ? (isFuture ? numbersFuture[num] : numbersPast[num]) : num;
}
const fiLocale = {
    abbr: 'fi',
    months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes??kuu_hein??kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
    monthsShort: 'tammi_helmi_maalis_huhti_touko_kes??_hein??_elo_syys_loka_marras_joulu'.split('_'),
    weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
    weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
    weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD.MM.YYYY',
        LL: 'Do MMMM[ta] YYYY',
        LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
        LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
        l: 'D.M.YYYY',
        ll: 'Do MMM YYYY',
        lll: 'Do MMM YYYY, [klo] HH.mm',
        llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
    },
    calendar: {
        sameDay: '[t??n????n] [klo] LT',
        nextDay: '[huomenna] [klo] LT',
        nextWeek: 'dddd [klo] LT',
        lastDay: '[eilen] [klo] LT',
        lastWeek: '[viime] dddd[na] [klo] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s p????st??',
        past: '%s sitten',
        s: translate$1,
        ss: translate$1,
        m: translate$1,
        mm: translate$1,
        h: translate$1,
        hh: translate$1,
        d: translate$1,
        dd: translate$1,
        M: translate$1,
        MM: translate$1,
        y: translate$1,
        yy: translate$1
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice
const frLocale = {
    abbr: 'fr',
    months: 'janvier_f??vrier_mars_avril_mai_juin_juillet_ao??t_septembre_octobre_novembre_d??cembre'.split('_'),
    monthsShort: 'janv._f??vr._mars_avr._mai_juin_juil._ao??t_sept._oct._nov._d??c.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Aujourd???hui ??] LT',
        nextDay: '[Demain ??] LT',
        nextWeek: 'dddd [??] LT',
        lastDay: '[Hier ??] LT',
        lastWeek: 'dddd [dernier ??] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        ss: '%d secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            // TODO: Return 'e' when day of month > 1. Move this case inside
            // block for masculine words below.
            // See https://github.com/moment/moment/issues/3375
            case 'D':
                return num + (num === 1 ? 'er' : '');
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return num + (num === 1 ? 'er' : 'e');
            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return num + (num === 1 ? 're' : 'e');
        }
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Dar??o Beir?? : https://github.com/quinobravo
let monthsShortDot$4 = 'xan._feb._mar._abr._mai._xu??._xul._ago._set._out._nov._dec.'.split('_'), monthsShort$5 = 'xan_feb_mar_abr_mai_xu??_xul_ago_set_out_nov_dec'.split('_');
let monthsParse$3 = [/^xan/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^xu??/i, /^xul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dec/i];
let monthsRegex$3 = /^(xaneiro|febreiro|marzo|abril|maio|xu??o|xullo|agosto|setembro|outubro|novembro|decembro|xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xu??\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i;
const glLocale = {
    abbr: 'gl',
    months: 'xaneiro_febreiro_marzo_abril_maio_xu??o_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortDot$4;
        }
        if (/-MMM-/.test(format)) {
            return monthsShort$5[getMonth(date, isUTC)];
        }
        return monthsShortDot$4[getMonth(date, isUTC)];
    },
    monthsRegex: monthsRegex$3,
    monthsShortRegex: monthsRegex$3,
    monthsStrictRegex: /^(xaneiro|febreiro|marzo|abril|maio|xu??o|xullo|agosto|setembro|outubro|novembro|decembro)/i,
    monthsShortStrictRegex: /^(xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xu??\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i,
    monthsParse: monthsParse$3,
    longMonthsParse: monthsParse$3,
    shortMonthsParse: monthsParse$3,
    weekdays: 'domingo_luns_martes_m??rcores_xoves_venres_s??bado'.split('_'),
    weekdaysShort: 'dom._lun._mar._m??r._xov._ven._s??b.'.split('_'),
    weekdaysMin: 'do_lu_ma_m??_xo_ve_s??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY H:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar: {
        sameDay(date) {
            return '[hoxe ??' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextDay(date) {
            return '[ma??an ??' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextWeek(date) {
            return 'dddd [??' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastDay(date) {
            return '[onte ??' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastWeek(date) {
            return '[o] dddd [pasado ??' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'fai %s',
        s: 'uns segundos',
        ss: '%d segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'unha hora',
        hh: '%d horas',
        d: 'un d??a',
        dd: '%d d??as',
        M: 'un mes',
        MM: '%d meses',
        y: 'un ano',
        yy: '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}??/,
    ordinal: '%d??',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter
const heLocale = {
    abbr: 'he',
    months: '??????????_????????????_??????_??????????_??????_????????_????????_????????????_????????????_??????????????_????????????_??????????'.split('_'),
    monthsShort: '????????_????????_??????_????????_??????_????????_????????_????????_????????_????????_????????_????????'.split('_'),
    weekdays: '??????????_??????_??????????_??????????_??????????_????????_??????'.split('_'),
    weekdaysShort: '????_????_????_????_????_????_????'.split('_'),
    weekdaysMin: '??_??_??_??_??_??_??'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [??]MMMM YYYY',
        LLL: 'D [??]MMMM YYYY HH:mm',
        LLLL: 'dddd, D [??]MMMM YYYY HH:mm',
        l: 'D/M/YYYY',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd, D MMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[???????? ????]LT',
        nextDay: '[?????? ????]LT',
        nextWeek: 'dddd [????????] LT',
        lastDay: '[?????????? ????]LT',
        lastWeek: '[????????] dddd [???????????? ????????] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '???????? %s',
        past: '???????? %s',
        s: '???????? ??????????',
        ss: '%d ??????????',
        m: '??????',
        mm: '%d ????????',
        h: '??????',
        hh(num) {
            if (num === 2) {
                return '????????????';
            }
            return num + ' ????????';
        },
        d: '??????',
        dd(num) {
            if (num === 2) {
                return '????????????';
            }
            return num + ' ????????';
        },
        M: '????????',
        MM(num) {
            if (num === 2) {
                return '??????????????';
            }
            return num + ' ????????????';
        },
        y: '??????',
        yy(num) {
            if (num === 2) {
                return '????????????';
            }
            else if (num % 10 === 0 && num !== 10) {
                return num + ' ??????';
            }
            return num + ' ????????';
        }
    },
    meridiemParse: /??????"??|????????"??|???????? ??????????????|???????? ??????????????|?????????? ????????|??????????|????????/i,
    isPM(input) {
        return /^(??????"??|???????? ??????????????|????????)$/.test(input);
    },
    meridiem(hour, minute, isLower) {
        if (hour < 5) {
            return '?????????? ????????';
        }
        else if (hour < 10) {
            return '??????????';
        }
        else if (hour < 12) {
            return isLower ? '????????"??' : '???????? ??????????????';
        }
        else if (hour < 18) {
            return isLower ? '??????"??' : '???????? ??????????????';
        }
        else {
            return '????????';
        }
    }
};

//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal
let symbolMap$1 = {
    1: '???',
    2: '???',
    3: '???',
    4: '???',
    5: '???',
    6: '???',
    7: '???',
    8: '???',
    9: '???',
    0: '???'
}, numberMap$1 = {
    '???': '1',
    '???': '2',
    '???': '3',
    '???': '4',
    '???': '5',
    '???': '6',
    '???': '7',
    '???': '8',
    '???': '9',
    '???': '0'
};
const hiLocale = {
    abbr: 'hi',
    months: '???????????????_??????????????????_???????????????_??????????????????_??????_?????????_???????????????_???????????????_?????????????????????_?????????????????????_??????????????????_?????????????????????'.split('_'),
    monthsShort: '??????._?????????._???????????????_???????????????._??????_?????????_?????????._??????._?????????._???????????????._??????._?????????.'.split('_'),
    monthsParseExact: true,
    weekdays: '??????????????????_??????????????????_?????????????????????_??????????????????_?????????????????????_????????????????????????_??????????????????'.split('_'),
    weekdaysShort: '?????????_?????????_????????????_?????????_????????????_???????????????_?????????'.split('_'),
    weekdaysMin: '???_??????_??????_??????_??????_??????_???'.split('_'),
    longDateFormat: {
        LT: 'A h:mm ?????????',
        LTS: 'A h:mm:ss ?????????',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm ?????????',
        LLLL: 'dddd, D MMMM YYYY, A h:mm ?????????'
    },
    calendar: {
        sameDay: '[??????] LT',
        nextDay: '[??????] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[??????] LT',
        lastWeek: '[???????????????] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s ?????????',
        past: '%s ????????????',
        s: '????????? ?????? ????????????',
        ss: '%d ???????????????',
        m: '?????? ????????????',
        mm: '%d ????????????',
        h: '?????? ????????????',
        hh: '%d ????????????',
        d: '?????? ?????????',
        dd: '%d ?????????',
        M: '?????? ???????????????',
        MM: '%d ???????????????',
        y: '?????? ????????????',
        yy: '%d ????????????'
    },
    preparse(str) {
        return str.replace(/[??????????????????????????????]/g, function (match) {
            return numberMap$1[match];
        });
    },
    postformat(str) {
        return str.replace(/\d/g, function (match) {
            return symbolMap$1[match];
        });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /?????????|????????????|???????????????|?????????/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '?????????') {
            return hour < 4 ? hour : hour + 12;
        }
        else if (meridiem === '????????????') {
            return hour;
        }
        else if (meridiem === '???????????????') {
            return hour >= 10 ? hour : hour + 12;
        }
        else if (meridiem === '?????????') {
            return hour + 12;
        }
    },
    meridiem(hour, minute, isLower) {
        if (hour < 4) {
            return '?????????';
        }
        else if (hour < 10) {
            return '????????????';
        }
        else if (hour < 17) {
            return '???????????????';
        }
        else if (hour < 20) {
            return '?????????';
        }
        else {
            return '?????????';
        }
    },
    week: {
        dow: 0,
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner
let weekEndings = 'vas??rnap h??tf??n kedden szerd??n cs??t??rt??k??n p??nteken szombaton'.split(' ');
function translate$2(num, withoutSuffix, key, isFuture) {
    switch (key) {
        case 's':
            return (isFuture || withoutSuffix) ? 'n??h??ny m??sodperc' : 'n??h??ny m??sodperce';
        case 'ss':
            return num + ((isFuture || withoutSuffix) ? ' m??sodperc' : ' m??sodperce');
        case 'm':
            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'mm':
            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'h':
            return 'egy' + (isFuture || withoutSuffix ? ' ??ra' : ' ??r??ja');
        case 'hh':
            return num + (isFuture || withoutSuffix ? ' ??ra' : ' ??r??ja');
        case 'd':
            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'dd':
            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'M':
            return 'egy' + (isFuture || withoutSuffix ? ' h??nap' : ' h??napja');
        case 'MM':
            return num + (isFuture || withoutSuffix ? ' h??nap' : ' h??napja');
        case 'y':
            return 'egy' + (isFuture || withoutSuffix ? ' ??v' : ' ??ve');
        case 'yy':
            return num + (isFuture || withoutSuffix ? ' ??v' : ' ??ve');
    }
    return '';
}
function week(date, isFuture) {
    return (isFuture ? '' : '[m??lt] ') + '[' + weekEndings[getDayOfWeek(date)] + '] LT[-kor]';
}
const huLocale = {
    abbr: 'hu',
    months: 'janu??r_febru??r_m??rcius_??prilis_m??jus_j??nius_j??lius_augusztus_szeptember_okt??ber_november_december'.split('_'),
    monthsShort: 'jan_feb_m??rc_??pr_m??j_j??n_j??l_aug_szept_okt_nov_dec'.split('_'),
    weekdays: 'vas??rnap_h??tf??_kedd_szerda_cs??t??rt??k_p??ntek_szombat'.split('_'),
    weekdaysShort: 'vas_h??t_kedd_sze_cs??t_p??n_szo'.split('_'),
    weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'YYYY.MM.DD.',
        LL: 'YYYY. MMMM D.',
        LLL: 'YYYY. MMMM D. H:mm',
        LLLL: 'YYYY. MMMM D., dddd H:mm'
    },
    meridiemParse: /de|du/i,
    isPM(input) {
        return input.charAt(1).toLowerCase() === 'u';
    },
    meridiem(hours, minutes, isLower) {
        if (hours < 12) {
            return isLower === true ? 'de' : 'DE';
        }
        else {
            return isLower === true ? 'du' : 'DU';
        }
    },
    calendar: {
        sameDay: '[ma] LT[-kor]',
        nextDay: '[holnap] LT[-kor]',
        nextWeek(date) {
            return week(date, true);
        },
        lastDay: '[tegnap] LT[-kor]',
        lastWeek(date) {
            return week(date, false);
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s m??lva',
        past: '%s',
        s: translate$2,
        ss: translate$2,
        m: translate$2,
        mm: translate$2,
        h: translate$2,
        hh: translate$2,
        d: translate$2,
        dd: translate$2,
        M: translate$2,
        MM: translate$2,
        y: translate$2,
        yy: translate$2
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Danijel Grmec : https://github.com/cobaltsis
const hrLocale = {
    abbr: 'hr',
    months: 'Sije??anj_Velja??a_O??ujak_Travanj_Svibanj_Lipanj_Srpanj_Kolovoz_Rujan_Listopad_Studeni_Prosinac'.split('_'),
    monthsShort: 'Sij_Velj_O??u_Tra_Svi_Lip_Srp_Kol_Ruj_Lis_Stu_Pro'.split('_'),
    weekdays: 'Nedjelja_Ponedjeljak_Utorak_Srijeda_??etvrtak_Petak_Subota'.split('_'),
    weekdaysShort: 'Ned_Pon_Uto_Sri_??et_Pet_Sub'.split('_'),
    weekdaysMin: 'Ne_Po_Ut_Sr_??e_Pe_Su'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Danas u] LT',
        nextDay: '[Sutra u] LT',
        nextWeek: 'dddd [u] LT',
        lastDay: '[Ju??er u] LT',
        lastWeek: '[Zadnji] dddd [u] LT',
        sameElse: 'L'
    },
    invalidDate: 'Neispravan datum',
    relativeTime: {
        future: 'za %s',
        past: '%s prije',
        s: 'nekoliko sekundi',
        ss: '%d sekundi',
        m: 'minuta',
        mm: '%d minuta',
        h: 'sat',
        hh: '%d sati',
        d: 'dan',
        dd: '%d dana',
        M: 'mjesec',
        MM: '%d mjeseci',
        y: 'godina',
        yy: '%d godina'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal(_num) {
        const num = Number(_num);
        const b = num % 10, output = (~~(num % 100 / 10) === 1) ? '.' :
            (b === 1) ? '.' :
                (b === 2) ? '.' :
                    (b === 3) ? '.' : '.';
        return num + output;
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Indonesia [id]
//! author : Romy Kusuma : https://github.com/rkusuma
//! reference: https://github.com/moment/moment/blob/develop/locale/id.js
const idLocale = {
    abbr: 'id',
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        }
        else if (meridiem === 'siang') {
            return hour >= 11 ? hour : hour + 12;
        }
        else if (meridiem === 'sore' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem(hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        }
        else if (hours < 15) {
            return 'siang';
        }
        else if (hours < 19) {
            return 'sore';
        }
        else {
            return 'malam';
        }
    },
    calendar: {
        sameDay: '[Hari ini pukul] LT',
        nextDay: '[Besok pukul] LT',
        nextWeek: 'dddd [pukul] LT',
        lastDay: '[Kemarin pukul] LT',
        lastWeek: 'dddd [lalu pukul] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dalam %s',
        past: '%s yang lalu',
        s: 'beberapa detik',
        ss: '%d detik',
        m: 'semenit',
        mm: '%d menit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun'
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz
const itLocale = {
    abbr: 'it',
    months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
    weekdays: 'domenica_luned??_marted??_mercoled??_gioved??_venerd??_sabato'.split('_'),
    weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
    weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Oggi alle] LT',
        nextDay: '[Domani alle] LT',
        nextWeek: 'dddd [alle] LT',
        lastDay: '[Ieri alle] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[la scorsa] dddd [alle] LT';
                default:
                    return '[lo scorso] dddd [alle] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future(num) {
            return ((/^[0-9].+$/).test(num.toString(10)) ? 'tra' : 'in') + ' ' + num;
        },
        past: '%s fa',
        s: 'alcuni secondi',
        ss: '%d secondi',
        m: 'un minuto',
        mm: '%d minuti',
        h: 'un\'ora',
        hh: '%d ore',
        d: 'un giorno',
        dd: '%d giorni',
        M: 'un mese',
        MM: '%d mesi',
        y: 'un anno',
        yy: '%d anni'
    },
    dayOfMonthOrdinalParse: /\d{1,2}??/,
    ordinal: '%d??',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon
const jaLocale = {
    abbr: 'ja',
    months: '1???_2???_3???_4???_5???_6???_7???_8???_9???_10???_11???_12???'.split('_'),
    monthsShort: '1???_2???_3???_4???_5???_6???_7???_8???_9???_10???_11???_12???'.split('_'),
    weekdays: '?????????_?????????_?????????_?????????_?????????_?????????_?????????'.split('_'),
    weekdaysShort: '???_???_???_???_???_???_???'.split('_'),
    weekdaysMin: '???_???_???_???_???_???_???'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY???M???D???',
        LLL: 'YYYY???M???D??? HH:mm',
        LLLL: 'YYYY???M???D??? HH:mm dddd',
        l: 'YYYY/MM/DD',
        ll: 'YYYY???M???D???',
        lll: 'YYYY???M???D??? HH:mm',
        llll: 'YYYY???M???D??? HH:mm dddd'
    },
    meridiemParse: /??????|??????/i,
    isPM(input) {
        return input === '??????';
    },
    meridiem(hour, minute, isLower) {
        if (hour < 12) {
            return '??????';
        }
        else {
            return '??????';
        }
    },
    calendar: {
        sameDay: '[??????] LT',
        nextDay: '[??????] LT',
        nextWeek: '[??????]dddd LT',
        lastDay: '[??????] LT',
        lastWeek: '[??????]dddd LT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}???/,
    ordinal(num, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + '???';
            default:
                return num.toString(10);
        }
    },
    relativeTime: {
        future: '%s???',
        past: '%s???',
        s: '??????',
        ss: '%d???',
        m: '1???',
        mm: '%d???',
        h: '1??????',
        hh: '%d??????',
        d: '1???',
        dd: '%d???',
        M: '1??????',
        MM: '%d??????',
        y: '1???',
        yy: '%d???'
    }
};

//! moment.js locale configuration
//! locale : Georgian [ka]
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
//! author : Levan Tskipuri : https://github.com/tskipa
const kaLocale = {
    abbr: 'ka',
    months: {
        format: '?????????????????????_???????????????????????????_???????????????_?????????????????????_???????????????_??????????????????_??????????????????_?????????????????????_??????????????????????????????_???????????????????????????_????????????????????????_???????????????????????????'.split('_'),
        standalone: '?????????????????????_???????????????????????????_???????????????_??????????????????_???????????????_??????????????????_??????????????????_?????????????????????_??????????????????????????????_???????????????????????????_????????????????????????_???????????????????????????'.split('_')
    },
    monthsShort: '?????????_?????????_?????????_?????????_?????????_?????????_?????????_?????????_?????????_?????????_?????????_?????????'.split('_'),
    weekdays: {
        standalone: '???????????????_????????????????????????_???????????????????????????_???????????????????????????_???????????????????????????_???????????????????????????_??????????????????'.split('_'),
        format: '??????????????????_????????????????????????_???????????????????????????_???????????????????????????_???????????????????????????_???????????????????????????_??????????????????'.split('_'),
        isFormat: /(????????????|??????????????????)/
    },
    weekdaysShort: '?????????_?????????_?????????_?????????_?????????_?????????_?????????'.split('_'),
    weekdaysMin: '??????_??????_??????_??????_??????_??????_??????'.split('_'),
    longDateFormat: {
        LT: 'h:mm A',
        LTS: 'h:mm:ss A',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY h:mm A',
        LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
        sameDay: '[????????????] LT[-??????]',
        nextDay: '[????????????] LT[-??????]',
        lastDay: '[???????????????] LT[-??????]',
        nextWeek: '[??????????????????] dddd LT[-??????]',
        lastWeek: '[????????????] dddd LT-??????',
        sameElse: 'L'
    },
    relativeTime: {
        future(s) {
            var st = s.toString();
            return (/(????????????|????????????|???????????????|????????????)/).test(st) ?
                st.replace(/???$/, '??????') :
                st + '??????';
        },
        past(s) {
            var st = s.toString();
            if ((/(????????????|????????????|???????????????|?????????|?????????)/).test(st)) {
                return st.replace(/(???|???)$/, '?????? ?????????');
            }
            if ((/????????????/).test(st)) {
                return st.replace(/????????????$/, '???????????? ?????????');
            }
        },
        s: '??????????????????????????? ????????????',
        ss: '%d ????????????',
        m: '????????????',
        mm: '%d ????????????',
        h: '???????????????',
        hh: '%d ???????????????',
        d: '?????????',
        dd: '%d ?????????',
        M: '?????????',
        MM: '%d ?????????',
        y: '????????????',
        yy: '%d ????????????'
    },
    dayOfMonthOrdinalParse: /0|1-??????|??????-\d{1,2}|\d{1,2}-???/,
    ordinal(_num, _period) {
        const num = Number(_num);
        if (num === 0) {
            return num.toString();
        }
        if (num === 1) {
            return num + '-??????';
        }
        if ((num < 20) || (num <= 100 && (num % 20 === 0)) || (num % 100 === 0)) {
            return '??????-' + num;
        }
        return num + '-???';
    },
    week: {
        dow: 1,
        doy: 4
    }
};

// ! moment.js locale configuration
// ! locale : Kazakh [kk]
// ! authors : Nurlan Rakhimzhanov : https://github.com/nurlan
const suffixes = {
    0: '-????',
    1: '-????',
    2: '-????',
    3: '-????',
    4: '-????',
    5: '-????',
    6: '-????',
    7: '-????',
    8: '-????',
    9: '-????',
    10: '-????',
    20: '-????',
    30: '-????',
    40: '-????',
    50: '-????',
    60: '-????',
    70: '-????',
    80: '-????',
    90: '-????',
    100: '-????'
};
const kkLocale = {
    abbr: 'kk',
    months: '????????????_??????????_????????????_??????????_??????????_????????????_??????????_??????????_????????????????_??????????_????????????_??????????????????'.split('_'),
    monthsShort: '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdays: '????????????????_????????????????_????????????????_????????????????_????????????????_????????_??????????'.split('_'),
    weekdaysShort: '??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdaysMin: '????_????_????_????_????_????_????'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[?????????? ??????????] LT',
        nextDay: '[?????????? ??????????] LT',
        nextWeek: 'dddd [??????????] LT',
        lastDay: '[???????? ??????????] LT',
        lastWeek: '[?????????? ??????????????] dddd [??????????] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s ????????????',
        past: '%s ??????????',
        s: '?????????????? ????????????',
        ss: '%d ????????????',
        m: '?????? ??????????',
        mm: '%d ??????????',
        h: '?????? ??????????',
        hh: '%d ??????????',
        d: '?????? ??????',
        dd: '%d ??????',
        M: '?????? ????',
        MM: '%d ????',
        y: '?????? ??????',
        yy: '%d ??????'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(????|????)/,
    ordinal(_num) {
        const a = _num % 10;
        const b = _num >= 100 ? 100 : null;
        return _num + (suffixes[_num] || suffixes[a] || suffixes[b]);
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 7th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Korean [ko]
//! author : Kyungwook, Park : https://github.com/kyungw00k
//! author : Jeeeyul Lee <jeeeyul@gmail.com>
const koLocale = {
    abbr: 'ko',
    months: '1???_2???_3???_4???_5???_6???_7???_8???_9???_10???_11???_12???'.split('_'),
    monthsShort: '1???_2???_3???_4???_5???_6???_7???_8???_9???_10???_11???_12???'.split('_'),
    weekdays: '?????????_?????????_?????????_?????????_?????????_?????????_?????????'.split('_'),
    weekdaysShort: '???_???_???_???_???_???_???'.split('_'),
    weekdaysMin: '???_???_???_???_???_???_???'.split('_'),
    longDateFormat: {
        LT: 'A h:mm',
        LTS: 'A h:mm:ss',
        L: 'YYYY.MM.DD',
        LL: 'YYYY??? MMMM D???',
        LLL: 'YYYY??? MMMM D??? A h:mm',
        LLLL: 'YYYY??? MMMM D??? dddd A h:mm',
        l: 'YYYY.MM.DD',
        ll: 'YYYY??? MMMM D???',
        lll: 'YYYY??? MMMM D??? A h:mm',
        llll: 'YYYY??? MMMM D??? dddd A h:mm'
    },
    calendar: {
        sameDay: '?????? LT',
        nextDay: '?????? LT',
        nextWeek: 'dddd LT',
        lastDay: '?????? LT',
        lastWeek: '????????? dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s ???',
        past: '%s ???',
        s: '??? ???',
        ss: '%d???',
        m: '1???',
        mm: '%d???',
        h: '??? ??????',
        hh: '%d??????',
        d: '??????',
        dd: '%d???',
        M: '??? ???',
        MM: '%d???',
        y: '??? ???',
        yy: '%d???'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(???|???|???)/,
    ordinal: function (num, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + '???';
            case 'M':
                return num + '???';
            case 'w':
            case 'W':
                return num + '???';
            default:
                return num.toString(10);
        }
    },
    meridiemParse: /??????|??????/,
    isPM: function (token) {
        return token === '??????';
    },
    meridiem: function (hour, minute, isUpper) {
        return hour < 12 ? '??????' : '??????';
    }
};

//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Stanislavas Guk : https://github.com/ixoster
const units = {
    ss: 'sekund??_sekund??i??_sekundes',
    m: 'minut??_minut??s_minut??',
    mm: 'minut??s_minu??i??_minutes',
    h: 'valanda_valandos_valand??',
    hh: 'valandos_valand??_valandas',
    d: 'diena_dienos_dien??',
    dd: 'dienos_dien??_dienas',
    M: 'm??nuo_m??nesio_m??nes??',
    MM: 'm??nesiai_m??nesi??_m??nesius',
    y: 'metai_met??_metus',
    yy: 'metai_met??_metus'
};
function translateSeconds(num, withoutSuffix, key, isFuture) {
    if (withoutSuffix) {
        return 'kelios sekund??s';
    }
    else {
        return isFuture ? 'keli?? sekund??i??' : 'kelias sekundes';
    }
}
function translateSingular(num, withoutSuffix, key, isFuture) {
    return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
}
function special(num) {
    return num % 10 === 0 || (num > 10 && num < 20);
}
function forms(key) {
    return units[key].split('_');
}
function translate$3(num, withoutSuffix, key, isFuture) {
    let result = num + ' ';
    if (num === 1) {
        return result + translateSingular(num, withoutSuffix, key[0], isFuture);
    }
    else if (withoutSuffix) {
        return result + (special(num) ? forms(key)[1] : forms(key)[0]);
    }
    else {
        if (isFuture) {
            return result + forms(key)[1];
        }
        else {
            return result + (special(num) ? forms(key)[1] : forms(key)[2]);
        }
    }
}
const ltLocale = {
    abbr: 'lt',
    months: {
        format: 'sausio_vasario_kovo_baland??io_gegu????s_bir??elio_liepos_rugpj????io_rugs??jo_spalio_lapkri??io_gruod??io'.split('_'),
        standalone: 'sausis_vasaris_kovas_balandis_gegu????_bir??elis_liepa_rugpj??tis_rugs??jis_spalis_lapkritis_gruodis'.split('_'),
        isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
    weekdays: {
        format: 'sekmadien??_pirmadien??_antradien??_tre??iadien??_ketvirtadien??_penktadien??_??e??tadien??'.split('_'),
        standalone: 'sekmadienis_pirmadienis_antradienis_tre??iadienis_ketvirtadienis_penktadienis_??e??tadienis'.split('_'),
        isFormat: /dddd HH:mm/
    },
    weekdaysShort: 'Sek_Pir_Ant_Tre_Ket_Pen_??e??'.split('_'),
    weekdaysMin: 'S_P_A_T_K_Pn_??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY [m.] MMMM D [d.]',
        LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
        l: 'YYYY-MM-DD',
        ll: 'YYYY [m.] MMMM D [d.]',
        lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
    },
    calendar: {
        sameDay: '[??iandien] LT',
        nextDay: '[Rytoj] LT',
        nextWeek: 'dddd LT',
        lastDay: '[Vakar] LT',
        lastWeek: '[Pra??jus??] dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'po %s',
        past: 'prie?? %s',
        s: translateSeconds,
        ss: translate$3,
        m: translateSingular,
        mm: translate$3,
        h: translateSingular,
        hh: translate$3,
        d: translateSingular,
        dd: translate$3,
        M: translateSingular,
        MM: translate$3,
        y: translateSingular,
        yy: translate$3
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal(num) {
        return num + '-oji';
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Matiss Janis Aboltins : https://github.com/matissjanis
const lvLocale = {
    abbr: 'lv',
    months: 'Janv??ris_Febru??ris_Marts_Apr??lis_Maijs_J??nijs_J??lijs_Augusts_Septembris_Oktobris_Novembris_Decembris'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mai_J??n_J??l_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Sv??tdiena_Pirmdiena_Otrdiena_Tre??diena_Ceturtdiena_Piektdiena_Sestdiena'.split('_'),
    weekdaysShort: 'Sv??td_Pirmd_Otrd_Tre??d_Ceturtd_Piektd_Sestd'.split('_'),
    weekdaysMin: 'Sv_Pi_Ot_Tr_Ce_Pk_Se'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'p??c %s',
        past: 'pirms %s',
        s: 'da????m sekund??m',
        ss: '%d sekund??m',
        m: 'min??tes',
        mm: '%d min??t??m',
        h: 'stundas',
        hh: '%d stund??m',
        d: 'dienas',
        dd: '%d dien??m',
        M: 'm??ne??a',
        MM: '%d m??ne??iem',
        y: 'gada',
        yy: '%d gadiem'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal(num) {
        return num + '.';
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Mongolian [mn]
//! author : Javkhlantugs Nyamdorj : https://github.com/javkhaanj7
function translate$4(num, withoutSuffix, key, isFuture) {
    switch (key) {
        case 's':
            return withoutSuffix ? '???????????? ????????????' : '???????????? ????????????????';
        case 'ss':
            return num + (withoutSuffix ? ' ????????????' : ' ????????????????');
        case 'm':
        case 'mm':
            return num + (withoutSuffix ? ' ??????????' : ' ??????????????');
        case 'h':
        case 'hh':
            return num + (withoutSuffix ? ' ??????' : ' ????????????');
        case 'd':
        case 'dd':
            return num + (withoutSuffix ? ' ????????' : ' ????????????');
        case 'M':
        case 'MM':
            return num + (withoutSuffix ? ' ??????' : ' ??????????');
        case 'y':
        case 'yy':
            return num + (withoutSuffix ? ' ??????' : ' ????????????');
        default:
            return num.toString(10);
    }
}
const mnLocale = {
    abbr: 'mn',
    months: '?????????????????? ??????_???????????????????? ??????_?????????????????????? ??????_?????????????????????? ??????_?????????????????? ??????_?????????????????????? ??????_?????????????????? ??????_???????????????????? ??????_???????????????? ??????_???????????????????? ??????_?????????? ?????????????????? ??????_?????????? ???????????????????? ??????'.split('_'),
    monthsShort: '1 ??????_2 ??????_3 ??????_4 ??????_5 ??????_6 ??????_7 ??????_8 ??????_9 ??????_10 ??????_11 ??????_12 ??????'.split('_'),
    monthsParseExact: true,
    weekdays: '??????_??????????_????????????_????????????_??????????_????????????_??????????'.split('_'),
    weekdaysShort: '??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdaysMin: '????_????_????_????_????_????_????'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY ?????? MMMM???? D',
        LLL: 'YYYY ?????? MMMM???? D HH:mm',
        LLLL: 'dddd, YYYY ?????? MMMM???? D HH:mm'
    },
    meridiemParse: /????|????/i,
    isPM: function (input) {
        return input === '????';
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 12) {
            return '????';
        }
        else {
            return '????';
        }
    },
    calendar: {
        sameDay: '[??????????????] LT',
        nextDay: '[??????????????] LT',
        nextWeek: '[????????] dddd LT',
        lastDay: '[??????????????] LT',
        lastWeek: '[????????????????] dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s ??????????',
        past: '%s ????????',
        s: translate$4,
        ss: translate$4,
        m: translate$4,
        mm: translate$4,
        h: translate$4,
        hh: translate$4,
        d: translate$4,
        dd: translate$4,
        M: translate$4,
        MM: translate$4,
        y: translate$4,
        yy: translate$4
    },
    dayOfMonthOrdinalParse: /\d{1,2} ????????/,
    ordinal: function (num, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + ' ????????';
            default:
                return num.toString(10);
        }
    }
};

//! moment.js locale configuration
//! locale : Norwegian Bokm??l [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga
const nbLocale = {
    abbr: 'nb',
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact: true,
    weekdays: 's??ndag_mandag_tirsdag_onsdag_torsdag_fredag_l??rdag'.split('_'),
    weekdaysShort: 's??._ma._ti._on._to._fr._l??.'.split('_'),
    weekdaysMin: 's??_ma_ti_on_to_fr_l??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i g??r kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'noen sekunder',
        ss: '%d sekunder',
        m: 'ett minutt',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dager',
        M: 'en m??ned',
        MM: '%d m??neder',
        y: 'ett ??r',
        yy: '%d ??r'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris R??ling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj
let monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
let monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
let monthsParse$4 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
let monthsRegex$4 = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
const nlBeLocale = {
    abbr: 'nl-be',
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortWithDots;
        }
        else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[getMonth(date, isUTC)];
        }
        else {
            return monthsShortWithDots[getMonth(date, isUTC)];
        }
    },
    monthsRegex: monthsRegex$4,
    monthsShortRegex: monthsRegex$4,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse: monthsParse$4,
    longMonthsParse: monthsParse$4,
    shortMonthsParse: monthsParse$4,
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        ss: '%d seconden',
        m: '????n minuut',
        mm: '%d minuten',
        h: '????n uur',
        hh: '%d uur',
        d: '????n dag',
        dd: '%d dagen',
        M: '????n maand',
        MM: '%d maanden',
        y: '????n jaar',
        yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal(_num) {
        const num = Number(_num);
        return num + ((num === 1 || num === 8 || num >= 20) ? 'ste' : 'de');
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris R??ling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj
let monthsShortWithDots$1 = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'), monthsShortWithoutDots$1 = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
let monthsParse$5 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
let monthsRegex$5 = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
const nlLocale = {
    abbr: 'nl',
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortWithDots$1;
        }
        else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots$1[getMonth(date, isUTC)];
        }
        else {
            return monthsShortWithDots$1[getMonth(date, isUTC)];
        }
    },
    monthsRegex: monthsRegex$5,
    monthsShortRegex: monthsRegex$5,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse: monthsParse$5,
    longMonthsParse: monthsParse$5,
    shortMonthsParse: monthsParse$5,
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD-MM-YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        ss: '%d seconden',
        m: '????n minuut',
        mm: '%d minuten',
        h: '????n uur',
        hh: '%d uur',
        d: '????n dag',
        dd: '%d dagen',
        M: '????n maand',
        MM: '%d maanden',
        y: '????n jaar',
        yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal(_num) {
        const num = Number(_num);
        return num + ((num === 1 || num === 8 || num >= 20) ? 'ste' : 'de');
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL
let monthsNominative = 'stycze??_luty_marzec_kwiecie??_maj_czerwiec_lipiec_sierpie??_wrzesie??_pa??dziernik_listopad_grudzie??'.split('_');
let monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze??nia_pa??dziernika_listopada_grudnia'.split('_');
function plural$1(num) {
    return (num % 10 < 5) && (num % 10 > 1) && ((~~(num / 10) % 10) !== 1);
}
function translate$5(num, withoutSuffix, key) {
    let result = num + ' ';
    switch (key) {
        case 'ss':
            return result + (plural$1(num) ? 'sekundy' : 'sekund');
        case 'm':
            return withoutSuffix ? 'minuta' : 'minut??';
        case 'mm':
            return result + (plural$1(num) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix ? 'godzina' : 'godzin??';
        case 'hh':
            return result + (plural$1(num) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (plural$1(num) ? 'miesi??ce' : 'miesi??cy');
        case 'yy':
            return result + (plural$1(num) ? 'lata' : 'lat');
    }
}
const plLocale = {
    abbr: 'pl',
    months(date, format, isUTC) {
        if (!date) {
            return monthsNominative;
        }
        else if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[getMonth(date, isUTC)] + '|' + monthsNominative[getMonth(date, isUTC)] + ')';
        }
        else if (/D MMMM/.test(format)) {
            return monthsSubjective[getMonth(date, isUTC)];
        }
        else {
            return monthsNominative[getMonth(date, isUTC)];
        }
    },
    monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa??_lis_gru'.split('_'),
    weekdays: 'niedziela_poniedzia??ek_wtorek_??roda_czwartek_pi??tek_sobota'.split('_'),
    weekdaysShort: 'ndz_pon_wt_??r_czw_pt_sob'.split('_'),
    weekdaysMin: 'Nd_Pn_Wt_??r_Cz_Pt_So'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Dzi?? o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[W niedziel?? o] LT';
                case 2:
                    return '[We wtorek o] LT';
                case 3:
                    return '[W ??rod?? o] LT';
                case 5:
                    return '[W pi??tek o] LT';
                case 6:
                    return '[W sobot?? o] LT';
                default:
                    return '[W] dddd [o] LT';
            }
        },
        lastDay: '[Wczoraj o] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[W zesz???? niedziel?? o] LT';
                case 3:
                    return '[W zesz???? ??rod?? o] LT';
                case 4:
                    return '[W zesz???? czwartek o] LT';
                case 5:
                    return '[W zesz???? pi??tek o] LT';
                case 6:
                    return '[W zesz???? sobot?? o] LT';
                default:
                    return '[W zesz??y] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: '%s temu',
        s: 'kilka sekund',
        ss: translate$5,
        m: translate$5,
        mm: translate$5,
        h: translate$5,
        hh: translate$5,
        d: '1 dzie??',
        dd: '%d dni',
        M: 'miesi??c',
        MM: translate$5,
        y: 'rok',
        yy: translate$5
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
const ptBrLocale = {
    abbr: 'pt-br',
    months: 'Janeiro_Fevereiro_Mar??o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Ter??a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S??bado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_S??b'.split('_'),
    weekdaysMin: 'Do_2??_3??_4??_5??_6??_S??'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [??s] HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [??s] HH:mm'
    },
    calendar: {
        sameDay: '[Hoje ??s] LT',
        nextDay: '[Amanh?? ??s] LT',
        nextWeek: 'dddd [??s] LT',
        lastDay: '[Ontem ??s] LT',
        lastWeek(date) {
            return (getDayOfWeek(date) === 0 || getDayOfWeek(date) === 6) ?
                '[??ltimo] dddd [??s] LT' : // Saturday + Sunday
                '[??ltima] dddd [??s] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'em %s',
        past: '%s atr??s',
        s: 'poucos segundos',
        ss: '%d segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um m??s',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}??/,
    ordinal: '%d??'
};

// ! moment.js locale configuration
// ! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
// ! author : Earle white: https://github.com/5earle
function relativeTimeWithPlural(num, withoutSuffix, key) {
    let format = {
        ss: 'secunde',
        mm: 'minute',
        hh: 'ore',
        dd: 'zile',
        MM: 'luni',
        yy: 'ani'
    };
    let separator = ' ';
    if (num % 100 >= 20 || (num >= 100 && num % 100 === 0)) {
        separator = ' de ';
    }
    return num + separator + format[key];
}
const roLocale = {
    abbr: 'ro',
    months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'duminic??_luni_mar??i_miercuri_joi_vineri_s??mb??t??'.split('_'),
    weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_S??m'.split('_'),
    weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_S??'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[azi la] LT',
        nextDay: '[m??ine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'peste %s',
        past: '%s ??n urm??',
        s: 'c??teva secunde',
        ss: relativeTimeWithPlural,
        m: 'un minut',
        mm: relativeTimeWithPlural,
        h: 'o or??',
        hh: relativeTimeWithPlural,
        d: 'o zi',
        dd: relativeTimeWithPlural,
        M: 'o lun??',
        MM: relativeTimeWithPlural,
        y: 'un an',
        yy: relativeTimeWithPlural
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elens??le : https://github.com/Oire
//! author : ?????????????????? ???????? : https://github.com/socketpair
function plural$2(word, num) {
    let forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural$1(num, withoutSuffix, key) {
    let format = {
        ss: withoutSuffix ? '??????????????_??????????????_????????????' : '??????????????_??????????????_????????????',
        mm: withoutSuffix ? '????????????_????????????_??????????' : '????????????_????????????_??????????',
        hh: '??????_????????_??????????',
        dd: '????????_??????_????????',
        MM: '??????????_????????????_??????????????',
        yy: '??????_????????_??????'
    };
    if (key === 'm') {
        return withoutSuffix ? '????????????' : '????????????';
    }
    return num + ' ' + plural$2(format[key], +num);
}
let monthsParse$6 = [/^??????/i, /^??????/i, /^??????/i, /^??????/i, /^????[????]/i, /^??????/i, /^??????/i, /^??????/i, /^??????/i, /^??????/i, /^??????/i, /^??????/i];
// http://new.gramota.ru/spravka/rules/139-prop : ?? 103
// ???????????????????? ??????????????: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
const ruLocale = {
    abbr: 'ru',
    months: {
        format: '????????????_??????????????_??????????_????????????_??????_????????_????????_??????????????_????????????????_??????????????_????????????_??????????????'.split('_'),
        standalone: '????????????_??????????????_????????_????????????_??????_????????_????????_????????????_????????????????_??????????????_????????????_??????????????'.split('_')
    },
    monthsShort: {
        // ???? CLDR ???????????? "??????." ?? "??????.", ???? ?????????? ?????????? ???????????? ?????????? ???? ?????????? ?
        format: '??????._????????._??????._??????._??????_????????_????????_??????._????????._??????._????????._??????.'.split('_'),
        standalone: '??????._????????._????????_??????._??????_????????_????????_??????._????????._??????._????????._??????.'.split('_')
    },
    weekdays: {
        standalone: '??????????????????????_??????????????????????_??????????????_??????????_??????????????_??????????????_??????????????'.split('_'),
        format: '??????????????????????_??????????????????????_??????????????_??????????_??????????????_??????????????_??????????????'.split('_'),
        isFormat: /\[ ?[????] ?(?:??????????????|??????????????????|??????)? ?\] ?dddd/
    },
    weekdaysShort: '????_????_????_????_????_????_????'.split('_'),
    weekdaysMin: '????_????_????_????_????_????_????'.split('_'),
    monthsParse: monthsParse$6,
    longMonthsParse: monthsParse$6,
    shortMonthsParse: monthsParse$6,
    // ???????????? ???????????????? ?? ????????????????, ???? ?????? ??????????, ?????? ??????????????????, ???? 4 ??????????, ???????????????????? ?? ???????????? ?? ?????? ??????????
    monthsRegex: /^(??????????[????]|??????\.?|????????????[????]|?????????\.?|???????????|??????\.?|??????????[????]|??????\.?|????[????]|??????[????]|??????\.?|??????[????]|??????\.?|???????????????|??????\.?|??????????????[????]|?????????\.?|????????????[????]|??????\.?|??????????[????]|?????????\.?|????????????[????]|??????\.?)/i,
    // ?????????? ??????????????????????
    monthsShortRegex: /^(??????????[????]|??????\.?|????????????[????]|?????????\.?|???????????|??????\.?|??????????[????]|??????\.?|????[????]|??????[????]|??????\.?|??????[????]|??????\.?|???????????????|??????\.?|??????????????[????]|?????????\.?|????????????[????]|??????\.?|??????????[????]|?????????\.?|????????????[????]|??????\.?)/i,
    // ???????????? ???????????????? ?? ????????????????
    monthsStrictRegex: /^(??????????[????]|????????????[????]|???????????|??????????[????]|????[????]|??????[????]|??????[????]|???????????????|??????????????[????]|????????????[????]|??????????[????]|????????????[????])/i,
    // ??????????????????, ?????????????? ???????????????????????? ???????????? ?????????????????????? ????????????
    monthsShortStrictRegex: /^(??????\.|?????????\.|??????[??.]|??????\.|????[????]|??????[????.]|??????[????.]|??????\.|?????????\.|??????\.|?????????\.|??????\.)/i,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY ??.',
        LLL: 'D MMMM YYYY ??., H:mm',
        LLLL: 'dddd, D MMMM YYYY ??., H:mm'
    },
    calendar: {
        sameDay: '[?????????????? ??] LT',
        nextDay: '[???????????? ??] LT',
        lastDay: '[?????????? ??] LT',
        nextWeek(date, now) {
            if (getWeek(now) !== getWeek(date)) {
                switch (getDayOfWeek(date)) {
                    case 0:
                        return '[?? ??????????????????] dddd [??] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[?? ??????????????????] dddd [??] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[?? ??????????????????] dddd [??] LT';
                }
            }
            else {
                if (getDayOfWeek(date) === 2) {
                    return '[????] dddd [??] LT';
                }
                else {
                    return '[??] dddd [??] LT';
                }
            }
        },
        lastWeek(date, now) {
            if (getWeek(now) !== getWeek(date)) {
                switch (getDayOfWeek(date)) {
                    case 0:
                        return '[?? ??????????????] dddd [??] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[?? ??????????????] dddd [??] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[?? ??????????????] dddd [??] LT';
                }
            }
            else {
                if (getDayOfWeek(date) === 2) {
                    return '[????] dddd [??] LT';
                }
                else {
                    return '[??] dddd [??] LT';
                }
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: '?????????? %s',
        past: '%s ??????????',
        s: '?????????????????? ????????????',
        ss: relativeTimeWithPlural$1,
        m: relativeTimeWithPlural$1,
        mm: relativeTimeWithPlural$1,
        h: '??????',
        hh: relativeTimeWithPlural$1,
        d: '????????',
        dd: relativeTimeWithPlural$1,
        M: '??????????',
        MM: relativeTimeWithPlural$1,
        y: '??????',
        yy: relativeTimeWithPlural$1
    },
    meridiemParse: /????????|????????|??????|????????????/i,
    isPM(input) {
        return /^(??????|????????????)$/.test(input);
    },
    meridiem(hour, minute, isLower) {
        if (hour < 4) {
            return '????????';
        }
        else if (hour < 12) {
            return '????????';
        }
        else if (hour < 17) {
            return '??????';
        }
        else {
            return '????????????';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(??|????|??)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return num + '-??';
            case 'D':
                return num + '-????';
            case 'w':
            case 'W':
                return num + '-??';
            default:
                return num.toString(10);
        }
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Jozef Pa??in : https://github.com/atiris
const months$2 = 'janu??r_febru??r_marec_apr??l_m??j_j??n_j??l_august_september_okt??ber_november_december'.split('_');
const monthsShort$6 = 'jan_feb_mar_apr_m??j_j??n_j??l_aug_sep_okt_nov_dec'.split('_');
function plural$3(num) {
    return (num > 1) && (num < 5) && (~~(num / 10) !== 1);
}
function translate$6(num, withoutSuffix, key, isFuture) {
    const result = num + ' ';
    switch (key) {
        case 's': // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'p??r sek??nd' : 'p??r sekundami';
        case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
            if (withoutSuffix || isFuture) {
                return result + (plural$3(num) ? 'sekundy' : 'sek??nd');
            }
            else {
                return result + 'sekundami';
            }
        // break;
        case 'm': // a minute / in a minute / a minute ago
            return withoutSuffix ? 'min??ta' : (isFuture ? 'min??tu' : 'min??tou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural$3(num) ? 'min??ty' : 'min??t');
            }
            else {
                return result + 'min??tami';
            }
        // break;
        case 'h': // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural$3(num) ? 'hodiny' : 'hod??n');
            }
            else {
                return result + 'hodinami';
            }
        // break;
        case 'd': // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'de??' : 'd??om';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural$3(num) ? 'dni' : 'dn??');
            }
            else {
                return result + 'd??ami';
            }
        // break;
        case 'M': // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural$3(num) ? 'mesiace' : 'mesiacov');
            }
            else {
                return result + 'mesiacmi';
            }
        // break;
        case 'y': // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural$3(num) ? 'roky' : 'rokov');
            }
            else {
                return result + 'rokmi';
            }
        // break;
    }
}
const skLocale = {
    abbr: 'sk',
    months: months$2,
    monthsShort: monthsShort$6,
    weekdays: 'nede??a_pondelok_utorok_streda_??tvrtok_piatok_sobota'.split('_'),
    weekdaysShort: 'ne_po_ut_st_??t_pi_so'.split('_'),
    weekdaysMin: 'ne_po_ut_st_??t_pi_so'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd D. MMMM YYYY H:mm',
        l: 'D. M. YYYY'
    },
    calendar: {
        sameDay: '[dnes o] LT',
        nextDay: '[zajtra o] LT',
        nextWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[v nede??u o] LT';
                case 1:
                case 2:
                    return '[v] dddd [o] LT';
                case 3:
                    return '[v stredu o] LT';
                case 4:
                    return '[vo ??tvrtok o] LT';
                case 5:
                    return '[v piatok o] LT';
                case 6:
                    return '[v sobotu o] LT';
            }
        },
        lastDay: '[v??era o] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[minul?? nede??u o] LT';
                case 1:
                case 2:
                    return '[minul??] dddd [o] LT';
                case 3:
                    return '[minul?? stredu o] LT';
                case 4:
                case 5:
                    return '[minul??] dddd [o] LT';
                case 6:
                    return '[minul?? sobotu o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'o %s',
        past: 'pred %s',
        s: translate$6,
        ss: translate$6,
        m: translate$6,
        mm: translate$6,
        h: translate$6,
        hh: translate$6,
        d: translate$6,
        dd: translate$6,
        M: translate$6,
        MM: translate$6,
        y: translate$6,
        yy: translate$6
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Slovenian [sl]
//! author : mihan : https://github.com/mihan
function processRelativeTime$2(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
        case 'ss':
            if (number === 1) {
                result += withoutSuffix ? 'sekundo' : 'sekundi';
            }
            else if (number === 2) {
                result += withoutSuffix || isFuture ? 'sekundi' : 'sekundah';
            }
            else if (number < 5) {
                result += withoutSuffix || isFuture ? 'sekunde' : 'sekundah';
            }
            else {
                result += withoutSuffix || isFuture ? 'sekund' : 'sekund';
            }
            return result;
        case 'm':
            return withoutSuffix ? 'ena minuta' : 'eno minuto';
        case 'mm':
            if (number === 1) {
                result += withoutSuffix ? 'minuta' : 'minuto';
            }
            else if (number === 2) {
                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
            }
            else if (number < 5) {
                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
            }
            else {
                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'ena ura' : 'eno uro';
        case 'hh':
            if (number === 1) {
                result += withoutSuffix ? 'ura' : 'uro';
            }
            else if (number === 2) {
                result += withoutSuffix || isFuture ? 'uri' : 'urama';
            }
            else if (number < 5) {
                result += withoutSuffix || isFuture ? 'ure' : 'urami';
            }
            else {
                result += withoutSuffix || isFuture ? 'ur' : 'urami';
            }
            return result;
        case 'd':
            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
        case 'dd':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
            }
            else if (number === 2) {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
            }
            else {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
            }
            return result;
        case 'M':
            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
        case 'MM':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
            }
            else if (number === 2) {
                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
            }
            else if (number < 5) {
                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
            }
            else {
                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
            }
            return result;
        case 'y':
            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
        case 'yy':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'leto' : 'letom';
            }
            else if (number === 2) {
                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
            }
            else if (number < 5) {
                result += withoutSuffix || isFuture ? 'leta' : 'leti';
            }
            else {
                result += withoutSuffix || isFuture ? 'let' : 'leti';
            }
            return result;
    }
}
const slLocale = {
    abbr: 'sl',
    months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedelja_ponedeljek_torek_sreda_??etrtek_petek_sobota'.split('_'),
    weekdaysShort: 'ned._pon._tor._sre._??et._pet._sob.'.split('_'),
    weekdaysMin: 'ne_po_to_sr_??e_pe_so'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danes ob] LT',
        nextDay: '[jutri ob] LT',
        nextWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[v] [nedeljo] [ob] LT';
                case 3:
                    return '[v] [sredo] [ob] LT';
                case 6:
                    return '[v] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[v] dddd [ob] LT';
            }
        },
        lastDay: '[v??eraj ob] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[prej??njo] [nedeljo] [ob] LT';
                case 3:
                    return '[prej??njo] [sredo] [ob] LT';
                case 6:
                    return '[prej??njo] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prej??nji] dddd [ob] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: '??ez %s',
        past: 'pred %s',
        s: processRelativeTime$2,
        ss: processRelativeTime$2,
        m: processRelativeTime$2,
        mm: processRelativeTime$2,
        h: processRelativeTime$2,
        hh: processRelativeTime$2,
        d: processRelativeTime$2,
        dd: processRelativeTime$2,
        M: processRelativeTime$2,
        MM: processRelativeTime$2,
        y: processRelativeTime$2,
        yy: processRelativeTime$2
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Agon Cecelia : https://github.com/agoncecelia
const sqLocale = {
    abbr: 'sq',
    months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N??ntor_Dhjetor'.split('_'),
    monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N??n_Dhj'.split('_'),
    weekdays: 'E Diel??_E H??n??_E Mart??_E M??rkur??_E Enjte_E Premte_E Shtun??'.split('_'),
    weekdaysShort: 'Die_H??n_Mar_M??r_Enj_Pre_Sht'.split('_'),
    weekdaysMin: 'Di_He_Ma_Me_En_Pr_Sh'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Sot n??] LT',
        nextDay: '[Nes??r n??] LT',
        nextWeek: 'dddd [n??] LT',
        lastDay: '[Dje n??] LT',
        lastWeek: 'dddd [e kaluar n??] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'n?? %s',
        past: 'para %sve',
        s: 'disa sekonda',
        ss: '%d sekonda',
        m: 'nj?? minut',
        mm: '%d minuta',
        h: 'nj?? or??',
        hh: '%d or??',
        d: 'nj?? dit??',
        dd: '%d dit??',
        M: 'nj?? muaj',
        MM: '%d muaj',
        y: 'nj?? vit',
        yy: '%d vite'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus
const svLocale = {
    abbr: 'sv',
    months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 's??ndag_m??ndag_tisdag_onsdag_torsdag_fredag_l??rdag'.split('_'),
    weekdaysShort: 's??n_m??n_tis_ons_tor_fre_l??r'.split('_'),
    weekdaysMin: 's??_m??_ti_on_to_fr_l??'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd D MMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[Ig??r] LT',
        nextWeek: '[P??] dddd LT',
        lastWeek: '[I] dddd[s] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: 'f??r %s sedan',
        s: 'n??gra sekunder',
        ss: '%d sekunder',
        m: 'en minut',
        mm: '%d minuter',
        h: 'en timme',
        hh: '%d timmar',
        d: 'en dag',
        dd: '%d dagar',
        M: 'en m??nad',
        MM: '%d m??nader',
        y: 'ett ??r',
        yy: '%d ??r'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
    ordinal(_num) {
        const num = Number(_num);
        let b = num % 10, output = (~~(num % 100 / 10) === 1) ? 'e' :
            (b === 1) ? 'a' :
                (b === 2) ? 'a' :
                    (b === 3) ? 'e' : 'e';
        return num + output;
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

// moment.js locale configuration
// locale : Thai [th]
// author : Watcharapol Sanitwong : https://github.com/tumit
const thLocale = {
    abbr: 'th',
    months: '??????????????????_??????????????????????????????_??????????????????_??????????????????_?????????????????????_????????????????????????_?????????????????????_?????????????????????_?????????????????????_??????????????????_???????????????????????????_?????????????????????'.split('_'),
    monthsShort: '???.???._???.???._??????.???._??????.???._???.???._??????.???._???.???._???.???._???.???._???.???._???.???._???.???.'.split('_'),
    monthsParseExact: true,
    weekdays: '?????????????????????_??????????????????_??????????????????_?????????_????????????????????????_???????????????_???????????????'.split('_'),
    weekdaysShort: '??????._???._???._???._??????._???._???.'.split('_'),
    weekdaysMin: '??????._???._???._???._??????._???._???.'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY ???????????? H:mm',
        LLLL: '?????????dddd????????? D MMMM YYYY ???????????? H:mm'
    },
    meridiemParse: /??????????????????????????????|??????????????????????????????/,
    isPM(input) {
        return input === '??????????????????????????????';
    },
    meridiem(hour, minute, isLower) {
        if (hour < 12) {
            return '??????????????????????????????';
        }
        else {
            return '??????????????????????????????';
        }
    },
    calendar: {
        sameDay: '[?????????????????? ????????????] LT',
        nextDay: '[???????????????????????? ????????????] LT',
        nextWeek: 'dddd[???????????? ????????????] LT',
        lastDay: '[????????????????????????????????? ????????????] LT',
        lastWeek: '[?????????]dddd[????????????????????? ????????????] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '????????? %s',
        past: '%s?????????????????????',
        s: '????????????????????????????????????',
        ss: '%d ??????????????????',
        m: '1 ????????????',
        mm: '%d ????????????',
        h: '1 ?????????????????????',
        hh: '%d ?????????????????????',
        d: '1 ?????????',
        dd: '%d ?????????',
        M: '1 ???????????????',
        MM: '%d ???????????????',
        y: '1 ??????',
        yy: '%d ??????'
    }
};

// moment.js locale configuration
// locale : Thai-Buddhist Era [th-be]
// author : Watcharapol Sanitwong : https://github.com/tumit
const thBeLocale = {
    abbr: 'th-be',
    months: '??????????????????_??????????????????????????????_??????????????????_??????????????????_?????????????????????_????????????????????????_?????????????????????_?????????????????????_?????????????????????_??????????????????_???????????????????????????_?????????????????????'.split('_'),
    monthsShort: '???.???._???.???._??????.???._??????.???._???.???._??????.???._???.???._???.???._???.???._???.???._???.???._???.???.'.split('_'),
    monthsParseExact: true,
    weekdays: '?????????????????????_??????????????????_??????????????????_?????????_????????????????????????_???????????????_???????????????'.split('_'),
    weekdaysShort: '??????._???._???._???._??????._???._???.'.split('_'),
    weekdaysMin: '??????._???._???._???._??????._???._???.'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY ???????????? H:mm',
        LLLL: '?????????dddd????????? D MMMM YYYY ???????????? H:mm'
    },
    meridiemParse: /??????????????????????????????|??????????????????????????????/,
    isPM(input) {
        return input === '??????????????????????????????';
    },
    meridiem(hour, minute, isLower) {
        if (hour < 12) {
            return '??????????????????????????????';
        }
        else {
            return '??????????????????????????????';
        }
    },
    calendar: {
        sameDay: '[?????????????????? ????????????] LT',
        nextDay: '[???????????????????????? ????????????] LT',
        nextWeek: 'dddd[???????????? ????????????] LT',
        lastDay: '[????????????????????????????????? ????????????] LT',
        lastWeek: '[?????????]dddd[????????????????????? ????????????] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '????????? %s',
        past: '%s?????????????????????',
        s: '????????????????????????????????????',
        ss: '%d ??????????????????',
        m: '1 ????????????',
        mm: '%d ????????????',
        h: '1 ?????????????????????',
        hh: '%d ?????????????????????',
        d: '1 ?????????',
        dd: '%d ?????????',
        M: '1 ???????????????',
        MM: '%d ???????????????',
        y: '1 ??????',
        yy: '%d ??????'
    },
    preparse(str, format) {
        const _format = thBeLocale.longDateFormat[format]
            ? thBeLocale.longDateFormat[format]
            : format;
        // endsWith('YYYY')
        if (_format.indexOf('YYYY', _format.length - 'YYYY'.length) !== -1) {
            const ddMM = str.substr(0, str.length - 4);
            const yyyy = parseInt(str.substr(str.length - 4), 10) - 543;
            return ddMM + yyyy;
        }
        return str;
    },
    getFullYear(date, isUTC = false) {
        return 543 + (isUTC ? date.getUTCFullYear() : date.getFullYear());
    }
};

//! moment.js locale configuration
//! locale : Turkish [tr]
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak Yi??it Kaya: https://github.com/BYK
let suffixes$1 = {
    1: '\'inci',
    5: '\'inci',
    8: '\'inci',
    70: '\'inci',
    80: '\'inci',
    2: '\'nci',
    7: '\'nci',
    20: '\'nci',
    50: '\'nci',
    3: '\'??nc??',
    4: '\'??nc??',
    100: '\'??nc??',
    6: '\'nc??',
    9: '\'uncu',
    10: '\'uncu',
    30: '\'uncu',
    60: '\'??nc??',
    90: '\'??nc??'
};
const trLocale = {
    abbr: 'tr',
    months: 'Ocak_??ubat_Mart_Nisan_May??s_Haziran_Temmuz_A??ustos_Eyl??l_Ekim_Kas??m_Aral??k'.split('_'),
    monthsShort: 'Oca_??ub_Mar_Nis_May_Haz_Tem_A??u_Eyl_Eki_Kas_Ara'.split('_'),
    weekdays: 'Pazar_Pazartesi_Sal??_??ar??amba_Per??embe_Cuma_Cumartesi'.split('_'),
    weekdaysShort: 'Paz_Pts_Sal_??ar_Per_Cum_Cts'.split('_'),
    weekdaysMin: 'Pz_Pt_Sa_??a_Pe_Cu_Ct'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[bug??n saat] LT',
        nextDay: '[yar??n saat] LT',
        nextWeek: '[gelecek] dddd [saat] LT',
        lastDay: '[d??n] LT',
        lastWeek: '[ge??en] dddd [saat] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s sonra',
        past: '%s ??nce',
        s: 'birka?? saniye',
        ss: '%d saniye',
        m: 'bir dakika',
        mm: '%d dakika',
        h: 'bir saat',
        hh: '%d saat',
        d: 'bir g??n',
        dd: '%d g??n',
        M: 'bir ay',
        MM: '%d ay',
        y: 'bir y??l',
        yy: '%d y??l'
    },
    dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|??nc??|nc??|uncu|??nc??)/,
    ordinal(_num) {
        const num = Number(_num);
        if (num === 0) { // special case for zero
            return num + '\'??nc??';
        }
        let a = num % 10, b = num % 100 - a, c = num >= 100 ? 100 : null;
        return num + (suffixes$1[a] || suffixes$1[b] || suffixes$1[c]);
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Ukrainian [uk]
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elens??le : https://github.com/Oire
function plural$4(word, num) {
    let forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural$2(num, withoutSuffix, key) {
    let format = {
        ss: withoutSuffix ? '??????????????_??????????????_????????????' : '??????????????_??????????????_????????????',
        mm: withoutSuffix ? '??????????????_??????????????_????????????' : '??????????????_??????????????_????????????',
        hh: withoutSuffix ? '????????????_????????????_??????????' : '????????????_????????????_??????????',
        dd: '????????_??????_????????',
        MM: '????????????_????????????_??????????????',
        yy: '??????_????????_??????????'
    };
    if (key === 'm') {
        return withoutSuffix ? '??????????????' : '??????????????';
    }
    if (key === 'h') {
        return withoutSuffix ? '????????????' : '????????????';
    }
    return num + ' ' + plural$4(format[key], +num);
}
function weekdaysCaseReplace(date, format, isUTC) {
    let weekdays = {
        nominative: '????????????_??????????????????_????????????????_????????????_????????????_?????????????????_????????????'.split('_'),
        accusative: '????????????_??????????????????_????????????????_????????????_????????????_?????????????????_????????????'.split('_'),
        genitive: '????????????_??????????????????_????????????????_????????????_????????????????_?????????????????_????????????'.split('_')
    };
    if (!date) {
        return weekdays.nominative;
    }
    let nounCase = (/(\[[????????]\]) ?dddd/).test(format) ?
        'accusative' :
        ((/\[?(?:??????????????|??????????????????)? ?\] ?dddd/).test(format) ?
            'genitive' :
            'nominative');
    return weekdays[nounCase][getDayOfWeek(date, isUTC)];
}
function processHoursFunction(str) {
    return function (date) {
        return str + '??' + (getHours(date) === 11 ? '??' : '') + '] LT';
    };
}
const ukLocale = {
    abbr: 'uk',
    months: {
        format: '??????????_????????????_??????????????_????????????_????????????_????????????_??????????_????????????_??????????????_????????????_??????????????????_????????????'.split('_'),
        standalone: '????????????_??????????_????????????????_??????????????_??????????????_??????????????_????????????_??????????????_????????????????_??????????????_????????????????_??????????????'.split('_')
    },
    monthsShort: '??????_??????_??????_????????_????????_????????_??????_????????_??????_????????_????????_????????'.split('_'),
    weekdays: weekdaysCaseReplace,
    weekdaysShort: '????_????_????_????_????_????_????'.split('_'),
    weekdaysMin: '????_????_????_????_????_????_????'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY ??.',
        LLL: 'D MMMM YYYY ??., HH:mm',
        LLLL: 'dddd, D MMMM YYYY ??., HH:mm'
    },
    calendar: {
        sameDay: processHoursFunction('[???????????????? '),
        nextDay: processHoursFunction('[???????????? '),
        lastDay: processHoursFunction('[?????????? '),
        nextWeek: processHoursFunction('[??] dddd ['),
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return processHoursFunction('[??????????????] dddd [')(date);
                case 1:
                case 2:
                case 4:
                    return processHoursFunction('[????????????????] dddd [')(date);
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: '???? %s',
        past: '%s ????????',
        s: '???????????????? ????????????',
        ss: relativeTimeWithPlural$2,
        m: relativeTimeWithPlural$2,
        mm: relativeTimeWithPlural$2,
        h: '????????????',
        hh: relativeTimeWithPlural$2,
        d: '????????',
        dd: relativeTimeWithPlural$2,
        M: '????????????',
        MM: relativeTimeWithPlural$2,
        y: '??????',
        yy: relativeTimeWithPlural$2
    },
    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
    meridiemParse: /????????|??????????|??????|????????????/,
    isPM(input) {
        return /^(??????|????????????)$/.test(input);
    },
    meridiem(hour, minute, isLower) {
        if (hour < 4) {
            return '????????';
        }
        else if (hour < 12) {
            return '??????????';
        }
        else if (hour < 17) {
            return '??????';
        }
        else {
            return '????????????';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(??|????)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return num + '-??';
            case 'D':
                return num + '-????';
            default:
                return num.toString();
        }
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};

//! moment.js locale configuration
//! locale : Vi???t Nam [vi]
//! author : Chris Gedrim : https://github.com/chrisgedrim
const viLocale = {
    abbr: 'vi',
    months: 'th??ng 1_th??ng 2_th??ng 3_th??ng 4_th??ng 5_th??ng 6_th??ng 7_th??ng 8_th??ng 9_th??ng 10_th??ng 11_th??ng 12'.split('_'),
    monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
    monthsParseExact: true,
    weekdays: 'ch??? nh???t_th??? hai_th??? ba_th??? t??_th??? n??m_th??? s??u_th??? b???y'.split('_'),
    weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysParseExact: true,
    meridiemParse: /sa|ch/i,
    isPM(input) {
        return /^ch$/i.test(input);
    },
    meridiem(hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'sa' : 'SA';
        }
        else {
            return isLower ? 'ch' : 'CH';
        }
    },
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM [n??m] YYYY',
        LLL: 'D MMMM [n??m] YYYY HH:mm',
        LLLL: 'dddd, D MMMM [n??m] YYYY HH:mm',
        l: 'DD/M/YYYY',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd, D MMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[H??m nay l??c] LT',
        nextDay: '[Ng??y mai l??c] LT',
        nextWeek: 'dddd [tu???n t???i l??c] LT',
        lastDay: '[H??m qua l??c] LT',
        lastWeek: 'dddd [tu???n tr?????c l??c] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s t???i',
        past: '%s tr?????c',
        s: 'v??i gi??y',
        ss: '%d gi??y',
        m: 'm???t ph??t',
        mm: '%d ph??t',
        h: 'm???t gi???',
        hh: '%d gi???',
        d: 'm???t ng??y',
        dd: '%d ng??y',
        M: 'm???t th??ng',
        MM: '%d th??ng',
        y: 'm???t n??m',
        yy: '%d n??m'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal(_num) {
        return '' + _num;
    },
    week: {
        dow: 1,
        doy: 4 // Tu???n ch???a ng??y 4 th??ng 1 l?? tu???n ?????u ti??n trong n??m.
    }
};

//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng
const zhCnLocale = {
    abbr: 'zh-cn',
    months: '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_?????????_?????????'.split('_'),
    monthsShort: '1???_2???_3???_4???_5???_6???_7???_8???_9???_10???_11???_12???'.split('_'),
    weekdays: '?????????_?????????_?????????_?????????_?????????_?????????_?????????'.split('_'),
    weekdaysShort: '??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdaysMin: '???_???_???_???_???_???_???'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY???M???D???',
        LLL: 'YYYY???M???D???Ah???mm???',
        LLLL: 'YYYY???M???D???ddddAh???mm???',
        l: 'YYYY/M/D',
        ll: 'YYYY???M???D???',
        lll: 'YYYY???M???D??? HH:mm',
        llll: 'YYYY???M???D???dddd HH:mm'
    },
    meridiemParse: /??????|??????|??????|??????|??????|??????/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '??????' || meridiem === '??????' ||
            meridiem === '??????') {
            return hour;
        }
        else if (meridiem === '??????' || meridiem === '??????') {
            return hour + 12;
        }
        else {
            // '??????'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem(hour, minute, isLower) {
        let hm = hour * 100 + minute;
        if (hm < 600) {
            return '??????';
        }
        else if (hm < 900) {
            return '??????';
        }
        else if (hm < 1130) {
            return '??????';
        }
        else if (hm < 1230) {
            return '??????';
        }
        else if (hm < 1800) {
            return '??????';
        }
        else {
            return '??????';
        }
    },
    calendar: {
        sameDay: '[??????]LT',
        nextDay: '[??????]LT',
        nextWeek: '[???]ddddLT',
        lastDay: '[??????]LT',
        lastWeek: '[???]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(???|???|???)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + '???';
            case 'M':
                return num + '???';
            case 'w':
            case 'W':
                return num + '???';
            default:
                return num.toString();
        }
    },
    relativeTime: {
        future: '%s???',
        past: '%s???',
        s: '??????',
        ss: '%d ???',
        m: '1 ??????',
        mm: '%d ??????',
        h: '1 ??????',
        hh: '%d ??????',
        d: '1 ???',
        dd: '%d ???',
        M: '1 ??????',
        MM: '%d ??????',
        y: '1 ???',
        yy: '%d ???'
    },
    week: {
        // GB/T 7408-1994?????????????????????????????????????????????????????????????????????????ISO 8601:1988??????
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

/**
 * Generated bundle index. Do not edit.
 */

export { add, arLocale, bgLocale, caLocale, csLocale, daLocale, deLocale, defineLocale, enGbLocale, endOf, esDoLocale, esLocale, esUsLocale, etLocale, fiLocale, formatDate, frLocale, getDay, getFirstDayOfMonth, getFullYear, getLocale, getMonth, getSetGlobalLocale, glLocale, heLocale, hiLocale, hrLocale, huLocale, idLocale, isAfter, isArray, isBefore, isDate, isDateValid, isDisabledDay, isFirstDayOfWeek, isSame, isSameDay, isSameMonth, isSameYear, itLocale, jaLocale, kaLocale, kkLocale, koLocale, listLocales, ltLocale, lvLocale, mnLocale, nbLocale, nlBeLocale, nlLocale, parseDate, plLocale, ptBrLocale, roLocale, ruLocale, setFullDate, shiftDate, skLocale, slLocale, sqLocale, startOf, subtract, svLocale, thBeLocale, thLocale, trLocale, ukLocale, updateLocale, utcAsLocal, viLocale, zhCnLocale, createDate as ??a };
//# sourceMappingURL=ngx-bootstrap-chronos.js.map
