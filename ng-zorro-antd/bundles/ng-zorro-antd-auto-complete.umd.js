(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/input'), require('ng-zorro-antd/core/util'), require('@angular/cdk/keycodes'), require('@angular/cdk/portal'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/animation')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/auto-complete', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/input', 'ng-zorro-antd/core/util', '@angular/cdk/keycodes', '@angular/cdk/portal', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/animation'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd']['auto-complete'] = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.forms, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].input, global['ng-zorro-antd'].core.util, global.ng.cdk.keycodes, global.ng.cdk.portal, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.animation));
}(this, (function (exports, overlay, common, core, forms, noAnimation, outlet, input, util, keycodes, portal, rxjs, operators, animation) { 'use strict';

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
     * Generated from: autocomplete-optgroup.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzAutocompleteOptgroupComponent = /** @class */ (function () {
        function NzAutocompleteOptgroupComponent() {
        }
        NzAutocompleteOptgroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-auto-optgroup',
                        exportAs: 'nzAutoOptgroup',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div class=\"ant-select-item ant-select-item-group\">\n      <ng-container *nzStringTemplateOutlet=\"nzLabel\">{{ nzLabel }}</ng-container>\n    </div>\n    <ng-content select=\"nz-auto-option\"></ng-content>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzAutocompleteOptgroupComponent.ctorParameters = function () { return []; };
        NzAutocompleteOptgroupComponent.propDecorators = {
            nzLabel: [{ type: core.Input }]
        };
        return NzAutocompleteOptgroupComponent;
    }());
    if (false) {
        /** @type {?} */
        NzAutocompleteOptgroupComponent.prototype.nzLabel;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: autocomplete-option.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzOptionSelectionChange = /** @class */ (function () {
        function NzOptionSelectionChange(source, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.isUserInput = isUserInput;
        }
        return NzOptionSelectionChange;
    }());
    if (false) {
        /** @type {?} */
        NzOptionSelectionChange.prototype.source;
        /** @type {?} */
        NzOptionSelectionChange.prototype.isUserInput;
    }
    var NzAutocompleteOptionComponent = /** @class */ (function () {
        function NzAutocompleteOptionComponent(changeDetectorRef, element, nzAutocompleteOptgroupComponent) {
            this.changeDetectorRef = changeDetectorRef;
            this.element = element;
            this.nzAutocompleteOptgroupComponent = nzAutocompleteOptgroupComponent;
            this.nzDisabled = false;
            this.selectionChange = new core.EventEmitter();
            this.mouseEntered = new core.EventEmitter();
            this.active = false;
            this.selected = false;
        }
        /**
         * @param {?=} emit
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.select = /**
         * @param {?=} emit
         * @return {?}
         */
        function (emit) {
            if (emit === void 0) { emit = true; }
            this.selected = true;
            this.changeDetectorRef.markForCheck();
            if (emit) {
                this.emitSelectionChangeEvent();
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.onMouseEnter = /**
         * @return {?}
         */
        function () {
            this.mouseEntered.emit(this);
        };
        /**
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.deselect = /**
         * @return {?}
         */
        function () {
            this.selected = false;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        };
        /** Git display label */
        /**
         * Git display label
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.getLabel = /**
         * Git display label
         * @return {?}
         */
        function () {
            return this.nzLabel || this.nzValue.toString();
        };
        /** Set active (only styles) */
        /**
         * Set active (only styles)
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.setActiveStyles = /**
         * Set active (only styles)
         * @return {?}
         */
        function () {
            if (!this.active) {
                this.active = true;
                this.changeDetectorRef.markForCheck();
            }
        };
        /** Unset active (only styles) */
        /**
         * Unset active (only styles)
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.setInactiveStyles = /**
         * Unset active (only styles)
         * @return {?}
         */
        function () {
            if (this.active) {
                this.active = false;
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.scrollIntoViewIfNeeded = /**
         * @return {?}
         */
        function () {
            util.scrollIntoView(this.element.nativeElement);
        };
        /**
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.selectViaInteraction = /**
         * @return {?}
         */
        function () {
            if (!this.nzDisabled) {
                this.selected = !this.selected;
                if (this.selected) {
                    this.setActiveStyles();
                }
                else {
                    this.setInactiveStyles();
                }
                this.emitSelectionChangeEvent(true);
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * @private
         * @param {?=} isUserInput
         * @return {?}
         */
        NzAutocompleteOptionComponent.prototype.emitSelectionChangeEvent = /**
         * @private
         * @param {?=} isUserInput
         * @return {?}
         */
        function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
        };
        NzAutocompleteOptionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-auto-option',
                        exportAs: 'nzAutoOption',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div class=\"ant-select-item-option-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
                        host: {
                            role: 'menuitem',
                            class: 'ant-select-item ant-select-item-option',
                            '[class.ant-select-item-option-grouped]': 'nzAutocompleteOptgroupComponent',
                            '[class.ant-select-item-option-selected]': 'selected',
                            '[class.ant-select-item-option-active]': 'active',
                            '[class.ant-select-item-option-disabled]': 'nzDisabled',
                            '[attr.aria-selected]': 'selected.toString()',
                            '[attr.aria-disabled]': 'nzDisabled.toString()',
                            '(click)': 'selectViaInteraction()',
                            '(mouseenter)': 'onMouseEnter()',
                            '(mousedown)': '$event.preventDefault()'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzAutocompleteOptionComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: NzAutocompleteOptgroupComponent, decorators: [{ type: core.Optional }] }
        ]; };
        NzAutocompleteOptionComponent.propDecorators = {
            nzValue: [{ type: core.Input }],
            nzLabel: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            selectionChange: [{ type: core.Output }],
            mouseEntered: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzAutocompleteOptionComponent.prototype, "nzDisabled", void 0);
        return NzAutocompleteOptionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzAutocompleteOptionComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.nzValue;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.nzLabel;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.nzDisabled;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.selectionChange;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.mouseEntered;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.active;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.selected;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteOptionComponent.prototype.changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteOptionComponent.prototype.element;
        /** @type {?} */
        NzAutocompleteOptionComponent.prototype.nzAutocompleteOptgroupComponent;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: autocomplete.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AutocompleteDataSourceItem() { }
    if (false) {
        /** @type {?} */
        AutocompleteDataSourceItem.prototype.value;
        /** @type {?} */
        AutocompleteDataSourceItem.prototype.label;
    }
    var NzAutocompleteComponent = /** @class */ (function () {
        function NzAutocompleteComponent(changeDetectorRef, ngZone, noAnimation) {
            var _this = this;
            this.changeDetectorRef = changeDetectorRef;
            this.ngZone = ngZone;
            this.noAnimation = noAnimation;
            this.nzOverlayClassName = '';
            this.nzOverlayStyle = {};
            this.nzDefaultActiveFirstOption = true;
            this.nzBackfill = false;
            this.compareWith = (/**
             * @param {?} o1
             * @param {?} o2
             * @return {?}
             */
            function (o1, o2) { return o1 === o2; });
            this.selectionChange = new core.EventEmitter();
            this.showPanel = true;
            this.isOpen = false;
            this.activeItemIndex = -1;
            this.selectionChangeSubscription = rxjs.Subscription.EMPTY;
            this.optionMouseEnterSubscription = rxjs.Subscription.EMPTY;
            this.dataSourceChangeSubscription = rxjs.Subscription.EMPTY;
            /**
             * Options changes listener
             */
            this.optionSelectionChanges = rxjs.defer((/**
             * @return {?}
             */
            function () {
                if (_this.options) {
                    return rxjs.merge.apply(void 0, __spread(_this.options.map((/**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) { return option.selectionChange; }))));
                }
                return _this.ngZone.onStable.asObservable().pipe(operators.take(1), operators.switchMap((/**
                 * @return {?}
                 */
                function () { return _this.optionSelectionChanges; })));
            }));
            this.optionMouseEnter = rxjs.defer((/**
             * @return {?}
             */
            function () {
                if (_this.options) {
                    return rxjs.merge.apply(void 0, __spread(_this.options.map((/**
                     * @param {?} option
                     * @return {?}
                     */
                    function (option) { return option.mouseEntered; }))));
                }
                return _this.ngZone.onStable.asObservable().pipe(operators.take(1), operators.switchMap((/**
                 * @return {?}
                 */
                function () { return _this.optionMouseEnter; })));
            }));
        }
        Object.defineProperty(NzAutocompleteComponent.prototype, "options", {
            /**
             * Options accessor, its source may be content or dataSource
             */
            get: /**
             * Options accessor, its source may be content or dataSource
             * @return {?}
             */
            function () {
                // first dataSource
                if (this.nzDataSource) {
                    return this.fromDataSourceOptions;
                }
                else {
                    return this.fromContentOptions;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzAutocompleteComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            if (!this.nzDataSource) {
                this.optionsInit();
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            if (this.nzDataSource) {
                this.optionsInit();
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.dataSourceChangeSubscription.unsubscribe();
            this.selectionChangeSubscription.unsubscribe();
            this.optionMouseEnterSubscription.unsubscribe();
        };
        /**
         * @return {?}
         */
        NzAutocompleteComponent.prototype.setVisibility = /**
         * @return {?}
         */
        function () {
            this.showPanel = !!this.options.length;
            this.changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} index
         * @return {?}
         */
        NzAutocompleteComponent.prototype.setActiveItem = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            /** @type {?} */
            var activeItem = this.options.toArray()[index];
            if (activeItem && !activeItem.active) {
                this.activeItem = activeItem;
                this.activeItemIndex = index;
                this.clearSelectedOptions(this.activeItem);
                this.activeItem.setActiveStyles();
                this.changeDetectorRef.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteComponent.prototype.setNextItemActive = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nextIndex = this.activeItemIndex + 1 <= this.options.length - 1 ? this.activeItemIndex + 1 : 0;
            this.setActiveItem(nextIndex);
        };
        /**
         * @return {?}
         */
        NzAutocompleteComponent.prototype.setPreviousItemActive = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var previousIndex = this.activeItemIndex - 1 < 0 ? this.options.length - 1 : this.activeItemIndex - 1;
            this.setActiveItem(previousIndex);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzAutocompleteComponent.prototype.getOptionIndex = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            return (/** @type {?} */ (this.options.reduce((/**
             * @param {?} result
             * @param {?} current
             * @param {?} index
             * @return {?}
             */
            function (result, current, index) {
                return result === -1 ? (_this.compareWith(value, current.nzValue) ? index : -1) : result;
            }), -1)));
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzAutocompleteComponent.prototype.getOption = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            return this.options.find((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.compareWith(value, item.nzValue); })) || null;
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteComponent.prototype.optionsInit = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.setVisibility();
            this.subscribeOptionChanges();
            /** @type {?} */
            var changes = this.nzDataSource ? this.fromDataSourceOptions.changes : this.fromContentOptions.changes;
            // async
            this.dataSourceChangeSubscription = changes.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (!e.dirty && _this.isOpen) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () { return _this.setVisibility(); }));
                }
                _this.subscribeOptionChanges();
            }));
        };
        /**
         * Clear the status of options
         */
        /**
         * Clear the status of options
         * @param {?=} skip
         * @param {?=} deselect
         * @return {?}
         */
        NzAutocompleteComponent.prototype.clearSelectedOptions = /**
         * Clear the status of options
         * @param {?=} skip
         * @param {?=} deselect
         * @return {?}
         */
        function (skip, deselect) {
            if (deselect === void 0) { deselect = false; }
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (option !== skip) {
                    if (deselect) {
                        option.deselect();
                    }
                    option.setInactiveStyles();
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteComponent.prototype.subscribeOptionChanges = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.selectionChangeSubscription.unsubscribe();
            this.selectionChangeSubscription = this.optionSelectionChanges
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.isUserInput; })))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event.source.select();
                event.source.setActiveStyles();
                _this.activeItem = event.source;
                _this.activeItemIndex = _this.getOptionIndex(_this.activeItem.nzValue);
                _this.clearSelectedOptions(event.source, true);
                _this.selectionChange.emit(event.source);
            }));
            this.optionMouseEnterSubscription.unsubscribe();
            this.optionMouseEnterSubscription = this.optionMouseEnter.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event.setActiveStyles();
                _this.activeItem = event;
                _this.activeItemIndex = _this.getOptionIndex(_this.activeItem.nzValue);
                _this.clearSelectedOptions(event);
            }));
        };
        NzAutocompleteComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-autocomplete',
                        exportAs: 'nzAutocomplete',
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <ng-template>\n      <div\n        #panel\n        class=\"ant-select-dropdown ant-select-dropdown-placement-bottomLeft\"\n        [class.ant-select-dropdown-hidden]=\"!showPanel\"\n        [ngClass]=\"nzOverlayClassName\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@slideMotion]=\"'enter'\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n      >\n        <div style=\"max-height: 256px; overflow-y: auto; overflow-anchor: none;\">\n          <div style=\"display: flex; flex-direction: column;\">\n            <ng-template *ngTemplateOutlet=\"nzDataSource ? optionsTemplate : contentTemplate\"></ng-template>\n          </div>\n        </div>\n      </div>\n      <ng-template #contentTemplate>\n        <ng-content></ng-content>\n      </ng-template>\n      <ng-template #optionsTemplate>\n        <nz-auto-option\n          *ngFor=\"let option of nzDataSource!\"\n          [nzValue]=\"option\"\n          [nzLabel]=\"option && $any(option).label ? $any(option).label : $any(option)\"\n        >\n          {{ option && $any(option).label ? $any(option).label : $any(option) }}\n        </nz-auto-option>\n      </ng-template>\n    </ng-template>\n  ",
                        animations: [animation.slideMotion]
                    }] }
        ];
        /** @nocollapse */
        NzAutocompleteComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzAutocompleteComponent.propDecorators = {
            nzWidth: [{ type: core.Input }],
            nzOverlayClassName: [{ type: core.Input }],
            nzOverlayStyle: [{ type: core.Input }],
            nzDefaultActiveFirstOption: [{ type: core.Input }],
            nzBackfill: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            nzDataSource: [{ type: core.Input }],
            selectionChange: [{ type: core.Output }],
            fromContentOptions: [{ type: core.ContentChildren, args: [NzAutocompleteOptionComponent, { descendants: true },] }],
            fromDataSourceOptions: [{ type: core.ViewChildren, args: [NzAutocompleteOptionComponent,] }],
            template: [{ type: core.ViewChild, args: [core.TemplateRef, { static: false },] }],
            panel: [{ type: core.ViewChild, args: ['panel', { static: false },] }],
            content: [{ type: core.ViewChild, args: ['content', { static: false },] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzAutocompleteComponent.prototype, "nzDefaultActiveFirstOption", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzAutocompleteComponent.prototype, "nzBackfill", void 0);
        return NzAutocompleteComponent;
    }());
    if (false) {
        /** @type {?} */
        NzAutocompleteComponent.ngAcceptInputType_nzDefaultActiveFirstOption;
        /** @type {?} */
        NzAutocompleteComponent.ngAcceptInputType_nzBackfill;
        /** @type {?} */
        NzAutocompleteComponent.prototype.nzWidth;
        /** @type {?} */
        NzAutocompleteComponent.prototype.nzOverlayClassName;
        /** @type {?} */
        NzAutocompleteComponent.prototype.nzOverlayStyle;
        /** @type {?} */
        NzAutocompleteComponent.prototype.nzDefaultActiveFirstOption;
        /** @type {?} */
        NzAutocompleteComponent.prototype.nzBackfill;
        /** @type {?} */
        NzAutocompleteComponent.prototype.compareWith;
        /** @type {?} */
        NzAutocompleteComponent.prototype.nzDataSource;
        /** @type {?} */
        NzAutocompleteComponent.prototype.selectionChange;
        /** @type {?} */
        NzAutocompleteComponent.prototype.showPanel;
        /** @type {?} */
        NzAutocompleteComponent.prototype.isOpen;
        /** @type {?} */
        NzAutocompleteComponent.prototype.activeItem;
        /**
         * Provided by content
         * @type {?}
         */
        NzAutocompleteComponent.prototype.fromContentOptions;
        /**
         * Provided by dataSource
         * @type {?}
         */
        NzAutocompleteComponent.prototype.fromDataSourceOptions;
        /**
         * cdk-overlay
         * @type {?}
         */
        NzAutocompleteComponent.prototype.template;
        /** @type {?} */
        NzAutocompleteComponent.prototype.panel;
        /** @type {?} */
        NzAutocompleteComponent.prototype.content;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteComponent.prototype.activeItemIndex;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteComponent.prototype.selectionChangeSubscription;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteComponent.prototype.optionMouseEnterSubscription;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteComponent.prototype.dataSourceChangeSubscription;
        /**
         * Options changes listener
         * @type {?}
         */
        NzAutocompleteComponent.prototype.optionSelectionChanges;
        /** @type {?} */
        NzAutocompleteComponent.prototype.optionMouseEnter;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteComponent.prototype.changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteComponent.prototype.ngZone;
        /** @type {?} */
        NzAutocompleteComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: autocomplete-trigger.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_AUTOCOMPLETE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return NzAutocompleteTriggerDirective; })),
        multi: true
    };
    /**
     * @return {?}
     */
    function getNzAutocompleteMissingPanelError() {
        return Error('Attempting to open an undefined instance of `nz-autocomplete`. ' +
            'Make sure that the id passed to the `nzAutocomplete` is correct and that ' +
            "you're attempting to open it after the ngAfterContentInit hook.");
    }
    var NzAutocompleteTriggerDirective = /** @class */ (function () {
        function NzAutocompleteTriggerDirective(elementRef, overlay, viewContainerRef, nzInputGroupWhitSuffixOrPrefixDirective, document) {
            this.elementRef = elementRef;
            this.overlay = overlay;
            this.viewContainerRef = viewContainerRef;
            this.nzInputGroupWhitSuffixOrPrefixDirective = nzInputGroupWhitSuffixOrPrefixDirective;
            this.document = document;
            this.onChange = (/**
             * @return {?}
             */
            function () { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            this.panelOpen = false;
            this.destroy$ = new rxjs.Subject();
            this.overlayRef = null;
            this.portal = null;
            this.previousValue = null;
        }
        Object.defineProperty(NzAutocompleteTriggerDirective.prototype, "activeOption", {
            /** Current active option */
            get: /**
             * Current active option
             * @return {?}
             */
            function () {
                if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
                    return this.nzAutocomplete.activeItem;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyPanel();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            Promise.resolve(null).then((/**
             * @return {?}
             */
            function () { return _this.setTriggerValue(value); }));
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.registerOnChange = /**
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
        NzAutocompleteTriggerDirective.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            /** @type {?} */
            var element = this.elementRef.nativeElement;
            element.disabled = isDisabled;
            this.closePanel();
        };
        /**
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.openPanel = /**
         * @return {?}
         */
        function () {
            this.previousValue = this.elementRef.nativeElement.value;
            this.attachOverlay();
            this.updateStatus();
        };
        /**
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.closePanel = /**
         * @return {?}
         */
        function () {
            if (this.panelOpen) {
                this.nzAutocomplete.isOpen = this.panelOpen = false;
                if (this.overlayRef && this.overlayRef.hasAttached()) {
                    this.selectionChangeSubscription.unsubscribe();
                    this.overlayBackdropClickSubscription.unsubscribe();
                    this.optionsChangeSubscription.unsubscribe();
                    this.overlayRef.dispose();
                    this.overlayRef = null;
                    this.portal = null;
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.handleKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var keyCode = event.keyCode;
            /** @type {?} */
            var isArrowKey = keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW;
            if (keyCode === keycodes.ESCAPE) {
                event.preventDefault();
            }
            if (this.panelOpen && (keyCode === keycodes.ESCAPE || keyCode === keycodes.TAB)) {
                // Reset value when tab / ESC close
                if (this.activeOption && this.activeOption.getLabel() !== this.previousValue) {
                    this.setTriggerValue(this.previousValue);
                }
                this.closePanel();
            }
            else if (this.panelOpen && keyCode === keycodes.ENTER) {
                if (this.nzAutocomplete.showPanel && this.activeOption) {
                    event.preventDefault();
                    this.activeOption.selectViaInteraction();
                }
            }
            else if (this.panelOpen && isArrowKey && this.nzAutocomplete.showPanel) {
                event.stopPropagation();
                event.preventDefault();
                if (keyCode === keycodes.UP_ARROW) {
                    this.nzAutocomplete.setPreviousItemActive();
                }
                else {
                    this.nzAutocomplete.setNextItemActive();
                }
                if (this.activeOption) {
                    this.activeOption.scrollIntoViewIfNeeded();
                }
                this.doBackfill();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.handleInput = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = (/** @type {?} */ (event.target));
            /** @type {?} */
            var document = (/** @type {?} */ (this.document));
            /** @type {?} */
            var value = target.value;
            if (target.type === 'number') {
                value = value === '' ? null : parseFloat(value);
            }
            if (this.previousValue !== value) {
                this.previousValue = value;
                this.onChange(value);
                if (this.canOpen() && document.activeElement === event.target) {
                    this.openPanel();
                }
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.handleFocus = /**
         * @return {?}
         */
        function () {
            if (this.canOpen()) {
                this.openPanel();
            }
        };
        /**
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.handleBlur = /**
         * @return {?}
         */
        function () {
            this.onTouched();
        };
        /**
         * Subscription data source changes event
         */
        /**
         * Subscription data source changes event
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.subscribeOptionsChange = /**
         * Subscription data source changes event
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var optionChanges = this.nzAutocomplete.options.changes.pipe(operators.tap((/**
             * @return {?}
             */
            function () { return _this.positionStrategy.reapplyLastPosition(); })), operators.delay(0));
            return optionChanges.subscribe((/**
             * @return {?}
             */
            function () {
                _this.resetActiveItem();
                if (_this.panelOpen) {
                    (/** @type {?} */ (_this.overlayRef)).updatePosition();
                }
            }));
        };
        /**
         * Subscription option changes event and set the value
         */
        /**
         * Subscription option changes event and set the value
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.subscribeSelectionChange = /**
         * Subscription option changes event and set the value
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return this.nzAutocomplete.selectionChange.subscribe((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                _this.setValueAndClose(option);
            }));
        };
        /**
         * Subscription external click and close panel
         */
        /**
         * Subscription external click and close panel
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.subscribeOverlayBackdropClick = /**
         * Subscription external click and close panel
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return rxjs.merge(rxjs.fromEvent(this.document, 'click'), rxjs.fromEvent(this.document, 'touchend')).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var clickTarget = (/** @type {?} */ (event.target));
                // Make sure is not self
                if (clickTarget !== _this.elementRef.nativeElement && !(/** @type {?} */ (_this.overlayRef)).overlayElement.contains(clickTarget) && _this.panelOpen) {
                    _this.closePanel();
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.attachOverlay = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.nzAutocomplete) {
                throw getNzAutocompleteMissingPanelError();
            }
            if (!this.portal && this.nzAutocomplete.template) {
                this.portal = new portal.TemplatePortal(this.nzAutocomplete.template, this.viewContainerRef);
            }
            if (!this.overlayRef) {
                this.overlayRef = this.overlay.create(this.getOverlayConfig());
            }
            if (this.overlayRef && !this.overlayRef.hasAttached()) {
                this.overlayRef.attach(this.portal);
                this.selectionChangeSubscription = this.subscribeSelectionChange();
                this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
                this.optionsChangeSubscription = this.subscribeOptionsChange();
                this.overlayRef
                    .detachments()
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.closePanel();
                }));
            }
            this.nzAutocomplete.isOpen = this.panelOpen = true;
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.updateStatus = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.overlayRef) {
                this.overlayRef.updateSize({ width: this.nzAutocomplete.nzWidth || this.getHostWidth() });
            }
            this.nzAutocomplete.setVisibility();
            this.resetActiveItem();
            if (this.activeOption) {
                this.activeOption.scrollIntoViewIfNeeded();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.destroyPanel = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.overlayRef) {
                this.closePanel();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.getOverlayConfig = /**
         * @private
         * @return {?}
         */
        function () {
            return new overlay.OverlayConfig({
                positionStrategy: this.getOverlayPosition(),
                disposeOnNavigation: true,
                scrollStrategy: this.overlay.scrollStrategies.reposition(),
                // default host element width
                width: this.nzAutocomplete.nzWidth || this.getHostWidth()
            });
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.getConnectedElement = /**
         * @private
         * @return {?}
         */
        function () {
            return this.nzInputGroupWhitSuffixOrPrefixDirective ? this.nzInputGroupWhitSuffixOrPrefixDirective.elementRef : this.elementRef;
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.getHostWidth = /**
         * @private
         * @return {?}
         */
        function () {
            return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.getOverlayPosition = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var positions = [
                new overlay.ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
                new overlay.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            ];
            this.positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(this.getConnectedElement())
                .withFlexibleDimensions(false)
                .withPush(false)
                .withPositions(positions)
                .withTransformOriginOn('.ant-select-dropdown');
            return this.positionStrategy;
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.resetActiveItem = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = this.nzAutocomplete.getOptionIndex(this.previousValue);
            this.nzAutocomplete.clearSelectedOptions(null, true);
            if (index !== -1) {
                this.nzAutocomplete.setActiveItem(index);
                this.nzAutocomplete.activeItem.select(false);
            }
            else {
                this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
            }
        };
        /**
         * @private
         * @param {?} option
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.setValueAndClose = /**
         * @private
         * @param {?} option
         * @return {?}
         */
        function (option) {
            /** @type {?} */
            var value = option.nzValue;
            this.setTriggerValue(option.getLabel());
            this.onChange(value);
            this.elementRef.nativeElement.focus();
            this.closePanel();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.setTriggerValue = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var option = this.nzAutocomplete.getOption(value);
            /** @type {?} */
            var displayValue = option ? option.getLabel() : value;
            this.elementRef.nativeElement.value = displayValue != null ? displayValue : '';
            if (!this.nzAutocomplete.nzBackfill) {
                this.previousValue = displayValue;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.doBackfill = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.nzAutocomplete.nzBackfill && this.nzAutocomplete.activeItem) {
                this.setTriggerValue(this.nzAutocomplete.activeItem.getLabel());
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzAutocompleteTriggerDirective.prototype.canOpen = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var element = this.elementRef.nativeElement;
            return !element.readOnly && !element.disabled;
        };
        NzAutocompleteTriggerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: "input[nzAutocomplete], textarea[nzAutocomplete]",
                        exportAs: 'nzAutocompleteTrigger',
                        providers: [NZ_AUTOCOMPLETE_VALUE_ACCESSOR],
                        host: {
                            autocomplete: 'off',
                            'aria-autocomplete': 'list',
                            '(focusin)': 'handleFocus()',
                            '(blur)': 'handleBlur()',
                            '(input)': 'handleInput($event)',
                            '(keydown)': 'handleKeydown($event)'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzAutocompleteTriggerDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: overlay.Overlay },
            { type: core.ViewContainerRef },
            { type: input.NzInputGroupWhitSuffixOrPrefixDirective, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        NzAutocompleteTriggerDirective.propDecorators = {
            nzAutocomplete: [{ type: core.Input }]
        };
        return NzAutocompleteTriggerDirective;
    }());
    if (false) {
        /**
         * Bind nzAutocomplete component
         * @type {?}
         */
        NzAutocompleteTriggerDirective.prototype.nzAutocomplete;
        /** @type {?} */
        NzAutocompleteTriggerDirective.prototype.onChange;
        /** @type {?} */
        NzAutocompleteTriggerDirective.prototype.onTouched;
        /** @type {?} */
        NzAutocompleteTriggerDirective.prototype.panelOpen;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.portal;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.positionStrategy;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.previousValue;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.selectionChangeSubscription;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.optionsChangeSubscription;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.overlayBackdropClickSubscription;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.nzInputGroupWhitSuffixOrPrefixDirective;
        /**
         * @type {?}
         * @private
         */
        NzAutocompleteTriggerDirective.prototype.document;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: autocomplete.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzAutocompleteModule = /** @class */ (function () {
        function NzAutocompleteModule() {
        }
        NzAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzAutocompleteComponent, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective, NzAutocompleteOptgroupComponent],
                        exports: [NzAutocompleteComponent, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective, NzAutocompleteOptgroupComponent],
                        imports: [common.CommonModule, overlay.OverlayModule, forms.FormsModule, outlet.NzOutletModule, noAnimation.NzNoAnimationModule, input.NzInputModule]
                    },] }
        ];
        return NzAutocompleteModule;
    }());

    exports.NZ_AUTOCOMPLETE_VALUE_ACCESSOR = NZ_AUTOCOMPLETE_VALUE_ACCESSOR;
    exports.NzAutocompleteComponent = NzAutocompleteComponent;
    exports.NzAutocompleteModule = NzAutocompleteModule;
    exports.NzAutocompleteOptgroupComponent = NzAutocompleteOptgroupComponent;
    exports.NzAutocompleteOptionComponent = NzAutocompleteOptionComponent;
    exports.NzAutocompleteTriggerDirective = NzAutocompleteTriggerDirective;
    exports.NzOptionSelectionChange = NzOptionSelectionChange;
    exports.getNzAutocompleteMissingPanelError = getNzAutocompleteMissingPanelError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-auto-complete.umd.js.map
