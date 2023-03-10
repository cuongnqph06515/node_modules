/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var operators_1 = require("rxjs/operators");
var animations_2 = require("./utils/animations");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        this.close = new core_1.EventEmitter();
        this.width = null;
        this.height = null;
        this.defaultHideAfter = 5000;
        this.animationEnd = new core_1.EventEmitter();
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
            this.animationEnd.pipe(operators_1.take(1))
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
        return onclose ? animations_2.slideCloseAnimation(height, duration) : animations_2.slideAnimation(height, duration);
    };
    NotificationComponent.prototype.fadeAnimation = function (duration, onclose) {
        return onclose ? animations_2.fadeCloseAnimation(duration) : animations_2.fadeAnimation(duration);
    };
    NotificationComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-notification',
                    template: "\n    <ng-container kendoNotificationLocalizedMessages\n        i18n-closeTitle=\"kendo.notification.closeTitle|The title of the close button\"\n        closeTitle=\"Close\"\n    >\n    </ng-container>\n    <div class=\"k-widget k-notification {{ notificationClasses() }}\"\n        [ngClass]=\"cssClass\"\n        [style.height.px]=\"height\"\n        [style.width.px]=\"width\">\n        <div class=\"k-notification-wrap\">\n            <span *ngIf=\"type && type.icon && type.style !== 'none'\" class=\"k-icon\" [ngClass]=\"typeIconClass()\"></span>\n\n            <div class=\"k-notification-content\">\n                <ng-template\n                    [ngIf]=\"templateRef\"\n                    [ngTemplateOutlet]=\"templateRef\">\n                </ng-template>\n                <ng-template\n                    [ngIf]=\"templateString\">\n                    {{ templateString }}\n                </ng-template>\n                <ng-container #container></ng-container>\n            </div>\n\n            <a *ngIf=\"closable\" class=\"k-icon k-i-close\" [attr.title]=\"closeButtonTitle\" (click)=\"onCloseClick()\"></a>\n        </div>\n    </div>\n  ",
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.notification'
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NotificationComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: animations_1.AnimationBuilder },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    NotificationComponent.propDecorators = {
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef, static: true },] }],
        templateRef: [{ type: core_1.Input }],
        templateString: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.Input }],
        hideAfter: [{ type: core_1.Input }],
        closable: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        animation: [{ type: core_1.Input }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        containerClass: [{ type: core_1.HostBinding, args: ['class.k-notification-container',] }]
    };
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
