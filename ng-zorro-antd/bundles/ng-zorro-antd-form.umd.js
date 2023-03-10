(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/layout'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/grid'), require('ng-zorro-antd/icon'), require('@angular/forms'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/i18n'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/logger')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/form', ['exports', '@angular/cdk/layout', '@angular/cdk/platform', '@angular/common', '@angular/core', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/grid', 'ng-zorro-antd/icon', '@angular/forms', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/util', 'ng-zorro-antd/i18n', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/logger'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].form = {}), global.ng.cdk.layout, global.ng.cdk.platform, global.ng.common, global.ng.core, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].grid, global['ng-zorro-antd'].icon, global.ng.forms, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].i18n, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.logger));
}(this, (function (exports, layout, platform, common, core, outlet, grid, icon, forms, animation, util, i18n, rxjs, operators, config, logger) { 'use strict';

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
     * Generated from: form.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'form';
    var NzFormDirective = /** @class */ (function () {
        function NzFormDirective(nzConfigService, elementRef, renderer) {
            this.nzConfigService = nzConfigService;
            this.renderer = renderer;
            this.nzLayout = 'horizontal';
            this.nzNoColon = false;
            this.nzAutoTips = {};
            this.nzDisableAutoTips = false;
            this.destroy$ = new rxjs.Subject();
            this.inputChanges$ = new rxjs.Subject();
            this.renderer.addClass(elementRef.nativeElement, 'ant-form');
        }
        /**
         * @template K
         * @param {?} changeType
         * @return {?}
         */
        NzFormDirective.prototype.getInputObservable = /**
         * @template K
         * @param {?} changeType
         * @return {?}
         */
        function (changeType) {
            return this.inputChanges$.pipe(operators.filter((/**
             * @param {?} changes
             * @return {?}
             */
            function (changes) { return changeType in changes; })), operators.map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value[(/** @type {?} */ (changeType))]; })));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzFormDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            this.inputChanges$.next(changes);
        };
        /**
         * @return {?}
         */
        NzFormDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzFormDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-form]',
                        exportAs: 'nzForm',
                        host: {
                            '[class.ant-form-horizontal]': "nzLayout === 'horizontal'",
                            '[class.ant-form-vertical]': "nzLayout === 'vertical'",
                            '[class.ant-form-inline]': "nzLayout === 'inline'"
                        }
                    },] }
        ];
        /** @nocollapse */
        NzFormDirective.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzFormDirective.propDecorators = {
            nzLayout: [{ type: core.Input }],
            nzNoColon: [{ type: core.Input }],
            nzAutoTips: [{ type: core.Input }],
            nzDisableAutoTips: [{ type: core.Input }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzFormDirective.prototype, "nzNoColon", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzFormDirective.prototype, "nzAutoTips", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzFormDirective.prototype, "nzDisableAutoTips", void 0);
        return NzFormDirective;
    }());
    if (false) {
        /** @type {?} */
        NzFormDirective.ngAcceptInputType_nzNoColon;
        /** @type {?} */
        NzFormDirective.ngAcceptInputType_nzDisableAutoTips;
        /** @type {?} */
        NzFormDirective.prototype.nzLayout;
        /** @type {?} */
        NzFormDirective.prototype.nzNoColon;
        /** @type {?} */
        NzFormDirective.prototype.nzAutoTips;
        /** @type {?} */
        NzFormDirective.prototype.nzDisableAutoTips;
        /** @type {?} */
        NzFormDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzFormDirective.prototype.inputChanges$;
        /** @type {?} */
        NzFormDirective.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzFormDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form-item.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 *
     */
    var NzFormItemComponent = /** @class */ (function () {
        function NzFormItemComponent(elementRef, renderer, cdr) {
            this.cdr = cdr;
            this.status = null;
            this.hasFeedback = false;
            this.withHelpClass = false;
            this.destroy$ = new rxjs.Subject();
            renderer.addClass(elementRef.nativeElement, 'ant-form-item');
        }
        Object.defineProperty(NzFormItemComponent.prototype, "nzFlex", {
            /**
             * @deprecated 10.0.0. 'nzFlex' is deprecated and going to be removed in 10.0.0.
             */
            set: /**
             * @deprecated 10.0.0. 'nzFlex' is deprecated and going to be removed in 10.0.0.
             * @param {?} _
             * @return {?}
             */
            function (_) {
                logger.warnDeprecation("'nzFlex' is deprecated and going to be removed in 10.0.0.");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        NzFormItemComponent.prototype.setWithHelpViaTips = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.withHelpClass = value;
            this.cdr.markForCheck();
        };
        /**
         * @param {?} status
         * @return {?}
         */
        NzFormItemComponent.prototype.setStatus = /**
         * @param {?} status
         * @return {?}
         */
        function (status) {
            this.status = status;
            this.cdr.markForCheck();
        };
        /**
         * @param {?} hasFeedback
         * @return {?}
         */
        NzFormItemComponent.prototype.setHasFeedback = /**
         * @param {?} hasFeedback
         * @return {?}
         */
        function (hasFeedback) {
            this.hasFeedback = hasFeedback;
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzFormItemComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzFormItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-form-item',
                        exportAs: 'nzFormItem',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class.ant-form-item-has-success]': 'status === "success"',
                            '[class.ant-form-item-has-warning]': 'status === "warning"',
                            '[class.ant-form-item-has-error]': 'status === "error"',
                            '[class.ant-form-item-is-validating]': 'status === "validating"',
                            '[class.ant-form-item-has-feedback]': 'hasFeedback && status',
                            '[class.ant-form-item-with-help]': 'withHelpClass'
                        },
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        /** @nocollapse */
        NzFormItemComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef }
        ]; };
        NzFormItemComponent.propDecorators = {
            nzFlex: [{ type: core.Input }]
        };
        return NzFormItemComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFormItemComponent.prototype.status;
        /** @type {?} */
        NzFormItemComponent.prototype.hasFeedback;
        /** @type {?} */
        NzFormItemComponent.prototype.withHelpClass;
        /**
         * @type {?}
         * @private
         */
        NzFormItemComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzFormItemComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form-control.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var iconTypeMap = (/** @type {?} */ ({
        error: 'close-circle-fill',
        validating: 'loading',
        success: 'check-circle-fill',
        warning: 'exclamation-circle-fill'
    }));
    var NzFormControlComponent = /** @class */ (function () {
        function NzFormControlComponent(elementRef, nzFormItemComponent, cdr, renderer, i18n, nzFormDirective) {
            var _this = this;
            var _a, _b;
            this.nzFormItemComponent = nzFormItemComponent;
            this.cdr = cdr;
            this.nzFormDirective = nzFormDirective;
            this._hasFeedback = false;
            this.validateChanges = rxjs.Subscription.EMPTY;
            this.validateString = null;
            this.status = null;
            this.destroyed$ = new rxjs.Subject();
            this.validateControl = null;
            this.iconType = null;
            this.innerTip = null;
            this.nzAutoTips = {};
            this.nzDisableAutoTips = 'default';
            renderer.addClass(elementRef.nativeElement, 'ant-form-item-control');
            this.subscribeAutoTips(i18n.localeChange.pipe(operators.tap((/**
             * @param {?} locale
             * @return {?}
             */
            function (locale) { return (_this.localeId = locale.locale); }))));
            this.subscribeAutoTips((_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.getInputObservable('nzAutoTips'));
            this.subscribeAutoTips((_b = this.nzFormDirective) === null || _b === void 0 ? void 0 : _b.getInputObservable('nzDisableAutoTips').pipe(operators.filter((/**
             * @return {?}
             */
            function () { return _this.nzDisableAutoTips === 'default'; }))));
        }
        Object.defineProperty(NzFormControlComponent.prototype, "disableAutoTips", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                var _a;
                return this.nzDisableAutoTips !== 'default' ? util.toBoolean(this.nzDisableAutoTips) : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzDisableAutoTips;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzFormControlComponent.prototype, "nzHasFeedback", {
            get: /**
             * @return {?}
             */
            function () {
                return this._hasFeedback;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._hasFeedback = util.toBoolean(value);
                if (this.nzFormItemComponent) {
                    this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzFormControlComponent.prototype, "nzValidateStatus", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value instanceof forms.AbstractControl || value instanceof forms.NgModel) {
                    this.validateControl = value;
                    this.validateString = null;
                    this.watchControl();
                }
                else if (value instanceof forms.FormControlName) {
                    this.validateControl = value.control;
                    this.validateString = null;
                    this.watchControl();
                }
                else {
                    this.validateString = value;
                    this.validateControl = null;
                    this.setStatus();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @return {?}
         */
        NzFormControlComponent.prototype.watchControl = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.validateChanges.unsubscribe();
            /** miss detect https://github.com/angular/angular/issues/10887 **/
            if (this.validateControl && this.validateControl.statusChanges) {
                this.validateChanges = this.validateControl.statusChanges.pipe(operators.startWith(null), operators.takeUntil(this.destroyed$)).subscribe((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) {
                    if (!_this.disableAutoTips) {
                        _this.updateAutoErrorTip();
                    }
                    _this.setStatus();
                    _this.cdr.markForCheck();
                }));
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzFormControlComponent.prototype.setStatus = /**
         * @private
         * @return {?}
         */
        function () {
            this.status = this.getControlStatus(this.validateString);
            this.iconType = this.status ? iconTypeMap[this.status] : null;
            this.innerTip = this.getInnerTip(this.status);
            if (this.nzFormItemComponent) {
                this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
                this.nzFormItemComponent.setStatus(this.status);
            }
        };
        /**
         * @private
         * @param {?} validateString
         * @return {?}
         */
        NzFormControlComponent.prototype.getControlStatus = /**
         * @private
         * @param {?} validateString
         * @return {?}
         */
        function (validateString) {
            /** @type {?} */
            var status;
            if (validateString === 'warning' || this.validateControlStatus('INVALID', 'warning')) {
                status = 'warning';
            }
            else if (validateString === 'error' || this.validateControlStatus('INVALID')) {
                status = 'error';
            }
            else if (validateString === 'validating' || validateString === 'pending' || this.validateControlStatus('PENDING')) {
                status = 'validating';
            }
            else if (validateString === 'success' || this.validateControlStatus('VALID')) {
                status = 'success';
            }
            else {
                status = null;
            }
            return status;
        };
        /**
         * @private
         * @param {?} validStatus
         * @param {?=} statusType
         * @return {?}
         */
        NzFormControlComponent.prototype.validateControlStatus = /**
         * @private
         * @param {?} validStatus
         * @param {?=} statusType
         * @return {?}
         */
        function (validStatus, statusType) {
            if (!this.validateControl) {
                return false;
            }
            else {
                var _a = this.validateControl, dirty = _a.dirty, touched = _a.touched, status_1 = _a.status;
                return (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status_1 === validStatus);
            }
        };
        /**
         * @private
         * @param {?} status
         * @return {?}
         */
        NzFormControlComponent.prototype.getInnerTip = /**
         * @private
         * @param {?} status
         * @return {?}
         */
        function (status) {
            switch (status) {
                case 'error':
                    return (!this.disableAutoTips && this.autoErrorTip) || this.nzErrorTip || null;
                case 'validating':
                    return this.nzValidatingTip || null;
                case 'success':
                    return this.nzSuccessTip || null;
                case 'warning':
                    return this.nzWarningTip || null;
                default:
                    return null;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzFormControlComponent.prototype.updateAutoErrorTip = /**
         * @private
         * @return {?}
         */
        function () {
            var _a, _b, _c, _d, _e, _f, _g;
            if (this.validateControl) {
                /** @type {?} */
                var errors = this.validateControl.errors || {};
                /** @type {?} */
                var autoErrorTip = '';
                for (var key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        autoErrorTip = (_d = (_a = errors[key][this.localeId]) !== null && _a !== void 0 ? _a : (_c = (_b = this.nzAutoTips) === null || _b === void 0 ? void 0 : _b[this.localeId]) === null || _c === void 0 ? void 0 : _c[key]) !== null && _d !== void 0 ? _d : (_g = (_f = (_e = this.nzFormDirective) === null || _e === void 0 ? void 0 : _e.nzAutoTips) === null || _f === void 0 ? void 0 : _f[this.localeId]) === null || _g === void 0 ? void 0 : _g[key];
                    }
                    if (!!autoErrorTip) {
                        break;
                    }
                }
                this.autoErrorTip = autoErrorTip;
            }
        };
        /**
         * @private
         * @param {?} observable
         * @return {?}
         */
        NzFormControlComponent.prototype.subscribeAutoTips = /**
         * @private
         * @param {?} observable
         * @return {?}
         */
        function (observable) {
            var _this = this;
            observable === null || observable === void 0 ? void 0 : observable.pipe(operators.takeUntil(this.destroyed$)).subscribe((/**
             * @return {?}
             */
            function () {
                if (!_this.disableAutoTips) {
                    _this.updateAutoErrorTip();
                    _this.setStatus();
                    _this.cdr.markForCheck();
                }
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzFormControlComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzDisableAutoTips = changes.nzDisableAutoTips, nzAutoTips = changes.nzAutoTips, nzSuccessTip = changes.nzSuccessTip, nzWarningTip = changes.nzWarningTip, nzErrorTip = changes.nzErrorTip, nzValidatingTip = changes.nzValidatingTip;
            if (nzDisableAutoTips || nzAutoTips) {
                this.updateAutoErrorTip();
                this.setStatus();
            }
            else if (nzSuccessTip || nzWarningTip || nzErrorTip || nzValidatingTip) {
                this.setStatus();
            }
        };
        /**
         * @return {?}
         */
        NzFormControlComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.setStatus();
        };
        /**
         * @return {?}
         */
        NzFormControlComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        /**
         * @return {?}
         */
        NzFormControlComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            if (!this.validateControl && !this.validateString) {
                if (this.defaultValidateControl instanceof forms.FormControlDirective) {
                    this.nzValidateStatus = this.defaultValidateControl.control;
                }
                else {
                    this.nzValidateStatus = (/** @type {?} */ (this.defaultValidateControl));
                }
            }
        };
        NzFormControlComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-form-control',
                        exportAs: 'nzFormControl',
                        preserveWhitespaces: false,
                        animations: [animation.helpMotion],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <div class=\"ant-form-item-control-input\">\n      <div class=\"ant-form-item-control-input-content\">\n        <ng-content></ng-content>\n      </div>\n      <span class=\"ant-form-item-children-icon\">\n        <i *ngIf=\"nzHasFeedback && iconType\" nz-icon [nzType]=\"iconType\"></i>\n      </span>\n    </div>\n    <div class=\"ant-form-item-explain\" *ngIf=\"innerTip\">\n      <div @helpMotion>\n        <ng-container *nzStringTemplateOutlet=\"innerTip; context: { $implicit: validateControl }\">{{ innerTip }}</ng-container>\n      </div>\n    </div>\n    <div class=\"ant-form-item-extra\" *ngIf=\"nzExtra\">\n      <ng-container *nzStringTemplateOutlet=\"nzExtra\">{{ nzExtra }}</ng-container>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzFormControlComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: NzFormItemComponent, decorators: [{ type: core.Optional }, { type: core.Host }] },
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 },
            { type: i18n.NzI18nService },
            { type: NzFormDirective, decorators: [{ type: core.Optional }, { type: core.Host }] }
        ]; };
        NzFormControlComponent.propDecorators = {
            defaultValidateControl: [{ type: core.ContentChild, args: [forms.NgControl, { static: false },] }],
            nzSuccessTip: [{ type: core.Input }],
            nzWarningTip: [{ type: core.Input }],
            nzErrorTip: [{ type: core.Input }],
            nzValidatingTip: [{ type: core.Input }],
            nzExtra: [{ type: core.Input }],
            nzAutoTips: [{ type: core.Input }],
            nzDisableAutoTips: [{ type: core.Input }],
            nzHasFeedback: [{ type: core.Input }],
            nzValidateStatus: [{ type: core.Input }]
        };
        return NzFormControlComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFormControlComponent.ngAcceptInputType_nzHasFeedback;
        /** @type {?} */
        NzFormControlComponent.ngAcceptInputType_nzRequired;
        /** @type {?} */
        NzFormControlComponent.ngAcceptInputType_nzNoColon;
        /** @type {?} */
        NzFormControlComponent.ngAcceptInputType_nzDisableAutoTips;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype._hasFeedback;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.validateChanges;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.validateString;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.status;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.destroyed$;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.localeId;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.autoErrorTip;
        /** @type {?} */
        NzFormControlComponent.prototype.validateControl;
        /** @type {?} */
        NzFormControlComponent.prototype.iconType;
        /** @type {?} */
        NzFormControlComponent.prototype.innerTip;
        /** @type {?} */
        NzFormControlComponent.prototype.defaultValidateControl;
        /** @type {?} */
        NzFormControlComponent.prototype.nzSuccessTip;
        /** @type {?} */
        NzFormControlComponent.prototype.nzWarningTip;
        /** @type {?} */
        NzFormControlComponent.prototype.nzErrorTip;
        /** @type {?} */
        NzFormControlComponent.prototype.nzValidatingTip;
        /** @type {?} */
        NzFormControlComponent.prototype.nzExtra;
        /** @type {?} */
        NzFormControlComponent.prototype.nzAutoTips;
        /** @type {?} */
        NzFormControlComponent.prototype.nzDisableAutoTips;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.nzFormItemComponent;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzFormControlComponent.prototype.nzFormDirective;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form-label.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzFormLabelComponent = /** @class */ (function () {
        function NzFormLabelComponent(elementRef, renderer, cdr, nzFormDirective) {
            var _this = this;
            this.cdr = cdr;
            this.nzFormDirective = nzFormDirective;
            this.nzRequired = false;
            this.noColon = 'default';
            this.destroy$ = new rxjs.Subject();
            renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
            if (this.nzFormDirective) {
                this.nzFormDirective
                    .getInputObservable('nzNoColon')
                    .pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return _this.noColon === 'default'; })), operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.cdr.markForCheck(); }));
            }
        }
        Object.defineProperty(NzFormLabelComponent.prototype, "nzNoColon", {
            get: /**
             * @return {?}
             */
            function () {
                var _a;
                return this.noColon !== 'default' ? this.noColon : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzNoColon;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.noColon = util.toBoolean(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzFormLabelComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzFormLabelComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-form-label',
                        exportAs: 'nzFormLabel',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <label [attr.for]=\"nzFor\" [class.ant-form-item-no-colon]=\"nzNoColon\" [class.ant-form-item-required]=\"nzRequired\">\n      <ng-content></ng-content>\n    </label>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzFormLabelComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef },
            { type: NzFormDirective, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
        ]; };
        NzFormLabelComponent.propDecorators = {
            nzFor: [{ type: core.Input }],
            nzRequired: [{ type: core.Input }],
            nzNoColon: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzFormLabelComponent.prototype, "nzRequired", void 0);
        return NzFormLabelComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFormLabelComponent.ngAcceptInputType_nzRequired;
        /** @type {?} */
        NzFormLabelComponent.ngAcceptInputType_nzNoColon;
        /** @type {?} */
        NzFormLabelComponent.prototype.nzFor;
        /** @type {?} */
        NzFormLabelComponent.prototype.nzRequired;
        /** @type {?} */
        NzFormLabelComponent.prototype.noColon;
        /**
         * @type {?}
         * @private
         */
        NzFormLabelComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzFormLabelComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzFormLabelComponent.prototype.nzFormDirective;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form-split.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzFormSplitComponent = /** @class */ (function () {
        function NzFormSplitComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-split');
        }
        NzFormSplitComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-form-split',
                        exportAs: 'nzFormSplit',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        /** @nocollapse */
        NzFormSplitComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzFormSplitComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFormSplitComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzFormSplitComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form-text.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzFormTextComponent = /** @class */ (function () {
        function NzFormTextComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-text');
        }
        NzFormTextComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-form-text',
                        exportAs: 'nzFormText',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        /** @nocollapse */
        NzFormTextComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzFormTextComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFormTextComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzFormTextComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: form.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzFormModule = /** @class */ (function () {
        function NzFormModule() {
        }
        NzFormModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NzFormDirective,
                            NzFormItemComponent,
                            NzFormLabelComponent,
                            NzFormControlComponent,
                            NzFormTextComponent,
                            NzFormSplitComponent
                        ],
                        exports: [
                            grid.NzGridModule,
                            NzFormDirective,
                            NzFormItemComponent,
                            NzFormLabelComponent,
                            NzFormControlComponent,
                            NzFormTextComponent,
                            NzFormSplitComponent
                        ],
                        imports: [common.CommonModule, grid.NzGridModule, icon.NzIconModule, layout.LayoutModule, platform.PlatformModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzFormModule;
    }());

    exports.NzFormControlComponent = NzFormControlComponent;
    exports.NzFormDirective = NzFormDirective;
    exports.NzFormItemComponent = NzFormItemComponent;
    exports.NzFormLabelComponent = NzFormLabelComponent;
    exports.NzFormModule = NzFormModule;
    exports.NzFormSplitComponent = NzFormSplitComponent;
    exports.NzFormTextComponent = NzFormTextComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-form.umd.js.map
