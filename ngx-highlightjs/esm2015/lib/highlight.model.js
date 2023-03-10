/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export const HIGHLIGHT_OPTIONS = new InjectionToken('HIGHLIGHT_OPTIONS');
/**
 * @record
 */
export function HighlightOptions() { }
if (false) {
    /** @type {?|undefined} */
    HighlightOptions.prototype.languages;
    /** @type {?|undefined} */
    HighlightOptions.prototype.config;
}
/**
 * @record
 */
export function HighlightLanguage() { }
if (false) {
    /** @type {?} */
    HighlightLanguage.prototype.name;
    /** @type {?} */
    HighlightLanguage.prototype.func;
}
/**
 * @record
 */
export function HighlightConfig() { }
if (false) {
    /**
     * tabReplace: a string used to replace TAB characters in indentation.
     * @type {?|undefined}
     */
    HighlightConfig.prototype.tabReplace;
    /**
     * useBR: a flag to generate <br> tags instead of new-line characters in the output, useful when code is marked up using a non-<pre> container.
     * @type {?|undefined}
     */
    HighlightConfig.prototype.useBR;
    /**
     * classPrefix: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets.
     * @type {?|undefined}
     */
    HighlightConfig.prototype.classPrefix;
    /**
     * languages: an array of language names and aliases restricting auto detection to only these languages.
     * @type {?|undefined}
     */
    HighlightConfig.prototype.languages;
}
/**
 * @record
 */
export function HighlightResult() { }
if (false) {
    /** @type {?|undefined} */
    HighlightResult.prototype.language;
    /** @type {?|undefined} */
    HighlightResult.prototype.r;
    /** @type {?|undefined} */
    HighlightResult.prototype.second_best;
    /** @type {?|undefined} */
    HighlightResult.prototype.top;
    /** @type {?|undefined} */
    HighlightResult.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhpZ2hsaWdodGpzLyIsInNvdXJjZXMiOlsibGliL2hpZ2hsaWdodC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFL0MsTUFBTSxPQUFPLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFtQixtQkFBbUIsQ0FBQzs7OztBQUUxRixzQ0FHQzs7O0lBRkMscUNBQXFCOztJQUNyQixrQ0FBeUI7Ozs7O0FBRzNCLHVDQUdDOzs7SUFGQyxpQ0FBYTs7SUFDYixpQ0FBZTs7Ozs7QUFHakIscUNBU0M7Ozs7OztJQVBDLHFDQUFvQjs7Ozs7SUFFcEIsZ0NBQWdCOzs7OztJQUVoQixzQ0FBcUI7Ozs7O0lBRXJCLG9DQUFxQjs7Ozs7QUFHdkIscUNBTUM7OztJQUxDLG1DQUFrQjs7SUFDbEIsNEJBQVc7O0lBQ1gsc0NBQWtCOztJQUNsQiw4QkFBVTs7SUFDVixnQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY29uc3QgSElHSExJR0hUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SGlnaGxpZ2h0T3B0aW9ucz4oJ0hJR0hMSUdIVF9PUFRJT05TJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhpZ2hsaWdodE9wdGlvbnMge1xyXG4gIGxhbmd1YWdlcz86IEZ1bmN0aW9uO1xyXG4gIGNvbmZpZz86IEhpZ2hsaWdodENvbmZpZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIaWdobGlnaHRMYW5ndWFnZSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGZ1bmM6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhpZ2hsaWdodENvbmZpZyB7XHJcbiAgLyoqIHRhYlJlcGxhY2U6IGEgc3RyaW5nIHVzZWQgdG8gcmVwbGFjZSBUQUIgY2hhcmFjdGVycyBpbiBpbmRlbnRhdGlvbi4gKi9cclxuICB0YWJSZXBsYWNlPzogc3RyaW5nO1xyXG4gIC8qKiB1c2VCUjogYSBmbGFnIHRvIGdlbmVyYXRlIDxicj4gdGFncyBpbnN0ZWFkIG9mIG5ldy1saW5lIGNoYXJhY3RlcnMgaW4gdGhlIG91dHB1dCwgdXNlZnVsIHdoZW4gY29kZSBpcyBtYXJrZWQgdXAgdXNpbmcgYSBub24tPHByZT4gY29udGFpbmVyLiAqL1xyXG4gIHVzZUJSPzogYm9vbGVhbjtcclxuICAvKiogY2xhc3NQcmVmaXg6IGEgc3RyaW5nIHByZWZpeCBhZGRlZCBiZWZvcmUgY2xhc3MgbmFtZXMgaW4gdGhlIGdlbmVyYXRlZCBtYXJrdXAsIHVzZWQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggc3R5bGVzaGVldHMuICovXHJcbiAgY2xhc3NQcmVmaXg/OiBzdHJpbmc7XHJcbiAgLyoqIGxhbmd1YWdlczogYW4gYXJyYXkgb2YgbGFuZ3VhZ2UgbmFtZXMgYW5kIGFsaWFzZXMgcmVzdHJpY3RpbmcgYXV0byBkZXRlY3Rpb24gdG8gb25seSB0aGVzZSBsYW5ndWFnZXMuICovXHJcbiAgbGFuZ3VhZ2VzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGlnaGxpZ2h0UmVzdWx0IHtcclxuICBsYW5ndWFnZT86IHN0cmluZztcclxuICByPzogbnVtYmVyO1xyXG4gIHNlY29uZF9iZXN0PzogYW55O1xyXG4gIHRvcD86IGFueTtcclxuICB2YWx1ZT86IHN0cmluZztcclxufVxyXG4iXX0=