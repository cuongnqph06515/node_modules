/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Inject, Renderer2, ElementRef, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HighlightJS } from './highlight.service';
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
        if (isPlatformBrowser(this._platformId)) {
            // Subscribe to host element content changes
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this._observer = new MutationObserver((/**
                 * @return {?}
                 */
                function () {
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
        elementsToHighlight.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
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
        { type: Directive, args: [{
                    selector: '[highlightChildren]'
                },] }
    ];
    /** @nocollapse */
    HighlightChildren.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: HighlightJS },
        { type: Renderer2 },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    HighlightChildren.propDecorators = {
        selector: [{ type: Input, args: ['highlightChildren',] }]
    };
    return HighlightChildren;
}());
export { HighlightChildren };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LWNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhpZ2hsaWdodGpzLyIsInNvdXJjZXMiOlsibGliL2hpZ2hsaWdodC1jaGlsZHJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxEO0lBUUUsMkJBQW9CLEtBQWEsRUFDYixHQUFlLEVBQ2YsS0FBa0IsRUFDbEIsU0FBb0IsRUFDQyxXQUFtQjtRQUp4QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNDLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQzVELENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFBQSxpQkFhQztRQVpDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZDLDRDQUE0QztZQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7O1lBQUM7Z0JBQzNCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBZ0I7OztnQkFBQztvQkFDcEMsT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFBckMsQ0FBcUMsRUFDdEMsQ0FBQztnQkFFRixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtvQkFDN0MsU0FBUyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw0Q0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLEVBQWU7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDZDQUFpQjs7Ozs7SUFBakIsVUFBa0IsUUFBZ0I7UUFBbEMsaUJBWUM7O1lBWE8sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQztRQUUzRixtQkFBbUIsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxPQUFvQjtZQUMvQyx5Q0FBeUM7WUFDekMsSUFDRSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUMvQixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQzFDO2dCQUNBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzs7OztnQkFONEUsTUFBTTtnQkFBbEIsVUFBVTtnQkFFbEUsV0FBVztnQkFGa0MsU0FBUztnQkFnQlAsTUFBTSx1QkFBL0MsTUFBTSxTQUFDLFdBQVc7OzsyQkFQOUIsS0FBSyxTQUFDLG1CQUFtQjs7SUF5RDVCLHdCQUFDO0NBQUEsQUE5REQsSUE4REM7U0EzRFksaUJBQWlCOzs7SUFFNUIscUNBQTZDOzs7OztJQUM3QyxzQ0FBdUI7Ozs7O0lBRVgsa0NBQXFCOzs7OztJQUNyQixnQ0FBdUI7Ozs7O0lBQ3ZCLGtDQUEwQjs7Ozs7SUFDMUIsc0NBQTRCOzs7OztJQUM1Qix3Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBJbmplY3QsIE9uSW5pdCwgT25EZXN0cm95LCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIE5nWm9uZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBIaWdobGlnaHRKUyB9IGZyb20gJy4vaGlnaGxpZ2h0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaGlnaGxpZ2h0Q2hpbGRyZW5dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0Q2hpbGRyZW4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgnaGlnaGxpZ2h0Q2hpbGRyZW4nKSBzZWxlY3Rvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29ic2VydmVyOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9obGpzOiBIaWdobGlnaHRKUyxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQ6IE9iamVjdCkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcclxuICAgICAgLy8gU3Vic2NyaWJlIHRvIGhvc3QgZWxlbWVudCBjb250ZW50IGNoYW5nZXNcclxuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PlxyXG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRDaGlsZHJlbih0aGlzLnNlbGVjdG9yKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwge1xyXG4gICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlnaGxpZ2h0IGEgY29kZSBibG9ja1xyXG4gICAqIEBwYXJhbSBlbCBDb2RlIGJsb2NrIGVsZW1lbnRcclxuICAgKi9cclxuICBoaWdobGlnaHRFbGVtZW50KGVsOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGhpcy5faGxqcy5oaWdobGlnaHRCbG9jayhlbCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhlbCwgJ2hsanMnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZ2hsaWdodCBtdWx0aXBsZSBjb2RlIGJsb2Nrc1xyXG4gICAqIEBwYXJhbSBzZWxlY3RvciBlbGVtZW50cyBzZWxlY3RvclxyXG4gICAqL1xyXG4gIGhpZ2hsaWdodENoaWxkcmVuKHNlbGVjdG9yOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRzVG9IaWdobGlnaHQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IgfHwgJ3ByZSBjb2RlJyk7XHJcblxyXG4gICAgZWxlbWVudHNUb0hpZ2hsaWdodC5mb3JFYWNoKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAvLyBIaWdobGlnaHQgZWxlbWVudCB3aGVuIHRleHQgaXMgcHJlc2VudFxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlc1swXS5ub2RlTmFtZSA9PT0gJyN0ZXh0J1xyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fb2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=