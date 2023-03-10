import hljs from 'highlight.js/lib/highlight.js';
import { InjectionToken, Injectable, Inject, Optional, Directive, Input, Output, EventEmitter, NgZone, NgModule, Renderer2, ElementRef, PLATFORM_ID, defineInjectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const HIGHLIGHT_OPTIONS = new InjectionToken('HIGHLIGHT_OPTIONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HighlightJS {
    /**
     * @param {?} options
     */
    constructor(options) {
        if (options) {
            // Register HighlightJS languages
            options.languages().map((/**
             * @param {?} language
             * @return {?}
             */
            (language) => this.registerLanguage(language.name, language.func)));
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
     * @param {?} name Accepts a language name, or an alias
     * @param {?} value A string with the code to highlight.
     * @param {?} ignore_illegals When present and evaluates to a true value, forces highlighting to finish
     * even in case of detecting illegal syntax for the language instead of throwing an exception.
     * @param {?=} continuation An optional mode stack representing unfinished parsing.
     * When present, the function will restart parsing from this state instead of initializing a new one
     * @return {?}
     */
    highlight(name, value, ignore_illegals, continuation) {
        return hljs.highlight(name, value, ignore_illegals, continuation);
    }
    /**
     * Highlighting with language detection.
     * @param {?} value Accepts a string with the code to highlight
     * @param {?} languageSubset An optional array of language names and aliases restricting detection to only those languages.
     * The subset can also be set with configure, but the local parameter overrides the option if set.
     * @return {?}
     */
    highlightAuto(value, languageSubset) {
        return hljs.highlightAuto(value, languageSubset);
    }
    /**
     * Post-processing of the highlighted markup.
     * Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters.
     * Options are set globally with configure.
     * @param {?} value Accepts a string with the highlighted markup
     * @return {?}
     */
    fixMarkup(value) {
        return hljs.fixMarkup(value);
    }
    /**
     * Applies highlighting to a DOM node containing code.
     * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
     * See the class reference for all available language names and aliases.
     * @param {?} block The element to apply highlight on.
     * @return {?}
     */
    highlightBlock(block) {
        hljs.highlightBlock(block);
    }
    /**
     * Configures global options:
     * @param {?} config
     * @return {?}
     */
    configure(config) {
        hljs.configure(config);
    }
    /**
     * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
     * @return {?}
     */
    initHighlighting() {
        hljs.initHighlighting();
    }
    /**
     * Adds new language to the library under the specified name. Used mostly internally.
     * @param {?} name A string with the name of the language being registered
     * @param {?} language A function that returns an object which represents the language definition.
     * The function is passed the hljs object to be able to use common regular expressions defined within it.
     * @return {?}
     */
    registerLanguage(name, language) {
        hljs.registerLanguage(name, language);
    }
    /**
     * @return {?} The languages names list.
     */
    listLanguages() {
        return hljs.listLanguages();
    }
    /**
     * Looks up a language by name or alias.
     * @param {?} name Language name
     * @return {?} The language object if found, undefined otherwise.
     */
    getLanguage(name) {
        return hljs.getLanguage(name);
    }
}
HighlightJS.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HighlightJS.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HIGHLIGHT_OPTIONS,] }] }
];
/** @nocollapse */ HighlightJS.ngInjectableDef = defineInjectable({ factory: function HighlightJS_Factory() { return new HighlightJS(inject(HIGHLIGHT_OPTIONS, 8)); }, token: HighlightJS, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Highlight {
    /**
     * @param {?} _hljs
     * @param {?} _zone
     */
    constructor(_hljs, _zone) {
        this._hljs = _hljs;
        this._zone = _zone;
        /**
         * Stream that emits when code string is highlighted
         */
        this.highlighted = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['code'] &&
            changes['code'].currentValue !== changes['code'].previousValue) {
            this.highlightElement(this.code, this.languages);
        }
    }
    /**
     * Highlighting with language detection and fix markup.
     * @param {?} code
     * @param {?=} languages
     * @return {?}
     */
    highlightElement(code, languages) {
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const res = this._hljs.highlightAuto(code, languages);
            this.highlightedCode = res.value;
            this.highlighted.emit(res);
        }));
    }
}
Highlight.decorators = [
    { type: Directive, args: [{
                host: {
                    '[class.hljs]': 'true',
                    '[innerHTML]': 'highlightedCode'
                },
                selector: '[highlight]'
            },] }
];
/** @nocollapse */
Highlight.ctorParameters = () => [
    { type: HighlightJS },
    { type: NgZone }
];
Highlight.propDecorators = {
    languages: [{ type: Input }],
    code: [{ type: Input, args: ['highlight',] }],
    highlighted: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HighlightChildren {
    /**
     * @param {?} _zone
     * @param {?} _el
     * @param {?} _hljs
     * @param {?} _renderer
     * @param {?} _platformId
     */
    constructor(_zone, _el, _hljs, _renderer, _platformId) {
        this._zone = _zone;
        this._el = _el;
        this._hljs = _hljs;
        this._renderer = _renderer;
        this._platformId = _platformId;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this._platformId)) {
            // Subscribe to host element content changes
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this._observer = new MutationObserver((/**
                 * @return {?}
                 */
                () => this.highlightChildren(this.selector)));
                this._observer.observe(this._el.nativeElement, {
                    childList: true
                });
            }));
        }
    }
    /**
     * Highlight a code block
     * @param {?} el Code block element
     * @return {?}
     */
    highlightElement(el) {
        this._hljs.highlightBlock(el);
        this._renderer.addClass(el, 'hljs');
    }
    /**
     * Highlight multiple code blocks
     * @param {?} selector elements selector
     * @return {?}
     */
    highlightChildren(selector) {
        /** @type {?} */
        const elementsToHighlight = this._el.nativeElement.querySelectorAll(selector || 'pre code');
        elementsToHighlight.forEach((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            // Highlight element when text is present
            if (element.childNodes.length === 1 &&
                element.childNodes[0].nodeName === '#text') {
                this.highlightElement(element);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }
}
HighlightChildren.decorators = [
    { type: Directive, args: [{
                selector: '[highlightChildren]'
            },] }
];
/** @nocollapse */
HighlightChildren.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: HighlightJS },
    { type: Renderer2 },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
HighlightChildren.propDecorators = {
    selector: [{ type: Input, args: ['highlightChildren',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HighlightModule {
    /**
     * @param {?} options
     * @return {?}
     */
    static forRoot(options) {
        return {
            ngModule: HighlightModule,
            providers: [
                { provide: HIGHLIGHT_OPTIONS, useValue: options }
            ]
        };
    }
}
HighlightModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Highlight, HighlightChildren],
                exports: [Highlight, HighlightChildren]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Highlight, HIGHLIGHT_OPTIONS, HighlightModule, HighlightJS, HighlightChildren };

//# sourceMappingURL=ngx-highlightjs.js.map