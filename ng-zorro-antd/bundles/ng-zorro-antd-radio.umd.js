(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/util'), require('rxjs'), require('@angular/cdk/a11y'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/radio', ['exports', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/util', 'rxjs', '@angular/cdk/a11y', 'rxjs/operators', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].radio = {}), global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.util, global.rxjs, global.ng.cdk.a11y, global.rxjs.operators, global.ng.common));
}(this, (function (exports, core, forms, util, rxjs, a11y, operators, common) { 'use strict';

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
     * Generated from: radio-button.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRadioButtonDirective = /** @class */ (function () {
        function NzRadioButtonDirective() {
        }
        NzRadioButtonDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-radio-button]'
                    },] }
        ];
        return NzRadioButtonDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: radio.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRadioService = /** @class */ (function () {
        function NzRadioService() {
            this.selected$ = new rxjs.ReplaySubject(1);
            this.touched$ = new rxjs.Subject();
            this.disabled$ = new rxjs.ReplaySubject(1);
            this.name$ = new rxjs.ReplaySubject(1);
        }
        /**
         * @return {?}
         */
        NzRadioService.prototype.touch = /**
         * @return {?}
         */
        function () {
            this.touched$.next();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzRadioService.prototype.select = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selected$.next(value);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzRadioService.prototype.setDisabled = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.disabled$.next(value);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzRadioService.prototype.setName = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.name$.next(value);
        };
        NzRadioService.decorators = [
            { type: core.Injectable }
        ];
        return NzRadioService;
    }());
    if (false) {
        /** @type {?} */
        NzRadioService.prototype.selected$;
        /** @type {?} */
        NzRadioService.prototype.touched$;
        /** @type {?} */
        NzRadioService.prototype.disabled$;
        /** @type {?} */
        NzRadioService.prototype.name$;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: radio-group.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRadioGroupComponent = /** @class */ (function () {
        function NzRadioGroupComponent(cdr, nzRadioService) {
            this.cdr = cdr;
            this.nzRadioService = nzRadioService;
            this.value = null;
            this.destroy$ = new rxjs.Subject();
            this.onChange = (/**
             * @return {?}
             */
            function () { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            this.nzDisabled = false;
            this.nzButtonStyle = 'outline';
            this.nzSize = 'default';
            this.nzName = null;
        }
        /**
         * @return {?}
         */
        NzRadioGroupComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzRadioService.selected$.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (_this.value !== value) {
                    _this.value = value;
                    _this.onChange(_this.value);
                }
            }));
            this.nzRadioService.touched$.subscribe((/**
             * @return {?}
             */
            function () {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { return _this.onTouched(); }));
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzRadioGroupComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzDisabled = changes.nzDisabled, nzName = changes.nzName;
            if (nzDisabled) {
                this.nzRadioService.setDisabled(this.nzDisabled);
            }
            if (nzName) {
                this.nzRadioService.setName((/** @type {?} */ (this.nzName)));
            }
        };
        /**
         * @return {?}
         */
        NzRadioGroupComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzRadioGroupComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
            this.nzRadioService.select(value);
            this.cdr.markForCheck();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzRadioGroupComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzRadioGroupComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NzRadioGroupComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.nzDisabled = isDisabled;
            this.nzRadioService.setDisabled(isDisabled);
            this.cdr.markForCheck();
        };
        NzRadioGroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-radio-group',
                        exportAs: 'nzRadioGroup',
                        preserveWhitespaces: false,
                        template: " <ng-content></ng-content> ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            NzRadioService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzRadioGroupComponent; })),
                                multi: true
                            }
                        ],
                        host: {
                            '[class.ant-radio-group]': "true",
                            '[class.ant-radio-group-large]': "nzSize === 'large'",
                            '[class.ant-radio-group-small]': "nzSize === 'small'",
                            '[class.ant-radio-group-solid]': "nzButtonStyle === 'solid'"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzRadioGroupComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: NzRadioService }
        ]; };
        NzRadioGroupComponent.propDecorators = {
            nzDisabled: [{ type: core.Input }],
            nzButtonStyle: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzName: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzRadioGroupComponent.prototype, "nzDisabled", void 0);
        return NzRadioGroupComponent;
    }());
    if (false) {
        /** @type {?} */
        NzRadioGroupComponent.ngAcceptInputType_nzDisabled;
        /**
         * @type {?}
         * @private
         */
        NzRadioGroupComponent.prototype.value;
        /**
         * @type {?}
         * @private
         */
        NzRadioGroupComponent.prototype.destroy$;
        /** @type {?} */
        NzRadioGroupComponent.prototype.onChange;
        /** @type {?} */
        NzRadioGroupComponent.prototype.onTouched;
        /** @type {?} */
        NzRadioGroupComponent.prototype.nzDisabled;
        /** @type {?} */
        NzRadioGroupComponent.prototype.nzButtonStyle;
        /** @type {?} */
        NzRadioGroupComponent.prototype.nzSize;
        /** @type {?} */
        NzRadioGroupComponent.prototype.nzName;
        /**
         * @type {?}
         * @private
         */
        NzRadioGroupComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzRadioGroupComponent.prototype.nzRadioService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: radio.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRadioComponent = /** @class */ (function () {
        function NzRadioComponent(elementRef, cdr, focusMonitor, nzRadioService, nzRadioButtonDirective) {
            this.elementRef = elementRef;
            this.cdr = cdr;
            this.focusMonitor = focusMonitor;
            this.nzRadioService = nzRadioService;
            this.nzRadioButtonDirective = nzRadioButtonDirective;
            this.isNgModel = false;
            this.destroy$ = new rxjs.Subject();
            this.isChecked = false;
            this.name = null;
            this.isRadioButton = !!this.nzRadioButtonDirective;
            this.onChange = (/**
             * @return {?}
             */
            function () { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            this.nzValue = null;
            this.nzDisabled = false;
            this.nzAutoFocus = false;
        }
        /**
         * @param {?} event
         * @return {?}
         */
        NzRadioComponent.prototype.onHostClick = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** prevent label click triggered twice. **/
            event.stopPropagation();
            event.preventDefault();
            if (!this.nzDisabled && !this.isChecked) {
                if (this.nzRadioService) {
                    this.nzRadioService.select(this.nzValue);
                }
                if (this.isNgModel) {
                    this.isChecked = true;
                    this.onChange(true);
                }
            }
        };
        /**
         * @return {?}
         */
        NzRadioComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.focusMonitor.focusVia((/** @type {?} */ (this.inputElement)), 'keyboard');
        };
        /**
         * @return {?}
         */
        NzRadioComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            (/** @type {?} */ (this.inputElement)).nativeElement.blur();
        };
        /**
         * @param {?} disabled
         * @return {?}
         */
        NzRadioComponent.prototype.setDisabledState = /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this.nzDisabled = disabled;
            this.cdr.markForCheck();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzRadioComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isChecked = value;
            this.cdr.markForCheck();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzRadioComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.isNgModel = true;
            this.onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzRadioComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @return {?}
         */
        NzRadioComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.nzRadioService) {
                this.nzRadioService.name$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} name
                 * @return {?}
                 */
                function (name) {
                    _this.name = name;
                    _this.cdr.markForCheck();
                }));
                this.nzRadioService.disabled$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} disabled
                 * @return {?}
                 */
                function (disabled) {
                    _this.nzDisabled = disabled;
                    _this.cdr.markForCheck();
                }));
                this.nzRadioService.selected$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    _this.isChecked = _this.nzValue === value;
                    _this.cdr.markForCheck();
                }));
            }
            this.focusMonitor.monitor(this.elementRef, true).subscribe((/**
             * @param {?} focusOrigin
             * @return {?}
             */
            function (focusOrigin) {
                if (!focusOrigin) {
                    Promise.resolve().then((/**
                     * @return {?}
                     */
                    function () { return _this.onTouched(); }));
                    if (_this.nzRadioService) {
                        _this.nzRadioService.touch();
                    }
                }
            }));
        };
        /**
         * @return {?}
         */
        NzRadioComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            if (this.nzAutoFocus) {
                this.focus();
            }
        };
        /**
         * @return {?}
         */
        NzRadioComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            this.focusMonitor.stopMonitoring(this.elementRef);
        };
        NzRadioComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-radio],[nz-radio-button]',
                        exportAs: 'nzRadio',
                        preserveWhitespaces: false,
                        template: "\n    <span\n      [class.ant-radio]=\"!isRadioButton\"\n      [class.ant-radio-checked]=\"isChecked && !isRadioButton\"\n      [class.ant-radio-disabled]=\"nzDisabled && !isRadioButton\"\n      [class.ant-radio-button]=\"isRadioButton\"\n      [class.ant-radio-button-checked]=\"isChecked && isRadioButton\"\n      [class.ant-radio-button-disabled]=\"nzDisabled && isRadioButton\"\n    >\n      <input\n        #inputElement\n        type=\"radio\"\n        [attr.autofocus]=\"nzAutoFocus ? 'autofocus' : null\"\n        [class.ant-radio-input]=\"!isRadioButton\"\n        [class.ant-radio-button-input]=\"isRadioButton\"\n        [disabled]=\"nzDisabled\"\n        [checked]=\"isChecked\"\n        [attr.name]=\"name\"\n      />\n      <span [class.ant-radio-inner]=\"!isRadioButton\" [class.ant-radio-button-inner]=\"isRadioButton\"></span>\n    </span>\n    <span><ng-content></ng-content></span>\n  ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzRadioComponent; })),
                                multi: true
                            }
                        ],
                        host: {
                            '[class.ant-radio-wrapper]': '!isRadioButton',
                            '[class.ant-radio-button-wrapper]': 'isRadioButton',
                            '[class.ant-radio-wrapper-checked]': 'isChecked && !isRadioButton',
                            '[class.ant-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
                            '[class.ant-radio-wrapper-disabled]': 'nzDisabled && !isRadioButton',
                            '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled && isRadioButton',
                            '(click)': 'onHostClick($event)'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzRadioComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: a11y.FocusMonitor },
            { type: NzRadioService, decorators: [{ type: core.Optional }] },
            { type: NzRadioButtonDirective, decorators: [{ type: core.Optional }] }
        ]; };
        NzRadioComponent.propDecorators = {
            inputElement: [{ type: core.ViewChild, args: ['inputElement', { static: false },] }],
            nzValue: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzAutoFocus: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzRadioComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzRadioComponent.prototype, "nzAutoFocus", void 0);
        return NzRadioComponent;
    }());
    if (false) {
        /** @type {?} */
        NzRadioComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzRadioComponent.ngAcceptInputType_nzAutoFocus;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.isNgModel;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.destroy$;
        /** @type {?} */
        NzRadioComponent.prototype.isChecked;
        /** @type {?} */
        NzRadioComponent.prototype.name;
        /** @type {?} */
        NzRadioComponent.prototype.isRadioButton;
        /** @type {?} */
        NzRadioComponent.prototype.onChange;
        /** @type {?} */
        NzRadioComponent.prototype.onTouched;
        /** @type {?} */
        NzRadioComponent.prototype.inputElement;
        /** @type {?} */
        NzRadioComponent.prototype.nzValue;
        /** @type {?} */
        NzRadioComponent.prototype.nzDisabled;
        /** @type {?} */
        NzRadioComponent.prototype.nzAutoFocus;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.focusMonitor;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.nzRadioService;
        /**
         * @type {?}
         * @private
         */
        NzRadioComponent.prototype.nzRadioButtonDirective;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: radio.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRadioModule = /** @class */ (function () {
        function NzRadioModule() {
        }
        NzRadioModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule],
                        exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent],
                        declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent]
                    },] }
        ];
        return NzRadioModule;
    }());

    exports.NzRadioButtonDirective = NzRadioButtonDirective;
    exports.NzRadioComponent = NzRadioComponent;
    exports.NzRadioGroupComponent = NzRadioGroupComponent;
    exports.NzRadioModule = NzRadioModule;
    exports.NzRadioService = NzRadioService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-radio.umd.js.map
