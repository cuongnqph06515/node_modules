(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/core/animation'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/logger'), require('ng-zorro-antd/core/util'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/core/polyfill'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/time-picker', ['exports', '@angular/cdk/overlay', '@angular/core', '@angular/forms', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/polyfill', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd']['time-picker'] = {}), global.ng.cdk.overlay, global.ng.core, global.ng.forms, global['ng-zorro-antd'].core.animation, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.logger, global['ng-zorro-antd'].core.util, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].core.polyfill, global.rxjs, global.rxjs.operators));
}(this, (function (exports, overlay, core, forms, animation, config, logger, util, common, outlet, overlay$1, i18n, icon, polyfill, rxjs, operators) { 'use strict';

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
     * Generated from: time-picker.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'timePicker';
    var NzTimePickerComponent = /** @class */ (function () {
        function NzTimePickerComponent(nzConfigService, element, renderer, cdr) {
            this.nzConfigService = nzConfigService;
            this.element = element;
            this.renderer = renderer;
            this.cdr = cdr;
            this.isInit = false;
            this.focused = false;
            this.value = null;
            this.overlayPositions = [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: 3
                }
            ];
            this.nzSize = null;
            this.nzHourStep = 1;
            this.nzMinuteStep = 1;
            this.nzSecondStep = 1;
            this.nzClearText = 'clear';
            this.nzPopupClassName = '';
            this.nzPlaceHolder = '';
            this.nzFormat = 'HH:mm:ss';
            this.nzOpen = false;
            this.nzUse12Hours = false;
            this.nzSuffixIcon = 'clock-circle';
            this.nzOpenChange = new core.EventEmitter();
            this.nzHideDisabledOptions = false;
            this.nzAllowEmpty = true;
            this.nzDisabled = false;
            this.nzAutoFocus = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimePickerComponent.prototype.setValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value ? new Date(value) : null;
            if (this._onChange) {
                this._onChange(this.value);
            }
            if (this._onTouched) {
                this._onTouched();
            }
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.open = /**
         * @return {?}
         */
        function () {
            if (this.nzDisabled) {
                return;
            }
            this.focus();
            this.nzOpen = true;
            this.nzOpenChange.emit(this.nzOpen);
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.close = /**
         * @return {?}
         */
        function () {
            this.nzOpen = false;
            this.cdr.markForCheck();
            this.nzOpenChange.emit(this.nzOpen);
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.updateAutoFocus = /**
         * @return {?}
         */
        function () {
            if (this.isInit && !this.nzDisabled) {
                if (this.nzAutoFocus) {
                    this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
                }
                else {
                    this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTimePickerComponent.prototype.onClickClearBtn = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.stopPropagation();
            this.setValue(null);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimePickerComponent.prototype.onFocus = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.focused = value;
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            if (this.inputRef.nativeElement) {
                this.inputRef.nativeElement.focus();
            }
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.blur = /**
         * @return {?}
         */
        function () {
            if (this.inputRef.nativeElement) {
                this.inputRef.nativeElement.blur();
            }
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.inputSize = Math.max(8, this.nzFormat.length) + 2;
            this.origin = new overlay.CdkOverlayOrigin(this.element);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTimePickerComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzUse12Hours = changes.nzUse12Hours, nzFormat = changes.nzFormat, nzDisabled = changes.nzDisabled, nzAutoFocus = changes.nzAutoFocus;
            if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
                this.nzFormat = 'h:mm:ss a';
            }
            if (nzDisabled) {
                /** @type {?} */
                var value = nzDisabled.currentValue;
                /** @type {?} */
                var input = (/** @type {?} */ (this.inputRef.nativeElement));
                if (value) {
                    this.renderer.setAttribute(input, 'disabled', '');
                }
                else {
                    this.renderer.removeAttribute(input, 'disabled');
                }
            }
            if (nzAutoFocus) {
                this.updateAutoFocus();
            }
        };
        /**
         * @return {?}
         */
        NzTimePickerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.isInit = true;
            this.updateAutoFocus();
        };
        /**
         * @param {?} time
         * @return {?}
         */
        NzTimePickerComponent.prototype.writeValue = /**
         * @param {?} time
         * @return {?}
         */
        function (time) {
            if (time instanceof Date) {
                this.value = time;
            }
            else if (util.isNil(time)) {
                this.value = null;
            }
            else {
                logger.warn('Non-Date type is not recommended for time-picker, use "Date" type.');
                this.value = new Date(time);
            }
            this.cdr.markForCheck();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzTimePickerComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzTimePickerComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouched = fn;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NzTimePickerComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.nzDisabled = isDisabled;
            this.cdr.markForCheck();
        };
        NzTimePickerComponent.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-time-picker',
                        exportAs: 'nzTimePicker',
                        template: "\n    <div class=\"ant-picker-input\">\n      <input\n        #inputElement\n        type=\"text\"\n        [size]=\"inputSize\"\n        [nzTime]=\"nzFormat\"\n        [placeholder]=\"nzPlaceHolder || ('TimePicker.placeholder' | nzI18n)\"\n        [(ngModel)]=\"value\"\n        [disabled]=\"nzDisabled\"\n        (focus)=\"onFocus(true)\"\n        (blur)=\"onFocus(false)\"\n      />\n      <span class=\"ant-picker-suffix\">\n        <ng-container *nzStringTemplateOutlet=\"nzSuffixIcon; let suffixIcon\">\n          <i nz-icon [nzType]=\"suffixIcon\"></i>\n        </ng-container>\n      </span>\n      <span *ngIf=\"nzAllowEmpty && value\" class=\"ant-picker-clear\" (click)=\"onClickClearBtn($event)\">\n        <i nz-icon nzType=\"close-circle\" nzTheme=\"fill\" [attr.aria-label]=\"nzClearText\" [attr.title]=\"nzClearText\"></i>\n      </span>\n    </div>\n\n    <ng-template\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      cdkConnectedOverlayHasBackdrop\n      [cdkConnectedOverlayPositions]=\"overlayPositions\"\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayOpen]=\"nzOpen\"\n      [cdkConnectedOverlayOffsetY]=\"-2\"\n      [cdkConnectedOverlayTransformOriginOn]=\"'.ant-picker-dropdown'\"\n      (detach)=\"close()\"\n      (backdropClick)=\"close()\"\n    >\n      <div [@slideMotion]=\"'enter'\" class=\"ant-picker-dropdown\">\n        <div class=\"ant-picker-panel-container\">\n          <div tabindex=\"-1\" class=\"ant-picker-panel\">\n            <nz-time-picker-panel\n              [ngClass]=\"nzPopupClassName\"\n              [format]=\"nzFormat\"\n              [nzHourStep]=\"nzHourStep\"\n              [nzMinuteStep]=\"nzMinuteStep\"\n              [nzSecondStep]=\"nzSecondStep\"\n              [nzDisabledHours]=\"nzDisabledHours\"\n              [nzDisabledMinutes]=\"nzDisabledMinutes\"\n              [nzDisabledSeconds]=\"nzDisabledSeconds\"\n              [nzPlaceHolder]=\"nzPlaceHolder || ('TimePicker.placeholder' | nzI18n)\"\n              [nzHideDisabledOptions]=\"nzHideDisabledOptions\"\n              [nzUse12Hours]=\"nzUse12Hours\"\n              [nzDefaultOpenValue]=\"nzDefaultOpenValue\"\n              [nzAddOn]=\"nzAddOn\"\n              [nzClearText]=\"nzClearText\"\n              [nzAllowEmpty]=\"nzAllowEmpty\"\n              [(ngModel)]=\"value\"\n              (ngModelChange)=\"setValue($event)\"\n              (closePanel)=\"close()\"\n            >\n            </nz-time-picker-panel>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-picker]': "true",
                            '[class.ant-picker-large]': "nzSize === 'large'",
                            '[class.ant-picker-small]': "nzSize === 'small'",
                            '[class.ant-picker-disabled]': "nzDisabled",
                            '[class.ant-picker-focused]': "focused",
                            '(click)': 'open()'
                        },
                        animations: [animation.slideMotion],
                        providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }]
                    }] }
        ];
        /** @nocollapse */
        NzTimePickerComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef }
        ]; };
        NzTimePickerComponent.propDecorators = {
            inputRef: [{ type: core.ViewChild, args: ['inputElement', { static: true },] }],
            nzSize: [{ type: core.Input }],
            nzHourStep: [{ type: core.Input }],
            nzMinuteStep: [{ type: core.Input }],
            nzSecondStep: [{ type: core.Input }],
            nzClearText: [{ type: core.Input }],
            nzPopupClassName: [{ type: core.Input }],
            nzPlaceHolder: [{ type: core.Input }],
            nzAddOn: [{ type: core.Input }],
            nzDefaultOpenValue: [{ type: core.Input }],
            nzDisabledHours: [{ type: core.Input }],
            nzDisabledMinutes: [{ type: core.Input }],
            nzDisabledSeconds: [{ type: core.Input }],
            nzFormat: [{ type: core.Input }],
            nzOpen: [{ type: core.Input }],
            nzUse12Hours: [{ type: core.Input }],
            nzSuffixIcon: [{ type: core.Input }],
            nzOpenChange: [{ type: core.Output }],
            nzHideDisabledOptions: [{ type: core.Input }],
            nzAllowEmpty: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzAutoFocus: [{ type: core.Input }]
        };
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Number)
        ], NzTimePickerComponent.prototype, "nzHourStep", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Number)
        ], NzTimePickerComponent.prototype, "nzMinuteStep", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Number)
        ], NzTimePickerComponent.prototype, "nzSecondStep", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzTimePickerComponent.prototype, "nzClearText", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzTimePickerComponent.prototype, "nzPopupClassName", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", String)
        ], NzTimePickerComponent.prototype, "nzFormat", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTimePickerComponent.prototype, "nzUse12Hours", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME),
            __metadata("design:type", Object)
        ], NzTimePickerComponent.prototype, "nzSuffixIcon", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTimePickerComponent.prototype, "nzHideDisabledOptions", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputBoolean(),
            __metadata("design:type", Boolean)
        ], NzTimePickerComponent.prototype, "nzAllowEmpty", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTimePickerComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTimePickerComponent.prototype, "nzAutoFocus", void 0);
        return NzTimePickerComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTimePickerComponent.ngAcceptInputType_nzUse12Hours;
        /** @type {?} */
        NzTimePickerComponent.ngAcceptInputType_nzHideDisabledOptions;
        /** @type {?} */
        NzTimePickerComponent.ngAcceptInputType_nzAllowEmpty;
        /** @type {?} */
        NzTimePickerComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzTimePickerComponent.ngAcceptInputType_nzAutoFocus;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerComponent.prototype._onChange;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerComponent.prototype._onTouched;
        /** @type {?} */
        NzTimePickerComponent.prototype.isInit;
        /** @type {?} */
        NzTimePickerComponent.prototype.focused;
        /** @type {?} */
        NzTimePickerComponent.prototype.value;
        /** @type {?} */
        NzTimePickerComponent.prototype.origin;
        /** @type {?} */
        NzTimePickerComponent.prototype.inputSize;
        /** @type {?} */
        NzTimePickerComponent.prototype.overlayPositions;
        /** @type {?} */
        NzTimePickerComponent.prototype.inputRef;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzSize;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzHourStep;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzMinuteStep;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzSecondStep;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzClearText;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzPopupClassName;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzPlaceHolder;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzAddOn;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzDefaultOpenValue;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzDisabledHours;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzDisabledMinutes;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzDisabledSeconds;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzFormat;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzOpen;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzUse12Hours;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzSuffixIcon;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzOpenChange;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzHideDisabledOptions;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzAllowEmpty;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzDisabled;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzAutoFocus;
        /** @type {?} */
        NzTimePickerComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerComponent.prototype.element;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerComponent.prototype.renderer;
        /** @type {?} */
        NzTimePickerComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: time-holder.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimeHolder = /** @class */ (function () {
        function TimeHolder() {
            this.selected12Hours = undefined;
            this._use12Hours = false;
            this._changes = new rxjs.Subject();
        }
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?} disabled
         * @return {THIS}
         */
        TimeHolder.prototype.setMinutes = /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?} disabled
         * @return {THIS}
         */
        function (value, disabled) {
            if (value !== (/** @type {?} */ (this)).minutes && !disabled) {
                (/** @type {?} */ (this)).initValue();
                (/** @type {?} */ (this)).value.setMinutes(value);
                (/** @type {?} */ (this)).update();
            }
            return (/** @type {?} */ (this));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?} disabled
         * @return {THIS}
         */
        TimeHolder.prototype.setHours = /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?} disabled
         * @return {THIS}
         */
        function (value, disabled) {
            if (value !== (/** @type {?} */ (this)).hours && !disabled) {
                (/** @type {?} */ (this)).initValue();
                if ((/** @type {?} */ (this))._use12Hours) {
                    if ((/** @type {?} */ (this)).selected12Hours === 'PM' && value !== 12) {
                        (/** @type {?} */ (this)).value.setHours(((/** @type {?} */ (value))) + 12);
                    }
                    else if ((/** @type {?} */ (this)).selected12Hours === 'AM' && value === 12) {
                        (/** @type {?} */ (this)).value.setHours(0);
                    }
                    else {
                        (/** @type {?} */ (this)).value.setHours(value);
                    }
                }
                else {
                    (/** @type {?} */ (this)).value.setHours(value);
                }
                (/** @type {?} */ (this)).update();
            }
            return (/** @type {?} */ (this));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?} disabled
         * @return {THIS}
         */
        TimeHolder.prototype.setSeconds = /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?} disabled
         * @return {THIS}
         */
        function (value, disabled) {
            if (value !== (/** @type {?} */ (this)).seconds && !disabled) {
                (/** @type {?} */ (this)).initValue();
                (/** @type {?} */ (this)).value.setSeconds(value);
                (/** @type {?} */ (this)).update();
            }
            return (/** @type {?} */ (this));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @return {THIS}
         */
        TimeHolder.prototype.setUse12Hours = /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @return {THIS}
         */
        function (value) {
            (/** @type {?} */ (this))._use12Hours = value;
            return (/** @type {?} */ (this));
        };
        Object.defineProperty(TimeHolder.prototype, "changes", {
            get: /**
             * @return {?}
             */
            function () {
                return this._changes.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?=} use12Hours
         * @return {THIS}
         */
        TimeHolder.prototype.setValue = /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @param {?=} use12Hours
         * @return {THIS}
         */
        function (value, use12Hours) {
            if (util.isNotNil(use12Hours)) {
                (/** @type {?} */ (this))._use12Hours = (/** @type {?} */ (use12Hours));
            }
            if (value !== (/** @type {?} */ (this)).value) {
                (/** @type {?} */ (this))._value = value;
                if (util.isNotNil((/** @type {?} */ (this)).value)) {
                    if ((/** @type {?} */ (this))._use12Hours && util.isNotNil((/** @type {?} */ (this)).hours)) {
                        (/** @type {?} */ (this)).selected12Hours = (/** @type {?} */ (this)).hours >= 12 ? 'PM' : 'AM';
                    }
                }
                else {
                    (/** @type {?} */ (this))._clear();
                }
            }
            return (/** @type {?} */ (this));
        };
        /**
         * @return {?}
         */
        TimeHolder.prototype.initValue = /**
         * @return {?}
         */
        function () {
            if (util.isNil(this.value)) {
                this.setValue(new Date(), this._use12Hours);
            }
        };
        /**
         * @return {?}
         */
        TimeHolder.prototype.clear = /**
         * @return {?}
         */
        function () {
            this._clear();
            this.update();
        };
        Object.defineProperty(TimeHolder.prototype, "isEmpty", {
            get: /**
             * @return {?}
             */
            function () {
                return !(util.isNotNil(this.hours) || util.isNotNil(this.minutes) || util.isNotNil(this.seconds));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @return {?}
         */
        TimeHolder.prototype._clear = /**
         * @private
         * @return {?}
         */
        function () {
            this._value = undefined;
            this.selected12Hours = undefined;
        };
        /**
         * @private
         * @return {?}
         */
        TimeHolder.prototype.update = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.isEmpty) {
                this._value = undefined;
            }
            else {
                if (util.isNotNil(this.hours)) {
                    (/** @type {?} */ (this.value)).setHours((/** @type {?} */ (this.hours)));
                }
                if (util.isNotNil(this.minutes)) {
                    (/** @type {?} */ (this.value)).setMinutes((/** @type {?} */ (this.minutes)));
                }
                if (util.isNotNil(this.seconds)) {
                    (/** @type {?} */ (this.value)).setSeconds((/** @type {?} */ (this.seconds)));
                }
                if (this._use12Hours) {
                    if (this.selected12Hours === 'PM' && (/** @type {?} */ (this.hours)) < 12) {
                        (/** @type {?} */ (this.value)).setHours((/** @type {?} */ (this.hours)) + 12);
                    }
                    if (this.selected12Hours === 'AM' && (/** @type {?} */ (this.hours)) >= 12) {
                        (/** @type {?} */ (this.value)).setHours((/** @type {?} */ (this.hours)) - 12);
                    }
                }
            }
            this.changed();
        };
        /**
         * @return {?}
         */
        TimeHolder.prototype.changed = /**
         * @return {?}
         */
        function () {
            this._changes.next(this.value);
        };
        Object.defineProperty(TimeHolder.prototype, "viewHours", {
            /**
             * @description
             * UI view hours
             * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
             */
            get: /**
             * \@description
             * UI view hours
             * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
             * @return {?}
             */
            function () {
                return this._use12Hours && util.isNotNil(this.hours) ? this.calculateViewHour((/** @type {?} */ (this.hours))) : this.hours;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        TimeHolder.prototype.setSelected12Hours = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if ((/** @type {?} */ (value)).toUpperCase() !== this.selected12Hours) {
                this.selected12Hours = (/** @type {?} */ (value)).toUpperCase();
                this.update();
            }
        };
        Object.defineProperty(TimeHolder.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () {
                return this._value || this._defaultOpenValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeHolder.prototype, "hours", {
            get: /**
             * @return {?}
             */
            function () {
                var _a;
                return (_a = this.value) === null || _a === void 0 ? void 0 : _a.getHours();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeHolder.prototype, "minutes", {
            get: /**
             * @return {?}
             */
            function () {
                var _a;
                return (_a = this.value) === null || _a === void 0 ? void 0 : _a.getMinutes();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeHolder.prototype, "seconds", {
            get: /**
             * @return {?}
             */
            function () {
                var _a;
                return (_a = this.value) === null || _a === void 0 ? void 0 : _a.getSeconds();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @return {THIS}
         */
        TimeHolder.prototype.setDefaultOpenValue = /**
         * @template THIS
         * @this {THIS}
         * @param {?} value
         * @return {THIS}
         */
        function (value) {
            (/** @type {?} */ (this))._defaultOpenValue = value;
            return (/** @type {?} */ (this));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        TimeHolder.prototype.calculateViewHour = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var selected12Hours = this.selected12Hours;
            if (selected12Hours === 'PM' && value > 12) {
                return value - 12;
            }
            if (selected12Hours === 'AM' && value === 0) {
                return 12;
            }
            return value;
        };
        return TimeHolder;
    }());
    if (false) {
        /** @type {?} */
        TimeHolder.prototype.selected12Hours;
        /**
         * @type {?}
         * @private
         */
        TimeHolder.prototype._value;
        /**
         * @type {?}
         * @private
         */
        TimeHolder.prototype._use12Hours;
        /**
         * @type {?}
         * @private
         */
        TimeHolder.prototype._defaultOpenValue;
        /**
         * @type {?}
         * @private
         */
        TimeHolder.prototype._changes;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: time-value-accessor.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTimeValueAccessorDirective = /** @class */ (function () {
        function NzTimeValueAccessorDirective(dateHelper, elementRef) {
            this.dateHelper = dateHelper;
            this.elementRef = elementRef;
        }
        /**
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.keyup = /**
         * @return {?}
         */
        function () {
            this.changed();
        };
        /**
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.blur = /**
         * @return {?}
         */
        function () {
            this.touched();
        };
        /**
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.changed = /**
         * @return {?}
         */
        function () {
            if (this._onChange) {
                /** @type {?} */
                var value = this.dateHelper.parseTime(this.elementRef.nativeElement.value, this.nzTime);
                this._onChange((/** @type {?} */ (value)));
            }
        };
        /**
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.touched = /**
         * @return {?}
         */
        function () {
            if (this._onTouch) {
                this._onTouch();
            }
        };
        /**
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.setRange = /**
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.focus();
            this.elementRef.nativeElement.setSelectionRange(0, this.elementRef.nativeElement.value.length);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.elementRef.nativeElement.value = this.dateHelper.format(value, (/** @type {?} */ (this.nzTime)));
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzTimeValueAccessorDirective.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouch = fn;
        };
        NzTimeValueAccessorDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[nzTime]',
                        exportAs: 'nzTime',
                        providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: NzTimeValueAccessorDirective, multi: true }]
                    },] }
        ];
        /** @nocollapse */
        NzTimeValueAccessorDirective.ctorParameters = function () { return [
            { type: i18n.DateHelperService },
            { type: core.ElementRef }
        ]; };
        NzTimeValueAccessorDirective.propDecorators = {
            nzTime: [{ type: core.Input }],
            keyup: [{ type: core.HostListener, args: ['keyup',] }],
            blur: [{ type: core.HostListener, args: ['blur',] }]
        };
        return NzTimeValueAccessorDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzTimeValueAccessorDirective.prototype._onChange;
        /**
         * @type {?}
         * @private
         */
        NzTimeValueAccessorDirective.prototype._onTouch;
        /** @type {?} */
        NzTimeValueAccessorDirective.prototype.nzTime;
        /**
         * @type {?}
         * @private
         */
        NzTimeValueAccessorDirective.prototype.dateHelper;
        /**
         * @type {?}
         * @private
         */
        NzTimeValueAccessorDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: time-picker-panel.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} length
     * @param {?=} step
     * @param {?=} start
     * @return {?}
     */
    function makeRange(length, step, start) {
        if (step === void 0) { step = 1; }
        if (start === void 0) { start = 0; }
        return new Array(Math.ceil(length / step)).fill(0).map((/**
         * @param {?} _
         * @param {?} i
         * @return {?}
         */
        function (_, i) { return (i + start) * step; }));
    }
    var NzTimePickerPanelComponent = /** @class */ (function () {
        function NzTimePickerPanelComponent(cdr, dateHelper) {
            this.cdr = cdr;
            this.dateHelper = dateHelper;
            this._nzHourStep = 1;
            this._nzMinuteStep = 1;
            this._nzSecondStep = 1;
            this.unsubscribe$ = new rxjs.Subject();
            this._format = 'HH:mm:ss';
            this._disabledHours = (/**
             * @return {?}
             */
            function () { return []; });
            this._disabledMinutes = (/**
             * @return {?}
             */
            function () { return []; });
            this._disabledSeconds = (/**
             * @return {?}
             */
            function () { return []; });
            this._allowEmpty = true;
            this.time = new TimeHolder();
            this.hourEnabled = true;
            this.minuteEnabled = true;
            this.secondEnabled = true;
            this.firstScrolled = false;
            this.enabledColumns = 3;
            this.nzInDatePicker = false; // If inside a date-picker, more diff works need to be done
            this.nzHideDisabledOptions = false;
            this.nzUse12Hours = false;
            this.closePanel = new core.EventEmitter();
        }
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzAllowEmpty", {
            get: /**
             * @return {?}
             */
            function () {
                return this._allowEmpty;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._allowEmpty = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzDisabledHours", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabledHours;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabledHours = value;
                if (!!this._disabledHours) {
                    this.buildHours();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzDisabledMinutes", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabledMinutes;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._disabledMinutes = value;
                    this.buildMinutes();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzDisabledSeconds", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabledSeconds;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._disabledSeconds = value;
                    this.buildSeconds();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "format", {
            get: /**
             * @return {?}
             */
            function () {
                return this._format;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._format = value;
                    this.enabledColumns = 0;
                    /** @type {?} */
                    var charSet = new Set(value);
                    this.hourEnabled = charSet.has('H') || charSet.has('h');
                    this.minuteEnabled = charSet.has('m');
                    this.secondEnabled = charSet.has('s');
                    if (this.hourEnabled) {
                        this.enabledColumns++;
                    }
                    if (this.minuteEnabled) {
                        this.enabledColumns++;
                    }
                    if (this.secondEnabled) {
                        this.enabledColumns++;
                    }
                    if (this.nzUse12Hours) {
                        this.build12Hours();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzHourStep", {
            get: /**
             * @return {?}
             */
            function () {
                return this._nzHourStep;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._nzHourStep = value;
                    this.buildHours();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzMinuteStep", {
            get: /**
             * @return {?}
             */
            function () {
                return this._nzMinuteStep;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._nzMinuteStep = value;
                    this.buildMinutes();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTimePickerPanelComponent.prototype, "nzSecondStep", {
            get: /**
             * @return {?}
             */
            function () {
                return this._nzSecondStep;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (util.isNotNil(value)) {
                    this._nzSecondStep = value;
                    this.buildSeconds();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.selectInputRange = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.nzTimeValueAccessorDirective) {
                    _this.nzTimeValueAccessorDirective.setRange();
                }
            }));
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.buildHours = /**
         * @return {?}
         */
        function () {
            var _a;
            /** @type {?} */
            var hourRanges = 24;
            /** @type {?} */
            var disabledHours = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this);
            /** @type {?} */
            var startIndex = 0;
            if (this.nzUse12Hours) {
                hourRanges = 12;
                if (disabledHours) {
                    if (this.time.selected12Hours === 'PM') {
                        /**
                         * Filter and transform hours which greater or equal to 12
                         * [0, 1, 2, ..., 12, 13, 14, 15, ..., 23] => [12, 1, 2, 3, ..., 11]
                         */
                        disabledHours = disabledHours.filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i >= 12; })).map((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return (i > 12 ? i - 12 : i); }));
                    }
                    else {
                        /**
                         * Filter and transform hours which less than 12
                         * [0, 1, 2,..., 12, 13, 14, 15, ...23] => [12, 1, 2, 3, ..., 11]
                         */
                        disabledHours = disabledHours.filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i < 12 || i === 24; })).map((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return (i === 24 || i === 0 ? 12 : i); }));
                    }
                }
                startIndex = 1;
            }
            this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                return {
                    index: r,
                    disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
                };
            }));
            if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
                /** @type {?} */
                var temp = __spread(this.hourRange);
                temp.unshift(temp[temp.length - 1]);
                temp.splice(temp.length - 1, 1);
                this.hourRange = temp;
            }
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.buildMinutes = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.minuteRange = makeRange(60, this.nzMinuteStep).map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                return {
                    index: r,
                    disabled: !!_this.nzDisabledMinutes && _this.nzDisabledMinutes((/** @type {?} */ (_this.time.hours))).indexOf(r) !== -1
                };
            }));
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.buildSeconds = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.secondRange = makeRange(60, this.nzSecondStep).map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                return {
                    index: r,
                    disabled: !!_this.nzDisabledSeconds && _this.nzDisabledSeconds((/** @type {?} */ (_this.time.hours)), (/** @type {?} */ (_this.time.minutes))).indexOf(r) !== -1
                };
            }));
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.build12Hours = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var isUpperFormat = this._format.includes('A');
            this.use12HoursRange = [
                {
                    index: 0,
                    value: isUpperFormat ? 'AM' : 'am'
                },
                {
                    index: 1,
                    value: isUpperFormat ? 'PM' : 'pm'
                }
            ];
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.buildTimes = /**
         * @return {?}
         */
        function () {
            this.buildHours();
            this.buildMinutes();
            this.buildSeconds();
            this.build12Hours();
        };
        /**
         * @param {?=} delay
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.scrollToTime = /**
         * @param {?=} delay
         * @return {?}
         */
        function (delay) {
            if (delay === void 0) { delay = 0; }
            if (this.hourEnabled && this.hourListElement) {
                this.scrollToSelected(this.hourListElement.nativeElement, (/** @type {?} */ (this.time.viewHours)), delay, 'hour');
            }
            if (this.minuteEnabled && this.minuteListElement) {
                this.scrollToSelected(this.minuteListElement.nativeElement, (/** @type {?} */ (this.time.minutes)), delay, 'minute');
            }
            if (this.secondEnabled && this.secondListElement) {
                this.scrollToSelected(this.secondListElement.nativeElement, (/** @type {?} */ (this.time.seconds)), delay, 'second');
            }
            if (this.nzUse12Hours && this.use12HoursListElement) {
                /** @type {?} */
                var selectedHours = this.time.selected12Hours;
                /** @type {?} */
                var index = selectedHours === 'AM' ? 0 : 1;
                this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, '12-hour');
            }
        };
        /**
         * @param {?} hour
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.selectHour = /**
         * @param {?} hour
         * @return {?}
         */
        function (hour) {
            this.time.setHours(hour.index, hour.disabled);
            if (!!this._disabledMinutes) {
                this.buildMinutes();
            }
            if (this._disabledSeconds || this._disabledMinutes) {
                this.buildSeconds();
            }
        };
        /**
         * @param {?} minute
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.selectMinute = /**
         * @param {?} minute
         * @return {?}
         */
        function (minute) {
            this.time.setMinutes(minute.index, minute.disabled);
            if (!!this._disabledSeconds) {
                this.buildSeconds();
            }
        };
        /**
         * @param {?} second
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.selectSecond = /**
         * @param {?} second
         * @return {?}
         */
        function (second) {
            this.time.setSeconds(second.index, second.disabled);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.select12Hours = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.time.setSelected12Hours(value.value);
            if (!!this._disabledHours) {
                this.buildHours();
            }
            if (!!this._disabledMinutes) {
                this.buildMinutes();
            }
            if (!!this._disabledSeconds) {
                this.buildSeconds();
            }
        };
        /**
         * @param {?} instance
         * @param {?} index
         * @param {?=} duration
         * @param {?=} unit
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.scrollToSelected = /**
         * @param {?} instance
         * @param {?} index
         * @param {?=} duration
         * @param {?=} unit
         * @return {?}
         */
        function (instance, index, duration, unit) {
            if (duration === void 0) { duration = 0; }
            if (!instance) {
                return;
            }
            /** @type {?} */
            var transIndex = this.translateIndex(index, unit);
            /** @type {?} */
            var currentOption = (/** @type {?} */ ((instance.children[transIndex] || instance.children[0])));
            this.scrollTo(instance, currentOption.offsetTop, duration);
        };
        /**
         * @param {?} index
         * @param {?} unit
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.translateIndex = /**
         * @param {?} index
         * @param {?} unit
         * @return {?}
         */
        function (index, unit) {
            var _a, _b, _c;
            if (unit === 'hour') {
                return this.calcIndex((_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this), this.hourRange.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.index; })).indexOf(index));
            }
            else if (unit === 'minute') {
                return this.calcIndex((_b = this.nzDisabledMinutes) === null || _b === void 0 ? void 0 : _b.call(this, (/** @type {?} */ (this.time.hours))), this.minuteRange.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.index; })).indexOf(index));
            }
            else if (unit === 'second') {
                // second
                return this.calcIndex((_c = this.nzDisabledSeconds) === null || _c === void 0 ? void 0 : _c.call(this, (/** @type {?} */ (this.time.hours)), (/** @type {?} */ (this.time.minutes))), this.secondRange.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.index; })).indexOf(index));
            }
            else {
                // 12-hour
                return this.calcIndex([], this.use12HoursRange.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.index; })).indexOf(index));
            }
        };
        /**
         * @param {?} element
         * @param {?} to
         * @param {?} duration
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.scrollTo = /**
         * @param {?} element
         * @param {?} to
         * @param {?} duration
         * @return {?}
         */
        function (element, to, duration) {
            var _this = this;
            if (duration <= 0) {
                element.scrollTop = to;
                return;
            }
            /** @type {?} */
            var difference = to - element.scrollTop;
            /** @type {?} */
            var perTick = (difference / duration) * 10;
            polyfill.reqAnimFrame((/**
             * @return {?}
             */
            function () {
                element.scrollTop = element.scrollTop + perTick;
                if (element.scrollTop === to) {
                    return;
                }
                _this.scrollTo(element, to, duration - 10);
            }));
        };
        /**
         * @param {?} array
         * @param {?} index
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.calcIndex = /**
         * @param {?} array
         * @param {?} index
         * @return {?}
         */
        function (array, index) {
            if ((array === null || array === void 0 ? void 0 : array.length) && this.nzHideDisabledOptions) {
                return (index -
                    array.reduce((/**
                     * @param {?} pre
                     * @param {?} value
                     * @return {?}
                     */
                    function (pre, value) {
                        return pre + (value < index ? 1 : 0);
                    }), 0));
            }
            else {
                return index;
            }
        };
        /**
         * @protected
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.changed = /**
         * @protected
         * @return {?}
         */
        function () {
            if (this.onChange) {
                this.onChange((/** @type {?} */ (this.time.value)));
            }
        };
        /**
         * @protected
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.touched = /**
         * @protected
         * @return {?}
         */
        function () {
            if (this.onTouch) {
                this.onTouch();
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.timeDisabled = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _a, _b, _c, _d, _e, _f;
            /** @type {?} */
            var hour = value.getHours();
            /** @type {?} */
            var minute = value.getMinutes();
            /** @type {?} */
            var second = value.getSeconds();
            return (((_b = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this).indexOf(hour)) !== null && _b !== void 0 ? _b : -1) > -1 ||
                ((_d = (_c = this.nzDisabledMinutes) === null || _c === void 0 ? void 0 : _c.call(this, hour).indexOf(minute)) !== null && _d !== void 0 ? _d : -1) > -1 ||
                ((_f = (_e = this.nzDisabledSeconds) === null || _e === void 0 ? void 0 : _e.call(this, hour, minute).indexOf(second)) !== null && _f !== void 0 ? _f : -1) > -1);
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.onClickNow = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var now = new Date();
            if (this.timeDisabled(now)) {
                return;
            }
            this.time.setValue(now);
            this.changed();
            this.closePanel.emit();
        };
        /**
         * @param {?} hour
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.isSelectedHour = /**
         * @param {?} hour
         * @return {?}
         */
        function (hour) {
            return hour.index === this.time.viewHours;
        };
        /**
         * @param {?} minute
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.isSelectedMinute = /**
         * @param {?} minute
         * @return {?}
         */
        function (minute) {
            return minute.index === this.time.minutes;
        };
        /**
         * @param {?} second
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.isSelectedSecond = /**
         * @param {?} second
         * @return {?}
         */
        function (second) {
            return second.index === this.time.seconds;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.isSelected12Hours = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value.value.toUpperCase() === this.time.selected12Hours;
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.time.changes.pipe(operators.takeUntil(this.unsubscribe$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.changed();
                _this.touched();
            }));
            this.buildTimes();
            this.selectInputRange();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.scrollToTime();
                _this.firstScrolled = true;
            }));
        };
        /**
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzUse12Hours = changes.nzUse12Hours, nzDefaultOpenValue = changes.nzDefaultOpenValue;
            if (!(nzUse12Hours === null || nzUse12Hours === void 0 ? void 0 : nzUse12Hours.previousValue) && (nzUse12Hours === null || nzUse12Hours === void 0 ? void 0 : nzUse12Hours.currentValue)) {
                this.build12Hours();
                this.enabledColumns++;
            }
            if (nzDefaultOpenValue === null || nzDefaultOpenValue === void 0 ? void 0 : nzDefaultOpenValue.currentValue) {
                this.time.setDefaultOpenValue(this.nzDefaultOpenValue || new Date());
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.time.setValue(value, this.nzUse12Hours);
            this.buildTimes();
            if (value && this.firstScrolled) {
                this.scrollToTime(120);
            }
            // Mark this component to be checked manually with internal properties changing (see: https://github.com/angular/angular/issues/10816)
            this.cdr.markForCheck();
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzTimePickerPanelComponent.prototype.registerOnChange = /**
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
        NzTimePickerPanelComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouch = fn;
        };
        NzTimePickerPanelComponent.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'nz-time-picker-panel',
                        exportAs: 'nzTimePickerPanel',
                        template: "\n    <div *ngIf=\"nzInDatePicker\" class=\"ant-picker-header\">\n      <div class=\"ant-picker-header-view\">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>\n    </div>\n    <div class=\"ant-picker-content\">\n      <ul *ngIf=\"hourEnabled\" #hourListElement class=\"ant-picker-time-panel-column\" style=\"position: relative;\">\n        <ng-container *ngFor=\"let hour of hourRange\">\n          <li\n            *ngIf=\"!(nzHideDisabledOptions && hour.disabled)\"\n            class=\"ant-picker-time-panel-cell\"\n            (click)=\"selectHour(hour)\"\n            [class.ant-picker-time-panel-cell-selected]=\"isSelectedHour(hour)\"\n            [class.ant-picker-time-panel-cell-disabled]=\"hour.disabled\"\n          >\n            <div class=\"ant-picker-time-panel-cell-inner\">{{ hour.index | number: '2.0-0' }}</div>\n          </li>\n        </ng-container>\n      </ul>\n      <ul *ngIf=\"minuteEnabled\" #minuteListElement class=\"ant-picker-time-panel-column\" style=\"position: relative;\">\n        <ng-container *ngFor=\"let minute of minuteRange\">\n          <li\n            *ngIf=\"!(nzHideDisabledOptions && minute.disabled)\"\n            class=\"ant-picker-time-panel-cell\"\n            (click)=\"selectMinute(minute)\"\n            [class.ant-picker-time-panel-cell-selected]=\"isSelectedMinute(minute)\"\n            [class.ant-picker-time-panel-cell-disabled]=\"minute.disabled\"\n          >\n            <div class=\"ant-picker-time-panel-cell-inner\">{{ minute.index | number: '2.0-0' }}</div>\n          </li>\n        </ng-container>\n      </ul>\n      <ul *ngIf=\"secondEnabled\" #secondListElement class=\"ant-picker-time-panel-column\" style=\"position: relative;\">\n        <ng-container *ngFor=\"let second of secondRange\">\n          <li\n            *ngIf=\"!(nzHideDisabledOptions && second.disabled)\"\n            class=\"ant-picker-time-panel-cell\"\n            (click)=\"selectSecond(second)\"\n            [class.ant-picker-time-panel-cell-selected]=\"isSelectedSecond(second)\"\n            [class.ant-picker-time-panel-cell-disabled]=\"second.disabled\"\n          >\n            <div class=\"ant-picker-time-panel-cell-inner\">{{ second.index | number: '2.0-0' }}</div>\n          </li>\n        </ng-container>\n      </ul>\n      <ul *ngIf=\"nzUse12Hours\" #use12HoursListElement class=\"ant-picker-time-panel-column\" style=\"position: relative;\">\n        <ng-container *ngFor=\"let range of use12HoursRange\">\n          <li\n            *ngIf=\"!nzHideDisabledOptions\"\n            (click)=\"select12Hours(range)\"\n            class=\"ant-picker-time-panel-cell\"\n            [class.ant-picker-time-panel-cell-selected]=\"isSelected12Hours(range)\"\n          >\n            <div class=\"ant-picker-time-panel-cell-inner\">{{ range.value }}</div>\n          </li>\n        </ng-container>\n      </ul>\n    </div>\n    <div *ngIf=\"!nzInDatePicker\" class=\"ant-picker-footer\">\n      <div *ngIf=\"nzAddOn\" class=\"ant-picker-footer-extra\">\n        <ng-template [ngTemplateOutlet]=\"nzAddOn\"></ng-template>\n      </div>\n      <ul class=\"ant-picker-ranges\">\n        <li class=\"ant-picker-now\">\n          <a (click)=\"onClickNow()\">\n            {{ 'Calendar.lang.now' | nzI18n }}\n          </a>\n        </li>\n      </ul>\n    </div>\n  ",
                        host: {
                            '[class.ant-picker-time-panel]': "true",
                            '[class.ant-picker-time-panel-column-0]': "enabledColumns === 0 && !nzInDatePicker",
                            '[class.ant-picker-time-panel-column-1]': "enabledColumns === 1 && !nzInDatePicker",
                            '[class.ant-picker-time-panel-column-2]': "enabledColumns === 2 && !nzInDatePicker",
                            '[class.ant-picker-time-panel-column-3]': "enabledColumns === 3 && !nzInDatePicker",
                            '[class.ant-picker-time-panel-narrow]': "enabledColumns < 3",
                            '[class.ant-picker-time-panel-placement-bottomLeft]': "!nzInDatePicker"
                        },
                        providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }]
                    }] }
        ];
        /** @nocollapse */
        NzTimePickerPanelComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: i18n.DateHelperService }
        ]; };
        NzTimePickerPanelComponent.propDecorators = {
            nzTimeValueAccessorDirective: [{ type: core.ViewChild, args: [NzTimeValueAccessorDirective, { static: false },] }],
            hourListElement: [{ type: core.ViewChild, args: ['hourListElement', { static: false },] }],
            minuteListElement: [{ type: core.ViewChild, args: ['minuteListElement', { static: false },] }],
            secondListElement: [{ type: core.ViewChild, args: ['secondListElement', { static: false },] }],
            use12HoursListElement: [{ type: core.ViewChild, args: ['use12HoursListElement', { static: false },] }],
            nzInDatePicker: [{ type: core.Input }],
            nzAddOn: [{ type: core.Input }],
            nzHideDisabledOptions: [{ type: core.Input }],
            nzClearText: [{ type: core.Input }],
            nzPlaceHolder: [{ type: core.Input }],
            nzUse12Hours: [{ type: core.Input }],
            nzDefaultOpenValue: [{ type: core.Input }],
            closePanel: [{ type: core.Output }],
            nzAllowEmpty: [{ type: core.Input }],
            nzDisabledHours: [{ type: core.Input }],
            nzDisabledMinutes: [{ type: core.Input }],
            nzDisabledSeconds: [{ type: core.Input }],
            format: [{ type: core.Input }],
            nzHourStep: [{ type: core.Input }],
            nzMinuteStep: [{ type: core.Input }],
            nzSecondStep: [{ type: core.Input }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTimePickerPanelComponent.prototype, "nzUse12Hours", void 0);
        return NzTimePickerPanelComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTimePickerPanelComponent.ngAcceptInputType_nzUse12Hours;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._nzHourStep;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._nzMinuteStep;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._nzSecondStep;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype.unsubscribe$;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype.onChange;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype.onTouch;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._format;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._disabledHours;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._disabledMinutes;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._disabledSeconds;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype._allowEmpty;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.time;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.hourEnabled;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.minuteEnabled;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.secondEnabled;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.firstScrolled;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.enabledColumns;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.hourRange;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.minuteRange;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.secondRange;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.use12HoursRange;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzTimeValueAccessorDirective;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.hourListElement;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.minuteListElement;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.secondListElement;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.use12HoursListElement;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzInDatePicker;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzAddOn;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzHideDisabledOptions;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzClearText;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzPlaceHolder;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzUse12Hours;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.nzDefaultOpenValue;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.closePanel;
        /**
         * @type {?}
         * @private
         */
        NzTimePickerPanelComponent.prototype.cdr;
        /** @type {?} */
        NzTimePickerPanelComponent.prototype.dateHelper;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: time-picker.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTimePickerModule = /** @class */ (function () {
        function NzTimePickerModule() {
        }
        NzTimePickerModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NzTimePickerComponent, NzTimePickerPanelComponent, NzTimeValueAccessorDirective],
                        exports: [NzTimePickerPanelComponent, NzTimePickerComponent],
                        imports: [common.CommonModule, forms.FormsModule, i18n.NzI18nModule, overlay.OverlayModule, icon.NzIconModule, overlay$1.NzOverlayModule, outlet.NzOutletModule]
                    },] }
        ];
        return NzTimePickerModule;
    }());

    exports.NzTimePickerComponent = NzTimePickerComponent;
    exports.NzTimePickerModule = NzTimePickerModule;
    exports.NzTimePickerPanelComponent = NzTimePickerPanelComponent;
    exports.NzTimeValueAccessorDirective = NzTimeValueAccessorDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-time-picker.umd.js.map
