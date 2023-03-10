(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ng-zorro-antd/core/logger'), require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/tree', ['exports', 'ng-zorro-antd/core/logger', '@angular/core', 'rxjs'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.tree = {}), global['ng-zorro-antd'].core.logger, global.ng.core, global.rxjs));
}(this, (function (exports, logger, core, rxjs) { 'use strict';

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
     * Generated from: nz-tree-base-node.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function FlattenNode() { }
    if (false) {
        /** @type {?} */
        FlattenNode.prototype.parent;
        /** @type {?} */
        FlattenNode.prototype.children;
        /** @type {?} */
        FlattenNode.prototype.pos;
        /** @type {?} */
        FlattenNode.prototype.data;
        /** @type {?} */
        FlattenNode.prototype.isStart;
        /** @type {?} */
        FlattenNode.prototype.isEnd;
    }
    /**
     * @record
     */
    function NzTreeNodeOptions() { }
    if (false) {
        /** @type {?} */
        NzTreeNodeOptions.prototype.title;
        /** @type {?} */
        NzTreeNodeOptions.prototype.key;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.icon;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.isLeaf;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.checked;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.selected;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.selectable;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.disabled;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.disableCheckbox;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.expanded;
        /** @type {?|undefined} */
        NzTreeNodeOptions.prototype.children;
        /* Skipping unhandled member: [key: string]: NzSafeAny;*/
    }
    var NzTreeNode = /** @class */ (function () {
        /**
         * Init nzTreeNode
         * @param option: user's input
         * @param parent
         * @param service: base nzTreeService
         */
        function NzTreeNode(option, parent, service) {
            var _this = this;
            if (parent === void 0) { parent = null; }
            if (service === void 0) { service = null; }
            this._title = '';
            this.level = 0;
            // Parent Node
            this.parentNode = null;
            this._icon = '';
            this._children = [];
            this._isLeaf = false;
            this._isChecked = false;
            /**
             * @deprecated Maybe removed in next major version, use isChecked instead
             */
            this._isAllChecked = false;
            this._isSelectable = false;
            this._isDisabled = false;
            this._isDisableCheckbox = false;
            this._isExpanded = false;
            this._isHalfChecked = false;
            this._isSelected = false;
            this._isLoading = false;
            this.canHide = false;
            this.isMatched = false;
            this.service = null;
            if (option instanceof NzTreeNode) {
                return option;
            }
            this.service = service || null;
            this.origin = option;
            this.key = option.key;
            this.parentNode = parent;
            this._title = option.title || '---';
            this._icon = option.icon || '';
            this._isLeaf = option.isLeaf || false;
            this._children = [];
            // option params
            this._isChecked = option.checked || false;
            this._isSelectable = option.disabled || option.selectable !== false;
            this._isDisabled = option.disabled || false;
            this._isDisableCheckbox = option.disableCheckbox || false;
            this._isExpanded = option.isLeaf ? false : option.expanded || false;
            this._isHalfChecked = false;
            this._isSelected = (!option.disabled && option.selected) || false;
            this._isLoading = false;
            this.isMatched = false;
            /**
             * parent's checked status will affect children while initializing
             */
            if (parent) {
                this.level = parent.level + 1;
            }
            else {
                this.level = 0;
            }
            if (typeof option.children !== 'undefined' && option.children !== null) {
                option.children.forEach((/**
                 * @param {?} nodeOptions
                 * @return {?}
                 */
                function (nodeOptions) {
                    /** @type {?} */
                    var s = _this.treeService;
                    if (s && !s.isCheckStrictly && option.checked && !option.disabled && !nodeOptions.disabled && !nodeOptions.disableCheckbox) {
                        nodeOptions.checked = option.checked;
                    }
                    _this._children.push(new NzTreeNode(nodeOptions, _this));
                }));
            }
        }
        Object.defineProperty(NzTreeNode.prototype, "treeService", {
            get: /**
             * @return {?}
             */
            function () {
                return this.service || (this.parentNode && this.parentNode.treeService);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "title", {
            /**
             * auto generate
             * get
             * set
             */
            get: /**
             * auto generate
             * get
             * set
             * @return {?}
             */
            function () {
                return this._title;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._title = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "icon", {
            get: /**
             * @return {?}
             */
            function () {
                return this._icon;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._icon = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "children", {
            get: /**
             * @return {?}
             */
            function () {
                return this._children;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._children = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isLeaf", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isLeaf;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isLeaf = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isChecked", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isChecked;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isChecked = value;
                this._isAllChecked = value;
                this.origin.checked = value;
                this.afterValueChange('isChecked');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isAllChecked", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isAllChecked;
            },
            /**
             * @deprecated Maybe removed in next major version, use `isChecked` instead.
             */
            set: /**
             * @deprecated Maybe removed in next major version, use `isChecked` instead.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                logger.warnDeprecation("'isAllChecked' is going to be removed in 9.0.0. Please use 'isChecked' instead.");
                this._isAllChecked = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isHalfChecked", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isHalfChecked;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isHalfChecked = value;
                this.afterValueChange('isHalfChecked');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isSelectable", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isSelectable;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isSelectable = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isDisabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isDisabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isDisabled = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isDisableCheckbox", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isDisableCheckbox;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isDisableCheckbox = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isExpanded", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isExpanded;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isExpanded = value;
                this.origin.expanded = value;
                this.afterValueChange('isExpanded');
                this.afterValueChange('reRender');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isSelected", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isSelected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isSelected = value;
                this.origin.selected = value;
                this.afterValueChange('isSelected');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTreeNode.prototype, "isLoading", {
            get: /**
             * @return {?}
             */
            function () {
                return this._isLoading;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._isLoading = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?=} checked
         * @param {?=} halfChecked
         * @return {?}
         */
        NzTreeNode.prototype.setSyncChecked = /**
         * @param {?=} checked
         * @param {?=} halfChecked
         * @return {?}
         */
        function (checked, halfChecked) {
            if (checked === void 0) { checked = false; }
            if (halfChecked === void 0) { halfChecked = false; }
            this.setChecked(checked, halfChecked);
            if (this.treeService && !this.treeService.isCheckStrictly) {
                this.treeService.conduct(this);
            }
        };
        /**
         * @deprecated Maybe removed in next major version, use `isChecked` instead.
         */
        /**
         * @deprecated Maybe removed in next major version, use `isChecked` instead.
         * @param {?=} checked
         * @param {?=} halfChecked
         * @return {?}
         */
        NzTreeNode.prototype.setChecked = /**
         * @deprecated Maybe removed in next major version, use `isChecked` instead.
         * @param {?=} checked
         * @param {?=} halfChecked
         * @return {?}
         */
        function (checked, halfChecked) {
            if (checked === void 0) { checked = false; }
            if (halfChecked === void 0) { halfChecked = false; }
            logger.warnDeprecation("'setChecked' is going to be removed in 9.0.0. Please use 'isChecked' instead.");
            this.origin.checked = checked;
            this.isChecked = checked;
            this.isAllChecked = checked;
            this.isHalfChecked = halfChecked;
        };
        /**
         * @not-deprecated Maybe removed in next major version, use `isExpanded` instead.
         * We need it until tree refactoring is finished
         */
        /**
         * \@not-deprecated Maybe removed in next major version, use `isExpanded` instead.
         * We need it until tree refactoring is finished
         * @param {?} value
         * @return {?}
         */
        NzTreeNode.prototype.setExpanded = /**
         * \@not-deprecated Maybe removed in next major version, use `isExpanded` instead.
         * We need it until tree refactoring is finished
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isExpanded = value;
            this.origin.expanded = value;
            this.afterValueChange('isExpanded');
        };
        /**
         * @deprecated Maybe removed in next major version, use `isSelected` instead.
         */
        /**
         * @deprecated Maybe removed in next major version, use `isSelected` instead.
         * @param {?} value
         * @return {?}
         */
        NzTreeNode.prototype.setSelected = /**
         * @deprecated Maybe removed in next major version, use `isSelected` instead.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            logger.warnDeprecation("'setSelected' is going to be removed in 9.0.0. Please use 'isExpanded' isSelected.");
            if (this.isDisabled) {
                return;
            }
            this.isSelected = value;
        };
        /**
         * @return {?}
         */
        NzTreeNode.prototype.getParentNode = /**
         * @return {?}
         */
        function () {
            return this.parentNode;
        };
        /**
         * @return {?}
         */
        NzTreeNode.prototype.getChildren = /**
         * @return {?}
         */
        function () {
            return this.children;
        };
        /**
         * Support appending child nodes by position. Leaf node cannot be appended.
         */
        /**
         * Support appending child nodes by position. Leaf node cannot be appended.
         * @param {?} children
         * @param {?=} childPos
         * @return {?}
         */
        NzTreeNode.prototype.addChildren = /**
         * Support appending child nodes by position. Leaf node cannot be appended.
         * @param {?} children
         * @param {?=} childPos
         * @return {?}
         */
        function (children, childPos) {
            var _this = this;
            if (childPos === void 0) { childPos = -1; }
            if (!this.isLeaf) {
                children.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) {
                    /** @type {?} */
                    var refreshLevel = (/**
                     * @param {?} n
                     * @return {?}
                     */
                    function (n) {
                        n.getChildren().forEach((/**
                         * @param {?} c
                         * @return {?}
                         */
                        function (c) {
                            c.level = (/** @type {?} */ (c.getParentNode())).level + 1;
                            // flush origin
                            c.origin.level = c.level;
                            refreshLevel(c);
                        }));
                    });
                    /** @type {?} */
                    var child = node;
                    if (child instanceof NzTreeNode) {
                        child.parentNode = _this;
                    }
                    else {
                        child = new NzTreeNode(node, _this);
                    }
                    child.level = _this.level + 1;
                    child.origin.level = child.level;
                    refreshLevel(child);
                    try {
                        childPos === -1 ? _this.children.push(child) : _this.children.splice(childPos, 0, child);
                        // flush origin
                    }
                    catch (e) { }
                }));
                this.origin.children = this.getChildren().map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.origin; }));
                // remove loading state
                this.isLoading = false;
            }
            this.afterValueChange('addChildren');
            this.afterValueChange('reRender');
        };
        /**
         * @return {?}
         */
        NzTreeNode.prototype.clearChildren = /**
         * @return {?}
         */
        function () {
            // refresh checked state
            this.afterValueChange('clearChildren');
            this.children = [];
            this.origin.children = [];
            this.afterValueChange('reRender');
        };
        /**
         * @return {?}
         */
        NzTreeNode.prototype.remove = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var parentNode = this.getParentNode();
            if (parentNode) {
                parentNode.children = parentNode.getChildren().filter((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.key !== _this.key; }));
                parentNode.origin.children = (/** @type {?} */ (parentNode.origin.children)).filter((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.key !== _this.key; }));
                this.afterValueChange('remove');
                this.afterValueChange('reRender');
            }
        };
        /**
         * @param {?} key
         * @return {?}
         */
        NzTreeNode.prototype.afterValueChange = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (this.treeService) {
                switch (key) {
                    case 'isChecked':
                        this.treeService.setCheckedNodeList(this);
                        break;
                    case 'isHalfChecked':
                        this.treeService.setHalfCheckedNodeList(this);
                        break;
                    case 'isExpanded':
                        this.treeService.setExpandedNodeList(this);
                        break;
                    case 'isSelected':
                        this.treeService.setNodeActive(this);
                        break;
                    case 'clearChildren':
                        this.treeService.afterRemove(this.getChildren());
                        break;
                    case 'remove':
                        this.treeService.afterRemove([this]);
                        break;
                    case 'reRender':
                        this.treeService.flattenTreeData(this.treeService.rootNodes, this.treeService.getExpandedNodeList().map((/**
                         * @param {?} v
                         * @return {?}
                         */
                        function (v) { return (/** @type {?} */ (v.key)); })));
                        break;
                }
            }
            this.update();
        };
        /**
         * @return {?}
         */
        NzTreeNode.prototype.update = /**
         * @return {?}
         */
        function () {
            if (this.component) {
                this.component.markForCheck();
            }
        };
        return NzTreeNode;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._title;
        /** @type {?} */
        NzTreeNode.prototype.key;
        /** @type {?} */
        NzTreeNode.prototype.level;
        /** @type {?} */
        NzTreeNode.prototype.origin;
        /** @type {?} */
        NzTreeNode.prototype.parentNode;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._icon;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._children;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isLeaf;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isChecked;
        /**
         * @deprecated Maybe removed in next major version, use isChecked instead
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isAllChecked;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isSelectable;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isDisabled;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isDisableCheckbox;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isExpanded;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isHalfChecked;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isSelected;
        /**
         * @type {?}
         * @private
         */
        NzTreeNode.prototype._isLoading;
        /** @type {?} */
        NzTreeNode.prototype.canHide;
        /** @type {?} */
        NzTreeNode.prototype.isMatched;
        /** @type {?} */
        NzTreeNode.prototype.service;
        /** @type {?} */
        NzTreeNode.prototype.component;
        /**
         * New added in Tree for easy data access
         * @type {?}
         */
        NzTreeNode.prototype.isStart;
        /** @type {?} */
        NzTreeNode.prototype.isEnd;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-tree-base.definitions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @record
     */
    function NzFormatEmitEvent() { }
    if (false) {
        /** @type {?} */
        NzFormatEmitEvent.prototype.eventName;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.node;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.event;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.dragNode;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.selectedKeys;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.checkedKeys;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.matchedKeys;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.nodes;
        /** @type {?|undefined} */
        NzFormatEmitEvent.prototype.keys;
    }
    /**
     * @record
     */
    function NzFormatBeforeDropEvent() { }
    if (false) {
        /** @type {?} */
        NzFormatBeforeDropEvent.prototype.dragNode;
        /** @type {?} */
        NzFormatBeforeDropEvent.prototype.node;
        /** @type {?} */
        NzFormatBeforeDropEvent.prototype.pos;
    }
    /**
     * @record
     */
    function NzTreeNodeBaseComponent() { }
    if (false) {
        /**
         * @return {?}
         */
        NzTreeNodeBaseComponent.prototype.markForCheck = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-tree-base-util.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isCheckDisabled(node) {
        var isDisabled = node.isDisabled, isDisableCheckbox = node.isDisableCheckbox;
        return !!(isDisabled || isDisableCheckbox);
    }
    /**
     * @param {?} needle
     * @param {?} haystack
     * @return {?}
     */
    function isInArray(needle, haystack) {
        return haystack.length > 0 && haystack.indexOf(needle) > -1;
    }
    /**
     * @param {?} level
     * @param {?} index
     * @return {?}
     */
    function getPosition(level, index) {
        return level + "-" + index;
    }
    /**
     * @param {?} key
     * @param {?} pos
     * @return {?}
     */
    function getKey(key, pos) {
        if (key !== null && key !== undefined) {
            return key;
        }
        return pos;
    }
    /**
     * Flat nest tree data into flatten list. This is used for virtual list render.
     * @param {?=} treeNodeList Origin data node list
     * @param {?=} expandedKeys
     * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
     * @return {?}
     */
    function flattenTreeData(treeNodeList, expandedKeys) {
        if (treeNodeList === void 0) { treeNodeList = []; }
        if (expandedKeys === void 0) { expandedKeys = []; }
        /** @type {?} */
        var expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
        /** @type {?} */
        var flattenList = [];
        /**
         * @param {?} list
         * @param {?=} parent
         * @return {?}
         */
        function dig(list, parent) {
            if (parent === void 0) { parent = null; }
            return list.map((/**
             * @param {?} treeNode
             * @param {?} index
             * @return {?}
             */
            function (treeNode, index) {
                /** @type {?} */
                var pos = getPosition(parent ? parent.pos : '0', index);
                /** @type {?} */
                var mergedKey = getKey(treeNode.key, pos);
                treeNode.isStart = __spread((parent ? parent.isStart : []), [index === 0]);
                treeNode.isEnd = __spread((parent ? parent.isEnd : []), [index === list.length - 1]);
                // Add FlattenDataNode into list
                // TODO: only need data here.
                /** @type {?} */
                var flattenNode = {
                    parent: parent,
                    pos: pos,
                    children: [],
                    data: treeNode,
                    isStart: __spread((parent ? parent.isStart : []), [index === 0]),
                    isEnd: __spread((parent ? parent.isEnd : []), [index === list.length - 1])
                };
                flattenList.push(flattenNode);
                // Loop treeNode children
                if (expandedKeys === true || expandedKeySet.has(mergedKey) || treeNode.isExpanded) {
                    flattenNode.children = dig(treeNode.children || [], flattenNode);
                }
                else {
                    flattenNode.children = [];
                }
                return flattenNode;
            }));
        }
        dig(treeNodeList);
        return flattenList;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-tree-base.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeBaseService = /** @class */ (function () {
        function NzTreeBaseService() {
            this.DRAG_SIDE_RANGE = 0.25;
            this.DRAG_MIN_GAP = 2;
            this.isCheckStrictly = false;
            this.isMultiple = false;
            this.rootNodes = [];
            this.flattenNodes$ = new rxjs.BehaviorSubject([]);
            this.selectedNodeList = [];
            this.expandedNodeList = [];
            this.checkedNodeList = [];
            this.halfCheckedNodeList = [];
            this.matchedNodeList = [];
        }
        /**
         * reset tree nodes will clear default node list
         */
        /**
         * reset tree nodes will clear default node list
         * @param {?} nzNodes
         * @return {?}
         */
        NzTreeBaseService.prototype.initTree = /**
         * reset tree nodes will clear default node list
         * @param {?} nzNodes
         * @return {?}
         */
        function (nzNodes) {
            this.rootNodes = nzNodes;
            this.expandedNodeList = [];
            this.selectedNodeList = [];
            this.halfCheckedNodeList = [];
            this.checkedNodeList = [];
            this.matchedNodeList = [];
        };
        /**
         * @param {?} nzNodes
         * @param {?=} expandedKeys
         * @return {?}
         */
        NzTreeBaseService.prototype.flattenTreeData = /**
         * @param {?} nzNodes
         * @param {?=} expandedKeys
         * @return {?}
         */
        function (nzNodes, expandedKeys) {
            if (expandedKeys === void 0) { expandedKeys = []; }
            this.flattenNodes$.next(flattenTreeData(nzNodes, expandedKeys).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.data; })));
        };
        /**
         * @return {?}
         */
        NzTreeBaseService.prototype.getSelectedNode = /**
         * @return {?}
         */
        function () {
            return this.selectedNode;
        };
        /**
         * get some list
         */
        /**
         * get some list
         * @return {?}
         */
        NzTreeBaseService.prototype.getSelectedNodeList = /**
         * get some list
         * @return {?}
         */
        function () {
            return this.conductNodeState('select');
        };
        /**
         * return checked nodes
         */
        /**
         * return checked nodes
         * @return {?}
         */
        NzTreeBaseService.prototype.getCheckedNodeList = /**
         * return checked nodes
         * @return {?}
         */
        function () {
            return this.conductNodeState('check');
        };
        /**
         * @return {?}
         */
        NzTreeBaseService.prototype.getHalfCheckedNodeList = /**
         * @return {?}
         */
        function () {
            return this.conductNodeState('halfCheck');
        };
        /**
         * return expanded nodes
         */
        /**
         * return expanded nodes
         * @return {?}
         */
        NzTreeBaseService.prototype.getExpandedNodeList = /**
         * return expanded nodes
         * @return {?}
         */
        function () {
            return this.conductNodeState('expand');
        };
        /**
         * return search matched nodes
         */
        /**
         * return search matched nodes
         * @return {?}
         */
        NzTreeBaseService.prototype.getMatchedNodeList = /**
         * return search matched nodes
         * @return {?}
         */
        function () {
            return this.conductNodeState('match');
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTreeBaseService.prototype.isArrayOfNzTreeNode = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value.every((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item instanceof NzTreeNode; }));
        };
        /**
         * set drag node
         */
        /**
         * set drag node
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.setSelectedNode = /**
         * set drag node
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.selectedNode = node;
        };
        /**
         * set node selected status
         */
        /**
         * set node selected status
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.setNodeActive = /**
         * set node selected status
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (!this.isMultiple && node.isSelected) {
                this.selectedNodeList.forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    if (node.key !== n.key) {
                        // reset other nodes
                        n.isSelected = false;
                    }
                }));
                // single mode: remove pre node
                this.selectedNodeList = [];
            }
            this.setSelectedNodeList(node, this.isMultiple);
        };
        /**
         * add or remove node to selectedNodeList
         */
        /**
         * add or remove node to selectedNodeList
         * @param {?} node
         * @param {?=} isMultiple
         * @return {?}
         */
        NzTreeBaseService.prototype.setSelectedNodeList = /**
         * add or remove node to selectedNodeList
         * @param {?} node
         * @param {?=} isMultiple
         * @return {?}
         */
        function (node, isMultiple) {
            if (isMultiple === void 0) { isMultiple = false; }
            /** @type {?} */
            var index = this.getIndexOfArray(this.selectedNodeList, node.key);
            if (isMultiple) {
                if (node.isSelected && index === -1) {
                    this.selectedNodeList.push(node);
                }
            }
            else {
                if (node.isSelected && index === -1) {
                    this.selectedNodeList = [node];
                }
            }
            if (!node.isSelected) {
                this.selectedNodeList = this.selectedNodeList.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.key !== node.key; }));
            }
        };
        /**
         * merge checked nodes
         */
        /**
         * merge checked nodes
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.setHalfCheckedNodeList = /**
         * merge checked nodes
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var index = this.getIndexOfArray(this.halfCheckedNodeList, node.key);
            if (node.isHalfChecked && index === -1) {
                this.halfCheckedNodeList.push(node);
            }
            else if (!node.isHalfChecked && index > -1) {
                this.halfCheckedNodeList = this.halfCheckedNodeList.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return node.key !== n.key; }));
            }
        };
        /**
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.setCheckedNodeList = /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var index = this.getIndexOfArray(this.checkedNodeList, node.key);
            if (node.isChecked && index === -1) {
                this.checkedNodeList.push(node);
            }
            else if (!node.isChecked && index > -1) {
                this.checkedNodeList = this.checkedNodeList.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return node.key !== n.key; }));
            }
        };
        /**
         * conduct checked/selected/expanded keys
         */
        /**
         * conduct checked/selected/expanded keys
         * @param {?=} type
         * @return {?}
         */
        NzTreeBaseService.prototype.conductNodeState = /**
         * conduct checked/selected/expanded keys
         * @param {?=} type
         * @return {?}
         */
        function (type) {
            var _this = this;
            if (type === void 0) { type = 'check'; }
            /** @type {?} */
            var resultNodesList = [];
            switch (type) {
                case 'select':
                    resultNodesList = this.selectedNodeList;
                    break;
                case 'expand':
                    resultNodesList = this.expandedNodeList;
                    break;
                case 'match':
                    resultNodesList = this.matchedNodeList;
                    break;
                case 'check':
                    resultNodesList = this.checkedNodeList;
                    /** @type {?} */
                    var isIgnore_1 = (/**
                     * @param {?} node
                     * @return {?}
                     */
                    function (node) {
                        /** @type {?} */
                        var parentNode = node.getParentNode();
                        if (parentNode) {
                            if (_this.checkedNodeList.findIndex((/**
                             * @param {?} n
                             * @return {?}
                             */
                            function (n) { return n.key === parentNode.key; })) > -1) {
                                return true;
                            }
                            else {
                                return isIgnore_1(parentNode);
                            }
                        }
                        return false;
                    });
                    // merge checked
                    if (!this.isCheckStrictly) {
                        resultNodesList = this.checkedNodeList.filter((/**
                         * @param {?} n
                         * @return {?}
                         */
                        function (n) { return !isIgnore_1(n); }));
                    }
                    break;
                case 'halfCheck':
                    if (!this.isCheckStrictly) {
                        resultNodesList = this.halfCheckedNodeList;
                    }
                    break;
            }
            return resultNodesList;
        };
        /**
         * set expanded nodes
         */
        /**
         * set expanded nodes
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.setExpandedNodeList = /**
         * set expanded nodes
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.isLeaf) {
                return;
            }
            /** @type {?} */
            var index = this.getIndexOfArray(this.expandedNodeList, node.key);
            if (node.isExpanded && index === -1) {
                this.expandedNodeList.push(node);
            }
            else if (!node.isExpanded && index > -1) {
                this.expandedNodeList.splice(index, 1);
            }
        };
        /**
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.setMatchedNodeList = /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var index = this.getIndexOfArray(this.matchedNodeList, node.key);
            if (node.isMatched && index === -1) {
                this.matchedNodeList.push(node);
            }
            else if (!node.isMatched && index > -1) {
                this.matchedNodeList.splice(index, 1);
            }
        };
        /**
         * check state
         * @param isCheckStrictly
         */
        /**
         * check state
         * @param {?=} isCheckStrictly
         * @return {?}
         */
        NzTreeBaseService.prototype.refreshCheckState = /**
         * check state
         * @param {?=} isCheckStrictly
         * @return {?}
         */
        function (isCheckStrictly) {
            var _this = this;
            if (isCheckStrictly === void 0) { isCheckStrictly = false; }
            if (isCheckStrictly) {
                return;
            }
            this.checkedNodeList.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this.conduct(node, isCheckStrictly);
            }));
        };
        // reset other node checked state based current node
        // reset other node checked state based current node
        /**
         * @param {?} node
         * @param {?=} isCheckStrictly
         * @return {?}
         */
        NzTreeBaseService.prototype.conduct = 
        // reset other node checked state based current node
        /**
         * @param {?} node
         * @param {?=} isCheckStrictly
         * @return {?}
         */
        function (node, isCheckStrictly) {
            if (isCheckStrictly === void 0) { isCheckStrictly = false; }
            /** @type {?} */
            var isChecked = node.isChecked;
            if (node && !isCheckStrictly) {
                this.conductUp(node);
                this.conductDown(node, isChecked);
            }
        };
        /**
         * 1???children half checked
         * 2???children all checked, parent checked
         * 3???no children checked
         */
        /**
         * 1???children half checked
         * 2???children all checked, parent checked
         * 3???no children checked
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.conductUp = /**
         * 1???children half checked
         * 2???children all checked, parent checked
         * 3???no children checked
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var parentNode = node.getParentNode();
            if (parentNode) {
                if (!isCheckDisabled(parentNode)) {
                    if (parentNode.children.every((/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) { return isCheckDisabled(child) || (!child.isHalfChecked && child.isChecked); }))) {
                        parentNode.isChecked = true;
                        parentNode.isHalfChecked = false;
                    }
                    else if (parentNode.children.some((/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) { return child.isHalfChecked || child.isChecked; }))) {
                        parentNode.isChecked = false;
                        parentNode.isHalfChecked = true;
                    }
                    else {
                        parentNode.isChecked = false;
                        parentNode.isHalfChecked = false;
                    }
                }
                this.setCheckedNodeList(parentNode);
                this.setHalfCheckedNodeList(parentNode);
                this.conductUp(parentNode);
            }
        };
        /**
         * reset child check state
         */
        /**
         * reset child check state
         * @param {?} node
         * @param {?} value
         * @return {?}
         */
        NzTreeBaseService.prototype.conductDown = /**
         * reset child check state
         * @param {?} node
         * @param {?} value
         * @return {?}
         */
        function (node, value) {
            var _this = this;
            if (!isCheckDisabled(node)) {
                node.isChecked = value;
                node.isHalfChecked = false;
                this.setCheckedNodeList(node);
                this.setHalfCheckedNodeList(node);
                node.children.forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    _this.conductDown(n, value);
                }));
            }
        };
        /**
         * flush after delete node
         */
        /**
         * flush after delete node
         * @param {?} nodes
         * @return {?}
         */
        NzTreeBaseService.prototype.afterRemove = /**
         * flush after delete node
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) {
            var _this = this;
            // to reset selectedNodeList & expandedNodeList
            /** @type {?} */
            var loopNode = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                // remove selected node
                _this.selectedNodeList = _this.selectedNodeList.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.key !== node.key; }));
                // remove expanded node
                _this.expandedNodeList = _this.expandedNodeList.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.key !== node.key; }));
                // remove checked node
                _this.checkedNodeList = _this.checkedNodeList.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.key !== node.key; }));
                if (node.children) {
                    node.children.forEach((/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) {
                        loopNode(child);
                    }));
                }
            });
            nodes.forEach((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                loopNode(n);
            }));
            this.refreshCheckState(this.isCheckStrictly);
        };
        /**
         * drag event
         */
        /**
         * drag event
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.refreshDragNode = /**
         * drag event
         * @param {?} node
         * @return {?}
         */
        function (node) {
            var _this = this;
            if (node.children.length === 0) {
                // until root
                this.conductUp(node);
            }
            else {
                node.children.forEach((/**
                 * @param {?} child
                 * @return {?}
                 */
                function (child) {
                    _this.refreshDragNode(child);
                }));
            }
        };
        // reset node level
        // reset node level
        /**
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.resetNodeLevel = 
        // reset node level
        /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            var e_1, _a;
            /** @type {?} */
            var parentNode = node.getParentNode();
            if (parentNode) {
                node.level = parentNode.level + 1;
            }
            else {
                node.level = 0;
            }
            try {
                for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.resetNodeLevel(child);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTreeBaseService.prototype.calcDropPosition = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var clientY = event.clientY;
            // to fix firefox undefined
            var _a = event.srcElement
                ? ((/** @type {?} */ (event.srcElement))).getBoundingClientRect()
                : ((/** @type {?} */ (event.target))).getBoundingClientRect(), top = _a.top, bottom = _a.bottom, height = _a.height;
            /** @type {?} */
            var des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);
            if (clientY <= top + des) {
                return -1;
            }
            else if (clientY >= bottom - des) {
                return 1;
            }
            return 0;
        };
        /**
         * drop
         * 0: inner -1: pre 1: next
         */
        /**
         * drop
         * 0: inner -1: pre 1: next
         * @param {?} targetNode
         * @param {?=} dragPos
         * @return {?}
         */
        NzTreeBaseService.prototype.dropAndApply = /**
         * drop
         * 0: inner -1: pre 1: next
         * @param {?} targetNode
         * @param {?=} dragPos
         * @return {?}
         */
        function (targetNode, dragPos) {
            var _this = this;
            if (dragPos === void 0) { dragPos = -1; }
            if (!targetNode || dragPos > 1) {
                return;
            }
            /** @type {?} */
            var treeService = targetNode.treeService;
            /** @type {?} */
            var targetParent = targetNode.getParentNode();
            /** @type {?} */
            var isSelectedRootNode = this.selectedNode.getParentNode();
            // remove the dragNode
            if (isSelectedRootNode) {
                isSelectedRootNode.children = isSelectedRootNode.children.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.key !== _this.selectedNode.key; }));
            }
            else {
                this.rootNodes = this.rootNodes.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.key !== _this.selectedNode.key; }));
            }
            switch (dragPos) {
                case 0:
                    targetNode.addChildren([this.selectedNode]);
                    this.resetNodeLevel(targetNode);
                    break;
                case -1:
                case 1:
                    /** @type {?} */
                    var tIndex = dragPos === 1 ? 1 : 0;
                    if (targetParent) {
                        targetParent.addChildren([this.selectedNode], targetParent.children.indexOf(targetNode) + tIndex);
                        /** @type {?} */
                        var parentNode = this.selectedNode.getParentNode();
                        if (parentNode) {
                            this.resetNodeLevel(parentNode);
                        }
                    }
                    else {
                        /** @type {?} */
                        var targetIndex = this.rootNodes.indexOf(targetNode) + tIndex;
                        // Insert root node.
                        this.rootNodes.splice(targetIndex, 0, this.selectedNode);
                        this.rootNodes[targetIndex].parentNode = null;
                        this.resetNodeLevel(this.rootNodes[targetIndex]);
                    }
                    break;
            }
            // flush all nodes
            this.rootNodes.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                if (!child.treeService) {
                    child.service = treeService;
                }
                _this.refreshDragNode(child);
            }));
        };
        /**
         * emit Structure
         * eventName
         * node
         * event: MouseEvent / DragEvent
         * dragNode
         */
        /**
         * emit Structure
         * eventName
         * node
         * event: MouseEvent / DragEvent
         * dragNode
         * @param {?} eventName
         * @param {?} node
         * @param {?} event
         * @return {?}
         */
        NzTreeBaseService.prototype.formatEvent = /**
         * emit Structure
         * eventName
         * node
         * event: MouseEvent / DragEvent
         * dragNode
         * @param {?} eventName
         * @param {?} node
         * @param {?} event
         * @return {?}
         */
        function (eventName, node, event) {
            /** @type {?} */
            var emitStructure = {
                eventName: eventName,
                node: node,
                event: event
            };
            switch (eventName) {
                case 'dragstart':
                case 'dragenter':
                case 'dragover':
                case 'dragleave':
                case 'drop':
                case 'dragend':
                    Object.assign(emitStructure, { dragNode: this.getSelectedNode() });
                    break;
                case 'click':
                case 'dblclick':
                    Object.assign(emitStructure, { selectedKeys: this.selectedNodeList });
                    Object.assign(emitStructure, { nodes: this.selectedNodeList });
                    Object.assign(emitStructure, { keys: this.selectedNodeList.map((/**
                         * @param {?} n
                         * @return {?}
                         */
                        function (n) { return n.key; })) });
                    break;
                case 'check':
                    /** @type {?} */
                    var checkedNodeList = this.getCheckedNodeList();
                    Object.assign(emitStructure, { checkedKeys: checkedNodeList });
                    Object.assign(emitStructure, { nodes: checkedNodeList });
                    Object.assign(emitStructure, { keys: checkedNodeList.map((/**
                         * @param {?} n
                         * @return {?}
                         */
                        function (n) { return n.key; })) });
                    break;
                case 'search':
                    Object.assign(emitStructure, { matchedKeys: this.getMatchedNodeList() });
                    Object.assign(emitStructure, { nodes: this.getMatchedNodeList() });
                    Object.assign(emitStructure, { keys: this.getMatchedNodeList().map((/**
                         * @param {?} n
                         * @return {?}
                         */
                        function (n) { return n.key; })) });
                    break;
                case 'expand':
                    Object.assign(emitStructure, { nodes: this.expandedNodeList });
                    Object.assign(emitStructure, { keys: this.expandedNodeList.map((/**
                         * @param {?} n
                         * @return {?}
                         */
                        function (n) { return n.key; })) });
                    break;
            }
            return emitStructure;
        };
        /**
         * New functions for flatten nodes
         */
        /**
         * New functions for flatten nodes
         * @param {?} list
         * @param {?} key
         * @return {?}
         */
        NzTreeBaseService.prototype.getIndexOfArray = /**
         * New functions for flatten nodes
         * @param {?} list
         * @param {?} key
         * @return {?}
         */
        function (list, key) {
            return list.findIndex((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.key === key; }));
        };
        /**
         * Render by nzCheckedKeys
         * When keys equals null, just render with checkStrictly
         * @param keys
         * @param checkStrictly
         */
        /**
         * Render by nzCheckedKeys
         * When keys equals null, just render with checkStrictly
         * @param {?} keys
         * @param {?} checkStrictly
         * @return {?}
         */
        NzTreeBaseService.prototype.conductCheck = /**
         * Render by nzCheckedKeys
         * When keys equals null, just render with checkStrictly
         * @param {?} keys
         * @param {?} checkStrictly
         * @return {?}
         */
        function (keys, checkStrictly) {
            this.checkedNodeList = [];
            this.halfCheckedNodeList = [];
            /** @type {?} */
            var calc = (/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) {
                    if (keys === null) {
                        // render tree if no default checked keys found
                        node.isChecked = !!node.origin.checked;
                    }
                    else {
                        if (isInArray(node.key, keys || [])) {
                            node.isChecked = true;
                            node.isHalfChecked = false;
                        }
                        else {
                            node.isChecked = false;
                            node.isHalfChecked = false;
                        }
                    }
                    if (node.children.length > 0) {
                        calc(node.children);
                    }
                }));
            });
            calc(this.rootNodes);
            this.refreshCheckState(checkStrictly);
        };
        /**
         * @param {?=} keys
         * @return {?}
         */
        NzTreeBaseService.prototype.conductExpandedKeys = /**
         * @param {?=} keys
         * @return {?}
         */
        function (keys) {
            var _this = this;
            if (keys === void 0) { keys = []; }
            /** @type {?} */
            var expandedKeySet = new Set(keys === true ? [] : keys);
            this.expandedNodeList = [];
            /** @type {?} */
            var calc = (/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) {
                    node.setExpanded(keys === true || expandedKeySet.has(node.key) || node.isExpanded === true);
                    if (node.isExpanded) {
                        _this.setExpandedNodeList(node);
                    }
                    if (node.children.length > 0) {
                        calc(node.children);
                    }
                }));
            });
            calc(this.rootNodes);
        };
        /**
         * @param {?} keys
         * @param {?} isMulti
         * @return {?}
         */
        NzTreeBaseService.prototype.conductSelectedKeys = /**
         * @param {?} keys
         * @param {?} isMulti
         * @return {?}
         */
        function (keys, isMulti) {
            var _this = this;
            this.selectedNodeList.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return (node.isSelected = false); }));
            this.selectedNodeList = [];
            /** @type {?} */
            var calc = (/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                return nodes.every((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) {
                    if (isInArray(node.key, keys)) {
                        node.isSelected = true;
                        _this.setSelectedNodeList(node);
                        if (!isMulti) {
                            // if not support multi select
                            return false;
                        }
                    }
                    else {
                        node.isSelected = false;
                    }
                    if (node.children.length > 0) {
                        // Recursion
                        return calc(node.children);
                    }
                    return true;
                }));
            });
            calc(this.rootNodes);
        };
        /**
         * Expand parent nodes by child node
         * @param node
         */
        /**
         * Expand parent nodes by child node
         * @param {?} node
         * @return {?}
         */
        NzTreeBaseService.prototype.expandNodeAllParentBySearch = /**
         * Expand parent nodes by child node
         * @param {?} node
         * @return {?}
         */
        function (node) {
            var _this = this;
            /** @type {?} */
            var calc = (/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                if (n) {
                    n.canHide = false;
                    n.setExpanded(true);
                    _this.setExpandedNodeList(n);
                    if (n.getParentNode()) {
                        return calc(n.getParentNode());
                    }
                }
            });
            calc(node.getParentNode());
        };
        NzTreeBaseService.decorators = [
            { type: core.Injectable }
        ];
        return NzTreeBaseService;
    }());
    if (false) {
        /** @type {?} */
        NzTreeBaseService.prototype.DRAG_SIDE_RANGE;
        /** @type {?} */
        NzTreeBaseService.prototype.DRAG_MIN_GAP;
        /** @type {?} */
        NzTreeBaseService.prototype.isCheckStrictly;
        /** @type {?} */
        NzTreeBaseService.prototype.isMultiple;
        /** @type {?} */
        NzTreeBaseService.prototype.selectedNode;
        /** @type {?} */
        NzTreeBaseService.prototype.rootNodes;
        /** @type {?} */
        NzTreeBaseService.prototype.flattenNodes$;
        /** @type {?} */
        NzTreeBaseService.prototype.selectedNodeList;
        /** @type {?} */
        NzTreeBaseService.prototype.expandedNodeList;
        /** @type {?} */
        NzTreeBaseService.prototype.checkedNodeList;
        /** @type {?} */
        NzTreeBaseService.prototype.halfCheckedNodeList;
        /** @type {?} */
        NzTreeBaseService.prototype.matchedNodeList;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-tree-service.resolver.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NzTreeHigherOrderServiceToken = new core.InjectionToken('NzTreeHigherOrder');

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-tree-base.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTreeBase = /** @class */ (function () {
        function NzTreeBase(nzTreeService) {
            this.nzTreeService = nzTreeService;
        }
        /**
         * Coerces a value({@link any[]}) to a TreeNodes({@link NzTreeNode[]})
         */
        /**
         * Coerces a value({\@link any[]}) to a TreeNodes({\@link NzTreeNode[]})
         * @param {?} value
         * @return {?}
         */
        NzTreeBase.prototype.coerceTreeNodes = /**
         * Coerces a value({\@link any[]}) to a TreeNodes({\@link NzTreeNode[]})
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            /** @type {?} */
            var nodes = [];
            if (!this.nzTreeService.isArrayOfNzTreeNode(value)) {
                // has not been new NzTreeNode
                nodes = value.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return new NzTreeNode(item, null, _this.nzTreeService); }));
            }
            else {
                nodes = value.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item.service = _this.nzTreeService;
                    return item;
                }));
            }
            return nodes;
        };
        /**
         * Get all nodes({@link NzTreeNode})
         */
        /**
         * Get all nodes({\@link NzTreeNode})
         * @return {?}
         */
        NzTreeBase.prototype.getTreeNodes = /**
         * Get all nodes({\@link NzTreeNode})
         * @return {?}
         */
        function () {
            return this.nzTreeService.rootNodes;
        };
        /**
         * Get {@link NzTreeNode} with key
         */
        /**
         * Get {\@link NzTreeNode} with key
         * @param {?} key
         * @return {?}
         */
        NzTreeBase.prototype.getTreeNodeByKey = /**
         * Get {\@link NzTreeNode} with key
         * @param {?} key
         * @return {?}
         */
        function (key) {
            // flat tree nodes
            /** @type {?} */
            var nodes = [];
            /** @type {?} */
            var getNode = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                nodes.push(node);
                node.getChildren().forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    getNode(n);
                }));
            });
            this.getTreeNodes().forEach((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                getNode(n);
            }));
            return nodes.find((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return n.key === key; })) || null;
        };
        /**
         * Get checked nodes(merged)
         */
        /**
         * Get checked nodes(merged)
         * @return {?}
         */
        NzTreeBase.prototype.getCheckedNodeList = /**
         * Get checked nodes(merged)
         * @return {?}
         */
        function () {
            return this.nzTreeService.getCheckedNodeList();
        };
        /**
         * Get selected nodes
         */
        /**
         * Get selected nodes
         * @return {?}
         */
        NzTreeBase.prototype.getSelectedNodeList = /**
         * Get selected nodes
         * @return {?}
         */
        function () {
            return this.nzTreeService.getSelectedNodeList();
        };
        /**
         * Get half checked nodes
         */
        /**
         * Get half checked nodes
         * @return {?}
         */
        NzTreeBase.prototype.getHalfCheckedNodeList = /**
         * Get half checked nodes
         * @return {?}
         */
        function () {
            return this.nzTreeService.getHalfCheckedNodeList();
        };
        /**
         * Get expanded nodes
         */
        /**
         * Get expanded nodes
         * @return {?}
         */
        NzTreeBase.prototype.getExpandedNodeList = /**
         * Get expanded nodes
         * @return {?}
         */
        function () {
            return this.nzTreeService.getExpandedNodeList();
        };
        /**
         * Get matched nodes(if nzSearchValue is not null)
         */
        /**
         * Get matched nodes(if nzSearchValue is not null)
         * @return {?}
         */
        NzTreeBase.prototype.getMatchedNodeList = /**
         * Get matched nodes(if nzSearchValue is not null)
         * @return {?}
         */
        function () {
            return this.nzTreeService.getMatchedNodeList();
        };
        return NzTreeBase;
    }());
    if (false) {
        /** @type {?} */
        NzTreeBase.prototype.nzTreeService;
    }

    exports.NzTreeBase = NzTreeBase;
    exports.NzTreeBaseService = NzTreeBaseService;
    exports.NzTreeHigherOrderServiceToken = NzTreeHigherOrderServiceToken;
    exports.NzTreeNode = NzTreeNode;
    exports.flattenTreeData = flattenTreeData;
    exports.getKey = getKey;
    exports.getPosition = getPosition;
    exports.isCheckDisabled = isCheckDisabled;
    exports.isInArray = isInArray;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-tree.umd.js.map
