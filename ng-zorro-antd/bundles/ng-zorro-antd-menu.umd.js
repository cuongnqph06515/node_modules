(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/core/util'), require('rxjs'), require('rxjs/operators'), require('@angular/router'), require('@angular/cdk/overlay'), require('@angular/cdk/platform'), require('ng-zorro-antd/core/no-animation'), require('ng-zorro-antd/core/overlay'), require('ng-zorro-antd/core/animation'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/menu', ['exports', '@angular/core', 'ng-zorro-antd/core/util', 'rxjs', 'rxjs/operators', '@angular/router', '@angular/cdk/overlay', '@angular/cdk/platform', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/animation', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].menu = {}), global.ng.core, global['ng-zorro-antd'].core.util, global.rxjs, global.rxjs.operators, global.ng.router, global.ng.cdk.overlay, global.ng.cdk.platform, global['ng-zorro-antd'].core['no-animation'], global['ng-zorro-antd'].core.overlay, global['ng-zorro-antd'].core.animation, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, util, rxjs, operators, router, overlay, platform, noAnimation, overlay$1, animation, common, outlet, icon) { 'use strict';

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
     * Generated from: menu.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MenuService = /** @class */ (function () {
        function MenuService() {
            /**
             * all descendant menu click *
             */
            this.descendantMenuItemClick$ = new rxjs.Subject();
            /**
             * child menu item click *
             */
            this.childMenuItemClick$ = new rxjs.Subject();
            this.theme$ = new rxjs.BehaviorSubject('light');
            this.mode$ = new rxjs.BehaviorSubject('vertical');
            this.inlineIndent$ = new rxjs.BehaviorSubject(24);
            this.isChildSubMenuOpen$ = new rxjs.BehaviorSubject(false);
        }
        /**
         * @param {?} menu
         * @return {?}
         */
        MenuService.prototype.onDescendantMenuItemClick = /**
         * @param {?} menu
         * @return {?}
         */
        function (menu) {
            this.descendantMenuItemClick$.next(menu);
        };
        /**
         * @param {?} menu
         * @return {?}
         */
        MenuService.prototype.onChildMenuItemClick = /**
         * @param {?} menu
         * @return {?}
         */
        function (menu) {
            this.childMenuItemClick$.next(menu);
        };
        /**
         * @param {?} mode
         * @return {?}
         */
        MenuService.prototype.setMode = /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this.mode$.next(mode);
        };
        /**
         * @param {?} theme
         * @return {?}
         */
        MenuService.prototype.setTheme = /**
         * @param {?} theme
         * @return {?}
         */
        function (theme) {
            this.theme$.next(theme);
        };
        /**
         * @param {?} indent
         * @return {?}
         */
        MenuService.prototype.setInlineIndent = /**
         * @param {?} indent
         * @return {?}
         */
        function (indent) {
            this.inlineIndent$.next(indent);
        };
        MenuService.decorators = [
            { type: core.Injectable }
        ];
        return MenuService;
    }());
    if (false) {
        /**
         * all descendant menu click *
         * @type {?}
         */
        MenuService.prototype.descendantMenuItemClick$;
        /**
         * child menu item click *
         * @type {?}
         */
        MenuService.prototype.childMenuItemClick$;
        /** @type {?} */
        MenuService.prototype.theme$;
        /** @type {?} */
        MenuService.prototype.mode$;
        /** @type {?} */
        MenuService.prototype.inlineIndent$;
        /** @type {?} */
        MenuService.prototype.isChildSubMenuOpen$;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: menu.token.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NzIsMenuInsideDropDownToken = new core.InjectionToken('NzIsInDropDownMenuToken');
    /** @type {?} */
    var NzMenuServiceLocalToken = new core.InjectionToken('NzMenuServiceLocalToken');

    /**
     * @fileoverview added by tsickle
     * Generated from: submenu.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSubmenuService = /** @class */ (function () {
        function NzSubmenuService(nzHostSubmenuService, nzMenuService, isMenuInsideDropDown) {
            var _this = this;
            this.nzHostSubmenuService = nzHostSubmenuService;
            this.nzMenuService = nzMenuService;
            this.isMenuInsideDropDown = isMenuInsideDropDown;
            this.mode$ = this.nzMenuService.mode$.pipe(operators.map((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) {
                if (mode === 'inline') {
                    return 'inline';
                    /** if inside another submenu, set the mode to vertical **/
                }
                else if (mode === 'vertical' || _this.nzHostSubmenuService) {
                    return 'vertical';
                }
                else {
                    return 'horizontal';
                }
            })));
            this.level = 1;
            this.isCurrentSubMenuOpen$ = new rxjs.BehaviorSubject(false);
            this.isChildSubMenuOpen$ = new rxjs.BehaviorSubject(false);
            /**
             * submenu title & overlay mouse enter status *
             */
            this.isMouseEnterTitleOrOverlay$ = new rxjs.Subject();
            this.childMenuItemClick$ = new rxjs.Subject();
            if (this.nzHostSubmenuService) {
                this.level = this.nzHostSubmenuService.level + 1;
            }
            /**
             * close if menu item clicked *
             * @type {?}
             */
            var isClosedByMenuItemClick = this.childMenuItemClick$.pipe(operators.flatMap((/**
             * @return {?}
             */
            function () { return _this.mode$; })), operators.filter((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode !== 'inline' || _this.isMenuInsideDropDown; })), operators.mapTo(false));
            /** @type {?} */
            var isCurrentSubmenuOpen$ = rxjs.merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
            /**
             * combine the child submenu status with current submenu status to calculate host submenu open *
             * @type {?}
             */
            var isSubMenuOpenWithDebounce$ = rxjs.combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$]).pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), isChildSubMenuOpen = _b[0], isCurrentSubmenuOpen = _b[1];
                return isChildSubMenuOpen || isCurrentSubmenuOpen;
            })), operators.auditTime(150), operators.distinctUntilChanged());
            isSubMenuOpenWithDebounce$.pipe(operators.distinctUntilChanged()).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.setOpenStateWithoutDebounce(data);
                if (_this.nzHostSubmenuService) {
                    /** set parent submenu's child submenu open status **/
                    _this.nzHostSubmenuService.isChildSubMenuOpen$.next(data);
                }
                else {
                    _this.nzMenuService.isChildSubMenuOpen$.next(data);
                }
            }));
        }
        /**
         * menu item inside submenu clicked
         * @param menu
         */
        /**
         * menu item inside submenu clicked
         * @param {?} menu
         * @return {?}
         */
        NzSubmenuService.prototype.onChildMenuItemClick = /**
         * menu item inside submenu clicked
         * @param {?} menu
         * @return {?}
         */
        function (menu) {
            this.childMenuItemClick$.next(menu);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSubmenuService.prototype.setOpenStateWithoutDebounce = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isCurrentSubMenuOpen$.next(value);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSubmenuService.prototype.setMouseEnterTitleOrOverlayState = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isMouseEnterTitleOrOverlay$.next(value);
        };
        NzSubmenuService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NzSubmenuService.ctorParameters = function () { return [
            { type: NzSubmenuService, decorators: [{ type: core.SkipSelf }, { type: core.Optional }] },
            { type: MenuService },
            { type: Boolean, decorators: [{ type: core.Inject, args: [NzIsMenuInsideDropDownToken,] }] }
        ]; };
        return NzSubmenuService;
    }());
    if (false) {
        /** @type {?} */
        NzSubmenuService.prototype.mode$;
        /** @type {?} */
        NzSubmenuService.prototype.level;
        /** @type {?} */
        NzSubmenuService.prototype.isCurrentSubMenuOpen$;
        /**
         * @type {?}
         * @private
         */
        NzSubmenuService.prototype.isChildSubMenuOpen$;
        /**
         * submenu title & overlay mouse enter status *
         * @type {?}
         * @private
         */
        NzSubmenuService.prototype.isMouseEnterTitleOrOverlay$;
        /**
         * @type {?}
         * @private
         */
        NzSubmenuService.prototype.childMenuItemClick$;
        /**
         * @type {?}
         * @private
         */
        NzSubmenuService.prototype.nzHostSubmenuService;
        /** @type {?} */
        NzSubmenuService.prototype.nzMenuService;
        /** @type {?} */
        NzSubmenuService.prototype.isMenuInsideDropDown;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: menu-item.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMenuItemDirective = /** @class */ (function () {
        function NzMenuItemDirective(nzMenuService, cdr, nzSubmenuService, isMenuInsideDropDown, routerLink, routerLinkWithHref, router$1) {
            var _this = this;
            this.nzMenuService = nzMenuService;
            this.cdr = cdr;
            this.nzSubmenuService = nzSubmenuService;
            this.isMenuInsideDropDown = isMenuInsideDropDown;
            this.routerLink = routerLink;
            this.routerLinkWithHref = routerLinkWithHref;
            this.router = router$1;
            this.destroy$ = new rxjs.Subject();
            this.level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
            this.selected$ = new rxjs.Subject();
            this.inlinePaddingLeft = null;
            this.nzDisabled = false;
            this.nzSelected = false;
            this.nzMatchRouterExact = false;
            this.nzMatchRouter = false;
            if (router$1) {
                (/** @type {?} */ (this.router)).events.pipe(operators.takeUntil(this.destroy$), operators.filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e instanceof router.NavigationEnd; }))).subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.updateRouterActive();
                }));
            }
        }
        /** clear all item selected status except this */
        /**
         * clear all item selected status except this
         * @param {?} e
         * @return {?}
         */
        NzMenuItemDirective.prototype.clickMenuItem = /**
         * clear all item selected status except this
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.nzDisabled) {
                e.preventDefault();
                e.stopPropagation();
            }
            else {
                this.nzMenuService.onDescendantMenuItemClick(this);
                if (this.nzSubmenuService) {
                    /** menu item inside the submenu **/
                    this.nzSubmenuService.onChildMenuItemClick(this);
                }
                else {
                    /** menu item inside the root menu **/
                    this.nzMenuService.onChildMenuItemClick(this);
                }
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzMenuItemDirective.prototype.setSelectedState = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.nzSelected = value;
            this.selected$.next(value);
        };
        /**
         * @private
         * @return {?}
         */
        NzMenuItemDirective.prototype.updateRouterActive = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.listOfRouterLink || !this.listOfRouterLinkWithHref || !this.router || !this.router.navigated || !this.nzMatchRouter) {
                return;
            }
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var hasActiveLinks = _this.hasActiveLinks();
                if (_this.nzSelected !== hasActiveLinks) {
                    _this.nzSelected = hasActiveLinks;
                    _this.setSelectedState(_this.nzSelected);
                    _this.cdr.markForCheck();
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzMenuItemDirective.prototype.hasActiveLinks = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var isActiveCheckFn = this.isLinkActive((/** @type {?} */ (this.router)));
            return ((this.routerLink && isActiveCheckFn(this.routerLink)) ||
                (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
                this.listOfRouterLink.some(isActiveCheckFn) ||
                this.listOfRouterLinkWithHref.some(isActiveCheckFn));
        };
        /**
         * @private
         * @param {?} router
         * @return {?}
         */
        NzMenuItemDirective.prototype.isLinkActive = /**
         * @private
         * @param {?} router
         * @return {?}
         */
        function (router) {
            var _this = this;
            return (/**
             * @param {?} link
             * @return {?}
             */
            function (link) { return router.isActive(link.urlTree, _this.nzMatchRouterExact); });
        };
        /**
         * @return {?}
         */
        NzMenuItemDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** store origin padding in padding */
            rxjs.combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$])
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), mode = _b[0], inlineIndent = _b[1];
                _this.inlinePaddingLeft = mode === 'inline' ? _this.level * inlineIndent : null;
            }));
        };
        /**
         * @return {?}
         */
        NzMenuItemDirective.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.listOfRouterLink.changes.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () { return _this.updateRouterActive(); }));
            this.listOfRouterLinkWithHref.changes.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () { return _this.updateRouterActive(); }));
            this.updateRouterActive();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzMenuItemDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzSelected) {
                this.setSelectedState(this.nzSelected);
            }
        };
        /**
         * @return {?}
         */
        NzMenuItemDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzMenuItemDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-menu-item]',
                        exportAs: 'nzMenuItem',
                        host: {
                            '[class.ant-dropdown-menu-item]': "isMenuInsideDropDown",
                            '[class.ant-dropdown-menu-item-selected]': "isMenuInsideDropDown && nzSelected",
                            '[class.ant-dropdown-menu-item-disabled]': "isMenuInsideDropDown && nzDisabled",
                            '[class.ant-menu-item]': "!isMenuInsideDropDown",
                            '[class.ant-menu-item-selected]': "!isMenuInsideDropDown && nzSelected",
                            '[class.ant-menu-item-disabled]': "!isMenuInsideDropDown && nzDisabled",
                            '[style.paddingLeft.px]': 'nzPaddingLeft || inlinePaddingLeft',
                            '(click)': 'clickMenuItem($event)'
                        }
                    },] }
        ];
        /** @nocollapse */
        NzMenuItemDirective.ctorParameters = function () { return [
            { type: MenuService },
            { type: core.ChangeDetectorRef },
            { type: NzSubmenuService, decorators: [{ type: core.Optional }] },
            { type: Boolean, decorators: [{ type: core.Inject, args: [NzIsMenuInsideDropDownToken,] }] },
            { type: router.RouterLink, decorators: [{ type: core.Optional }] },
            { type: router.RouterLinkWithHref, decorators: [{ type: core.Optional }] },
            { type: router.Router, decorators: [{ type: core.Optional }] }
        ]; };
        NzMenuItemDirective.propDecorators = {
            nzPaddingLeft: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzSelected: [{ type: core.Input }],
            nzMatchRouterExact: [{ type: core.Input }],
            nzMatchRouter: [{ type: core.Input }],
            listOfRouterLink: [{ type: core.ContentChildren, args: [router.RouterLink, { descendants: true },] }],
            listOfRouterLinkWithHref: [{ type: core.ContentChildren, args: [router.RouterLinkWithHref, { descendants: true },] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMenuItemDirective.prototype, "nzDisabled", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMenuItemDirective.prototype, "nzSelected", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMenuItemDirective.prototype, "nzMatchRouterExact", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMenuItemDirective.prototype, "nzMatchRouter", void 0);
        return NzMenuItemDirective;
    }());
    if (false) {
        /** @type {?} */
        NzMenuItemDirective.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzMenuItemDirective.ngAcceptInputType_nzSelected;
        /** @type {?} */
        NzMenuItemDirective.ngAcceptInputType_nzMatchRouterExact;
        /** @type {?} */
        NzMenuItemDirective.ngAcceptInputType_nzMatchRouter;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.destroy$;
        /** @type {?} */
        NzMenuItemDirective.prototype.level;
        /** @type {?} */
        NzMenuItemDirective.prototype.selected$;
        /** @type {?} */
        NzMenuItemDirective.prototype.inlinePaddingLeft;
        /** @type {?} */
        NzMenuItemDirective.prototype.nzPaddingLeft;
        /** @type {?} */
        NzMenuItemDirective.prototype.nzDisabled;
        /** @type {?} */
        NzMenuItemDirective.prototype.nzSelected;
        /** @type {?} */
        NzMenuItemDirective.prototype.nzMatchRouterExact;
        /** @type {?} */
        NzMenuItemDirective.prototype.nzMatchRouter;
        /** @type {?} */
        NzMenuItemDirective.prototype.listOfRouterLink;
        /** @type {?} */
        NzMenuItemDirective.prototype.listOfRouterLinkWithHref;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.nzMenuService;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.nzSubmenuService;
        /** @type {?} */
        NzMenuItemDirective.prototype.isMenuInsideDropDown;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.routerLink;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.routerLinkWithHref;
        /**
         * @type {?}
         * @private
         */
        NzMenuItemDirective.prototype.router;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: submenu.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var listOfVerticalPositions = [
        overlay$1.POSITION_MAP.rightTop,
        overlay$1.POSITION_MAP.right,
        overlay$1.POSITION_MAP.rightBottom,
        overlay$1.POSITION_MAP.leftTop,
        overlay$1.POSITION_MAP.left,
        overlay$1.POSITION_MAP.leftBottom
    ];
    /** @type {?} */
    var listOfHorizontalPositions = [overlay$1.POSITION_MAP.bottomLeft];
    var NzSubMenuComponent = /** @class */ (function () {
        function NzSubMenuComponent(nzMenuService, cdr, nzSubmenuService, platform, isMenuInsideDropDown, noAnimation) {
            this.nzMenuService = nzMenuService;
            this.cdr = cdr;
            this.nzSubmenuService = nzSubmenuService;
            this.platform = platform;
            this.isMenuInsideDropDown = isMenuInsideDropDown;
            this.noAnimation = noAnimation;
            this.nzMenuClassName = '';
            this.nzPaddingLeft = null;
            this.nzTitle = null;
            this.nzIcon = null;
            this.nzOpen = false;
            this.nzDisabled = false;
            this.nzOpenChange = new core.EventEmitter();
            this.cdkOverlayOrigin = null;
            this.listOfNzSubMenuComponent = null;
            this.listOfNzMenuItemDirective = null;
            this.level = this.nzSubmenuService.level;
            this.destroy$ = new rxjs.Subject();
            this.position = 'right';
            this.triggerWidth = null;
            this.theme = 'light';
            this.mode = 'vertical';
            this.inlinePaddingLeft = null;
            this.overlayPositions = listOfVerticalPositions;
            this.isSelected = false;
            this.isActive = false;
        }
        /** set the submenu host open status directly **/
        /**
         * set the submenu host open status directly *
         * @param {?} open
         * @return {?}
         */
        NzSubMenuComponent.prototype.setOpenStateWithoutDebounce = /**
         * set the submenu host open status directly *
         * @param {?} open
         * @return {?}
         */
        function (open) {
            this.nzSubmenuService.setOpenStateWithoutDebounce(open);
        };
        /**
         * @return {?}
         */
        NzSubMenuComponent.prototype.toggleSubMenu = /**
         * @return {?}
         */
        function () {
            this.setOpenStateWithoutDebounce(!this.nzOpen);
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NzSubMenuComponent.prototype.setMouseEnterState = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isActive = value;
            if (this.mode !== 'inline') {
                this.nzSubmenuService.setMouseEnterTitleOrOverlayState(value);
            }
        };
        /**
         * @return {?}
         */
        NzSubMenuComponent.prototype.setTriggerWidth = /**
         * @return {?}
         */
        function () {
            if (this.mode === 'horizontal' && this.platform.isBrowser && this.cdkOverlayOrigin) {
                /** TODO: fast dom **/
                this.triggerWidth = (/** @type {?} */ (this.cdkOverlayOrigin)).nativeElement.getBoundingClientRect().width;
            }
        };
        /**
         * @param {?} position
         * @return {?}
         */
        NzSubMenuComponent.prototype.onPositionChange = /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            /** @type {?} */
            var placement = overlay$1.getPlacementName(position);
            if (placement === 'rightTop' || placement === 'rightBottom' || placement === 'right') {
                this.position = 'right';
            }
            else if (placement === 'leftTop' || placement === 'leftBottom' || placement === 'left') {
                this.position = 'left';
            }
            this.cdr.markForCheck();
        };
        /**
         * @return {?}
         */
        NzSubMenuComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** submenu theme update **/
            this.nzMenuService.theme$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} theme
             * @return {?}
             */
            function (theme) {
                _this.theme = theme;
                _this.cdr.markForCheck();
            }));
            /** submenu mode update **/
            this.nzSubmenuService.mode$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) {
                _this.mode = mode;
                if (mode === 'horizontal') {
                    _this.overlayPositions = listOfHorizontalPositions;
                }
                else if (mode === 'vertical') {
                    _this.overlayPositions = listOfVerticalPositions;
                }
                _this.cdr.markForCheck();
            }));
            /** inlineIndent update **/
            rxjs.combineLatest([this.nzSubmenuService.mode$, this.nzMenuService.inlineIndent$])
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), mode = _b[0], inlineIndent = _b[1];
                _this.inlinePaddingLeft = mode === 'inline' ? _this.level * inlineIndent : null;
                _this.cdr.markForCheck();
            }));
            /** current submenu open status **/
            this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} open
             * @return {?}
             */
            function (open) {
                _this.isActive = open;
                if (open !== _this.nzOpen) {
                    _this.setTriggerWidth();
                    _this.nzOpen = open;
                    _this.nzOpenChange.emit(_this.nzOpen);
                    _this.cdr.markForCheck();
                }
            }));
        };
        /**
         * @return {?}
         */
        NzSubMenuComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.setTriggerWidth();
            /** @type {?} */
            var listOfNzMenuItemDirective = this.listOfNzMenuItemDirective;
            /** @type {?} */
            var changes = (/** @type {?} */ (listOfNzMenuItemDirective)).changes;
            /** @type {?} */
            var mergedObservable = rxjs.merge.apply(void 0, __spread([changes], (/** @type {?} */ (listOfNzMenuItemDirective)).map((/**
             * @param {?} menu
             * @return {?}
             */
            function (menu) { return menu.selected$; }))));
            changes
                .pipe(operators.startWith(listOfNzMenuItemDirective), operators.switchMap((/**
             * @return {?}
             */
            function () { return mergedObservable; })), operators.startWith(true), operators.map((/**
             * @return {?}
             */
            function () { return (/** @type {?} */ (listOfNzMenuItemDirective)).some((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.nzSelected; })); })), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                _this.isSelected = selected;
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSubMenuComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzOpen = changes.nzOpen;
            if (nzOpen) {
                this.nzSubmenuService.setOpenStateWithoutDebounce(this.nzOpen);
                this.setTriggerWidth();
            }
        };
        /**
         * @return {?}
         */
        NzSubMenuComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzSubMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-submenu]',
                        exportAs: 'nzSubmenu',
                        providers: [NzSubmenuService],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        template: "\n    <div\n      nz-submenu-title\n      cdkOverlayOrigin\n      #origin=\"cdkOverlayOrigin\"\n      [nzIcon]=\"nzIcon\"\n      [nzTitle]=\"nzTitle\"\n      [mode]=\"mode\"\n      [nzDisabled]=\"nzDisabled\"\n      [isMenuInsideDropDown]=\"isMenuInsideDropDown\"\n      [paddingLeft]=\"nzPaddingLeft || inlinePaddingLeft\"\n      (subMenuMouseState)=\"setMouseEnterState($event)\"\n      (toggleSubMenu)=\"toggleSubMenu()\"\n    >\n      <ng-content select=\"[title]\" *ngIf=\"!nzTitle\"></ng-content>\n    </div>\n    <div\n      *ngIf=\"mode === 'inline'; else nonInlineTemplate\"\n      nz-submenu-inline-child\n      [mode]=\"mode\"\n      [nzOpen]=\"nzOpen\"\n      [@.disabled]=\"noAnimation?.nzNoAnimation\"\n      [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n      [menuClass]=\"nzMenuClassName\"\n      [templateOutlet]=\"subMenuTemplate\"\n    ></div>\n    <ng-template #nonInlineTemplate>\n      <ng-template\n        cdkConnectedOverlay\n        (positionChange)=\"onPositionChange($event)\"\n        [cdkConnectedOverlayPositions]=\"overlayPositions\"\n        [cdkConnectedOverlayOrigin]=\"origin\"\n        [cdkConnectedOverlayWidth]=\"triggerWidth!\"\n        [cdkConnectedOverlayOpen]=\"nzOpen\"\n        [cdkConnectedOverlayTransformOriginOn]=\"'.ant-menu-submenu'\"\n      >\n        <div\n          nz-submenu-none-inline-child\n          [theme]=\"theme\"\n          [mode]=\"mode\"\n          [nzOpen]=\"nzOpen\"\n          [position]=\"position\"\n          [nzDisabled]=\"nzDisabled\"\n          [isMenuInsideDropDown]=\"isMenuInsideDropDown\"\n          [templateOutlet]=\"subMenuTemplate\"\n          [menuClass]=\"nzMenuClassName\"\n          [@.disabled]=\"noAnimation?.nzNoAnimation\"\n          [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n          (subMenuMouseState)=\"setMouseEnterState($event)\"\n        ></div>\n      </ng-template>\n    </ng-template>\n\n    <ng-template #subMenuTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-dropdown-menu-submenu]': "isMenuInsideDropDown",
                            '[class.ant-dropdown-menu-submenu-disabled]': "isMenuInsideDropDown && nzDisabled",
                            '[class.ant-dropdown-menu-submenu-open]': "isMenuInsideDropDown && nzOpen",
                            '[class.ant-dropdown-menu-submenu-selected]': "isMenuInsideDropDown && isSelected",
                            '[class.ant-dropdown-menu-submenu-vertical]': "isMenuInsideDropDown && mode === 'vertical'",
                            '[class.ant-dropdown-menu-submenu-horizontal]': "isMenuInsideDropDown && mode === 'horizontal'",
                            '[class.ant-dropdown-menu-submenu-inline]': "isMenuInsideDropDown && mode === 'inline'",
                            '[class.ant-dropdown-menu-submenu-active]': "isMenuInsideDropDown && isActive",
                            '[class.ant-menu-submenu]': "!isMenuInsideDropDown",
                            '[class.ant-menu-submenu-disabled]': "!isMenuInsideDropDown && nzDisabled",
                            '[class.ant-menu-submenu-open]': "!isMenuInsideDropDown && nzOpen",
                            '[class.ant-menu-submenu-selected]': "!isMenuInsideDropDown && isSelected",
                            '[class.ant-menu-submenu-vertical]': "!isMenuInsideDropDown && mode === 'vertical'",
                            '[class.ant-menu-submenu-horizontal]': "!isMenuInsideDropDown && mode === 'horizontal'",
                            '[class.ant-menu-submenu-inline]': "!isMenuInsideDropDown && mode === 'inline'",
                            '[class.ant-menu-submenu-active]': "!isMenuInsideDropDown && isActive"
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSubMenuComponent.ctorParameters = function () { return [
            { type: MenuService },
            { type: core.ChangeDetectorRef },
            { type: NzSubmenuService },
            { type: platform.Platform },
            { type: Boolean, decorators: [{ type: core.Inject, args: [NzIsMenuInsideDropDownToken,] }] },
            { type: noAnimation.NzNoAnimationDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
        ]; };
        NzSubMenuComponent.propDecorators = {
            nzMenuClassName: [{ type: core.Input }],
            nzPaddingLeft: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            nzIcon: [{ type: core.Input }],
            nzOpen: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzOpenChange: [{ type: core.Output }],
            cdkOverlayOrigin: [{ type: core.ViewChild, args: [overlay.CdkOverlayOrigin, { static: true, read: core.ElementRef },] }],
            listOfNzSubMenuComponent: [{ type: core.ContentChildren, args: [NzSubMenuComponent, { descendants: true },] }],
            listOfNzMenuItemDirective: [{ type: core.ContentChildren, args: [NzMenuItemDirective, { descendants: true },] }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSubMenuComponent.prototype, "nzOpen", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzSubMenuComponent.prototype, "nzDisabled", void 0);
        return NzSubMenuComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSubMenuComponent.ngAcceptInputType_nzOpen;
        /** @type {?} */
        NzSubMenuComponent.ngAcceptInputType_nzDisabled;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzMenuClassName;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzPaddingLeft;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzTitle;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzIcon;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzOpen;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzDisabled;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzOpenChange;
        /** @type {?} */
        NzSubMenuComponent.prototype.cdkOverlayOrigin;
        /** @type {?} */
        NzSubMenuComponent.prototype.listOfNzSubMenuComponent;
        /** @type {?} */
        NzSubMenuComponent.prototype.listOfNzMenuItemDirective;
        /**
         * @type {?}
         * @private
         */
        NzSubMenuComponent.prototype.level;
        /**
         * @type {?}
         * @private
         */
        NzSubMenuComponent.prototype.destroy$;
        /** @type {?} */
        NzSubMenuComponent.prototype.position;
        /** @type {?} */
        NzSubMenuComponent.prototype.triggerWidth;
        /** @type {?} */
        NzSubMenuComponent.prototype.theme;
        /** @type {?} */
        NzSubMenuComponent.prototype.mode;
        /** @type {?} */
        NzSubMenuComponent.prototype.inlinePaddingLeft;
        /** @type {?} */
        NzSubMenuComponent.prototype.overlayPositions;
        /** @type {?} */
        NzSubMenuComponent.prototype.isSelected;
        /** @type {?} */
        NzSubMenuComponent.prototype.isActive;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzMenuService;
        /**
         * @type {?}
         * @private
         */
        NzSubMenuComponent.prototype.cdr;
        /** @type {?} */
        NzSubMenuComponent.prototype.nzSubmenuService;
        /**
         * @type {?}
         * @private
         */
        NzSubMenuComponent.prototype.platform;
        /** @type {?} */
        NzSubMenuComponent.prototype.isMenuInsideDropDown;
        /** @type {?} */
        NzSubMenuComponent.prototype.noAnimation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: menu.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} serviceInsideDropDown
     * @param {?} serviceOutsideDropDown
     * @return {?}
     */
    function MenuServiceFactory(serviceInsideDropDown, serviceOutsideDropDown) {
        return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
    }
    /**
     * @param {?} isMenuInsideDropDownToken
     * @return {?}
     */
    function MenuDropDownTokenFactory(isMenuInsideDropDownToken) {
        return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
    }
    var NzMenuDirective = /** @class */ (function () {
        function NzMenuDirective(nzMenuService, isMenuInsideDropDown, cdr) {
            this.nzMenuService = nzMenuService;
            this.isMenuInsideDropDown = isMenuInsideDropDown;
            this.cdr = cdr;
            this.nzInlineIndent = 24;
            this.nzTheme = 'light';
            this.nzMode = 'vertical';
            this.nzInlineCollapsed = false;
            this.nzSelectable = !this.isMenuInsideDropDown;
            this.nzClick = new core.EventEmitter();
            this.actualMode = 'vertical';
            this.inlineCollapsed$ = new rxjs.BehaviorSubject(this.nzInlineCollapsed);
            this.mode$ = new rxjs.BehaviorSubject(this.nzMode);
            this.destroy$ = new rxjs.Subject();
            this.listOfOpenedNzSubMenuComponent = [];
        }
        /**
         * @param {?} inlineCollapsed
         * @return {?}
         */
        NzMenuDirective.prototype.setInlineCollapsed = /**
         * @param {?} inlineCollapsed
         * @return {?}
         */
        function (inlineCollapsed) {
            this.nzInlineCollapsed = inlineCollapsed;
            this.inlineCollapsed$.next(inlineCollapsed);
        };
        /**
         * @return {?}
         */
        NzMenuDirective.prototype.updateInlineCollapse = /**
         * @return {?}
         */
        function () {
            if (this.listOfNzMenuItemDirective) {
                if (this.nzInlineCollapsed) {
                    this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter((/**
                     * @param {?} submenu
                     * @return {?}
                     */
                    function (submenu) { return submenu.nzOpen; }));
                    this.listOfNzSubMenuComponent.forEach((/**
                     * @param {?} submenu
                     * @return {?}
                     */
                    function (submenu) { return submenu.setOpenStateWithoutDebounce(false); }));
                }
                else {
                    this.listOfOpenedNzSubMenuComponent.forEach((/**
                     * @param {?} submenu
                     * @return {?}
                     */
                    function (submenu) { return submenu.setOpenStateWithoutDebounce(true); }));
                    this.listOfOpenedNzSubMenuComponent = [];
                }
            }
        };
        /**
         * @return {?}
         */
        NzMenuDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            rxjs.combineLatest([this.inlineCollapsed$, this.mode$])
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), inlineCollapsed = _b[0], mode = _b[1];
                _this.actualMode = inlineCollapsed ? 'vertical' : mode;
                _this.nzMenuService.setMode(_this.actualMode);
                _this.cdr.markForCheck();
            }));
            this.nzMenuService.descendantMenuItemClick$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @param {?} menu
             * @return {?}
             */
            function (menu) {
                _this.nzClick.emit(menu);
                if (_this.nzSelectable && !menu.nzMatchRouter) {
                    _this.listOfNzMenuItemDirective.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.setSelectedState(item === menu); }));
                }
            }));
        };
        /**
         * @return {?}
         */
        NzMenuDirective.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.inlineCollapsed$.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.updateInlineCollapse();
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzMenuDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzInlineCollapsed = changes.nzInlineCollapsed, nzInlineIndent = changes.nzInlineIndent, nzTheme = changes.nzTheme, nzMode = changes.nzMode;
            if (nzInlineCollapsed) {
                this.inlineCollapsed$.next(this.nzInlineCollapsed);
            }
            if (nzInlineIndent) {
                this.nzMenuService.setInlineIndent(this.nzInlineIndent);
            }
            if (nzTheme) {
                this.nzMenuService.setTheme(this.nzTheme);
            }
            if (nzMode) {
                this.mode$.next(this.nzMode);
                if (!changes.nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
                    this.listOfNzSubMenuComponent.forEach((/**
                     * @param {?} submenu
                     * @return {?}
                     */
                    function (submenu) { return submenu.setOpenStateWithoutDebounce(false); }));
                }
            }
        };
        /**
         * @return {?}
         */
        NzMenuDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzMenuDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-menu]',
                        exportAs: 'nzMenu',
                        providers: [
                            {
                                provide: NzMenuServiceLocalToken,
                                useClass: MenuService
                            },
                            /** use the top level service **/
                            {
                                provide: MenuService,
                                useFactory: MenuServiceFactory,
                                deps: [[new core.SkipSelf(), new core.Optional(), MenuService], NzMenuServiceLocalToken]
                            },
                            /** check if menu inside dropdown-menu component **/
                            {
                                provide: NzIsMenuInsideDropDownToken,
                                useFactory: MenuDropDownTokenFactory,
                                deps: [[new core.SkipSelf(), new core.Optional(), NzIsMenuInsideDropDownToken]]
                            }
                        ],
                        host: {
                            '[class.ant-dropdown-menu]': "isMenuInsideDropDown",
                            '[class.ant-dropdown-menu-root]': "isMenuInsideDropDown",
                            '[class.ant-dropdown-menu-light]': "isMenuInsideDropDown && nzTheme === 'light'",
                            '[class.ant-dropdown-menu-dark]': "isMenuInsideDropDown && nzTheme === 'dark'",
                            '[class.ant-dropdown-menu-vertical]': "isMenuInsideDropDown && actualMode === 'vertical'",
                            '[class.ant-dropdown-menu-horizontal]': "isMenuInsideDropDown && actualMode === 'horizontal'",
                            '[class.ant-dropdown-menu-inline]': "isMenuInsideDropDown && actualMode === 'inline'",
                            '[class.ant-dropdown-menu-inline-collapsed]': "isMenuInsideDropDown && nzInlineCollapsed",
                            '[class.ant-menu]': "!isMenuInsideDropDown",
                            '[class.ant-menu-root]': "!isMenuInsideDropDown",
                            '[class.ant-menu-light]': "!isMenuInsideDropDown && nzTheme === 'light'",
                            '[class.ant-menu-dark]': "!isMenuInsideDropDown && nzTheme === 'dark'",
                            '[class.ant-menu-vertical]': "!isMenuInsideDropDown && actualMode === 'vertical'",
                            '[class.ant-menu-horizontal]': "!isMenuInsideDropDown && actualMode === 'horizontal'",
                            '[class.ant-menu-inline]': "!isMenuInsideDropDown && actualMode === 'inline'",
                            '[class.ant-menu-inline-collapsed]': "!isMenuInsideDropDown && nzInlineCollapsed"
                        }
                    },] }
        ];
        /** @nocollapse */
        NzMenuDirective.ctorParameters = function () { return [
            { type: MenuService },
            { type: Boolean, decorators: [{ type: core.Inject, args: [NzIsMenuInsideDropDownToken,] }] },
            { type: core.ChangeDetectorRef }
        ]; };
        NzMenuDirective.propDecorators = {
            listOfNzMenuItemDirective: [{ type: core.ContentChildren, args: [NzMenuItemDirective, { descendants: true },] }],
            listOfNzSubMenuComponent: [{ type: core.ContentChildren, args: [NzSubMenuComponent, { descendants: true },] }],
            nzInlineIndent: [{ type: core.Input }],
            nzTheme: [{ type: core.Input }],
            nzMode: [{ type: core.Input }],
            nzInlineCollapsed: [{ type: core.Input }],
            nzSelectable: [{ type: core.Input }],
            nzClick: [{ type: core.Output }]
        };
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMenuDirective.prototype, "nzInlineCollapsed", void 0);
        __decorate([
            util.InputBoolean(),
            __metadata("design:type", Object)
        ], NzMenuDirective.prototype, "nzSelectable", void 0);
        return NzMenuDirective;
    }());
    if (false) {
        /** @type {?} */
        NzMenuDirective.ngAcceptInputType_nzInlineCollapsed;
        /** @type {?} */
        NzMenuDirective.ngAcceptInputType_nzSelectable;
        /** @type {?} */
        NzMenuDirective.prototype.listOfNzMenuItemDirective;
        /** @type {?} */
        NzMenuDirective.prototype.listOfNzSubMenuComponent;
        /** @type {?} */
        NzMenuDirective.prototype.nzInlineIndent;
        /** @type {?} */
        NzMenuDirective.prototype.nzTheme;
        /** @type {?} */
        NzMenuDirective.prototype.nzMode;
        /** @type {?} */
        NzMenuDirective.prototype.nzInlineCollapsed;
        /** @type {?} */
        NzMenuDirective.prototype.nzSelectable;
        /** @type {?} */
        NzMenuDirective.prototype.nzClick;
        /** @type {?} */
        NzMenuDirective.prototype.actualMode;
        /**
         * @type {?}
         * @private
         */
        NzMenuDirective.prototype.inlineCollapsed$;
        /**
         * @type {?}
         * @private
         */
        NzMenuDirective.prototype.mode$;
        /**
         * @type {?}
         * @private
         */
        NzMenuDirective.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzMenuDirective.prototype.listOfOpenedNzSubMenuComponent;
        /**
         * @type {?}
         * @private
         */
        NzMenuDirective.prototype.nzMenuService;
        /** @type {?} */
        NzMenuDirective.prototype.isMenuInsideDropDown;
        /**
         * @type {?}
         * @private
         */
        NzMenuDirective.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: menu-group.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} isMenuInsideDropDownToken
     * @return {?}
     */
    function MenuGroupFactory(isMenuInsideDropDownToken) {
        return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
    }
    var NzMenuGroupComponent = /** @class */ (function () {
        function NzMenuGroupComponent(elementRef, renderer, isMenuInsideDropDown) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.isMenuInsideDropDown = isMenuInsideDropDown;
            /** @type {?} */
            var className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group' : 'ant-menu-item-group';
            this.renderer.addClass(elementRef.nativeElement, className);
        }
        /**
         * @return {?}
         */
        NzMenuGroupComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var ulElement = (/** @type {?} */ (this.titleElement)).nativeElement.nextElementSibling;
            if (ulElement) {
                /**
                 * add classname to ul *
                 * @type {?}
                 */
                var className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
                this.renderer.addClass(ulElement, className);
            }
        };
        NzMenuGroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-menu-group]',
                        exportAs: 'nzMenuGroup',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            /** check if menu inside dropdown-menu component **/
                            {
                                provide: NzIsMenuInsideDropDownToken,
                                useFactory: MenuGroupFactory,
                                deps: [[new core.SkipSelf(), new core.Optional(), NzIsMenuInsideDropDownToken]]
                            }
                        ],
                        encapsulation: core.ViewEncapsulation.None,
                        template: "\n    <div\n      [class.ant-menu-item-group-title]=\"!isMenuInsideDropDown\"\n      [class.ant-dropdown-menu-item-group-title]=\"isMenuInsideDropDown\"\n      #titleElement\n    >\n      <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n      <ng-content select=\"[title]\" *ngIf=\"!nzTitle\"></ng-content>\n    </div>\n    <ng-content></ng-content>\n  ",
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        NzMenuGroupComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: Boolean, decorators: [{ type: core.Inject, args: [NzIsMenuInsideDropDownToken,] }] }
        ]; };
        NzMenuGroupComponent.propDecorators = {
            nzTitle: [{ type: core.Input }],
            titleElement: [{ type: core.ViewChild, args: ['titleElement',] }]
        };
        return NzMenuGroupComponent;
    }());
    if (false) {
        /** @type {?} */
        NzMenuGroupComponent.prototype.nzTitle;
        /** @type {?} */
        NzMenuGroupComponent.prototype.titleElement;
        /** @type {?} */
        NzMenuGroupComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzMenuGroupComponent.prototype.renderer;
        /** @type {?} */
        NzMenuGroupComponent.prototype.isMenuInsideDropDown;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: menu-divider.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMenuDividerDirective = /** @class */ (function () {
        function NzMenuDividerDirective(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.renderer.addClass(elementRef.nativeElement, 'ant-dropdown-menu-item-divider');
        }
        NzMenuDividerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-menu-divider]',
                        exportAs: 'nzMenuDivider'
                    },] }
        ];
        /** @nocollapse */
        NzMenuDividerDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return NzMenuDividerDirective;
    }());
    if (false) {
        /** @type {?} */
        NzMenuDividerDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzMenuDividerDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: submenu-title.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSubMenuTitleComponent = /** @class */ (function () {
        function NzSubMenuTitleComponent() {
            this.nzIcon = null;
            this.nzTitle = null;
            this.isMenuInsideDropDown = false;
            this.nzDisabled = false;
            this.paddingLeft = null;
            this.mode = 'vertical';
            this.toggleSubMenu = new core.EventEmitter();
            this.subMenuMouseState = new core.EventEmitter();
        }
        /**
         * @param {?} state
         * @return {?}
         */
        NzSubMenuTitleComponent.prototype.setMouseState = /**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            if (!this.nzDisabled) {
                this.subMenuMouseState.next(state);
            }
        };
        /**
         * @return {?}
         */
        NzSubMenuTitleComponent.prototype.clickTitle = /**
         * @return {?}
         */
        function () {
            if (this.mode === 'inline' && !this.nzDisabled) {
                this.toggleSubMenu.emit();
            }
        };
        NzSubMenuTitleComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-submenu-title]',
                        exportAs: 'nzSubmenuTitle',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <i nz-icon [nzType]=\"nzIcon\" *ngIf=\"nzIcon\"></i>\n    <ng-container *nzStringTemplateOutlet=\"nzTitle\">\n      <span>{{ nzTitle }}</span>\n    </ng-container>\n    <ng-content></ng-content>\n    <span *ngIf=\"isMenuInsideDropDown; else notDropdownTpl\" class=\"ant-dropdown-menu-submenu-arrow\">\n      <i nz-icon nzType=\"right\" class=\"ant-dropdown-menu-submenu-arrow-icon\"></i>\n    </span>\n    <ng-template #notDropdownTpl>\n      <i class=\"ant-menu-submenu-arrow\"></i>\n    </ng-template>\n  ",
                        host: {
                            '[class.ant-dropdown-menu-submenu-title]': 'isMenuInsideDropDown',
                            '[class.ant-menu-submenu-title]': '!isMenuInsideDropDown',
                            '[style.paddingLeft.px]': 'paddingLeft',
                            '(click)': 'clickTitle()',
                            '(mouseenter)': 'setMouseState(true)',
                            '(mouseleave)': 'setMouseState(false)'
                        }
                    }] }
        ];
        NzSubMenuTitleComponent.propDecorators = {
            nzIcon: [{ type: core.Input }],
            nzTitle: [{ type: core.Input }],
            isMenuInsideDropDown: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            paddingLeft: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            toggleSubMenu: [{ type: core.Output }],
            subMenuMouseState: [{ type: core.Output }]
        };
        return NzSubMenuTitleComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.nzIcon;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.nzTitle;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.isMenuInsideDropDown;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.nzDisabled;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.paddingLeft;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.mode;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.toggleSubMenu;
        /** @type {?} */
        NzSubMenuTitleComponent.prototype.subMenuMouseState;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: submenu-inline-child.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSubmenuInlineChildComponent = /** @class */ (function () {
        function NzSubmenuInlineChildComponent(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.templateOutlet = null;
            this.menuClass = '';
            this.mode = 'vertical';
            this.nzOpen = false;
            this.listOfCacheClassName = [];
            this.expandState = 'collapsed';
        }
        /**
         * @return {?}
         */
        NzSubmenuInlineChildComponent.prototype.calcMotionState = /**
         * @return {?}
         */
        function () {
            if (this.nzOpen) {
                this.expandState = 'expanded';
            }
            else {
                this.expandState = 'collapsed';
            }
        };
        /**
         * @return {?}
         */
        NzSubmenuInlineChildComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.calcMotionState();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSubmenuInlineChildComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            var mode = changes.mode, nzOpen = changes.nzOpen, menuClass = changes.menuClass;
            if (mode || nzOpen) {
                this.calcMotionState();
            }
            if (menuClass) {
                if (this.listOfCacheClassName.length) {
                    this.listOfCacheClassName
                        .filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return !!item; }))
                        .forEach((/**
                     * @param {?} className
                     * @return {?}
                     */
                    function (className) {
                        _this.renderer.removeClass(_this.elementRef.nativeElement, className);
                    }));
                }
                if (this.menuClass) {
                    this.listOfCacheClassName = this.menuClass.split(' ');
                    this.listOfCacheClassName
                        .filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return !!item; }))
                        .forEach((/**
                     * @param {?} className
                     * @return {?}
                     */
                    function (className) {
                        _this.renderer.addClass(_this.elementRef.nativeElement, className);
                    }));
                }
            }
        };
        NzSubmenuInlineChildComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-submenu-inline-child]',
                        animations: [animation.collapseMotion],
                        exportAs: 'nzSubmenuInlineChild',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: " <ng-template [ngTemplateOutlet]=\"templateOutlet\"></ng-template> ",
                        host: {
                            '[class.ant-menu]': 'true',
                            '[class.ant-menu-inline]': 'true',
                            '[class.ant-menu-sub]': 'true',
                            '[@collapseMotion]': 'expandState'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzSubmenuInlineChildComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzSubmenuInlineChildComponent.propDecorators = {
            templateOutlet: [{ type: core.Input }],
            menuClass: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            nzOpen: [{ type: core.Input }]
        };
        return NzSubmenuInlineChildComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSubmenuInlineChildComponent.prototype.templateOutlet;
        /** @type {?} */
        NzSubmenuInlineChildComponent.prototype.menuClass;
        /** @type {?} */
        NzSubmenuInlineChildComponent.prototype.mode;
        /** @type {?} */
        NzSubmenuInlineChildComponent.prototype.nzOpen;
        /** @type {?} */
        NzSubmenuInlineChildComponent.prototype.listOfCacheClassName;
        /** @type {?} */
        NzSubmenuInlineChildComponent.prototype.expandState;
        /**
         * @type {?}
         * @private
         */
        NzSubmenuInlineChildComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        NzSubmenuInlineChildComponent.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: submenu-non-inline-child.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzSubmenuNoneInlineChildComponent = /** @class */ (function () {
        function NzSubmenuNoneInlineChildComponent() {
            this.menuClass = '';
            this.theme = 'light';
            this.templateOutlet = null;
            this.isMenuInsideDropDown = false;
            this.mode = 'vertical';
            this.position = 'right';
            this.nzDisabled = false;
            this.nzOpen = false;
            this.subMenuMouseState = new core.EventEmitter();
            this.expandState = 'collapsed';
        }
        /**
         * @param {?} state
         * @return {?}
         */
        NzSubmenuNoneInlineChildComponent.prototype.setMouseState = /**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            if (!this.nzDisabled) {
                this.subMenuMouseState.next(state);
            }
        };
        /**
         * @return {?}
         */
        NzSubmenuNoneInlineChildComponent.prototype.calcMotionState = /**
         * @return {?}
         */
        function () {
            if (this.nzOpen) {
                if (this.mode === 'horizontal') {
                    this.expandState = 'bottom';
                }
                else if (this.mode === 'vertical') {
                    this.expandState = 'active';
                }
            }
            else {
                this.expandState = 'collapsed';
            }
        };
        /**
         * @return {?}
         */
        NzSubmenuNoneInlineChildComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.calcMotionState();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NzSubmenuNoneInlineChildComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var mode = changes.mode, nzOpen = changes.nzOpen;
            if (mode || nzOpen) {
                this.calcMotionState();
            }
        };
        NzSubmenuNoneInlineChildComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nz-submenu-none-inline-child]',
                        exportAs: 'nzSubmenuNoneInlineChild',
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [animation.zoomBigMotion, animation.slideMotion],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n    <div\n      [class.ant-dropdown-menu]=\"isMenuInsideDropDown\"\n      [class.ant-menu]=\"!isMenuInsideDropDown\"\n      [class.ant-dropdown-menu-vertical]=\"isMenuInsideDropDown\"\n      [class.ant-menu-vertical]=\"!isMenuInsideDropDown\"\n      [class.ant-dropdown-menu-sub]=\"isMenuInsideDropDown\"\n      [class.ant-menu-sub]=\"!isMenuInsideDropDown\"\n      [ngClass]=\"menuClass\"\n    >\n      <ng-template [ngTemplateOutlet]=\"templateOutlet\"></ng-template>\n    </div>\n  ",
                        host: {
                            '[class.ant-menu-submenu]': 'true',
                            '[class.ant-menu-submenu-popup]': 'true',
                            '[class.ant-menu-light]': "theme === 'light'",
                            '[class.ant-menu-dark]': "theme === 'dark'",
                            '[class.ant-menu-submenu-placement-bottom]': "mode === 'horizontal'",
                            '[class.ant-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
                            '[class.ant-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
                            '[@slideMotion]': 'expandState',
                            '[@zoomBigMotion]': 'expandState',
                            '(mouseenter)': 'setMouseState(true)',
                            '(mouseleave)': 'setMouseState(false)'
                        }
                    }] }
        ];
        NzSubmenuNoneInlineChildComponent.propDecorators = {
            menuClass: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            templateOutlet: [{ type: core.Input }],
            isMenuInsideDropDown: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            position: [{ type: core.Input }],
            nzDisabled: [{ type: core.Input }],
            nzOpen: [{ type: core.Input }],
            subMenuMouseState: [{ type: core.Output }]
        };
        return NzSubmenuNoneInlineChildComponent;
    }());
    if (false) {
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.menuClass;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.theme;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.templateOutlet;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.isMenuInsideDropDown;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.mode;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.position;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.nzDisabled;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.nzOpen;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.subMenuMouseState;
        /** @type {?} */
        NzSubmenuNoneInlineChildComponent.prototype.expandState;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: menu.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzMenuModule = /** @class */ (function () {
        function NzMenuModule() {
        }
        NzMenuModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, platform.PlatformModule, overlay.OverlayModule, icon.NzIconModule, noAnimation.NzNoAnimationModule, outlet.NzOutletModule],
                        declarations: [
                            NzMenuDirective,
                            NzMenuItemDirective,
                            NzSubMenuComponent,
                            NzMenuDividerDirective,
                            NzMenuGroupComponent,
                            NzSubMenuTitleComponent,
                            NzSubmenuInlineChildComponent,
                            NzSubmenuNoneInlineChildComponent
                        ],
                        exports: [NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
                    },] }
        ];
        return NzMenuModule;
    }());

    exports.MenuDropDownTokenFactory = MenuDropDownTokenFactory;
    exports.MenuGroupFactory = MenuGroupFactory;
    exports.MenuService = MenuService;
    exports.MenuServiceFactory = MenuServiceFactory;
    exports.NzIsMenuInsideDropDownToken = NzIsMenuInsideDropDownToken;
    exports.NzMenuDirective = NzMenuDirective;
    exports.NzMenuDividerDirective = NzMenuDividerDirective;
    exports.NzMenuGroupComponent = NzMenuGroupComponent;
    exports.NzMenuItemDirective = NzMenuItemDirective;
    exports.NzMenuModule = NzMenuModule;
    exports.NzMenuServiceLocalToken = NzMenuServiceLocalToken;
    exports.NzSubMenuComponent = NzSubMenuComponent;
    exports.NzSubMenuTitleComponent = NzSubMenuTitleComponent;
    exports.NzSubmenuInlineChildComponent = NzSubmenuInlineChildComponent;
    exports.NzSubmenuNoneInlineChildComponent = NzSubmenuNoneInlineChildComponent;
    exports.NzSubmenuService = NzSubmenuService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-menu.umd.js.map
