(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('ngx-window-token'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-clipboard', ['exports', '@angular/common', '@angular/core', 'ngx-window-token', 'rxjs'], factory) :
    (global = global || self, factory(global['ngx-clipboard'] = {}, global.ng.common, global.ng.core, global.ngxWindowToken, global.rxjs));
}(this, (function (exports, common, core, ngxWindowToken, rxjs) { 'use strict';

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
     * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
     */
    var ClipboardService = /** @class */ (function () {
        function ClipboardService(document, window) {
            this.document = document;
            this.window = window;
            this.copySubject = new rxjs.Subject();
            this.copyResponse$ = this.copySubject.asObservable();
            this.config = {};
        }
        ClipboardService.prototype.configure = function (config) {
            this.config = config;
        };
        ClipboardService.prototype.copy = function (content) {
            if (!this.isSupported || !content) {
                return this.pushCopyResponse({ isSuccess: false, content: content });
            }
            var copyResult = this.copyFromContent(content);
            if (copyResult) {
                return this.pushCopyResponse({ content: content, isSuccess: copyResult });
            }
            return this.pushCopyResponse({ isSuccess: false, content: content });
        };
        Object.defineProperty(ClipboardService.prototype, "isSupported", {
            get: function () {
                return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
            },
            enumerable: true,
            configurable: true
        });
        ClipboardService.prototype.isTargetValid = function (element) {
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                if (element.hasAttribute('disabled')) {
                    throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                }
                return true;
            }
            throw new Error('Target should be input or textarea');
        };
        /**
         * Attempts to copy from an input `targetElm`
         */
        ClipboardService.prototype.copyFromInputElement = function (targetElm, isFocus) {
            if (isFocus === void 0) { isFocus = true; }
            try {
                this.selectTarget(targetElm);
                var re = this.copyText();
                this.clearSelection(isFocus ? targetElm : undefined, this.window);
                return re && this.isCopySuccessInIE11();
            }
            catch (error) {
                return false;
            }
        };
        /**
         * This is a hack for IE11 to return `true` even if copy fails.
         */
        ClipboardService.prototype.isCopySuccessInIE11 = function () {
            var clipboardData = this.window['clipboardData'];
            if (clipboardData && clipboardData.getData) {
                if (!clipboardData.getData('Text')) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Creates a fake textarea element, sets its value from `text` property,
         * and makes a selection on it.
         */
        ClipboardService.prototype.copyFromContent = function (content, container) {
            if (container === void 0) { container = this.document.body; }
            // check if the temp textarea still belongs to the current container.
            // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
            if (this.tempTextArea && !container.contains(this.tempTextArea)) {
                this.destroy(this.tempTextArea.parentElement);
            }
            if (!this.tempTextArea) {
                this.tempTextArea = this.createTempTextArea(this.document, this.window);
                try {
                    container.appendChild(this.tempTextArea);
                }
                catch (error) {
                    throw new Error('Container should be a Dom element');
                }
            }
            this.tempTextArea.value = content;
            var toReturn = this.copyFromInputElement(this.tempTextArea, false);
            if (this.config.cleanUpAfterCopy) {
                this.destroy(this.tempTextArea.parentElement);
            }
            return toReturn;
        };
        /**
         * Remove temporary textarea if any exists.
         */
        ClipboardService.prototype.destroy = function (container) {
            if (container === void 0) { container = this.document.body; }
            if (this.tempTextArea) {
                container.removeChild(this.tempTextArea);
                // removeChild doesn't remove the reference from memory
                this.tempTextArea = undefined;
            }
        };
        /**
         * Select the target html input element.
         */
        ClipboardService.prototype.selectTarget = function (inputElement) {
            inputElement.select();
            inputElement.setSelectionRange(0, inputElement.value.length);
            return inputElement.value.length;
        };
        ClipboardService.prototype.copyText = function () {
            return this.document.execCommand('copy');
        };
        /**
         * Moves focus away from `target` and back to the trigger, removes current selection.
         */
        ClipboardService.prototype.clearSelection = function (inputElement, window) {
            inputElement && inputElement.focus();
            window.getSelection().removeAllRanges();
        };
        /**
         * Creates a fake textarea for copy command.
         */
        ClipboardService.prototype.createTempTextArea = function (doc, window) {
            var isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
            var ta;
            ta = doc.createElement('textarea');
            // Prevent zooming on iOS
            ta.style.fontSize = '12pt';
            // Reset box model
            ta.style.border = '0';
            ta.style.padding = '0';
            ta.style.margin = '0';
            // Move element out of screen horizontally
            ta.style.position = 'absolute';
            ta.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            var yPosition = window.pageYOffset || doc.documentElement.scrollTop;
            ta.style.top = yPosition + 'px';
            ta.setAttribute('readonly', '');
            return ta;
        };
        /**
         * Pushes copy operation response to copySubject, to provide global access
         * to the response.
         */
        ClipboardService.prototype.pushCopyResponse = function (response) {
            this.copySubject.next(response);
        };
        /**
         * @deprecated use pushCopyResponse instead.
         */
        ClipboardService.prototype.pushCopyReponse = function (response) {
            this.pushCopyResponse(response);
        };
        ClipboardService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ngxWindowToken.WINDOW,] }] }
        ]; };
        ClipboardService.??prov = core["????defineInjectable"]({ factory: function ClipboardService_Factory() { return new ClipboardService(core["????inject"](common.DOCUMENT), core["????inject"](ngxWindowToken.WINDOW, 8)); }, token: ClipboardService, providedIn: "root" });
        ClipboardService = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Inject(common.DOCUMENT)), __param(1, core.Optional()), __param(1, core.Inject(ngxWindowToken.WINDOW))
        ], ClipboardService);
        return ClipboardService;
    }());

    var ClipboardDirective = /** @class */ (function () {
        function ClipboardDirective(clipboardSrv) {
            this.clipboardSrv = clipboardSrv;
            this.cbOnSuccess = new core.EventEmitter();
            this.cbOnError = new core.EventEmitter();
        }
        // tslint:disable-next-line:no-empty
        ClipboardDirective.prototype.ngOnInit = function () { };
        ClipboardDirective.prototype.ngOnDestroy = function () {
            this.clipboardSrv.destroy(this.container);
        };
        ClipboardDirective.prototype.onClick = function (event) {
            if (!this.clipboardSrv.isSupported) {
                this.handleResult(false, undefined, event);
            }
            else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
                this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
            }
            else if (this.cbContent) {
                this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
            }
        };
        /**
         * Fires an event based on the copy operation result.
         * @param succeeded
         */
        ClipboardDirective.prototype.handleResult = function (succeeded, copiedContent, event) {
            var response = {
                isSuccess: succeeded,
                event: event
            };
            if (succeeded) {
                response = Object.assign(response, {
                    content: copiedContent,
                    successMessage: this.cbSuccessMsg
                });
                this.cbOnSuccess.emit(response);
            }
            else {
                this.cbOnError.emit(response);
            }
            this.clipboardSrv.pushCopyResponse(response);
        };
        ClipboardDirective.ctorParameters = function () { return [
            { type: ClipboardService }
        ]; };
        __decorate([
            core.Input('ngxClipboard')
        ], ClipboardDirective.prototype, "targetElm", void 0);
        __decorate([
            core.Input()
        ], ClipboardDirective.prototype, "container", void 0);
        __decorate([
            core.Input()
        ], ClipboardDirective.prototype, "cbContent", void 0);
        __decorate([
            core.Input()
        ], ClipboardDirective.prototype, "cbSuccessMsg", void 0);
        __decorate([
            core.Output()
        ], ClipboardDirective.prototype, "cbOnSuccess", void 0);
        __decorate([
            core.Output()
        ], ClipboardDirective.prototype, "cbOnError", void 0);
        __decorate([
            core.HostListener('click', ['$event.target'])
        ], ClipboardDirective.prototype, "onClick", null);
        ClipboardDirective = __decorate([
            core.Directive({
                selector: '[ngxClipboard]'
            })
        ], ClipboardDirective);
        return ClipboardDirective;
    }());

    var ClipboardIfSupportedDirective = /** @class */ (function () {
        function ClipboardIfSupportedDirective(_clipboardService, _viewContainerRef, _templateRef) {
            this._clipboardService = _clipboardService;
            this._viewContainerRef = _viewContainerRef;
            this._templateRef = _templateRef;
        }
        ClipboardIfSupportedDirective.prototype.ngOnInit = function () {
            if (this._clipboardService.isSupported) {
                this._viewContainerRef.createEmbeddedView(this._templateRef);
            }
        };
        ClipboardIfSupportedDirective.ctorParameters = function () { return [
            { type: ClipboardService },
            { type: core.ViewContainerRef },
            { type: core.TemplateRef }
        ]; };
        ClipboardIfSupportedDirective = __decorate([
            core.Directive({
                selector: '[ngxClipboardIfSupported]'
            })
        ], ClipboardIfSupportedDirective);
        return ClipboardIfSupportedDirective;
    }());

    var ClipboardModule = /** @class */ (function () {
        function ClipboardModule() {
        }
        ClipboardModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
                exports: [ClipboardDirective, ClipboardIfSupportedDirective]
            })
        ], ClipboardModule);
        return ClipboardModule;
    }());

    exports.ClipboardDirective = ClipboardDirective;
    exports.ClipboardIfSupportedDirective = ClipboardIfSupportedDirective;
    exports.ClipboardModule = ClipboardModule;
    exports.ClipboardService = ClipboardService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-clipboard.umd.js.map
