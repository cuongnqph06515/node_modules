(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/core/testing'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/testing', ['exports', '@angular/core', '@angular/common', '@angular/core/testing', '@angular/platform-browser/animations'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.testing = {}), global.ng.core, global.ng.common, global.ng.core.testing, global.ng.platformBrowser.animations));
}(this, (function (exports, core, common, testing, animations) { 'use strict';

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
     * Generated from: event-objects.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates a browser MouseEvent with the specified options.
     * @param {?} type
     * @param {?=} x
     * @param {?=} y
     * @param {?=} button
     * @return {?}
     */
    function createMouseEvent(type, x, y, button) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (button === void 0) { button = 0; }
        /** @type {?} */
        var event = document.createEvent('MouseEvent');
        event.initMouseEvent(type, true /* canBubble */, false /* cancelable */, window /* view */, 0 /* detail */, x /* screenX */, y /* screenY */, x /* clientX */, y /* clientY */, false /* ctrlKey */, false /* altKey */, false /* shiftKey */, false /* metaKey */, button /* button */, null /* relatedTarget */);
        // `initMouseEvent` doesn't allow us to pass the `buttons` and
        // defaults it to 0 which looks like a fake event.
        Object.defineProperty(event, 'buttons', { get: (/**
             * @return {?}
             */
            function () { return 1; }) });
        return event;
    }
    /**
     * Creates a browser TouchEvent with the specified pointer coordinates.
     * @param {?} type
     * @param {?=} pageX
     * @param {?=} pageY
     * @return {?}
     */
    function createTouchEvent(type, pageX, pageY) {
        if (pageX === void 0) { pageX = 0; }
        if (pageY === void 0) { pageY = 0; }
        // In favor of creating events that work for most of the browsers, the event is created
        // as a basic UI Event. The necessary details for the event will be set manually.
        /** @type {?} */
        var event = new UIEvent(type, { detail: 0, view: window });
        /** @type {?} */
        var touchDetails = { pageX: pageX, pageY: pageY, clientX: pageX, clientY: pageY };
        // Most of the browsers don't have a "initTouchEvent" method that can be used to define
        // the touch details.
        Object.defineProperties(event, {
            touches: { value: [touchDetails] },
            targetTouches: { value: [touchDetails] },
            changedTouches: { value: [touchDetails] }
        });
        return event;
    }
    /**
     * Dispatches a keydown event from an element.
     * @param {?} type
     * @param {?} keyCode
     * @param {?=} target
     * @param {?=} key
     * @param {?=} ctrlKey
     * @param {?=} metaKey
     * @param {?=} shiftKey
     * @return {?}
     */
    function createKeyboardEvent(type, keyCode, target, key, ctrlKey, metaKey, shiftKey) {
        /** @type {?} */
        var event = (/** @type {?} */ (document.createEvent('KeyboardEvent')));
        /** @type {?} */
        var originalPreventDefault = event.preventDefault;
        // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
        if (event.initKeyEvent) {
            event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
        }
        else {
            event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
        }
        // Webkit Browsers don't set the keyCode when calling the init function.
        // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
        Object.defineProperties(event, {
            keyCode: { get: (/**
                 * @return {?}
                 */
                function () { return keyCode; }) },
            key: { get: (/**
                 * @return {?}
                 */
                function () { return key; }) },
            target: { get: (/**
                 * @return {?}
                 */
                function () { return target; }) },
            ctrlKey: { get: (/**
                 * @return {?}
                 */
                function () { return ctrlKey; }) },
            metaKey: { get: (/**
                 * @return {?}
                 */
                function () { return metaKey; }) },
            shiftKey: { get: (/**
                 * @return {?}
                 */
                function () { return shiftKey; }) }
        });
        // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
        // tslint:disable-next-line:typedef
        event.preventDefault = (/**
         * @return {?}
         */
        function () {
            Object.defineProperty(event, 'defaultPrevented', { get: (/**
                 * @return {?}
                 */
                function () { return true; }), configurable: true });
            // tslint:disable-next-line:no-invalid-this
            return originalPreventDefault.apply(this, arguments);
        });
        return event;
    }
    /**
     * Creates a fake event object with any desired event type.
     * @param {?} type
     * @param {?=} canBubble
     * @param {?=} cancelable
     * @return {?}
     */
    function createFakeEvent(type, canBubble, cancelable) {
        if (canBubble === void 0) { canBubble = true; }
        if (cancelable === void 0) { cancelable = true; }
        /** @type {?} */
        var event = document.createEvent('Event');
        event.initEvent(type, canBubble, cancelable);
        return event;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: dispatch-events.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Utility to dispatch any event on a Node.
     * @param {?} node
     * @param {?} event
     * @return {?}
     */
    function dispatchEvent(node, event) {
        node.dispatchEvent(event);
        return event;
    }
    /**
     * Shorthand to dispatch a fake event on a specified node.
     * @param {?} node
     * @param {?} type
     * @param {?=} canBubble
     * @return {?}
     */
    function dispatchFakeEvent(node, type, canBubble) {
        return dispatchEvent(node, createFakeEvent(type, canBubble));
    }
    /**
     * Shorthand to dispatch a keyboard event with a specified key code.
     * @param {?} node
     * @param {?} type
     * @param {?} keyCode
     * @param {?=} target
     * @return {?}
     */
    function dispatchKeyboardEvent(node, type, keyCode, target) {
        return (/** @type {?} */ (dispatchEvent(node, createKeyboardEvent(type, keyCode, target))));
    }
    /**
     * Shorthand to dispatch a mouse event on the specified coordinates.
     * @param {?} node
     * @param {?} type
     * @param {?=} x
     * @param {?=} y
     * @param {?=} event
     * @return {?}
     */
    function dispatchMouseEvent(node, type, x, y, event) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (event === void 0) { event = createMouseEvent(type, x, y); }
        return (/** @type {?} */ (dispatchEvent(node, event)));
    }
    /**
     * Shorthand to dispatch a touch event on the specified coordinates.
     * @param {?} node
     * @param {?} type
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    function dispatchTouchEvent(node, type, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return (/** @type {?} */ (dispatchEvent(node, createTouchEvent(type, x, y))));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: type-in-element.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Focuses an input, sets its value and dispatches
     * the `input` event, simulating the user typing.
     * @param {?} value Value to be set on the input.
     * @param {?} element Element onto which to set the value.
     * @return {?}
     */
    function typeInElement(value, element) {
        element.focus();
        element.value = value;
        dispatchFakeEvent(element, 'input');
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: wrapped-error-message.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Gets a RegExp used to detect an angular wrapped error message.
     * See https://github.com/angular/angular/issues/8348
     * @param {?} e
     * @return {?}
     */
    function wrappedErrorMessage(e) {
        /** @type {?} */
        var escapedMessage = e.message.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
        return new RegExp(escapedMessage);
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: fake-viewport-ruler.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @record
     */
    function FakeViewportRect() { }
    if (false) {
        /** @type {?} */
        FakeViewportRect.prototype.left;
        /** @type {?} */
        FakeViewportRect.prototype.top;
        /** @type {?} */
        FakeViewportRect.prototype.width;
        /** @type {?} */
        FakeViewportRect.prototype.height;
        /** @type {?} */
        FakeViewportRect.prototype.bottom;
        /** @type {?} */
        FakeViewportRect.prototype.right;
    }
    /**
     * @record
     */
    function FakeViewportSize() { }
    if (false) {
        /** @type {?} */
        FakeViewportSize.prototype.width;
        /** @type {?} */
        FakeViewportSize.prototype.height;
    }
    /**
     * @record
     */
    function FakeViewportScrollPosition() { }
    if (false) {
        /** @type {?} */
        FakeViewportScrollPosition.prototype.top;
        /** @type {?} */
        FakeViewportScrollPosition.prototype.left;
    }
    /**
     * \@docs-private
     */
    var   /**
     * \@docs-private
     */
    FakeViewportRuler = /** @class */ (function () {
        function FakeViewportRuler() {
        }
        /**
         * @return {?}
         */
        FakeViewportRuler.prototype.getViewportRect = /**
         * @return {?}
         */
        function () {
            return {
                left: 0,
                top: 0,
                width: 1014,
                height: 686,
                bottom: 686,
                right: 1014
            };
        };
        /**
         * @return {?}
         */
        FakeViewportRuler.prototype.getViewportSize = /**
         * @return {?}
         */
        function () {
            return { width: 1014, height: 686 };
        };
        /**
         * @return {?}
         */
        FakeViewportRuler.prototype.getViewportScrollPosition = /**
         * @return {?}
         */
        function () {
            return { top: 0, left: 0 };
        };
        return FakeViewportRuler;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: mock-ng-zone.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Mock synchronous NgZone implementation that can be used
     * to flush out `onStable` subscriptions in tests.
     *
     * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
     * \@docs-private
     */
    var MockNgZone = /** @class */ (function (_super) {
        __extends(MockNgZone, _super);
        function MockNgZone() {
            var _this = _super.call(this, { enableLongStackTrace: false }) || this;
            // tslint:disable-next-line:no-any
            _this.onStable = new core.EventEmitter(false);
            return _this;
        }
        // tslint:disable-next-line:no-any ban-types
        // tslint:disable-next-line:no-any ban-types
        /**
         * @param {?} fn
         * @return {?}
         */
        MockNgZone.prototype.run = 
        // tslint:disable-next-line:no-any ban-types
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return fn();
        };
        // tslint:disable-next-line:ban-types no-any
        // tslint:disable-next-line:ban-types no-any
        /**
         * @param {?} fn
         * @return {?}
         */
        MockNgZone.prototype.runOutsideAngular = 
        // tslint:disable-next-line:ban-types no-any
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return fn();
        };
        /**
         * @return {?}
         */
        MockNgZone.prototype.simulateZoneExit = /**
         * @return {?}
         */
        function () {
            this.onStable.emit(null);
        };
        MockNgZone.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MockNgZone.ctorParameters = function () { return []; };
        return MockNgZone;
    }(core.NgZone));
    if (false) {
        /** @type {?} */
        MockNgZone.prototype.onStable;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: component-bed.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function ComponentBed() { }
    if (false) {
        /** @type {?} */
        ComponentBed.prototype.bed;
        /** @type {?} */
        ComponentBed.prototype.fixture;
        /** @type {?} */
        ComponentBed.prototype.nativeElement;
        /** @type {?} */
        ComponentBed.prototype.debugElement;
        /** @type {?} */
        ComponentBed.prototype.component;
    }
    /**
     * @template T
     * @param {?} component
     * @param {?=} options
     * @return {?}
     */
    function createComponentBed(component, options) {
        if (options === void 0) { options = {
            providers: [],
            declarations: [],
            imports: []
        }; }
        var imports = options.imports, declarations = options.declarations, providers = options.providers;
        /** @type {?} */
        var config = {
            imports: __spread([animations.NoopAnimationsModule, common.CommonModule], (imports || [])),
            declarations: __spread([component], (declarations || [])),
            schemas: [core.NO_ERRORS_SCHEMA],
            providers: providers || []
        };
        /** @type {?} */
        var bed = testing.TestBed.configureTestingModule(config);
        /** @type {?} */
        var fixture = testing.TestBed.createComponent(component);
        fixture.detectChanges();
        return {
            bed: bed,
            fixture: fixture,
            nativeElement: fixture.nativeElement,
            debugElement: fixture.debugElement,
            component: fixture.componentInstance
        };
    }

    exports.FakeViewportRuler = FakeViewportRuler;
    exports.MockNgZone = MockNgZone;
    exports.createFakeEvent = createFakeEvent;
    exports.createKeyboardEvent = createKeyboardEvent;
    exports.createMouseEvent = createMouseEvent;
    exports.createTouchEvent = createTouchEvent;
    exports.dispatchEvent = dispatchEvent;
    exports.dispatchFakeEvent = dispatchFakeEvent;
    exports.dispatchKeyboardEvent = dispatchKeyboardEvent;
    exports.dispatchMouseEvent = dispatchMouseEvent;
    exports.dispatchTouchEvent = dispatchTouchEvent;
    exports.typeInElement = typeInElement;
    exports.wrappedErrorMessage = wrappedErrorMessage;
    exports.??createComponentBed = createComponentBed;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-testing.umd.js.map
