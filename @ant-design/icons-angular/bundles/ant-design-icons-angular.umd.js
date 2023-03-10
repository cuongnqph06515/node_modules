(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ant-design/colors'), require('@angular/common/http'), require('@angular/platform-browser'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ant-design/icons-angular', ['exports', '@angular/common', '@angular/core', '@ant-design/colors', '@angular/common/http', '@angular/platform-browser', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ant-design'] = global['ant-design'] || {}, global['ant-design']['icons-angular'] = {}), global.ng.common, global.ng.core, global.colors, global.ng.common.http, global.ng.platformBrowser, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, colors, http, platformBrowser, rxjs, operators) { 'use strict';

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

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
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

    var ANT_ICON_ANGULAR_CONSOLE_PREFIX = '[@ant-design/icons-angular]:';
    function error(message) {
        console.error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + " " + message + ".");
    }
    function warn(message) {
        if (core.isDevMode()) {
            console.warn(ANT_ICON_ANGULAR_CONSOLE_PREFIX + " " + message + ".");
        }
    }
    function getSecondaryColor(primaryColor) {
        return colors.generate(primaryColor)[0];
    }
    function withSuffix(name, theme) {
        switch (theme) {
            case 'fill': return name + "-fill";
            case 'outline': return name + "-o";
            case 'twotone': return name + "-twotone";
            case undefined: return name;
            default: throw new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "Theme \"" + theme + "\" is not a recognized theme!");
        }
    }
    function withSuffixAndColor(name, theme, pri, sec) {
        return withSuffix(name, theme) + "-" + pri + "-" + sec;
    }
    function mapAbbrToTheme(abbr) {
        return abbr === 'o' ? 'outline' : abbr;
    }
    function alreadyHasAThemeSuffix(name) {
        return name.endsWith('-fill') || name.endsWith('-o') || name.endsWith('-twotone');
    }
    function isIconDefinition(target) {
        return (typeof target === 'object' &&
            typeof target.name === 'string' &&
            (typeof target.theme === 'string' || target.theme === undefined) &&
            typeof target.icon === 'string');
    }
    /**
     * Get an `IconDefinition` object from abbreviation type, like `account-book-fill`.
     * @param str
     */
    function getIconDefinitionFromAbbr(str) {
        var arr = str.split('-');
        var theme = mapAbbrToTheme(arr.splice(arr.length - 1, 1)[0]);
        var name = arr.join('-');
        return {
            name: name,
            theme: theme,
            icon: ''
        };
    }
    function cloneSVG(svg) {
        return svg.cloneNode(true);
    }
    /**
     * Parse inline SVG string and replace colors with placeholders. For twotone icons only.
     */
    function replaceFillColor(raw) {
        return raw
            .replace(/['"]#333['"]/g, '"primaryColor"')
            .replace(/['"]#E6E6E6['"]/g, '"secondaryColor"')
            .replace(/['"]#D9D9D9['"]/g, '"secondaryColor"')
            .replace(/['"]#D8D8D8['"]/g, '"secondaryColor"');
    }
    /**
     * Split a name with namespace in it into a tuple like [ name, namespace ].
     */
    function getNameAndNamespace(type) {
        var split = type.split(':');
        switch (split.length) {
            case 1: return [type, ''];
            case 2: return [split[1], split[0]];
            default: throw new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "The icon type " + type + " is not valid!");
        }
    }
    function hasNamespace(type) {
        return getNameAndNamespace(type)[1] !== '';
    }

    function NameSpaceIsNotSpecifyError() {
        return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "Type should have a namespace. Try \"namespace:" + name + "\".");
    }
    function IconNotFoundError(icon) {
        return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "the icon " + icon + " does not exist or is not registered.");
    }
    function HttpModuleNotImport() {
        error("you need to import \"HttpClientModule\" to use dynamic importing.");
        return null;
    }
    function UrlNotSafeError(url) {
        return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "The url \"" + url + "\" is unsafe.");
    }
    function SVGTagNotFoundError() {
        return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "<svg> tag not found.");
    }
    function DynamicLoadingTimeoutError() {
        return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "Importing timeout error.");
    }

    var JSONP_HANDLER_NAME = '__ant_icon_load';
    var IconService = /** @class */ (function () {
        function IconService(_rendererFactory, _handler, 
        // tslint:disable-next-line:no-any
        _document, sanitizer) {
            this._rendererFactory = _rendererFactory;
            this._handler = _handler;
            this._document = _document;
            this.sanitizer = sanitizer;
            this.defaultTheme = 'outline';
            /**
             * All icon definitions would be registered here.
             */
            this._svgDefinitions = new Map();
            /**
             * Cache all rendered icons. Icons are identified by name, theme,
             * and for twotone icons, primary color and secondary color.
             */
            this._svgRenderedDefinitions = new Map();
            this._inProgressFetches = new Map();
            /**
             * Url prefix for fetching inline SVG by dynamic importing.
             */
            this._assetsUrlRoot = '';
            this._twoToneColorPalette = {
                primaryColor: '#333333',
                secondaryColor: '#E6E6E6'
            };
            /** A flag indicates whether jsonp loading is enabled. */
            this._enableJsonpLoading = false;
            this._jsonpIconLoad$ = new rxjs.Subject();
            this._renderer = this._rendererFactory.createRenderer(null, null);
            if (this._handler) {
                this._http = new http.HttpClient(this._handler);
            }
        }
        Object.defineProperty(IconService.prototype, "twoToneColor", {
            get: function () {
                // Make a copy to avoid unexpected changes.
                return __assign({}, this._twoToneColorPalette);
            },
            set: function (_a) {
                var primaryColor = _a.primaryColor, secondaryColor = _a.secondaryColor;
                this._twoToneColorPalette.primaryColor = primaryColor;
                this._twoToneColorPalette.secondaryColor =
                    secondaryColor || getSecondaryColor(primaryColor);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Call this method to switch to jsonp like loading.
         */
        IconService.prototype.useJsonpLoading = function () {
            var _this = this;
            if (!this._enableJsonpLoading) {
                this._enableJsonpLoading = true;
                window[JSONP_HANDLER_NAME] = function (icon) {
                    _this._jsonpIconLoad$.next(icon);
                };
            }
            else {
                warn('You are already using jsonp loading.');
            }
        };
        /**
         * Change the prefix of the inline svg resources, so they could be deployed elsewhere, like CDN.
         * @param prefix
         */
        IconService.prototype.changeAssetsSource = function (prefix) {
            this._assetsUrlRoot = prefix.endsWith('/') ? prefix : prefix + '/';
        };
        /**
         * Add icons provided by ant design.
         * @param icons
         */
        IconService.prototype.addIcon = function () {
            var _this = this;
            var icons = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                icons[_i] = arguments[_i];
            }
            icons.forEach(function (icon) {
                _this._svgDefinitions.set(withSuffix(icon.name, icon.theme), icon);
            });
        };
        /**
         * Register an icon. Namespace is required.
         * @param type
         * @param literal
         */
        IconService.prototype.addIconLiteral = function (type, literal) {
            var _a = __read(getNameAndNamespace(type), 2), _ = _a[0], namespace = _a[1];
            if (!namespace) {
                throw NameSpaceIsNotSpecifyError();
            }
            this.addIcon({ name: type, icon: literal });
        };
        /**
         * Remove all cache.
         */
        IconService.prototype.clear = function () {
            this._svgDefinitions.clear();
            this._svgRenderedDefinitions.clear();
        };
        /**
         * Get a rendered `SVGElement`.
         * @param icon
         * @param twoToneColor
         */
        IconService.prototype.getRenderedContent = function (icon, twoToneColor) {
            var _this = this;
            // If `icon` is a `IconDefinition`, go to the next step. If not, try to fetch it from cache.
            var definitionOrNull = isIconDefinition(icon)
                ? icon
                : this._svgDefinitions.get(icon) || null;
            // If `icon` is a `IconDefinition` of successfully fetch, wrap it in an `Observable`.
            // Otherwise try to fetch it from remote.
            var $iconDefinition = definitionOrNull
                ? rxjs.of(definitionOrNull)
                : this._loadIconDynamically(icon);
            // If finally get an `IconDefinition`, render and return it. Otherwise throw an error.
            return $iconDefinition.pipe(operators.map(function (i) {
                if (!i) {
                    throw IconNotFoundError(icon);
                }
                return _this._loadSVGFromCacheOrCreateNew(i, twoToneColor);
            }));
        };
        IconService.prototype.getCachedIcons = function () {
            return this._svgDefinitions;
        };
        /**
         * Get raw svg and assemble a `IconDefinition` object.
         * @param type
         */
        IconService.prototype._loadIconDynamically = function (type) {
            var _this = this;
            // If developer doesn't provide HTTP module nor enable jsonp loading, just throw an error.
            if (!this._http && !this._enableJsonpLoading) {
                return rxjs.of(HttpModuleNotImport());
            }
            // If multi directive ask for the same icon at the same time,
            // request should only be fired once.
            var inProgress = this._inProgressFetches.get(type);
            if (!inProgress) {
                var _a = __read(getNameAndNamespace(type), 2), name_1 = _a[0], namespace = _a[1];
                // If the string has a namespace within, create a simple `IconDefinition`.
                var icon_1 = namespace
                    ? { name: type, icon: '' }
                    : getIconDefinitionFromAbbr(name_1);
                var suffix = this._enableJsonpLoading ? '.js' : '.svg';
                var url = (namespace
                    ? this._assetsUrlRoot + "assets/" + namespace + "/" + name_1
                    : this._assetsUrlRoot + "assets/" + icon_1.theme + "/" + icon_1.name) + suffix;
                var safeUrl = this.sanitizer.sanitize(core.SecurityContext.URL, url);
                if (!safeUrl) {
                    throw UrlNotSafeError(url);
                }
                var source = !this._enableJsonpLoading
                    ? this._http
                        .get(safeUrl, { responseType: 'text' })
                        .pipe(operators.map(function (literal) { return (__assign(__assign({}, icon_1), { icon: literal })); }))
                    : this._loadIconDynamicallyWithJsonp(icon_1, safeUrl);
                inProgress = source.pipe(operators.tap(function (definition) { return _this.addIcon(definition); }), operators.finalize(function () { return _this._inProgressFetches.delete(type); }), operators.catchError(function () { return rxjs.of(null); }), operators.share());
                this._inProgressFetches.set(type, inProgress);
            }
            return inProgress;
        };
        IconService.prototype._loadIconDynamicallyWithJsonp = function (icon, url) {
            var _this = this;
            return new rxjs.Observable(function (subscriber) {
                var loader = _this._document.createElement('script');
                var timer = setTimeout(function () {
                    clean();
                    subscriber.error(DynamicLoadingTimeoutError());
                }, 6000);
                loader.src = url;
                function clean() {
                    loader.parentNode.removeChild(loader);
                    clearTimeout(timer);
                }
                _this._document.body.appendChild(loader);
                _this._jsonpIconLoad$
                    .pipe(operators.filter(function (i) { return i.name === icon.name && i.theme === icon.theme; }), operators.take(1))
                    .subscribe(function (i) {
                    subscriber.next(i);
                    clean();
                });
            });
        };
        /**
         * Render a new `SVGElement` for a given `IconDefinition`, or make a copy from cache.
         * @param icon
         * @param twoToneColor
         */
        IconService.prototype._loadSVGFromCacheOrCreateNew = function (icon, twoToneColor) {
            var svg;
            var pri = twoToneColor || this._twoToneColorPalette.primaryColor;
            var sec = getSecondaryColor(pri) || this._twoToneColorPalette.secondaryColor;
            var key = icon.theme === 'twotone'
                ? withSuffixAndColor(icon.name, icon.theme, pri, sec)
                : icon.theme === undefined
                    ? icon.name
                    : withSuffix(icon.name, icon.theme);
            // Try to make a copy from cache.
            var cached = this._svgRenderedDefinitions.get(key);
            if (cached) {
                svg = cached.icon;
            }
            else {
                svg = this._setSVGAttribute(this._colorizeSVGIcon(
                // Icons provided by ant design should be refined to remove preset colors.
                this._createSVGElementFromString(hasNamespace(icon.name) ? icon.icon : replaceFillColor(icon.icon)), icon.theme === 'twotone', pri, sec));
                // Cache it.
                this._svgRenderedDefinitions.set(key, __assign(__assign({}, icon), { icon: svg }));
            }
            return cloneSVG(svg);
        };
        IconService.prototype._createSVGElementFromString = function (str) {
            var div = this._document.createElement('div');
            div.innerHTML = str;
            var svg = div.querySelector('svg');
            if (!svg) {
                throw SVGTagNotFoundError;
            }
            return svg;
        };
        IconService.prototype._setSVGAttribute = function (svg) {
            this._renderer.setAttribute(svg, 'width', '1em');
            this._renderer.setAttribute(svg, 'height', '1em');
            return svg;
        };
        IconService.prototype._colorizeSVGIcon = function (svg, twotone, pri, sec) {
            if (twotone) {
                var children = svg.childNodes;
                var length_1 = children.length;
                for (var i = 0; i < length_1; i++) {
                    var child = children[i];
                    if (child.getAttribute('fill') === 'secondaryColor') {
                        this._renderer.setAttribute(child, 'fill', sec);
                    }
                    else {
                        this._renderer.setAttribute(child, 'fill', pri);
                    }
                }
            }
            this._renderer.setAttribute(svg, 'fill', 'currentColor');
            return svg;
        };
        IconService.ctorParameters = function () { return [
            { type: core.RendererFactory2 },
            { type: http.HttpBackend, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        IconService = __decorate([
            core.Injectable(),
            __param(1, core.Optional()),
            __param(2, core.Optional()), __param(2, core.Inject(common.DOCUMENT))
        ], IconService);
        return IconService;
    }());

    var IconDirective = /** @class */ (function () {
        function IconDirective(_iconService, _elementRef, _renderer) {
            this._iconService = _iconService;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
        }
        IconDirective.prototype.ngOnChanges = function (changes) {
            if (changes.type || changes.theme || changes.twoToneColor) {
                this._changeIcon();
            }
        };
        /**
         * Render a new icon in the current element. Remove the icon when `type` is falsy.
         */
        IconDirective.prototype._changeIcon = function () {
            var _this = this;
            return new Promise(function (resolve) {
                if (!_this.type) {
                    _this._clearSVGElement();
                    resolve(null);
                }
                else {
                    _this._iconService.getRenderedContent(_this._parseIconType(_this.type, _this.theme), _this.twoToneColor).subscribe(function (svg) {
                        _this._setSVGElement(svg);
                        resolve(svg);
                    });
                }
            });
        };
        /**
         * Parse a icon to the standard form, an `IconDefinition` or a string like 'account-book-fill` (with a theme suffixed).
         * If namespace is specified, ignore theme because it meaningless for users' icons.
         * @param type
         * @param theme
         */
        IconDirective.prototype._parseIconType = function (type, theme) {
            if (isIconDefinition(type)) {
                return type;
            }
            else {
                var _a = __read(getNameAndNamespace(type), 2), name_1 = _a[0], namespace = _a[1];
                if (namespace) {
                    return type;
                }
                if (alreadyHasAThemeSuffix(name_1)) {
                    if (!!theme) {
                        warn("'type' " + name_1 + " already gets a theme inside so 'theme' " + theme + " would be ignored");
                    }
                    return name_1;
                }
                else {
                    return withSuffix(name_1, theme || this._iconService.defaultTheme);
                }
            }
        };
        IconDirective.prototype._setSVGElement = function (svg) {
            this._clearSVGElement();
            this._renderer.appendChild(this._elementRef.nativeElement, svg);
        };
        IconDirective.prototype._clearSVGElement = function () {
            var el = this._elementRef.nativeElement;
            var children = el.childNodes;
            var length = children.length;
            for (var i = length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.tagName.toLowerCase() === 'svg') {
                    this._renderer.removeChild(el, child);
                }
            }
        };
        IconDirective.ctorParameters = function () { return [
            { type: IconService },
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], IconDirective.prototype, "type", void 0);
        __decorate([
            core.Input()
        ], IconDirective.prototype, "theme", void 0);
        __decorate([
            core.Input()
        ], IconDirective.prototype, "twoToneColor", void 0);
        IconDirective = __decorate([
            core.Directive({
                selector: '[antIcon]'
            })
        ], IconDirective);
        return IconDirective;
    }());

    var IconModule = /** @class */ (function () {
        function IconModule() {
        }
        IconModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [IconDirective],
                declarations: [IconDirective],
                providers: [IconService]
            })
        ], IconModule);
        return IconModule;
    }());

    var manifest = {
        fill: [
            'alert', 'account-book', 'alipay-circle', 'alipay-square', 'amazon-circle', 'aliwangwang', 'amazon-square', 'android', 'api', 'apple', 'appstore', 'audio', 'backward', 'bank', 'behance-circle', 'book', 'box-plot', 'bell', 'behance-square', 'build', 'bug', 'bulb', 'calculator', 'camera', 'calendar', 'car', 'caret-left', 'caret-down', 'caret-up', 'caret-right', 'carry-out', 'check-circle', 'chrome', 'clock-circle', 'check-square', 'close-circle', 'ci-circle', 'code-sandbox-circle', 'close-square', 'cloud', 'code-sandbox-square', 'codepen-circle', 'code', 'contacts', 'compass', 'codepen-square', 'control', 'container', 'copy', 'credit-card', 'customer-service', 'copyright-circle', 'database', 'crown', 'dashboard', 'diff', 'delete', 'dingtalk-circle', 'dingtalk-square', 'dislike', 'dollar-circle', 'down-square', 'down-circle', 'dribbble-circle', 'dribbble-square', 'dropbox-circle', 'edit', 'dropbox-square', 'euro-circle', 'exclamation-circle', 'environment', 'eye-invisible', 'experiment', 'facebook', 'eye', 'fast-backward', 'fast-forward', 'file-excel', 'file-add', 'file-exclamation', 'file-pdf', 'file-image', 'file-markdown', 'file-ppt', 'file-text', 'file-unknown', 'file', 'file-zip', 'file-word', 'filter', 'fire', 'flag', 'folder-add', 'format-painter', 'folder', 'folder-open', 'forward', 'fund', 'frown', 'funnel-plot', 'github', 'gitlab', 'gift', 'gold', 'golden', 'google-circle', 'google-plus-circle', 'google-plus-square', 'google-square', 'hdd', 'heart', 'highlight', 'home', 'hourglass', 'html5', 'idcard', 'ie-circle', 'info-circle', 'ie-square', 'instagram', 'insurance', 'layout', 'interaction', 'linkedin', 'left-circle', 'left-square', 'like', 'lock', 'mac-command', 'mail', 'medicine-box', 'medium-circle', 'meh', 'message', 'medium-square', 'minus-circle', 'mobile', 'money-collect', 'minus-square', 'notification', 'pause-circle', 'pay-circle', 'phone', 'picture', 'pie-chart', 'plus-circle', 'play-circle', 'play-square', 'plus-square', 'pound-circle', 'printer', 'project', 'property-safety', 'profile', 'pushpin', 'qq-circle', 'qq-square', 'question-circle', 'read', 'red-envelope', 'reddit-circle', 'reconciliation', 'reddit-square', 'right-circle', 'right-square', 'robot', 'rest', 'safety-certificate', 'rocket', 'save', 'security-scan', 'schedule', 'sketch-circle', 'signal', 'setting', 'shop', 'shopping', 'skin', 'sketch-square', 'slack-circle', 'skype', 'smile', 'slack-square', 'sliders', 'sound', 'snippets', 'star', 'step-forward', 'stop', 'tag', 'step-backward', 'switcher', 'tablet', 'tags', 'thunderbolt', 'taobao-square', 'trademark-circle', 'taobao-circle', 'tool', 'twitter-circle', 'trophy', 'twitter-square', 'up-square', 'up-circle', 'warning', 'usb', 'unlock', 'wechat', 'video-camera', 'weibo-circle', 'windows', 'wallet', 'weibo-square', 'yuque', 'youtube', 'zhihu-square', 'yahoo', 'zhihu-circle'
        ],
        outline: [
            'alert', 'account-book', 'aim', 'align-center', 'align-right', 'align-left', 'alibaba', 'alipay-circle', 'alipay', 'aliwangwang', 'aliyun', 'ant-design', 'android', 'apartment', 'ant-cloud', 'amazon', 'api', 'appstore-add', 'appstore', 'apple', 'area-chart', 'arrow-right', 'arrow-down', 'arrow-up', 'arrow-left', 'arrows-alt', 'audio-muted', 'audio', 'backward', 'audit', 'bank', 'barcode', 'bars', 'bar-chart', 'behance', 'behance-square', 'bg-colors', 'bell', 'block', 'bold', 'book', 'border-bottom', 'border-horizontal', 'border-left', 'border-outer', 'border-inner', 'border-right', 'border-top', 'border-verticle', 'border', 'box-plot', 'borderless-table', 'bug', 'branches', 'build', 'bulb', 'calculator', 'calendar', 'camera', 'caret-down', 'car', 'caret-left', 'caret-right', 'caret-up', 'carry-out', 'check-circle', 'check', 'check-square', 'ci-circle', 'ci', 'chrome', 'clock-circle', 'clear', 'close-circle', 'close-square', 'close', 'cloud-server', 'cloud-sync', 'cloud-upload', 'cloud-download', 'cluster', 'cloud', 'code-sandbox', 'code', 'codepen-circle', 'codepen', 'column-height', 'coffee', 'comment', 'compass', 'column-width', 'compress', 'console-sql', 'contacts', 'container', 'control', 'copy', 'copyright-circle', 'copyright', 'credit-card', 'dash', 'customer-service', 'crown', 'dashboard', 'database', 'delete-column', 'delete-row', 'delete', 'deployment-unit', 'desktop', 'delivered-procedure', 'dingtalk', 'diff', 'dingding', 'disconnect', 'dislike', 'dollar-circle', 'dollar', 'dot-chart', 'double-left', 'double-right', 'down-square', 'down', 'down-circle', 'download', 'dribbble', 'drag', 'dribbble-square', 'dropbox', 'edit', 'ellipsis', 'enter', 'euro-circle', 'environment', 'euro', 'exclamation-circle', 'expand-alt', 'exclamation', 'exception', 'expand', 'experiment', 'export', 'eye-invisible', 'eye', 'facebook', 'fast-backward', 'fall', 'fast-forward', 'field-binary', 'field-time', 'field-number', 'field-string', 'file-add', 'file-done', 'file-excel', 'file-exclamation', 'file-gif', 'file-image', 'file-jpg', 'file-ppt', 'file-markdown', 'file-pdf', 'file-protect', 'file-search', 'file-text', 'file-sync', 'file-unknown', 'file-word', 'file-zip', 'filter', 'fire', 'file', 'folder-add', 'folder-open', 'flag', 'font-colors', 'folder', 'font-size', 'folder-view', 'forward', 'fork', 'form', 'format-painter', 'fullscreen-exit', 'fund-projection-screen', 'frown', 'fullscreen', 'fund-view', 'function', 'fund', 'funnel-plot', 'gif', 'gateway', 'github', 'gift', 'gold', 'google-plus', 'google', 'gitlab', 'global', 'hdd', 'heat-map', 'group', 'highlight', 'heart', 'history', 'home', 'ie', 'hourglass', 'idcard', 'import', 'inbox', 'html5', 'info', 'info-circle', 'insert-row-right', 'insert-row-above', 'issues-close', 'instagram', 'insert-row-below', 'left-square', 'layout', 'insurance', 'key', 'laptop', 'insert-row-left', 'left', 'italic', 'left-circle', 'line-height', 'like', 'interaction', 'linkedin', 'loading', 'link', 'loading-3-quarters', 'login', 'line-chart', 'line', 'lock', 'medium-workmark', 'logout', 'mail', 'mac-command', 'man', 'medicine-box', 'menu-unfold', 'medium', 'menu-fold', 'menu', 'meh', 'minus-circle', 'minus', 'message', 'minus-square', 'merge-cells', 'more', 'node-collapse', 'node-index', 'mobile', 'one-to-one', 'node-expand', 'notification', 'money-collect', 'number', 'monitor', 'pause', 'pause-circle', 'pay-circle', 'ordered-list', 'partition', 'percentage', 'paper-clip', 'phone', 'pic-center', 'pic-left', 'play-circle', 'picture', 'pic-right', 'plus-circle', 'play-square', 'pie-chart', 'pound-circle', 'printer', 'pound', 'plus', 'project', 'poweroff', 'profile', 'pull-request', 'qrcode', 'plus-square', 'radius-bottomright', 'pushpin', 'radius-setting', 'radar-chart', 'qq', 'property-safety', 'radius-upleft', 'question-circle', 'reconciliation', 'radius-bottomleft', 'read', 'redo', 'question', 'radius-upright', 'rest', 'red-envelope', 'right', 'reload', 'reddit', 'retweet', 'right-square', 'rise', 'robot', 'right-circle', 'rollback', 'safety-certificate', 'rocket', 'safety', 'save', 'rotate-right', 'rotate-left', 'scan', 'schedule', 'search', 'share-alt', 'scissor', 'select', 'security-scan', 'shop', 'shrink', 'send', 'shake', 'setting', 'skin', 'shopping', 'sisternode', 'slack-square', 'shopping-cart', 'smile', 'skype', 'small-dash', 'slack', 'sketch', 'sliders', 'solution', 'sort-descending', 'step-backward', 'snippets', 'star', 'split-cells', 'step-forward', 'sort-ascending', 'stock', 'sound', 'stop', 'subnode', 'swap-left', 'table', 'strikethrough', 'swap', 'switcher', 'tablet', 'tags', 'swap-right', 'taobao', 'taobao-circle', 'team', 'sync', 'tool', 'tag', 'to-top', 'trademark', 'trademark-circle', 'twitter', 'thunderbolt', 'trophy', 'translation', 'transaction', 'undo', 'unordered-list', 'unlock', 'underline', 'up-circle', 'upload', 'up-square', 'up', 'user-switch', 'user-delete', 'ungroup', 'verified', 'user', 'usb', 'usergroup-delete', 'usergroup-add', 'vertical-left', 'user-add', 'vertical-align-middle', 'vertical-align-top', 'video-camera-add', 'vertical-align-bottom', 'wallet', 'vertical-right', 'video-camera', 'weibo-circle', 'wechat', 'warning', 'weibo', 'weibo-square', 'woman', 'whats-app', 'windows', 'yuque', 'yahoo', 'youtube', 'zoom-out', 'wifi', 'zoom-in', 'zhihu'
        ],
        twotone: [
            'account-book', 'api', 'alert', 'appstore', 'bank', 'bell', 'audio', 'book', 'build', 'box-plot', 'bulb', 'bug', 'calculator', 'calendar', 'carry-out', 'check-circle', 'check-square', 'camera', 'car', 'ci-circle', 'ci', 'clock-circle', 'close-circle', 'code', 'close-square', 'cloud', 'contacts', 'container', 'compass', 'copy', 'control', 'copyright', 'copyright-circle', 'credit-card', 'crown', 'customer-service', 'dashboard', 'database', 'delete', 'diff', 'dollar-circle', 'dislike', 'dollar', 'down-circle', 'edit', 'environment', 'euro', 'down-square', 'euro-circle', 'experiment', 'eye-invisible', 'exclamation-circle', 'eye', 'file-add', 'file-excel', 'file-exclamation', 'file-ppt', 'file-image', 'file-markdown', 'file-pdf', 'file-text', 'file-unknown', 'file-zip', 'file-word', 'filter', 'file', 'fire', 'flag', 'folder-add', 'fund', 'folder-open', 'folder', 'frown', 'gift', 'gold', 'funnel-plot', 'hdd', 'heart', 'home', 'highlight', 'html5', 'hourglass', 'idcard', 'info-circle', 'interaction', 'layout', 'insurance', 'like', 'left-circle', 'left-square', 'mail', 'lock', 'medicine-box', 'meh', 'minus-circle', 'message', 'money-collect', 'minus-square', 'mobile', 'notification', 'pause-circle', 'phone', 'pie-chart', 'picture', 'play-circle', 'play-square', 'plus-circle', 'printer', 'pound-circle', 'plus-square', 'profile', 'project', 'property-safety', 'reconciliation', 'red-envelope', 'pushpin', 'rest', 'question-circle', 'right-circle', 'right-square', 'safety-certificate', 'save', 'rocket', 'schedule', 'setting', 'security-scan', 'shop', 'shopping', 'sliders', 'skin', 'smile', 'snippets', 'sound', 'star', 'tablet', 'stop', 'switcher', 'tag', 'tags', 'trademark-circle', 'unlock', 'tool', 'thunderbolt', 'trophy', 'up-circle', 'up-square', 'usb', 'warning', 'video-camera', 'wallet'
        ]
    };

    exports.ANT_ICON_ANGULAR_CONSOLE_PREFIX = ANT_ICON_ANGULAR_CONSOLE_PREFIX;
    exports.DynamicLoadingTimeoutError = DynamicLoadingTimeoutError;
    exports.HttpModuleNotImport = HttpModuleNotImport;
    exports.IconDirective = IconDirective;
    exports.IconModule = IconModule;
    exports.IconNotFoundError = IconNotFoundError;
    exports.IconService = IconService;
    exports.NameSpaceIsNotSpecifyError = NameSpaceIsNotSpecifyError;
    exports.SVGTagNotFoundError = SVGTagNotFoundError;
    exports.UrlNotSafeError = UrlNotSafeError;
    exports.alreadyHasAThemeSuffix = alreadyHasAThemeSuffix;
    exports.cloneSVG = cloneSVG;
    exports.error = error;
    exports.getIconDefinitionFromAbbr = getIconDefinitionFromAbbr;
    exports.getNameAndNamespace = getNameAndNamespace;
    exports.getSecondaryColor = getSecondaryColor;
    exports.hasNamespace = hasNamespace;
    exports.isIconDefinition = isIconDefinition;
    exports.manifest = manifest;
    exports.mapAbbrToTheme = mapAbbrToTheme;
    exports.replaceFillColor = replaceFillColor;
    exports.warn = warn;
    exports.withSuffix = withSuffix;
    exports.withSuffixAndColor = withSuffixAndColor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ant-design-icons-angular.umd.js.map
