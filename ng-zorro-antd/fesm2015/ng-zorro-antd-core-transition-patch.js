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
class NzTransitionPatchDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.hidden = null;
        this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
    }
    /**
     * @return {?}
     */
    setHiddenAttribute() {
        if (this.hidden === true) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
        }
        else if (this.hidden === false || this.hidden === null) {
            this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
        }
        else if (typeof this.hidden === 'string') {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', this.hidden);
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.setHiddenAttribute();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setHiddenAttribute();
    }
}
NzTransitionPatchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-button],nz-button-group,[nz-icon],[nz-menu-item],[nz-submenu],nz-select-top-control,nz-select-placeholder'
            },] }
];
/** @nocollapse */
NzTransitionPatchDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NzTransitionPatchDirective.propDecorators = {
    hidden: [{ type: Input }]
};
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
class NzTransitionPatchModule {
}
NzTransitionPatchModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                exports: [NzTransitionPatchDirective],
                declarations: [NzTransitionPatchDirective]
            },] }
];

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
