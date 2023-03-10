(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('ng-zorro-antd/icon'), require('rxjs'), require('@angular/cdk/keycodes'), require('@angular/cdk/portal'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/util')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/mention', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/forms', 'ng-zorro-antd/icon', 'rxjs', '@angular/cdk/keycodes', '@angular/cdk/portal', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/util'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].mention = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.forms, global['ng-zorro-antd'].icon, global.rxjs, global.ng.cdk.keycodes, global.ng.cdk.portal, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core.util));
}(this, (function (exports, overlay, common, core, forms, icon, rxjs, keycodes, portal, overlay$1, util) { 'use strict';

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
     * Generated from: mention-suggestions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMentionSuggestionDirective = /** @class */ (function () {
        function NzMentionSuggestionDirective() {
        }
        NzMentionSuggestionDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nzMentionSuggestion]',
                        exportAs: 'nzMentionSuggestion'
                    },] }
        ];
        return NzMentionSuggestionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: mention.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMentionService = /** @class */ (function () {
        function NzMentionService() {
            this.triggerChange$ = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        NzMentionService.prototype.triggerChanged = /**
         * @return {?}
         */
        function () {
            return this.triggerChange$.asObservable();
        };
        /**
         * @param {?} trigger
         * @return {?}
         */
        NzMentionService.prototype.registerTrigger = /**
         * @param {?} trigger
         * @return {?}
         */
        function (trigger) {
            if (this.trigger !== trigger) {
                this.trigger = trigger;
                this.triggerChange$.next(trigger);
            }
        };
        /**
         * @return {?}
         */
        NzMentionService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.triggerChange$.complete();
        };
        NzMentionService.decorators = [
            { type: core.Injectable }
        ];
        return NzMentionService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzMentionService.prototype.trigger;
        /**
         * @type {?}
         * @private
         */
        NzMentionService.prototype.triggerChange$;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: mention-trigger.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_MENTION_TRIGGER_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return NzMentionTriggerDirective; })),
        multi: true
    };
    var NzMentionTriggerDirective = /** @class */ (function () {
        function NzMentionTriggerDirective(el, nzMentionService) {
            this.el = el;
            this.nzMentionService = nzMentionService;
            this.onChange = (/**
             * @return {?}
             */
            function () { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            this.onFocusin = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onInput = new core.EventEmitter();
            this.onKeydown = new core.EventEmitter();
            this.onClick = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.completeEvents = /**
         * @return {?}
         */
        function () {
            this.onFocusin.complete();
            this.onBlur.complete();
            this.onInput.complete();
            this.onKeydown.complete();
            this.onClick.complete();
        };
        /**
         * @param {?=} caretPos
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.focus = /**
         * @param {?=} caretPos
         * @return {?}
         */
        function (caretPos) {
            this.el.nativeElement.focus();
            this.el.nativeElement.setSelectionRange(caretPos, caretPos);
        };
        /**
         * @param {?} mention
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.insertMention = /**
         * @param {?} mention
         * @return {?}
         */
        function (mention) {
            /** @type {?} */
            var value = this.el.nativeElement.value;
            /** @type {?} */
            var insertValue = mention.mention.trim() + ' ';
            /** @type {?} */
            var newValue = [value.slice(0, mention.startPos + 1), insertValue, value.slice(mention.endPos, value.length)].join('');
            this.el.nativeElement.value = newValue;
            this.focus(mention.startPos + insertValue.length + 1);
            this.onChange(newValue);
            this.value = newValue;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
            if (typeof value === 'string') {
                this.el.nativeElement.value = value;
            }
            else {
                this.el.nativeElement.value = '';
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.registerOnChange = /**
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
        NzMentionTriggerDirective.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.nzMentionService.registerTrigger(this);
        };
        /**
         * @return {?}
         */
        NzMentionTriggerDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.completeEvents();
        };
        NzMentionTriggerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[nzMentionTrigger], textarea[nzMentionTrigger]',
                        exportAs: 'nzMentionTrigger',
                        providers: [NZ_MENTION_TRIGGER_ACCESSOR],
                        host: {
                            autocomplete: 'off',
                            '(focusin)': 'onFocusin.emit()',
                            '(blur)': 'onBlur.emit()',
                            '(input)': 'onInput.emit($event)',
                            '(keydown)': 'onKeydown.emit($event)',
                            '(click)': 'onClick.emit($event)'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzMentionTriggerDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: NzMentionService }
        ]; };
        return NzMentionTriggerDirective;
    }());
    if (false) {
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onChange;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onTouched;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onFocusin;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onBlur;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onInput;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onKeydown;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.onClick;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.value;
        /** @type {?} */
        NzMentionTriggerDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        NzMentionTriggerDirective.prototype.nzMentionService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: mention.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MentionOnSearchTypes() { }
    if (false) {
        /** @type {?} */
        MentionOnSearchTypes.prototype.value;
        /** @type {?} */
        MentionOnSearchTypes.prototype.prefix;
    }
    /**
     * @record
     */
    function Mention() { }
    if (false) {
        /** @type {?} */
        Mention.prototype.startPos;
        /** @type {?} */
        Mention.prototype.endPos;
        /** @type {?} */
        Mention.prototype.mention;
    }
    var NzMentionComponent = /** @class */ (function () {
        function NzMentionComponent(ngDocument, cdr, overlay, viewContainerRef, nzMentionService) {
            this.ngDocument = ngDocument;
            this.cdr = cdr;
            this.overlay = overlay;
            this.viewContainerRef = viewContainerRef;
            this.nzMentionService = nzMentionService;
            this.nzValueWith = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value; });
            this.nzPrefix = '@';
            this.nzLoading = false;
            this.nzNotFoundContent = '??????????????????????????????????????????';
            this.nzPlacement = 'bottom';
            this.nzSuggestions = [];
            this.nzOnSelect = new core.EventEmitter();
            this.nzOnSearchChange = new core.EventEmitter();
            this.isOpen = false;
            this.filteredSuggestions = [];
            this.suggestionTemplate = null;
            this.activeIndex = -1;
            this.previousValue = null;
            this.cursorMention = null;
            this.overlayRef = null;
        }
        Object.defineProperty(NzMentionComponent.prototype, "suggestionChild", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    this.suggestionTemplate = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NzMentionComponent.prototype, "triggerNativeElement", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this.trigger.el.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NzMentionComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.nzMentionService.triggerChanged().subscribe((/**
             * @param {?} trigger
             * @return {?}
             */
            function (trigger) {
                _this.trigger = trigger;
                _this.bindTriggerEvents();
                _this.closeDropdown();
                _this.overlayRef = null;
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzMentionComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.hasOwnProperty('nzSuggestions')) {
                if (this.isOpen) {
                    this.previousValue = null;
                    this.activeIndex = -1;
                    this.resetDropdown(false);
                }
            }
        };
        /**
         * @return {?}
         */
        NzMentionComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.closeDropdown();
        };
        /**
         * @return {?}
         */
        NzMentionComponent.prototype.closeDropdown = /**
         * @return {?}
         */
        function () {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
                this.overlayBackdropClickSubscription.unsubscribe();
                this.isOpen = false;
                this.cdr.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NzMentionComponent.prototype.openDropdown = /**
         * @return {?}
         */
        function () {
            this.attachOverlay();
            this.isOpen = true;
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzMentionComponent.prototype.getMentions = /**
         * @return {?}
         */
        function () {
            return this.trigger ? util.getMentions((/** @type {?} */ (this.trigger.value)), this.nzPrefix) : [];
        };
        /**
         * @param {?} suggestion
         * @return {?}
         */
        NzMentionComponent.prototype.selectSuggestion = /**
         * @param {?} suggestion
         * @return {?}
         */
        function (suggestion) {
            /** @type {?} */
            var value = this.nzValueWith(suggestion);
            this.trigger.insertMention({
                mention: value,
                startPos: (/** @type {?} */ (this.cursorMentionStart)),
                endPos: (/** @type {?} */ (this.cursorMentionEnd))
            });
            this.nzOnSelect.emit(suggestion);
            this.closeDropdown();
            this.activeIndex = -1;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        NzMentionComponent.prototype.handleInput = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = (/** @type {?} */ (event.target));
            this.trigger.onChange(target.value);
            this.trigger.value = target.value;
            this.resetDropdown();
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        NzMentionComponent.prototype.handleKeydown = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var keyCode = event.keyCode;
            if (this.isOpen && keyCode === keycodes.ENTER && this.activeIndex !== -1 && this.filteredSuggestions.length) {
                this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
                event.preventDefault();
            }
            else if (keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW) {
                this.resetDropdown();
                event.stopPropagation();
            }
            else {
                if (this.isOpen && (keyCode === keycodes.TAB || keyCode === keycodes.ESCAPE)) {
                    this.closeDropdown();
                    return;
                }
                if (this.isOpen && keyCode === keycodes.UP_ARROW) {
                    this.setPreviousItemActive();
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (this.isOpen && keyCode === keycodes.DOWN_ARROW) {
                    this.setNextItemActive();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.handleClick = /**
         * @private
         * @return {?}
         */
        function () {
            this.resetDropdown();
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.bindTriggerEvents = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.trigger.onInput.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.handleInput(e); }));
            this.trigger.onKeydown.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.handleKeydown(e); }));
            this.trigger.onClick.subscribe((/**
             * @return {?}
             */
            function () { return _this.handleClick(); }));
        };
        /**
         * @private
         * @param {?} value
         * @param {?} emit
         * @return {?}
         */
        NzMentionComponent.prototype.suggestionsFilter = /**
         * @private
         * @param {?} value
         * @param {?} emit
         * @return {?}
         */
        function (value, emit) {
            var _this = this;
            /** @type {?} */
            var suggestions = value.substring(1);
            if (this.previousValue === value) {
                return;
            }
            this.previousValue = value;
            if (emit) {
                this.nzOnSearchChange.emit({
                    value: (/** @type {?} */ (this.cursorMention)).substring(1),
                    prefix: (/** @type {?} */ (this.cursorMention))[0]
                });
            }
            /** @type {?} */
            var searchValue = suggestions.toLowerCase();
            this.filteredSuggestions = this.nzSuggestions.filter((/**
             * @param {?} suggestion
             * @return {?}
             */
            function (suggestion) { return _this.nzValueWith(suggestion).toLowerCase().includes(searchValue); }));
        };
        /**
         * @private
         * @param {?=} emit
         * @return {?}
         */
        NzMentionComponent.prototype.resetDropdown = /**
         * @private
         * @param {?=} emit
         * @return {?}
         */
        function (emit) {
            if (emit === void 0) { emit = true; }
            this.resetCursorMention();
            if (typeof this.cursorMention !== 'string' || !this.canOpen()) {
                this.closeDropdown();
                return;
            }
            this.suggestionsFilter(this.cursorMention, emit);
            /** @type {?} */
            var activeIndex = this.filteredSuggestions.indexOf(this.cursorMention.substring(1));
            this.activeIndex = activeIndex >= 0 ? activeIndex : 0;
            this.openDropdown();
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.setNextItemActive = /**
         * @private
         * @return {?}
         */
        function () {
            this.activeIndex = this.activeIndex + 1 <= this.filteredSuggestions.length - 1 ? this.activeIndex + 1 : 0;
            this.cdr.markForCheck();
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.setPreviousItemActive = /**
         * @private
         * @return {?}
         */
        function () {
            this.activeIndex = this.activeIndex - 1 < 0 ? this.filteredSuggestions.length - 1 : this.activeIndex - 1;
            this.cdr.markForCheck();
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.canOpen = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var element = this.triggerNativeElement;
            return !element.readOnly && !element.disabled;
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.resetCursorMention = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.triggerNativeElement.value.replace(/[\r\n]/g, ' ') || '';
            /** @type {?} */
            var selectionStart = (/** @type {?} */ (this.triggerNativeElement.selectionStart));
            /** @type {?} */
            var prefix = typeof this.nzPrefix === 'string' ? [this.nzPrefix] : this.nzPrefix;
            /** @type {?} */
            var i = prefix.length;
            while (i >= 0) {
                /** @type {?} */
                var startPos = value.lastIndexOf(prefix[i], selectionStart);
                /** @type {?} */
                var endPos = value.indexOf(' ', selectionStart) > -1 ? value.indexOf(' ', selectionStart) : value.length;
                /** @type {?} */
                var mention = value.substring(startPos, endPos);
                if ((startPos > 0 && value[startPos - 1] !== ' ') || startPos < 0 || mention.includes(prefix[i], 1) || mention.includes(' ')) {
                    this.cursorMention = null;
                    this.cursorMentionStart = -1;
                    this.cursorMentionEnd = -1;
                }
                else {
                    this.cursorMention = mention;
                    this.cursorMentionStart = startPos;
                    this.cursorMentionEnd = endPos;
                    return;
                }
                i--;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.updatePositions = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var coordinates = util.getCaretCoordinates(this.triggerNativeElement, (/** @type {?} */ (this.cursorMentionStart)));
            /** @type {?} */
            var top = coordinates.top -
                this.triggerNativeElement.getBoundingClientRect().height -
                this.triggerNativeElement.scrollTop +
                (this.nzPlacement === 'bottom' ? coordinates.height - 6 : -6);
            /** @type {?} */
            var left = coordinates.left - this.triggerNativeElement.scrollLeft;
            this.positionStrategy.withDefaultOffsetX(left).withDefaultOffsetY(top);
            if (this.nzPlacement === 'bottom') {
                this.positionStrategy.withPositions(__spread(overlay$1.DEFAULT_MENTION_BOTTOM_POSITIONS));
            }
            if (this.nzPlacement === 'top') {
                this.positionStrategy.withPositions(__spread(overlay$1.DEFAULT_MENTION_TOP_POSITIONS));
            }
            this.positionStrategy.apply();
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.subscribeOverlayBackdropClick = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return rxjs.merge(rxjs.fromEvent(this.ngDocument, 'click'), rxjs.fromEvent(this.ngDocument, 'touchend')).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var clickTarget = (/** @type {?} */ (event.target));
                if (_this.isOpen &&
                    clickTarget !== _this.trigger.el.nativeElement &&
                    !!_this.overlayRef &&
                    !_this.overlayRef.overlayElement.contains(clickTarget)) {
                    _this.closeDropdown();
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.attachOverlay = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.overlayRef) {
                this.portal = new portal.TemplatePortal((/** @type {?} */ (this.suggestionsTemp)), this.viewContainerRef);
                this.overlayRef = this.overlay.create(this.getOverlayConfig());
            }
            if (this.overlayRef && !this.overlayRef.hasAttached()) {
                this.overlayRef.attach(this.portal);
                this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
            }
            this.updatePositions();
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.getOverlayConfig = /**
         * @private
         * @return {?}
         */
        function () {
            return new overlay.OverlayConfig({
                positionStrategy: this.getOverlayPosition(),
                scrollStrategy: this.overlay.scrollStrategies.reposition(),
                disposeOnNavigation: true
            });
        };
        /**
         * @private
         * @return {?}
         */
        NzMentionComponent.prototype.getOverlayPosition = /**
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
                .flexibleConnectedTo(this.trigger.el)
                .withPositions(positions)
                .withFlexibleDimensions(false)
                .withPush(false);
            return this.positionStrategy;
        };
        NzMentionComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nz-mention',
                        exportAs: 'nzMention',
                        template: "\n    <ng-content></ng-content>\n    <ng-template #suggestions>\n      <ul class=\"ant-mention-dropdown\">\n        <li\n          class=\"ant-mention-dropdown-item\"\n          *ngFor=\"let suggestion of filteredSuggestions; let i = index\"\n          [class.focus]=\"i === activeIndex\"\n          (mousedown)=\"$event.preventDefault()\"\n          (click)=\"selectSuggestion(suggestion)\"\n        >\n          <ng-container *ngIf=\"suggestionTemplate; else defaultSuggestion\">\n            <ng-container *ngTemplateOutlet=\"suggestionTemplate; context: { $implicit: suggestion }\"></ng-container>\n          </ng-container>\n          <ng-template #defaultSuggestion>{{ nzValueWith(suggestion) }}</ng-template>\n        </li>\n        <li class=\"ant-mention-dropdown-notfound ant-mention-dropdown-item\" *ngIf=\"filteredSuggestions.length === 0\">\n          <span *ngIf=\"nzLoading\"><i nz-icon nzType=\"loading\"></i></span>\n          <span *ngIf=\"!nzLoading\">{{ nzNotFoundContent }}</span>\n        </li>\n      </ul>\n    </ng-template>\n  ",
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [NzMentionService]
                    }] }
        ];
        /** @nocollapse */
        NzMentionComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.ChangeDetectorRef },
            { type: overlay.Overlay },
            { type: core.ViewContainerRef },
            { type: NzMentionService }
        ]; };
        NzMentionComponent.propDecorators = {
            nzValueWith: [{ type: core.Input }],
            nzPrefix: [{ type: core.Input }],
            nzLoading: [{ type: core.Input }],
            nzNotFoundContent: [{ type: core.Input }],
            nzPlacement: [{ type: core.Input }],
            nzSuggestions: [{ type: core.Input }],
            nzOnSelect: [{ type: core.Output }],
            nzOnSearchChange: [{ type: core.Output }],
            suggestionsTemp: [{ type: core.ViewChild, args: [core.TemplateRef, { static: false },] }],
            suggestionChild: [{ type: core.ContentChild, args: [NzMentionSuggestionDirective, { static: false, read: core.TemplateRef },] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMentionComponent.prototype, "nzLoading", void 0);
        return NzMentionComponent;
    }());
    if (false) {
        /** @type {?} */
        NzMentionComponent.ngAcceptInputType_nzLoading;
        /** @type {?} */
        NzMentionComponent.prototype.nzValueWith;
        /** @type {?} */
        NzMentionComponent.prototype.nzPrefix;
        /** @type {?} */
        NzMentionComponent.prototype.nzLoading;
        /** @type {?} */
        NzMentionComponent.prototype.nzNotFoundContent;
        /** @type {?} */
        NzMentionComponent.prototype.nzPlacement;
        /** @type {?} */
        NzMentionComponent.prototype.nzSuggestions;
        /** @type {?} */
        NzMentionComponent.prototype.nzOnSelect;
        /** @type {?} */
        NzMentionComponent.prototype.nzOnSearchChange;
        /** @type {?} */
        NzMentionComponent.prototype.trigger;
        /** @type {?} */
        NzMentionComponent.prototype.suggestionsTemp;
        /** @type {?} */
        NzMentionComponent.prototype.isOpen;
        /** @type {?} */
        NzMentionComponent.prototype.filteredSuggestions;
        /** @type {?} */
        NzMentionComponent.prototype.suggestionTemplate;
        /** @type {?} */
        NzMentionComponent.prototype.activeIndex;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.previousValue;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.cursorMention;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.cursorMentionStart;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.cursorMentionEnd;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.portal;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.positionStrategy;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.overlayBackdropClickSubscription;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.ngDocument;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        NzMentionComponent.prototype.nzMentionService;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: mention.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPONENTS = [NzMentionComponent, NzMentionTriggerDirective, NzMentionSuggestionDirective];
    var NzMentionModule = /** @class */ (function () {
        function NzMentionModule() {
        }
        NzMentionModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule, overlay.OverlayModule, icon.NzIconModule],
                        declarations: __spread(COMPONENTS),
                        exports: __spread(COMPONENTS)
                    },] }
        ];
        return NzMentionModule;
    }());

    exports.NZ_MENTION_TRIGGER_ACCESSOR = NZ_MENTION_TRIGGER_ACCESSOR;
    exports.NzMentionComponent = NzMentionComponent;
    exports.NzMentionModule = NzMentionModule;
    exports.NzMentionService = NzMentionService;
    exports.NzMentionSuggestionDirective = NzMentionSuggestionDirective;
    exports.NzMentionTriggerDirective = NzMentionTriggerDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-mention.umd.js.map
