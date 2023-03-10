import { __extends, __decorate, __metadata } from 'tslib';
import { EventEmitter, Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, Renderer2, Host, Optional, Input, Output, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, NgModule } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective, NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent, NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * @fileoverview added by tsickle
 * Generated from: popconfirm.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPopconfirmDirective = /** @class */ (function (_super) {
    __extends(NzPopconfirmDirective, _super);
    function NzPopconfirmDirective(elementRef, hostView, resolver, renderer, noAnimation) {
        var _this = _super.call(this, elementRef, hostView, resolver, renderer, noAnimation) || this;
        _this.nzCondition = false;
        _this.nzPopconfirmShowArrow = true;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTrigger`.
         */
        _this.nzTrigger = 'click';
        // tslint:disable-next-line:no-output-rename
        _this.specificVisibleChange = new EventEmitter();
        _this.nzOnCancel = new EventEmitter();
        _this.nzOnConfirm = new EventEmitter();
        _this.componentFactory = _this.resolver.resolveComponentFactory(NzPopconfirmComponent);
        _this.needProxyProperties = [
            'nzOverlayClassName',
            'nzOverlayStyle',
            'nzMouseEnterDelay',
            'nzMouseLeaveDelay',
            'nzVisible',
            'nzOkText',
            'nzOkType',
            'nzCancelText',
            'nzCondition',
            'nzIcon',
            'nzPopconfirmShowArrow'
        ];
        return _this;
    }
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NzPopconfirmDirective.prototype.createComponent = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.createComponent.call(this);
        ((/** @type {?} */ (this.component))).nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.nzOnCancel.emit();
        }));
        ((/** @type {?} */ (this.component))).nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.nzOnConfirm.emit();
        }));
    };
    NzPopconfirmDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nz-popconfirm]',
                    exportAs: 'nzPopconfirm',
                    host: {
                        '[class.ant-popover-open]': 'visible'
                    }
                },] }
    ];
    /** @nocollapse */
    NzPopconfirmDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzPopconfirmDirective.propDecorators = {
        specificTitle: [{ type: Input, args: ['nzPopconfirmTitle',] }],
        directiveNameTitle: [{ type: Input, args: ['nz-popconfirm',] }],
        specificTrigger: [{ type: Input, args: ['nzPopconfirmTrigger',] }],
        specificPlacement: [{ type: Input, args: ['nzPopconfirmPlacement',] }],
        specificOrigin: [{ type: Input, args: ['nzPopconfirmOrigin',] }],
        specificMouseEnterDelay: [{ type: Input, args: ['nzPopconfirmMouseEnterDelay',] }],
        specificMouseLeaveDelay: [{ type: Input, args: ['nzPopconfirmMouseLeaveDelay',] }],
        specificOverlayClassName: [{ type: Input, args: ['nzPopconfirmOverlayClassName',] }],
        specificOverlayStyle: [{ type: Input, args: ['nzPopconfirmOverlayStyle',] }],
        nzOkText: [{ type: Input }],
        nzOkType: [{ type: Input }],
        nzCancelText: [{ type: Input }],
        nzIcon: [{ type: Input }],
        nzCondition: [{ type: Input }],
        nzPopconfirmShowArrow: [{ type: Input }],
        nzTrigger: [{ type: Input }],
        specificVisible: [{ type: Input, args: ['nzPopconfirmVisible',] }],
        specificVisibleChange: [{ type: Output, args: ['nzPopconfirmVisibleChange',] }],
        nzOnCancel: [{ type: Output }],
        nzOnConfirm: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzPopconfirmDirective.prototype, "nzCondition", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzPopconfirmDirective.prototype, "nzPopconfirmShowArrow", void 0);
    return NzPopconfirmDirective;
}(NzTooltipBaseDirective));
if (false) {
    /** @type {?} */
    NzPopconfirmDirective.ngAcceptInputType_nzCondition;
    /** @type {?} */
    NzPopconfirmDirective.ngAcceptInputType_nzPopconfirmShowArrow;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificTitle;
    /** @type {?} */
    NzPopconfirmDirective.prototype.directiveNameTitle;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificTrigger;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificPlacement;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificOrigin;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificMouseEnterDelay;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificMouseLeaveDelay;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificOverlayClassName;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificOverlayStyle;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOkText;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOkType;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzCancelText;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzIcon;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzCondition;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzPopconfirmShowArrow;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipTrigger`.
     * @type {?}
     */
    NzPopconfirmDirective.prototype.nzTrigger;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificVisible;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificVisibleChange;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOnCancel;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOnConfirm;
    /**
     * @type {?}
     * @protected
     */
    NzPopconfirmDirective.prototype.componentFactory;
    /**
     * @type {?}
     * @protected
     */
    NzPopconfirmDirective.prototype.needProxyProperties;
}
var NzPopconfirmComponent = /** @class */ (function (_super) {
    __extends(NzPopconfirmComponent, _super);
    function NzPopconfirmComponent(cdr, noAnimation) {
        var _this = _super.call(this, cdr, noAnimation) || this;
        _this.noAnimation = noAnimation;
        _this.nzCondition = false;
        _this.nzPopconfirmShowArrow = true;
        _this.nzOkType = 'primary';
        _this.nzOnCancel = new Subject();
        _this.nzOnConfirm = new Subject();
        _this._trigger = 'click';
        _this._prefix = 'ant-popover-placement';
        _this._hasBackdrop = true;
        return _this;
    }
    /**
     * @return {?}
     */
    NzPopconfirmComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.nzOnCancel.complete();
        this.nzOnConfirm.complete();
    };
    /**
     * @override
     */
    /**
     * @override
     * @return {?}
     */
    NzPopconfirmComponent.prototype.show = /**
     * @override
     * @return {?}
     */
    function () {
        if (!this.nzCondition) {
            _super.prototype.show.call(this);
        }
        else {
            this.onConfirm();
        }
    };
    /**
     * @return {?}
     */
    NzPopconfirmComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.nzOnCancel.next();
        _super.prototype.hide.call(this);
    };
    /**
     * @return {?}
     */
    NzPopconfirmComponent.prototype.onConfirm = /**
     * @return {?}
     */
    function () {
        this.nzOnConfirm.next();
        _super.prototype.hide.call(this);
    };
    NzPopconfirmComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-popconfirm',
                    exportAs: 'nzPopconfirmComponent',
                    preserveWhitespaces: false,
                    animations: [zoomBigMotion],
                    template: "\n    <ng-template\n      #overlay=\"cdkConnectedOverlay\"\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n      (backdropClick)=\"hide()\"\n      (detach)=\"hide()\"\n      (positionChange)=\"onPositionChange($event)\"\n      [cdkConnectedOverlayPositions]=\"_positions\"\n      [cdkConnectedOverlayOpen]=\"_visible\"\n    >\n      <div\n        class=\"ant-popover\"\n        [ngClass]=\"_classMap\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@zoomBigMotion]=\"'active'\"\n      >\n        <div class=\"ant-popover-content\">\n          <div class=\"ant-popover-arrow\" *ngIf=\"nzPopconfirmShowArrow\"></div>\n          <div class=\"ant-popover-inner\">\n            <div>\n              <div class=\"ant-popover-inner-content\">\n                <div class=\"ant-popover-message\">\n                  <ng-container *nzStringTemplateOutlet=\"nzTitle\">\n                    <ng-container *nzStringTemplateOutlet=\"nzIcon; let icon\">\n                      <i nz-icon [nzType]=\"icon || 'exclamation-circle'\" nzTheme=\"fill\"></i>\n                    </ng-container>\n                    <div class=\"ant-popover-message-title\">{{ nzTitle }}</div>\n                  </ng-container>\n                </div>\n                <div class=\"ant-popover-buttons\">\n                  <button nz-button [nzSize]=\"'small'\" (click)=\"onCancel()\">\n                    <ng-container *ngIf=\"nzCancelText\">{{ nzCancelText }}</ng-container>\n                    <ng-container *ngIf=\"!nzCancelText\">{{ 'Modal.cancelText' | nzI18n }}</ng-container>\n                  </button>\n                  <button nz-button [nzSize]=\"'small'\" [nzType]=\"nzOkType\" (click)=\"onConfirm()\">\n                    <ng-container *ngIf=\"nzOkText\">{{ nzOkText }}</ng-container>\n                    <ng-container *ngIf=\"!nzOkText\">{{ 'Modal.okText' | nzI18n }}</ng-container>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzPopconfirmComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    return NzPopconfirmComponent;
}(NzToolTipComponent));
if (false) {
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzCancelText;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzCondition;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzPopconfirmShowArrow;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzIcon;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOkText;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOkType;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOnCancel;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOnConfirm;
    /**
     * @type {?}
     * @protected
     */
    NzPopconfirmComponent.prototype._trigger;
    /** @type {?} */
    NzPopconfirmComponent.prototype._prefix;
    /** @type {?} */
    NzPopconfirmComponent.prototype._hasBackdrop;
    /** @type {?} */
    NzPopconfirmComponent.prototype.noAnimation;
}

/**
 * @fileoverview added by tsickle
 * Generated from: popconfirm.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPopconfirmModule = /** @class */ (function () {
    function NzPopconfirmModule() {
    }
    NzPopconfirmModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
                    exports: [NzPopconfirmComponent, NzPopconfirmDirective],
                    entryComponents: [NzPopconfirmComponent],
                    imports: [
                        CommonModule,
                        NzButtonModule,
                        OverlayModule,
                        NzI18nModule,
                        NzIconModule,
                        NzOutletModule,
                        NzOverlayModule,
                        NzNoAnimationModule,
                        NzToolTipModule
                    ]
                },] }
    ];
    return NzPopconfirmModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-popconfirm.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzPopconfirmComponent, NzPopconfirmDirective, NzPopconfirmModule };
//# sourceMappingURL=ng-zorro-antd-popconfirm.js.map
