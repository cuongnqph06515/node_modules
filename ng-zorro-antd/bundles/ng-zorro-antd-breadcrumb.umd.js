(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/dropdown'), require('@angular/router'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/overlay'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/breadcrumb', ['exports', '@angular/core', 'ng-zorro-antd/dropdown', '@angular/router', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/cdk/overlay', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].breadcrumb = {}), global.ng.core, global['ng-zorro-antd'].dropdown, global.ng.router, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.cdk.overlay, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, dropdown, router, logger, util, rxjs, operators, overlay, common, outlet, overlay$1, icon) { 'use strict';

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
     * Generated from: breadcrumb.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function BreadcrumbOption() { }
    if (false) {
        /** @type {?} */
        BreadcrumbOption.prototype.label;
        /** @type {?} */
        BreadcrumbOption.prototype.params;
        /** @type {?} */
        BreadcrumbOption.prototype.url;
    }
    var NzBreadCrumbComponent = /** @class */ (function () {
        function NzBreadCrumbComponent(injector, ngZone, cdr, elementRef, renderer) {
            this.injector = injector;
            this.ngZone = ngZone;
            this.cdr = cdr;
            this.nzAutoGenerate = false;
            this.nzSeparator = '/';
            this.nzRouteLabel = 'breadcrumb';
            this.breadcrumbs = [];
            this.destroy$ = new rxjs.Subject();
            renderer.addClass(elementRef.nativeElement, 'ant-breadcrumb');
        }
        /**
         * @return {?}
         */
        NzBreadCrumbComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this.nzAutoGenerate) {
                this.registerRouterChange();
            }
        };
        /**
         * @return {?}
         */
        NzBreadCrumbComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @param {?} url
         * @param {?} e
         * @return {?}
         */
        NzBreadCrumbComponent.prototype.navigate = /**
         * @param {?} url
         * @param {?} e
         * @return {?}
         */
        function (url, e) {
            var _this = this;
            e.preventDefault();
            this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.injector.get(router.Router).navigateByUrl(url).then(); })).then();
        };
        /**
         * @private
         * @return {?}
         */
        NzBreadCrumbComponent.prototype.registerRouterChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            try {
                /** @type {?} */
                var router$1 = this.injector.get(router.Router);
                /** @type {?} */
                var activatedRoute_1 = this.injector.get(router.ActivatedRoute);
                router$1.events
                    .pipe(operators.filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e instanceof router.NavigationEnd; })), operators.takeUntil(this.destroy$), operators.startWith(true) // Trigger initial render.
                )
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.breadcrumbs = _this.getBreadcrumbs(activatedRoute_1.root);
                    _this.cdr.markForCheck();
                }));
            }
            catch (e) {
                throw new Error(logger.PREFIX + " You should import RouterModule if you want to use 'NzAutoGenerate'.");
            }
        };
        /**
         * @private
         * @param {?} route
         * @param {?=} url
         * @param {?=} breadcrumbs
         * @return {?}
         */
        NzBreadCrumbComponent.prototype.getBreadcrumbs = /**
         * @private
         * @param {?} route
         * @param {?=} url
         * @param {?=} breadcrumbs
         * @return {?}
         */
        function (route, url, breadcrumbs) {
            var e_1, _a;
            if (url === void 0) { url = ''; }
            if (breadcrumbs === void 0) { breadcrumbs = []; }
            /** @type {?} */
            var children = route.children;
            // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
            if (children.length === 0) {
                return breadcrumbs;
            }
            try {
                for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var child = children_1_1.value;
                    if (child.outlet === router.PRIMARY_OUTLET) {
                        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
                        // Parse this layer and generate a breadcrumb item.
                        /** @type {?} */
                        var routeURL = child.snapshot.url
                            .map((/**
                         * @param {?} segment
                         * @return {?}
                         */
                        function (segment) { return segment.path; }))
                            .filter((/**
                         * @param {?} path
                         * @return {?}
                         */
                        function (path) { return path; }))
                            .join('/');
                        /** @type {?} */
                        var nextUrl = url + ("/" + routeURL);
                        /** @type {?} */
                        var breadcrumbLabel = child.snapshot.data[this.nzRouteLabel];
                        // If have data, go to generate a breadcrumb for it.
                        if (routeURL && breadcrumbLabel) {
                            /** @type {?} */
                            var breadcrumb = {
                                label: breadcrumbLabel,
                                params: child.snapshot.params,
                                url: nextUrl
                            };
                            breadcrumbs.push(breadcrumb);
                        }
                        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return undefined;
        };
        NzBreadCrumbComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-breadcrumb',
                        exportAs: 'nzBreadcrumb',
                        preserveWhitespaces: false,
                        template: "\n    <ng-content></ng-content>\n    <ng-container *ngIf=\"nzAutoGenerate\">\n      <nz-breadcrumb-item *ngFor=\"let breadcrumb of breadcrumbs\">\n        <a [attr.href]=\"breadcrumb.url\" (click)=\"navigate(breadcrumb.url, $event)\">{{ breadcrumb.label }}</a>\n      </nz-breadcrumb-item>\n    </ng-container>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzBreadCrumbComponent.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzBreadCrumbComponent.propDecorators = {
            nzAutoGenerate: [{ type: core.Input }],
            nzSeparator: [{ type: core.Input }],
            nzRouteLabel: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzBreadCrumbComponent.prototype, "nzAutoGenerate", void 0);
        return NzBreadCrumbComponent;
    }());
    if (false) {
        /** @type {?} */
        NzBreadCrumbComponent.ngAcceptInputType_nzAutoGenerate;
        /** @type {?} */
        NzBreadCrumbComponent.prototype.nzAutoGenerate;
        /** @type {?} */
        NzBreadCrumbComponent.prototype.nzSeparator;
        /** @type {?} */
        NzBreadCrumbComponent.prototype.nzRouteLabel;
        /** @type {?} */
        NzBreadCrumbComponent.prototype.breadcrumbs;
        /**
         * @type {?}
         * @private
         */
        NzBreadCrumbComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzBreadCrumbComponent.prototype.injector;
        /**
         * @type {?}
         * @private
         */
        NzBreadCrumbComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzBreadCrumbComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: breadcrumb-item.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzBreadCrumbItemComponent = /** @class */ (function () {
        function NzBreadCrumbItemComponent(nzBreadCrumbComponent) {
            this.nzBreadCrumbComponent = nzBreadCrumbComponent;
        }
        NzBreadCrumbItemComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-breadcrumb-item',
                        exportAs: 'nzBreadcrumbItem',
                        preserveWhitespaces: false,
                        template: "\n    <ng-container *ngIf=\"!!nzOverlay; else noMenuTpl\">\n      <span class=\"ant-breadcrumb-overlay-link\" nz-dropdown [nzDropdownMenu]=\"nzOverlay\">\n        <ng-template [ngTemplateOutlet]=\"noMenuTpl\"></ng-template>\n        <i *ngIf=\"!!nzOverlay\" nz-icon nzType=\"down\"></i>\n      </span>\n    </ng-container>\n\n    <ng-template #noMenuTpl>\n      <span class=\"ant-breadcrumb-link\">\n        <ng-content></ng-content>\n      </span>\n    </ng-template>\n\n    <span class=\"ant-breadcrumb-separator\" *ngIf=\"nzBreadCrumbComponent.nzSeparator\">\n      <ng-container *nzStringTemplateOutlet=\"nzBreadCrumbComponent.nzSeparator\">\n        {{ nzBreadCrumbComponent.nzSeparator }}\n      </ng-container>\n    </span>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzBreadCrumbItemComponent.ctorParameters = function () { return [
            { type: NzBreadCrumbComponent }
        ]; };
        NzBreadCrumbItemComponent.propDecorators = {
            nzOverlay: [{ type: core.Input }]
        };
        return NzBreadCrumbItemComponent;
    }());
    if (false) {
        /**
         * Dropdown content of a breadcrumb item.
         * @type {?}
         */
        NzBreadCrumbItemComponent.prototype.nzOverlay;
        /** @type {?} */
        NzBreadCrumbItemComponent.prototype.nzBreadCrumbComponent;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: breadcrumb-separator.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzBreadCrumbSeparatorComponent = /** @class */ (function () {
        function NzBreadCrumbSeparatorComponent() {
        }
        NzBreadCrumbSeparatorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-breadcrumb-separator',
                        exportAs: 'nzBreadcrumbSeparator',
                        template: "\n    <span class=\"ant-breadcrumb-separator\">\n      <ng-content></ng-content>\n    </span>\n  "
                    }] }
        ];
        return NzBreadCrumbSeparatorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: breadcrumb.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzBreadCrumbModule = /** @class */ (function () {
        function NzBreadCrumbModule() {
        }
        NzBreadCrumbModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, outlet.NzOutletModule, overlay.OverlayModule, overlay$1.NzOverlayModule, dropdown.NzDropDownModule, icon.NzIconModule],
                        declarations: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzBreadCrumbSeparatorComponent],
                        exports: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzBreadCrumbSeparatorComponent]
                    },] }
        ];
        return NzBreadCrumbModule;
    }());

    exports.NzBreadCrumbComponent = NzBreadCrumbComponent;
    exports.NzBreadCrumbItemComponent = NzBreadCrumbItemComponent;
    exports.NzBreadCrumbModule = NzBreadCrumbModule;
    exports.NzBreadCrumbSeparatorComponent = NzBreadCrumbSeparatorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-breadcrumb.umd.js.map
