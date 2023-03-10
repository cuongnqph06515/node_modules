(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('highlight.js/lib/highlight.js'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-highlightjs', ['exports', 'highlight.js/lib/highlight.js', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngx-highlightjs'] = {}),global.hljs,global.ng.core,global.ng.common));
}(this, (function (exports,hljs,i0,common) { 'use strict';

    hljs = hljs && hljs.hasOwnProperty('default') ? hljs['default'] : hljs;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var HIGHLIGHT_OPTIONS = new i0.InjectionToken('HIGHLIGHT_OPTIONS');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HighlightJS = /** @class */ (function () {
        function HighlightJS(options) {
            var _this = this;
            if (options) {
                // Register HighlightJS languages
                options.languages().map(( /**
                 * @param {?} language
                 * @return {?}
                 */function (language) {
                    return _this.registerLanguage(language.name, language.func);
                }));
                if (options.config) {
                    // Set global config if present
                    this.configure(options.config);
                }
            }
            // Throw an error if no languages were registered.
            if (this.listLanguages().length < 1) {
                throw new Error('[HighlightJS]: No languages were registered!');
            }
        }
        /**
         * Core highlighting function.
         * @param name Accepts a language name, or an alias
         * @param value A string with the code to highlight.
         * @param ignore_illegals When present and evaluates to a true value, forces highlighting to finish
         * even in case of detecting illegal syntax for the language instead of throwing an exception.
         * @param continuation An optional mode stack representing unfinished parsing.
         * When present, the function will restart parsing from this state instead of initializing a new one
         */
        /**
         * Core highlighting function.
         * @param {?} name Accepts a language name, or an alias
         * @param {?} value A string with the code to highlight.
         * @param {?} ignore_illegals When present and evaluates to a true value, forces highlighting to finish
         * even in case of detecting illegal syntax for the language instead of throwing an exception.
         * @param {?=} continuation An optional mode stack representing unfinished parsing.
         * When present, the function will restart parsing from this state instead of initializing a new one
         * @return {?}
         */
        HighlightJS.prototype.highlight = /**
         * Core highlighting function.
         * @param {?} name Accepts a language name, or an alias
         * @param {?} value A string with the code to highlight.
         * @param {?} ignore_illegals When present and evaluates to a true value, forces highlighting to finish
         * even in case of detecting illegal syntax for the language instead of throwing an exception.
         * @param {?=} continuation An optional mode stack representing unfinished parsing.
         * When present, the function will restart parsing from this state instead of initializing a new one
         * @return {?}
         */
            function (name, value, ignore_illegals, continuation) {
                return hljs.highlight(name, value, ignore_illegals, continuation);
            };
        /**
         * Highlighting with language detection.
         * @param value Accepts a string with the code to highlight
         * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
         * The subset can also be set with configure, but the local parameter overrides the option if set.
         */
        /**
         * Highlighting with language detection.
         * @param {?} value Accepts a string with the code to highlight
         * @param {?} languageSubset An optional array of language names and aliases restricting detection to only those languages.
         * The subset can also be set with configure, but the local parameter overrides the option if set.
         * @return {?}
         */
        HighlightJS.prototype.highlightAuto = /**
         * Highlighting with language detection.
         * @param {?} value Accepts a string with the code to highlight
         * @param {?} languageSubset An optional array of language names and aliases restricting detection to only those languages.
         * The subset can also be set with configure, but the local parameter overrides the option if set.
         * @return {?}
         */
            function (value, languageSubset) {
                return hljs.highlightAuto(value, languageSubset);
            };
        /**
         * Post-processing of the highlighted markup.
         * Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters.
         * Options are set globally with configure.
         * @param value Accepts a string with the highlighted markup
         */
        /**
         * Post-processing of the highlighted markup.
         * Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters.
         * Options are set globally with configure.
         * @param {?} value Accepts a string with the highlighted markup
         * @return {?}
         */
        HighlightJS.prototype.fixMarkup = /**
         * Post-processing of the highlighted markup.
         * Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters.
         * Options are set globally with configure.
         * @param {?} value Accepts a string with the highlighted markup
         * @return {?}
         */
            function (value) {
                return hljs.fixMarkup(value);
            };
        /**
         * Applies highlighting to a DOM node containing code.
         * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
         * See the class reference for all available language names and aliases.
         * @param block The element to apply highlight on.
         */
        /**
         * Applies highlighting to a DOM node containing code.
         * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
         * See the class reference for all available language names and aliases.
         * @param {?} block The element to apply highlight on.
         * @return {?}
         */
        HighlightJS.prototype.highlightBlock = /**
         * Applies highlighting to a DOM node containing code.
         * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
         * See the class reference for all available language names and aliases.
         * @param {?} block The element to apply highlight on.
         * @return {?}
         */
            function (block) {
                hljs.highlightBlock(block);
            };
        /**
         * Configures global options:
         * @param config
         */
        /**
         * Configures global options:
         * @param {?} config
         * @return {?}
         */
        HighlightJS.prototype.configure = /**
         * Configures global options:
         * @param {?} config
         * @return {?}
         */
            function (config) {
                hljs.configure(config);
            };
        /**
         * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
         */
        /**
         * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
         * @return {?}
         */
        HighlightJS.prototype.initHighlighting = /**
         * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
         * @return {?}
         */
            function () {
                hljs.initHighlighting();
            };
        /**
         * Adds new language to the library under the specified name. Used mostly internally.
         * @param name A string with the name of the language being registered
         * @param language A function that returns an object which represents the language definition.
         * The function is passed the hljs object to be able to use common regular expressions defined within it.
         */
        /**
         * Adds new language to the library under the specified name. Used mostly internally.
         * @param {?} name A string with the name of the language being registered
         * @param {?} language A function that returns an object which represents the language definition.
         * The function is passed the hljs object to be able to use common regular expressions defined within it.
         * @return {?}
         */
        HighlightJS.prototype.registerLanguage = /**
         * Adds new language to the library under the specified name. Used mostly internally.
         * @param {?} name A string with the name of the language being registered
         * @param {?} language A function that returns an object which represents the language definition.
         * The function is passed the hljs object to be able to use common regular expressions defined within it.
         * @return {?}
         */
            function (name, language) {
                hljs.registerLanguage(name, language);
            };
        /**
         * @return The languages names list.
         */
        /**
         * @return {?} The languages names list.
         */
        HighlightJS.prototype.listLanguages = /**
         * @return {?} The languages names list.
         */
            function () {
                return hljs.listLanguages();
            };
        /**
         * Looks up a language by name or alias.
         * @param name Language name
         * @return The language object if found, undefined otherwise.
         */
        /**
         * Looks up a language by name or alias.
         * @param {?} name Language name
         * @return {?} The language object if found, undefined otherwise.
         */
        HighlightJS.prototype.getLanguage = /**
         * Looks up a language by name or alias.
         * @param {?} name Language name
         * @return {?} The language object if found, undefined otherwise.
         */
            function (name) {
                return hljs.getLanguage(name);
            };
        HighlightJS.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        HighlightJS.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [HIGHLIGHT_OPTIONS,] }] }
            ];
        };
        /** @nocollapse */ HighlightJS.ngInjectableDef = i0.defineInjectable({ factory: function HighlightJS_Factory() { return new HighlightJS(i0.inject(HIGHLIGHT_OPTIONS, 8)); }, token: HighlightJS, providedIn: "root" });
        return HighlightJS;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Highlight = /** @class */ (function () {
        function Highlight(_hljs, _zone) {
            this._hljs = _hljs;
            this._zone = _zone;
            /**
             * Stream that emits when code string is highlighted
             */
            this.highlighted = new i0.EventEmitter();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        Highlight.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes['code'] &&
                    changes['code'].currentValue !== changes['code'].previousValue) {
                    this.highlightElement(this.code, this.languages);
                }
            };
        /**
         * Highlighting with language detection and fix markup.
         * @param value Accepts a string with the code to highlight
         * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
         * The subset can also be set with configure, but the local parameter overrides the option if set.
         */
        /**
         * Highlighting with language detection and fix markup.
         * @param {?} code
         * @param {?=} languages
         * @return {?}
         */
        Highlight.prototype.highlightElement = /**
         * Highlighting with language detection and fix markup.
         * @param {?} code
         * @param {?=} languages
         * @return {?}
         */
            function (code, languages) {
                var _this = this;
                this._zone.runOutsideAngular(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var res = _this._hljs.highlightAuto(code, languages);
                    _this.highlightedCode = res.value;
                    _this.highlighted.emit(res);
                }));
            };
        Highlight.decorators = [
            { type: i0.Directive, args: [{
                        host: {
                            '[class.hljs]': 'true',
                            '[innerHTML]': 'highlightedCode'
                        },
                        selector: '[highlight]'
                    },] }
        ];
        /** @nocollapse */
        Highlight.ctorParameters = function () {
            return [
                { type: HighlightJS },
                { type: i0.NgZone }
            ];
        };
        Highlight.propDecorators = {
            languages: [{ type: i0.Input }],
            code: [{ type: i0.Input, args: ['highlight',] }],
            highlighted: [{ type: i0.Output }]
        };
        return Highlight;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HighlightChildren = /** @class */ (function () {
        function HighlightChildren(_zone, _el, _hljs, _renderer, _platformId) {
            this._zone = _zone;
            this._el = _el;
            this._hljs = _hljs;
            this._renderer = _renderer;
            this._platformId = _platformId;
        }
        /**
         * @return {?}
         */
        HighlightChildren.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (common.isPlatformBrowser(this._platformId)) {
                    // Subscribe to host element content changes
                    this._zone.runOutsideAngular(( /**
                     * @return {?}
                     */function () {
                        _this._observer = new MutationObserver(( /**
                         * @return {?}
                         */function () {
                            return _this.highlightChildren(_this.selector);
                        }));
                        _this._observer.observe(_this._el.nativeElement, {
                            childList: true
                        });
                    }));
                }
            };
        /**
         * Highlight a code block
         * @param el Code block element
         */
        /**
         * Highlight a code block
         * @param {?} el Code block element
         * @return {?}
         */
        HighlightChildren.prototype.highlightElement = /**
         * Highlight a code block
         * @param {?} el Code block element
         * @return {?}
         */
            function (el) {
                this._hljs.highlightBlock(el);
                this._renderer.addClass(el, 'hljs');
            };
        /**
         * Highlight multiple code blocks
         * @param selector elements selector
         */
        /**
         * Highlight multiple code blocks
         * @param {?} selector elements selector
         * @return {?}
         */
        HighlightChildren.prototype.highlightChildren = /**
         * Highlight multiple code blocks
         * @param {?} selector elements selector
         * @return {?}
         */
            function (selector) {
                var _this = this;
                /** @type {?} */
                var elementsToHighlight = this._el.nativeElement.querySelectorAll(selector || 'pre code');
                elementsToHighlight.forEach(( /**
                 * @param {?} element
                 * @return {?}
                 */function (element) {
                    // Highlight element when text is present
                    if (element.childNodes.length === 1 &&
                        element.childNodes[0].nodeName === '#text') {
                        _this.highlightElement(element);
                    }
                }));
            };
        /**
         * @return {?}
         */
        HighlightChildren.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this._observer) {
                    this._observer.disconnect();
                }
            };
        HighlightChildren.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[highlightChildren]'
                    },] }
        ];
        /** @nocollapse */
        HighlightChildren.ctorParameters = function () {
            return [
                { type: i0.NgZone },
                { type: i0.ElementRef },
                { type: HighlightJS },
                { type: i0.Renderer2 },
                { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        HighlightChildren.propDecorators = {
            selector: [{ type: i0.Input, args: ['highlightChildren',] }]
        };
        return HighlightChildren;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HighlightModule = /** @class */ (function () {
        function HighlightModule() {
        }
        /**
         * @param {?} options
         * @return {?}
         */
        HighlightModule.forRoot = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                return {
                    ngModule: HighlightModule,
                    providers: [
                        { provide: HIGHLIGHT_OPTIONS, useValue: options }
                    ]
                };
            };
        HighlightModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [Highlight, HighlightChildren],
                        exports: [Highlight, HighlightChildren]
                    },] }
        ];
        return HighlightModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Highlight = Highlight;
    exports.HIGHLIGHT_OPTIONS = HIGHLIGHT_OPTIONS;
    exports.HighlightModule = HighlightModule;
    exports.HighlightJS = HighlightJS;
    exports.HighlightChildren = HighlightChildren;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-highlightjs.umd.js.map