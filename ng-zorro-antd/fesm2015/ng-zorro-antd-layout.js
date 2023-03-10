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
class NzContentComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-content');
    }
}
NzContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-content',
                exportAs: 'nzContent',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: ` <ng-content></ng-content> `
            }] }
];
/** @nocollapse */
NzContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
class NzFooterComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-footer');
    }
}
NzFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-footer',
                exportAs: 'nzFooter',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `
            }] }
];
/** @nocollapse */
NzFooterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
class NzHeaderComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-header');
    }
}
NzHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-header',
                exportAs: 'nzHeader',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                template: ` <ng-content></ng-content> `
            }] }
];
/** @nocollapse */
NzHeaderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
class NzSiderComponent {
    /**
     * @param {?} platform
     * @param {?} cdr
     * @param {?} breakpointService
     */
    constructor(platform, cdr, breakpointService) {
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
    updateStyleMap() {
        this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
        this.flexSetting = `0 0 ${this.widthSetting}`;
        this.cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    updateMenuInlineCollapsed() {
        if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
            this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
        }
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    setCollapsed(collapsed) {
        if (collapsed !== this.nzCollapsed) {
            this.nzCollapsed = collapsed;
            this.nzCollapsedChange.emit(collapsed);
            this.updateMenuInlineCollapsed();
            this.updateStyleMap();
            this.cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateStyleMap();
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(siderResponsiveMap, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} map
             * @return {?}
             */
            map => {
                /** @type {?} */
                const breakpoint = this.nzBreakpoint;
                if (breakpoint) {
                    inNextTick().subscribe((/**
                     * @return {?}
                     */
                    () => {
                        this.matchBreakPoint = !map[breakpoint];
                        this.setCollapsed(this.matchBreakPoint);
                        this.cdr.markForCheck();
                    }));
                }
            }));
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { nzCollapsed, nzCollapsedWidth, nzWidth } = changes;
        if (nzCollapsed || nzCollapsedWidth || nzWidth) {
            this.updateStyleMap();
        }
        if (nzCollapsed) {
            this.updateMenuInlineCollapsed();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.updateMenuInlineCollapsed();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSiderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-sider',
                exportAs: 'nzSider',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `,
                host: {
                    '[class.ant-layout-sider]': 'true',
                    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
                    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
                    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
                    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
                    '[style.flex]': 'flexSetting',
                    '[style.maxWidth]': 'widthSetting',
                    '[style.minWidth]': 'widthSetting',
                    '[style.width]': 'widthSetting'
                }
            }] }
];
/** @nocollapse */
NzSiderComponent.ctorParameters = () => [
    { type: Platform },
    { type: ChangeDetectorRef },
    { type: NzBreakpointService }
];
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
class NzLayoutComponent {
}
NzLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-layout',
                exportAs: 'nzLayout',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                template: ` <ng-content></ng-content> `,
                host: {
                    '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0',
                    '[class.ant-layout]': 'true'
                }
            }] }
];
NzLayoutComponent.propDecorators = {
    listOfNzSiderComponent: [{ type: ContentChildren, args: [NzSiderComponent,] }]
};
if (false) {
    /** @type {?} */
    NzLayoutComponent.prototype.listOfNzSiderComponent;
}

/**
 * @fileoverview added by tsickle
 * Generated from: sider-trigger.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzSiderTriggerComponent {
    constructor() {
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
    updateTriggerType() {
        this.isZeroTrigger = this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
        this.isNormalTrigger = this.nzCollapsedWidth !== 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateTriggerType();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.updateTriggerType();
    }
}
NzSiderTriggerComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-sider-trigger]',
                exportAs: 'nzSiderTrigger',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `,
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
class NzLayoutModule {
}
NzLayoutModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent, NzSiderTriggerComponent],
                exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
                imports: [CommonModule, NzIconModule, LayoutModule, PlatformModule]
            },] }
];

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
