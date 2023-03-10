(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/observers'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/spin', ['exports', '@angular/core', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/cdk/observers', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].spin = {}), global.ng.core, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.cdk.observers, global.ng.common));
}(this, (function (exports, core, config, util, rxjs, operators, observers, common) { 'use strict';

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
     * Generated from: spin.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'spin';
    var NzSpinComponent = /** @class */ (function () {
        function NzSpinComponent(nzConfigService, cdr) {
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.nzIndicator = null;
            this.nzSize = 'default';
            this.nzTip = null;
            this.nzDelay = 0;
            this.nzSimple = false;
            this.nzSpinning = true;
            this.destroy$ = new rxjs.Subject();
            this.spinning$ = new rxjs.BehaviorSubject(this.nzSpinning);
            this.delay$ = new rxjs.BehaviorSubject(this.nzDelay);
            this.isLoading = true;
        }
        /**
         * @return {?}
         */
        NzSpinComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var loading$ = this.spinning$.pipe(operators.flatMap((/**
             * @return {?}
             */
            function () { return _this.delay$; })), operators.flatMap((/**
             * @param {?} delay
             * @return {?}
             */
            function (delay) {
                if (delay === 0) {
                    return _this.spinning$;
                }
                else {
                    return _this.spinning$.pipe(operators.debounceTime(delay));
                }
            })), operators.takeUntil(this.destroy$));
            loading$.subscribe((/**
             * @param {?} loading
             * @return {?}
             */
            function (loading) {
                _this.isLoading = loading;
                _this.cdr.markForCheck();
            }));
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.cdr.markForCheck(); }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSpinComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzSpinning = changes.nzSpinning, nzDelay = changes.nzDelay;
            if (nzSpinning) {
                this.spinning$.next(this.nzSpinning);
            }
            if (nzDelay) {
                this.delay$.next(this.nzDelay);
            }
        };
        /**
         * @return {?}
         */
        NzSpinComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzSpinComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-spin',
                        exportAs: 'nzSpin',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <ng-template #defaultTemplate>\n      <span class=\"ant-spin-dot ant-spin-dot-spin\">\n        <i class=\"ant-spin-dot-item\"></i>\n        <i class=\"ant-spin-dot-item\"></i>\n        <i class=\"ant-spin-dot-item\"></i>\n        <i class=\"ant-spin-dot-item\"></i>\n      </span>\n    </ng-template>\n    <div *ngIf=\"isLoading\">\n      <div\n        class=\"ant-spin\"\n        [class.ant-spin-spinning]=\"isLoading\"\n        [class.ant-spin-lg]=\"nzSize === 'large'\"\n        [class.ant-spin-sm]=\"nzSize === 'small'\"\n        [class.ant-spin-show-text]=\"nzTip\"\n      >\n        <ng-template [ngTemplateOutlet]=\"nzIndicator || defaultTemplate\"></ng-template>\n        <div class=\"ant-spin-text\" *ngIf=\"nzTip\">{{ nzTip }}</div>\n      </div>\n    </div>\n    <div *ngIf=\"!nzSimple\" class=\"ant-spin-container\" [class.ant-spin-blur]=\"isLoading\">\n      <ng-content></ng-content>\n    </div>\n  ",
                        host: {
                            '[class.ant-spin-nested-loading]': '!nzSimple'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSpinComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzSpinComponent.propDecorators = {
            nzIndicator: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzTip: [{ type: core.Input }],
            nzDelay: [{ type: core.Input }],
            nzSimple: [{ type: core.Input }],
            nzSpinning: [{ type: core.Input }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzSpinComponent.prototype, "nzIndicator", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Object)
        ], NzSpinComponent.prototype, "nzDelay", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSpinComponent.prototype, "nzSimple", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSpinComponent.prototype, "nzSpinning", void 0);
        return NzSpinComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSpinComponent.ngAcceptInputType_nzDelay;
        /** @type {?} */
        NzSpinComponent.ngAcceptInputType_nzSimple;
        /** @type {?} */
        NzSpinComponent.ngAcceptInputType_nzSpinning;
        /** @type {?} */
        NzSpinComponent.prototype.nzIndicator;
        /** @type {?} */
        NzSpinComponent.prototype.nzSize;
        /** @type {?} */
        NzSpinComponent.prototype.nzTip;
        /** @type {?} */
        NzSpinComponent.prototype.nzDelay;
        /** @type {?} */
        NzSpinComponent.prototype.nzSimple;
        /** @type {?} */
        NzSpinComponent.prototype.nzSpinning;
        /**
         * @type {?}
         * @private
         */
        NzSpinComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzSpinComponent.prototype.spinning$;
        /**
         * @type {?}
         * @private
         */
        NzSpinComponent.prototype.delay$;
        /** @type {?} */
        NzSpinComponent.prototype.isLoading;
        /** @type {?} */
        NzSpinComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzSpinComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: spin.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSpinModule = /** @class */ (function () {
        function NzSpinModule() {
        }
        NzSpinModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [NzSpinComponent],
                        declarations: [NzSpinComponent],
                        imports: [common.CommonModule, observers.ObserversModule]
                    },] }
        ];
        return NzSpinModule;
    }());

    exports.NzSpinComponent = NzSpinComponent;
    exports.NzSpinModule = NzSpinModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-spin.umd.js.map
