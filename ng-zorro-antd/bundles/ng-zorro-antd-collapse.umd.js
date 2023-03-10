(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/collapse', ['exports', '@angular/core', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].collapse = {}), global.ng.core, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, animation, config, util, rxjs, operators, common, outlet, icon) { 'use strict';

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
     * Generated from: collapse.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'collapse';
    var NzCollapseComponent = /** @class */ (function () {
        function NzCollapseComponent(nzConfigService, cdr) {
            var _this = this;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.nzAccordion = false;
            this.nzBordered = true;
            this.nzExpandIconPosition = 'left';
            this.listOfNzCollapsePanelComponent = [];
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
         * @param {?} value
         * @return {?}
         */
        NzCollapseComponent.prototype.addPanel = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.listOfNzCollapsePanelComponent.push(value);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzCollapseComponent.prototype.removePanel = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
        };
        /**
         * @param {?} collapse
         * @return {?}
         */
        NzCollapseComponent.prototype.click = /**
         * @param {?} collapse
         * @return {?}
         */
        function (collapse) {
            if (this.nzAccordion && !collapse.nzActive) {
                this.listOfNzCollapsePanelComponent
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item !== collapse; }))
                    .forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.nzActive) {
                        item.nzActive = false;
                        item.nzActiveChange.emit(item.nzActive);
                        item.markForCheck();
                    }
                }));
            }
            collapse.nzActive = !collapse.nzActive;
            collapse.nzActiveChange.emit(collapse.nzActive);
        };
        /**
         * @return {?}
         */
        NzCollapseComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzCollapseComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-collapse',
                        exportAs: 'nzCollapse',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: " <ng-content></ng-content> ",
                        host: {
                            '[class.ant-collapse]': 'true',
                            '[class.ant-collapse-icon-position-left]': "nzExpandIconPosition === 'left'",
                            '[class.ant-collapse-icon-position-right]': "nzExpandIconPosition === 'right'",
                            '[class.ant-collapse-borderless]': '!nzBordered'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCollapseComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzCollapseComponent.propDecorators = {
            nzAccordion: [{ type: core.Input }],
            nzBordered: [{ type: core.Input }],
            nzExpandIconPosition: [{ type: core.Input }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCollapseComponent.prototype, "nzAccordion", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCollapseComponent.prototype, "nzBordered", void 0);
        return NzCollapseComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCollapseComponent.ngAcceptInputType_nzAccordion;
        /** @type {?} */
        NzCollapseComponent.ngAcceptInputType_nzBordered;
        /** @type {?} */
        NzCollapseComponent.prototype.nzAccordion;
        /** @type {?} */
        NzCollapseComponent.prototype.nzBordered;
        /** @type {?} */
        NzCollapseComponent.prototype.nzExpandIconPosition;
        /**
         * @type {?}
         * @private
         */
        NzCollapseComponent.prototype.listOfNzCollapsePanelComponent;
        /**
         * @type {?}
         * @private
         */
        NzCollapseComponent.prototype.destroy$;
        /** @type {?} */
        NzCollapseComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzCollapseComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: collapse-panel.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME$1 = 'collapsePanel';
    var NzCollapsePanelComponent = /** @class */ (function () {
        function NzCollapsePanelComponent(nzConfigService, cdr, nzCollapseComponent) {
            var _this = this;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.nzCollapseComponent = nzCollapseComponent;
            this.nzActive = false;
            this.nzDisabled = false;
            this.nzShowArrow = true;
            this.nzActiveChange = new core.EventEmitter();
            this.destroy$ = new rxjs.Subject();
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME$1)
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
        NzCollapsePanelComponent.prototype.clickHeader = /**
         * @return {?}
         */
        function () {
            if (!this.nzDisabled) {
                this.nzCollapseComponent.click(this);
            }
        };
        /**
         * @return {?}
         */
        NzCollapsePanelComponent.prototype.markForCheck = /**
         * @return {?}
         */
        function () {
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzCollapsePanelComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.nzCollapseComponent.addPanel(this);
        };
        /**
         * @return {?}
         */
        NzCollapsePanelComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            this.nzCollapseComponent.removePanel(this);
        };
        NzCollapsePanelComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-collapse-panel',
                        exportAs: 'nzCollapsePanel',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [animation.collapseMotion],
                        template: "\n    <div role=\"tab\" [attr.aria-expanded]=\"nzActive\" class=\"ant-collapse-header\" (click)=\"clickHeader()\">\n      <ng-container *ngIf=\"nzShowArrow\">\n        <ng-container *nzStringTemplateOutlet=\"nzExpandedIcon; let expandedIcon\">\n          <i nz-icon [nzType]=\"expandedIcon || 'right'\" class=\"ant-collapse-arrow\" [nzRotate]=\"nzActive ? 90 : 0\"></i>\n        </ng-container>\n      </ng-container>\n      <ng-container *nzStringTemplateOutlet=\"nzHeader\">{{ nzHeader }}</ng-container>\n      <div class=\"ant-collapse-extra\" *ngIf=\"nzExtra\">\n        <ng-container *nzStringTemplateOutlet=\"nzExtra\">{{ nzExtra }}</ng-container>\n      </div>\n    </div>\n    <div class=\"ant-collapse-content\" [class.ant-collapse-content-active]=\"nzActive\" [@collapseMotion]=\"nzActive ? 'expanded' : 'hidden'\">\n      <div class=\"ant-collapse-content-box\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                        host: {
                            '[class.ant-collapse-item]': 'true',
                            '[class.ant-collapse-no-arrow]': '!nzShowArrow',
                            '[class.ant-collapse-item-active]': 'nzActive',
                            '[class.ant-collapse-item-disabled]': 'nzDisabled'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCollapsePanelComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: NzCollapseComponent, decorators: [{ type: core.Host }] }
        ]; };
        NzCollapsePanelComponent.propDecorators = {
            nzActive: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzShowArrow: [{ type: core.Input }],
            nzExtra: [{ type: core.Input }],
            nzHeader: [{ type: core.Input }],
            nzExpandedIcon: [{ type: core.Input }],
            nzActiveChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCollapsePanelComponent.prototype, "nzActive", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCollapsePanelComponent.prototype, "nzDisabled", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME$1), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCollapsePanelComponent.prototype, "nzShowArrow", void 0);
        return NzCollapsePanelComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCollapsePanelComponent.ngAcceptInputType_nzActive;
        /** @type {?} */
        NzCollapsePanelComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzCollapsePanelComponent.ngAcceptInputType_nzShowArrow;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzActive;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzDisabled;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzShowArrow;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzExtra;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzHeader;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzExpandedIcon;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzActiveChange;
        /**
         * @type {?}
         * @private
         */
        NzCollapsePanelComponent.prototype.destroy$;
        /** @type {?} */
        NzCollapsePanelComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzCollapsePanelComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzCollapsePanelComponent.prototype.nzCollapseComponent;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: collapse.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCollapseModule = /** @class */ (function () {
        function NzCollapseModule() {
        }
        NzCollapseModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzCollapsePanelComponent, NzCollapseComponent],
                        exports: [NzCollapsePanelComponent, NzCollapseComponent],
                        imports: [common.CommonModule, icon.NzIconModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzCollapseModule;
    }());

    exports.NzCollapseComponent = NzCollapseComponent;
    exports.NzCollapseModule = NzCollapseModule;
    exports.NzCollapsePanelComponent = NzCollapsePanelComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-collapse.umd.js.map
