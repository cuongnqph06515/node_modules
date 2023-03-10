(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/date-picker'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/radio'), require('ng-zorro-antd/select'), require('ng-zorro-antd/core/time'), require('ng-zorro-antd/core/util')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/calendar', ['exports', '@angular/common', '@angular/core', '@angular/forms', 'ng-zorro-antd/date-picker', 'ng-zorro-antd/i18n', 'ng-zorro-antd/radio', 'ng-zorro-antd/select', 'ng-zorro-antd/core/time', 'ng-zorro-antd/core/util'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].calendar = {}), global.ng.common, global.ng.core, global.ng.forms, global['ng-zorro-antd']['date-picker'], global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].radio, global['ng-zorro-antd'].select, global['ng-zorro-antd'].core.time, global['ng-zorro-antd'].core.util));
}(this, (function (exports, common, core, forms, datePicker, i18n, radio, select, time, util) { 'use strict';

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
     * Generated from: calendar-cells.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDateCellDirective = /** @class */ (function () {
        function NzDateCellDirective() {
        }
        NzDateCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nzDateCell]',
                        exportAs: 'nzDateCell'
                    },] }
        ];
        return NzDateCellDirective;
    }());
    var NzMonthCellDirective = /** @class */ (function () {
        function NzMonthCellDirective() {
        }
        NzMonthCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nzMonthCell]',
                        exportAs: 'nzMonthCell'
                    },] }
        ];
        return NzMonthCellDirective;
    }());
    var NzDateFullCellDirective = /** @class */ (function () {
        function NzDateFullCellDirective() {
        }
        NzDateFullCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nzDateFullCell]',
                        exportAs: 'nzDateFullCell'
                    },] }
        ];
        return NzDateFullCellDirective;
    }());
    var NzMonthFullCellDirective = /** @class */ (function () {
        function NzMonthFullCellDirective() {
        }
        NzMonthFullCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nzMonthFullCell]',
                        exportAs: 'nzMonthFullCell'
                    },] }
        ];
        return NzMonthFullCellDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: calendar-header.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCalendarHeaderComponent = /** @class */ (function () {
        function NzCalendarHeaderComponent(i18n, dateHelper) {
            this.i18n = i18n;
            this.dateHelper = dateHelper;
            this.mode = 'month';
            this.fullscreen = true;
            this.activeDate = new time.CandyDate();
            this.modeChange = new core.EventEmitter();
            this.yearChange = new core.EventEmitter();
            this.monthChange = new core.EventEmitter();
            // @Output() readonly valueChange: EventEmitter<CandyDate> = new EventEmitter();
            this.yearOffset = 10;
            this.yearTotal = 20;
            this.years = [];
            this.months = [];
        }
        Object.defineProperty(NzCalendarHeaderComponent.prototype, "activeYear", {
            get: /**
             * @return {?}
             */
            function () {
                return this.activeDate.getYear();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarHeaderComponent.prototype, "activeMonth", {
            get: /**
             * @return {?}
             */
            function () {
                return this.activeDate.getMonth();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarHeaderComponent.prototype, "size", {
            get: /**
             * @return {?}
             */
            function () {
                return this.fullscreen ? 'default' : 'small';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarHeaderComponent.prototype, "yearTypeText", {
            get: /**
             * @return {?}
             */
            function () {
                return this.i18n.getLocale().Calendar.lang.year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarHeaderComponent.prototype, "monthTypeText", {
            get: /**
             * @return {?}
             */
            function () {
                return this.i18n.getLocale().Calendar.lang.month;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzCalendarHeaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.setUpYears();
            this.setUpMonths();
        };
        /**
         * @param {?} year
         * @return {?}
         */
        NzCalendarHeaderComponent.prototype.updateYear = /**
         * @param {?} year
         * @return {?}
         */
        function (year) {
            this.yearChange.emit(year);
            this.setUpYears(year);
        };
        /**
         * @private
         * @param {?=} year
         * @return {?}
         */
        NzCalendarHeaderComponent.prototype.setUpYears = /**
         * @private
         * @param {?=} year
         * @return {?}
         */
        function (year) {
            /** @type {?} */
            var start = (year || this.activeYear) - this.yearOffset;
            /** @type {?} */
            var end = start + this.yearTotal;
            this.years = [];
            for (var i = start; i < end; i++) {
                this.years.push({ label: "" + i, value: i });
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCalendarHeaderComponent.prototype.setUpMonths = /**
         * @private
         * @return {?}
         */
        function () {
            this.months = [];
            for (var i = 0; i < 12; i++) {
                /** @type {?} */
                var dateInMonth = this.activeDate.setMonth(i);
                /** @type {?} */
                var monthText = this.dateHelper.format(dateInMonth.nativeDate, 'MMM');
                this.months.push({ label: monthText, value: i });
            }
        };
        NzCalendarHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-calendar-header',
                        exportAs: 'nzCalendarHeader',
                        template: "\n    <div class=\"ant-picker-calendar-header\">\n      <nz-select\n        class=\"ant-picker-calendar-year-select\"\n        [nzSize]=\"size\"\n        [nzDropdownMatchSelectWidth]=\"false\"\n        [ngModel]=\"activeYear\"\n        (ngModelChange)=\"updateYear($event)\"\n      >\n        <nz-option *ngFor=\"let year of years\" [nzLabel]=\"year.label\" [nzValue]=\"year.value\"></nz-option>\n      </nz-select>\n\n      <nz-select\n        *ngIf=\"mode === 'month'\"\n        class=\"ant-picker-calendar-month-select\"\n        [nzSize]=\"size\"\n        [nzDropdownMatchSelectWidth]=\"false\"\n        [ngModel]=\"activeMonth\"\n        (ngModelChange)=\"monthChange.emit($event)\"\n      >\n        <nz-option *ngFor=\"let month of months\" [nzLabel]=\"month.label\" [nzValue]=\"month.value\"></nz-option>\n      </nz-select>\n\n      <nz-radio-group class=\"ant-picker-calendar-mode-switch\" [(ngModel)]=\"mode\" (ngModelChange)=\"modeChange.emit($event)\" [nzSize]=\"size\">\n        <label nz-radio-button nzValue=\"month\">{{ monthTypeText }}</label>\n        <label nz-radio-button nzValue=\"year\">{{ yearTypeText }}</label>\n      </nz-radio-group>\n    </div>\n  ",
                        host: {
                            '[style.display]': "'block'",
                            '[class.ant-fullcalendar-header]': "true"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCalendarHeaderComponent.ctorParameters = function () { return [
            { type: i18n.NzI18nService },
            { type: i18n.DateHelperService }
        ]; };
        NzCalendarHeaderComponent.propDecorators = {
            mode: [{ type: core.Input }],
            fullscreen: [{ type: core.Input }],
            activeDate: [{ type: core.Input }],
            modeChange: [{ type: core.Output }],
            yearChange: [{ type: core.Output }],
            monthChange: [{ type: core.Output }]
        };
        return NzCalendarHeaderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.mode;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.fullscreen;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.activeDate;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.modeChange;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.yearChange;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.monthChange;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.yearOffset;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.yearTotal;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.years;
        /** @type {?} */
        NzCalendarHeaderComponent.prototype.months;
        /**
         * @type {?}
         * @private
         */
        NzCalendarHeaderComponent.prototype.i18n;
        /**
         * @type {?}
         * @private
         */
        NzCalendarHeaderComponent.prototype.dateHelper;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: calendar.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCalendarComponent = /** @class */ (function () {
        function NzCalendarComponent(cdr) {
            this.cdr = cdr;
            this.activeDate = new time.CandyDate();
            this.prefixCls = 'ant-picker-calendar';
            this.onChangeFn = (/**
             * @return {?}
             */
            function () { });
            this.onTouchFn = (/**
             * @return {?}
             */
            function () { });
            this.nzMode = 'month';
            this.nzModeChange = new core.EventEmitter();
            this.nzPanelChange = new core.EventEmitter();
            this.nzSelectChange = new core.EventEmitter();
            this.nzValueChange = new core.EventEmitter();
            this.nzFullscreen = true;
        }
        Object.defineProperty(NzCalendarComponent.prototype, "dateCell", {
            get: /**
             * @return {?}
             */
            function () {
                return (/** @type {?} */ ((this.nzDateCell || this.nzDateCellChild)));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarComponent.prototype, "dateFullCell", {
            get: /**
             * @return {?}
             */
            function () {
                return (/** @type {?} */ ((this.nzDateFullCell || this.nzDateFullCellChild)));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarComponent.prototype, "monthCell", {
            get: /**
             * @return {?}
             */
            function () {
                return (/** @type {?} */ ((this.nzMonthCell || this.nzMonthCellChild)));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCalendarComponent.prototype, "monthFullCell", {
            get: /**
             * @return {?}
             */
            function () {
                return (/** @type {?} */ ((this.nzMonthFullCell || this.nzMonthFullCellChild)));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} mode
         * @return {?}
         */
        NzCalendarComponent.prototype.onModeChange = /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this.nzModeChange.emit(mode);
            this.nzPanelChange.emit({ date: this.activeDate.nativeDate, mode: mode });
        };
        /**
         * @param {?} year
         * @return {?}
         */
        NzCalendarComponent.prototype.onYearSelect = /**
         * @param {?} year
         * @return {?}
         */
        function (year) {
            /** @type {?} */
            var date = this.activeDate.setYear(year);
            this.updateDate(date);
        };
        /**
         * @param {?} month
         * @return {?}
         */
        NzCalendarComponent.prototype.onMonthSelect = /**
         * @param {?} month
         * @return {?}
         */
        function (month) {
            /** @type {?} */
            var date = this.activeDate.setMonth(month);
            this.updateDate(date);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NzCalendarComponent.prototype.onDateSelect = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            // Only activeDate is enough in calendar
            // this.value = date;
            this.updateDate(date);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzCalendarComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.updateDate(new time.CandyDate((/** @type {?} */ (value))), false);
            this.cdr.markForCheck();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzCalendarComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChangeFn = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzCalendarComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouchFn = fn;
        };
        /**
         * @private
         * @param {?} date
         * @param {?=} touched
         * @return {?}
         */
        NzCalendarComponent.prototype.updateDate = /**
         * @private
         * @param {?} date
         * @param {?=} touched
         * @return {?}
         */
        function (date, touched) {
            if (touched === void 0) { touched = true; }
            this.activeDate = date;
            if (touched) {
                this.onChangeFn(date.nativeDate);
                this.onTouchFn();
                this.nzSelectChange.emit(date.nativeDate);
                this.nzValueChange.emit(date.nativeDate);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzCalendarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzValue) {
                this.updateDate(new time.CandyDate(this.nzValue), false);
            }
        };
        NzCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-calendar',
                        exportAs: 'nzCalendar',
                        template: "\n    <nz-calendar-header\n      [fullscreen]=\"nzFullscreen\"\n      [activeDate]=\"activeDate\"\n      [(mode)]=\"nzMode\"\n      (modeChange)=\"onModeChange($event)\"\n      (yearChange)=\"onYearSelect($event)\"\n      (monthChange)=\"onMonthSelect($event)\"\n    >\n    </nz-calendar-header>\n\n    <div class=\"ant-picker-panel\">\n      <div class=\"ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel\">\n        <div class=\"ant-picker-body\">\n          <ng-container *ngIf=\"nzMode === 'month'; then monthModeTable; else yearModeTable\"></ng-container>\n        </div>\n      </div>\n    </div>\n    <ng-template #monthModeTable>\n      <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->\n      <date-table\n        [prefixCls]=\"prefixCls\"\n        [value]=\"activeDate\"\n        [activeDate]=\"activeDate\"\n        [cellRender]=\"$any(dateCell)\"\n        [fullCellRender]=\"$any(dateFullCell)\"\n        [disabledDate]=\"nzDisabledDate\"\n        (valueChange)=\"onDateSelect($event)\"\n      ></date-table>\n    </ng-template>\n\n    <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->\n    <ng-template #yearModeTable>\n      <month-table\n        [prefixCls]=\"prefixCls\"\n        [value]=\"activeDate\"\n        [activeDate]=\"activeDate\"\n        [cellRender]=\"$any(monthCell)\"\n        [fullCellRender]=\"$any(monthFullCell)\"\n        (valueChange)=\"onDateSelect($event)\"\n      ></month-table>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-picker-calendar]': 'true',
                            '[class.ant-picker-calendar-full]': 'nzFullscreen',
                            '[class.ant-picker-calendar-mini]': '!nzFullscreen'
                        },
                        providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzCalendarComponent; })), multi: true }]
                    }] }
        ];
        /** @nocollapse */
        NzCalendarComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzCalendarComponent.propDecorators = {
            nzMode: [{ type: core.Input }],
            nzValue: [{ type: core.Input }],
            nzDisabledDate: [{ type: core.Input }],
            nzModeChange: [{ type: core.Output }],
            nzPanelChange: [{ type: core.Output }],
            nzSelectChange: [{ type: core.Output }],
            nzValueChange: [{ type: core.Output }],
            nzDateCell: [{ type: core.Input }],
            nzDateCellChild: [{ type: core.ContentChild, args: [NzDateCellDirective, { static: false, read: core.TemplateRef },] }],
            nzDateFullCell: [{ type: core.Input }],
            nzDateFullCellChild: [{ type: core.ContentChild, args: [NzDateFullCellDirective, { static: false, read: core.TemplateRef },] }],
            nzMonthCell: [{ type: core.Input }],
            nzMonthCellChild: [{ type: core.ContentChild, args: [NzMonthCellDirective, { static: false, read: core.TemplateRef },] }],
            nzMonthFullCell: [{ type: core.Input }],
            nzMonthFullCellChild: [{ type: core.ContentChild, args: [NzMonthFullCellDirective, { static: false, read: core.TemplateRef },] }],
            nzFullscreen: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCalendarComponent.prototype, "nzFullscreen", void 0);
        return NzCalendarComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCalendarComponent.ngAcceptInputType_nzFullscreen;
        /** @type {?} */
        NzCalendarComponent.prototype.activeDate;
        /** @type {?} */
        NzCalendarComponent.prototype.prefixCls;
        /**
         * @type {?}
         * @private
         */
        NzCalendarComponent.prototype.onChangeFn;
        /**
         * @type {?}
         * @private
         */
        NzCalendarComponent.prototype.onTouchFn;
        /** @type {?} */
        NzCalendarComponent.prototype.nzMode;
        /** @type {?} */
        NzCalendarComponent.prototype.nzValue;
        /** @type {?} */
        NzCalendarComponent.prototype.nzDisabledDate;
        /** @type {?} */
        NzCalendarComponent.prototype.nzModeChange;
        /** @type {?} */
        NzCalendarComponent.prototype.nzPanelChange;
        /** @type {?} */
        NzCalendarComponent.prototype.nzSelectChange;
        /** @type {?} */
        NzCalendarComponent.prototype.nzValueChange;
        /**
         * Cannot use \@Input and \@ContentChild on one variable
         * because { static: false } will make \@Input property get delayed
         *
         * @type {?}
         */
        NzCalendarComponent.prototype.nzDateCell;
        /** @type {?} */
        NzCalendarComponent.prototype.nzDateCellChild;
        /** @type {?} */
        NzCalendarComponent.prototype.nzDateFullCell;
        /** @type {?} */
        NzCalendarComponent.prototype.nzDateFullCellChild;
        /** @type {?} */
        NzCalendarComponent.prototype.nzMonthCell;
        /** @type {?} */
        NzCalendarComponent.prototype.nzMonthCellChild;
        /** @type {?} */
        NzCalendarComponent.prototype.nzMonthFullCell;
        /** @type {?} */
        NzCalendarComponent.prototype.nzMonthFullCellChild;
        /** @type {?} */
        NzCalendarComponent.prototype.nzFullscreen;
        /**
         * @type {?}
         * @private
         */
        NzCalendarComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: calendar.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCalendarModule = /** @class */ (function () {
        function NzCalendarModule() {
        }
        NzCalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NzCalendarHeaderComponent,
                            NzCalendarComponent,
                            NzDateCellDirective,
                            NzDateFullCellDirective,
                            NzMonthCellDirective,
                            NzMonthFullCellDirective
                        ],
                        exports: [NzCalendarComponent, NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective],
                        imports: [common.CommonModule, forms.FormsModule, i18n.NzI18nModule, radio.NzRadioModule, select.NzSelectModule, datePicker.LibPackerModule]
                    },] }
        ];
        return NzCalendarModule;
    }());

    exports.NzCalendarComponent = NzCalendarComponent;
    exports.NzCalendarHeaderComponent = NzCalendarHeaderComponent;
    exports.NzCalendarModule = NzCalendarModule;
    exports.NzDateCellDirective = NzDateCellDirective;
    exports.NzDateFullCellDirective = NzDateFullCellDirective;
    exports.NzMonthCellDirective = NzMonthCellDirective;
    exports.NzMonthFullCellDirective = NzMonthFullCellDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-calendar.umd.js.map
