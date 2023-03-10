(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/cdk/scrolling'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/button'), require('ng-zorro-antd/checkbox'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/resize-observers'), require('ng-zorro-antd/dropdown'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/menu'), require('ng-zorro-antd/pagination'), require('ng-zorro-antd/radio'), require('ng-zorro-antd/spin'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/config')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/table', ['exports', '@angular/cdk/platform', '@angular/cdk/scrolling', '@angular/common', '@angular/core', '@angular/forms', 'ng-zorro-antd/button', 'ng-zorro-antd/checkbox', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/resize-observers', 'ng-zorro-antd/dropdown', 'ng-zorro-antd/empty', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon', 'ng-zorro-antd/menu', 'ng-zorro-antd/pagination', 'ng-zorro-antd/radio', 'ng-zorro-antd/spin', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].table = {}), global.ng.cdk.platform, global.ng.cdk.scrolling, global.ng.common, global.ng.core, global.ng.forms, global['ng-zorro-antd'].button, global['ng-zorro-antd'].checkbox, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core['resize-observers'], global['ng-zorro-antd'].dropdown, global['ng-zorro-antd'].empty, global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].menu, global['ng-zorro-antd'].pagination, global['ng-zorro-antd'].radio, global['ng-zorro-antd'].spin, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.config));
}(this, (function (exports, platform, scrolling, common, core, forms, button, checkbox, outlet, resizeObservers, dropdown, empty, i18n, icon, menu, pagination, radio, spin, rxjs, operators, util, logger, services, config) { 'use strict';

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
     * Generated from: src/addon/filter-trigger.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzFilterTriggerComponent = /** @class */ (function () {
        function NzFilterTriggerComponent(cdr) {
            this.cdr = cdr;
            this.nzActive = false;
            this.nzVisible = false;
            this.nzVisibleChange = new core.EventEmitter();
        }
        /**
         * @param {?} visible
         * @return {?}
         */
        NzFilterTriggerComponent.prototype.onVisibleChange = /**
         * @param {?} visible
         * @return {?}
         */
        function (visible) {
            this.nzVisible = visible;
            this.nzVisibleChange.next(visible);
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        NzFilterTriggerComponent.prototype.onFilterClick = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            $event.stopPropagation();
        };
        /**
         * @return {?}
         */
        NzFilterTriggerComponent.prototype.hide = /**
         * @return {?}
         */
        function () {
            this.nzVisible = false;
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzFilterTriggerComponent.prototype.show = /**
         * @return {?}
         */
        function () {
            this.nzVisible = true;
            this.cdr.markForCheck();
        };
        NzFilterTriggerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-filter-trigger',
                        exportAs: "nzFilterTrigger",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <span\n      nz-dropdown\n      class=\"ant-table-filter-trigger\"\n      nzTrigger=\"click\"\n      nzPlacement=\"bottomRight\"\n      [nzClickHide]=\"false\"\n      [nzDropdownMenu]=\"nzDropdownMenu\"\n      [class.active]=\"nzActive\"\n      [class.ant-table-filter-open]=\"nzVisible\"\n      [nzVisible]=\"nzVisible\"\n      (nzVisibleChange)=\"onVisibleChange($event)\"\n      (click)=\"onFilterClick($event)\"\n    >\n      <ng-content></ng-content>\n    </span>\n  ",
                        host: {
                            '[class.ant-table-filter-trigger-container]': 'true',
                            '[class.ant-table-filter-trigger-container-open]': 'nzVisible'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzFilterTriggerComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzFilterTriggerComponent.propDecorators = {
            nzActive: [{ type: core.Input }],
            nzDropdownMenu: [{ type: core.Input }],
            nzVisible: [{ type: core.Input }],
            nzVisibleChange: [{ type: core.Output }]
        };
        return NzFilterTriggerComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFilterTriggerComponent.prototype.nzActive;
        /** @type {?} */
        NzFilterTriggerComponent.prototype.nzDropdownMenu;
        /** @type {?} */
        NzFilterTriggerComponent.prototype.nzVisible;
        /** @type {?} */
        NzFilterTriggerComponent.prototype.nzVisibleChange;
        /**
         * @type {?}
         * @private
         */
        NzFilterTriggerComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/addon/filter.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzThItemInterface() { }
    if (false) {
        /** @type {?} */
        NzThItemInterface.prototype.text;
        /** @type {?} */
        NzThItemInterface.prototype.value;
        /** @type {?} */
        NzThItemInterface.prototype.checked;
    }
    var NzTableFilterComponent = /** @class */ (function () {
        function NzTableFilterComponent(cdr, i18n) {
            this.cdr = cdr;
            this.i18n = i18n;
            this.contentTemplate = null;
            this.customFilter = false;
            this.extraTemplate = null;
            this.filterMultiple = true;
            this.listOfFilter = [];
            this.filterChange = new core.EventEmitter();
            this.destroy$ = new rxjs.Subject();
            this.isChanged = false;
            this.isChecked = false;
            this.isVisible = false;
            this.listOfParsedFilter = [];
        }
        /**
         * @param {?} _
         * @param {?} item
         * @return {?}
         */
        NzTableFilterComponent.prototype.trackByValue = /**
         * @param {?} _
         * @param {?} item
         * @return {?}
         */
        function (_, item) {
            return item.value;
        };
        /**
         * @param {?} filter
         * @return {?}
         */
        NzTableFilterComponent.prototype.check = /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this.isChanged = true;
            if (this.filterMultiple) {
                this.listOfParsedFilter = this.listOfParsedFilter.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item === filter) {
                        return __assign(__assign({}, item), { checked: !filter.checked });
                    }
                    else {
                        return item;
                    }
                }));
                filter.checked = !filter.checked;
            }
            else {
                this.listOfParsedFilter = this.listOfParsedFilter.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return __assign(__assign({}, item), { checked: item === filter });
                }));
            }
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        };
        /**
         * @return {?}
         */
        NzTableFilterComponent.prototype.confirm = /**
         * @return {?}
         */
        function () {
            this.isVisible = false;
            this.emitFilterData();
        };
        /**
         * @return {?}
         */
        NzTableFilterComponent.prototype.reset = /**
         * @return {?}
         */
        function () {
            this.isChanged = true;
            this.isVisible = false;
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
            this.emitFilterData();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTableFilterComponent.prototype.onVisibleChange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isVisible = value;
            if (!value) {
                this.emitFilterData();
            }
        };
        /**
         * @return {?}
         */
        NzTableFilterComponent.prototype.emitFilterData = /**
         * @return {?}
         */
        function () {
            if (this.isChanged) {
                /** @type {?} */
                var listOfChecked = this.listOfParsedFilter.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.checked; })).map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.value; }));
                if (this.filterMultiple) {
                    this.filterChange.emit(listOfChecked);
                }
                else {
                    this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
                }
                this.isChanged = false;
            }
        };
        /**
         * @param {?} listOfFilter
         * @param {?=} reset
         * @return {?}
         */
        NzTableFilterComponent.prototype.parseListOfFilter = /**
         * @param {?} listOfFilter
         * @param {?=} reset
         * @return {?}
         */
        function (listOfFilter, reset) {
            return listOfFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var checked = reset ? false : !!item.byDefault;
                return { text: item.text, value: item.value, checked: checked };
            }));
        };
        /**
         * @param {?} listOfParsedFilter
         * @return {?}
         */
        NzTableFilterComponent.prototype.getCheckedStatus = /**
         * @param {?} listOfParsedFilter
         * @return {?}
         */
        function (listOfParsedFilter) {
            return listOfParsedFilter.some((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.checked; }));
        };
        /**
         * @return {?}
         */
        NzTableFilterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.locale = _this.i18n.getLocaleData('Table');
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTableFilterComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var listOfFilter = changes.listOfFilter;
            if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
                this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
                this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
            }
        };
        /**
         * @return {?}
         */
        NzTableFilterComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTableFilterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table-filter',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <span class=\"ant-table-filter-column-title\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </span>\n    <ng-container *ngIf=\"!customFilter; else extraTemplate\">\n      <nz-filter-trigger\n        [nzVisible]=\"isVisible\"\n        [nzActive]=\"isChecked\"\n        [nzDropdownMenu]=\"filterMenu\"\n        (nzVisibleChange)=\"onVisibleChange($event)\"\n      >\n        <i nz-icon nzType=\"filter\" nzTheme=\"fill\"></i>\n      </nz-filter-trigger>\n      <nz-dropdown-menu #filterMenu=\"nzDropdownMenu\">\n        <div class=\"ant-table-filter-dropdown\">\n          <ul nz-menu>\n            <li nz-menu-item [nzSelected]=\"f.checked\" *ngFor=\"let f of listOfParsedFilter; trackBy: trackByValue\" (click)=\"check(f)\">\n              <label nz-radio *ngIf=\"!filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <label nz-checkbox *ngIf=\"filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <span>{{ f.text }}</span>\n            </li>\n          </ul>\n          <div class=\"ant-table-filter-dropdown-btns\">\n            <button nz-button nzType=\"link\" nzSize=\"small\" (click)=\"reset()\" [disabled]=\"!isChecked\">{{ locale.filterReset }}</button>\n            <button nz-button nzType=\"primary\" nzSize=\"small\" (click)=\"confirm()\">{{ locale.filterConfirm }}</button>\n          </div>\n        </div>\n      </nz-dropdown-menu>\n    </ng-container>\n  ",
                        host: {
                            '[class.ant-table-filter-column]': 'true'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTableFilterComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: i18n.NzI18nService }
        ]; };
        NzTableFilterComponent.propDecorators = {
            contentTemplate: [{ type: core.Input }],
            customFilter: [{ type: core.Input }],
            extraTemplate: [{ type: core.Input }],
            filterMultiple: [{ type: core.Input }],
            listOfFilter: [{ type: core.Input }],
            filterChange: [{ type: core.Output }]
        };
        return NzTableFilterComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableFilterComponent.prototype.contentTemplate;
        /** @type {?} */
        NzTableFilterComponent.prototype.customFilter;
        /** @type {?} */
        NzTableFilterComponent.prototype.extraTemplate;
        /** @type {?} */
        NzTableFilterComponent.prototype.filterMultiple;
        /** @type {?} */
        NzTableFilterComponent.prototype.listOfFilter;
        /** @type {?} */
        NzTableFilterComponent.prototype.filterChange;
        /**
         * @type {?}
         * @private
         */
        NzTableFilterComponent.prototype.destroy$;
        /** @type {?} */
        NzTableFilterComponent.prototype.locale;
        /** @type {?} */
        NzTableFilterComponent.prototype.isChanged;
        /** @type {?} */
        NzTableFilterComponent.prototype.isChecked;
        /** @type {?} */
        NzTableFilterComponent.prototype.isVisible;
        /** @type {?} */
        NzTableFilterComponent.prototype.listOfParsedFilter;
        /**
         * @type {?}
         * @private
         */
        NzTableFilterComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTableFilterComponent.prototype.i18n;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/addon/row-expand-button.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRowExpandButtonDirective = /** @class */ (function () {
        function NzRowExpandButtonDirective() {
            this.expand = false;
            this.spaceMode = false;
            this.expandChange = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NzRowExpandButtonDirective.prototype.onHostClick = /**
         * @return {?}
         */
        function () {
            if (!this.spaceMode) {
                this.expand = !this.expand;
                this.expandChange.next(this.expand);
            }
        };
        NzRowExpandButtonDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'button[nz-row-expand-button]',
                        host: {
                            '[type]': "'button'",
                            '[class.ant-table-row-expand-icon]': 'true',
                            '[class.ant-table-row-expand-icon-expanded]': "!spaceMode && expand === true",
                            '[class.ant-table-row-expand-icon-collapsed]': "!spaceMode && expand === false",
                            '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
                            '(click)': 'onHostClick()'
                        }
                    },] }
        ];
        NzRowExpandButtonDirective.propDecorators = {
            expand: [{ type: core.Input }],
            spaceMode: [{ type: core.Input }],
            expandChange: [{ type: core.Output }]
        };
        return NzRowExpandButtonDirective;
    }());
    if (false) {
        /** @type {?} */
        NzRowExpandButtonDirective.prototype.expand;
        /** @type {?} */
        NzRowExpandButtonDirective.prototype.spaceMode;
        /** @type {?} */
        NzRowExpandButtonDirective.prototype.expandChange;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/addon/row-indent.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRowIndentDirective = /** @class */ (function () {
        function NzRowIndentDirective() {
            this.indentSize = 0;
        }
        NzRowIndentDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-row-indent',
                        host: {
                            '[class.ant-table-row-indent]': 'true',
                            '[style.padding-left.px]': 'indentSize'
                        }
                    },] }
        ];
        NzRowIndentDirective.propDecorators = {
            indentSize: [{ type: core.Input }]
        };
        return NzRowIndentDirective;
    }());
    if (false) {
        /** @type {?} */
        NzRowIndentDirective.prototype.indentSize;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/addon/selection.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableSelectionComponent = /** @class */ (function () {
        function NzTableSelectionComponent() {
            this.listOfSelections = [];
            this.checked = false;
            this.disabled = false;
            this.indeterminate = false;
            this.showCheckbox = false;
            this.showRowSelection = false;
            this.checkedChange = new core.EventEmitter();
        }
        /**
         * @param {?} checked
         * @return {?}
         */
        NzTableSelectionComponent.prototype.onCheckedChange = /**
         * @param {?} checked
         * @return {?}
         */
        function (checked) {
            this.checked = checked;
            this.checkedChange.emit(checked);
        };
        NzTableSelectionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table-selection',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <label\n      *ngIf=\"showCheckbox\"\n      nz-checkbox\n      [class.ant-table-selection-select-all-custom]=\"showRowSelection\"\n      [ngModel]=\"checked\"\n      [nzDisabled]=\"disabled\"\n      [nzIndeterminate]=\"indeterminate\"\n      (ngModelChange)=\"onCheckedChange($event)\"\n    >\n    </label>\n    <div class=\"ant-table-selection-extra\" *ngIf=\"showRowSelection\">\n      <span nz-dropdown class=\"ant-table-selection-down\" nzPlacement=\"bottomLeft\" [nzDropdownMenu]=\"selectionMenu\">\n        <i nz-icon nzType=\"down\"></i>\n      </span>\n      <nz-dropdown-menu #selectionMenu=\"nzDropdownMenu\">\n        <ul nz-menu class=\"ant-table-selection-menu\">\n          <li nz-menu-item *ngFor=\"let selection of listOfSelections\" (click)=\"selection.onSelect()\">\n            {{ selection.text }}\n          </li>\n        </ul>\n      </nz-dropdown-menu>\n    </div>\n  ",
                        host: {
                            '[class.ant-table-selection]': 'true'
                        }
                    }] }
        ];
        NzTableSelectionComponent.propDecorators = {
            listOfSelections: [{ type: core.Input }],
            checked: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            indeterminate: [{ type: core.Input }],
            showCheckbox: [{ type: core.Input }],
            showRowSelection: [{ type: core.Input }],
            checkedChange: [{ type: core.Output }]
        };
        return NzTableSelectionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableSelectionComponent.prototype.listOfSelections;
        /** @type {?} */
        NzTableSelectionComponent.prototype.checked;
        /** @type {?} */
        NzTableSelectionComponent.prototype.disabled;
        /** @type {?} */
        NzTableSelectionComponent.prototype.indeterminate;
        /** @type {?} */
        NzTableSelectionComponent.prototype.showCheckbox;
        /** @type {?} */
        NzTableSelectionComponent.prototype.showRowSelection;
        /** @type {?} */
        NzTableSelectionComponent.prototype.checkedChange;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/addon/sorters.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableSortersComponent = /** @class */ (function () {
        function NzTableSortersComponent() {
            this.sortDirections = ['ascend', 'descend', null];
            this.sortOrder = null;
            this.contentTemplate = null;
            this.isUp = false;
            this.isDown = false;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTableSortersComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var sortDirections = changes.sortDirections;
            if (sortDirections) {
                this.isUp = this.sortDirections.indexOf('ascend') !== -1;
                this.isDown = this.sortDirections.indexOf('descend') !== -1;
            }
        };
        NzTableSortersComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table-sorters',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <span><ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template></span>\n    <span class=\"ant-table-column-sorter\" [class.ant-table-column-sorter-full]=\"isDown && isUp\">\n      <span class=\"ant-table-column-sorter-inner\">\n        <i nz-icon nzType=\"caret-up\" *ngIf=\"isUp\" class=\"ant-table-column-sorter-up\" [class.active]=\"sortOrder == 'ascend'\"></i>\n        <i nz-icon nzType=\"caret-down\" *ngIf=\"isDown\" class=\"ant-table-column-sorter-down\" [class.active]=\"sortOrder == 'descend'\"></i>\n      </span>\n    </span>\n  ",
                        host: {
                            '[class.ant-table-column-sorters]': 'true'
                        }
                    }] }
        ];
        NzTableSortersComponent.propDecorators = {
            sortDirections: [{ type: core.Input }],
            sortOrder: [{ type: core.Input }],
            contentTemplate: [{ type: core.Input }]
        };
        return NzTableSortersComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableSortersComponent.prototype.sortDirections;
        /** @type {?} */
        NzTableSortersComponent.prototype.sortOrder;
        /** @type {?} */
        NzTableSortersComponent.prototype.contentTemplate;
        /** @type {?} */
        NzTableSortersComponent.prototype.isUp;
        /** @type {?} */
        NzTableSortersComponent.prototype.isDown;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/cell/cell-fixed.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCellFixedDirective = /** @class */ (function () {
        function NzCellFixedDirective(renderer, elementRef) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.nzRight = false;
            this.nzLeft = false;
            this.colspan = null;
            this.colSpan = null;
            this.changes$ = new rxjs.Subject();
            this.isAutoLeft = false;
            this.isAutoRight = false;
            this.isFixedLeft = false;
            this.isFixedRight = false;
            this.isFixed = false;
        }
        /**
         * @param {?} autoLeft
         * @return {?}
         */
        NzCellFixedDirective.prototype.setAutoLeftWidth = /**
         * @param {?} autoLeft
         * @return {?}
         */
        function (autoLeft) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
        };
        /**
         * @param {?} autoRight
         * @return {?}
         */
        NzCellFixedDirective.prototype.setAutoRightWidth = /**
         * @param {?} autoRight
         * @return {?}
         */
        function (autoRight) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
        };
        /**
         * @param {?} isFirstRight
         * @return {?}
         */
        NzCellFixedDirective.prototype.setIsFirstRight = /**
         * @param {?} isFirstRight
         * @return {?}
         */
        function (isFirstRight) {
            this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
        };
        /**
         * @param {?} isLastLeft
         * @return {?}
         */
        NzCellFixedDirective.prototype.setIsLastLeft = /**
         * @param {?} isLastLeft
         * @return {?}
         */
        function (isLastLeft) {
            this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
        };
        /**
         * @private
         * @param {?} flag
         * @param {?} className
         * @return {?}
         */
        NzCellFixedDirective.prototype.setFixClass = /**
         * @private
         * @param {?} flag
         * @param {?} className
         * @return {?}
         */
        function (flag, className) {
            // the setFixClass function may call many times, so remove it first.
            this.renderer.removeClass(this.elementRef.nativeElement, className);
            if (flag) {
                this.renderer.addClass(this.elementRef.nativeElement, className);
            }
        };
        /**
         * @return {?}
         */
        NzCellFixedDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.setIsFirstRight(false);
            this.setIsLastLeft(false);
            this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
            this.isAutoRight = this.nzRight === '' || this.nzRight === true;
            this.isFixedLeft = this.nzLeft !== false;
            this.isFixedRight = this.nzRight !== false;
            this.isFixed = this.isFixedLeft || this.isFixedRight;
            /** @type {?} */
            var validatePx = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (typeof value === 'string' && value !== '') {
                    return value;
                }
                else {
                    return null;
                }
            });
            this.setAutoLeftWidth(validatePx(this.nzLeft));
            this.setAutoRightWidth(validatePx(this.nzRight));
            this.changes$.next();
        };
        NzCellFixedDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                        host: {
                            '[class.ant-table-cell-fix-right]': "isFixedRight",
                            '[class.ant-table-cell-fix-left]': "isFixedLeft",
                            '[style.position]': "isFixed? 'sticky' : null"
                        }
                    },] }
        ];
        /** @nocollapse */
        NzCellFixedDirective.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        NzCellFixedDirective.propDecorators = {
            nzRight: [{ type: core.Input }],
            nzLeft: [{ type: core.Input }],
            colspan: [{ type: core.Input }],
            colSpan: [{ type: core.Input }]
        };
        return NzCellFixedDirective;
    }());
    if (false) {
        /** @type {?} */
        NzCellFixedDirective.prototype.nzRight;
        /** @type {?} */
        NzCellFixedDirective.prototype.nzLeft;
        /** @type {?} */
        NzCellFixedDirective.prototype.colspan;
        /** @type {?} */
        NzCellFixedDirective.prototype.colSpan;
        /** @type {?} */
        NzCellFixedDirective.prototype.changes$;
        /** @type {?} */
        NzCellFixedDirective.prototype.isAutoLeft;
        /** @type {?} */
        NzCellFixedDirective.prototype.isAutoRight;
        /** @type {?} */
        NzCellFixedDirective.prototype.isFixedLeft;
        /** @type {?} */
        NzCellFixedDirective.prototype.isFixedRight;
        /** @type {?} */
        NzCellFixedDirective.prototype.isFixed;
        /**
         * @type {?}
         * @private
         */
        NzCellFixedDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzCellFixedDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table-style.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableStyleService = /** @class */ (function () {
        function NzTableStyleService() {
            this.theadTemplate$ = new rxjs.ReplaySubject(1);
            this.hasFixLeft$ = new rxjs.ReplaySubject(1);
            this.hasFixRight$ = new rxjs.ReplaySubject(1);
            this.hostWidth$ = new rxjs.ReplaySubject(1);
            this.columnCount$ = new rxjs.ReplaySubject(1);
            this.showEmpty$ = new rxjs.ReplaySubject(1);
            this.noResult$ = new rxjs.ReplaySubject(1);
            this.listOfThWidthConfigPx$ = new rxjs.BehaviorSubject([]);
            this.tableWidthConfigPx$ = new rxjs.BehaviorSubject([]);
            this.manualWidthConfigPx$ = rxjs.combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), widthConfig = _b[0], listOfWidth = _b[1];
                return (widthConfig.length ? widthConfig : listOfWidth);
            })));
            this.listOfAutoWidthPx$ = new rxjs.ReplaySubject(1);
            this.listOfListOfThWidthPx$ = rxjs.merge(
            /** init with manual width **/
            this.manualWidthConfigPx$, rxjs.combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), autoWidth = _b[0], manualWidth = _b[1];
                /** use autoWidth until column length match **/
                if (autoWidth.length === manualWidth.length) {
                    return autoWidth.map((/**
                     * @param {?} width
                     * @param {?} index
                     * @return {?}
                     */
                    function (width, index) {
                        if (width === '0px') {
                            return manualWidth[index] || null;
                        }
                        else {
                            return manualWidth[index] || width;
                        }
                    }));
                }
                else {
                    return manualWidth;
                }
            }))));
            this.listOfMeasureColumn$ = new rxjs.ReplaySubject(1);
            this.listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(operators.map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return list.map((/**
             * @param {?} width
             * @return {?}
             */
            function (width) { return parseInt(width, 10); })); })));
            this.enableAutoMeasure$ = new rxjs.ReplaySubject(1);
        }
        /**
         * @param {?} template
         * @return {?}
         */
        NzTableStyleService.prototype.setTheadTemplate = /**
         * @param {?} template
         * @return {?}
         */
        function (template) {
            this.theadTemplate$.next(template);
        };
        /**
         * @param {?} hasFixLeft
         * @return {?}
         */
        NzTableStyleService.prototype.setHasFixLeft = /**
         * @param {?} hasFixLeft
         * @return {?}
         */
        function (hasFixLeft) {
            this.hasFixLeft$.next(hasFixLeft);
        };
        /**
         * @param {?} hasFixRight
         * @return {?}
         */
        NzTableStyleService.prototype.setHasFixRight = /**
         * @param {?} hasFixRight
         * @return {?}
         */
        function (hasFixRight) {
            this.hasFixRight$.next(hasFixRight);
        };
        /**
         * @param {?} widthConfig
         * @return {?}
         */
        NzTableStyleService.prototype.setTableWidthConfig = /**
         * @param {?} widthConfig
         * @return {?}
         */
        function (widthConfig) {
            this.tableWidthConfigPx$.next(widthConfig);
        };
        /**
         * @param {?} listOfTh
         * @return {?}
         */
        NzTableStyleService.prototype.setListOfTh = /**
         * @param {?} listOfTh
         * @return {?}
         */
        function (listOfTh) {
            /** @type {?} */
            var columnCount = 0;
            listOfTh.forEach((/**
             * @param {?} th
             * @return {?}
             */
            function (th) {
                columnCount += (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
            }));
            /** @type {?} */
            var listOfThPx = listOfTh.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.nzWidth; }));
            this.columnCount$.next(columnCount);
            this.listOfThWidthConfigPx$.next(listOfThPx);
        };
        /**
         * @param {?} listOfTh
         * @return {?}
         */
        NzTableStyleService.prototype.setListOfMeasureColumn = /**
         * @param {?} listOfTh
         * @return {?}
         */
        function (listOfTh) {
            /** @type {?} */
            var listOfKeys = [];
            listOfTh.forEach((/**
             * @param {?} th
             * @return {?}
             */
            function (th) {
                /** @type {?} */
                var length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
                for (var i = 0; i < length; i++) {
                    listOfKeys.push("measure_key_" + i);
                }
            }));
            this.listOfMeasureColumn$.next(listOfKeys);
        };
        /**
         * @param {?} listOfAutoWidth
         * @return {?}
         */
        NzTableStyleService.prototype.setListOfAutoWidth = /**
         * @param {?} listOfAutoWidth
         * @return {?}
         */
        function (listOfAutoWidth) {
            this.listOfAutoWidthPx$.next(listOfAutoWidth.map((/**
             * @param {?} width
             * @return {?}
             */
            function (width) { return width + "px"; })));
        };
        /**
         * @param {?} showEmpty
         * @return {?}
         */
        NzTableStyleService.prototype.setShowEmpty = /**
         * @param {?} showEmpty
         * @return {?}
         */
        function (showEmpty) {
            this.showEmpty$.next(showEmpty);
        };
        /**
         * @param {?} noResult
         * @return {?}
         */
        NzTableStyleService.prototype.setNoResult = /**
         * @param {?} noResult
         * @return {?}
         */
        function (noResult) {
            this.noResult$.next(noResult);
        };
        /**
         * @param {?} scrollX
         * @param {?} scrollY
         * @return {?}
         */
        NzTableStyleService.prototype.setScroll = /**
         * @param {?} scrollX
         * @param {?} scrollY
         * @return {?}
         */
        function (scrollX, scrollY) {
            /** @type {?} */
            var enableAutoMeasure = !!(scrollX || scrollY);
            if (!enableAutoMeasure) {
                this.setListOfAutoWidth([]);
            }
            this.enableAutoMeasure$.next(enableAutoMeasure);
        };
        NzTableStyleService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NzTableStyleService.ctorParameters = function () { return []; };
        return NzTableStyleService;
    }());
    if (false) {
        /** @type {?} */
        NzTableStyleService.prototype.theadTemplate$;
        /** @type {?} */
        NzTableStyleService.prototype.hasFixLeft$;
        /** @type {?} */
        NzTableStyleService.prototype.hasFixRight$;
        /** @type {?} */
        NzTableStyleService.prototype.hostWidth$;
        /** @type {?} */
        NzTableStyleService.prototype.columnCount$;
        /** @type {?} */
        NzTableStyleService.prototype.showEmpty$;
        /** @type {?} */
        NzTableStyleService.prototype.noResult$;
        /**
         * @type {?}
         * @private
         */
        NzTableStyleService.prototype.listOfThWidthConfigPx$;
        /**
         * @type {?}
         * @private
         */
        NzTableStyleService.prototype.tableWidthConfigPx$;
        /** @type {?} */
        NzTableStyleService.prototype.manualWidthConfigPx$;
        /**
         * @type {?}
         * @private
         */
        NzTableStyleService.prototype.listOfAutoWidthPx$;
        /** @type {?} */
        NzTableStyleService.prototype.listOfListOfThWidthPx$;
        /** @type {?} */
        NzTableStyleService.prototype.listOfMeasureColumn$;
        /** @type {?} */
        NzTableStyleService.prototype.listOfListOfThWidth$;
        /** @type {?} */
        NzTableStyleService.prototype.enableAutoMeasure$;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/cell/cell.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableCellDirective = /** @class */ (function () {
        function NzTableCellDirective(nzTableStyleService) {
            this.isInsideTable = false;
            this.isInsideTable = !!nzTableStyleService;
        }
        NzTableCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
                        host: {
                            '[class.ant-table-cell]': 'isInsideTable'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzTableCellDirective.ctorParameters = function () { return [
            { type: NzTableStyleService, decorators: [{ type: core.Optional }] }
        ]; };
        return NzTableCellDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTableCellDirective.prototype.isInsideTable;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/cell/td-addon.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTdAddOnComponent = /** @class */ (function () {
        function NzTdAddOnComponent() {
            this.nzChecked = false;
            this.nzDisabled = false;
            this.nzIndeterminate = false;
            this.nzIndentSize = 0;
            this.nzShowExpand = false;
            this.nzShowCheckbox = false;
            this.nzExpand = false;
            this.nzCheckedChange = new core.EventEmitter();
            this.nzExpandChange = new core.EventEmitter();
            this.isNzShowExpandChanged = false;
            this.isNzShowCheckboxChanged = false;
        }
        /**
         * @param {?} checked
         * @return {?}
         */
        NzTdAddOnComponent.prototype.onCheckedChange = /**
         * @param {?} checked
         * @return {?}
         */
        function (checked) {
            this.nzChecked = checked;
            this.nzCheckedChange.emit(checked);
        };
        /**
         * @param {?} expand
         * @return {?}
         */
        NzTdAddOnComponent.prototype.onExpandChange = /**
         * @param {?} expand
         * @return {?}
         */
        function (expand) {
            this.nzExpand = expand;
            this.nzExpandChange.emit(expand);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTdAddOnComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var isFirstChange = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value && value.firstChange && value.currentValue !== undefined; });
            var nzExpand = changes.nzExpand, nzChecked = changes.nzChecked, nzShowExpand = changes.nzShowExpand, nzShowCheckbox = changes.nzShowCheckbox;
            if (nzShowExpand) {
                this.isNzShowExpandChanged = true;
            }
            if (nzShowCheckbox) {
                this.isNzShowCheckboxChanged = true;
            }
            if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
                this.nzShowExpand = true;
            }
            if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
                this.nzShowCheckbox = true;
            }
        };
        NzTdAddOnComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <ng-container *ngIf=\"nzShowExpand || nzIndentSize > 0\">\n      <nz-row-indent [indentSize]=\"nzIndentSize\"></nz-row-indent>\n      <button nz-row-expand-button [expand]=\"nzExpand\" (expandChange)=\"onExpandChange($event)\" [spaceMode]=\"!nzShowExpand\"></button>\n    </ng-container>\n    <label\n      nz-checkbox\n      *ngIf=\"nzShowCheckbox\"\n      [nzDisabled]=\"nzDisabled\"\n      [ngModel]=\"nzChecked\"\n      [nzIndeterminate]=\"nzIndeterminate\"\n      (ngModelChange)=\"onCheckedChange($event)\"\n    >\n    </label>\n    <ng-content></ng-content>\n  ",
                        host: {
                            '[class.ant-table-cell-with-append]': "nzShowExpand || nzIndentSize > 0",
                            '[class.ant-table-selection-column]': "nzShowCheckbox"
                        }
                    }] }
        ];
        NzTdAddOnComponent.propDecorators = {
            nzChecked: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzIndeterminate: [{ type: core.Input }],
            nzIndentSize: [{ type: core.Input }],
            nzShowExpand: [{ type: core.Input }],
            nzShowCheckbox: [{ type: core.Input }],
            nzExpand: [{ type: core.Input }],
            nzCheckedChange: [{ type: core.Output }],
            nzExpandChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTdAddOnComponent.prototype, "nzShowExpand", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTdAddOnComponent.prototype, "nzShowCheckbox", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTdAddOnComponent.prototype, "nzExpand", void 0);
        return NzTdAddOnComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTdAddOnComponent.ngAcceptInputType_nzShowExpand;
        /** @type {?} */
        NzTdAddOnComponent.ngAcceptInputType_nzShowCheckbox;
        /** @type {?} */
        NzTdAddOnComponent.ngAcceptInputType_nzExpand;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzChecked;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzDisabled;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzIndeterminate;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzIndentSize;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzShowExpand;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzShowCheckbox;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzExpand;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzCheckedChange;
        /** @type {?} */
        NzTdAddOnComponent.prototype.nzExpandChange;
        /**
         * @type {?}
         * @private
         */
        NzTdAddOnComponent.prototype.isNzShowExpandChanged;
        /**
         * @type {?}
         * @private
         */
        NzTdAddOnComponent.prototype.isNzShowCheckboxChanged;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/cell/th-addon.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzThAddOnComponent = /** @class */ (function () {
        function NzThAddOnComponent(cdr) {
            this.cdr = cdr;
            this.manualClickOrder$ = new rxjs.Subject();
            this.calcOperatorChange$ = new rxjs.Subject();
            this.nzFilterValue = null;
            this.sortOrder = null;
            this.sortDirections = ['ascend', 'descend', null];
            this.sortOrderChange$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
            this.isNzShowSortChanged = false;
            this.isNzShowFilterChanged = false;
            this.nzFilterMultiple = true;
            this.nzSortOrder = null;
            this.nzSortPriority = false;
            this.nzSortDirections = ['ascend', 'descend', null];
            this.nzFilters = [];
            this.nzSortFn = null;
            this.nzFilterFn = null;
            this.nzShowSort = false;
            this.nzShowFilter = false;
            this.nzCustomFilter = false;
            this.nzCheckedChange = new core.EventEmitter();
            this.nzSortOrderChange = new core.EventEmitter();
            this.nzFilterChange = new core.EventEmitter();
            /**
             * @deprecated use nzSortOrder instead *
             */
            this.nzSort = null;
            /**
             * @deprecated use nzSortOrderChange instead *
             */
            this.nzSortChange = new core.EventEmitter();
        }
        /**
         * @param {?} sortDirections
         * @param {?} current
         * @return {?}
         */
        NzThAddOnComponent.prototype.getNextSortDirection = /**
         * @param {?} sortDirections
         * @param {?} current
         * @return {?}
         */
        function (sortDirections, current) {
            /** @type {?} */
            var index = sortDirections.indexOf(current);
            if (index === sortDirections.length - 1) {
                return sortDirections[0];
            }
            else {
                return sortDirections[index + 1];
            }
        };
        /**
         * @return {?}
         */
        NzThAddOnComponent.prototype.emitNextSortValue = /**
         * @return {?}
         */
        function () {
            if (this.nzShowSort) {
                /** @type {?} */
                var nextOrder = this.getNextSortDirection(this.sortDirections, (/** @type {?} */ (this.sortOrder)));
                this.setSortOrder(nextOrder);
                this.manualClickOrder$.next(this);
            }
        };
        /**
         * @param {?} order
         * @return {?}
         */
        NzThAddOnComponent.prototype.setSortOrder = /**
         * @param {?} order
         * @return {?}
         */
        function (order) {
            this.sortOrderChange$.next(order);
        };
        /**
         * @return {?}
         */
        NzThAddOnComponent.prototype.clearSortOrder = /**
         * @return {?}
         */
        function () {
            if (this.sortOrder !== null) {
                this.setSortOrder(null);
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzThAddOnComponent.prototype.onFilterValueChange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.nzFilterChange.emit(value);
            this.nzFilterValue = value;
            this.updateCalcOperator();
        };
        /**
         * @return {?}
         */
        NzThAddOnComponent.prototype.updateCalcOperator = /**
         * @return {?}
         */
        function () {
            this.calcOperatorChange$.next();
        };
        /**
         * @return {?}
         */
        NzThAddOnComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.sortOrderChange$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} order
             * @return {?}
             */
            function (order) {
                if (_this.sortOrder !== order) {
                    _this.sortOrder = order;
                    _this.nzSortChange.emit(order);
                    _this.nzSortOrderChange.emit(order);
                }
                _this.updateCalcOperator();
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzThAddOnComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzSortKey = changes.nzSortKey, nzSort = changes.nzSort, nzSortDirections = changes.nzSortDirections, nzFilters = changes.nzFilters, nzSortOrder = changes.nzSortOrder, nzSortFn = changes.nzSortFn, nzFilterFn = changes.nzFilterFn, nzSortPriority = changes.nzSortPriority, nzFilterMultiple = changes.nzFilterMultiple, nzShowSort = changes.nzShowSort, nzShowFilter = changes.nzShowFilter;
            if (nzSortDirections) {
                if (this.nzSortDirections && this.nzSortDirections.length) {
                    this.sortDirections = this.nzSortDirections;
                }
            }
            if (nzSort) {
                this.sortOrder = this.nzSort;
                this.setSortOrder(this.nzSort);
                logger.warnDeprecation("'nzSort' and 'nzSortChange' is deprecated and will be removed in 10.0.0. Please use 'nzSortOrder' and 'nzSortOrderChange' instead.");
            }
            if (nzSortKey) {
                this.nzColumnKey = this.nzSortKey;
                logger.warnDeprecation("'nzSortKey' is deprecated and will be removed in 10.0.0. Please use 'nzColumnKey' instead.");
            }
            if (nzSortOrder) {
                this.sortOrder = this.nzSortOrder;
                this.setSortOrder(this.nzSortOrder);
            }
            if (nzShowSort) {
                this.isNzShowSortChanged = true;
            }
            if (nzShowFilter) {
                this.isNzShowFilterChanged = true;
            }
            /** @type {?} */
            var isFirstChange = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value && value.firstChange && value.currentValue !== undefined; });
            if ((isFirstChange(nzSortKey) || isFirstChange(nzSort) || isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) &&
                !this.isNzShowSortChanged) {
                this.nzShowSort = true;
            }
            if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
                this.nzShowFilter = true;
            }
            if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
                /** @type {?} */
                var listOfValue = this.nzFilters.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.byDefault; })).map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.value; }));
                this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
            }
            if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
                this.updateCalcOperator();
            }
        };
        /**
         * @return {?}
         */
        NzThAddOnComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzThAddOnComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'th[nzSortKey], th[nzColumnKey], th[nzSort], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <nz-table-filter\n      *ngIf=\"nzShowFilter || nzCustomFilter; else notFilterTemplate\"\n      [contentTemplate]=\"notFilterTemplate\"\n      [extraTemplate]=\"extraTemplate\"\n      [customFilter]=\"nzCustomFilter\"\n      [filterMultiple]=\"nzFilterMultiple\"\n      [listOfFilter]=\"nzFilters\"\n      (filterChange)=\"onFilterValueChange($event)\"\n    ></nz-table-filter>\n    <ng-template #notFilterTemplate>\n      <ng-template [ngTemplateOutlet]=\"nzShowSort ? sortTemplate : contentTemplate\"></ng-template>\n    </ng-template>\n    <ng-template #extraTemplate>\n      <ng-content select=\"[nz-th-extra]\"></ng-content>\n      <ng-content select=\"nz-filter-trigger\"></ng-content>\n    </ng-template>\n    <ng-template #sortTemplate>\n      <nz-table-sorters [sortOrder]=\"sortOrder\" [sortDirections]=\"sortDirections\" [contentTemplate]=\"contentTemplate\"></nz-table-sorters>\n    </ng-template>\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-table-column-has-sorters]': 'nzShowSort',
                            '[class.ant-table-column-sort]': "sortOrder === 'descend' || sortOrder === 'ascend'",
                            '(click)': 'emitNextSortValue()'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzThAddOnComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzThAddOnComponent.propDecorators = {
            nzColumnKey: [{ type: core.Input }],
            nzFilterMultiple: [{ type: core.Input }],
            nzSortOrder: [{ type: core.Input }],
            nzSortPriority: [{ type: core.Input }],
            nzSortDirections: [{ type: core.Input }],
            nzFilters: [{ type: core.Input }],
            nzSortFn: [{ type: core.Input }],
            nzFilterFn: [{ type: core.Input }],
            nzShowSort: [{ type: core.Input }],
            nzShowFilter: [{ type: core.Input }],
            nzCustomFilter: [{ type: core.Input }],
            nzCheckedChange: [{ type: core.Output }],
            nzSortOrderChange: [{ type: core.Output }],
            nzFilterChange: [{ type: core.Output }],
            nzSortKey: [{ type: core.Input }],
            nzSort: [{ type: core.Input }],
            nzSortChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzThAddOnComponent.prototype, "nzShowSort", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);
        return NzThAddOnComponent;
    }());
    if (false) {
        /** @type {?} */
        NzThAddOnComponent.ngAcceptInputType_nzShowSort;
        /** @type {?} */
        NzThAddOnComponent.ngAcceptInputType_nzShowFilter;
        /** @type {?} */
        NzThAddOnComponent.ngAcceptInputType_nzCustomFilter;
        /** @type {?} */
        NzThAddOnComponent.prototype.manualClickOrder$;
        /** @type {?} */
        NzThAddOnComponent.prototype.calcOperatorChange$;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzFilterValue;
        /** @type {?} */
        NzThAddOnComponent.prototype.sortOrder;
        /** @type {?} */
        NzThAddOnComponent.prototype.sortDirections;
        /**
         * @type {?}
         * @private
         */
        NzThAddOnComponent.prototype.sortOrderChange$;
        /**
         * @type {?}
         * @private
         */
        NzThAddOnComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzThAddOnComponent.prototype.isNzShowSortChanged;
        /**
         * @type {?}
         * @private
         */
        NzThAddOnComponent.prototype.isNzShowFilterChanged;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzColumnKey;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzFilterMultiple;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzSortOrder;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzSortPriority;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzSortDirections;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzFilters;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzSortFn;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzFilterFn;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzShowSort;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzShowFilter;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzCustomFilter;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzCheckedChange;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzSortOrderChange;
        /** @type {?} */
        NzThAddOnComponent.prototype.nzFilterChange;
        /**
         * @deprecated use nzColumnKey instead *
         * @type {?}
         */
        NzThAddOnComponent.prototype.nzSortKey;
        /**
         * @deprecated use nzSortOrder instead *
         * @type {?}
         */
        NzThAddOnComponent.prototype.nzSort;
        /**
         * @deprecated use nzSortOrderChange instead *
         * @type {?}
         */
        NzThAddOnComponent.prototype.nzSortChange;
        /**
         * @type {?}
         * @private
         */
        NzThAddOnComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/cell/th-measure.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzThMeasureDirective = /** @class */ (function () {
        function NzThMeasureDirective(renderer, elementRef) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.changes$ = new rxjs.Subject();
            this.nzWidth = null;
            this.colspan = null;
            this.colSpan = null;
            this.rowspan = null;
            this.rowSpan = null;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzThMeasureDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzWidth = changes.nzWidth, colspan = changes.colspan, rowspan = changes.rowspan, colSpan = changes.colSpan, rowSpan = changes.rowSpan;
            if (colspan || colSpan) {
                /** @type {?} */
                var col = this.colspan || this.colSpan;
                if (!util.isNil(col)) {
                    this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', "" + col);
                }
                else {
                    this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
                }
            }
            if (rowspan || rowSpan) {
                /** @type {?} */
                var row = this.rowspan || this.rowSpan;
                if (!util.isNil(row)) {
                    this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', "" + row);
                }
                else {
                    this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
                }
            }
            if (nzWidth || colspan) {
                this.changes$.next();
            }
        };
        NzThMeasureDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'th'
                    },] }
        ];
        /** @nocollapse */
        NzThMeasureDirective.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        NzThMeasureDirective.propDecorators = {
            nzWidth: [{ type: core.Input }],
            colspan: [{ type: core.Input }],
            colSpan: [{ type: core.Input }],
            rowspan: [{ type: core.Input }],
            rowSpan: [{ type: core.Input }]
        };
        return NzThMeasureDirective;
    }());
    if (false) {
        /** @type {?} */
        NzThMeasureDirective.prototype.changes$;
        /** @type {?} */
        NzThMeasureDirective.prototype.nzWidth;
        /** @type {?} */
        NzThMeasureDirective.prototype.colspan;
        /** @type {?} */
        NzThMeasureDirective.prototype.colSpan;
        /** @type {?} */
        NzThMeasureDirective.prototype.rowspan;
        /** @type {?} */
        NzThMeasureDirective.prototype.rowSpan;
        /**
         * @type {?}
         * @private
         */
        NzThMeasureDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzThMeasureDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/cell/th-selection.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzThSelectionComponent = /** @class */ (function () {
        function NzThSelectionComponent() {
            this.nzSelections = [];
            this.nzChecked = false;
            this.nzDisabled = false;
            this.nzIndeterminate = false;
            this.nzShowCheckbox = false;
            this.nzShowRowSelection = false;
            this.nzCheckedChange = new core.EventEmitter();
            this.nzSortChangeWithKey = new core.EventEmitter();
            this.isNzShowExpandChanged = false;
            this.isNzShowCheckboxChanged = false;
        }
        /**
         * @param {?} checked
         * @return {?}
         */
        NzThSelectionComponent.prototype.onCheckedChange = /**
         * @param {?} checked
         * @return {?}
         */
        function (checked) {
            this.nzChecked = checked;
            this.nzCheckedChange.emit(checked);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzThSelectionComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var isFirstChange = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value && value.firstChange && value.currentValue !== undefined; });
            var nzChecked = changes.nzChecked, nzSelections = changes.nzSelections, nzShowExpand = changes.nzShowExpand, nzShowCheckbox = changes.nzShowCheckbox;
            if (nzShowExpand) {
                this.isNzShowExpandChanged = true;
            }
            if (nzShowCheckbox) {
                this.isNzShowCheckboxChanged = true;
            }
            if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
                this.nzShowRowSelection = true;
            }
            if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
                this.nzShowCheckbox = true;
            }
        };
        NzThSelectionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <nz-table-selection\n      [checked]=\"nzChecked\"\n      [disabled]=\"nzDisabled\"\n      [indeterminate]=\"nzIndeterminate\"\n      [listOfSelections]=\"nzSelections\"\n      [showCheckbox]=\"nzShowCheckbox\"\n      [showRowSelection]=\"nzShowRowSelection\"\n      (checkedChange)=\"onCheckedChange($event)\"\n    ></nz-table-selection>\n    <ng-content></ng-content>\n  ",
                        host: {
                            '[class.ant-table-selection-column]': 'true'
                        }
                    }] }
        ];
        NzThSelectionComponent.propDecorators = {
            nzSelections: [{ type: core.Input }],
            nzChecked: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzIndeterminate: [{ type: core.Input }],
            nzShowCheckbox: [{ type: core.Input }],
            nzShowRowSelection: [{ type: core.Input }],
            nzCheckedChange: [{ type: core.Output }],
            nzSortChangeWithKey: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzThSelectionComponent.prototype, "nzShowCheckbox", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzThSelectionComponent.prototype, "nzShowRowSelection", void 0);
        return NzThSelectionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzThSelectionComponent.ngAcceptInputType_nzShowCheckbox;
        /** @type {?} */
        NzThSelectionComponent.ngAcceptInputType_nzShowRowSelection;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzSelections;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzChecked;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzDisabled;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzIndeterminate;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzShowCheckbox;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzShowRowSelection;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzCheckedChange;
        /** @type {?} */
        NzThSelectionComponent.prototype.nzSortChangeWithKey;
        /**
         * @type {?}
         * @private
         */
        NzThSelectionComponent.prototype.isNzShowExpandChanged;
        /**
         * @type {?}
         * @private
         */
        NzThSelectionComponent.prototype.isNzShowCheckboxChanged;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/styled/align.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCellAlignDirective = /** @class */ (function () {
        function NzCellAlignDirective() {
            this.nzAlign = null;
        }
        NzCellAlignDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'th[nzAlign],td[nzAlign]',
                        host: {
                            '[style.text-align]': 'nzAlign'
                        }
                    },] }
        ];
        NzCellAlignDirective.propDecorators = {
            nzAlign: [{ type: core.Input }]
        };
        return NzCellAlignDirective;
    }());
    if (false) {
        /** @type {?} */
        NzCellAlignDirective.prototype.nzAlign;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/styled/ellipsis.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCellEllipsisDirective = /** @class */ (function () {
        function NzCellEllipsisDirective() {
            this.nzEllipsis = true;
        }
        NzCellEllipsisDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'th[nzEllipsis],td[nzEllipsis]',
                        host: {
                            '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
                        }
                    },] }
        ];
        NzCellEllipsisDirective.propDecorators = {
            nzEllipsis: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCellEllipsisDirective.prototype, "nzEllipsis", void 0);
        return NzCellEllipsisDirective;
    }());
    if (false) {
        /** @type {?} */
        NzCellEllipsisDirective.ngAcceptInputType_nzEllipsis;
        /** @type {?} */
        NzCellEllipsisDirective.prototype.nzEllipsis;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/styled/word-break.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCellBreakWordDirective = /** @class */ (function () {
        function NzCellBreakWordDirective() {
            this.nzBreakWord = true;
        }
        NzCellBreakWordDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'th[nzBreakWord],td[nzBreakWord]',
                        host: {
                            '[style.word-break]': "nzBreakWord ? 'break-all' : ''"
                        }
                    },] }
        ];
        NzCellBreakWordDirective.propDecorators = {
            nzBreakWord: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCellBreakWordDirective.prototype, "nzBreakWord", void 0);
        return NzCellBreakWordDirective;
    }());
    if (false) {
        /** @type {?} */
        NzCellBreakWordDirective.ngAcceptInputType_nzBreakWord;
        /** @type {?} */
        NzCellBreakWordDirective.prototype.nzBreakWord;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/table-content.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableContentComponent = /** @class */ (function () {
        function NzTableContentComponent() {
            this.tableLayout = 'auto';
            this.theadTemplate = null;
            this.contentTemplate = null;
            this.listOfColWidth = [];
            this.scrollX = null;
        }
        NzTableContentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'table[nz-table-content]',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <col [style.width]=\"width\" [style.minWidth]=\"width\" *ngFor=\"let width of listOfColWidth\" />\n    <thead class=\"ant-table-thead\" *ngIf=\"theadTemplate\">\n      <ng-template [ngTemplateOutlet]=\"theadTemplate\"></ng-template>\n    </thead>\n    <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    <ng-content></ng-content>\n  ",
                        host: {
                            '[style.table-layout]': 'tableLayout',
                            '[class.ant-table-fixed]': 'scrollX',
                            '[style.width]': 'scrollX',
                            '[style.min-width]': "scrollX ? '100%': null"
                        }
                    }] }
        ];
        NzTableContentComponent.propDecorators = {
            tableLayout: [{ type: core.Input }],
            theadTemplate: [{ type: core.Input }],
            contentTemplate: [{ type: core.Input }],
            listOfColWidth: [{ type: core.Input }],
            scrollX: [{ type: core.Input }]
        };
        return NzTableContentComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableContentComponent.prototype.tableLayout;
        /** @type {?} */
        NzTableContentComponent.prototype.theadTemplate;
        /** @type {?} */
        NzTableContentComponent.prototype.contentTemplate;
        /** @type {?} */
        NzTableContentComponent.prototype.listOfColWidth;
        /** @type {?} */
        NzTableContentComponent.prototype.scrollX;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/table-fixed-row.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableFixedRowComponent = /** @class */ (function () {
        function NzTableFixedRowComponent(nzTableStyleService, renderer) {
            this.nzTableStyleService = nzTableStyleService;
            this.renderer = renderer;
            this.hostWidth$ = new rxjs.BehaviorSubject(null);
            this.enableAutoMeasure$ = new rxjs.BehaviorSubject(false);
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzTableFixedRowComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this.nzTableStyleService) {
                var _a = this.nzTableStyleService, enableAutoMeasure$ = _a.enableAutoMeasure$, hostWidth$ = _a.hostWidth$;
                enableAutoMeasure$.subscribe(this.enableAutoMeasure$);
                hostWidth$.subscribe(this.hostWidth$);
            }
        };
        /**
         * @return {?}
         */
        NzTableFixedRowComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzTableStyleService.columnCount$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} count
             * @return {?}
             */
            function (count) {
                _this.renderer.setAttribute(_this.tdElement.nativeElement, 'colspan', "" + count);
            }));
        };
        /**
         * @return {?}
         */
        NzTableFixedRowComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTableFixedRowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'tr[nz-table-fixed-row], tr[nzExpand]',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <td class=\"nz-disable-td ant-table-cell\" #tdElement>\n      <div\n        class=\"ant-table-expanded-row-fixed\"\n        *ngIf=\"enableAutoMeasure$ | async; else contentTemplate\"\n        style=\"position: sticky; left: 0px; overflow: hidden;\"\n        [style.width.px]=\"hostWidth$ | async\"\n      >\n        <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n      </div>\n    </td>\n    <ng-template #contentTemplate><ng-content></ng-content></ng-template>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzTableFixedRowComponent.ctorParameters = function () { return [
            { type: NzTableStyleService },
            { type: core.Renderer2 }
        ]; };
        NzTableFixedRowComponent.propDecorators = {
            tdElement: [{ type: core.ViewChild, args: ['tdElement',] }]
        };
        return NzTableFixedRowComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableFixedRowComponent.prototype.tdElement;
        /** @type {?} */
        NzTableFixedRowComponent.prototype.hostWidth$;
        /** @type {?} */
        NzTableFixedRowComponent.prototype.enableAutoMeasure$;
        /**
         * @type {?}
         * @private
         */
        NzTableFixedRowComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTableFixedRowComponent.prototype.nzTableStyleService;
        /**
         * @type {?}
         * @private
         */
        NzTableFixedRowComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/table-inner-default.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableInnerDefaultComponent = /** @class */ (function () {
        function NzTableInnerDefaultComponent() {
            this.tableLayout = 'auto';
            this.listOfColWidth = [];
            this.theadTemplate = null;
            this.contentTemplate = null;
        }
        NzTableInnerDefaultComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table-inner-default',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div class=\"ant-table-content\">\n      <table\n        nz-table-content\n        [contentTemplate]=\"contentTemplate\"\n        [tableLayout]=\"tableLayout\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [theadTemplate]=\"theadTemplate\"\n      ></table>\n    </div>\n  ",
                        host: {
                            '[class.ant-table-container]': 'true'
                        }
                    }] }
        ];
        NzTableInnerDefaultComponent.propDecorators = {
            tableLayout: [{ type: core.Input }],
            listOfColWidth: [{ type: core.Input }],
            theadTemplate: [{ type: core.Input }],
            contentTemplate: [{ type: core.Input }]
        };
        return NzTableInnerDefaultComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableInnerDefaultComponent.prototype.tableLayout;
        /** @type {?} */
        NzTableInnerDefaultComponent.prototype.listOfColWidth;
        /** @type {?} */
        NzTableInnerDefaultComponent.prototype.theadTemplate;
        /** @type {?} */
        NzTableInnerDefaultComponent.prototype.contentTemplate;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/table-inner-scroll.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableInnerScrollComponent = /** @class */ (function () {
        function NzTableInnerScrollComponent(renderer, ngZone, platform, resizeService) {
            this.renderer = renderer;
            this.ngZone = ngZone;
            this.platform = platform;
            this.resizeService = resizeService;
            this.data = [];
            this.scrollX = null;
            this.scrollY = null;
            this.contentTemplate = null;
            this.widthConfig = [];
            this.listOfColWidth = [];
            this.theadTemplate = null;
            this.virtualTemplate = null;
            this.virtualItemSize = 0;
            this.virtualMaxBufferPx = 200;
            this.virtualMinBufferPx = 100;
            this.virtualForTrackBy = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) { return index; });
            this.headerStyleMap = {};
            this.bodyStyleMap = {};
            this.verticalScrollBarWidth = 0;
            this.noDateVirtualHeight = '182px';
            this.data$ = new rxjs.Subject();
            this.scroll$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @param {?=} clear
         * @return {?}
         */
        NzTableInnerScrollComponent.prototype.setScrollPositionClassName = /**
         * @param {?=} clear
         * @return {?}
         */
        function (clear) {
            if (clear === void 0) { clear = false; }
            var _a = this.tableBodyElement.nativeElement, scrollWidth = _a.scrollWidth, scrollLeft = _a.scrollLeft, clientWidth = _a.clientWidth;
            /** @type {?} */
            var leftClassName = 'ant-table-ping-left';
            /** @type {?} */
            var rightClassName = 'ant-table-ping-right';
            if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
                this.renderer.removeClass(this.tableMainElement, leftClassName);
                this.renderer.removeClass(this.tableMainElement, rightClassName);
            }
            else if (scrollLeft === 0) {
                this.renderer.removeClass(this.tableMainElement, leftClassName);
                this.renderer.addClass(this.tableMainElement, rightClassName);
            }
            else if (scrollWidth === scrollLeft + clientWidth) {
                this.renderer.removeClass(this.tableMainElement, rightClassName);
                this.renderer.addClass(this.tableMainElement, leftClassName);
            }
            else {
                this.renderer.addClass(this.tableMainElement, leftClassName);
                this.renderer.addClass(this.tableMainElement, rightClassName);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTableInnerScrollComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var scrollX = changes.scrollX, scrollY = changes.scrollY, data = changes.data;
            if (scrollX || scrollY) {
                /** @type {?} */
                var hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
                this.headerStyleMap = {
                    overflowX: 'hidden',
                    overflowY: this.scrollY && hasVerticalScrollBar ? 'scroll' : 'hidden'
                };
                this.bodyStyleMap = {
                    overflowY: this.scrollY ? 'scroll' : null,
                    overflowX: this.scrollX ? 'scroll' : null,
                    maxHeight: this.scrollY
                };
                this.scroll$.next();
            }
            if (data) {
                this.data$.next();
            }
        };
        /**
         * @return {?}
         */
        NzTableInnerScrollComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.platform.isBrowser) {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var scrollEvent$ = rxjs.fromEvent(_this.tableBodyElement.nativeElement, 'scroll').pipe(operators.takeUntil(_this.destroy$));
                    /** @type {?} */
                    var scrollX$ = scrollEvent$.pipe(operators.filter((/**
                     * @return {?}
                     */
                    function () { return !!_this.scrollX; })));
                    /** @type {?} */
                    var scrollY$ = scrollEvent$.pipe(operators.filter((/**
                     * @return {?}
                     */
                    function () { return !!_this.scrollY; })));
                    /** @type {?} */
                    var resize$ = _this.resizeService.subscribe().pipe(operators.takeUntil(_this.destroy$));
                    /** @type {?} */
                    var data$ = _this.data$.pipe(operators.takeUntil(_this.destroy$));
                    /** @type {?} */
                    var setClassName$ = rxjs.merge(scrollX$, resize$, data$, _this.scroll$).pipe(operators.startWith(true), operators.delay(0));
                    setClassName$.subscribe((/**
                     * @return {?}
                     */
                    function () { return _this.setScrollPositionClassName(); }));
                    scrollY$.subscribe((/**
                     * @return {?}
                     */
                    function () { return (_this.tableHeaderElement.nativeElement.scrollLeft = _this.tableBodyElement.nativeElement.scrollLeft); }));
                }));
            }
        };
        /**
         * @return {?}
         */
        NzTableInnerScrollComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.setScrollPositionClassName(true);
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTableInnerScrollComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table-inner-scroll',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div class=\"ant-table-content\">\n      <div *ngIf=\"scrollY\" #tableHeaderElement [ngStyle]=\"headerStyleMap\" class=\"ant-table-header nz-table-hide-scrollbar\">\n        <table\n          nz-table-content\n          tableLayout=\"fixed\"\n          [scrollX]=\"scrollX\"\n          [listOfColWidth]=\"listOfColWidth\"\n          [theadTemplate]=\"theadTemplate\"\n        ></table>\n      </div>\n      <div #tableBodyElement *ngIf=\"!virtualTemplate\" class=\"ant-table-body\" [ngStyle]=\"bodyStyleMap\">\n        <table\n          nz-table-content\n          [scrollX]=\"scrollX\"\n          tableLayout=\"fixed\"\n          [listOfColWidth]=\"listOfColWidth\"\n          [theadTemplate]=\"scrollY ? null : theadTemplate\"\n          [contentTemplate]=\"contentTemplate\"\n        ></table>\n      </div>\n      <cdk-virtual-scroll-viewport\n        #tableBodyElement\n        *ngIf=\"virtualTemplate\"\n        [itemSize]=\"virtualItemSize\"\n        [maxBufferPx]=\"virtualMaxBufferPx\"\n        [minBufferPx]=\"virtualMinBufferPx\"\n        [style.height]=\"data.length ? scrollY : noDateVirtualHeight\"\n      >\n        <table nz-table-content tableLayout=\"fixed\" [scrollX]=\"scrollX\" [listOfColWidth]=\"listOfColWidth\">\n          <tbody>\n            <ng-container *cdkVirtualFor=\"let item of data; let i = index; trackBy: virtualForTrackBy\">\n              <ng-template [ngTemplateOutlet]=\"virtualTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, index: i }\"></ng-template>\n            </ng-container>\n          </tbody>\n        </table>\n      </cdk-virtual-scroll-viewport>\n    </div>\n  ",
                        host: {
                            '[class.ant-table-container]': 'true'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTableInnerScrollComponent.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.NgZone },
            { type: platform.Platform },
            { type: services.NzResizeService }
        ]; };
        NzTableInnerScrollComponent.propDecorators = {
            data: [{ type: core.Input }],
            scrollX: [{ type: core.Input }],
            scrollY: [{ type: core.Input }],
            contentTemplate: [{ type: core.Input }],
            widthConfig: [{ type: core.Input }],
            listOfColWidth: [{ type: core.Input }],
            theadTemplate: [{ type: core.Input }],
            virtualTemplate: [{ type: core.Input }],
            virtualItemSize: [{ type: core.Input }],
            virtualMaxBufferPx: [{ type: core.Input }],
            virtualMinBufferPx: [{ type: core.Input }],
            tableMainElement: [{ type: core.Input }],
            virtualForTrackBy: [{ type: core.Input }],
            tableHeaderElement: [{ type: core.ViewChild, args: ['tableHeaderElement', { read: core.ElementRef },] }],
            tableBodyElement: [{ type: core.ViewChild, args: ['tableBodyElement', { read: core.ElementRef },] }],
            cdkVirtualScrollViewport: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport, { read: scrolling.CdkVirtualScrollViewport },] }],
            verticalScrollBarWidth: [{ type: core.Input }]
        };
        return NzTableInnerScrollComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.data;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.scrollX;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.scrollY;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.contentTemplate;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.widthConfig;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.listOfColWidth;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.theadTemplate;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.virtualTemplate;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.virtualItemSize;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.virtualMaxBufferPx;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.virtualMinBufferPx;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.tableMainElement;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.virtualForTrackBy;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.tableHeaderElement;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.tableBodyElement;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.cdkVirtualScrollViewport;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.headerStyleMap;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.bodyStyleMap;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.verticalScrollBarWidth;
        /** @type {?} */
        NzTableInnerScrollComponent.prototype.noDateVirtualHeight;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.data$;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.scroll$;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzTableInnerScrollComponent.prototype.resizeService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/table-virtual-scroll.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableVirtualScrollDirective = /** @class */ (function () {
        function NzTableVirtualScrollDirective(templateRef) {
            this.templateRef = templateRef;
        }
        NzTableVirtualScrollDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-virtual-scroll]',
                        exportAs: 'nzVirtualScroll'
                    },] }
        ];
        /** @nocollapse */
        NzTableVirtualScrollDirective.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        return NzTableVirtualScrollDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTableVirtualScrollDirective.prototype.templateRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table-data.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableDataService = /** @class */ (function () {
        function NzTableDataService() {
            var _this = this;
            this.destroy$ = new rxjs.Subject();
            this.pageIndex$ = new rxjs.BehaviorSubject(1);
            this.frontPagination$ = new rxjs.BehaviorSubject(true);
            this.pageSize$ = new rxjs.BehaviorSubject(10);
            this.listOfData$ = new rxjs.BehaviorSubject([]);
            this.pageIndexDistinct$ = this.pageIndex$.pipe(operators.distinctUntilChanged());
            this.pageSizeDistinct$ = this.pageSize$.pipe(operators.distinctUntilChanged());
            this.listOfCalcOperator$ = new rxjs.BehaviorSubject([]);
            this.queryParams$ = rxjs.combineLatest([
                this.pageIndexDistinct$,
                this.pageSizeDistinct$,
                this.listOfCalcOperator$
            ]).pipe(operators.debounceTime(0), operators.skip(1), operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 3), pageIndex = _b[0], pageSize = _b[1], listOfCalc = _b[2];
                return {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    sort: listOfCalc
                        .filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.sortFn; }))
                        .map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        return {
                            key: (/** @type {?} */ (item.key)),
                            value: item.sortOrder
                        };
                    })),
                    filter: listOfCalc
                        .filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.filterFn; }))
                        .map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        return {
                            key: (/** @type {?} */ (item.key)),
                            value: item.filterValue
                        };
                    }))
                };
            })));
            this.listOfDataAfterCalc$ = rxjs.combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var e_1, _b;
                var _c = __read(_a, 2), listOfData = _c[0], listOfCalcOperator = _c[1];
                /** @type {?} */
                var listOfDataAfterCalc = __spread(listOfData);
                /** @type {?} */
                var listOfFilterOperator = listOfCalcOperator.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    var filterValue = item.filterValue, filterFn = item.filterFn;
                    /** @type {?} */
                    var isReset = filterValue === null || filterValue === undefined || (Array.isArray(filterValue) && (/** @type {?} */ (filterValue)).length === 0);
                    return !isReset && typeof filterFn === 'function';
                }));
                var _loop_1 = function (item) {
                    var filterFn = item.filterFn, filterValue = item.filterValue;
                    listOfDataAfterCalc = listOfDataAfterCalc.filter((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { return ((/** @type {?} */ (filterFn)))(filterValue, data); }));
                };
                try {
                    for (var listOfFilterOperator_1 = __values(listOfFilterOperator), listOfFilterOperator_1_1 = listOfFilterOperator_1.next(); !listOfFilterOperator_1_1.done; listOfFilterOperator_1_1 = listOfFilterOperator_1.next()) {
                        var item = listOfFilterOperator_1_1.value;
                        _loop_1(item);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (listOfFilterOperator_1_1 && !listOfFilterOperator_1_1.done && (_b = listOfFilterOperator_1.return)) _b.call(listOfFilterOperator_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                /** @type {?} */
                var listOfSortOperator = listOfCalcOperator
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.sortOrder !== null && typeof item.sortFn === 'function'; }))
                    .sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return +b.sortPriority - +a.sortPriority; }));
                if (listOfCalcOperator.length) {
                    listOfDataAfterCalc.sort((/**
                     * @param {?} record1
                     * @param {?} record2
                     * @return {?}
                     */
                    function (record1, record2) {
                        var e_2, _a;
                        try {
                            for (var listOfSortOperator_1 = __values(listOfSortOperator), listOfSortOperator_1_1 = listOfSortOperator_1.next(); !listOfSortOperator_1_1.done; listOfSortOperator_1_1 = listOfSortOperator_1.next()) {
                                var item = listOfSortOperator_1_1.value;
                                var sortFn = item.sortFn, sortOrder = item.sortOrder;
                                if (sortFn && sortOrder) {
                                    /** @type {?} */
                                    var compareResult = ((/** @type {?} */ (sortFn)))(record1, record2, sortOrder);
                                    if (compareResult !== 0) {
                                        return sortOrder === 'ascend' ? compareResult : -compareResult;
                                    }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (listOfSortOperator_1_1 && !listOfSortOperator_1_1.done && (_a = listOfSortOperator_1.return)) _a.call(listOfSortOperator_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return 0;
                    }));
                }
                return listOfDataAfterCalc;
            })));
            this.listOfFrontEndCurrentPageData$ = rxjs.combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfDataAfterCalc$]).pipe(operators.takeUntil(this.destroy$), operators.filter((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _a = __read(value, 3), pageIndex = _a[0], pageSize = _a[1], listOfData = _a[2];
                /** @type {?} */
                var maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
                return pageIndex <= maxPageIndex;
            })), operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 3), pageIndex = _b[0], pageSize = _b[1], listOfData = _b[2];
                return listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
            })));
            this.listOfCurrentPageData$ = this.frontPagination$.pipe(operators.switchMap((/**
             * @param {?} pagination
             * @return {?}
             */
            function (pagination) { return (pagination ? _this.listOfFrontEndCurrentPageData$ : _this.listOfData$); })));
            this.total$ = this.frontPagination$.pipe(operators.switchMap((/**
             * @param {?} pagination
             * @return {?}
             */
            function (pagination) { return (pagination ? _this.listOfDataAfterCalc$ : _this.listOfData$); })), operators.map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return list.length; })), operators.distinctUntilChanged());
        }
        /**
         * @param {?} size
         * @return {?}
         */
        NzTableDataService.prototype.updatePageSize = /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            this.pageSize$.next(size);
        };
        /**
         * @param {?} pagination
         * @return {?}
         */
        NzTableDataService.prototype.updateFrontPagination = /**
         * @param {?} pagination
         * @return {?}
         */
        function (pagination) {
            this.frontPagination$.next(pagination);
        };
        /**
         * @param {?} index
         * @return {?}
         */
        NzTableDataService.prototype.updatePageIndex = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.pageIndex$.next(index);
        };
        /**
         * @param {?} list
         * @return {?}
         */
        NzTableDataService.prototype.updateListOfData = /**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            this.listOfData$.next(list);
        };
        /**
         * @return {?}
         */
        NzTableDataService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTableDataService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NzTableDataService.ctorParameters = function () { return []; };
        return NzTableDataService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.pageIndex$;
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.frontPagination$;
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.pageSize$;
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.listOfData$;
        /** @type {?} */
        NzTableDataService.prototype.pageIndexDistinct$;
        /** @type {?} */
        NzTableDataService.prototype.pageSizeDistinct$;
        /** @type {?} */
        NzTableDataService.prototype.listOfCalcOperator$;
        /** @type {?} */
        NzTableDataService.prototype.queryParams$;
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.listOfDataAfterCalc$;
        /**
         * @type {?}
         * @private
         */
        NzTableDataService.prototype.listOfFrontEndCurrentPageData$;
        /** @type {?} */
        NzTableDataService.prototype.listOfCurrentPageData$;
        /** @type {?} */
        NzTableDataService.prototype.total$;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/table.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'table';
    /**
     * @template T
     */
    var NzTableComponent = /** @class */ (function () {
        function NzTableComponent(elementRef, nzResizeObserver, nzConfigService, cdr, nzTableStyleService, nzTableDataService) {
            var _this = this;
            this.elementRef = elementRef;
            this.nzResizeObserver = nzResizeObserver;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.nzTableStyleService = nzTableStyleService;
            this.nzTableDataService = nzTableDataService;
            this.nzTableLayout = 'auto';
            this.nzShowTotal = null;
            this.nzItemRender = null;
            this.nzTitle = null;
            this.nzFooter = null;
            this.nzNoResult = undefined;
            this.nzPageSizeOptions = [10, 20, 30, 40, 50];
            this.nzVirtualItemSize = 0;
            this.nzVirtualMaxBufferPx = 200;
            this.nzVirtualMinBufferPx = 100;
            this.nzVirtualForTrackBy = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) { return index; });
            this.nzLoadingDelay = 0;
            this.nzPageIndex = 1;
            this.nzPageSize = 10;
            this.nzTotal = 0;
            this.nzWidthConfig = [];
            this.nzData = [];
            this.nzPaginationPosition = 'bottom';
            this.nzScroll = { x: null, y: null };
            this.nzFrontPagination = true;
            this.nzTemplateMode = false;
            this.nzShowPagination = true;
            this.nzLoading = false;
            this.nzLoadingIndicator = null;
            this.nzBordered = false;
            this.nzSize = 'default';
            this.nzShowSizeChanger = false;
            this.nzHideOnSinglePage = false;
            this.nzShowQuickJumper = false;
            this.nzSimple = false;
            this.nzPageSizeChange = new core.EventEmitter();
            this.nzPageIndexChange = new core.EventEmitter();
            this.nzQueryParams = new core.EventEmitter();
            this.nzCurrentPageDataChange = new core.EventEmitter();
            /**
             * public data for ngFor tr
             */
            this.data = [];
            this.scrollX = null;
            this.scrollY = null;
            this.theadTemplate = null;
            this.listOfAutoColWidth = [];
            this.listOfManualColWidth = [];
            this.hasFixLeft = false;
            this.hasFixRight = false;
            this.destroy$ = new rxjs.Subject();
            this.loading$ = new rxjs.BehaviorSubject(false);
            this.templateMode$ = new rxjs.BehaviorSubject(false);
            this.verticalScrollBarWidth = 0;
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.cdr.markForCheck();
            }));
        }
        /**
         * @param {?} size
         * @return {?}
         */
        NzTableComponent.prototype.onPageSizeChange = /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            this.nzTableDataService.updatePageSize(size);
        };
        /**
         * @param {?} index
         * @return {?}
         */
        NzTableComponent.prototype.onPageIndexChange = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.nzTableDataService.updatePageIndex(index);
        };
        /**
         * @return {?}
         */
        NzTableComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            var _a = this.nzTableDataService, pageIndexDistinct$ = _a.pageIndexDistinct$, pageSizeDistinct$ = _a.pageSizeDistinct$, listOfCurrentPageData$ = _a.listOfCurrentPageData$, total$ = _a.total$, queryParams$ = _a.queryParams$;
            var _b = this.nzTableStyleService, theadTemplate$ = _b.theadTemplate$, hasFixLeft$ = _b.hasFixLeft$, hasFixRight$ = _b.hasFixRight$;
            queryParams$.pipe(operators.takeUntil(this.destroy$)).subscribe(this.nzQueryParams);
            pageIndexDistinct$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} pageIndex
             * @return {?}
             */
            function (pageIndex) {
                if (pageIndex !== _this.nzPageIndex) {
                    _this.nzPageIndex = pageIndex;
                    _this.nzPageIndexChange.next(pageIndex);
                }
            }));
            pageSizeDistinct$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} pageSize
             * @return {?}
             */
            function (pageSize) {
                if (pageSize !== _this.nzPageSize) {
                    _this.nzPageSize = pageSize;
                    _this.nzPageSizeChange.next(pageSize);
                }
            }));
            total$
                .pipe(operators.takeUntil(this.destroy$), operators.filter((/**
             * @return {?}
             */
            function () { return _this.nzFrontPagination; })))
                .subscribe((/**
             * @param {?} total
             * @return {?}
             */
            function (total) {
                if (total !== _this.nzTotal) {
                    _this.nzTotal = total;
                    _this.cdr.markForCheck();
                }
            }));
            listOfCurrentPageData$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.data = data;
                _this.nzCurrentPageDataChange.next(data);
                _this.cdr.markForCheck();
            }));
            theadTemplate$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} theadTemplate
             * @return {?}
             */
            function (theadTemplate) {
                _this.theadTemplate = theadTemplate;
                _this.cdr.markForCheck();
            }));
            hasFixLeft$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} hasFixLeft
             * @return {?}
             */
            function (hasFixLeft) {
                _this.hasFixLeft = hasFixLeft;
                _this.cdr.markForCheck();
            }));
            hasFixRight$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} hasFixRight
             * @return {?}
             */
            function (hasFixRight) {
                _this.hasFixRight = hasFixRight;
                _this.cdr.markForCheck();
            }));
            rxjs.combineLatest([total$, this.loading$, this.templateMode$])
                .pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 3), total = _b[0], loading = _b[1], templateMode = _b[2];
                return total === 0 && !loading && !templateMode;
            })), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} empty
             * @return {?}
             */
            function (empty) {
                _this.nzTableStyleService.setShowEmpty(empty);
            }));
            this.verticalScrollBarWidth = util.measureScrollbar('vertical');
            this.nzTableStyleService.listOfListOfThWidthPx$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} listOfWidth
             * @return {?}
             */
            function (listOfWidth) {
                _this.listOfAutoColWidth = listOfWidth;
                _this.cdr.markForCheck();
            }));
            this.nzTableStyleService.manualWidthConfigPx$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} listOfWidth
             * @return {?}
             */
            function (listOfWidth) {
                _this.listOfManualColWidth = listOfWidth;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTableComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzScroll = changes.nzScroll, nzPageIndex = changes.nzPageIndex, nzPageSize = changes.nzPageSize, nzFrontPagination = changes.nzFrontPagination, nzData = changes.nzData, nzWidthConfig = changes.nzWidthConfig, nzNoResult = changes.nzNoResult, nzLoading = changes.nzLoading, nzTemplateMode = changes.nzTemplateMode;
            if (nzPageIndex) {
                this.nzTableDataService.updatePageIndex(this.nzPageIndex);
            }
            if (nzPageSize) {
                this.nzTableDataService.updatePageSize(this.nzPageSize);
            }
            if (nzData) {
                this.nzData = this.nzData || [];
                this.nzTableDataService.updateListOfData(this.nzData);
            }
            if (nzFrontPagination) {
                this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
            }
            if (nzScroll) {
                this.scrollX = (this.nzScroll && this.nzScroll.x) || null;
                this.scrollY = (this.nzScroll && this.nzScroll.y) || null;
                this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
            }
            if (nzWidthConfig) {
                this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
            }
            if (nzLoading) {
                this.loading$.next(this.nzLoading);
            }
            if (nzTemplateMode) {
                this.templateMode$.next(this.nzTemplateMode);
            }
            if (nzNoResult) {
                this.nzTableStyleService.setNoResult(this.nzNoResult);
            }
        };
        /**
         * @return {?}
         */
        NzTableComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzResizeObserver
                .observe(this.elementRef)
                .pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 1), entry = _b[0];
                var width = entry.target.getBoundingClientRect().width;
                /** @type {?} */
                var scrollBarWidth = _this.scrollY ? _this.verticalScrollBarWidth : 0;
                return Math.floor(width - scrollBarWidth);
            })), operators.takeUntil(this.destroy$))
                .subscribe(this.nzTableStyleService.hostWidth$);
            if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
                this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
            }
        };
        /**
         * @return {?}
         */
        NzTableComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTableComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table',
                        exportAs: 'nzTable',
                        providers: [NzTableStyleService, NzTableDataService],
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <nz-spin [nzDelay]=\"nzLoadingDelay\" [nzSpinning]=\"nzLoading\" [nzIndicator]=\"nzLoadingIndicator\">\n      <ng-container *ngIf=\"nzPaginationPosition === 'both' || nzPaginationPosition === 'top'\">\n        <ng-template [ngTemplateOutlet]=\"paginationTemplate\"></ng-template>\n      </ng-container>\n      <div\n        #tableMainElement\n        class=\"ant-table\"\n        [class.ant-table-fixed-header]=\"nzData.length && scrollY\"\n        [class.ant-table-fixed-column]=\"scrollX\"\n        [class.ant-table-has-fix-left]=\"hasFixLeft\"\n        [class.ant-table-has-fix-right]=\"hasFixRight\"\n        [class.ant-table-bordered]=\"nzBordered\"\n        [class.ant-table-middle]=\"nzSize === 'middle'\"\n        [class.ant-table-small]=\"nzSize === 'small'\"\n      >\n        <nz-table-title-footer [title]=\"nzTitle\" *ngIf=\"nzTitle\"></nz-table-title-footer>\n        <nz-table-inner-scroll\n          *ngIf=\"scrollY || scrollX; else defaultTemplate\"\n          [data]=\"data\"\n          [scrollX]=\"scrollX\"\n          [scrollY]=\"scrollY\"\n          [contentTemplate]=\"contentTemplate\"\n          [listOfColWidth]=\"listOfAutoColWidth\"\n          [theadTemplate]=\"theadTemplate\"\n          [verticalScrollBarWidth]=\"verticalScrollBarWidth\"\n          [virtualTemplate]=\"nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null\"\n          [virtualItemSize]=\"nzVirtualItemSize\"\n          [virtualMaxBufferPx]=\"nzVirtualMaxBufferPx\"\n          [virtualMinBufferPx]=\"nzVirtualMinBufferPx\"\n          [tableMainElement]=\"tableMainElement\"\n          [virtualForTrackBy]=\"nzVirtualForTrackBy\"\n        ></nz-table-inner-scroll>\n        <ng-template #defaultTemplate>\n          <nz-table-inner-default\n            [tableLayout]=\"nzTableLayout\"\n            [listOfColWidth]=\"listOfManualColWidth\"\n            [theadTemplate]=\"theadTemplate\"\n            [contentTemplate]=\"contentTemplate\"\n          ></nz-table-inner-default>\n        </ng-template>\n        <nz-table-title-footer [footer]=\"nzFooter\" *ngIf=\"nzFooter\"></nz-table-title-footer>\n      </div>\n      <ng-container *ngIf=\"nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'\">\n        <ng-template [ngTemplateOutlet]=\"paginationTemplate\"></ng-template>\n      </ng-container>\n    </nz-spin>\n    <ng-template #paginationTemplate>\n      <nz-pagination\n        *ngIf=\"nzShowPagination && data.length\"\n        class=\"ant-table-pagination ant-table-pagination-right\"\n        [nzShowSizeChanger]=\"nzShowSizeChanger\"\n        [nzPageSizeOptions]=\"nzPageSizeOptions\"\n        [nzItemRender]=\"nzItemRender!\"\n        [nzShowQuickJumper]=\"nzShowQuickJumper\"\n        [nzHideOnSinglePage]=\"nzHideOnSinglePage\"\n        [nzShowTotal]=\"nzShowTotal\"\n        [nzSize]=\"nzSize === 'default' ? 'default' : 'small'\"\n        [nzPageSize]=\"nzPageSize\"\n        [nzTotal]=\"nzTotal\"\n        [nzSimple]=\"nzSimple\"\n        [nzPageIndex]=\"nzPageIndex\"\n        (nzPageSizeChange)=\"onPageSizeChange($event)\"\n        (nzPageIndexChange)=\"onPageIndexChange($event)\"\n      >\n      </nz-pagination>\n    </ng-template>\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-table-wrapper]': 'true'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTableComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: resizeObservers.NzResizeObserver },
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: NzTableStyleService },
            { type: NzTableDataService }
        ]; };
        NzTableComponent.propDecorators = {
            nzTableLayout: [{ type: core.Input }],
            nzShowTotal: [{ type: core.Input }],
            nzItemRender: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzFooter: [{ type: core.Input }],
            nzNoResult: [{ type: core.Input }],
            nzPageSizeOptions: [{ type: core.Input }],
            nzVirtualItemSize: [{ type: core.Input }],
            nzVirtualMaxBufferPx: [{ type: core.Input }],
            nzVirtualMinBufferPx: [{ type: core.Input }],
            nzVirtualForTrackBy: [{ type: core.Input }],
            nzLoadingDelay: [{ type: core.Input }],
            nzPageIndex: [{ type: core.Input }],
            nzPageSize: [{ type: core.Input }],
            nzTotal: [{ type: core.Input }],
            nzWidthConfig: [{ type: core.Input }],
            nzData: [{ type: core.Input }],
            nzPaginationPosition: [{ type: core.Input }],
            nzScroll: [{ type: core.Input }],
            nzFrontPagination: [{ type: core.Input }],
            nzTemplateMode: [{ type: core.Input }],
            nzShowPagination: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzLoadingIndicator: [{ type: core.Input }],
            nzBordered: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzShowSizeChanger: [{ type: core.Input }],
            nzHideOnSinglePage: [{ type: core.Input }],
            nzShowQuickJumper: [{ type: core.Input }],
            nzSimple: [{ type: core.Input }],
            nzPageSizeChange: [{ type: core.Output }],
            nzPageIndexChange: [{ type: core.Output }],
            nzQueryParams: [{ type: core.Output }],
            nzCurrentPageDataChange: [{ type: core.Output }],
            nzVirtualScrollDirective: [{ type: core.ContentChild, args: [NzTableVirtualScrollDirective, { static: false },] }],
            nzTableInnerScrollComponent: [{ type: core.ViewChild, args: [NzTableInnerScrollComponent,] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTableComponent.prototype, "nzFrontPagination", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTableComponent.prototype, "nzTemplateMode", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTableComponent.prototype, "nzShowPagination", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTableComponent.prototype, "nzLoading", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzTableComponent.prototype, "nzLoadingIndicator", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTableComponent.prototype, "nzBordered", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzTableComponent.prototype, "nzSize", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTableComponent.prototype, "nzShowSizeChanger", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTableComponent.prototype, "nzHideOnSinglePage", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTableComponent.prototype, "nzShowQuickJumper", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTableComponent.prototype, "nzSimple", void 0);
        return NzTableComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzFrontPagination;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzTemplateMode;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzShowPagination;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzBordered;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzShowSizeChanger;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzHideOnSinglePage;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzShowQuickJumper;
        /** @type {?} */
        NzTableComponent.ngAcceptInputType_nzSimple;
        /** @type {?} */
        NzTableComponent.prototype.nzTableLayout;
        /** @type {?} */
        NzTableComponent.prototype.nzShowTotal;
        /** @type {?} */
        NzTableComponent.prototype.nzItemRender;
        /** @type {?} */
        NzTableComponent.prototype.nzTitle;
        /** @type {?} */
        NzTableComponent.prototype.nzFooter;
        /** @type {?} */
        NzTableComponent.prototype.nzNoResult;
        /** @type {?} */
        NzTableComponent.prototype.nzPageSizeOptions;
        /** @type {?} */
        NzTableComponent.prototype.nzVirtualItemSize;
        /** @type {?} */
        NzTableComponent.prototype.nzVirtualMaxBufferPx;
        /** @type {?} */
        NzTableComponent.prototype.nzVirtualMinBufferPx;
        /** @type {?} */
        NzTableComponent.prototype.nzVirtualForTrackBy;
        /** @type {?} */
        NzTableComponent.prototype.nzLoadingDelay;
        /** @type {?} */
        NzTableComponent.prototype.nzPageIndex;
        /** @type {?} */
        NzTableComponent.prototype.nzPageSize;
        /** @type {?} */
        NzTableComponent.prototype.nzTotal;
        /** @type {?} */
        NzTableComponent.prototype.nzWidthConfig;
        /** @type {?} */
        NzTableComponent.prototype.nzData;
        /** @type {?} */
        NzTableComponent.prototype.nzPaginationPosition;
        /** @type {?} */
        NzTableComponent.prototype.nzScroll;
        /** @type {?} */
        NzTableComponent.prototype.nzFrontPagination;
        /** @type {?} */
        NzTableComponent.prototype.nzTemplateMode;
        /** @type {?} */
        NzTableComponent.prototype.nzShowPagination;
        /** @type {?} */
        NzTableComponent.prototype.nzLoading;
        /** @type {?} */
        NzTableComponent.prototype.nzLoadingIndicator;
        /** @type {?} */
        NzTableComponent.prototype.nzBordered;
        /** @type {?} */
        NzTableComponent.prototype.nzSize;
        /** @type {?} */
        NzTableComponent.prototype.nzShowSizeChanger;
        /** @type {?} */
        NzTableComponent.prototype.nzHideOnSinglePage;
        /** @type {?} */
        NzTableComponent.prototype.nzShowQuickJumper;
        /** @type {?} */
        NzTableComponent.prototype.nzSimple;
        /** @type {?} */
        NzTableComponent.prototype.nzPageSizeChange;
        /** @type {?} */
        NzTableComponent.prototype.nzPageIndexChange;
        /** @type {?} */
        NzTableComponent.prototype.nzQueryParams;
        /** @type {?} */
        NzTableComponent.prototype.nzCurrentPageDataChange;
        /**
         * public data for ngFor tr
         * @type {?}
         */
        NzTableComponent.prototype.data;
        /** @type {?} */
        NzTableComponent.prototype.cdkVirtualScrollViewport;
        /** @type {?} */
        NzTableComponent.prototype.scrollX;
        /** @type {?} */
        NzTableComponent.prototype.scrollY;
        /** @type {?} */
        NzTableComponent.prototype.theadTemplate;
        /** @type {?} */
        NzTableComponent.prototype.listOfAutoColWidth;
        /** @type {?} */
        NzTableComponent.prototype.listOfManualColWidth;
        /** @type {?} */
        NzTableComponent.prototype.hasFixLeft;
        /** @type {?} */
        NzTableComponent.prototype.hasFixRight;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.loading$;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.templateMode$;
        /** @type {?} */
        NzTableComponent.prototype.nzVirtualScrollDirective;
        /** @type {?} */
        NzTableComponent.prototype.nzTableInnerScrollComponent;
        /** @type {?} */
        NzTableComponent.prototype.verticalScrollBarWidth;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.nzResizeObserver;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.nzTableStyleService;
        /**
         * @type {?}
         * @private
         */
        NzTableComponent.prototype.nzTableDataService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/tbody.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTbodyComponent = /** @class */ (function () {
        function NzTbodyComponent(nzTableStyleService) {
            this.nzTableStyleService = nzTableStyleService;
            this.isInsideTable = false;
            this.showEmpty$ = new rxjs.BehaviorSubject(false);
            this.noResult$ = new rxjs.BehaviorSubject(undefined);
            this.listOfMeasureColumn$ = new rxjs.BehaviorSubject([]);
            this.isInsideTable = !!this.nzTableStyleService;
            if (this.nzTableStyleService) {
                var _a = this.nzTableStyleService, showEmpty$ = _a.showEmpty$, noResult$ = _a.noResult$, listOfMeasureColumn$ = _a.listOfMeasureColumn$;
                noResult$.subscribe(this.noResult$);
                listOfMeasureColumn$.subscribe(this.listOfMeasureColumn$);
                showEmpty$.subscribe(this.showEmpty$);
            }
        }
        /**
         * @param {?} listOfAutoWidth
         * @return {?}
         */
        NzTbodyComponent.prototype.onListOfAutoWidthChange = /**
         * @param {?} listOfAutoWidth
         * @return {?}
         */
        function (listOfAutoWidth) {
            this.nzTableStyleService.setListOfAutoWidth(listOfAutoWidth);
        };
        NzTbodyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'tbody',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <ng-container *ngIf=\"listOfMeasureColumn$ | async as listOfMeasureColumn\">\n      <tr\n        nz-table-measure-row\n        *ngIf=\"isInsideTable && listOfMeasureColumn.length\"\n        [listOfMeasureColumn]=\"listOfMeasureColumn\"\n        (listOfAutoWidth)=\"onListOfAutoWidthChange($event)\"\n      ></tr>\n    </ng-container>\n    <ng-content></ng-content>\n    <tr class=\"ant-table-placeholder\" nz-table-fixed-row *ngIf=\"showEmpty$ | async\">\n      <nz-embed-empty nzComponentName=\"table\" [specificContent]=\"(noResult$ | async)!\"></nz-embed-empty>\n    </tr>\n  ",
                        host: {
                            '[class.ant-table-tbody]': 'isInsideTable'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTbodyComponent.ctorParameters = function () { return [
            { type: NzTableStyleService, decorators: [{ type: core.Optional }] }
        ]; };
        return NzTbodyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTbodyComponent.prototype.isInsideTable;
        /** @type {?} */
        NzTbodyComponent.prototype.showEmpty$;
        /** @type {?} */
        NzTbodyComponent.prototype.noResult$;
        /** @type {?} */
        NzTbodyComponent.prototype.listOfMeasureColumn$;
        /**
         * @type {?}
         * @private
         */
        NzTbodyComponent.prototype.nzTableStyleService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/tr.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTrDirective = /** @class */ (function () {
        function NzTrDirective(nzTableStyleService) {
            var _this = this;
            this.nzTableStyleService = nzTableStyleService;
            this.destroy$ = new rxjs.Subject();
            this.listOfFixedColumns$ = new rxjs.ReplaySubject(1);
            this.listOfColumns$ = new rxjs.ReplaySubject(1);
            this.listOfFixedColumnsChanges$ = this.listOfFixedColumns$.pipe(operators.switchMap((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return rxjs.merge.apply(void 0, __spread([_this.listOfFixedColumns$], list.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.changes$; })))).pipe(operators.flatMap((/**
                 * @return {?}
                 */
                function () { return _this.listOfFixedColumns$; })));
            })), operators.takeUntil(this.destroy$));
            this.listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(operators.map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return list.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.nzLeft !== false; })); })));
            this.listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(operators.map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return list.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.nzRight !== false; })); })));
            this.listOfColumnsChanges$ = this.listOfColumns$.pipe(operators.switchMap((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return rxjs.merge.apply(void 0, __spread([_this.listOfColumns$], list.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.changes$; })))).pipe(operators.flatMap((/**
                 * @return {?}
                 */
                function () { return _this.listOfColumns$; })));
            })), operators.takeUntil(this.destroy$));
            this.isInsideTable = false;
            this.isInsideTable = !!nzTableStyleService;
        }
        /**
         * @return {?}
         */
        NzTrDirective.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            if (this.nzTableStyleService) {
                this.listOfCellFixedDirective.changes
                    .pipe(operators.startWith(this.listOfCellFixedDirective), operators.takeUntil(this.destroy$))
                    .subscribe(this.listOfFixedColumns$);
                this.listOfNzThDirective.changes.pipe(operators.startWith(this.listOfNzThDirective), operators.takeUntil(this.destroy$)).subscribe(this.listOfColumns$);
                /** set last left and first right **/
                this.listOfFixedLeftColumnChanges$.subscribe((/**
                 * @param {?} listOfFixedLeft
                 * @return {?}
                 */
                function (listOfFixedLeft) {
                    listOfFixedLeft.forEach((/**
                     * @param {?} cell
                     * @return {?}
                     */
                    function (cell) { return cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]); }));
                }));
                this.listOfFixedRightColumnChanges$.subscribe((/**
                 * @param {?} listOfFixedRight
                 * @return {?}
                 */
                function (listOfFixedRight) {
                    listOfFixedRight.forEach((/**
                     * @param {?} cell
                     * @return {?}
                     */
                    function (cell) { return cell.setIsFirstRight(cell === listOfFixedRight[0]); }));
                }));
                /** calculate fixed nzLeft and nzRight **/
                rxjs.combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$]).subscribe((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), listOfAutoWidth = _b[0], listOfLeftCell = _b[1];
                    listOfLeftCell.forEach((/**
                     * @param {?} cell
                     * @param {?} index
                     * @return {?}
                     */
                    function (cell, index) {
                        if (cell.isAutoLeft) {
                            /** @type {?} */
                            var currentArray = listOfLeftCell.slice(0, index);
                            /** @type {?} */
                            var count = currentArray.reduce((/**
                             * @param {?} pre
                             * @param {?} cur
                             * @return {?}
                             */
                            function (pre, cur) { return pre + (cur.colspan || cur.colSpan || 1); }), 0);
                            /** @type {?} */
                            var width = listOfAutoWidth.slice(0, count).reduce((/**
                             * @param {?} pre
                             * @param {?} cur
                             * @return {?}
                             */
                            function (pre, cur) { return pre + cur; }), 0);
                            cell.setAutoLeftWidth(width + "px");
                        }
                    }));
                }));
                rxjs.combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$]).subscribe((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), listOfAutoWidth = _b[0], listOfRightCell = _b[1];
                    listOfRightCell.forEach((/**
                     * @param {?} _
                     * @param {?} index
                     * @return {?}
                     */
                    function (_, index) {
                        /** @type {?} */
                        var cell = listOfRightCell[listOfRightCell.length - index - 1];
                        if (cell.isAutoRight) {
                            /** @type {?} */
                            var currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
                            /** @type {?} */
                            var count = currentArray.reduce((/**
                             * @param {?} pre
                             * @param {?} cur
                             * @return {?}
                             */
                            function (pre, cur) { return pre + (cur.colspan || cur.colSpan || 1); }), 0);
                            /** @type {?} */
                            var width = listOfAutoWidth
                                .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                                .reduce((/**
                             * @param {?} pre
                             * @param {?} cur
                             * @return {?}
                             */
                            function (pre, cur) { return pre + cur; }), 0);
                            cell.setAutoRightWidth(width + "px");
                        }
                    }));
                }));
            }
        };
        /**
         * @return {?}
         */
        NzTrDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTrDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])',
                        host: {
                            '[class.ant-table-row]': 'isInsideTable'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzTrDirective.ctorParameters = function () { return [
            { type: NzTableStyleService, decorators: [{ type: core.Optional }] }
        ]; };
        NzTrDirective.propDecorators = {
            listOfNzThDirective: [{ type: core.ContentChildren, args: [NzThMeasureDirective,] }],
            listOfCellFixedDirective: [{ type: core.ContentChildren, args: [NzCellFixedDirective,] }]
        };
        return NzTrDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTrDirective.prototype.listOfNzThDirective;
        /** @type {?} */
        NzTrDirective.prototype.listOfCellFixedDirective;
        /**
         * @type {?}
         * @private
         */
        NzTrDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTrDirective.prototype.listOfFixedColumns$;
        /**
         * @type {?}
         * @private
         */
        NzTrDirective.prototype.listOfColumns$;
        /** @type {?} */
        NzTrDirective.prototype.listOfFixedColumnsChanges$;
        /** @type {?} */
        NzTrDirective.prototype.listOfFixedLeftColumnChanges$;
        /** @type {?} */
        NzTrDirective.prototype.listOfFixedRightColumnChanges$;
        /** @type {?} */
        NzTrDirective.prototype.listOfColumnsChanges$;
        /** @type {?} */
        NzTrDirective.prototype.isInsideTable;
        /**
         * @type {?}
         * @private
         */
        NzTrDirective.prototype.nzTableStyleService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/thead.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTheadComponent = /** @class */ (function () {
        function NzTheadComponent(elementRef, renderer, nzTableStyleService, nzTableDataService) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.nzTableStyleService = nzTableStyleService;
            this.nzTableDataService = nzTableDataService;
            this.destroy$ = new rxjs.Subject();
            this.isInsideTable = false;
            /**
             * @deprecated use nzSortFn and nzSortPriority instead *
             */
            this.nzSingleSort = false;
            /**
             * @deprecated use nzSortOrderChange instead *
             */
            this.nzSortChange = new core.EventEmitter();
            this.nzSortOrderChange = new core.EventEmitter();
            this.isInsideTable = !!this.nzTableStyleService;
        }
        /**
         * @return {?}
         */
        NzTheadComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this.nzTableStyleService) {
                this.nzTableStyleService.setTheadTemplate(this.templateRef);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTheadComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzSingleSort = changes.nzSingleSort;
            if (nzSingleSort) {
                logger.warnDeprecation("'nzSingleSort' is deprecated and will be removed in 10.0.0. Please use 'nzSortFn' and 'nzSortPriority' instead.");
            }
        };
        /**
         * @return {?}
         */
        NzTheadComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.nzTableStyleService) {
                /** @type {?} */
                var firstTableRow$ = (/** @type {?} */ (this.listOfNzTrDirective.changes.pipe(operators.startWith(this.listOfNzTrDirective), operators.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item && item.first; })))));
                /** @type {?} */
                var listOfColumnsChanges$_1 = firstTableRow$.pipe(operators.switchMap((/**
                 * @param {?} firstTableRow
                 * @return {?}
                 */
                function (firstTableRow) { return (firstTableRow ? firstTableRow.listOfColumnsChanges$ : rxjs.EMPTY); })), operators.takeUntil(this.destroy$));
                listOfColumnsChanges$_1.subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return _this.nzTableStyleService.setListOfTh(data); }));
                /** TODO: need reset the measure row when scrollX change **/
                this.nzTableStyleService.enableAutoMeasure$
                    .pipe(operators.switchMap((/**
                 * @param {?} enable
                 * @return {?}
                 */
                function (enable) { return (enable ? listOfColumnsChanges$_1 : rxjs.of([])); })))
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return _this.nzTableStyleService.setListOfMeasureColumn(data); }));
                /** @type {?} */
                var listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(operators.switchMap((/**
                 * @param {?} firstTr
                 * @return {?}
                 */
                function (firstTr) { return (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : rxjs.EMPTY); })), operators.takeUntil(this.destroy$));
                /** @type {?} */
                var listOfFixedRightColumnChanges$ = firstTableRow$.pipe(operators.switchMap((/**
                 * @param {?} firstTr
                 * @return {?}
                 */
                function (firstTr) { return (firstTr ? firstTr.listOfFixedRightColumnChanges$ : rxjs.EMPTY); })), operators.takeUntil(this.destroy$));
                listOfFixedLeftColumnChanges$.subscribe((/**
                 * @param {?} listOfFixedLeftColumn
                 * @return {?}
                 */
                function (listOfFixedLeftColumn) {
                    _this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
                }));
                listOfFixedRightColumnChanges$.subscribe((/**
                 * @param {?} listOfFixedRightColumn
                 * @return {?}
                 */
                function (listOfFixedRightColumn) {
                    _this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
                }));
            }
            if (this.nzTableDataService) {
                /** @type {?} */
                var listOfColumn$_1 = (/** @type {?} */ (this.listOfNzThAddOnComponent.changes.pipe(operators.startWith(this.listOfNzThAddOnComponent))));
                /** @type {?} */
                var manualSort$ = listOfColumn$_1.pipe(operators.switchMap((/**
                 * @return {?}
                 */
                function () { return rxjs.merge.apply(void 0, __spread(_this.listOfNzThAddOnComponent.map((/**
                 * @param {?} th
                 * @return {?}
                 */
                function (th) { return th.manualClickOrder$; })))); })), operators.takeUntil(this.destroy$));
                manualSort$.subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    /** @type {?} */
                    var emitValue = { key: data.nzColumnKey, value: data.sortOrder };
                    _this.nzSortChange.emit(emitValue);
                    _this.nzSortOrderChange.emit(emitValue);
                    if (_this.nzSingleSort || (data.nzSortFn && data.nzSortPriority === false)) {
                        _this.listOfNzThAddOnComponent.filter((/**
                         * @param {?} th
                         * @return {?}
                         */
                        function (th) { return th !== data; })).forEach((/**
                         * @param {?} th
                         * @return {?}
                         */
                        function (th) { return th.clearSortOrder(); }));
                    }
                }));
                /** @type {?} */
                var listOfCalcOperator$ = listOfColumn$_1.pipe(operators.switchMap((/**
                 * @param {?} list
                 * @return {?}
                 */
                function (list) {
                    return rxjs.merge.apply(void 0, __spread([listOfColumn$_1], list.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.calcOperatorChange$; })))).pipe(operators.flatMap((/**
                     * @return {?}
                     */
                    function () { return listOfColumn$_1; })));
                })), operators.map((/**
                 * @param {?} list
                 * @return {?}
                 */
                function (list) {
                    return list
                        .filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return !!item.nzSortFn || !!item.nzFilterFn; }))
                        .map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        var nzSortFn = item.nzSortFn, sortOrder = item.sortOrder, nzFilterFn = item.nzFilterFn, nzFilterValue = item.nzFilterValue, nzSortPriority = item.nzSortPriority, nzColumnKey = item.nzColumnKey;
                        return {
                            key: nzColumnKey,
                            sortFn: nzSortFn,
                            sortPriority: nzSortPriority,
                            sortOrder: (/** @type {?} */ (sortOrder)),
                            filterFn: (/** @type {?} */ (nzFilterFn)),
                            filterValue: nzFilterValue
                        };
                    }));
                })), 
                // TODO: after checked error here
                operators.delay(0));
                listOfCalcOperator$.subscribe((/**
                 * @param {?} list
                 * @return {?}
                 */
                function (list) {
                    _this.nzTableDataService.listOfCalcOperator$.next(list);
                }));
            }
        };
        /**
         * @return {?}
         */
        NzTheadComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            if (this.nzTableStyleService) {
                this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
            }
        };
        /**
         * @return {?}
         */
        NzTheadComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTheadComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'thead:not(.ant-table-thead)',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n    <ng-container *ngIf=\"!isInsideTable\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </ng-container>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzTheadComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: NzTableStyleService, decorators: [{ type: core.Optional }] },
            { type: NzTableDataService, decorators: [{ type: core.Optional }] }
        ]; };
        NzTheadComponent.propDecorators = {
            templateRef: [{ type: core.ViewChild, args: ['contentTemplate', { static: true },] }],
            listOfNzTrDirective: [{ type: core.ContentChildren, args: [NzTrDirective, { descendants: true },] }],
            listOfNzThAddOnComponent: [{ type: core.ContentChildren, args: [NzThAddOnComponent, { descendants: true },] }],
            nzSingleSort: [{ type: core.Input }],
            nzSortChange: [{ type: core.Output }],
            nzSortOrderChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTheadComponent.prototype, "nzSingleSort", void 0);
        return NzTheadComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTheadComponent.ngAcceptInputType_nzSingleSort;
        /**
         * @type {?}
         * @private
         */
        NzTheadComponent.prototype.destroy$;
        /** @type {?} */
        NzTheadComponent.prototype.isInsideTable;
        /** @type {?} */
        NzTheadComponent.prototype.templateRef;
        /** @type {?} */
        NzTheadComponent.prototype.listOfNzTrDirective;
        /** @type {?} */
        NzTheadComponent.prototype.listOfNzThAddOnComponent;
        /**
         * @deprecated use nzSortFn and nzSortPriority instead *
         * @type {?}
         */
        NzTheadComponent.prototype.nzSingleSort;
        /**
         * @deprecated use nzSortOrderChange instead *
         * @type {?}
         */
        NzTheadComponent.prototype.nzSortChange;
        /** @type {?} */
        NzTheadComponent.prototype.nzSortOrderChange;
        /**
         * @type {?}
         * @private
         */
        NzTheadComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTheadComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTheadComponent.prototype.nzTableStyleService;
        /**
         * @type {?}
         * @private
         */
        NzTheadComponent.prototype.nzTableDataService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/title-footer.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableTitleFooterComponent = /** @class */ (function () {
        function NzTableTitleFooterComponent() {
            this.title = null;
            this.footer = null;
        }
        NzTableTitleFooterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-table-title-footer',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <ng-container *nzStringTemplateOutlet=\"title\">{{ title }}</ng-container>\n    <ng-container *nzStringTemplateOutlet=\"footer\">{{ footer }}</ng-container>\n  ",
                        host: {
                            '[class.ant-table-title]': "title !== null",
                            '[class.ant-table-footer]': "footer !== null"
                        }
                    }] }
        ];
        NzTableTitleFooterComponent.propDecorators = {
            title: [{ type: core.Input }],
            footer: [{ type: core.Input }]
        };
        return NzTableTitleFooterComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTableTitleFooterComponent.prototype.title;
        /** @type {?} */
        NzTableTitleFooterComponent.prototype.footer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/tr-expand.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTrExpandDirective = /** @class */ (function () {
        function NzTrExpandDirective() {
            this.nzExpand = true;
        }
        NzTrExpandDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'tr[nzExpand]',
                        host: {
                            '[class.ant-table-expanded-row]': 'true',
                            '[hidden]': "!nzExpand"
                        }
                    },] }
        ];
        NzTrExpandDirective.propDecorators = {
            nzExpand: [{ type: core.Input }]
        };
        return NzTrExpandDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTrExpandDirective.prototype.nzExpand;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table/tr-measure.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTrMeasureComponent = /** @class */ (function () {
        function NzTrMeasureComponent(nzResizeObserver, ngZone) {
            this.nzResizeObserver = nzResizeObserver;
            this.ngZone = ngZone;
            this.listOfMeasureColumn = [];
            this.listOfAutoWidth = new core.EventEmitter();
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @param {?} _
         * @param {?} key
         * @return {?}
         */
        NzTrMeasureComponent.prototype.trackByFunc = /**
         * @param {?} _
         * @param {?} key
         * @return {?}
         */
        function (_, key) {
            return key;
        };
        /**
         * @return {?}
         */
        NzTrMeasureComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.listOfTdElement.changes
                .pipe(operators.startWith(this.listOfTdElement))
                .pipe(operators.switchMap((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return (/** @type {?} */ (rxjs.combineLatest(list.toArray().map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return _this.nzResizeObserver.observe(item).pipe(operators.map((/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var _b = __read(_a, 1), entry = _b[0];
                        var width = entry.target.getBoundingClientRect().width;
                        return Math.floor(width);
                    })));
                })))));
            })), operators.debounceTime(16), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    _this.listOfAutoWidth.next(data);
                }));
            }));
        };
        /**
         * @return {?}
         */
        NzTrMeasureComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTrMeasureComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'tr[nz-table-measure-row]',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <td\n      #tdElement\n      class=\"nz-disable-td\"\n      style=\"padding: 0px; border: 0px; height: 0px;\"\n      *ngFor=\"let th of listOfMeasureColumn; trackBy: trackByFunc\"\n    ></td>\n  ",
                        host: {
                            '[class.ant-table-measure-now]': 'true'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTrMeasureComponent.ctorParameters = function () { return [
            { type: resizeObservers.NzResizeObserver },
            { type: core.NgZone }
        ]; };
        NzTrMeasureComponent.propDecorators = {
            listOfMeasureColumn: [{ type: core.Input }],
            listOfAutoWidth: [{ type: core.Output }],
            listOfTdElement: [{ type: core.ViewChildren, args: ['tdElement',] }]
        };
        return NzTrMeasureComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTrMeasureComponent.prototype.listOfMeasureColumn;
        /** @type {?} */
        NzTrMeasureComponent.prototype.listOfAutoWidth;
        /** @type {?} */
        NzTrMeasureComponent.prototype.listOfTdElement;
        /**
         * @type {?}
         * @private
         */
        NzTrMeasureComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTrMeasureComponent.prototype.nzResizeObserver;
        /**
         * @type {?}
         * @private
         */
        NzTrMeasureComponent.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTableModule = /** @class */ (function () {
        function NzTableModule() {
        }
        NzTableModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NzTableComponent,
                            NzThAddOnComponent,
                            NzTableCellDirective,
                            NzThMeasureDirective,
                            NzTdAddOnComponent,
                            NzTheadComponent,
                            NzTbodyComponent,
                            NzTrDirective,
                            NzTrExpandDirective,
                            NzTableVirtualScrollDirective,
                            NzCellFixedDirective,
                            NzTableContentComponent,
                            NzTableTitleFooterComponent,
                            NzTableInnerDefaultComponent,
                            NzTableInnerScrollComponent,
                            NzTrMeasureComponent,
                            NzRowIndentDirective,
                            NzRowExpandButtonDirective,
                            NzCellBreakWordDirective,
                            NzCellAlignDirective,
                            NzTableSortersComponent,
                            NzTableFilterComponent,
                            NzTableSelectionComponent,
                            NzCellEllipsisDirective,
                            NzFilterTriggerComponent,
                            NzTableFixedRowComponent,
                            NzThSelectionComponent
                        ],
                        exports: [
                            NzTableComponent,
                            NzThAddOnComponent,
                            NzTableCellDirective,
                            NzThMeasureDirective,
                            NzTdAddOnComponent,
                            NzTheadComponent,
                            NzTbodyComponent,
                            NzTrDirective,
                            NzTableVirtualScrollDirective,
                            NzCellFixedDirective,
                            NzFilterTriggerComponent,
                            NzTrExpandDirective,
                            NzCellBreakWordDirective,
                            NzCellAlignDirective,
                            NzCellEllipsisDirective,
                            NzTableFixedRowComponent,
                            NzThSelectionComponent
                        ],
                        imports: [
                            menu.NzMenuModule,
                            forms.FormsModule,
                            outlet.NzOutletModule,
                            radio.NzRadioModule,
                            checkbox.NzCheckboxModule,
                            dropdown.NzDropDownModule,
                            button.NzButtonModule,
                            common.CommonModule,
                            platform.PlatformModule,
                            pagination.NzPaginationModule,
                            resizeObservers.NzResizeObserversModule,
                            spin.NzSpinModule,
                            i18n.NzI18nModule,
                            icon.NzIconModule,
                            empty.NzEmptyModule,
                            scrolling.ScrollingModule
                        ]
                    },] }
        ];
        return NzTableModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: src/table.types.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function NzTableQueryParams() { }
    if (false) {
        /** @type {?} */
        NzTableQueryParams.prototype.pageIndex;
        /** @type {?} */
        NzTableQueryParams.prototype.pageSize;
        /** @type {?} */
        NzTableQueryParams.prototype.sort;
        /** @type {?} */
        NzTableQueryParams.prototype.filter;
    }

    exports.NzCellAlignDirective = NzCellAlignDirective;
    exports.NzCellBreakWordDirective = NzCellBreakWordDirective;
    exports.NzCellEllipsisDirective = NzCellEllipsisDirective;
    exports.NzCellFixedDirective = NzCellFixedDirective;
    exports.NzFilterTriggerComponent = NzFilterTriggerComponent;
    exports.NzRowExpandButtonDirective = NzRowExpandButtonDirective;
    exports.NzRowIndentDirective = NzRowIndentDirective;
    exports.NzTableCellDirective = NzTableCellDirective;
    exports.NzTableComponent = NzTableComponent;
    exports.NzTableContentComponent = NzTableContentComponent;
    exports.NzTableDataService = NzTableDataService;
    exports.NzTableFilterComponent = NzTableFilterComponent;
    exports.NzTableFixedRowComponent = NzTableFixedRowComponent;
    exports.NzTableInnerDefaultComponent = NzTableInnerDefaultComponent;
    exports.NzTableInnerScrollComponent = NzTableInnerScrollComponent;
    exports.NzTableModule = NzTableModule;
    exports.NzTableSelectionComponent = NzTableSelectionComponent;
    exports.NzTableSortersComponent = NzTableSortersComponent;
    exports.NzTableStyleService = NzTableStyleService;
    exports.NzTableTitleFooterComponent = NzTableTitleFooterComponent;
    exports.NzTableVirtualScrollDirective = NzTableVirtualScrollDirective;
    exports.NzTbodyComponent = NzTbodyComponent;
    exports.NzTdAddOnComponent = NzTdAddOnComponent;
    exports.NzThAddOnComponent = NzThAddOnComponent;
    exports.NzThMeasureDirective = NzThMeasureDirective;
    exports.NzThSelectionComponent = NzThSelectionComponent;
    exports.NzTheadComponent = NzTheadComponent;
    exports.NzTrDirective = NzTrDirective;
    exports.NzTrExpandDirective = NzTrExpandDirective;
    exports.NzTrMeasureComponent = NzTrMeasureComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-table.umd.js.map
