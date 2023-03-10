import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, EventEmitter, ChangeDetectorRef, ContentChild, Output, Input, ContentChildren, NgModule } from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { siderResponsiveMap, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { toCssPixel, inNextTick, InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * @fileoverview added by tsickle
 * Generated from: content.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzContentComponent = /** @class */ (function () {
    function NzContentComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-content');
    }
    NzContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-content',
                    exportAs: 'nzContent',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: " <ng-content></ng-content> "
                }] }
    ];
    /** @nocollapse */
    NzContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return NzContentComponent;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzContentComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzContentComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: footer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzFooterComponent = /** @class */ (function () {
    function NzFooterComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-footer');
    }
    NzFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-footer',
                    exportAs: 'nzFooter',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: " <ng-content></ng-content> "
                }] }
    ];
    /** @nocollapse */
    NzFooterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return NzFooterComponent;
}());
if (false) {
    /** @type {?} */
    NzFooterComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzFooterComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzHeaderComponent = /** @class */ (function () {
    function NzHeaderComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-header');
    }
    NzHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-header',
                    exportAs: 'nzHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    template: " <ng-content></ng-content> "
                }] }
    ];
    /** @nocollapse */
    NzHeaderComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return NzHeaderComponent;
}());
if (false) {
    /** @type {?} */
    NzHeaderComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzHeaderComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: sider.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzSiderComponent = /** @class */ (function () {
    function NzSiderComponent(platform, cdr, breakpointService) {
        this.platform = platform;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.destroy$ = new Subject();
        this.nzMenuDirective = null;
        this.nzCollapsedChange = new EventEmitter();
        this.nzWidth = 200;
        this.nzTheme = 'dark';
        this.nzCollapsedWidth = 80;
        this.nzBreakpoint = null;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.nzReverseArrow = false;
        this.nzCollapsible = false;
        this.nzCollapsed = false;
        this.matchBreakPoint = false;
        this.flexSetting = null;
        this.widthSetting = null;
    }
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.updateStyleMap = /**
     * @return {?}
     */
    function () {
        this.widthSetting = this.nzCollapsed ? this.nzCollapsedWidth + "px" : toCssPixel(this.nzWidth);
        this.flexSetting = "0 0 " + this.widthSetting;
        this.cdr.markForCheck();
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.updateMenuInlineCollapsed = /**
     * @return {?}
     */
    function () {
        if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
            this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
        }
    };
    /**
     * @param {?} collapsed
     * @return {?}
     */
    NzSiderComponent.prototype.setCollapsed = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        if (collapsed !== this.nzCollapsed) {
            this.nzCollapsed = collapsed;
            this.nzCollapsedChange.emit(collapsed);
            this.updateMenuInlineCollapsed();
            this.updateStyleMap();
            this.cdr.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.updateStyleMap();
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(siderResponsiveMap, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} map
             * @return {?}
             */
            function (map) {
                /** @type {?} */
                var breakpoint = _this.nzBreakpoint;
                if (breakpoint) {
                    inNextTick().subscribe((/**
                     * @return {?}
                     */
                    function () {
                        _this.matchBreakPoint = !map[breakpoint];
                        _this.setCollapsed(_this.matchBreakPoint);
                        _this.cdr.markForCheck();
                    }));
                }
            }));
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzSiderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzCollapsed = changes.nzCollapsed, nzCollapsedWidth = changes.nzCollapsedWidth, nzWidth = changes.nzWidth;
        if (nzCollapsed || nzCollapsedWidth || nzWidth) {
            this.updateStyleMap();
        }
        if (nzCollapsed) {
            this.updateMenuInlineCollapsed();
        }
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.updateMenuInlineCollapsed();
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzSiderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-sider',
                    exportAs: 'nzSider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"ant-layout-sider-children\">\n      <ng-content></ng-content>\n    </div>\n    <div\n      *ngIf=\"nzCollapsible && nzTrigger !== null\"\n      nz-sider-trigger\n      [matchBreakPoint]=\"matchBreakPoint\"\n      [nzCollapsedWidth]=\"nzCollapsedWidth\"\n      [nzCollapsed]=\"nzCollapsed\"\n      [nzBreakpoint]=\"nzBreakpoint\"\n      [nzReverseArrow]=\"nzReverseArrow\"\n      [nzTrigger]=\"nzTrigger\"\n      [nzZeroTrigger]=\"nzZeroTrigger\"\n      [siderWidth]=\"widthSetting\"\n      (click)=\"setCollapsed(!nzCollapsed)\"\n    ></div>\n  ",
                    host: {
                        '[class.ant-layout-sider]': 'true',
                        '[class.ant-layout-sider-zero-width]': "nzCollapsed && nzCollapsedWidth === 0",
                        '[class.ant-layout-sider-light]': "nzTheme === 'light'",
                        '[class.ant-layout-sider-dark]': "nzTheme === 'dark'",
                        '[class.ant-layout-sider-collapsed]': "nzCollapsed",
                        '[style.flex]': 'flexSetting',
                        '[style.maxWidth]': 'widthSetting',
                        '[style.minWidth]': 'widthSetting',
                        '[style.width]': 'widthSetting'
                    }
                }] }
    ];
    /** @nocollapse */
    NzSiderComponent.ctorParameters = function () { return [
        { type: Platform },
        { type: ChangeDetectorRef },
        { type: NzBreakpointService }
    ]; };
    NzSiderComponent.propDecorators = {
        nzMenuDirective: [{ type: ContentChild, args: [NzMenuDirective,] }],
        nzCollapsedChange: [{ type: Output }],
        nzWidth: [{ type: Input }],
        nzTheme: [{ type: Input }],
        nzCollapsedWidth: [{ type: Input }],
        nzBreakpoint: [{ type: Input }],
        nzZeroTrigger: [{ type: Input }],
        nzTrigger: [{ type: Input }],
        nzReverseArrow: [{ type: Input }],
        nzCollapsible: [{ type: Input }],
        nzCollapsed: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzSiderComponent.prototype, "nzReverseArrow", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzSiderComponent.prototype, "nzCollapsible", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzSiderComponent.prototype, "nzCollapsed", void 0);
    return NzSiderComponent;
}());
if (false) {
    /** @type {?} */
    NzSiderComponent.ngAcceptInputType_nzReverseArrow;
    /** @type {?} */
    NzSiderComponent.ngAcceptInputType_nzCollapsible;
    /** @type {?} */
    NzSiderComponent.ngAcceptInputType_nzCollapsed;
    /**
     * @type {?}
     * @private
     */
    NzSiderComponent.prototype.destroy$;
    /** @type {?} */
    NzSiderComponent.prototype.nzMenuDirective;
    /** @type {?} */
    NzSiderComponent.prototype.nzCollapsedChange;
    /** @type {?} */
    NzSiderComponent.prototype.nzWidth;
    /** @type {?} */
    NzSiderComponent.prototype.nzTheme;
    /** @type {?} */
    NzSiderComponent.prototype.nzCollapsedWidth;
    /** @type {?} */
    NzSiderComponent.prototype.nzBreakpoint;
    /** @type {?} */
    NzSiderComponent.prototype.nzZeroTrigger;
    /** @type {?} */
    NzSiderComponent.prototype.nzTrigger;
    /** @type {?} */
    NzSiderComponent.prototype.nzReverseArrow;
    /** @type {?} */
    NzSiderComponent.prototype.nzCollapsible;
    /** @type {?} */
    NzSiderComponent.prototype.nzCollapsed;
    /** @type {?} */
    NzSiderComponent.prototype.matchBreakPoint;
    /** @type {?} */
    NzSiderComponent.prototype.flexSetting;
    /** @type {?} */
    NzSiderComponent.prototype.widthSetting;
    /**
     * @type {?}
     * @private
     */
    NzSiderComponent.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    NzSiderComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzSiderComponent.prototype.breakpointService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: layout.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzLayoutComponent = /** @class */ (function () {
    function NzLayoutComponent() {
    }
    NzLayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-layout',
                    exportAs: 'nzLayout',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    template: " <ng-content></ng-content> ",
                    host: {
                        '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0',
                        '[class.ant-layout]': 'true'
                    }
                }] }
    ];
    NzLayoutComponent.propDecorators = {
        listOfNzSiderComponent: [{ type: ContentChildren, args: [NzSiderComponent,] }]
    };
    return NzLayoutComponent;
}());
if (false) {
    /** @type {?} */
    NzLayoutComponent.prototype.listOfNzSiderComponent;
}

