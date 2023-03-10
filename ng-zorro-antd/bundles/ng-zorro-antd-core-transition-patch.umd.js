(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/transition-patch', ['exports', '@angular/cdk/platform', '@angular/core'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core['transition-patch'] = {}), global.ng.cdk.platform, global.ng.core));
}(this, (function (exports, platform, core) { 'use strict';

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
            { type: core.Directive, args: [{
                        selector: '[nz-button],nz-button-group,[nz-icon],[nz-menu-item],[nz-submenu],nz-select-top-control,nz-select-placeholder'
                    },] }
        ];
        /** @nocollapse */
        NzTransitionPatchDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NzTransitionPatchDirective.propDecorators = {
            hidden: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [platform.PlatformModule],
                        exports: [NzTransitionPatchDirective],
                        declarations: [NzTransitionPatchDirective]
                    },] }
        ];
        return NzTransitionPatchModule;
    }());

    exports.??NzTransitionPatchDirective = NzTransitionPatchDirective;
    exports.??NzTransitionPatchModule = NzTransitionPatchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-transition-patch.umd.js.map
