(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/progress', ['exports', '@angular/common', '@angular/core', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].progress = {}), global.ng.common, global.ng.core, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, outlet, icon, config, util, rxjs, operators) { 'use strict';

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
     * Generated from: utils.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    /**
     * @param {?} percent
     * @return {?}
     */
    function stripPercentToNumber(percent) {
        return +percent.replace('%', '');
    }
    /** @type {?} */
    var sortGradient = (/**
     * @param {?} gradients
     * @return {?}
     */
    function (gradients) {
        /** @type {?} */
        var tempArr = [];
        Object.keys(gradients).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var value = gradients[key];
            /** @type {?} */
            var formatKey = stripPercentToNumber(key);
            if (!isNaN(formatKey)) {
                tempArr.push({
                    key: formatKey,
                    value: value
                });
            }
        }));
        tempArr = tempArr.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.key - b.key; }));
        return tempArr;
    });
    /** @type {?} */
    var handleCircleGradient = (/**
     * @param {?} strokeColor
     * @return {?}
     */
    function (strokeColor) {
        return sortGradient(strokeColor).map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var key = _a.key, value = _a.value;
            return ({ offset: key + "%", color: value });
        }));
    });
    /** @type {?} */
    var handleLinearGradient = (/**
     * @param {?} strokeColor
     * @return {?}
     */
    function (strokeColor) {
        var _a = strokeColor.from, from = _a === void 0 ? '#1890ff' : _a, _b = strokeColor.to, to = _b === void 0 ? '#1890ff' : _b, _c = strokeColor.direction, direction = _c === void 0 ? 'to right' : _c, rest = __rest(strokeColor, ["from", "to", "direction"]);
        if (Object.keys(rest).length !== 0) {
            /** @type {?} */
            var sortedGradients = sortGradient((/** @type {?} */ (rest)))
                .map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var key = _a.key, value = _a.value;
                return value + " " + key + "%";
            }))
                .join(', ');
            return "linear-gradient(" + direction + ", " + sortedGradients + ")";
        }
        return "linear-gradient(" + direction + ", " + from + ", " + to + ")";
    });

    /**
     * @fileoverview added by tsickle
     * Generated from: progress.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var gradientIdSeed = 0;
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'progress';
    /** @type {?} */
    var statusIconNameMap = new Map([
        ['success', 'check'],
        ['exception', 'close']
    ]);
    /** @type {?} */
    var statusColorMap = new Map([
        ['normal', '#108ee9'],
        ['exception', '#ff5500'],
        ['success', '#87d068']
    ]);
    /** @type {?} */
    var defaultFormatter = (/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p + "%"; });
    var ??0 = defaultFormatter;
    var NzProgressComponent = /** @class */ (function () {
        function NzProgressComponent(nzConfigService) {
            this.nzConfigService = nzConfigService;
            this.nzShowInfo = true;
            this.nzWidth = 132;
            this.nzStrokeColor = undefined;
            this.nzSize = 'default';
            this.nzPercent = 0;
            this.nzStrokeWidth = undefined;
            this.nzGapDegree = undefined;
            this.nzType = 'line';
            this.nzGapPosition = 'top';
            this.nzStrokeLinecap = 'round';
            this.steps = [];
            /**
             * Gradient style when `nzType` is `line`.
             */
            this.lineGradient = null;
            /**
             * If user uses gradient color.
             */
            this.isGradient = false;
            /**
             * If the linear progress is a step progress.
             */
            this.isSteps = false;
            /**
             * Each progress whose `nzType` is circle or dashboard should have unique id to
             * define `<linearGradient>`.
             */
            this.gradientId = gradientIdSeed++;
            /**
             * Paths to rendered in the template.
             */
            this.progressCirclePath = [];
            this.trailPathStyle = null;
            this.trackByFn = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) { return "" + index; });
            this.cachedStatus = 'normal';
            this.inferredStatus = 'normal';
            this.destroy$ = new rxjs.Subject();
        }
        Object.defineProperty(NzProgressComponent.prototype, "formatter", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzFormat || defaultFormatter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzProgressComponent.prototype, "status", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzStatus || this.inferredStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzProgressComponent.prototype, "strokeWidth", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzStrokeWidth || (this.nzType === 'line' && this.nzSize !== 'small' ? 8 : 6);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzProgressComponent.prototype, "isCircleStyle", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzType === 'circle' || this.nzType === 'dashboard';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        NzProgressComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzSteps = changes.nzSteps, nzGapPosition = changes.nzGapPosition, nzStrokeLinecap = changes.nzStrokeLinecap, nzStrokeColor = changes.nzStrokeColor, nzGapDegree = changes.nzGapDegree, nzType = changes.nzType, nzStatus = changes.nzStatus, nzPercent = changes.nzPercent, nzSuccessPercent = changes.nzSuccessPercent;
            if (nzStatus) {
                this.cachedStatus = this.nzStatus || this.cachedStatus;
            }
            if (nzPercent || nzSuccessPercent) {
                /** @type {?} */
                var fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
                if (fillAll) {
                    if ((util.isNotNil(this.nzSuccessPercent) && (/** @type {?} */ (this.nzSuccessPercent)) >= 100) || this.nzSuccessPercent === undefined) {
                        this.inferredStatus = 'success';
                    }
                }
                else {
                    this.inferredStatus = this.cachedStatus;
                }
            }
            if (nzStatus || nzPercent || nzSuccessPercent) {
                this.updateIcon();
            }
            if (nzStrokeColor) {
                this.setStrokeColor();
            }
            if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor) {
                this.getCirclePaths();
            }
            if (nzSteps) {
                this.isSteps = util.isNotNil(nzSteps.currentValue);
                this.getSteps();
            }
        };
        /**
         * @return {?}
         */
        NzProgressComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.updateIcon();
                _this.setStrokeColor();
                _this.getCirclePaths();
            }));
        };
        /**
         * @return {?}
         */
        NzProgressComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @private
         * @return {?}
         */
        NzProgressComponent.prototype.updateIcon = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var ret = statusIconNameMap.get(this.status);
            this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
        };
        /**
         * Calculate step render configs.
         */
        /**
         * Calculate step render configs.
         * @private
         * @return {?}
         */
        NzProgressComponent.prototype.getSteps = /**
         * Calculate step render configs.
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var current = Math.floor((/** @type {?} */ (this.nzSteps)) * (this.nzPercent / 100));
            /** @type {?} */
            var stepWidth = this.nzSize === 'small' ? 2 : 14;
            for (var i = 0; i < (/** @type {?} */ (this.nzSteps)); i++) {
                /** @type {?} */
                var color = void 0;
                if (i <= current - 1) {
                    color = this.nzStrokeColor;
                }
                /** @type {?} */
                var stepStyle = {
                    backgroundColor: "" + color,
                    width: stepWidth + "px",
                    height: this.strokeWidth + "px"
                };
                this.steps.push(stepStyle);
            }
        };
        /**
         * Calculate paths when the type is circle or dashboard.
         */
        /**
         * Calculate paths when the type is circle or dashboard.
         * @private
         * @return {?}
         */
        NzProgressComponent.prototype.getCirclePaths = /**
         * Calculate paths when the type is circle or dashboard.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.isCircleStyle) {
                return;
            }
            /** @type {?} */
            var values = util.isNotNil(this.nzSuccessPercent) ? [(/** @type {?} */ (this.nzSuccessPercent)), this.nzPercent] : [this.nzPercent];
            // Calculate shared styles.
            /** @type {?} */
            var radius = 50 - this.strokeWidth / 2;
            /** @type {?} */
            var gapPosition = this.nzGapPosition || (this.nzType === 'circle' ? 'top' : 'bottom');
            /** @type {?} */
            var len = Math.PI * 2 * radius;
            /** @type {?} */
            var gapDegree = this.nzGapDegree || (this.nzType === 'circle' ? 0 : 75);
            /** @type {?} */
            var beginPositionX = 0;
            /** @type {?} */
            var beginPositionY = -radius;
            /** @type {?} */
            var endPositionX = 0;
            /** @type {?} */
            var endPositionY = radius * -2;
            switch (gapPosition) {
                case 'left':
                    beginPositionX = -radius;
                    beginPositionY = 0;
                    endPositionX = radius * 2;
                    endPositionY = 0;
                    break;
                case 'right':
                    beginPositionX = radius;
                    beginPositionY = 0;
                    endPositionX = radius * -2;
                    endPositionY = 0;
                    break;
                case 'bottom':
                    beginPositionY = radius;
                    endPositionY = radius * 2;
                    break;
                default:
            }
            this.pathString = "M 50,50 m " + beginPositionX + "," + beginPositionY + "\n       a " + radius + "," + radius + " 0 1 1 " + endPositionX + "," + -endPositionY + "\n       a " + radius + "," + radius + " 0 1 1 " + -endPositionX + "," + endPositionY;
            this.trailPathStyle = {
                strokeDasharray: len - gapDegree + "px " + len + "px",
                strokeDashoffset: "-" + gapDegree / 2 + "px",
                transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
            };
            // Calculate styles for each path.
            this.progressCirclePath = values
                .map((/**
             * @param {?} value
             * @param {?} index
             * @return {?}
             */
            function (value, index) {
                /** @type {?} */
                var isSuccessPercent = values.length === 2 && index === 0;
                return {
                    stroke: _this.isGradient && !isSuccessPercent ? "url(#gradient-" + _this.gradientId + ")" : null,
                    strokePathStyle: {
                        stroke: !_this.isGradient ? (isSuccessPercent ? statusColorMap.get('success') : ((/** @type {?} */ (_this.nzStrokeColor)))) : null,
                        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                        strokeDasharray: ((value || 0) / 100) * (len - gapDegree) + "px " + len + "px",
                        strokeDashoffset: "-" + gapDegree / 2 + "px"
                    }
                };
            }))
                .reverse();
        };
        /**
         * @private
         * @return {?}
         */
        NzProgressComponent.prototype.setStrokeColor = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var color = this.nzStrokeColor;
            /** @type {?} */
            var isGradient = (this.isGradient = !!color && typeof color !== 'string');
            if (isGradient && !this.isCircleStyle) {
                this.lineGradient = handleLinearGradient((/** @type {?} */ (color)));
            }
            else if (isGradient && this.isCircleStyle) {
                this.circleGradient = handleCircleGradient((/** @type {?} */ (this.nzStrokeColor)));
            }
            else {
                this.lineGradient = null;
                this.circleGradient = [];
            }
        };
        NzProgressComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-progress',
                        exportAs: 'nzProgress',
                        preserveWhitespaces: false,
                        template: "\n    <ng-template #progressInfoTemplate>\n      <span class=\"ant-progress-text\" *ngIf=\"nzShowInfo\">\n        <ng-container *ngIf=\"(status === 'exception' || status === 'success') && !nzFormat; else formatTemplate\">\n          <i nz-icon [nzType]=\"icon\"></i>\n        </ng-container>\n        <ng-template #formatTemplate>\n          <ng-container *nzStringTemplateOutlet=\"formatter; context: { $implicit: nzPercent }; let formatter\">\n            {{ formatter(nzPercent) }}\n          </ng-container>\n        </ng-template>\n      </span>\n    </ng-template>\n\n    <div\n      [ngClass]=\"'ant-progress ant-progress-status-' + status\"\n      [class.ant-progress-line]=\"nzType == 'line'\"\n      [class.ant-progress-small]=\"nzSize == 'small'\"\n      [class.ant-progress-show-info]=\"nzShowInfo\"\n      [class.ant-progress-circle]=\"isCircleStyle\"\n      [class.ant-progress-steps]=\"isSteps\"\n    >\n      <!-- line progress -->\n      <div *ngIf=\"nzType === 'line'\">\n        <ng-container *ngIf=\"!isSteps\">\n          <div class=\"ant-progress-outer\" *ngIf=\"!isSteps\">\n            <div class=\"ant-progress-inner\">\n              <div\n                class=\"ant-progress-bg\"\n                [style.width.%]=\"nzPercent\"\n                [style.border-radius]=\"nzStrokeLinecap === 'round' ? '100px' : '0'\"\n                [style.background]=\"!isGradient ? nzStrokeColor : null\"\n                [style.background-image]=\"isGradient ? lineGradient : null\"\n                [style.height.px]=\"strokeWidth\"\n              ></div>\n              <div\n                *ngIf=\"nzSuccessPercent || nzSuccessPercent === 0\"\n                class=\"ant-progress-success-bg\"\n                [style.width.%]=\"nzSuccessPercent\"\n                [style.border-radius]=\"nzStrokeLinecap === 'round' ? '100px' : '0'\"\n                [style.height.px]=\"strokeWidth\"\n              ></div>\n            </div>\n          </div>\n          <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n        </ng-container>\n        <!-- Step style progress -->\n        <div class=\"ant-progress-steps-outer\" *ngIf=\"isSteps\">\n          <div *ngFor=\"let step of steps; let i = index\" class=\"ant-progress-steps-item\" [ngStyle]=\"step\"></div>\n          <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n        </div>\n      </div>\n\n      <!-- circle / dashboard progress -->\n      <div\n        [style.width.px]=\"this.nzWidth\"\n        [style.height.px]=\"this.nzWidth\"\n        [style.fontSize.px]=\"this.nzWidth * 0.15 + 6\"\n        class=\"ant-progress-inner\"\n        [class.ant-progress-circle-gradient]=\"isGradient\"\n        *ngIf=\"isCircleStyle\"\n      >\n        <svg class=\"ant-progress-circle \" viewBox=\"0 0 100 100\">\n          <defs *ngIf=\"isGradient\">\n            <linearGradient [id]=\"'gradient-' + gradientId\" x1=\"100%\" y1=\"0%\" x2=\"0%\" y2=\"0%\">\n              <stop *ngFor=\"let i of circleGradient\" [attr.offset]=\"i.offset\" [attr.stop-color]=\"i.color\"></stop>\n            </linearGradient>\n          </defs>\n          <path\n            class=\"ant-progress-circle-trail\"\n            stroke=\"#f3f3f3\"\n            fill-opacity=\"0\"\n            [attr.stroke-width]=\"strokeWidth\"\n            [attr.d]=\"pathString\"\n            [ngStyle]=\"trailPathStyle\"\n          ></path>\n          <path\n            *ngFor=\"let p of progressCirclePath; trackBy: trackByFn\"\n            class=\"ant-progress-circle-path\"\n            fill-opacity=\"0\"\n            [attr.d]=\"pathString\"\n            [attr.stroke-linecap]=\"nzStrokeLinecap\"\n            [attr.stroke]=\"p.stroke\"\n            [attr.stroke-width]=\"nzPercent ? strokeWidth : 0\"\n            [ngStyle]=\"p.strokePathStyle\"\n          ></path>\n        </svg>\n        <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n      </div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzProgressComponent.ctorParameters = function () { return [
            { type: config.NzConfigService }
        ]; };
        NzProgressComponent.propDecorators = {
            nzShowInfo: [{ type: core.Input }],
            nzWidth: [{ type: core.Input }],
            nzStrokeColor: [{ type: core.Input }],
            nzSize: [{ type: core.Input }],
            nzFormat: [{ type: core.Input }],
            nzSuccessPercent: [{ type: core.Input }],
            nzPercent: [{ type: core.Input }],
            nzStrokeWidth: [{ type: core.Input }],
            nzGapDegree: [{ type: core.Input }],
            nzStatus: [{ type: core.Input }],
            nzType: [{ type: core.Input }],
            nzGapPosition: [{ type: core.Input }],
            nzStrokeLinecap: [{ type: core.Input }],
            nzSteps: [{ type: core.Input }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Boolean)
        ], NzProgressComponent.prototype, "nzShowInfo", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzProgressComponent.prototype, "nzStrokeColor", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzProgressComponent.prototype, "nzSize", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Number)
        ], NzProgressComponent.prototype, "nzSuccessPercent", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Number)
        ], NzProgressComponent.prototype, "nzPercent", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputNumber(),
            __metadata("design:type", Number)
        ], NzProgressComponent.prototype, "nzStrokeWidth", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputNumber(),
            __metadata("design:type", Number)
        ], NzProgressComponent.prototype, "nzGapDegree", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzProgressComponent.prototype, "nzGapPosition", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzProgressComponent.prototype, "nzStrokeLinecap", void 0);
        __decorate([
            util.InputNumber(),
            __metadata("design:type", Number)
        ], NzProgressComponent.prototype, "nzSteps", void 0);
        return NzProgressComponent;
    }());
    if (false) {
        /** @type {?} */
        NzProgressComponent.ngAcceptInputType_nzSuccessPercent;
        /** @type {?} */
        NzProgressComponent.ngAcceptInputType_nzPercent;
        /** @type {?} */
        NzProgressComponent.ngAcceptInputType_nzStrokeWidth;
        /** @type {?} */
        NzProgressComponent.ngAcceptInputType_nzGapDegree;
        /** @type {?} */
        NzProgressComponent.ngAcceptInputType_nzSteps;
        /** @type {?} */
        NzProgressComponent.prototype.nzShowInfo;
        /** @type {?} */
        NzProgressComponent.prototype.nzWidth;
        /** @type {?} */
        NzProgressComponent.prototype.nzStrokeColor;
        /** @type {?} */
        NzProgressComponent.prototype.nzSize;
        /** @type {?} */
        NzProgressComponent.prototype.nzFormat;
        /** @type {?} */
        NzProgressComponent.prototype.nzSuccessPercent;
        /** @type {?} */
        NzProgressComponent.prototype.nzPercent;
        /** @type {?} */
        NzProgressComponent.prototype.nzStrokeWidth;
        /** @type {?} */
        NzProgressComponent.prototype.nzGapDegree;
        /** @type {?} */
        NzProgressComponent.prototype.nzStatus;
        /** @type {?} */
        NzProgressComponent.prototype.nzType;
        /** @type {?} */
        NzProgressComponent.prototype.nzGapPosition;
        /** @type {?} */
        NzProgressComponent.prototype.nzStrokeLinecap;
        /** @type {?} */
        NzProgressComponent.prototype.nzSteps;
        /** @type {?} */
        NzProgressComponent.prototype.steps;
        /**
         * Gradient style when `nzType` is `line`.
         * @type {?}
         */
        NzProgressComponent.prototype.lineGradient;
        /**
         * If user uses gradient color.
         * @type {?}
         */
        NzProgressComponent.prototype.isGradient;
        /**
         * If the linear progress is a step progress.
         * @type {?}
         */
        NzProgressComponent.prototype.isSteps;
        /**
         * Each progress whose `nzType` is circle or dashboard should have unique id to
         * define `<linearGradient>`.
         * @type {?}
         */
        NzProgressComponent.prototype.gradientId;
        /**
         * Paths to rendered in the template.
         * @type {?}
         */
        NzProgressComponent.prototype.progressCirclePath;
        /** @type {?} */
        NzProgressComponent.prototype.circleGradient;
        /** @type {?} */
        NzProgressComponent.prototype.trailPathStyle;
        /** @type {?} */
        NzProgressComponent.prototype.pathString;
        /** @type {?} */
        NzProgressComponent.prototype.icon;
        /** @type {?} */
        NzProgressComponent.prototype.trackByFn;
        /**
         * @type {?}
         * @private
         */
        NzProgressComponent.prototype.cachedStatus;
        /**
         * @type {?}
         * @private
         */
        NzProgressComponent.prototype.inferredStatus;
        /**
         * @type {?}
         * @private
         */
        NzProgressComponent.prototype.destroy$;
        /** @type {?} */
        NzProgressComponent.prototype.nzConfigService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: progress.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzProgressModule = /** @class */ (function () {
        function NzProgressModule() {
        }
        NzProgressModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [NzProgressComponent],
                        declarations: [NzProgressComponent],
                        imports: [common.CommonModule, icon.NzIconModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzProgressModule;
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
    function NzProgressGradientProgress() { }
    /**
     * @record
     */
    function NzProgressGradientFromTo() { }
    if (false) {
        /** @type {?} */
        NzProgressGradientFromTo.prototype.from;
        /** @type {?} */
        NzProgressGradientFromTo.prototype.to;
    }
    /**
     * @record
     */
    function NzProgressCirclePath() { }
    if (false) {
        /** @type {?} */
        NzProgressCirclePath.prototype.stroke;
        /** @type {?} */
        NzProgressCirclePath.prototype.strokePathStyle;
    }
    /**
     * @record
     */
    function NzProgressStepItem() { }
    if (false) {
        /** @type {?} */
        NzProgressStepItem.prototype.backgroundColor;
        /** @type {?} */
        NzProgressStepItem.prototype.width;
        /** @type {?} */
        NzProgressStepItem.prototype.height;
    }

    exports.NzProgressComponent = NzProgressComponent;
    exports.NzProgressModule = NzProgressModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-progress.umd.js.map
