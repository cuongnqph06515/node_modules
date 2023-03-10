(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/keycodes'), require('@angular/cdk/overlay'), require('@angular/cdk/platform'), require('@angular/cdk/portal'), require('@angular/core'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/forms'), require('ng-zorro-antd/button'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/menu'), require('ng-zorro-antd/core/animation')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/dropdown', ['exports', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/cdk/platform', '@angular/cdk/portal', '@angular/core', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/forms', 'ng-zorro-antd/button', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon', 'ng-zorro-antd/menu', 'ng-zorro-antd/core/animation'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].dropdown = {}), global.ng.cdk.keycodes, global.ng.cdk.overlay, global.ng.cdk.platform, global.ng.cdk.portal, global.ng.core, global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.forms, global['ng-zorro-antd'].button, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].menu, global['ng-zorro-antd'].core.animation));
}(this, (function (exports, keycodes, overlay, platform, portal, core, overlay$1, util, rxjs, operators, common, forms, button, noAnimation, outlet, icon, menu, animation) { 'use strict';

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
     * Generated from: dropdown.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var listOfPositions = [overlay$1.POSITION_MAP.bottomLeft, overlay$1.POSITION_MAP.bottomRight, overlay$1.POSITION_MAP.topRight, overlay$1.POSITION_MAP.topLeft];
    var NzDropDownDirective = /** @class */ (function () {
        function NzDropDownDirective(elementRef, overlay, renderer, viewContainerRef, platform) {
            this.elementRef = elementRef;
            this.overlay = overlay;
            this.renderer = renderer;
            this.viewContainerRef = viewContainerRef;
            this.platform = platform;
            this.overlayRef = null;
            this.destroy$ = new rxjs.Subject();
            this.positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(this.elementRef.nativeElement)
                .withLockedPosition()
                .withTransformOriginOn('.ant-dropdown');
            this.inputVisible$ = new rxjs.BehaviorSubject(false);
            this.nzTrigger$ = new rxjs.BehaviorSubject('hover');
            this.overlayClose$ = new rxjs.Subject();
            this.nzDropdownMenu = null;
            this.nzTrigger = 'hover';
            this.nzMatchWidthElement = null;
            this.nzBackdrop = true;
            this.nzClickHide = true;
            this.nzDisabled = false;
            this.nzVisible = false;
            this.nzOverlayClassName = '';
            this.nzOverlayStyle = {};
            this.nzPlacement = 'bottomLeft';
            this.nzVisibleChange = new core.EventEmitter();
        }
        /**
         * @template T
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        NzDropDownDirective.prototype.setDropdownMenuValue = /**
         * @template T
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            if (this.nzDropdownMenu) {
                this.nzDropdownMenu.setValue(key, value);
            }
        };
        /**
         * @return {?}
         */
        NzDropDownDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        NzDropDownDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.nzDropdownMenu) {
                /** @type {?} */
                var nativeElement_1 = this.elementRef.nativeElement;
                /**
                 * host mouse state *
                 * @type {?}
                 */
                var hostMouseState$ = rxjs.merge(rxjs.fromEvent(nativeElement_1, 'mouseenter').pipe(operators.mapTo(true)), rxjs.fromEvent(nativeElement_1, 'mouseleave').pipe(operators.mapTo(false)));
                /**
                 * menu mouse state *
                 * @type {?}
                 */
                var menuMouseState$ = this.nzDropdownMenu.mouseState$;
                /**
                 * merged mouse state *
                 * @type {?}
                 */
                var mergedMouseState$_1 = rxjs.merge(menuMouseState$, hostMouseState$);
                /**
                 * host click state *
                 * @type {?}
                 */
                var hostClickState$_1 = rxjs.fromEvent(nativeElement_1, 'click').pipe(operators.mapTo(true));
                /**
                 * visible state switch by nzTrigger *
                 * @type {?}
                 */
                var visibleStateByTrigger$ = this.nzTrigger$.pipe(operators.switchMap((/**
                 * @param {?} trigger
                 * @return {?}
                 */
                function (trigger) {
                    if (trigger === 'hover') {
                        return mergedMouseState$_1;
                    }
                    else if (trigger === 'click') {
                        return hostClickState$_1;
                    }
                    else {
                        return rxjs.EMPTY;
                    }
                })));
                /** @type {?} */
                var descendantMenuItemClick$ = this.nzDropdownMenu.descendantMenuItemClick$.pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return _this.nzClickHide; })), operators.mapTo(false));
                /** @type {?} */
                var domTriggerVisible$ = rxjs.merge(visibleStateByTrigger$, descendantMenuItemClick$, this.overlayClose$).pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.nzDisabled; })));
                /** @type {?} */
                var visible$ = rxjs.merge(this.inputVisible$, domTriggerVisible$);
                rxjs.combineLatest([visible$, this.nzDropdownMenu.isChildSubMenuOpen$])
                    .pipe(operators.map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), visible = _b[0], sub = _b[1];
                    return visible || sub;
                })), operators.auditTime(150), operators.distinctUntilChanged(), operators.filter((/**
                 * @return {?}
                 */
                function () { return _this.platform.isBrowser; })), operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @param {?} visible
                 * @return {?}
                 */
                function (visible) {
                    /** @type {?} */
                    var element = _this.nzMatchWidthElement ? _this.nzMatchWidthElement.nativeElement : nativeElement_1;
                    /** @type {?} */
                    var triggerWidth = element.getBoundingClientRect().width;
                    if (_this.nzVisible !== visible) {
                        _this.nzVisibleChange.emit(visible);
                    }
                    _this.nzVisible = visible;
                    if (visible) {
                        /** set up overlayRef **/
                        if (!_this.overlayRef) {
                            /** new overlay **/
                            _this.overlayRef = _this.overlay.create({
                                positionStrategy: _this.positionStrategy,
                                minWidth: triggerWidth,
                                disposeOnNavigation: true,
                                hasBackdrop: _this.nzTrigger === 'click',
                                backdropClass: _this.nzBackdrop ? undefined : 'nz-overlay-transparent-backdrop',
                                scrollStrategy: _this.overlay.scrollStrategies.reposition()
                            });
                            rxjs.merge(_this.overlayRef.backdropClick(), _this.overlayRef.detachments(), _this.overlayRef.keydownEvents().pipe(operators.filter((/**
                             * @param {?} e
                             * @return {?}
                             */
                            function (e) { return e.keyCode === keycodes.ESCAPE && !keycodes.hasModifierKey(e); }))))
                                .pipe(operators.mapTo(false), operators.takeUntil(_this.destroy$))
                                .subscribe(_this.overlayClose$);
                        }
                        else {
                            /**
                             * update overlay config *
                             * @type {?}
                             */
                            var overlayConfig = _this.overlayRef.getConfig();
                            overlayConfig.minWidth = triggerWidth;
                            overlayConfig.hasBackdrop = _this.nzTrigger === 'click';
                        }
                        /** open dropdown with animation **/
                        _this.positionStrategy.withPositions(__spread([overlay$1.POSITION_MAP[_this.nzPlacement]], listOfPositions));
                        /** reset portal if needed **/
                        if (!_this.portal || _this.portal.templateRef !== (/** @type {?} */ (_this.nzDropdownMenu)).templateRef) {
                            _this.portal = new portal.TemplatePortal((/** @type {?} */ (_this.nzDropdownMenu)).templateRef, _this.viewContainerRef);
                        }
                        _this.overlayRef.attach(_this.portal);
                    }
                    else {
                        /** detach overlayRef if needed **/
                        if (_this.overlayRef) {
                            _this.overlayRef.detach();
                        }
                    }
                }));
            }
        };
        /**
         * @return {?}
         */
        NzDropDownDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
            if (this.overlayRef) {
                this.overlayRef.dispose();
                this.overlayRef = null;
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzDropDownDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzVisible = changes.nzVisible, nzDisabled = changes.nzDisabled, nzOverlayClassName = changes.nzOverlayClassName, nzOverlayStyle = changes.nzOverlayStyle, nzTrigger = changes.nzTrigger;
            if (nzTrigger) {
                this.nzTrigger$.next(this.nzTrigger);
            }
            if (nzVisible) {
                this.inputVisible$.next(this.nzVisible);
            }
            if (nzDisabled) {
                /** @type {?} */
                var nativeElement = this.elementRef.nativeElement;
                if (this.nzDisabled) {
                    this.renderer.setAttribute(nativeElement, 'disabled', '');
                    this.inputVisible$.next(false);
                }
                else {
                    this.renderer.removeAttribute(nativeElement, 'disabled');
                }
            }
            if (nzOverlayClassName) {
                this.setDropdownMenuValue('nzOverlayClassName', this.nzOverlayClassName);
            }
            if (nzOverlayStyle) {
                this.setDropdownMenuValue('nzOverlayStyle', this.nzOverlayStyle);
            }
        };
        NzDropDownDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-dropdown]',
                        exportAs: 'nzDropdown',
                        host: {
                            '[class.ant-dropdown-trigger]': 'true'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzDropDownDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: overlay.Overlay },
            { type: core.Renderer2 },
            { type: core.ViewContainerRef },
            { type: platform.Platform }
        ]; };
        NzDropDownDirective.propDecorators = {
            nzDropdownMenu: [{ type: core.Input }],
            nzTrigger: [{ type: core.Input }],
            nzMatchWidthElement: [{ type: core.Input }],
            nzBackdrop: [{ type: core.Input }],
            nzClickHide: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzVisible: [{ type: core.Input }],
            nzOverlayClassName: [{ type: core.Input }],
            nzOverlayStyle: [{ type: core.Input }],
            nzPlacement: [{ type: core.Input }],
            nzVisibleChange: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzDropDownDirective.prototype, "nzBackdrop", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzDropDownDirective.prototype, "nzClickHide", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzDropDownDirective.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzDropDownDirective.prototype, "nzVisible", void 0);
        return NzDropDownDirective;
    }());
    if (false) {
        /** @type {?} */
        NzDropDownDirective.ngAcceptInputType_nzBackdrop;
        /** @type {?} */
        NzDropDownDirective.ngAcceptInputType_nzClickHide;
        /** @type {?} */
        NzDropDownDirective.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzDropDownDirective.ngAcceptInputType_nzVisible;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.portal;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.positionStrategy;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.inputVisible$;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.nzTrigger$;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.overlayClose$;
        /** @type {?} */
        NzDropDownDirective.prototype.nzDropdownMenu;
        /** @type {?} */
        NzDropDownDirective.prototype.nzTrigger;
        /** @type {?} */
        NzDropDownDirective.prototype.nzMatchWidthElement;
        /** @type {?} */
        NzDropDownDirective.prototype.nzBackdrop;
        /** @type {?} */
        NzDropDownDirective.prototype.nzClickHide;
        /** @type {?} */
        NzDropDownDirective.prototype.nzDisabled;
        /** @type {?} */
        NzDropDownDirective.prototype.nzVisible;
        /** @type {?} */
        NzDropDownDirective.prototype.nzOverlayClassName;
        /** @type {?} */
        NzDropDownDirective.prototype.nzOverlayStyle;
        /** @type {?} */
        NzDropDownDirective.prototype.nzPlacement;
        /** @type {?} */
        NzDropDownDirective.prototype.nzVisibleChange;
        /** @type {?} */
        NzDropDownDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        NzDropDownDirective.prototype.platform;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: context-menu.service.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzContextMenuServiceModule = /** @class */ (function () {
        function NzContextMenuServiceModule() {
        }
        NzContextMenuServiceModule.decorators = [
            { type: core.NgModule }
        ];
        return NzContextMenuServiceModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-a.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDropDownADirective = /** @class */ (function () {
        function NzDropDownADirective() {
        }
        NzDropDownADirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'a[nz-dropdown]',
                        host: {
                            '[class.ant-dropdown-link]': 'true'
                        }
                    },] }
        ];
        return NzDropDownADirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-button.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDropdownButtonDirective = /** @class */ (function () {
        function NzDropdownButtonDirective(renderer, nzButtonGroupComponent, elementRef) {
            this.renderer = renderer;
            this.nzButtonGroupComponent = nzButtonGroupComponent;
            this.elementRef = elementRef;
        }
        /**
         * @return {?}
         */
        NzDropdownButtonDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
            if (this.nzButtonGroupComponent && parentElement) {
                this.renderer.addClass(parentElement, 'ant-dropdown-button');
            }
        };
        NzDropdownButtonDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-button][nz-dropdown]'
                    },] }
        ];
        /** @nocollapse */
        NzDropdownButtonDirective.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: button.NzButtonGroupComponent, decorators: [{ type: core.Host }, { type: core.Optional }] },
            { type: core.ElementRef }
        ]; };
        return NzDropdownButtonDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzDropdownButtonDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        NzDropdownButtonDirective.prototype.nzButtonGroupComponent;
        /**
         * @type {?}
         * @private
         */
        NzDropdownButtonDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown-menu.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDropdownMenuComponent = /** @class */ (function () {
        function NzDropdownMenuComponent(cdr, elementRef, renderer, viewContainerRef, nzMenuService, noAnimation) {
            this.cdr = cdr;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.viewContainerRef = viewContainerRef;
            this.nzMenuService = nzMenuService;
            this.noAnimation = noAnimation;
            this.mouseState$ = new rxjs.BehaviorSubject(false);
            this.isChildSubMenuOpen$ = this.nzMenuService.isChildSubMenuOpen$;
            this.descendantMenuItemClick$ = this.nzMenuService.descendantMenuItemClick$;
            this.nzOverlayClassName = '';
            this.nzOverlayStyle = {};
        }
        /**
         * @param {?} visible
         * @return {?}
         */
        NzDropdownMenuComponent.prototype.setMouseState = /**
         * @param {?} visible
         * @return {?}
         */
        function (visible) {
            this.mouseState$.next(visible);
        };
        /**
         * @template T
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        NzDropdownMenuComponent.prototype.setValue = /**
         * @template T
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            this[key] = value;
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzDropdownMenuComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        };
        NzDropdownMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "nz-dropdown-menu",
                        exportAs: "nzDropdownMenu",
                        animations: [animation.slideMotion],
                        providers: [
                            menu.MenuService,
                            /** menu is inside dropdown-menu component **/
                            {
                                provide: menu.NzIsMenuInsideDropDownToken,
                                useValue: true
                            }
                        ],
                        template: "\n    <ng-template>\n      <div\n        class=\"ant-dropdown\"\n        [ngClass]=\"nzOverlayClassName\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@slideMotion]=\"'enter'\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        (mouseenter)=\"setMouseState(true)\"\n        (mouseleave)=\"setMouseState(false)\"\n      >\n        <ng-content></ng-content>\n      </div>\n    </ng-template>\n  ",
                        preserveWhitespaces: false,
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NzDropdownMenuComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ViewContainerRef },
            { type: menu.MenuService },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzDropdownMenuComponent.propDecorators = {
            templateRef: [{ type: core.ViewChild, args: [core.TemplateRef, { static: true },] }]
        };
        return NzDropdownMenuComponent;
    }());
    if (false) {
        /** @type {?} */
        NzDropdownMenuComponent.prototype.mouseState$;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.isChildSubMenuOpen$;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.descendantMenuItemClick$;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.nzOverlayClassName;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.nzOverlayStyle;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.templateRef;
        /**
         * @type {?}
         * @private
         */
        NzDropdownMenuComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzDropdownMenuComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzDropdownMenuComponent.prototype.renderer;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.viewContainerRef;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.nzMenuService;
        /** @type {?} */
        NzDropdownMenuComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: dropdown.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzDropDownModule = /** @class */ (function () {
        function NzDropDownModule() {
        }
        NzDropDownModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            overlay.OverlayModule,
                            forms.FormsModule,
                            button.NzButtonModule,
                            menu.NzMenuModule,
                            icon.NzIconModule,
                            noAnimation.NzNoAnimationModule,
                            platform.PlatformModule,
                            overlay$1.NzOverlayModule,
                            NzContextMenuServiceModule,
                            outlet.NzOutletModule
                        ],
                        entryComponents: [NzDropdownMenuComponent],
                        declarations: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective],
                        exports: [menu.NzMenuModule, NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective]
                    },] }
        ];
        return NzDropDownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: context-menu.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var listOfPositions$1 = [
        new overlay.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
        new overlay.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
        new overlay.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
        new overlay.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
    ];
    var NzContextMenuService = /** @class */ (function () {
        function NzContextMenuService(overlay) {
            this.overlay = overlay;
            this.overlayRef = null;
            this.closeSubscription = rxjs.Subscription.EMPTY;
        }
        /**
         * @param {?} $event
         * @param {?} nzDropdownMenuComponent
         * @return {?}
         */
        NzContextMenuService.prototype.create = /**
         * @param {?} $event
         * @param {?} nzDropdownMenuComponent
         * @return {?}
         */
        function ($event, nzDropdownMenuComponent) {
            var _this = this;
            this.close(true);
            var x = $event.x, y = $event.y;
            if ($event instanceof MouseEvent) {
                $event.preventDefault();
            }
            /** @type {?} */
            var positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo({ x: x, y: y })
                .withPositions(listOfPositions$1)
                .withTransformOriginOn('.ant-dropdown');
            this.overlayRef = this.overlay.create({
                positionStrategy: positionStrategy,
                disposeOnNavigation: true,
                scrollStrategy: this.overlay.scrollStrategies.close()
            });
            this.closeSubscription = rxjs.merge(nzDropdownMenuComponent.descendantMenuItemClick$, rxjs.fromEvent(document, 'click').pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return !!_this.overlayRef && !_this.overlayRef.overlayElement.contains((/** @type {?} */ (event.target))); })), 
            /** handle firefox contextmenu event **/
            operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.button !== 2; })), operators.take(1))).subscribe((/**
             * @return {?}
             */
            function () {
                _this.close();
            }));
            this.overlayRef.attach(new portal.TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef));
        };
        /**
         * @param {?=} clear
         * @return {?}
         */
        NzContextMenuService.prototype.close = /**
         * @param {?=} clear
         * @return {?}
         */
        function (clear) {
            if (clear === void 0) { clear = false; }
            if (this.overlayRef) {
                this.overlayRef.detach();
                if (clear) {
                    this.overlayRef.dispose();
                }
                this.overlayRef = null;
                this.closeSubscription.unsubscribe();
            }
        };
        NzContextMenuService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: NzContextMenuServiceModule
                    },] }
        ];
        /** @nocollapse */
        NzContextMenuService.ctorParameters = function () { return [
            { type: overlay.Overlay }
        ]; };
        /** @nocollapse */ NzContextMenuService.??prov = core.????defineInjectable({ factory: function NzContextMenuService_Factory() { return new NzContextMenuService(core.????inject(overlay.Overlay)); }, token: NzContextMenuService, providedIn: NzContextMenuServiceModule });
        return NzContextMenuService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzContextMenuService.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        NzContextMenuService.prototype.closeSubscription;
        /**
         * @type {?}
         * @private
         */
        NzContextMenuService.prototype.overlay;
    }

    exports.NzContextMenuService = NzContextMenuService;
    exports.NzContextMenuServiceModule = NzContextMenuServiceModule;
    exports.NzDropDownADirective = NzDropDownADirective;
    exports.NzDropDownDirective = NzDropDownDirective;
    exports.NzDropDownModule = NzDropDownModule;
    exports.NzDropdownButtonDirective = NzDropdownButtonDirective;
    exports.NzDropdownMenuComponent = NzDropdownMenuComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-dropdown.umd.js.map
