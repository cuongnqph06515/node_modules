(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/clipboard'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/core/trans-button'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/input'), require('ng-zorro-antd/tooltip'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/core/polyfill'), require('ng-zorro-antd/core/services'), require('ng-zorro-antd/core/util')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/typography', ['exports', '@angular/cdk/clipboard', '@angular/cdk/platform', '@angular/common', '@angular/core', 'ng-zorro-antd/core/trans-button', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon', 'ng-zorro-antd/input', 'ng-zorro-antd/tooltip', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/polyfill', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/util'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].typography = {}), global.ng.cdk.clipboard, global.ng.cdk.platform, global.ng.common, global.ng.core, global['ng-zorro-antd'].core['trans-button'], global['ng-zorro-antd'].i18n, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].input, global['ng-zorro-antd'].tooltip, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].core.polyfill, global['ng-zorro-antd'].core.services, global['ng-zorro-antd'].core.util));
}(this, (function (exports, clipboard, platform, common, core, transButton, i18n, icon, input, tooltip, rxjs, operators, config, polyfill, services, util) { 'use strict';

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
     * Generated from: text-copy.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTextCopyComponent = /** @class */ (function () {
        function NzTextCopyComponent(host, cdr, clipboard, i18n) {
            this.host = host;
            this.cdr = cdr;
            this.clipboard = clipboard;
            this.i18n = i18n;
            this.copied = false;
            this.copyId = -1;
            this.nativeElement = this.host.nativeElement;
            this.destroy$ = new rxjs.Subject();
            this.textCopy = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NzTextCopyComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.locale = _this.i18n.getLocaleData('Text');
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzTextCopyComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            clearTimeout(this.copyId);
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @return {?}
         */
        NzTextCopyComponent.prototype.onClick = /**
         * @return {?}
         */
        function () {
            if (this.copied) {
                return;
            }
            this.copied = true;
            this.cdr.detectChanges();
            /** @type {?} */
            var text = this.text;
            this.textCopy.emit(text);
            this.clipboard.copy(text);
            this.onCopied();
        };
        /**
         * @return {?}
         */
        NzTextCopyComponent.prototype.onCopied = /**
         * @return {?}
         */
        function () {
            var _this = this;
            clearTimeout(this.copyId);
            this.copyId = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.copied = false;
                _this.cdr.detectChanges();
            }), 3000);
        };
        NzTextCopyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-text-copy',
                        exportAs: 'nzTextCopy',
                        template: "\n    <button\n      nz-tooltip\n      nz-trans-button\n      [nzTooltipTitle]=\"copied ? locale?.copied : locale?.copy\"\n      class=\"ant-typography-copy\"\n      [class.ant-typography-copy-success]=\"copied\"\n      (click)=\"onClick()\"\n    >\n      <i nz-icon [nzType]=\"copied ? 'check' : 'copy'\"></i>\n    </button>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        NzTextCopyComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: clipboard.Clipboard },
            { type: i18n.NzI18nService }
        ]; };
        NzTextCopyComponent.propDecorators = {
            text: [{ type: core.Input }],
            textCopy: [{ type: core.Output }]
        };
        return NzTextCopyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTextCopyComponent.prototype.copied;
        /** @type {?} */
        NzTextCopyComponent.prototype.copyId;
        /** @type {?} */
        NzTextCopyComponent.prototype.locale;
        /** @type {?} */
        NzTextCopyComponent.prototype.nativeElement;
        /**
         * @type {?}
         * @private
         */
        NzTextCopyComponent.prototype.destroy$;
        /** @type {?} */
        NzTextCopyComponent.prototype.text;
        /** @type {?} */
        NzTextCopyComponent.prototype.textCopy;
        /**
         * @type {?}
         * @private
         */
        NzTextCopyComponent.prototype.host;
        /**
         * @type {?}
         * @private
         */
        NzTextCopyComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTextCopyComponent.prototype.clipboard;
        /**
         * @type {?}
         * @private
         */
        NzTextCopyComponent.prototype.i18n;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: text-edit.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTextEditComponent = /** @class */ (function () {
        function NzTextEditComponent(host, cdr, i18n) {
            this.host = host;
            this.cdr = cdr;
            this.i18n = i18n;
            this.editing = false;
            this.destroy$ = new rxjs.Subject();
            this.startEditing = new core.EventEmitter();
            this.endEditing = new core.EventEmitter();
            this.nativeElement = this.host.nativeElement;
        }
        /**
         * @return {?}
         */
        NzTextEditComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.locale = _this.i18n.getLocaleData('Text');
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzTextEditComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @return {?}
         */
        NzTextEditComponent.prototype.onClick = /**
         * @return {?}
         */
        function () {
            this.beforeText = this.text;
            this.currentText = this.beforeText;
            this.editing = true;
            this.startEditing.emit();
            this.focusAndSetValue();
        };
        /**
         * @return {?}
         */
        NzTextEditComponent.prototype.confirm = /**
         * @return {?}
         */
        function () {
            this.editing = false;
            this.endEditing.emit(this.currentText);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTextEditComponent.prototype.onInput = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = (/** @type {?} */ (event.target));
            this.currentText = target.value;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NzTextEditComponent.prototype.onEnter = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.stopPropagation();
            event.preventDefault();
            this.confirm();
        };
        /**
         * @return {?}
         */
        NzTextEditComponent.prototype.onCancel = /**
         * @return {?}
         */
        function () {
            this.currentText = this.beforeText;
            this.confirm();
        };
        /**
         * @return {?}
         */
        NzTextEditComponent.prototype.focusAndSetValue = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                var _a;
                if ((_a = _this.textarea) === null || _a === void 0 ? void 0 : _a.nativeElement) {
                    _this.textarea.nativeElement.focus();
                    _this.textarea.nativeElement.value = _this.currentText || '';
                    _this.autosizeDirective.resizeToFitContent();
                }
            }));
        };
        NzTextEditComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-text-edit',
                        exportAs: 'nzTextEdit',
                        template: "\n    <button *ngIf=\"!editing\" [nzTooltipTitle]=\"locale?.edit\" nz-tooltip nz-trans-button class=\"ant-typography-edit\" (click)=\"onClick()\">\n      <i nz-icon nzType=\"edit\"></i>\n    </button>\n    <ng-container *ngIf=\"editing\">\n      <textarea\n        #textarea\n        nz-input\n        nzAutosize\n        (input)=\"onInput($event)\"\n        (blur)=\"confirm()\"\n        (keydown.esc)=\"onCancel()\"\n        (keydown.enter)=\"onEnter($event)\"\n      >\n      </textarea>\n      <button nz-trans-button class=\"ant-typography-edit-content-confirm\" (click)=\"confirm()\">\n        <i nz-icon nzType=\"enter\"></i>\n      </button>\n    </ng-container>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        NzTextEditComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: i18n.NzI18nService }
        ]; };
        NzTextEditComponent.propDecorators = {
            text: [{ type: core.Input }],
            startEditing: [{ type: core.Output }],
            endEditing: [{ type: core.Output }],
            textarea: [{ type: core.ViewChild, args: ['textarea', { static: false },] }],
            autosizeDirective: [{ type: core.ViewChild, args: [input.NzAutosizeDirective, { static: false },] }]
        };
        return NzTextEditComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTextEditComponent.prototype.editing;
        /** @type {?} */
        NzTextEditComponent.prototype.locale;
        /**
         * @type {?}
         * @private
         */
        NzTextEditComponent.prototype.destroy$;
        /** @type {?} */
        NzTextEditComponent.prototype.text;
        /** @type {?} */
        NzTextEditComponent.prototype.startEditing;
        /** @type {?} */
        NzTextEditComponent.prototype.endEditing;
        /** @type {?} */
        NzTextEditComponent.prototype.textarea;
        /** @type {?} */
        NzTextEditComponent.prototype.autosizeDirective;
        /** @type {?} */
        NzTextEditComponent.prototype.beforeText;
        /** @type {?} */
        NzTextEditComponent.prototype.currentText;
        /** @type {?} */
        NzTextEditComponent.prototype.nativeElement;
        /**
         * @type {?}
         * @private
         */
        NzTextEditComponent.prototype.host;
        /**
         * @type {?}
         * @private
         */
        NzTextEditComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTextEditComponent.prototype.i18n;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: typography.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_CONFIG_COMPONENT_NAME = 'typography';
    /** @type {?} */
    var EXPAND_ELEMENT_CLASSNAME = 'ant-typography-expand';
    var NzTypographyComponent = /** @class */ (function () {
        function NzTypographyComponent(nzConfigService, host, cdr, viewContainerRef, renderer, platform, i18n, document, resizeService) {
            this.nzConfigService = nzConfigService;
            this.host = host;
            this.cdr = cdr;
            this.viewContainerRef = viewContainerRef;
            this.renderer = renderer;
            this.platform = platform;
            this.i18n = i18n;
            this.resizeService = resizeService;
            this.nzCopyable = false;
            this.nzEditable = false;
            this.nzDisabled = false;
            this.nzExpandable = false;
            this.nzEllipsis = false;
            this.nzEllipsisRows = 1;
            this.nzContentChange = new core.EventEmitter();
            this.nzCopy = new core.EventEmitter();
            this.nzExpandChange = new core.EventEmitter();
            // This is not a two-way binding output with {@link nzEllipsis}
            this.nzOnEllipsis = new core.EventEmitter();
            this.expandableBtnElementCache = null;
            this.editing = false;
            this.cssEllipsis = false;
            this.isEllipsis = true;
            this.expanded = false;
            this.ellipsisStr = '...';
            this.viewInit = false;
            this.rfaId = -1;
            this.destroy$ = new rxjs.Subject();
            this.windowResizeSubscription = rxjs.Subscription.EMPTY;
            this.document = document;
        }
        Object.defineProperty(NzTypographyComponent.prototype, "hasEllipsisObservers", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzOnEllipsis.observers.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTypographyComponent.prototype, "canCssEllipsis", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzTypographyComponent.prototype, "copyText", {
            get: /**
             * @return {?}
             */
            function () {
                return (/** @type {?} */ ((typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent)));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} text
         * @return {?}
         */
        NzTypographyComponent.prototype.onTextCopy = /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            this.nzCopy.emit(text);
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.onStartEditing = /**
         * @return {?}
         */
        function () {
            this.editing = true;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        NzTypographyComponent.prototype.onEndEditing = /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            this.editing = false;
            this.nzContentChange.emit(text);
            if (this.nzContent === text) {
                this.renderOnNextFrame();
            }
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.onExpand = /**
         * @return {?}
         */
        function () {
            this.isEllipsis = false;
            this.expanded = true;
            this.nzExpandChange.emit();
            this.nzOnEllipsis.emit(false);
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.canUseCSSEllipsis = /**
         * @return {?}
         */
        function () {
            if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
                return false;
            }
            // make sure {@link nzOnEllipsis} works, will force use JS to calculations
            if (this.hasEllipsisObservers) {
                return false;
            }
            if (this.nzEllipsisRows === 1) {
                return util.isStyleSupport('textOverflow');
            }
            else {
                return util.isStyleSupport('webkitLineClamp');
            }
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.renderOnNextFrame = /**
         * @return {?}
         */
        function () {
            var _this = this;
            polyfill.cancelRequestAnimationFrame(this.rfaId);
            if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
                return;
            }
            this.rfaId = polyfill.reqAnimFrame((/**
             * @return {?}
             */
            function () {
                _this.syncEllipsis();
            }));
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.getOriginContentViewRef = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var viewRef = this.viewContainerRef.createEmbeddedView((/** @type {?} */ (this.contentTemplate)), {
                content: (/** @type {?} */ (this.nzContent))
            });
            viewRef.detectChanges();
            return {
                viewRef: viewRef,
                removeView: (/**
                 * @return {?}
                 */
                function () {
                    _this.viewContainerRef.remove(_this.viewContainerRef.indexOf(viewRef));
                })
            };
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.syncEllipsis = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.cssEllipsis) {
                return;
            }
            var _a = this.getOriginContentViewRef(), viewRef = _a.viewRef, removeView = _a.removeView;
            /** @type {?} */
            var fixedNodes = [this.textCopyRef, this.textEditRef].filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e && e.nativeElement; })).map((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return (/** @type {?} */ (e)).nativeElement; }));
            /** @type {?} */
            var expandableBtnElement = this.getExpandableBtnElement();
            if (expandableBtnElement) {
                fixedNodes.push(expandableBtnElement);
            }
            var _b = util.measure(this.host.nativeElement, this.nzEllipsisRows, viewRef.rootNodes, fixedNodes, this.ellipsisStr, this.nzSuffix), contentNodes = _b.contentNodes, text = _b.text, ellipsis = _b.ellipsis;
            removeView();
            this.ellipsisText = text;
            if (ellipsis !== this.isEllipsis) {
                this.isEllipsis = ellipsis;
                this.nzOnEllipsis.emit(ellipsis);
            }
            /** @type {?} */
            var ellipsisContainerNativeElement = (/** @type {?} */ (this.ellipsisContainer)).nativeElement;
            while (ellipsisContainerNativeElement.firstChild) {
                this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
            }
            contentNodes.forEach((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                _this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
            }));
            this.cdr.markForCheck();
        };
        // Need to create the element for calculation size before view init
        // Need to create the element for calculation size before view init
        /**
         * @private
         * @return {?}
         */
        NzTypographyComponent.prototype.getExpandableBtnElement = 
        // Need to create the element for calculation size before view init
        /**
         * @private
         * @return {?}
         */
        function () {
            if (this.nzExpandable) {
                /** @type {?} */
                var expandText = this.locale ? this.locale.expand : '';
                /** @type {?} */
                var cache = this.expandableBtnElementCache;
                if (!cache || cache.innerText === expandText) {
                    /** @type {?} */
                    var el = this.document.createElement('a');
                    el.className = EXPAND_ELEMENT_CLASSNAME;
                    el.innerText = expandText;
                    this.expandableBtnElementCache = el;
                }
                return this.expandableBtnElementCache;
            }
            else {
                this.expandableBtnElementCache = null;
                return null;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzTypographyComponent.prototype.renderAndSubscribeWindowResize = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.platform.isBrowser) {
                this.windowResizeSubscription.unsubscribe();
                this.cssEllipsis = this.canUseCSSEllipsis();
                this.renderOnNextFrame();
                this.windowResizeSubscription = this.resizeService
                    .subscribe()
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.renderOnNextFrame(); }));
            }
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.locale = _this.i18n.getLocaleData('Text');
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.viewInit = true;
            this.renderAndSubscribeWindowResize();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzTypographyComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzCopyable = changes.nzCopyable, nzEditable = changes.nzEditable, nzExpandable = changes.nzExpandable, nzEllipsis = changes.nzEllipsis, nzContent = changes.nzContent, nzEllipsisRows = changes.nzEllipsisRows, nzSuffix = changes.nzSuffix;
            if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
                if (this.nzEllipsis) {
                    if (this.expanded) {
                        this.windowResizeSubscription.unsubscribe();
                    }
                    else {
                        this.renderAndSubscribeWindowResize();
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        NzTypographyComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            this.expandableBtnElementCache = null;
            this.windowResizeSubscription.unsubscribe();
        };
        NzTypographyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "\n  nz-typography,\n  [nz-typography],\n  p[nz-paragraph],\n  span[nz-text],\n  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]\n  ",
                        exportAs: 'nzTypography',
                        template: "\n    <ng-template #contentTemplate let-content=\"content\">\n      <ng-content *ngIf=\"!content\"></ng-content>\n      {{ content }}\n    </ng-template>\n    <ng-container *ngIf=\"!editing\">\n      <ng-container\n        *ngIf=\"\n          expanded || (!nzExpandable && nzEllipsisRows === 1 && !hasEllipsisObservers) || canCssEllipsis || (nzSuffix && expanded);\n          else jsEllipsis\n        \"\n      >\n        <ng-template [ngTemplateOutlet]=\"contentTemplate\" [ngTemplateOutletContext]=\"{ content: nzContent }\"></ng-template>\n        <ng-container *ngIf=\"nzSuffix\">{{ nzSuffix }}</ng-container>\n      </ng-container>\n      <ng-template #jsEllipsis>\n        <span #ellipsisContainer></span>\n        <ng-container *ngIf=\"isEllipsis\">{{ ellipsisStr }}</ng-container>\n        <ng-container *ngIf=\"nzSuffix\">{{ nzSuffix }}</ng-container>\n        <a #expandable *ngIf=\"nzExpandable && isEllipsis\" class=\"ant-typography-expand\" (click)=\"onExpand()\">{{ locale?.expand }}</a>\n      </ng-template>\n    </ng-container>\n\n    <nz-text-edit *ngIf=\"nzEditable\" [text]=\"nzContent\" (endEditing)=\"onEndEditing($event)\" (startEditing)=\"onStartEditing()\">\n    </nz-text-edit>\n\n    <nz-text-copy *ngIf=\"nzCopyable && !editing\" [text]=\"copyText\" (textCopy)=\"onTextCopy($event)\"></nz-text-copy>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false,
                        host: {
                            '[class.ant-typography]': '!editing',
                            '[class.ant-typography-edit-content]': 'editing',
                            '[class.ant-typography-secondary]': 'nzType === "secondary"',
                            '[class.ant-typography-warning]': 'nzType === "warning"',
                            '[class.ant-typography-danger]': 'nzType === "danger"',
                            '[class.ant-typography-disabled]': 'nzDisabled',
                            '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
                            '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
                            '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
                            '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzTypographyComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: core.ViewContainerRef },
            { type: core.Renderer2 },
            { type: platform.Platform },
            { type: i18n.NzI18nService },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: services.NzResizeService }
        ]; };
        NzTypographyComponent.propDecorators = {
            nzCopyable: [{ type: core.Input }],
            nzEditable: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzExpandable: [{ type: core.Input }],
            nzEllipsis: [{ type: core.Input }],
            nzContent: [{ type: core.Input }],
            nzEllipsisRows: [{ type: core.Input }],
            nzType: [{ type: core.Input }],
            nzCopyText: [{ type: core.Input }],
            nzSuffix: [{ type: core.Input }],
            nzContentChange: [{ type: core.Output }],
            nzCopy: [{ type: core.Output }],
            nzExpandChange: [{ type: core.Output }],
            nzOnEllipsis: [{ type: core.Output }],
            textEditRef: [{ type: core.ViewChild, args: [NzTextEditComponent, { static: false },] }],
            textCopyRef: [{ type: core.ViewChild, args: [NzTextCopyComponent, { static: false },] }],
            ellipsisContainer: [{ type: core.ViewChild, args: ['ellipsisContainer', { static: false },] }],
            expandableBtn: [{ type: core.ViewChild, args: ['expandable', { static: false },] }],
            contentTemplate: [{ type: core.ViewChild, args: ['contentTemplate', { static: false },] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTypographyComponent.prototype, "nzCopyable", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTypographyComponent.prototype, "nzEditable", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTypographyComponent.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTypographyComponent.prototype, "nzExpandable", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzTypographyComponent.prototype, "nzEllipsis", void 0);
        __decorate([
            config.WithConfig(NZ_CONFIG_COMPONENT_NAME), util.InputNumber(),
            __metadata("design:type", Number)
        ], NzTypographyComponent.prototype, "nzEllipsisRows", void 0);
        return NzTypographyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzTypographyComponent.ngAcceptInputType_nzCopyable;
        /** @type {?} */
        NzTypographyComponent.ngAcceptInputType_nzEditable;
        /** @type {?} */
        NzTypographyComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzTypographyComponent.ngAcceptInputType_nzExpandable;
        /** @type {?} */
        NzTypographyComponent.ngAcceptInputType_nzEllipsis;
        /** @type {?} */
        NzTypographyComponent.ngAcceptInputType_nzEllipsisRows;
        /** @type {?} */
        NzTypographyComponent.prototype.nzCopyable;
        /** @type {?} */
        NzTypographyComponent.prototype.nzEditable;
        /** @type {?} */
        NzTypographyComponent.prototype.nzDisabled;
        /** @type {?} */
        NzTypographyComponent.prototype.nzExpandable;
        /** @type {?} */
        NzTypographyComponent.prototype.nzEllipsis;
        /** @type {?} */
        NzTypographyComponent.prototype.nzContent;
        /** @type {?} */
        NzTypographyComponent.prototype.nzEllipsisRows;
        /** @type {?} */
        NzTypographyComponent.prototype.nzType;
        /** @type {?} */
        NzTypographyComponent.prototype.nzCopyText;
        /** @type {?} */
        NzTypographyComponent.prototype.nzSuffix;
        /** @type {?} */
        NzTypographyComponent.prototype.nzContentChange;
        /** @type {?} */
        NzTypographyComponent.prototype.nzCopy;
        /** @type {?} */
        NzTypographyComponent.prototype.nzExpandChange;
        /** @type {?} */
        NzTypographyComponent.prototype.nzOnEllipsis;
        /** @type {?} */
        NzTypographyComponent.prototype.textEditRef;
        /** @type {?} */
        NzTypographyComponent.prototype.textCopyRef;
        /** @type {?} */
        NzTypographyComponent.prototype.ellipsisContainer;
        /** @type {?} */
        NzTypographyComponent.prototype.expandableBtn;
        /** @type {?} */
        NzTypographyComponent.prototype.contentTemplate;
        /** @type {?} */
        NzTypographyComponent.prototype.locale;
        /** @type {?} */
        NzTypographyComponent.prototype.document;
        /** @type {?} */
        NzTypographyComponent.prototype.expandableBtnElementCache;
        /** @type {?} */
        NzTypographyComponent.prototype.editing;
        /** @type {?} */
        NzTypographyComponent.prototype.ellipsisText;
        /** @type {?} */
        NzTypographyComponent.prototype.cssEllipsis;
        /** @type {?} */
        NzTypographyComponent.prototype.isEllipsis;
        /** @type {?} */
        NzTypographyComponent.prototype.expanded;
        /** @type {?} */
        NzTypographyComponent.prototype.ellipsisStr;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.viewInit;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.rfaId;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.windowResizeSubscription;
        /** @type {?} */
        NzTypographyComponent.prototype.nzConfigService;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.host;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.platform;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.i18n;
        /**
         * @type {?}
         * @private
         */
        NzTypographyComponent.prototype.resizeService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: typography.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTypographyModule = /** @class */ (function () {
        function NzTypographyModule() {
        }
        NzTypographyModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, icon.NzIconModule, tooltip.NzToolTipModule, input.NzInputModule, i18n.NzI18nModule, transButton.NzTransButtonModule, clipboard.ClipboardModule],
                        exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, platform.PlatformModule],
                        declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
                    },] }
        ];
        return NzTypographyModule;
    }());

    exports.NzTextCopyComponent = NzTextCopyComponent;
    exports.NzTextEditComponent = NzTextEditComponent;
    exports.NzTypographyComponent = NzTypographyComponent;
    exports.NzTypographyModule = NzTypographyModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-typography.umd.js.map
