(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/util'), require('rxjs'), require('@angular/router'), require('@angular/cdk/observers'), require('@angular/cdk/platform'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('@angular/cdk/bidi'), require('ng-zorro-antd/core/services'), require('rxjs/operators'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/logger')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/tabs', ['exports', '@angular/core', 'ng-zorro-antd/core/util', 'rxjs', '@angular/router', '@angular/cdk/observers', '@angular/cdk/platform', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', '@angular/cdk/bidi', 'ng-zorro-antd/core/services', 'rxjs/operators', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/logger'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].tabs = {}), global.ng.core, global['ng-zorro-antd'].core.util, global.rxjs, global.ng.router, global.ng.cdk.observers, global.ng.cdk.platform, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global.ng.cdk.bidi, global['ng-zorro-antd'].core.services, global.rxjs.operators, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.logger));
}(this, (function (exports, core, util, rxjs, router, observers, platform, common, outlet, icon, bidi, services, operators, config, logger) { 'use strict';

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
     * Generated from: tab-body.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTabBodyComponent = /** @class */ (function () {
        function NzTabBodyComponent() {
            this.content = null;
            this.active = false;
            this.forceRender = false;
        }
        NzTabBodyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-tab-body]',
                        exportAs: 'nzTabBody',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-container *ngIf=\"active || forceRender\">\n      <ng-template [ngTemplateOutlet]=\"content\"></ng-template>\n    </ng-container>\n  ",
                        host: {
                            '[class.ant-tabs-tabpane-active]': 'active',
                            '[class.ant-tabs-tabpane-inactive]': '!active'
                        }
                    }] }
        ];
        NzTabBodyComponent.propDecorators = {
            content: [{ type: core.Input }],
            active: [{ type: core.Input }],
            forceRender: [{ type: core.Input }]
        };
        return NzTabBodyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTabBodyComponent.prototype.content;
        /** @type {?} */
        NzTabBodyComponent.prototype.active;
        /** @type {?} */
        NzTabBodyComponent.prototype.forceRender;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tab-label.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTabLabelDirective = /** @class */ (function () {
        function NzTabLabelDirective(elementRef, renderer) {
            this.elementRef = elementRef;
            this.disabled = false;
            renderer.addClass(elementRef.nativeElement, 'ant-tabs-tab');
        }
        /**
         * @return {?}
         */
        NzTabLabelDirective.prototype.getOffsetLeft = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.offsetLeft;
        };
        /**
         * @return {?}
         */
        NzTabLabelDirective.prototype.getOffsetWidth = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.offsetWidth;
        };
        /**
         * @return {?}
         */
        NzTabLabelDirective.prototype.getOffsetTop = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.offsetTop;
        };
        /**
         * @return {?}
         */
        NzTabLabelDirective.prototype.getOffsetHeight = /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.offsetHeight;
        };
        NzTabLabelDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-tab-label]',
                        exportAs: 'nzTabLabel',
                        host: {
                            '[class.ant-tabs-tab-disabled]': 'disabled'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzTabLabelDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzTabLabelDirective.propDecorators = {
            disabled: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabLabelDirective.prototype, "disabled", void 0);
        return NzTabLabelDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTabLabelDirective.ngAcceptInputType_disabled;
        /** @type {?} */
        NzTabLabelDirective.prototype.disabled;
        /** @type {?} */
        NzTabLabelDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tab-link.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This component is for catching `routerLink` directive.
     */
    var NzTabLinkDirective = /** @class */ (function () {
        function NzTabLinkDirective(routerLink, routerLinkWithHref) {
            this.routerLink = routerLink;
            this.routerLinkWithHref = routerLinkWithHref;
        }
        NzTabLinkDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'a[nz-tab-link]',
                        exportAs: 'nzTabLink'
                    },] }
        ];
        /** @nocollapse */
        NzTabLinkDirective.ctorParameters = function () { return [
            { type: router.RouterLink, decorators: [{ type: core.Optional }, { type: core.Self }] },
            { type: router.RouterLinkWithHref, decorators: [{ type: core.Optional }, { type: core.Self }] }
        ]; };
        return NzTabLinkDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTabLinkDirective.prototype.routerLink;
        /** @type {?} */
        NzTabLinkDirective.prototype.routerLinkWithHref;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tab.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Decorates the `ng-template` tags and reads out the template from it.
     */
    var NzTabDirective = /** @class */ (function () {
        function NzTabDirective() {
        }
        NzTabDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-tab]',
                        exportAs: 'nzTab'
                    },] }
        ];
        return NzTabDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: tab.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTabComponent = /** @class */ (function () {
        function NzTabComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.position = null;
            this.origin = null;
            this.isActive = false;
            this.stateChanges = new rxjs.Subject();
            this.nzForceRender = false;
            this.nzDisabled = false;
            this.nzClick = new core.EventEmitter();
            this.nzSelect = new core.EventEmitter();
            this.nzDeselect = new core.EventEmitter();
            this.renderer.addClass(elementRef.nativeElement, 'ant-tabs-tabpane');
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTabComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzTitle || changes.nzForceRender || changes.nzDisabled) {
                this.stateChanges.next();
            }
        };
        /**
         * @return {?}
         */
        NzTabComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.stateChanges.complete();
        };
        NzTabComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tab',
                        exportAs: 'nzTab',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-template #titleTpl>\n      <ng-content select=\"[nz-tab-link]\"></ng-content>\n    </ng-template>\n    <ng-template #bodyTpl>\n      <ng-content></ng-content>\n    </ng-template>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzTabComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzTabComponent.propDecorators = {
            content: [{ type: core.ViewChild, args: ['bodyTpl', { static: true },] }],
            title: [{ type: core.ViewChild, args: ['titleTpl', { static: true },] }],
            template: [{ type: core.ContentChild, args: [NzTabDirective, { static: false, read: core.TemplateRef },] }],
            linkDirective: [{ type: core.ContentChild, args: [NzTabLinkDirective, { static: false },] }],
            nzTitle: [{ type: core.Input }],
            nzRouterIdentifier: [{ type: core.Input }],
            nzForceRender: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzClick: [{ type: core.Output }],
            nzSelect: [{ type: core.Output }],
            nzDeselect: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabComponent.prototype, "nzForceRender", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabComponent.prototype, "nzDisabled", void 0);
        return NzTabComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTabComponent.ngAcceptInputType_nzForceRender;
        /** @type {?} */
        NzTabComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzTabComponent.prototype.position;
        /** @type {?} */
        NzTabComponent.prototype.origin;
        /** @type {?} */
        NzTabComponent.prototype.isActive;
        /** @type {?} */
        NzTabComponent.prototype.stateChanges;
        /** @type {?} */
        NzTabComponent.prototype.content;
        /** @type {?} */
        NzTabComponent.prototype.title;
        /** @type {?} */
        NzTabComponent.prototype.template;
        /** @type {?} */
        NzTabComponent.prototype.linkDirective;
        /** @type {?} */
        NzTabComponent.prototype.nzTitle;
        /** @type {?} */
        NzTabComponent.prototype.nzRouterIdentifier;
        /** @type {?} */
        NzTabComponent.prototype.nzForceRender;
        /** @type {?} */
        NzTabComponent.prototype.nzDisabled;
        /** @type {?} */
        NzTabComponent.prototype.nzClick;
        /** @type {?} */
        NzTabComponent.prototype.nzSelect;
        /** @type {?} */
        NzTabComponent.prototype.nzDeselect;
        /** @type {?} */
        NzTabComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTabComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tabs-ink-bar.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTabsInkBarDirective = /** @class */ (function () {
        function NzTabsInkBarDirective(renderer, elementRef, ngZone) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.nzAnimated = false;
            this.nzPositionMode = 'horizontal';
            renderer.addClass(elementRef.nativeElement, 'ant-tabs-ink-bar');
        }
        /**
         * @param {?} element
         * @return {?}
         */
        NzTabsInkBarDirective.prototype.alignToElement = /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            var _this = this;
            if (typeof requestAnimationFrame !== 'undefined') {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    requestAnimationFrame((/**
                     * @return {?}
                     */
                    function () { return _this.setStyles(element); }));
                }));
            }
            else {
                this.setStyles(element);
            }
        };
        /**
         * @param {?} element
         * @return {?}
         */
        NzTabsInkBarDirective.prototype.setStyles = /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** when horizontal remove height style and add transform left **/
            if (this.nzPositionMode === 'horizontal') {
                this.renderer.removeStyle(this.elementRef.nativeElement, 'height');
                this.renderer.setStyle(this.elementRef.nativeElement, 'transform', "translate3d(" + this.getLeftPosition(element) + ", 0px, 0px)");
                this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.getElementWidth(element));
            }
            else {
                /** when vertical remove width style and add transform top **/
                this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
                this.renderer.setStyle(this.elementRef.nativeElement, 'transform', "translate3d(0px, " + this.getTopPosition(element) + ", 0px)");
                this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.getElementHeight(element));
            }
        };
        /**
         * @param {?} element
         * @return {?}
         */
        NzTabsInkBarDirective.prototype.getLeftPosition = /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            return element ? element.offsetLeft + 'px' : '0';
        };
        /**
         * @param {?} element
         * @return {?}
         */
        NzTabsInkBarDirective.prototype.getElementWidth = /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            return element ? element.offsetWidth + 'px' : '0';
        };
        /**
         * @param {?} element
         * @return {?}
         */
        NzTabsInkBarDirective.prototype.getTopPosition = /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            return element ? element.offsetTop + 'px' : '0';
        };
        /**
         * @param {?} element
         * @return {?}
         */
        NzTabsInkBarDirective.prototype.getElementHeight = /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            return element ? element.offsetHeight + 'px' : '0';
        };
        NzTabsInkBarDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-tabs-ink-bar]',
                        exportAs: 'nzTabsInkBar',
                        host: {
                            '[class.ant-tabs-ink-bar-animated]': 'nzAnimated',
                            '[class.ant-tabs-ink-bar-no-animated]': '!nzAnimated'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzTabsInkBarDirective.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        NzTabsInkBarDirective.propDecorators = {
            nzAnimated: [{ type: core.Input }],
            nzPositionMode: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabsInkBarDirective.prototype, "nzAnimated", void 0);
        return NzTabsInkBarDirective;
    }());
    if (false) {
        /** @type {?} */
        NzTabsInkBarDirective.ngAcceptInputType_nzAnimated;
        /** @type {?} */
        NzTabsInkBarDirective.prototype.nzAnimated;
        /** @type {?} */
        NzTabsInkBarDirective.prototype.nzPositionMode;
        /**
         * @type {?}
         * @private
         */
        NzTabsInkBarDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTabsInkBarDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTabsInkBarDirective.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tabs-nav.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var EXAGGERATED_OVERSCROLL = 64;
    var NzTabsNavComponent = /** @class */ (function () {
        function NzTabsNavComponent(elementRef, ngZone, renderer, cdr, platform, resizeService, dir) {
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.renderer = renderer;
            this.cdr = cdr;
            this.platform = platform;
            this.resizeService = resizeService;
            this.dir = dir;
            this._tabPositionMode = 'horizontal';
            this._scrollDistance = 0;
            this._selectedIndex = 0;
            this.destroy$ = new rxjs.Subject();
            this.showPaginationControls = false;
            this.disableScrollAfter = true;
            this.disableScrollBefore = true;
            this.selectedIndexChanged = false;
            this.realignInkBar = null;
            this.nzOnNextClick = new core.EventEmitter();
            this.nzOnPrevClick = new core.EventEmitter();
            this.nzAnimated = true;
            this.nzHideBar = false;
            this.nzShowPagination = true;
            this.nzType = 'line';
            this.nzTabPosition = 'top';
        }
        Object.defineProperty(NzTabsNavComponent.prototype, "nzPositionMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this._tabPositionMode;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                this._tabPositionMode = value;
                this.alignInkBarToSelectedTab();
                if (this.nzShowPagination) {
                    Promise.resolve().then((/**
                     * @return {?}
                     */
                    function () {
                        _this.updatePagination();
                    }));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabsNavComponent.prototype, "selectedIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectedIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.selectedIndexChanged = this._selectedIndex !== value;
                this._selectedIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.onContentChanges = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var textContent = this.elementRef.nativeElement.textContent;
            // We need to diff the text content of the header, because the MutationObserver callback
            // will fire even if the text content didn't change which is inefficient and is prone
            // to infinite loops if a poorly constructed expression is passed in (see #14249).
            if (textContent !== this.currentTextContent) {
                this.currentTextContent = textContent;
                this.ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    if (_this.nzShowPagination) {
                        _this.updatePagination();
                    }
                    _this.alignInkBarToSelectedTab();
                    _this.cdr.markForCheck();
                }));
            }
        };
        /**
         * @param {?} scrollDir
         * @return {?}
         */
        NzTabsNavComponent.prototype.scrollHeader = /**
         * @param {?} scrollDir
         * @return {?}
         */
        function (scrollDir) {
            if (scrollDir === 'before' && !this.disableScrollBefore) {
                this.nzOnPrevClick.emit();
            }
            else if (scrollDir === 'after' && !this.disableScrollAfter) {
                this.nzOnNextClick.emit();
            }
            // Move the scroll distance one-third the length of the tab list's viewport.
            this.scrollDistance += ((scrollDir === 'before' ? -1 : 1) * this.viewWidthHeightPix) / 3;
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
        function () {
            if (this.tabLabelCount !== this.listOfNzTabLabelDirective.length) {
                if (this.nzShowPagination) {
                    this.updatePagination();
                }
                this.tabLabelCount = this.listOfNzTabLabelDirective.length;
                this.cdr.markForCheck();
            }
            if (this.selectedIndexChanged) {
                this.scrollToLabel(this._selectedIndex);
                if (this.nzShowPagination) {
                    this.checkScrollingControls();
                }
                this.alignInkBarToSelectedTab();
                this.selectedIndexChanged = false;
                this.cdr.markForCheck();
            }
            if (this.scrollDistanceChanged) {
                if (this.nzShowPagination) {
                    this.updateTabScrollPosition();
                }
                this.scrollDistanceChanged = false;
                this.cdr.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.realignInkBar = this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var dirChange = _this.dir ? _this.dir.change : rxjs.of(null);
                /** @type {?} */
                var resize = typeof window !== 'undefined' ? _this.resizeService.subscribe().pipe(operators.takeUntil(_this.destroy$)) : rxjs.of(null);
                return rxjs.merge(dirChange, resize)
                    .pipe(operators.startWith(null))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (_this.nzShowPagination) {
                        _this.updatePagination();
                    }
                    _this.alignInkBarToSelectedTab();
                }));
            }));
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            if (this.realignInkBar) {
                this.realignInkBar.unsubscribe();
            }
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.updateTabScrollPosition = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scrollDistance = this.scrollDistance;
            if (this.nzPositionMode === 'horizontal') {
                /** @type {?} */
                var translateX = this.getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
                this.renderer.setStyle(this.navListElement.nativeElement, 'transform', "translate3d(" + translateX + "px, 0, 0)");
            }
            else {
                this.renderer.setStyle(this.navListElement.nativeElement, 'transform', "translate3d(0," + -scrollDistance + "px, 0)");
            }
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.updatePagination = /**
         * @return {?}
         */
        function () {
            this.checkPaginationEnabled();
            this.checkScrollingControls();
            this.updateTabScrollPosition();
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.checkPaginationEnabled = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var isEnabled = this.tabListScrollWidthHeightPix > this.tabListScrollOffSetWidthHeight;
            if (!isEnabled) {
                this.scrollDistance = 0;
            }
            if (isEnabled !== this.showPaginationControls) {
                this.cdr.markForCheck();
            }
            this.showPaginationControls = isEnabled;
        };
        /**
         * @param {?} labelIndex
         * @return {?}
         */
        NzTabsNavComponent.prototype.scrollToLabel = /**
         * @param {?} labelIndex
         * @return {?}
         */
        function (labelIndex) {
            /** @type {?} */
            var selectedLabel = this.listOfNzTabLabelDirective ? this.listOfNzTabLabelDirective.toArray()[labelIndex] : null;
            if (selectedLabel) {
                // The view length is the visible width of the tab labels.
                /** @type {?} */
                var labelBeforePos = void 0;
                /** @type {?} */
                var labelAfterPos = void 0;
                if (this.nzPositionMode === 'horizontal') {
                    if (this.getLayoutDirection() === 'ltr') {
                        labelBeforePos = selectedLabel.getOffsetLeft();
                        labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
                    }
                    else {
                        labelAfterPos = this.navListElement.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
                        labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
                    }
                }
                else {
                    labelBeforePos = selectedLabel.getOffsetTop();
                    labelAfterPos = labelBeforePos + selectedLabel.getOffsetHeight();
                }
                /** @type {?} */
                var beforeVisiblePos = this.scrollDistance;
                /** @type {?} */
                var afterVisiblePos = this.scrollDistance + this.viewWidthHeightPix;
                if (labelBeforePos < beforeVisiblePos) {
                    // Scroll header to move label to the before direction
                    this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
                }
                else if (labelAfterPos > afterVisiblePos) {
                    // Scroll header to move label to the after direction
                    this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
                }
            }
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.checkScrollingControls = /**
         * @return {?}
         */
        function () {
            // Check if the pagination arrows should be activated.
            this.disableScrollBefore = this.scrollDistance === 0;
            this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
            this.cdr.markForCheck();
        };
        /**
         * Determines what is the maximum length in pixels that can be set for the scroll distance. This
         * is equal to the difference in width between the tab list container and tab header container.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        /**
         * Determines what is the maximum length in pixels that can be set for the scroll distance. This
         * is equal to the difference in width between the tab list container and tab header container.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @return {?}
         */
        NzTabsNavComponent.prototype.getMaxScrollDistance = /**
         * Determines what is the maximum length in pixels that can be set for the scroll distance. This
         * is equal to the difference in width between the tab list container and tab header container.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         * @return {?}
         */
        function () {
            return this.tabListScrollWidthHeightPix - this.viewWidthHeightPix || 0;
        };
        Object.defineProperty(NzTabsNavComponent.prototype, "scrollDistance", {
            get: /**
             * @return {?}
             */
            function () {
                return this._scrollDistance;
            },
            /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
            set: /**
             * Sets the distance in pixels that the tab header should be transformed in the X-axis.
             * @param {?} v
             * @return {?}
             */
            function (v) {
                this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
                // Mark that the scroll distance has changed so that after the view is checked, the CSS
                // transformation can move the header.
                this.scrollDistanceChanged = true;
                this.checkScrollingControls();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabsNavComponent.prototype, "viewWidthHeightPix", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var PAGINATION_PIX = 0;
                if (this.showPaginationControls) {
                    PAGINATION_PIX = this.navContainerScrollPaddingPix;
                }
                if (this.nzPositionMode === 'horizontal') {
                    return this.navContainerElement.nativeElement.offsetWidth - PAGINATION_PIX;
                }
                else {
                    return this.navContainerElement.nativeElement.offsetHeight - PAGINATION_PIX;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabsNavComponent.prototype, "navContainerScrollPaddingPix", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.platform.isBrowser) {
                    /** @type {?} */
                    var navContainer = this.navContainerElement.nativeElement;
                    /** @type {?} */
                    var originStyle = window.getComputedStyle
                        ? window.getComputedStyle(navContainer)
                        : ((/** @type {?} */ (navContainer))).currentStyle;
                    if (this.nzPositionMode === 'horizontal') {
                        return util.pxToNumber(originStyle.paddingLeft) + util.pxToNumber(originStyle.paddingRight);
                    }
                    else {
                        return util.pxToNumber(originStyle.paddingTop) + util.pxToNumber(originStyle.paddingBottom);
                    }
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabsNavComponent.prototype, "tabListScrollWidthHeightPix", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.nzPositionMode === 'horizontal') {
                    return this.navListElement.nativeElement.scrollWidth;
                }
                else {
                    return this.navListElement.nativeElement.scrollHeight;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabsNavComponent.prototype, "tabListScrollOffSetWidthHeight", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.nzPositionMode === 'horizontal') {
                    return this.scrollListElement.nativeElement.offsetWidth;
                }
                else {
                    return this.elementRef.nativeElement.offsetHeight;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.getLayoutDirection = /**
         * @return {?}
         */
        function () {
            return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
        };
        /**
         * @return {?}
         */
        NzTabsNavComponent.prototype.alignInkBarToSelectedTab = /**
         * @return {?}
         */
        function () {
            if (this.nzType === 'line') {
                /** @type {?} */
                var selectedLabelWrapper = this.listOfNzTabLabelDirective && this.listOfNzTabLabelDirective.length
                    ? this.listOfNzTabLabelDirective.toArray()[this.selectedIndex].elementRef.nativeElement
                    : null;
                if (this.nzTabsInkBarDirective) {
                    this.nzTabsInkBarDirective.alignToElement(selectedLabelWrapper);
                }
            }
        };
        NzTabsNavComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tabs-nav',
                        exportAs: 'nzTabsNav',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div style=\"float:right;\" *ngIf=\"nzTabBarExtraContent\" class=\"ant-tabs-extra-content\">\n      <ng-template [ngTemplateOutlet]=\"nzTabBarExtraContent\"></ng-template>\n    </div>\n    <div class=\"ant-tabs-nav-container\" [class.ant-tabs-nav-container-scrolling]=\"showPaginationControls\" #navContainerElement>\n      <span\n        class=\"ant-tabs-tab-prev\"\n        (click)=\"scrollHeader('before')\"\n        [class.ant-tabs-tab-btn-disabled]=\"disableScrollBefore\"\n        [class.ant-tabs-tab-arrow-show]=\"showPaginationControls\"\n      >\n        <span class=\"ant-tabs-tab-prev-icon\">\n          <i nz-icon [nzType]=\"nzPositionMode === 'horizontal' ? 'left' : 'up'\" class=\"ant-tabs-tab-prev-icon-target\"></i>\n        </span>\n      </span>\n      <span\n        class=\"ant-tabs-tab-next\"\n        (click)=\"scrollHeader('after')\"\n        [class.ant-tabs-tab-btn-disabled]=\"disableScrollAfter\"\n        [class.ant-tabs-tab-arrow-show]=\"showPaginationControls\"\n      >\n        <span class=\"ant-tabs-tab-next-icon\">\n          <i nz-icon [nzType]=\"nzPositionMode === 'horizontal' ? 'right' : 'down'\" class=\"ant-tabs-tab-next-icon-target\"></i>\n        </span>\n      </span>\n      <div class=\"ant-tabs-nav-wrap\">\n        <div class=\"ant-tabs-nav-scroll\" #scrollListElement>\n          <div class=\"ant-tabs-nav\" [class.ant-tabs-nav-animated]=\"nzAnimated\" #navListElement (cdkObserveContent)=\"onContentChanges()\">\n            <div>\n              <ng-content></ng-content>\n            </div>\n            <div\n              nz-tabs-ink-bar\n              [hidden]=\"nzHideBar\"\n              [nzAnimated]=\"nzAnimated\"\n              [nzPositionMode]=\"nzPositionMode\"\n              style=\"display: block;\"\n            ></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                        host: {
                            '[class.ant-tabs-bar]': 'true',
                            '[class.ant-tabs-card-bar]': "nzType === 'card'",
                            '[class.ant-tabs-top-bar]': "nzTabPosition === 'top'",
                            '[class.ant-tabs-bottom-bar]': "nzTabPosition === 'bottom'",
                            '[class.ant-tabs-left-bar]': "nzTabPosition === 'left'",
                            '[class.ant-tabs-right-bar]': "nzTabPosition === 'right'",
                            '[class.ant-tabs-small-bar]': "nzSize === 'small'",
                            '[class.ant-tabs-default-bar]': "nzSize === 'default'",
                            '[class.ant-tabs-large-bar]': "nzSize === 'large'"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTabsNavComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef },
            { type: platform.Platform },
            { type: services.NzResizeService },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
        ]; };
        NzTabsNavComponent.propDecorators = {
            listOfNzTabLabelDirective: [{ type: core.ContentChildren, args: [NzTabLabelDirective,] }],
            nzTabsInkBarDirective: [{ type: core.ViewChild, args: [NzTabsInkBarDirective, { static: true },] }],
            navContainerElement: [{ type: core.ViewChild, args: ['navContainerElement', { static: true },] }],
            navListElement: [{ type: core.ViewChild, args: ['navListElement', { static: true },] }],
            scrollListElement: [{ type: core.ViewChild, args: ['scrollListElement', { static: true },] }],
            nzOnNextClick: [{ type: core.Output }],
            nzOnPrevClick: [{ type: core.Output }],
            nzTabBarExtraContent: [{ type: core.Input }],
            nzAnimated: [{ type: core.Input }],
            nzHideBar: [{ type: core.Input }],
            nzShowPagination: [{ type: core.Input }],
            nzType: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzTabPosition: [{ type: core.Input }],
            nzPositionMode: [{ type: core.Input }],
            selectedIndex: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabsNavComponent.prototype, "nzAnimated", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabsNavComponent.prototype, "nzHideBar", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabsNavComponent.prototype, "nzShowPagination", void 0);
        return NzTabsNavComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTabsNavComponent.ngAcceptInputType_nzAnimated;
        /** @type {?} */
        NzTabsNavComponent.ngAcceptInputType_nzHideBar;
        /** @type {?} */
        NzTabsNavComponent.ngAcceptInputType_nzShowPagination;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype._tabPositionMode;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype._scrollDistance;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype._selectedIndex;
        /**
         * Cached text content of the header.
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.currentTextContent;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.destroy$;
        /** @type {?} */
        NzTabsNavComponent.prototype.showPaginationControls;
        /** @type {?} */
        NzTabsNavComponent.prototype.disableScrollAfter;
        /** @type {?} */
        NzTabsNavComponent.prototype.disableScrollBefore;
        /** @type {?} */
        NzTabsNavComponent.prototype.selectedIndexChanged;
        /** @type {?} */
        NzTabsNavComponent.prototype.realignInkBar;
        /** @type {?} */
        NzTabsNavComponent.prototype.tabLabelCount;
        /** @type {?} */
        NzTabsNavComponent.prototype.scrollDistanceChanged;
        /** @type {?} */
        NzTabsNavComponent.prototype.listOfNzTabLabelDirective;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzTabsInkBarDirective;
        /** @type {?} */
        NzTabsNavComponent.prototype.navContainerElement;
        /** @type {?} */
        NzTabsNavComponent.prototype.navListElement;
        /** @type {?} */
        NzTabsNavComponent.prototype.scrollListElement;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzOnNextClick;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzOnPrevClick;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzTabBarExtraContent;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzAnimated;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzHideBar;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzShowPagination;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzType;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzSize;
        /** @type {?} */
        NzTabsNavComponent.prototype.nzTabPosition;
        /** @type {?} */
        NzTabsNavComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.resizeService;
        /**
         * @type {?}
         * @private
         */
        NzTabsNavComponent.prototype.dir;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: table.types.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzAnimatedInterface() { }
    if (false) {
        /** @type {?} */
        NzAnimatedInterface.prototype.inkBar;
        /** @type {?} */
        NzAnimatedInterface.prototype.tabPane;
    }
    var NzTabChangeEvent = /** @class */ (function () {
        function NzTabChangeEvent() {
        }
        return NzTabChangeEvent;
    }());
    if (false) {
        /** @type {?} */
        NzTabChangeEvent.prototype.index;
        /** @type {?} */
        NzTabChangeEvent.prototype.tab;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tabset.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'tabs';
    var NzTabSetComponent = /** @class */ (function () {
        function NzTabSetComponent(nzConfigService, renderer, elementRef, cdr, router) {
            this.nzConfigService = nzConfigService;
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.cdr = cdr;
            this.router = router;
            this.indexToSelect = 0;
            this.el = this.elementRef.nativeElement;
            this._selectedIndex = null;
            /**
             * Subscription to tabs being added/removed.
             */
            this.tabsSubscription = rxjs.Subscription.EMPTY;
            /**
             * Subscription to changes in the tab labels.
             */
            this.tabLabelSubscription = rxjs.Subscription.EMPTY;
            this.destroy$ = new rxjs.Subject();
            this.tabPositionMode = 'horizontal';
            this.nzShowPagination = true;
            this.nzAnimated = true;
            this.nzHideAll = false;
            this.nzTabPosition = 'top';
            this.nzSize = 'default';
            this.nzTabBarGutter = undefined;
            this.nzTabBarStyle = null;
            this.nzType = 'line';
            this.nzLinkRouter = false;
            this.nzLinkExact = true;
            this.nzCanDeactivate = null;
            this.nzOnNextClick = new core.EventEmitter();
            this.nzOnPrevClick = new core.EventEmitter();
            this.nzSelectChange = new core.EventEmitter(true);
            this.nzSelectedIndexChange = new core.EventEmitter();
        }
        Object.defineProperty(NzTabSetComponent.prototype, "nzSelectedIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectedIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.indexToSelect = value ? util.toNumber(value, null) : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabSetComponent.prototype, "inkBarAnimated", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzAnimated === true || ((/** @type {?} */ (this.nzAnimated))).inkBar === true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabSetComponent.prototype, "tabPaneAnimated", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzAnimated === true || ((/** @type {?} */ (this.nzAnimated))).tabPane === true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTabSetComponent.prototype, "isAnimationDisabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzAnimated === false || ((/** @type {?} */ (this.nzAnimated))).tabPane === false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        NzTabSetComponent.prototype.setPosition = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.tabContent) {
                if (value === 'bottom') {
                    this.renderer.insertBefore(this.el, this.tabContent.nativeElement, (/** @type {?} */ (this.nzTabsNavComponent)).elementRef.nativeElement);
                }
                else {
                    this.renderer.insertBefore(this.el, (/** @type {?} */ (this.nzTabsNavComponent)).elementRef.nativeElement, this.tabContent.nativeElement);
                }
            }
        };
        /**
         * @param {?} index
         * @param {?} disabled
         * @return {?}
         */
        NzTabSetComponent.prototype.clickLabel = /**
         * @param {?} index
         * @param {?} disabled
         * @return {?}
         */
        function (index, disabled) {
            var _this = this;
            if (!disabled) {
                if (this.nzSelectedIndex !== null && this.nzSelectedIndex !== index && typeof this.nzCanDeactivate === 'function') {
                    /** @type {?} */
                    var observable = util.wrapIntoObservable(this.nzCanDeactivate(this.nzSelectedIndex, index));
                    observable.pipe(operators.first(), operators.takeUntil(this.destroy$)).subscribe((/**
                     * @param {?} canChange
                     * @return {?}
                     */
                    function (canChange) { return canChange && _this.emitClickEvent(index); }));
                }
                else {
                    this.emitClickEvent(index);
                }
            }
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        NzTabSetComponent.prototype.emitClickEvent = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            /** @type {?} */
            var tabs = this.listOfNzTabComponent.toArray();
            this.nzSelectedIndex = index;
            tabs[index].nzClick.emit();
            this.cdr.markForCheck();
        };
        /**
         * @param {?} index
         * @return {?}
         */
        NzTabSetComponent.prototype.createChangeEvent = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            /** @type {?} */
            var event = new NzTabChangeEvent();
            event.index = index;
            if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
                event.tab = this.listOfNzTabComponent.toArray()[index];
                this.listOfNzTabComponent.forEach((/**
                 * @param {?} item
                 * @param {?} i
                 * @return {?}
                 */
                function (item, i) {
                    if (i !== index) {
                        item.nzDeselect.emit();
                    }
                }));
                event.tab.nzSelect.emit();
            }
            return event;
        };
        /** Clamps the given index to the bounds of 0 and the tabs length. */
        /**
         * Clamps the given index to the bounds of 0 and the tabs length.
         * @private
         * @param {?} index
         * @return {?}
         */
        NzTabSetComponent.prototype.clampTabIndex = /**
         * Clamps the given index to the bounds of 0 and the tabs length.
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            // Note the `|| 0`, which ensures that values like NaN can't get through
            // and which would otherwise throw the component into an infinite loop
            // (since Math.max(NaN, 0) === NaN).
            return Math.min(this.listOfNzTabComponent.length - 1, Math.max(index || 0, 0));
        };
        /**
         * @private
         * @return {?}
         */
        NzTabSetComponent.prototype.subscribeToTabLabels = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.tabLabelSubscription) {
                this.tabLabelSubscription.unsubscribe();
            }
            this.tabLabelSubscription = rxjs.merge.apply(void 0, __spread(this.listOfNzTabComponent.map((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return tab.stateChanges; })))).subscribe((/**
             * @return {?}
             */
            function () { return _this.cdr.markForCheck(); }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTabSetComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzTabPosition = changes.nzTabPosition, nzType = changes.nzType;
            if (nzTabPosition) {
                if (this.nzTabPosition === 'top' || this.nzTabPosition === 'bottom') {
                    this.tabPositionMode = 'horizontal';
                }
                else {
                    this.tabPositionMode = 'vertical';
                }
                this.setPosition(this.nzTabPosition);
            }
            if (nzType) {
                if (this.nzType === 'card') {
                    this.nzAnimated = false;
                }
            }
        };
        /**
         * @return {?}
         */
        NzTabSetComponent.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
                // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
                // the amount of tabs changes before the actual change detection runs.
                /** @type {?} */
                var indexToSelect_1 = (this.indexToSelect = this.clampTabIndex(this.indexToSelect));
                // If there is a change in selected index, emit a change event. Should not trigger if
                // the selected index has not yet been initialized.
                if (this._selectedIndex !== indexToSelect_1) {
                    /** @type {?} */
                    var isFirstRun_1 = this._selectedIndex == null;
                    if (!isFirstRun_1) {
                        this.nzSelectChange.emit(this.createChangeEvent(indexToSelect_1));
                    }
                    // Changing these values after change detection has run
                    // since the checked content may contain references to them.
                    Promise.resolve().then((/**
                     * @return {?}
                     */
                    function () {
                        _this.listOfNzTabComponent.forEach((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) { return (tab.isActive = index === indexToSelect_1); }));
                        if (!isFirstRun_1) {
                            _this.nzSelectedIndexChange.emit(indexToSelect_1);
                        }
                    }));
                }
                // Setup the position for each tab and optionally setup an origin on the next selected tab.
                this.listOfNzTabComponent.forEach((/**
                 * @param {?} tab
                 * @param {?} index
                 * @return {?}
                 */
                function (tab, index) {
                    tab.position = index - indexToSelect_1;
                    // If there is already a selected tab, then set up an origin for the next selected tab
                    // if it doesn't have one already.
                    if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                        tab.origin = indexToSelect_1 - _this._selectedIndex;
                    }
                }));
                if (this._selectedIndex !== indexToSelect_1) {
                    this._selectedIndex = indexToSelect_1;
                    this.cdr.markForCheck();
                }
            }
        };
        /**
         * @return {?}
         */
        NzTabSetComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.subscribeToTabLabels();
            this.setPosition(this.nzTabPosition);
            if (this.nzLinkRouter) {
                if (!this.router) {
                    throw new Error(logger.PREFIX + " you should import 'RouterModule' if you want to use 'nzLinkRouter'!");
                }
                this.router.events
                    .pipe(operators.takeUntil(this.destroy$), operators.filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e instanceof router.NavigationEnd; })), operators.startWith(true))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.updateRouterActive();
                    _this.cdr.markForCheck();
                }));
            }
            // Subscribe to changes in the amount of tabs, in order to be
            // able to re-render the content as new tabs are added or removed.
            this.tabsSubscription = this.listOfNzTabComponent.changes.subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
                // Maintain the previously-selected tab if a new tab is added or removed and there is no
                // explicit change that selects a different tab.
                if (indexToSelect === _this._selectedIndex) {
                    /** @type {?} */
                    var tabs = _this.listOfNzTabComponent.toArray();
                    for (var i = 0; i < tabs.length; i++) {
                        if (tabs[i].isActive) {
                            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                            // adding a tab within the `selectedIndexChange` event.
                            _this.indexToSelect = _this._selectedIndex = i;
                            break;
                        }
                    }
                }
                _this.subscribeToTabLabels();
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzTabSetComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.tabsSubscription.unsubscribe();
            this.tabLabelSubscription.unsubscribe();
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @private
         * @return {?}
         */
        NzTabSetComponent.prototype.updateRouterActive = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.router.navigated) {
                /** @type {?} */
                var index = this.findShouldActiveTabIndex();
                if (index !== this._selectedIndex) {
                    this.nzSelectedIndex = index;
                    this.nzSelectedIndexChange.emit(index);
                }
                this.nzHideAll = index === -1;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzTabSetComponent.prototype.findShouldActiveTabIndex = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var tabs = this.listOfNzTabComponent.toArray();
            /** @type {?} */
            var isActive = this.isLinkActive(this.router);
            return tabs.findIndex((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) {
                /** @type {?} */
                var c = tab.linkDirective;
                return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
            }));
        };
        /**
         * @private
         * @param {?} router
         * @return {?}
         */
        NzTabSetComponent.prototype.isLinkActive = /**
         * @private
         * @param {?} router
         * @return {?}
         */
        function (router) {
            var _this = this;
            return (/**
             * @param {?=} link
             * @return {?}
             */
            function (link) { return (link ? router.isActive(link.urlTree, _this.nzLinkExact) : false); });
        };
        NzTabSetComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tabset',
                        exportAs: 'nzTabset',
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-container *ngIf=\"listOfNzTabComponent\">\n      <nz-tabs-nav\n        role=\"tablist\"\n        tabindex=\"0\"\n        [nzSize]=\"nzSize\"\n        [nzTabPosition]=\"nzTabPosition\"\n        [nzType]=\"nzType\"\n        [nzShowPagination]=\"nzShowPagination\"\n        [nzPositionMode]=\"tabPositionMode\"\n        [nzAnimated]=\"inkBarAnimated\"\n        [ngStyle]=\"nzTabBarStyle\"\n        [nzHideBar]=\"nzHideAll\"\n        [nzTabBarExtraContent]=\"nzTabBarExtraContent\"\n        [selectedIndex]=\"nzSelectedIndex!\"\n        (nzOnNextClick)=\"nzOnNextClick.emit()\"\n        (nzOnPrevClick)=\"nzOnPrevClick.emit()\"\n      >\n        <div\n          nz-tab-label\n          role=\"tab\"\n          [style.margin-right.px]=\"nzTabBarGutter\"\n          [class.ant-tabs-tab-active]=\"nzSelectedIndex == i && !nzHideAll\"\n          [disabled]=\"tab.nzDisabled\"\n          (click)=\"clickLabel(i, tab.nzDisabled)\"\n          *ngFor=\"let tab of listOfNzTabComponent; let i = index\"\n        >\n          <ng-container *nzStringTemplateOutlet=\"tab.nzTitle || tab.title\">{{ tab.nzTitle }}</ng-container>\n        </div>\n      </nz-tabs-nav>\n      <div\n        #tabContent\n        class=\"ant-tabs-content\"\n        [class.ant-tabs-top-content]=\"nzTabPosition === 'top'\"\n        [class.ant-tabs-bottom-content]=\"nzTabPosition === 'bottom'\"\n        [class.ant-tabs-left-content]=\"nzTabPosition === 'left'\"\n        [class.ant-tabs-right-content]=\"nzTabPosition === 'right'\"\n        [class.ant-tabs-content-animated]=\"tabPaneAnimated\"\n        [class.ant-tabs-card-content]=\"nzType === 'card'\"\n        [class.ant-tabs-content-no-animated]=\"!tabPaneAnimated\"\n        [style.margin-left.%]=\"tabPositionMode === 'horizontal' && tabPaneAnimated && -(nzSelectedIndex || 0) * 100\"\n      >\n        <div\n          nz-tab-body\n          class=\"ant-tabs-tabpane\"\n          *ngFor=\"let tab of listOfNzTabComponent; let i = index\"\n          [active]=\"nzSelectedIndex == i && !nzHideAll\"\n          [forceRender]=\"tab.nzForceRender\"\n          [content]=\"tab.template || tab.content\"\n        ></div>\n      </div>\n    </ng-container>\n  ",
                        host: {
                            '[class.ant-tabs]': "true",
                            '[class.ant-tabs-no-animation]': "isAnimationDisabled",
                            '[class.ant-tabs-line]': "nzType === 'line'",
                            '[class.ant-tabs-card]': "nzType === 'card'",
                            '[class.ant-tabs-top]': "nzTabPosition === 'top'",
                            '[class.ant-tabs-bottom]': "nzTabPosition === 'bottom'",
                            '[class.ant-tabs-left]': "nzTabPosition === 'left'",
                            '[class.ant-tabs-right]': "nzTabPosition === 'right'",
                            '[class.ant-tabs-vertical]': "nzTabPosition === 'left' || nzTabPosition === 'right'",
                            '[class.ant-tabs-large]': "nzSize === 'large'",
                            '[class.ant-tabs-small]': "nzSize === 'small'"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTabSetComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: router.Router, decorators: [{ type: core.Optional }] }
        ]; };
        NzTabSetComponent.propDecorators = {
            listOfNzTabComponent: [{ type: core.ContentChildren, args: [NzTabComponent,] }],
            nzTabsNavComponent: [{ type: core.ViewChild, args: [NzTabsNavComponent, { static: false },] }],
            tabContent: [{ type: core.ViewChild, args: ['tabContent', { static: false },] }],
            nzTabBarExtraContent: [{ type: core.Input }],
            nzShowPagination: [{ type: core.Input }],
            nzAnimated: [{ type: core.Input }],
            nzHideAll: [{ type: core.Input }],
            nzTabPosition: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzTabBarGutter: [{ type: core.Input }],
            nzTabBarStyle: [{ type: core.Input }],
            nzType: [{ type: core.Input }],
            nzLinkRouter: [{ type: core.Input }],
            nzLinkExact: [{ type: core.Input }],
            nzCanDeactivate: [{ type: core.Input }],
            nzOnNextClick: [{ type: core.Output }],
            nzOnPrevClick: [{ type: core.Output }],
            nzSelectChange: [{ type: core.Output }],
            nzSelectedIndexChange: [{ type: core.Output }],
            nzSelectedIndex: [{ type: core.Input }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzTabSetComponent.prototype, "nzShowPagination", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzTabSetComponent.prototype, "nzAnimated", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzTabSetComponent.prototype, "nzSize", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Number)
        ], NzTabSetComponent.prototype, "nzTabBarGutter", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzTabSetComponent.prototype, "nzType", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabSetComponent.prototype, "nzLinkRouter", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTabSetComponent.prototype, "nzLinkExact", void 0);
        return NzTabSetComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTabSetComponent.ngAcceptInputType_nzLinkRouter;
        /** @type {?} */
        NzTabSetComponent.ngAcceptInputType_nzLinkExact;
        /** @type {?} */
        NzTabSetComponent.ngAcceptInputType_nzSelectedIndex;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.indexToSelect;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype._selectedIndex;
        /**
         * Subscription to tabs being added/removed.
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.tabsSubscription;
        /**
         * Subscription to changes in the tab labels.
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.tabLabelSubscription;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.destroy$;
        /** @type {?} */
        NzTabSetComponent.prototype.tabPositionMode;
        /** @type {?} */
        NzTabSetComponent.prototype.listOfNzTabComponent;
        /** @type {?} */
        NzTabSetComponent.prototype.nzTabsNavComponent;
        /** @type {?} */
        NzTabSetComponent.prototype.tabContent;
        /** @type {?} */
        NzTabSetComponent.prototype.nzTabBarExtraContent;
        /** @type {?} */
        NzTabSetComponent.prototype.nzShowPagination;
        /** @type {?} */
        NzTabSetComponent.prototype.nzAnimated;
        /** @type {?} */
        NzTabSetComponent.prototype.nzHideAll;
        /** @type {?} */
        NzTabSetComponent.prototype.nzTabPosition;
        /** @type {?} */
        NzTabSetComponent.prototype.nzSize;
        /** @type {?} */
        NzTabSetComponent.prototype.nzTabBarGutter;
        /** @type {?} */
        NzTabSetComponent.prototype.nzTabBarStyle;
        /** @type {?} */
        NzTabSetComponent.prototype.nzType;
        /** @type {?} */
        NzTabSetComponent.prototype.nzLinkRouter;
        /** @type {?} */
        NzTabSetComponent.prototype.nzLinkExact;
        /** @type {?} */
        NzTabSetComponent.prototype.nzCanDeactivate;
        /** @type {?} */
        NzTabSetComponent.prototype.nzOnNextClick;
        /** @type {?} */
        NzTabSetComponent.prototype.nzOnPrevClick;
        /** @type {?} */
        NzTabSetComponent.prototype.nzSelectChange;
        /** @type {?} */
        NzTabSetComponent.prototype.nzSelectedIndexChange;
        /** @type {?} */
        NzTabSetComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTabSetComponent.prototype.router;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tabs.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTabsModule = /** @class */ (function () {
        function NzTabsModule() {
        }
        NzTabsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NzTabComponent,
                            NzTabDirective,
                            NzTabSetComponent,
                            NzTabsNavComponent,
                            NzTabLabelDirective,
                            NzTabsInkBarDirective,
                            NzTabBodyComponent,
                            NzTabLinkDirective
                        ],
                        exports: [
                            NzTabComponent,
                            NzTabDirective,
                            NzTabSetComponent,
                            NzTabsNavComponent,
                            NzTabLabelDirective,
                            NzTabsInkBarDirective,
                            NzTabBodyComponent,
                            NzTabLinkDirective
                        ],
                        imports: [common.CommonModule, observers.ObserversModule, icon.NzIconModule, outlet.NzOutletModule, platform.PlatformModule]
                    },] }
        ];
        return NzTabsModule;
    }());

    exports.NzTabBodyComponent = NzTabBodyComponent;
    exports.NzTabChangeEvent = NzTabChangeEvent;
    exports.NzTabComponent = NzTabComponent;
    exports.NzTabDirective = NzTabDirective;
    exports.NzTabLabelDirective = NzTabLabelDirective;
    exports.NzTabLinkDirective = NzTabLinkDirective;
    exports.NzTabSetComponent = NzTabSetComponent;
    exports.NzTabsInkBarDirective = NzTabsInkBarDirective;
    exports.NzTabsModule = NzTabsModule;
    exports.NzTabsNavComponent = NzTabsNavComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-tabs.umd.js.map
