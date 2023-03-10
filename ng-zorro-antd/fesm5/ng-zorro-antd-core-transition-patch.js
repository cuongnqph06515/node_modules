import { PlatformModule } from '@angular/cdk/platform';
import { Directive, ElementRef, Renderer2, Input, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: transition-patch.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * hack the bug
 * angular router change with unexpected transition trigger after calling applicationRef.attachView
 * https://github.com/angular/angular/issues/34718
 */
var NzTransitionPatchDirective = /** @class */ (function () {
    function NzTransitionPatchDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.hidden = null;
        this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
    }
    /**
     * @return {?}
     */
    NzTransitionPatchDirective.prototype.setHiddenAttribute = /**
     * @return {?}
     */
    function () {
        if (this.hidden === true) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
        }
        else if (this.hidden === false || this.hidden === null) {
            this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
        }
        else if (typeof this.hidden === 'string') {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', this.hidden);
        }
    };
    /**
     * @return {?}
     */
    NzTransitionPatchDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.setHiddenAttribute();
    };
    /**
     * @return {?}
     */
    NzTransitionPatchDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.setHiddenAttribute();
    };
    NzTransitionPatchDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nz-button],nz-button-group,[nz-icon],[nz-menu-item],[nz-submenu],nz-select-top-control,nz-select-placeholder'
                },] }
    ];
    /** @nocollapse */
    NzTransitionPatchDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NzTransitionPatchDirective.propDecorators = {
        hidden: [{ type: Input }]
    };
    return NzTransitionPatchDirective;
}());
if (false) {
    /** @type {?} */
    NzTransitionPatchDirective.prototype.hidden;
    /**
     * @type {?}
     * @private
     */
    NzTransitionPatchDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzTransitionPatchDirective.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: transition-patch.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTransitionPatchModule = /** @class */ (function () {
    function NzTransitionPatchModule() {
    }
    NzTransitionPatchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    exports: [NzTransitionPatchDirective],
                    declarations: [NzTransitionPatchDirective]
                },] }
    ];
    return NzTransitionPatchModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-transition-patch.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzTransitionPatchDirective as ??NzTransitionPatchDirective, NzTransitionPatchModule as ??NzTransitionPatchModule };
//# sourceMappingURL=ng-zorro-antd-core-transition-patch.js.map
