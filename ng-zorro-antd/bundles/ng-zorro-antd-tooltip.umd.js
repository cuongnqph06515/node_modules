(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/no-animation'), require('@angular/cdk/overlay'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/core/outlet')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/tooltip', ['exports', '@angular/core', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/no-animation', '@angular/cdk/overlay', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/core/outlet'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].tooltip = {}), global.ng.core, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core['no-animation'], global.ng.cdk.overlay, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].core.outlet));
}(this, (function (exports, core, animation, noAnimation, overlay, logger, overlay$1, util, rxjs, operators, common, outlet) { 'use strict';

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
    /**
     * @abstract
     */
    var NzTooltipBaseDirective = /** @class */ (function () {
        function NzTooltipBaseDirective(elementRef, hostView, resolver, renderer, noAnimation) {
            this.elementRef = elementRef;
            this.hostView = hostView;
            this.resolver = resolver;
            this.renderer = renderer;
            this.noAnimation = noAnimation;
            this.specificVisibleChange = new core.EventEmitter();
            /**
             * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
             * Please use a more specific API. Like `nzTooltipTrigger`.
             */
            this.nzTrigger = 'hover';
            /**
             * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
             * Please use a more specific API. Like `nzTooltipPlacement`.
             */
            this.nzPlacement = 'top';
            this.visible = false;
            this.needProxyProperties = ['noAnimation'];
            this.nzVisibleChange = new core.EventEmitter();
            this.destroy$ = new rxjs.Subject();
            this.triggerDisposables = [];
        }
        Object.defineProperty(NzTooltipBaseDirective.prototype, "title", {
            /**
             * This true title that would be used in other parts on this component.
             */
            get: /**
             * This true title that would be used in other parts on this component.
             * @protected
             * @return {?}
             */
            function () {
                return this.specificTitle || this.directiveNameTitle || this.nzTitle || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "content", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificContent || this.directiveNameContent || this.nzContent || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "placement", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificPlacement || this.nzPlacement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "trigger", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                // NzTooltipTrigger can be null.
                return typeof this.specificTrigger !== 'undefined' ? this.specificTrigger : this.nzTrigger;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "isVisible", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificVisible || this.nzVisible || false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "mouseEnterDelay", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificMouseEnterDelay || this.nzMouseEnterDelay || 0.15;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "mouseLeaveDelay", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificMouseLeaveDelay || this.nzMouseLeaveDelay || 0.1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "overlayClassName", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificOverlayClassName || this.nzOverlayClassName || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseDirective.prototype, "overlayStyle", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.specificOverlayStyle || this.nzOverlayStyle || null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} isNeeded
         * @param {?} property
         * @param {?} newProperty
         * @param {?=} comp
         * @param {?=} shared
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.warnDeprecationIfNeeded = /**
         * @param {?} isNeeded
         * @param {?} property
         * @param {?} newProperty
         * @param {?=} comp
         * @param {?=} shared
         * @return {?}
         */
        function (isNeeded, property, newProperty, comp, shared) {
            if (comp === void 0) { comp = 'nz-tooltip'; }
            if (shared === void 0) { shared = true; }
            if (isNeeded) {
                /** @type {?} */
                var message = "'" + property + "' of '" + comp + "' is deprecated and will be removed in 10.0.0.\n      Please use '" + newProperty + "' instead.";
                if (shared) {
                    message = message + " The same with 'nz-popover' and 'nz-popconfirm'.";
                }
                logger.warnDeprecation(message);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.warnDeprecationByChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            // warn deprecated things when specific property is not given
            this.warnDeprecationIfNeeded(changes.nzTitle && !this.specificTitle && !this.directiveNameTitle, 'nzTitle', 'nzTooltipTitle');
            this.warnDeprecationIfNeeded(changes.nzContent && !this.specificContent, 'nzContent', 'nzPopoverContent', 'nz-popover', false);
            this.warnDeprecationIfNeeded(changes.nzPlacement && !this.specificPlacement, 'nzPlacement', 'nzTooltipPlacement');
            this.warnDeprecationIfNeeded(changes.nzTrigger && !this.specificTrigger, 'nzTrigger', 'nzTooltipTrigger');
            this.warnDeprecationIfNeeded(changes.nzVisible && !this.specificVisible, 'nzVisible', 'nzTooltipVisible');
            this.warnDeprecationIfNeeded(changes.nzMouseEnterDelay && !this.specificMouseEnterDelay, 'nzMouseEnterDelay', 'nzTooltipMouseEnterDelay');
            this.warnDeprecationIfNeeded(changes.nzMouseLeaveDelay && !this.specificMouseLeaveDelay, 'nzMouseLeaveDelay', 'nzTooltipMouseLeaveDelay');
            this.warnDeprecationIfNeeded(changes.nzOverlayClassName && !this.specificOverlayClassName, 'nzOverlayClassName', 'nzTooltipClassName');
            this.warnDeprecationIfNeeded(changes.nzOverlayStyle && !this.specificOverlayStyle, 'nzOverlayStyle', 'nzTooltipOverlayStyle');
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzTrigger = changes.nzTrigger, specificTrigger = changes.specificTrigger;
            /** @type {?} */
            var trigger = specificTrigger || nzTrigger;
            if (trigger && !trigger.isFirstChange()) {
                this.registerTriggers();
            }
            if (this.component) {
                this.updateChangedProperties(changes);
            }
            this.warnDeprecationByChanges(changes);
        };
        /**
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.createComponent();
            this.registerTriggers();
        };
        /**
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            // Clear toggling timer. Issue #3875 #4317 #4386
            this.clearTogglingTimer();
            this.removeTriggerListeners();
        };
        /**
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.show = /**
         * @return {?}
         */
        function () {
            var _a;
            (_a = this.component) === null || _a === void 0 ? void 0 : _a.show();
        };
        /**
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.hide = /**
         * @return {?}
         */
        function () {
            var _a;
            (_a = this.component) === null || _a === void 0 ? void 0 : _a.hide();
        };
        /**
         * Force the component to update its position.
         */
        /**
         * Force the component to update its position.
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.updatePosition = /**
         * Force the component to update its position.
         * @return {?}
         */
        function () {
            if (this.component) {
                this.component.updatePosition();
            }
        };
        /**
         * Create a dynamic tooltip component. This method can be override.
         */
        /**
         * Create a dynamic tooltip component. This method can be override.
         * @protected
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.createComponent = /**
         * Create a dynamic tooltip component. This method can be override.
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var componentRef = this.hostView.createComponent(this.componentFactory);
            this.component = componentRef.instance;
            // Remove the component's DOM because it should be in the overlay container.
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
            this.component.setOverlayOrigin({ elementRef: this.specificOrigin || this.elementRef });
            this.updateChangedProperties(this.needProxyProperties);
            this.component.nzVisibleChange.pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} visible
             * @return {?}
             */
            function (visible) {
                _this.visible = visible;
                _this.specificVisibleChange.emit(visible);
                _this.nzVisibleChange.emit(visible);
            }));
        };
        /**
         * @protected
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.registerTriggers = /**
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            // When the method gets invoked, all properties has been synced to the dynamic component.
            // After removing the old API, we can just check the directive's own `nzTrigger`.
            /** @type {?} */
            var el = this.elementRef.nativeElement;
            /** @type {?} */
            var trigger = this.trigger;
            this.removeTriggerListeners();
            if (trigger === 'hover') {
                /** @type {?} */
                var overlayElement_1;
                this.triggerDisposables.push(this.renderer.listen(el, 'mouseenter', (/**
                 * @return {?}
                 */
                function () {
                    _this.delayEnterLeave(true, true, _this.mouseEnterDelay);
                })));
                this.triggerDisposables.push(this.renderer.listen(el, 'mouseleave', (/**
                 * @return {?}
                 */
                function () {
                    var _a;
                    _this.delayEnterLeave(true, false, _this.mouseLeaveDelay);
                    if (((_a = _this.component) === null || _a === void 0 ? void 0 : _a.overlay.overlayRef) && !overlayElement_1) {
                        overlayElement_1 = _this.component.overlay.overlayRef.overlayElement;
                        _this.triggerDisposables.push(_this.renderer.listen(overlayElement_1, 'mouseenter', (/**
                         * @return {?}
                         */
                        function () {
                            _this.delayEnterLeave(false, true);
                        })));
                        _this.triggerDisposables.push(_this.renderer.listen(overlayElement_1, 'mouseleave', (/**
                         * @return {?}
                         */
                        function () {
                            _this.delayEnterLeave(false, false);
                        })));
                    }
                })));
            }
            else if (trigger === 'focus') {
                this.triggerDisposables.push(this.renderer.listen(el, 'focus', (/**
                 * @return {?}
                 */
                function () { return _this.show(); })));
                this.triggerDisposables.push(this.renderer.listen(el, 'blur', (/**
                 * @return {?}
                 */
                function () { return _this.hide(); })));
            }
            else if (trigger === 'click') {
                this.triggerDisposables.push(this.renderer.listen(el, 'click', (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    e.preventDefault();
                    _this.show();
                })));
            } // Else do nothing because user wants to control the visibility programmatically.
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.updatePropertiesByChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            /** @type {?} */
            var properties = {
                specificTitle: ['nzTitle', this.title],
                directiveNameTitle: ['nzTitle', this.title],
                nzTitle: ['nzTitle', this.title],
                specificContent: ['nzContent', this.content],
                directiveNameContent: ['nzContent', this.content],
                nzContent: ['nzContent', this.content],
                specificTrigger: ['nzTrigger', this.trigger],
                nzTrigger: ['nzTrigger', this.trigger],
                specificPlacement: ['nzPlacement', this.placement],
                nzPlacement: ['nzPlacement', this.placement],
                specificVisible: ['nzVisible', this.isVisible],
                nzVisible: ['nzVisible', this.isVisible],
                specificMouseEnterDelay: ['nzMouseEnterDelay', this.mouseEnterDelay],
                nzMouseEnterDelay: ['nzMouseEnterDelay', this.mouseEnterDelay],
                specificMouseLeaveDelay: ['nzMouseLeaveDelay', this.mouseLeaveDelay],
                nzMouseLeaveDelay: ['nzMouseLeaveDelay', this.mouseLeaveDelay],
                specificOverlayClassName: ['nzOverlayClassName', this.overlayClassName],
                nzOverlayClassName: ['nzOverlayClassName', this.overlayClassName],
                specificOverlayStyle: ['nzOverlayStyle', this.overlayStyle],
                nzOverlayStyle: ['nzOverlayStyle', this.overlayStyle]
            };
            /** @type {?} */
            var keys = Object.keys(changes);
            keys.forEach((/**
             * @param {?} property
             * @return {?}
             */
            function (property) {
                // @ts-ignore
                if (properties[property]) {
                    // @ts-ignore
                    var _a = __read(properties[property], 2), name_1 = _a[0], value = _a[1];
                    _this.updateComponentValue(name_1, value);
                }
            }));
        };
        /**
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.updatePropertiesByArray = /**
         * @return {?}
         */
        function () {
            this.updateComponentValue('nzTitle', this.title);
            this.updateComponentValue('nzContent', this.content);
            this.updateComponentValue('nzPlacement', this.placement);
            this.updateComponentValue('nzTrigger', this.trigger);
            this.updateComponentValue('nzVisible', this.isVisible);
            this.updateComponentValue('nzMouseEnterDelay', this.mouseEnterDelay);
            this.updateComponentValue('nzMouseLeaveDelay', this.mouseLeaveDelay);
            this.updateComponentValue('nzOverlayClassName', this.overlayClassName);
            this.updateComponentValue('nzOverlayStyle', this.overlayStyle);
        };
        /**
         * Sync changed properties to the component and trigger change detection in that component.
         */
        /**
         * Sync changed properties to the component and trigger change detection in that component.
         * @protected
         * @param {?} propertiesOrChanges
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.updateChangedProperties = /**
         * Sync changed properties to the component and trigger change detection in that component.
         * @protected
         * @param {?} propertiesOrChanges
         * @return {?}
         */
        function (propertiesOrChanges) {
            var _this = this;
            var _a;
            /** @type {?} */
            var isArray = Array.isArray(propertiesOrChanges);
            /** @type {?} */
            var keys = isArray ? ((/** @type {?} */ (propertiesOrChanges))) : Object.keys(propertiesOrChanges);
            keys.forEach((/**
             * @param {?} property
             * @return {?}
             */
            function (property) {
                if (_this.needProxyProperties.indexOf(property) !== -1) {
                    // @ts-ignore
                    _this.updateComponentValue(property, _this[property]);
                }
            }));
            if (isArray) {
                this.updatePropertiesByArray();
            }
            else {
                this.updatePropertiesByChanges((/** @type {?} */ (propertiesOrChanges)));
            }
            (_a = this.component) === null || _a === void 0 ? void 0 : _a.updateByDirective();
        };
        /**
         * @private
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.updateComponentValue = /**
         * @private
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            if (typeof value !== 'undefined') {
                // @ts-ignore
                this.component[key] = value;
            }
        };
        /**
         * @private
         * @param {?} isOrigin
         * @param {?} isEnter
         * @param {?=} delay
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.delayEnterLeave = /**
         * @private
         * @param {?} isOrigin
         * @param {?} isEnter
         * @param {?=} delay
         * @return {?}
         */
        function (isOrigin, isEnter, delay) {
            var _this = this;
            if (delay === void 0) { delay = -1; }
            if (this.delayTimer) {
                this.clearTogglingTimer();
            }
            else if (delay > 0) {
                this.delayTimer = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.delayTimer = undefined;
                    isEnter ? _this.show() : _this.hide();
                }), delay * 1000);
            }
            else {
                // `isOrigin` is used due to the tooltip will not hide immediately
                // (may caused by the fade-out animation).
                isEnter && isOrigin ? this.show() : this.hide();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.removeTriggerListeners = /**
         * @private
         * @return {?}
         */
        function () {
            this.triggerDisposables.forEach((/**
             * @param {?} dispose
             * @return {?}
             */
            function (dispose) { return dispose(); }));
            this.triggerDisposables.length = 0;
        };
        /**
         * @private
         * @return {?}
         */
        NzTooltipBaseDirective.prototype.clearTogglingTimer = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.delayTimer) {
                clearTimeout(this.delayTimer);
                this.delayTimer = undefined;
            }
        };
        NzTooltipBaseDirective.decorators = [
            { type: core.Directive }
        ];
        /** @nocollapse */
        NzTooltipBaseDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ViewContainerRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Renderer2 },
            { type: noAnimation.NzNoAnimationDirective }
        ]; };
        NzTooltipBaseDirective.propDecorators = {
            nzTitle: [{ type: core.Input }],
            nzContent: [{ type: core.Input }],
            nzTrigger: [{ type: core.Input }],
            nzPlacement: [{ type: core.Input }],
            nzMouseEnterDelay: [{ type: core.Input }],
            nzMouseLeaveDelay: [{ type: core.Input }],
            nzOverlayClassName: [{ type: core.Input }],
            nzOverlayStyle: [{ type: core.Input }],
            nzVisible: [{ type: core.Input }],
            nzVisibleChange: [{ type: core.Output }]
        };
        return NzTooltipBaseDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTooltipBaseDirective.prototype.directiveNameTitle;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificTitle;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.directiveNameContent;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificContent;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificTrigger;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificPlacement;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificOrigin;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificVisible;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificMouseEnterDelay;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificMouseLeaveDelay;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificOverlayClassName;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificOverlayStyle;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.specificVisibleChange;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTitle`.
         * @type {?}
         */
        NzTooltipBaseDirective.prototype.nzTitle;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzPopoverContent`.
         * @type {?}
         */
        NzTooltipBaseDirective.prototype.nzContent;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTrigger`.
         * @type {?}
         */
        NzTooltipBaseDirective.prototype.nzTrigger;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipPlacement`.
         * @type {?}
         */
        NzTooltipBaseDirective.prototype.nzPlacement;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.nzMouseEnterDelay;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.nzMouseLeaveDelay;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.nzOverlayClassName;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.nzOverlayStyle;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.nzVisible;
        /**
         * For create tooltip dynamically. This should be override for each different component.
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.componentFactory;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.visible;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.needProxyProperties;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.nzVisibleChange;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.component;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.destroy$;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.triggerDisposables;
        /**
         * @type {?}
         * @private
         */
        NzTooltipBaseDirective.prototype.delayTimer;
        /** @type {?} */
        NzTooltipBaseDirective.prototype.elementRef;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.hostView;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.resolver;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.renderer;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseDirective.prototype.noAnimation;
    }
    /**
     * @abstract
     */
    var NzTooltipBaseComponent = /** @class */ (function () {
        function NzTooltipBaseComponent(cdr, noAnimation) {
            this.cdr = cdr;
            this.noAnimation = noAnimation;
            this.nzVisibleChange = new rxjs.Subject();
            this.nzTitle = null;
            this.nzContent = null;
            this.nzOverlayStyle = {};
            this._visible = false;
            this._trigger = 'hover';
            this.preferredPlacement = 'top';
            this._classMap = {};
            this._hasBackdrop = false;
            this._prefix = 'ant-tooltip-placement';
            this._positions = __spread(overlay$1.DEFAULT_TOOLTIP_POSITIONS);
        }
        Object.defineProperty(NzTooltipBaseComponent.prototype, "nzVisible", {
            get: /**
             * @return {?}
             */
            function () {
                return this._visible;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var visible = util.toBoolean(value);
                if (this._visible !== visible) {
                    this._visible = visible;
                    this.nzVisibleChange.next(visible);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseComponent.prototype, "nzTrigger", {
            get: /**
             * @return {?}
             */
            function () {
                return this._trigger;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._trigger = value;
                this._hasBackdrop = this._trigger === 'click';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTooltipBaseComponent.prototype, "nzPlacement", {
            get: /**
             * @return {?}
             */
            function () {
                return this.preferredPlacement;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this.preferredPlacement) {
                    this.preferredPlacement = value;
                    this._positions = __spread([overlay$1.POSITION_MAP[this.nzPlacement]], this._positions);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.nzVisibleChange.complete();
        };
        /**
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.show = /**
         * @return {?}
         */
        function () {
            if (this.nzVisible) {
                return;
            }
            if (!this.isEmpty()) {
                this.nzVisible = true;
                this.nzVisibleChange.next(true);
                this.cdr.detectChanges();
            }
        };
        /**
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.hide = /**
         * @return {?}
         */
        function () {
            if (!this.nzVisible) {
                return;
            }
            this.nzVisible = false;
            this.nzVisibleChange.next(false);
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.updateByDirective = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.setClassMap();
            this.cdr.detectChanges();
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.updatePosition();
                _this.updateVisibilityByTitle();
            }));
        };
        /**
         * Force the component to update its position.
         */
        /**
         * Force the component to update its position.
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.updatePosition = /**
         * Force the component to update its position.
         * @return {?}
         */
        function () {
            if (this.origin && this.overlay && this.overlay.overlayRef) {
                this.overlay.overlayRef.updatePosition();
            }
        };
        /**
         * @param {?} position
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.onPositionChange = /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            this.preferredPlacement = (/** @type {?} */ (overlay$1.getPlacementName(position)));
            this.setClassMap();
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.setClassMap = /**
         * @return {?}
         */
        function () {
            var _a;
            this._classMap = (_a = {},
                _a[this.nzOverlayClassName] = true,
                _a[this._prefix + "-" + this.preferredPlacement] = true,
                _a);
        };
        /**
         * @param {?} origin
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.setOverlayOrigin = /**
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            this.origin = origin;
            this.cdr.markForCheck();
        };
        /**
         * Hide the component while the content is empty.
         */
        /**
         * Hide the component while the content is empty.
         * @private
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.updateVisibilityByTitle = /**
         * Hide the component while the content is empty.
         * @private
         * @return {?}
         */
        function () {
            if (this.isEmpty()) {
                this.hide();
            }
        };
        NzTooltipBaseComponent.decorators = [
            { type: core.Directive }
        ];
        /** @nocollapse */
        NzTooltipBaseComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: noAnimation.NzNoAnimationDirective }
        ]; };
        NzTooltipBaseComponent.propDecorators = {
            overlay: [{ type: core.ViewChild, args: ['overlay', { static: false },] }]
        };
        return NzTooltipBaseComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTooltipBaseComponent.ngAcceptInputType_nzVisible;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.overlay;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzVisibleChange;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzTitle;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzContent;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzOverlayClassName;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzOverlayStyle;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzMouseEnterDelay;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.nzMouseLeaveDelay;
        /** @type {?} */
        NzTooltipBaseComponent.prototype._visible;
        /**
         * @type {?}
         * @protected
         */
        NzTooltipBaseComponent.prototype._trigger;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.origin;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.preferredPlacement;
        /** @type {?} */
        NzTooltipBaseComponent.prototype._classMap;
        /** @type {?} */
        NzTooltipBaseComponent.prototype._hasBackdrop;
        /** @type {?} */
        NzTooltipBaseComponent.prototype._prefix;
        /** @type {?} */
        NzTooltipBaseComponent.prototype._positions;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.cdr;
        /** @type {?} */
        NzTooltipBaseComponent.prototype.noAnimation;
        /**
         * Empty component cannot be opened.
         * @abstract
         * @protected
         * @return {?}
         */
        NzTooltipBaseComponent.prototype.isEmpty = function () { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isTooltipEmpty(value) {
        return value instanceof core.TemplateRef ? false : value === '' || !util.isNotNil(value);
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tooltip.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTooltipDirective = /** @class */ (function (_super) {
        __extends(NzTooltipDirective, _super);
        function NzTooltipDirective(elementRef, hostView, resolver, renderer, noAnimation) {
            var _this = _super.call(this, elementRef, hostView, resolver, renderer, noAnimation) || this;
            // tslint:disable-next-line:no-output-rename
            _this.specificVisibleChange = new core.EventEmitter();
            _this.componentFactory = _this.resolver.resolveComponentFactory(NzToolTipComponent);
            return _this;
        }
        NzTooltipDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-tooltip]',
                        exportAs: 'nzTooltip',
                        host: {
                            '[class.ant-tooltip-open]': 'visible'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzTooltipDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ViewContainerRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Renderer2 },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzTooltipDirective.propDecorators = {
            specificTitle: [{ type: core.Input, args: ['nzTooltipTitle',] }],
            directiveNameTitle: [{ type: core.Input, args: ['nz-tooltip',] }],
            specificTrigger: [{ type: core.Input, args: ['nzTooltipTrigger',] }],
            specificPlacement: [{ type: core.Input, args: ['nzTooltipPlacement',] }],
            specificOrigin: [{ type: core.Input, args: ['nzTooltipOrigin',] }],
            specificVisible: [{ type: core.Input, args: ['nzTooltipVisible',] }],
            specificMouseEnterDelay: [{ type: core.Input, args: ['nzTooltipMouseEnterDelay',] }],
            specificMouseLeaveDelay: [{ type: core.Input, args: ['nzTooltipMouseLeaveDelay',] }],
            specificOverlayClassName: [{ type: core.Input, args: ['nzTooltipOverlayClassName',] }],
            specificOverlayStyle: [{ type: core.Input, args: ['nzTooltipOverlayStyle',] }],
            specificVisibleChange: [{ type: core.Output, args: ['nzTooltipVisibleChange',] }]
        };
        return NzTooltipDirective;
    }(NzTooltipBaseDirective));
    if (false) {
        /** @type {?} */
        NzTooltipDirective.prototype.specificTitle;
        /** @type {?} */
        NzTooltipDirective.prototype.directiveNameTitle;
        /** @type {?} */
        NzTooltipDirective.prototype.specificTrigger;
        /** @type {?} */
        NzTooltipDirective.prototype.specificPlacement;
        /** @type {?} */
        NzTooltipDirective.prototype.specificOrigin;
        /** @type {?} */
        NzTooltipDirective.prototype.specificVisible;
        /** @type {?} */
        NzTooltipDirective.prototype.specificMouseEnterDelay;
        /** @type {?} */
        NzTooltipDirective.prototype.specificMouseLeaveDelay;
        /** @type {?} */
        NzTooltipDirective.prototype.specificOverlayClassName;
        /** @type {?} */
        NzTooltipDirective.prototype.specificOverlayStyle;
        /** @type {?} */
        NzTooltipDirective.prototype.specificVisibleChange;
        /** @type {?} */
        NzTooltipDirective.prototype.componentFactory;
    }
    var NzToolTipComponent = /** @class */ (function (_super) {
        __extends(NzToolTipComponent, _super);
        function NzToolTipComponent(cdr, noAnimation) {
            var _this = _super.call(this, cdr, noAnimation) || this;
            _this.noAnimation = noAnimation;
            _this.nzTitle = null;
            return _this;
        }
        /**
         * @protected
         * @return {?}
         */
        NzToolTipComponent.prototype.isEmpty = /**
         * @protected
         * @return {?}
         */
        function () {
            return isTooltipEmpty(this.nzTitle);
        };
        NzToolTipComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tooltip',
                        exportAs: 'nzTooltipComponent',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [animation.zoomBigMotion],
                        template: "\n    <ng-template\n      #overlay=\"cdkConnectedOverlay\"\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayOpen]=\"_visible\"\n      [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n      [cdkConnectedOverlayPositions]=\"_positions\"\n      (backdropClick)=\"hide()\"\n      (detach)=\"hide()\"\n      (positionChange)=\"onPositionChange($event)\"\n    >\n      <div\n        class=\"ant-tooltip\"\n        [ngClass]=\"_classMap\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@zoomBigMotion]=\"'active'\"\n      >\n        <div class=\"ant-tooltip-content\">\n          <div class=\"ant-tooltip-arrow\"></div>\n          <div class=\"ant-tooltip-inner\">\n            <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  ",
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        NzToolTipComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzToolTipComponent.propDecorators = {
            nzTitle: [{ type: core.Input }]
        };
        return NzToolTipComponent;
    }(NzTooltipBaseComponent));
    if (false) {
        /** @type {?} */
        NzToolTipComponent.prototype.nzTitle;
        /** @type {?} */
        NzToolTipComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tooltip.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzToolTipModule = /** @class */ (function () {
        function NzToolTipModule() {
        }
        NzToolTipModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzToolTipComponent, NzTooltipDirective],
                        exports: [NzToolTipComponent, NzTooltipDirective],
                        entryComponents: [NzToolTipComponent],
                        imports: [common.CommonModule, overlay.OverlayModule, outlet.NzOutletModule, overlay$1.NzOverlayModule, noAnimation.NzNoAnimationModule]
                    },] }
        ];
        return NzToolTipModule;
    }());

    exports.NzToolTipComponent = NzToolTipComponent;
    exports.NzToolTipModule = NzToolTipModule;
    exports.NzTooltipBaseComponent = NzTooltipBaseComponent;
    exports.NzTooltipBaseDirective = NzTooltipBaseDirective;
    exports.NzTooltipDirective = NzTooltipDirective;
    exports.isTooltipEmpty = isTooltipEmpty;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-tooltip.umd.js.map
