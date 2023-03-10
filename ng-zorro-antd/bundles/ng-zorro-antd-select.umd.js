(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/cdk/scrolling'), require('ng-zorro-antd/core/util'), require('rxjs/operators'), require('@angular/cdk/a11y'), require('@angular/cdk/keycodes'), require('@angular/cdk/overlay'), require('@angular/cdk/platform'), require('@angular/forms'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/no-animation'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/transition-patch'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/select', ['exports', '@angular/core', 'rxjs', '@angular/cdk/scrolling', 'ng-zorro-antd/core/util', 'rxjs/operators', '@angular/cdk/a11y', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/cdk/platform', '@angular/forms', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/no-animation', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/transition-patch', 'ng-zorro-antd/empty', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].select = {}), global.ng.core, global.rxjs, global.ng.cdk.scrolling, global['ng-zorro-antd'].core.util, global.rxjs.operators, global.ng.cdk.a11y, global.ng.cdk.keycodes, global.ng.cdk.overlay, global.ng.cdk.platform, global.ng.forms, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core['no-animation'], global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core['transition-patch'], global['ng-zorro-antd'].empty, global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, rxjs, scrolling, util, operators, a11y, keycodes, overlay, platform, forms, animation, config, noAnimation, common, outlet, overlay$1, transitionPatch, empty, i18n, icon) { 'use strict';

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
     * Generated from: option-group.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzOptionGroupComponent = /** @class */ (function () {
        function NzOptionGroupComponent() {
            this.nzLabel = null;
            this.changes = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzOptionGroupComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.changes.next();
        };
        NzOptionGroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-option-group',
                        exportAs: 'nzOptionGroup',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-content></ng-content> "
                    }] }
        ];
        NzOptionGroupComponent.propDecorators = {
            nzLabel: [{ type: core.Input }]
        };
        return NzOptionGroupComponent;
    }());
    if (false) {
        /** @type {?} */
        NzOptionGroupComponent.prototype.nzLabel;
        /** @type {?} */
        NzOptionGroupComponent.prototype.changes;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: option-container.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzOptionContainerComponent = /** @class */ (function () {
        function NzOptionContainerComponent() {
            this.notFoundContent = undefined;
            this.menuItemSelectedIcon = null;
            this.dropdownRender = null;
            this.activatedValue = null;
            this.listOfSelectedValue = [];
            this.mode = 'default';
            this.matchWidth = true;
            this.itemSize = 32;
            this.maxItemLength = 8;
            this.listOfContainerItem = [];
            this.itemClick = new core.EventEmitter();
            this.scrollToBottom = new core.EventEmitter();
            this.scrolledIndex = 0;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        NzOptionContainerComponent.prototype.onItemClick = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.itemClick.emit(value);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzOptionContainerComponent.prototype.onItemHover = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // TODO: keydown.enter won't activate this value
            this.activatedValue = value;
        };
        /**
         * @param {?} _index
         * @param {?} option
         * @return {?}
         */
        NzOptionContainerComponent.prototype.trackValue = /**
         * @param {?} _index
         * @param {?} option
         * @return {?}
         */
        function (_index, option) {
            return option.key;
        };
        /**
         * @param {?} index
         * @return {?}
         */
        NzOptionContainerComponent.prototype.onScrolledIndexChange = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.scrolledIndex = index;
            if (index === this.listOfContainerItem.length - this.maxItemLength) {
                this.scrollToBottom.emit();
            }
        };
        /**
         * @return {?}
         */
        NzOptionContainerComponent.prototype.scrollToActivatedValue = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var index = this.listOfContainerItem.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.compareWith(item.key, _this.activatedValue); }));
            if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
                this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzOptionContainerComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var listOfContainerItem = changes.listOfContainerItem, activatedValue = changes.activatedValue;
            if (listOfContainerItem || activatedValue) {
                this.scrollToActivatedValue();
            }
        };
        /**
         * @return {?}
         */
        NzOptionContainerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.scrollToActivatedValue(); }));
        };
        NzOptionContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-option-container',
                        exportAs: 'nzOptionContainer',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        template: "\n    <div>\n      <div *ngIf=\"listOfContainerItem.length === 0\" class=\"ant-select-item-empty\">\n        <nz-embed-empty nzComponentName=\"select\" [specificContent]=\"notFoundContent!\"></nz-embed-empty>\n      </div>\n      <cdk-virtual-scroll-viewport\n        [class.full-width]=\"!matchWidth\"\n        [itemSize]=\"itemSize\"\n        [maxBufferPx]=\"itemSize * maxItemLength\"\n        [minBufferPx]=\"itemSize * maxItemLength\"\n        (scrolledIndexChange)=\"onScrolledIndexChange($event)\"\n        [style.height.px]=\"listOfContainerItem.length * itemSize\"\n        [style.max-height.px]=\"itemSize * maxItemLength\"\n      >\n        <ng-template\n          cdkVirtualFor\n          [cdkVirtualForOf]=\"listOfContainerItem\"\n          [cdkVirtualForTrackBy]=\"trackValue\"\n          [cdkVirtualForTemplateCacheSize]=\"0\"\n          let-item\n        >\n          <ng-container [ngSwitch]=\"item.type\">\n            <nz-option-item-group *ngSwitchCase=\"'group'\" [nzLabel]=\"item.groupLabel\"></nz-option-item-group>\n            <nz-option-item\n              *ngSwitchCase=\"'item'\"\n              [icon]=\"menuItemSelectedIcon\"\n              [customContent]=\"item.nzCustomContent\"\n              [template]=\"item.template\"\n              [grouped]=\"!!item.groupLabel\"\n              [disabled]=\"item.nzDisabled\"\n              [showState]=\"mode === 'tags' || mode === 'multiple'\"\n              [label]=\"item.nzLabel\"\n              [compareWith]=\"compareWith\"\n              [activatedValue]=\"activatedValue\"\n              [listOfSelectedValue]=\"listOfSelectedValue\"\n              [value]=\"item.nzValue\"\n              (itemHover)=\"onItemHover($event)\"\n              (itemClick)=\"onItemClick($event)\"\n            ></nz-option-item>\n          </ng-container>\n        </ng-template>\n      </cdk-virtual-scroll-viewport>\n      <ng-template [ngTemplateOutlet]=\"dropdownRender\"></ng-template>\n    </div>\n  ",
                        host: {
                            '[class.ant-select-dropdown]': 'true'
                        }
                    }] }
        ];
        NzOptionContainerComponent.propDecorators = {
            notFoundContent: [{ type: core.Input }],
            menuItemSelectedIcon: [{ type: core.Input }],
            dropdownRender: [{ type: core.Input }],
            activatedValue: [{ type: core.Input }],
            listOfSelectedValue: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            matchWidth: [{ type: core.Input }],
            itemSize: [{ type: core.Input }],
            maxItemLength: [{ type: core.Input }],
            listOfContainerItem: [{ type: core.Input }],
            itemClick: [{ type: core.Output }],
            scrollToBottom: [{ type: core.Output }],
            cdkVirtualScrollViewport: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport, { static: true },] }]
        };
        return NzOptionContainerComponent;
    }());
    if (false) {
        /** @type {?} */
        NzOptionContainerComponent.prototype.notFoundContent;
        /** @type {?} */
        NzOptionContainerComponent.prototype.menuItemSelectedIcon;
        /** @type {?} */
        NzOptionContainerComponent.prototype.dropdownRender;
        /** @type {?} */
        NzOptionContainerComponent.prototype.activatedValue;
        /** @type {?} */
        NzOptionContainerComponent.prototype.listOfSelectedValue;
        /** @type {?} */
        NzOptionContainerComponent.prototype.compareWith;
        /** @type {?} */
        NzOptionContainerComponent.prototype.mode;
        /** @type {?} */
        NzOptionContainerComponent.prototype.matchWidth;
        /** @type {?} */
        NzOptionContainerComponent.prototype.itemSize;
        /** @type {?} */
        NzOptionContainerComponent.prototype.maxItemLength;
        /** @type {?} */
        NzOptionContainerComponent.prototype.listOfContainerItem;
        /** @type {?} */
        NzOptionContainerComponent.prototype.itemClick;
        /** @type {?} */
        NzOptionContainerComponent.prototype.scrollToBottom;
        /** @type {?} */
        NzOptionContainerComponent.prototype.cdkVirtualScrollViewport;
        /**
         * @type {?}
         * @private
         */
        NzOptionContainerComponent.prototype.scrolledIndex;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: option.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzOptionComponent = /** @class */ (function () {
        function NzOptionComponent(nzOptionGroupComponent) {
            this.nzOptionGroupComponent = nzOptionGroupComponent;
            this.destroy$ = new rxjs.Subject();
            this.changes = new rxjs.Subject();
            this.groupLabel = null;
            this.nzLabel = null;
            this.nzValue = null;
            this.nzDisabled = false;
            this.nzHide = false;
            this.nzCustomContent = false;
        }
        /**
         * @return {?}
         */
        NzOptionComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.nzOptionGroupComponent) {
                this.nzOptionGroupComponent.changes.pipe(operators.startWith(true), operators.takeUntil(this.destroy$)).subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.groupLabel = _this.nzOptionGroupComponent.nzLabel;
                }));
            }
        };
        /**
         * @return {?}
         */
        NzOptionComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.changes.next();
        };
        /**
         * @return {?}
         */
        NzOptionComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzOptionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-option',
                        exportAs: 'nzOption',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-template>\n      <ng-content></ng-content>\n    </ng-template>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzOptionComponent.ctorParameters = function () { return [
            { type: NzOptionGroupComponent, decorators: [{ type: core.Optional }] }
        ]; };
        NzOptionComponent.propDecorators = {
            template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }],
            nzLabel: [{ type: core.Input }],
            nzValue: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzHide: [{ type: core.Input }],
            nzCustomContent: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzOptionComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzOptionComponent.prototype, "nzHide", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzOptionComponent.prototype, "nzCustomContent", void 0);
        return NzOptionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzOptionComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzOptionComponent.ngAcceptInputType_nzHide;
        /** @type {?} */
        NzOptionComponent.ngAcceptInputType_nzCustomContent;
        /**
         * @type {?}
         * @private
         */
        NzOptionComponent.prototype.destroy$;
        /** @type {?} */
        NzOptionComponent.prototype.changes;
        /** @type {?} */
        NzOptionComponent.prototype.groupLabel;
        /** @type {?} */
        NzOptionComponent.prototype.template;
        /** @type {?} */
        NzOptionComponent.prototype.nzLabel;
        /** @type {?} */
        NzOptionComponent.prototype.nzValue;
        /** @type {?} */
        NzOptionComponent.prototype.nzDisabled;
        /** @type {?} */
        NzOptionComponent.prototype.nzHide;
        /** @type {?} */
        NzOptionComponent.prototype.nzCustomContent;
        /**
         * @type {?}
         * @private
         */
        NzOptionComponent.prototype.nzOptionGroupComponent;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select-search.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectSearchComponent = /** @class */ (function () {
        function NzSelectSearchComponent(elementRef, renderer, focusMonitor) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.focusMonitor = focusMonitor;
            this.disabled = false;
            this.mirrorSync = false;
            this.showInput = true;
            this.focusTrigger = false;
            this.value = '';
            this.autofocus = false;
            this.valueChange = new core.EventEmitter();
            this.isComposingChange = new core.EventEmitter();
        }
        /**
         * @param {?} isComposing
         * @return {?}
         */
        NzSelectSearchComponent.prototype.setCompositionState = /**
         * @param {?} isComposing
         * @return {?}
         */
        function (isComposing) {
            this.isComposingChange.next(isComposing);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSelectSearchComponent.prototype.onValueChange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var inputDOM = this.inputElement.nativeElement;
            inputDOM.value = value;
            this.value = value;
            this.valueChange.next(value);
            if (this.mirrorSync) {
                this.syncMirrorWidth();
            }
        };
        /**
         * @return {?}
         */
        NzSelectSearchComponent.prototype.clearInputValue = /**
         * @return {?}
         */
        function () {
            this.onValueChange('');
        };
        /**
         * @return {?}
         */
        NzSelectSearchComponent.prototype.syncMirrorWidth = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var mirrorDOM = (/** @type {?} */ (this.mirrorElement)).nativeElement;
            /** @type {?} */
            var hostDOM = this.elementRef.nativeElement;
            /** @type {?} */
            var inputDOM = this.inputElement.nativeElement;
            this.renderer.removeStyle(hostDOM, 'width');
            mirrorDOM.innerHTML = inputDOM.value + "&nbsp;";
            this.renderer.setStyle(hostDOM, 'width', mirrorDOM.scrollWidth + "px");
        };
        /**
         * @return {?}
         */
        NzSelectSearchComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.focusMonitor.focusVia(this.inputElement, 'keyboard');
        };
        /**
         * @return {?}
         */
        NzSelectSearchComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            this.inputElement.nativeElement.blur();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSelectSearchComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var inputDOM = this.inputElement.nativeElement;
            var focusTrigger = changes.focusTrigger, showInput = changes.showInput;
            if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
                inputDOM.focus();
            }
            if (showInput) {
                if (this.showInput) {
                    this.renderer.removeAttribute(inputDOM, 'readonly');
                }
                else {
                    this.renderer.setAttribute(inputDOM, 'readonly', 'readonly');
                }
            }
        };
        /**
         * @return {?}
         */
        NzSelectSearchComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            if (this.mirrorSync) {
                this.syncMirrorWidth();
            }
            if (this.autofocus) {
                this.focus();
            }
        };
        NzSelectSearchComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select-search',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <input\n      #inputElement\n      autocomplete=\"off\"\n      class=\"ant-select-selection-search-input\"\n      [ngModel]=\"value\"\n      [attr.autofocus]=\"autofocus ? 'autofocus' : null\"\n      [disabled]=\"disabled\"\n      [style.opacity]=\"showInput ? null : 0\"\n      (ngModelChange)=\"onValueChange($event)\"\n      (compositionstart)=\"setCompositionState(true)\"\n      (compositionend)=\"setCompositionState(false)\"\n    />\n    <span #mirrorElement *ngIf=\"mirrorSync\" class=\"ant-select-selection-search-mirror\"></span>\n  ",
                        host: {
                            '[class.ant-select-selection-search]': 'true'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSelectSearchComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: a11y.FocusMonitor }
        ]; };
        NzSelectSearchComponent.propDecorators = {
            disabled: [{ type: core.Input }],
            mirrorSync: [{ type: core.Input }],
            showInput: [{ type: core.Input }],
            focusTrigger: [{ type: core.Input }],
            value: [{ type: core.Input }],
            autofocus: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            isComposingChange: [{ type: core.Output }],
            inputElement: [{ type: core.ViewChild, args: ['inputElement', { static: true },] }],
            mirrorElement: [{ type: core.ViewChild, args: ['mirrorElement', { static: false },] }]
        };
        return NzSelectSearchComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectSearchComponent.prototype.disabled;
        /** @type {?} */
        NzSelectSearchComponent.prototype.mirrorSync;
        /** @type {?} */
        NzSelectSearchComponent.prototype.showInput;
        /** @type {?} */
        NzSelectSearchComponent.prototype.focusTrigger;
        /** @type {?} */
        NzSelectSearchComponent.prototype.value;
        /** @type {?} */
        NzSelectSearchComponent.prototype.autofocus;
        /** @type {?} */
        NzSelectSearchComponent.prototype.valueChange;
        /** @type {?} */
        NzSelectSearchComponent.prototype.isComposingChange;
        /** @type {?} */
        NzSelectSearchComponent.prototype.inputElement;
        /** @type {?} */
        NzSelectSearchComponent.prototype.mirrorElement;
        /**
         * @type {?}
         * @private
         */
        NzSelectSearchComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzSelectSearchComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzSelectSearchComponent.prototype.focusMonitor;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select-top-control.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectTopControlComponent = /** @class */ (function () {
        function NzSelectTopControlComponent(noAnimation) {
            this.noAnimation = noAnimation;
            this.showSearch = false;
            this.placeHolder = null;
            this.open = false;
            this.maxTagCount = Infinity;
            this.autofocus = false;
            this.disabled = false;
            this.mode = 'default';
            this.customTemplate = null;
            this.maxTagPlaceholder = null;
            this.removeIcon = null;
            this.listOfTopItem = [];
            this.tokenSeparators = [];
            this.tokenize = new core.EventEmitter();
            this.inputValueChange = new core.EventEmitter();
            this.animationEnd = new core.EventEmitter();
            this.deleteItem = new core.EventEmitter();
            this.openChange = new core.EventEmitter();
            this.listOfSlicedItem = [];
            this.isShowPlaceholder = true;
            this.isShowSingleLabel = false;
            this.isComposing = false;
            this.inputValue = null;
        }
        /**
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.onHostClick = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this.openChange.next(!this.open);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.onHostKeydown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var inputValue = ((/** @type {?} */ (e.target))).value;
            if (e.keyCode === keycodes.BACKSPACE && this.mode !== 'default' && !inputValue && this.listOfTopItem.length > 0) {
                e.preventDefault();
                this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]);
            }
        };
        /**
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.updateTemplateVariable = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var isSelectedValueEmpty = this.listOfTopItem.length === 0;
            this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
            this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
        };
        /**
         * @param {?} isComposing
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.isComposingChange = /**
         * @param {?} isComposing
         * @return {?}
         */
        function (isComposing) {
            this.isComposing = isComposing;
            this.updateTemplateVariable();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.onInputValueChange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.inputValue) {
                this.inputValue = value;
                this.updateTemplateVariable();
                this.inputValueChange.emit(value);
                this.tokenSeparate(value, this.tokenSeparators);
            }
        };
        /**
         * @param {?} inputValue
         * @param {?} tokenSeparators
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.tokenSeparate = /**
         * @param {?} inputValue
         * @param {?} tokenSeparators
         * @return {?}
         */
        function (inputValue, tokenSeparators) {
            /** @type {?} */
            var includesSeparators = (/**
             * @param {?} str
             * @param {?} separators
             * @return {?}
             */
            function (str, separators) {
                // tslint:disable-next-line:prefer-for-of
                for (var i = 0; i < separators.length; ++i) {
                    if (str.lastIndexOf(separators[i]) > 0) {
                        return true;
                    }
                }
                return false;
            });
            /** @type {?} */
            var splitBySeparators = (/**
             * @param {?} str
             * @param {?} separators
             * @return {?}
             */
            function (str, separators) {
                /** @type {?} */
                var reg = new RegExp("[" + separators.join() + "]");
                /** @type {?} */
                var array = ((/** @type {?} */ (str))).split(reg).filter((/**
                 * @param {?} token
                 * @return {?}
                 */
                function (token) { return token; }));
                return __spread(new Set(array));
            });
            if (inputValue &&
                inputValue.length &&
                tokenSeparators.length &&
                this.mode !== 'default' &&
                includesSeparators(inputValue, tokenSeparators)) {
                /** @type {?} */
                var listOfLabel = splitBySeparators(inputValue, tokenSeparators);
                this.tokenize.next(listOfLabel);
            }
        };
        /**
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.clearInputValue = /**
         * @return {?}
         */
        function () {
            if (this.nzSelectSearchComponent) {
                this.nzSelectSearchComponent.clearInputValue();
            }
        };
        /**
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            if (this.nzSelectSearchComponent) {
                this.nzSelectSearchComponent.focus();
            }
        };
        /**
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            if (this.nzSelectSearchComponent) {
                this.nzSelectSearchComponent.blur();
            }
        };
        /**
         * @param {?} _index
         * @param {?} option
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.trackValue = /**
         * @param {?} _index
         * @param {?} option
         * @return {?}
         */
        function (_index, option) {
            return option.nzValue;
        };
        /**
         * @param {?} item
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.onDeleteItem = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!this.disabled && !item.nzDisabled) {
                this.deleteItem.next(item);
            }
        };
        /**
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.onAnimationEnd = /**
         * @return {?}
         */
        function () {
            this.animationEnd.next();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSelectTopControlComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            var listOfTopItem = changes.listOfTopItem, maxTagCount = changes.maxTagCount, customTemplate = changes.customTemplate, maxTagPlaceholder = changes.maxTagPlaceholder;
            if (listOfTopItem) {
                this.updateTemplateVariable();
            }
            if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
                /** @type {?} */
                var listOfSlicedItem = this.listOfTopItem.slice(0, this.maxTagCount).map((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) {
                    return {
                        nzLabel: o.nzLabel,
                        nzValue: o.nzValue,
                        nzDisabled: o.nzDisabled,
                        contentTemplateOutlet: _this.customTemplate,
                        contentTemplateOutletContext: o
                    };
                }));
                if (this.listOfTopItem.length > this.maxTagCount) {
                    /** @type {?} */
                    var exceededLabel = "+ " + (this.listOfTopItem.length - this.maxTagCount) + " ...";
                    /** @type {?} */
                    var listOfSelectedValue = this.listOfTopItem.map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.nzValue; }));
                    /** @type {?} */
                    var exceededItem = {
                        nzLabel: exceededLabel,
                        nzValue: '$$__nz_exceeded_item',
                        nzDisabled: true,
                        contentTemplateOutlet: this.maxTagPlaceholder,
                        contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
                    };
                    listOfSlicedItem.push(exceededItem);
                }
                this.listOfSlicedItem = listOfSlicedItem;
            }
        };
        NzSelectTopControlComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select-top-control',
                        exportAs: 'nzSelectTopControl',
                        preserveWhitespaces: false,
                        animations: [animation.zoomMotion],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <!--single mode-->\n    <ng-container [ngSwitch]=\"mode\">\n      <ng-container *ngSwitchCase=\"'default'\">\n        <nz-select-item\n          *ngIf=\"isShowSingleLabel\"\n          [deletable]=\"false\"\n          [disabled]=\"false\"\n          [removeIcon]=\"removeIcon\"\n          [label]=\"listOfTopItem[0].nzLabel\"\n          [contentTemplateOutlet]=\"customTemplate\"\n          [contentTemplateOutletContext]=\"listOfTopItem[0]\"\n        ></nz-select-item>\n        <nz-select-search\n          [disabled]=\"disabled\"\n          [value]=\"inputValue!\"\n          [showInput]=\"open && showSearch\"\n          [mirrorSync]=\"false\"\n          [autofocus]=\"autofocus\"\n          [focusTrigger]=\"open\"\n          (isComposingChange)=\"isComposingChange($event)\"\n          (valueChange)=\"onInputValueChange($event)\"\n        ></nz-select-search>\n      </ng-container>\n      <ng-container *ngSwitchDefault>\n        <!--multiple or tags mode-->\n        <nz-select-item\n          *ngFor=\"let item of listOfSlicedItem; trackBy: trackValue\"\n          [@zoomMotion]\n          [@.disabled]=\"noAnimation?.nzNoAnimation\"\n          [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n          [removeIcon]=\"removeIcon\"\n          [label]=\"item.nzLabel\"\n          [disabled]=\"item.nzDisabled || disabled\"\n          [contentTemplateOutlet]=\"item.contentTemplateOutlet\"\n          [deletable]=\"true\"\n          [contentTemplateOutletContext]=\"item.contentTemplateOutletContext\"\n          (@zoomMotion.done)=\"onAnimationEnd()\"\n          (delete)=\"onDeleteItem(item.contentTemplateOutletContext)\"\n        >\n        </nz-select-item>\n        <nz-select-search\n          [disabled]=\"disabled\"\n          [value]=\"inputValue!\"\n          [autofocus]=\"autofocus\"\n          [showInput]=\"true\"\n          [mirrorSync]=\"true\"\n          [focusTrigger]=\"open\"\n          (isComposingChange)=\"isComposingChange($event)\"\n          (valueChange)=\"onInputValueChange($event)\"\n        ></nz-select-search>\n      </ng-container>\n    </ng-container>\n    <nz-select-placeholder *ngIf=\"isShowPlaceholder\" [placeholder]=\"placeHolder\"></nz-select-placeholder>\n  ",
                        host: {
                            '[class.ant-select-selector]': 'true',
                            '(click)': 'onHostClick()',
                            '(keydown)': 'onHostKeydown($event)'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSelectTopControlComponent.ctorParameters = function () { return [
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzSelectTopControlComponent.propDecorators = {
            showSearch: [{ type: core.Input }],
            placeHolder: [{ type: core.Input }],
            open: [{ type: core.Input }],
            maxTagCount: [{ type: core.Input }],
            autofocus: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            maxTagPlaceholder: [{ type: core.Input }],
            removeIcon: [{ type: core.Input }],
            listOfTopItem: [{ type: core.Input }],
            tokenSeparators: [{ type: core.Input }],
            tokenize: [{ type: core.Output }],
            inputValueChange: [{ type: core.Output }],
            animationEnd: [{ type: core.Output }],
            deleteItem: [{ type: core.Output }],
            openChange: [{ type: core.Output }],
            nzSelectSearchComponent: [{ type: core.ViewChild, args: [NzSelectSearchComponent,] }]
        };
        return NzSelectTopControlComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectTopControlComponent.prototype.showSearch;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.placeHolder;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.open;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.maxTagCount;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.autofocus;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.disabled;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.mode;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.customTemplate;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.maxTagPlaceholder;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.removeIcon;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.listOfTopItem;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.tokenSeparators;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.tokenize;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.inputValueChange;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.animationEnd;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.deleteItem;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.openChange;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.nzSelectSearchComponent;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.listOfSlicedItem;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.isShowPlaceholder;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.isShowSingleLabel;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.isComposing;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.inputValue;
        /** @type {?} */
        NzSelectTopControlComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var defaultFilterOption = (/**
     * @param {?} searchValue
     * @param {?} item
     * @return {?}
     */
    function (searchValue, item) {
        if (item && item.nzLabel) {
            return item.nzLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        }
        else {
            return false;
        }
    });
    var ??0 = defaultFilterOption;
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'select';
    var NzSelectComponent = /** @class */ (function () {
        function NzSelectComponent(nzConfigService, cdr, elementRef, platform, focusMonitor, noAnimation) {
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.elementRef = elementRef;
            this.platform = platform;
            this.focusMonitor = focusMonitor;
            this.noAnimation = noAnimation;
            this.nzSize = 'default';
            this.nzOptionHeightPx = 32;
            this.nzOptionOverflowSize = 8;
            this.nzDropdownClassName = null;
            this.nzDropdownMatchSelectWidth = true;
            this.nzDropdownStyle = null;
            this.nzNotFoundContent = undefined;
            this.nzPlaceHolder = null;
            this.nzMaxTagCount = Infinity;
            this.nzDropdownRender = null;
            this.nzCustomTemplate = null;
            this.nzSuffixIcon = null;
            this.nzClearIcon = null;
            this.nzRemoveIcon = null;
            this.nzMenuItemSelectedIcon = null;
            this.nzShowArrow = true;
            this.nzTokenSeparators = [];
            this.nzMaxTagPlaceholder = null;
            this.nzMaxMultipleCount = Infinity;
            this.nzMode = 'default';
            this.nzFilterOption = defaultFilterOption;
            this.compareWith = (/**
             * @param {?} o1
             * @param {?} o2
             * @return {?}
             */
            function (o1, o2) { return o1 === o2; });
            this.nzAllowClear = false;
            this.nzBorderless = false;
            this.nzShowSearch = false;
            this.nzLoading = false;
            this.nzAutoFocus = false;
            this.nzAutoClearSearchValue = true;
            this.nzServerSearch = false;
            this.nzDisabled = false;
            this.nzOpen = false;
            this.nzOptions = [];
            this.nzOnSearch = new core.EventEmitter();
            this.nzScrollToBottom = new core.EventEmitter();
            this.nzOpenChange = new core.EventEmitter();
            this.nzBlur = new core.EventEmitter();
            this.nzFocus = new core.EventEmitter();
            this.listOfValue$ = new rxjs.BehaviorSubject([]);
            this.listOfTemplateItem$ = new rxjs.BehaviorSubject([]);
            this.listOfTagAndTemplateItem = [];
            this.searchValue = '';
            this.isReactiveDriven = false;
            this.destroy$ = new rxjs.Subject();
            this.onChange = (/**
             * @return {?}
             */
            function () { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            this.dropDownPosition = 'bottom';
            this.triggerWidth = null;
            this.listOfContainerItem = [];
            this.listOfTopItem = [];
            this.activatedValue = null;
            this.listOfValue = [];
            this.focused = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        NzSelectComponent.prototype.generateTagItem = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return {
                nzValue: value,
                nzLabel: value,
                type: 'item'
            };
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSelectComponent.prototype.onItemClick = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.activatedValue = value;
            if (this.nzMode === 'default') {
                if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
                    this.updateListOfValue([value]);
                }
                this.setOpenState(false);
            }
            else {
                /** @type {?} */
                var targetIndex_1 = this.listOfValue.findIndex((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return _this.compareWith(o, value); }));
                if (targetIndex_1 !== -1) {
                    /** @type {?} */
                    var listOfValueAfterRemoved = this.listOfValue.filter((/**
                     * @param {?} _
                     * @param {?} i
                     * @return {?}
                     */
                    function (_, i) { return i !== targetIndex_1; }));
                    this.updateListOfValue(listOfValueAfterRemoved);
                }
                else if (this.listOfValue.length < this.nzMaxMultipleCount) {
                    /** @type {?} */
                    var listOfValueAfterAdded = __spread(this.listOfValue, [value]);
                    this.updateListOfValue(listOfValueAfterAdded);
                }
                this.focus();
                if (this.nzAutoClearSearchValue) {
                    this.clearInput();
                }
            }
        };
        /**
         * @param {?} item
         * @return {?}
         */
        NzSelectComponent.prototype.onItemDelete = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            var _this = this;
            /** @type {?} */
            var listOfSelectedValue = this.listOfValue.filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return !_this.compareWith(v, item.nzValue); }));
            this.updateListOfValue(listOfSelectedValue);
            this.clearInput();
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.updateListOfContainerItem = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var listOfContainerItem = this.listOfTagAndTemplateItem
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !item.nzHide; }))
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (!_this.nzServerSearch && _this.searchValue) {
                    return _this.nzFilterOption(_this.searchValue, item);
                }
                else {
                    return true;
                }
            }));
            if (this.nzMode === 'tags' && this.searchValue) {
                /** @type {?} */
                var matchedItem = this.listOfTagAndTemplateItem.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.nzLabel === _this.searchValue; }));
                if (!matchedItem) {
                    /** @type {?} */
                    var tagItem = this.generateTagItem(this.searchValue);
                    listOfContainerItem = __spread([tagItem], listOfContainerItem);
                    this.activatedValue = tagItem.nzValue;
                }
                else {
                    this.activatedValue = matchedItem.nzValue;
                }
            }
            if (this.listOfValue.length !== 0 &&
                listOfContainerItem.findIndex((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return _this.compareWith(item.nzValue, _this.activatedValue); })) === -1) {
                /** @type {?} */
                var activatedItem = listOfContainerItem.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return _this.compareWith(item.nzValue, _this.listOfValue[0]); })) || listOfContainerItem[0];
                this.activatedValue = (activatedItem && activatedItem.nzValue) || null;
            }
            /** @type {?} */
            var listOfGroupLabel = [];
            if (this.isReactiveDriven) {
                listOfGroupLabel = __spread(new Set(this.nzOptions.filter((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return o.groupLabel; })).map((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return (/** @type {?} */ (o.groupLabel)); }))));
            }
            else {
                if (this.listOfNzOptionGroupComponent) {
                    listOfGroupLabel = this.listOfNzOptionGroupComponent.map((/**
                     * @param {?} o
                     * @return {?}
                     */
                    function (o) { return o.nzLabel; }));
                }
            }
            /** insert group item **/
            listOfGroupLabel.forEach((/**
             * @param {?} label
             * @return {?}
             */
            function (label) {
                /** @type {?} */
                var index = listOfContainerItem.findIndex((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return label === item.groupLabel; }));
                if (index > -1) {
                    /** @type {?} */
                    var groupItem = (/** @type {?} */ ({ groupLabel: label, type: 'group', key: label }));
                    listOfContainerItem.splice(index, 0, groupItem);
                }
            }));
            this.listOfContainerItem = __spread(listOfContainerItem);
            this.updateCdkConnectedOverlayPositions();
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.clearInput = /**
         * @return {?}
         */
        function () {
            this.nzSelectTopControlComponent.clearInputValue();
        };
        /**
         * @param {?} listOfValue
         * @return {?}
         */
        NzSelectComponent.prototype.updateListOfValue = /**
         * @param {?} listOfValue
         * @return {?}
         */
        function (listOfValue) {
            /** @type {?} */
            var covertListToModel = (/**
             * @param {?} list
             * @param {?} mode
             * @return {?}
             */
            function (list, mode) {
                if (mode === 'default') {
                    if (list.length > 0) {
                        return list[0];
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return list;
                }
            });
            /** @type {?} */
            var model = covertListToModel(listOfValue, this.nzMode);
            if (this.value !== model) {
                this.listOfValue = listOfValue;
                this.listOfValue$.next(listOfValue);
                this.value = model;
                this.onChange(this.value);
            }
        };
        /**
         * @param {?} listOfLabel
         * @return {?}
         */
        NzSelectComponent.prototype.onTokenSeparate = /**
         * @param {?} listOfLabel
         * @return {?}
         */
        function (listOfLabel) {
            var _this = this;
            /** @type {?} */
            var listOfMatchedValue = this.listOfTagAndTemplateItem
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return listOfLabel.findIndex((/**
             * @param {?} label
             * @return {?}
             */
            function (label) { return label === item.nzLabel; })) !== -1; }))
                .map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.nzValue; }))
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.listOfValue.findIndex((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return _this.compareWith(v, item); })) === -1; }));
            if (this.nzMode === 'multiple') {
                this.updateListOfValue(__spread(this.listOfValue, listOfMatchedValue));
            }
            else if (this.nzMode === 'tags') {
                /** @type {?} */
                var listOfUnMatchedLabel = listOfLabel.filter((/**
                 * @param {?} label
                 * @return {?}
                 */
                function (label) { return _this.listOfTagAndTemplateItem.findIndex((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.nzLabel === label; })) === -1; }));
                this.updateListOfValue(__spread(this.listOfValue, listOfMatchedValue, listOfUnMatchedLabel));
            }
            this.clearInput();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzSelectComponent.prototype.onKeyDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            if (this.nzDisabled) {
                return;
            }
            /** @type {?} */
            var listOfFilteredOptionNotDisabled = this.listOfContainerItem.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.type === 'item'; })).filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !item.nzDisabled; }));
            /** @type {?} */
            var activatedIndex = listOfFilteredOptionNotDisabled.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.compareWith(item.nzValue, _this.activatedValue); }));
            switch (e.keyCode) {
                case keycodes.UP_ARROW:
                    e.preventDefault();
                    if (this.nzOpen) {
                        /** @type {?} */
                        var preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
                        this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].nzValue;
                    }
                    break;
                case keycodes.DOWN_ARROW:
                    e.preventDefault();
                    if (this.nzOpen) {
                        /** @type {?} */
                        var nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
                        this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].nzValue;
                    }
                    else {
                        this.setOpenState(true);
                    }
                    break;
                case keycodes.ENTER:
                    e.preventDefault();
                    if (this.nzOpen) {
                        if (this.activatedValue) {
                            this.onItemClick(this.activatedValue);
                        }
                    }
                    else {
                        this.setOpenState(true);
                    }
                    break;
                case keycodes.SPACE:
                    if (!this.nzOpen) {
                        this.setOpenState(true);
                        e.preventDefault();
                    }
                    break;
                case keycodes.TAB:
                    this.setOpenState(false);
                    break;
                case keycodes.ESCAPE:
                    this.setOpenState(false);
                    break;
                default:
                    if (!this.nzOpen) {
                        this.setOpenState(true);
                    }
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSelectComponent.prototype.setOpenState = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.nzOpen !== value) {
                this.nzOpen = value;
                this.nzOpenChange.emit(value);
                this.onOpenChange();
                this.cdr.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.onOpenChange = /**
         * @return {?}
         */
        function () {
            this.updateCdkConnectedOverlayStatus();
            this.clearInput();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSelectComponent.prototype.onInputValueChange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.searchValue = value;
            this.updateListOfContainerItem();
            this.nzOnSearch.emit(value);
            this.updateCdkConnectedOverlayPositions();
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.onClearSelection = /**
         * @return {?}
         */
        function () {
            this.updateListOfValue([]);
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.nzSelectTopControlComponent.focus();
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            this.nzSelectTopControlComponent.blur();
        };
        /**
         * @param {?} position
         * @return {?}
         */
        NzSelectComponent.prototype.onPositionChange = /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            this.dropDownPosition = position.connectionPair.originY;
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.updateCdkConnectedOverlayStatus = /**
         * @return {?}
         */
        function () {
            if (this.platform.isBrowser && this.originElement.nativeElement) {
                this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
            }
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.updateCdkConnectedOverlayPositions = /**
         * @return {?}
         */
        function () {
            if (this.cdkConnectedOverlay.overlayRef) {
                this.cdkConnectedOverlay.overlayRef.updatePosition();
            }
        };
        /**
         * @param {?} modelValue
         * @return {?}
         */
        NzSelectComponent.prototype.writeValue = /**
         * @param {?} modelValue
         * @return {?}
         */
        function (modelValue) {
            /** https://github.com/angular/angular/issues/14988 **/
            if (this.value !== modelValue) {
                this.value = modelValue;
                /** @type {?} */
                var covertModelToList = (/**
                 * @param {?} model
                 * @param {?} mode
                 * @return {?}
                 */
                function (model, mode) {
                    if (model === null || model === undefined) {
                        return [];
                    }
                    else if (mode === 'default') {
                        return [model];
                    }
                    else {
                        return model;
                    }
                });
                /** @type {?} */
                var listOfValue = covertModelToList(modelValue, this.nzMode);
                this.listOfValue = listOfValue;
                this.listOfValue$.next(listOfValue);
                this.cdr.markForCheck();
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzSelectComponent.prototype.registerOnChange = /**
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
        NzSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} disabled
         * @return {?}
         */
        NzSelectComponent.prototype.setDisabledState = /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this.nzDisabled = disabled;
            if (disabled) {
                this.setOpenState(false);
            }
            this.cdr.markForCheck();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSelectComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzOpen = changes.nzOpen, nzDisabled = changes.nzDisabled, nzOptions = changes.nzOptions;
            if (nzOpen) {
                this.onOpenChange();
            }
            if (nzDisabled && this.nzDisabled) {
                this.setOpenState(false);
            }
            if (nzOptions) {
                this.isReactiveDriven = true;
                /** @type {?} */
                var listOfOptions = this.nzOptions || [];
                /** @type {?} */
                var listOfTransformedItem = listOfOptions.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return {
                        template: item.label instanceof core.TemplateRef ? item.label : null,
                        nzLabel: typeof item.label === 'string' ? item.label : null,
                        nzValue: item.value,
                        nzDisabled: item.disabled || false,
                        nzHide: item.hide || false,
                        nzCustomContent: item.label instanceof core.TemplateRef,
                        groupLabel: item.groupLabel || null,
                        type: 'item',
                        key: item.value
                    };
                }));
                this.listOfTemplateItem$.next(listOfTransformedItem);
            }
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.focusMonitor
                .monitor(this.elementRef, true)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} focusOrigin
             * @return {?}
             */
            function (focusOrigin) {
                if (!focusOrigin) {
                    _this.focused = false;
                    _this.cdr.markForCheck();
                    _this.nzBlur.emit();
                    Promise.resolve().then((/**
                     * @return {?}
                     */
                    function () {
                        _this.onTouched();
                    }));
                }
                else {
                    _this.focused = true;
                    _this.cdr.markForCheck();
                    _this.nzFocus.emit();
                }
            }));
            rxjs.combineLatest([this.listOfValue$, this.listOfTemplateItem$])
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), listOfSelectedValue = _b[0], listOfTemplateItem = _b[1];
                /** @type {?} */
                var listOfTagItem = listOfSelectedValue
                    .filter((/**
                 * @return {?}
                 */
                function () { return _this.nzMode === 'tags'; }))
                    .filter((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return listOfTemplateItem.findIndex((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return _this.compareWith(o.nzValue, value); })) === -1; }))
                    .map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return _this.listOfTopItem.find((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return _this.compareWith(o.nzValue, value); })) || _this.generateTagItem(value); }));
                _this.listOfTagAndTemplateItem = __spread(listOfTemplateItem, listOfTagItem);
                _this.listOfTopItem = _this.listOfValue
                    .map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return (/** @type {?} */ (__spread(_this.listOfTagAndTemplateItem, _this.listOfTopItem).find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return _this.compareWith(v, item.nzValue); })))); }))
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item; }));
                _this.updateListOfContainerItem();
            }));
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.updateCdkConnectedOverlayStatus();
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.isReactiveDriven) {
                rxjs.merge(this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes)
                    .pipe(operators.startWith(true), operators.switchMap((/**
                 * @return {?}
                 */
                function () {
                    return rxjs.merge.apply(void 0, __spread([
                        _this.listOfNzOptionComponent.changes,
                        _this.listOfNzOptionGroupComponent.changes
                    ], _this.listOfNzOptionComponent.map((/**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) { return option.changes; })), _this.listOfNzOptionGroupComponent.map((/**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) { return option.changes; })))).pipe(operators.startWith(true));
                })), operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var listOfOptionInterface = _this.listOfNzOptionComponent.toArray().map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        var template = item.template, nzLabel = item.nzLabel, nzValue = item.nzValue, nzDisabled = item.nzDisabled, nzHide = item.nzHide, nzCustomContent = item.nzCustomContent, groupLabel = item.groupLabel;
                        return { template: template, nzLabel: nzLabel, nzValue: nzValue, nzDisabled: nzDisabled, nzHide: nzHide, nzCustomContent: nzCustomContent, groupLabel: groupLabel, type: 'item', key: nzValue };
                    }));
                    _this.listOfTemplateItem$.next(listOfOptionInterface);
                    _this.cdr.markForCheck();
                }));
            }
        };
        /**
         * @return {?}
         */
        NzSelectComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select',
                        exportAs: 'nzSelect',
                        preserveWhitespaces: false,
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzSelectComponent; })),
                                multi: true
                            }
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [animation.slideMotion],
                        template: "\n    <nz-select-top-control\n      cdkOverlayOrigin\n      #origin=\"cdkOverlayOrigin\"\n      [open]=\"nzOpen\"\n      [disabled]=\"nzDisabled\"\n      [mode]=\"nzMode\"\n      [@.disabled]=\"noAnimation?.nzNoAnimation\"\n      [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n      [maxTagPlaceholder]=\"nzMaxTagPlaceholder\"\n      [removeIcon]=\"nzRemoveIcon\"\n      [placeHolder]=\"nzPlaceHolder\"\n      [maxTagCount]=\"nzMaxTagCount\"\n      [customTemplate]=\"nzCustomTemplate\"\n      [tokenSeparators]=\"nzTokenSeparators\"\n      [showSearch]=\"nzShowSearch\"\n      [autofocus]=\"nzAutoFocus\"\n      [listOfTopItem]=\"listOfTopItem\"\n      (inputValueChange)=\"onInputValueChange($event)\"\n      (tokenize)=\"onTokenSeparate($event)\"\n      (animationEnd)=\"updateCdkConnectedOverlayPositions()\"\n      (deleteItem)=\"onItemDelete($event)\"\n      (keydown)=\"onKeyDown($event)\"\n      (openChange)=\"setOpenState($event)\"\n    ></nz-select-top-control>\n    <nz-select-clear\n      *ngIf=\"nzAllowClear && !nzDisabled && listOfValue.length\"\n      [clearIcon]=\"nzClearIcon\"\n      (clear)=\"onClearSelection()\"\n    ></nz-select-clear>\n    <nz-select-arrow\n      *ngIf=\"nzShowArrow && nzMode === 'default'\"\n      [loading]=\"nzLoading\"\n      [search]=\"nzOpen && nzShowSearch\"\n      [suffixIcon]=\"nzSuffixIcon\"\n    ></nz-select-arrow>\n    <ng-template\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayHasBackdrop]=\"true\"\n      [cdkConnectedOverlayMinWidth]=\"$any(nzDropdownMatchSelectWidth ? null : triggerWidth)\"\n      [cdkConnectedOverlayWidth]=\"$any(nzDropdownMatchSelectWidth ? triggerWidth : null)\"\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayTransformOriginOn]=\"'.ant-select-dropdown'\"\n      [cdkConnectedOverlayPanelClass]=\"nzDropdownClassName!\"\n      (backdropClick)=\"setOpenState(false)\"\n      (detach)=\"setOpenState(false)\"\n      (positionChange)=\"onPositionChange($event)\"\n      [cdkConnectedOverlayOpen]=\"nzOpen\"\n    >\n      <nz-option-container\n        [ngStyle]=\"nzDropdownStyle\"\n        [itemSize]=\"nzOptionHeightPx\"\n        [maxItemLength]=\"nzOptionOverflowSize\"\n        [matchWidth]=\"nzDropdownMatchSelectWidth\"\n        [class.ant-select-dropdown-placement-bottomLeft]=\"dropDownPosition === 'bottom'\"\n        [class.ant-select-dropdown-placement-topLeft]=\"dropDownPosition === 'top'\"\n        [@slideMotion]=\"'enter'\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [listOfContainerItem]=\"listOfContainerItem\"\n        [menuItemSelectedIcon]=\"nzMenuItemSelectedIcon\"\n        [notFoundContent]=\"nzNotFoundContent\"\n        [activatedValue]=\"activatedValue\"\n        [listOfSelectedValue]=\"listOfValue\"\n        [dropdownRender]=\"nzDropdownRender\"\n        [compareWith]=\"compareWith\"\n        [mode]=\"nzMode\"\n        (keydown)=\"onKeyDown($event)\"\n        (itemClick)=\"onItemClick($event)\"\n        (scrollToBottom)=\"nzScrollToBottom.emit()\"\n      ></nz-option-container>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-select]': 'true',
                            '[class.ant-select-lg]': 'nzSize === "large"',
                            '[class.ant-select-sm]': 'nzSize === "small"',
                            '[class.ant-select-show-arrow]': "nzShowArrow && nzMode === 'default'",
                            '[class.ant-select-disabled]': 'nzDisabled',
                            '[class.ant-select-show-search]': "nzShowSearch || nzMode !== 'default'",
                            '[class.ant-select-allow-clear]': 'nzAllowClear',
                            '[class.ant-select-borderless]': 'nzBorderless',
                            '[class.ant-select-open]': 'nzOpen',
                            '[class.ant-select-focused]': 'nzOpen || focused',
                            '[class.ant-select-single]': "nzMode === 'default'",
                            '[class.ant-select-multiple]': "nzMode !== 'default'"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSelectComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: platform.Platform },
            { type: a11y.FocusMonitor },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzSelectComponent.propDecorators = {
            nzSize: [{ type: core.Input }],
            nzOptionHeightPx: [{ type: core.Input }],
            nzOptionOverflowSize: [{ type: core.Input }],
            nzDropdownClassName: [{ type: core.Input }],
            nzDropdownMatchSelectWidth: [{ type: core.Input }],
            nzDropdownStyle: [{ type: core.Input }],
            nzNotFoundContent: [{ type: core.Input }],
            nzPlaceHolder: [{ type: core.Input }],
            nzMaxTagCount: [{ type: core.Input }],
            nzDropdownRender: [{ type: core.Input }],
            nzCustomTemplate: [{ type: core.Input }],
            nzSuffixIcon: [{ type: core.Input }],
            nzClearIcon: [{ type: core.Input }],
            nzRemoveIcon: [{ type: core.Input }],
            nzMenuItemSelectedIcon: [{ type: core.Input }],
            nzShowArrow: [{ type: core.Input }],
            nzTokenSeparators: [{ type: core.Input }],
            nzMaxTagPlaceholder: [{ type: core.Input }],
            nzMaxMultipleCount: [{ type: core.Input }],
            nzMode: [{ type: core.Input }],
            nzFilterOption: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            nzAllowClear: [{ type: core.Input }],
            nzBorderless: [{ type: core.Input }],
            nzShowSearch: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzAutoFocus: [{ type: core.Input }],
            nzAutoClearSearchValue: [{ type: core.Input }],
            nzServerSearch: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzOpen: [{ type: core.Input }],
            nzOptions: [{ type: core.Input }],
            nzOnSearch: [{ type: core.Output }],
            nzScrollToBottom: [{ type: core.Output }],
            nzOpenChange: [{ type: core.Output }],
            nzBlur: [{ type: core.Output }],
            nzFocus: [{ type: core.Output }],
            originElement: [{ type: core.ViewChild, args: [overlay.CdkOverlayOrigin, { static: true, read: core.ElementRef },] }],
            cdkConnectedOverlay: [{ type: core.ViewChild, args: [overlay.CdkConnectedOverlay, { static: true },] }],
            nzSelectTopControlComponent: [{ type: core.ViewChild, args: [NzSelectTopControlComponent, { static: true },] }],
            listOfNzOptionComponent: [{ type: core.ContentChildren, args: [NzOptionComponent, { descendants: true },] }],
            listOfNzOptionGroupComponent: [{ type: core.ContentChildren, args: [NzOptionGroupComponent, { descendants: true },] }],
            nzOptionGroupComponentElement: [{ type: core.ViewChild, args: [NzOptionGroupComponent, { static: true, read: core.ElementRef },] }],
            nzSelectTopControlComponentElement: [{ type: core.ViewChild, args: [NzSelectTopControlComponent, { static: true, read: core.ElementRef },] }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzSuffixIcon", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzAllowClear", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzBorderless", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzShowSearch", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzLoading", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzAutoFocus", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzAutoClearSearchValue", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzServerSearch", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSelectComponent.prototype, "nzOpen", void 0);
        return NzSelectComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzAllowClear;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzBorderless;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzShowSearch;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzAutoFocus;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzAutoClearSearchValue;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzServerSearch;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzSelectComponent.ngAcceptInputType_nzOpen;
        /** @type {?} */
        NzSelectComponent.prototype.nzSize;
        /** @type {?} */
        NzSelectComponent.prototype.nzOptionHeightPx;
        /** @type {?} */
        NzSelectComponent.prototype.nzOptionOverflowSize;
        /** @type {?} */
        NzSelectComponent.prototype.nzDropdownClassName;
        /** @type {?} */
        NzSelectComponent.prototype.nzDropdownMatchSelectWidth;
        /** @type {?} */
        NzSelectComponent.prototype.nzDropdownStyle;
        /** @type {?} */
        NzSelectComponent.prototype.nzNotFoundContent;
        /** @type {?} */
        NzSelectComponent.prototype.nzPlaceHolder;
        /** @type {?} */
        NzSelectComponent.prototype.nzMaxTagCount;
        /** @type {?} */
        NzSelectComponent.prototype.nzDropdownRender;
        /** @type {?} */
        NzSelectComponent.prototype.nzCustomTemplate;
        /** @type {?} */
        NzSelectComponent.prototype.nzSuffixIcon;
        /** @type {?} */
        NzSelectComponent.prototype.nzClearIcon;
        /** @type {?} */
        NzSelectComponent.prototype.nzRemoveIcon;
        /** @type {?} */
        NzSelectComponent.prototype.nzMenuItemSelectedIcon;
        /** @type {?} */
        NzSelectComponent.prototype.nzShowArrow;
        /** @type {?} */
        NzSelectComponent.prototype.nzTokenSeparators;
        /** @type {?} */
        NzSelectComponent.prototype.nzMaxTagPlaceholder;
        /** @type {?} */
        NzSelectComponent.prototype.nzMaxMultipleCount;
        /** @type {?} */
        NzSelectComponent.prototype.nzMode;
        /** @type {?} */
        NzSelectComponent.prototype.nzFilterOption;
        /** @type {?} */
        NzSelectComponent.prototype.compareWith;
        /** @type {?} */
        NzSelectComponent.prototype.nzAllowClear;
        /** @type {?} */
        NzSelectComponent.prototype.nzBorderless;
        /** @type {?} */
        NzSelectComponent.prototype.nzShowSearch;
        /** @type {?} */
        NzSelectComponent.prototype.nzLoading;
        /** @type {?} */
        NzSelectComponent.prototype.nzAutoFocus;
        /** @type {?} */
        NzSelectComponent.prototype.nzAutoClearSearchValue;
        /** @type {?} */
        NzSelectComponent.prototype.nzServerSearch;
        /** @type {?} */
        NzSelectComponent.prototype.nzDisabled;
        /** @type {?} */
        NzSelectComponent.prototype.nzOpen;
        /** @type {?} */
        NzSelectComponent.prototype.nzOptions;
        /** @type {?} */
        NzSelectComponent.prototype.nzOnSearch;
        /** @type {?} */
        NzSelectComponent.prototype.nzScrollToBottom;
        /** @type {?} */
        NzSelectComponent.prototype.nzOpenChange;
        /** @type {?} */
        NzSelectComponent.prototype.nzBlur;
        /** @type {?} */
        NzSelectComponent.prototype.nzFocus;
        /** @type {?} */
        NzSelectComponent.prototype.originElement;
        /** @type {?} */
        NzSelectComponent.prototype.cdkConnectedOverlay;
        /** @type {?} */
        NzSelectComponent.prototype.nzSelectTopControlComponent;
        /** @type {?} */
        NzSelectComponent.prototype.listOfNzOptionComponent;
        /** @type {?} */
        NzSelectComponent.prototype.listOfNzOptionGroupComponent;
        /** @type {?} */
        NzSelectComponent.prototype.nzOptionGroupComponentElement;
        /** @type {?} */
        NzSelectComponent.prototype.nzSelectTopControlComponentElement;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.listOfValue$;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.listOfTemplateItem$;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.listOfTagAndTemplateItem;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.searchValue;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.isReactiveDriven;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.value;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.destroy$;
        /** @type {?} */
        NzSelectComponent.prototype.onChange;
        /** @type {?} */
        NzSelectComponent.prototype.onTouched;
        /** @type {?} */
        NzSelectComponent.prototype.dropDownPosition;
        /** @type {?} */
        NzSelectComponent.prototype.triggerWidth;
        /** @type {?} */
        NzSelectComponent.prototype.listOfContainerItem;
        /** @type {?} */
        NzSelectComponent.prototype.listOfTopItem;
        /** @type {?} */
        NzSelectComponent.prototype.activatedValue;
        /** @type {?} */
        NzSelectComponent.prototype.listOfValue;
        /** @type {?} */
        NzSelectComponent.prototype.focused;
        /** @type {?} */
        NzSelectComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzSelectComponent.prototype.focusMonitor;
        /** @type {?} */
        NzSelectComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: option-item-group.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzOptionItemGroupComponent = /** @class */ (function () {
        function NzOptionItemGroupComponent() {
            this.nzLabel = null;
        }
        NzOptionItemGroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-option-item-group',
                        template: " <ng-container *nzStringTemplateOutlet=\"nzLabel\">{{ nzLabel }}</ng-container> ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class.ant-select-item]': 'true',
                            '[class.ant-select-item-group]': 'true'
                        }
                    }] }
        ];
        NzOptionItemGroupComponent.propDecorators = {
            nzLabel: [{ type: core.Input }]
        };
        return NzOptionItemGroupComponent;
    }());
    if (false) {
        /** @type {?} */
        NzOptionItemGroupComponent.prototype.nzLabel;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: option-item.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzOptionItemComponent = /** @class */ (function () {
        function NzOptionItemComponent() {
            this.selected = false;
            this.activated = false;
            this.grouped = false;
            this.customContent = false;
            this.template = null;
            this.disabled = false;
            this.showState = false;
            this.label = null;
            this.value = null;
            this.activatedValue = null;
            this.listOfSelectedValue = [];
            this.icon = null;
            this.itemClick = new core.EventEmitter();
            this.itemHover = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NzOptionItemComponent.prototype.onHostMouseEnter = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this.itemHover.next(this.value);
            }
        };
        /**
         * @return {?}
         */
        NzOptionItemComponent.prototype.onHostClick = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this.itemClick.next(this.value);
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzOptionItemComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            var value = changes.value, activatedValue = changes.activatedValue, listOfSelectedValue = changes.listOfSelectedValue;
            if (value || listOfSelectedValue) {
                this.selected = this.listOfSelectedValue.some((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return _this.compareWith(v, _this.value); }));
            }
            if (value || activatedValue) {
                this.activated = this.compareWith(this.activatedValue, this.value);
            }
        };
        NzOptionItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-option-item',
                        template: "\n    <div class=\"ant-select-item-option-content\">\n      <ng-container *ngIf=\"!customContent\">{{ label }}</ng-container>\n      <ng-container *ngIf=\"customContent\">\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n      </ng-container>\n    </div>\n    <div *ngIf=\"showState && selected\" class=\"ant-select-item-option-state\" style=\"user-select: none\" unselectable=\"on\">\n      <i nz-icon nzType=\"check\" class=\"ant-select-selected-icon\" *ngIf=\"!icon; else icon\"></i>\n    </div>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class.ant-select-item]': 'true',
                            '[class.ant-select-item-option]': 'true',
                            '[class.ant-select-item-option-grouped]': 'grouped',
                            '[class.ant-select-item-option-selected]': 'selected && !disabled',
                            '[class.ant-select-item-option-disabled]': 'disabled',
                            '[class.ant-select-item-option-active]': 'activated && !disabled',
                            '(mouseenter)': 'onHostMouseEnter()',
                            '(click)': 'onHostClick()'
                        }
                    }] }
        ];
        NzOptionItemComponent.propDecorators = {
            grouped: [{ type: core.Input }],
            customContent: [{ type: core.Input }],
            template: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            showState: [{ type: core.Input }],
            label: [{ type: core.Input }],
            value: [{ type: core.Input }],
            activatedValue: [{ type: core.Input }],
            listOfSelectedValue: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            itemClick: [{ type: core.Output }],
            itemHover: [{ type: core.Output }]
        };
        return NzOptionItemComponent;
    }());
    if (false) {
        /** @type {?} */
        NzOptionItemComponent.prototype.selected;
        /** @type {?} */
        NzOptionItemComponent.prototype.activated;
        /** @type {?} */
        NzOptionItemComponent.prototype.grouped;
        /** @type {?} */
        NzOptionItemComponent.prototype.customContent;
        /** @type {?} */
        NzOptionItemComponent.prototype.template;
        /** @type {?} */
        NzOptionItemComponent.prototype.disabled;
        /** @type {?} */
        NzOptionItemComponent.prototype.showState;
        /** @type {?} */
        NzOptionItemComponent.prototype.label;
        /** @type {?} */
        NzOptionItemComponent.prototype.value;
        /** @type {?} */
        NzOptionItemComponent.prototype.activatedValue;
        /** @type {?} */
        NzOptionItemComponent.prototype.listOfSelectedValue;
        /** @type {?} */
        NzOptionItemComponent.prototype.icon;
        /** @type {?} */
        NzOptionItemComponent.prototype.compareWith;
        /** @type {?} */
        NzOptionItemComponent.prototype.itemClick;
        /** @type {?} */
        NzOptionItemComponent.prototype.itemHover;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select-arrow.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectArrowComponent = /** @class */ (function () {
        function NzSelectArrowComponent() {
            this.loading = false;
            this.search = false;
            this.suffixIcon = null;
        }
        NzSelectArrowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select-arrow',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <i nz-icon nzType=\"loading\" *ngIf=\"loading; else defaultArrow\"></i>\n    <ng-template #defaultArrow>\n      <ng-container *ngIf=\"!suffixIcon; else suffixTemplate\">\n        <i nz-icon nzType=\"down\" *ngIf=\"!search\"></i>\n        <i nz-icon nzType=\"search\" *ngIf=\"search\"></i>\n      </ng-container>\n      <ng-template #suffixTemplate>\n        <ng-container *nzStringTemplateOutlet=\"suffixIcon; let suffixIcon\">\n          <i nz-icon [nzType]=\"suffixIcon\"></i>\n        </ng-container>\n      </ng-template>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-select-arrow]': 'true',
                            '[class.ant-select-arrow-loading]': 'loading'
                        }
                    }] }
        ];
        NzSelectArrowComponent.propDecorators = {
            loading: [{ type: core.Input }],
            search: [{ type: core.Input }],
            suffixIcon: [{ type: core.Input }]
        };
        return NzSelectArrowComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectArrowComponent.prototype.loading;
        /** @type {?} */
        NzSelectArrowComponent.prototype.search;
        /** @type {?} */
        NzSelectArrowComponent.prototype.suffixIcon;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select-clear.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectClearComponent = /** @class */ (function () {
        function NzSelectClearComponent() {
            this.clearIcon = null;
            this.clear = new core.EventEmitter();
        }
        /**
         * @param {?} e
         * @return {?}
         */
        NzSelectClearComponent.prototype.onClick = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.clear.emit(e);
        };
        NzSelectClearComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select-clear',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <i nz-icon nzType=\"close-circle\" nzTheme=\"fill\" *ngIf=\"!clearIcon; else clearIcon\" class=\"ant-select-close-icon\"></i> ",
                        host: {
                            '(click)': 'onClick($event)',
                            '[class.ant-select-clear]': 'true'
                        }
                    }] }
        ];
        NzSelectClearComponent.propDecorators = {
            clearIcon: [{ type: core.Input }],
            clear: [{ type: core.Output }]
        };
        return NzSelectClearComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectClearComponent.prototype.clearIcon;
        /** @type {?} */
        NzSelectClearComponent.prototype.clear;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select-item.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectItemComponent = /** @class */ (function () {
        function NzSelectItemComponent() {
            this.disabled = false;
            this.label = null;
            this.deletable = false;
            this.removeIcon = null;
            this.contentTemplateOutletContext = null;
            this.contentTemplateOutlet = null;
            this.delete = new core.EventEmitter();
        }
        /**
         * @param {?} e
         * @return {?}
         */
        NzSelectItemComponent.prototype.onDelete = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.disabled) {
                this.delete.next(e);
            }
        };
        NzSelectItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select-item',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-container *nzStringTemplateOutlet=\"contentTemplateOutlet; context: { $implicit: contentTemplateOutletContext }\">\n      <div class=\"ant-select-selection-item-content\" *ngIf=\"deletable; else labelTemplate\">{{ label }}</div>\n      <ng-template #labelTemplate>{{ label }}</ng-template>\n    </ng-container>\n    <span *ngIf=\"deletable && !disabled\" class=\"ant-select-selection-item-remove\" (click)=\"onDelete($event)\">\n      <i nz-icon nzType=\"close\" *ngIf=\"!removeIcon; else removeIcon\"></i>\n    </span>\n  ",
                        host: {
                            '[attr.title]': 'label',
                            '[class.ant-select-selection-item]': 'true',
                            '[class.ant-select-selection-item-disabled]': 'disabled'
                        }
                    }] }
        ];
        NzSelectItemComponent.propDecorators = {
            disabled: [{ type: core.Input }],
            label: [{ type: core.Input }],
            deletable: [{ type: core.Input }],
            removeIcon: [{ type: core.Input }],
            contentTemplateOutletContext: [{ type: core.Input }],
            contentTemplateOutlet: [{ type: core.Input }],
            delete: [{ type: core.Output }]
        };
        return NzSelectItemComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectItemComponent.prototype.disabled;
        /** @type {?} */
        NzSelectItemComponent.prototype.label;
        /** @type {?} */
        NzSelectItemComponent.prototype.deletable;
        /** @type {?} */
        NzSelectItemComponent.prototype.removeIcon;
        /** @type {?} */
        NzSelectItemComponent.prototype.contentTemplateOutletContext;
        /** @type {?} */
        NzSelectItemComponent.prototype.contentTemplateOutlet;
        /** @type {?} */
        NzSelectItemComponent.prototype.delete;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select-placeholder.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectPlaceholderComponent = /** @class */ (function () {
        function NzSelectPlaceholderComponent() {
            this.placeholder = null;
        }
        NzSelectPlaceholderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-select-placeholder',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <ng-container *nzStringTemplateOutlet=\"placeholder\">\n      {{ placeholder }}\n    </ng-container>\n  ",
                        host: {
                            '[class.ant-select-selection-placeholder]': 'true'
                        }
                    }] }
        ];
        NzSelectPlaceholderComponent.propDecorators = {
            placeholder: [{ type: core.Input }]
        };
        return NzSelectPlaceholderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSelectPlaceholderComponent.prototype.placeholder;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: select.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSelectModule = /** @class */ (function () {
        function NzSelectModule() {
        }
        NzSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i18n.NzI18nModule,
                            forms.FormsModule,
                            platform.PlatformModule,
                            overlay.OverlayModule,
                            icon.NzIconModule,
                            outlet.NzOutletModule,
                            empty.NzEmptyModule,
                            overlay$1.NzOverlayModule,
                            noAnimation.NzNoAnimationModule,
                            transitionPatch.??NzTransitionPatchModule,
                            scrolling.ScrollingModule,
                            a11y.A11yModule
                        ],
                        declarations: [
                            NzOptionComponent,
                            NzSelectComponent,
                            NzOptionContainerComponent,
                            NzOptionGroupComponent,
                            NzOptionItemComponent,
                            NzSelectTopControlComponent,
                            NzSelectSearchComponent,
                            NzSelectItemComponent,
                            NzSelectClearComponent,
                            NzSelectArrowComponent,
                            NzSelectPlaceholderComponent,
                            NzOptionItemGroupComponent
                        ],
                        exports: [
                            NzOptionComponent,
                            NzSelectComponent,
                            NzOptionGroupComponent,
                            NzSelectArrowComponent,
                            NzSelectClearComponent,
                            NzSelectItemComponent,
                            NzSelectPlaceholderComponent,
                            NzSelectSearchComponent
                        ]
                    },] }
        ];
        return NzSelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: select.types.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function NzSelectItemInterface() { }
    if (false) {
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.template;
        /** @type {?} */
        NzSelectItemInterface.prototype.nzLabel;
        /** @type {?} */
        NzSelectItemInterface.prototype.nzValue;
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.nzDisabled;
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.nzHide;
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.nzCustomContent;
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.groupLabel;
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.type;
        /** @type {?|undefined} */
        NzSelectItemInterface.prototype.key;
    }
    /**
     * @record
     */
    function NzSelectOptionInterface() { }
    if (false) {
        /** @type {?} */
        NzSelectOptionInterface.prototype.label;
        /** @type {?} */
        NzSelectOptionInterface.prototype.value;
        /** @type {?|undefined} */
        NzSelectOptionInterface.prototype.disabled;
        /** @type {?|undefined} */
        NzSelectOptionInterface.prototype.hide;
        /** @type {?|undefined} */
        NzSelectOptionInterface.prototype.groupLabel;
    }

    exports.NzOptionComponent = NzOptionComponent;
    exports.NzOptionContainerComponent = NzOptionContainerComponent;
    exports.NzOptionGroupComponent = NzOptionGroupComponent;
    exports.NzOptionItemComponent = NzOptionItemComponent;
    exports.NzOptionItemGroupComponent = NzOptionItemGroupComponent;
    exports.NzSelectArrowComponent = NzSelectArrowComponent;
    exports.NzSelectClearComponent = NzSelectClearComponent;
    exports.NzSelectComponent = NzSelectComponent;
    exports.NzSelectItemComponent = NzSelectItemComponent;
    exports.NzSelectModule = NzSelectModule;
    exports.NzSelectPlaceholderComponent = NzSelectPlaceholderComponent;
    exports.NzSelectSearchComponent = NzSelectSearchComponent;
    exports.NzSelectTopControlComponent = NzSelectTopControlComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-select.umd.js.map
