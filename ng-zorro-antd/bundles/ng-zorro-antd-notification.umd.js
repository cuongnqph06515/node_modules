(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/message'), require('@angular/cdk/overlay'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/services')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/notification', ['exports', '@angular/core', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/message', '@angular/cdk/overlay', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/services'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].notification = {}), global.ng.core, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].message, global.ng.cdk.overlay, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.services));
}(this, (function (exports, core, animation, message, overlay, common, outlet, icon, config, logger, util, rxjs, operators, services) { 'use strict';

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
     * Generated from: notification.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzNotificationComponent = /** @class */ (function (_super) {
        __extends(NzNotificationComponent, _super);
        function NzNotificationComponent(cdr) {
            var _this = _super.call(this, cdr) || this;
            _this.destroyed = new core.EventEmitter();
            return _this;
        }
        /**
         * @return {?}
         */
        NzNotificationComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this.instance.onClick.complete();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzNotificationComponent.prototype.onClick = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.instance.onClick.next(event);
        };
        /**
         * @return {?}
         */
        NzNotificationComponent.prototype.close = /**
         * @return {?}
         */
        function () {
            this.destroy(true);
        };
        Object.defineProperty(NzNotificationComponent.prototype, "state", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.instance.state === 'enter') {
                    if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
                        return 'enterLeft';
                    }
                    else {
                        return 'enterRight';
                    }
                }
                else {
                    return this.instance.state;
                }
            },
            enumerable: true,
            configurable: true
        });
        NzNotificationComponent.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-notification',
                        exportAs: 'nzNotification',
                        preserveWhitespaces: false,
                        animations: [animation.notificationMotion],
                        template: "\n    <div\n      class=\"ant-notification-notice ant-notification-notice-closable\"\n      [ngStyle]=\"instance.options?.nzStyle || null\"\n      [ngClass]=\"instance.options?.nzClass || ''\"\n      [@notificationMotion]=\"state\"\n      (click)=\"onClick($event)\"\n      (mouseenter)=\"onEnter()\"\n      (mouseleave)=\"onLeave()\"\n    >\n      <div *ngIf=\"!instance.template\" class=\"ant-notification-notice-content\">\n        <div class=\"ant-notification-notice-content\" [ngClass]=\"{ 'ant-notification-notice-with-icon': instance.type !== 'blank' }\">\n          <div [class.ant-notification-notice-with-icon]=\"instance.type !== 'blank'\">\n            <ng-container [ngSwitch]=\"instance.type\">\n              <i\n                *ngSwitchCase=\"'success'\"\n                nz-icon\n                nzType=\"check-circle\"\n                class=\"ant-notification-notice-icon ant-notification-notice-icon-success\"\n              ></i>\n              <i\n                *ngSwitchCase=\"'info'\"\n                nz-icon\n                nzType=\"info-circle\"\n                class=\"ant-notification-notice-icon ant-notification-notice-icon-info\"\n              ></i>\n              <i\n                *ngSwitchCase=\"'warning'\"\n                nz-icon\n                nzType=\"exclamation-circle\"\n                class=\"ant-notification-notice-icon ant-notification-notice-icon-warning\"\n              ></i>\n              <i\n                *ngSwitchCase=\"'error'\"\n                nz-icon\n                nzType=\"close-circle\"\n                class=\"ant-notification-notice-icon ant-notification-notice-icon-error\"\n              ></i>\n            </ng-container>\n            <div class=\"ant-notification-notice-message\" [innerHTML]=\"instance.title\"></div>\n            <div class=\"ant-notification-notice-description\" [innerHTML]=\"instance.content\"></div>\n          </div>\n        </div>\n      </div>\n      <ng-template\n        [ngIf]=\"instance.template\"\n        [ngTemplateOutlet]=\"instance.template!\"\n        [ngTemplateOutletContext]=\"{ $implicit: this, data: instance.options?.nzData }\"\n      >\n      </ng-template>\n      <a tabindex=\"0\" class=\"ant-notification-notice-close\" (click)=\"close()\">\n        <span class=\"ant-notification-notice-close-x\">\n          <ng-container *ngIf=\"instance.options?.nzCloseIcon; else iconTpl\">\n            <ng-container *nzStringTemplateOutlet=\"instance.options?.nzCloseIcon; let closeIcon\">\n              <i nz-icon [nzType]=\"closeIcon\"></i>\n            </ng-container>\n          </ng-container>\n          <ng-template #iconTpl>\n            <i nz-icon nzType=\"close\" class=\"ant-notification-close-icon\"></i>\n          </ng-template>\n        </span>\n      </a>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzNotificationComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzNotificationComponent.propDecorators = {
            instance: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            index: [{ type: core.Input }],
            destroyed: [{ type: core.Output }]
        };
        return NzNotificationComponent;
    }(message.NzMNComponent));
    if (false) {
        /** @type {?} */
        NzNotificationComponent.prototype.instance;
        /** @type {?} */
        NzNotificationComponent.prototype.placement;
        /** @type {?} */
        NzNotificationComponent.prototype.index;
        /** @type {?} */
        NzNotificationComponent.prototype.destroyed;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: notification-container.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'notification';
    /** @type {?} */
    var NZ_NOTIFICATION_DEFAULT_CONFIG = {
        nzTop: '24px',
        nzBottom: '24px',
        nzPlacement: 'topRight',
        nzDuration: 4500,
        nzMaxStack: 7,
        nzPauseOnHover: true,
        nzAnimate: true
    };
    var NzNotificationContainerComponent = /** @class */ (function (_super) {
        __extends(NzNotificationContainerComponent, _super);
        function NzNotificationContainerComponent(cdr, nzConfigService) {
            var _this = _super.call(this, cdr, nzConfigService) || this;
            // initialized by parent class constructor
            _this.instances = [];
            _this.topLeftInstances = [];
            _this.topRightInstances = [];
            _this.bottomLeftInstances = [];
            _this.bottomRightInstances = [];
            return _this;
        }
        /**
         * @param {?} notification
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.create = /**
         * @param {?} notification
         * @return {?}
         */
        function (notification) {
            /** @type {?} */
            var noti = this.onCreate(notification);
            /** @type {?} */
            var key = noti.options.nzKey;
            /** @type {?} */
            var notificationWithSameKey = this.instances.find((/**
             * @param {?} msg
             * @return {?}
             */
            function (msg) { return msg.options.nzKey === ((/** @type {?} */ (notification.options))).nzKey; }));
            if (key && notificationWithSameKey) {
                this.replaceNotification(notificationWithSameKey, noti);
            }
            else {
                if (this.instances.length >= this.config.nzMaxStack) {
                    this.instances = this.instances.slice(1);
                }
                this.instances = __spread(this.instances, [noti]);
            }
            this.readyInstances();
            return noti;
        };
        /**
         * @protected
         * @param {?} instance
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.onCreate = /**
         * @protected
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            instance.options = this.mergeOptions(instance.options);
            instance.onClose = new rxjs.Subject();
            instance.onClick = new rxjs.Subject();
            return (/** @type {?} */ (instance));
        };
        /**
         * @protected
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.subscribeConfigChange = /**
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.updateConfig(); }));
        };
        /**
         * @protected
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.updateConfig = /**
         * @protected
         * @return {?}
         */
        function () {
            this.config = __assign(__assign(__assign({}, NZ_NOTIFICATION_DEFAULT_CONFIG), this.config), this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME));
            this.top = util.toCssPixel((/** @type {?} */ (this.config.nzTop)));
            this.bottom = util.toCssPixel((/** @type {?} */ (this.config.nzBottom)));
            this.cdr.markForCheck();
        };
        /**
         * @private
         * @param {?} old
         * @param {?} _new
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.replaceNotification = /**
         * @private
         * @param {?} old
         * @param {?} _new
         * @return {?}
         */
        function (old, _new) {
            old.title = _new.title;
            old.content = _new.content;
            old.template = _new.template;
            old.type = _new.type;
            old.options = _new.options;
        };
        /**
         * @protected
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.readyInstances = /**
         * @protected
         * @return {?}
         */
        function () {
            this.topLeftInstances = this.instances.filter((/**
             * @param {?} m
             * @return {?}
             */
            function (m) { return m.options.nzPlacement === 'topLeft'; }));
            this.topRightInstances = this.instances.filter((/**
             * @param {?} m
             * @return {?}
             */
            function (m) { return m.options.nzPlacement === 'topRight' || !m.options.nzPlacement; }));
            this.bottomLeftInstances = this.instances.filter((/**
             * @param {?} m
             * @return {?}
             */
            function (m) { return m.options.nzPlacement === 'bottomLeft'; }));
            this.bottomRightInstances = this.instances.filter((/**
             * @param {?} m
             * @return {?}
             */
            function (m) { return m.options.nzPlacement === 'bottomRight'; }));
            this.cdr.detectChanges();
        };
        /**
         * @protected
         * @param {?=} options
         * @return {?}
         */
        NzNotificationContainerComponent.prototype.mergeOptions = /**
         * @protected
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            var nzPosition = (options !== null && options !== void 0 ? options : {}).nzPosition;
            if (nzPosition) {
                logger.warnDeprecation('`nzPosition` of NzNotificationDataOptions is deprecated and would be removed in 10.0.0. Use `nzPlacement` instead.');
            }
            var _a = this.config, nzDuration = _a.nzDuration, nzAnimate = _a.nzAnimate, nzPauseOnHover = _a.nzPauseOnHover, nzPlacement = _a.nzPlacement;
            return __assign({ nzDuration: nzDuration, nzAnimate: nzAnimate, nzPauseOnHover: nzPauseOnHover, nzPlacement: nzPlacement || nzPosition }, options);
        };
        NzNotificationContainerComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-notification-container',
                        exportAs: 'nzNotificationContainer',
                        preserveWhitespaces: false,
                        template: "\n    <div class=\"ant-notification ant-notification-topLeft\" [style.top]=\"top\" [style.left]=\"'0px'\">\n      <nz-notification\n        *ngFor=\"let instance of topLeftInstances\"\n        [instance]=\"instance\"\n        [placement]=\"config.nzPlacement\"\n        (destroyed)=\"remove($event.id, $event.userAction)\"\n      ></nz-notification>\n    </div>\n    <div class=\"ant-notification ant-notification-topRight\" [style.top]=\"top\" [style.right]=\"'0px'\">\n      <nz-notification\n        *ngFor=\"let instance of topRightInstances\"\n        [instance]=\"instance\"\n        [placement]=\"config.nzPlacement\"\n        (destroyed)=\"remove($event.id, $event.userAction)\"\n      ></nz-notification>\n    </div>\n    <div class=\"ant-notification ant-notification-bottomLeft\" [style.bottom]=\"bottom\" [style.left]=\"'0px'\">\n      <nz-notification\n        *ngFor=\"let instance of bottomLeftInstances\"\n        [instance]=\"instance\"\n        [placement]=\"config.nzPlacement\"\n        (destroyed)=\"remove($event.id, $event.userAction)\"\n      ></nz-notification>\n    </div>\n    <div class=\"ant-notification ant-notification-bottomRight\" [style.bottom]=\"bottom\" [style.right]=\"'0px'\">\n      <nz-notification\n        *ngFor=\"let instance of bottomRightInstances\"\n        [instance]=\"instance\"\n        [placement]=\"config.nzPlacement\"\n        (destroyed)=\"remove($event.id, $event.userAction)\"\n      ></nz-notification>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzNotificationContainerComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: config.NzConfigService }
        ]; };
        return NzNotificationContainerComponent;
    }(message.NzMNContainerComponent));
    if (false) {
        /** @type {?} */
        NzNotificationContainerComponent.prototype.bottom;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.top;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.config;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.instances;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.topLeftInstances;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.topRightInstances;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.bottomLeftInstances;
        /** @type {?} */
        NzNotificationContainerComponent.prototype.bottomRightInstances;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: notification.service.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzNotificationServiceModule = /** @class */ (function () {
        function NzNotificationServiceModule() {
        }
        NzNotificationServiceModule.decorators = [
            { type: core.NgModule }
        ];
        return NzNotificationServiceModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: notification.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzNotificationModule = /** @class */ (function () {
        function NzNotificationModule() {
        }
        NzNotificationModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, overlay.OverlayModule, icon.NzIconModule, outlet.NzOutletModule, NzNotificationServiceModule],
                        declarations: [NzNotificationComponent, NzNotificationContainerComponent],
                        entryComponents: [NzNotificationContainerComponent]
                    },] }
        ];
        return NzNotificationModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: typings.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     * @template T
     */
    function NzNotificationDataOptions() { }
    if (false) {
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzKey;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzStyle;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzClass;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzCloseIcon;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzPlacement;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzData;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzDuration;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzAnimate;
        /** @type {?|undefined} */
        NzNotificationDataOptions.prototype.nzPauseOnHover;
        /**
         * @deprecated use nzPlacement instead, this would be removed in 10.0.0
         * @type {?|undefined}
         */
        NzNotificationDataOptions.prototype.nzPosition;
    }
    /**
     * @record
     */
    function NzNotificationData() { }
    if (false) {
        /** @type {?|undefined} */
        NzNotificationData.prototype.content;
        /** @type {?|undefined} */
        NzNotificationData.prototype.createdAt;
        /** @type {?|undefined} */
        NzNotificationData.prototype.messageId;
        /** @type {?|undefined} */
        NzNotificationData.prototype.options;
        /** @type {?|undefined} */
        NzNotificationData.prototype.state;
        /** @type {?|undefined} */
        NzNotificationData.prototype.template;
        /** @type {?|undefined} */
        NzNotificationData.prototype.title;
        /** @type {?|undefined} */
        NzNotificationData.prototype.type;
        /** @type {?|undefined} */
        NzNotificationData.prototype.onClose;
        /** @type {?|undefined} */
        NzNotificationData.prototype.onClick;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: notification.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var notificationId = 0;
    var NzNotificationService = /** @class */ (function (_super) {
        __extends(NzNotificationService, _super);
        function NzNotificationService(nzSingletonService, overlay, injector) {
            var _this = _super.call(this, nzSingletonService, overlay, injector) || this;
            _this.componentPrefix = 'notification-';
            return _this;
        }
        /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.success = /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (title, content, options) {
            return this.createInstance({ type: 'success', title: title, content: content }, options);
        };
        /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.error = /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (title, content, options) {
            return this.createInstance({ type: 'error', title: title, content: content }, options);
        };
        /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.info = /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (title, content, options) {
            return this.createInstance({ type: 'info', title: title, content: content }, options);
        };
        /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.warning = /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (title, content, options) {
            return this.createInstance({ type: 'warning', title: title, content: content }, options);
        };
        /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.blank = /**
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (title, content, options) {
            return this.createInstance({ type: 'blank', title: title, content: content }, options);
        };
        /**
         * @param {?} type
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.create = /**
         * @param {?} type
         * @param {?} title
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (type, title, content, options) {
            return this.createInstance({ type: type, title: title, content: content }, options);
        };
        /**
         * @param {?} template
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.template = /**
         * @param {?} template
         * @param {?=} options
         * @return {?}
         */
        function (template, options) {
            return this.createInstance({ template: template }, options);
        };
        /**
         * @protected
         * @return {?}
         */
        NzNotificationService.prototype.generateMessageId = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.componentPrefix + "-" + notificationId++;
        };
        /**
         * @private
         * @param {?} message
         * @param {?=} options
         * @return {?}
         */
        NzNotificationService.prototype.createInstance = /**
         * @private
         * @param {?} message
         * @param {?=} options
         * @return {?}
         */
        function (message, options) {
            this.container = this.withContainer(NzNotificationContainerComponent);
            return this.container.create(__assign(__assign({}, message), {
                createdAt: new Date(),
                messageId: this.generateMessageId(),
                options: options
            }));
        };
        NzNotificationService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: NzNotificationServiceModule
                    },] }
        ];
        /** @nocollapse */
        NzNotificationService.ctorParameters = function () { return [
            { type: services.NzSingletonService },
            { type: overlay.Overlay },
            { type: core.Injector }
        ]; };
        /** @nocollapse */ NzNotificationService.??prov = core.????defineInjectable({ factory: function NzNotificationService_Factory() { return new NzNotificationService(core.????inject(services.NzSingletonService), core.????inject(overlay.Overlay), core.????inject(core.INJECTOR)); }, token: NzNotificationService, providedIn: NzNotificationServiceModule });
        return NzNotificationService;
    }(message.NzMNService));
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        NzNotificationService.prototype.container;
        /**
         * @type {?}
         * @protected
         */
        NzNotificationService.prototype.componentPrefix;
    }

    exports.NzNotificationComponent = NzNotificationComponent;
    exports.NzNotificationContainerComponent = NzNotificationContainerComponent;
    exports.NzNotificationModule = NzNotificationModule;
    exports.NzNotificationService = NzNotificationService;
    exports.NzNotificationServiceModule = NzNotificationServiceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-notification.umd.js.map
