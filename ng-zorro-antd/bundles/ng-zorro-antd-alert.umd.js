(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/alert', ['exports', '@angular/core', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].alert = {}), global.ng.core, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon));
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
     * Generated from: alert.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'alert';
    var NzAlertComponent = /** @class */ (function () {
        function NzAlertComponent(nzConfigService, cdr) {
            var _this = this;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.nzCloseText = null;
            this.nzIconType = null;
            this.nzMessage = null;
            this.nzDescription = null;
            this.nzType = 'info';
            this.nzCloseable = false;
            this.nzShowIcon = false;
            this.nzBanner = false;
            this.nzNoAnimation = false;
            this.nzOnClose = new core.EventEmitter();
            this.closed = false;
            this.iconTheme = 'fill';
            this.inferredIconType = 'info-circle';
            this.isTypeSet = false;
            this.isShowIconSet = false;
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
        NzAlertComponent.prototype.closeAlert = /**
         * @return {?}
         */
        function () {
            this.closed = true;
        };
        /**
         * @return {?}
         */
        NzAlertComponent.prototype.onFadeAnimationDone = /**
         * @return {?}
         */
        function () {
            if (this.closed) {
                this.nzOnClose.emit(true);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzAlertComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzShowIcon = changes.nzShowIcon, nzDescription = changes.nzDescription, nzType = changes.nzType, nzBanner = changes.nzBanner;
            if (nzShowIcon) {
                this.isShowIconSet = true;
            }
            if (nzType) {
                this.isTypeSet = true;
                switch (this.nzType) {
                    case 'error':
                        this.inferredIconType = 'close-circle';
                        break;
                    case 'success':
                        this.inferredIconType = 'check-circle';
                        break;
                    case 'info':
                        this.inferredIconType = 'info-circle';
                        break;
                    case 'warning':
                        this.inferredIconType = 'exclamation-circle';
                        break;
                }
            }
            if (nzDescription) {
                this.iconTheme = this.nzDescription ? 'outline' : 'fill';
            }
            if (nzBanner) {
                if (!this.isTypeSet) {
                    this.nzType = 'warning';
                }
                if (!this.isShowIconSet) {
                    this.nzShowIcon = true;
                }
            }
        };
        /**
         * @return {?}
         */
        NzAlertComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzAlertComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-alert',
                        exportAs: 'nzAlert',
                        animations: [animation.slideAlertMotion],
                        template: "\n    <div\n      *ngIf=\"!closed\"\n      class=\"ant-alert\"\n      [class.ant-alert-success]=\"nzType === 'success'\"\n      [class.ant-alert-info]=\"nzType === 'info'\"\n      [class.ant-alert-warning]=\"nzType === 'warning'\"\n      [class.ant-alert-error]=\"nzType === 'error'\"\n      [class.ant-alert-no-icon]=\"!nzShowIcon\"\n      [class.ant-alert-banner]=\"nzBanner\"\n      [class.ant-alert-closable]=\"nzCloseable\"\n      [class.ant-alert-with-description]=\"!!nzDescription\"\n      [@.disabled]=\"nzNoAnimation\"\n      [@slideAlertMotion]\n      (@slideAlertMotion.done)=\"onFadeAnimationDone()\"\n    >\n      <ng-container *ngIf=\"nzShowIcon\">\n        <i nz-icon class=\"ant-alert-icon\" [nzType]=\"nzIconType || inferredIconType\" [nzTheme]=\"iconTheme\"></i>\n      </ng-container>\n      <span class=\"ant-alert-message\" *ngIf=\"nzMessage\">\n        <ng-container *nzStringTemplateOutlet=\"nzMessage\">{{ nzMessage }}</ng-container>\n      </span>\n      <span class=\"ant-alert-description\" *ngIf=\"nzDescription\">\n        <ng-container *nzStringTemplateOutlet=\"nzDescription\">{{ nzDescription }}</ng-container>\n      </span>\n      <button type=\"button\" tabindex=\"0\" *ngIf=\"nzCloseable || nzCloseText\" class=\"ant-alert-close-icon\" (click)=\"closeAlert()\">\n        <ng-template #closeDefaultTemplate>\n          <i nz-icon nzType=\"close\"></i>\n        </ng-template>\n        <ng-container *ngIf=\"nzCloseText; else closeDefaultTemplate\">\n          <ng-container *nzStringTemplateOutlet=\"nzCloseText\">\n            <span class=\"ant-alert-close-text\">{{ nzCloseText }}</span>\n          </ng-container>\n        </ng-container>\n      </button>\n    </div>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        NzAlertComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzAlertComponent.propDecorators = {
            nzCloseText: [{ type: core.Input }],
            nzIconType: [{ type: core.Input }],
            nzMessage: [{ type: core.Input }],
            nzDescription: [{ type: core.Input }],
            nzType: [{ type: core.Input }],
            nzCloseable: [{ type: core.Input }],
            nzShowIcon: [{ type: core.Input }],
            nzBanner: [{ type: core.Input }],
            nzNoAnimation: [{ type: core.Input }],
            nzOnClose: [{ type: core.Output }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzAlertComponent.prototype, "nzCloseable", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzAlertComponent.prototype, "nzShowIcon", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzAlertComponent.prototype, "nzBanner", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzAlertComponent.prototype, "nzNoAnimation", void 0);
        return NzAlertComponent;
    }());
    if (false) {
        /** @type {?} */
        NzAlertComponent.ngAcceptInputType_nzCloseable;
        /** @type {?} */
        NzAlertComponent.ngAcceptInputType_nzShowIcon;
        /** @type {?} */
        NzAlertComponent.ngAcceptInputType_nzBanner;
        /** @type {?} */
        NzAlertComponent.ngAcceptInputType_nzNoAnimation;
        /** @type {?} */
        NzAlertComponent.prototype.nzCloseText;
        /** @type {?} */
        NzAlertComponent.prototype.nzIconType;
        /** @type {?} */
        NzAlertComponent.prototype.nzMessage;
        /** @type {?} */
        NzAlertComponent.prototype.nzDescription;
        /** @type {?} */
        NzAlertComponent.prototype.nzType;
        /** @type {?} */
        NzAlertComponent.prototype.nzCloseable;
        /** @type {?} */
        NzAlertComponent.prototype.nzShowIcon;
        /** @type {?} */
        NzAlertComponent.prototype.nzBanner;
        /** @type {?} */
        NzAlertComponent.prototype.nzNoAnimation;
        /** @type {?} */
        NzAlertComponent.prototype.nzOnClose;
        /** @type {?} */
        NzAlertComponent.prototype.closed;
        /** @type {?} */
        NzAlertComponent.prototype.iconTheme;
        /** @type {?} */
        NzAlertComponent.prototype.inferredIconType;
        /**
         * @type {?}
         * @private
         */
        NzAlertComponent.prototype.isTypeSet;
        /**
         * @type {?}
         * @private
         */
        NzAlertComponent.prototype.isShowIconSet;
        /**
         * @type {?}
         * @private
         */
        NzAlertComponent.prototype.destroy$;
        /** @type {?} */
        NzAlertComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzAlertComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: alert.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzAlertModule = /** @class */ (function () {
        function NzAlertModule() {
        }
        NzAlertModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzAlertComponent],
                        exports: [NzAlertComponent],
                        imports: [common.CommonModule, icon.NzIconModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzAlertModule;
    }());

    exports.NzAlertComponent = NzAlertComponent;
    exports.NzAlertModule = NzAlertModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-alert.umd.js.map
