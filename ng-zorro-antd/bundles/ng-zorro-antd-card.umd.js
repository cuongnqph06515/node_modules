(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/core/config'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/outlet')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/card', ['exports', '@angular/core', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/config', 'rxjs', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/outlet'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].card = {}), global.ng.core, global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].core.config, global.rxjs, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.outlet));
}(this, (function (exports, core, util, config, rxjs, operators, common, outlet) { 'use strict';

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
     * Generated from: card-grid.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCardGridDirective = /** @class */ (function () {
        function NzCardGridDirective() {
            this.nzHoverable = true;
        }
        NzCardGridDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-card-grid]',
                        exportAs: 'nzCardGrid',
                        host: {
                            '[class.ant-card-grid]': 'true',
                            '[class.ant-card-hoverable]': 'nzHoverable'
                        }
                    },] }
        ];
        NzCardGridDirective.propDecorators = {
            nzHoverable: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCardGridDirective.prototype, "nzHoverable", void 0);
        return NzCardGridDirective;
    }());
    if (false) {
        /** @type {?} */
        NzCardGridDirective.ngAcceptInputType_nzHoverable;
        /** @type {?} */
        NzCardGridDirective.prototype.nzHoverable;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: card-tab.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCardTabComponent = /** @class */ (function () {
        function NzCardTabComponent() {
        }
        NzCardTabComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-card-tab',
                        exportAs: 'nzCardTab',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-template>\n      <ng-content></ng-content>\n    </ng-template>\n  "
                    }] }
        ];
        NzCardTabComponent.propDecorators = {
            template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }]
        };
        return NzCardTabComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCardTabComponent.prototype.template;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: card.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'card';
    var NzCardComponent = /** @class */ (function () {
        function NzCardComponent(nzConfigService, cdr) {
            var _this = this;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.nzBordered = true;
            this.nzLoading = false;
            this.nzHoverable = false;
            this.nzBodyStyle = null;
            this.nzActions = [];
            this.nzType = null;
            this.nzSize = 'default';
            this.destroy$ = new rxjs.Subject();
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
         * @return {?}
         */
        NzCardComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzCardComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-card',
                        exportAs: 'nzCard',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div class=\"ant-card-head\" *ngIf=\"nzTitle || nzExtra || listOfNzCardTabComponent\">\n      <div class=\"ant-card-head-wrapper\">\n        <div class=\"ant-card-head-title\" *ngIf=\"nzTitle\">\n          <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n        </div>\n        <div class=\"ant-card-extra\" *ngIf=\"nzExtra\">\n          <ng-container *nzStringTemplateOutlet=\"nzExtra\">{{ nzExtra }}</ng-container>\n        </div>\n      </div>\n      <ng-container *ngIf=\"listOfNzCardTabComponent\">\n        <ng-template [ngTemplateOutlet]=\"listOfNzCardTabComponent.template\"></ng-template>\n      </ng-container>\n    </div>\n    <div class=\"ant-card-cover\" *ngIf=\"nzCover\">\n      <ng-template [ngTemplateOutlet]=\"nzCover\"></ng-template>\n    </div>\n    <div class=\"ant-card-body\" [ngStyle]=\"nzBodyStyle\">\n      <ng-container *ngIf=\"!nzLoading; else loadingTemplate\">\n        <ng-content></ng-content>\n      </ng-container>\n      <ng-template #loadingTemplate>\n        <nz-card-loading></nz-card-loading>\n      </ng-template>\n    </div>\n    <ul class=\"ant-card-actions\" *ngIf=\"nzActions.length\">\n      <li *ngFor=\"let action of nzActions\" [style.width.%]=\"100 / nzActions.length\">\n        <span><ng-template [ngTemplateOutlet]=\"action\"></ng-template></span>\n      </li>\n    </ul>\n  ",
                        host: {
                            '[class.ant-card]': 'true',
                            '[class.ant-card-loading]': 'nzLoading',
                            '[class.ant-card-bordered]': 'nzBordered',
                            '[class.ant-card-hoverable]': 'nzHoverable',
                            '[class.ant-card-small]': 'nzSize === "small"',
                            '[class.ant-card-contain-grid]': 'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
                            '[class.ant-card-type-inner]': 'nzType === "inner"',
                            '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCardComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzCardComponent.propDecorators = {
            nzBordered: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzHoverable: [{ type: core.Input }],
            nzBodyStyle: [{ type: core.Input }],
            nzCover: [{ type: core.Input }],
            nzActions: [{ type: core.Input }],
            nzType: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzExtra: [{ type: core.Input }],
            listOfNzCardTabComponent: [{ type: core.ContentChild, args: [NzCardTabComponent, { static: false },] }],
            listOfNzCardGridDirective: [{ type: core.ContentChildren, args: [NzCardGridDirective,] }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCardComponent.prototype, "nzBordered", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCardComponent.prototype, "nzLoading", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCardComponent.prototype, "nzHoverable", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzCardComponent.prototype, "nzSize", void 0);
        return NzCardComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCardComponent.ngAcceptInputType_nzBordered;
        /** @type {?} */
        NzCardComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzCardComponent.ngAcceptInputType_nzHoverable;
        /** @type {?} */
        NzCardComponent.prototype.nzBordered;
        /** @type {?} */
        NzCardComponent.prototype.nzLoading;
        /** @type {?} */
        NzCardComponent.prototype.nzHoverable;
        /** @type {?} */
        NzCardComponent.prototype.nzBodyStyle;
        /** @type {?} */
        NzCardComponent.prototype.nzCover;
        /** @type {?} */
        NzCardComponent.prototype.nzActions;
        /** @type {?} */
        NzCardComponent.prototype.nzType;
        /** @type {?} */
        NzCardComponent.prototype.nzSize;
        /** @type {?} */
        NzCardComponent.prototype.nzTitle;
        /** @type {?} */
        NzCardComponent.prototype.nzExtra;
        /** @type {?} */
        NzCardComponent.prototype.listOfNzCardTabComponent;
        /** @type {?} */
        NzCardComponent.prototype.listOfNzCardGridDirective;
        /**
         * @type {?}
         * @private
         */
        NzCardComponent.prototype.destroy$;
        /** @type {?} */
        NzCardComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzCardComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: card-loading.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCardLoadingComponent = /** @class */ (function () {
        function NzCardLoadingComponent() {
            this.listOfLoading = [
                ['ant-col-22'],
                ['ant-col-8', 'ant-col-15'],
                ['ant-col-6', 'ant-col-18'],
                ['ant-col-13', 'ant-col-9'],
                ['ant-col-4', 'ant-col-3', 'ant-col-16'],
                ['ant-col-8', 'ant-col-6', 'ant-col-8']
            ];
        }
        NzCardLoadingComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-card-loading',
                        exportAs: 'nzCardLoading',
                        template: "\n    <div class=\"ant-card-loading-content\">\n      <div class=\"ant-row\" style=\"margin-left: -4px; margin-right: -4px;\" *ngFor=\"let listOfClassName of listOfLoading\">\n        <div *ngFor=\"let className of listOfClassName\" [ngClass]=\"className\" style=\"padding-left: 4px; padding-right: 4px;\">\n          <div class=\"ant-card-loading-block\"></div>\n        </div>\n      </div>\n    </div>\n  ",
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class.ant-card-loading-content]': 'true'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCardLoadingComponent.ctorParameters = function () { return []; };
        return NzCardLoadingComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCardLoadingComponent.prototype.listOfLoading;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: card-meta.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCardMetaComponent = /** @class */ (function () {
        function NzCardMetaComponent() {
            this.nzTitle = null;
            this.nzDescription = null;
            this.nzAvatar = null;
        }
        NzCardMetaComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-card-meta',
                        exportAs: 'nzCardMeta',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div class=\"ant-card-meta-avatar\" *ngIf=\"nzAvatar\">\n      <ng-template [ngTemplateOutlet]=\"nzAvatar\"></ng-template>\n    </div>\n    <div class=\"ant-card-meta-detail\" *ngIf=\"nzTitle || nzDescription\">\n      <div class=\"ant-card-meta-title\" *ngIf=\"nzTitle\">\n        <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n      </div>\n      <div class=\"ant-card-meta-description\" *ngIf=\"nzDescription\">\n        <ng-container *nzStringTemplateOutlet=\"nzDescription\">{{ nzDescription }}</ng-container>\n      </div>\n    </div>\n  ",
                        host: {
                            '[class.ant-card-meta]': 'true'
                        }
                    }] }
        ];
        NzCardMetaComponent.propDecorators = {
            nzTitle: [{ type: core.Input }],
            nzDescription: [{ type: core.Input }],
            nzAvatar: [{ type: core.Input }]
        };
        return NzCardMetaComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCardMetaComponent.prototype.nzTitle;
        /** @type {?} */
        NzCardMetaComponent.prototype.nzDescription;
        /** @type {?} */
        NzCardMetaComponent.prototype.nzAvatar;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: card.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCardModule = /** @class */ (function () {
        function NzCardModule() {
        }
        NzCardModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, outlet.NzOutletModule],
                        declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent],
                        exports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent]
                    },] }
        ];
        return NzCardModule;
    }());

    exports.NzCardComponent = NzCardComponent;
    exports.NzCardGridDirective = NzCardGridDirective;
    exports.NzCardLoadingComponent = NzCardLoadingComponent;
    exports.NzCardMetaComponent = NzCardMetaComponent;
    exports.NzCardModule = NzCardModule;
    exports.NzCardTabComponent = NzCardTabComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-card.umd.js.map
