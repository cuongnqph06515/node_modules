(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/keycodes'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/util'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/wave'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/switch', ['exports', '@angular/cdk/a11y', '@angular/cdk/keycodes', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/util', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/wave', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].switch = {}), global.ng.cdk.a11y, global.ng.cdk.keycodes, global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.util, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.wave, global['ng-zorro-antd'].icon));
}(this, (function (exports, a11y, keycodes, core, forms, config, util, common, outlet, wave, icon) { 'use strict';

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
     * Generated from: switch.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'switch';
    var NzSwitchComponent = /** @class */ (function () {
        function NzSwitchComponent(nzConfigService, cdr, focusMonitor) {
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.focusMonitor = focusMonitor;
            this.isChecked = false;
            this.onChange = (/**
             * @return {?}
             */
            function () { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            this.nzLoading = false;
            this.nzDisabled = false;
            this.nzControl = false;
            this.nzCheckedChildren = null;
            this.nzUnCheckedChildren = null;
            this.nzSize = 'default';
        }
        /**
         * @param {?} e
         * @return {?}
         */
        NzSwitchComponent.prototype.onHostClick = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            if (!this.nzDisabled && !this.nzLoading && !this.nzControl) {
                this.updateValue(!this.isChecked);
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSwitchComponent.prototype.updateValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.isChecked !== value) {
                this.isChecked = value;
                this.onChange(this.isChecked);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzSwitchComponent.prototype.onKeyDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!this.nzControl && !this.nzDisabled && !this.nzLoading) {
                if (e.keyCode === keycodes.LEFT_ARROW) {
                    this.updateValue(false);
                    e.preventDefault();
                }
                else if (e.keyCode === keycodes.RIGHT_ARROW) {
                    this.updateValue(true);
                    e.preventDefault();
                }
                else if (e.keyCode === keycodes.SPACE || e.keyCode === keycodes.ENTER) {
                    this.updateValue(!this.isChecked);
                    e.preventDefault();
                }
            }
        };
        /**
         * @return {?}
         */
        NzSwitchComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            var _a;
            this.focusMonitor.focusVia((_a = this.switchElement) === null || _a === void 0 ? void 0 : _a.nativeElement, 'keyboard');
        };
        /**
         * @return {?}
         */
        NzSwitchComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            var _a;
            (_a = this.switchElement) === null || _a === void 0 ? void 0 : _a.nativeElement.blur();
        };
        /**
         * @return {?}
         */
        NzSwitchComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.focusMonitor.monitor((/** @type {?} */ (this.switchElement)).nativeElement, true).subscribe((/**
             * @param {?} focusOrigin
             * @return {?}
             */
            function (focusOrigin) {
                if (!focusOrigin) {
                    /** https://github.com/angular/angular/issues/17793 **/
                    Promise.resolve().then((/**
                     * @return {?}
                     */
                    function () { return _this.onTouched(); }));
                }
            }));
        };
        /**
         * @return {?}
         */
        NzSwitchComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.focusMonitor.stopMonitoring((/** @type {?} */ (this.switchElement)).nativeElement);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSwitchComponent.prototype.writeValue = /**
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
        NzSwitchComponent.prototype.registerOnChange = /**
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
        NzSwitchComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} disabled
         * @return {?}
         */
        NzSwitchComponent.prototype.setDisabledState = /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this.nzDisabled = disabled;
            this.cdr.markForCheck();
        };
        NzSwitchComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-switch',
                        exportAs: 'nzSwitch',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzSwitchComponent; })),
                                multi: true
                            }
                        ],
                        template: "\n    <button\n      nz-wave\n      type=\"button\"\n      class=\"ant-switch\"\n      #switchElement\n      [disabled]=\"nzDisabled\"\n      [class.ant-switch-checked]=\"isChecked\"\n      [class.ant-switch-loading]=\"nzLoading\"\n      [class.ant-switch-disabled]=\"nzDisabled\"\n      [class.ant-switch-small]=\"nzSize === 'small'\"\n      [nzWaveExtraNode]=\"true\"\n      (keydown)=\"onKeyDown($event)\"\n    >\n      <i *ngIf=\"nzLoading\" nz-icon nzType=\"loading\" class=\"ant-switch-loading-icon\"></i>\n      <span class=\"ant-switch-inner\">\n        <ng-container *ngIf=\"isChecked; else uncheckTemplate\">\n          <ng-container *nzStringTemplateOutlet=\"nzCheckedChildren\">{{ nzCheckedChildren }}</ng-container>\n        </ng-container>\n        <ng-template #uncheckTemplate>\n          <ng-container *nzStringTemplateOutlet=\"nzUnCheckedChildren\">{{ nzUnCheckedChildren }}</ng-container>\n        </ng-template>\n      </span>\n      <div class=\"ant-click-animating-node\"></div>\n    </button>\n  ",
                        host: {
                            '(click)': 'onHostClick($event)'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSwitchComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: a11y.FocusMonitor }
        ]; };
        NzSwitchComponent.propDecorators = {
            switchElement: [{ type: core.ViewChild, args: ['switchElement', { static: true },] }],
            nzLoading: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzControl: [{ type: core.Input }],
            nzCheckedChildren: [{ type: core.Input }],
            nzUnCheckedChildren: [{ type: core.Input }],
            nzSize: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSwitchComponent.prototype, "nzLoading", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSwitchComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSwitchComponent.prototype, "nzControl", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzSwitchComponent.prototype, "nzSize", void 0);
        return NzSwitchComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSwitchComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzSwitchComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzSwitchComponent.ngAcceptInputType_nzControl;
        /** @type {?} */
        NzSwitchComponent.prototype.isChecked;
        /** @type {?} */
        NzSwitchComponent.prototype.onChange;
        /** @type {?} */
        NzSwitchComponent.prototype.onTouched;
        /**
         * @type {?}
         * @private
         */
        NzSwitchComponent.prototype.switchElement;
        /** @type {?} */
        NzSwitchComponent.prototype.nzLoading;
        /** @type {?} */
        NzSwitchComponent.prototype.nzDisabled;
        /** @type {?} */
        NzSwitchComponent.prototype.nzControl;
        /** @type {?} */
        NzSwitchComponent.prototype.nzCheckedChildren;
        /** @type {?} */
        NzSwitchComponent.prototype.nzUnCheckedChildren;
        /** @type {?} */
        NzSwitchComponent.prototype.nzSize;
        /** @type {?} */
        NzSwitchComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzSwitchComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzSwitchComponent.prototype.focusMonitor;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: switch.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSwitchModule = /** @class */ (function () {
        function NzSwitchModule() {
        }
        NzSwitchModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [NzSwitchComponent],
                        declarations: [NzSwitchComponent],
                        imports: [common.CommonModule, wave.NzWaveModule, icon.NzIconModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzSwitchModule;
    }());

    exports.NzSwitchComponent = NzSwitchComponent;
    exports.NzSwitchModule = NzSwitchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-switch.umd.js.map
