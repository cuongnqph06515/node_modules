/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Input, TemplateRef, ChangeDetectorRef, ViewChild, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { take } from 'rxjs/operators';
import { fadeAnimation, fadeCloseAnimation, slideAnimation, slideCloseAnimation } from './utils/animations';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 *
 */
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(cdr, element, renderer, builder, localizationService) {
        var _this = this;
        this.cdr = cdr;
        this.element = element;
        this.renderer = renderer;
        this.builder = builder;
        this.localizationService = localizationService;
        this.close = new EventEmitter();
        this.width = null;
        this.height = null;
        this.defaultHideAfter = 5000;
        this.animationEnd = new EventEmitter();
        this.rtl = false;
        this.dynamicRTLSubscription = localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(NotificationComponent.prototype, "containerClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationComponent.prototype, "closeButtonTitle", {
        get: function () {
            return this.closeTitle || this.localizationService.get('closeTitle');
        },
        enumerable: true,
        configurable: true
    });
    NotificationComponent.prototype.notificationClasses = function () {
        return (this.type ? this.typeClass() : '') + "\n            " + (this.closable ? 'k-notification-closable' : '');
    };
    NotificationComponent.prototype.ngOnInit = function () {
        clearTimeout(this.hideTimeout);
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.hideTimeout);
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    NotificationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.closable && !this.animation) {
            this.setHideTimeout();
        }
        if (!this.closable && this.animation) {
            this.animationEnd.pipe(take(1))
                .subscribe(function () { return _this.setHideTimeout(); });
        }
        if (this.animation) {
            this.animate(this.animation);
        }
    };
    NotificationComponent.prototype.typeClass = function () {
        return {
            'none': '',
            'success': 'k-notification-success',
            'warning': 'k-notification-warning',
            'error': 'k-notification-error',
            'info': 'k-notification-info'
        }[this.type.style];
    };
    NotificationComponent.prototype.typeIconClass = function () {
        return {
            'none': '',
            'success': 'k-i-success',
            'warning': 'k-i-warning',
            'error': 'k-i-error',
            'info': 'k-i-info'
        }[this.type.style];
    };
    NotificationComponent.prototype.onCloseClick = function () {
        clearTimeout(this.hideTimeout);
        this.hide();
    };
    NotificationComponent.prototype.hide = function (customComponent) {
        var _this = this;
        var elementHeight = getComputedStyle(this.element.nativeElement).height;
        if (this.animation && elementHeight) {
            this.animate(this.animation, true);
            this.animationEnd.subscribe(function () {
                _this.emitClose(customComponent);
            });
            return;
        }
        this.emitClose(customComponent);
    };
    NotificationComponent.prototype.setHideTimeout = function () {
        var _this = this;
        var hideAfter = this.hideAfter || this.defaultHideAfter;
        this.hideTimeout = window.setTimeout(function () { return _this.onCloseClick(); }, hideAfter);
    };
    NotificationComponent.prototype.emitClose = function (customComponent) {
        if (customComponent) {
            customComponent.destroy();
        }
        this.close.emit();
    };
    NotificationComponent.prototype.play = function (animation, animatedElement) {
        var _this = this;
        var factory = this.builder.build(animation);
        var element = this.element.nativeElement;
        this.renderer.addClass(element, 'k-notification-container-animating');
        var player = factory.create(animatedElement);
        player.onDone(function () {
            _this.renderer.removeClass(element, 'k-notification-container-animating');
            _this.animationEnd.emit();
            if (player) {
                player.destroy();
                player = null;
            }
        });
        player.play();
    };
    NotificationComponent.prototype.animate = function (animation, onclose) {
        var element = this.element.nativeElement;
        var duration = animation.duration;
        var height = element.offsetHeight;
        var generatedAnimation = animation.type === 'slide' ?
            this.slideAnimation(height, duration, onclose) :
            this.fadeAnimation(duration, onclose);
        this.play(generatedAnimation, element);
    };
    NotificationComponent.prototype.slideAnimation = function (height, duration, onclose) {
        return onclose ? slideCloseAnimation(height, duration) : slideAnimation(height, duration);
    };
    NotificationComponent.prototype.fadeAnimation = function (duration, onclose) {
        return onclose ? fadeCloseAnimation(duration) : fadeAnimation(duration);
    };
    NotificationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-notification',
                    template: "\n    <ng-container kendoNotificationLocalizedMessages\n        i18n-closeTitle=\"kendo.notification.closeTitle|The title of the close button\"\n        closeTitle=\"Close\"\n    >\n    </ng-container>\n    <div class=\"k-widget k-notification {{ notificationClasses() }}\"\n        [ngClass]=\"cssClass\"\n        [style.height.px]=\"height\"\n        [style.width.px]=\"width\">\n        <div class=\"k-notification-wrap\">\n            <span *ngIf=\"type && type.icon && type.style !== 'none'\" class=\"k-icon\" [ngClass]=\"typeIconClass()\"></span>\n\n            <div class=\"k-notification-content\">\n                <ng-template\n                    [ngIf]=\"templateRef\"\n                    [ngTemplateOutlet]=\"templateRef\">\n                </ng-template>\n                <ng-template\n                    [ngIf]=\"templateString\">\n                    {{ templateString }}\n                </ng-template>\n                <ng-container #container></ng-container>\n            </div>\n\n            <a *ngIf=\"closable\" class=\"k-icon k-i-close\" [attr.title]=\"closeButtonTitle\" (click)=\"onCloseClick()\"></a>\n        </div>\n    </div>\n  ",
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.notification'
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NotificationComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: Renderer2 },
        { type: AnimationBuilder },
        { type: LocalizationService }
    ]; };
    NotificationComponent.propDecorators = {
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef, static: true },] }],
        templateRef: [{ type: Input }],
        templateString: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        cssClass: [{ type: Input }],
        hideAfter: [{ type: Input }],
        closable: [{ type: Input }],
        type: [{ type: Input }],
        animation: [{ type: Input }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        containerClass: [{ type: HostBinding, args: ['class.k-notification-container',] }]
    };
    return NotificationComponent;
}());
export { NotificationComponent };
