(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/cdk/platform'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/resizable', ['exports', '@angular/common', '@angular/core', '@angular/cdk/platform', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].resizable = {}), global.ng.common, global.ng.core, global.ng.cdk.platform, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, platform, util, rxjs, operators) { 'use strict';

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
     * Generated from: resizable-utils.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} event
     * @return {?}
     */
    function getEventWithPoint(event) {
        return util.isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : ((/** @type {?} */ (event)));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: resizable.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzResizableService = /** @class */ (function () {
        function NzResizableService(ngZone, document) {
            this.ngZone = ngZone;
            this.listeners = new Map();
            this.handleMouseDown$ = new rxjs.Subject();
            this.documentMouseUp$ = new rxjs.Subject();
            this.documentMouseMove$ = new rxjs.Subject();
            this.mouseEntered$ = new rxjs.Subject();
            this.document = document;
        }
        /**
         * @param {?} event
         * @return {?}
         */
        NzResizableService.prototype.startResizing = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            /** @type {?} */
            var _isTouchEvent = util.isTouchEvent(event);
            this.clearListeners();
            /** @type {?} */
            var moveEvent = _isTouchEvent ? 'touchmove' : 'mousemove';
            /** @type {?} */
            var upEvent = _isTouchEvent ? 'touchend' : 'mouseup';
            /** @type {?} */
            var moveEventHandler = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.documentMouseMove$.next(e);
            });
            /** @type {?} */
            var upEventHandler = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.documentMouseUp$.next(e);
                _this.clearListeners();
            });
            this.listeners.set(moveEvent, moveEventHandler);
            this.listeners.set(upEvent, upEventHandler);
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.listeners.forEach((/**
                 * @param {?} handler
                 * @param {?} name
                 * @return {?}
                 */
                function (handler, name) {
                    _this.document.addEventListener(name, (/** @type {?} */ (handler)));
                }));
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzResizableService.prototype.clearListeners = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.listeners.forEach((/**
             * @param {?} handler
             * @param {?} name
             * @return {?}
             */
            function (handler, name) {
                _this.document.removeEventListener(name, (/** @type {?} */ (handler)));
            }));
            this.listeners.clear();
        };
        /**
         * @return {?}
         */
        NzResizableService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.handleMouseDown$.complete();
            this.documentMouseUp$.complete();
            this.documentMouseMove$.complete();
            this.mouseEntered$.complete();
            this.clearListeners();
        };
        NzResizableService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NzResizableService.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        return NzResizableService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzResizableService.prototype.document;
        /**
         * @type {?}
         * @private
         */
        NzResizableService.prototype.listeners;
        /** @type {?} */
        NzResizableService.prototype.handleMouseDown$;
        /** @type {?} */
        NzResizableService.prototype.documentMouseUp$;
        /** @type {?} */
        NzResizableService.prototype.documentMouseMove$;
        /** @type {?} */
        NzResizableService.prototype.mouseEntered$;
        /**
         * @type {?}
         * @private
         */
        NzResizableService.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: resizable.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzResizeEvent() { }
    if (false) {
        /** @type {?|undefined} */
        NzResizeEvent.prototype.width;
        /** @type {?|undefined} */
        NzResizeEvent.prototype.height;
        /** @type {?|undefined} */
        NzResizeEvent.prototype.col;
        /** @type {?|undefined} */
        NzResizeEvent.prototype.mouseEvent;
    }
    var NzResizableDirective = /** @class */ (function () {
        function NzResizableDirective(elementRef, renderer, nzResizableService, platform, ngZone) {
            var _this = this;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.nzResizableService = nzResizableService;
            this.platform = platform;
            this.ngZone = ngZone;
            this.nzBounds = 'parent';
            this.nzMinHeight = 40;
            this.nzMinWidth = 40;
            this.nzGridColumnCount = -1;
            this.nzMaxColumn = -1;
            this.nzMinColumn = -1;
            this.nzLockAspectRatio = false;
            this.nzPreview = false;
            this.nzDisabled = false;
            this.nzResize = new core.EventEmitter();
            this.nzResizeEnd = new core.EventEmitter();
            this.nzResizeStart = new core.EventEmitter();
            this.resizing = false;
            this.currentHandleEvent = null;
            this.ghostElement = null;
            this.sizeCache = null;
            this.destroy$ = new rxjs.Subject();
            this.nzResizableService.handleMouseDown$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (_this.nzDisabled) {
                    return;
                }
                _this.resizing = true;
                _this.nzResizableService.startResizing(event.mouseEvent);
                _this.currentHandleEvent = event;
                _this.setCursor();
                _this.nzResizeStart.emit({
                    mouseEvent: event.mouseEvent
                });
                _this.elRect = _this.el.getBoundingClientRect();
            }));
            this.nzResizableService.documentMouseUp$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (_this.resizing) {
                    _this.resizing = false;
                    _this.nzResizableService.documentMouseUp$.next();
                    _this.endResize(event);
                }
            }));
            this.nzResizableService.documentMouseMove$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (_this.resizing) {
                    _this.resize(event);
                }
            }));
        }
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.onMouseenter = /**
         * @return {?}
         */
        function () {
            this.nzResizableService.mouseEntered$.next(true);
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.onMouseleave = /**
         * @return {?}
         */
        function () {
            this.nzResizableService.mouseEntered$.next(false);
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.setPosition = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var position = getComputedStyle(this.el).position;
            if (position === 'static' || !position) {
                this.renderer.setStyle(this.el, 'position', 'relative');
            }
        };
        /**
         * @param {?} width
         * @param {?} height
         * @param {?} ratio
         * @return {?}
         */
        NzResizableDirective.prototype.calcSize = /**
         * @param {?} width
         * @param {?} height
         * @param {?} ratio
         * @return {?}
         */
        function (width, height, ratio) {
            /** @type {?} */
            var newWidth;
            /** @type {?} */
            var newHeight;
            /** @type {?} */
            var maxWidth;
            /** @type {?} */
            var maxHeight;
            /** @type {?} */
            var col = 0;
            /** @type {?} */
            var spanWidth = 0;
            /** @type {?} */
            var minWidth = this.nzMinWidth;
            /** @type {?} */
            var boundWidth = Infinity;
            /** @type {?} */
            var boundHeight = Infinity;
            if (this.nzBounds === 'parent') {
                /** @type {?} */
                var parent_1 = this.renderer.parentNode(this.el);
                if (parent_1 instanceof HTMLElement) {
                    /** @type {?} */
                    var parentRect = parent_1.getBoundingClientRect();
                    boundWidth = parentRect.width;
                    boundHeight = parentRect.height;
                }
            }
            else if (this.nzBounds === 'window') {
                if (typeof window !== 'undefined') {
                    boundWidth = window.innerWidth;
                    boundHeight = window.innerHeight;
                }
            }
            else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
                /** @type {?} */
                var boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
                boundWidth = boundsRect.width;
                boundHeight = boundsRect.height;
            }
            maxWidth = util.ensureInBounds((/** @type {?} */ (this.nzMaxWidth)), boundWidth);
            maxHeight = util.ensureInBounds((/** @type {?} */ (this.nzMaxHeight)), boundHeight);
            if (this.nzGridColumnCount !== -1) {
                spanWidth = maxWidth / this.nzGridColumnCount;
                minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
                maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
            }
            if (ratio !== -1) {
                if (/(left|right)/i.test((/** @type {?} */ (this.currentHandleEvent)).direction)) {
                    newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                    newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                    if (newHeight >= maxHeight || newHeight <= this.nzMinHeight) {
                        newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                    }
                }
                else {
                    newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
                    newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                    if (newWidth >= maxWidth || newWidth <= minWidth) {
                        newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                    }
                }
            }
            else {
                newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
            }
            if (this.nzGridColumnCount !== -1) {
                col = Math.round(newWidth / spanWidth);
                newWidth = col * spanWidth;
            }
            return {
                col: col,
                width: newWidth,
                height: newHeight
            };
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.setCursor = /**
         * @return {?}
         */
        function () {
            switch ((/** @type {?} */ (this.currentHandleEvent)).direction) {
                case 'left':
                case 'right':
                    this.renderer.setStyle(document.body, 'cursor', 'ew-resize');
                    break;
                case 'top':
                case 'bottom':
                    this.renderer.setStyle(document.body, 'cursor', 'ns-resize');
                    break;
                case 'topLeft':
                case 'bottomRight':
                    this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
                    break;
                case 'topRight':
                case 'bottomLeft':
                    this.renderer.setStyle(document.body, 'cursor', 'nesw-resize');
                    break;
            }
            this.renderer.setStyle(document.body, 'user-select', 'none');
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzResizableDirective.prototype.resize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            /** @type {?} */
            var elRect = this.elRect;
            /** @type {?} */
            var resizeEvent = getEventWithPoint(event);
            /** @type {?} */
            var handleEvent = getEventWithPoint((/** @type {?} */ (this.currentHandleEvent)).mouseEvent);
            /** @type {?} */
            var width = elRect.width;
            /** @type {?} */
            var height = elRect.height;
            /** @type {?} */
            var ratio = this.nzLockAspectRatio ? width / height : -1;
            switch ((/** @type {?} */ (this.currentHandleEvent)).direction) {
                case 'bottomRight':
                    width = resizeEvent.clientX - elRect.left;
                    height = resizeEvent.clientY - elRect.top;
                    break;
                case 'bottomLeft':
                    width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                    height = resizeEvent.clientY - elRect.top;
                    break;
                case 'topRight':
                    width = resizeEvent.clientX - elRect.left;
                    height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                    break;
                case 'topLeft':
                    width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                    height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                    break;
                case 'top':
                    height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                    break;
                case 'right':
                    width = resizeEvent.clientX - elRect.left;
                    break;
                case 'bottom':
                    height = resizeEvent.clientY - elRect.top;
                    break;
                case 'left':
                    width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
            }
            /** @type {?} */
            var size = this.calcSize(width, height, ratio);
            this.sizeCache = __assign({}, size);
            this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.nzResize.emit(__assign(__assign({}, size), { mouseEvent: event }));
            }));
            if (this.nzPreview) {
                this.previewResize(size);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzResizableDirective.prototype.endResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            this.renderer.setStyle(document.body, 'cursor', '');
            this.renderer.setStyle(document.body, 'user-select', '');
            this.removeGhostElement();
            /** @type {?} */
            var size = this.sizeCache
                ? __assign({}, this.sizeCache) : {
                width: this.elRect.width,
                height: this.elRect.height
            };
            this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.nzResizeEnd.emit(__assign(__assign({}, size), { mouseEvent: event }));
            }));
            this.sizeCache = null;
            this.currentHandleEvent = null;
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        NzResizableDirective.prototype.previewResize = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var width = _a.width, height = _a.height;
            this.createGhostElement();
            this.renderer.setStyle(this.ghostElement, 'width', width + "px");
            this.renderer.setStyle(this.ghostElement, 'height', height + "px");
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.createGhostElement = /**
         * @return {?}
         */
        function () {
            if (!this.ghostElement) {
                this.ghostElement = this.renderer.createElement('div');
                this.renderer.setAttribute(this.ghostElement, 'class', 'nz-resizable-preview');
            }
            this.renderer.appendChild(this.el, this.ghostElement);
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.removeGhostElement = /**
         * @return {?}
         */
        function () {
            if (this.ghostElement) {
                this.renderer.removeChild(this.el, this.ghostElement);
            }
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            if (this.platform.isBrowser) {
                this.el = this.elementRef.nativeElement;
                this.setPosition();
            }
        };
        /**
         * @return {?}
         */
        NzResizableDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.ghostElement = null;
            this.sizeCache = null;
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzResizableDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-resizable]',
                        exportAs: 'nzResizable',
                        providers: [NzResizableService],
                        host: {
                            '[class.nz-resizable]': 'true',
                            '[class.nz-resizable-resizing]': 'resizing',
                            '[class.nz-resizable-disabled]': 'nzDisabled',
                            '(mouseenter)': 'onMouseenter()',
                            '(mouseleave)': 'onMouseleave()'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzResizableDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: NzResizableService },
            { type: platform.Platform },
            { type: core.NgZone }
        ]; };
        NzResizableDirective.propDecorators = {
            nzBounds: [{ type: core.Input }],
            nzMaxHeight: [{ type: core.Input }],
            nzMaxWidth: [{ type: core.Input }],
            nzMinHeight: [{ type: core.Input }],
            nzMinWidth: [{ type: core.Input }],
            nzGridColumnCount: [{ type: core.Input }],
            nzMaxColumn: [{ type: core.Input }],
            nzMinColumn: [{ type: core.Input }],
            nzLockAspectRatio: [{ type: core.Input }],
            nzPreview: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzResize: [{ type: core.Output }],
            nzResizeEnd: [{ type: core.Output }],
            nzResizeStart: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzResizableDirective.prototype, "nzLockAspectRatio", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzResizableDirective.prototype, "nzPreview", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzResizableDirective.prototype, "nzDisabled", void 0);
        return NzResizableDirective;
    }());
    if (false) {
        /** @type {?} */
        NzResizableDirective.ngAcceptInputType_nzLockAspectRatio;
        /** @type {?} */
        NzResizableDirective.ngAcceptInputType_nzPreview;
        /** @type {?} */
        NzResizableDirective.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzResizableDirective.prototype.nzBounds;
        /** @type {?} */
        NzResizableDirective.prototype.nzMaxHeight;
        /** @type {?} */
        NzResizableDirective.prototype.nzMaxWidth;
        /** @type {?} */
        NzResizableDirective.prototype.nzMinHeight;
        /** @type {?} */
        NzResizableDirective.prototype.nzMinWidth;
        /** @type {?} */
        NzResizableDirective.prototype.nzGridColumnCount;
        /** @type {?} */
        NzResizableDirective.prototype.nzMaxColumn;
        /** @type {?} */
        NzResizableDirective.prototype.nzMinColumn;
        /** @type {?} */
        NzResizableDirective.prototype.nzLockAspectRatio;
        /** @type {?} */
        NzResizableDirective.prototype.nzPreview;
        /** @type {?} */
        NzResizableDirective.prototype.nzDisabled;
        /** @type {?} */
        NzResizableDirective.prototype.nzResize;
        /** @type {?} */
        NzResizableDirective.prototype.nzResizeEnd;
        /** @type {?} */
        NzResizableDirective.prototype.nzResizeStart;
        /** @type {?} */
        NzResizableDirective.prototype.resizing;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.elRect;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.currentHandleEvent;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.ghostElement;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.sizeCache;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.nzResizableService;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzResizableDirective.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: resize-handle.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzResizeHandleMouseDownEvent = /** @class */ (function () {
        function NzResizeHandleMouseDownEvent(direction, mouseEvent) {
            this.direction = direction;
            this.mouseEvent = mouseEvent;
        }
        return NzResizeHandleMouseDownEvent;
    }());
    if (false) {
        /** @type {?} */
        NzResizeHandleMouseDownEvent.prototype.direction;
        /** @type {?} */
        NzResizeHandleMouseDownEvent.prototype.mouseEvent;
    }
    var NzResizeHandleComponent = /** @class */ (function () {
        function NzResizeHandleComponent(nzResizableService, cdr) {
            this.nzResizableService = nzResizableService;
            this.cdr = cdr;
            this.nzDirection = 'bottomRight';
            this.nzMouseDown = new core.EventEmitter();
            this.entered = false;
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzResizeHandleComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzResizableService.mouseEntered$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} entered
             * @return {?}
             */
            function (entered) {
                _this.entered = entered;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzResizeHandleComponent.prototype.onMousedown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.nzResizableService.handleMouseDown$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
        };
        /**
         * @return {?}
         */
        NzResizeHandleComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzResizeHandleComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-resize-handle, [nz-resize-handle]',
                        exportAs: 'nzResizeHandle',
                        template: " <ng-content></ng-content> ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.nz-resizable-handle]': 'true',
                            '[class.nz-resizable-handle-top]': "nzDirection === 'top'",
                            '[class.nz-resizable-handle-right]': "nzDirection === 'right'",
                            '[class.nz-resizable-handle-bottom]': "nzDirection === 'bottom'",
                            '[class.nz-resizable-handle-left]': "nzDirection === 'left'",
                            '[class.nz-resizable-handle-topRight]': "nzDirection === 'topRight'",
                            '[class.nz-resizable-handle-bottomRight]': "nzDirection === 'bottomRight'",
                            '[class.nz-resizable-handle-bottomLeft]': "nzDirection === 'bottomLeft'",
                            '[class.nz-resizable-handle-topLeft]': "nzDirection === 'topLeft'",
                            '[class.nz-resizable-handle-box-hover]': 'entered',
                            '(mousedown)': 'onMousedown($event)',
                            '(touchstart)': 'onMousedown($event)'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzResizeHandleComponent.ctorParameters = function () { return [
            { type: NzResizableService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzResizeHandleComponent.propDecorators = {
            nzDirection: [{ type: core.Input }],
            nzMouseDown: [{ type: core.Output }]
        };
        return NzResizeHandleComponent;
    }());
    if (false) {
        /** @type {?} */
        NzResizeHandleComponent.prototype.nzDirection;
        /** @type {?} */
        NzResizeHandleComponent.prototype.nzMouseDown;
        /** @type {?} */
        NzResizeHandleComponent.prototype.entered;
        /**
         * @type {?}
         * @private
         */
        NzResizeHandleComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzResizeHandleComponent.prototype.nzResizableService;
        /**
         * @type {?}
         * @private
         */
        NzResizeHandleComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: resize-handles.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_RESIZE_DIRECTION = [
        'bottomRight',
        'topRight',
        'bottomLeft',
        'topLeft',
        'bottom',
        'right',
        'top',
        'left'
    ];
    var NzResizeHandlesComponent = /** @class */ (function () {
        function NzResizeHandlesComponent() {
            this.nzDirections = DEFAULT_RESIZE_DIRECTION;
            this.directions = new Set(this.nzDirections);
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzResizeHandlesComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzDirections) {
                this.directions = new Set(changes.nzDirections.currentValue);
            }
        };
        NzResizeHandlesComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-resize-handles',
                        exportAs: 'nzResizeHandles',
                        template: " <nz-resize-handle *ngFor=\"let dir of directions\" [nzDirection]=\"dir\"></nz-resize-handle> ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NzResizeHandlesComponent.ctorParameters = function () { return []; };
        NzResizeHandlesComponent.propDecorators = {
            nzDirections: [{ type: core.Input }]
        };
        return NzResizeHandlesComponent;
    }());
    if (false) {
        /** @type {?} */
        NzResizeHandlesComponent.prototype.nzDirections;
        /** @type {?} */
        NzResizeHandlesComponent.prototype.directions;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: resizable.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzResizableModule = /** @class */ (function () {
        function NzResizableModule() {
        }
        NzResizableModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
                        exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
                    },] }
        ];
        return NzResizableModule;
    }());

    exports.DEFAULT_RESIZE_DIRECTION = DEFAULT_RESIZE_DIRECTION;
    exports.NzResizableDirective = NzResizableDirective;
    exports.NzResizableModule = NzResizableModule;
    exports.NzResizableService = NzResizableService;
    exports.NzResizeHandleComponent = NzResizeHandleComponent;
    exports.NzResizeHandleMouseDownEvent = NzResizeHandleMouseDownEvent;
    exports.NzResizeHandlesComponent = NzResizeHandlesComponent;
    exports.getEventWithPoint = getEventWithPoint;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-resizable.umd.js.map
