(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngxs/store/internals'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngxs/store', ['exports', '@angular/core', '@ngxs/store/internals', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ngxs = global.ngxs || {}, global.ngxs.store = {}), global.ng.core, global.ngxs.store.internals, global.ng.common, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, internals, common, rxjs, operators) { 'use strict';

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

    var _a;
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var VALIDATION_CODE = {
        STATE_NAME: 'STATE_NAME',
        STATE_UNIQUE: 'STATE_UNIQUE',
        STATE_NAME_PROPERTY: 'STATE_NAME_PROPERTY',
        STATE_DECORATOR: 'STATE_DECORATOR',
        INCORRECT_PRODUCTION: 'INCORRECT_PRODUCTION',
        INCORRECT_DEVELOPMENT: 'INCORRECT_DEVELOPMENT',
        SELECT_FACTORY_NOT_CONNECTED: 'SELECT_FACTORY_NOT_CONNECTED',
        ACTION_DECORATOR: 'ACTION_DECORATOR',
        SELECTOR_DECORATOR: 'SELECTOR_DECORATOR',
        ZONE_WARNING: 'ZONE_WARNING',
        PATCHING_ARRAY: 'PATCHING_ARRAY',
        PATCHING_PRIMITIVE: 'PATCHING_PRIMITIVE',
        UNDECORATED_STATE_IN_IVY: 'UNDECORATED_STATE_IN_IVY',
    };
    /** @type {?} */
    var CONFIG_MESSAGES = (_a = {},
        _a[VALIDATION_CODE.STATE_NAME] = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return name + " is not a valid state name. It needs to be a valid object property name.";
        }),
        _a[VALIDATION_CODE.STATE_NAME_PROPERTY] = (/**
         * @return {?}
         */
        function () { return "States must register a 'name' property"; }),
        _a[VALIDATION_CODE.STATE_UNIQUE] = (/**
         * @param {?} current
         * @param {?} newName
         * @param {?} oldName
         * @return {?}
         */
        function (current, newName, oldName) {
            return "State name '" + current + "' from " + newName + " already exists in " + oldName;
        }),
        _a[VALIDATION_CODE.STATE_DECORATOR] = (/**
         * @return {?}
         */
        function () { return 'States must be decorated with @State() decorator'; }),
        _a[VALIDATION_CODE.INCORRECT_PRODUCTION] = (/**
         * @return {?}
         */
        function () {
            return 'Angular is running in production mode but NGXS is still running in the development mode!\n' +
                'Please set developmentMode to false on the NgxsModule options when in production mode.\n' +
                'NgxsModule.forRoot(states, { developmentMode: !environment.production })';
        }),
        _a[VALIDATION_CODE.INCORRECT_DEVELOPMENT] = (/**
         * @return {?}
         */
        function () {
            return 'RECOMMENDATION: Set developmentMode to true on the NgxsModule when Angular is running in development mode.\n' +
                'NgxsModule.forRoot(states, { developmentMode: !environment.production })';
        }),
        _a[VALIDATION_CODE.SELECT_FACTORY_NOT_CONNECTED] = (/**
         * @return {?}
         */
        function () {
            return 'You have forgotten to import the NGXS module!';
        }),
        _a[VALIDATION_CODE.ACTION_DECORATOR] = (/**
         * @return {?}
         */
        function () {
            return '@Action() decorator cannot be used with static methods';
        }),
        _a[VALIDATION_CODE.SELECTOR_DECORATOR] = (/**
         * @return {?}
         */
        function () { return 'Selectors only work on methods'; }),
        _a[VALIDATION_CODE.ZONE_WARNING] = (/**
         * @return {?}
         */
        function () {
            return 'Your application was bootstrapped with nooped zone and your execution strategy requires an actual NgZone!\n' +
                'Please set the value of the executionStrategy property to NoopNgxsExecutionStrategy.\n' +
                'NgxsModule.forRoot(states, { executionStrategy: NoopNgxsExecutionStrategy })';
        }),
        _a[VALIDATION_CODE.PATCHING_ARRAY] = (/**
         * @return {?}
         */
        function () { return 'Patching arrays is not supported.'; }),
        _a[VALIDATION_CODE.PATCHING_PRIMITIVE] = (/**
         * @return {?}
         */
        function () { return 'Patching primitives is not supported.'; }),
        _a[VALIDATION_CODE.UNDECORATED_STATE_IN_IVY] = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return "'" + name + "' class should be decorated with @Injectable() right after the @State() decorator";
        }),
        _a);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DispatchOutsideZoneNgxsExecutionStrategy = /** @class */ (function () {
        function DispatchOutsideZoneNgxsExecutionStrategy(_ngZone, _platformId) {
            this._ngZone = _ngZone;
            this._platformId = _platformId;
            this.verifyZoneIsNotNooped(this._ngZone);
        }
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype.enter = /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            if (common.isPlatformServer(this._platformId)) {
                return this.runInsideAngular(func);
            }
            return this.runOutsideAngular(func);
        };
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype.leave = /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            return this.runInsideAngular(func);
        };
        /**
         * @private
         * @template T
         * @param {?} func
         * @return {?}
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype.runInsideAngular = /**
         * @private
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            if (core.NgZone.isInAngularZone()) {
                return func();
            }
            return this._ngZone.run(func);
        };
        /**
         * @private
         * @template T
         * @param {?} func
         * @return {?}
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype.runOutsideAngular = /**
         * @private
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            if (core.NgZone.isInAngularZone()) {
                return this._ngZone.runOutsideAngular(func);
            }
            return func();
        };
        /**
         * @private
         * @param {?} ngZone
         * @return {?}
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype.verifyZoneIsNotNooped = /**
         * @private
         * @param {?} ngZone
         * @return {?}
         */
        function (ngZone) {
            // `NoopNgZone` is not exposed publicly as it doesn't expect
            // to be used outside of the core Angular code, thus we just have
            // to check if the zone doesn't extend or instanceof `NgZone`
            if (ngZone instanceof core.NgZone) {
                return;
            }
            console.warn(CONFIG_MESSAGES[VALIDATION_CODE.ZONE_WARNING]());
        };
        DispatchOutsideZoneNgxsExecutionStrategy.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DispatchOutsideZoneNgxsExecutionStrategy.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: String, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        return DispatchOutsideZoneNgxsExecutionStrategy;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype._ngZone;
        /**
         * @type {?}
         * @private
         */
        DispatchOutsideZoneNgxsExecutionStrategy.prototype._platformId;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ROOT_STATE_TOKEN = new core.InjectionToken('ROOT_STATE_TOKEN');
    /** @type {?} */
    var FEATURE_STATE_TOKEN = new core.InjectionToken('FEATURE_STATE_TOKEN');
    /** @type {?} */
    var NGXS_PLUGINS = new core.InjectionToken('NGXS_PLUGINS');
    /** @type {?} */
    var NG_TEST_MODE = new core.InjectionToken('NG_TEST_MODE');
    /** @type {?} */
    var NG_DEV_MODE = new core.InjectionToken('NG_DEV_MODE');
    /** @type {?} */
    var META_KEY = 'NGXS_META';
    /** @type {?} */
    var META_OPTIONS_KEY = 'NGXS_OPTIONS_META';
    /** @type {?} */
    var SELECTOR_META_KEY = 'NGXS_SELECTOR_META';
    /**
     * The NGXS config settings.
     */
    var NgxsConfig = /** @class */ (function () {
        function NgxsConfig() {
            /**
             * Defining the default state before module initialization
             * This is convenient if we need to create a define our own set of states.
             * @deprecated will be removed after v4
             * (default: {})
             */
            this.defaultsState = {};
            /**
             * Defining shared selector options
             */
            this.selectorOptions = {
                injectContainerState: true,
                // TODO: default is true in v3, will change in v4
                suppressErrors: true // TODO: default is true in v3, will change in v4
            };
            this.compatibility = {
                strictContentSecurityPolicy: false
            };
            this.executionStrategy = DispatchOutsideZoneNgxsExecutionStrategy;
        }
        NgxsConfig.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxsConfig.ctorParameters = function () { return []; };
        return NgxsConfig;
    }());
    if (false) {
        /**
         * Run in development mode. This will add additional debugging features:
         * - Object.freeze on the state and actions to guarantee immutability
         * (default: false)
         * @type {?}
         */
        NgxsConfig.prototype.developmentMode;
        /** @type {?} */
        NgxsConfig.prototype.compatibility;
        /**
         * Determines the execution context to perform async operations inside. An implementation can be
         * provided to override the default behaviour where the async operations are run
         * outside Angular's zone but all observable behaviours of NGXS are run back inside Angular's zone.
         * These observable behaviours are from:
         *   `\@Select(...)`, `store.select(...)`, `actions.subscribe(...)` or `store.dispatch(...).subscribe(...)`
         * Every `zone.run` causes Angular to run change detection on the whole tree (`app.tick()`) so of your
         * application doesn't rely on zone.js running change detection then you can switch to the
         * `NoopNgxsExecutionStrategy` that doesn't interact with zones.
         * (default: null)
         * @type {?}
         */
        NgxsConfig.prototype.executionStrategy;
        /**
         * Defining the default state before module initialization
         * This is convenient if we need to create a define our own set of states.
         * @deprecated will be removed after v4
         * (default: {})
         * @type {?}
         */
        NgxsConfig.prototype.defaultsState;
        /**
         * Defining shared selector options
         * @type {?}
         */
        NgxsConfig.prototype.selectorOptions;
    }
    /**
     * State context provided to the actions in the state.
     * @record
     * @template T
     */
    function StateContext() { }
    if (false) {
        /**
         * Get the current state.
         * @return {?}
         */
        StateContext.prototype.getState = function () { };
        /**
         * Reset the state to a new value.
         * @param {?} val
         * @return {?}
         */
        StateContext.prototype.setState = function (val) { };
        /**
         * Patch the existing state with the provided value.
         * @param {?} val
         * @return {?}
         */
        StateContext.prototype.patchState = function (val) { };
        /**
         * Dispatch a new action and return the dispatched observable.
         * @param {?} actions
         * @return {?}
         */
        StateContext.prototype.dispatch = function (actions) { };
    }
    /**
     * Plugin interface
     * @record
     */
    function NgxsPlugin() { }
    if (false) {
        /**
         * Handle the state/action before its submitted to the state handlers.
         * @param {?} state
         * @param {?} action
         * @param {?} next
         * @return {?}
         */
        NgxsPlugin.prototype.handle = function (state, action, next) { };
    }
    /**
     * Options that can be provided to the store.
     * @record
     * @template T
     */
    function StoreOptions() { }
    if (false) {
        /**
         * Name of the state. Required.
         * @type {?}
         */
        StoreOptions.prototype.name;
        /**
         * Default values for the state. If not provided, uses empty object.
         * @type {?|undefined}
         */
        StoreOptions.prototype.defaults;
        /**
         * Sub states for the given state.
         * @type {?|undefined}
         */
        StoreOptions.prototype.children;
    }
    /**
     * Represents a basic change from a previous to a new value for a single state instance.
     * Passed as a value in a NgxsSimpleChanges object to the ngxsOnChanges hook.
     * @template T
     */
    var   /**
     * Represents a basic change from a previous to a new value for a single state instance.
     * Passed as a value in a NgxsSimpleChanges object to the ngxsOnChanges hook.
     * @template T
     */
    NgxsSimpleChange = /** @class */ (function () {
        function NgxsSimpleChange(previousValue, currentValue, firstChange) {
            this.previousValue = previousValue;
            this.currentValue = currentValue;
            this.firstChange = firstChange;
        }
        return NgxsSimpleChange;
    }());
    if (false) {
        /** @type {?} */
        NgxsSimpleChange.prototype.previousValue;
        /** @type {?} */
        NgxsSimpleChange.prototype.currentValue;
        /** @type {?} */
        NgxsSimpleChange.prototype.firstChange;
    }
    /**
     * On init interface
     * @record
     */
    function NgxsOnInit() { }
    if (false) {
        /**
         * @param {?=} ctx
         * @return {?}
         */
        NgxsOnInit.prototype.ngxsOnInit = function (ctx) { };
    }
    /**
     * On change interface
     * @record
     */
    function NgxsOnChanges() { }
    if (false) {
        /**
         * @param {?} change
         * @return {?}
         */
        NgxsOnChanges.prototype.ngxsOnChanges = function (change) { };
    }
    /**
     * After bootstrap interface
     * @record
     */
    function NgxsAfterBootstrap() { }
    if (false) {
        /**
         * @param {?=} ctx
         * @return {?}
         */
        NgxsAfterBootstrap.prototype.ngxsAfterBootstrap = function (ctx) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
     * Internal execution strategy injection token
     */
    /** @type {?} */
    var NGXS_EXECUTION_STRATEGY = new core.InjectionToken('NGXS_EXECUTION_STRATEGY');
    /**
     * @record
     */
    function NgxsExecutionStrategy() { }
    if (false) {
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        NgxsExecutionStrategy.prototype.enter = function (func) { };
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        NgxsExecutionStrategy.prototype.leave = function (func) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Returns the type from an action instance/class.
     * @ignore
     * @param {?} action
     * @return {?}
     */
    function getActionTypeFromInstance(action) {
        if (action.constructor && action.constructor.type) {
            return action.constructor.type;
        }
        else {
            return action.type;
        }
    }
    /**
     * Matches a action
     * @ignore
     * @param {?} action1
     * @return {?}
     */
    function actionMatcher(action1) {
        /** @type {?} */
        var type1 = getActionTypeFromInstance(action1);
        return (/**
         * @param {?} action2
         * @return {?}
         */
        function (action2) {
            return type1 === getActionTypeFromInstance(action2);
        });
    }
    /**
     * Set a deeply nested value. Example:
     *
     *   setValue({ foo: { bar: { eat: false } } },
     *      'foo.bar.eat', true) //=> { foo: { bar: { eat: true } } }
     *
     * While it traverses it also creates new objects from top down.
     *
     * @ignore
     * @type {?}
     */
    var setValue = (/**
     * @param {?} obj
     * @param {?} prop
     * @param {?} val
     * @return {?}
     */
    function (obj, prop, val) {
        obj = __assign({}, obj);
        /** @type {?} */
        var split = prop.split('.');
        /** @type {?} */
        var lastIndex = split.length - 1;
        split.reduce((/**
         * @param {?} acc
         * @param {?} part
         * @param {?} index
         * @return {?}
         */
        function (acc, part, index) {
            if (index === lastIndex) {
                acc[part] = val;
            }
            else {
                acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : __assign({}, acc[part]);
            }
            return acc && acc[part];
        }), obj);
        return obj;
    });
    /**
     * Get a deeply nested value. Example:
     *
     *    getValue({ foo: bar: [] }, 'foo.bar') //=> []
     *
     * @ignore
     * @type {?}
     */
    var getValue = (/**
     * @param {?} obj
     * @param {?} prop
     * @return {?}
     */
    function (obj, prop) {
        return prop.split('.').reduce((/**
         * @param {?} acc
         * @param {?} part
         * @return {?}
         */
        function (acc, part) { return acc && acc[part]; }), obj);
    });
    /**
     * Simple object check.
     *
     *    isObject({a:1}) //=> true
     *    isObject(1) //=> false
     *
     * @ignore
     * @type {?}
     */
    var isObject = (/**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    });
    /**
     * Deep merge two objects.
     *
     *    mergeDeep({a:1, b:{x: 1, y:2}}, {b:{x: 3}, c:4}) //=> {a:1, b:{x:3, y:2}, c:4}
     *
     * \@param base base object onto which `sources` will be applied
     * @type {?}
     */
    var mergeDeep = (/**
     * @param {?} base
     * @param {...?} sources
     * @return {?}
     */
    function (base) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        var _a, _b;
        if (!sources.length)
            return base;
        /** @type {?} */
        var source = sources.shift();
        if (isObject(base) && isObject(source)) {
            for (var key in source) {
                if (isObject(source[key])) {
                    if (!base[key])
                        Object.assign(base, (_a = {}, _a[key] = {}, _a));
                    mergeDeep(base[key], source[key]);
                }
                else {
                    Object.assign(base, (_b = {}, _b[key] = source[key], _b));
                }
            }
        }
        return mergeDeep.apply(void 0, __spread([base], sources));
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T, U
     */
    function StateClassInternal() { }
    if (false) {
        /* Skipping unnamed member:
        [META_KEY]?: MetaDataModel;*/
        /* Skipping unnamed member:
        [META_OPTIONS_KEY]?: StoreOptions<U>;*/
    }
    /**
     * @record
     * @template T
     */
    function StateOperations() { }
    if (false) {
        /**
         * @return {?}
         */
        StateOperations.prototype.getState = function () { };
        /**
         * @param {?} val
         * @return {?}
         */
        StateOperations.prototype.setState = function (val) { };
        /**
         * @param {?} actionOrActions
         * @return {?}
         */
        StateOperations.prototype.dispatch = function (actionOrActions) { };
    }
    /**
     * @record
     */
    function MetaDataModel() { }
    if (false) {
        /** @type {?} */
        MetaDataModel.prototype.name;
        /** @type {?} */
        MetaDataModel.prototype.actions;
        /** @type {?} */
        MetaDataModel.prototype.defaults;
        /** @type {?} */
        MetaDataModel.prototype.path;
        /** @type {?} */
        MetaDataModel.prototype.makeRootSelector;
        /** @type {?|undefined} */
        MetaDataModel.prototype.children;
    }
    /**
     * @record
     */
    function RuntimeSelectorContext() { }
    if (false) {
        /**
         * @param {?} key
         * @return {?}
         */
        RuntimeSelectorContext.prototype.getStateGetter = function (key) { };
        /**
         * @param {?=} localOptions
         * @return {?}
         */
        RuntimeSelectorContext.prototype.getSelectorOptions = function (localOptions) { };
    }
    /**
     * @record
     */
    function SharedSelectorOptions() { }
    if (false) {
        /** @type {?|undefined} */
        SharedSelectorOptions.prototype.injectContainerState;
        /** @type {?|undefined} */
        SharedSelectorOptions.prototype.suppressErrors;
    }
    /**
     * @record
     */
    function SelectorMetaDataModel() { }
    if (false) {
        /** @type {?} */
        SelectorMetaDataModel.prototype.makeRootSelector;
        /** @type {?} */
        SelectorMetaDataModel.prototype.originalFn;
        /** @type {?} */
        SelectorMetaDataModel.prototype.containerClass;
        /** @type {?} */
        SelectorMetaDataModel.prototype.selectorName;
        /** @type {?} */
        SelectorMetaDataModel.prototype.getSelectorOptions;
    }
    /**
     * @record
     */
    function MappedStore() { }
    if (false) {
        /** @type {?} */
        MappedStore.prototype.name;
        /** @type {?} */
        MappedStore.prototype.isInitialised;
        /** @type {?} */
        MappedStore.prototype.actions;
        /** @type {?} */
        MappedStore.prototype.defaults;
        /** @type {?} */
        MappedStore.prototype.instance;
        /** @type {?} */
        MappedStore.prototype.path;
    }
    /**
     * @record
     */
    function StatesAndDefaults() { }
    if (false) {
        /** @type {?} */
        StatesAndDefaults.prototype.defaults;
        /** @type {?} */
        StatesAndDefaults.prototype.states;
    }
    /**
     * @record
     * @template T
     */
    function RootStateDiff() { }
    if (false) {
        /** @type {?} */
        RootStateDiff.prototype.currentAppState;
        /** @type {?} */
        RootStateDiff.prototype.newAppState;
    }
    /**
     * Ensures metadata is attached to the class and returns it.
     *
     * @ignore
     * @param {?} target
     * @return {?}
     */
    function ensureStoreMetadata(target) {
        if (!target.hasOwnProperty(META_KEY)) {
            /** @type {?} */
            var defaultMetadata_1 = {
                name: null,
                actions: {},
                defaults: {},
                path: null,
                makeRootSelector: /**
                 * @param {?} context
                 * @return {?}
                 */
                function (context) {
                    return context.getStateGetter(defaultMetadata_1.name);
                },
                children: []
            };
            Object.defineProperty(target, META_KEY, { value: defaultMetadata_1 });
        }
        return getStoreMetadata(target);
    }
    /**
     * Get the metadata attached to the state class if it exists.
     *
     * @ignore
     * @param {?} target
     * @return {?}
     */
    function getStoreMetadata(target) {
        return (/** @type {?} */ (target[META_KEY]));
    }
    /**
     * Ensures metadata is attached to the selector and returns it.
     *
     * @ignore
     * @param {?} target
     * @return {?}
     */
    function ensureSelectorMetadata(target) {
        if (!target.hasOwnProperty(SELECTOR_META_KEY)) {
            /** @type {?} */
            var defaultMetadata = {
                makeRootSelector: null,
                originalFn: null,
                containerClass: null,
                selectorName: null,
                getSelectorOptions: (/**
                 * @return {?}
                 */
                function () { return ({}); })
            };
            Object.defineProperty(target, SELECTOR_META_KEY, { value: defaultMetadata });
        }
        return getSelectorMetadata(target);
    }
    /**
     * Get the metadata attached to the selector if it exists.
     *
     * @ignore
     * @param {?} target
     * @return {?}
     */
    function getSelectorMetadata(target) {
        return target[SELECTOR_META_KEY];
    }
    /**
     * Get a deeply nested value. Example:
     *
     *    getValue({ foo: bar: [] }, 'foo.bar') //=> []
     *
     * Note: This is not as fast as the `fastPropGetter` but is strict Content Security Policy compliant.
     * See perf hit: https://jsperf.com/fast-value-getter-given-path/1
     *
     * @ignore
     * @param {?} paths
     * @return {?}
     */
    function compliantPropGetter(paths) {
        /** @type {?} */
        var copyOfPaths = paths.slice();
        return (/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) { return copyOfPaths.reduce((/**
         * @param {?} acc
         * @param {?} part
         * @return {?}
         */
        function (acc, part) { return acc && acc[part]; }), obj); });
    }
    /**
     * The generated function is faster than:
     * - pluck (Observable operator)
     * - memoize
     *
     * @ignore
     * @param {?} paths
     * @return {?}
     */
    function fastPropGetter(paths) {
        /** @type {?} */
        var segments = paths;
        /** @type {?} */
        var seg = 'store.' + segments[0];
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var l = segments.length;
        /** @type {?} */
        var expr = seg;
        while (++i < l) {
            expr = expr + ' && ' + (seg = seg + '.' + segments[i]);
        }
        /** @type {?} */
        var fn = new Function('store', 'return ' + expr + ';');
        return (/** @type {?} */ (fn));
    }
    /**
     * Get a deeply nested value. Example:
     *
     *    getValue({ foo: bar: [] }, 'foo.bar') //=> []
     *
     * @ignore
     * @param {?} paths
     * @param {?} config
     * @return {?}
     */
    function propGetter(paths, config) {
        if (config && config.compatibility && config.compatibility.strictContentSecurityPolicy) {
            return compliantPropGetter(paths);
        }
        else {
            return fastPropGetter(paths);
        }
    }
    /**
     * Given an array of states, it will return a object graph. Example:
     *    const states = [
     *      Cart,
     *      CartSaved,
     *      CartSavedItems
     *    ]
     *
     * would return:
     *
     *  const graph = {
     *    cart: ['saved'],
     *    saved: ['items'],
     *    items: []
     *  };
     *
     * @ignore
     * @param {?} stateClasses
     * @return {?}
     */
    function buildGraph(stateClasses) {
        /** @type {?} */
        var findName = (/**
         * @param {?} stateClass
         * @return {?}
         */
        function (stateClass) {
            /** @type {?} */
            var meta = stateClasses.find((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g === stateClass; }));
            if (!meta) {
                throw new Error("Child state not found: " + stateClass + ". \r\nYou may have forgotten to add states to module");
            }
            return (/** @type {?} */ ((/** @type {?} */ (meta[META_KEY])).name));
        });
        return stateClasses.reduce((/**
         * @param {?} result
         * @param {?} stateClass
         * @return {?}
         */
        function (result, stateClass) {
            var _a = (/** @type {?} */ (stateClass[META_KEY])), name = _a.name, children = _a.children;
            result[(/** @type {?} */ (name))] = (children || []).map(findName);
            return result;
        }), {});
    }
    /**
     * Given a states array, returns object graph
     * returning the name and state metadata. Example:
     *
     *  const graph = {
     *    cart: { metadata }
     *  };
     *
     * @ignore
     * @param {?} states
     * @return {?}
     */
    function nameToState(states) {
        return states.reduce((/**
         * @param {?} result
         * @param {?} stateClass
         * @return {?}
         */
        function (result, stateClass) {
            /** @type {?} */
            var meta = (/** @type {?} */ (stateClass[META_KEY]));
            result[(/** @type {?} */ (meta.name))] = stateClass;
            return result;
        }), {});
    }
    /**
     * Given a object relationship graph will return the full path
     * for the child items. Example:
     *
     *  const graph = {
     *    cart: ['saved'],
     *    saved: ['items'],
     *    items: []
     *  };
     *
     * would return:
     *
     *  const r = {
     *    cart: 'cart',
     *    saved: 'cart.saved',
     *    items: 'cart.saved.items'
     *  };
     *
     * @ignore
     * @param {?} obj
     * @param {?=} newObj
     * @return {?}
     */
    function findFullParentPath(obj, newObj) {
        if (newObj === void 0) { newObj = {}; }
        /** @type {?} */
        var visit = (/**
         * @param {?} child
         * @param {?} keyToFind
         * @return {?}
         */
        function (child, keyToFind) {
            for (var key in child) {
                if (child.hasOwnProperty(key) && child[key].indexOf(keyToFind) >= 0) {
                    /** @type {?} */
                    var parent_1 = visit(child, key);
                    return parent_1 !== null ? parent_1 + "." + key : key;
                }
            }
            return null;
        });
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                /** @type {?} */
                var parent_2 = visit(obj, key);
                newObj[key] = parent_2 ? parent_2 + "." + key : key;
            }
        }
        return newObj;
    }
    /**
     * Given a object graph, it will return the items topologically sorted Example:
     *
     *  const graph = {
     *    cart: ['saved'],
     *    saved: ['items'],
     *    items: []
     *  };
     *
     * would return:
     *
     *  const results = [
     *    'items',
     *    'saved',
     *    'cart'
     *  ];
     *
     * @ignore
     * @param {?} graph
     * @return {?}
     */
    function topologicalSort(graph) {
        /** @type {?} */
        var sorted = [];
        /** @type {?} */
        var visited = {};
        /** @type {?} */
        var visit = (/**
         * @param {?} name
         * @param {?=} ancestors
         * @return {?}
         */
        function (name, ancestors) {
            if (ancestors === void 0) { ancestors = []; }
            if (!Array.isArray(ancestors)) {
                ancestors = [];
            }
            ancestors.push(name);
            visited[name] = true;
            graph[name].forEach((/**
             * @param {?} dep
             * @return {?}
             */
            function (dep) {
                if (ancestors.indexOf(dep) >= 0) {
                    throw new Error("Circular dependency '" + dep + "' is required by '" + name + "': " + ancestors.join(' -> '));
                }
                if (visited[dep]) {
                    return;
                }
                visit(dep, ancestors.slice(0));
            }));
            if (sorted.indexOf(name) < 0) {
                sorted.push(name);
            }
        });
        Object.keys(graph).forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return visit(k); }));
        return sorted.reverse();
    }
    /**
     * Returns if the parameter is a object or not.
     *
     * @ignore
     * @param {?} obj
     * @return {?}
     */
    function isObject$1(obj) {
        return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
    }
    /**
     * @template T
     * @param {?} mappedStore
     * @param {?} diff
     * @return {?}
     */
    function getStateDiffChanges(mappedStore, diff) {
        /** @type {?} */
        var previousValue = getValue(diff.currentAppState, mappedStore.path);
        /** @type {?} */
        var currentValue = getValue(diff.newAppState, mappedStore.path);
        return new NgxsSimpleChange(previousValue, currentValue, !mappedStore.isInitialised);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T, E
     */
    function ActionCompletion() { }
    if (false) {
        /** @type {?} */
        ActionCompletion.prototype.action;
        /** @type {?} */
        ActionCompletion.prototype.result;
    }
    /**
     * RxJS operator for selecting out specific actions.
     *
     * This will grab actions that have just been dispatched as well as actions that have completed
     * @param {...?} allowedTypes
     * @return {?}
     */
    function ofAction() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return ofActionOperator(allowedTypes);
    }
    /**
     * RxJS operator for selecting out specific actions.
     *
     * This will ONLY grab actions that have just been dispatched
     * @param {...?} allowedTypes
     * @return {?}
     */
    function ofActionDispatched() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return ofActionOperator(allowedTypes, ["DISPATCHED" /* Dispatched */]);
    }
    /**
     * RxJS operator for selecting out specific actions.
     *
     * This will ONLY grab actions that have just been successfully completed
     * @param {...?} allowedTypes
     * @return {?}
     */
    function ofActionSuccessful() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return ofActionOperator(allowedTypes, ["SUCCESSFUL" /* Successful */]);
    }
    /**
     * RxJS operator for selecting out specific actions.
     *
     * This will ONLY grab actions that have just been canceled
     * @param {...?} allowedTypes
     * @return {?}
     */
    function ofActionCanceled() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return ofActionOperator(allowedTypes, ["CANCELED" /* Canceled */]);
    }
    /**
     * RxJS operator for selecting out specific actions.
     *
     * This will ONLY grab actions that have just been completed
     * @param {...?} allowedTypes
     * @return {?}
     */
    function ofActionCompleted() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        /** @type {?} */
        var allowedStatuses = [
            "SUCCESSFUL" /* Successful */,
            "CANCELED" /* Canceled */,
            "ERRORED" /* Errored */
        ];
        return ofActionOperator(allowedTypes, allowedStatuses, mapActionResult);
    }
    /**
     * RxJS operator for selecting out specific actions.
     *
     * This will ONLY grab actions that have just thrown an error
     * @param {...?} allowedTypes
     * @return {?}
     */
    function ofActionErrored() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return ofActionOperator(allowedTypes, ["ERRORED" /* Errored */]);
    }
    /**
     * @param {?} allowedTypes
     * @param {?=} statuses
     * @param {?=} mapOperator
     * @return {?}
     */
    function ofActionOperator(allowedTypes, statuses, 
    // This actually could've been `OperatorFunction<ActionContext, ActionCompletion | any>`,
    // since it maps either to `ctx.action` OR to `ActionCompletion`. But `ActionCompleteion | any`
    // defaults to `any`, thus there is no sense from union type.
    mapOperator) {
        if (mapOperator === void 0) { mapOperator = mapAction; }
        /** @type {?} */
        var allowedMap = createAllowedActionTypesMap(allowedTypes);
        /** @type {?} */
        var allowedStatusMap = statuses && createAllowedStatusesMap(statuses);
        return (/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            return o.pipe(filterStatus(allowedMap, allowedStatusMap), mapOperator());
        });
    }
    /**
     * @param {?} allowedTypes
     * @param {?=} allowedStatuses
     * @return {?}
     */
    function filterStatus(allowedTypes, allowedStatuses) {
        return operators.filter((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            /** @type {?} */
            var actionType = (/** @type {?} */ (getActionTypeFromInstance(ctx.action)));
            /** @type {?} */
            var typeMatch = allowedTypes[actionType];
            /** @type {?} */
            var statusMatch = allowedStatuses ? allowedStatuses[ctx.status] : true;
            return typeMatch && statusMatch;
        }));
    }
    /**
     * @return {?}
     */
    function mapActionResult() {
        return operators.map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var action = _a.action, status = _a.status, error = _a.error;
            return (/** @type {?} */ ({
                action: action,
                result: {
                    successful: "SUCCESSFUL" /* Successful */ === status,
                    canceled: "CANCELED" /* Canceled */ === status,
                    error: error
                }
            }));
        }));
    }
    /**
     * @template T
     * @return {?}
     */
    function mapAction() {
        return operators.map((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) { return (/** @type {?} */ (ctx.action)); }));
    }
    /**
     * @record
     */
    function FilterMap() { }
    /**
     * @param {?} types
     * @return {?}
     */
    function createAllowedActionTypesMap(types) {
        return types.reduce((/**
         * @param {?} filterMap
         * @param {?} klass
         * @return {?}
         */
        function (filterMap, klass) {
            filterMap[(/** @type {?} */ (getActionTypeFromInstance(klass)))] = true;
            return filterMap;
        }), (/** @type {?} */ ({})));
    }
    /**
     * @param {?} statuses
     * @return {?}
     */
    function createAllowedStatusesMap(statuses) {
        return statuses.reduce((/**
         * @param {?} filterMap
         * @param {?} status
         * @return {?}
         */
        function (filterMap, status) {
            filterMap[status] = true;
            return filterMap;
        }), (/** @type {?} */ ({})));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Returns operator that will run
     * `subscribe` outside of the ngxs execution context
     * @template T
     * @param {?} ngxsExecutionStrategy
     * @return {?}
     */
    function leaveNgxs(ngxsExecutionStrategy) {
        return (/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            return new rxjs.Observable((/**
             * @param {?} sink
             * @return {?}
             */
            function (sink) {
                return source.subscribe({
                    next: /**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        ngxsExecutionStrategy.leave((/**
                         * @return {?}
                         */
                        function () { return sink.next(value); }));
                    },
                    error: /**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) {
                        ngxsExecutionStrategy.leave((/**
                         * @return {?}
                         */
                        function () { return sink.error(error); }));
                    },
                    complete: /**
                     * @return {?}
                     */
                    function () {
                        ngxsExecutionStrategy.leave((/**
                         * @return {?}
                         */
                        function () { return sink.complete(); }));
                    }
                });
            }));
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InternalNgxsExecutionStrategy = /** @class */ (function () {
        function InternalNgxsExecutionStrategy(_executionStrategy) {
            this._executionStrategy = _executionStrategy;
        }
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        InternalNgxsExecutionStrategy.prototype.enter = /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            return this._executionStrategy.enter(func);
        };
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        InternalNgxsExecutionStrategy.prototype.leave = /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            return this._executionStrategy.leave(func);
        };
        InternalNgxsExecutionStrategy.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        InternalNgxsExecutionStrategy.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [NGXS_EXECUTION_STRATEGY,] }] }
        ]; };
        return InternalNgxsExecutionStrategy;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        InternalNgxsExecutionStrategy.prototype._executionStrategy;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ActionStatus = {
        Dispatched: 'DISPATCHED',
        Successful: 'SUCCESSFUL',
        Canceled: 'CANCELED',
        Errored: 'ERRORED',
    };
    /**
     * @record
     * @template T
     */
    function ActionContext() { }
    if (false) {
        /** @type {?} */
        ActionContext.prototype.status;
        /** @type {?} */
        ActionContext.prototype.action;
        /** @type {?|undefined} */
        ActionContext.prototype.error;
    }
    /**
     * Custom Subject that ensures that subscribers are notified of values in the order that they arrived.
     * A standard Subject does not have this guarantee.
     * For example, given the following code:
     * ```typescript
     *   const subject = new Subject<string>();
     * subject.subscribe(value => {
     * if (value === 'start') subject.next('end');
     * });
     * subject.subscribe(value => { });
     * subject.next('start');
     * ```
     * When `subject` is a standard `Subject<T>` the second subscriber would recieve `end` and then `start`.
     * When `subject` is a `OrderedSubject<T>` the second subscriber would recieve `start` and then `end`.
     * @template T
     */
    var   /**
     * Custom Subject that ensures that subscribers are notified of values in the order that they arrived.
     * A standard Subject does not have this guarantee.
     * For example, given the following code:
     * ```typescript
     *   const subject = new Subject<string>();
     * subject.subscribe(value => {
     * if (value === 'start') subject.next('end');
     * });
     * subject.subscribe(value => { });
     * subject.next('start');
     * ```
     * When `subject` is a standard `Subject<T>` the second subscriber would recieve `end` and then `start`.
     * When `subject` is a `OrderedSubject<T>` the second subscriber would recieve `start` and then `end`.
     * @template T
     */
    OrderedSubject = /** @class */ (function (_super) {
        __extends(OrderedSubject, _super);
        function OrderedSubject() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._itemQueue = [];
            _this._busyPushingNext = false;
            return _this;
        }
        /**
         * @param {?=} value
         * @return {?}
         */
        OrderedSubject.prototype.next = /**
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            if (this._busyPushingNext) {
                this._itemQueue.unshift((/** @type {?} */ (value)));
                return;
            }
            this._busyPushingNext = true;
            _super.prototype.next.call(this, value);
            while (this._itemQueue.length > 0) {
                /** @type {?} */
                var nextValue = this._itemQueue.pop();
                _super.prototype.next.call(this, nextValue);
            }
            this._busyPushingNext = false;
        };
        return OrderedSubject;
    }(rxjs.Subject));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        OrderedSubject.prototype._itemQueue;
        /**
         * @type {?}
         * @private
         */
        OrderedSubject.prototype._busyPushingNext;
    }
    /**
     * Internal Action stream that is emitted anytime an action is dispatched.
     */
    var InternalActions = /** @class */ (function (_super) {
        __extends(InternalActions, _super);
        function InternalActions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InternalActions.decorators = [
            { type: core.Injectable }
        ];
        return InternalActions;
    }(OrderedSubject));
    /**
     * Action stream that is emitted anytime an action is dispatched.
     *
     * You can listen to this in services to react without stores.
     */
    var Actions = /** @class */ (function (_super) {
        __extends(Actions, _super);
        // This has to be `Observable<ActionContext>` in the v4. Because `InternalActions`
        // is a `Subject<ActionContext>`. Leave it as `any` to avoid breaking changes
        function Actions(internalActions$, internalExecutionStrategy) {
            return _super.call(this, (/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /** @type {?} */
                var childSubscription = internalActions$
                    .pipe(leaveNgxs(internalExecutionStrategy))
                    .subscribe({
                    next: (/**
                     * @param {?} ctx
                     * @return {?}
                     */
                    function (ctx) { return observer.next(ctx); }),
                    error: (/**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) { return observer.error(error); }),
                    complete: (/**
                     * @return {?}
                     */
                    function () { return observer.complete(); })
                });
                observer.add(childSubscription);
            })) || this;
        }
        Actions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Actions.ctorParameters = function () { return [
            { type: InternalActions },
            { type: InternalNgxsExecutionStrategy }
        ]; };
        return Actions;
    }(rxjs.Observable));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Composes a array of functions from left to right. Example:
     *
     *      compose([fn, final])(state, action);
     *
     * then the funcs have a signature like:
     *
     *      function fn (state, action, next) {
     *          console.log('here', state, action, next);
     *          return next(state, action);
     *      }
     *
     *      function final (state, action) {
     *          console.log('here', state, action);
     *          return state;
     *      }
     *
     * the last function should not call `next`.
     *
     * @ignore
     * @type {?}
     */
    var compose = (/**
     * @param {?} funcs
     * @return {?}
     */
    function (funcs) { return (/**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var curr = (/** @type {?} */ (funcs.shift()));
        return curr.apply(void 0, __spread(args, [(/**
             * @param {...?} nextArgs
             * @return {?}
             */
            function () {
                var nextArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    nextArgs[_i] = arguments[_i];
                }
                return compose(funcs).apply(void 0, __spread(nextArgs));
            })]));
    }); });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * BehaviorSubject of the entire state.
     * @ignore
     */
    var StateStream = /** @class */ (function (_super) {
        __extends(StateStream, _super);
        function StateStream() {
            return _super.call(this, {}) || this;
        }
        StateStream.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        StateStream.ctorParameters = function () { return []; };
        return StateStream;
    }(rxjs.BehaviorSubject));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PluginManager = /** @class */ (function () {
        function PluginManager(_parentManager, _pluginHandlers) {
            this._parentManager = _parentManager;
            this._pluginHandlers = _pluginHandlers;
            this.plugins = [];
            this.registerHandlers();
        }
        Object.defineProperty(PluginManager.prototype, "rootPlugins", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return (this._parentManager && this._parentManager.plugins) || this.plugins;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @return {?}
         */
        PluginManager.prototype.registerHandlers = /**
         * @private
         * @return {?}
         */
        function () {
            var _a;
            /** @type {?} */
            var pluginHandlers = this.getPluginHandlers();
            (_a = this.rootPlugins).push.apply(_a, __spread(pluginHandlers));
        };
        /**
         * @private
         * @return {?}
         */
        PluginManager.prototype.getPluginHandlers = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var handlers = this._pluginHandlers || [];
            return handlers.map((/**
             * @param {?} plugin
             * @return {?}
             */
            function (plugin) { return (/** @type {?} */ ((plugin.handle ? plugin.handle.bind(plugin) : plugin))); }));
        };
        PluginManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PluginManager.ctorParameters = function () { return [
            { type: PluginManager, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: Array, decorators: [{ type: core.Inject, args: [NGXS_PLUGINS,] }, { type: core.Optional }] }
        ]; };
        return PluginManager;
    }());
    if (false) {
        /** @type {?} */
        PluginManager.prototype.plugins;
        /**
         * @type {?}
         * @private
         */
        PluginManager.prototype._parentManager;
        /**
         * @type {?}
         * @private
         */
        PluginManager.prototype._pluginHandlers;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Internal Action result stream that is emitted when an action is completed.
     * This is used as a method of returning the action result to the dispatcher
     * for the observable returned by the dispatch(...) call.
     * The dispatcher then asynchronously pushes the result from this stream onto the main action stream as a result.
     */
    var InternalDispatchedActionResults = /** @class */ (function (_super) {
        __extends(InternalDispatchedActionResults, _super);
        function InternalDispatchedActionResults() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InternalDispatchedActionResults.decorators = [
            { type: core.Injectable }
        ];
        return InternalDispatchedActionResults;
    }(rxjs.Subject));
    var InternalDispatcher = /** @class */ (function () {
        function InternalDispatcher(_injector, _actions, _actionResults, _pluginManager, _stateStream, _ngxsExecutionStrategy) {
            this._injector = _injector;
            this._actions = _actions;
            this._actionResults = _actionResults;
            this._pluginManager = _pluginManager;
            this._stateStream = _stateStream;
            this._ngxsExecutionStrategy = _ngxsExecutionStrategy;
        }
        /**
         * Dispatches event(s).
         */
        /**
         * Dispatches event(s).
         * @param {?} actionOrActions
         * @return {?}
         */
        InternalDispatcher.prototype.dispatch = /**
         * Dispatches event(s).
         * @param {?} actionOrActions
         * @return {?}
         */
        function (actionOrActions) {
            var _this = this;
            /** @type {?} */
            var result = this._ngxsExecutionStrategy.enter((/**
             * @return {?}
             */
            function () {
                return _this.dispatchByEvents(actionOrActions);
            }));
            result.subscribe({
                error: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    return _this._ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    function () {
                        try {
                            // Retrieve lazily to avoid cyclic dependency exception
                            _this._errorHandler = _this._errorHandler || _this._injector.get(core.ErrorHandler);
                            _this._errorHandler.handleError(error);
                        }
                        catch (_a) { }
                    }));
                })
            });
            return result.pipe(leaveNgxs(this._ngxsExecutionStrategy));
        };
        /**
         * @private
         * @param {?} actionOrActions
         * @return {?}
         */
        InternalDispatcher.prototype.dispatchByEvents = /**
         * @private
         * @param {?} actionOrActions
         * @return {?}
         */
        function (actionOrActions) {
            var _this = this;
            if (Array.isArray(actionOrActions)) {
                if (actionOrActions.length === 0)
                    return rxjs.of(this._stateStream.getValue());
                return rxjs.forkJoin(actionOrActions.map((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) { return _this.dispatchSingle(action); })));
            }
            else {
                return this.dispatchSingle(actionOrActions);
            }
        };
        /**
         * @private
         * @param {?} action
         * @return {?}
         */
        InternalDispatcher.prototype.dispatchSingle = /**
         * @private
         * @param {?} action
         * @return {?}
         */
        function (action) {
            var _this = this;
            /** @type {?} */
            var type = getActionTypeFromInstance(action);
            if (!type) {
                /** @type {?} */
                var error = new Error("This action doesn't have a type property: " + action.constructor.name);
                return rxjs.throwError(error);
            }
            /** @type {?} */
            var prevState = this._stateStream.getValue();
            /** @type {?} */
            var plugins = this._pluginManager.plugins;
            return ((/** @type {?} */ (compose(__spread(plugins, [
                (/**
                 * @param {?} nextState
                 * @param {?} nextAction
                 * @return {?}
                 */
                function (nextState, nextAction) {
                    if (nextState !== prevState) {
                        _this._stateStream.next(nextState);
                    }
                    /** @type {?} */
                    var actionResult$ = _this.getActionResultStream(nextAction);
                    actionResult$.subscribe((/**
                     * @param {?} ctx
                     * @return {?}
                     */
                    function (ctx) { return _this._actions.next(ctx); }));
                    _this._actions.next({ action: nextAction, status: "DISPATCHED" /* Dispatched */ });
                    return _this.createDispatchObservable(actionResult$);
                })
            ]))(prevState, action)))).pipe(operators.shareReplay());
        };
        /**
         * @private
         * @param {?} action
         * @return {?}
         */
        InternalDispatcher.prototype.getActionResultStream = /**
         * @private
         * @param {?} action
         * @return {?}
         */
        function (action) {
            return this._actionResults.pipe(operators.filter((/**
             * @param {?} ctx
             * @return {?}
             */
            function (ctx) { return ctx.action === action && ctx.status !== "DISPATCHED" /* Dispatched */; })), operators.take(1), operators.shareReplay());
        };
        /**
         * @private
         * @param {?} actionResult$
         * @return {?}
         */
        InternalDispatcher.prototype.createDispatchObservable = /**
         * @private
         * @param {?} actionResult$
         * @return {?}
         */
        function (actionResult$) {
            var _this = this;
            return actionResult$
                .pipe(operators.exhaustMap((/**
             * @param {?} ctx
             * @return {?}
             */
            function (ctx) {
                switch (ctx.status) {
                    case "SUCCESSFUL" /* Successful */:
                        return rxjs.of(_this._stateStream.getValue());
                    case "ERRORED" /* Errored */:
                        return rxjs.throwError(ctx.error);
                    default:
                        return rxjs.EMPTY;
                }
            })))
                .pipe(operators.shareReplay());
        };
        InternalDispatcher.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        InternalDispatcher.ctorParameters = function () { return [
            { type: core.Injector },
            { type: InternalActions },
            { type: InternalDispatchedActionResults },
            { type: PluginManager },
            { type: StateStream },
            { type: InternalNgxsExecutionStrategy }
        ]; };
        return InternalDispatcher;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._errorHandler;
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._injector;
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._actions;
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._actionResults;
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._pluginManager;
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._stateStream;
        /**
         * @type {?}
         * @private
         */
        InternalDispatcher.prototype._ngxsExecutionStrategy;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Object freeze code
     * https://github.com/jsdf/deep-freeze
     * @type {?}
     */
    var deepFreeze = (/**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        Object.freeze(o);
        /** @type {?} */
        var oIsFunction = typeof o === 'function';
        /** @type {?} */
        var hasOwnProp = Object.prototype.hasOwnProperty;
        Object.getOwnPropertyNames(o).forEach((/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            if (hasOwnProp.call(o, prop) &&
                (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
                o[prop] !== null &&
                (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
                !Object.isFrozen(o[prop])) {
                deepFreeze(o[prop]);
            }
        }));
        return o;
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HostEnvironment = /** @class */ (function () {
        function HostEnvironment(isDevMode, isTestMode) {
            this.isDevMode = isDevMode;
            this.isTestMode = isTestMode;
        }
        HostEnvironment.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HostEnvironment.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [NG_DEV_MODE,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [NG_TEST_MODE,] }] }
        ]; };
        return HostEnvironment;
    }());
    if (false) {
        /** @type {?} */
        HostEnvironment.prototype.isDevMode;
        /** @type {?} */
        HostEnvironment.prototype.isTestMode;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ConfigValidator = /** @class */ (function () {
        function ConfigValidator(_host, _config) {
            this._host = _host;
            this._config = _config;
        }
        Object.defineProperty(ConfigValidator.prototype, "isIncorrectProduction", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return !this._host.isDevMode() && this._config.developmentMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigValidator.prototype, "isIncorrectDevelopment", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this._host.isDevMode() && !this._config.developmentMode;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ConfigValidator.prototype.verifyDevMode = /**
         * @return {?}
         */
        function () {
            if (this._host.isTestMode()) {
                return;
            }
            if (this.isIncorrectProduction) {
                console.warn(CONFIG_MESSAGES[VALIDATION_CODE.INCORRECT_PRODUCTION]());
            }
            else if (this.isIncorrectDevelopment) {
                console.warn(CONFIG_MESSAGES[VALIDATION_CODE.INCORRECT_DEVELOPMENT]());
            }
        };
        ConfigValidator.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigValidator.ctorParameters = function () { return [
            { type: HostEnvironment },
            { type: NgxsConfig }
        ]; };
        return ConfigValidator;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ConfigValidator.prototype._host;
        /**
         * @type {?}
         * @private
         */
        ConfigValidator.prototype._config;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * State Context factory class
     * @ignore
     */
    var InternalStateOperations = /** @class */ (function () {
        function InternalStateOperations(_stateStream, _dispatcher, _config, configValidator) {
            this._stateStream = _stateStream;
            this._dispatcher = _dispatcher;
            this._config = _config;
            configValidator.verifyDevMode();
        }
        /**
         * Returns the root state operators.
         */
        /**
         * Returns the root state operators.
         * @return {?}
         */
        InternalStateOperations.prototype.getRootStateOperations = /**
         * Returns the root state operators.
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var rootStateOperations = {
                getState: (/**
                 * @return {?}
                 */
                function () { return _this._stateStream.getValue(); }),
                setState: (/**
                 * @param {?} newState
                 * @return {?}
                 */
                function (newState) { return _this._stateStream.next(newState); }),
                dispatch: (/**
                 * @param {?} actionOrActions
                 * @return {?}
                 */
                function (actionOrActions) { return _this._dispatcher.dispatch(actionOrActions); })
            };
            if (this._config.developmentMode) {
                return this.ensureStateAndActionsAreImmutable(rootStateOperations);
            }
            return rootStateOperations;
        };
        /**
         * @private
         * @param {?} root
         * @return {?}
         */
        InternalStateOperations.prototype.ensureStateAndActionsAreImmutable = /**
         * @private
         * @param {?} root
         * @return {?}
         */
        function (root) {
            return {
                getState: (/**
                 * @return {?}
                 */
                function () { return root.getState(); }),
                setState: (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    /** @type {?} */
                    var frozenValue = deepFreeze(value);
                    return root.setState(frozenValue);
                }),
                dispatch: (/**
                 * @param {?} actions
                 * @return {?}
                 */
                function (actions) {
                    return root.dispatch(actions);
                })
            };
        };
        /**
         * @param {?} results
         * @return {?}
         */
        InternalStateOperations.prototype.setStateToTheCurrentWithNew = /**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var stateOperations = this.getRootStateOperations();
            // Get our current stream
            /** @type {?} */
            var currentState = stateOperations.getState();
            // Set the state to the current + new
            stateOperations.setState(__assign({}, currentState, results.defaults));
        };
        InternalStateOperations.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        InternalStateOperations.ctorParameters = function () { return [
            { type: StateStream },
            { type: InternalDispatcher },
            { type: NgxsConfig },
            { type: ConfigValidator }
        ]; };
        return InternalStateOperations;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        InternalStateOperations.prototype._stateStream;
        /**
         * @type {?}
         * @private
         */
        InternalStateOperations.prototype._dispatcher;
        /**
         * @type {?}
         * @private
         */
        InternalStateOperations.prototype._config;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @param {?} val
     * @return {?}
     */
    function simplePatch(val) {
        return (/**
         * @param {?} existingState
         * @return {?}
         */
        function (existingState) {
            if (Array.isArray(val)) {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.PATCHING_ARRAY]());
            }
            else if (typeof val !== 'object') {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.PATCHING_PRIMITIVE]());
            }
            /** @type {?} */
            var newState = __assign({}, ((/** @type {?} */ (existingState))));
            for (var key in val) {
                // deep clone for patch compatibility
                // noinspection JSUnfilteredForInLoop (IDE)
                newState[key] = ((/** @type {?} */ (val)))[key];
            }
            return (/** @type {?} */ (newState));
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * State Context factory class
     * @ignore
     */
    var StateContextFactory = /** @class */ (function () {
        function StateContextFactory(_internalStateOperations) {
            this._internalStateOperations = _internalStateOperations;
        }
        /**
         * Create the state context
         */
        /**
         * Create the state context
         * @template T
         * @param {?} mappedStore
         * @return {?}
         */
        StateContextFactory.prototype.createStateContext = /**
         * Create the state context
         * @template T
         * @param {?} mappedStore
         * @return {?}
         */
        function (mappedStore) {
            /** @type {?} */
            var root = this._internalStateOperations.getRootStateOperations();
            /**
             * @param {?} currentAppState
             * @return {?}
             */
            function getState(currentAppState) {
                return getValue(currentAppState, mappedStore.path);
            }
            /**
             * @param {?} currentAppState
             * @param {?} newValue
             * @return {?}
             */
            function setStateValue(currentAppState, newValue) {
                /** @type {?} */
                var newAppState = setValue(currentAppState, mappedStore.path, newValue);
                /** @type {?} */
                var instance = mappedStore.instance;
                if (instance.ngxsOnChanges) {
                    /** @type {?} */
                    var change = getStateDiffChanges(mappedStore, {
                        currentAppState: currentAppState,
                        newAppState: newAppState
                    });
                    instance.ngxsOnChanges(change);
                }
                root.setState(newAppState);
                return newAppState;
                // In doing this refactoring I noticed that there is a 'bug' where the
                // application state is returned instead of this state slice.
                // This has worked this way since the beginning see:
                // https://github.com/ngxs/store/blame/324c667b4b7debd8eb979006c67ca0ae347d88cd/src/state-factory.ts
                // This needs to be fixed, but is a 'breaking' change.
                // I will do this fix in a subsequent PR and we can decide how to handle it.
            }
            /**
             * @param {?} currentAppState
             * @param {?} stateOperator
             * @return {?}
             */
            function setStateFromOperator(currentAppState, stateOperator) {
                /** @type {?} */
                var local = getState(currentAppState);
                /** @type {?} */
                var newValue = stateOperator(local);
                return setStateValue(currentAppState, newValue);
            }
            /**
             * @param {?} value
             * @return {?}
             */
            function isStateOperator(value) {
                return typeof value === 'function';
            }
            return {
                getState: /**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var currentAppState = root.getState();
                    return getState(currentAppState);
                },
                patchState: /**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) {
                    /** @type {?} */
                    var currentAppState = root.getState();
                    /** @type {?} */
                    var patchOperator = simplePatch(val);
                    return setStateFromOperator(currentAppState, patchOperator);
                },
                setState: /**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) {
                    /** @type {?} */
                    var currentAppState = root.getState();
                    return isStateOperator(val)
                        ? setStateFromOperator(currentAppState, val)
                        : setStateValue(currentAppState, val);
                },
                dispatch: /**
                 * @param {?} actions
                 * @return {?}
                 */
                function (actions) {
                    return root.dispatch(actions);
                }
            };
        };
        StateContextFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        StateContextFactory.ctorParameters = function () { return [
            { type: InternalStateOperations }
        ]; };
        return StateContextFactory;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        StateContextFactory.prototype._internalStateOperations;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var StoreValidators = /** @class */ (function () {
        function StoreValidators() {
        }
        /**
         * @param {?} name
         * @return {?}
         */
        StoreValidators.stateNameErrorMessage = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return CONFIG_MESSAGES[VALIDATION_CODE.STATE_NAME](name);
        };
        /**
         * @param {?} name
         * @return {?}
         */
        StoreValidators.checkCorrectStateName = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (!name) {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.STATE_NAME_PROPERTY]());
            }
            if (!this.stateNameRegex.test(name)) {
                throw new Error(this.stateNameErrorMessage(name));
            }
        };
        /**
         * @param {?} state
         * @param {?} statesByName
         * @return {?}
         */
        StoreValidators.checkStateNameIsUnique = /**
         * @param {?} state
         * @param {?} statesByName
         * @return {?}
         */
        function (state, statesByName) {
            /** @type {?} */
            var meta = this.getValidStateMeta(state);
            /** @type {?} */
            var stateName = (/** @type {?} */ ((/** @type {?} */ (meta)).name));
            /** @type {?} */
            var existingState = statesByName[stateName];
            if (existingState && existingState !== state) {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.STATE_UNIQUE](stateName, state.name, existingState.name));
            }
            return stateName;
        };
        /**
         * @param {?} state
         * @return {?}
         */
        StoreValidators.getValidStateMeta = /**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var meta = getStoreMetadata(state);
            if (!meta) {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.STATE_DECORATOR]());
            }
            return meta;
        };
        StoreValidators.stateNameRegex = new RegExp('^[a-zA-Z0-9_]+$');
        return StoreValidators;
    }());
    if (false) {
        /** @type {?} */
        StoreValidators.stateNameRegex;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * State factory class
     * @ignore
     */
    var StateFactory = /** @class */ (function () {
        function StateFactory(_injector, _config, _parentFactory, _actions, _actionResults, _stateContextFactory, _initialState) {
            var _this = this;
            this._injector = _injector;
            this._config = _config;
            this._parentFactory = _parentFactory;
            this._actions = _actions;
            this._actionResults = _actionResults;
            this._stateContextFactory = _stateContextFactory;
            this._initialState = _initialState;
            this._actionsSubscription = null;
            this._states = [];
            this._statesByName = {};
            this._statePaths = {};
            this.getRuntimeSelectorContext = internals.memoize((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var stateFactory = _this;
                /**
                 * @param {?} key
                 * @return {?}
                 */
                function resolveGetter(key) {
                    /** @type {?} */
                    var path = stateFactory.statePaths[key];
                    return path ? propGetter(path.split('.'), stateFactory._config) : null;
                }
                /** @type {?} */
                var context = _this._parentFactory
                    ? _this._parentFactory.getRuntimeSelectorContext()
                    : {
                        getStateGetter: /**
                         * @param {?} key
                         * @return {?}
                         */
                        function (key) {
                            /** @type {?} */
                            var getter = resolveGetter(key);
                            if (getter) {
                                return getter;
                            }
                            return (/**
                             * @param {...?} args
                             * @return {?}
                             */
                            function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                // Late loaded getter
                                if (!getter) {
                                    getter = resolveGetter(key);
                                }
                                return getter ? getter.apply(void 0, __spread(args)) : undefined;
                            });
                        },
                        getSelectorOptions: /**
                         * @param {?=} localOptions
                         * @return {?}
                         */
                        function (localOptions) {
                            /** @type {?} */
                            var globalSelectorOptions = stateFactory._config.selectorOptions;
                            return __assign({}, globalSelectorOptions, (localOptions || {}));
                        }
                    };
                return context;
            }));
        }
        Object.defineProperty(StateFactory.prototype, "states", {
            get: /**
             * @return {?}
             */
            function () {
                return this._parentFactory ? this._parentFactory.states : this._states;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StateFactory.prototype, "statesByName", {
            get: /**
             * @return {?}
             */
            function () {
                return this._parentFactory ? this._parentFactory.statesByName : this._statesByName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StateFactory.prototype, "statePaths", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this._parentFactory ? this._parentFactory.statePaths : this._statePaths;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} defaults
         * @return {?}
         */
        StateFactory.cloneDefaults = /**
         * @private
         * @param {?} defaults
         * @return {?}
         */
        function (defaults) {
            /** @type {?} */
            var value = {};
            if (Array.isArray(defaults)) {
                value = defaults.slice();
            }
            else if (isObject$1(defaults)) {
                value = __assign({}, defaults);
            }
            else if (defaults === undefined) {
                value = {};
            }
            else {
                value = defaults;
            }
            return value;
        };
        /**
         * @private
         * @param {?} stateClasses
         * @return {?}
         */
        StateFactory.checkStatesAreValid = /**
         * @private
         * @param {?} stateClasses
         * @return {?}
         */
        function (stateClasses) {
            stateClasses.forEach(StoreValidators.getValidStateMeta);
        };
        /**
         * @return {?}
         */
        StateFactory.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            // I'm using non-null assertion here since `_actionsSubscrition` will
            // be 100% defined. This is because `ngOnDestroy()` cannot be invoked
            // on the `StateFactory` until its initialized :) An it's initialized
            // for the first time along with the `NgxsRootModule`.
            (/** @type {?} */ (this._actionsSubscription)).unsubscribe();
        };
        /**
         * Add a new state to the global defs.
         */
        /**
         * Add a new state to the global defs.
         * @param {?} stateClasses
         * @return {?}
         */
        StateFactory.prototype.add = /**
         * Add a new state to the global defs.
         * @param {?} stateClasses
         * @return {?}
         */
        function (stateClasses) {
            var e_1, _a;
            StateFactory.checkStatesAreValid(stateClasses);
            var newStates = this.addToStatesMap(stateClasses).newStates;
            if (!newStates.length)
                return [];
            /** @type {?} */
            var stateGraph = buildGraph(newStates);
            /** @type {?} */
            var sortedStates = topologicalSort(stateGraph);
            /** @type {?} */
            var paths = findFullParentPath(stateGraph);
            /** @type {?} */
            var nameGraph = nameToState(newStates);
            /** @type {?} */
            var bootstrappedStores = [];
            try {
                for (var sortedStates_1 = __values(sortedStates), sortedStates_1_1 = sortedStates_1.next(); !sortedStates_1_1.done; sortedStates_1_1 = sortedStates_1.next()) {
                    var name_1 = sortedStates_1_1.value;
                    /** @type {?} */
                    var stateClass = nameGraph[name_1];
                    /** @type {?} */
                    var path = paths[name_1];
                    /** @type {?} */
                    var meta = (/** @type {?} */ (stateClass[META_KEY]));
                    this.addRuntimeInfoToMeta(meta, path);
                    /** @type {?} */
                    var stateMap = {
                        name: name_1,
                        path: path,
                        isInitialised: false,
                        actions: meta.actions,
                        instance: this._injector.get(stateClass),
                        defaults: StateFactory.cloneDefaults(meta.defaults)
                    };
                    // ensure our store hasn't already been added
                    // but don't throw since it could be lazy
                    // loaded from different paths
                    if (!this.hasBeenMountedAndBootstrapped(name_1, path)) {
                        bootstrappedStores.push(stateMap);
                    }
                    this.states.push(stateMap);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (sortedStates_1_1 && !sortedStates_1_1.done && (_a = sortedStates_1.return)) _a.call(sortedStates_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return bootstrappedStores;
        };
        /**
         * Add a set of states to the store and return the defaults
         */
        /**
         * Add a set of states to the store and return the defaults
         * @param {?} stateClasses
         * @return {?}
         */
        StateFactory.prototype.addAndReturnDefaults = /**
         * Add a set of states to the store and return the defaults
         * @param {?} stateClasses
         * @return {?}
         */
        function (stateClasses) {
            /** @type {?} */
            var classes = stateClasses || [];
            /** @type {?} */
            var mappedStores = this.add(classes);
            /** @type {?} */
            var defaults = mappedStores.reduce((/**
             * @param {?} result
             * @param {?} mappedStore
             * @return {?}
             */
            function (result, mappedStore) {
                return setValue(result, mappedStore.path, mappedStore.defaults);
            }), {});
            return { defaults: defaults, states: mappedStores };
        };
        /**
         * Bind the actions to the handlers
         */
        /**
         * Bind the actions to the handlers
         * @return {?}
         */
        StateFactory.prototype.connectActionHandlers = /**
         * Bind the actions to the handlers
         * @return {?}
         */
        function () {
            var _this = this;
            if (this._actionsSubscription !== null)
                return;
            this._actionsSubscription = this._actions
                .pipe(operators.filter((/**
             * @param {?} ctx
             * @return {?}
             */
            function (ctx) { return ctx.status === "DISPATCHED" /* Dispatched */; })), operators.mergeMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var action = _a.action;
                return _this.invokeActions(_this._actions, (/** @type {?} */ (action))).pipe(operators.map((/**
                 * @return {?}
                 */
                function () { return (/** @type {?} */ ({ action: action, status: "SUCCESSFUL" /* Successful */ })); })), operators.defaultIfEmpty((/** @type {?} */ ({ action: action, status: "CANCELED" /* Canceled */ }))), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    return rxjs.of((/** @type {?} */ ({ action: action, status: "ERRORED" /* Errored */, error: error })));
                })));
            })))
                .subscribe((/**
             * @param {?} ctx
             * @return {?}
             */
            function (ctx) { return _this._actionResults.next(ctx); }));
        };
        /**
         * Invoke actions on the states.
         */
        /**
         * Invoke actions on the states.
         * @param {?} actions$
         * @param {?} action
         * @return {?}
         */
        StateFactory.prototype.invokeActions = /**
         * Invoke actions on the states.
         * @param {?} actions$
         * @param {?} action
         * @return {?}
         */
        function (actions$, action) {
            var e_2, _a, e_3, _b;
            /** @type {?} */
            var type = (/** @type {?} */ (getActionTypeFromInstance(action)));
            /** @type {?} */
            var results = [];
            try {
                for (var _c = __values(this.states), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var metadata = _d.value;
                    /** @type {?} */
                    var actionMetas = metadata.actions[type];
                    if (actionMetas) {
                        try {
                            for (var actionMetas_1 = __values(actionMetas), actionMetas_1_1 = actionMetas_1.next(); !actionMetas_1_1.done; actionMetas_1_1 = actionMetas_1.next()) {
                                var actionMeta = actionMetas_1_1.value;
                                /** @type {?} */
                                var stateContext = this._stateContextFactory.createStateContext(metadata);
                                try {
                                    /** @type {?} */
                                    var result = metadata.instance[actionMeta.fn](stateContext, action);
                                    if (result instanceof Promise) {
                                        result = rxjs.from(result);
                                    }
                                    if (result instanceof rxjs.Observable) {
                                        // If this observable has been completed w/o emitting
                                        // any value then we wouldn't want to complete the whole chain
                                        // of actions. Since if any observable completes then
                                        // action will be canceled.
                                        // For instance if any action handler would've had such statement:
                                        // `handler(ctx) { return EMPTY; }`
                                        // then the action will be canceled.
                                        // See https://github.com/ngxs/store/issues/1568
                                        result = result.pipe(operators.defaultIfEmpty({}));
                                        if (actionMeta.options.cancelUncompleted) {
                                            // todo: ofActionDispatched should be used with action class
                                            result = result.pipe(operators.takeUntil(actions$.pipe(ofActionDispatched((/** @type {?} */ (action))))));
                                        }
                                    }
                                    else {
                                        result = rxjs.of({}).pipe(operators.shareReplay());
                                    }
                                    results.push(result);
                                }
                                catch (e) {
                                    results.push(rxjs.throwError(e));
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (actionMetas_1_1 && !actionMetas_1_1.done && (_b = actionMetas_1.return)) _b.call(actionMetas_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (!results.length) {
                results.push(rxjs.of({}));
            }
            return rxjs.forkJoin(results);
        };
        /**
         * @private
         * @param {?} stateClasses
         * @return {?}
         */
        StateFactory.prototype.addToStatesMap = /**
         * @private
         * @param {?} stateClasses
         * @return {?}
         */
        function (stateClasses) {
            var e_4, _a;
            /** @type {?} */
            var newStates = [];
            /** @type {?} */
            var statesMap = this.statesByName;
            try {
                for (var stateClasses_1 = __values(stateClasses), stateClasses_1_1 = stateClasses_1.next(); !stateClasses_1_1.done; stateClasses_1_1 = stateClasses_1.next()) {
                    var stateClass = stateClasses_1_1.value;
                    /** @type {?} */
                    var stateName = StoreValidators.checkStateNameIsUnique(stateClass, statesMap);
                    /** @type {?} */
                    var unmountedState = !statesMap[stateName];
                    if (unmountedState) {
                        newStates.push(stateClass);
                        statesMap[stateName] = stateClass;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (stateClasses_1_1 && !stateClasses_1_1.done && (_a = stateClasses_1.return)) _a.call(stateClasses_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return { newStates: newStates };
        };
        /**
         * @private
         * @param {?} meta
         * @param {?} path
         * @return {?}
         */
        StateFactory.prototype.addRuntimeInfoToMeta = /**
         * @private
         * @param {?} meta
         * @param {?} path
         * @return {?}
         */
        function (meta, path) {
            this.statePaths[(/** @type {?} */ (meta.name))] = path;
            // TODO: v4 - we plan to get rid of the path property because it is non-deterministic
            // we can do this when we get rid of the incorrectly exposed getStoreMetadata
            // We will need to come up with an alternative in v4 because this is used by many plugins
            meta.path = path;
        };
        /**
         * @description
         * the method checks if the state has already been added to the tree
         * and completed the life cycle
         * @param name
         * @param path
         */
        /**
         * \@description
         * the method checks if the state has already been added to the tree
         * and completed the life cycle
         * @private
         * @param {?} name
         * @param {?} path
         * @return {?}
         */
        StateFactory.prototype.hasBeenMountedAndBootstrapped = /**
         * \@description
         * the method checks if the state has already been added to the tree
         * and completed the life cycle
         * @private
         * @param {?} name
         * @param {?} path
         * @return {?}
         */
        function (name, path) {
            /** @type {?} */
            var valueIsBootstrappedInInitialState = getValue(this._initialState, path) !== undefined;
            return this.statesByName[name] && valueIsBootstrappedInInitialState;
        };
        StateFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        StateFactory.ctorParameters = function () { return [
            { type: core.Injector },
            { type: NgxsConfig },
            { type: StateFactory, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: InternalActions },
            { type: InternalDispatchedActionResults },
            { type: StateContextFactory },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [internals.INITIAL_STATE_TOKEN,] }] }
        ]; };
        return StateFactory;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._actionsSubscription;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._states;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._statesByName;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._statePaths;
        /** @type {?} */
        StateFactory.prototype.getRuntimeSelectorContext;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._injector;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._config;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._parentFactory;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._actions;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._actionResults;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._stateContextFactory;
        /**
         * @type {?}
         * @private
         */
        StateFactory.prototype._initialState;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LifecycleStateManager = /** @class */ (function () {
        function LifecycleStateManager(internalStateOperations, stateContextFactory, bootstrapper) {
            this.internalStateOperations = internalStateOperations;
            this.stateContextFactory = stateContextFactory;
            this.bootstrapper = bootstrapper;
        }
        /**
         * @template T
         * @param {?} action
         * @param {?} results
         * @return {?}
         */
        LifecycleStateManager.prototype.ngxsBootstrap = /**
         * @template T
         * @param {?} action
         * @param {?} results
         * @return {?}
         */
        function (action, results) {
            var _this = this;
            this.internalStateOperations
                .getRootStateOperations()
                .dispatch(action)
                .pipe(operators.filter((/**
             * @return {?}
             */
            function () { return !!results; })), operators.tap((/**
             * @return {?}
             */
            function () { return _this.invokeInit((/** @type {?} */ (results)).states); })), operators.mergeMap((/**
             * @return {?}
             */
            function () { return _this.bootstrapper.appBootstrapped$; })), operators.filter((/**
             * @param {?} appBootstrapped
             * @return {?}
             */
            function (appBootstrapped) { return !!appBootstrapped; })))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.invokeBootstrap((/** @type {?} */ (results)).states); }));
        };
        /**
         * Invoke the init function on the states.
         */
        /**
         * Invoke the init function on the states.
         * @param {?} mappedStores
         * @return {?}
         */
        LifecycleStateManager.prototype.invokeInit = /**
         * Invoke the init function on the states.
         * @param {?} mappedStores
         * @return {?}
         */
        function (mappedStores) {
            var e_1, _a;
            try {
                for (var mappedStores_1 = __values(mappedStores), mappedStores_1_1 = mappedStores_1.next(); !mappedStores_1_1.done; mappedStores_1_1 = mappedStores_1.next()) {
                    var mappedStore = mappedStores_1_1.value;
                    /** @type {?} */
                    var instance = mappedStore.instance;
                    if (instance.ngxsOnChanges) {
                        /** @type {?} */
                        var currentAppState = {};
                        /** @type {?} */
                        var newAppState = this.internalStateOperations
                            .getRootStateOperations()
                            .getState();
                        /** @type {?} */
                        var firstDiffChange = getStateDiffChanges(mappedStore, {
                            currentAppState: currentAppState,
                            newAppState: newAppState
                        });
                        instance.ngxsOnChanges(firstDiffChange);
                    }
                    if (instance.ngxsOnInit) {
                        instance.ngxsOnInit(this.getStateContext(mappedStore));
                    }
                    mappedStore.isInitialised = true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (mappedStores_1_1 && !mappedStores_1_1.done && (_a = mappedStores_1.return)) _a.call(mappedStores_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * Invoke the bootstrap function on the states.
         */
        /**
         * Invoke the bootstrap function on the states.
         * @param {?} mappedStores
         * @return {?}
         */
        LifecycleStateManager.prototype.invokeBootstrap = /**
         * Invoke the bootstrap function on the states.
         * @param {?} mappedStores
         * @return {?}
         */
        function (mappedStores) {
            var e_2, _a;
            try {
                for (var mappedStores_2 = __values(mappedStores), mappedStores_2_1 = mappedStores_2.next(); !mappedStores_2_1.done; mappedStores_2_1 = mappedStores_2.next()) {
                    var mappedStore = mappedStores_2_1.value;
                    /** @type {?} */
                    var instance = mappedStore.instance;
                    if (instance.ngxsAfterBootstrap) {
                        instance.ngxsAfterBootstrap(this.getStateContext(mappedStore));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (mappedStores_2_1 && !mappedStores_2_1.done && (_a = mappedStores_2.return)) _a.call(mappedStores_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        /**
         * @private
         * @param {?} mappedStore
         * @return {?}
         */
        LifecycleStateManager.prototype.getStateContext = /**
         * @private
         * @param {?} mappedStore
         * @return {?}
         */
        function (mappedStore) {
            return this.stateContextFactory.createStateContext(mappedStore);
        };
        LifecycleStateManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LifecycleStateManager.ctorParameters = function () { return [
            { type: InternalStateOperations },
            { type: StateContextFactory },
            { type: internals.NgxsBootstrapper }
        ]; };
        return LifecycleStateManager;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LifecycleStateManager.prototype.internalStateOperations;
        /**
         * @type {?}
         * @private
         */
        LifecycleStateManager.prototype.stateContextFactory;
        /**
         * @type {?}
         * @private
         */
        LifecycleStateManager.prototype.bootstrapper;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var SELECTOR_OPTIONS_META_KEY = 'NGXS_SELECTOR_OPTIONS_META';
    /** @type {?} */
    var selectorOptionsMetaAccessor = {
        getOptions: (/**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            return (target && ((/** @type {?} */ (target)))[SELECTOR_OPTIONS_META_KEY]) || {};
        }),
        defineOptions: (/**
         * @param {?} target
         * @param {?} options
         * @return {?}
         */
        function (target, options) {
            if (!target)
                return;
            ((/** @type {?} */ (target)))[SELECTOR_OPTIONS_META_KEY] = options;
        })
    };
    /**
     * @record
     */
    function CreationMetadata() { }
    if (false) {
        /** @type {?} */
        CreationMetadata.prototype.containerClass;
        /** @type {?} */
        CreationMetadata.prototype.selectorName;
        /** @type {?|undefined} */
        CreationMetadata.prototype.getSelectorOptions;
    }
    /**
     * @record
     */
    function RuntimeSelectorInfo() { }
    if (false) {
        /** @type {?} */
        RuntimeSelectorInfo.prototype.selectorOptions;
        /** @type {?} */
        RuntimeSelectorInfo.prototype.argumentSelectorFunctions;
    }
    /**
     * Function for creating a selector
     * @template T
     * @param {?} selectors The selectors to use to create the arguments of this function
     * @param {?} originalFn The original function being made into a selector
     * @param {?=} creationMetadata
     * @return {?}
     */
    function createSelector(selectors, originalFn, creationMetadata) {
        /** @type {?} */
        var containerClass = creationMetadata && creationMetadata.containerClass;
        /** @type {?} */
        var wrappedFn = (/** @type {?} */ ((/**
         * @param {...?} args
         * @return {?}
         */
        function wrappedSelectorFn() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            /** @type {?} */
            var returnValue = originalFn.apply(containerClass, args);
            if (returnValue instanceof Function) {
                /** @type {?} */
                var innerMemoizedFn = internals.memoize.apply(null, [returnValue]);
                return innerMemoizedFn;
            }
            return returnValue;
        })));
        /** @type {?} */
        var memoizedFn = internals.memoize(wrappedFn);
        Object.setPrototypeOf(memoizedFn, originalFn);
        /** @type {?} */
        var selectorMetaData = setupSelectorMetadata(originalFn, creationMetadata);
        /** @type {?} */
        var makeRootSelector = (/**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            var _a = getRuntimeSelectorInfo(context, selectorMetaData, selectors), argumentSelectorFunctions = _a.argumentSelectorFunctions, selectorOptions = _a.selectorOptions;
            return (/**
             * @param {?} rootState
             * @return {?}
             */
            function selectFromRoot(rootState) {
                // Determine arguments from the app state using the selectors
                /** @type {?} */
                var results = argumentSelectorFunctions.map((/**
                 * @param {?} argFn
                 * @return {?}
                 */
                function (argFn) { return argFn(rootState); }));
                // if the lambda tries to access a something on the
                // state that doesn't exist, it will throw a TypeError.
                // since this is quite usual behaviour, we simply return undefined if so.
                try {
                    return memoizedFn.apply(void 0, __spread(results));
                }
                catch (ex) {
                    if (ex instanceof TypeError && selectorOptions.suppressErrors) {
                        return undefined;
                    }
                    throw ex;
                }
            });
        });
        selectorMetaData.makeRootSelector = makeRootSelector;
        return memoizedFn;
    }
    /**
     * @template T
     * @param {?} originalFn
     * @param {?} creationMetadata
     * @return {?}
     */
    function setupSelectorMetadata(originalFn, creationMetadata) {
        /** @type {?} */
        var selectorMetaData = ensureSelectorMetadata(originalFn);
        selectorMetaData.originalFn = originalFn;
        /** @type {?} */
        var getExplicitSelectorOptions = (/**
         * @return {?}
         */
        function () { return ({}); });
        if (creationMetadata) {
            selectorMetaData.containerClass = creationMetadata.containerClass;
            selectorMetaData.selectorName = creationMetadata.selectorName;
            getExplicitSelectorOptions =
                creationMetadata.getSelectorOptions || getExplicitSelectorOptions;
        }
        /** @type {?} */
        var selectorMetaDataClone = __assign({}, selectorMetaData);
        selectorMetaData.getSelectorOptions = (/**
         * @return {?}
         */
        function () {
            return getLocalSelectorOptions(selectorMetaDataClone, getExplicitSelectorOptions());
        });
        return selectorMetaData;
    }
    /**
     * @param {?} context
     * @param {?} selectorMetaData
     * @param {?=} selectors
     * @return {?}
     */
    function getRuntimeSelectorInfo(context, selectorMetaData, selectors) {
        if (selectors === void 0) { selectors = []; }
        /** @type {?} */
        var localSelectorOptions = selectorMetaData.getSelectorOptions();
        /** @type {?} */
        var selectorOptions = context.getSelectorOptions(localSelectorOptions);
        /** @type {?} */
        var selectorsToApply = getSelectorsToApply(selectors, selectorOptions, selectorMetaData.containerClass);
        /** @type {?} */
        var argumentSelectorFunctions = selectorsToApply.map((/**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            /** @type {?} */
            var factory = getRootSelectorFactory(selector);
            return factory(context);
        }));
        return {
            selectorOptions: selectorOptions,
            argumentSelectorFunctions: argumentSelectorFunctions
        };
    }
    /**
     * @param {?} selectorMetaData
     * @param {?} explicitOptions
     * @return {?}
     */
    function getLocalSelectorOptions(selectorMetaData, explicitOptions) {
        return __assign({}, (selectorOptionsMetaAccessor.getOptions(selectorMetaData.containerClass) || {}), (selectorOptionsMetaAccessor.getOptions(selectorMetaData.originalFn) || {}), (selectorMetaData.getSelectorOptions() || {}), explicitOptions);
    }
    /**
     * @param {?=} selectors
     * @param {?=} selectorOptions
     * @param {?=} containerClass
     * @return {?}
     */
    function getSelectorsToApply(selectors, selectorOptions, containerClass) {
        if (selectors === void 0) { selectors = []; }
        /** @type {?} */
        var selectorsToApply = [];
        /** @type {?} */
        var canInjectContainerState = selectors.length === 0 || selectorOptions.injectContainerState;
        if (containerClass && canInjectContainerState) {
            // If we are on a state class, add it as the first selector parameter
            /** @type {?} */
            var metadata = getStoreMetadata(containerClass);
            if (metadata) {
                selectorsToApply.push(containerClass);
            }
        }
        if (selectors) {
            selectorsToApply.push.apply(selectorsToApply, __spread(selectors));
        }
        return selectorsToApply;
    }
    /**
     * This function gets the factory function to create the selector to get the selected slice from the app state
     * @ignore
     * @param {?} selector
     * @return {?}
     */
    function getRootSelectorFactory(selector) {
        /** @type {?} */
        var metadata = getSelectorMetadata(selector) || getStoreMetadata(selector);
        return (metadata && metadata.makeRootSelector) || ((/**
         * @return {?}
         */
        function () { return selector; }));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Store = /** @class */ (function () {
        function Store(_stateStream, _internalStateOperations, _config, _internalExecutionStrategy, _stateFactory, initialStateValue) {
            this._stateStream = _stateStream;
            this._internalStateOperations = _internalStateOperations;
            this._config = _config;
            this._internalExecutionStrategy = _internalExecutionStrategy;
            this._stateFactory = _stateFactory;
            this.initStateStream(initialStateValue);
        }
        /**
         * Dispatches event(s).
         */
        /**
         * Dispatches event(s).
         * @param {?} actionOrActions
         * @return {?}
         */
        Store.prototype.dispatch = /**
         * Dispatches event(s).
         * @param {?} actionOrActions
         * @return {?}
         */
        function (actionOrActions) {
            return this._internalStateOperations.getRootStateOperations().dispatch(actionOrActions);
        };
        /**
         * @param {?} selector
         * @return {?}
         */
        Store.prototype.select = /**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            var _this = this;
            /** @type {?} */
            var selectorFn = this.getStoreBoundSelectorFn(selector);
            return this._stateStream.pipe(operators.map(selectorFn), operators.catchError((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                // if error is TypeError we swallow it to prevent usual errors with property access
                var suppressErrors = _this._config.selectorOptions.suppressErrors;
                if (err instanceof TypeError && suppressErrors) {
                    return rxjs.of(undefined);
                }
                // rethrow other errors
                return rxjs.throwError(err);
            })), operators.distinctUntilChanged(), leaveNgxs(this._internalExecutionStrategy));
        };
        /**
         * @param {?} selector
         * @return {?}
         */
        Store.prototype.selectOnce = /**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            return this.select(selector).pipe(operators.take(1));
        };
        /**
         * @param {?} selector
         * @return {?}
         */
        Store.prototype.selectSnapshot = /**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            /** @type {?} */
            var selectorFn = this.getStoreBoundSelectorFn(selector);
            return selectorFn(this._stateStream.getValue());
        };
        /**
         * Allow the user to subscribe to the root of the state
         */
        /**
         * Allow the user to subscribe to the root of the state
         * @param {?=} fn
         * @return {?}
         */
        Store.prototype.subscribe = /**
         * Allow the user to subscribe to the root of the state
         * @param {?=} fn
         * @return {?}
         */
        function (fn) {
            return this._stateStream.pipe(leaveNgxs(this._internalExecutionStrategy)).subscribe(fn);
        };
        /**
         * Return the raw value of the state.
         */
        /**
         * Return the raw value of the state.
         * @return {?}
         */
        Store.prototype.snapshot = /**
         * Return the raw value of the state.
         * @return {?}
         */
        function () {
            return this._internalStateOperations.getRootStateOperations().getState();
        };
        /**
         * Reset the state to a specific point in time. This method is useful
         * for plugin's who need to modify the state directly or unit testing.
         */
        /**
         * Reset the state to a specific point in time. This method is useful
         * for plugin's who need to modify the state directly or unit testing.
         * @param {?} state
         * @return {?}
         */
        Store.prototype.reset = /**
         * Reset the state to a specific point in time. This method is useful
         * for plugin's who need to modify the state directly or unit testing.
         * @param {?} state
         * @return {?}
         */
        function (state) {
            return this._internalStateOperations.getRootStateOperations().setState(state);
        };
        /**
         * @private
         * @param {?} selector
         * @return {?}
         */
        Store.prototype.getStoreBoundSelectorFn = /**
         * @private
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            /** @type {?} */
            var makeSelectorFn = getRootSelectorFactory(selector);
            /** @type {?} */
            var runtimeContext = this._stateFactory.getRuntimeSelectorContext();
            return makeSelectorFn(runtimeContext);
        };
        /**
         * @private
         * @param {?} initialStateValue
         * @return {?}
         */
        Store.prototype.initStateStream = /**
         * @private
         * @param {?} initialStateValue
         * @return {?}
         */
        function (initialStateValue) {
            /** @type {?} */
            var value = this._stateStream.value;
            /** @type {?} */
            var storeIsEmpty = !value || Object.keys(value).length === 0;
            if (storeIsEmpty) {
                /** @type {?} */
                var defaultStateNotEmpty = Object.keys(this._config.defaultsState).length > 0;
                /** @type {?} */
                var storeValues = defaultStateNotEmpty
                    ? __assign({}, this._config.defaultsState, initialStateValue) : initialStateValue;
                this._stateStream.next(storeValues);
            }
        };
        Store.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Store.ctorParameters = function () { return [
            { type: StateStream },
            { type: InternalStateOperations },
            { type: NgxsConfig },
            { type: InternalNgxsExecutionStrategy },
            { type: StateFactory },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [internals.INITIAL_STATE_TOKEN,] }] }
        ]; };
        return Store;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Store.prototype._stateStream;
        /**
         * @type {?}
         * @private
         */
        Store.prototype._internalStateOperations;
        /**
         * @type {?}
         * @private
         */
        Store.prototype._config;
        /**
         * @type {?}
         * @private
         */
        Store.prototype._internalExecutionStrategy;
        /**
         * @type {?}
         * @private
         */
        Store.prototype._stateFactory;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Allows the select decorator to get access to the DI store.
     * \@internal only use in \@Select decorator
     * @ignore
     */
    var SelectFactory = /** @class */ (function () {
        function SelectFactory(store, config) {
            SelectFactory.store = store;
            SelectFactory.config = config;
        }
        /**
         * @return {?}
         */
        SelectFactory.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            SelectFactory.store = null;
            SelectFactory.config = null;
        };
        SelectFactory.store = null;
        SelectFactory.config = null;
        SelectFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SelectFactory.ctorParameters = function () { return [
            { type: Store },
            { type: NgxsConfig }
        ]; };
        return SelectFactory;
    }());
    if (false) {
        /** @type {?} */
        SelectFactory.store;
        /** @type {?} */
        SelectFactory.config;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Init action
     */
    var   /**
     * Init action
     */
    InitState = /** @class */ (function () {
        function InitState() {
        }
        Object.defineProperty(InitState, "type", {
            get: /**
             * @return {?}
             */
            function () {
                // NOTE: Not necessary to declare the type in this way in your code. See https://github.com/ngxs/store/pull/644#issuecomment-436003138
                return '@@INIT';
            },
            enumerable: true,
            configurable: true
        });
        return InitState;
    }());
    /**
     * Update action
     */
    var   /**
     * Update action
     */
    UpdateState = /** @class */ (function () {
        function UpdateState(addedStates) {
            this.addedStates = addedStates;
        }
        Object.defineProperty(UpdateState, "type", {
            get: /**
             * @return {?}
             */
            function () {
                // NOTE: Not necessary to declare the type in this way in your code. See https://github.com/ngxs/store/pull/644#issuecomment-436003138
                return '@@UPDATE_STATE';
            },
            enumerable: true,
            configurable: true
        });
        return UpdateState;
    }());
    if (false) {
        /** @type {?} */
        UpdateState.prototype.addedStates;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ivyEnabledInDevMode$ = new rxjs.ReplaySubject(1);
    /**
     * Ivy exposes helper functions to the global `window.ng` object.
     * Those functions are `getComponent, getContext,
     * getListeners, getViewComponent, getHostElement, getInjector,
     * getRootComponents, getDirectives, getDebugNode`
     * Previously, old view engine exposed `window.ng.coreTokens` and
     * `window.ng.probe` if an application was in development/production.
     * Ivy doesn't expose these functions in production. Developers will be able
     * to see warnings in both JIT/AOT modes, but only if an application
     * is in development.
     * @return {?}
     */
    function setIvyEnabledInDevMode() {
        try {
            // `try-catch` will also handle server-side rendering, as
            // `window is not defined` will not be thrown.
            /** @type {?} */
            var ng = ((/** @type {?} */ (window))).ng;
            /** @type {?} */
            var _viewEngineEnabled = !!ng.probe && !!ng.coreTokens;
            /** @type {?} */
            var _ivyEnabledInDevMode = !_viewEngineEnabled && core.isDevMode();
            ivyEnabledInDevMode$.next(_ivyEnabledInDevMode);
        }
        catch (_a) {
            ivyEnabledInDevMode$.next(false);
        }
        finally {
            ivyEnabledInDevMode$.complete();
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Root module
     * @ignore
     */
    var NgxsRootModule = /** @class */ (function () {
        function NgxsRootModule(factory, internalStateOperations, _store, _select, states, lifecycleStateManager) {
            if (states === void 0) { states = []; }
            // Validate states on having the `@Injectable()` decorator in Ivy
            setIvyEnabledInDevMode();
            // Add stores to the state graph and return their defaults
            /** @type {?} */
            var results = factory.addAndReturnDefaults(states);
            internalStateOperations.setStateToTheCurrentWithNew(results);
            // Connect our actions stream
            factory.connectActionHandlers();
            // Dispatch the init action and invoke init and bootstrap functions after
            lifecycleStateManager.ngxsBootstrap(new InitState(), results);
        }
        NgxsRootModule.decorators = [
            { type: core.NgModule }
        ];
        /** @nocollapse */
        NgxsRootModule.ctorParameters = function () { return [
            { type: StateFactory },
            { type: InternalStateOperations },
            { type: Store },
            { type: SelectFactory },
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ROOT_STATE_TOKEN,] }] },
            { type: LifecycleStateManager }
        ]; };
        return NgxsRootModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Feature module
     * @ignore
     */
    var NgxsFeatureModule = /** @class */ (function () {
        function NgxsFeatureModule(_store, internalStateOperations, factory, states, lifecycleStateManager) {
            if (states === void 0) { states = []; }
            // Since FEATURE_STATE_TOKEN is a multi token, we need to
            // flatten it [[Feature1State, Feature2State], [Feature3State]]
            /** @type {?} */
            var flattenedStates = NgxsFeatureModule.flattenStates(states);
            // add stores to the state graph and return their defaults
            /** @type {?} */
            var results = factory.addAndReturnDefaults(flattenedStates);
            if (results.states.length) {
                internalStateOperations.setStateToTheCurrentWithNew(results);
                // dispatch the update action and invoke init and bootstrap functions after
                lifecycleStateManager.ngxsBootstrap(new UpdateState(results.defaults), results);
            }
        }
        /**
         * @private
         * @param {?=} states
         * @return {?}
         */
        NgxsFeatureModule.flattenStates = /**
         * @private
         * @param {?=} states
         * @return {?}
         */
        function (states) {
            if (states === void 0) { states = []; }
            return states.reduce((/**
             * @param {?} total
             * @param {?} values
             * @return {?}
             */
            function (total, values) { return total.concat(values); }), []);
        };
        NgxsFeatureModule.decorators = [
            { type: core.NgModule }
        ];
        /** @nocollapse */
        NgxsFeatureModule.ctorParameters = function () { return [
            { type: Store },
            { type: InternalStateOperations },
            { type: StateFactory },
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [FEATURE_STATE_TOKEN,] }] },
            { type: LifecycleStateManager }
        ]; };
        return NgxsFeatureModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Ngxs Module
     */
    var NgxsModule = /** @class */ (function () {
        function NgxsModule() {
        }
        /**
         * Root module factory
         */
        /**
         * Root module factory
         * @param {?=} states
         * @param {?=} options
         * @return {?}
         */
        NgxsModule.forRoot = /**
         * Root module factory
         * @param {?=} states
         * @param {?=} options
         * @return {?}
         */
        function (states, options) {
            if (states === void 0) { states = []; }
            if (options === void 0) { options = {}; }
            return {
                ngModule: NgxsRootModule,
                providers: __spread([
                    StateFactory,
                    StateContextFactory,
                    Actions,
                    InternalActions,
                    internals.NgxsBootstrapper,
                    ConfigValidator,
                    HostEnvironment,
                    LifecycleStateManager,
                    InternalDispatcher,
                    InternalDispatchedActionResults,
                    InternalStateOperations,
                    InternalNgxsExecutionStrategy,
                    Store,
                    StateStream,
                    SelectFactory,
                    PluginManager
                ], states, NgxsModule.ngxsTokenProviders(states, options))
            };
        };
        /**
         * Feature module factory
         */
        /**
         * Feature module factory
         * @param {?=} states
         * @return {?}
         */
        NgxsModule.forFeature = /**
         * Feature module factory
         * @param {?=} states
         * @return {?}
         */
        function (states) {
            if (states === void 0) { states = []; }
            return {
                ngModule: NgxsFeatureModule,
                providers: __spread([
                    StateFactory,
                    PluginManager
                ], states, [
                    {
                        provide: FEATURE_STATE_TOKEN,
                        multi: true,
                        useValue: states
                    }
                ])
            };
        };
        /**
         * @private
         * @param {?} states
         * @param {?} options
         * @return {?}
         */
        NgxsModule.ngxsTokenProviders = /**
         * @private
         * @param {?} states
         * @param {?} options
         * @return {?}
         */
        function (states, options) {
            return [
                {
                    provide: NG_TEST_MODE,
                    useValue: internals.isAngularInTestMode
                },
                {
                    provide: NG_DEV_MODE,
                    useValue: core.isDevMode
                },
                {
                    provide: NGXS_EXECUTION_STRATEGY,
                    useClass: options.executionStrategy || DispatchOutsideZoneNgxsExecutionStrategy
                },
                {
                    provide: ROOT_STATE_TOKEN,
                    useValue: states
                },
                {
                    provide: NgxsModule.ROOT_OPTIONS,
                    useValue: options
                },
                {
                    provide: NgxsConfig,
                    useFactory: NgxsModule.ngxsConfigFactory,
                    deps: [NgxsModule.ROOT_OPTIONS]
                },
                {
                    provide: core.APP_BOOTSTRAP_LISTENER,
                    useFactory: NgxsModule.appBootstrapListenerFactory,
                    multi: true,
                    deps: [internals.NgxsBootstrapper]
                },
                {
                    provide: internals.INITIAL_STATE_TOKEN,
                    useFactory: NgxsModule.getInitialState
                },
                {
                    provide: internals.NGXS_STATE_CONTEXT_FACTORY,
                    useExisting: StateContextFactory
                },
                {
                    provide: internals.NGXS_STATE_FACTORY,
                    useExisting: StateFactory
                }
            ];
        };
        /**
         * @private
         * @param {?} options
         * @return {?}
         */
        NgxsModule.ngxsConfigFactory = /**
         * @private
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return mergeDeep(new NgxsConfig(), options);
        };
        /**
         * @private
         * @param {?} bootstrapper
         * @return {?}
         */
        NgxsModule.appBootstrapListenerFactory = /**
         * @private
         * @param {?} bootstrapper
         * @return {?}
         */
        function (bootstrapper) {
            return (/**
             * @return {?}
             */
            function () { return bootstrapper.bootstrap(); });
        };
        /**
         * @private
         * @return {?}
         */
        NgxsModule.getInitialState = /**
         * @private
         * @return {?}
         */
        function () {
            return internals.InitialState.pop();
        };
        NgxsModule.ROOT_OPTIONS = new core.InjectionToken('ROOT_OPTIONS');
        NgxsModule.decorators = [
            { type: core.NgModule }
        ];
        return NgxsModule;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NgxsModule.ROOT_OPTIONS;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Decorates a method with a action information.
     * @param {?} actions
     * @param {?=} options
     * @return {?}
     */
    function Action(actions, options) {
        return (/**
         * @param {?} target
         * @param {?} name
         * @return {?}
         */
        function (target, name) {
            var e_1, _a;
            /** @type {?} */
            var isStaticMethod = target.hasOwnProperty('prototype');
            if (isStaticMethod) {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.ACTION_DECORATOR]());
            }
            /** @type {?} */
            var meta = ensureStoreMetadata(target.constructor);
            if (!Array.isArray(actions)) {
                actions = [actions];
            }
            try {
                for (var actions_1 = __values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                    var action = actions_1_1.value;
                    /** @type {?} */
                    var type = action.type;
                    if (!meta.actions[type]) {
                        meta.actions[type] = [];
                    }
                    meta.actions[type].push({
                        fn: name,
                        options: options || {},
                        type: type
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * All provided or injected tokens must have `\@Injectable` decorator
     * (previously, injected tokens without `\@Injectable` were allowed
     * if another decorator was used, e.g. pipes).
     * @param {?} target
     * @return {?}
     */
    function ensureStateClassIsInjectable(target) {
        // `??prov` is a static property added by the NGCC compiler. It always exists in
        // AOT mode because this property is added before runtime. If an application is running in
        // JIT mode then this property can be added by the `@Injectable()` decorator. The `@Injectable()`
        // decorator has to go after the `@State()` decorator, thus we prevent users from unwanted DI errors.
        ivyEnabledInDevMode$.subscribe((/**
         * @param {?} _ivyEnabledInDevMode
         * @return {?}
         */
        function (_ivyEnabledInDevMode) {
            if (_ivyEnabledInDevMode) {
                /** @type {?} */
                /** @nocollapse */ var ngInjectableDef = target.??prov;
                if (!ngInjectableDef) {
                    // Don't warn if Ivy is disabled or `??prov` exists on the class
                    console.warn(CONFIG_MESSAGES[VALIDATION_CODE.UNDECORATED_STATE_IN_IVY](target.name));
                }
            }
        }));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function MutateMetaOptions() { }
    if (false) {
        /** @type {?} */
        MutateMetaOptions.prototype.meta;
        /** @type {?} */
        MutateMetaOptions.prototype.inheritedStateClass;
        /** @type {?} */
        MutateMetaOptions.prototype.optionsWithInheritance;
    }
    /**
     * Decorates a class with ngxs state information.
     * @template T
     * @param {?} options
     * @return {?}
     */
    function State(options) {
        /**
         * @param {?} inheritedStateClass
         * @return {?}
         */
        function getStateOptions(inheritedStateClass) {
            /** @type {?} */
            var inheritanceOptions = inheritedStateClass[META_OPTIONS_KEY] || {};
            return (/** @type {?} */ (__assign({}, inheritanceOptions, options)));
        }
        /**
         * @param {?} params
         * @return {?}
         */
        function mutateMetaData(params) {
            var meta = params.meta, inheritedStateClass = params.inheritedStateClass, optionsWithInheritance = params.optionsWithInheritance;
            var children = optionsWithInheritance.children, defaults = optionsWithInheritance.defaults, name = optionsWithInheritance.name;
            /** @type {?} */
            var stateName = typeof name === 'string' ? name : (name && name.getName()) || null;
            StoreValidators.checkCorrectStateName(stateName);
            if (inheritedStateClass.hasOwnProperty(META_KEY)) {
                /** @type {?} */
                var inheritedMeta = inheritedStateClass[META_KEY] || {};
                meta.actions = __assign({}, meta.actions, inheritedMeta.actions);
            }
            meta.children = children;
            meta.defaults = defaults;
            meta.name = stateName;
        }
        return (/**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            ensureStateClassIsInjectable(target);
            /** @type {?} */
            var stateClass = target;
            /** @type {?} */
            var meta = ensureStoreMetadata(stateClass);
            /** @type {?} */
            var inheritedStateClass = Object.getPrototypeOf(stateClass);
            /** @type {?} */
            var optionsWithInheritance = getStateOptions(inheritedStateClass);
            mutateMetaData({ meta: meta, inheritedStateClass: inheritedStateClass, optionsWithInheritance: optionsWithInheritance });
            stateClass[META_OPTIONS_KEY] = optionsWithInheritance;
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DOLLAR_CHAR_CODE = 36;
    /**
     * @template T
     * @param {?} selector
     * @return {?}
     */
    function createSelectObservable(selector) {
        if (!SelectFactory.store) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.SELECT_FACTORY_NOT_CONNECTED]());
        }
        return SelectFactory.store.select(selector);
    }
    /**
     * @param {?} name
     * @param {?=} rawSelector
     * @param {?=} paths
     * @return {?}
     */
    function createSelectorFn(name, rawSelector, paths) {
        if (paths === void 0) { paths = []; }
        rawSelector = !rawSelector ? removeDollarAtTheEnd(name) : rawSelector;
        if (typeof rawSelector === 'string') {
            /** @type {?} */
            var propsArray = paths.length
                ? __spread([rawSelector], paths) : rawSelector.split('.');
            return propGetter(propsArray, (/** @type {?} */ (SelectFactory.config)));
        }
        return rawSelector;
    }
    /**
     * \@example If `foo$` => make it just `foo`
     * @param {?} name
     * @return {?}
     */
    function removeDollarAtTheEnd(name) {
        /** @type {?} */
        var lastCharIndex = name.length - 1;
        /** @type {?} */
        var dollarAtTheEnd = name.charCodeAt(lastCharIndex) === DOLLAR_CHAR_CODE;
        return dollarAtTheEnd ? name.slice(0, lastCharIndex) : name;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Decorator for selecting a slice of state from the store.
     * @template T
     * @param {?=} rawSelector
     * @param {...?} paths
     * @return {?}
     */
    function Select(rawSelector) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return (/**
         * @param {?} target
         * @param {?} key
         * @return {?}
         */
        function (target, key) {
            var _a;
            /** @type {?} */
            var name = key.toString();
            /** @type {?} */
            var selectorId = "__" + name + "__selector";
            /** @type {?} */
            var selector = createSelectorFn(name, rawSelector, paths);
            Object.defineProperties(target, (_a = {},
                _a[selectorId] = {
                    writable: true,
                    enumerable: false,
                    configurable: true
                },
                _a[name] = {
                    enumerable: true,
                    configurable: true,
                    get: /**
                     * @return {?}
                     */
                    function () {
                        return this[selectorId] || (this[selectorId] = createSelectObservable(selector));
                    }
                },
                _a));
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Decorator for setting selector options at a method or class level.
     * @param {?} options
     * @return {?}
     */
    function SelectorOptions(options) {
        return (/** @type {?} */ (((/**
         * @template T
         * @param {?} target
         * @param {?} methodName
         * @param {?} descriptor
         * @return {?}
         */
        function decorate(target, methodName, descriptor) {
            if (methodName) {
                // Method Decorator
                /** @type {?} */
                var originalFn = descriptor.value || ((/** @type {?} */ (descriptor))).originalFn;
                if (originalFn) {
                    selectorOptionsMetaAccessor.defineOptions(originalFn, options);
                }
            }
            else {
                // Class Decorator
                selectorOptionsMetaAccessor.defineOptions(target, options);
            }
        }))));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MetaDataModel$1() { }
    if (false) {
        /** @type {?} */
        MetaDataModel$1.prototype.name;
        /** @type {?} */
        MetaDataModel$1.prototype.actions;
        /** @type {?} */
        MetaDataModel$1.prototype.defaults;
        /** @type {?} */
        MetaDataModel$1.prototype.path;
        /** @type {?|undefined} */
        MetaDataModel$1.prototype.children;
    }
    /**
     * @record
     */
    function SelectorMetaDataModel$1() { }
    if (false) {
        /** @type {?} */
        SelectorMetaDataModel$1.prototype.originalFn;
        /** @type {?} */
        SelectorMetaDataModel$1.prototype.containerClass;
        /** @type {?} */
        SelectorMetaDataModel$1.prototype.selectorName;
        /** @type {?} */
        SelectorMetaDataModel$1.prototype.getSelectorOptions;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function ensureStoreMetadata$1(target) {
        return ensureStoreMetadata(target);
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function getStoreMetadata$1(target) {
        return getStoreMetadata(target);
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function ensureSelectorMetadata$1(target) {
        return ensureSelectorMetadata(target);
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function getSelectorMetadata$1(target) {
        return getSelectorMetadata(target);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Decorator for memoizing a state selector.
     * @template T
     * @param {?=} selectors
     * @return {?}
     */
    function Selector(selectors) {
        return (/**
         * @template U
         * @param {?} target
         * @param {?} key
         * @param {?} descriptor
         * @return {?}
         */
        function (target, key, descriptor) {
            /** @type {?} */
            var isNotMethod = !(descriptor && descriptor.value !== null);
            if (isNotMethod) {
                throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.SELECTOR_DECORATOR]());
            }
            /** @type {?} */
            var originalFn = descriptor.value;
            /** @type {?} */
            var memoizedFn = createSelector(selectors, (/** @type {?} */ (originalFn)), {
                containerClass: target,
                selectorName: key.toString(),
                getSelectorOptions: /**
                 * @return {?}
                 */
                function () {
                    return {};
                }
            });
            /** @type {?} */
            var newDescriptor = {
                configurable: true,
                get: /**
                 * @return {?}
                 */
                function () {
                    return memoizedFn;
                }
            };
            // Add hidden property to descriptor
            ((/** @type {?} */ (newDescriptor)))['originalFn'] = originalFn;
            return newDescriptor;
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NoopNgxsExecutionStrategy = /** @class */ (function () {
        function NoopNgxsExecutionStrategy() {
        }
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        NoopNgxsExecutionStrategy.prototype.enter = /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            return func();
        };
        /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        NoopNgxsExecutionStrategy.prototype.leave = /**
         * @template T
         * @param {?} func
         * @return {?}
         */
        function (func) {
            return func();
        };
        NoopNgxsExecutionStrategy.decorators = [
            { type: core.Injectable }
        ];
        return NoopNgxsExecutionStrategy;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    StateToken = /** @class */ (function () {
        function StateToken(name) {
            var _this = this;
            this.name = name;
            /** @type {?} */
            var selectorMetadata = ensureSelectorMetadata((/** @type {?} */ (this)));
            selectorMetadata.makeRootSelector = (/**
             * @param {?} runtimeContext
             * @return {?}
             */
            function (runtimeContext) {
                return runtimeContext.getStateGetter(_this.name);
            });
        }
        /**
         * @return {?}
         */
        StateToken.prototype.getName = /**
         * @return {?}
         */
        function () {
            return this.name;
        };
        /**
         * @return {?}
         */
        StateToken.prototype.toString = /**
         * @return {?}
         */
        function () {
            return "StateToken[" + this.name + "]";
        };
        return StateToken;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        StateToken.prototype.name;
    }

    exports.Action = Action;
    exports.Actions = Actions;
    exports.InitState = InitState;
    exports.NGXS_PLUGINS = NGXS_PLUGINS;
    exports.NgxsModule = NgxsModule;
    exports.NgxsSimpleChange = NgxsSimpleChange;
    exports.NoopNgxsExecutionStrategy = NoopNgxsExecutionStrategy;
    exports.Select = Select;
    exports.Selector = Selector;
    exports.SelectorOptions = SelectorOptions;
    exports.State = State;
    exports.StateStream = StateStream;
    exports.StateToken = StateToken;
    exports.Store = Store;
    exports.UpdateState = UpdateState;
    exports.actionMatcher = actionMatcher;
    exports.createSelector = createSelector;
    exports.ensureSelectorMetadata = ensureSelectorMetadata$1;
    exports.ensureStoreMetadata = ensureStoreMetadata$1;
    exports.getActionTypeFromInstance = getActionTypeFromInstance;
    exports.getSelectorMetadata = getSelectorMetadata$1;
    exports.getStoreMetadata = getStoreMetadata$1;
    exports.getValue = getValue;
    exports.ofAction = ofAction;
    exports.ofActionCanceled = ofActionCanceled;
    exports.ofActionCompleted = ofActionCompleted;
    exports.ofActionDispatched = ofActionDispatched;
    exports.ofActionErrored = ofActionErrored;
    exports.ofActionSuccessful = ofActionSuccessful;
    exports.setValue = setValue;
    exports.??a = OrderedSubject;
    exports.??b = InternalActions;
    exports.??ba = SelectFactory;
    exports.??bb = LifecycleStateManager;
    exports.??bc = NgxsFeatureModule;
    exports.??bd = DispatchOutsideZoneNgxsExecutionStrategy;
    exports.??c = ROOT_STATE_TOKEN;
    exports.??d = FEATURE_STATE_TOKEN;
    exports.??e = NG_TEST_MODE;
    exports.??f = NG_DEV_MODE;
    exports.??g = SELECTOR_META_KEY;
    exports.??h = NgxsConfig;
    exports.??i = mergeDeep;
    exports.??j = NGXS_EXECUTION_STRATEGY;
    exports.??k = NgxsRootModule;
    exports.??l = StateFactory;
    exports.??m = InternalDispatchedActionResults;
    exports.??n = InternalDispatcher;
    exports.??o = StateContextFactory;
    exports.??p = InternalStateOperations;
    exports.??q = PluginManager;
    exports.??r = InternalNgxsExecutionStrategy;
    exports.??s = ConfigValidator;
    exports.??t = HostEnvironment;
    exports.??w = ensureStoreMetadata;
    exports.??x = getStoreMetadata;
    exports.??y = ensureSelectorMetadata;
    exports.??z = getSelectorMetadata;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngxs-store.umd.js.map