/**
 * @fileoverview added by tsickle
 * Generated from: sider-trigger.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzSiderTriggerComponent = /** @class */ (function () {
    function NzSiderTriggerComponent() {
        this.nzCollapsed = false;
        this.nzReverseArrow = false;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.matchBreakPoint = false;
        this.nzCollapsedWidth = null;
        this.siderWidth = null;
        this.nzBreakpoint = null;
        this.isZeroTrigger = false;
        this.isNormalTrigger = false;
    }
    /**
     * @return {?}
     */
    NzSiderTriggerComponent.prototype.updateTriggerType = /**
     * @return {?}
     */
    function () {
        this.isZeroTrigger = this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
        this.isNormalTrigger = this.nzCollapsedWidth !== 0;
    };
    /**
     * @return {?}
     */
    NzSiderTriggerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateTriggerType();
    };
    /**
     * @return {?}
     */
    NzSiderTriggerComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.updateTriggerType();
    };
    NzSiderTriggerComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nz-sider-trigger]',
                    exportAs: 'nzSiderTrigger',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-container *ngIf=\"isZeroTrigger\">\n      <ng-template [ngTemplateOutlet]=\"nzZeroTrigger || defaultZeroTrigger\"></ng-template>\n    </ng-container>\n    <ng-container *ngIf=\"isNormalTrigger\">\n      <ng-template [ngTemplateOutlet]=\"nzTrigger || defaultTrigger\"></ng-template>\n    </ng-container>\n    <ng-template #defaultTrigger>\n      <i nz-icon [nzType]=\"nzCollapsed ? 'right' : 'left'\" *ngIf=\"!nzReverseArrow\"></i>\n      <i nz-icon [nzType]=\"nzCollapsed ? 'left' : 'right'\" *ngIf=\"nzReverseArrow\"></i>\n    </ng-template>\n    <ng-template #defaultZeroTrigger>\n      <i nz-icon nzType=\"bars\"></i>\n    </ng-template>\n  ",
                    host: {
                        '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
                        '[style.width]': 'isNormalTrigger ? siderWidth : null',
                        '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
                        '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
                        '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
                    }
                }] }
    ];
    NzSiderTriggerComponent.propDecorators = {
        nzCollapsed: [{ type: Input }],
        nzReverseArrow: [{ type: Input }],
        nzZeroTrigger: [{ type: Input }],
        nzTrigger: [{ type: Input }],
        matchBreakPoint: [{ type: Input }],
        nzCollapsedWidth: [{ type: Input }],
        siderWidth: [{ type: Input }],
        nzBreakpoint: [{ type: Input }]
    };
    return NzSiderTriggerComponent;
}());
if (false) {
    /** @type {?} */
    NzSiderTriggerComponent.prototype.nzCollapsed;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.nzReverseArrow;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.nzZeroTrigger;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.nzTrigger;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.matchBreakPoint;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.nzCollapsedWidth;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.siderWidth;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.nzBreakpoint;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.isZeroTrigger;
    /** @type {?} */
    NzSiderTriggerComponent.prototype.isNormalTrigger;
}

/**
 * @fileoverview added by tsickle
 * Generated from: layout.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzLayoutModule = /** @class */ (function () {
    function NzLayoutModule() {
    }
    NzLayoutModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent, NzSiderTriggerComponent],
                    exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
                    imports: [CommonModule, NzIconModule, LayoutModule, PlatformModule]
                },] }
    ];
    return NzLayoutModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-layout.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent, NzLayoutModule, NzSiderComponent, NzSiderTriggerComponent as ??NzSiderTriggerComponent };
//# sourceMappingURL=ng-zorro-antd-layout.js.map
