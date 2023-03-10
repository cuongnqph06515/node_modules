/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Inject, Renderer2, ElementRef, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HighlightJS } from './highlight.service';
export class HighlightChildren {
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
if (false) {
    /** @type {?} */
    HighlightChildren.prototype.selector;
    /**
     * @type {?}
     * @private
     */
    HighlightChildren.prototype._observer;
    /**
     * @type {?}
     * @private
     */
    HighlightChildren.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    HighlightChildren.prototype._el;
    /**
     * @type {?}
     * @private
     */
    HighlightChildren.prototype._hljs;
    /**
     * @type {?}
     * @private
     */
    HighlightChildren.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    HighlightChildren.prototype._platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LWNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhpZ2hsaWdodGpzLyIsInNvdXJjZXMiOlsibGliL2hpZ2hsaWdodC1jaGlsZHJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBS2xELE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7O0lBSzVCLFlBQW9CLEtBQWEsRUFDYixHQUFlLEVBQ2YsS0FBa0IsRUFDbEIsU0FBb0IsRUFDQyxXQUFtQjtRQUp4QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNDLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQzVELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkMsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBZ0I7OztnQkFBQyxHQUFHLEVBQUUsQ0FDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDdEMsQ0FBQztnQkFFRixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtvQkFDN0MsU0FBUyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxFQUFlO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxRQUFnQjs7Y0FDMUIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQztRQUUzRixtQkFBbUIsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxPQUFvQixFQUFFLEVBQUU7WUFDbkQseUNBQXlDO1lBQ3pDLElBQ0UsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDL0IsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUMxQztnQkFDQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7YUFDaEM7Ozs7WUFONEUsTUFBTTtZQUFsQixVQUFVO1lBRWxFLFdBQVc7WUFGa0MsU0FBUztZQWdCUCxNQUFNLHVCQUEvQyxNQUFNLFNBQUMsV0FBVzs7O3VCQVA5QixLQUFLLFNBQUMsbUJBQW1COzs7O0lBQTFCLHFDQUE2Qzs7Ozs7SUFDN0Msc0NBQXVCOzs7OztJQUVYLGtDQUFxQjs7Ozs7SUFDckIsZ0NBQXVCOzs7OztJQUN2QixrQ0FBMEI7Ozs7O0lBQzFCLHNDQUE0Qjs7Ozs7SUFDNUIsd0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSW5qZWN0LCBPbkluaXQsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBOZ1pvbmUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSGlnaGxpZ2h0SlMgfSBmcm9tICcuL2hpZ2hsaWdodC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2hpZ2hsaWdodENoaWxkcmVuXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodENoaWxkcmVuIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoJ2hpZ2hsaWdodENoaWxkcmVuJykgc2VsZWN0b3I6IHN0cmluZztcclxuICBwcml2YXRlIF9vYnNlcnZlcjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF96b25lOiBOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaGxqczogSGlnaGxpZ2h0SlMsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkOiBPYmplY3QpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpKSB7XHJcbiAgICAgIC8vIFN1YnNjcmliZSB0byBob3N0IGVsZW1lbnQgY29udGVudCBjaGFuZ2VzXHJcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT5cclxuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q2hpbGRyZW4odGhpcy5zZWxlY3RvcilcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHtcclxuICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZ2hsaWdodCBhIGNvZGUgYmxvY2tcclxuICAgKiBAcGFyYW0gZWwgQ29kZSBibG9jayBlbGVtZW50XHJcbiAgICovXHJcbiAgaGlnaGxpZ2h0RWxlbWVudChlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2hsanMuaGlnaGxpZ2h0QmxvY2soZWwpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZWwsICdobGpzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWdobGlnaHQgbXVsdGlwbGUgY29kZSBibG9ja3NcclxuICAgKiBAcGFyYW0gc2VsZWN0b3IgZWxlbWVudHMgc2VsZWN0b3JcclxuICAgKi9cclxuICBoaWdobGlnaHRDaGlsZHJlbihzZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbGVtZW50c1RvSGlnaGxpZ2h0ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yIHx8ICdwcmUgY29kZScpO1xyXG5cclxuICAgIGVsZW1lbnRzVG9IaWdobGlnaHQuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgLy8gSGlnaGxpZ2h0IGVsZW1lbnQgd2hlbiB0ZXh0IGlzIHByZXNlbnRcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICBlbGVtZW50LmNoaWxkTm9kZXNbMF0ubm9kZU5hbWUgPT09ICcjdGV4dCdcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19