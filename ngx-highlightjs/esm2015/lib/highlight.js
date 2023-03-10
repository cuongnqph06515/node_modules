/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { HighlightJS } from './highlight.service';
export class Highlight {
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
if (false) {
    /**
     * Highlighted Code
     * @type {?}
     */
    Highlight.prototype.highlightedCode;
    /**
     * An optional array of language names and aliases restricting detection to only those languages.
     * The subset can also be set with configure, but the local parameter overrides the option if set.
     * @type {?}
     */
    Highlight.prototype.languages;
    /**
     * Highlight code input
     * @type {?}
     */
    Highlight.prototype.code;
    /**
     * Stream that emits when code string is highlighted
     * @type {?}
     */
    Highlight.prototype.highlighted;
    /**
     * @type {?}
     * @private
     */
    Highlight.prototype._hljs;
    /**
     * @type {?}
     * @private
     */
    Highlight.prototype._zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhpZ2hsaWdodGpzLyIsInNvdXJjZXMiOlsibGliL2hpZ2hsaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUE0QixZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVVsRCxNQUFNLE9BQU8sU0FBUzs7Ozs7SUFnQnBCLFlBQW9CLEtBQWtCLEVBQVUsS0FBYTtRQUF6QyxVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTs7OztRQUZuRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO0lBRzVELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQ0UsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFDOUQ7WUFDQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDOzs7Ozs7O0lBUUQsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFNBQW9CO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7O2tCQUMxQixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztZQUNyRCxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUEvQ0YsU0FBUyxTQUFDO2dCQUNULElBQUksRUFBRTtvQkFDSixjQUFjLEVBQUUsTUFBTTtvQkFDdEIsYUFBYSxFQUFFLGlCQUFpQjtpQkFDakM7Z0JBQ0QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7Ozs7WUFUUSxXQUFXO1lBRHVELE1BQU07Ozt3QkFtQjlFLEtBQUs7bUJBR0wsS0FBSyxTQUFDLFdBQVc7MEJBR2pCLE1BQU07Ozs7Ozs7SUFYUCxvQ0FBd0I7Ozs7OztJQUt4Qiw4QkFBNkI7Ozs7O0lBRzdCLHlCQUF5Qjs7Ozs7SUFHekIsZ0NBQTREOzs7OztJQUVoRCwwQkFBMEI7Ozs7O0lBQUUsMEJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEV2ZW50RW1pdHRlciwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhpZ2hsaWdodEpTIH0gZnJvbSAnLi9oaWdobGlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhpZ2hsaWdodFJlc3VsdCB9IGZyb20gJy4vaGlnaGxpZ2h0Lm1vZGVsJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuaGxqc10nOiAndHJ1ZScsXHJcbiAgICAnW2lubmVySFRNTF0nOiAnaGlnaGxpZ2h0ZWRDb2RlJ1xyXG4gIH0sXHJcbiAgc2VsZWN0b3I6ICdbaGlnaGxpZ2h0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gIC8qKiBIaWdobGlnaHRlZCBDb2RlICovXHJcbiAgaGlnaGxpZ2h0ZWRDb2RlOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBBbiBvcHRpb25hbCBhcnJheSBvZiBsYW5ndWFnZSBuYW1lcyBhbmQgYWxpYXNlcyByZXN0cmljdGluZyBkZXRlY3Rpb24gdG8gb25seSB0aG9zZSBsYW5ndWFnZXMuXHJcbiAgICogVGhlIHN1YnNldCBjYW4gYWxzbyBiZSBzZXQgd2l0aCBjb25maWd1cmUsIGJ1dCB0aGUgbG9jYWwgcGFyYW1ldGVyIG92ZXJyaWRlcyB0aGUgb3B0aW9uIGlmIHNldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBsYW5ndWFnZXM6IHN0cmluZ1tdO1xyXG5cclxuICAvKiogSGlnaGxpZ2h0IGNvZGUgaW5wdXQgKi9cclxuICBASW5wdXQoJ2hpZ2hsaWdodCcpIGNvZGU7XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGNvZGUgc3RyaW5nIGlzIGhpZ2hsaWdodGVkICovXHJcbiAgQE91dHB1dCgpIGhpZ2hsaWdodGVkID0gbmV3IEV2ZW50RW1pdHRlcjxIaWdobGlnaHRSZXN1bHQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2hsanM6IEhpZ2hsaWdodEpTLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChcclxuICAgICAgY2hhbmdlc1snY29kZSddICYmXHJcbiAgICAgIGNoYW5nZXNbJ2NvZGUnXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ2NvZGUnXS5wcmV2aW91c1ZhbHVlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRFbGVtZW50KHRoaXMuY29kZSwgdGhpcy5sYW5ndWFnZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlnaGxpZ2h0aW5nIHdpdGggbGFuZ3VhZ2UgZGV0ZWN0aW9uIGFuZCBmaXggbWFya3VwLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBBY2NlcHRzIGEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gaGlnaGxpZ2h0XHJcbiAgICogQHBhcmFtIGxhbmd1YWdlU3Vic2V0IEFuIG9wdGlvbmFsIGFycmF5IG9mIGxhbmd1YWdlIG5hbWVzIGFuZCBhbGlhc2VzIHJlc3RyaWN0aW5nIGRldGVjdGlvbiB0byBvbmx5IHRob3NlIGxhbmd1YWdlcy5cclxuICAgKiBUaGUgc3Vic2V0IGNhbiBhbHNvIGJlIHNldCB3aXRoIGNvbmZpZ3VyZSwgYnV0IHRoZSBsb2NhbCBwYXJhbWV0ZXIgb3ZlcnJpZGVzIHRoZSBvcHRpb24gaWYgc2V0LlxyXG4gICAqL1xyXG4gIGhpZ2hsaWdodEVsZW1lbnQoY29kZTogc3RyaW5nLCBsYW5ndWFnZXM/OiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMuX2hsanMuaGlnaGxpZ2h0QXV0byhjb2RlLCBsYW5ndWFnZXMpO1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodGVkQ29kZSA9IHJlcy52YWx1ZTtcclxuICAgICAgdGhpcy5oaWdobGlnaHRlZC5lbWl0KHJlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19