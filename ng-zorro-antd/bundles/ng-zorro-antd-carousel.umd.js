(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@angular/cdk/keycodes'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/carousel', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', '@angular/cdk/keycodes', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].carousel = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.cdk.keycodes, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators));
}(this, (function (exports, platform, common, core, keycodes, config, services, util, rxjs, operators) { 'use strict';

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
     * Generated from: carousel-content.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCarouselContentDirective = /** @class */ (function () {
        function NzCarouselContentDirective(elementRef, renderer) {
            this.renderer = renderer;
            this._active = false;
            this.el = elementRef.nativeElement;
            this.renderer.addClass(elementRef.nativeElement, 'slick-slide');
        }
        Object.defineProperty(NzCarouselContentDirective.prototype, "isActive", {
            get: /**
             * @return {?}
             */
            function () {
                return this._active;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._active = value;
                if (this.isActive) {
                    this.renderer.addClass(this.el, 'slick-active');
                }
                else {
                    this.renderer.removeClass(this.el, 'slick-active');
                }
            },
            enumerable: true,
            configurable: true
        });
        NzCarouselContentDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-carousel-content]',
                        exportAs: 'nzCarouselContent'
                    },] }
        ];
        /** @nocollapse */
        NzCarouselContentDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzCarouselContentDirective;
    }());
    if (false) {
        /** @type {?} */
        NzCarouselContentDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NzCarouselContentDirective.prototype._active;
        /**
         * @type {?}
         * @private
         */
        NzCarouselContentDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: strategies/base-strategy.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    NzCarouselBaseStrategy = /** @class */ (function () {
        function NzCarouselBaseStrategy(carouselComponent, cdr, renderer) {
            this.cdr = cdr;
            this.renderer = renderer;
            this.carouselComponent = carouselComponent;
        }
        Object.defineProperty(NzCarouselBaseStrategy.prototype, "maxIndex", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.length - 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCarouselBaseStrategy.prototype, "firstEl", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.contents[0].el;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCarouselBaseStrategy.prototype, "lastEl", {
            get: /**
             * @protected
             * @return {?}
             */
            function () {
                return this.contents[this.maxIndex].el;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize dragging sequences.
         * @param contents
         */
        /**
         * Initialize dragging sequences.
         * @param {?} contents
         * @return {?}
         */
        NzCarouselBaseStrategy.prototype.withCarouselContents = /**
         * Initialize dragging sequences.
         * @param {?} contents
         * @return {?}
         */
        function (contents) {
            // TODO: carousel and its contents should be separated.
            /** @type {?} */
            var carousel = (/** @type {?} */ (this.carouselComponent));
            /** @type {?} */
            var rect = carousel.el.getBoundingClientRect();
            this.slickListEl = carousel.slickListEl;
            this.slickTrackEl = carousel.slickTrackEl;
            this.unitWidth = rect.width;
            this.unitHeight = rect.height;
            this.contents = contents ? contents.toArray() : [];
            this.length = this.contents.length;
        };
        /**
         * When user drag the carousel component.
         * @optional
         */
        /**
         * When user drag the carousel component.
         * \@optional
         * @param {?} _vector
         * @return {?}
         */
        NzCarouselBaseStrategy.prototype.dragging = /**
         * When user drag the carousel component.
         * \@optional
         * @param {?} _vector
         * @return {?}
         */
        function (_vector) { };
        /**
         * Destroy a scroll strategy.
         */
        /**
         * Destroy a scroll strategy.
         * @return {?}
         */
        NzCarouselBaseStrategy.prototype.dispose = /**
         * Destroy a scroll strategy.
         * @return {?}
         */
        function () { };
        /**
         * @protected
         * @param {?} f
         * @param {?} t
         * @return {?}
         */
        NzCarouselBaseStrategy.prototype.getFromToInBoundary = /**
         * @protected
         * @param {?} f
         * @param {?} t
         * @return {?}
         */
        function (f, t) {
            /** @type {?} */
            var length = this.maxIndex + 1;
            return { from: (f + length) % length, to: (t + length) % length };
        };
        return NzCarouselBaseStrategy;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.carouselComponent;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.contents;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.slickListEl;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.slickTrackEl;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.length;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.unitWidth;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.unitHeight;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.cdr;
        /**
         * @type {?}
         * @protected
         */
        NzCarouselBaseStrategy.prototype.renderer;
        /**
         * Trigger transition.
         * @abstract
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        NzCarouselBaseStrategy.prototype.switch = function (_f, _t) { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: strategies/opacity-strategy.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCarouselOpacityStrategy = /** @class */ (function (_super) {
        __extends(NzCarouselOpacityStrategy, _super);
        function NzCarouselOpacityStrategy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} contents
         * @return {?}
         */
        NzCarouselOpacityStrategy.prototype.withCarouselContents = /**
         * @param {?} contents
         * @return {?}
         */
        function (contents) {
            var _this = this;
            _super.prototype.withCarouselContents.call(this, contents);
            if (this.contents) {
                this.slickTrackEl.style.width = this.length * this.unitWidth + "px";
                this.contents.forEach((/**
                 * @param {?} content
                 * @param {?} i
                 * @return {?}
                 */
                function (content, i) {
                    _this.renderer.setStyle(content.el, 'opacity', (/** @type {?} */ (_this.carouselComponent)).activeIndex === i ? '1' : '0');
                    _this.renderer.setStyle(content.el, 'position', 'relative');
                    _this.renderer.setStyle(content.el, 'width', _this.unitWidth + "px");
                    _this.renderer.setStyle(content.el, 'left', -_this.unitWidth * i + "px");
                    _this.renderer.setStyle(content.el, 'transition', ['opacity 500ms ease 0s', 'visibility 500ms ease 0s']);
                }));
            }
        };
        /**
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        NzCarouselOpacityStrategy.prototype.switch = /**
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        function (_f, _t) {
            var _this = this;
            var t = this.getFromToInBoundary(_f, _t).to;
            /** @type {?} */
            var complete$ = new rxjs.Subject();
            this.contents.forEach((/**
             * @param {?} content
             * @param {?} i
             * @return {?}
             */
            function (content, i) {
                _this.renderer.setStyle(content.el, 'opacity', t === i ? '1' : '0');
            }));
            setTimeout((/**
             * @return {?}
             */
            function () {
                complete$.next();
                complete$.complete();
            }), (/** @type {?} */ (this.carouselComponent)).nzTransitionSpeed);
            return complete$;
        };
        /**
         * @return {?}
         */
        NzCarouselOpacityStrategy.prototype.dispose = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.contents.forEach((/**
             * @param {?} content
             * @return {?}
             */
            function (content) {
                _this.renderer.setStyle(content.el, 'transition', null);
            }));
            _super.prototype.dispose.call(this);
        };
        return NzCarouselOpacityStrategy;
    }(NzCarouselBaseStrategy));

    /**
     * @fileoverview added by tsickle
     * Generated from: strategies/transform-strategy.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCarouselTransformStrategy = /** @class */ (function (_super) {
        __extends(NzCarouselTransformStrategy, _super);
        function NzCarouselTransformStrategy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isDragging = false;
            _this.isTransitioning = false;
            return _this;
        }
        Object.defineProperty(NzCarouselTransformStrategy.prototype, "vertical", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return (/** @type {?} */ (this.carouselComponent)).vertical;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.dispose = /**
         * @return {?}
         */
        function () {
            _super.prototype.dispose.call(this);
            this.renderer.setStyle(this.slickTrackEl, 'transform', null);
        };
        /**
         * @param {?} contents
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.withCarouselContents = /**
         * @param {?} contents
         * @return {?}
         */
        function (contents) {
            var _this = this;
            _super.prototype.withCarouselContents.call(this, contents);
            /** @type {?} */
            var carousel = (/** @type {?} */ (this.carouselComponent));
            /** @type {?} */
            var activeIndex = carousel.activeIndex;
            if (this.contents.length) {
                this.renderer.setStyle(this.slickListEl, 'height', this.unitHeight + "px");
                if (this.vertical) {
                    this.renderer.setStyle(this.slickTrackEl, 'width', this.unitWidth + "px");
                    this.renderer.setStyle(this.slickTrackEl, 'height', this.length * this.unitHeight + "px");
                    this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(0, " + -activeIndex * this.unitHeight + "px, 0)");
                }
                else {
                    this.renderer.setStyle(this.slickTrackEl, 'height', this.unitHeight + "px");
                    this.renderer.setStyle(this.slickTrackEl, 'width', this.length * this.unitWidth + "px");
                    this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(" + -activeIndex * this.unitWidth + "px, 0, 0)");
                }
                this.contents.forEach((/**
                 * @param {?} content
                 * @return {?}
                 */
                function (content) {
                    _this.renderer.setStyle(content.el, 'position', 'relative');
                    _this.renderer.setStyle(content.el, 'width', _this.unitWidth + "px");
                    _this.renderer.setStyle(content.el, 'height', _this.unitHeight + "px");
                }));
            }
        };
        /**
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.switch = /**
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        function (_f, _t) {
            var _this = this;
            var t = this.getFromToInBoundary(_f, _t).to;
            /** @type {?} */
            var complete$ = new rxjs.Subject();
            this.renderer.setStyle(this.slickTrackEl, 'transition', "transform " + (/** @type {?} */ (this.carouselComponent)).nzTransitionSpeed + "ms ease");
            if (this.vertical) {
                this.verticalTransform(_f, _t);
            }
            else {
                this.horizontalTransform(_f, _t);
            }
            this.isTransitioning = true;
            this.isDragging = false;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.renderer.setStyle(_this.slickTrackEl, 'transition', null);
                _this.contents.forEach((/**
                 * @param {?} content
                 * @return {?}
                 */
                function (content) {
                    _this.renderer.setStyle(content.el, _this.vertical ? 'top' : 'left', null);
                }));
                if (_this.vertical) {
                    _this.renderer.setStyle(_this.slickTrackEl, 'transform', "translate3d(0, " + -t * _this.unitHeight + "px, 0)");
                }
                else {
                    _this.renderer.setStyle(_this.slickTrackEl, 'transform', "translate3d(" + -t * _this.unitWidth + "px, 0, 0)");
                }
                _this.isTransitioning = false;
                complete$.next();
                complete$.complete();
            }), (/** @type {?} */ (this.carouselComponent)).nzTransitionSpeed);
            return complete$.asObservable();
        };
        /**
         * @param {?} _vector
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.dragging = /**
         * @param {?} _vector
         * @return {?}
         */
        function (_vector) {
            if (this.isTransitioning) {
                return;
            }
            /** @type {?} */
            var activeIndex = (/** @type {?} */ (this.carouselComponent)).activeIndex;
            if ((/** @type {?} */ (this.carouselComponent)).vertical) {
                if (!this.isDragging && this.length > 2) {
                    if (activeIndex === this.maxIndex) {
                        this.prepareVerticalContext(true);
                    }
                    else if (activeIndex === 0) {
                        this.prepareVerticalContext(false);
                    }
                }
                this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(0, " + (-activeIndex * this.unitHeight + _vector.x) + "px, 0)");
            }
            else {
                if (!this.isDragging && this.length > 2) {
                    if (activeIndex === this.maxIndex) {
                        this.prepareHorizontalContext(true);
                    }
                    else if (activeIndex === 0) {
                        this.prepareHorizontalContext(false);
                    }
                }
                this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(" + (-activeIndex * this.unitWidth + _vector.x) + "px, 0, 0)");
            }
            this.isDragging = true;
        };
        /**
         * @private
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.verticalTransform = /**
         * @private
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        function (_f, _t) {
            var _a = this.getFromToInBoundary(_f, _t), f = _a.from, t = _a.to;
            /** @type {?} */
            var needToAdjust = this.length > 2 && _t !== t;
            if (needToAdjust) {
                this.prepareVerticalContext(t < f);
                this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(0, " + -_t * this.unitHeight + "px, 0)");
            }
            else {
                this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(0, " + -t * this.unitHeight + "px, 0");
            }
        };
        /**
         * @private
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.horizontalTransform = /**
         * @private
         * @param {?} _f
         * @param {?} _t
         * @return {?}
         */
        function (_f, _t) {
            var _a = this.getFromToInBoundary(_f, _t), f = _a.from, t = _a.to;
            /** @type {?} */
            var needToAdjust = this.length > 2 && _t !== t;
            if (needToAdjust) {
                this.prepareHorizontalContext(t < f);
                this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(" + -_t * this.unitWidth + "px, 0, 0)");
            }
            else {
                this.renderer.setStyle(this.slickTrackEl, 'transform', "translate3d(" + -t * this.unitWidth + "px, 0, 0");
            }
        };
        /**
         * @private
         * @param {?} lastToFirst
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.prepareVerticalContext = /**
         * @private
         * @param {?} lastToFirst
         * @return {?}
         */
        function (lastToFirst) {
            if (lastToFirst) {
                this.renderer.setStyle(this.firstEl, 'top', this.length * this.unitHeight + "px");
                this.renderer.setStyle(this.lastEl, 'top', null);
            }
            else {
                this.renderer.setStyle(this.firstEl, 'top', null);
                this.renderer.setStyle(this.lastEl, 'top', -this.unitHeight * this.length + "px");
            }
        };
        /**
         * @private
         * @param {?} lastToFirst
         * @return {?}
         */
        NzCarouselTransformStrategy.prototype.prepareHorizontalContext = /**
         * @private
         * @param {?} lastToFirst
         * @return {?}
         */
        function (lastToFirst) {
            if (lastToFirst) {
                this.renderer.setStyle(this.firstEl, 'left', this.length * this.unitWidth + "px");
                this.renderer.setStyle(this.lastEl, 'left', null);
            }
            else {
                this.renderer.setStyle(this.firstEl, 'left', null);
                this.renderer.setStyle(this.lastEl, 'left', -this.unitWidth * this.length + "px");
            }
        };
        return NzCarouselTransformStrategy;
    }(NzCarouselBaseStrategy));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzCarouselTransformStrategy.prototype.isDragging;
        /**
         * @type {?}
         * @private
         */
        NzCarouselTransformStrategy.prototype.isTransitioning;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: typings.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzCarouselComponentAsSource() { }
    if (false) {
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.carouselContents;
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.el;
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.nzTransitionSpeed;
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.vertical;
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.slickListEl;
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.slickTrackEl;
        /** @type {?} */
        NzCarouselComponentAsSource.prototype.activeIndex;
    }
    /**
     * @record
     */
    function NzCarouselStrategyRegistryItem() { }
    if (false) {
        /** @type {?} */
        NzCarouselStrategyRegistryItem.prototype.name;
        /** @type {?} */
        NzCarouselStrategyRegistryItem.prototype.strategy;
    }
    /** @type {?} */
    var NZ_CAROUSEL_CUSTOM_STRATEGIES = new core.InjectionToken('nz-carousel-custom-strategies');
    /**
     * @record
     */
    function PointerVector() { }
    if (false) {
        /** @type {?} */
        PointerVector.prototype.x;
        /** @type {?} */
        PointerVector.prototype.y;
    }
    /**
     * @record
     */
    function FromToInterface() { }
    if (false) {
        /** @type {?} */
        FromToInterface.prototype.from;
        /** @type {?} */
        FromToInterface.prototype.to;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: carousel.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'carousel';
    var NzCarouselComponent = /** @class */ (function () {
        function NzCarouselComponent(elementRef, nzConfigService, renderer, cdr, platform, resizeService, nzDragService, customStrategies) {
            var _this = this;
            this.nzConfigService = nzConfigService;
            this.renderer = renderer;
            this.cdr = cdr;
            this.platform = platform;
            this.resizeService = resizeService;
            this.nzDragService = nzDragService;
            this.customStrategies = customStrategies;
            this.nzEffect = 'scrollx';
            this.nzEnableSwipe = true;
            this.nzDots = true;
            this.nzAutoPlay = false;
            this.nzAutoPlaySpeed = 3000;
            this.nzTransitionSpeed = 500;
            this._dotPosition = 'bottom';
            this.nzBeforeChange = new core.EventEmitter();
            this.nzAfterChange = new core.EventEmitter();
            this.activeIndex = 0;
            this.vertical = false;
            this.transitionInProgress = null;
            this.destroy$ = new rxjs.Subject();
            this.gestureRect = null;
            this.pointerDelta = null;
            this.isTransiting = false;
            this.isDragging = false;
            /**
             * Drag carousel.
             */
            this.pointerDown = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (!_this.isDragging && !_this.isTransiting && _this.nzEnableSwipe) {
                    _this.clearScheduledTransition();
                    _this.gestureRect = _this.slickListEl.getBoundingClientRect();
                    _this.nzDragService.requestDraggingSequence(event).subscribe((/**
                     * @param {?} delta
                     * @return {?}
                     */
                    function (delta) {
                        var _a;
                        _this.pointerDelta = delta;
                        _this.isDragging = true;
                        (_a = _this.strategy) === null || _a === void 0 ? void 0 : _a.dragging(_this.pointerDelta);
                    }), (/**
                     * @return {?}
                     */
                    function () { }), (/**
                     * @return {?}
                     */
                    function () {
                        if (_this.nzEnableSwipe && _this.isDragging) {
                            /** @type {?} */
                            var xDelta = _this.pointerDelta ? _this.pointerDelta.x : 0;
                            // Switch to another slide if delta is bigger than third of the width.
                            if (Math.abs(xDelta) > (/** @type {?} */ (_this.gestureRect)).width / 3) {
                                _this.goTo(xDelta > 0 ? _this.activeIndex - 1 : _this.activeIndex + 1);
                            }
                            else {
                                _this.goTo(_this.activeIndex);
                            }
                            _this.gestureRect = null;
                            _this.pointerDelta = null;
                        }
                        _this.isDragging = false;
                    }));
                }
            });
            this.nzDotPosition = 'bottom';
            this.renderer.addClass(elementRef.nativeElement, 'ant-carousel');
            this.el = elementRef.nativeElement;
        }
        Object.defineProperty(NzCarouselComponent.prototype, "nzDotPosition", {
            get: /**
             * @return {?}
             */
            function () {
                return this._dotPosition;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._dotPosition = value;
                if (value === 'left' || value === 'right') {
                    this.vertical = true;
                }
                else {
                    this.vertical = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzCarouselComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.markContentActive(0);
        };
        /**
         * @return {?}
         */
        NzCarouselComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.platform.isBrowser) {
                return;
            }
            this.slickListEl = (/** @type {?} */ (this.slickList)).nativeElement;
            this.slickTrackEl = (/** @type {?} */ (this.slickTrack)).nativeElement;
            this.carouselContents.changes.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.markContentActive(0);
                _this.syncStrategy();
            }));
            this.resizeService
                .subscribe()
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.syncStrategy();
            }));
            this.switchStrategy();
            this.markContentActive(0);
            this.syncStrategy();
            // If embedded in an entry component, it may do initial render at a inappropriate time.
            // ngZone.onStable won't do this trick
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                _this.syncStrategy();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzCarouselComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzEffect = changes.nzEffect, nzDotPosition = changes.nzDotPosition;
            if (nzEffect && !nzEffect.isFirstChange()) {
                this.switchStrategy();
                this.markContentActive(0);
                this.syncStrategy();
            }
            if (nzDotPosition && !nzDotPosition.isFirstChange()) {
                this.switchStrategy();
                this.markContentActive(0);
                this.syncStrategy();
            }
            if (!this.nzAutoPlay || !this.nzAutoPlaySpeed) {
                this.clearScheduledTransition();
            }
            else {
                this.scheduleNextTransition();
            }
        };
        /**
         * @return {?}
         */
        NzCarouselComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.clearScheduledTransition();
            if (this.strategy) {
                this.strategy.dispose();
            }
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzCarouselComponent.prototype.onKeyDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.keyCode === keycodes.LEFT_ARROW) {
                e.preventDefault();
                this.pre();
            }
            else if (e.keyCode === keycodes.RIGHT_ARROW) {
                this.next();
                e.preventDefault();
            }
        };
        /**
         * @return {?}
         */
        NzCarouselComponent.prototype.next = /**
         * @return {?}
         */
        function () {
            this.goTo(this.activeIndex + 1);
        };
        /**
         * @return {?}
         */
        NzCarouselComponent.prototype.pre = /**
         * @return {?}
         */
        function () {
            this.goTo(this.activeIndex - 1);
        };
        /**
         * @param {?} index
         * @return {?}
         */
        NzCarouselComponent.prototype.goTo = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            var _this = this;
            if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
                /** @type {?} */
                var length_1 = this.carouselContents.length;
                /** @type {?} */
                var from = this.activeIndex;
                /** @type {?} */
                var to = (index + length_1) % length_1;
                this.isTransiting = true;
                this.nzBeforeChange.emit({ from: from, to: to });
                (/** @type {?} */ (this.strategy)).switch(this.activeIndex, index).subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.scheduleNextTransition();
                    _this.nzAfterChange.emit(index);
                    _this.isTransiting = false;
                }));
                this.markContentActive(to);
                this.cdr.markForCheck();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCarouselComponent.prototype.switchStrategy = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.strategy) {
                this.strategy.dispose();
            }
            // Load custom strategies first.
            /** @type {?} */
            var customStrategy = this.customStrategies ? this.customStrategies.find((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.name === _this.nzEffect; })) : null;
            if (customStrategy) {
                this.strategy = new ((/** @type {?} */ (customStrategy.strategy)))(this, this.cdr, this.renderer);
                return;
            }
            this.strategy =
                this.nzEffect === 'scrollx'
                    ? new NzCarouselTransformStrategy(this, this.cdr, this.renderer)
                    : new NzCarouselOpacityStrategy(this, this.cdr, this.renderer);
        };
        /**
         * @private
         * @return {?}
         */
        NzCarouselComponent.prototype.scheduleNextTransition = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.clearScheduledTransition();
            if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0 && this.platform.isBrowser) {
                this.transitionInProgress = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.goTo(_this.activeIndex + 1);
                }), this.nzAutoPlaySpeed);
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCarouselComponent.prototype.clearScheduledTransition = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.transitionInProgress) {
                clearTimeout(this.transitionInProgress);
                this.transitionInProgress = null;
            }
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        NzCarouselComponent.prototype.markContentActive = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.activeIndex = index;
            if (this.carouselContents) {
                this.carouselContents.forEach((/**
                 * @param {?} slide
                 * @param {?} i
                 * @return {?}
                 */
                function (slide, i) {
                    slide.isActive = index === i;
                }));
            }
            this.cdr.markForCheck();
        };
        /**
         * @private
         * @return {?}
         */
        NzCarouselComponent.prototype.syncStrategy = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.strategy) {
                this.strategy.withCarouselContents(this.carouselContents);
            }
        };
        NzCarouselComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-carousel',
                        exportAs: 'nzCarousel',
                        preserveWhitespaces: false,
                        template: "\n    <div class=\"slick-initialized slick-slider\" [class.slick-vertical]=\"nzDotPosition === 'left' || nzDotPosition === 'right'\">\n      <div\n        #slickList\n        class=\"slick-list\"\n        tabindex=\"-1\"\n        (keydown)=\"onKeyDown($event)\"\n        (mousedown)=\"pointerDown($event)\"\n        (touchstart)=\"pointerDown($event)\"\n      >\n        <!-- Render carousel items. -->\n        <div class=\"slick-track\" #slickTrack>\n          <ng-content></ng-content>\n        </div>\n      </div>\n      <!-- Render dots. -->\n      <ul\n        class=\"slick-dots\"\n        *ngIf=\"nzDots\"\n        [class.slick-dots-top]=\"nzDotPosition === 'top'\"\n        [class.slick-dots-bottom]=\"nzDotPosition === 'bottom'\"\n        [class.slick-dots-left]=\"nzDotPosition === 'left'\"\n        [class.slick-dots-right]=\"nzDotPosition === 'right'\"\n      >\n        <li *ngFor=\"let content of carouselContents; let i = index\" [class.slick-active]=\"content.isActive\" (click)=\"goTo(i)\">\n          <ng-template [ngTemplateOutlet]=\"nzDotRender || renderDotTemplate\" [ngTemplateOutletContext]=\"{ $implicit: i }\"> </ng-template>\n        </li>\n      </ul>\n    </div>\n\n    <ng-template #renderDotTemplate let-index>\n      <button>{{ index + 1 }}</button>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-carousel-vertical]': 'vertical'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCarouselComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: config.NzConfigService },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef },
            { type: platform.Platform },
            { type: services.NzResizeService },
            { type: services.NzDragService },
            { type: Array, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NZ_CAROUSEL_CUSTOM_STRATEGIES,] }] }
        ]; };
        NzCarouselComponent.propDecorators = {
            carouselContents: [{ type: core.ContentChildren, args: [NzCarouselContentDirective,] }],
            slickList: [{ type: core.ViewChild, args: ['slickList', { static: false },] }],
            slickTrack: [{ type: core.ViewChild, args: ['slickTrack', { static: false },] }],
            nzDotRender: [{ type: core.Input }],
            nzEffect: [{ type: core.Input }],
            nzEnableSwipe: [{ type: core.Input }],
            nzDots: [{ type: core.Input }],
            nzAutoPlay: [{ type: core.Input }],
            nzAutoPlaySpeed: [{ type: core.Input }],
            nzTransitionSpeed: [{ type: core.Input }],
            nzDotPosition: [{ type: core.Input }],
            nzBeforeChange: [{ type: core.Output }],
            nzAfterChange: [{ type: core.Output }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzCarouselComponent.prototype, "nzEffect", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCarouselComponent.prototype, "nzEnableSwipe", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCarouselComponent.prototype, "nzDots", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzCarouselComponent.prototype, "nzAutoPlay", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputNumber(),
            __metadata("design:type", Number)
        ], NzCarouselComponent.prototype, "nzAutoPlaySpeed", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Object)
        ], NzCarouselComponent.prototype, "nzTransitionSpeed", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], NzCarouselComponent.prototype, "nzDotPosition", null);
        return NzCarouselComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCarouselComponent.ngAcceptInputType_nzEnableSwipe;
        /** @type {?} */
        NzCarouselComponent.ngAcceptInputType_nzDots;
        /** @type {?} */
        NzCarouselComponent.ngAcceptInputType_nzAutoPlay;
        /** @type {?} */
        NzCarouselComponent.ngAcceptInputType_nzAutoPlaySpeed;
        /** @type {?} */
        NzCarouselComponent.ngAcceptInputType_nzTransitionSpeed;
        /** @type {?} */
        NzCarouselComponent.prototype.carouselContents;
        /** @type {?} */
        NzCarouselComponent.prototype.slickList;
        /** @type {?} */
        NzCarouselComponent.prototype.slickTrack;
        /** @type {?} */
        NzCarouselComponent.prototype.nzDotRender;
        /** @type {?} */
        NzCarouselComponent.prototype.nzEffect;
        /** @type {?} */
        NzCarouselComponent.prototype.nzEnableSwipe;
        /** @type {?} */
        NzCarouselComponent.prototype.nzDots;
        /** @type {?} */
        NzCarouselComponent.prototype.nzAutoPlay;
        /** @type {?} */
        NzCarouselComponent.prototype.nzAutoPlaySpeed;
        /** @type {?} */
        NzCarouselComponent.prototype.nzTransitionSpeed;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype._dotPosition;
        /** @type {?} */
        NzCarouselComponent.prototype.nzBeforeChange;
        /** @type {?} */
        NzCarouselComponent.prototype.nzAfterChange;
        /** @type {?} */
        NzCarouselComponent.prototype.activeIndex;
        /** @type {?} */
        NzCarouselComponent.prototype.el;
        /** @type {?} */
        NzCarouselComponent.prototype.slickListEl;
        /** @type {?} */
        NzCarouselComponent.prototype.slickTrackEl;
        /** @type {?} */
        NzCarouselComponent.prototype.strategy;
        /** @type {?} */
        NzCarouselComponent.prototype.vertical;
        /** @type {?} */
        NzCarouselComponent.prototype.transitionInProgress;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.gestureRect;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.pointerDelta;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.isTransiting;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.isDragging;
        /**
         * Drag carousel.
         * @type {?}
         */
        NzCarouselComponent.prototype.pointerDown;
        /** @type {?} */
        NzCarouselComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.resizeService;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.nzDragService;
        /**
         * @type {?}
         * @private
         */
        NzCarouselComponent.prototype.customStrategies;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: carousel.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCarouselModule = /** @class */ (function () {
        function NzCarouselModule() {
        }
        NzCarouselModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzCarouselComponent, NzCarouselContentDirective],
                        exports: [NzCarouselComponent, NzCarouselContentDirective],
                        imports: [common.CommonModule, platform.PlatformModule]
                    },] }
        ];
        return NzCarouselModule;
    }());

    exports.NZ_CAROUSEL_CUSTOM_STRATEGIES = NZ_CAROUSEL_CUSTOM_STRATEGIES;
    exports.NzCarouselBaseStrategy = NzCarouselBaseStrategy;
    exports.NzCarouselComponent = NzCarouselComponent;
    exports.NzCarouselContentDirective = NzCarouselContentDirective;
    exports.NzCarouselModule = NzCarouselModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-carousel.umd.js.map
