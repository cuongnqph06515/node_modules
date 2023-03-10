(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/affix', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].affix = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators));
}(this, (function (exports, platform, common, core, config, services, util, rxjs, operators) { 'use strict';

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
     * Generated from: respond-events.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /** @enum {string} */
    var AffixRespondEvents = {
        resize: "resize",
        scroll: "scroll",
        touchstart: "touchstart",
        touchmove: "touchmove",
        touchend: "touchend",
        pageshow: "pageshow",
        load: "LOAD",
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: utils.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function SimpleRect() { }
    if (false) {
        /** @type {?} */
        SimpleRect.prototype.top;
        /** @type {?} */
        SimpleRect.prototype.left;
        /** @type {?|undefined} */
        SimpleRect.prototype.width;
        /** @type {?|undefined} */
        SimpleRect.prototype.height;
        /** @type {?|undefined} */
        SimpleRect.prototype.bottom;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function isTargetWindow(target) {
        return typeof window !== 'undefined' && target === window;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    function getTargetRect(target) {
        return !isTargetWindow(target)
            ? target.getBoundingClientRect()
            : {
                top: 0,
                left: 0,
                bottom: 0
            };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: affix.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'affix';
    /** @type {?} */
    var NZ_AFFIX_CLS_PREFIX = 'ant-affix';
    /** @type {?} */
    var NZ_AFFIX_DEFAULT_SCROLL_TIME = 20;
    var NzAffixComponent = /** @class */ (function () {
        function NzAffixComponent(el, doc, nzConfigService, scrollSrv, ngZone, platform, renderer) {
            this.nzConfigService = nzConfigService;
            this.scrollSrv = scrollSrv;
            this.ngZone = ngZone;
            this.platform = platform;
            this.renderer = renderer;
            this.nzChange = new core.EventEmitter();
            this.positionChangeSubscription = rxjs.Subscription.EMPTY;
            this.offsetChanged$ = new rxjs.ReplaySubject(1);
            this.destroy$ = new rxjs.Subject();
            // The wrapper would stay at the original position as a placeholder.
            this.placeholderNode = el.nativeElement;
            this.document = doc;
        }
        Object.defineProperty(NzAffixComponent.prototype, "target", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var el = this.nzTarget;
                return (typeof el === 'string' ? this.document.querySelector(el) : el) || window;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        NzAffixComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzOffsetBottom = changes.nzOffsetBottom, nzOffsetTop = changes.nzOffsetTop, nzTarget = changes.nzTarget;
            if (nzOffsetBottom || nzOffsetTop) {
                this.offsetChanged$.next();
            }
            if (nzTarget) {
                this.registerListeners();
            }
        };
        /**
         * @return {?}
         */
        NzAffixComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.registerListeners();
        };
        /**
         * @return {?}
         */
        NzAffixComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.removeListeners();
        };
        /**
         * @private
         * @return {?}
         */
        NzAffixComponent.prototype.registerListeners = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.removeListeners();
            this.positionChangeSubscription = this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                return rxjs.merge.apply(void 0, __spread(Object.keys(AffixRespondEvents).map((/**
                 * @param {?} evName
                 * @return {?}
                 */
                function (evName) { return rxjs.fromEvent(_this.target, evName); })), [_this.offsetChanged$.pipe(operators.takeUntil(_this.destroy$), operators.map((/**
                     * @return {?}
                     */
                    function () { return ({}); })))])).pipe(operators.auditTime(NZ_AFFIX_DEFAULT_SCROLL_TIME))
                    .subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return _this.updatePosition((/** @type {?} */ (e))); }));
            }));
            this.timeout = setTimeout((/**
             * @return {?}
             */
            function () { return _this.updatePosition((/** @type {?} */ ({}))); }));
        };
        /**
         * @private
         * @return {?}
         */
        NzAffixComponent.prototype.removeListeners = /**
         * @private
         * @return {?}
         */
        function () {
            clearTimeout(this.timeout);
            this.positionChangeSubscription.unsubscribe();
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @param {?} element
         * @param {?} target
         * @return {?}
         */
        NzAffixComponent.prototype.getOffset = /**
         * @param {?} element
         * @param {?} target
         * @return {?}
         */
        function (element, target) {
            /** @type {?} */
            var elemRect = element.getBoundingClientRect();
            /** @type {?} */
            var targetRect = getTargetRect((/** @type {?} */ (target)));
            /** @type {?} */
            var scrollTop = this.scrollSrv.getScroll(target, true);
            /** @type {?} */
            var scrollLeft = this.scrollSrv.getScroll(target, false);
            /** @type {?} */
            var docElem = this.document.body;
            /** @type {?} */
            var clientTop = docElem.clientTop || 0;
            /** @type {?} */
            var clientLeft = docElem.clientLeft || 0;
            return {
                top: elemRect.top - targetRect.top + scrollTop - clientTop,
                left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
                width: elemRect.width,
                height: elemRect.height
            };
        };
        /**
         * @private
         * @param {?} e
         * @param {?=} affixStyle
         * @return {?}
         */
        NzAffixComponent.prototype.setAffixStyle = /**
         * @private
         * @param {?} e
         * @param {?=} affixStyle
         * @return {?}
         */
        function (e, affixStyle) {
            /** @type {?} */
            var originalAffixStyle = this.affixStyle;
            /** @type {?} */
            var isWindow = this.target === window;
            if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
                return;
            }
            if (util.shallowEqual(originalAffixStyle, affixStyle)) {
                return;
            }
            /** @type {?} */
            var fixed = !!affixStyle;
            /** @type {?} */
            var wrapEl = this.fixedEl.nativeElement;
            this.renderer.setStyle(wrapEl, 'cssText', util.getStyleAsText(affixStyle));
            this.affixStyle = affixStyle;
            if (fixed) {
                wrapEl.classList.add(NZ_AFFIX_CLS_PREFIX);
            }
            else {
                wrapEl.classList.remove(NZ_AFFIX_CLS_PREFIX);
            }
            if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
                this.nzChange.emit(fixed);
            }
        };
        /**
         * @private
         * @param {?=} placeholderStyle
         * @return {?}
         */
        NzAffixComponent.prototype.setPlaceholderStyle = /**
         * @private
         * @param {?=} placeholderStyle
         * @return {?}
         */
        function (placeholderStyle) {
            /** @type {?} */
            var originalPlaceholderStyle = this.placeholderStyle;
            if (util.shallowEqual(placeholderStyle, originalPlaceholderStyle)) {
                return;
            }
            this.renderer.setStyle(this.placeholderNode, 'cssText', util.getStyleAsText(placeholderStyle));
            this.placeholderStyle = placeholderStyle;
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        NzAffixComponent.prototype.syncPlaceholderStyle = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!this.affixStyle) {
                return;
            }
            this.renderer.setStyle(this.placeholderNode, 'cssText', '');
            this.placeholderStyle = undefined;
            /** @type {?} */
            var styleObj = {
                width: this.placeholderNode.offsetWidth,
                height: this.fixedEl.nativeElement.offsetHeight
            };
            this.setAffixStyle(e, __assign(__assign({}, this.affixStyle), styleObj));
            this.setPlaceholderStyle(styleObj);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzAffixComponent.prototype.updatePosition = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!this.platform.isBrowser) {
                return;
            }
            /** @type {?} */
            var targetNode = this.target;
            /** @type {?} */
            var offsetTop = this.nzOffsetTop;
            /** @type {?} */
            var scrollTop = this.scrollSrv.getScroll(targetNode, true);
            /** @type {?} */
            var elemOffset = this.getOffset(this.placeholderNode, (/** @type {?} */ (targetNode)));
            /** @type {?} */
            var fixedNode = this.fixedEl.nativeElement;
            /** @type {?} */
            var elemSize = {
                width: fixedNode.offsetWidth,
                height: fixedNode.offsetHeight
            };
            /** @type {?} */
            var offsetMode = {
                top: false,
                bottom: false
            };
            // Default to `offsetTop=0`.
            if (typeof offsetTop !== 'number' && typeof this.nzOffsetBottom !== 'number') {
                offsetMode.top = true;
                offsetTop = 0;
            }
            else {
                offsetMode.top = typeof offsetTop === 'number';
                offsetMode.bottom = typeof this.nzOffsetBottom === 'number';
            }
            /** @type {?} */
            var targetRect = getTargetRect((/** @type {?} */ (targetNode)));
            /** @type {?} */
            var targetInnerHeight = ((/** @type {?} */ (targetNode))).innerHeight || ((/** @type {?} */ (targetNode))).clientHeight;
            if (scrollTop >= elemOffset.top - ((/** @type {?} */ (offsetTop))) && offsetMode.top) {
                /** @type {?} */
                var width = elemOffset.width;
                /** @type {?} */
                var top_1 = targetRect.top + ((/** @type {?} */ (offsetTop)));
                this.setAffixStyle(e, {
                    position: 'fixed',
                    top: top_1,
                    left: targetRect.left + elemOffset.left,
                    width: width
                });
                this.setPlaceholderStyle({
                    width: width,
                    height: elemSize.height
                });
            }
            else if (scrollTop <= elemOffset.top + elemSize.height + ((/** @type {?} */ (this.nzOffsetBottom))) - targetInnerHeight && offsetMode.bottom) {
                /** @type {?} */
                var targetBottomOffset = targetNode === window ? 0 : window.innerHeight - (/** @type {?} */ (targetRect.bottom));
                /** @type {?} */
                var width = elemOffset.width;
                this.setAffixStyle(e, {
                    position: 'fixed',
                    bottom: targetBottomOffset + ((/** @type {?} */ (this.nzOffsetBottom))),
                    left: targetRect.left + elemOffset.left,
                    width: width
                });
                this.setPlaceholderStyle({
                    width: width,
                    height: elemOffset.height
                });
            }
            else {
                if (e.type === AffixRespondEvents.resize &&
                    this.affixStyle &&
                    this.affixStyle.position === 'fixed' &&
                    this.placeholderNode.offsetWidth) {
                    this.setAffixStyle(e, __assign(__assign({}, this.affixStyle), { width: this.placeholderNode.offsetWidth }));
                }
                else {
                    this.setAffixStyle(e);
                }
                this.setPlaceholderStyle();
            }
            if (e.type === 'resize') {
                this.syncPlaceholderStyle(e);
            }
        };
        NzAffixComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-affix',
                        exportAs: 'nzAffix',
                        template: "\n    <div #fixedEl>\n      <ng-content></ng-content>\n    </div>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    }] }
        ];
        /** @nocollapse */
        NzAffixComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: config.NzConfigService },
            { type: services.NzScrollService },
            { type: core.NgZone },
            { type: platform.Platform },
            { type: core.Renderer2 }
        ]; };
        NzAffixComponent.propDecorators = {
            fixedEl: [{ type: core.ViewChild, args: ['fixedEl', { static: true },] }],
            nzTarget: [{ type: core.Input }],
            nzOffsetTop: [{ type: core.Input }],
            nzOffsetBottom: [{ type: core.Input }],
            nzChange: [{ type: core.Output }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            util.InputNumber(undefined),
            __metadata("design:type", Object)
        ], NzAffixComponent.prototype, "nzOffsetTop", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            util.InputNumber(undefined),
            __metadata("design:type", Object)
        ], NzAffixComponent.prototype, "nzOffsetBottom", void 0);
        return NzAffixComponent;
    }());
    if (false) {
        /** @type {?} */
        NzAffixComponent.ngAcceptInputType_nzOffsetTop;
        /** @type {?} */
        NzAffixComponent.ngAcceptInputType_nzOffsetBottom;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.fixedEl;
        /** @type {?} */
        NzAffixComponent.prototype.nzTarget;
        /** @type {?} */
        NzAffixComponent.prototype.nzOffsetTop;
        /** @type {?} */
        NzAffixComponent.prototype.nzOffsetBottom;
        /** @type {?} */
        NzAffixComponent.prototype.nzChange;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.placeholderNode;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.affixStyle;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.placeholderStyle;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.positionChangeSubscription;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.offsetChanged$;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.timeout;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.document;
        /** @type {?} */
        NzAffixComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.scrollSrv;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzAffixComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: affix.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzAffixModule = /** @class */ (function () {
        function NzAffixModule() {
        }
        NzAffixModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzAffixComponent],
                        exports: [NzAffixComponent],
                        imports: [common.CommonModule, platform.PlatformModule]
                    },] }
        ];
        return NzAffixModule;
    }());

    exports.NzAffixComponent = NzAffixComponent;
    exports.NzAffixModule = NzAffixModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-affix.umd.js.map
