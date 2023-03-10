(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/config', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.config = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, rxjs, operators) { 'use strict';

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
     * Generated from: config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NzConfig() { }
    if (false) {
        /** @type {?|undefined} */
        NzConfig.prototype.affix;
        /** @type {?|undefined} */
        NzConfig.prototype.select;
        /** @type {?|undefined} */
        NzConfig.prototype.alert;
        /** @type {?|undefined} */
        NzConfig.prototype.anchor;
        /** @type {?|undefined} */
        NzConfig.prototype.avatar;
        /** @type {?|undefined} */
        NzConfig.prototype.backTop;
        /** @type {?|undefined} */
        NzConfig.prototype.badge;
        /** @type {?|undefined} */
        NzConfig.prototype.button;
        /** @type {?|undefined} */
        NzConfig.prototype.card;
        /** @type {?|undefined} */
        NzConfig.prototype.carousel;
        /** @type {?|undefined} */
        NzConfig.prototype.cascader;
        /** @type {?|undefined} */
        NzConfig.prototype.codeEditor;
        /** @type {?|undefined} */
        NzConfig.prototype.collapse;
        /** @type {?|undefined} */
        NzConfig.prototype.collapsePanel;
        /** @type {?|undefined} */
        NzConfig.prototype.datePicker;
        /** @type {?|undefined} */
        NzConfig.prototype.descriptions;
        /** @type {?|undefined} */
        NzConfig.prototype.drawer;
        /** @type {?|undefined} */
        NzConfig.prototype.empty;
        /** @type {?|undefined} */
        NzConfig.prototype.form;
        /** @type {?|undefined} */
        NzConfig.prototype.icon;
        /** @type {?|undefined} */
        NzConfig.prototype.message;
        /** @type {?|undefined} */
        NzConfig.prototype.modal;
        /** @type {?|undefined} */
        NzConfig.prototype.notification;
        /** @type {?|undefined} */
        NzConfig.prototype.pageHeader;
        /** @type {?|undefined} */
        NzConfig.prototype.progress;
        /** @type {?|undefined} */
        NzConfig.prototype.rate;
        /** @type {?|undefined} */
        NzConfig.prototype.space;
        /** @type {?|undefined} */
        NzConfig.prototype.spin;
        /** @type {?|undefined} */
        NzConfig.prototype.switch;
        /** @type {?|undefined} */
        NzConfig.prototype.table;
        /** @type {?|undefined} */
        NzConfig.prototype.tabs;
        /** @type {?|undefined} */
        NzConfig.prototype.timePicker;
        /** @type {?|undefined} */
        NzConfig.prototype.tree;
        /** @type {?|undefined} */
        NzConfig.prototype.treeSelect;
        /** @type {?|undefined} */
        NzConfig.prototype.typography;
    }
    /**
     * @record
     */
    function SelectConfig() { }
    if (false) {
        /** @type {?|undefined} */
        SelectConfig.prototype.nzBorderless;
        /** @type {?|undefined} */
        SelectConfig.prototype.nzSuffixIcon;
    }
    /**
     * @record
     */
    function AffixConfig() { }
    if (false) {
        /** @type {?|undefined} */
        AffixConfig.prototype.nzOffsetBottom;
        /** @type {?|undefined} */
        AffixConfig.prototype.nzOffsetTop;
    }
    /**
     * @record
     */
    function AlertConfig() { }
    if (false) {
        /** @type {?|undefined} */
        AlertConfig.prototype.nzCloseable;
        /** @type {?|undefined} */
        AlertConfig.prototype.nzShowIcon;
    }
    /**
     * @record
     */
    function AvatarConfig() { }
    if (false) {
        /** @type {?|undefined} */
        AvatarConfig.prototype.nzShape;
        /** @type {?|undefined} */
        AvatarConfig.prototype.nzSize;
    }
    /**
     * @record
     */
    function AnchorConfig() { }
    if (false) {
        /** @type {?|undefined} */
        AnchorConfig.prototype.nzBounds;
        /** @type {?|undefined} */
        AnchorConfig.prototype.nzOffsetBottom;
        /** @type {?|undefined} */
        AnchorConfig.prototype.nzOffsetTop;
        /** @type {?|undefined} */
        AnchorConfig.prototype.nzShowInkInFixed;
    }
    /**
     * @record
     */
    function BackTopConfig() { }
    if (false) {
        /** @type {?|undefined} */
        BackTopConfig.prototype.nzVisibilityHeight;
    }
    /**
     * @record
     */
    function BadgeConfig() { }
    if (false) {
        /** @type {?|undefined} */
        BadgeConfig.prototype.nzColor;
        /** @type {?|undefined} */
        BadgeConfig.prototype.nzOverflowCount;
        /** @type {?|undefined} */
        BadgeConfig.prototype.nzShowZero;
    }
    /**
     * @record
     */
    function ButtonConfig() { }
    if (false) {
        /** @type {?|undefined} */
        ButtonConfig.prototype.nzSize;
    }
    /**
     * @record
     */
    function CodeEditorConfig() { }
    if (false) {
        /** @type {?|undefined} */
        CodeEditorConfig.prototype.assetsRoot;
        /** @type {?|undefined} */
        CodeEditorConfig.prototype.defaultEditorOption;
        /** @type {?|undefined} */
        CodeEditorConfig.prototype.useStaticLoading;
        /**
         * @return {?}
         */
        CodeEditorConfig.prototype.onLoad = function () { };
        /**
         * @return {?}
         */
        CodeEditorConfig.prototype.onFirstEditorInit = function () { };
        /**
         * @return {?}
         */
        CodeEditorConfig.prototype.onInit = function () { };
    }
    /**
     * @record
     */
    function CardConfig() { }
    if (false) {
        /** @type {?|undefined} */
        CardConfig.prototype.nzSize;
        /** @type {?|undefined} */
        CardConfig.prototype.nzHoverable;
        /** @type {?|undefined} */
        CardConfig.prototype.nzBordered;
    }
    /**
     * @record
     */
    function CarouselConfig() { }
    if (false) {
        /** @type {?|undefined} */
        CarouselConfig.prototype.nzAutoPlay;
        /** @type {?|undefined} */
        CarouselConfig.prototype.nzAutoPlaySpeed;
        /** @type {?|undefined} */
        CarouselConfig.prototype.nzDots;
        /** @type {?|undefined} */
        CarouselConfig.prototype.nzEffect;
        /** @type {?|undefined} */
        CarouselConfig.prototype.nzEnableSwipe;
        /** @type {?|undefined} */
        CarouselConfig.prototype.nzVertical;
    }
    /**
     * @record
     */
    function CascaderConfig() { }
    if (false) {
        /** @type {?|undefined} */
        CascaderConfig.prototype.nzSize;
    }
    /**
     * @record
     */
    function CollapseConfig() { }
    if (false) {
        /** @type {?|undefined} */
        CollapseConfig.prototype.nzAccordion;
        /** @type {?|undefined} */
        CollapseConfig.prototype.nzBordered;
    }
    /**
     * @record
     */
    function CollapsePanelConfig() { }
    if (false) {
        /** @type {?|undefined} */
        CollapsePanelConfig.prototype.nzShowArrow;
    }
    /**
     * @record
     */
    function DatePickerConfig() { }
    if (false) {
        /** @type {?|undefined} */
        DatePickerConfig.prototype.nzSeparator;
        /** @type {?|undefined} */
        DatePickerConfig.prototype.nzSuffixIcon;
    }
    /**
     * @record
     */
    function DescriptionsConfig() { }
    if (false) {
        /** @type {?|undefined} */
        DescriptionsConfig.prototype.nzBorder;
        /** @type {?|undefined} */
        DescriptionsConfig.prototype.nzColumn;
        /** @type {?|undefined} */
        DescriptionsConfig.prototype.nzSize;
        /** @type {?|undefined} */
        DescriptionsConfig.prototype.nzColon;
    }
    /**
     * @record
     */
    function DrawerConfig() { }
    if (false) {
        /** @type {?|undefined} */
        DrawerConfig.prototype.nzMask;
        /** @type {?|undefined} */
        DrawerConfig.prototype.nzMaskClosable;
        /** @type {?|undefined} */
        DrawerConfig.prototype.nzCloseOnNavigation;
    }
    /**
     * @record
     */
    function EmptyConfig() { }
    if (false) {
        /** @type {?|undefined} */
        EmptyConfig.prototype.nzDefaultEmptyContent;
    }
    /**
     * @record
     */
    function FormConfig() { }
    if (false) {
        /** @type {?|undefined} */
        FormConfig.prototype.nzNoColon;
        /** @type {?|undefined} */
        FormConfig.prototype.nzAutoTips;
    }
    /**
     * @record
     */
    function IconConfig() { }
    if (false) {
        /** @type {?|undefined} */
        IconConfig.prototype.nzTheme;
        /** @type {?|undefined} */
        IconConfig.prototype.nzTwotoneColor;
    }
    /**
     * @record
     */
    function MessageConfig() { }
    if (false) {
        /** @type {?|undefined} */
        MessageConfig.prototype.nzAnimate;
        /** @type {?|undefined} */
        MessageConfig.prototype.nzDuration;
        /** @type {?|undefined} */
        MessageConfig.prototype.nzMaxStack;
        /** @type {?|undefined} */
        MessageConfig.prototype.nzPauseOnHover;
        /** @type {?|undefined} */
        MessageConfig.prototype.nzTop;
    }
    /**
     * @record
     */
    function ModalConfig() { }
    if (false) {
        /** @type {?|undefined} */
        ModalConfig.prototype.nzMask;
        /** @type {?|undefined} */
        ModalConfig.prototype.nzMaskClosable;
        /** @type {?|undefined} */
        ModalConfig.prototype.nzCloseOnNavigation;
    }
    /**
     * @record
     */
    function NotificationConfig() { }
    if (false) {
        /** @type {?|undefined} */
        NotificationConfig.prototype.nzTop;
        /** @type {?|undefined} */
        NotificationConfig.prototype.nzBottom;
        /** @type {?|undefined} */
        NotificationConfig.prototype.nzPlacement;
    }
    /**
     * @record
     */
    function PageHeaderConfig() { }
    if (false) {
        /** @type {?} */
        PageHeaderConfig.prototype.nzGhost;
    }
    /**
     * @record
     */
    function ProgressConfig() { }
    if (false) {
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzGapDegree;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzGapPosition;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzShowInfo;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzStrokeSwitch;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzStrokeWidth;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzSize;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzStrokeLinecap;
        /** @type {?|undefined} */
        ProgressConfig.prototype.nzStrokeColor;
    }
    /**
     * @record
     */
    function RateConfig() { }
    if (false) {
        /** @type {?|undefined} */
        RateConfig.prototype.nzAllowClear;
        /** @type {?|undefined} */
        RateConfig.prototype.nzAllowHalf;
    }
    /**
     * @record
     */
    function SpaceConfig() { }
    if (false) {
        /** @type {?|undefined} */
        SpaceConfig.prototype.nzSize;
    }
    /**
     * @record
     */
    function SpinConfig() { }
    if (false) {
        /** @type {?|undefined} */
        SpinConfig.prototype.nzIndicator;
    }
    /**
     * @record
     */
    function SwitchConfig() { }
    if (false) {
        /** @type {?} */
        SwitchConfig.prototype.nzSize;
    }
    /**
     * @record
     */
    function TableConfig() { }
    if (false) {
        /** @type {?|undefined} */
        TableConfig.prototype.nzBordered;
        /** @type {?|undefined} */
        TableConfig.prototype.nzSize;
        /** @type {?|undefined} */
        TableConfig.prototype.nzShowQuickJumper;
        /** @type {?|undefined} */
        TableConfig.prototype.nzLoadingIndicator;
        /** @type {?|undefined} */
        TableConfig.prototype.nzShowSizeChanger;
        /** @type {?|undefined} */
        TableConfig.prototype.nzSimple;
        /** @type {?|undefined} */
        TableConfig.prototype.nzHideOnSinglePage;
    }
    /**
     * @record
     */
    function TabsConfig() { }
    if (false) {
        /** @type {?|undefined} */
        TabsConfig.prototype.nzAnimated;
        /** @type {?|undefined} */
        TabsConfig.prototype.nzSize;
        /** @type {?|undefined} */
        TabsConfig.prototype.nzType;
        /** @type {?|undefined} */
        TabsConfig.prototype.nzTabBarGutter;
        /** @type {?|undefined} */
        TabsConfig.prototype.nzShowPagination;
    }
    /**
     * @record
     */
    function TimePickerConfig() { }
    if (false) {
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzAllowEmpty;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzClearText;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzFormat;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzHourStep;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzMinuteStep;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzSecondStep;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzPopupClassName;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzUse12Hours;
        /** @type {?|undefined} */
        TimePickerConfig.prototype.nzSuffixIcon;
    }
    /**
     * @record
     */
    function TreeConfig() { }
    if (false) {
        /** @type {?|undefined} */
        TreeConfig.prototype.nzBlockNode;
        /** @type {?|undefined} */
        TreeConfig.prototype.nzShowIcon;
        /** @type {?|undefined} */
        TreeConfig.prototype.nzHideUnMatched;
    }
    /**
     * @record
     */
    function TreeSelectConfig() { }
    if (false) {
        /** @type {?|undefined} */
        TreeSelectConfig.prototype.nzShowIcon;
        /** @type {?|undefined} */
        TreeSelectConfig.prototype.nzShowLine;
        /** @type {?|undefined} */
        TreeSelectConfig.prototype.nzDropdownMatchSelectWidth;
        /** @type {?|undefined} */
        TreeSelectConfig.prototype.nzHideUnMatched;
        /** @type {?|undefined} */
        TreeSelectConfig.prototype.nzSize;
    }
    /**
     * @record
     */
    function TypographyConfig() { }
    if (false) {
        /** @type {?|undefined} */
        TypographyConfig.prototype.nzEllipsisRows;
    }
    /**
     * User should provide an object implements this interface to set global configurations.
     * @type {?}
     */
    var NZ_CONFIG = new core.InjectionToken('nz-config');

    /**
     * @fileoverview added by tsickle
     * Generated from: config.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var isDefined = (/**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        return value !== undefined;
    });
    var ??0 = isDefined;
    var NzConfigService = /** @class */ (function () {
        function NzConfigService(defaultConfig) {
            this.configUpdated$ = new rxjs.Subject();
            this.config = defaultConfig || {};
        }
        /**
         * @template T
         * @param {?} componentName
         * @return {?}
         */
        NzConfigService.prototype.getConfigForComponent = /**
         * @template T
         * @param {?} componentName
         * @return {?}
         */
        function (componentName) {
            return this.config[componentName];
        };
        /**
         * @param {?} componentName
         * @return {?}
         */
        NzConfigService.prototype.getConfigChangeEventForComponent = /**
         * @param {?} componentName
         * @return {?}
         */
        function (componentName) {
            return this.configUpdated$.pipe(operators.filter((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return n === componentName; })), operators.mapTo(undefined));
        };
        /**
         * @template T
         * @param {?} componentName
         * @param {?} value
         * @return {?}
         */
        NzConfigService.prototype.set = /**
         * @template T
         * @param {?} componentName
         * @param {?} value
         * @return {?}
         */
        function (componentName, value) {
            this.config[componentName] = __assign(__assign({}, this.config[componentName]), value);
            this.configUpdated$.next(componentName);
        };
        NzConfigService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NzConfigService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NZ_CONFIG,] }] }
        ]; };
        /** @nocollapse */ NzConfigService.??prov = core.????defineInjectable({ factory: function NzConfigService_Factory() { return new NzConfigService(core.????inject(NZ_CONFIG, 8)); }, token: NzConfigService, providedIn: "root" });
        return NzConfigService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NzConfigService.prototype.configUpdated$;
        /**
         * Global config holding property.
         * @type {?}
         * @private
         */
        NzConfigService.prototype.config;
    }
    // tslint:disable:no-invalid-this
    /**
     * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
     * config.
     * @template T
     * @param {?} componentName
     * @return {?}
     */
    // tslint:disable-next-line:typedef
    function WithConfig(componentName) {
        return (/**
         * @param {?} target
         * @param {?} propName
         * @param {?=} originalDescriptor
         * @return {?}
         */
        function ConfigDecorator(target, propName, originalDescriptor) {
            /** @type {?} */
            var privatePropName = "$$__assignedValue__" + propName;
            Object.defineProperty(target, privatePropName, {
                configurable: true,
                writable: true,
                enumerable: false
            });
            return {
                get: /**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var originalValue = (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.get) ? originalDescriptor.get.bind(this)() : this[privatePropName];
                    /** @type {?} */
                    var assignedByUser = ((this.assignmentCount || {})[propName] || 0) > 1;
                    if (assignedByUser && isDefined(originalValue)) {
                        return originalValue;
                    }
                    /** @type {?} */
                    var componentConfig = this.nzConfigService.getConfigForComponent(componentName) || {};
                    /** @type {?} */
                    var configValue = componentConfig[propName];
                    /** @type {?} */
                    var ret = isDefined(configValue) ? configValue : originalValue;
                    return ret;
                },
                set: /**
                 * @param {?=} value
                 * @return {?}
                 */
                function (value) {
                    // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                    this.assignmentCount = this.assignmentCount || {};
                    this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;
                    if (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.set) {
                        originalDescriptor.set.bind(this)(value);
                    }
                    else {
                        this[privatePropName] = value;
                    }
                },
                configurable: true,
                enumerable: true
            };
        });
    }

    exports.NZ_CONFIG = NZ_CONFIG;
    exports.NzConfigService = NzConfigService;
    exports.WithConfig = WithConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-config.umd.js.map
