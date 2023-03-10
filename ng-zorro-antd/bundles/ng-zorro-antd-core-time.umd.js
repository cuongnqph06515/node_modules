(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('date-fns/addMonths'), require('date-fns/addYears'), require('date-fns/differenceInCalendarDays'), require('date-fns/differenceInCalendarMonths'), require('date-fns/differenceInCalendarYears'), require('date-fns/differenceInHours'), require('date-fns/differenceInMinutes'), require('date-fns/differenceInSeconds'), require('date-fns/isFirstDayOfMonth'), require('date-fns/isLastDayOfMonth'), require('date-fns/isSameDay'), require('date-fns/isSameHour'), require('date-fns/isSameMinute'), require('date-fns/isSameMonth'), require('date-fns/isSameSecond'), require('date-fns/isSameYear'), require('date-fns/isToday'), require('date-fns/isValid'), require('date-fns/setDay'), require('date-fns/setMonth'), require('date-fns/setYear'), require('date-fns/startOfMonth'), require('date-fns/startOfWeek'), require('ng-zorro-antd/core/logger')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/time', ['exports', 'date-fns/addMonths', 'date-fns/addYears', 'date-fns/differenceInCalendarDays', 'date-fns/differenceInCalendarMonths', 'date-fns/differenceInCalendarYears', 'date-fns/differenceInHours', 'date-fns/differenceInMinutes', 'date-fns/differenceInSeconds', 'date-fns/isFirstDayOfMonth', 'date-fns/isLastDayOfMonth', 'date-fns/isSameDay', 'date-fns/isSameHour', 'date-fns/isSameMinute', 'date-fns/isSameMonth', 'date-fns/isSameSecond', 'date-fns/isSameYear', 'date-fns/isToday', 'date-fns/isValid', 'date-fns/setDay', 'date-fns/setMonth', 'date-fns/setYear', 'date-fns/startOfMonth', 'date-fns/startOfWeek', 'ng-zorro-antd/core/logger'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.time = {}), global.addMonths, global.addYears, global.differenceInCalendarDays, global.differenceInCalendarMonths, global.differenceInCalendarYears, global.differenceInHours, global.differenceInMinutes, global.differenceInSeconds, global.isFirstDayOfMonth, global.isLastDayOfMonth, global.isSameDay, global.isSameHour, global.isSameMinute, global.isSameMonth, global.isSameSecond, global.isSameYear, global.isToday, global.isValid, global.setDay, global.setMonth, global.setYear, global.startOfMonth, global.startOfWeek, global['ng-zorro-antd'].core.logger));
}(this, (function (exports, addMonths, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, differenceInHours, differenceInMinutes, differenceInSeconds, isFirstDayOfMonth, isLastDayOfMonth, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameSecond, isSameYear, isToday, isValid, setDay, setMonth, setYear, startOfMonth, startOfWeek, logger) { 'use strict';

    addMonths = addMonths && Object.prototype.hasOwnProperty.call(addMonths, 'default') ? addMonths['default'] : addMonths;
    addYears = addYears && Object.prototype.hasOwnProperty.call(addYears, 'default') ? addYears['default'] : addYears;
    differenceInCalendarDays = differenceInCalendarDays && Object.prototype.hasOwnProperty.call(differenceInCalendarDays, 'default') ? differenceInCalendarDays['default'] : differenceInCalendarDays;
    differenceInCalendarMonths = differenceInCalendarMonths && Object.prototype.hasOwnProperty.call(differenceInCalendarMonths, 'default') ? differenceInCalendarMonths['default'] : differenceInCalendarMonths;
    differenceInCalendarYears = differenceInCalendarYears && Object.prototype.hasOwnProperty.call(differenceInCalendarYears, 'default') ? differenceInCalendarYears['default'] : differenceInCalendarYears;
    differenceInHours = differenceInHours && Object.prototype.hasOwnProperty.call(differenceInHours, 'default') ? differenceInHours['default'] : differenceInHours;
    differenceInMinutes = differenceInMinutes && Object.prototype.hasOwnProperty.call(differenceInMinutes, 'default') ? differenceInMinutes['default'] : differenceInMinutes;
    differenceInSeconds = differenceInSeconds && Object.prototype.hasOwnProperty.call(differenceInSeconds, 'default') ? differenceInSeconds['default'] : differenceInSeconds;
    isFirstDayOfMonth = isFirstDayOfMonth && Object.prototype.hasOwnProperty.call(isFirstDayOfMonth, 'default') ? isFirstDayOfMonth['default'] : isFirstDayOfMonth;
    isLastDayOfMonth = isLastDayOfMonth && Object.prototype.hasOwnProperty.call(isLastDayOfMonth, 'default') ? isLastDayOfMonth['default'] : isLastDayOfMonth;
    isSameDay = isSameDay && Object.prototype.hasOwnProperty.call(isSameDay, 'default') ? isSameDay['default'] : isSameDay;
    isSameHour = isSameHour && Object.prototype.hasOwnProperty.call(isSameHour, 'default') ? isSameHour['default'] : isSameHour;
    isSameMinute = isSameMinute && Object.prototype.hasOwnProperty.call(isSameMinute, 'default') ? isSameMinute['default'] : isSameMinute;
    isSameMonth = isSameMonth && Object.prototype.hasOwnProperty.call(isSameMonth, 'default') ? isSameMonth['default'] : isSameMonth;
    isSameSecond = isSameSecond && Object.prototype.hasOwnProperty.call(isSameSecond, 'default') ? isSameSecond['default'] : isSameSecond;
    isSameYear = isSameYear && Object.prototype.hasOwnProperty.call(isSameYear, 'default') ? isSameYear['default'] : isSameYear;
    isToday = isToday && Object.prototype.hasOwnProperty.call(isToday, 'default') ? isToday['default'] : isToday;
    isValid = isValid && Object.prototype.hasOwnProperty.call(isValid, 'default') ? isValid['default'] : isValid;
    setDay = setDay && Object.prototype.hasOwnProperty.call(setDay, 'default') ? setDay['default'] : setDay;
    setMonth = setMonth && Object.prototype.hasOwnProperty.call(setMonth, 'default') ? setMonth['default'] : setMonth;
    setYear = setYear && Object.prototype.hasOwnProperty.call(setYear, 'default') ? setYear['default'] : setYear;
    startOfMonth = startOfMonth && Object.prototype.hasOwnProperty.call(startOfMonth, 'default') ? startOfMonth['default'] : startOfMonth;
    startOfWeek = startOfWeek && Object.prototype.hasOwnProperty.call(startOfWeek, 'default') ? startOfWeek['default'] : startOfWeek;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: candy-date.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} rangeValue
     * @return {?}
     */
    function sortRangeValue(rangeValue) {
        if (Array.isArray(rangeValue)) {
            var _a = __read(rangeValue, 2), start = _a[0], end = _a[1];
            return start && end && start.isAfterSecond(end) ? [end, start] : [start, end];
        }
        return rangeValue;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function normalizeRangeValue(value) {
        var _a = __read(value || [], 2), start = _a[0], end = _a[1];
        /** @type {?} */
        var newStart = start || new CandyDate();
        /** @type {?} */
        var newEnd = (end === null || end === void 0 ? void 0 : end.isSameMonth(newStart)) ? end.addMonths(1) : end || newStart.addMonths(1);
        return [newStart, newEnd];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function cloneDate(value) {
        if (Array.isArray(value)) {
            return value.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return (v instanceof CandyDate ? v.clone() : null); }));
        }
        else {
            return value instanceof CandyDate ? value.clone() : null;
        }
    }
    /**
     * Wrapping kind APIs for date operating and unify
     * NOTE: every new API return new CandyDate object without side effects to the former Date object
     * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
     * TODO: support format() against to angular's core API
     */
    var   /**
     * Wrapping kind APIs for date operating and unify
     * NOTE: every new API return new CandyDate object without side effects to the former Date object
     * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
     * TODO: support format() against to angular's core API
     */
    CandyDate = /** @class */ (function () {
        // locale: string; // Custom specified locale ID
        function CandyDate(date) {
            if (date) {
                if (date instanceof Date) {
                    this.nativeDate = date;
                }
                else if (typeof date === 'string' || typeof date === 'number') {
                    logger.warn('The string type is not recommended for date-picker, use "Date" type');
                    this.nativeDate = new Date(date);
                }
                else {
                    throw new Error('The input date type is not supported ("Date" is now recommended)');
                }
            }
            else {
                this.nativeDate = new Date();
            }
        }
        // getLocale(): string {
        //   return this.locale;
        // }
        // setLocale(locale: string): CandyDate {
        //   this.locale = locale;
        //   return this;
        // }
        // getLocale(): string {
        //   return this.locale;
        // }
        // setLocale(locale: string): CandyDate {
        //   this.locale = locale;
        //   return this;
        // }
        /**
         * @param {?=} options
         * @return {?}
         */
        CandyDate.prototype.calendarStart = 
        // getLocale(): string {
        //   return this.locale;
        // }
        // setLocale(locale: string): CandyDate {
        //   this.locale = locale;
        //   return this;
        // }
        /**
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            return new CandyDate(startOfWeek(startOfMonth(this.nativeDate), options));
        };
        // ---------------------------------------------------------------------
        // | Native shortcuts
        // -----------------------------------------------------------------------------\
        // ---------------------------------------------------------------------
        // | Native shortcuts
        // -----------------------------------------------------------------------------\
        /**
         * @return {?}
         */
        CandyDate.prototype.getYear = 
        // ---------------------------------------------------------------------
        // | Native shortcuts
        // -----------------------------------------------------------------------------\
        /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getFullYear();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getMonth = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getMonth();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getDay = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getDay();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getTime = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getTime();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getDate = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getDate();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getHours = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getHours();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getMinutes = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getMinutes();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getSeconds = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getSeconds();
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.getMilliseconds = /**
         * @return {?}
         */
        function () {
            return this.nativeDate.getMilliseconds();
        };
        // ---------------------------------------------------------------------
        // | New implementing APIs
        // ---------------------------------------------------------------------
        // ---------------------------------------------------------------------
        // | New implementing APIs
        // ---------------------------------------------------------------------
        /**
         * @return {?}
         */
        CandyDate.prototype.clone = 
        // ---------------------------------------------------------------------
        // | New implementing APIs
        // ---------------------------------------------------------------------
        /**
         * @return {?}
         */
        function () {
            return new CandyDate(new Date(this.nativeDate));
        };
        /**
         * @param {?} hour
         * @param {?} minute
         * @param {?} second
         * @return {?}
         */
        CandyDate.prototype.setHms = /**
         * @param {?} hour
         * @param {?} minute
         * @param {?} second
         * @return {?}
         */
        function (hour, minute, second) {
            return new CandyDate(this.nativeDate.setHours(hour, minute, second));
        };
        /**
         * @param {?} year
         * @return {?}
         */
        CandyDate.prototype.setYear = /**
         * @param {?} year
         * @return {?}
         */
        function (year) {
            return new CandyDate(setYear(this.nativeDate, year));
        };
        /**
         * @param {?} amount
         * @return {?}
         */
        CandyDate.prototype.addYears = /**
         * @param {?} amount
         * @return {?}
         */
        function (amount) {
            return new CandyDate(addYears(this.nativeDate, amount));
        };
        // NOTE: month starts from 0
        // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
        // NOTE: month starts from 0
        // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
        /**
         * @param {?} month
         * @return {?}
         */
        CandyDate.prototype.setMonth = 
        // NOTE: month starts from 0
        // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
        /**
         * @param {?} month
         * @return {?}
         */
        function (month) {
            return new CandyDate(setMonth(this.nativeDate, month));
        };
        /**
         * @param {?} amount
         * @return {?}
         */
        CandyDate.prototype.addMonths = /**
         * @param {?} amount
         * @return {?}
         */
        function (amount) {
            return new CandyDate(addMonths(this.nativeDate, amount));
        };
        /**
         * @param {?} day
         * @param {?=} options
         * @return {?}
         */
        CandyDate.prototype.setDay = /**
         * @param {?} day
         * @param {?=} options
         * @return {?}
         */
        function (day, options) {
            return new CandyDate(setDay(this.nativeDate, day, options));
        };
        /**
         * @param {?} amount
         * @return {?}
         */
        CandyDate.prototype.setDate = /**
         * @param {?} amount
         * @return {?}
         */
        function (amount) {
            /** @type {?} */
            var date = new Date(this.nativeDate);
            date.setDate(amount);
            return new CandyDate(date);
        };
        /**
         * @param {?} amount
         * @return {?}
         */
        CandyDate.prototype.addDays = /**
         * @param {?} amount
         * @return {?}
         */
        function (amount) {
            return this.setDate(this.getDate() + amount);
        };
        /**
         * @param {?} date
         * @param {?=} grain
         * @return {?}
         */
        CandyDate.prototype.isSame = /**
         * @param {?} date
         * @param {?=} grain
         * @return {?}
         */
        function (date, grain) {
            if (grain === void 0) { grain = 'day'; }
            /** @type {?} */
            var fn;
            switch (grain) {
                case 'year':
                    fn = isSameYear;
                    break;
                case 'month':
                    fn = isSameMonth;
                    break;
                case 'day':
                    fn = isSameDay;
                    break;
                case 'hour':
                    fn = isSameHour;
                    break;
                case 'minute':
                    fn = isSameMinute;
                    break;
                case 'second':
                    fn = isSameSecond;
                    break;
                default:
                    fn = isSameDay;
                    break;
            }
            return fn(this.nativeDate, this.toNativeDate(date));
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isSameYear = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.isSame(date, 'year');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isSameMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.isSame(date, 'month');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isSameDay = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.isSame(date, 'day');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isSameHour = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.isSame(date, 'hour');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isSameMinute = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.isSame(date, 'minute');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isSameSecond = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.isSame(date, 'second');
        };
        /**
         * @param {?} date
         * @param {?=} grain
         * @param {?=} isBefore
         * @return {?}
         */
        CandyDate.prototype.compare = /**
         * @param {?} date
         * @param {?=} grain
         * @param {?=} isBefore
         * @return {?}
         */
        function (date, grain, isBefore) {
            if (grain === void 0) { grain = 'day'; }
            if (isBefore === void 0) { isBefore = true; }
            if (date === null) {
                return false;
            }
            /** @type {?} */
            var fn;
            switch (grain) {
                case 'year':
                    fn = differenceInCalendarYears;
                    break;
                case 'month':
                    fn = differenceInCalendarMonths;
                    break;
                case 'day':
                    fn = differenceInCalendarDays;
                    break;
                case 'hour':
                    fn = differenceInHours;
                    break;
                case 'minute':
                    fn = differenceInMinutes;
                    break;
                case 'second':
                    fn = differenceInSeconds;
                    break;
                default:
                    fn = differenceInCalendarDays;
                    break;
            }
            return isBefore ? fn(this.nativeDate, this.toNativeDate(date)) < 0 : fn(this.nativeDate, this.toNativeDate(date)) > 0;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isBeforeYear = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'year');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isBeforeMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'month');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isBeforeDay = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'day');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isBeforeHour = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'hour');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isBeforeMinute = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'minute');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isBeforeSecond = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'second');
        };
        // TODO: isBefore
        // TODO: isBefore
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isAfterYear = 
        // TODO: isBefore
        /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'year', false);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isAfterMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'month', false);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isAfterDay = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'day', false);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isAfterHour = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'hour', false);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isAfterMinute = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'minute', false);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.isAfterSecond = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.compare(date, 'second', false);
        };
        // Equal to today accurate to "day"
        // Equal to today accurate to "day"
        /**
         * @return {?}
         */
        CandyDate.prototype.isToday = 
        // Equal to today accurate to "day"
        /**
         * @return {?}
         */
        function () {
            return isToday(this.nativeDate);
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.isValid = /**
         * @return {?}
         */
        function () {
            return isValid(this.nativeDate);
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.isFirstDayOfMonth = /**
         * @return {?}
         */
        function () {
            return isFirstDayOfMonth(this.nativeDate);
        };
        /**
         * @return {?}
         */
        CandyDate.prototype.isLastDayOfMonth = /**
         * @return {?}
         */
        function () {
            return isLastDayOfMonth(this.nativeDate);
        };
        /**
         * @private
         * @param {?} date
         * @return {?}
         */
        CandyDate.prototype.toNativeDate = /**
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date instanceof CandyDate ? date.nativeDate : date;
        };
        return CandyDate;
    }());
    if (false) {
        /** @type {?} */
        CandyDate.prototype.nativeDate;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: time.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /** @type {?} */
    var timeUnits = [
        ['Y', 1000 * 60 * 60 * 24 * 365],
        ['M', 1000 * 60 * 60 * 24 * 30],
        ['D', 1000 * 60 * 60 * 24],
        ['H', 1000 * 60 * 60],
        ['m', 1000 * 60],
        ['s', 1000],
        ['S', 1] // million seconds
    ];

    exports.CandyDate = CandyDate;
    exports.cloneDate = cloneDate;
    exports.normalizeRangeValue = normalizeRangeValue;
    exports.sortRangeValue = sortRangeValue;
    exports.timeUnits = timeUnits;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-time.umd.js.map
