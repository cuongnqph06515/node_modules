(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/layout'), require('@angular/cdk/platform'), require('@angular/core'), require('ng-zorro-antd/core/services'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/util'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/grid', ['exports', '@angular/cdk/layout', '@angular/cdk/platform', '@angular/core', 'ng-zorro-antd/core/services', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/util', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].grid = {}), global.ng.cdk.layout, global.ng.cdk.platform, global.ng.core, global['ng-zorro-antd'].core.services, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.util, global.ng.common));
}(this, (function (exports, layout, platform, core, services, rxjs, operators, util, common) { 'use strict';

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
     * Generated from: row.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzRowDirective = /** @class */ (function () {
        function NzRowDirective(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.mediaMatcher = mediaMatcher;
            this.ngZone = ngZone;
            this.platform = platform;
            this.breakpointService = breakpointService;
            /**
             * @deprecated don't need nzType="flex" after 9.0
             */
            this.nzType = 'flex';
            this.nzAlign = null;
            this.nzJustify = null;
            this.nzGutter = null;
            this.actualGutter$ = new rxjs.ReplaySubject(1);
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzRowDirective.prototype.getGutter = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var results = [null, null];
            /** @type {?} */
            var gutter = this.nzGutter || 0;
            /** @type {?} */
            var normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
            normalizedGutter.forEach((/**
             * @param {?} g
             * @param {?} index
             * @return {?}
             */
            function (g, index) {
                if (typeof g === 'object' && g !== null) {
                    results[index] = null;
                    Object.keys(services.gridResponsiveMap).map((/**
                     * @param {?} screen
                     * @return {?}
                     */
                    function (screen) {
                        /** @type {?} */
                        var bp = (/** @type {?} */ (screen));
                        if (_this.mediaMatcher.matchMedia(services.gridResponsiveMap[bp]).matches && g[bp]) {
                            results[index] = (/** @type {?} */ ((/** @type {?} */ (g))[bp]));
                        }
                    }));
                }
                else {
                    results[index] = g || null;
                }
            }));
            return results;
        };
        /**
         * @return {?}
         */
        NzRowDirective.prototype.setGutterStyle = /**
         * @return {?}
         */
        function () {
            var _this = this;
            var _a = __read(this.getGutter(), 2), horizontalGutter = _a[0], verticalGutter = _a[1];
            this.actualGutter$.next([horizontalGutter, verticalGutter]);
            /** @type {?} */
            var renderGutter = (/**
             * @param {?} name
             * @param {?} gutter
             * @return {?}
             */
            function (name, gutter) {
                /** @type {?} */
                var nativeElement = _this.elementRef.nativeElement;
                if (gutter !== null) {
                    _this.renderer.setStyle(nativeElement, name, "-" + gutter / 2 + "px");
                }
            });
            renderGutter('margin-left', horizontalGutter);
            renderGutter('margin-right', horizontalGutter);
            renderGutter('margin-top', verticalGutter);
            renderGutter('margin-bottom', verticalGutter);
        };
        /**
         * @return {?}
         */
        NzRowDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.setGutterStyle();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzRowDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzGutter) {
                this.setGutterStyle();
            }
        };
        /**
         * @return {?}
         */
        NzRowDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.platform.isBrowser) {
                this.breakpointService
                    .subscribe(services.gridResponsiveMap)
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.setGutterStyle();
                }));
            }
        };
        /**
         * @return {?}
         */
        NzRowDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzRowDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-row],nz-row,nz-form-item',
                        exportAs: 'nzRow',
                        host: {
                            '[class.ant-row]': "true",
                            '[class.ant-row-top]': "nzAlign === 'top'",
                            '[class.ant-row-middle]': "nzAlign === 'middle'",
                            '[class.ant-row-bottom]': "nzAlign === 'bottom'",
                            '[class.ant-row-start]': "nzJustify === 'start'",
                            '[class.ant-row-end]': "nzJustify === 'end'",
                            '[class.ant-row-center]': "nzJustify === 'center'",
                            '[class.ant-row-space-around]': "nzJustify === 'space-around'",
                            '[class.ant-row-space-between]': "nzJustify === 'space-between'"
                        }
                    },] }
        ];
        /** @nocollapse */
        NzRowDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: layout.MediaMatcher },
            { type: core.NgZone },
            { type: platform.Platform },
            { type: services.NzBreakpointService }
        ]; };
        NzRowDirective.propDecorators = {
            nzType: [{ type: core.Input }],
            nzAlign: [{ type: core.Input }],
            nzJustify: [{ type: core.Input }],
            nzGutter: [{ type: core.Input }]
        };
        return NzRowDirective;
    }());
    if (false) {
        /**
         * @deprecated don't need nzType="flex" after 9.0
         * @type {?}
         */
        NzRowDirective.prototype.nzType;
        /** @type {?} */
        NzRowDirective.prototype.nzAlign;
        /** @type {?} */
        NzRowDirective.prototype.nzJustify;
        /** @type {?} */
        NzRowDirective.prototype.nzGutter;
        /** @type {?} */
        NzRowDirective.prototype.actualGutter$;
        /**
         * @type {?}
         * @private
         */
        NzRowDirective.prototype.destroy$;
        /** @type {?} */
        NzRowDirective.prototype.elementRef;
        /** @type {?} */
        NzRowDirective.prototype.renderer;
        /** @type {?} */
        NzRowDirective.prototype.mediaMatcher;
        /** @type {?} */
        NzRowDirective.prototype.ngZone;
        /** @type {?} */
        NzRowDirective.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzRowDirective.prototype.breakpointService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: col.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function EmbeddedProperty() { }
    if (false) {
        /** @type {?|undefined} */
        EmbeddedProperty.prototype.span;
        /** @type {?|undefined} */
        EmbeddedProperty.prototype.pull;
        /** @type {?|undefined} */
        EmbeddedProperty.prototype.push;
        /** @type {?|undefined} */
        EmbeddedProperty.prototype.offset;
        /** @type {?|undefined} */
        EmbeddedProperty.prototype.order;
    }
    var NzColDirective = /** @class */ (function () {
        function NzColDirective(elementRef, nzRowDirective, renderer) {
            this.elementRef = elementRef;
            this.nzRowDirective = nzRowDirective;
            this.renderer = renderer;
            this.classMap = {};
            this.destroy$ = new rxjs.Subject();
            this.hostFlexStyle = null;
            this.nzFlex = null;
            this.nzSpan = null;
            this.nzOrder = null;
            this.nzOffset = null;
            this.nzPush = null;
            this.nzPull = null;
            this.nzXs = null;
            this.nzSm = null;
            this.nzMd = null;
            this.nzLg = null;
            this.nzXl = null;
            this.nzXXl = null;
        }
        /**
         * @return {?}
         */
        NzColDirective.prototype.setHostClassMap = /**
         * @return {?}
         */
        function () {
            var _a;
            /** @type {?} */
            var hostClassMap = __assign((_a = {}, _a['ant-col'] = true, _a["ant-col-" + this.nzSpan] = util.isNotNil(this.nzSpan), _a["ant-col-order-" + this.nzOrder] = util.isNotNil(this.nzOrder), _a["ant-col-offset-" + this.nzOffset] = util.isNotNil(this.nzOffset), _a["ant-col-pull-" + this.nzPull] = util.isNotNil(this.nzPull), _a["ant-col-push-" + this.nzPush] = util.isNotNil(this.nzPush), _a), this.generateClass());
            for (var i in this.classMap) {
                if (this.classMap.hasOwnProperty(i)) {
                    this.renderer.removeClass(this.elementRef.nativeElement, i);
                }
            }
            this.classMap = __assign({}, hostClassMap);
            for (var i in this.classMap) {
                if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
                    this.renderer.addClass(this.elementRef.nativeElement, i);
                }
            }
        };
        /**
         * @return {?}
         */
        NzColDirective.prototype.setHostFlexStyle = /**
         * @return {?}
         */
        function () {
            this.hostFlexStyle = this.parseFlex(this.nzFlex);
        };
        /**
         * @param {?} flex
         * @return {?}
         */
        NzColDirective.prototype.parseFlex = /**
         * @param {?} flex
         * @return {?}
         */
        function (flex) {
            if (typeof flex === 'number') {
                return flex + " " + flex + " auto";
            }
            else if (typeof flex === 'string') {
                if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
                    return "0 0 " + flex;
                }
            }
            return flex;
        };
        /**
         * @return {?}
         */
        NzColDirective.prototype.generateClass = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
            /** @type {?} */
            var listClassMap = {};
            listOfSizeInputName.forEach((/**
             * @param {?} name
             * @return {?}
             */
            function (name) {
                /** @type {?} */
                var sizeName = name.replace('nz', '').toLowerCase();
                if (util.isNotNil(_this[name])) {
                    if (typeof _this[name] === 'number' || typeof _this[name] === 'string') {
                        listClassMap["ant-col-" + sizeName + "-" + _this[name]] = true;
                    }
                    else {
                        /** @type {?} */
                        var embedded_1 = (/** @type {?} */ (_this[name]));
                        /** @type {?} */
                        var prefixArray = ['span', 'pull', 'push', 'offset', 'order'];
                        prefixArray.forEach((/**
                         * @param {?} prefix
                         * @return {?}
                         */
                        function (prefix) {
                            /** @type {?} */
                            var prefixClass = prefix === 'span' ? '-' : "-" + prefix + "-";
                            listClassMap["ant-col-" + sizeName + prefixClass + embedded_1[prefix]] = embedded_1 && util.isNotNil(embedded_1[prefix]);
                        }));
                    }
                }
            }));
            return listClassMap;
        };
        /**
         * @return {?}
         */
        NzColDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.setHostClassMap();
            this.setHostFlexStyle();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzColDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            this.setHostClassMap();
            var nzFlex = changes.nzFlex;
            if (nzFlex) {
                this.setHostFlexStyle();
            }
        };
        /**
         * @return {?}
         */
        NzColDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.nzRowDirective) {
                this.nzRowDirective.actualGutter$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), horizontalGutter = _b[0], verticalGutter = _b[1];
                    /** @type {?} */
                    var renderGutter = (/**
                     * @param {?} name
                     * @param {?} gutter
                     * @return {?}
                     */
                    function (name, gutter) {
                        /** @type {?} */
                        var nativeElement = _this.elementRef.nativeElement;
                        if (gutter !== null) {
                            _this.renderer.setStyle(nativeElement, name, gutter / 2 + "px");
                        }
                    });
                    renderGutter('padding-left', horizontalGutter);
                    renderGutter('padding-right', horizontalGutter);
                    renderGutter('padding-top', verticalGutter);
                    renderGutter('padding-bottom', verticalGutter);
                }));
            }
        };
        /**
         * @return {?}
         */
        NzColDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzColDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
                        exportAs: 'nzCol',
                        host: {
                            '[style.flex]': 'hostFlexStyle'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzColDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: NzRowDirective, decorators: [{ type: core.Optional }, { type: core.Host }] },
            { type: core.Renderer2 }
        ]; };
        NzColDirective.propDecorators = {
            nzFlex: [{ type: core.Input }],
            nzSpan: [{ type: core.Input }],
            nzOrder: [{ type: core.Input }],
            nzOffset: [{ type: core.Input }],
            nzPush: [{ type: core.Input }],
            nzPull: [{ type: core.Input }],
            nzXs: [{ type: core.Input }],
            nzSm: [{ type: core.Input }],
            nzMd: [{ type: core.Input }],
            nzLg: [{ type: core.Input }],
            nzXl: [{ type: core.Input }],
            nzXXl: [{ type: core.Input }]
        };
        return NzColDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzColDirective.prototype.classMap;
        /**
         * @type {?}
         * @private
         */
        NzColDirective.prototype.destroy$;
        /** @type {?} */
        NzColDirective.prototype.hostFlexStyle;
        /** @type {?} */
        NzColDirective.prototype.nzFlex;
        /** @type {?} */
        NzColDirective.prototype.nzSpan;
        /** @type {?} */
        NzColDirective.prototype.nzOrder;
        /** @type {?} */
        NzColDirective.prototype.nzOffset;
        /** @type {?} */
        NzColDirective.prototype.nzPush;
        /** @type {?} */
        NzColDirective.prototype.nzPull;
        /** @type {?} */
        NzColDirective.prototype.nzXs;
        /** @type {?} */
        NzColDirective.prototype.nzSm;
        /** @type {?} */
        NzColDirective.prototype.nzMd;
        /** @type {?} */
        NzColDirective.prototype.nzLg;
        /** @type {?} */
        NzColDirective.prototype.nzXl;
        /** @type {?} */
        NzColDirective.prototype.nzXXl;
        /**
         * @type {?}
         * @private
         */
        NzColDirective.prototype.elementRef;
        /** @type {?} */
        NzColDirective.prototype.nzRowDirective;
        /** @type {?} */
        NzColDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: grid.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzGridModule = /** @class */ (function () {
        function NzGridModule() {
        }
        NzGridModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzColDirective, NzRowDirective],
                        exports: [NzColDirective, NzRowDirective],
                        imports: [common.CommonModule, layout.LayoutModule, platform.PlatformModule]
                    },] }
        ];
        return NzGridModule;
    }());

    exports.NzColDirective = NzColDirective;
    exports.NzGridModule = NzGridModule;
    exports.NzRowDirective = NzRowDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-grid.umd.js.map
