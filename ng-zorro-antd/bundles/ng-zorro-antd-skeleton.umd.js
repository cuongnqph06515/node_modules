(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/util'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/skeleton', ['exports', '@angular/core', 'ng-zorro-antd/core/util', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].skeleton = {}), global.ng.core, global['ng-zorro-antd'].core.util, global.ng.common));
}(this, (function (exports, core, util, common) { 'use strict';

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
     * Generated from: skeleton.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSkeletonComponent = /** @class */ (function () {
        function NzSkeletonComponent(cdr, renderer, elementRef) {
            this.cdr = cdr;
            this.nzActive = false;
            this.nzLoading = true;
            this.nzTitle = true;
            this.nzAvatar = false;
            this.nzParagraph = true;
            this.rowsList = [];
            this.widthList = [];
            renderer.addClass(elementRef.nativeElement, 'ant-skeleton');
        }
        /**
         * @param {?=} value
         * @return {?}
         */
        NzSkeletonComponent.prototype.toCSSUnit = /**
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            if (value === void 0) { value = ''; }
            return util.toCssPixel(value);
        };
        /**
         * @private
         * @return {?}
         */
        NzSkeletonComponent.prototype.getTitleProps = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hasAvatar = !!this.nzAvatar;
            /** @type {?} */
            var hasParagraph = !!this.nzParagraph;
            /** @type {?} */
            var width = '';
            if (!hasAvatar && hasParagraph) {
                width = '38%';
            }
            else if (hasAvatar && hasParagraph) {
                width = '50%';
            }
            return __assign({ width: width }, this.getProps(this.nzTitle));
        };
        /**
         * @private
         * @return {?}
         */
        NzSkeletonComponent.prototype.getAvatarProps = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var shape = !!this.nzTitle && !this.nzParagraph ? 'square' : 'circle';
            /** @type {?} */
            var size = 'large';
            return __assign({ shape: shape, size: size }, this.getProps(this.nzAvatar));
        };
        /**
         * @private
         * @return {?}
         */
        NzSkeletonComponent.prototype.getParagraphProps = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hasAvatar = !!this.nzAvatar;
            /** @type {?} */
            var hasTitle = !!this.nzTitle;
            /** @type {?} */
            var basicProps = {};
            // Width
            if (!hasAvatar || !hasTitle) {
                basicProps.width = '61%';
            }
            // Rows
            if (!hasAvatar && hasTitle) {
                basicProps.rows = 3;
            }
            else {
                basicProps.rows = 2;
            }
            return __assign(__assign({}, basicProps), this.getProps(this.nzParagraph));
        };
        /**
         * @private
         * @template T
         * @param {?} prop
         * @return {?}
         */
        NzSkeletonComponent.prototype.getProps = /**
         * @private
         * @template T
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            return prop && typeof prop === 'object' ? prop : {};
        };
        /**
         * @private
         * @return {?}
         */
        NzSkeletonComponent.prototype.getWidthList = /**
         * @private
         * @return {?}
         */
        function () {
            var _a = this.paragraph, width = _a.width, rows = _a.rows;
            /** @type {?} */
            var widthList = [];
            if (width && Array.isArray(width)) {
                widthList = width;
            }
            else if (width && !Array.isArray(width)) {
                widthList = [];
                widthList[(/** @type {?} */ (rows)) - 1] = width;
            }
            return widthList;
        };
        /**
         * @private
         * @return {?}
         */
        NzSkeletonComponent.prototype.updateProps = /**
         * @private
         * @return {?}
         */
        function () {
            this.title = this.getTitleProps();
            this.avatar = this.getAvatarProps();
            this.paragraph = this.getParagraphProps();
            this.rowsList = __spread(Array(this.paragraph.rows));
            this.widthList = this.getWidthList();
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzSkeletonComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.updateProps();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSkeletonComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
                this.updateProps();
            }
        };
        NzSkeletonComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-skeleton',
                        exportAs: 'nzSkeleton',
                        host: {
                            '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
                            '[class.ant-skeleton-active]': 'nzActive'
                        },
                        template: "\n    <ng-container *ngIf=\"nzLoading\">\n      <div class=\"ant-skeleton-header\" *ngIf=\"!!nzAvatar\">\n        <nz-skeleton-element nzType=\"avatar\" [nzSize]=\"avatar.size\" [nzShape]=\"avatar.shape\"></nz-skeleton-element>\n      </div>\n      <div class=\"ant-skeleton-content\">\n        <h3 *ngIf=\"!!nzTitle\" class=\"ant-skeleton-title\" [style.width]=\"toCSSUnit(title.width)\"></h3>\n        <ul *ngIf=\"!!nzParagraph\" class=\"ant-skeleton-paragraph\">\n          <li *ngFor=\"let row of rowsList; let i = index\" [style.width]=\"toCSSUnit(widthList[i])\"></li>\n        </ul>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"!nzLoading\">\n      <ng-content></ng-content>\n    </ng-container>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzSkeletonComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        NzSkeletonComponent.propDecorators = {
            nzActive: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzAvatar: [{ type: core.Input }],
            nzParagraph: [{ type: core.Input }]
        };
        return NzSkeletonComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSkeletonComponent.prototype.nzActive;
        /** @type {?} */
        NzSkeletonComponent.prototype.nzLoading;
        /** @type {?} */
        NzSkeletonComponent.prototype.nzTitle;
        /** @type {?} */
        NzSkeletonComponent.prototype.nzAvatar;
        /** @type {?} */
        NzSkeletonComponent.prototype.nzParagraph;
        /** @type {?} */
        NzSkeletonComponent.prototype.title;
        /** @type {?} */
        NzSkeletonComponent.prototype.avatar;
        /** @type {?} */
        NzSkeletonComponent.prototype.paragraph;
        /** @type {?} */
        NzSkeletonComponent.prototype.rowsList;
        /** @type {?} */
        NzSkeletonComponent.prototype.widthList;
        /**
         * @type {?}
         * @private
         */
        NzSkeletonComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: skeleton-element.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSkeletonElementDirective = /** @class */ (function () {
        function NzSkeletonElementDirective() {
            this.nzActive = false;
        }
        NzSkeletonElementDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'nz-skeleton-element',
                        host: {
                            '[class.ant-skeleton]': 'true',
                            '[class.ant-skeleton-element]': 'true',
                            '[class.ant-skeleton-active]': 'nzActive'
                        }
                    },] }
        ];
        NzSkeletonElementDirective.propDecorators = {
            nzActive: [{ type: core.Input }],
            nzType: [{ type: core.Input }]
        };
        return NzSkeletonElementDirective;
    }());
    if (false) {
        /** @type {?} */
        NzSkeletonElementDirective.prototype.nzActive;
        /** @type {?} */
        NzSkeletonElementDirective.prototype.nzType;
    }
    var NzSkeletonElementButtonComponent = /** @class */ (function () {
        function NzSkeletonElementButtonComponent() {
            this.nzShape = 'default';
            this.nzSize = 'default';
        }
        NzSkeletonElementButtonComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-skeleton-element[nzType="button"]',
                        template: "\n    <span\n      [class.ant-skeleton-button]=\"true\"\n      [class.ant-skeleton-button-round]=\"nzShape === 'round'\"\n      [class.ant-skeleton-button-circle]=\"nzShape === 'circle'\"\n      [class.ant-skeleton-button-lg]=\"nzSize === 'large'\"\n      [class.ant-skeleton-button-sm]=\"nzSize === 'small'\"\n    >\n    </span>\n  "
                    }] }
        ];
        NzSkeletonElementButtonComponent.propDecorators = {
            nzShape: [{ type: core.Input }],
            nzSize: [{ type: core.Input }]
        };
        return NzSkeletonElementButtonComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSkeletonElementButtonComponent.prototype.nzShape;
        /** @type {?} */
        NzSkeletonElementButtonComponent.prototype.nzSize;
    }
    var NzSkeletonElementAvatarComponent = /** @class */ (function () {
        function NzSkeletonElementAvatarComponent() {
            this.nzShape = 'circle';
            this.nzSize = 'default';
            this.styleMap = {};
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSkeletonElementAvatarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzSize && typeof this.nzSize === 'number') {
                /** @type {?} */
                var sideLength = this.nzSize + "px";
                this.styleMap = { width: sideLength, height: sideLength, 'line-height': sideLength };
            }
            else {
                this.styleMap = {};
            }
        };
        NzSkeletonElementAvatarComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-skeleton-element[nzType="avatar"]',
                        template: "\n    <span\n      [class.ant-skeleton-avatar]=\"true\"\n      [class.ant-skeleton-avatar-square]=\"nzShape === 'square'\"\n      [class.ant-skeleton-avatar-circle]=\"nzShape === 'circle'\"\n      [class.ant-skeleton-avatar-lg]=\"nzSize === 'large'\"\n      [class.ant-skeleton-avatar-sm]=\"nzSize === 'small'\"\n      [ngStyle]=\"styleMap\"\n    >\n    </span>\n  "
                    }] }
        ];
        NzSkeletonElementAvatarComponent.propDecorators = {
            nzShape: [{ type: core.Input }],
            nzSize: [{ type: core.Input }]
        };
        return NzSkeletonElementAvatarComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSkeletonElementAvatarComponent.ngAcceptInputType_nzShape;
        /** @type {?} */
        NzSkeletonElementAvatarComponent.ngAcceptInputType_AvatarSize;
        /** @type {?} */
        NzSkeletonElementAvatarComponent.prototype.nzShape;
        /** @type {?} */
        NzSkeletonElementAvatarComponent.prototype.nzSize;
        /** @type {?} */
        NzSkeletonElementAvatarComponent.prototype.styleMap;
    }
    var NzSkeletonElementInputComponent = /** @class */ (function () {
        function NzSkeletonElementInputComponent() {
            this.nzSize = 'default';
        }
        NzSkeletonElementInputComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-skeleton-element[nzType="input"]',
                        template: "\n    <span\n      [class.ant-skeleton-input]=\"true\"\n      [class.ant-skeleton-input-lg]=\"nzSize === 'large'\"\n      [class.ant-skeleton-input-sm]=\"nzSize === 'small'\"\n    >\n    </span>\n  "
                    }] }
        ];
        NzSkeletonElementInputComponent.propDecorators = {
            nzSize: [{ type: core.Input }]
        };
        return NzSkeletonElementInputComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSkeletonElementInputComponent.prototype.nzSize;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: skeleton.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSkeletonModule = /** @class */ (function () {
        function NzSkeletonModule() {
        }
        NzSkeletonModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NzSkeletonComponent,
                            NzSkeletonElementDirective,
                            NzSkeletonElementButtonComponent,
                            NzSkeletonElementAvatarComponent,
                            NzSkeletonElementInputComponent
                        ],
                        imports: [common.CommonModule],
                        exports: [
                            NzSkeletonComponent,
                            NzSkeletonElementDirective,
                            NzSkeletonElementButtonComponent,
                            NzSkeletonElementAvatarComponent,
                            NzSkeletonElementInputComponent
                        ]
                    },] }
        ];
        return NzSkeletonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: skeleton.type.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function NzSkeletonAvatar() { }
    if (false) {
        /** @type {?|undefined} */
        NzSkeletonAvatar.prototype.size;
        /** @type {?|undefined} */
        NzSkeletonAvatar.prototype.shape;
    }
    /**
     * @record
     */
    function NzSkeletonTitle() { }
    if (false) {
        /** @type {?|undefined} */
        NzSkeletonTitle.prototype.width;
    }
    /**
     * @record
     */
    function NzSkeletonParagraph() { }
    if (false) {
        /** @type {?|undefined} */
        NzSkeletonParagraph.prototype.rows;
        /** @type {?|undefined} */
        NzSkeletonParagraph.prototype.width;
    }

    exports.NzSkeletonComponent = NzSkeletonComponent;
    exports.NzSkeletonElementAvatarComponent = NzSkeletonElementAvatarComponent;
    exports.NzSkeletonElementButtonComponent = NzSkeletonElementButtonComponent;
    exports.NzSkeletonElementDirective = NzSkeletonElementDirective;
    exports.NzSkeletonElementInputComponent = NzSkeletonElementInputComponent;
    exports.NzSkeletonModule = NzSkeletonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-skeleton.umd.js.map
