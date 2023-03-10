(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/tooltip'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/overlay'), require('@angular/common'), require('ng-zorro-antd/button'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/popconfirm', ['exports', '@angular/core', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/util', 'ng-zorro-antd/tooltip', 'rxjs', 'rxjs/operators', '@angular/cdk/overlay', '@angular/common', 'ng-zorro-antd/button', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].popconfirm = {}), global.ng.core, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].tooltip, global.rxjs, global.rxjs.operators, global.ng.cdk.overlay, global.ng.common, global['ng-zorro-antd'].button, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, animation, noAnimation, util, tooltip, rxjs, operators, overlay, common, button, outlet, overlay$1, i18n, icon) { 'use strict';

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
     * Generated from: popconfirm.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzPopconfirmDirective = /** @class */ (function (_super) {
        __extends(NzPopconfirmDirective, _super);
        function NzPopconfirmDirective(elementRef, hostView, resolver, renderer, noAnimation) {
            var _this = _super.call(this, elementRef, hostView, resolver, renderer, noAnimation) || this;
            _this.nzCondition = false;
            _this.nzPopconfirmShowArrow = true;
            /**
             * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
             * Please use a more specific API. Like `nzTooltipTrigger`.
             */
            _this.nzTrigger = 'click';
            // tslint:disable-next-line:no-output-rename
            _this.specificVisibleChange = new core.EventEmitter();
            _this.nzOnCancel = new core.EventEmitter();
            _this.nzOnConfirm = new core.EventEmitter();
            _this.componentFactory = _this.resolver.resolveComponentFactory(NzPopconfirmComponent);
            _this.needProxyProperties = [
                'nzOverlayClassName',
                'nzOverlayStyle',
                'nzMouseEnterDelay',
                'nzMouseLeaveDelay',
                'nzVisible',
                'nzOkText',
                'nzOkType',
                'nzCancelText',
                'nzCondition',
                'nzIcon',
                'nzPopconfirmShowArrow'
            ];
            return _this;
        }
        /**
         * @override
         */
        /**
         * @override
         * @protected
         * @return {?}
         */
        NzPopconfirmDirective.prototype.createComponent = /**
         * @override
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            _super.prototype.createComponent.call(this);
            ((/** @type {?} */ (this.component))).nzOnCancel.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.nzOnCancel.emit();
            }));
            ((/** @type {?} */ (this.component))).nzOnConfirm.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.nzOnConfirm.emit();
            }));
        };
        NzPopconfirmDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-popconfirm]',
                        exportAs: 'nzPopconfirm',
                        host: {
                            '[class.ant-popover-open]': 'visible'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzPopconfirmDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ViewContainerRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Renderer2 },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzPopconfirmDirective.propDecorators = {
            specificTitle: [{ type: core.Input, args: ['nzPopconfirmTitle',] }],
            directiveNameTitle: [{ type: core.Input, args: ['nz-popconfirm',] }],
            specificTrigger: [{ type: core.Input, args: ['nzPopconfirmTrigger',] }],
            specificPlacement: [{ type: core.Input, args: ['nzPopconfirmPlacement',] }],
            specificOrigin: [{ type: core.Input, args: ['nzPopconfirmOrigin',] }],
            specificMouseEnterDelay: [{ type: core.Input, args: ['nzPopconfirmMouseEnterDelay',] }],
            specificMouseLeaveDelay: [{ type: core.Input, args: ['nzPopconfirmMouseLeaveDelay',] }],
            specificOverlayClassName: [{ type: core.Input, args: ['nzPopconfirmOverlayClassName',] }],
            specificOverlayStyle: [{ type: core.Input, args: ['nzPopconfirmOverlayStyle',] }],
            nzOkText: [{ type: core.Input }],
            nzOkType: [{ type: core.Input }],
            nzCancelText: [{ type: core.Input }],
            nzIcon: [{ type: core.Input }],
            nzCondition: [{ type: core.Input }],
            nzPopconfirmShowArrow: [{ type: core.Input }],
            nzTrigger: [{ type: core.Input }],
            specificVisible: [{ type: core.Input, args: ['nzPopconfirmVisible',] }],
            specificVisibleChange: [{ type: core.Output, args: ['nzPopconfirmVisibleChange',] }],
            nzOnCancel: [{ type: core.Output }],
            nzOnConfirm: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzPopconfirmDirective.prototype, "nzCondition", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzPopconfirmDirective.prototype, "nzPopconfirmShowArrow", void 0);
        return NzPopconfirmDirective;
    }(tooltip.NzTooltipBaseDirective));
    if (false) {
        /** @type {?} */
        NzPopconfirmDirective.ngAcceptInputType_nzCondition;
        /** @type {?} */
        NzPopconfirmDirective.ngAcceptInputType_nzPopconfirmShowArrow;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificTitle;
        /** @type {?} */
        NzPopconfirmDirective.prototype.directiveNameTitle;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificTrigger;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificPlacement;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificOrigin;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificMouseEnterDelay;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificMouseLeaveDelay;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificOverlayClassName;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificOverlayStyle;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzOkText;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzOkType;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzCancelText;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzIcon;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzCondition;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzPopconfirmShowArrow;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTrigger`.
         * @type {?}
         */
        NzPopconfirmDirective.prototype.nzTrigger;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificVisible;
        /** @type {?} */
        NzPopconfirmDirective.prototype.specificVisibleChange;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzOnCancel;
        /** @type {?} */
        NzPopconfirmDirective.prototype.nzOnConfirm;
        /**
         * @type {?}
         * @protected
         */
        NzPopconfirmDirective.prototype.componentFactory;
        /**
         * @type {?}
         * @protected
         */
        NzPopconfirmDirective.prototype.needProxyProperties;
    }
    var NzPopconfirmComponent = /** @class */ (function (_super) {
        __extends(NzPopconfirmComponent, _super);
        function NzPopconfirmComponent(cdr, noAnimation) {
            var _this = _super.call(this, cdr, noAnimation) || this;
            _this.noAnimation = noAnimation;
            _this.nzCondition = false;
            _this.nzPopconfirmShowArrow = true;
            _this.nzOkType = 'primary';
            _this.nzOnCancel = new rxjs.Subject();
            _this.nzOnConfirm = new rxjs.Subject();
            _this._trigger = 'click';
            _this._prefix = 'ant-popover-placement';
            _this._hasBackdrop = true;
            return _this;
        }
        /**
         * @return {?}
         */
        NzPopconfirmComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this.nzOnCancel.complete();
            this.nzOnConfirm.complete();
        };
        /**
         * @override
         */
        /**
         * @override
         * @return {?}
         */
        NzPopconfirmComponent.prototype.show = /**
         * @override
         * @return {?}
         */
        function () {
            if (!this.nzCondition) {
                _super.prototype.show.call(this);
            }
            else {
                this.onConfirm();
            }
        };
        /**
         * @return {?}
         */
        NzPopconfirmComponent.prototype.onCancel = /**
         * @return {?}
         */
        function () {
            this.nzOnCancel.next();
            _super.prototype.hide.call(this);
        };
        /**
         * @return {?}
         */
        NzPopconfirmComponent.prototype.onConfirm = /**
         * @return {?}
         */
        function () {
            this.nzOnConfirm.next();
            _super.prototype.hide.call(this);
        };
        NzPopconfirmComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-popconfirm',
                        exportAs: 'nzPopconfirmComponent',
                        preserveWhitespaces: false,
                        animations: [animation.zoomBigMotion],
                        template: "\n    <ng-template\n      #overlay=\"cdkConnectedOverlay\"\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n      (backdropClick)=\"hide()\"\n      (detach)=\"hide()\"\n      (positionChange)=\"onPositionChange($event)\"\n      [cdkConnectedOverlayPositions]=\"_positions\"\n      [cdkConnectedOverlayOpen]=\"_visible\"\n    >\n      <div\n        class=\"ant-popover\"\n        [ngClass]=\"_classMap\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@zoomBigMotion]=\"'active'\"\n      >\n        <div class=\"ant-popover-content\">\n          <div class=\"ant-popover-arrow\" *ngIf=\"nzPopconfirmShowArrow\"></div>\n          <div class=\"ant-popover-inner\">\n            <div>\n              <div class=\"ant-popover-inner-content\">\n                <div class=\"ant-popover-message\">\n                  <ng-container *nzStringTemplateOutlet=\"nzTitle\">\n                    <ng-container *nzStringTemplateOutlet=\"nzIcon; let icon\">\n                      <i nz-icon [nzType]=\"icon || 'exclamation-circle'\" nzTheme=\"fill\"></i>\n                    </ng-container>\n                    <div class=\"ant-popover-message-title\">{{ nzTitle }}</div>\n                  </ng-container>\n                </div>\n                <div class=\"ant-popover-buttons\">\n                  <button nz-button [nzSize]=\"'small'\" (click)=\"onCancel()\">\n                    <ng-container *ngIf=\"nzCancelText\">{{ nzCancelText }}</ng-container>\n                    <ng-container *ngIf=\"!nzCancelText\">{{ 'Modal.cancelText' | nzI18n }}</ng-container>\n                  </button>\n                  <button nz-button [nzSize]=\"'small'\" [nzType]=\"nzOkType\" (click)=\"onConfirm()\">\n                    <ng-container *ngIf=\"nzOkText\">{{ nzOkText }}</ng-container>\n                    <ng-container *ngIf=\"!nzOkText\">{{ 'Modal.okText' | nzI18n }}</ng-container>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzPopconfirmComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        return NzPopconfirmComponent;
    }(tooltip.NzToolTipComponent));
    if (false) {
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzCancelText;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzCondition;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzPopconfirmShowArrow;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzIcon;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzOkText;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzOkType;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzOnCancel;
        /** @type {?} */
        NzPopconfirmComponent.prototype.nzOnConfirm;
        /**
         * @type {?}
         * @protected
         */
        NzPopconfirmComponent.prototype._trigger;
        /** @type {?} */
        NzPopconfirmComponent.prototype._prefix;
        /** @type {?} */
        NzPopconfirmComponent.prototype._hasBackdrop;
        /** @type {?} */
        NzPopconfirmComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: popconfirm.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzPopconfirmModule = /** @class */ (function () {
        function NzPopconfirmModule() {
        }
        NzPopconfirmModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
                        exports: [NzPopconfirmComponent, NzPopconfirmDirective],
                        entryComponents: [NzPopconfirmComponent],
                        imports: [
                            common.CommonModule,
                            button.NzButtonModule,
                            overlay.OverlayModule,
                            i18n.NzI18nModule,
                            icon.NzIconModule,
                            outlet.NzOutletModule,
                            overlay$1.NzOverlayModule,
                            noAnimation.NzNoAnimationModule,
                            tooltip.NzToolTipModule
                        ]
                    },] }
        ];
        return NzPopconfirmModule;
    }());

    exports.NzPopconfirmComponent = NzPopconfirmComponent;
    exports.NzPopconfirmDirective = NzPopconfirmDirective;
    exports.NzPopconfirmModule = NzPopconfirmModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-popconfirm.umd.js.map
