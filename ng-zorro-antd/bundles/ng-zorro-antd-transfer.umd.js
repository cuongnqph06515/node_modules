(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/util'), require('ng-zorro-antd/i18n'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/forms'), require('ng-zorro-antd/button'), require('ng-zorro-antd/checkbox'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/input')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/transfer', ['exports', '@angular/core', 'ng-zorro-antd/core/util', 'ng-zorro-antd/i18n', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/forms', 'ng-zorro-antd/button', 'ng-zorro-antd/checkbox', 'ng-zorro-antd/empty', 'ng-zorro-antd/icon', 'ng-zorro-antd/input'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].transfer = {}), global.ng.core, global['ng-zorro-antd'].core.util, global['ng-zorro-antd'].i18n, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.forms, global['ng-zorro-antd'].button, global['ng-zorro-antd'].checkbox, global['ng-zorro-antd'].empty, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].input));
}(this, (function (exports, core, util, i18n, rxjs, operators, common, forms, button, checkbox, empty, icon, input) { 'use strict';

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
     * @record
     */
    function TransferItem() { }
    if (false) {
        /** @type {?} */
        TransferItem.prototype.title;
        /** @type {?|undefined} */
        TransferItem.prototype.direction;
        /** @type {?|undefined} */
        TransferItem.prototype.disabled;
        /** @type {?|undefined} */
        TransferItem.prototype.checked;
        /** @type {?|undefined} */
        TransferItem.prototype.hide;
        /* Skipping unhandled member: [key: string]: NzSafeAny;*/
    }
    /**
     * @record
     */
    function TransferCanMove() { }
    if (false) {
        /** @type {?} */
        TransferCanMove.prototype.direction;
        /** @type {?} */
        TransferCanMove.prototype.list;
    }
    /**
     * @record
     */
    function TransferChange() { }
    if (false) {
        /** @type {?} */
        TransferChange.prototype.from;
        /** @type {?} */
        TransferChange.prototype.to;
        /** @type {?} */
        TransferChange.prototype.list;
    }
    /**
     * @record
     */
    function TransferSearchChange() { }
    if (false) {
        /** @type {?} */
        TransferSearchChange.prototype.direction;
        /** @type {?} */
        TransferSearchChange.prototype.value;
    }
    /**
     * @record
     */
    function TransferSelectChange() { }
    if (false) {
        /** @type {?} */
        TransferSelectChange.prototype.direction;
        /** @type {?} */
        TransferSelectChange.prototype.checked;
        /** @type {?} */
        TransferSelectChange.prototype.list;
        /** @type {?|undefined} */
        TransferSelectChange.prototype.item;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: transfer-list.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTransferListComponent = /** @class */ (function () {
        // #endregion
        function NzTransferListComponent(cdr) {
            var _this = this;
            this.cdr = cdr;
            // #region fields
            this.direction = 'left';
            this.titleText = '';
            this.showSelectAll = true;
            this.dataSource = [];
            this.itemUnit = '';
            this.itemsUnit = '';
            this.filter = '';
            this.renderList = null;
            this.render = null;
            this.footer = null;
            // events
            this.handleSelectAll = new core.EventEmitter();
            this.handleSelect = new core.EventEmitter();
            this.filterChange = new core.EventEmitter();
            this.stat = {
                checkAll: false,
                checkHalf: false,
                checkCount: 0,
                shownCount: 0
            };
            this.onItemSelect = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (_this.disabled || item.disabled) {
                    return;
                }
                item.checked = !item.checked;
                _this.updateCheckStatus();
                _this.handleSelect.emit(item);
            });
            this.onItemSelectAll = (/**
             * @param {?} status
             * @return {?}
             */
            function (status) {
                _this.dataSource.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (!item.disabled && !item.hide) {
                        item.checked = status;
                    }
                }));
                _this.updateCheckStatus();
                _this.handleSelectAll.emit(status);
            });
        }
        /**
         * @private
         * @return {?}
         */
        NzTransferListComponent.prototype.updateCheckStatus = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var validCount = this.dataSource.filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return !w.disabled; })).length;
            this.stat.checkCount = this.dataSource.filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return w.checked && !w.disabled; })).length;
            this.stat.shownCount = this.dataSource.filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return !w.hide; })).length;
            this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
            this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
        };
        // #endregion
        // #region search
        // #endregion
        // #region search
        /**
         * @param {?} value
         * @return {?}
         */
        NzTransferListComponent.prototype.handleFilter = 
        // #endregion
        // #region search
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.filter = value;
            this.dataSource.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item.hide = value.length > 0 && !_this.matchFilter(value, item);
            }));
            this.stat.shownCount = this.dataSource.filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return !w.hide; })).length;
            this.filterChange.emit({ direction: this.direction, value: value });
        };
        /**
         * @return {?}
         */
        NzTransferListComponent.prototype.handleClear = /**
         * @return {?}
         */
        function () {
            this.handleFilter('');
        };
        /**
         * @private
         * @param {?} text
         * @param {?} item
         * @return {?}
         */
        NzTransferListComponent.prototype.matchFilter = /**
         * @private
         * @param {?} text
         * @param {?} item
         * @return {?}
         */
        function (text, item) {
            if (this.filterOption) {
                return this.filterOption(text, item);
            }
            return item.title.includes(text);
        };
        /**
         * @return {?}
         */
        NzTransferListComponent.prototype.markForCheck = /**
         * @return {?}
         */
        function () {
            this.updateCheckStatus();
            this.cdr.markForCheck();
        };
        NzTransferListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-transfer-list',
                        exportAs: 'nzTransferList',
                        preserveWhitespaces: false,
                        template: "\n    <ng-template #defaultRenderList>\n      <ul *ngIf=\"stat.shownCount > 0\" class=\"ant-transfer-list-content\">\n        <div class=\"LazyLoad\" *ngFor=\"let item of dataSource\">\n          <li\n            *ngIf=\"!item.hide\"\n            (click)=\"onItemSelect(item)\"\n            class=\"ant-transfer-list-content-item\"\n            [ngClass]=\"{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }\"\n          >\n            <label\n              nz-checkbox\n              [nzChecked]=\"item.checked\"\n              (nzCheckedChange)=\"onItemSelect(item)\"\n              (click)=\"$event.stopPropagation()\"\n              [nzDisabled]=\"disabled || item.disabled\"\n            >\n              <ng-container *ngIf=\"!render; else renderContainer\">{{ item.title }}</ng-container>\n              <ng-template #renderContainer [ngTemplateOutlet]=\"render\" [ngTemplateOutletContext]=\"{ $implicit: item }\"></ng-template>\n            </label>\n          </li>\n        </div>\n      </ul>\n      <div *ngIf=\"stat.shownCount === 0\" class=\"ant-transfer-list-body-not-found\">\n        <nz-embed-empty [nzComponentName]=\"'transfer'\" [specificContent]=\"notFoundContent\"></nz-embed-empty>\n      </div>\n    </ng-template>\n    <div class=\"ant-transfer-list-header\">\n      <label\n        *ngIf=\"showSelectAll\"\n        nz-checkbox\n        [nzChecked]=\"stat.checkAll\"\n        (nzCheckedChange)=\"onItemSelectAll($event)\"\n        [nzIndeterminate]=\"stat.checkHalf\"\n        [nzDisabled]=\"stat.shownCount == 0 || disabled\"\n      >\n      </label>\n      <span class=\"ant-transfer-list-header-selected\">\n        <span\n          >{{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}\n          {{ dataSource.length > 1 ? itemsUnit : itemUnit }}</span\n        >\n        <span *ngIf=\"titleText\" class=\"ant-transfer-list-header-title\">{{ titleText }}</span>\n      </span>\n    </div>\n    <div\n      class=\"{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}\"\n      [ngClass]=\"{ 'ant-transfer__nodata': stat.shownCount === 0 }\"\n    >\n      <div *ngIf=\"showSearch\" class=\"ant-transfer-list-body-search-wrapper\">\n        <div\n          nz-transfer-search\n          (valueChanged)=\"handleFilter($event)\"\n          (valueClear)=\"handleClear()\"\n          [placeholder]=\"searchPlaceholder\"\n          [disabled]=\"disabled\"\n          [value]=\"filter\"\n        ></div>\n      </div>\n      <ng-container *ngIf=\"renderList; else defaultRenderList\">\n        <div class=\"ant-transfer-list-body-customize-wrapper\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              renderList;\n              context: {\n                $implicit: dataSource,\n                direction: direction,\n                disabled: disabled,\n                onItemSelectAll: onItemSelectAll,\n                onItemSelect: onItemSelect,\n                stat: stat\n              }\n            \"\n          ></ng-container>\n        </div>\n      </ng-container>\n    </div>\n    <div *ngIf=\"footer\" class=\"ant-transfer-list-footer\">\n      <ng-template [ngTemplateOutlet]=\"footer\" [ngTemplateOutletContext]=\"{ $implicit: direction }\"></ng-template>\n    </div>\n  ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.ant-transfer-list]': 'true',
                            '[class.ant-transfer-list-with-footer]': '!!footer'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTransferListComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzTransferListComponent.propDecorators = {
            direction: [{ type: core.Input }],
            titleText: [{ type: core.Input }],
            showSelectAll: [{ type: core.Input }],
            dataSource: [{ type: core.Input }],
            itemUnit: [{ type: core.Input }],
            itemsUnit: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            showSearch: [{ type: core.Input }],
            searchPlaceholder: [{ type: core.Input }],
            notFoundContent: [{ type: core.Input }],
            filterOption: [{ type: core.Input }],
            renderList: [{ type: core.Input }],
            render: [{ type: core.Input }],
            footer: [{ type: core.Input }],
            handleSelectAll: [{ type: core.Output }],
            handleSelect: [{ type: core.Output }],
            filterChange: [{ type: core.Output }]
        };
        return NzTransferListComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTransferListComponent.prototype.direction;
        /** @type {?} */
        NzTransferListComponent.prototype.titleText;
        /** @type {?} */
        NzTransferListComponent.prototype.showSelectAll;
        /** @type {?} */
        NzTransferListComponent.prototype.dataSource;
        /** @type {?} */
        NzTransferListComponent.prototype.itemUnit;
        /** @type {?} */
        NzTransferListComponent.prototype.itemsUnit;
        /** @type {?} */
        NzTransferListComponent.prototype.filter;
        /** @type {?} */
        NzTransferListComponent.prototype.disabled;
        /** @type {?} */
        NzTransferListComponent.prototype.showSearch;
        /** @type {?} */
        NzTransferListComponent.prototype.searchPlaceholder;
        /** @type {?} */
        NzTransferListComponent.prototype.notFoundContent;
        /** @type {?} */
        NzTransferListComponent.prototype.filterOption;
        /** @type {?} */
        NzTransferListComponent.prototype.renderList;
        /** @type {?} */
        NzTransferListComponent.prototype.render;
        /** @type {?} */
        NzTransferListComponent.prototype.footer;
        /** @type {?} */
        NzTransferListComponent.prototype.handleSelectAll;
        /** @type {?} */
        NzTransferListComponent.prototype.handleSelect;
        /** @type {?} */
        NzTransferListComponent.prototype.filterChange;
        /** @type {?} */
        NzTransferListComponent.prototype.stat;
        /** @type {?} */
        NzTransferListComponent.prototype.onItemSelect;
        /** @type {?} */
        NzTransferListComponent.prototype.onItemSelectAll;
        /**
         * @type {?}
         * @private
         */
        NzTransferListComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: transfer-search.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTransferSearchComponent = /** @class */ (function () {
        // endregion
        function NzTransferSearchComponent(cdr) {
            this.cdr = cdr;
            this.valueChanged = new core.EventEmitter();
            this.valueClear = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NzTransferSearchComponent.prototype._handle = /**
         * @return {?}
         */
        function () {
            this.valueChanged.emit(this.value);
        };
        /**
         * @return {?}
         */
        NzTransferSearchComponent.prototype._clear = /**
         * @return {?}
         */
        function () {
            if (this.disabled) {
                return;
            }
            this.value = '';
            this.valueClear.emit();
        };
        /**
         * @return {?}
         */
        NzTransferSearchComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.cdr.detectChanges();
        };
        NzTransferSearchComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-transfer-search]',
                        exportAs: 'nzTransferSearch',
                        preserveWhitespaces: false,
                        template: "\n    <input\n      [(ngModel)]=\"value\"\n      (ngModelChange)=\"_handle()\"\n      [disabled]=\"disabled\"\n      [placeholder]=\"placeholder\"\n      class=\"ant-input ant-transfer-list-search\"\n      [ngClass]=\"{ 'ant-input-disabled': disabled }\"\n    />\n    <a *ngIf=\"value && value.length > 0; else def\" class=\"ant-transfer-list-search-action\" (click)=\"_clear()\">\n      <i nz-icon nzType=\"close-circle\"></i>\n    </a>\n    <ng-template #def>\n      <span class=\"ant-transfer-list-search-action\"><i nz-icon nzType=\"search\"></i></span>\n    </ng-template>\n  ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NzTransferSearchComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        NzTransferSearchComponent.propDecorators = {
            placeholder: [{ type: core.Input }],
            value: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            valueChanged: [{ type: core.Output }],
            valueClear: [{ type: core.Output }]
        };
        return NzTransferSearchComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTransferSearchComponent.prototype.placeholder;
        /** @type {?} */
        NzTransferSearchComponent.prototype.value;
        /** @type {?} */
        NzTransferSearchComponent.prototype.disabled;
        /** @type {?} */
        NzTransferSearchComponent.prototype.valueChanged;
        /** @type {?} */
        NzTransferSearchComponent.prototype.valueClear;
        /**
         * @type {?}
         * @private
         */
        NzTransferSearchComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: transfer.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTransferComponent = /** @class */ (function () {
        // #endregion
        function NzTransferComponent(cdr, i18n) {
            var _this = this;
            this.cdr = cdr;
            this.i18n = i18n;
            this.unsubscribe$ = new rxjs.Subject();
            this.leftFilter = '';
            this.rightFilter = '';
            // #region fields
            this.nzDisabled = false;
            this.nzDataSource = [];
            this.nzTitles = ['', ''];
            this.nzOperations = [];
            this.nzListStyle = {};
            this.nzShowSelectAll = true;
            this.nzCanMove = (/**
             * @param {?} arg
             * @return {?}
             */
            function (arg) { return rxjs.of(arg.list); });
            this.nzRenderList = null;
            this.nzRender = null;
            this.nzFooter = null;
            this.nzShowSearch = false;
            this.nzTargetKeys = [];
            this.nzSelectedKeys = [];
            // events
            this.nzChange = new core.EventEmitter();
            this.nzSearchChange = new core.EventEmitter();
            this.nzSelectChange = new core.EventEmitter();
            // #endregion
            // #region process data
            // left
            this.leftDataSource = [];
            // right
            this.rightDataSource = [];
            this.handleLeftSelectAll = (/**
             * @param {?} checked
             * @return {?}
             */
            function (checked) { return _this.handleSelect('left', checked); });
            this.handleRightSelectAll = (/**
             * @param {?} checked
             * @return {?}
             */
            function (checked) { return _this.handleSelect('right', checked); });
            this.handleLeftSelect = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.handleSelect('left', !!item.checked, item); });
            this.handleRightSelect = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.handleSelect('right', !!item.checked, item); });
            // #endregion
            // #region operation
            this.leftActive = false;
            this.rightActive = false;
            this.moveToLeft = (/**
             * @return {?}
             */
            function () { return _this.moveTo('left'); });
            this.moveToRight = (/**
             * @return {?}
             */
            function () { return _this.moveTo('right'); });
        }
        /**
         * @private
         * @return {?}
         */
        NzTransferComponent.prototype.splitDataSource = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.leftDataSource = [];
            this.rightDataSource = [];
            this.nzDataSource.forEach((/**
             * @param {?} record
             * @return {?}
             */
            function (record) {
                if (record.direction === 'right') {
                    record.direction = 'right';
                    _this.rightDataSource.push(record);
                }
                else {
                    record.direction = 'left';
                    _this.leftDataSource.push(record);
                }
            }));
        };
        /**
         * @private
         * @param {?} direction
         * @return {?}
         */
        NzTransferComponent.prototype.getCheckedData = /**
         * @private
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return w.checked; }));
        };
        /**
         * @param {?} direction
         * @param {?} checked
         * @param {?=} item
         * @return {?}
         */
        NzTransferComponent.prototype.handleSelect = /**
         * @param {?} direction
         * @param {?} checked
         * @param {?=} item
         * @return {?}
         */
        function (direction, checked, item) {
            /** @type {?} */
            var list = this.getCheckedData(direction);
            this.updateOperationStatus(direction, list.length);
            this.nzSelectChange.emit({ direction: direction, checked: checked, list: list, item: item });
        };
        /**
         * @param {?} ret
         * @return {?}
         */
        NzTransferComponent.prototype.handleFilterChange = /**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            this.nzSearchChange.emit(ret);
        };
        /**
         * @private
         * @param {?} direction
         * @param {?=} count
         * @return {?}
         */
        NzTransferComponent.prototype.updateOperationStatus = /**
         * @private
         * @param {?} direction
         * @param {?=} count
         * @return {?}
         */
        function (direction, count) {
            this[direction === 'right' ? 'leftActive' : 'rightActive'] =
                (typeof count === 'undefined' ? this.getCheckedData(direction).filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                function (w) { return !w.disabled; })).length : count) > 0;
        };
        /**
         * @param {?} direction
         * @return {?}
         */
        NzTransferComponent.prototype.moveTo = /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            var _this = this;
            /** @type {?} */
            var oppositeDirection = direction === 'left' ? 'right' : 'left';
            this.updateOperationStatus(oppositeDirection, 0);
            /** @type {?} */
            var datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
            /** @type {?} */
            var moveList = datasource.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.checked === true && !item.disabled; }));
            this.nzCanMove({ direction: direction, list: moveList }).subscribe((/**
             * @param {?} newMoveList
             * @return {?}
             */
            function (newMoveList) {
                return _this.truthMoveTo(direction, newMoveList.filter((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return !!i; })));
            }), (/**
             * @return {?}
             */
            function () { return moveList.forEach((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return (i.checked = false); })); }));
        };
        /**
         * @private
         * @param {?} direction
         * @param {?} list
         * @return {?}
         */
        NzTransferComponent.prototype.truthMoveTo = /**
         * @private
         * @param {?} direction
         * @param {?} list
         * @return {?}
         */
        function (direction, list) {
            var e_1, _a;
            /** @type {?} */
            var oppositeDirection = direction === 'left' ? 'right' : 'left';
            /** @type {?} */
            var datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
            /** @type {?} */
            var targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
            try {
                for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                    var item = list_1_1.value;
                    item.checked = false;
                    item.hide = false;
                    item.direction = direction;
                    datasource.splice(datasource.indexOf(item), 1);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            targetDatasource.splice.apply(targetDatasource, __spread([0, 0], list));
            this.updateOperationStatus(oppositeDirection);
            this.nzChange.emit({
                from: oppositeDirection,
                to: direction,
                list: list
            });
            this.markForCheckAllList();
        };
        /**
         * @private
         * @return {?}
         */
        NzTransferComponent.prototype.markForCheckAllList = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.lists) {
                return;
            }
            this.lists.forEach((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.markForCheck(); }));
        };
        /**
         * @private
         * @return {?}
         */
        NzTransferComponent.prototype.handleNzTargetKeys = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var keys = util.toArray(this.nzTargetKeys);
            /** @type {?} */
            var hasOwnKey = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.hasOwnProperty('key'); });
            this.leftDataSource.forEach((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (hasOwnKey(e) && keys.indexOf(e.key) !== -1 && !e.disabled) {
                    e.checked = true;
                }
            }));
            this.moveToRight();
        };
        /**
         * @private
         * @return {?}
         */
        NzTransferComponent.prototype.handleNzSelectedKeys = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var keys = util.toArray(this.nzSelectedKeys);
            this.nzDataSource.forEach((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (keys.indexOf(e.key) !== -1) {
                    e.checked = true;
                }
            }));
            /** @type {?} */
            var term = (/**
             * @param {?} ld
             * @return {?}
             */
            function (ld) { return ld.disabled === false && ld.checked === true; });
            this.rightActive = this.leftDataSource.some(term);
            this.leftActive = this.rightDataSource.some(term);
        };
        /**
         * @return {?}
         */
        NzTransferComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.unsubscribe$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.locale = _this.i18n.getLocaleData('Transfer');
                _this.markForCheckAllList();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTransferComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzDataSource) {
                this.splitDataSource();
                this.updateOperationStatus('left');
                this.updateOperationStatus('right');
                this.cdr.detectChanges();
                this.markForCheckAllList();
            }
            if (changes.nzTargetKeys) {
                this.handleNzTargetKeys();
            }
            if (changes.nzSelectedKeys) {
                this.handleNzSelectedKeys();
            }
        };
        /**
         * @return {?}
         */
        NzTransferComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        };
        NzTransferComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-transfer',
                        exportAs: 'nzTransfer',
                        preserveWhitespaces: false,
                        template: "\n    <nz-transfer-list\n      class=\"ant-transfer-list\"\n      [ngStyle]=\"nzListStyle\"\n      data-direction=\"left\"\n      direction=\"left\"\n      [titleText]=\"nzTitles[0]\"\n      [showSelectAll]=\"nzShowSelectAll\"\n      [dataSource]=\"leftDataSource\"\n      [filter]=\"leftFilter\"\n      [filterOption]=\"nzFilterOption\"\n      (filterChange)=\"handleFilterChange($event)\"\n      [renderList]=\"nzRenderList && nzRenderList[0]\"\n      [render]=\"nzRender\"\n      [disabled]=\"nzDisabled\"\n      [showSearch]=\"nzShowSearch\"\n      [searchPlaceholder]=\"nzSearchPlaceholder || locale?.searchPlaceholder\"\n      [notFoundContent]=\"nzNotFoundContent\"\n      [itemUnit]=\"nzItemUnit || locale?.itemUnit\"\n      [itemsUnit]=\"nzItemsUnit || locale?.itemsUnit\"\n      [footer]=\"nzFooter\"\n      (handleSelect)=\"handleLeftSelect($event)\"\n      (handleSelectAll)=\"handleLeftSelectAll($event)\"\n    >\n    </nz-transfer-list>\n    <div class=\"ant-transfer-operation\">\n      <button nz-button (click)=\"moveToLeft()\" [disabled]=\"nzDisabled || !leftActive\" [nzType]=\"'primary'\" [nzSize]=\"'small'\">\n        <i nz-icon nzType=\"left\"></i><span *ngIf=\"nzOperations[1]\">{{ nzOperations[1] }}</span>\n      </button>\n      <button nz-button (click)=\"moveToRight()\" [disabled]=\"nzDisabled || !rightActive\" [nzType]=\"'primary'\" [nzSize]=\"'small'\">\n        <i nz-icon nzType=\"right\"></i><span *ngIf=\"nzOperations[0]\">{{ nzOperations[0] }}</span>\n      </button>\n    </div>\n    <nz-transfer-list\n      class=\"ant-transfer-list\"\n      [ngStyle]=\"nzListStyle\"\n      data-direction=\"right\"\n      direction=\"right\"\n      [titleText]=\"nzTitles[1]\"\n      [showSelectAll]=\"nzShowSelectAll\"\n      [dataSource]=\"rightDataSource\"\n      [filter]=\"rightFilter\"\n      [filterOption]=\"nzFilterOption\"\n      (filterChange)=\"handleFilterChange($event)\"\n      [renderList]=\"nzRenderList && nzRenderList[1]\"\n      [render]=\"nzRender\"\n      [disabled]=\"nzDisabled\"\n      [showSearch]=\"nzShowSearch\"\n      [searchPlaceholder]=\"nzSearchPlaceholder || locale?.searchPlaceholder\"\n      [notFoundContent]=\"nzNotFoundContent\"\n      [itemUnit]=\"nzItemUnit || locale?.itemUnit\"\n      [itemsUnit]=\"nzItemsUnit || locale?.itemsUnit\"\n      [footer]=\"nzFooter\"\n      (handleSelect)=\"handleRightSelect($event)\"\n      (handleSelectAll)=\"handleRightSelectAll($event)\"\n    >\n    </nz-transfer-list>\n  ",
                        host: {
                            '[class.ant-transfer]': "true",
                            '[class.ant-transfer-disabled]': "nzDisabled",
                            '[class.ant-transfer-customize-list]': "nzRenderList"
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NzTransferComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: i18n.NzI18nService }
        ]; };
        NzTransferComponent.propDecorators = {
            lists: [{ type: core.ViewChildren, args: [NzTransferListComponent,] }],
            nzDisabled: [{ type: core.Input }],
            nzDataSource: [{ type: core.Input }],
            nzTitles: [{ type: core.Input }],
            nzOperations: [{ type: core.Input }],
            nzListStyle: [{ type: core.Input }],
            nzShowSelectAll: [{ type: core.Input }],
            nzItemUnit: [{ type: core.Input }],
            nzItemsUnit: [{ type: core.Input }],
            nzCanMove: [{ type: core.Input }],
            nzRenderList: [{ type: core.Input }],
            nzRender: [{ type: core.Input }],
            nzFooter: [{ type: core.Input }],
            nzShowSearch: [{ type: core.Input }],
            nzFilterOption: [{ type: core.Input }],
            nzSearchPlaceholder: [{ type: core.Input }],
            nzNotFoundContent: [{ type: core.Input }],
            nzTargetKeys: [{ type: core.Input }],
            nzSelectedKeys: [{ type: core.Input }],
            nzChange: [{ type: core.Output }],
            nzSearchChange: [{ type: core.Output }],
            nzSelectChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTransferComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTransferComponent.prototype, "nzShowSelectAll", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTransferComponent.prototype, "nzShowSearch", void 0);
        return NzTransferComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTransferComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzTransferComponent.ngAcceptInputType_nzShowSelectAll;
        /** @type {?} */
        NzTransferComponent.ngAcceptInputType_nzShowSearch;
        /**
         * @type {?}
         * @private
         */
        NzTransferComponent.prototype.unsubscribe$;
        /**
         * @type {?}
         * @private
         */
        NzTransferComponent.prototype.lists;
        /** @type {?} */
        NzTransferComponent.prototype.locale;
        /** @type {?} */
        NzTransferComponent.prototype.leftFilter;
        /** @type {?} */
        NzTransferComponent.prototype.rightFilter;
        /** @type {?} */
        NzTransferComponent.prototype.nzDisabled;
        /** @type {?} */
        NzTransferComponent.prototype.nzDataSource;
        /** @type {?} */
        NzTransferComponent.prototype.nzTitles;
        /** @type {?} */
        NzTransferComponent.prototype.nzOperations;
        /** @type {?} */
        NzTransferComponent.prototype.nzListStyle;
        /** @type {?} */
        NzTransferComponent.prototype.nzShowSelectAll;
        /** @type {?} */
        NzTransferComponent.prototype.nzItemUnit;
        /** @type {?} */
        NzTransferComponent.prototype.nzItemsUnit;
        /** @type {?} */
        NzTransferComponent.prototype.nzCanMove;
        /** @type {?} */
        NzTransferComponent.prototype.nzRenderList;
        /** @type {?} */
        NzTransferComponent.prototype.nzRender;
        /** @type {?} */
        NzTransferComponent.prototype.nzFooter;
        /** @type {?} */
        NzTransferComponent.prototype.nzShowSearch;
        /** @type {?} */
        NzTransferComponent.prototype.nzFilterOption;
        /** @type {?} */
        NzTransferComponent.prototype.nzSearchPlaceholder;
        /** @type {?} */
        NzTransferComponent.prototype.nzNotFoundContent;
        /** @type {?} */
        NzTransferComponent.prototype.nzTargetKeys;
        /** @type {?} */
        NzTransferComponent.prototype.nzSelectedKeys;
        /** @type {?} */
        NzTransferComponent.prototype.nzChange;
        /** @type {?} */
        NzTransferComponent.prototype.nzSearchChange;
        /** @type {?} */
        NzTransferComponent.prototype.nzSelectChange;
        /** @type {?} */
        NzTransferComponent.prototype.leftDataSource;
        /** @type {?} */
        NzTransferComponent.prototype.rightDataSource;
        /** @type {?} */
        NzTransferComponent.prototype.handleLeftSelectAll;
        /** @type {?} */
        NzTransferComponent.prototype.handleRightSelectAll;
        /** @type {?} */
        NzTransferComponent.prototype.handleLeftSelect;
        /** @type {?} */
        NzTransferComponent.prototype.handleRightSelect;
        /** @type {?} */
        NzTransferComponent.prototype.leftActive;
        /** @type {?} */
        NzTransferComponent.prototype.rightActive;
        /** @type {?} */
        NzTransferComponent.prototype.moveToLeft;
        /** @type {?} */
        NzTransferComponent.prototype.moveToRight;
        /**
         * @type {?}
         * @private
         */
        NzTransferComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTransferComponent.prototype.i18n;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: transfer.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTransferModule = /** @class */ (function () {
        function NzTransferModule() {
        }
        NzTransferModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule, checkbox.NzCheckboxModule, button.NzButtonModule, input.NzInputModule, i18n.NzI18nModule, icon.NzIconModule, empty.NzEmptyModule],
                        declarations: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent],
                        exports: [NzTransferComponent]
                    },] }
        ];
        return NzTransferModule;
    }());

    exports.NzTransferComponent = NzTransferComponent;
    exports.NzTransferListComponent = NzTransferListComponent;
    exports.NzTransferModule = NzTransferModule;
    exports.NzTransferSearchComponent = NzTransferSearchComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-transfer.umd.js.map
