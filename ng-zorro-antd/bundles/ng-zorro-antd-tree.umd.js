(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/scrolling'), require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/highlight'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/tree'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/tree', ['exports', '@angular/cdk/scrolling', '@angular/common', '@angular/core', 'ng-zorro-antd/core/highlight', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/tree', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/forms', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].tree = {}), global.ng.cdk.scrolling, global.ng.common, global.ng.core, global['ng-zorro-antd'].core.highlight, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.tree, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.forms, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config));
}(this, (function (exports, scrolling, common, core, highlight, noAnimation, outlet, icon, tree, util, rxjs, operators, forms, animation, config) { 'use strict';

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
     * Generated from: tree-indent.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeIndentComponent = /** @class */ (function () {
        function NzTreeIndentComponent() {
            this.nzSelectMode = false;
            this.listOfUnit = [];
        }
        /**
         * @param {?} index
         * @return {?}
         */
        NzTreeIndentComponent.prototype.unitMapOfClass = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            var _a;
            return _a = {},
                _a["ant-tree-indent-unit"] = !this.nzSelectMode,
                _a["ant-tree-indent-unit-start"] = !this.nzSelectMode && (/** @type {?} */ (this.nzIsStart))[index + 1],
                _a["ant-tree-indent-unit-end"] = !this.nzSelectMode && (/** @type {?} */ (this.nzIsEnd))[index + 1],
                _a["ant-select-tree-indent-unit"] = this.nzSelectMode,
                _a["ant-select-tree-indent-unit-start"] = this.nzSelectMode && (/** @type {?} */ (this.nzIsStart))[index + 1],
                _a["ant-select-tree-indent-unit-end"] = this.nzSelectMode && (/** @type {?} */ (this.nzIsEnd))[index + 1],
                _a;
        };
        /**
         * @return {?}
         */
        NzTreeIndentComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTreeIndentComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzTreeLevel = changes.nzTreeLevel;
            if (nzTreeLevel) {
                this.listOfUnit = __spread(new Array(nzTreeLevel.currentValue || 0));
            }
        };
        NzTreeIndentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tree-indent',
                        exportAs: 'nzTreeIndent',
                        template: " <span *ngFor=\"let i of listOfUnit; let index = index\" [ngClass]=\"unitMapOfClass(index)\"></span> ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        host: {
                            '[attr.aria-hidden]': 'true',
                            '[class.ant-tree-indent]': '!nzSelectMode',
                            '[class.ant-select-tree-indent]': 'nzSelectMode'
                        }
                    }] }
        ];
        NzTreeIndentComponent.propDecorators = {
            nzTreeLevel: [{ type: core.Input }],
            nzIsStart: [{ type: core.Input }],
            nzIsEnd: [{ type: core.Input }],
            nzSelectMode: [{ type: core.Input }]
        };
        return NzTreeIndentComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTreeIndentComponent.prototype.nzTreeLevel;
        /** @type {?} */
        NzTreeIndentComponent.prototype.nzIsStart;
        /** @type {?} */
        NzTreeIndentComponent.prototype.nzIsEnd;
        /** @type {?} */
        NzTreeIndentComponent.prototype.nzSelectMode;
        /** @type {?} */
        NzTreeIndentComponent.prototype.listOfUnit;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree-node-checkbox.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeNodeCheckboxComponent = /** @class */ (function () {
        function NzTreeNodeCheckboxComponent() {
            this.nzSelectMode = false;
        }
        NzTreeNodeCheckboxComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tree-node-checkbox',
                        template: " <span [class.ant-tree-checkbox-inner]=\"!nzSelectMode\" [class.ant-select-tree-checkbox-inner]=\"nzSelectMode\"></span> ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        host: {
                            '[class.ant-select-tree-checkbox]': "nzSelectMode",
                            '[class.ant-select-tree-checkbox-checked]': "nzSelectMode && isChecked",
                            '[class.ant-select-tree-checkbox-indeterminate]': "nzSelectMode && isHalfChecked",
                            '[class.ant-select-tree-checkbox-disabled]': "nzSelectMode && (isDisabled || isDisableCheckbox)",
                            '[class.ant-tree-checkbox]': "!nzSelectMode",
                            '[class.ant-tree-checkbox-checked]': "!nzSelectMode && isChecked",
                            '[class.ant-tree-checkbox-indeterminate]': "!nzSelectMode && isHalfChecked",
                            '[class.ant-tree-checkbox-disabled]': "!nzSelectMode && (isDisabled || isDisableCheckbox)"
                        }
                    }] }
        ];
        NzTreeNodeCheckboxComponent.propDecorators = {
            nzSelectMode: [{ type: core.Input }],
            isChecked: [{ type: core.Input }],
            isHalfChecked: [{ type: core.Input }],
            isDisabled: [{ type: core.Input }],
            isDisableCheckbox: [{ type: core.Input }]
        };
        return NzTreeNodeCheckboxComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTreeNodeCheckboxComponent.prototype.nzSelectMode;
        /** @type {?} */
        NzTreeNodeCheckboxComponent.prototype.isChecked;
        /** @type {?} */
        NzTreeNodeCheckboxComponent.prototype.isHalfChecked;
        /** @type {?} */
        NzTreeNodeCheckboxComponent.prototype.isDisabled;
        /** @type {?} */
        NzTreeNodeCheckboxComponent.prototype.isDisableCheckbox;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree-node-switcher.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeNodeSwitcherComponent = /** @class */ (function () {
        function NzTreeNodeSwitcherComponent() {
            this.nzSelectMode = false;
        }
        Object.defineProperty(NzTreeNodeSwitcherComponent.prototype, "isShowLineIcon", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.isLeaf && !!this.nzShowLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeSwitcherComponent.prototype, "isShowSwitchIcon", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.isLeaf && !this.nzShowLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeSwitcherComponent.prototype, "isSwitcherOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.isExpanded && !this.isLeaf;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeSwitcherComponent.prototype, "isSwitcherClose", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.isExpanded && !this.isLeaf;
            },
            enumerable: true,
            configurable: true
        });
        NzTreeNodeSwitcherComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tree-node-switcher',
                        template: "\n    <ng-container *ngIf=\"isShowSwitchIcon\">\n      <ng-container *ngIf=\"!isLoading; else loadingTemplate\">\n        <ng-container *nzStringTemplateOutlet=\"nzExpandedIcon; context: { $implicit: context, origin: context.origin }\">\n          <i\n            nz-icon\n            nzType=\"caret-down\"\n            [class.ant-select-tree-switcher-icon]=\"nzSelectMode\"\n            [class.ant-tree-switcher-icon]=\"!nzSelectMode\"\n          ></i>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"nzShowLine\">\n      <ng-container *ngIf=\"!isLoading; else loadingTemplate\">\n        <ng-container *nzStringTemplateOutlet=\"nzExpandedIcon; context: { $implicit: context, origin: context.origin }\">\n          <i\n            *ngIf=\"isShowLineIcon\"\n            nz-icon\n            [nzType]=\"isSwitcherOpen ? 'minus-square' : 'plus-square'\"\n            class=\"ant-tree-switcher-line-icon\"\n          ></i>\n          <i *ngIf=\"!isShowLineIcon\" nz-icon nzType=\"file\" class=\"ant-tree-switcher-line-icon\"></i>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n    <ng-template #loadingTemplate>\n      <i nz-icon nzType=\"loading\" [nzSpin]=\"true\" class=\"ant-tree-switcher-loading-icon\"></i>\n    </ng-template>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        host: {
                            '[class.ant-select-tree-switcher]': 'nzSelectMode',
                            '[class.ant-select-tree-switcher-noop]': 'nzSelectMode && isLeaf',
                            '[class.ant-select-tree-switcher_open]': 'nzSelectMode && isSwitcherOpen',
                            '[class.ant-select-tree-switcher_close]': 'nzSelectMode && isSwitcherClose',
                            '[class.ant-tree-switcher]': '!nzSelectMode',
                            '[class.ant-tree-switcher-noop]': '!nzSelectMode && isLeaf',
                            '[class.ant-tree-switcher_open]': '!nzSelectMode && isSwitcherOpen',
                            '[class.ant-tree-switcher_close]': '!nzSelectMode && isSwitcherClose'
                        }
                    }] }
        ];
        NzTreeNodeSwitcherComponent.propDecorators = {
            nzShowExpand: [{ type: core.Input }],
            nzShowLine: [{ type: core.Input }],
            nzExpandedIcon: [{ type: core.Input }],
            nzSelectMode: [{ type: core.Input }],
            context: [{ type: core.Input }],
            isLeaf: [{ type: core.Input }],
            isLoading: [{ type: core.Input }],
            isExpanded: [{ type: core.Input }]
        };
        return NzTreeNodeSwitcherComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.nzShowExpand;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.nzShowLine;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.nzExpandedIcon;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.nzSelectMode;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.context;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.isLeaf;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.isLoading;
        /** @type {?} */
        NzTreeNodeSwitcherComponent.prototype.isExpanded;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree-node-title.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeNodeTitleComponent = /** @class */ (function () {
        function NzTreeNodeTitleComponent() {
            this.treeTemplate = null;
            this.selectMode = false;
        }
        Object.defineProperty(NzTreeNodeTitleComponent.prototype, "canDraggable", {
            get: /**
             * @return {?}
             */
            function () {
                return this.draggable && !this.isDisabled ? true : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeTitleComponent.prototype, "matchedValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isMatched ? this.searchValue : '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeTitleComponent.prototype, "isSwitcherOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isExpanded && !this.isLeaf;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeTitleComponent.prototype, "isSwitcherClose", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.isExpanded && !this.isLeaf;
            },
            enumerable: true,
            configurable: true
        });
        NzTreeNodeTitleComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tree-node-title',
                        template: " <ng-template [ngTemplateOutlet]=\"treeTemplate\" [ngTemplateOutletContext]=\"{ $implicit: context, origin: context.origin }\">\n    </ng-template>\n    <ng-container *ngIf=\"!treeTemplate\">\n      <span\n        *ngIf=\"icon && showIcon\"\n        [class.ant-tree-icon__open]=\"isSwitcherOpen\"\n        [class.ant-tree-icon__close]=\"isSwitcherClose\"\n        [class.ant-tree-icon_loading]=\"isLoading\"\n        [class.ant-select-tree-iconEle]=\"selectMode\"\n        [class.ant-tree-iconEle]=\"!selectMode\"\n      >\n        <span\n          [class.ant-select-tree-iconEle]=\"selectMode\"\n          [class.ant-select-tree-icon__customize]=\"selectMode\"\n          [class.ant-tree-iconEle]=\"!selectMode\"\n          [class.ant-tree-icon__customize]=\"!selectMode\"\n        >\n          <i nz-icon *ngIf=\"icon\" [nzType]=\"icon\"></i>\n        </span>\n      </span>\n      <span class=\"ant-tree-title\" [innerHTML]=\"title | nzHighlight: matchedValue:'i':'font-highlight'\"> </span>\n    </ng-container>",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        host: {
                            '[attr.title]': 'title',
                            '[attr.draggable]': 'canDraggable',
                            '[attr.aria-grabbed]': 'canDraggable',
                            '[class.draggable]': 'canDraggable',
                            '[class.ant-select-tree-node-content-wrapper]': "selectMode",
                            '[class.ant-select-tree-node-content-wrapper-open]': "selectMode && isSwitcherOpen",
                            '[class.ant-select-tree-node-content-wrapper-close]': "selectMode && isSwitcherClose",
                            '[class.ant-select-tree-node-selected]': "selectMode && isSelected",
                            '[class.ant-tree-node-content-wrapper]': "!selectMode",
                            '[class.ant-tree-node-content-wrapper-open]': "!selectMode && isSwitcherOpen",
                            '[class.ant-tree-node-content-wrapper-close]': "!selectMode && isSwitcherClose",
                            '[class.ant-tree-node-selected]': "!selectMode && isSelected"
                        }
                    }] }
        ];
        NzTreeNodeTitleComponent.propDecorators = {
            searchValue: [{ type: core.Input }],
            treeTemplate: [{ type: core.Input }],
            draggable: [{ type: core.Input }],
            showIcon: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            context: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            title: [{ type: core.Input }],
            isLoading: [{ type: core.Input }],
            isSelected: [{ type: core.Input }],
            isDisabled: [{ type: core.Input }],
            isMatched: [{ type: core.Input }],
            isExpanded: [{ type: core.Input }],
            isLeaf: [{ type: core.Input }]
        };
        return NzTreeNodeTitleComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.searchValue;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.treeTemplate;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.draggable;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.showIcon;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.selectMode;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.context;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.icon;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.title;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.isLoading;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.isSelected;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.isDisabled;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.isMatched;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.isExpanded;
        /** @type {?} */
        NzTreeNodeTitleComponent.prototype.isLeaf;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree-node.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeNodeComponent = /** @class */ (function () {
        function NzTreeNodeComponent(nzTreeService, ngZone, renderer, elementRef, cdr, noAnimation) {
            this.nzTreeService = nzTreeService;
            this.ngZone = ngZone;
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.cdr = cdr;
            this.noAnimation = noAnimation;
            /**
             * for global property
             */
            this.icon = '';
            this.title = '';
            this.isLoading = false;
            this.isSelected = false;
            this.isDisabled = false;
            this.isMatched = false;
            this.nzHideUnMatched = false;
            this.nzNoAnimation = false;
            this.nzSelectMode = false;
            this.nzShowIcon = false;
            this.nzTreeTemplate = null;
            this.nzSearchValue = '';
            this.nzDraggable = false;
            this.nzClick = new core.EventEmitter();
            this.nzDblClick = new core.EventEmitter();
            this.nzContextMenu = new core.EventEmitter();
            this.nzCheckBoxChange = new core.EventEmitter();
            this.nzExpandChange = new core.EventEmitter();
            this.nzOnDragStart = new core.EventEmitter();
            this.nzOnDragEnter = new core.EventEmitter();
            this.nzOnDragOver = new core.EventEmitter();
            this.nzOnDragLeave = new core.EventEmitter();
            this.nzOnDrop = new core.EventEmitter();
            this.nzOnDragEnd = new core.EventEmitter();
            /**
             * drag var
             */
            this.destroy$ = new rxjs.Subject();
            this.dragPos = 2;
            this.dragPosClass = {
                '0': 'drag-over',
                '1': 'drag-over-gap-bottom',
                '-1': 'drag-over-gap-top'
            };
        }
        Object.defineProperty(NzTreeNodeComponent.prototype, "displayStyle", {
            /**
             * default set
             */
            get: /**
             * default set
             * @return {?}
             */
            function () {
                // to hide unmatched nodes
                return this.nzSearchValue && this.nzHideUnMatched && !this.isMatched && !this.isExpanded && this.canHide ? 'none' : '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeComponent.prototype, "isSwitcherOpen", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isExpanded && !this.isLeaf;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNodeComponent.prototype, "isSwitcherClose", {
            get: /**
             * @return {?}
             */
            function () {
                return !this.isExpanded && !this.isLeaf;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        NzTreeNodeComponent.prototype.onMousedown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.nzSelectMode) {
                event.preventDefault();
            }
        };
        /**
         * collapse node
         * @param event
         */
        /**
         * collapse node
         * @param {?} event
         * @return {?}
         */
        NzTreeNodeComponent.prototype.clickExpand = /**
         * collapse node
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            if (!this.isLoading && !this.isLeaf) {
                // set async state
                if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.isExpanded) {
                    this.nzTreeNode.isLoading = true;
                }
                this.nzTreeNode.setExpanded(!this.isExpanded);
            }
            this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('expand', this.nzTreeNode, event);
            this.nzExpandChange.emit(eventNext);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTreeNodeComponent.prototype.clickSelect = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            if (this.isSelectable && !this.isDisabled) {
                this.nzTreeNode.isSelected = !this.nzTreeNode.isSelected;
            }
            this.nzTreeService.setSelectedNodeList(this.nzTreeNode);
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('click', this.nzTreeNode, event);
            this.nzClick.emit(eventNext);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTreeNodeComponent.prototype.dblClick = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('dblclick', this.nzTreeNode, event);
            this.nzDblClick.emit(eventNext);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTreeNodeComponent.prototype.contextMenu = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event);
            this.nzContextMenu.emit(eventNext);
        };
        /**
         * check node
         * @param event
         */
        /**
         * check node
         * @param {?} event
         * @return {?}
         */
        NzTreeNodeComponent.prototype.clickCheckBox = /**
         * check node
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            // return if node is disabled
            if (this.isDisabled || this.isDisableCheckbox) {
                return;
            }
            this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
            this.nzTreeNode.isHalfChecked = false;
            this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
            this.nzCheckBoxChange.emit(eventNext);
        };
        /**
         * @return {?}
         */
        NzTreeNodeComponent.prototype.clearDragClass = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over'];
            dragClass.forEach((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.renderer.removeClass(_this.elementRef.nativeElement, e);
            }));
        };
        /**
         * drag event
         * @param e
         */
        /**
         * drag event
         * @param {?} e
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handleDragStart = /**
         * drag event
         * @param {?} e
         * @return {?}
         */
        function (e) {
            try {
                // ie throw error
                // firefox-need-it
                (/** @type {?} */ (e.dataTransfer)).setData('text/plain', (/** @type {?} */ (this.nzTreeNode.key)));
            }
            catch (error) {
                // empty
            }
            this.nzTreeService.setSelectedNode(this.nzTreeNode);
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e);
            this.nzOnDragStart.emit(eventNext);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handleDragEnter = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            e.preventDefault();
            // reset position
            this.dragPos = 2;
            this.ngZone.run((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var eventNext = _this.nzTreeService.formatEvent('dragenter', _this.nzTreeNode, e);
                _this.nzOnDragEnter.emit(eventNext);
            }));
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handleDragOver = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var dropPosition = this.nzTreeService.calcDropPosition(e);
            if (this.dragPos !== dropPosition) {
                this.clearDragClass();
                this.dragPos = dropPosition;
                // leaf node will pass
                if (!(this.dragPos === 0 && this.isLeaf)) {
                    this.renderer.addClass(this.elementRef.nativeElement, this.dragPosClass[this.dragPos]);
                }
            }
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e);
            this.nzOnDragOver.emit(eventNext);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handleDragLeave = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            this.clearDragClass();
            /** @type {?} */
            var eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
            this.nzOnDragLeave.emit(eventNext);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handleDragDrop = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.clearDragClass();
                /** @type {?} */
                var node = _this.nzTreeService.getSelectedNode();
                if (!node || (node && node.key === _this.nzTreeNode.key) || (_this.dragPos === 0 && _this.isLeaf)) {
                    return;
                }
                // pass if node is leafNo
                /** @type {?} */
                var dropEvent = _this.nzTreeService.formatEvent('drop', _this.nzTreeNode, e);
                /** @type {?} */
                var dragEndEvent = _this.nzTreeService.formatEvent('dragend', _this.nzTreeNode, e);
                if (_this.nzBeforeDrop) {
                    _this.nzBeforeDrop({
                        dragNode: (/** @type {?} */ (_this.nzTreeService.getSelectedNode())),
                        node: _this.nzTreeNode,
                        pos: _this.dragPos
                    }).subscribe((/**
                     * @param {?} canDrop
                     * @return {?}
                     */
                    function (canDrop) {
                        if (canDrop) {
                            _this.nzTreeService.dropAndApply(_this.nzTreeNode, _this.dragPos);
                        }
                        _this.nzOnDrop.emit(dropEvent);
                        _this.nzOnDragEnd.emit(dragEndEvent);
                    }));
                }
                else if (_this.nzTreeNode) {
                    _this.nzTreeService.dropAndApply(_this.nzTreeNode, _this.dragPos);
                    _this.nzOnDrop.emit(dropEvent);
                }
            }));
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handleDragEnd = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var _this = this;
            e.preventDefault();
            this.ngZone.run((/**
             * @return {?}
             */
            function () {
                // if user do not custom beforeDrop
                if (!_this.nzBeforeDrop) {
                    /** @type {?} */
                    var eventNext = _this.nzTreeService.formatEvent('dragend', _this.nzTreeNode, e);
                    _this.nzOnDragEnd.emit(eventNext);
                }
            }));
        };
        /**
         * Listening to dragging events.
         */
        /**
         * Listening to dragging events.
         * @return {?}
         */
        NzTreeNodeComponent.prototype.handDragEvent = /**
         * Listening to dragging events.
         * @return {?}
         */
        function () {
            var _this = this;
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                if (_this.nzDraggable) {
                    /** @type {?} */
                    var nativeElement = _this.elementRef.nativeElement;
                    _this.destroy$ = new rxjs.Subject();
                    rxjs.fromEvent(nativeElement, 'dragstart')
                        .pipe(operators.takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.handleDragStart(e); }));
                    rxjs.fromEvent(nativeElement, 'dragenter')
                        .pipe(operators.takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.handleDragEnter(e); }));
                    rxjs.fromEvent(nativeElement, 'dragover')
                        .pipe(operators.takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.handleDragOver(e); }));
                    rxjs.fromEvent(nativeElement, 'dragleave')
                        .pipe(operators.takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.handleDragLeave(e); }));
                    rxjs.fromEvent(nativeElement, 'drop')
                        .pipe(operators.takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.handleDragDrop(e); }));
                    rxjs.fromEvent(nativeElement, 'dragend')
                        .pipe(operators.takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.handleDragEnd(e); }));
                }
                else {
                    _this.destroy$.next();
                    _this.destroy$.complete();
                }
            }));
        };
        /**
         * @return {?}
         */
        NzTreeNodeComponent.prototype.markForCheck = /**
         * @return {?}
         */
        function () {
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzTreeNodeComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.nzTreeNode.component = this;
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTreeNodeComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzDraggable = changes.nzDraggable;
            if (nzDraggable) {
                this.handDragEvent();
            }
        };
        /**
         * @return {?}
         */
        NzTreeNodeComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTreeNodeComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tree-node',
                        exportAs: 'nzTreeNode',
                        template: "\n    <nz-tree-indent [nzTreeLevel]=\"nzTreeNode.level\" [nzSelectMode]=\"nzSelectMode\" [nzIsStart]=\"isStart\" [nzIsEnd]=\"isEnd\"></nz-tree-indent>\n    <nz-tree-node-switcher\n      *ngIf=\"nzShowExpand\"\n      [nzShowExpand]=\"nzShowExpand\"\n      [nzShowLine]=\"nzShowLine\"\n      [nzExpandedIcon]=\"nzExpandedIcon\"\n      [nzSelectMode]=\"nzSelectMode\"\n      [context]=\"nzTreeNode\"\n      [isLeaf]=\"isLeaf\"\n      [isExpanded]=\"isExpanded\"\n      [isLoading]=\"isLoading\"\n      (click)=\"clickExpand($event)\"\n    ></nz-tree-node-switcher>\n    <nz-tree-node-checkbox\n      *ngIf=\"nzCheckable\"\n      (click)=\"clickCheckBox($event)\"\n      [nzSelectMode]=\"nzSelectMode\"\n      [isChecked]=\"isChecked\"\n      [isHalfChecked]=\"isHalfChecked\"\n      [isDisabled]=\"isDisabled\"\n      [isDisableCheckbox]=\"isDisableCheckbox\"\n    ></nz-tree-node-checkbox>\n    <nz-tree-node-title\n      [icon]=\"icon\"\n      [title]=\"title\"\n      [isLoading]=\"isLoading\"\n      [isSelected]=\"isSelected\"\n      [isDisabled]=\"isDisabled\"\n      [isMatched]=\"isMatched\"\n      [isExpanded]=\"isExpanded\"\n      [isLeaf]=\"isLeaf\"\n      [searchValue]=\"nzSearchValue\"\n      [treeTemplate]=\"nzTreeTemplate\"\n      [draggable]=\"nzDraggable\"\n      [showIcon]=\"nzShowIcon\"\n      [selectMode]=\"nzSelectMode\"\n      [context]=\"nzTreeNode\"\n      (dblclick)=\"dblClick($event)\"\n      (click)=\"clickSelect($event)\"\n      (contextmenu)=\"contextMenu($event)\"\n    ></nz-tree-node-title>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        host: {
                            '[class.ant-select-tree-treenode]': "nzSelectMode",
                            '[class.ant-select-tree-treenode-disabled]': "nzSelectMode && isDisabled",
                            '[class.ant-select-tree-treenode-switcher-open]': "nzSelectMode && isSwitcherOpen",
                            '[class.ant-select-tree-treenode-switcher-close]': "nzSelectMode && isSwitcherClose",
                            '[class.ant-select-tree-treenode-checkbox-checked]': "nzSelectMode && isChecked",
                            '[class.ant-select-tree-treenode-checkbox-indeterminate]': "nzSelectMode && isHalfChecked",
                            '[class.ant-select-tree-treenode-selected]': "nzSelectMode && isSelected",
                            '[class.ant-select-tree-treenode-loading]': "nzSelectMode && isLoading",
                            '[class.ant-tree-treenode]': "!nzSelectMode",
                            '[class.ant-tree-treenode-disabled]': "!nzSelectMode && isDisabled",
                            '[class.ant-tree-treenode-switcher-open]': "!nzSelectMode && isSwitcherOpen",
                            '[class.ant-tree-treenode-switcher-close]': "!nzSelectMode && isSwitcherClose",
                            '[class.ant-tree-treenode-checkbox-checked]': "!nzSelectMode && isChecked",
                            '[class.ant-tree-treenode-checkbox-indeterminate]': "!nzSelectMode && isHalfChecked",
                            '[class.ant-tree-treenode-selected]': "!nzSelectMode && isSelected",
                            '[class.ant-tree-treenode-loading]': "!nzSelectMode && isLoading",
                            '[style.display]': 'displayStyle',
                            '(mousedown)': 'onMousedown($event)'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTreeNodeComponent.ctorParameters = function () { return [
            { type: tree.NzTreeBaseService },
            { type: core.NgZone },
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzTreeNodeComponent.propDecorators = {
            icon: [{ type: core.Input }],
            title: [{ type: core.Input }],
            isLoading: [{ type: core.Input }],
            isSelected: [{ type: core.Input }],
            isDisabled: [{ type: core.Input }],
            isMatched: [{ type: core.Input }],
            isExpanded: [{ type: core.Input }],
            isLeaf: [{ type: core.Input }],
            isChecked: [{ type: core.Input }],
            isHalfChecked: [{ type: core.Input }],
            isDisableCheckbox: [{ type: core.Input }],
            isSelectable: [{ type: core.Input }],
            canHide: [{ type: core.Input }],
            isStart: [{ type: core.Input }],
            isEnd: [{ type: core.Input }],
            nzTreeNode: [{ type: core.Input }],
            nzShowLine: [{ type: core.Input }],
            nzShowExpand: [{ type: core.Input }],
            nzCheckable: [{ type: core.Input }],
            nzAsyncData: [{ type: core.Input }],
            nzHideUnMatched: [{ type: core.Input }],
            nzNoAnimation: [{ type: core.Input }],
            nzSelectMode: [{ type: core.Input }],
            nzShowIcon: [{ type: core.Input }],
            nzExpandedIcon: [{ type: core.Input }],
            nzTreeTemplate: [{ type: core.Input }],
            nzBeforeDrop: [{ type: core.Input }],
            nzSearchValue: [{ type: core.Input }],
            nzDraggable: [{ type: core.Input }],
            nzClick: [{ type: core.Output }],
            nzDblClick: [{ type: core.Output }],
            nzContextMenu: [{ type: core.Output }],
            nzCheckBoxChange: [{ type: core.Output }],
            nzExpandChange: [{ type: core.Output }],
            nzOnDragStart: [{ type: core.Output }],
            nzOnDragEnter: [{ type: core.Output }],
            nzOnDragOver: [{ type: core.Output }],
            nzOnDragLeave: [{ type: core.Output }],
            nzOnDrop: [{ type: core.Output }],
            nzOnDragEnd: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTreeNodeComponent.prototype, "nzShowLine", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTreeNodeComponent.prototype, "nzShowExpand", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTreeNodeComponent.prototype, "nzCheckable", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTreeNodeComponent.prototype, "nzAsyncData", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeNodeComponent.prototype, "nzHideUnMatched", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeNodeComponent.prototype, "nzNoAnimation", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeNodeComponent.prototype, "nzSelectMode", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeNodeComponent.prototype, "nzShowIcon", void 0);
        return NzTreeNodeComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzShowLine;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzShowExpand;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzCheckable;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzAsyncData;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzHideUnMatched;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzNoAnimation;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzSelectMode;
        /** @type {?} */
        NzTreeNodeComponent.ngAcceptInputType_nzShowIcon;
        /**
         * for global property
         * @type {?}
         */
        NzTreeNodeComponent.prototype.icon;
        /** @type {?} */
        NzTreeNodeComponent.prototype.title;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isLoading;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isSelected;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isDisabled;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isMatched;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isExpanded;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isLeaf;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isChecked;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isHalfChecked;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isDisableCheckbox;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isSelectable;
        /** @type {?} */
        NzTreeNodeComponent.prototype.canHide;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isStart;
        /** @type {?} */
        NzTreeNodeComponent.prototype.isEnd;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzTreeNode;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzShowLine;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzShowExpand;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzCheckable;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzAsyncData;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzHideUnMatched;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzNoAnimation;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzSelectMode;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzShowIcon;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzExpandedIcon;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzTreeTemplate;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzBeforeDrop;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzSearchValue;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzDraggable;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzClick;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzDblClick;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzContextMenu;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzCheckBoxChange;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzExpandChange;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzOnDragStart;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzOnDragEnter;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzOnDragOver;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzOnDragLeave;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzOnDrop;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzOnDragEnd;
        /**
         * drag var
         * @type {?}
         */
        NzTreeNodeComponent.prototype.destroy$;
        /** @type {?} */
        NzTreeNodeComponent.prototype.dragPos;
        /** @type {?} */
        NzTreeNodeComponent.prototype.dragPosClass;
        /** @type {?} */
        NzTreeNodeComponent.prototype.nzTreeService;
        /**
         * @type {?}
         * @private
         */
        NzTreeNodeComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        NzTreeNodeComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTreeNodeComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzTreeNodeComponent.prototype.cdr;
        /** @type {?} */
        NzTreeNodeComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeService = /** @class */ (function (_super) {
        __extends(NzTreeService, _super);
        function NzTreeService() {
            return _super.call(this) || this;
        }
        NzTreeService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NzTreeService.ctorParameters = function () { return []; };
        return NzTreeService;
    }(tree.NzTreeBaseService));

    /**
     * @fileoverview added by tsickle
     * Generated from: tree.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} higherOrderService
     * @param {?} treeService
     * @return {?}
     */
    function NzTreeServiceFactory(higherOrderService, treeService) {
        return higherOrderService ? higherOrderService : treeService;
    }
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'tree';
    var NzTreeComponent = /** @class */ (function (_super) {
        __extends(NzTreeComponent, _super);
        // Handle emit event end
        function NzTreeComponent(nzTreeService, nzConfigService, cdr, noAnimation) {
            var _this = _super.call(this, nzTreeService) || this;
            _this.nzConfigService = nzConfigService;
            _this.cdr = cdr;
            _this.noAnimation = noAnimation;
            _this.nzShowIcon = false;
            _this.nzHideUnMatched = false;
            _this.nzBlockNode = false;
            _this.nzExpandAll = false;
            _this.nzSelectMode = false;
            _this.nzCheckStrictly = false;
            _this.nzShowExpand = true;
            _this.nzShowLine = false;
            _this.nzCheckable = false;
            _this.nzAsyncData = false;
            _this.nzDraggable = false;
            _this.nzMultiple = false;
            _this.nzVirtualItemSize = 28;
            _this.nzVirtualMaxBufferPx = 500;
            _this.nzVirtualMinBufferPx = 28;
            _this.nzVirtualHeight = null;
            _this.nzData = [];
            _this.nzExpandedKeys = [];
            _this.nzSelectedKeys = [];
            _this.nzCheckedKeys = [];
            _this.nzFlattenNodes = [];
            _this.beforeInit = true;
            _this.nzExpandedKeysChange = new core.EventEmitter();
            _this.nzSelectedKeysChange = new core.EventEmitter();
            _this.nzCheckedKeysChange = new core.EventEmitter();
            _this.nzSearchValueChange = new core.EventEmitter();
            _this.nzClick = new core.EventEmitter();
            _this.nzDblClick = new core.EventEmitter();
            _this.nzContextMenu = new core.EventEmitter();
            _this.nzCheckBoxChange = new core.EventEmitter();
            _this.nzExpandChange = new core.EventEmitter();
            _this.nzOnDragStart = new core.EventEmitter();
            _this.nzOnDragEnter = new core.EventEmitter();
            _this.nzOnDragOver = new core.EventEmitter();
            _this.nzOnDragLeave = new core.EventEmitter();
            _this.nzOnDrop = new core.EventEmitter();
            _this.nzOnDragEnd = new core.EventEmitter();
            _this.HIDDEN_STYLE = {
                width: 0,
                height: 0,
                display: 'flex',
                overflow: 'hidden',
                opacity: 0,
                border: 0,
                padding: 0,
                margin: 0
            };
            _this.destroy$ = new rxjs.Subject();
            _this.onChange = (/**
             * @return {?}
             */
            function () { return null; });
            _this.onTouched = (/**
             * @return {?}
             */
            function () { return null; });
            return _this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        NzTreeComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.handleNzData(value);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzTreeComponent.prototype.registerOnChange = /**
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
        NzTreeComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * Render all properties of nzTree
         * @param changes: all changes from @Input
         */
        /**
         * Render all properties of nzTree
         * @param {?} changes
         * @return {?}
         */
        NzTreeComponent.prototype.renderTreeProperties = /**
         * Render all properties of nzTree
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var useDefaultExpandedKeys = false;
            /** @type {?} */
            var expandAll = false;
            var nzData = changes.nzData, nzExpandedKeys = changes.nzExpandedKeys, nzSelectedKeys = changes.nzSelectedKeys, nzCheckedKeys = changes.nzCheckedKeys, nzCheckStrictly = changes.nzCheckStrictly, nzExpandAll = changes.nzExpandAll, nzMultiple = changes.nzMultiple, nzSearchValue = changes.nzSearchValue;
            if (nzExpandAll) {
                useDefaultExpandedKeys = true;
                expandAll = this.nzExpandAll;
            }
            if (nzMultiple) {
                this.nzTreeService.isMultiple = this.nzMultiple;
            }
            if (nzCheckStrictly) {
                this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
            }
            if (nzData) {
                this.handleNzData(this.nzData);
            }
            if (nzCheckedKeys) {
                this.handleCheckedKeys(this.nzCheckedKeys);
            }
            if (nzCheckStrictly) {
                this.handleCheckedKeys(null);
            }
            if (nzExpandedKeys || nzExpandAll) {
                useDefaultExpandedKeys = true;
                this.handleExpandedKeys(expandAll || this.nzExpandedKeys);
            }
            if (nzSelectedKeys) {
                this.handleSelectedKeys(this.nzSelectedKeys, this.nzMultiple);
            }
            if (nzSearchValue) {
                if (!(nzSearchValue.firstChange && !this.nzSearchValue)) {
                    useDefaultExpandedKeys = false;
                    this.handleSearchValue(nzSearchValue.currentValue, this.nzSearchFunc);
                    this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
                }
            }
            // flatten data
            /** @type {?} */
            var currentExpandedKeys = this.getExpandedNodeList().map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.key; }));
            /** @type {?} */
            var newExpandedKeys = useDefaultExpandedKeys ? expandAll || this.nzExpandedKeys : currentExpandedKeys;
            this.handleFlattenNodes(this.nzTreeService.rootNodes, newExpandedKeys);
        };
        /**
         * @param {?} _
         * @param {?} node
         * @return {?}
         */
        NzTreeComponent.prototype.trackByFlattenNode = /**
         * @param {?} _
         * @param {?} node
         * @return {?}
         */
        function (_, node) {
            return node.key;
        };
        // Deal with properties
        /**
         * nzData
         * @param value
         */
        // Deal with properties
        /**
         * nzData
         * @param {?} value
         * @return {?}
         */
        NzTreeComponent.prototype.handleNzData = 
        // Deal with properties
        /**
         * nzData
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (Array.isArray(value)) {
                /** @type {?} */
                var data = this.coerceTreeNodes(value);
                this.nzTreeService.initTree(data);
            }
        };
        /**
         * @param {?} data
         * @param {?=} expandKeys
         * @return {?}
         */
        NzTreeComponent.prototype.handleFlattenNodes = /**
         * @param {?} data
         * @param {?=} expandKeys
         * @return {?}
         */
        function (data, expandKeys) {
            if (expandKeys === void 0) { expandKeys = []; }
            this.nzTreeService.flattenTreeData(data, expandKeys);
        };
        /**
         * @param {?} keys
         * @return {?}
         */
        NzTreeComponent.prototype.handleCheckedKeys = /**
         * @param {?} keys
         * @return {?}
         */
        function (keys) {
            this.nzTreeService.conductCheck(keys, this.nzCheckStrictly);
        };
        /**
         * @param {?=} keys
         * @return {?}
         */
        NzTreeComponent.prototype.handleExpandedKeys = /**
         * @param {?=} keys
         * @return {?}
         */
        function (keys) {
            if (keys === void 0) { keys = []; }
            this.nzTreeService.conductExpandedKeys(keys);
        };
        /**
         * @param {?} keys
         * @param {?} isMulti
         * @return {?}
         */
        NzTreeComponent.prototype.handleSelectedKeys = /**
         * @param {?} keys
         * @param {?} isMulti
         * @return {?}
         */
        function (keys, isMulti) {
            this.nzTreeService.conductSelectedKeys(keys, isMulti);
        };
        /**
         * @param {?} value
         * @param {?=} searchFunc
         * @return {?}
         */
        NzTreeComponent.prototype.handleSearchValue = /**
         * @param {?} value
         * @param {?=} searchFunc
         * @return {?}
         */
        function (value, searchFunc) {
            var _this = this;
            /** @type {?} */
            var dataList = tree.flattenTreeData(this.nzTreeService.rootNodes, true).map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.data; }));
            /** @type {?} */
            var checkIfMatched = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                if (searchFunc) {
                    return searchFunc(node.origin);
                }
                return !value || !node.title.toLowerCase().includes(value.toLowerCase()) ? false : true;
            });
            dataList.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                v.isMatched = checkIfMatched(v);
                v.canHide = !v.isMatched;
                if (!v.isMatched) {
                    v.setExpanded(false);
                    _this.nzTreeService.setExpandedNodeList(v);
                }
                else {
                    // expand
                    _this.nzTreeService.expandNodeAllParentBySearch(v);
                }
                _this.nzTreeService.setMatchedNodeList(v);
            }));
        };
        /**
         * Handle emit event
         * @param event
         * handle each event
         */
        /**
         * Handle emit event
         * @param {?} event
         * handle each event
         * @return {?}
         */
        NzTreeComponent.prototype.eventTriggerChanged = /**
         * Handle emit event
         * @param {?} event
         * handle each event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var node = (/** @type {?} */ (event.node));
            switch (event.eventName) {
                case 'expand':
                    this.renderTree();
                    this.nzExpandChange.emit(event);
                    break;
                case 'click':
                    this.nzClick.emit(event);
                    break;
                case 'dblclick':
                    this.nzDblClick.emit(event);
                    break;
                case 'contextmenu':
                    this.nzContextMenu.emit(event);
                    break;
                case 'check':
                    // Render checked state with nodes' property `isChecked`
                    this.nzTreeService.setCheckedNodeList(node);
                    if (!this.nzCheckStrictly) {
                        this.nzTreeService.conduct(node);
                    }
                    // Cause check method will rerender list, so we need recover it and next the new event to user
                    /** @type {?} */
                    var eventNext = this.nzTreeService.formatEvent('check', node, (/** @type {?} */ (event.event)));
                    this.nzCheckBoxChange.emit(eventNext);
                    break;
                case 'dragstart':
                    // if node is expanded
                    if (node.isExpanded) {
                        node.setExpanded(!node.isExpanded);
                        this.renderTree();
                    }
                    this.nzOnDragStart.emit(event);
                    break;
                case 'dragenter':
                    /** @type {?} */
                    var selectedNode = this.nzTreeService.getSelectedNode();
                    if (selectedNode && selectedNode.key !== node.key && !node.isExpanded && !node.isLeaf) {
                        node.setExpanded(true);
                        this.renderTree();
                    }
                    this.nzOnDragEnter.emit(event);
                    break;
                case 'dragover':
                    this.nzOnDragOver.emit(event);
                    break;
                case 'dragleave':
                    this.nzOnDragLeave.emit(event);
                    break;
                case 'dragend':
                    this.nzOnDragEnd.emit(event);
                    break;
                case 'drop':
                    this.renderTree();
                    this.nzOnDrop.emit(event);
                    break;
            }
        };
        /**
         * Click expand icon
         */
        /**
         * Click expand icon
         * @return {?}
         */
        NzTreeComponent.prototype.renderTree = /**
         * Click expand icon
         * @return {?}
         */
        function () {
            this.handleFlattenNodes(this.nzTreeService.rootNodes, this.getExpandedNodeList().map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.key; })));
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzTreeComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzTreeService.flattenNodes$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.nzFlattenNodes = data;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTreeComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            this.renderTreeProperties(changes);
        };
        /**
         * @return {?}
         */
        NzTreeComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.beforeInit = false;
        };
        /**
         * @return {?}
         */
        NzTreeComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTreeComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-tree',
                        exportAs: 'nzTree',
                        animations: [animation.treeCollapseMotion],
                        template: "\n    <div role=\"tree\">\n      <input [ngStyle]=\"HIDDEN_STYLE\" />\n    </div>\n    <div [class.ant-select-tree-list]=\"nzSelectMode\" [class.ant-tree-list]=\"nzSelectMode\">\n      <div>\n        <cdk-virtual-scroll-viewport\n          *ngIf=\"nzVirtualHeight\"\n          [class.ant-select-tree-list-holder-inner]=\"nzSelectMode\"\n          [class.ant-tree-list-holder-inner]=\"nzSelectMode\"\n          [itemSize]=\"nzVirtualItemSize\"\n          [minBufferPx]=\"nzVirtualMinBufferPx\"\n          [maxBufferPx]=\"nzVirtualMaxBufferPx\"\n          [style.height]=\"nzVirtualHeight\"\n        >\n          <ng-container *cdkVirtualFor=\"let node of nzFlattenNodes; trackBy: trackByFlattenNode\">\n            <ng-template [ngTemplateOutlet]=\"nodeTemplate\" [ngTemplateOutletContext]=\"{ $implicit: node }\"></ng-template>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n\n        <div\n          *ngIf=\"!nzVirtualHeight\"\n          [class.ant-select-tree-list-holder-inner]=\"nzSelectMode\"\n          [class.ant-tree-list-holder-inner]=\"nzSelectMode\"\n          [@.disabled]=\"beforeInit || noAnimation?.nzNoAnimation\"\n          [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n          [@treeCollapseMotion]=\"nzFlattenNodes.length\"\n        >\n          <ng-container *ngFor=\"let node of nzFlattenNodes; trackBy: trackByFlattenNode\">\n            <ng-template [ngTemplateOutlet]=\"nodeTemplate\" [ngTemplateOutletContext]=\"{ $implicit: node }\"></ng-template>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n    <ng-template #nodeTemplate let-treeNode>\n      <nz-tree-node\n        [icon]=\"treeNode.icon\"\n        [title]=\"treeNode.title\"\n        [isLoading]=\"treeNode.isLoading\"\n        [isSelected]=\"treeNode.isSelected\"\n        [isDisabled]=\"treeNode.isDisabled\"\n        [isMatched]=\"treeNode.isMatched\"\n        [isExpanded]=\"treeNode.isExpanded\"\n        [isLeaf]=\"treeNode.isLeaf\"\n        [isStart]=\"treeNode.isStart\"\n        [isEnd]=\"treeNode.isEnd\"\n        [isChecked]=\"treeNode.isChecked\"\n        [isHalfChecked]=\"treeNode.isHalfChecked\"\n        [isDisableCheckbox]=\"treeNode.isDisableCheckbox\"\n        [isSelectable]=\"treeNode.isSelectable\"\n        [canHide]=\"treeNode.canHide\"\n        [nzTreeNode]=\"treeNode\"\n        [nzSelectMode]=\"nzSelectMode\"\n        [nzShowLine]=\"nzShowLine\"\n        [nzExpandedIcon]=\"nzExpandedIcon\"\n        [nzDraggable]=\"nzDraggable\"\n        [nzCheckable]=\"nzCheckable\"\n        [nzShowExpand]=\"nzShowExpand\"\n        [nzAsyncData]=\"nzAsyncData\"\n        [nzSearchValue]=\"nzSearchValue\"\n        [nzHideUnMatched]=\"nzHideUnMatched\"\n        [nzBeforeDrop]=\"nzBeforeDrop\"\n        [nzShowIcon]=\"nzShowIcon\"\n        [nzTreeTemplate]=\"nzTreeTemplate || nzTreeTemplateChild\"\n        (nzExpandChange)=\"eventTriggerChanged($event)\"\n        (nzClick)=\"eventTriggerChanged($event)\"\n        (nzDblClick)=\"eventTriggerChanged($event)\"\n        (nzContextMenu)=\"eventTriggerChanged($event)\"\n        (nzCheckBoxChange)=\"eventTriggerChanged($event)\"\n        (nzOnDragStart)=\"eventTriggerChanged($event)\"\n        (nzOnDragEnter)=\"eventTriggerChanged($event)\"\n        (nzOnDragOver)=\"eventTriggerChanged($event)\"\n        (nzOnDragLeave)=\"eventTriggerChanged($event)\"\n        (nzOnDragEnd)=\"eventTriggerChanged($event)\"\n        (nzOnDrop)=\"eventTriggerChanged($event)\"\n      >\n      </nz-tree-node>\n    </ng-template>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            NzTreeService,
                            {
                                provide: tree.NzTreeBaseService,
                                useFactory: NzTreeServiceFactory,
                                deps: [[new core.SkipSelf(), new core.Optional(), tree.NzTreeHigherOrderServiceToken], NzTreeService]
                            },
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzTreeComponent; })),
                                multi: true
                            }
                        ],
                        host: {
                            '[class.ant-select-tree]': "nzSelectMode",
                            '[class.ant-select-tree-show-line]': "nzSelectMode && nzShowLine",
                            '[class.ant-select-tree-icon-hide]': "nzSelectMode && !nzShowIcon",
                            '[class.ant-select-tree-block-node]': "nzSelectMode && nzBlockNode",
                            '[class.ant-tree]': "!nzSelectMode",
                            '[class.ant-tree-show-line]': "!nzSelectMode && nzShowLine",
                            '[class.ant-tree-icon-hide]': "!nzSelectMode && !nzShowIcon",
                            '[class.ant-tree-block-node]': "!nzSelectMode && nzBlockNode",
                            '[class.draggable-tree]': "nzDraggable"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTreeComponent.ctorParameters = function () { return [
            { type: tree.NzTreeBaseService },
            { type: config.NzConfigService },
            { type: core.ChangeDetectorRef },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzTreeComponent.propDecorators = {
            nzShowIcon: [{ type: core.Input }],
            nzHideUnMatched: [{ type: core.Input }],
            nzBlockNode: [{ type: core.Input }],
            nzExpandAll: [{ type: core.Input }],
            nzSelectMode: [{ type: core.Input }],
            nzCheckStrictly: [{ type: core.Input }],
            nzShowExpand: [{ type: core.Input }],
            nzShowLine: [{ type: core.Input }],
            nzCheckable: [{ type: core.Input }],
            nzAsyncData: [{ type: core.Input }],
            nzDraggable: [{ type: core.Input }],
            nzMultiple: [{ type: core.Input }],
            nzExpandedIcon: [{ type: core.Input }],
            nzVirtualItemSize: [{ type: core.Input }],
            nzVirtualMaxBufferPx: [{ type: core.Input }],
            nzVirtualMinBufferPx: [{ type: core.Input }],
            nzVirtualHeight: [{ type: core.Input }],
            nzTreeTemplate: [{ type: core.Input }],
            nzBeforeDrop: [{ type: core.Input }],
            nzData: [{ type: core.Input }],
            nzExpandedKeys: [{ type: core.Input }],
            nzSelectedKeys: [{ type: core.Input }],
            nzCheckedKeys: [{ type: core.Input }],
            nzSearchValue: [{ type: core.Input }],
            nzSearchFunc: [{ type: core.Input }],
            nzTreeTemplateChild: [{ type: core.ContentChild, args: ['nzTreeTemplate', { static: true },] }],
            cdkVirtualScrollViewport: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport, { read: scrolling.CdkVirtualScrollViewport },] }],
            nzExpandedKeysChange: [{ type: core.Output }],
            nzSelectedKeysChange: [{ type: core.Output }],
            nzCheckedKeysChange: [{ type: core.Output }],
            nzSearchValueChange: [{ type: core.Output }],
            nzClick: [{ type: core.Output }],
            nzDblClick: [{ type: core.Output }],
            nzContextMenu: [{ type: core.Output }],
            nzCheckBoxChange: [{ type: core.Output }],
            nzExpandChange: [{ type: core.Output }],
            nzOnDragStart: [{ type: core.Output }],
            nzOnDragEnter: [{ type: core.Output }],
            nzOnDragOver: [{ type: core.Output }],
            nzOnDragLeave: [{ type: core.Output }],
            nzOnDrop: [{ type: core.Output }],
            nzOnDragEnd: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(), config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzTreeComponent.prototype, "nzShowIcon", void 0);
        __decorate([
            util.InputBoolean(), config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzTreeComponent.prototype, "nzHideUnMatched", void 0);
        __decorate([
            util.InputBoolean(), config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzTreeComponent.prototype, "nzBlockNode", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzExpandAll", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzSelectMode", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzCheckStrictly", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTreeComponent.prototype, "nzShowExpand", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzShowLine", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzCheckable", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzAsyncData", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTreeComponent.prototype, "nzDraggable", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTreeComponent.prototype, "nzMultiple", void 0);
        return NzTreeComponent;
    }(tree.NzTreeBase));
    if (false) {
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzShowIcon;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzHideUnMatched;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzBlockNode;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzExpandAll;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzSelectMode;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzCheckStrictly;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzShowExpand;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzShowLine;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzCheckable;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzAsyncData;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzDraggable;
        /** @type {?} */
        NzTreeComponent.ngAcceptInputType_nzMultiple;
        /** @type {?} */
        NzTreeComponent.prototype.nzShowIcon;
        /** @type {?} */
        NzTreeComponent.prototype.nzHideUnMatched;
        /** @type {?} */
        NzTreeComponent.prototype.nzBlockNode;
        /** @type {?} */
        NzTreeComponent.prototype.nzExpandAll;
        /** @type {?} */
        NzTreeComponent.prototype.nzSelectMode;
        /** @type {?} */
        NzTreeComponent.prototype.nzCheckStrictly;
        /** @type {?} */
        NzTreeComponent.prototype.nzShowExpand;
        /** @type {?} */
        NzTreeComponent.prototype.nzShowLine;
        /** @type {?} */
        NzTreeComponent.prototype.nzCheckable;
        /** @type {?} */
        NzTreeComponent.prototype.nzAsyncData;
        /** @type {?} */
        NzTreeComponent.prototype.nzDraggable;
        /** @type {?} */
        NzTreeComponent.prototype.nzMultiple;
        /** @type {?} */
        NzTreeComponent.prototype.nzExpandedIcon;
        /** @type {?} */
        NzTreeComponent.prototype.nzVirtualItemSize;
        /** @type {?} */
        NzTreeComponent.prototype.nzVirtualMaxBufferPx;
        /** @type {?} */
        NzTreeComponent.prototype.nzVirtualMinBufferPx;
        /** @type {?} */
        NzTreeComponent.prototype.nzVirtualHeight;
        /** @type {?} */
        NzTreeComponent.prototype.nzTreeTemplate;
        /** @type {?} */
        NzTreeComponent.prototype.nzBeforeDrop;
        /** @type {?} */
        NzTreeComponent.prototype.nzData;
        /** @type {?} */
        NzTreeComponent.prototype.nzExpandedKeys;
        /** @type {?} */
        NzTreeComponent.prototype.nzSelectedKeys;
        /** @type {?} */
        NzTreeComponent.prototype.nzCheckedKeys;
        /** @type {?} */
        NzTreeComponent.prototype.nzSearchValue;
        /** @type {?} */
        NzTreeComponent.prototype.nzSearchFunc;
        /** @type {?} */
        NzTreeComponent.prototype.nzTreeTemplateChild;
        /** @type {?} */
        NzTreeComponent.prototype.cdkVirtualScrollViewport;
        /** @type {?} */
        NzTreeComponent.prototype.nzFlattenNodes;
        /** @type {?} */
        NzTreeComponent.prototype.beforeInit;
        /** @type {?} */
        NzTreeComponent.prototype.nzExpandedKeysChange;
        /** @type {?} */
        NzTreeComponent.prototype.nzSelectedKeysChange;
        /** @type {?} */
        NzTreeComponent.prototype.nzCheckedKeysChange;
        /** @type {?} */
        NzTreeComponent.prototype.nzSearchValueChange;
        /** @type {?} */
        NzTreeComponent.prototype.nzClick;
        /** @type {?} */
        NzTreeComponent.prototype.nzDblClick;
        /** @type {?} */
        NzTreeComponent.prototype.nzContextMenu;
        /** @type {?} */
        NzTreeComponent.prototype.nzCheckBoxChange;
        /** @type {?} */
        NzTreeComponent.prototype.nzExpandChange;
        /** @type {?} */
        NzTreeComponent.prototype.nzOnDragStart;
        /** @type {?} */
        NzTreeComponent.prototype.nzOnDragEnter;
        /** @type {?} */
        NzTreeComponent.prototype.nzOnDragOver;
        /** @type {?} */
        NzTreeComponent.prototype.nzOnDragLeave;
        /** @type {?} */
        NzTreeComponent.prototype.nzOnDrop;
        /** @type {?} */
        NzTreeComponent.prototype.nzOnDragEnd;
        /** @type {?} */
        NzTreeComponent.prototype.HIDDEN_STYLE;
        /** @type {?} */
        NzTreeComponent.prototype.destroy$;
        /** @type {?} */
        NzTreeComponent.prototype.onChange;
        /** @type {?} */
        NzTreeComponent.prototype.onTouched;
        /** @type {?} */
        NzTreeComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzTreeComponent.prototype.cdr;
        /** @type {?} */
        NzTreeComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeModule = /** @class */ (function () {
        function NzTreeModule() {
        }
        NzTreeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, outlet.NzOutletModule, icon.NzIconModule, noAnimation.NzNoAnimationModule, highlight.NzHighlightModule, scrolling.ScrollingModule],
                        declarations: [
                            NzTreeComponent,
                            NzTreeNodeComponent,
                            NzTreeIndentComponent,
                            NzTreeNodeSwitcherComponent,
                            NzTreeNodeCheckboxComponent,
                            NzTreeNodeTitleComponent
                        ],
                        exports: [NzTreeComponent, NzTreeNodeComponent, NzTreeIndentComponent]
                    },] }
        ];
        return NzTreeModule;
    }());

    Object.defineProperty(exports, 'NzTreeNode', {
        enumerable: true,
        get: function () {
            return tree.NzTreeNode;
        }
    });
    exports.NzTreeComponent = NzTreeComponent;
    exports.NzTreeIndentComponent = NzTreeIndentComponent;
    exports.NzTreeModule = NzTreeModule;
    exports.NzTreeNodeCheckboxComponent = NzTreeNodeCheckboxComponent;
    exports.NzTreeNodeComponent = NzTreeNodeComponent;
    exports.NzTreeNodeSwitcherComponent = NzTreeNodeSwitcherComponent;
    exports.NzTreeNodeTitleComponent = NzTreeNodeTitleComponent;
    exports.NzTreeService = NzTreeService;
    exports.NzTreeServiceFactory = NzTreeServiceFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-tree.umd.js.map
