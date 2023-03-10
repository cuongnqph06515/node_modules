(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/util'), require('rxjs'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/services'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/descriptions', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/util', 'rxjs', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/services', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].descriptions = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.util, global.rxjs, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.services, global.rxjs.operators));
}(this, (function (exports, platform, common, core, outlet, util, rxjs, config, logger, services, operators) { 'use strict';

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
     * Generated from: descriptions-item.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDescriptionsItemComponent = /** @class */ (function () {
        function NzDescriptionsItemComponent() {
            this.nzSpan = 1;
            this.nzTitle = '';
            this.inputChange$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzDescriptionsItemComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.inputChange$.next();
        };
        /**
         * @return {?}
         */
        NzDescriptionsItemComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.inputChange$.complete();
        };
        NzDescriptionsItemComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-descriptions-item',
                        template: "\n    <ng-template>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                        exportAs: 'nzDescriptionsItem',
                        preserveWhitespaces: false
                    }] }
        ];
        NzDescriptionsItemComponent.propDecorators = {
            content: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }],
            nzSpan: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }]
        };
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Object)
        ], NzDescriptionsItemComponent.prototype, "nzSpan", void 0);
        return NzDescriptionsItemComponent;
    }());
    if (false) {
        /** @type {?} */
        NzDescriptionsItemComponent.ngAcceptInputType_nzSpan;
        /** @type {?} */
        NzDescriptionsItemComponent.prototype.content;
        /** @type {?} */
        NzDescriptionsItemComponent.prototype.nzSpan;
        /** @type {?} */
        NzDescriptionsItemComponent.prototype.nzTitle;
        /** @type {?} */
        NzDescriptionsItemComponent.prototype.inputChange$;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: descriptions.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'descriptions';
    /** @type {?} */
    var defaultColumnMap = {
        xxl: 3,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1
    };
    var NzDescriptionsComponent = /** @class */ (function () {
        function NzDescriptionsComponent(nzConfigService, cdr, breakpointService) {
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.breakpointService = breakpointService;
            this.nzBordered = false;
            this.nzLayout = 'horizontal';
            this.nzColumn = defaultColumnMap;
            this.nzSize = 'default';
            this.nzTitle = '';
            this.nzColon = true;
            this.itemMatrix = [];
            this.realColumn = 3;
            this.breakpoint = services.NzBreakpointEnum.md;
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzDescriptionsComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzColumn) {
                this.prepareMatrix();
            }
        };
        /**
         * @return {?}
         */
        NzDescriptionsComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var contentChange$ = this.items.changes.pipe(operators.startWith(this.items), operators.takeUntil(this.destroy$));
            rxjs.merge(contentChange$, contentChange$.pipe(operators.switchMap((/**
             * @return {?}
             */
            function () { return rxjs.merge.apply(void 0, __spread(_this.items.map((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.inputChange$; })))).pipe(operators.auditTime(16)); }))), this.breakpointService.subscribe(services.gridResponsiveMap).pipe(operators.tap((/**
             * @param {?} bp
             * @return {?}
             */
            function (bp) { return (_this.breakpoint = bp); }))))
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.prepareMatrix();
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzDescriptionsComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * Prepare the render matrix according to description items' spans.
         */
        /**
         * Prepare the render matrix according to description items' spans.
         * @private
         * @return {?}
         */
        NzDescriptionsComponent.prototype.prepareMatrix = /**
         * Prepare the render matrix according to description items' spans.
         * @private
         * @return {?}
         */
        function () {
            if (!this.items) {
                return;
            }
            /** @type {?} */
            var currentRow = [];
            /** @type {?} */
            var width = 0;
            /** @type {?} */
            var column = (this.realColumn = this.getColumn());
            /** @type {?} */
            var items = this.items.toArray();
            /** @type {?} */
            var length = items.length;
            /** @type {?} */
            var matrix = [];
            /** @type {?} */
            var flushRow = (/**
             * @return {?}
             */
            function () {
                matrix.push(currentRow);
                currentRow = [];
                width = 0;
            });
            for (var i = 0; i < length; i++) {
                /** @type {?} */
                var item = items[i];
                var title = item.nzTitle, content = item.content, span = item.nzSpan;
                width += span;
                // If the last item make the row's length exceeds `nzColumn`, the last
                // item should take all the space left. This logic is implemented in the template.
                // Warn user about that.
                if (width >= column) {
                    if (width > column) {
                        logger.warn("\"nzColumn\" is " + column + " but we have row length " + width);
                    }
                    currentRow.push({ title: title, content: content, span: column - (width - span) });
                    flushRow();
                }
                else if (i === length - 1) {
                    currentRow.push({ title: title, content: content, span: column - (width - span) });
                    flushRow();
                }
                else {
                    currentRow.push({ title: title, content: content, span: span });
                }
            }
            this.itemMatrix = matrix;
        };
        /**
         * @private
         * @return {?}
         */
        NzDescriptionsComponent.prototype.getColumn = /**
         * @private
         * @return {?}
         */
        function () {
            if (typeof this.nzColumn !== 'number') {
                return this.nzColumn[this.breakpoint];
            }
            return this.nzColumn;
        };
        NzDescriptionsComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-descriptions',
                        exportAs: 'nzDescriptions',
                        preserveWhitespaces: false,
                        template: "\n    <div *ngIf=\"nzTitle\" class=\"ant-descriptions-title\">\n      <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n    </div>\n    <div class=\"ant-descriptions-view\">\n      <table>\n        <tbody>\n          <ng-container *ngIf=\"nzLayout === 'horizontal'\">\n            <tr class=\"ant-descriptions-row\" *ngFor=\"let row of itemMatrix; let i = index\">\n              <ng-container *ngFor=\"let item of row; let isLast = last\">\n                <!-- Horizontal & NOT Bordered -->\n                <ng-container *ngIf=\"!nzBordered\">\n                  <td class=\"ant-descriptions-item\" [colSpan]=\"item.span\">\n                    <span class=\"ant-descriptions-item-label\" [class.ant-descriptions-item-colon]=\"nzColon\">\n                      <ng-container *nzStringTemplateOutlet=\"item.title\">\n                        {{ item.title }}\n                      </ng-container>\n                    </span>\n                    <span class=\"ant-descriptions-item-content\">\n                      <ng-template [ngTemplateOutlet]=\"item.content\"></ng-template>\n                    </span>\n                  </td>\n                </ng-container>\n                <!-- Horizontal & Bordered -->\n                <ng-container *ngIf=\"nzBordered\">\n                  <td class=\"ant-descriptions-item-label\" *nzStringTemplateOutlet=\"item.title\">\n                    <ng-container *nzStringTemplateOutlet=\"item.title\">\n                      {{ item.title }}\n                    </ng-container>\n                  </td>\n                  <td class=\"ant-descriptions-item-content\" [colSpan]=\"item.span * 2 - 1\">\n                    <ng-template [ngTemplateOutlet]=\"item.content\"></ng-template>\n                  </td>\n                </ng-container>\n              </ng-container>\n            </tr>\n          </ng-container>\n\n          <ng-container *ngIf=\"nzLayout === 'vertical'\">\n            <!-- Vertical & NOT Bordered -->\n            <ng-container *ngIf=\"!nzBordered\">\n              <ng-container *ngFor=\"let row of itemMatrix; let i = index\">\n                <tr class=\"ant-descriptions-row\">\n                  <ng-container *ngFor=\"let item of row; let isLast = last\">\n                    <td class=\"ant-descriptions-item\" [colSpan]=\"item.span\">\n                      <span class=\"ant-descriptions-item-label\" [class.ant-descriptions-item-colon]=\"nzColon\">\n                        <ng-container *nzStringTemplateOutlet=\"item.title\">\n                          {{ item.title }}\n                        </ng-container>\n                      </span>\n                    </td>\n                  </ng-container>\n                </tr>\n                <tr class=\"ant-descriptions-row\">\n                  <ng-container *ngFor=\"let item of row; let isLast = last\">\n                    <td class=\"ant-descriptions-item\" [colSpan]=\"item.span\">\n                      <span class=\"ant-descriptions-item-content\">\n                        <ng-template [ngTemplateOutlet]=\"item.content\"></ng-template>\n                      </span>\n                    </td>\n                  </ng-container>\n                </tr>\n              </ng-container>\n            </ng-container>\n            <!-- Vertical & Bordered -->\n            <ng-container *ngIf=\"nzBordered\">\n              <ng-container *ngFor=\"let row of itemMatrix; let i = index\">\n                <tr class=\"ant-descriptions-row\">\n                  <ng-container *ngFor=\"let item of row; let isLast = last\">\n                    <td class=\"ant-descriptions-item-label\" [colSpan]=\"item.span\">\n                      <ng-container *nzStringTemplateOutlet=\"item.title\">\n                        {{ item.title }}\n                      </ng-container>\n                    </td>\n                  </ng-container>\n                </tr>\n                <tr class=\"ant-descriptions-row\">\n                  <ng-container *ngFor=\"let item of row; let isLast = last\">\n                    <td class=\"ant-descriptions-item-content\" [colSpan]=\"item.span\">\n                      <ng-template [ngTemplateOutlet]=\"item.content\"></ng-template>\n                    </td>\n                  </ng-container>\n                </tr>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n        </tbody>\n      </table>\n    </div>\n  ",
                        host: {
                            class: 'ant-descriptions',
                            '[class.ant-descriptions-bordered]': 'nzBordered',
                            '[class.ant-descriptions-middle]': 'nzSize === "middle"',
                            '[class.ant-descriptions-small]': 'nzSize === "small"'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzDescriptionsComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: services.NzBreakpointService }
        ]; };
        NzDescriptionsComponent.propDecorators = {
            items: [{ type: core.ContentChildren, args: [NzDescriptionsItemComponent,] }],
            nzBordered: [{ type: core.Input }],
            nzLayout: [{ type: core.Input }],
            nzColumn: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzColon: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(), config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzDescriptionsComponent.prototype, "nzBordered", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzDescriptionsComponent.prototype, "nzColumn", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzDescriptionsComponent.prototype, "nzSize", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzDescriptionsComponent.prototype, "nzColon", void 0);
        return NzDescriptionsComponent;
    }());
    if (false) {
        /** @type {?} */
        NzDescriptionsComponent.ngAcceptInputType_nzBordered;
        /** @type {?} */
        NzDescriptionsComponent.ngAcceptInputType_nzColon;
        /** @type {?} */
        NzDescriptionsComponent.prototype.items;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzBordered;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzLayout;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzColumn;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzSize;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzTitle;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzColon;
        /** @type {?} */
        NzDescriptionsComponent.prototype.itemMatrix;
        /** @type {?} */
        NzDescriptionsComponent.prototype.realColumn;
        /**
         * @type {?}
         * @private
         */
        NzDescriptionsComponent.prototype.breakpoint;
        /**
         * @type {?}
         * @private
         */
        NzDescriptionsComponent.prototype.destroy$;
        /** @type {?} */
        NzDescriptionsComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzDescriptionsComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzDescriptionsComponent.prototype.breakpointService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: descriptions.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDescriptionsModule = /** @class */ (function () {
        function NzDescriptionsModule() {
        }
        NzDescriptionsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, outlet.NzOutletModule, platform.PlatformModule],
                        declarations: [NzDescriptionsComponent, NzDescriptionsItemComponent],
                        exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
                    },] }
        ];
        return NzDescriptionsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: typings.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function NzDescriptionsItemRenderProps() { }
    if (false) {
        /** @type {?} */
        NzDescriptionsItemRenderProps.prototype.title;
        /** @type {?} */
        NzDescriptionsItemRenderProps.prototype.span;
        /** @type {?} */
        NzDescriptionsItemRenderProps.prototype.content;
    }

    exports.NzDescriptionsComponent = NzDescriptionsComponent;
    exports.NzDescriptionsItemComponent = NzDescriptionsItemComponent;
    exports.NzDescriptionsModule = NzDescriptionsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-descriptions.umd.js.map
