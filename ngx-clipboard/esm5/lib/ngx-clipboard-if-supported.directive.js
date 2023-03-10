import { __decorate } from "tslib";
import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ClipboardService } from './ngx-clipboard.service';
var ClipboardIfSupportedDirective = /** @class */ (function () {
    function ClipboardIfSupportedDirective(_clipboardService, _viewContainerRef, _templateRef) {
        this._clipboardService = _clipboardService;
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    ClipboardIfSupportedDirective.prototype.ngOnInit = function () {
        if (this._clipboardService.isSupported) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    };
    ClipboardIfSupportedDirective.ctorParameters = function () { return [
        { type: ClipboardService },
        { type: ViewContainerRef },
        { type: TemplateRef }
    ]; };
    ClipboardIfSupportedDirective = __decorate([
        Directive({
            selector: '[ngxClipboardIfSupported]'
        })
    ], ClipboardIfSupportedDirective);
    return ClipboardIfSupportedDirective;
}());
export { ClipboardIfSupportedDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC1pZi1zdXBwb3J0ZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNsaXBib2FyZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2xpcGJvYXJkLWlmLXN1cHBvcnRlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUszRDtJQUNJLHVDQUNZLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBOEI7UUFGOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtJQUN2QyxDQUFDO0lBRUosZ0RBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtZQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQzs7Z0JBVDhCLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUNyQixXQUFXOztJQUo1Qiw2QkFBNkI7UUFIekMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDJCQUEyQjtTQUN4QyxDQUFDO09BQ1csNkJBQTZCLENBWXpDO0lBQUQsb0NBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENsaXBib2FyZFNlcnZpY2UgfSBmcm9tICcuL25neC1jbGlwYm9hcmQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW25neENsaXBib2FyZElmU3VwcG9ydGVkXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENsaXBib2FyZElmU3VwcG9ydGVkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2NsaXBib2FyZFNlcnZpY2U6IENsaXBib2FyZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIF90ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PlxyXG4gICAgKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jbGlwYm9hcmRTZXJ2aWNlLmlzU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RlbXBsYXRlUmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19