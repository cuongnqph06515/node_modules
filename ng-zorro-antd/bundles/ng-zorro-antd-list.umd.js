(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('ng-zorro-antd/avatar'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/grid'), require('ng-zorro-antd/spin')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/list', ['exports', '@angular/core', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/common', 'ng-zorro-antd/avatar', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/empty', 'ng-zorro-antd/grid', 'ng-zorro-antd/spin'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].list = {}), global.ng.core, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.common, global['ng-zorro-antd'].avatar, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].empty, global['ng-zorro-antd'].grid, global['ng-zorro-antd'].spin));
}(this, (function (exports, core, util, rxjs, operators, common, avatar, outlet, empty, grid, spin) { 'use strict';

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
     * Generated from: interface.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function NzListGrid() { }
    if (false) {
        /** @type {?|undefined} */
        NzListGrid.prototype.gutter;
        /** @type {?|undefined} */
        NzListGrid.prototype.span;
        /** @type {?|undefined} */
        NzListGrid.prototype.column;
        /** @type {?|undefined} */
        NzListGrid.prototype.xs;
        /** @type {?|undefined} */
        NzListGrid.prototype.sm;
        /** @type {?|undefined} */
        NzListGrid.prototype.md;
        /** @type {?|undefined} */
        NzListGrid.prototype.lg;
        /** @type {?|undefined} */
        NzListGrid.prototype.xl;
        /** @type {?|undefined} */
        NzListGrid.prototype.xxl;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list-item-meta-cell.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzListItemMetaTitleComponent = /** @class */ (function () {
        function NzListItemMetaTitleComponent() {
        }
        NzListItemMetaTitleComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item-meta-title',
                        exportAs: 'nzListItemMetaTitle',
                        template: "\n    <h4 class=\"ant-list-item-meta-title\">\n      <ng-content></ng-content>\n    </h4>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        return NzListItemMetaTitleComponent;
    }());
    var NzListItemMetaDescriptionComponent = /** @class */ (function () {
        function NzListItemMetaDescriptionComponent() {
        }
        NzListItemMetaDescriptionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item-meta-description',
                        exportAs: 'nzListItemMetaDescription',
                        template: "\n    <div class=\"ant-list-item-meta-description\">\n      <ng-content></ng-content>\n    </div>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        return NzListItemMetaDescriptionComponent;
    }());
    var NzListItemMetaAvatarComponent = /** @class */ (function () {
        function NzListItemMetaAvatarComponent() {
        }
        NzListItemMetaAvatarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item-meta-avatar',
                        exportAs: 'nzListItemMetaAvatar',
                        template: "\n    <div class=\"ant-list-item-meta-avatar\">\n      <nz-avatar *ngIf=\"nzSrc\" [nzSrc]=\"nzSrc\"></nz-avatar>\n      <ng-content *ngIf=\"!nzSrc\"></ng-content>\n    </div>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        NzListItemMetaAvatarComponent.propDecorators = {
            nzSrc: [{ type: core.Input }]
        };
        return NzListItemMetaAvatarComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListItemMetaAvatarComponent.prototype.nzSrc;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list-item-meta.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzListItemMetaComponent = /** @class */ (function () {
        function NzListItemMetaComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.avatarStr = '';
            this.renderer.addClass(elementRef.nativeElement, 'ant-list-item-meta');
        }
        Object.defineProperty(NzListItemMetaComponent.prototype, "nzAvatar", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value instanceof core.TemplateRef) {
                    this.avatarStr = '';
                    this.avatarTpl = value;
                }
                else {
                    this.avatarStr = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        NzListItemMetaComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item-meta, [nz-list-item-meta]',
                        exportAs: 'nzListItemMeta',
                        template: "\n    <!--Old API Start-->\n    <nz-list-item-meta-avatar *ngIf=\"avatarStr\" [nzSrc]=\"avatarStr\"></nz-list-item-meta-avatar>\n    <nz-list-item-meta-avatar *ngIf=\"avatarTpl\">\n      <ng-container [ngTemplateOutlet]=\"avatarTpl\"></ng-container>\n    </nz-list-item-meta-avatar>\n    <!--Old API End-->\n\n    <ng-content select=\"nz-list-item-meta-avatar\"></ng-content>\n\n    <div *ngIf=\"nzTitle || nzDescription || descriptionComponent || titleComponent\" class=\"ant-list-item-meta-content\">\n      <!--Old API Start-->\n      <nz-list-item-meta-title *ngIf=\"nzTitle && !titleComponent\">\n        <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n      </nz-list-item-meta-title>\n      <nz-list-item-meta-description *ngIf=\"nzDescription && !descriptionComponent\">\n        <ng-container *nzStringTemplateOutlet=\"nzDescription\">{{ nzDescription }}</ng-container>\n      </nz-list-item-meta-description>\n      <!--Old API End-->\n\n      <ng-content select=\"nz-list-item-meta-title\"></ng-content>\n      <ng-content select=\"nz-list-item-meta-description\"></ng-content>\n    </div>\n  ",
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    }] }
        ];
        /** @nocollapse */
        NzListItemMetaComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzListItemMetaComponent.propDecorators = {
            nzAvatar: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzDescription: [{ type: core.Input }],
            descriptionComponent: [{ type: core.ContentChild, args: [NzListItemMetaDescriptionComponent,] }],
            titleComponent: [{ type: core.ContentChild, args: [NzListItemMetaTitleComponent,] }]
        };
        return NzListItemMetaComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListItemMetaComponent.prototype.avatarStr;
        /** @type {?} */
        NzListItemMetaComponent.prototype.avatarTpl;
        /** @type {?} */
        NzListItemMetaComponent.prototype.nzTitle;
        /** @type {?} */
        NzListItemMetaComponent.prototype.nzDescription;
        /** @type {?} */
        NzListItemMetaComponent.prototype.descriptionComponent;
        /** @type {?} */
        NzListItemMetaComponent.prototype.titleComponent;
        /** @type {?} */
        NzListItemMetaComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzListItemMetaComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list-item-cell.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzListItemExtraComponent = /** @class */ (function () {
        function NzListItemExtraComponent() {
        }
        NzListItemExtraComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item-extra, [nz-list-item-extra]',
                        exportAs: 'nzListItemExtra',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> ",
                        host: {
                            class: 'ant-list-item-extra'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzListItemExtraComponent.ctorParameters = function () { return []; };
        return NzListItemExtraComponent;
    }());
    var NzListItemActionComponent = /** @class */ (function () {
        function NzListItemActionComponent() {
        }
        NzListItemActionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item-action',
                        exportAs: 'nzListItemAction',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-template><ng-content></ng-content></ng-template> "
                    }] }
        ];
        /** @nocollapse */
        NzListItemActionComponent.ctorParameters = function () { return []; };
        NzListItemActionComponent.propDecorators = {
            templateRef: [{ type: core.ViewChild, args: [core.TemplateRef,] }]
        };
        return NzListItemActionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListItemActionComponent.prototype.templateRef;
    }
    var NzListItemActionsComponent = /** @class */ (function () {
        function NzListItemActionsComponent(ngZone, cdr) {
            var _this = this;
            this.ngZone = ngZone;
            this.cdr = cdr;
            this.nzActions = [];
            this.actions = [];
            this.destroy$ = new rxjs.Subject();
            this.inputActionChanges$ = new rxjs.Subject();
            this.contentChildrenChanges$ = rxjs.defer((/**
             * @return {?}
             */
            function () {
                if (_this.nzListItemActions) {
                    return rxjs.of(null);
                }
                return _this.ngZone.onStable.asObservable().pipe(operators.take(1), operators.switchMap((/**
                 * @return {?}
                 */
                function () { return _this.contentChildrenChanges$; })));
            }));
            rxjs.merge(this.contentChildrenChanges$, this.inputActionChanges$)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.nzActions.length) {
                    _this.actions = _this.nzActions;
                }
                else {
                    _this.actions = _this.nzListItemActions.map((/**
                     * @param {?} action
                     * @return {?}
                     */
                    function (action) { return (/** @type {?} */ (action.templateRef)); }));
                }
                _this.cdr.detectChanges();
            }));
        }
        /**
         * @return {?}
         */
        NzListItemActionsComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.inputActionChanges$.next(null);
        };
        /**
         * @return {?}
         */
        NzListItemActionsComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzListItemActionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ul[nz-list-item-actions]',
                        exportAs: 'nzListItemActions',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <li *ngFor=\"let i of actions; let last = last\">\n      <ng-template [ngTemplateOutlet]=\"i\"></ng-template>\n      <em *ngIf=\"!last\" class=\"ant-list-item-action-split\"></em>\n    </li>\n  ",
                        host: {
                            class: 'ant-list-item-action'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzListItemActionsComponent.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: core.ChangeDetectorRef }
        ]; };
        NzListItemActionsComponent.propDecorators = {
            nzActions: [{ type: core.Input }],
            nzListItemActions: [{ type: core.ContentChildren, args: [NzListItemActionComponent,] }]
        };
        return NzListItemActionsComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListItemActionsComponent.prototype.nzActions;
        /** @type {?} */
        NzListItemActionsComponent.prototype.nzListItemActions;
        /** @type {?} */
        NzListItemActionsComponent.prototype.actions;
        /**
         * @type {?}
         * @private
         */
        NzListItemActionsComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzListItemActionsComponent.prototype.inputActionChanges$;
        /**
         * @type {?}
         * @private
         */
        NzListItemActionsComponent.prototype.contentChildrenChanges$;
        /**
         * @type {?}
         * @private
         */
        NzListItemActionsComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzListItemActionsComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list-cell.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzListEmptyComponent = /** @class */ (function () {
        function NzListEmptyComponent() {
        }
        NzListEmptyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-empty',
                        exportAs: 'nzListHeader',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <nz-embed-empty [nzComponentName]=\"'list'\" [specificContent]=\"nzNoResult\"></nz-embed-empty> ",
                        host: {
                            class: 'ant-list-empty-text'
                        }
                    }] }
        ];
        NzListEmptyComponent.propDecorators = {
            nzNoResult: [{ type: core.Input }]
        };
        return NzListEmptyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListEmptyComponent.prototype.nzNoResult;
    }
    var NzListHeaderComponent = /** @class */ (function () {
        function NzListHeaderComponent() {
        }
        NzListHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-header',
                        exportAs: 'nzListHeader',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> ",
                        host: {
                            class: 'ant-list-header'
                        }
                    }] }
        ];
        return NzListHeaderComponent;
    }());
    var NzListFooterComponent = /** @class */ (function () {
        function NzListFooterComponent() {
        }
        NzListFooterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-footer',
                        exportAs: 'nzListFooter',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> ",
                        host: {
                            class: 'ant-list-footer'
                        }
                    }] }
        ];
        return NzListFooterComponent;
    }());
    var NzListPaginationComponent = /** @class */ (function () {
        function NzListPaginationComponent() {
        }
        NzListPaginationComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-pagination',
                        exportAs: 'nzListPagination',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> ",
                        host: {
                            class: 'ant-list-pagination'
                        }
                    }] }
        ];
        return NzListPaginationComponent;
    }());
    var NzListLoadMoreDirective = /** @class */ (function () {
        function NzListLoadMoreDirective() {
        }
        NzListLoadMoreDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-list-load-more',
                        exportAs: 'nzListLoadMoreDirective'
                    },] }
        ];
        return NzListLoadMoreDirective;
    }());
    var NzListGridDirective = /** @class */ (function () {
        function NzListGridDirective() {
        }
        NzListGridDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-list[nzGrid]',
                        host: {
                            class: 'ant-list-grid'
                        }
                    },] }
        ];
        return NzListGridDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: list.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzListComponent = /** @class */ (function () {
        function NzListComponent() {
            this.nzBordered = false;
            this.nzGrid = '';
            this.nzItemLayout = 'horizontal';
            this.nzRenderItem = null;
            this.nzLoading = false;
            this.nzLoadMore = null;
            this.nzSize = 'default';
            this.nzSplit = true;
            this.hasSomethingAfterLastItem = false;
            this.itemLayoutNotifySource = new rxjs.BehaviorSubject(this.nzItemLayout);
        }
        Object.defineProperty(NzListComponent.prototype, "itemLayoutNotify$", {
            get: /**
             * @return {?}
             */
            function () {
                return this.itemLayoutNotifySource.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzListComponent.prototype.getSomethingAfterLastItem = /**
         * @return {?}
         */
        function () {
            return !!(this.nzLoadMore ||
                this.nzPagination ||
                this.nzFooter ||
                this.nzListFooterComponent ||
                this.nzListPaginationComponent ||
                this.nzListLoadMoreDirective);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzListComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzItemLayout) {
                this.itemLayoutNotifySource.next(this.nzItemLayout);
            }
        };
        /**
         * @return {?}
         */
        NzListComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.itemLayoutNotifySource.unsubscribe();
        };
        /**
         * @return {?}
         */
        NzListComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
        };
        NzListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list, [nz-list]',
                        exportAs: 'nzList',
                        template: "\n    <ng-template #itemsTpl>\n      <div class=\"ant-list-items\">\n        <ng-container *ngFor=\"let item of nzDataSource; let index = index\">\n          <ng-template [ngTemplateOutlet]=\"nzRenderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: index }\"></ng-template>\n        </ng-container>\n        <ng-content select=\"nz-list-item, [nz-list-item]\"></ng-content>\n      </div>\n    </ng-template>\n\n    <nz-list-header *ngIf=\"nzHeader\">\n      <ng-container *nzStringTemplateOutlet=\"nzHeader\">{{ nzHeader }}</ng-container>\n    </nz-list-header>\n    <ng-content select=\"nz-list-header\"></ng-content>\n\n    <nz-spin [nzSpinning]=\"nzLoading\">\n      <ng-container>\n        <div *ngIf=\"nzLoading && nzDataSource && nzDataSource.length === 0\" [style.min-height.px]=\"53\"></div>\n        <div *ngIf=\"nzGrid && nzDataSource; else itemsTpl\" nz-row [nzGutter]=\"nzGrid.gutter || null\">\n          <div\n            nz-col\n            [nzSpan]=\"nzGrid.span || null\"\n            [nzXs]=\"nzGrid.xs || null\"\n            [nzSm]=\"nzGrid.sm || null\"\n            [nzMd]=\"nzGrid.md || null\"\n            [nzLg]=\"nzGrid.lg || null\"\n            [nzXl]=\"nzGrid.xl || null\"\n            [nzXXl]=\"nzGrid.xxl || null\"\n            *ngFor=\"let item of nzDataSource; let index = index\"\n          >\n            <ng-template [ngTemplateOutlet]=\"nzRenderItem\" [ngTemplateOutletContext]=\"{ $implicit: item, index: index }\"></ng-template>\n          </div>\n        </div>\n        <nz-list-empty *ngIf=\"!nzLoading && nzDataSource && nzDataSource.length === 0\" [nzNoResult]=\"nzNoResult\"></nz-list-empty>\n      </ng-container>\n      <ng-content></ng-content>\n    </nz-spin>\n\n    <nz-list-footer *ngIf=\"nzFooter\">\n      <ng-container *nzStringTemplateOutlet=\"nzFooter\">{{ nzFooter }}</ng-container>\n    </nz-list-footer>\n    <ng-content select=\"nz-list-footer, [nz-list-footer]\"></ng-content>\n\n    <ng-template [ngTemplateOutlet]=\"nzLoadMore\"></ng-template>\n    <ng-content select=\"nz-list-load-more, [nz-list-load-more]\"></ng-content>\n\n    <nz-list-pagination *ngIf=\"nzPagination\">\n      <ng-template [ngTemplateOutlet]=\"nzPagination\"></ng-template>\n    </nz-list-pagination>\n    <ng-content select=\"nz-list-pagination, [nz-list-pagination]\"></ng-content>\n  ",
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.ant-list]': 'true',
                            '[class.ant-list-vertical]': 'nzItemLayout === "vertical"',
                            '[class.ant-list-lg]': 'nzSize === "large"',
                            '[class.ant-list-sm]': 'nzSize === "small"',
                            '[class.ant-list-split]': 'nzSplit',
                            '[class.ant-list-bordered]': 'nzBordered',
                            '[class.ant-list-loading]': 'nzLoading',
                            '[class.ant-list-something-after-last-item]': 'hasSomethingAfterLastItem'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzListComponent.ctorParameters = function () { return []; };
        NzListComponent.propDecorators = {
            nzDataSource: [{ type: core.Input }],
            nzBordered: [{ type: core.Input }],
            nzGrid: [{ type: core.Input }],
            nzHeader: [{ type: core.Input }],
            nzFooter: [{ type: core.Input }],
            nzItemLayout: [{ type: core.Input }],
            nzRenderItem: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzLoadMore: [{ type: core.Input }],
            nzPagination: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzSplit: [{ type: core.Input }],
            nzNoResult: [{ type: core.Input }],
            nzListFooterComponent: [{ type: core.ContentChild, args: [NzListFooterComponent,] }],
            nzListPaginationComponent: [{ type: core.ContentChild, args: [NzListPaginationComponent,] }],
            nzListLoadMoreDirective: [{ type: core.ContentChild, args: [NzListLoadMoreDirective,] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzListComponent.prototype, "nzBordered", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzListComponent.prototype, "nzLoading", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzListComponent.prototype, "nzSplit", void 0);
        return NzListComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListComponent.ngAcceptInputType_nzBordered;
        /** @type {?} */
        NzListComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzListComponent.ngAcceptInputType_nzSplit;
        /** @type {?} */
        NzListComponent.ngAcceptInputType_nzGrid;
        /** @type {?} */
        NzListComponent.prototype.nzDataSource;
        /** @type {?} */
        NzListComponent.prototype.nzBordered;
        /** @type {?} */
        NzListComponent.prototype.nzGrid;
        /** @type {?} */
        NzListComponent.prototype.nzHeader;
        /** @type {?} */
        NzListComponent.prototype.nzFooter;
        /** @type {?} */
        NzListComponent.prototype.nzItemLayout;
        /** @type {?} */
        NzListComponent.prototype.nzRenderItem;
        /** @type {?} */
        NzListComponent.prototype.nzLoading;
        /** @type {?} */
        NzListComponent.prototype.nzLoadMore;
        /** @type {?} */
        NzListComponent.prototype.nzPagination;
        /** @type {?} */
        NzListComponent.prototype.nzSize;
        /** @type {?} */
        NzListComponent.prototype.nzSplit;
        /** @type {?} */
        NzListComponent.prototype.nzNoResult;
        /** @type {?} */
        NzListComponent.prototype.nzListFooterComponent;
        /** @type {?} */
        NzListComponent.prototype.nzListPaginationComponent;
        /** @type {?} */
        NzListComponent.prototype.nzListLoadMoreDirective;
        /** @type {?} */
        NzListComponent.prototype.hasSomethingAfterLastItem;
        /**
         * @type {?}
         * @private
         */
        NzListComponent.prototype.itemLayoutNotifySource;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list-item.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzListItemComponent = /** @class */ (function () {
        function NzListItemComponent(elementRef, renderer, parentComp, cdr) {
            this.parentComp = parentComp;
            this.cdr = cdr;
            this.nzActions = [];
            this.nzExtra = null;
            this.nzNoFlex = false;
            renderer.addClass(elementRef.nativeElement, 'ant-list-item');
        }
        Object.defineProperty(NzListItemComponent.prototype, "isVerticalAndExtra", {
            get: /**
             * @return {?}
             */
            function () {
                return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.nzExtra);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzListItemComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe((/**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                _this.itemLayout = val;
                _this.cdr.detectChanges();
            }));
        };
        /**
         * @return {?}
         */
        NzListItemComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.itemLayout$) {
                this.itemLayout$.unsubscribe();
            }
        };
        NzListItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-list-item, [nz-list-item]',
                        exportAs: 'nzListItem',
                        template: "\n    <ng-template #actionsTpl>\n      <ul nz-list-item-actions *ngIf=\"nzActions && nzActions.length > 0\" [nzActions]=\"nzActions\"></ul>\n      <ng-content select=\"nz-list-item-actions, [nz-list-item-actions]\"></ng-content>\n    </ng-template>\n    <ng-template #contentTpl>\n      <ng-content select=\"nz-list-item-meta, [nz-list-item-meta]\"></ng-content>\n      <ng-content></ng-content>\n      <ng-container *ngIf=\"nzContent\">\n        <ng-container *nzStringTemplateOutlet=\"nzContent\">{{ nzContent }}</ng-container>\n      </ng-container>\n    </ng-template>\n    <ng-template #extraTpl>\n      <ng-content select=\"nz-list-item-extra, [nz-list-item-extra]\"></ng-content>\n    </ng-template>\n    <ng-template #simpleTpl>\n      <ng-template [ngTemplateOutlet]=\"contentTpl\"></ng-template>\n      <ng-template [ngTemplateOutlet]=\"nzExtra\"></ng-template>\n      <ng-template [ngTemplateOutlet]=\"extraTpl\"></ng-template>\n      <ng-template [ngTemplateOutlet]=\"actionsTpl\"></ng-template>\n    </ng-template>\n\n    <ng-container *ngIf=\"isVerticalAndExtra; else simpleTpl\">\n      <div class=\"ant-list-item-main\">\n        <ng-template [ngTemplateOutlet]=\"contentTpl\"></ng-template>\n        <ng-template [ngTemplateOutlet]=\"actionsTpl\"></ng-template>\n      </div>\n      <nz-list-item-extra *ngIf=\"nzExtra\">\n        <ng-template [ngTemplateOutlet]=\"nzExtra\"></ng-template>\n      </nz-list-item-extra>\n      <ng-template [ngTemplateOutlet]=\"extraTpl\"></ng-template>\n    </ng-container>\n  ",
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NzListItemComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: NzListComponent },
            { type: core.ChangeDetectorRef }
        ]; };
        NzListItemComponent.propDecorators = {
            nzActions: [{ type: core.Input }],
            nzContent: [{ type: core.Input }],
            nzExtra: [{ type: core.Input }],
            nzNoFlex: [{ type: core.Input }, { type: core.HostBinding, args: ['class.ant-list-item-no-flex',] }],
            listItemExtraDirective: [{ type: core.ContentChild, args: [NzListItemExtraComponent,] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzListItemComponent.prototype, "nzNoFlex", void 0);
        return NzListItemComponent;
    }());
    if (false) {
        /** @type {?} */
        NzListItemComponent.ngAcceptInputType_nzNoFlex;
        /** @type {?} */
        NzListItemComponent.prototype.nzActions;
        /** @type {?} */
        NzListItemComponent.prototype.nzContent;
        /** @type {?} */
        NzListItemComponent.prototype.nzExtra;
        /** @type {?} */
        NzListItemComponent.prototype.nzNoFlex;
        /** @type {?} */
        NzListItemComponent.prototype.listItemExtraDirective;
        /**
         * @type {?}
         * @private
         */
        NzListItemComponent.prototype.itemLayout;
        /**
         * @type {?}
         * @private
         */
        NzListItemComponent.prototype.itemLayout$;
        /**
         * @type {?}
         * @private
         */
        NzListItemComponent.prototype.parentComp;
        /**
         * @type {?}
         * @private
         */
        NzListItemComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: list.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DIRECTIVES = [
        NzListComponent,
        NzListHeaderComponent,
        NzListFooterComponent,
        NzListPaginationComponent,
        NzListEmptyComponent,
        NzListItemComponent,
        NzListItemMetaComponent,
        NzListItemMetaTitleComponent,
        NzListItemMetaDescriptionComponent,
        NzListItemMetaAvatarComponent,
        NzListItemActionsComponent,
        NzListItemActionComponent,
        NzListItemExtraComponent,
        NzListLoadMoreDirective,
        NzListGridDirective
    ];
    var NzListModule = /** @class */ (function () {
        function NzListModule() {
        }
        NzListModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, spin.NzSpinModule, grid.NzGridModule, avatar.NzAvatarModule, outlet.NzOutletModule, empty.NzEmptyModule],
                        declarations: [DIRECTIVES],
                        exports: [DIRECTIVES]
                    },] }
        ];
        return NzListModule;
    }());

    exports.NzListComponent = NzListComponent;
    exports.NzListEmptyComponent = NzListEmptyComponent;
    exports.NzListFooterComponent = NzListFooterComponent;
    exports.NzListGridDirective = NzListGridDirective;
    exports.NzListHeaderComponent = NzListHeaderComponent;
    exports.NzListItemActionComponent = NzListItemActionComponent;
    exports.NzListItemActionsComponent = NzListItemActionsComponent;
    exports.NzListItemComponent = NzListItemComponent;
    exports.NzListItemExtraComponent = NzListItemExtraComponent;
    exports.NzListItemMetaAvatarComponent = NzListItemMetaAvatarComponent;
    exports.NzListItemMetaComponent = NzListItemMetaComponent;
    exports.NzListItemMetaDescriptionComponent = NzListItemMetaDescriptionComponent;
    exports.NzListItemMetaTitleComponent = NzListItemMetaTitleComponent;
    exports.NzListLoadMoreDirective = NzListLoadMoreDirective;
    exports.NzListModule = NzListModule;
    exports.NzListPaginationComponent = NzListPaginationComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-list.umd.js.map
