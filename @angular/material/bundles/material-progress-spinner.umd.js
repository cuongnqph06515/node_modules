(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/core'), require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('@angular/material/progress-spinner', ['exports', '@angular/core', '@angular/common', '@angular/material/core', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/platform-browser/animations'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.progressSpinner = {}), global.ng.core, global.ng.common, global.ng.material.core, global.ng.cdk.coercion, global.ng.cdk.platform, global.ng.platformBrowser.animations));
}(this, (function (exports, core, common, core$1, coercion, platform, animations) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
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

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Base reference size of the spinner.
     * @docs-private
     */
    var BASE_SIZE = 100;
    /**
     * Base reference stroke width of the spinner.
     * @docs-private
     */
    var BASE_STROKE_WIDTH = 10;
    // Boilerplate for applying mixins to MatProgressSpinner.
    /** @docs-private */
    var MatProgressSpinnerBase = /** @class */ (function () {
        function MatProgressSpinnerBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return MatProgressSpinnerBase;
    }());
    var _MatProgressSpinnerMixinBase = core$1.mixinColor(MatProgressSpinnerBase, 'primary');
    /** Injection token to be used to override the default options for `mat-progress-spinner`. */
    var MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new core.InjectionToken('mat-progress-spinner-default-options', {
        providedIn: 'root',
        factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
    });
    /** @docs-private */
    function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
        return { diameter: BASE_SIZE };
    }
    // .0001 percentage difference is necessary in order to avoid unwanted animation frames
    // for example because the animation duration is 4 seconds, .1% accounts to 4ms
    // which are enough to see the flicker described in
    // https://github.com/angular/components/issues/8984
    var INDETERMINATE_ANIMATION_TEMPLATE = "\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n";
    /**
     * `<mat-progress-spinner>` component.
     */
    var MatProgressSpinner = /** @class */ (function (_super) {
        __extends(MatProgressSpinner, _super);
        function MatProgressSpinner(_elementRef, platform, _document, animationMode, defaults) {
            var _this = _super.call(this, _elementRef) || this;
            _this._elementRef = _elementRef;
            _this._document = _document;
            _this._diameter = BASE_SIZE;
            _this._value = 0;
            _this._fallbackAnimation = false;
            /** Mode of the progress circle */
            _this.mode = 'determinate';
            var trackedDiameters = MatProgressSpinner._diameters;
            // The base size is already inserted via the component's structural styles. We still
            // need to track it so we don't end up adding the same styles again.
            if (!trackedDiameters.has(_document.head)) {
                trackedDiameters.set(_document.head, new Set([BASE_SIZE]));
            }
            _this._fallbackAnimation = platform.EDGE || platform.TRIDENT;
            _this._noopAnimations = animationMode === 'NoopAnimations' &&
                (!!defaults && !defaults._forceAnimations);
            if (defaults) {
                if (defaults.diameter) {
                    _this.diameter = defaults.diameter;
                }
                if (defaults.strokeWidth) {
                    _this.strokeWidth = defaults.strokeWidth;
                }
            }
            return _this;
        }
        Object.defineProperty(MatProgressSpinner.prototype, "diameter", {
            /** The diameter of the progress spinner (will set width and height of svg). */
            get: function () { return this._diameter; },
            set: function (size) {
                this._diameter = coercion.coerceNumberProperty(size);
                // If this is set before `ngOnInit`, the style root may not have been resolved yet.
                if (!this._fallbackAnimation && this._styleRoot) {
                    this._attachStyleNode();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatProgressSpinner.prototype, "strokeWidth", {
            /** Stroke width of the progress spinner. */
            get: function () {
                return this._strokeWidth || this.diameter / 10;
            },
            set: function (value) {
                this._strokeWidth = coercion.coerceNumberProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatProgressSpinner.prototype, "value", {
            /** Value of the progress circle. */
            get: function () {
                return this.mode === 'determinate' ? this._value : 0;
            },
            set: function (newValue) {
                this._value = Math.max(0, Math.min(100, coercion.coerceNumberProperty(newValue)));
            },
            enumerable: true,
            configurable: true
        });
        MatProgressSpinner.prototype.ngOnInit = function () {
            var element = this._elementRef.nativeElement;
            // Note that we need to look up the root node in ngOnInit, rather than the constructor, because
            // Angular seems to create the element outside the shadow root and then moves it inside, if the
            // node is inside an `ngIf` and a ShadowDom-encapsulated component.
            this._styleRoot = platform._getShadowRoot(element) || this._document.head;
            this._attachStyleNode();
            // On IE and Edge, we can't animate the `stroke-dashoffset`
            // reliably so we fall back to a non-spec animation.
            var animationClass = "mat-progress-spinner-indeterminate" + (this._fallbackAnimation ? '-fallback' : '') + "-animation";
            element.classList.add(animationClass);
        };
        Object.defineProperty(MatProgressSpinner.prototype, "_circleRadius", {
            /** The radius of the spinner, adjusted for stroke width. */
            get: function () {
                return (this.diameter - BASE_STROKE_WIDTH) / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatProgressSpinner.prototype, "_viewBox", {
            /** The view box of the spinner's svg element. */
            get: function () {
                var viewBox = this._circleRadius * 2 + this.strokeWidth;
                return "0 0 " + viewBox + " " + viewBox;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatProgressSpinner.prototype, "_strokeCircumference", {
            /** The stroke circumference of the svg circle. */
            get: function () {
                return 2 * Math.PI * this._circleRadius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatProgressSpinner.prototype, "_strokeDashOffset", {
            /** The dash offset of the svg circle. */
            get: function () {
                if (this.mode === 'determinate') {
                    return this._strokeCircumference * (100 - this._value) / 100;
                }
                // In fallback mode set the circle to 80% and rotate it with CSS.
                if (this._fallbackAnimation && this.mode === 'indeterminate') {
                    return this._strokeCircumference * 0.2;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatProgressSpinner.prototype, "_circleStrokeWidth", {
            /** Stroke width of the circle in percent. */
            get: function () {
                return this.strokeWidth / this.diameter * 100;
            },
            enumerable: true,
            configurable: true
        });
        /** Dynamically generates a style tag containing the correct animation for this diameter. */
        MatProgressSpinner.prototype._attachStyleNode = function () {
            var styleRoot = this._styleRoot;
            var currentDiameter = this._diameter;
            var diameters = MatProgressSpinner._diameters;
            var diametersForElement = diameters.get(styleRoot);
            if (!diametersForElement || !diametersForElement.has(currentDiameter)) {
                var styleTag = this._document.createElement('style');
                styleTag.setAttribute('mat-spinner-animation', currentDiameter + '');
                styleTag.textContent = this._getAnimationText();
                styleRoot.appendChild(styleTag);
                if (!diametersForElement) {
                    diametersForElement = new Set();
                    diameters.set(styleRoot, diametersForElement);
                }
                diametersForElement.add(currentDiameter);
            }
        };
        /** Generates animation styles adjusted for the spinner's diameter. */
        MatProgressSpinner.prototype._getAnimationText = function () {
            return INDETERMINATE_ANIMATION_TEMPLATE
                // Animation should begin at 5% and end at 80%
                .replace(/START_VALUE/g, "" + 0.95 * this._strokeCircumference)
                .replace(/END_VALUE/g, "" + 0.2 * this._strokeCircumference)
                .replace(/DIAMETER/g, "" + this.diameter);
        };
        /**
         * Tracks diameters of existing instances to de-dupe generated styles (default d = 100).
         * We need to keep track of which elements the diameters were attached to, because for
         * elements in the Shadow DOM the style tags are attached to the shadow root, rather
         * than the document head.
         */
        MatProgressSpinner._diameters = new WeakMap();
        MatProgressSpinner.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-progress-spinner',
                        exportAs: 'matProgressSpinner',
                        host: {
                            'role': 'progressbar',
                            'class': 'mat-progress-spinner',
                            '[class._mat-animation-noopable]': "_noopAnimations",
                            '[style.width.px]': 'diameter',
                            '[style.height.px]': 'diameter',
                            '[attr.aria-valuemin]': 'mode === "determinate" ? 0 : null',
                            '[attr.aria-valuemax]': 'mode === "determinate" ? 100 : null',
                            '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
                            '[attr.mode]': 'mode',
                        },
                        inputs: ['color'],
                        template: "<!--\n  preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n  center. The center of the circle will remain at the center of the mat-progress-spinner\n  element containing the SVG. `focusable=\"false\"` prevents IE from allowing the user to\n  tab into the SVG element.\n-->\n\n<svg\n  [style.width.px]=\"diameter\"\n  [style.height.px]=\"diameter\"\n  [attr.viewBox]=\"_viewBox\"\n  preserveAspectRatio=\"xMidYMid meet\"\n  focusable=\"false\"\n  [ngSwitch]=\"mode === 'indeterminate'\">\n\n  <!--\n    Technically we can reuse the same `circle` element, however Safari has an issue that breaks\n    the SVG rendering in determinate mode, after switching between indeterminate and determinate.\n    Using a different element avoids the issue. An alternative to this is adding `display: none`\n    for a split second and then removing it when switching between modes, but it's hard to know\n    for how long to hide the element and it can cause the UI to blink.\n  -->\n  <circle\n    *ngSwitchCase=\"true\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_circleRadius\"\n    [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + diameter\"\n    [style.stroke-dashoffset.px]=\"_strokeDashOffset\"\n    [style.stroke-dasharray.px]=\"_strokeCircumference\"\n    [style.stroke-width.%]=\"_circleStrokeWidth\"></circle>\n\n  <circle\n    *ngSwitchCase=\"false\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_circleRadius\"\n    [style.stroke-dashoffset.px]=\"_strokeDashOffset\"\n    [style.stroke-dasharray.px]=\"_strokeCircumference\"\n    [style.stroke-width.%]=\"_circleStrokeWidth\"></circle>\n</svg>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n"]
                    }] }
        ];
        /** @nocollapse */
        MatProgressSpinner.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: platform.Platform },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] }] }
        ]; };
        MatProgressSpinner.propDecorators = {
            diameter: [{ type: core.Input }],
            strokeWidth: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            value: [{ type: core.Input }]
        };
        return MatProgressSpinner;
    }(_MatProgressSpinnerMixinBase));
    /**
     * `<mat-spinner>` component.
     *
     * This is a component definition to be used as a convenience reference to create an
     * indeterminate `<mat-progress-spinner>` instance.
     */
    var MatSpinner = /** @class */ (function (_super) {
        __extends(MatSpinner, _super);
        function MatSpinner(elementRef, platform, document, animationMode, defaults) {
            var _this = _super.call(this, elementRef, platform, document, animationMode, defaults) || this;
            _this.mode = 'indeterminate';
            return _this;
        }
        MatSpinner.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-spinner',
                        host: {
                            'role': 'progressbar',
                            'mode': 'indeterminate',
                            'class': 'mat-spinner mat-progress-spinner',
                            '[class._mat-animation-noopable]': "_noopAnimations",
                            '[style.width.px]': 'diameter',
                            '[style.height.px]': 'diameter',
                        },
                        inputs: ['color'],
                        template: "<!--\n  preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n  center. The center of the circle will remain at the center of the mat-progress-spinner\n  element containing the SVG. `focusable=\"false\"` prevents IE from allowing the user to\n  tab into the SVG element.\n-->\n\n<svg\n  [style.width.px]=\"diameter\"\n  [style.height.px]=\"diameter\"\n  [attr.viewBox]=\"_viewBox\"\n  preserveAspectRatio=\"xMidYMid meet\"\n  focusable=\"false\"\n  [ngSwitch]=\"mode === 'indeterminate'\">\n\n  <!--\n    Technically we can reuse the same `circle` element, however Safari has an issue that breaks\n    the SVG rendering in determinate mode, after switching between indeterminate and determinate.\n    Using a different element avoids the issue. An alternative to this is adding `display: none`\n    for a split second and then removing it when switching between modes, but it's hard to know\n    for how long to hide the element and it can cause the UI to blink.\n  -->\n  <circle\n    *ngSwitchCase=\"true\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_circleRadius\"\n    [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + diameter\"\n    [style.stroke-dashoffset.px]=\"_strokeDashOffset\"\n    [style.stroke-dasharray.px]=\"_strokeCircumference\"\n    [style.stroke-width.%]=\"_circleStrokeWidth\"></circle>\n\n  <circle\n    *ngSwitchCase=\"false\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_circleRadius\"\n    [style.stroke-dashoffset.px]=\"_strokeDashOffset\"\n    [style.stroke-dasharray.px]=\"_strokeCircumference\"\n    [style.stroke-width.%]=\"_circleStrokeWidth\"></circle>\n</svg>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n"]
                    }] }
        ];
        /** @nocollapse */
        MatSpinner.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: platform.Platform },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] }] }
        ]; };
        return MatSpinner;
    }(MatProgressSpinner));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatProgressSpinnerModule = /** @class */ (function () {
        function MatProgressSpinnerModule() {
        }
        MatProgressSpinnerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.MatCommonModule, common.CommonModule],
                        exports: [
                            MatProgressSpinner,
                            MatSpinner,
                            core$1.MatCommonModule
                        ],
                        declarations: [
                            MatProgressSpinner,
                            MatSpinner
                        ],
                    },] }
        ];
        return MatProgressSpinnerModule;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS;
    exports.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY = MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY;
    exports.MatProgressSpinner = MatProgressSpinner;
    exports.MatProgressSpinnerModule = MatProgressSpinnerModule;
    exports.MatSpinner = MatSpinner;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-progress-spinner.umd.js.map
