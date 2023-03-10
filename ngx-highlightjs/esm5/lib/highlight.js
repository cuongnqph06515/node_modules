/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { HighlightJS } from './highlight.service';
var Highlight = /** @class */ (function () {
    function Highlight(_hljs, _zone) {
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
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var res = _this._hljs.highlightAuto(code, languages);
            _this.highlightedCode = res.value;
            _this.highlighted.emit(res);
        }));
    };
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
    Highlight.ctorParameters = function () { return [
        { type: HighlightJS },
        { type: NgZone }
    ]; };
    Highlight.propDecorators = {
        languages: [{ type: Input }],
        code: [{ type: Input, args: ['highlight',] }],
        highlighted: [{ type: Output }]
    };
    return Highlight;
}());
export { Highlight };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhpZ2hsaWdodGpzLyIsInNvdXJjZXMiOlsibGliL2hpZ2hsaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUE0QixZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdsRDtJQXVCRSxtQkFBb0IsS0FBa0IsRUFBVSxLQUFhO1FBQXpDLFVBQUssR0FBTCxLQUFLLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFROzs7O1FBRm5ELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFHNUQsQ0FBQzs7Ozs7SUFFRCwrQkFBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFDRSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUM5RDtZQUNBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILG9DQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLElBQVksRUFBRSxTQUFvQjtRQUFuRCxpQkFNQztRQUxDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7UUFBQzs7Z0JBQ3JCLEdBQUcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO1lBQ3JELEtBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQS9DRixTQUFTLFNBQUM7b0JBQ1QsSUFBSSxFQUFFO3dCQUNKLGNBQWMsRUFBRSxNQUFNO3dCQUN0QixhQUFhLEVBQUUsaUJBQWlCO3FCQUNqQztvQkFDRCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7Ozs7Z0JBVFEsV0FBVztnQkFEdUQsTUFBTTs7OzRCQW1COUUsS0FBSzt1QkFHTCxLQUFLLFNBQUMsV0FBVzs4QkFHakIsTUFBTTs7SUEyQlQsZ0JBQUM7Q0FBQSxBQWhERCxJQWdEQztTQXpDWSxTQUFTOzs7Ozs7SUFHcEIsb0NBQXdCOzs7Ozs7SUFLeEIsOEJBQTZCOzs7OztJQUc3Qix5QkFBeUI7Ozs7O0lBR3pCLGdDQUE0RDs7Ozs7SUFFaEQsMEJBQTBCOzs7OztJQUFFLDBCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIaWdobGlnaHRKUyB9IGZyb20gJy4vaGlnaGxpZ2h0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIaWdobGlnaHRSZXN1bHQgfSBmcm9tICcuL2hpZ2hsaWdodC5tb2RlbCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLmhsanNdJzogJ3RydWUnLFxyXG4gICAgJ1tpbm5lckhUTUxdJzogJ2hpZ2hsaWdodGVkQ29kZSdcclxuICB9LFxyXG4gIHNlbGVjdG9yOiAnW2hpZ2hsaWdodF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICAvKiogSGlnaGxpZ2h0ZWQgQ29kZSAqL1xyXG4gIGhpZ2hsaWdodGVkQ29kZTogc3RyaW5nO1xyXG5cclxuICAvKiogQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGFuZ3VhZ2UgbmFtZXMgYW5kIGFsaWFzZXMgcmVzdHJpY3RpbmcgZGV0ZWN0aW9uIHRvIG9ubHkgdGhvc2UgbGFuZ3VhZ2VzLlxyXG4gICAqIFRoZSBzdWJzZXQgY2FuIGFsc28gYmUgc2V0IHdpdGggY29uZmlndXJlLCBidXQgdGhlIGxvY2FsIHBhcmFtZXRlciBvdmVycmlkZXMgdGhlIG9wdGlvbiBpZiBzZXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGFuZ3VhZ2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqIEhpZ2hsaWdodCBjb2RlIGlucHV0ICovXHJcbiAgQElucHV0KCdoaWdobGlnaHQnKSBjb2RlO1xyXG5cclxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBjb2RlIHN0cmluZyBpcyBoaWdobGlnaHRlZCAqL1xyXG4gIEBPdXRwdXQoKSBoaWdobGlnaHRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SGlnaGxpZ2h0UmVzdWx0PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9obGpzOiBIaWdobGlnaHRKUywgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGNoYW5nZXNbJ2NvZGUnXSAmJlxyXG4gICAgICBjaGFuZ2VzWydjb2RlJ10uY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzWydjb2RlJ10ucHJldmlvdXNWYWx1ZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0RWxlbWVudCh0aGlzLmNvZGUsIHRoaXMubGFuZ3VhZ2VzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZ2hsaWdodGluZyB3aXRoIGxhbmd1YWdlIGRldGVjdGlvbiBhbmQgZml4IG1hcmt1cC5cclxuICAgKiBAcGFyYW0gdmFsdWUgQWNjZXB0cyBhIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGhpZ2hsaWdodFxyXG4gICAqIEBwYXJhbSBsYW5ndWFnZVN1YnNldCBBbiBvcHRpb25hbCBhcnJheSBvZiBsYW5ndWFnZSBuYW1lcyBhbmQgYWxpYXNlcyByZXN0cmljdGluZyBkZXRlY3Rpb24gdG8gb25seSB0aG9zZSBsYW5ndWFnZXMuXHJcbiAgICogVGhlIHN1YnNldCBjYW4gYWxzbyBiZSBzZXQgd2l0aCBjb25maWd1cmUsIGJ1dCB0aGUgbG9jYWwgcGFyYW1ldGVyIG92ZXJyaWRlcyB0aGUgb3B0aW9uIGlmIHNldC5cclxuICAgKi9cclxuICBoaWdobGlnaHRFbGVtZW50KGNvZGU6IHN0cmluZywgbGFuZ3VhZ2VzPzogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBjb25zdCByZXMgPSB0aGlzLl9obGpzLmhpZ2hsaWdodEF1dG8oY29kZSwgbGFuZ3VhZ2VzKTtcclxuICAgICAgdGhpcy5oaWdobGlnaHRlZENvZGUgPSByZXMudmFsdWU7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQuZW1pdChyZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==