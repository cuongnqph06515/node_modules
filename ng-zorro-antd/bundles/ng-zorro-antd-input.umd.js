(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/core'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/cdk/platform'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/services')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/input', ['exports', '@angular/cdk/a11y', '@angular/core', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/cdk/platform', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/services'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].input = {}), global.ng.cdk.a11y, global.ng.core, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.forms, global.ng.cdk.platform, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.services));
}(this, (function (exports, a11y, core, util, rxjs, operators, forms, platform, common, outlet, icon, services) { 'use strict';

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
     * Generated from: input.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzInputDirective = /** @class */ (function () {
        function NzInputDirective(ngControl, renderer, elementRef) {
            this.ngControl = ngControl;
            this.nzSize = 'default';
            this._disabled = false;
            this.disabled$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
            renderer.addClass(elementRef.nativeElement, 'ant-input');
        }
        Object.defineProperty(NzInputDirective.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.ngControl && this.ngControl.disabled !== null) {
                    return this.ngControl.disabled;
                }
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = value != null && "" + value !== 'false';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzInputDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            var _a;
            if (this.ngControl) {
                (_a = this.ngControl.statusChanges) === null || _a === void 0 ? void 0 : _a.pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return _this.ngControl.disabled !== null; })), operators.takeUntil(this.destroy$)).subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.disabled$.next((/** @type {?} */ (_this.ngControl.disabled)));
                }));
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzInputDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var disabled = changes.disabled;
            if (disabled) {
                this.disabled$.next(this.disabled);
            }
        };
        /**
         * @return {?}
         */
        NzInputDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzInputDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[nz-input],textarea[nz-input]',
                        exportAs: 'nzInput',
                        host: {
                            '[class.ant-input-disabled]': 'disabled',
                            '[class.ant-input-lg]': "nzSize === 'large'",
                            '[class.ant-input-sm]': "nzSize === 'small'",
                            '[attr.disabled]': 'disabled || null'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzInputDirective.ctorParameters = function () { return [
            { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        NzInputDirective.propDecorators = {
            nzSize: [{ type: core.Input }],
            disabled: [{ type: core.Input }]
        };
        return NzInputDirective;
    }());
    if (false) {
        /** @type {?} */
        NzInputDirective.ngAcceptInputType_disabled;
        /** @type {?} */
        NzInputDirective.prototype.nzSize;
        /** @type {?} */
        NzInputDirective.prototype._disabled;
        /** @type {?} */
        NzInputDirective.prototype.disabled$;
        /**
         * @type {?}
         * @private
         */
        NzInputDirective.prototype.destroy$;
        /** @type {?} */
        NzInputDirective.prototype.ngControl;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: input-group.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzInputGroupWhitSuffixOrPrefixDirective = /** @class */ (function () {
        function NzInputGroupWhitSuffixOrPrefixDirective(elementRef) {
            this.elementRef = elementRef;
        }
        NzInputGroupWhitSuffixOrPrefixDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]"
                    },] }
        ];
        /** @nocollapse */
        NzInputGroupWhitSuffixOrPrefixDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        return NzInputGroupWhitSuffixOrPrefixDirective;
    }());
    if (false) {
        /** @type {?} */
        NzInputGroupWhitSuffixOrPrefixDirective.prototype.elementRef;
    }
    var NzInputGroupComponent = /** @class */ (function () {
        function NzInputGroupComponent(focusMonitor, elementRef, cdr) {
            this.focusMonitor = focusMonitor;
            this.elementRef = elementRef;
            this.cdr = cdr;
            this.nzAddOnBeforeIcon = null;
            this.nzAddOnAfterIcon = null;
            this.nzPrefixIcon = null;
            this.nzSuffixIcon = null;
            this.nzSize = 'default';
            this.nzSearch = false;
            this.nzCompact = false;
            this.isLarge = false;
            this.isSmall = false;
            this.isAffix = false;
            this.isAddOn = false;
            this.focused = false;
            this.disabled = false;
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzInputGroupComponent.prototype.updateChildrenInputSize = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.listOfNzInputDirective) {
                this.listOfNzInputDirective.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return (item.nzSize = _this.nzSize); }));
            }
        };
        /**
         * @return {?}
         */
        NzInputGroupComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.focusMonitor
                .monitor(this.elementRef, true)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} focusOrigin
             * @return {?}
             */
            function (focusOrigin) {
                _this.focused = !!focusOrigin;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzInputGroupComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.updateChildrenInputSize();
            /** @type {?} */
            var listOfInputChange$ = this.listOfNzInputDirective.changes.pipe(operators.startWith(this.listOfNzInputDirective));
            listOfInputChange$
                .pipe(operators.switchMap((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return rxjs.merge.apply(void 0, __spread([listOfInputChange$], list.map((/**
                 * @param {?} input
                 * @return {?}
                 */
                function (input) { return input.disabled$; }))));
            })), operators.flatMap((/**
             * @return {?}
             */
            function () { return listOfInputChange$; })), operators.map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return list.some((/**
             * @param {?} input
             * @return {?}
             */
            function (input) { return input.disabled; })); })), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} disabled
             * @return {?}
             */
            function (disabled) {
                _this.disabled = disabled;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzInputGroupComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzSize = changes.nzSize, nzSuffix = changes.nzSuffix, nzPrefix = changes.nzPrefix, nzPrefixIcon = changes.nzPrefixIcon, nzSuffixIcon = changes.nzSuffixIcon, nzAddOnAfter = changes.nzAddOnAfter, nzAddOnBefore = changes.nzAddOnBefore, nzAddOnAfterIcon = changes.nzAddOnAfterIcon, nzAddOnBeforeIcon = changes.nzAddOnBeforeIcon;
            if (nzSize) {
                this.updateChildrenInputSize();
                this.isLarge = this.nzSize === 'large';
                this.isSmall = this.nzSize === 'small';
            }
            if (nzSuffix || nzPrefix || nzPrefixIcon || nzSuffixIcon) {
                this.isAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
            }
            if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
                this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
            }
        };
        /**
         * @return {?}
         */
        NzInputGroupComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzInputGroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-input-group',
                        exportAs: 'nzInputGroup',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <span class=\"ant-input-wrapper ant-input-group\" *ngIf=\"isAddOn; else noAddOnTemplate\">\n      <span\n        *ngIf=\"nzAddOnBefore || nzAddOnBeforeIcon\"\n        nz-input-group-slot\n        type=\"addon\"\n        [icon]=\"nzAddOnBeforeIcon\"\n        [template]=\"nzAddOnBefore\"\n      >\n      </span>\n      <span\n        *ngIf=\"isAffix; else contentTemplate\"\n        class=\"ant-input-affix-wrapper\"\n        [class.ant-input-affix-wrapper-sm]=\"isSmall\"\n        [class.ant-input-affix-wrapper-lg]=\"isLarge\"\n      >\n        <ng-template [ngTemplateOutlet]=\"affixTemplate\"></ng-template>\n      </span>\n      <span\n        *ngIf=\"nzAddOnAfter || nzAddOnAfterIcon\"\n        nz-input-group-slot\n        type=\"addon\"\n        [icon]=\"nzAddOnAfterIcon\"\n        [template]=\"nzAddOnAfter\"\n      ></span>\n    </span>\n    <ng-template #noAddOnTemplate>\n      <ng-template [ngIf]=\"isAffix\" [ngIfElse]=\"contentTemplate\">\n        <ng-template [ngTemplateOutlet]=\"affixTemplate\"></ng-template>\n      </ng-template>\n    </ng-template>\n    <ng-template #affixTemplate>\n      <span *ngIf=\"nzPrefix || nzPrefixIcon\" nz-input-group-slot type=\"prefix\" [icon]=\"nzPrefixIcon\" [template]=\"nzPrefix\"></span>\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n      <span *ngIf=\"nzSuffix || nzSuffixIcon\" nz-input-group-slot type=\"suffix\" [icon]=\"nzSuffixIcon\" [template]=\"nzSuffix\"></span>\n    </ng-template>\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-input-group-compact]': "nzCompact",
                            '[class.ant-input-search-enter-button]': "nzSearch",
                            '[class.ant-input-search]': "nzSearch",
                            '[class.ant-input-search-sm]': "nzSearch && isSmall",
                            '[class.ant-input-search-large]': "nzSearch && isLarge",
                            '[class.ant-input-group-wrapper]': "isAddOn",
                            '[class.ant-input-group-wrapper-lg]': "isAddOn && isLarge",
                            '[class.ant-input-group-wrapper-sm]': "isAddOn && isSmall",
                            '[class.ant-input-affix-wrapper]': "isAffix && !isAddOn",
                            '[class.ant-input-affix-wrapper-focused]': "isAffix && focused",
                            '[class.ant-input-affix-wrapper-disabled]': "isAffix && disabled",
                            '[class.ant-input-affix-wrapper-lg]': "isAffix && !isAddOn && isLarge",
                            '[class.ant-input-affix-wrapper-sm]': "isAffix && !isAddOn && isSmall",
                            '[class.ant-input-group]': "!isAffix && !isAddOn",
                            '[class.ant-input-group-lg]': "!isAffix && !isAddOn && isLarge",
                            '[class.ant-input-group-sm]': "!isAffix && !isAddOn && isSmall"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzInputGroupComponent.ctorParameters = function () { return [
            { type: a11y.FocusMonitor },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        NzInputGroupComponent.propDecorators = {
            listOfNzInputDirective: [{ type: core.ContentChildren, args: [NzInputDirective,] }],
            nzAddOnBeforeIcon: [{ type: core.Input }],
            nzAddOnAfterIcon: [{ type: core.Input }],
            nzPrefixIcon: [{ type: core.Input }],
            nzSuffixIcon: [{ type: core.Input }],
            nzAddOnBefore: [{ type: core.Input }],
            nzAddOnAfter: [{ type: core.Input }],
            nzPrefix: [{ type: core.Input }],
            nzSuffix: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzSearch: [{ type: core.Input }],
            nzCompact: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzInputGroupComponent.prototype, "nzSearch", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzInputGroupComponent.prototype, "nzCompact", void 0);
        return NzInputGroupComponent;
    }());
    if (false) {
        /** @type {?} */
        NzInputGroupComponent.ngAcceptInputType_nzSearch;
        /** @type {?} */
        NzInputGroupComponent.ngAcceptInputType_nzCompact;
        /** @type {?} */
        NzInputGroupComponent.prototype.listOfNzInputDirective;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzAddOnBeforeIcon;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzAddOnAfterIcon;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzPrefixIcon;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzSuffixIcon;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzAddOnBefore;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzAddOnAfter;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzPrefix;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzSuffix;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzSize;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzSearch;
        /** @type {?} */
        NzInputGroupComponent.prototype.nzCompact;
        /** @type {?} */
        NzInputGroupComponent.prototype.isLarge;
        /** @type {?} */
        NzInputGroupComponent.prototype.isSmall;
        /** @type {?} */
        NzInputGroupComponent.prototype.isAffix;
        /** @type {?} */
        NzInputGroupComponent.prototype.isAddOn;
        /** @type {?} */
        NzInputGroupComponent.prototype.focused;
        /** @type {?} */
        NzInputGroupComponent.prototype.disabled;
        /**
         * @type {?}
         * @private
         */
        NzInputGroupComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzInputGroupComponent.prototype.focusMonitor;
        /**
         * @type {?}
         * @private
         */
        NzInputGroupComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzInputGroupComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: autosize.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AutoSizeType() { }
    if (false) {
        /** @type {?|undefined} */
        AutoSizeType.prototype.minRows;
        /** @type {?|undefined} */
        AutoSizeType.prototype.maxRows;
    }
    var NzAutosizeDirective = /** @class */ (function () {
        function NzAutosizeDirective(elementRef, ngZone, platform, resizeService) {
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.platform = platform;
            this.resizeService = resizeService;
            this.autosize = false;
            this.el = this.elementRef.nativeElement;
            this.maxHeight = null;
            this.minHeight = null;
            this.destroy$ = new rxjs.Subject();
            this.inputGap = 10;
        }
        Object.defineProperty(NzAutosizeDirective.prototype, "nzAutosize", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var isAutoSizeType = (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    return typeof data !== 'string' && typeof data !== 'boolean' && (!!data.maxRows || !!data.minRows);
                });
                if (typeof value === 'string') {
                    this.autosize = true;
                }
                else if (isAutoSizeType(value)) {
                    this.autosize = value;
                    this.minRows = value.minRows;
                    this.maxRows = value.maxRows;
                    this.maxHeight = this.setMaxHeight();
                    this.minHeight = this.setMinHeight();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?=} force
         * @return {?}
         */
        NzAutosizeDirective.prototype.resizeToFitContent = /**
         * @param {?=} force
         * @return {?}
         */
        function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            this.cacheTextareaLineHeight();
            // If we haven't determined the line-height yet, we know we're still hidden and there's no point
            // in checking the height of the textarea.
            if (!this.cachedLineHeight) {
                return;
            }
            /** @type {?} */
            var textarea = (/** @type {?} */ (this.el));
            /** @type {?} */
            var value = textarea.value;
            // Only resize if the value or minRows have changed since these calculations can be expensive.
            if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
                return;
            }
            /** @type {?} */
            var placeholderText = textarea.placeholder;
            // Reset the textarea height to auto in order to shrink back to its default size.
            // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
            // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
            // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
            // need to be removed temporarily.
            textarea.classList.add('nz-textarea-autosize-measuring');
            textarea.placeholder = '';
            /** @type {?} */
            var height = Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight + this.inputGap;
            if (this.maxHeight !== null && height > this.maxHeight) {
                height = (/** @type {?} */ (this.maxHeight));
            }
            if (this.minHeight !== null && height < this.minHeight) {
                height = (/** @type {?} */ (this.minHeight));
            }
            // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
            textarea.style.height = height + "px";
            textarea.classList.remove('nz-textarea-autosize-measuring');
            textarea.placeholder = placeholderText;
            // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
            // We need to re-set the selection in order for it to scroll to the proper position.
            if (typeof requestAnimationFrame !== 'undefined') {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return requestAnimationFrame((/**
                     * @return {?}
                     */
                    function () {
                        var selectionStart = textarea.selectionStart, selectionEnd = textarea.selectionEnd;
                        // IE will throw an "Unspecified error" if we try to set the selection range after the
                        // element has been removed from the DOM. Assert that the directive hasn't been destroyed
                        // between the time we requested the animation frame and when it was executed.
                        // Also note that we have to assert that the textarea is focused before we set the
                        // selection range. Setting the selection range on a non-focused textarea will cause
                        // it to receive focus on IE and Edge.
                        if (!_this.destroy$.isStopped && document.activeElement === textarea) {
                            textarea.setSelectionRange(selectionStart, selectionEnd);
                        }
                    }));
                }));
            }
            this.previousValue = value;
            this.previousMinRows = this.minRows;
        };
        /**
         * @private
         * @return {?}
         */
        NzAutosizeDirective.prototype.cacheTextareaLineHeight = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.cachedLineHeight >= 0 || !this.el.parentNode) {
                return;
            }
            // Use a clone element because we have to override some styles.
            /** @type {?} */
            var textareaClone = (/** @type {?} */ (this.el.cloneNode(false)));
            textareaClone.rows = 1;
            // Use `position: absolute` so that this doesn't cause a browser layout and use
            // `visibility: hidden` so that nothing is rendered. Clear any other styles that
            // would affect the height.
            textareaClone.style.position = 'absolute';
            textareaClone.style.visibility = 'hidden';
            textareaClone.style.border = 'none';
            textareaClone.style.padding = '0';
            textareaClone.style.height = '';
            textareaClone.style.minHeight = '';
            textareaClone.style.maxHeight = '';
            // In Firefox it happens that textarea elements are always bigger than the specified amount
            // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
            // As a workaround that removes the extra space for the scrollbar, we can just set overflow
            // to hidden. This ensures that there is no invalid calculation of the line height.
            // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
            textareaClone.style.overflow = 'hidden';
            (/** @type {?} */ (this.el.parentNode)).appendChild(textareaClone);
            this.cachedLineHeight = textareaClone.clientHeight - this.inputGap;
            (/** @type {?} */ (this.el.parentNode)).removeChild(textareaClone);
            // Min and max heights have to be re-calculated if the cached line height changes
            this.maxHeight = this.setMaxHeight();
            this.minHeight = this.setMinHeight();
        };
        /**
         * @return {?}
         */
        NzAutosizeDirective.prototype.setMinHeight = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var minHeight = this.minRows && this.cachedLineHeight ? this.minRows * this.cachedLineHeight + this.inputGap : null;
            if (minHeight !== null) {
                this.el.style.minHeight = minHeight + "px";
            }
            return minHeight;
        };
        /**
         * @return {?}
         */
        NzAutosizeDirective.prototype.setMaxHeight = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var maxHeight = this.maxRows && this.cachedLineHeight ? this.maxRows * this.cachedLineHeight + this.inputGap : null;
            if (maxHeight !== null) {
                this.el.style.maxHeight = maxHeight + "px";
            }
            return maxHeight;
        };
        /**
         * @return {?}
         */
        NzAutosizeDirective.prototype.noopInputHandler = /**
         * @return {?}
         */
        function () {
            // no-op handler that ensures we're running change detection on input events.
        };
        /**
         * @return {?}
         */
        NzAutosizeDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.autosize && this.platform.isBrowser) {
                this.resizeToFitContent();
                this.resizeService
                    .subscribe()
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.resizeToFitContent(true); }));
            }
        };
        /**
         * @return {?}
         */
        NzAutosizeDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @return {?}
         */
        NzAutosizeDirective.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            if (this.autosize && this.platform.isBrowser) {
                this.resizeToFitContent();
            }
        };
        NzAutosizeDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'textarea[nzAutosize]',
                        exportAs: 'nzAutosize',
                        host: {
                            // Textarea elements that have the directive applied should have a single row by default.
                            // Browsers normally show two rows by default and therefore this limits the minRows binding.
                            rows: '1',
                            '(input)': 'noopInputHandler()'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzAutosizeDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: platform.Platform },
            { type: services.NzResizeService }
        ]; };
        NzAutosizeDirective.propDecorators = {
            nzAutosize: [{ type: core.Input }]
        };
        return NzAutosizeDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.autosize;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.cachedLineHeight;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.previousValue;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.previousMinRows;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.minRows;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.maxRows;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.maxHeight;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.minHeight;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.inputGap;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzAutosizeDirective.prototype.resizeService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: input-group-slot.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzInputGroupSlotComponent = /** @class */ (function () {
        function NzInputGroupSlotComponent() {
            this.icon = null;
            this.type = null;
            this.template = null;
        }
        NzInputGroupSlotComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-input-group-slot]',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <i nz-icon [nzType]=\"icon\" *ngIf=\"icon\"></i>\n    <ng-container *nzStringTemplateOutlet=\"template\">{{ template }}</ng-container>\n  ",
                        host: {
                            '[class.ant-input-group-addon]': "type === 'addon'",
                            '[class.ant-input-prefix]': "type === 'prefix'",
                            '[class.ant-input-suffix]': "type === 'suffix'"
                        }
                    }] }
        ];
        NzInputGroupSlotComponent.propDecorators = {
            icon: [{ type: core.Input }],
            type: [{ type: core.Input }],
            template: [{ type: core.Input }]
        };
        return NzInputGroupSlotComponent;
    }());
    if (false) {
        /** @type {?} */
        NzInputGroupSlotComponent.prototype.icon;
        /** @type {?} */
        NzInputGroupSlotComponent.prototype.type;
        /** @type {?} */
        NzInputGroupSlotComponent.prototype.template;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: input.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzInputModule = /** @class */ (function () {
        function NzInputModule() {
        }
        NzInputModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NzInputDirective,
                            NzInputGroupComponent,
                            NzAutosizeDirective,
                            NzInputGroupSlotComponent,
                            NzInputGroupWhitSuffixOrPrefixDirective
                        ],
                        exports: [NzInputDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupWhitSuffixOrPrefixDirective],
                        imports: [common.CommonModule, icon.NzIconModule, platform.PlatformModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzInputModule;
    }());

    exports.NzAutosizeDirective = NzAutosizeDirective;
    exports.NzInputDirective = NzInputDirective;
    exports.NzInputGroupComponent = NzInputGroupComponent;
    exports.NzInputGroupSlotComponent = NzInputGroupSlotComponent;
    exports.NzInputGroupWhitSuffixOrPrefixDirective = NzInputGroupWhitSuffixOrPrefixDirective;
    exports.NzInputModule = NzInputModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-input.umd.js.map
