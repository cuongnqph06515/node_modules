/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { HIGHLIGHT_OPTIONS } from './highlight.model';
import hljs from 'highlight.js/lib/highlight.js';
import * as i0 from "@angular/core";
import * as i1 from "./highlight.model";
export class HighlightJS {
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
/** @nocollapse */ HighlightJS.ngInjectableDef = i0.defineInjectable({ factory: function HighlightJS_Factory() { return new HighlightJS(i0.inject(i1.HIGHLIGHT_OPTIONS, 8)); }, token: HighlightJS, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaGlnaGxpZ2h0anMvIiwic291cmNlcyI6WyJsaWIvaGlnaGxpZ2h0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQXlFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0gsT0FBTyxJQUFJLE1BQU0sK0JBQStCLENBQUM7OztBQUtqRCxNQUFNLE9BQU8sV0FBVzs7OztJQUN0QixZQUFtRCxPQUF5QjtRQUMxRSxJQUFJLE9BQU8sRUFBRTtZQUNYLGlDQUFpQztZQUNqQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRzs7OztZQUFDLENBQUMsUUFBMkIsRUFBRSxFQUFFLENBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDcEQsQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztTQUNGO1FBQ0Qsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7SUFXRCxTQUFTLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxlQUF3QixFQUFFLFlBQWtCO1FBQ2pGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7OztJQVFELGFBQWEsQ0FBQyxLQUFhLEVBQUUsY0FBd0I7UUFDbkQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7OztJQVFELFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7OztJQVFELGNBQWMsQ0FBQyxLQUFrQjtRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQU1ELFNBQVMsQ0FBQyxNQUF1QjtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBS0QsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7Ozs7SUFRRCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7O0lBS0QsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQU9ELFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7WUF2R0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7OzRDQUVjLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIaWdobGlnaHRDb25maWcsIEhpZ2hsaWdodFJlc3VsdCwgSGlnaGxpZ2h0TGFuZ3VhZ2UsIEhpZ2hsaWdodE9wdGlvbnMsIEhJR0hMSUdIVF9PUFRJT05TIH0gZnJvbSAnLi9oaWdobGlnaHQubW9kZWwnO1xyXG5pbXBvcnQgaGxqcyBmcm9tICdoaWdobGlnaHQuanMvbGliL2hpZ2hsaWdodC5qcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRKUyB7XHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChISUdITElHSFRfT1BUSU9OUykgb3B0aW9uczogSGlnaGxpZ2h0T3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgLy8gUmVnaXN0ZXIgSGlnaGxpZ2h0SlMgbGFuZ3VhZ2VzXHJcbiAgICAgIG9wdGlvbnMubGFuZ3VhZ2VzKCkubWFwKChsYW5ndWFnZTogSGlnaGxpZ2h0TGFuZ3VhZ2UpID0+XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxhbmd1YWdlKGxhbmd1YWdlLm5hbWUsIGxhbmd1YWdlLmZ1bmMpXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChvcHRpb25zLmNvbmZpZykge1xyXG4gICAgICAgIC8vIFNldCBnbG9iYWwgY29uZmlnIGlmIHByZXNlbnRcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZShvcHRpb25zLmNvbmZpZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFRocm93IGFuIGVycm9yIGlmIG5vIGxhbmd1YWdlcyB3ZXJlIHJlZ2lzdGVyZWQuXHJcbiAgICBpZiAodGhpcy5saXN0TGFuZ3VhZ2VzKCkubGVuZ3RoIDwgMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tIaWdobGlnaHRKU106IE5vIGxhbmd1YWdlcyB3ZXJlIHJlZ2lzdGVyZWQhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3JlIGhpZ2hsaWdodGluZyBmdW5jdGlvbi5cclxuICAgKiBAcGFyYW0gbmFtZSBBY2NlcHRzIGEgbGFuZ3VhZ2UgbmFtZSwgb3IgYW4gYWxpYXNcclxuICAgKiBAcGFyYW0gdmFsdWUgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBoaWdobGlnaHQuXHJcbiAgICogQHBhcmFtIGlnbm9yZV9pbGxlZ2FscyBXaGVuIHByZXNlbnQgYW5kIGV2YWx1YXRlcyB0byBhIHRydWUgdmFsdWUsIGZvcmNlcyBoaWdobGlnaHRpbmcgdG8gZmluaXNoXHJcbiAgICogZXZlbiBpbiBjYXNlIG9mIGRldGVjdGluZyBpbGxlZ2FsIHN5bnRheCBmb3IgdGhlIGxhbmd1YWdlIGluc3RlYWQgb2YgdGhyb3dpbmcgYW4gZXhjZXB0aW9uLlxyXG4gICAqIEBwYXJhbSBjb250aW51YXRpb24gQW4gb3B0aW9uYWwgbW9kZSBzdGFjayByZXByZXNlbnRpbmcgdW5maW5pc2hlZCBwYXJzaW5nLlxyXG4gICAqIFdoZW4gcHJlc2VudCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmVzdGFydCBwYXJzaW5nIGZyb20gdGhpcyBzdGF0ZSBpbnN0ZWFkIG9mIGluaXRpYWxpemluZyBhIG5ldyBvbmVcclxuICAgKi9cclxuICBoaWdobGlnaHQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBpZ25vcmVfaWxsZWdhbHM6IGJvb2xlYW4sIGNvbnRpbnVhdGlvbj86IGFueSk6IEhpZ2hsaWdodFJlc3VsdCB7XHJcbiAgICByZXR1cm4gaGxqcy5oaWdobGlnaHQobmFtZSwgdmFsdWUsIGlnbm9yZV9pbGxlZ2FscywgY29udGludWF0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZ2hsaWdodGluZyB3aXRoIGxhbmd1YWdlIGRldGVjdGlvbi5cclxuICAgKiBAcGFyYW0gdmFsdWUgQWNjZXB0cyBhIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGhpZ2hsaWdodFxyXG4gICAqIEBwYXJhbSBsYW5ndWFnZVN1YnNldCBBbiBvcHRpb25hbCBhcnJheSBvZiBsYW5ndWFnZSBuYW1lcyBhbmQgYWxpYXNlcyByZXN0cmljdGluZyBkZXRlY3Rpb24gdG8gb25seSB0aG9zZSBsYW5ndWFnZXMuXHJcbiAgICogVGhlIHN1YnNldCBjYW4gYWxzbyBiZSBzZXQgd2l0aCBjb25maWd1cmUsIGJ1dCB0aGUgbG9jYWwgcGFyYW1ldGVyIG92ZXJyaWRlcyB0aGUgb3B0aW9uIGlmIHNldC5cclxuICAgKi9cclxuICBoaWdobGlnaHRBdXRvKHZhbHVlOiBzdHJpbmcsIGxhbmd1YWdlU3Vic2V0OiBzdHJpbmdbXSk6IEhpZ2hsaWdodFJlc3VsdCB7XHJcbiAgICByZXR1cm4gaGxqcy5oaWdobGlnaHRBdXRvKHZhbHVlLCBsYW5ndWFnZVN1YnNldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQb3N0LXByb2Nlc3Npbmcgb2YgdGhlIGhpZ2hsaWdodGVkIG1hcmt1cC5cclxuICAgKiBDdXJyZW50bHkgY29uc2lzdHMgb2YgcmVwbGFjaW5nIGluZGVudGF0aW9uIFRBQiBjaGFyYWN0ZXJzIGFuZCB1c2luZyA8YnI+IHRhZ3MgaW5zdGVhZCBvZiBuZXctbGluZSBjaGFyYWN0ZXJzLlxyXG4gICAqIE9wdGlvbnMgYXJlIHNldCBnbG9iYWxseSB3aXRoIGNvbmZpZ3VyZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgQWNjZXB0cyBhIHN0cmluZyB3aXRoIHRoZSBoaWdobGlnaHRlZCBtYXJrdXBcclxuICAgKi9cclxuICBmaXhNYXJrdXAodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaGxqcy5maXhNYXJrdXAodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBoaWdobGlnaHRpbmcgdG8gYSBET00gbm9kZSBjb250YWluaW5nIGNvZGUuXHJcbiAgICogVGhlIGZ1bmN0aW9uIHVzZXMgbGFuZ3VhZ2UgZGV0ZWN0aW9uIGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gc3BlY2lmeSB0aGUgbGFuZ3VhZ2UgaW4gdGhlIGNsYXNzIGF0dHJpYnV0ZSBvZiB0aGUgRE9NIG5vZGUuXHJcbiAgICogU2VlIHRoZSBjbGFzcyByZWZlcmVuY2UgZm9yIGFsbCBhdmFpbGFibGUgbGFuZ3VhZ2UgbmFtZXMgYW5kIGFsaWFzZXMuXHJcbiAgICogQHBhcmFtIGJsb2NrIFRoZSBlbGVtZW50IHRvIGFwcGx5IGhpZ2hsaWdodCBvbi5cclxuICAgKi9cclxuICBoaWdobGlnaHRCbG9jayhibG9jazogSFRNTEVsZW1lbnQpIHtcclxuICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soYmxvY2spO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29uZmlndXJlcyBnbG9iYWwgb3B0aW9uczpcclxuICAgKiBAcGFyYW0gY29uZmlnXHJcbiAgICovXHJcbiAgY29uZmlndXJlKGNvbmZpZzogSGlnaGxpZ2h0Q29uZmlnKSB7XHJcbiAgICBobGpzLmNvbmZpZ3VyZShjb25maWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBoaWdobGlnaHRpbmcgdG8gYWxsIDxwcmU+PGNvZGU+Li48L2NvZGU+PC9wcmU+IGJsb2NrcyBvbiBhIHBhZ2UuXHJcbiAgICovXHJcbiAgaW5pdEhpZ2hsaWdodGluZygpIHtcclxuICAgIGhsanMuaW5pdEhpZ2hsaWdodGluZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBuZXcgbGFuZ3VhZ2UgdG8gdGhlIGxpYnJhcnkgdW5kZXIgdGhlIHNwZWNpZmllZCBuYW1lLiBVc2VkIG1vc3RseSBpbnRlcm5hbGx5LlxyXG4gICAqIEBwYXJhbSBuYW1lIEEgc3RyaW5nIHdpdGggdGhlIG5hbWUgb2YgdGhlIGxhbmd1YWdlIGJlaW5nIHJlZ2lzdGVyZWRcclxuICAgKiBAcGFyYW0gbGFuZ3VhZ2UgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0IHdoaWNoIHJlcHJlc2VudHMgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24uXHJcbiAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCB0aGUgaGxqcyBvYmplY3QgdG8gYmUgYWJsZSB0byB1c2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZGVmaW5lZCB3aXRoaW4gaXQuXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJMYW5ndWFnZShuYW1lOiBzdHJpbmcsIGxhbmd1YWdlOiBGdW5jdGlvbikge1xyXG4gICAgaGxqcy5yZWdpc3Rlckxhbmd1YWdlKG5hbWUsIGxhbmd1YWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4gVGhlIGxhbmd1YWdlcyBuYW1lcyBsaXN0LlxyXG4gICAqL1xyXG4gIGxpc3RMYW5ndWFnZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIGhsanMubGlzdExhbmd1YWdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9va3MgdXAgYSBsYW5ndWFnZSBieSBuYW1lIG9yIGFsaWFzLlxyXG4gICAqIEBwYXJhbSBuYW1lIExhbmd1YWdlIG5hbWVcclxuICAgKiBAcmV0dXJuIFRoZSBsYW5ndWFnZSBvYmplY3QgaWYgZm91bmQsIHVuZGVmaW5lZCBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgZ2V0TGFuZ3VhZ2UobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiBobGpzLmdldExhbmd1YWdlKG5hbWUpO1xyXG4gIH1cclxufVxyXG4iXX0=