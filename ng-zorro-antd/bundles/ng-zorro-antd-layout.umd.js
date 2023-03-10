(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/platform'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/menu'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/layout'), require('@angular/common'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/layout', ['exports', '@angular/core', '@angular/cdk/platform', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/util', 'ng-zorro-antd/menu', 'rxjs', 'rxjs/operators', '@angular/cdk/layout', '@angular/common', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].layout = {}), global.ng.core, global.ng.cdk.platform, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].menu, global.rxjs, global.rxjs.operators, global.ng.cdk.layout, global.ng.common, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, platform, services, util, menu, rxjs, operators, layout, common, icon) { 'use strict';

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
     * Generated from: content.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzContentComponent = /** @class */ (function () {
        function NzContentComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-content');
        }
        NzContentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-content',
                        exportAs: 'nzContent',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        /** @nocollapse */
        NzContentComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzContentComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzContentComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzContentComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: footer.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzFooterComponent = /** @class */ (function () {
        function NzFooterComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-footer');
        }
        NzFooterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-footer',
                        exportAs: 'nzFooter',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        /** @nocollapse */
        NzFooterComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzFooterComponent;
    }());
    if (false) {
        /** @type {?} */
        NzFooterComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzFooterComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: header.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzHeaderComponent = /** @class */ (function () {
        function NzHeaderComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-header');
        }
        NzHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-header',
                        exportAs: 'nzHeader',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        /** @nocollapse */
        NzHeaderComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzHeaderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzHeaderComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzHeaderComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sider.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSiderComponent = /** @class */ (function () {
        function NzSiderComponent(platform, cdr, breakpointService) {
            this.platform = platform;
            this.cdr = cdr;
            this.breakpointService = breakpointService;
            this.destroy$ = new rxjs.Subject();
            this.nzMenuDirective = null;
            this.nzCollapsedChange = new core.EventEmitter();
            this.nzWidth = 200;
            this.nzTheme = 'dark';
            this.nzCollapsedWidth = 80;
            this.nzBreakpoint = null;
            this.nzZeroTrigger = null;
            this.nzTrigger = undefined;
            this.nzReverseArrow = false;
            this.nzCollapsible = false;
            this.nzCollapsed = false;
            this.matchBreakPoint = false;
            this.flexSetting = null;
            this.widthSetting = null;
        }
        /**
         * @return {?}
         */
        NzSiderComponent.prototype.updateStyleMap = /**
         * @return {?}
         */
        function () {
            this.widthSetting = this.nzCollapsed ? this.nzCollapsedWidth + "px" : util.toCssPixel(this.nzWidth);
            this.flexSetting = "0 0 " + this.widthSetting;
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzSiderComponent.prototype.updateMenuInlineCollapsed = /**
         * @return {?}
         */
        function () {
            if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
                this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
            }
        };
        /**
         * @param {?} collapsed
         * @return {?}
         */
        NzSiderComponent.prototype.setCollapsed = /**
         * @param {?} collapsed
         * @return {?}
         */
        function (collapsed) {
            if (collapsed !== this.nzCollapsed) {
                this.nzCollapsed = collapsed;
                this.nzCollapsedChange.emit(collapsed);
                this.updateMenuInlineCollapsed();
                this.updateStyleMap();
                this.cdr.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NzSiderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.updateStyleMap();
            if (this.platform.isBrowser) {
                this.breakpointService
                    .subscribe(services.siderResponsiveMap, true)
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @param {?} map
                 * @return {?}
                 */
                function (map) {
                    /** @type {?} */
                    var breakpoint = _this.nzBreakpoint;
                    if (breakpoint) {
                        util.inNextTick().subscribe((/**
                         * @return {?}
                         */
                        function () {
                            _this.matchBreakPoint = !map[breakpoint];
                            _this.setCollapsed(_this.matchBreakPoint);
                            _this.cdr.markForCheck();
                        }));
                    }
                }));
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSiderComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzCollapsed = changes.nzCollapsed, nzCollapsedWidth = changes.nzCollapsedWidth, nzWidth = changes.nzWidth;
            if (nzCollapsed || nzCollapsedWidth || nzWidth) {
                this.updateStyleMap();
            }
            if (nzCollapsed) {
                this.updateMenuInlineCollapsed();
            }
        };
        /**
         * @return {?}
         */
        NzSiderComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.updateMenuInlineCollapsed();
        };
        /**
         * @return {?}
         */
        NzSiderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzSiderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-sider',
                        exportAs: 'nzSider',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <div class=\"ant-layout-sider-children\">\n      <ng-content></ng-content>\n    </div>\n    <div\n      *ngIf=\"nzCollapsible && nzTrigger !== null\"\n      nz-sider-trigger\n      [matchBreakPoint]=\"matchBreakPoint\"\n      [nzCollapsedWidth]=\"nzCollapsedWidth\"\n      [nzCollapsed]=\"nzCollapsed\"\n      [nzBreakpoint]=\"nzBreakpoint\"\n      [nzReverseArrow]=\"nzReverseArrow\"\n      [nzTrigger]=\"nzTrigger\"\n      [nzZeroTrigger]=\"nzZeroTrigger\"\n      [siderWidth]=\"widthSetting\"\n      (click)=\"setCollapsed(!nzCollapsed)\"\n    ></div>\n  ",
                        host: {
                            '[class.ant-layout-sider]': 'true',
                            '[class.ant-layout-sider-zero-width]': "nzCollapsed && nzCollapsedWidth === 0",
                            '[class.ant-layout-sider-light]': "nzTheme === 'light'",
                            '[class.ant-layout-sider-dark]': "nzTheme === 'dark'",
                            '[class.ant-layout-sider-collapsed]': "nzCollapsed",
                            '[style.flex]': 'flexSetting',
                            '[style.maxWidth]': 'widthSetting',
                            '[style.minWidth]': 'widthSetting',
                            '[style.width]': 'widthSetting'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSiderComponent.ctorParameters = function () { return [
            { type: platform.Platform },
            { type: core.ChangeDetectorRef },
            { type: services.NzBreakpointService }
        ]; };
        NzSiderComponent.propDecorators = {
            nzMenuDirective: [{ type: core.ContentChild, args: [menu.NzMenuDirective,] }],
            nzCollapsedChange: [{ type: core.Output }],
            nzWidth: [{ type: core.Input }],
            nzTheme: [{ type: core.Input }],
            nzCollapsedWidth: [{ type: core.Input }],
            nzBreakpoint: [{ type: core.Input }],
            nzZeroTrigger: [{ type: core.Input }],
            nzTrigger: [{ type: core.Input }],
            nzReverseArrow: [{ type: core.Input }],
            nzCollapsible: [{ type: core.Input }],
            nzCollapsed: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSiderComponent.prototype, "nzReverseArrow", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSiderComponent.prototype, "nzCollapsible", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSiderComponent.prototype, "nzCollapsed", void 0);
        return NzSiderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSiderComponent.ngAcceptInputType_nzReverseArrow;
        /** @type {?} */
        NzSiderComponent.ngAcceptInputType_nzCollapsible;
        /** @type {?} */
        NzSiderComponent.ngAcceptInputType_nzCollapsed;
        /**
         * @type {?}
         * @private
         */
        NzSiderComponent.prototype.destroy$;
        /** @type {?} */
        NzSiderComponent.prototype.nzMenuDirective;
        /** @type {?} */
        NzSiderComponent.prototype.nzCollapsedChange;
        /** @type {?} */
        NzSiderComponent.prototype.nzWidth;
        /** @type {?} */
        NzSiderComponent.prototype.nzTheme;
        /** @type {?} */
        NzSiderComponent.prototype.nzCollapsedWidth;
        /** @type {?} */
        NzSiderComponent.prototype.nzBreakpoint;
        /** @type {?} */
        NzSiderComponent.prototype.nzZeroTrigger;
        /** @type {?} */
        NzSiderComponent.prototype.nzTrigger;
        /** @type {?} */
        NzSiderComponent.prototype.nzReverseArrow;
        /** @type {?} */
        NzSiderComponent.prototype.nzCollapsible;
        /** @type {?} */
        NzSiderComponent.prototype.nzCollapsed;
        /** @type {?} */
        NzSiderComponent.prototype.matchBreakPoint;
        /** @type {?} */
        NzSiderComponent.prototype.flexSetting;
        /** @type {?} */
        NzSiderComponent.prototype.widthSetting;
        /**
         * @type {?}
         * @private
         */
        NzSiderComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzSiderComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzSiderComponent.prototype.breakpointService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: layout.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzLayoutComponent = /** @class */ (function () {
        function NzLayoutComponent() {
        }
        NzLayoutComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-layout',
                        exportAs: 'nzLayout',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        template: " <ng-content></ng-content> ",
                        host: {
                            '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0',
                            '[class.ant-layout]': 'true'
                        }
                    }] }
        ];
        NzLayoutComponent.propDecorators = {
            listOfNzSiderComponent: [{ type: core.ContentChildren, args: [NzSiderComponent,] }]
        };
        return NzLayoutComponent;
    }());
    if (false) {
        /** @type {?} */
        NzLayoutComponent.prototype.listOfNzSiderComponent;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: sider-trigger.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSiderTriggerComponent = /** @class */ (function () {
        function NzSiderTriggerComponent() {
            this.nzCollapsed = false;
            this.nzReverseArrow = false;
            this.nzZeroTrigger = null;
            this.nzTrigger = undefined;
            this.matchBreakPoint = false;
            this.nzCollapsedWidth = null;
            this.siderWidth = null;
            this.nzBreakpoint = null;
            this.isZeroTrigger = false;
            this.isNormalTrigger = false;
        }
        /**
         * @return {?}
         */
        NzSiderTriggerComponent.prototype.updateTriggerType = /**
         * @return {?}
         */
        function () {
            this.isZeroTrigger = this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
            this.isNormalTrigger = this.nzCollapsedWidth !== 0;
        };
        /**
         * @return {?}
         */
        NzSiderTriggerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.updateTriggerType();
        };
        /**
         * @return {?}
         */
        NzSiderTriggerComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.updateTriggerType();
        };
        NzSiderTriggerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-sider-trigger]',
                        exportAs: 'nzSiderTrigger',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-container *ngIf=\"isZeroTrigger\">\n      <ng-template [ngTemplateOutlet]=\"nzZeroTrigger || defaultZeroTrigger\"></ng-template>\n    </ng-container>\n    <ng-container *ngIf=\"isNormalTrigger\">\n      <ng-template [ngTemplateOutlet]=\"nzTrigger || defaultTrigger\"></ng-template>\n    </ng-container>\n    <ng-template #defaultTrigger>\n      <i nz-icon [nzType]=\"nzCollapsed ? 'right' : 'left'\" *ngIf=\"!nzReverseArrow\"></i>\n      <i nz-icon [nzType]=\"nzCollapsed ? 'left' : 'right'\" *ngIf=\"nzReverseArrow\"></i>\n    </ng-template>\n    <ng-template #defaultZeroTrigger>\n      <i nz-icon nzType=\"bars\"></i>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
                            '[style.width]': 'isNormalTrigger ? siderWidth : null',
                            '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
                            '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
                            '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
                        }
                    }] }
        ];
        NzSiderTriggerComponent.propDecorators = {
            nzCollapsed: [{ type: core.Input }],
            nzReverseArrow: [{ type: core.Input }],
            nzZeroTrigger: [{ type: core.Input }],
            nzTrigger: [{ type: core.Input }],
            matchBreakPoint: [{ type: core.Input }],
            nzCollapsedWidth: [{ type: core.Input }],
            siderWidth: [{ type: core.Input }],
            nzBreakpoint: [{ type: core.Input }]
        };
        return NzSiderTriggerComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSiderTriggerComponent.prototype.nzCollapsed;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.nzReverseArrow;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.nzZeroTrigger;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.nzTrigger;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.matchBreakPoint;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.nzCollapsedWidth;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.siderWidth;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.nzBreakpoint;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.isZeroTrigger;
        /** @type {?} */
        NzSiderTriggerComponent.prototype.isNormalTrigger;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: layout.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzLayoutModule = /** @class */ (function () {
        function NzLayoutModule() {
        }
        NzLayoutModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent, NzSiderTriggerComponent],
                        exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
                        imports: [common.CommonModule, icon.NzIconModule, layout.LayoutModule, platform.PlatformModule]
                    },] }
        ];
        return NzLayoutModule;
    }());

    exports.NzContentComponent = NzContentComponent;
    exports.NzFooterComponent = NzFooterComponent;
    exports.NzHeaderComponent = NzHeaderComponent;
    exports.NzLayoutComponent = NzLayoutComponent;
    exports.NzLayoutModule = NzLayoutModule;
    exports.NzSiderComponent = NzSiderComponent;
    exports.??NzSiderTriggerComponent = NzSiderTriggerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-layout.umd.js.map
