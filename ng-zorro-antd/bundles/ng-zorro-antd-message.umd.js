(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/portal'), require('@angular/core'), require('rxjs'), require('@angular/cdk/overlay'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/util'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/animation')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/message', ['exports', '@angular/cdk/portal', '@angular/core', 'rxjs', '@angular/cdk/overlay', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/util', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/animation'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].message = {}), global.ng.cdk.portal, global.ng.core, global.rxjs, global.ng.cdk.overlay, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.util, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.animation));
}(this, (function (exports, portal, core, rxjs, overlay, services, config, util, operators, common, outlet, icon, animation) { 'use strict';

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
     * Generated from: base.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var globalCounter = 0;
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    NzMNService = /** @class */ (function () {
        function NzMNService(nzSingletonService, overlay, injector) {
            this.nzSingletonService = nzSingletonService;
            this.overlay = overlay;
            this.injector = injector;
        }
        /**
         * @param {?=} id
         * @return {?}
         */
        NzMNService.prototype.remove = /**
         * @param {?=} id
         * @return {?}
         */
        function (id) {
            if (this.container) {
                if (id) {
                    this.container.remove(id);
                }
                else {
                    this.container.removeAll();
                }
            }
        };
        /**
         * @protected
         * @return {?}
         */
        NzMNService.prototype.getInstanceId = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.componentPrefix + "-" + globalCounter++;
        };
        /**
         * @protected
         * @template T
         * @param {?} ctor
         * @return {?}
         */
        NzMNService.prototype.withContainer = /**
         * @protected
         * @template T
         * @param {?} ctor
         * @return {?}
         */
        function (ctor) {
            /** @type {?} */
            var containerInstance = this.nzSingletonService.getSingletonWithKey(this.componentPrefix);
            if (containerInstance) {
                return (/** @type {?} */ (containerInstance));
            }
            /** @type {?} */
            var overlayRef = this.overlay.create({
                hasBackdrop: false,
                scrollStrategy: this.overlay.scrollStrategies.noop(),
                positionStrategy: this.overlay.position().global()
            });
            /** @type {?} */
            var componentPortal = new portal.ComponentPortal(ctor, null, this.injector);
            /** @type {?} */
            var componentRef = overlayRef.attach(componentPortal);
            /** @type {?} */
            var overlayPane = overlayRef.overlayElement;
            overlayPane.style.zIndex = '1010';
            if (!containerInstance) {
                this.container = containerInstance = componentRef.instance;
                this.nzSingletonService.registerSingletonWithKey(this.componentPrefix, containerInstance);
            }
            return (/** @type {?} */ (containerInstance));
        };
        return NzMNService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        NzMNService.prototype.componentPrefix;
        /**
         * @type {?}
         * @protected
         */
        NzMNService.prototype.container;
        /**
         * @type {?}
         * @protected
         */
        NzMNService.prototype.nzSingletonService;
        /**
         * @type {?}
         * @protected
         */
        NzMNService.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        NzMNService.prototype.injector;
    }
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    NzMNContainerComponent = /** @class */ (function () {
        function NzMNContainerComponent(cdr, nzConfigService) {
            this.cdr = cdr;
            this.nzConfigService = nzConfigService;
            this.instances = [];
            this.destroy$ = new rxjs.Subject();
            this.updateConfig();
        }
        /**
         * @return {?}
         */
        NzMNContainerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.subscribeConfigChange();
        };
        /**
         * @return {?}
         */
        NzMNContainerComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        NzMNContainerComponent.prototype.create = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var instance = this.onCreate(data);
            if (this.instances.length >= (/** @type {?} */ (this.config)).nzMaxStack) {
                this.instances = this.instances.slice(1);
            }
            this.instances = __spread(this.instances, [instance]);
            this.readyInstances();
            return instance;
        };
        /**
         * @param {?} id
         * @param {?=} userAction
         * @return {?}
         */
        NzMNContainerComponent.prototype.remove = /**
         * @param {?} id
         * @param {?=} userAction
         * @return {?}
         */
        function (id, userAction) {
            var _this = this;
            if (userAction === void 0) { userAction = false; }
            this.instances.some((/**
             * @param {?} instance
             * @param {?} index
             * @return {?}
             */
            function (instance, index) {
                if (instance.messageId === id) {
                    _this.instances.splice(index, 1);
                    _this.instances = __spread(_this.instances);
                    _this.onRemove(instance, userAction);
                    _this.readyInstances();
                    return true;
                }
                return false;
            }));
        };
        /**
         * @return {?}
         */
        NzMNContainerComponent.prototype.removeAll = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.instances.forEach((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.onRemove(i, false); }));
            this.instances = [];
            this.readyInstances();
        };
        /**
         * @protected
         * @param {?} instance
         * @return {?}
         */
        NzMNContainerComponent.prototype.onCreate = /**
         * @protected
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            instance.options = this.mergeOptions(instance.options);
            instance.onClose = new rxjs.Subject();
            return (/** @type {?} */ (instance));
        };
        /**
         * @protected
         * @param {?} instance
         * @param {?} userAction
         * @return {?}
         */
        NzMNContainerComponent.prototype.onRemove = /**
         * @protected
         * @param {?} instance
         * @param {?} userAction
         * @return {?}
         */
        function (instance, userAction) {
            instance.onClose.next(userAction);
            instance.onClose.complete();
        };
        /**
         * @protected
         * @return {?}
         */
        NzMNContainerComponent.prototype.readyInstances = /**
         * @protected
         * @return {?}
         */
        function () {
            this.cdr.detectChanges();
        };
        /**
         * @protected
         * @param {?=} options
         * @return {?}
         */
        NzMNContainerComponent.prototype.mergeOptions = /**
         * @protected
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            var _a = (/** @type {?} */ (this.config)), nzDuration = _a.nzDuration, nzAnimate = _a.nzAnimate, nzPauseOnHover = _a.nzPauseOnHover;
            return __assign({ nzDuration: nzDuration, nzAnimate: nzAnimate, nzPauseOnHover: nzPauseOnHover }, options);
        };
        return NzMNContainerComponent;
    }());
    if (false) {
        /** @type {?} */
        NzMNContainerComponent.prototype.config;
        /** @type {?} */
        NzMNContainerComponent.prototype.instances;
        /**
         * @type {?}
         * @protected
         */
        NzMNContainerComponent.prototype.destroy$;
        /**
         * @type {?}
         * @protected
         */
        NzMNContainerComponent.prototype.cdr;
        /**
         * @type {?}
         * @protected
         */
        NzMNContainerComponent.prototype.nzConfigService;
        /**
         * @abstract
         * @protected
         * @return {?}
         */
        NzMNContainerComponent.prototype.updateConfig = function () { };
        /**
         * @abstract
         * @protected
         * @return {?}
         */
        NzMNContainerComponent.prototype.subscribeConfigChange = function () { };
    }
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    NzMNComponent = /** @class */ (function () {
        function NzMNComponent(cdr) {
            this.cdr = cdr;
            this.destroyed = new core.EventEmitter();
            this.eraseTimer = null;
        }
        /**
         * @return {?}
         */
        NzMNComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.options = (/** @type {?} */ (this.instance.options));
            if (this.options.nzAnimate) {
                this.instance.state = 'enter';
            }
            this.autoClose = this.options.nzDuration > 0;
            if (this.autoClose) {
                this.initErase();
                this.startEraseTimeout();
            }
        };
        /**
         * @return {?}
         */
        NzMNComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.autoClose) {
                this.clearEraseTimeout();
            }
        };
        /**
         * @return {?}
         */
        NzMNComponent.prototype.onEnter = /**
         * @return {?}
         */
        function () {
            if (this.autoClose && this.options.nzPauseOnHover) {
                this.clearEraseTimeout();
                this.updateTTL();
            }
        };
        /**
         * @return {?}
         */
        NzMNComponent.prototype.onLeave = /**
         * @return {?}
         */
        function () {
            if (this.autoClose && this.options.nzPauseOnHover) {
                this.startEraseTimeout();
            }
        };
        /**
         * @protected
         * @param {?=} userAction
         * @return {?}
         */
        NzMNComponent.prototype.destroy = /**
         * @protected
         * @param {?=} userAction
         * @return {?}
         */
        function (userAction) {
            var _this = this;
            if (userAction === void 0) { userAction = false; }
            if (this.options.nzAnimate) {
                this.instance.state = 'leave';
                this.cdr.detectChanges();
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.destroyed.next({ id: _this.instance.messageId, userAction: userAction });
                }), 200);
            }
            else {
                this.destroyed.next({ id: this.instance.messageId, userAction: userAction });
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzMNComponent.prototype.initErase = /**
         * @private
         * @return {?}
         */
        function () {
            this.eraseTTL = this.options.nzDuration;
            this.eraseTimingStart = Date.now();
        };
        /**
         * @private
         * @return {?}
         */
        NzMNComponent.prototype.updateTTL = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.autoClose) {
                this.eraseTTL -= Date.now() - (/** @type {?} */ (this.eraseTimingStart));
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzMNComponent.prototype.startEraseTimeout = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.eraseTTL > 0) {
                this.clearEraseTimeout();
                this.eraseTimer = setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.destroy(); }), this.eraseTTL);
                this.eraseTimingStart = Date.now();
            }
            else {
                this.destroy();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzMNComponent.prototype.clearEraseTimeout = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.eraseTimer !== null) {
                clearTimeout(this.eraseTimer);
                this.eraseTimer = null;
            }
        };
        return NzMNComponent;
    }());
    if (false) {
        /** @type {?} */
        NzMNComponent.prototype.instance;
        /** @type {?} */
        NzMNComponent.prototype.index;
        /** @type {?} */
        NzMNComponent.prototype.destroyed;
        /**
         * @type {?}
         * @protected
         */
        NzMNComponent.prototype.options;
        /**
         * @type {?}
         * @protected
         */
        NzMNComponent.prototype.autoClose;
        /**
         * @type {?}
         * @protected
         */
        NzMNComponent.prototype.eraseTimer;
        /**
         * @type {?}
         * @protected
         */
        NzMNComponent.prototype.eraseTimingStart;
        /**
         * @type {?}
         * @protected
         */
        NzMNComponent.prototype.eraseTTL;
        /**
         * @type {?}
         * @protected
         */
        NzMNComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: message-container.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'message';
    /** @type {?} */
    var NZ_MESSAGE_DEFAULT_CONFIG = {
        nzAnimate: true,
        nzDuration: 3000,
        nzMaxStack: 7,
        nzPauseOnHover: true,
        nzTop: 24
    };
    var NzMessageContainerComponent = /** @class */ (function (_super) {
        __extends(NzMessageContainerComponent, _super);
        function NzMessageContainerComponent(cdr, nzConfigService) {
            var _this = _super.call(this, cdr, nzConfigService) || this;
            _this.destroy$ = new rxjs.Subject();
            _this.instances = [];
            return _this;
        }
        /**
         * @protected
         * @return {?}
         */
        NzMessageContainerComponent.prototype.subscribeConfigChange = /**
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
        NzMessageContainerComponent.prototype.updateConfig = /**
         * @protected
         * @return {?}
         */
        function () {
            this.config = __assign(__assign(__assign({}, NZ_MESSAGE_DEFAULT_CONFIG), this.config), this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME));
            this.top = util.toCssPixel(this.config.nzTop);
            this.cdr.markForCheck();
        };
        NzMessageContainerComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-message-container',
                        exportAs: 'nzMessageContainer',
                        preserveWhitespaces: false,
                        template: "\n    <div class=\"ant-message\" [style.top]=\"top\">\n      <nz-message *ngFor=\"let instance of instances\" [instance]=\"instance\" (destroyed)=\"remove($event.id, $event.userAction)\"></nz-message>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzMessageContainerComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: config.NzConfigService }
        ]; };
        return NzMessageContainerComponent;
    }(NzMNContainerComponent));
    if (false) {
        /** @type {?} */
        NzMessageContainerComponent.prototype.destroy$;
        /** @type {?} */
        NzMessageContainerComponent.prototype.instances;
        /** @type {?} */
        NzMessageContainerComponent.prototype.top;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: message.service.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMessageServiceModule = /** @class */ (function () {
        function NzMessageServiceModule() {
        }
        NzMessageServiceModule.decorators = [
            { type: core.NgModule }
        ];
        return NzMessageServiceModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: message.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMessageService = /** @class */ (function (_super) {
        __extends(NzMessageService, _super);
        function NzMessageService(nzSingletonService, overlay, injector) {
            var _this = _super.call(this, nzSingletonService, overlay, injector) || this;
            _this.componentPrefix = 'message-';
            return _this;
        }
        /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.success = /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (content, options) {
            return this.createInstance({ type: 'success', content: content }, options);
        };
        /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.error = /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (content, options) {
            return this.createInstance({ type: 'error', content: content }, options);
        };
        /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.info = /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (content, options) {
            return this.createInstance({ type: 'info', content: content }, options);
        };
        /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.warning = /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (content, options) {
            return this.createInstance({ type: 'warning', content: content }, options);
        };
        /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.loading = /**
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (content, options) {
            return this.createInstance({ type: 'loading', content: content }, options);
        };
        /**
         * @param {?} type
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.create = /**
         * @param {?} type
         * @param {?} content
         * @param {?=} options
         * @return {?}
         */
        function (type, content, options) {
            return this.createInstance({ type: type, content: content }, options);
        };
        /**
         * @private
         * @param {?} message
         * @param {?=} options
         * @return {?}
         */
        NzMessageService.prototype.createInstance = /**
         * @private
         * @param {?} message
         * @param {?=} options
         * @return {?}
         */
        function (message, options) {
            this.container = this.withContainer(NzMessageContainerComponent);
            return this.container.create(__assign(__assign({}, message), {
                createdAt: new Date(),
                messageId: this.getInstanceId(),
                options: options
            }));
        };
        NzMessageService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: NzMessageServiceModule
                    },] }
        ];
        /** @nocollapse */
        NzMessageService.ctorParameters = function () { return [
            { type: services.NzSingletonService },
            { type: overlay.Overlay },
            { type: core.Injector }
        ]; };
        /** @nocollapse */ NzMessageService.??prov = core.????defineInjectable({ factory: function NzMessageService_Factory() { return new NzMessageService(core.????inject(services.NzSingletonService), core.????inject(overlay.Overlay), core.????inject(core.INJECTOR)); }, token: NzMessageService, providedIn: NzMessageServiceModule });
        return NzMessageService;
    }(NzMNService));
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        NzMessageService.prototype.container;
        /**
         * @type {?}
         * @protected
         */
        NzMessageService.prototype.componentPrefix;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: message.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMessageComponent = /** @class */ (function (_super) {
        __extends(NzMessageComponent, _super);
        function NzMessageComponent(cdr) {
            var _this = _super.call(this, cdr) || this;
            _this.destroyed = new core.EventEmitter();
            return _this;
        }
        NzMessageComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-message',
                        exportAs: 'nzMessage',
                        preserveWhitespaces: false,
                        animations: [animation.moveUpMotion],
                        template: "\n    <div class=\"ant-message-notice\" [@moveUpMotion]=\"instance.state\" (mouseenter)=\"onEnter()\" (mouseleave)=\"onLeave()\">\n      <div class=\"ant-message-notice-content\">\n        <div class=\"ant-message-custom-content\" [ngClass]=\"'ant-message-' + instance.type\">\n          <ng-container [ngSwitch]=\"instance.type\">\n            <i *ngSwitchCase=\"'success'\" nz-icon nzType=\"check-circle\"></i>\n            <i *ngSwitchCase=\"'info'\" nz-icon nzType=\"info-circle\"></i>\n            <i *ngSwitchCase=\"'warning'\" nz-icon nzType=\"exclamation-circle\"></i>\n            <i *ngSwitchCase=\"'error'\" nz-icon nzType=\"close-circle\"></i>\n            <i *ngSwitchCase=\"'loading'\" nz-icon nzType=\"loading\"></i>\n          </ng-container>\n          <ng-container *nzStringTemplateOutlet=\"instance.content\">\n            <span [innerHTML]=\"instance.content\"></span>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzMessageComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzMessageComponent.propDecorators = {
            instance: [{ type: core.Input }],
            destroyed: [{ type: core.Output }]
        };
        return NzMessageComponent;
    }(NzMNComponent));
    if (false) {
        /** @type {?} */
        NzMessageComponent.prototype.instance;
        /** @type {?} */
        NzMessageComponent.prototype.destroyed;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: message.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMessageModule = /** @class */ (function () {
        function NzMessageModule() {
        }
        NzMessageModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, overlay.OverlayModule, icon.NzIconModule, outlet.NzOutletModule, NzMessageServiceModule],
                        declarations: [NzMessageContainerComponent, NzMessageComponent],
                        entryComponents: [NzMessageContainerComponent]
                    },] }
        ];
        return NzMessageModule;
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
     */
    function NzMessageDataOptions() { }
    if (false) {
        /** @type {?|undefined} */
        NzMessageDataOptions.prototype.nzDuration;
        /** @type {?|undefined} */
        NzMessageDataOptions.prototype.nzAnimate;
        /** @type {?|undefined} */
        NzMessageDataOptions.prototype.nzPauseOnHover;
    }
    /**
     * @record
     */
    function NzMessageData() { }
    if (false) {
        /** @type {?|undefined} */
        NzMessageData.prototype.type;
        /** @type {?|undefined} */
        NzMessageData.prototype.content;
        /** @type {?|undefined} */
        NzMessageData.prototype.messageId;
        /** @type {?|undefined} */
        NzMessageData.prototype.createdAt;
        /** @type {?|undefined} */
        NzMessageData.prototype.options;
        /** @type {?|undefined} */
        NzMessageData.prototype.state;
        /** @type {?|undefined} */
        NzMessageData.prototype.onClose;
    }

    exports.NzMNComponent = NzMNComponent;
    exports.NzMNContainerComponent = NzMNContainerComponent;
    exports.NzMNService = NzMNService;
    exports.NzMessageComponent = NzMessageComponent;
    exports.NzMessageContainerComponent = NzMessageContainerComponent;
    exports.NzMessageModule = NzMessageModule;
    exports.NzMessageService = NzMessageService;
    exports.NzMessageServiceModule = NzMessageServiceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-message.umd.js.map
