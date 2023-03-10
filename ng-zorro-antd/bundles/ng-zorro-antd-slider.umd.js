(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/keycodes'), require('@angular/cdk/platform'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/tooltip'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/slider', ['exports', '@angular/cdk/keycodes', '@angular/cdk/platform', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/tooltip', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].slider = {}), global.ng.cdk.keycodes, global.ng.cdk.platform, global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].tooltip, global.ng.common));
}(this, (function (exports, keycodes, platform, core, forms, util, rxjs, operators, tooltip, common) { 'use strict';

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
     * Generated from: slider.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSliderService = /** @class */ (function () {
        function NzSliderService() {
            this.isDragging = false;
        }
        NzSliderService.decorators = [
            { type: core.Injectable }
        ];
        return NzSliderService;
    }());
    if (false) {
        /** @type {?} */
        NzSliderService.prototype.isDragging;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: handle.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSliderHandleComponent = /** @class */ (function () {
        function NzSliderHandleComponent(sliderService, cdr) {
            var _this = this;
            this.sliderService = sliderService;
            this.cdr = cdr;
            this.tooltipVisible = 'default';
            this.active = false;
            this.style = {};
            this.enterHandle = (/**
             * @return {?}
             */
            function () {
                if (!_this.sliderService.isDragging) {
                    _this.toggleTooltip(true);
                    _this.updateTooltipPosition();
                    _this.cdr.detectChanges();
                }
            });
            this.leaveHandle = (/**
             * @return {?}
             */
            function () {
                if (!_this.sliderService.isDragging) {
                    _this.toggleTooltip(false);
                    _this.cdr.detectChanges();
                }
            });
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSliderHandleComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            var offset = changes.offset, value = changes.value, active = changes.active, tooltipVisible = changes.tooltipVisible, reverse = changes.reverse;
            if (offset || reverse) {
                this.updateStyle();
            }
            if (value) {
                this.updateTooltipTitle();
                this.updateTooltipPosition();
            }
            if (active) {
                if (active.currentValue) {
                    this.toggleTooltip(true);
                }
                else {
                    this.toggleTooltip(false);
                }
            }
            if ((tooltipVisible === null || tooltipVisible === void 0 ? void 0 : tooltipVisible.currentValue) === 'always') {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { return _this.toggleTooltip(true, true); }));
            }
        };
        /**
         * @return {?}
         */
        NzSliderHandleComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            var _a;
            (_a = this.handleEl) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        };
        /**
         * @private
         * @param {?} show
         * @param {?=} force
         * @return {?}
         */
        NzSliderHandleComponent.prototype.toggleTooltip = /**
         * @private
         * @param {?} show
         * @param {?=} force
         * @return {?}
         */
        function (show, force) {
            if (force === void 0) { force = false; }
            var _a, _b;
            if (!force && (this.tooltipVisible !== 'default' || !this.tooltip)) {
                return;
            }
            if (show) {
                (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.show();
            }
            else {
                (_b = this.tooltip) === null || _b === void 0 ? void 0 : _b.hide();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderHandleComponent.prototype.updateTooltipTitle = /**
         * @private
         * @return {?}
         */
        function () {
            this.tooltipTitle = this.tooltipFormatter ? this.tooltipFormatter((/** @type {?} */ (this.value))) : "" + this.value;
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderHandleComponent.prototype.updateTooltipPosition = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.tooltip) {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { var _a; return (_a = _this.tooltip) === null || _a === void 0 ? void 0 : _a.updatePosition(); }));
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderHandleComponent.prototype.updateStyle = /**
         * @private
         * @return {?}
         */
        function () {
            var _a, _b;
            /** @type {?} */
            var vertical = this.vertical;
            /** @type {?} */
            var reverse = this.reverse;
            /** @type {?} */
            var offset = this.offset;
            /** @type {?} */
            var positionStyle = vertical
                ? (_a = {},
                    _a[reverse ? 'top' : 'bottom'] = offset + "%",
                    _a[reverse ? 'bottom' : 'top'] = 'auto',
                    _a.transform = reverse ? null : "translateY(+50%)",
                    _a) : (_b = {},
                _b[reverse ? 'right' : 'left'] = offset + "%",
                _b[reverse ? 'left' : 'right'] = 'auto',
                _b.transform = "translateX(" + (reverse ? '+' : '-') + "50%)",
                _b);
            this.style = positionStyle;
            this.cdr.markForCheck();
        };
        NzSliderHandleComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-slider-handle',
                        exportAs: 'nzSliderHandle',
                        preserveWhitespaces: false,
                        template: "\n    <div\n      #handle\n      class=\"ant-slider-handle\"\n      tabindex=\"0\"\n      nz-tooltip\n      [ngStyle]=\"style\"\n      [nzTooltipTitle]=\"tooltipFormatter === null || tooltipVisible === 'never' ? null : tooltipTitle\"\n      [nzTooltipTrigger]=\"null\"\n      [nzTooltipPlacement]=\"tooltipPlacement\"\n    ></div>\n  ",
                        host: {
                            '(mouseenter)': 'enterHandle()',
                            '(mouseleave)': 'leaveHandle()'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSliderHandleComponent.ctorParameters = function () { return [
            { type: NzSliderService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzSliderHandleComponent.propDecorators = {
            handleEl: [{ type: core.ViewChild, args: ['handle', { static: false },] }],
            tooltip: [{ type: core.ViewChild, args: [tooltip.NzTooltipDirective, { static: false },] }],
            vertical: [{ type: core.Input }],
            reverse: [{ type: core.Input }],
            offset: [{ type: core.Input }],
            value: [{ type: core.Input }],
            tooltipVisible: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipFormatter: [{ type: core.Input }],
            active: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderHandleComponent.prototype, "active", void 0);
        return NzSliderHandleComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSliderHandleComponent.ngAcceptInputType_active;
        /** @type {?} */
        NzSliderHandleComponent.prototype.handleEl;
        /** @type {?} */
        NzSliderHandleComponent.prototype.tooltip;
        /** @type {?} */
        NzSliderHandleComponent.prototype.vertical;
        /** @type {?} */
        NzSliderHandleComponent.prototype.reverse;
        /** @type {?} */
        NzSliderHandleComponent.prototype.offset;
        /** @type {?} */
        NzSliderHandleComponent.prototype.value;
        /** @type {?} */
        NzSliderHandleComponent.prototype.tooltipVisible;
        /** @type {?} */
        NzSliderHandleComponent.prototype.tooltipPlacement;
        /** @type {?} */
        NzSliderHandleComponent.prototype.tooltipFormatter;
        /** @type {?} */
        NzSliderHandleComponent.prototype.active;
        /** @type {?} */
        NzSliderHandleComponent.prototype.tooltipTitle;
        /** @type {?} */
        NzSliderHandleComponent.prototype.style;
        /** @type {?} */
        NzSliderHandleComponent.prototype.enterHandle;
        /** @type {?} */
        NzSliderHandleComponent.prototype.leaveHandle;
        /**
         * @type {?}
         * @private
         */
        NzSliderHandleComponent.prototype.sliderService;
        /**
         * @type {?}
         * @private
         */
        NzSliderHandleComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: slider.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSliderComponent = /** @class */ (function () {
        function NzSliderComponent(sliderService, cdr, platform) {
            this.sliderService = sliderService;
            this.cdr = cdr;
            this.platform = platform;
            this.nzDisabled = false;
            this.nzDots = false;
            this.nzIncluded = true;
            this.nzRange = false;
            this.nzVertical = false;
            this.nzReverse = false;
            this.nzMarks = null;
            this.nzMax = 100;
            this.nzMin = 0;
            this.nzStep = 1;
            this.nzTooltipVisible = 'default';
            this.nzTooltipPlacement = 'top';
            this.nzOnAfterChange = new core.EventEmitter();
            this.value = null;
            this.cacheSliderStart = null;
            this.cacheSliderLength = null;
            this.activeValueIndex = undefined; // Current activated handle's index ONLY for range=true
            // Current activated handle's index ONLY for range=true
            this.track = { offset: null, length: null }; // Track's offset and length
            // Track's offset and length
            this.handles = []; // Handles' offset
            // Handles' offset
            this.marksArray = null; // "steps" in array type with more data & FILTER out the invalid mark
            // "steps" in array type with more data & FILTER out the invalid mark
            this.bounds = { lower: null, upper: null }; // now for nz-slider-step
        }
        /**
         * @return {?}
         */
        NzSliderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.handles = generateHandlers(this.nzRange ? 2 : 1);
            this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
            this.bindDraggingHandlers();
            this.toggleDragDisabled(this.nzDisabled);
            if (this.getValue() === null) {
                this.setValue(this.formatValue(null));
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSliderComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzDisabled = changes.nzDisabled, nzMarks = changes.nzMarks, nzRange = changes.nzRange;
            if (nzDisabled && !nzDisabled.firstChange) {
                this.toggleDragDisabled(nzDisabled.currentValue);
            }
            else if (nzMarks && !nzMarks.firstChange) {
                this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
            }
            else if (nzRange && !nzRange.firstChange) {
                this.setValue(this.formatValue(null));
            }
        };
        /**
         * @return {?}
         */
        NzSliderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.unsubscribeDrag();
        };
        /**
         * @param {?} val
         * @return {?}
         */
        NzSliderComponent.prototype.writeValue = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.setValue(val, true);
        };
        /**
         * @param {?} _value
         * @return {?}
         */
        NzSliderComponent.prototype.onValueChange = /**
         * @param {?} _value
         * @return {?}
         */
        function (_value) { };
        /**
         * @return {?}
         */
        NzSliderComponent.prototype.onTouched = /**
         * @return {?}
         */
        function () { };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzSliderComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onValueChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzSliderComponent.prototype.registerOnTouched = /**
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
        NzSliderComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.nzDisabled = isDisabled;
            this.toggleDragDisabled(isDisabled);
        };
        /**
         * Event handler is only triggered when a slider handler is focused.
         */
        /**
         * Event handler is only triggered when a slider handler is focused.
         * @param {?} e
         * @return {?}
         */
        NzSliderComponent.prototype.onKeyDown = /**
         * Event handler is only triggered when a slider handler is focused.
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var code = e.keyCode;
            /** @type {?} */
            var isIncrease = code === keycodes.RIGHT_ARROW || code === keycodes.UP_ARROW;
            /** @type {?} */
            var isDecrease = code === keycodes.LEFT_ARROW || code === keycodes.DOWN_ARROW;
            if (!(isIncrease || isDecrease)) {
                return;
            }
            e.preventDefault();
            /** @type {?} */
            var step = (isDecrease ? -this.nzStep : this.nzStep) * (this.nzReverse ? -1 : 1);
            /** @type {?} */
            var newVal = this.nzRange ? ((/** @type {?} */ (this.value)))[(/** @type {?} */ (this.activeValueIndex))] + step : ((/** @type {?} */ (this.value))) + step;
            this.setActiveValue(util.ensureNumberInRange(newVal, this.nzMin, this.nzMax));
        };
        /**
         * @private
         * @param {?} value
         * @param {?=} isWriteValue
         * @return {?}
         */
        NzSliderComponent.prototype.setValue = /**
         * @private
         * @param {?} value
         * @param {?=} isWriteValue
         * @return {?}
         */
        function (value, isWriteValue) {
            if (isWriteValue === void 0) { isWriteValue = false; }
            if (isWriteValue) {
                this.value = this.formatValue(value);
                this.updateTrackAndHandles();
            }
            else if (!valuesEqual((/** @type {?} */ (this.value)), (/** @type {?} */ (value)))) {
                this.value = value;
                this.updateTrackAndHandles();
                this.onValueChange(this.getValue(true));
            }
        };
        /**
         * @private
         * @param {?=} cloneAndSort
         * @return {?}
         */
        NzSliderComponent.prototype.getValue = /**
         * @private
         * @param {?=} cloneAndSort
         * @return {?}
         */
        function (cloneAndSort) {
            if (cloneAndSort === void 0) { cloneAndSort = false; }
            if (cloneAndSort && this.value && isValueRange(this.value)) {
                return __spread(this.value).sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a - b; }));
            }
            return (/** @type {?} */ (this.value));
        };
        /**
         * Clone & sort current value and convert them to offsets, then return the new one.
         */
        /**
         * Clone & sort current value and convert them to offsets, then return the new one.
         * @private
         * @param {?=} value
         * @return {?}
         */
        NzSliderComponent.prototype.getValueToOffset = /**
         * Clone & sort current value and convert them to offsets, then return the new one.
         * @private
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            /** @type {?} */
            var normalizedValue = value;
            if (typeof normalizedValue === 'undefined') {
                normalizedValue = this.getValue(true);
            }
            return isValueRange(normalizedValue) ? normalizedValue.map((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return _this.valueToOffset(val); })) : this.valueToOffset(normalizedValue);
        };
        /**
         * Find the closest value to be activated.
         */
        /**
         * Find the closest value to be activated.
         * @private
         * @param {?} pointerValue
         * @return {?}
         */
        NzSliderComponent.prototype.setActiveValueIndex = /**
         * Find the closest value to be activated.
         * @private
         * @param {?} pointerValue
         * @return {?}
         */
        function (pointerValue) {
            /** @type {?} */
            var value = this.getValue();
            if (isValueRange(value)) {
                /** @type {?} */
                var minimal_1 = null;
                /** @type {?} */
                var gap_1;
                /** @type {?} */
                var activeIndex_1 = -1;
                value.forEach((/**
                 * @param {?} val
                 * @param {?} index
                 * @return {?}
                 */
                function (val, index) {
                    gap_1 = Math.abs(pointerValue - val);
                    if (minimal_1 === null || gap_1 < (/** @type {?} */ (minimal_1))) {
                        minimal_1 = gap_1;
                        activeIndex_1 = index;
                    }
                }));
                this.activeValueIndex = activeIndex_1;
                this.handlerComponents.toArray()[activeIndex_1].focus();
            }
            else {
                this.handlerComponents.toArray()[0].focus();
            }
        };
        /**
         * @private
         * @param {?} pointerValue
         * @return {?}
         */
        NzSliderComponent.prototype.setActiveValue = /**
         * @private
         * @param {?} pointerValue
         * @return {?}
         */
        function (pointerValue) {
            if (isValueRange((/** @type {?} */ (this.value)))) {
                /** @type {?} */
                var newValue = __spread(((/** @type {?} */ (this.value))));
                newValue[(/** @type {?} */ (this.activeValueIndex))] = pointerValue;
                this.setValue(newValue);
            }
            else {
                this.setValue(pointerValue);
            }
        };
        /**
         * Update track and handles' position and length.
         */
        /**
         * Update track and handles' position and length.
         * @private
         * @return {?}
         */
        NzSliderComponent.prototype.updateTrackAndHandles = /**
         * Update track and handles' position and length.
         * @private
         * @return {?}
         */
        function () {
            var _a, _b;
            /** @type {?} */
            var value = this.getValue();
            /** @type {?} */
            var offset = this.getValueToOffset(value);
            /** @type {?} */
            var valueSorted = this.getValue(true);
            /** @type {?} */
            var offsetSorted = this.getValueToOffset(valueSorted);
            /** @type {?} */
            var boundParts = isValueRange(valueSorted) ? valueSorted : [0, valueSorted];
            /** @type {?} */
            var trackParts = isValueRange(offsetSorted) ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]] : [0, offsetSorted];
            this.handles.forEach((/**
             * @param {?} handle
             * @param {?} index
             * @return {?}
             */
            function (handle, index) {
                handle.offset = isValueRange(offset) ? offset[index] : offset;
                handle.value = isValueRange(value) ? value[index] : value || 0;
            }));
            _a = __read(boundParts, 2), this.bounds.lower = _a[0], this.bounds.upper = _a[1];
            _b = __read(trackParts, 2), this.track.offset = _b[0], this.track.length = _b[1];
            this.cdr.markForCheck();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzSliderComponent.prototype.onDragStart = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.toggleDragMoving(true);
            this.cacheSliderProperty();
            this.setActiveValueIndex(this.getLogicalValue(value));
            this.setActiveValue(this.getLogicalValue(value));
            this.showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzSliderComponent.prototype.onDragMove = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setActiveValue(this.getLogicalValue(value));
            this.cdr.markForCheck();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzSliderComponent.prototype.getLogicalValue = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return this.nzReverse ? this.nzMax - value : value;
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderComponent.prototype.onDragEnd = /**
         * @private
         * @return {?}
         */
        function () {
            this.nzOnAfterChange.emit(this.getValue(true));
            this.toggleDragMoving(false);
            this.cacheSliderProperty(true);
            this.hideAllHandleTooltip();
            this.cdr.markForCheck();
        };
        /**
         * Create user interactions handles.
         */
        /**
         * Create user interactions handles.
         * @private
         * @return {?}
         */
        NzSliderComponent.prototype.bindDraggingHandlers = /**
         * Create user interactions handles.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.platform.isBrowser) {
                return;
            }
            /** @type {?} */
            var sliderDOM = this.slider.nativeElement;
            /** @type {?} */
            var orientField = this.nzVertical ? 'pageY' : 'pageX';
            /** @type {?} */
            var mouse = {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup',
                pluckKey: [orientField]
            };
            /** @type {?} */
            var touch = {
                start: 'touchstart',
                move: 'touchmove',
                end: 'touchend',
                pluckKey: ['touches', '0', orientField],
                filter: (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e instanceof TouchEvent; })
            };
            [mouse, touch].forEach((/**
             * @param {?} source
             * @return {?}
             */
            function (source) {
                var start = source.start, move = source.move, end = source.end, pluckKey = source.pluckKey, _a = source.filter, filterFunc = _a === void 0 ? (/**
                 * @return {?}
                 */
                function () { return true; }) : _a;
                source.startPlucked$ = rxjs.fromEvent(sliderDOM, start).pipe(operators.filter(filterFunc), operators.tap(util.silentEvent), operators.pluck.apply(void 0, __spread(pluckKey)), operators.map((/**
                 * @param {?} position
                 * @return {?}
                 */
                function (position) { return _this.findClosestValue(position); })));
                source.end$ = rxjs.fromEvent(document, end);
                source.moveResolved$ = rxjs.fromEvent(document, move).pipe(operators.filter(filterFunc), operators.tap(util.silentEvent), operators.pluck.apply(void 0, __spread(pluckKey)), operators.distinctUntilChanged(), operators.map((/**
                 * @param {?} position
                 * @return {?}
                 */
                function (position) { return _this.findClosestValue(position); })), operators.distinctUntilChanged(), operators.takeUntil(source.end$));
            }));
            this.dragStart$ = rxjs.merge((/** @type {?} */ (mouse.startPlucked$)), (/** @type {?} */ (touch.startPlucked$)));
            this.dragMove$ = rxjs.merge((/** @type {?} */ (mouse.moveResolved$)), (/** @type {?} */ (touch.moveResolved$)));
            this.dragEnd$ = rxjs.merge((/** @type {?} */ (mouse.end$)), (/** @type {?} */ (touch.end$)));
        };
        /**
         * @private
         * @param {?=} periods
         * @return {?}
         */
        NzSliderComponent.prototype.subscribeDrag = /**
         * @private
         * @param {?=} periods
         * @return {?}
         */
        function (periods) {
            if (periods === void 0) { periods = ['start', 'move', 'end']; }
            if (periods.indexOf('start') !== -1 && this.dragStart$ && !this.dragStart_) {
                this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
            }
            if (periods.indexOf('move') !== -1 && this.dragMove$ && !this.dragMove_) {
                this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
            }
            if (periods.indexOf('end') !== -1 && this.dragEnd$ && !this.dragEnd_) {
                this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
            }
        };
        /**
         * @private
         * @param {?=} periods
         * @return {?}
         */
        NzSliderComponent.prototype.unsubscribeDrag = /**
         * @private
         * @param {?=} periods
         * @return {?}
         */
        function (periods) {
            if (periods === void 0) { periods = ['start', 'move', 'end']; }
            if (periods.indexOf('start') !== -1 && this.dragStart_) {
                this.dragStart_.unsubscribe();
                this.dragStart_ = null;
            }
            if (periods.indexOf('move') !== -1 && this.dragMove_) {
                this.dragMove_.unsubscribe();
                this.dragMove_ = null;
            }
            if (periods.indexOf('end') !== -1 && this.dragEnd_) {
                this.dragEnd_.unsubscribe();
                this.dragEnd_ = null;
            }
        };
        /**
         * @private
         * @param {?} movable
         * @return {?}
         */
        NzSliderComponent.prototype.toggleDragMoving = /**
         * @private
         * @param {?} movable
         * @return {?}
         */
        function (movable) {
            /** @type {?} */
            var periods = ['move', 'end'];
            if (movable) {
                this.sliderService.isDragging = true;
                this.subscribeDrag(periods);
            }
            else {
                this.sliderService.isDragging = false;
                this.unsubscribeDrag(periods);
            }
        };
        /**
         * @private
         * @param {?} disabled
         * @return {?}
         */
        NzSliderComponent.prototype.toggleDragDisabled = /**
         * @private
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            if (disabled) {
                this.unsubscribeDrag();
            }
            else {
                this.subscribeDrag(['start']);
            }
        };
        /**
         * @private
         * @param {?} position
         * @return {?}
         */
        NzSliderComponent.prototype.findClosestValue = /**
         * @private
         * @param {?} position
         * @return {?}
         */
        function (position) {
            /** @type {?} */
            var sliderStart = this.getSliderStartPosition();
            /** @type {?} */
            var sliderLength = this.getSliderLength();
            /** @type {?} */
            var ratio = util.ensureNumberInRange((position - sliderStart) / sliderLength, 0, 1);
            /** @type {?} */
            var val = (this.nzMax - this.nzMin) * (this.nzVertical ? 1 - ratio : ratio) + this.nzMin;
            /** @type {?} */
            var points = this.nzMarks === null ? [] : Object.keys(this.nzMarks).map(parseFloat);
            if (this.nzStep !== 0 && !this.nzDots) {
                /** @type {?} */
                var closestOne = Math.round(val / this.nzStep) * this.nzStep;
                points.push(closestOne);
            }
            /** @type {?} */
            var gaps = points.map((/**
             * @param {?} point
             * @return {?}
             */
            function (point) { return Math.abs(val - point); }));
            /** @type {?} */
            var closest = points[gaps.indexOf(Math.min.apply(Math, __spread(gaps)))];
            return this.nzStep === null ? closest : parseFloat(closest.toFixed(util.getPrecision(this.nzStep)));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzSliderComponent.prototype.valueToOffset = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return util.getPercent(this.nzMin, this.nzMax, value);
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderComponent.prototype.getSliderStartPosition = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.cacheSliderStart !== null) {
                return this.cacheSliderStart;
            }
            /** @type {?} */
            var offset = util.getElementOffset(this.slider.nativeElement);
            return this.nzVertical ? offset.top : offset.left;
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderComponent.prototype.getSliderLength = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.cacheSliderLength !== null) {
                return this.cacheSliderLength;
            }
            /** @type {?} */
            var sliderDOM = this.slider.nativeElement;
            return this.nzVertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
        };
        /**
         * Cache DOM layout/reflow operations for performance (may not necessary?)
         */
        /**
         * Cache DOM layout/reflow operations for performance (may not necessary?)
         * @private
         * @param {?=} remove
         * @return {?}
         */
        NzSliderComponent.prototype.cacheSliderProperty = /**
         * Cache DOM layout/reflow operations for performance (may not necessary?)
         * @private
         * @param {?=} remove
         * @return {?}
         */
        function (remove) {
            if (remove === void 0) { remove = false; }
            this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
            this.cacheSliderLength = remove ? null : this.getSliderLength();
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        NzSliderComponent.prototype.formatValue = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (!value) {
                return this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
            }
            else if (assertValueValid(value, this.nzRange)) {
                return isValueRange(value)
                    ? value.map((/**
                     * @param {?} val
                     * @return {?}
                     */
                    function (val) { return util.ensureNumberInRange(val, _this.nzMin, _this.nzMax); }))
                    : util.ensureNumberInRange(value, this.nzMin, this.nzMax);
            }
            else {
                return this.nzDefaultValue ? this.nzDefaultValue : this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
            }
        };
        /**
         * Show one handle's tooltip and hide others'.
         */
        /**
         * Show one handle's tooltip and hide others'.
         * @private
         * @param {?=} handleIndex
         * @return {?}
         */
        NzSliderComponent.prototype.showHandleTooltip = /**
         * Show one handle's tooltip and hide others'.
         * @private
         * @param {?=} handleIndex
         * @return {?}
         */
        function (handleIndex) {
            if (handleIndex === void 0) { handleIndex = 0; }
            this.handles.forEach((/**
             * @param {?} handle
             * @param {?} index
             * @return {?}
             */
            function (handle, index) {
                handle.active = index === handleIndex;
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderComponent.prototype.hideAllHandleTooltip = /**
         * @private
         * @return {?}
         */
        function () {
            this.handles.forEach((/**
             * @param {?} handle
             * @return {?}
             */
            function (handle) { return (handle.active = false); }));
        };
        /**
         * @private
         * @param {?} marks
         * @return {?}
         */
        NzSliderComponent.prototype.generateMarkItems = /**
         * @private
         * @param {?} marks
         * @return {?}
         */
        function (marks) {
            /** @type {?} */
            var marksArray = [];
            for (var key in marks) {
                /** @type {?} */
                var mark = marks[key];
                /** @type {?} */
                var val = typeof key === 'number' ? key : parseFloat(key);
                if (val >= this.nzMin && val <= this.nzMax) {
                    marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
                }
            }
            return marksArray.length ? marksArray : null;
        };
        NzSliderComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-slider',
                        exportAs: 'nzSlider',
                        preserveWhitespaces: false,
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NzSliderComponent; })),
                                multi: true
                            },
                            NzSliderService
                        ],
                        host: {
                            '(keydown)': 'onKeyDown($event)'
                        },
                        template: "\n    <div\n      #slider\n      class=\"ant-slider\"\n      [class.ant-slider-disabled]=\"nzDisabled\"\n      [class.ant-slider-vertical]=\"nzVertical\"\n      [class.ant-slider-with-marks]=\"marksArray\"\n    >\n      <div class=\"ant-slider-rail\"></div>\n      <nz-slider-track\n        [vertical]=\"nzVertical\"\n        [included]=\"nzIncluded\"\n        [offset]=\"track.offset!\"\n        [length]=\"track.length!\"\n        [reverse]=\"nzReverse\"\n      ></nz-slider-track>\n      <nz-slider-step\n        *ngIf=\"marksArray\"\n        [vertical]=\"nzVertical\"\n        [lowerBound]=\"$any(bounds.lower)\"\n        [upperBound]=\"$any(bounds.upper)\"\n        [marksArray]=\"marksArray\"\n        [included]=\"nzIncluded\"\n      ></nz-slider-step>\n      <nz-slider-handle\n        *ngFor=\"let handle of handles\"\n        [vertical]=\"nzVertical\"\n        [reverse]=\"nzReverse\"\n        [offset]=\"handle.offset!\"\n        [value]=\"handle.value!\"\n        [active]=\"handle.active\"\n        [tooltipFormatter]=\"nzTipFormatter\"\n        [tooltipVisible]=\"nzTooltipVisible\"\n        [tooltipPlacement]=\"nzTooltipPlacement\"\n      ></nz-slider-handle>\n      <nz-slider-marks\n        *ngIf=\"marksArray\"\n        [vertical]=\"nzVertical\"\n        [min]=\"nzMin\"\n        [max]=\"nzMax\"\n        [lowerBound]=\"$any(bounds.lower)\"\n        [upperBound]=\"$any(bounds.upper)\"\n        [marksArray]=\"marksArray\"\n        [included]=\"nzIncluded\"\n      ></nz-slider-marks>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzSliderComponent.ctorParameters = function () { return [
            { type: NzSliderService },
            { type: core.ChangeDetectorRef },
            { type: platform.Platform }
        ]; };
        NzSliderComponent.propDecorators = {
            slider: [{ type: core.ViewChild, args: ['slider', { static: true },] }],
            handlerComponents: [{ type: core.ViewChildren, args: [NzSliderHandleComponent,] }],
            nzDisabled: [{ type: core.Input }],
            nzDots: [{ type: core.Input }],
            nzIncluded: [{ type: core.Input }],
            nzRange: [{ type: core.Input }],
            nzVertical: [{ type: core.Input }],
            nzReverse: [{ type: core.Input }],
            nzDefaultValue: [{ type: core.Input }],
            nzMarks: [{ type: core.Input }],
            nzMax: [{ type: core.Input }],
            nzMin: [{ type: core.Input }],
            nzStep: [{ type: core.Input }],
            nzTooltipVisible: [{ type: core.Input }],
            nzTooltipPlacement: [{ type: core.Input }],
            nzTipFormatter: [{ type: core.Input }],
            nzOnAfterChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzSliderComponent.prototype, "nzDots", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzSliderComponent.prototype, "nzIncluded", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzSliderComponent.prototype, "nzRange", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzSliderComponent.prototype, "nzVertical", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzSliderComponent.prototype, "nzReverse", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Object)
        ], NzSliderComponent.prototype, "nzMax", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Object)
        ], NzSliderComponent.prototype, "nzMin", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Object)
        ], NzSliderComponent.prototype, "nzStep", void 0);
        return NzSliderComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzDots;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzIncluded;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzRange;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzVertical;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzMax;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzMin;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzStep;
        /** @type {?} */
        NzSliderComponent.ngAcceptInputType_nzReverse;
        /** @type {?} */
        NzSliderComponent.prototype.slider;
        /** @type {?} */
        NzSliderComponent.prototype.handlerComponents;
        /** @type {?} */
        NzSliderComponent.prototype.nzDisabled;
        /** @type {?} */
        NzSliderComponent.prototype.nzDots;
        /** @type {?} */
        NzSliderComponent.prototype.nzIncluded;
        /** @type {?} */
        NzSliderComponent.prototype.nzRange;
        /** @type {?} */
        NzSliderComponent.prototype.nzVertical;
        /** @type {?} */
        NzSliderComponent.prototype.nzReverse;
        /** @type {?} */
        NzSliderComponent.prototype.nzDefaultValue;
        /** @type {?} */
        NzSliderComponent.prototype.nzMarks;
        /** @type {?} */
        NzSliderComponent.prototype.nzMax;
        /** @type {?} */
        NzSliderComponent.prototype.nzMin;
        /** @type {?} */
        NzSliderComponent.prototype.nzStep;
        /** @type {?} */
        NzSliderComponent.prototype.nzTooltipVisible;
        /** @type {?} */
        NzSliderComponent.prototype.nzTooltipPlacement;
        /** @type {?} */
        NzSliderComponent.prototype.nzTipFormatter;
        /** @type {?} */
        NzSliderComponent.prototype.nzOnAfterChange;
        /** @type {?} */
        NzSliderComponent.prototype.value;
        /** @type {?} */
        NzSliderComponent.prototype.cacheSliderStart;
        /** @type {?} */
        NzSliderComponent.prototype.cacheSliderLength;
        /** @type {?} */
        NzSliderComponent.prototype.activeValueIndex;
        /** @type {?} */
        NzSliderComponent.prototype.track;
        /** @type {?} */
        NzSliderComponent.prototype.handles;
        /** @type {?} */
        NzSliderComponent.prototype.marksArray;
        /** @type {?} */
        NzSliderComponent.prototype.bounds;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.dragStart$;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.dragMove$;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.dragEnd$;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.dragStart_;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.dragMove_;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.dragEnd_;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.sliderService;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzSliderComponent.prototype.platform;
    }
    /**
     * @return {?}
     */
    function getValueTypeNotMatchError() {
        return new Error("The \"nzRange\" can't match the \"ngModel\"'s type, please check these properties: \"nzRange\", \"ngModel\", \"nzDefaultValue\".");
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isValueRange(value) {
        if (value instanceof Array) {
            return value.length === 2;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    function generateHandlers(amount) {
        return Array(amount)
            .fill(0)
            .map((/**
         * @return {?}
         */
        function () { return ({ offset: null, value: null, active: false }); }));
    }
    /**
     * Check if value is valid and throw error if value-type/range not match.
     * @param {?} value
     * @param {?=} isRange
     * @return {?}
     */
    function assertValueValid(value, isRange) {
        if ((!isValueRange(value) && isNaN(value)) || (isValueRange(value) && value.some((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return isNaN(v); })))) {
            return false;
        }
        return assertValueTypeMatch(value, isRange);
    }
    /**
     * Assert that if `this.nzRange` is `true`, value is also a range, vice versa.
     * @param {?} value
     * @param {?=} isRange
     * @return {?}
     */
    function assertValueTypeMatch(value, isRange) {
        if (isRange === void 0) { isRange = false; }
        if (isValueRange(value) !== isRange) {
            throw getValueTypeNotMatchError();
        }
        return true;
    }
    /**
     * @param {?} valA
     * @param {?} valB
     * @return {?}
     */
    function valuesEqual(valA, valB) {
        if (typeof valA !== typeof valB) {
            return false;
        }
        return isValueRange(valA) && isValueRange(valB) ? util.arraysEqual(valA, valB) : valA === valB;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: marks.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSliderMarksComponent = /** @class */ (function () {
        function NzSliderMarksComponent() {
            this.lowerBound = null;
            this.upperBound = null;
            this.marksArray = [];
            this.vertical = false;
            this.included = false;
            this.marks = [];
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSliderMarksComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var marksArray = changes.marksArray, lowerBound = changes.lowerBound, upperBound = changes.upperBound;
            if (marksArray) {
                this.buildMarks();
            }
            if (marksArray || lowerBound || upperBound) {
                this.togglePointActive();
            }
        };
        /**
         * @param {?} _index
         * @param {?} mark
         * @return {?}
         */
        NzSliderMarksComponent.prototype.trackById = /**
         * @param {?} _index
         * @param {?} mark
         * @return {?}
         */
        function (_index, mark) {
            return mark.value;
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderMarksComponent.prototype.buildMarks = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var range = this.max - this.min;
            this.marks = this.marksArray.map((/**
             * @param {?} mark
             * @return {?}
             */
            function (mark) {
                var value = mark.value, offset = mark.offset, config = mark.config;
                /** @type {?} */
                var style = _this.getMarkStyles(value, range, config);
                /** @type {?} */
                var label = isConfigObject(config) ? config.label : config;
                return {
                    label: label,
                    offset: offset,
                    style: style,
                    value: value,
                    config: config,
                    active: false
                };
            }));
        };
        /**
         * @private
         * @param {?} value
         * @param {?} range
         * @param {?} config
         * @return {?}
         */
        NzSliderMarksComponent.prototype.getMarkStyles = /**
         * @private
         * @param {?} value
         * @param {?} range
         * @param {?} config
         * @return {?}
         */
        function (value, range, config) {
            /** @type {?} */
            var style;
            if (this.vertical) {
                style = {
                    marginBottom: '-50%',
                    bottom: ((value - this.min) / range) * 100 + "%"
                };
            }
            else {
                style = {
                    transform: "translate3d(-50%, 0, 0)",
                    left: ((value - this.min) / range) * 100 + "%"
                };
            }
            if (isConfigObject(config) && config.style) {
                style = __assign(__assign({}, style), config.style);
            }
            return style;
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderMarksComponent.prototype.togglePointActive = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
                this.marks.forEach((/**
                 * @param {?} mark
                 * @return {?}
                 */
                function (mark) {
                    /** @type {?} */
                    var value = mark.value;
                    /** @type {?} */
                    var isActive = (!_this.included && value === _this.upperBound) || (_this.included && value <= (/** @type {?} */ (_this.upperBound)) && value >= (/** @type {?} */ (_this.lowerBound)));
                    mark.active = isActive;
                }));
            }
        };
        NzSliderMarksComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        selector: 'nz-slider-marks',
                        exportAs: 'nzSliderMarks',
                        template: "\n    <div class=\"ant-slider-mark\">\n      <span\n        class=\"ant-slider-mark-text\"\n        *ngFor=\"let attr of marks; trackBy: trackById\"\n        [class.ant-slider-mark-active]=\"attr.active\"\n        [ngStyle]=\"attr.style!\"\n        [innerHTML]=\"attr.label\"\n      >\n      </span>\n    </div>\n  "
                    }] }
        ];
        NzSliderMarksComponent.propDecorators = {
            lowerBound: [{ type: core.Input }],
            upperBound: [{ type: core.Input }],
            marksArray: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            vertical: [{ type: core.Input }],
            included: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderMarksComponent.prototype, "vertical", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderMarksComponent.prototype, "included", void 0);
        return NzSliderMarksComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSliderMarksComponent.ngAcceptInputType_vertical;
        /** @type {?} */
        NzSliderMarksComponent.ngAcceptInputType_included;
        /** @type {?} */
        NzSliderMarksComponent.prototype.lowerBound;
        /** @type {?} */
        NzSliderMarksComponent.prototype.upperBound;
        /** @type {?} */
        NzSliderMarksComponent.prototype.marksArray;
        /** @type {?} */
        NzSliderMarksComponent.prototype.min;
        /** @type {?} */
        NzSliderMarksComponent.prototype.max;
        /** @type {?} */
        NzSliderMarksComponent.prototype.vertical;
        /** @type {?} */
        NzSliderMarksComponent.prototype.included;
        /** @type {?} */
        NzSliderMarksComponent.prototype.marks;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    function isConfigObject(config) {
        return typeof config !== 'string';
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: step.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSliderStepComponent = /** @class */ (function () {
        function NzSliderStepComponent() {
            this.lowerBound = null;
            this.upperBound = null;
            this.marksArray = [];
            this.vertical = false;
            this.included = false;
            this.steps = [];
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSliderStepComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.marksArray) {
                this.buildSteps();
            }
            if (changes.marksArray || changes.lowerBound || changes.upperBound) {
                this.togglePointActive();
            }
        };
        /**
         * @param {?} _index
         * @param {?} step
         * @return {?}
         */
        NzSliderStepComponent.prototype.trackById = /**
         * @param {?} _index
         * @param {?} step
         * @return {?}
         */
        function (_index, step) {
            return step.value;
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderStepComponent.prototype.buildSteps = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var orient = this.vertical ? 'bottom' : 'left';
            this.steps = this.marksArray.map((/**
             * @param {?} mark
             * @return {?}
             */
            function (mark) {
                var _a;
                var value = mark.value, offset = mark.offset, config = mark.config;
                return {
                    value: value,
                    offset: offset,
                    config: config,
                    active: false,
                    style: (_a = {},
                        _a[orient] = offset + "%",
                        _a)
                };
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzSliderStepComponent.prototype.togglePointActive = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.steps && this.lowerBound !== null && this.upperBound !== null) {
                this.steps.forEach((/**
                 * @param {?} step
                 * @return {?}
                 */
                function (step) {
                    /** @type {?} */
                    var value = step.value;
                    /** @type {?} */
                    var isActive = (!_this.included && value === _this.upperBound) || (_this.included && value <= (/** @type {?} */ (_this.upperBound)) && value >= (/** @type {?} */ (_this.lowerBound)));
                    step.active = isActive;
                }));
            }
        };
        NzSliderStepComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-slider-step',
                        exportAs: 'nzSliderStep',
                        preserveWhitespaces: false,
                        template: "\n    <div class=\"ant-slider-step\">\n      <span\n        class=\"ant-slider-dot\"\n        *ngFor=\"let mark of steps; trackBy: trackById\"\n        [class.ant-slider-dot-active]=\"mark.active\"\n        [ngStyle]=\"mark.style!\"\n      >\n      </span>\n    </div>\n  "
                    }] }
        ];
        NzSliderStepComponent.propDecorators = {
            lowerBound: [{ type: core.Input }],
            upperBound: [{ type: core.Input }],
            marksArray: [{ type: core.Input }],
            vertical: [{ type: core.Input }],
            included: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderStepComponent.prototype, "vertical", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderStepComponent.prototype, "included", void 0);
        return NzSliderStepComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSliderStepComponent.ngAcceptInputType_vertical;
        /** @type {?} */
        NzSliderStepComponent.ngAcceptInputType_included;
        /** @type {?} */
        NzSliderStepComponent.prototype.lowerBound;
        /** @type {?} */
        NzSliderStepComponent.prototype.upperBound;
        /** @type {?} */
        NzSliderStepComponent.prototype.marksArray;
        /** @type {?} */
        NzSliderStepComponent.prototype.vertical;
        /** @type {?} */
        NzSliderStepComponent.prototype.included;
        /** @type {?} */
        NzSliderStepComponent.prototype.steps;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: track.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzSliderTrackStyle() { }
    if (false) {
        /** @type {?|undefined} */
        NzSliderTrackStyle.prototype.bottom;
        /** @type {?|undefined} */
        NzSliderTrackStyle.prototype.height;
        /** @type {?|undefined} */
        NzSliderTrackStyle.prototype.left;
        /** @type {?|undefined} */
        NzSliderTrackStyle.prototype.width;
        /** @type {?|undefined} */
        NzSliderTrackStyle.prototype.visibility;
    }
    var NzSliderTrackComponent = /** @class */ (function () {
        function NzSliderTrackComponent() {
            this.offset = 0;
            this.reverse = false;
            this.length = 0;
            this.vertical = false;
            this.included = false;
            this.style = {};
        }
        /**
         * @return {?}
         */
        NzSliderTrackComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            var _a, _b;
            /** @type {?} */
            var vertical = this.vertical;
            /** @type {?} */
            var reverse = this.reverse;
            /** @type {?} */
            var visibility = this.included ? 'visible' : 'hidden';
            /** @type {?} */
            var offset = this.offset;
            /** @type {?} */
            var length = this.length;
            /** @type {?} */
            var positonStyle = vertical
                ? (_a = {},
                    _a[reverse ? 'top' : 'bottom'] = offset + "%",
                    _a[reverse ? 'bottom' : 'top'] = 'auto',
                    _a.height = length + "%",
                    _a.visibility = visibility,
                    _a) : (_b = {},
                _b[reverse ? 'right' : 'left'] = offset + "%",
                _b[reverse ? 'left' : 'right'] = 'auto',
                _b.width = length + "%",
                _b.visibility = visibility,
                _b);
            this.style = positonStyle;
        };
        NzSliderTrackComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-slider-track',
                        exportAs: 'nzSliderTrack',
                        preserveWhitespaces: false,
                        template: " <div class=\"ant-slider-track\" [ngStyle]=\"style\"></div> "
                    }] }
        ];
        NzSliderTrackComponent.propDecorators = {
            offset: [{ type: core.Input }],
            reverse: [{ type: core.Input }],
            length: [{ type: core.Input }],
            vertical: [{ type: core.Input }],
            included: [{ type: core.Input }]
        };
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Number)
        ], NzSliderTrackComponent.prototype, "offset", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzSliderTrackComponent.prototype, "reverse", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Number)
        ], NzSliderTrackComponent.prototype, "length", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderTrackComponent.prototype, "vertical", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSliderTrackComponent.prototype, "included", void 0);
        return NzSliderTrackComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSliderTrackComponent.ngAcceptInputType_offset;
        /** @type {?} */
        NzSliderTrackComponent.ngAcceptInputType_length;
        /** @type {?} */
        NzSliderTrackComponent.ngAcceptInputType_vertical;
        /** @type {?} */
        NzSliderTrackComponent.ngAcceptInputType_included;
        /** @type {?} */
        NzSliderTrackComponent.ngAcceptInputType_reverse;
        /** @type {?} */
        NzSliderTrackComponent.prototype.offset;
        /** @type {?} */
        NzSliderTrackComponent.prototype.reverse;
        /** @type {?} */
        NzSliderTrackComponent.prototype.length;
        /** @type {?} */
        NzSliderTrackComponent.prototype.vertical;
        /** @type {?} */
        NzSliderTrackComponent.prototype.included;
        /** @type {?} */
        NzSliderTrackComponent.prototype.style;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: slider.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSliderModule = /** @class */ (function () {
        function NzSliderModule() {
        }
        NzSliderModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent],
                        declarations: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent],
                        imports: [common.CommonModule, platform.PlatformModule, tooltip.NzToolTipModule]
                    },] }
        ];
        return NzSliderModule;
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
    function NzMarkObj() { }
    if (false) {
        /** @type {?|undefined} */
        NzMarkObj.prototype.style;
        /** @type {?} */
        NzMarkObj.prototype.label;
    }
    var NzMarks = /** @class */ (function () {
        function NzMarks() {
        }
        return NzMarks;
    }());
    /**
     * Processed steps that would be passed to sub components.
     * @record
     */
    function NzExtendedMark() { }
    if (false) {
        /** @type {?} */
        NzExtendedMark.prototype.value;
        /** @type {?} */
        NzExtendedMark.prototype.offset;
        /** @type {?} */
        NzExtendedMark.prototype.config;
    }
    /**
     * Marks that would be rendered.
     * @record
     */
    function NzDisplayedMark() { }
    if (false) {
        /** @type {?} */
        NzDisplayedMark.prototype.active;
        /** @type {?} */
        NzDisplayedMark.prototype.label;
        /** @type {?|undefined} */
        NzDisplayedMark.prototype.style;
    }
    /**
     * Steps that would be rendered.
     * @record
     */
    function NzDisplayedStep() { }
    if (false) {
        /** @type {?} */
        NzDisplayedStep.prototype.active;
        /** @type {?|undefined} */
        NzDisplayedStep.prototype.style;
    }
    /**
     * @record
     */
    function NzSliderHandler() { }
    if (false) {
        /** @type {?} */
        NzSliderHandler.prototype.offset;
        /** @type {?} */
        NzSliderHandler.prototype.value;
        /** @type {?} */
        NzSliderHandler.prototype.active;
    }

    exports.NzMarks = NzMarks;
    exports.NzSliderComponent = NzSliderComponent;
    exports.NzSliderModule = NzSliderModule;
    exports.??NzSliderHandleComponent = NzSliderHandleComponent;
    exports.??NzSliderMarksComponent = NzSliderMarksComponent;
    exports.??NzSliderService = NzSliderService;
    exports.??NzSliderStepComponent = NzSliderStepComponent;
    exports.??NzSliderTrackComponent = NzSliderTrackComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-slider.umd.js.map
