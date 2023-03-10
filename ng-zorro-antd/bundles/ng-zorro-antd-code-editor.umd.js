(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/spin')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/code-editor', ['exports', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/config', 'ng-zorro-antd/icon', 'ng-zorro-antd/spin'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd']['code-editor'] = {}), global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].spin));
}(this, (function (exports, core, forms, logger, util, rxjs, operators, common, config, icon, spin) { 'use strict';

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
     * Generated from: typings.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var NzCodeEditorLoadingStatus = {
        UNLOAD: "unload",
        LOADING: "loading",
        LOADED: "LOADED",
    };
    /**
     * @record
     */
    function NzCodeEditorConfig() { }
    if (false) {
        /** @type {?|undefined} */
        NzCodeEditorConfig.prototype.assetsRoot;
        /** @type {?|undefined} */
        NzCodeEditorConfig.prototype.defaultEditorOption;
        /** @type {?|undefined} */
        NzCodeEditorConfig.prototype.useStaticLoading;
        /**
         * @return {?}
         */
        NzCodeEditorConfig.prototype.onLoad = function () { };
        /**
         * @return {?}
         */
        NzCodeEditorConfig.prototype.onFirstEditorInit = function () { };
        /**
         * @return {?}
         */
        NzCodeEditorConfig.prototype.onInit = function () { };
    }
    /** @type {?} */
    var NZ_CODE_EDITOR_CONFIG = new core.InjectionToken('nz-code-editor-config', {
        providedIn: 'root',
        factory: NZ_CODE_EDITOR_CONFIG_FACTORY
    });
    /**
     * @return {?}
     */
    function NZ_CODE_EDITOR_CONFIG_FACTORY() {
        return {};
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: code-editor.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'codeEditor';
    /**
     * @param {?=} fn
     * @return {?}
     */
    function tryTriggerFunc(fn) {
        return (/**
         * @param {...?} args
         * @return {?}
         */
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (fn) {
                fn.apply(void 0, __spread(args));
            }
        });
    }
    var NzCodeEditorService = /** @class */ (function () {
        function NzCodeEditorService(nzConfigService, _document, config) {
            var _this = this;
            this.nzConfigService = nzConfigService;
            this.firstEditorInitialized = false;
            this.loaded$ = new rxjs.Subject();
            this.loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
            this.option$ = new rxjs.BehaviorSubject(this.option);
            /** @type {?} */
            var globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
            if (config) {
                logger.warnDeprecation("'NZ_CODE_EDITOR_CONFIG' is deprecated and will be removed in next minor version. Please use 'NzConfigService' instead.");
            }
            this.document = _document;
            this.config = __assign(__assign({}, config), globalConfig);
            this.option = this.config.defaultEditorOption || {};
            this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var newGlobalConfig = _this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
                if (newGlobalConfig) {
                    _this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
                }
            }));
        }
        /**
         * @param {?} option
         * @return {?}
         */
        NzCodeEditorService.prototype.updateDefaultOption = /**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            logger.warnDeprecation("'updateDefaultOption' is deprecated and will be removed in next minor version. Please use 'set' of 'NzConfigService' instead.");
            this._updateDefaultOption(option);
        };
        /**
         * @private
         * @param {?} option
         * @return {?}
         */
        NzCodeEditorService.prototype._updateDefaultOption = /**
         * @private
         * @param {?} option
         * @return {?}
         */
        function (option) {
            this.option = __assign(__assign({}, this.option), option);
            this.option$.next(this.option);
            if (option.theme) {
                monaco.editor.setTheme(option.theme);
            }
        };
        /**
         * @return {?}
         */
        NzCodeEditorService.prototype.requestToInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADED) {
                this.onInit();
                return rxjs.of(this.getLatestOption());
            }
            if (this.loadingStatus === NzCodeEditorLoadingStatus.UNLOAD) {
                if (this.config.useStaticLoading && typeof monaco === 'undefined') {
                    logger.warn('You choose to use static loading but it seems that you forget ' +
                        'to config webpack plugin correctly. Please refer to our official website' +
                        'for more details about static loading.');
                }
                else {
                    this.loadMonacoScript();
                }
            }
            return this.loaded$.asObservable().pipe(operators.tap((/**
             * @return {?}
             */
            function () { return _this.onInit(); })), operators.map((/**
             * @return {?}
             */
            function () { return _this.getLatestOption(); })));
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorService.prototype.loadMonacoScript = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.config.useStaticLoading) {
                this.onLoad();
                return;
            }
            if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADING) {
                return;
            }
            this.loadingStatus = NzCodeEditorLoadingStatus.LOADING;
            /** @type {?} */
            var assetsRoot = this.config.assetsRoot;
            /** @type {?} */
            var vs = assetsRoot ? assetsRoot + "/vs" : 'assets/vs';
            /** @type {?} */
            var windowAsAny = (/** @type {?} */ (window));
            /** @type {?} */
            var loadScript = this.document.createElement('script');
            loadScript.type = 'text/javascript';
            loadScript.src = vs + "/loader.js";
            loadScript.onload = (/**
             * @return {?}
             */
            function () {
                windowAsAny.require.config({
                    paths: { vs: vs }
                });
                windowAsAny.require(['vs/editor/editor.main'], (/**
                 * @return {?}
                 */
                function () {
                    _this.onLoad();
                }));
            });
            loadScript.onerror = (/**
             * @return {?}
             */
            function () {
                throw new Error(logger.PREFIX + " cannot load assets of monaco editor from source \"" + vs + "\".");
            });
            this.document.documentElement.appendChild(loadScript);
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorService.prototype.onLoad = /**
         * @private
         * @return {?}
         */
        function () {
            this.loadingStatus = NzCodeEditorLoadingStatus.LOADED;
            this.loaded$.next(true);
            this.loaded$.complete();
            tryTriggerFunc(this.config.onLoad)();
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorService.prototype.onInit = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.firstEditorInitialized) {
                this.firstEditorInitialized = true;
                tryTriggerFunc(this.config.onFirstEditorInit)();
            }
            tryTriggerFunc(this.config.onInit)();
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorService.prototype.getLatestOption = /**
         * @private
         * @return {?}
         */
        function () {
            return __assign({}, this.option);
        };
        NzCodeEditorService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NzCodeEditorService.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [NZ_CODE_EDITOR_CONFIG,] }, { type: core.Optional }] }
        ]; };
        /** @nocollapse */ NzCodeEditorService.??prov = core.????defineInjectable({ factory: function NzCodeEditorService_Factory() { return new NzCodeEditorService(core.????inject(config.NzConfigService), core.????inject(common.DOCUMENT), core.????inject(NZ_CODE_EDITOR_CONFIG, 8)); }, token: NzCodeEditorService, providedIn: "root" });
        return NzCodeEditorService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.document;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.firstEditorInitialized;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.loaded$;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.loadingStatus;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.option;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.config;
        /** @type {?} */
        NzCodeEditorService.prototype.option$;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorService.prototype.nzConfigService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: code-editor.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCodeEditorComponent = /** @class */ (function () {
        function NzCodeEditorComponent(nzCodeEditorService, ngZone, elementRef) {
            this.nzCodeEditorService = nzCodeEditorService;
            this.ngZone = ngZone;
            this.nzEditorMode = 'normal';
            this.nzOriginalText = '';
            this.nzLoading = false;
            this.nzFullControl = false;
            this.nzEditorInitialized = new core.EventEmitter();
            this.editorOptionCached = {};
            this.destroy$ = new rxjs.Subject();
            this.resize$ = new rxjs.Subject();
            this.editorOption$ = new rxjs.BehaviorSubject({});
            this.value = '';
            this.modelSet = false;
            this.onChange = (/**
             * @param {?} _value
             * @return {?}
             */
            function (_value) { });
            this.onTouch = (/**
             * @return {?}
             */
            function () { });
            this.el = elementRef.nativeElement;
        }
        Object.defineProperty(NzCodeEditorComponent.prototype, "nzEditorOption", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.editorOption$.next(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize a monaco editor instance.
         */
        /**
         * Initialize a monaco editor instance.
         * @return {?}
         */
        NzCodeEditorComponent.prototype.ngAfterViewInit = /**
         * Initialize a monaco editor instance.
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzCodeEditorService.requestToInit().subscribe((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return _this.setup(option); }));
        };
        /**
         * @return {?}
         */
        NzCodeEditorComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.editorInstance) {
                this.editorInstance.dispose();
            }
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzCodeEditorComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
            this.setValue();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzCodeEditorComponent.prototype.registerOnChange = /**
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
        NzCodeEditorComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouch = fn;
        };
        /**
         * @return {?}
         */
        NzCodeEditorComponent.prototype.layout = /**
         * @return {?}
         */
        function () {
            this.resize$.next();
        };
        /**
         * @private
         * @param {?} option
         * @return {?}
         */
        NzCodeEditorComponent.prototype.setup = /**
         * @private
         * @param {?} option
         * @return {?}
         */
        function (option) {
            var _this = this;
            util.inNextTick().subscribe((/**
             * @return {?}
             */
            function () {
                _this.editorOptionCached = option;
                _this.registerOptionChanges();
                _this.initMonacoEditorInstance();
                _this.registerResizeChange();
                _this.setValue();
                if (!_this.nzFullControl) {
                    _this.setValueEmitter();
                }
                _this.nzEditorInitialized.emit(_this.editorInstance);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorComponent.prototype.registerOptionChanges = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            rxjs.combineLatest([this.editorOption$, this.nzCodeEditorService.option$])
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), selfOpt = _b[0], defaultOpt = _b[1];
                _this.editorOptionCached = __assign(__assign(__assign({}, _this.editorOptionCached), defaultOpt), selfOpt);
                _this.updateOptionToMonaco();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorComponent.prototype.initMonacoEditorInstance = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.editorInstance =
                    _this.nzEditorMode === 'normal'
                        ? monaco.editor.create(_this.el, __assign({}, _this.editorOptionCached))
                        : monaco.editor.createDiffEditor(_this.el, __assign({}, ((/** @type {?} */ (_this.editorOptionCached)))));
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorComponent.prototype.registerResizeChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                rxjs.fromEvent(window, 'resize')
                    .pipe(operators.debounceTime(300), operators.takeUntil(_this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.layout();
                }));
                _this.resize$
                    .pipe(operators.takeUntil(_this.destroy$), operators.filter((/**
                 * @return {?}
                 */
                function () { return !!_this.editorInstance; })), operators.map((/**
                 * @return {?}
                 */
                function () { return ({
                    width: _this.el.clientWidth,
                    height: _this.el.clientHeight
                }); })), operators.distinctUntilChanged((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a.width === b.width && a.height === b.height; })), operators.debounceTime(50))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    (/** @type {?} */ (_this.editorInstance)).layout();
                }));
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorComponent.prototype.setValue = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.editorInstance) {
                return;
            }
            if (this.nzFullControl && this.value) {
                logger.warn("should not set value when you are using full control mode! It would result in ambiguous data flow!");
                return;
            }
            if (this.nzEditorMode === 'normal') {
                if (this.modelSet) {
                    ((/** @type {?} */ (this.editorInstance.getModel()))).setValue(this.value);
                }
                else {
                    ((/** @type {?} */ (this.editorInstance))).setModel(monaco.editor.createModel(this.value, ((/** @type {?} */ (this.editorOptionCached))).language));
                    this.modelSet = true;
                }
            }
            else {
                if (this.modelSet) {
                    /** @type {?} */
                    var model = (/** @type {?} */ (((/** @type {?} */ (this.editorInstance))).getModel()));
                    model.modified.setValue(this.value);
                    model.original.setValue(this.nzOriginalText);
                }
                else {
                    /** @type {?} */
                    var language = ((/** @type {?} */ (this.editorOptionCached))).language;
                    ((/** @type {?} */ (this.editorInstance))).setModel({
                        original: monaco.editor.createModel(this.nzOriginalText, language),
                        modified: monaco.editor.createModel(this.value, language)
                    });
                    this.modelSet = true;
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorComponent.prototype.setValueEmitter = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var model = (/** @type {?} */ ((this.nzEditorMode === 'normal'
                ? ((/** @type {?} */ (this.editorInstance))).getModel()
                : (/** @type {?} */ (((/** @type {?} */ (this.editorInstance))).getModel())).modified)));
            model.onDidChangeContent((/**
             * @return {?}
             */
            function () {
                _this.emitValue(model.getValue());
            }));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzCodeEditorComponent.prototype.emitValue = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
            this.onChange(value);
        };
        /**
         * @private
         * @return {?}
         */
        NzCodeEditorComponent.prototype.updateOptionToMonaco = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.editorInstance) {
                this.editorInstance.updateOptions(__assign({}, this.editorOptionCached));
            }
        };
        NzCodeEditorComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-code-editor',
                        exportAs: 'nzCodeEditor',
                        template: "\n    <div class=\"ant-code-editor-loading\" *ngIf=\"nzLoading\">\n      <nz-spin></nz-spin>\n    </div>\n\n    <div class=\"ant-code-editor-toolkit\" *ngIf=\"nzToolkit\">\n      <ng-template [ngTemplateOutlet]=\"nzToolkit\"></ng-template>\n    </div>\n  ",
                        host: {
                            '[class.ant-code-editor]': 'true'
                        },
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzCodeEditorComponent; })),
                                multi: true
                            }
                        ]
                    }] }
        ];
        /** @nocollapse */
        NzCodeEditorComponent.ctorParameters = function () { return [
            { type: NzCodeEditorService },
            { type: core.NgZone },
            { type: core.ElementRef }
        ]; };
        NzCodeEditorComponent.propDecorators = {
            nzEditorMode: [{ type: core.Input }],
            nzOriginalText: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzFullControl: [{ type: core.Input }],
            nzToolkit: [{ type: core.Input }],
            nzEditorOption: [{ type: core.Input }],
            nzEditorInitialized: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCodeEditorComponent.prototype, "nzLoading", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCodeEditorComponent.prototype, "nzFullControl", void 0);
        return NzCodeEditorComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCodeEditorComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzCodeEditorComponent.ngAcceptInputType_nzFullControl;
        /** @type {?} */
        NzCodeEditorComponent.prototype.nzEditorMode;
        /** @type {?} */
        NzCodeEditorComponent.prototype.nzOriginalText;
        /** @type {?} */
        NzCodeEditorComponent.prototype.nzLoading;
        /** @type {?} */
        NzCodeEditorComponent.prototype.nzFullControl;
        /** @type {?} */
        NzCodeEditorComponent.prototype.nzToolkit;
        /** @type {?} */
        NzCodeEditorComponent.prototype.nzEditorInitialized;
        /** @type {?} */
        NzCodeEditorComponent.prototype.editorOptionCached;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.resize$;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.editorOption$;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.editorInstance;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.value;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.modelSet;
        /** @type {?} */
        NzCodeEditorComponent.prototype.onChange;
        /** @type {?} */
        NzCodeEditorComponent.prototype.onTouch;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.nzCodeEditorService;
        /**
         * @type {?}
         * @private
         */
        NzCodeEditorComponent.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: code-editor.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCodeEditorModule = /** @class */ (function () {
        function NzCodeEditorModule() {
        }
        NzCodeEditorModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzCodeEditorComponent],
                        imports: [common.CommonModule, icon.NzIconModule, spin.NzSpinModule],
                        exports: [NzCodeEditorComponent]
                    },] }
        ];
        return NzCodeEditorModule;
    }());

    exports.NZ_CODE_EDITOR_CONFIG = NZ_CODE_EDITOR_CONFIG;
    exports.NZ_CODE_EDITOR_CONFIG_FACTORY = NZ_CODE_EDITOR_CONFIG_FACTORY;
    exports.NzCodeEditorComponent = NzCodeEditorComponent;
    exports.NzCodeEditorLoadingStatus = NzCodeEditorLoadingStatus;
    exports.NzCodeEditorModule = NzCodeEditorModule;
    exports.NzCodeEditorService = NzCodeEditorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-code-editor.umd.js.map
