(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/keycodes'), require('@angular/cdk/overlay'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/i18n'), require('@angular/common'), require('ng-zorro-antd/core/highlight'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/input')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/cascader', ['exports', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/i18n', '@angular/common', 'ng-zorro-antd/core/highlight', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/empty', 'ng-zorro-antd/icon', 'ng-zorro-antd/input'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].cascader = {}), global.ng.cdk.keycodes, global.ng.cdk.overlay, global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].i18n, global.ng.common, global['ng-zorro-antd'].core.highlight, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].empty, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].input));
}(this, (function (exports, keycodes, overlay, core, forms, animation, config, noAnimation, overlay$1, util, rxjs, operators, i18n, common, highlight, outlet, empty, icon, input) { 'use strict';

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
     * Generated from: typings.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @deprecated Use the prefixed version.
     * @record
     */
    function CascaderOption() { }
    if (false) {
        /** @type {?|undefined} */
        CascaderOption.prototype.value;
        /** @type {?|undefined} */
        CascaderOption.prototype.label;
        /** @type {?|undefined} */
        CascaderOption.prototype.title;
        /** @type {?|undefined} */
        CascaderOption.prototype.disabled;
        /** @type {?|undefined} */
        CascaderOption.prototype.loading;
        /** @type {?|undefined} */
        CascaderOption.prototype.isLeaf;
        /** @type {?|undefined} */
        CascaderOption.prototype.parent;
        /** @type {?|undefined} */
        CascaderOption.prototype.children;
        /* Skipping unhandled member: [key: string]: NzSafeAny;*/
    }
    /**
     * @deprecated Use the prefixed version.
     * @record
     */
    function CascaderSearchOption() { }
    if (false) {
        /** @type {?} */
        CascaderSearchOption.prototype.path;
    }
    /**
     * @record
     */
    function NzShowSearchOptions() { }
    if (false) {
        /** @type {?|undefined} */
        NzShowSearchOptions.prototype.filter;
        /** @type {?|undefined} */
        NzShowSearchOptions.prototype.sorter;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    function isShowSearchObject(options) {
        return typeof options !== 'boolean';
    }
    /**
     * To avoid circular dependency, provide an interface of `NzCascaderComponent`
     * for `NzCascaderService`.
     * @record
     */
    function NzCascaderComponentAsSource() { }
    if (false) {
        /** @type {?} */
        NzCascaderComponentAsSource.prototype.inputValue;
        /** @type {?} */
        NzCascaderComponentAsSource.prototype.nzShowSearch;
        /** @type {?} */
        NzCascaderComponentAsSource.prototype.nzLabelProperty;
        /** @type {?} */
        NzCascaderComponentAsSource.prototype.nzValueProperty;
        /** @type {?} */
        NzCascaderComponentAsSource.prototype.nzChangeOnSelect;
        /**
         * @param {?} option
         * @param {?} level
         * @return {?}
         */
        NzCascaderComponentAsSource.prototype.nzChangeOn = function (option, level) { };
        /**
         * @param {?} node
         * @param {?} index
         * @return {?}
         */
        NzCascaderComponentAsSource.prototype.nzLoadData = function (node, index) { };
    }

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
     * @param {?} o
     * @return {?}
     */
    function isChildOption(o) {
        return o.isLeaf || !o.children || !o.children.length;
    }
    /**
     * @param {?} o
     * @return {?}
     */
    function isParentOption(o) {
        return !!o.children && !!o.children.length && !o.isLeaf;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: cascader-li.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCascaderOptionComponent = /** @class */ (function () {
        function NzCascaderOptionComponent(cdr, elementRef, renderer) {
            this.cdr = cdr;
            this.optionTemplate = null;
            this.activated = false;
            this.nzLabelProperty = 'label';
            renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
        }
        Object.defineProperty(NzCascaderOptionComponent.prototype, "optionLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.option[this.nzLabelProperty];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzCascaderOptionComponent.prototype.markForCheck = /**
         * @return {?}
         */
        function () {
            this.cdr.markForCheck();
        };
        NzCascaderOptionComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: '[nz-cascader-option]',
                        exportAs: 'nzCascaderOption',
                        template: "\n    <ng-container *ngIf=\"optionTemplate; else defaultOptionTemplate\">\n      <ng-template [ngTemplateOutlet]=\"optionTemplate\" [ngTemplateOutletContext]=\"{ $implicit: option, index: columnIndex }\"></ng-template>\n    </ng-container>\n    <ng-template #defaultOptionTemplate>\n      <span [innerHTML]=\"optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'\"></span>\n    </ng-template>\n    <span *ngIf=\"!option.isLeaf || option.children?.length || option.loading\" class=\"ant-cascader-menu-item-expand-icon\">\n      <i nz-icon [nzType]=\"option.loading ? 'loading' : 'right'\"></i>\n    </span>\n  ",
                        host: {
                            '[attr.title]': 'option.title || optionLabel',
                            '[class.ant-cascader-menu-item-active]': 'activated',
                            '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
                            '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCascaderOptionComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzCascaderOptionComponent.propDecorators = {
            optionTemplate: [{ type: core.Input }],
            option: [{ type: core.Input }],
            activated: [{ type: core.Input }],
            highlightText: [{ type: core.Input }],
            nzLabelProperty: [{ type: core.Input }],
            columnIndex: [{ type: core.Input }]
        };
        return NzCascaderOptionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCascaderOptionComponent.prototype.optionTemplate;
        /** @type {?} */
        NzCascaderOptionComponent.prototype.option;
        /** @type {?} */
        NzCascaderOptionComponent.prototype.activated;
        /** @type {?} */
        NzCascaderOptionComponent.prototype.highlightText;
        /** @type {?} */
        NzCascaderOptionComponent.prototype.nzLabelProperty;
        /** @type {?} */
        NzCascaderOptionComponent.prototype.columnIndex;
        /**
         * @type {?}
         * @private
         */
        NzCascaderOptionComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: cascader.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * All data is stored and parsed in NzCascaderService.
     */
    var NzCascaderService = /** @class */ (function () {
        function NzCascaderService() {
            /**
             * Activated options in each column.
             */
            this.activatedOptions = [];
            /**
             * An array to store cascader items arranged in different layers.
             */
            this.columns = [];
            /**
             * If user has entered searching mode.
             */
            this.inSearchingMode = false;
            /**
             * Selected options would be output to user.
             */
            this.selectedOptions = [];
            this.values = [];
            this.$loading = new rxjs.BehaviorSubject(false);
            /**
             * Emit an event to notify cascader it needs to redraw because activated or
             * selected options are changed.
             */
            this.$redraw = new rxjs.Subject();
            /**
             * Emit an event when an option gets selected.
             * Emit true if a leaf options is selected.
             */
            this.$optionSelected = new rxjs.Subject();
            /**
             * Emit an event to notify cascader it needs to quit searching mode.
             * Only emit when user do select a searching option.
             */
            this.$quitSearching = new rxjs.Subject();
            /**
             * To hold columns before entering searching mode.
             */
            this.columnsSnapshot = [[]];
            /**
             * To hold activated options before entering searching mode.
             */
            this.activatedOptionsSnapshot = [];
        }
        Object.defineProperty(NzCascaderService.prototype, "nzOptions", {
            /** Return cascader options in the first layer. */
            get: /**
             * Return cascader options in the first layer.
             * @return {?}
             */
            function () {
                return this.columns[0];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzCascaderService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.$redraw.complete();
            this.$quitSearching.complete();
            this.$optionSelected.complete();
            this.$loading.complete();
        };
        /**
         * Make sure that value matches what is displayed in the dropdown.
         */
        /**
         * Make sure that value matches what is displayed in the dropdown.
         * @param {?=} first
         * @return {?}
         */
        NzCascaderService.prototype.syncOptions = /**
         * Make sure that value matches what is displayed in the dropdown.
         * @param {?=} first
         * @return {?}
         */
        function (first) {
            var _this = this;
            if (first === void 0) { first = false; }
            /** @type {?} */
            var values = this.values;
            /** @type {?} */
            var hasValue = values && values.length;
            /** @type {?} */
            var lastColumnIndex = values.length - 1;
            /** @type {?} */
            var initColumnWithIndex = (/**
             * @param {?} columnIndex
             * @return {?}
             */
            function (columnIndex) {
                /** @type {?} */
                var activatedOptionSetter = (/**
                 * @return {?}
                 */
                function () {
                    var _a;
                    /** @type {?} */
                    var currentValue = values[columnIndex];
                    if (!util.isNotNil(currentValue)) {
                        _this.$redraw.next();
                        return;
                    }
                    /** @type {?} */
                    var option = _this.findOptionWithValue(columnIndex, values[columnIndex]) ||
                        (typeof currentValue === 'object'
                            ? currentValue
                            : (_a = {},
                                _a["" + _this.cascaderComponent.nzValueProperty] = currentValue,
                                _a["" + _this.cascaderComponent.nzLabelProperty] = currentValue,
                                _a));
                    _this.setOptionActivated(option, columnIndex, false, false);
                    if (columnIndex < lastColumnIndex) {
                        initColumnWithIndex(columnIndex + 1);
                    }
                    else {
                        _this.dropBehindColumns(columnIndex);
                        _this.selectedOptions = __spread(_this.activatedOptions);
                        _this.$redraw.next();
                    }
                });
                if (_this.isLoaded(columnIndex) || !_this.cascaderComponent.nzLoadData) {
                    activatedOptionSetter();
                }
                else {
                    /** @type {?} */
                    var option = _this.activatedOptions[columnIndex - 1] || {};
                    _this.loadChildren(option, columnIndex - 1, activatedOptionSetter);
                }
            });
            this.activatedOptions = [];
            this.selectedOptions = [];
            if (first && this.cascaderComponent.nzLoadData && !hasValue) {
                // Should also notify the component that value changes. Fix #3480.
                this.$redraw.next();
                return;
            }
            else {
                initColumnWithIndex(0);
            }
        };
        /**
         * Bind cascader component so this service could use inputs.
         */
        /**
         * Bind cascader component so this service could use inputs.
         * @param {?} cascaderComponent
         * @return {?}
         */
        NzCascaderService.prototype.withComponent = /**
         * Bind cascader component so this service could use inputs.
         * @param {?} cascaderComponent
         * @return {?}
         */
        function (cascaderComponent) {
            this.cascaderComponent = cascaderComponent;
        };
        /**
         * Reset all options. Rebuild searching options if in searching mode.
         */
        /**
         * Reset all options. Rebuild searching options if in searching mode.
         * @param {?} options
         * @return {?}
         */
        NzCascaderService.prototype.withOptions = /**
         * Reset all options. Rebuild searching options if in searching mode.
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this.columnsSnapshot = this.columns = options && options.length ? [options] : [];
            if (this.inSearchingMode) {
                this.prepareSearchOptions(this.cascaderComponent.inputValue);
            }
            else if (this.columns.length) {
                this.syncOptions();
            }
        };
        /**
         * Try to set a option as activated.
         * @param option Cascader option
         * @param columnIndex Of which column this option is in
         * @param performSelect Select
         * @param loadingChildren Try to load children asynchronously.
         */
        /**
         * Try to set a option as activated.
         * @param {?} option Cascader option
         * @param {?} columnIndex Of which column this option is in
         * @param {?=} performSelect Select
         * @param {?=} loadingChildren Try to load children asynchronously.
         * @return {?}
         */
        NzCascaderService.prototype.setOptionActivated = /**
         * Try to set a option as activated.
         * @param {?} option Cascader option
         * @param {?} columnIndex Of which column this option is in
         * @param {?=} performSelect Select
         * @param {?=} loadingChildren Try to load children asynchronously.
         * @return {?}
         */
        function (option, columnIndex, performSelect, loadingChildren) {
            if (performSelect === void 0) { performSelect = false; }
            if (loadingChildren === void 0) { loadingChildren = true; }
            if (option.disabled) {
                return;
            }
            this.activatedOptions[columnIndex] = option;
            this.trackAncestorActivatedOptions(columnIndex);
            this.dropBehindActivatedOptions(columnIndex);
            /** @type {?} */
            var isParent = isParentOption(option);
            if (isParent) {
                // Parent option that has children.
                this.setColumnData((/** @type {?} */ (option.children)), columnIndex + 1, option);
            }
            else if (!option.isLeaf && loadingChildren) {
                // Parent option that should try to load children asynchronously.
                this.loadChildren(option, columnIndex);
            }
            else if (option.isLeaf) {
                // Leaf option.
                this.dropBehindColumns(columnIndex);
            }
            // Actually perform selection to make an options not only activated but also selected.
            if (performSelect) {
                this.setOptionSelected(option, columnIndex);
            }
            this.$redraw.next();
        };
        /**
         * @param {?} option
         * @param {?} index
         * @return {?}
         */
        NzCascaderService.prototype.setOptionSelected = /**
         * @param {?} option
         * @param {?} index
         * @return {?}
         */
        function (option, index) {
            /** @type {?} */
            var changeOn = this.cascaderComponent.nzChangeOn;
            /** @type {?} */
            var shouldPerformSelection = (/**
             * @param {?} o
             * @param {?} i
             * @return {?}
             */
            function (o, i) {
                return typeof changeOn === 'function' ? changeOn(o, i) : false;
            });
            if (option.isLeaf || this.cascaderComponent.nzChangeOnSelect || shouldPerformSelection(option, index)) {
                this.selectedOptions = __spread(this.activatedOptions);
                this.prepareEmitValue();
                this.$redraw.next();
                this.$optionSelected.next({ option: option, index: index });
            }
        };
        /**
         * @param {?} column
         * @return {?}
         */
        NzCascaderService.prototype.setOptionDeactivatedSinceColumn = /**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            this.dropBehindActivatedOptions(column - 1);
            this.dropBehindColumns(column);
            this.$redraw.next();
        };
        /**
         * Set a searching option as selected, finishing up things.
         * @param option
         */
        /**
         * Set a searching option as selected, finishing up things.
         * @param {?} option
         * @return {?}
         */
        NzCascaderService.prototype.setSearchOptionSelected = /**
         * Set a searching option as selected, finishing up things.
         * @param {?} option
         * @return {?}
         */
        function (option) {
            var _this = this;
            this.activatedOptions = [option];
            this.selectedOptions = __spread(option.path);
            this.prepareEmitValue();
            this.$redraw.next();
            this.$optionSelected.next({ option: option, index: 0 });
            setTimeout((/**
             * @return {?}
             */
            function () {
                // Reset data and tell UI only to remove input and reset dropdown width style.
                _this.$quitSearching.next();
                _this.$redraw.next();
                _this.inSearchingMode = false;
                _this.columns = __spread(_this.columnsSnapshot);
                _this.activatedOptions = __spread(_this.selectedOptions);
            }), 200);
        };
        /**
         * Filter cascader options to reset `columns`.
         * @param searchValue The string user wants to search.
         */
        /**
         * Filter cascader options to reset `columns`.
         * @param {?} searchValue The string user wants to search.
         * @return {?}
         */
        NzCascaderService.prototype.prepareSearchOptions = /**
         * Filter cascader options to reset `columns`.
         * @param {?} searchValue The string user wants to search.
         * @return {?}
         */
        function (searchValue) {
            var _this = this;
            /** @type {?} */
            var results = [];
            // Search results only have one layer.
            /** @type {?} */
            var path = [];
            /** @type {?} */
            var defaultFilter = (/**
             * @param {?} i
             * @param {?} p
             * @return {?}
             */
            function (i, p) {
                return p.some((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) {
                    /** @type {?} */
                    var label = _this.getOptionLabel(o);
                    return !!label && label.indexOf(i) !== -1;
                }));
            });
            /** @type {?} */
            var showSearch = this.cascaderComponent.nzShowSearch;
            /** @type {?} */
            var filter = isShowSearchObject(showSearch) && showSearch.filter ? showSearch.filter : defaultFilter;
            /** @type {?} */
            var sorter = isShowSearchObject(showSearch) && showSearch.sorter ? showSearch.sorter : null;
            /** @type {?} */
            var loopChild = (/**
             * @param {?} node
             * @param {?=} forceDisabled
             * @return {?}
             */
            function (node, forceDisabled) {
                var _a;
                if (forceDisabled === void 0) { forceDisabled = false; }
                path.push(node);
                /** @type {?} */
                var cPath = Array.from(path);
                if (filter(searchValue, cPath)) {
                    /** @type {?} */
                    var disabled = forceDisabled || node.disabled;
                    /** @type {?} */
                    var option = (_a = {
                            disabled: disabled,
                            isLeaf: true,
                            path: cPath
                        },
                        _a[_this.cascaderComponent.nzLabelProperty] = cPath.map((/**
                         * @param {?} p
                         * @return {?}
                         */
                        function (p) { return _this.getOptionLabel(p); })).join(' / '),
                        _a);
                    results.push(option);
                }
                path.pop();
            });
            /** @type {?} */
            var loopParent = (/**
             * @param {?} node
             * @param {?=} forceDisabled
             * @return {?}
             */
            function (node, forceDisabled) {
                if (forceDisabled === void 0) { forceDisabled = false; }
                /** @type {?} */
                var disabled = forceDisabled || node.disabled;
                path.push(node);
                (/** @type {?} */ (node.children)).forEach((/**
                 * @param {?} sNode
                 * @return {?}
                 */
                function (sNode) {
                    if (!sNode.parent) {
                        sNode.parent = node;
                    }
                    if (!sNode.isLeaf) {
                        loopParent(sNode, disabled);
                    }
                    if (sNode.isLeaf || !sNode.children || !sNode.children.length) {
                        loopChild(sNode, disabled);
                    }
                }));
                path.pop();
            });
            if (!this.columnsSnapshot.length) {
                this.columns = [[]];
                return;
            }
            this.columnsSnapshot[0].forEach((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return (isChildOption(o) ? loopChild(o) : loopParent(o)); }));
            if (sorter) {
                results.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return sorter(a.path, b.path, searchValue); }));
            }
            this.columns = [results];
            this.$redraw.next(); // Search results may be empty, so should redraw.
        };
        /**
         * Toggle searching mode by UI. It deals with things not directly related to UI.
         * @param toSearching If this cascader is entering searching mode
         */
        /**
         * Toggle searching mode by UI. It deals with things not directly related to UI.
         * @param {?} toSearching If this cascader is entering searching mode
         * @return {?}
         */
        NzCascaderService.prototype.toggleSearchingMode = /**
         * Toggle searching mode by UI. It deals with things not directly related to UI.
         * @param {?} toSearching If this cascader is entering searching mode
         * @return {?}
         */
        function (toSearching) {
            this.inSearchingMode = toSearching;
            if (toSearching) {
                this.activatedOptionsSnapshot = __spread(this.activatedOptions);
                this.activatedOptions = [];
                this.selectedOptions = [];
                this.$redraw.next();
            }
            else {
                // User quit searching mode without selecting an option.
                this.activatedOptions = __spread(this.activatedOptionsSnapshot);
                this.selectedOptions = __spread(this.activatedOptions);
                this.columns = __spread(this.columnsSnapshot);
                this.syncOptions();
                this.$redraw.next();
            }
        };
        /**
         * Clear selected options.
         */
        /**
         * Clear selected options.
         * @return {?}
         */
        NzCascaderService.prototype.clear = /**
         * Clear selected options.
         * @return {?}
         */
        function () {
            this.values = [];
            this.selectedOptions = [];
            this.activatedOptions = [];
            this.dropBehindColumns(0);
            this.prepareEmitValue();
            this.$redraw.next();
            this.$optionSelected.next(null);
        };
        /**
         * @param {?} o
         * @return {?}
         */
        NzCascaderService.prototype.getOptionLabel = /**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            return (/** @type {?} */ (o[this.cascaderComponent.nzLabelProperty || 'label']));
        };
        /**
         * @param {?} o
         * @return {?}
         */
        NzCascaderService.prototype.getOptionValue = /**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            return o[this.cascaderComponent.nzValueProperty || 'value'];
        };
        /**
         * Try to insert options into a column.
         * @param options Options to insert
         * @param columnIndex Position
         */
        /**
         * Try to insert options into a column.
         * @private
         * @param {?} options Options to insert
         * @param {?} columnIndex Position
         * @param {?} parent
         * @return {?}
         */
        NzCascaderService.prototype.setColumnData = /**
         * Try to insert options into a column.
         * @private
         * @param {?} options Options to insert
         * @param {?} columnIndex Position
         * @param {?} parent
         * @return {?}
         */
        function (options, columnIndex, parent) {
            /** @type {?} */
            var existingOptions = this.columns[columnIndex];
            if (!util.arraysEqual(existingOptions, options)) {
                options.forEach((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return (o.parent = parent); }));
                this.columns[columnIndex] = options;
                this.dropBehindColumns(columnIndex);
            }
        };
        /**
         * Set all ancestor options as activated.
         */
        /**
         * Set all ancestor options as activated.
         * @private
         * @param {?} startIndex
         * @return {?}
         */
        NzCascaderService.prototype.trackAncestorActivatedOptions = /**
         * Set all ancestor options as activated.
         * @private
         * @param {?} startIndex
         * @return {?}
         */
        function (startIndex) {
            for (var i = startIndex - 1; i >= 0; i--) {
                if (!this.activatedOptions[i]) {
                    this.activatedOptions[i] = (/** @type {?} */ (this.activatedOptions[i + 1].parent));
                }
            }
        };
        /**
         * @private
         * @param {?} lastReserveIndex
         * @return {?}
         */
        NzCascaderService.prototype.dropBehindActivatedOptions = /**
         * @private
         * @param {?} lastReserveIndex
         * @return {?}
         */
        function (lastReserveIndex) {
            this.activatedOptions = this.activatedOptions.splice(0, lastReserveIndex + 1);
        };
        /**
         * @private
         * @param {?} lastReserveIndex
         * @return {?}
         */
        NzCascaderService.prototype.dropBehindColumns = /**
         * @private
         * @param {?} lastReserveIndex
         * @return {?}
         */
        function (lastReserveIndex) {
            if (lastReserveIndex < this.columns.length - 1) {
                this.columns = this.columns.slice(0, lastReserveIndex + 1);
            }
        };
        /**
         * Load children of an option asynchronously.
         */
        /**
         * Load children of an option asynchronously.
         * @param {?} option
         * @param {?} columnIndex
         * @param {?=} success
         * @param {?=} failure
         * @return {?}
         */
        NzCascaderService.prototype.loadChildren = /**
         * Load children of an option asynchronously.
         * @param {?} option
         * @param {?} columnIndex
         * @param {?=} success
         * @param {?=} failure
         * @return {?}
         */
        function (option, columnIndex, success, failure) {
            var _this = this;
            /** @type {?} */
            var loadFn = this.cascaderComponent.nzLoadData;
            if (loadFn) {
                // If there isn't any option in columns.
                this.$loading.next(columnIndex < 0);
                if (typeof option === 'object') {
                    option.loading = true;
                }
                loadFn(option, columnIndex).then((/**
                 * @return {?}
                 */
                function () {
                    option.loading = false;
                    if (option.children) {
                        _this.setColumnData(option.children, columnIndex + 1, option);
                    }
                    if (success) {
                        success();
                    }
                    _this.$loading.next(false);
                    _this.$redraw.next();
                }), (/**
                 * @return {?}
                 */
                function () {
                    option.loading = false;
                    option.isLeaf = true;
                    if (failure) {
                        failure();
                    }
                    _this.$redraw.next();
                }));
            }
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        NzCascaderService.prototype.isLoaded = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            return this.columns[index] && this.columns[index].length > 0;
        };
        /**
         * Find a option that has a given value in a given column.
         */
        /**
         * Find a option that has a given value in a given column.
         * @private
         * @param {?} columnIndex
         * @param {?} value
         * @return {?}
         */
        NzCascaderService.prototype.findOptionWithValue = /**
         * Find a option that has a given value in a given column.
         * @private
         * @param {?} columnIndex
         * @param {?} value
         * @return {?}
         */
        function (columnIndex, value) {
            var _this = this;
            /** @type {?} */
            var targetColumn = this.columns[columnIndex];
            if (targetColumn) {
                /** @type {?} */
                var v_1 = typeof value === 'object' ? this.getOptionValue(value) : value;
                return (/** @type {?} */ (targetColumn.find((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return v_1 === _this.getOptionValue(o); }))));
            }
            return null;
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderService.prototype.prepareEmitValue = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.values = this.selectedOptions.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return _this.getOptionValue(o); }));
        };
        NzCascaderService.decorators = [
            { type: core.Injectable }
        ];
        return NzCascaderService;
    }());
    if (false) {
        /**
         * Activated options in each column.
         * @type {?}
         */
        NzCascaderService.prototype.activatedOptions;
        /**
         * An array to store cascader items arranged in different layers.
         * @type {?}
         */
        NzCascaderService.prototype.columns;
        /**
         * If user has entered searching mode.
         * @type {?}
         */
        NzCascaderService.prototype.inSearchingMode;
        /**
         * Selected options would be output to user.
         * @type {?}
         */
        NzCascaderService.prototype.selectedOptions;
        /** @type {?} */
        NzCascaderService.prototype.values;
        /** @type {?} */
        NzCascaderService.prototype.$loading;
        /**
         * Emit an event to notify cascader it needs to redraw because activated or
         * selected options are changed.
         * @type {?}
         */
        NzCascaderService.prototype.$redraw;
        /**
         * Emit an event when an option gets selected.
         * Emit true if a leaf options is selected.
         * @type {?}
         */
        NzCascaderService.prototype.$optionSelected;
        /**
         * Emit an event to notify cascader it needs to quit searching mode.
         * Only emit when user do select a searching option.
         * @type {?}
         */
        NzCascaderService.prototype.$quitSearching;
        /**
         * To hold columns before entering searching mode.
         * @type {?}
         * @private
         */
        NzCascaderService.prototype.columnsSnapshot;
        /**
         * To hold activated options before entering searching mode.
         * @type {?}
         * @private
         */
        NzCascaderService.prototype.activatedOptionsSnapshot;
        /**
         * @type {?}
         * @private
         */
        NzCascaderService.prototype.cascaderComponent;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: cascader.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'cascader';
    /** @type {?} */
    var defaultDisplayRender = (/**
     * @param {?} labels
     * @return {?}
     */
    function (labels) { return labels.join(' / '); });
    var ??0 = defaultDisplayRender;
    var NzCascaderComponent = /** @class */ (function () {
        function NzCascaderComponent(cascaderService, i18nService, nzConfigService, cdr, elementRef, renderer, noAnimation) {
            this.cascaderService = cascaderService;
            this.i18nService = i18nService;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.noAnimation = noAnimation;
            this.nzOptionRender = null;
            this.nzShowInput = true;
            this.nzShowArrow = true;
            this.nzAllowClear = true;
            this.nzAutoFocus = false;
            this.nzChangeOnSelect = false;
            this.nzDisabled = false;
            this.nzExpandTrigger = 'click';
            this.nzValueProperty = 'value';
            this.nzLabelRender = null;
            this.nzLabelProperty = 'label';
            this.nzSize = 'default';
            this.nzShowSearch = false;
            this.nzPlaceHolder = '';
            this.nzMenuStyle = null;
            this.nzMouseEnterDelay = 150; // ms
            // ms
            this.nzMouseLeaveDelay = 150; // ms
            // ms
            this.nzTriggerAction = (/** @type {?} */ (['click']));
            this.nzVisibleChange = new core.EventEmitter();
            this.nzSelectionChange = new core.EventEmitter();
            this.nzSelect = new core.EventEmitter();
            this.nzClear = new core.EventEmitter();
            /**
             * If the dropdown should show the empty content.
             * `true` if there's no options.
             */
            this.shouldShowEmpty = false;
            this.menuVisible = false;
            this.isLoading = false;
            this.labelRenderContext = {};
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            this.positions = __spread(overlay$1.DEFAULT_CASCADER_POSITIONS);
            this.dropdownHeightStyle = '';
            this.isFocused = false;
            this.destroy$ = new rxjs.Subject();
            this.inputString = '';
            this.isOpening = false;
            this.delayMenuTimer = null;
            this.delaySelectTimer = null;
            this.el = elementRef.nativeElement;
            this.cascaderService.withComponent(this);
            renderer.addClass(elementRef.nativeElement, 'ant-cascader');
            renderer.addClass(elementRef.nativeElement, 'ant-cascader-picker');
        }
        Object.defineProperty(NzCascaderComponent.prototype, "nzOptions", {
            get: /**
             * @return {?}
             */
            function () {
                return this.cascaderService.nzOptions;
            },
            set: /**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                this.cascaderService.withOptions(options);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "inSearchingMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this.cascaderService.inSearchingMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "inputValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.inputString;
            },
            set: /**
             * @param {?} inputValue
             * @return {?}
             */
            function (inputValue) {
                this.inputString = inputValue;
                this.toggleSearchingMode(!!inputValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "menuCls", {
            get: /**
             * @return {?}
             */
            function () {
                var _a;
                return _a = {}, _a["" + this.nzMenuClassName] = !!this.nzMenuClassName, _a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "menuColumnCls", {
            get: /**
             * @return {?}
             */
            function () {
                var _a;
                return _a = {}, _a["" + this.nzColumnClassName] = !!this.nzColumnClassName, _a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "hasInput", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return !!this.inputValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "hasValue", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this.cascaderService.values && this.cascaderService.values.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "showPlaceholder", {
            get: /**
             * @return {?}
             */
            function () {
                return !(this.hasInput || this.hasValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "clearIconVisible", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzAllowClear && !this.nzDisabled && (this.hasValue || this.hasInput);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzCascaderComponent.prototype, "isLabelRenderTemplate", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.nzLabelRender;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var srv = this.cascaderService;
            srv.$redraw.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                // These operations would not mutate data.
                _this.checkChildren();
                _this.setDisplayLabel();
                _this.reposition();
                _this.setDropdownStyles();
                _this.cdr.markForCheck();
            }));
            srv.$loading.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} loading
             * @return {?}
             */
            function (loading) {
                _this.isLoading = loading;
            }));
            srv.$optionSelected.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (!data) {
                    _this.onChange([]);
                    _this.nzSelect.emit(null);
                    _this.nzSelectionChange.emit([]);
                }
                else {
                    var option = data.option, index = data.index;
                    /** @type {?} */
                    var shouldClose = option.isLeaf;
                    if (shouldClose) {
                        _this.delaySetMenuVisible(false);
                    }
                    _this.onChange(_this.cascaderService.values);
                    _this.nzSelectionChange.emit(_this.cascaderService.selectedOptions);
                    _this.nzSelect.emit({ option: option, index: index });
                    _this.cdr.markForCheck();
                }
            }));
            srv.$quitSearching.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.inputString = '';
                _this.dropdownWidthStyle = '';
            }));
            this.i18nService.localeChange.pipe(operators.startWith(), operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.setLocale();
            }));
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            this.clearDelayMenuTimer();
            this.clearDelaySelectTimer();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzCascaderComponent.prototype.registerOnChange = /**
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
        NzCascaderComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzCascaderComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.cascaderService.values = util.toArray(value);
            this.cascaderService.syncOptions(true);
        };
        /**
         * @param {?} visible
         * @param {?=} delay
         * @param {?=} setOpening
         * @return {?}
         */
        NzCascaderComponent.prototype.delaySetMenuVisible = /**
         * @param {?} visible
         * @param {?=} delay
         * @param {?=} setOpening
         * @return {?}
         */
        function (visible, delay, setOpening) {
            var _this = this;
            if (delay === void 0) { delay = 100; }
            if (setOpening === void 0) { setOpening = false; }
            this.clearDelayMenuTimer();
            if (delay) {
                if (visible && setOpening) {
                    this.isOpening = true;
                }
                this.delayMenuTimer = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.setMenuVisible(visible);
                    _this.cdr.detectChanges();
                    _this.clearDelayMenuTimer();
                    if (visible) {
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.isOpening = false;
                        }), 100);
                    }
                }), delay);
            }
            else {
                this.setMenuVisible(visible);
            }
        };
        /**
         * @param {?} visible
         * @return {?}
         */
        NzCascaderComponent.prototype.setMenuVisible = /**
         * @param {?} visible
         * @return {?}
         */
        function (visible) {
            if (this.nzDisabled || this.menuVisible === visible) {
                return;
            }
            if (visible) {
                this.cascaderService.syncOptions();
            }
            this.menuVisible = visible;
            this.nzVisibleChange.emit(visible);
            this.cdr.detectChanges();
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.clearDelayMenuTimer = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.delayMenuTimer) {
                clearTimeout(this.delayMenuTimer);
                this.delayMenuTimer = null;
            }
        };
        /**
         * @param {?=} event
         * @return {?}
         */
        NzCascaderComponent.prototype.clearSelection = /**
         * @param {?=} event
         * @return {?}
         */
        function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.labelRenderText = '';
            this.labelRenderContext = {};
            this.inputValue = '';
            this.setMenuVisible(false);
            this.cascaderService.clear();
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.getSubmitValue = /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.cascaderService.selectedOptions.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return _this.cascaderService.getOptionValue(o); }));
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            if (!this.isFocused) {
                (this.input ? this.input.nativeElement : this.el).focus();
                this.isFocused = true;
            }
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            if (this.isFocused) {
                (this.input ? this.input.nativeElement : this.el).blur();
                this.isFocused = false;
            }
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.handleInputBlur = /**
         * @return {?}
         */
        function () {
            this.menuVisible ? this.focus() : this.blur();
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.handleInputFocus = /**
         * @return {?}
         */
        function () {
            this.focus();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzCascaderComponent.prototype.onKeyDown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var keyCode = event.keyCode;
            if (keyCode !== keycodes.DOWN_ARROW &&
                keyCode !== keycodes.UP_ARROW &&
                keyCode !== keycodes.LEFT_ARROW &&
                keyCode !== keycodes.RIGHT_ARROW &&
                keyCode !== keycodes.ENTER &&
                keyCode !== keycodes.BACKSPACE &&
                keyCode !== keycodes.ESCAPE) {
                return;
            }
            // Press any keys above to reopen menu.
            if (!this.menuVisible && keyCode !== keycodes.BACKSPACE && keyCode !== keycodes.ESCAPE) {
                return this.setMenuVisible(true);
            }
            // Make these keys work as default in searching mode.
            if (this.inSearchingMode && (keyCode === keycodes.BACKSPACE || keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW)) {
                return;
            }
            // Interact with the component.
            if (this.menuVisible) {
                event.preventDefault();
                if (keyCode === keycodes.DOWN_ARROW) {
                    this.moveUpOrDown(false);
                }
                else if (keyCode === keycodes.UP_ARROW) {
                    this.moveUpOrDown(true);
                }
                else if (keyCode === keycodes.LEFT_ARROW) {
                    this.moveLeft();
                }
                else if (keyCode === keycodes.RIGHT_ARROW) {
                    this.moveRight();
                }
                else if (keyCode === keycodes.ENTER) {
                    this.onEnter();
                }
            }
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.onTriggerClick = /**
         * @return {?}
         */
        function () {
            if (this.nzDisabled) {
                return;
            }
            if (this.nzShowSearch) {
                this.focus();
            }
            if (this.isActionTrigger('click')) {
                this.delaySetMenuVisible(!this.menuVisible, 100);
            }
            this.onTouched();
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.onTriggerMouseEnter = /**
         * @return {?}
         */
        function () {
            if (this.nzDisabled || !this.isActionTrigger('hover')) {
                return;
            }
            this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzCascaderComponent.prototype.onTriggerMouseLeave = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.nzDisabled || !this.menuVisible || this.isOpening || !this.isActionTrigger('hover')) {
                event.preventDefault();
                return;
            }
            /** @type {?} */
            var mouseTarget = (/** @type {?} */ (event.relatedTarget));
            /** @type {?} */
            var hostEl = this.el;
            /** @type {?} */
            var menuEl = this.menu && ((/** @type {?} */ (this.menu.nativeElement)));
            if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))) {
                return;
            }
            this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
        };
        /**
         * @param {?} option
         * @param {?} columnIndex
         * @param {?} event
         * @return {?}
         */
        NzCascaderComponent.prototype.onOptionMouseEnter = /**
         * @param {?} option
         * @param {?} columnIndex
         * @param {?} event
         * @return {?}
         */
        function (option, columnIndex, event) {
            event.preventDefault();
            if (this.nzExpandTrigger === 'hover') {
                if (!option.isLeaf) {
                    this.delaySetOptionActivated(option, columnIndex, false);
                }
                else {
                    this.cascaderService.setOptionDeactivatedSinceColumn(columnIndex);
                }
            }
        };
        /**
         * @param {?} option
         * @param {?} _columnIndex
         * @param {?} event
         * @return {?}
         */
        NzCascaderComponent.prototype.onOptionMouseLeave = /**
         * @param {?} option
         * @param {?} _columnIndex
         * @param {?} event
         * @return {?}
         */
        function (option, _columnIndex, event) {
            event.preventDefault();
            if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
                this.clearDelaySelectTimer();
            }
        };
        /**
         * @param {?} option
         * @param {?} columnIndex
         * @param {?} event
         * @return {?}
         */
        NzCascaderComponent.prototype.onOptionClick = /**
         * @param {?} option
         * @param {?} columnIndex
         * @param {?} event
         * @return {?}
         */
        function (option, columnIndex, event) {
            if (event) {
                event.preventDefault();
            }
            if (option && option.disabled) {
                return;
            }
            this.el.focus();
            this.inSearchingMode
                ? this.cascaderService.setSearchOptionSelected((/** @type {?} */ (option)))
                : this.cascaderService.setOptionActivated(option, columnIndex, true);
        };
        /**
         * @private
         * @param {?} action
         * @return {?}
         */
        NzCascaderComponent.prototype.isActionTrigger = /**
         * @private
         * @param {?} action
         * @return {?}
         */
        function (action) {
            return typeof this.nzTriggerAction === 'string' ? this.nzTriggerAction === action : this.nzTriggerAction.indexOf(action) !== -1;
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.onEnter = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
            /** @type {?} */
            var option = this.cascaderService.activatedOptions[columnIndex];
            if (option && !option.disabled) {
                this.inSearchingMode
                    ? this.cascaderService.setSearchOptionSelected((/** @type {?} */ (option)))
                    : this.cascaderService.setOptionActivated(option, columnIndex, true);
            }
        };
        /**
         * @private
         * @param {?} isUp
         * @return {?}
         */
        NzCascaderComponent.prototype.moveUpOrDown = /**
         * @private
         * @param {?} isUp
         * @return {?}
         */
        function (isUp) {
            /** @type {?} */
            var columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
            /** @type {?} */
            var activeOption = this.cascaderService.activatedOptions[columnIndex];
            /** @type {?} */
            var options = this.cascaderService.columns[columnIndex] || [];
            /** @type {?} */
            var length = options.length;
            /** @type {?} */
            var nextIndex = -1;
            if (!activeOption) {
                // Not selected options in this column
                nextIndex = isUp ? length : -1;
            }
            else {
                nextIndex = options.indexOf(activeOption);
            }
            while (true) {
                nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
                if (nextIndex < 0 || nextIndex >= length) {
                    break;
                }
                /** @type {?} */
                var nextOption = options[nextIndex];
                if (!nextOption || nextOption.disabled) {
                    continue;
                }
                this.cascaderService.setOptionActivated(nextOption, columnIndex);
                break;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.moveLeft = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var options = this.cascaderService.activatedOptions;
            if (options.length) {
                options.pop(); // Remove the last one
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.moveRight = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var length = this.cascaderService.activatedOptions.length;
            /** @type {?} */
            var options = this.cascaderService.columns[length];
            if (options && options.length) {
                /** @type {?} */
                var nextOpt = options.find((/**
                 * @param {?} o
                 * @return {?}
                 */
                function (o) { return !o.disabled; }));
                if (nextOpt) {
                    this.cascaderService.setOptionActivated(nextOpt, length);
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.clearDelaySelectTimer = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.delaySelectTimer) {
                clearTimeout(this.delaySelectTimer);
                this.delaySelectTimer = null;
            }
        };
        /**
         * @private
         * @param {?} option
         * @param {?} columnIndex
         * @param {?} performSelect
         * @return {?}
         */
        NzCascaderComponent.prototype.delaySetOptionActivated = /**
         * @private
         * @param {?} option
         * @param {?} columnIndex
         * @param {?} performSelect
         * @return {?}
         */
        function (option, columnIndex, performSelect) {
            var _this = this;
            this.clearDelaySelectTimer();
            this.delaySelectTimer = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.cascaderService.setOptionActivated(option, columnIndex, performSelect);
                _this.delaySelectTimer = null;
            }), 150);
        };
        /**
         * @private
         * @param {?} toSearching
         * @return {?}
         */
        NzCascaderComponent.prototype.toggleSearchingMode = /**
         * @private
         * @param {?} toSearching
         * @return {?}
         */
        function (toSearching) {
            if (this.inSearchingMode !== toSearching) {
                this.cascaderService.toggleSearchingMode(toSearching);
            }
            if (this.inSearchingMode) {
                this.cascaderService.prepareSearchOptions(this.inputValue);
            }
        };
        /**
         * @param {?} option
         * @param {?} index
         * @return {?}
         */
        NzCascaderComponent.prototype.isOptionActivated = /**
         * @param {?} option
         * @param {?} index
         * @return {?}
         */
        function (option, index) {
            /** @type {?} */
            var activeOpt = this.cascaderService.activatedOptions[index];
            return activeOpt === option;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NzCascaderComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            if (isDisabled) {
                this.closeMenu();
            }
            this.nzDisabled = isDisabled;
        };
        /**
         * @return {?}
         */
        NzCascaderComponent.prototype.closeMenu = /**
         * @return {?}
         */
        function () {
            this.blur();
            this.clearDelayMenuTimer();
            this.setMenuVisible(false);
        };
        /**
         * Reposition the cascader panel. When a menu opens, the cascader expands
         * and may exceed the boundary of browser's window.
         */
        /**
         * Reposition the cascader panel. When a menu opens, the cascader expands
         * and may exceed the boundary of browser's window.
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.reposition = /**
         * Reposition the cascader panel. When a menu opens, the cascader expands
         * and may exceed the boundary of browser's window.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.overlay && this.overlay.overlayRef && this.menuVisible) {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () {
                    _this.overlay.overlayRef.updatePosition();
                }));
            }
        };
        /**
         * When a cascader options is changed, a child needs to know that it should re-render.
         */
        /**
         * When a cascader options is changed, a child needs to know that it should re-render.
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.checkChildren = /**
         * When a cascader options is changed, a child needs to know that it should re-render.
         * @private
         * @return {?}
         */
        function () {
            if (this.cascaderItems) {
                this.cascaderItems.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.markForCheck(); }));
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.setDisplayLabel = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var selectedOptions = this.cascaderService.selectedOptions;
            /** @type {?} */
            var labels = selectedOptions.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return _this.cascaderService.getOptionLabel(o); }));
            if (this.isLabelRenderTemplate) {
                this.labelRenderContext = { labels: labels, selectedOptions: selectedOptions };
            }
            else {
                this.labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.setDropdownStyles = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var firstColumn = this.cascaderService.columns[0];
            this.shouldShowEmpty =
                (this.inSearchingMode && (!firstColumn || !firstColumn.length)) || // Should show empty when there's no searching result
                    (!(this.nzOptions && this.nzOptions.length) && !this.nzLoadData); // Should show when there's no options and developer does not use nzLoadData
            this.dropdownHeightStyle = this.shouldShowEmpty ? 'auto' : '';
            if (this.input) {
                this.dropdownWidthStyle = this.inSearchingMode || this.shouldShowEmpty ? this.input.nativeElement.offsetWidth + "px" : '';
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzCascaderComponent.prototype.setLocale = /**
         * @private
         * @return {?}
         */
        function () {
            this.locale = this.i18nService.getLocaleData('global');
            this.cdr.markForCheck();
        };
        NzCascaderComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-cascader, [nz-cascader]',
                        exportAs: 'nzCascader',
                        preserveWhitespaces: false,
                        template: "\n    <div cdkOverlayOrigin #origin=\"cdkOverlayOrigin\" #trigger>\n      <div *ngIf=\"nzShowInput\">\n        <input\n          #input\n          nz-input\n          class=\"ant-cascader-input\"\n          [class.ant-cascader-input-disabled]=\"nzDisabled\"\n          [class.ant-cascader-input-lg]=\"nzSize === 'large'\"\n          [class.ant-cascader-input-sm]=\"nzSize === 'small'\"\n          [attr.autoComplete]=\"'off'\"\n          [attr.placeholder]=\"showPlaceholder ? nzPlaceHolder || locale?.placeholder : null\"\n          [attr.autofocus]=\"nzAutoFocus ? 'autofocus' : null\"\n          [readonly]=\"!nzShowSearch\"\n          [disabled]=\"nzDisabled\"\n          [nzSize]=\"nzSize\"\n          [(ngModel)]=\"inputValue\"\n          (blur)=\"handleInputBlur()\"\n          (focus)=\"handleInputFocus()\"\n          (change)=\"$event.stopPropagation()\"\n        />\n        <i\n          *ngIf=\"clearIconVisible\"\n          nz-icon\n          nzType=\"close-circle\"\n          nzTheme=\"fill\"\n          class=\"ant-cascader-picker-clear\"\n          (click)=\"clearSelection($event)\"\n        ></i>\n        <i\n          *ngIf=\"nzShowArrow && !isLoading\"\n          nz-icon\n          nzType=\"down\"\n          class=\"ant-cascader-picker-arrow\"\n          [class.ant-cascader-picker-arrow-expand]=\"menuVisible\"\n        >\n        </i>\n        <i *ngIf=\"isLoading\" nz-icon nzType=\"loading\" class=\"ant-cascader-picker-arrow\"></i>\n        <span\n          class=\"ant-cascader-picker-label\"\n          [class.ant-cascader-show-search]=\"!!nzShowSearch\"\n          [class.ant-focusd]=\"!!nzShowSearch && isFocused && !inputValue\"\n        >\n          <ng-container *ngIf=\"!isLabelRenderTemplate; else labelTemplate\">{{ labelRenderText }}</ng-container>\n          <ng-template #labelTemplate>\n            <ng-template [ngTemplateOutlet]=\"nzLabelRender\" [ngTemplateOutletContext]=\"labelRenderContext\"></ng-template>\n          </ng-template>\n        </span>\n      </div>\n      <ng-content></ng-content>\n    </div>\n    <ng-template\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      cdkConnectedOverlayHasBackdrop\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayPositions]=\"positions\"\n      [cdkConnectedOverlayTransformOriginOn]=\"'.ant-cascader-menus'\"\n      (backdropClick)=\"closeMenu()\"\n      (detach)=\"closeMenu()\"\n      [cdkConnectedOverlayOpen]=\"menuVisible\"\n    >\n      <div\n        #menu\n        class=\"ant-cascader-menus\"\n        [class.ant-cascader-menus-hidden]=\"!menuVisible\"\n        [ngClass]=\"menuCls\"\n        [ngStyle]=\"nzMenuStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@slideMotion]=\"'enter'\"\n        (mouseleave)=\"onTriggerMouseLeave($event)\"\n      >\n        <ul\n          *ngIf=\"shouldShowEmpty; else hasOptionsTemplate\"\n          class=\"ant-cascader-menu\"\n          [style.width]=\"dropdownWidthStyle\"\n          [style.height]=\"dropdownHeightStyle\"\n        >\n          <li class=\"ant-cascader-menu-item ant-cascader-menu-item-expanded ant-cascader-menu-item-disabled\">\n            <nz-embed-empty [nzComponentName]=\"'cascader'\" [specificContent]=\"nzNotFoundContent\"></nz-embed-empty>\n          </li>\n        </ul>\n        <ng-template #hasOptionsTemplate>\n          <ul\n            *ngFor=\"let options of cascaderService.columns; let i = index\"\n            class=\"ant-cascader-menu\"\n            [ngClass]=\"menuColumnCls\"\n            [style.height]=\"dropdownHeightStyle\"\n            [style.width]=\"dropdownWidthStyle\"\n          >\n            <li\n              nz-cascader-option\n              *ngFor=\"let option of options\"\n              [columnIndex]=\"i\"\n              [nzLabelProperty]=\"nzLabelProperty\"\n              [optionTemplate]=\"nzOptionRender\"\n              [activated]=\"isOptionActivated(option, i)\"\n              [highlightText]=\"inSearchingMode ? inputValue : ''\"\n              [option]=\"option\"\n              (mouseenter)=\"onOptionMouseEnter(option, i, $event)\"\n              (mouseleave)=\"onOptionMouseLeave(option, i, $event)\"\n              (click)=\"onOptionClick(option, i, $event)\"\n            ></li>\n          </ul>\n        </ng-template>\n      </div>\n    </ng-template>\n  ",
                        animations: [animation.slideMotion],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzCascaderComponent; })),
                                multi: true
                            },
                            NzCascaderService
                        ],
                        host: {
                            '[attr.tabIndex]': '"0"',
                            '[class.ant-cascader-lg]': 'nzSize === "large"',
                            '[class.ant-cascader-sm]': 'nzSize === "small"',
                            '[class.ant-cascader-picker-disabled]': 'nzDisabled',
                            '[class.ant-cascader-picker-open]': 'menuVisible',
                            '[class.ant-cascader-picker-with-value]': '!!inputValue',
                            '[class.ant-cascader-focused]': 'isFocused'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzCascaderComponent.ctorParameters = function () { return [
            { type: NzCascaderService },
            { type: i18n.NzI18nService },
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzCascaderComponent.propDecorators = {
            input: [{ type: core.ViewChild, args: ['input', { static: false },] }],
            menu: [{ type: core.ViewChild, args: ['menu', { static: false },] }],
            overlay: [{ type: core.ViewChild, args: [overlay.CdkConnectedOverlay, { static: false },] }],
            cascaderItems: [{ type: core.ViewChildren, args: [NzCascaderOptionComponent,] }],
            nzOptionRender: [{ type: core.Input }],
            nzShowInput: [{ type: core.Input }],
            nzShowArrow: [{ type: core.Input }],
            nzAllowClear: [{ type: core.Input }],
            nzAutoFocus: [{ type: core.Input }],
            nzChangeOnSelect: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzColumnClassName: [{ type: core.Input }],
            nzExpandTrigger: [{ type: core.Input }],
            nzValueProperty: [{ type: core.Input }],
            nzLabelRender: [{ type: core.Input }],
            nzLabelProperty: [{ type: core.Input }],
            nzNotFoundContent: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzShowSearch: [{ type: core.Input }],
            nzPlaceHolder: [{ type: core.Input }],
            nzMenuClassName: [{ type: core.Input }],
            nzMenuStyle: [{ type: core.Input }],
            nzMouseEnterDelay: [{ type: core.Input }],
            nzMouseLeaveDelay: [{ type: core.Input }],
            nzTriggerAction: [{ type: core.Input }],
            nzChangeOn: [{ type: core.Input }],
            nzLoadData: [{ type: core.Input }],
            nzOptions: [{ type: core.Input }],
            nzVisibleChange: [{ type: core.Output }],
            nzSelectionChange: [{ type: core.Output }],
            nzSelect: [{ type: core.Output }],
            nzClear: [{ type: core.Output }],
            onKeyDown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }],
            onTriggerClick: [{ type: core.HostListener, args: ['click',] }],
            onTriggerMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
            onTriggerMouseLeave: [{ type: core.HostListener, args: ['mouseleave', ['$event'],] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCascaderComponent.prototype, "nzShowInput", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCascaderComponent.prototype, "nzShowArrow", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCascaderComponent.prototype, "nzAllowClear", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCascaderComponent.prototype, "nzAutoFocus", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCascaderComponent.prototype, "nzChangeOnSelect", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzCascaderComponent.prototype, "nzDisabled", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzCascaderComponent.prototype, "nzSize", void 0);
        return NzCascaderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzCascaderComponent.ngAcceptInputType_nzShowInput;
        /** @type {?} */
        NzCascaderComponent.ngAcceptInputType_nzShowArrow;
        /** @type {?} */
        NzCascaderComponent.ngAcceptInputType_nzAllowClear;
        /** @type {?} */
        NzCascaderComponent.ngAcceptInputType_nzAutoFocus;
        /** @type {?} */
        NzCascaderComponent.ngAcceptInputType_nzChangeOnSelect;
        /** @type {?} */
        NzCascaderComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzCascaderComponent.prototype.input;
        /** @type {?} */
        NzCascaderComponent.prototype.menu;
        /** @type {?} */
        NzCascaderComponent.prototype.overlay;
        /** @type {?} */
        NzCascaderComponent.prototype.cascaderItems;
        /** @type {?} */
        NzCascaderComponent.prototype.nzOptionRender;
        /** @type {?} */
        NzCascaderComponent.prototype.nzShowInput;
        /** @type {?} */
        NzCascaderComponent.prototype.nzShowArrow;
        /** @type {?} */
        NzCascaderComponent.prototype.nzAllowClear;
        /** @type {?} */
        NzCascaderComponent.prototype.nzAutoFocus;
        /** @type {?} */
        NzCascaderComponent.prototype.nzChangeOnSelect;
        /** @type {?} */
        NzCascaderComponent.prototype.nzDisabled;
        /** @type {?} */
        NzCascaderComponent.prototype.nzColumnClassName;
        /** @type {?} */
        NzCascaderComponent.prototype.nzExpandTrigger;
        /** @type {?} */
        NzCascaderComponent.prototype.nzValueProperty;
        /** @type {?} */
        NzCascaderComponent.prototype.nzLabelRender;
        /** @type {?} */
        NzCascaderComponent.prototype.nzLabelProperty;
        /** @type {?} */
        NzCascaderComponent.prototype.nzNotFoundContent;
        /** @type {?} */
        NzCascaderComponent.prototype.nzSize;
        /** @type {?} */
        NzCascaderComponent.prototype.nzShowSearch;
        /** @type {?} */
        NzCascaderComponent.prototype.nzPlaceHolder;
        /** @type {?} */
        NzCascaderComponent.prototype.nzMenuClassName;
        /** @type {?} */
        NzCascaderComponent.prototype.nzMenuStyle;
        /** @type {?} */
        NzCascaderComponent.prototype.nzMouseEnterDelay;
        /** @type {?} */
        NzCascaderComponent.prototype.nzMouseLeaveDelay;
        /** @type {?} */
        NzCascaderComponent.prototype.nzTriggerAction;
        /** @type {?} */
        NzCascaderComponent.prototype.nzChangeOn;
        /** @type {?} */
        NzCascaderComponent.prototype.nzLoadData;
        /** @type {?} */
        NzCascaderComponent.prototype.nzVisibleChange;
        /** @type {?} */
        NzCascaderComponent.prototype.nzSelectionChange;
        /** @type {?} */
        NzCascaderComponent.prototype.nzSelect;
        /** @type {?} */
        NzCascaderComponent.prototype.nzClear;
        /**
         * If the dropdown should show the empty content.
         * `true` if there's no options.
         * @type {?}
         */
        NzCascaderComponent.prototype.shouldShowEmpty;
        /** @type {?} */
        NzCascaderComponent.prototype.el;
        /** @type {?} */
        NzCascaderComponent.prototype.menuVisible;
        /** @type {?} */
        NzCascaderComponent.prototype.isLoading;
        /** @type {?} */
        NzCascaderComponent.prototype.labelRenderText;
        /** @type {?} */
        NzCascaderComponent.prototype.labelRenderContext;
        /** @type {?} */
        NzCascaderComponent.prototype.onChange;
        /** @type {?} */
        NzCascaderComponent.prototype.onTouched;
        /** @type {?} */
        NzCascaderComponent.prototype.positions;
        /**
         * Dropdown's with in pixel.
         * @type {?}
         */
        NzCascaderComponent.prototype.dropdownWidthStyle;
        /** @type {?} */
        NzCascaderComponent.prototype.dropdownHeightStyle;
        /** @type {?} */
        NzCascaderComponent.prototype.isFocused;
        /** @type {?} */
        NzCascaderComponent.prototype.locale;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.inputString;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.isOpening;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.delayMenuTimer;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.delaySelectTimer;
        /** @type {?} */
        NzCascaderComponent.prototype.cascaderService;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.i18nService;
        /** @type {?} */
        NzCascaderComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzCascaderComponent.prototype.cdr;
        /** @type {?} */
        NzCascaderComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: cascader.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzCascaderModule = /** @class */ (function () {
        function NzCascaderModule() {
        }
        NzCascaderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            overlay.OverlayModule,
                            outlet.NzOutletModule,
                            empty.NzEmptyModule,
                            highlight.NzHighlightModule,
                            icon.NzIconModule,
                            input.NzInputModule,
                            noAnimation.NzNoAnimationModule,
                            overlay$1.NzOverlayModule
                        ],
                        declarations: [NzCascaderComponent, NzCascaderOptionComponent],
                        exports: [NzCascaderComponent]
                    },] }
        ];
        return NzCascaderModule;
    }());

    exports.NzCascaderComponent = NzCascaderComponent;
    exports.NzCascaderModule = NzCascaderModule;
    exports.NzCascaderOptionComponent = NzCascaderOptionComponent;
    exports.NzCascaderService = NzCascaderService;
    exports.isChildOption = isChildOption;
    exports.isParentOption = isParentOption;
    exports.isShowSearchObject = isShowSearchObject;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-cascader.umd.js.map
