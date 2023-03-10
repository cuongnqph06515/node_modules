(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/resize-observers'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/page-header', ['exports', '@angular/common', '@angular/core', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/resize-observers', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd']['page-header'] = {}), global.ng.common, global.ng.core, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core['resize-observers'], global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, outlet, icon, config, logger, resizeObservers, rxjs, operators) { 'use strict';

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
     * Generated from: page-header-cells.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzPageHeaderTitleDirective = /** @class */ (function () {
        function NzPageHeaderTitleDirective() {
        }
        NzPageHeaderTitleDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-page-header-title, [nz-page-header-title]',
                        exportAs: 'nzPageHeaderTitle',
                        host: {
                            class: 'ant-page-header-heading-title'
                        }
                    },] }
        ];
        return NzPageHeaderTitleDirective;
    }());
    var NzPageHeaderSubtitleDirective = /** @class */ (function () {
        function NzPageHeaderSubtitleDirective() {
        }
        NzPageHeaderSubtitleDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-page-header-subtitle, [nz-page-header-subtitle]',
                        exportAs: 'nzPageHeaderSubtitle',
                        host: {
                            class: 'ant-page-header-heading-sub-title'
                        }
                    },] }
        ];
        return NzPageHeaderSubtitleDirective;
    }());
    var NzPageHeaderContentDirective = /** @class */ (function () {
        function NzPageHeaderContentDirective() {
        }
        NzPageHeaderContentDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-page-header-content, [nz-page-header-content]',
                        exportAs: 'nzPageHeaderContent',
                        host: {
                            class: 'ant-page-header-content'
                        }
                    },] }
        ];
        return NzPageHeaderContentDirective;
    }());
    var NzPageHeaderTagDirective = /** @class */ (function () {
        function NzPageHeaderTagDirective() {
        }
        NzPageHeaderTagDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-page-header-tags, [nz-page-header-tags]',
                        exportAs: 'nzPageHeaderTags',
                        host: {
                            class: 'ant-page-header-heading-tags'
                        }
                    },] }
        ];
        return NzPageHeaderTagDirective;
    }());
    var NzPageHeaderExtraDirective = /** @class */ (function () {
        function NzPageHeaderExtraDirective() {
        }
        NzPageHeaderExtraDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-page-header-extra, [nz-page-header-extra]',
                        exportAs: 'nzPageHeaderExtra',
                        host: {
                            class: 'ant-page-header-heading-extra'
                        }
                    },] }
        ];
        return NzPageHeaderExtraDirective;
    }());
    var NzPageHeaderFooterDirective = /** @class */ (function () {
        function NzPageHeaderFooterDirective() {
        }
        NzPageHeaderFooterDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-page-header-footer, [nz-page-header-footer]',
                        exportAs: 'nzPageHeaderFooter',
                        host: {
                            class: 'ant-page-header-footer'
                        }
                    },] }
        ];
        return NzPageHeaderFooterDirective;
    }());
    var NzPageHeaderBreadcrumbDirective = /** @class */ (function () {
        function NzPageHeaderBreadcrumbDirective() {
        }
        NzPageHeaderBreadcrumbDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-breadcrumb[nz-page-header-breadcrumb]',
                        exportAs: 'nzPageHeaderBreadcrumb'
                    },] }
        ];
        return NzPageHeaderBreadcrumbDirective;
    }());
    var NzPageHeaderAvatarDirective = /** @class */ (function () {
        function NzPageHeaderAvatarDirective() {
        }
        NzPageHeaderAvatarDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-avatar[nz-page-header-avatar]',
                        exportAs: 'nzPageHeaderAvatar'
                    },] }
        ];
        return NzPageHeaderAvatarDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: page-header.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'pageHeader';
    var NzPageHeaderComponent = /** @class */ (function () {
        function NzPageHeaderComponent(location, nzConfigService, elementRef, nzResizeObserver, cdr) {
            this.location = location;
            this.nzConfigService = nzConfigService;
            this.elementRef = elementRef;
            this.nzResizeObserver = nzResizeObserver;
            this.cdr = cdr;
            this.nzBackIcon = null;
            this.nzGhost = true;
            this.nzBack = new core.EventEmitter();
            this.compact = false;
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzPageHeaderComponent.prototype.ngAfterViewInit = /**
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
                return entry.contentRect.width;
            })), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} width
             * @return {?}
             */
            function (width) {
                _this.compact = width < 768;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzPageHeaderComponent.prototype.onBack = /**
         * @return {?}
         */
        function () {
            if (this.nzBack.observers.length) {
                this.nzBack.emit();
            }
            else {
                if (!this.location) {
                    throw new Error(logger.PREFIX + " you should import 'RouterModule' or register 'Location' if you want to use 'nzBack' default event!");
                }
                this.location.back();
            }
        };
        /**
         * @return {?}
         */
        NzPageHeaderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzPageHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-page-header',
                        exportAs: 'nzPageHeader',
                        template: "\n    <ng-content select=\"nz-breadcrumb[nz-page-header-breadcrumb]\"></ng-content>\n\n    <div class=\"ant-page-header-heading\">\n      <div class=\"ant-page-header-heading-left\">\n        <!--back-->\n        <div *ngIf=\"nzBackIcon !== null\" (click)=\"onBack()\" class=\"ant-page-header-back\">\n          <div role=\"button\" tabindex=\"0\" class=\"ant-page-header-back-button\">\n            <ng-container *nzStringTemplateOutlet=\"nzBackIcon; let backIcon\">\n              <i nz-icon [nzType]=\"backIcon || 'arrow-left'\" nzTheme=\"outline\"></i>\n            </ng-container>\n          </div>\n        </div>\n        <!--avatar-->\n        <ng-content select=\"nz-avatar[nz-page-header-avatar]\"></ng-content>\n        <!--title-->\n        <span class=\"ant-page-header-heading-title\" *ngIf=\"nzTitle\">\n          <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n        </span>\n        <ng-content *ngIf=\"!nzTitle\" select=\"nz-page-header-title, [nz-page-header-title]\"></ng-content>\n        <!--subtitle-->\n        <span class=\"ant-page-header-heading-sub-title\" *ngIf=\"nzSubtitle\">\n          <ng-container *nzStringTemplateOutlet=\"nzSubtitle\">{{ nzSubtitle }}</ng-container>\n        </span>\n        <ng-content *ngIf=\"!nzSubtitle\" select=\"nz-page-header-subtitle, [nz-page-header-subtitle]\"></ng-content>\n        <ng-content select=\"nz-page-header-tags, [nz-page-header-tags]\"></ng-content>\n      </div>\n\n      <ng-content select=\"nz-page-header-extra, [nz-page-header-extra]\"></ng-content>\n    </div>\n\n    <ng-content select=\"nz-page-header-content, [nz-page-header-content]\"></ng-content>\n    <ng-content select=\"nz-page-header-footer, [nz-page-header-footer]\"></ng-content>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            class: 'ant-page-header',
                            '[class.has-footer]': 'nzPageHeaderFooter',
                            '[class.ant-page-header-ghost]': 'nzGhost',
                            '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
                            '[class.ant-page-header-compact]': 'compact'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzPageHeaderComponent.ctorParameters = function () { return [
            { type: common.Location, decorators: [{ type: core.Optional }] },
            { type: config.NzConfigService },
            { type: core.ElementRef },
            { type: resizeObservers.NzResizeObserver },
            { type: core.ChangeDetectorRef }
        ]; };
        NzPageHeaderComponent.propDecorators = {
            nzBackIcon: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzSubtitle: [{ type: core.Input }],
            nzGhost: [{ type: core.Input }],
            nzBack: [{ type: core.Output }],
            nzPageHeaderFooter: [{ type: core.ContentChild, args: [NzPageHeaderFooterDirective, { static: false },] }],
            nzPageHeaderBreadcrumb: [{ type: core.ContentChild, args: [NzPageHeaderBreadcrumbDirective, { static: false },] }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzPageHeaderComponent.prototype, "nzGhost", void 0);
        return NzPageHeaderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzBackIcon;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzTitle;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzSubtitle;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzGhost;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzBack;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzPageHeaderFooter;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzPageHeaderBreadcrumb;
        /** @type {?} */
        NzPageHeaderComponent.prototype.compact;
        /** @type {?} */
        NzPageHeaderComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzPageHeaderComponent.prototype.location;
        /** @type {?} */
        NzPageHeaderComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzPageHeaderComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzPageHeaderComponent.prototype.nzResizeObserver;
        /**
         * @type {?}
         * @private
         */
        NzPageHeaderComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: page-header.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NzPageHeaderCells = [
        NzPageHeaderTitleDirective,
        NzPageHeaderSubtitleDirective,
        NzPageHeaderContentDirective,
        NzPageHeaderTagDirective,
        NzPageHeaderExtraDirective,
        NzPageHeaderFooterDirective,
        NzPageHeaderBreadcrumbDirective,
        NzPageHeaderAvatarDirective
    ];
    var NzPageHeaderModule = /** @class */ (function () {
        function NzPageHeaderModule() {
        }
        NzPageHeaderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, outlet.NzOutletModule, icon.NzIconModule],
                        exports: [NzPageHeaderComponent, NzPageHeaderCells],
                        declarations: [NzPageHeaderComponent, NzPageHeaderCells]
                    },] }
        ];
        return NzPageHeaderModule;
    }());

    exports.NzPageHeaderAvatarDirective = NzPageHeaderAvatarDirective;
    exports.NzPageHeaderBreadcrumbDirective = NzPageHeaderBreadcrumbDirective;
    exports.NzPageHeaderComponent = NzPageHeaderComponent;
    exports.NzPageHeaderContentDirective = NzPageHeaderContentDirective;
    exports.NzPageHeaderExtraDirective = NzPageHeaderExtraDirective;
    exports.NzPageHeaderFooterDirective = NzPageHeaderFooterDirective;
    exports.NzPageHeaderModule = NzPageHeaderModule;
    exports.NzPageHeaderSubtitleDirective = NzPageHeaderSubtitleDirective;
    exports.NzPageHeaderTagDirective = NzPageHeaderTagDirective;
    exports.NzPageHeaderTitleDirective = NzPageHeaderTitleDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-page-header.umd.js.map
