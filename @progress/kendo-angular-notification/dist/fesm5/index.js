/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef, ElementRef, Renderer2, ViewChild, ViewContainerRef, Input, HostBinding, EventEmitter, TemplateRef, ComponentFactoryResolver, InjectionToken, ApplicationRef, Injectable, Injector, Inject, Optional, Directive, forwardRef, NgModule } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { take } from 'rxjs/operators';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';
import { __extends } from 'tslib';

var NotificationSettings = /** @class */ (function () {
    function NotificationSettings() {
        /**
         * Specifies the time in milliseconds after which the
         * Notification will hide
         * ([see example]({% slug hiding_notifications %}#toc-definig-a-delay-before-hiding)).
         * Defaults to `5000`.
         */
        this.hideAfter = 5000;
        /**
         * Defines the position of the Notification
         * ([see example]({% slug positioning_notification %})).
         *
         * The possible values are:
         * * `horizontal: 'left'|'center'|'right'`
         * * `vertical: 'top'|'bottom'`
         */
        this.position = { horizontal: 'right', vertical: 'top' };
        /**
         * Specifies the animation settings of the Notification
         * ([see example]({% slug animations_notification %})).
         *
         * The possible values are:
         * * `duration`&mdash;Accepts a number in milliseconds. Defaults to `500ms`.
         * * `type?: 'slide'| (Default) 'fade'`
         */
        this.animation = { type: 'fade', duration: 500 };
        /**
         * Specifies if the Notification will require a user action to hide.
         * If the property is set to `true`, the Notification renders a **Close** button
         * ([see example]({% slug hiding_notifications %}#toc-defining-a-closable-notification)).
         *
         * The possible values are:
         * * (Default) `false`
         * * `true`
         */
        this.closable = false;
        /**
         * Specifies the type of the Notification
         * ([see example]({% slug types_notification %})).
         *
         * The possible values are:
         * * `style: (Default) 'none'|'success'|'error'|'warning'|'info'`
         * * `icon: 'true'|'false'`
         */
        this.type = { style: 'none', icon: true };
    }
    return NotificationSettings;
}());

/**
 * @hidden
 */
function slideAnimation(height, duration) {
    return [
        style({ overflow: 'hidden', height: 0 }),
        animate(duration + "ms ease-in", style({ height: height + "px" }))
    ];
}
/**
 * @hidden
 */
function slideCloseAnimation(height, duration) {
    return [
        style({ height: height + "px" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', height: 0 }))
    ];
}
/**
 * @hidden
 */
function fadeAnimation(duration) {
    return [
        style({ opacity: 0 }),
        animate(duration + "ms ease-in", style({ opacity: 1 }))
    ];
}
/**
 * @hidden
 */
function fadeCloseAnimation(duration) {
    return [
        style({ opacity: 1 }),
        animate(duration + "ms ease-in", style({ opacity: 0 }))
    ];
}

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

/**
 * @hidden
 *
 */
var NotificationContainerComponent = /** @class */ (function () {
    function NotificationContainerComponent(element, renderer, resolver) {
        this.element = element;
        this.renderer = renderer;
        this.resolver = resolver;
        this.id = '';
        this.notifications = [];
    }
    NotificationContainerComponent.prototype.ngOnDestroy = function () {
        this.notifications.forEach(function (notification) {
            if (notification.closeClickSubscription) {
                notification.closeClickSubscription.unsubscribe();
            }
        });
        this.notifications = [];
    };
    NotificationContainerComponent.prototype.addNotification = function (settings) {
        this.position = settings.position;
        this.id = this.position.horizontal + " " + this.position.vertical;
        var factory = this.resolver.resolveComponentFactory(NotificationComponent);
        var notificationRef = this.container.createComponent(factory);
        this.applySettings(notificationRef, settings);
        var customComponent = null;
        if (typeof settings.content === 'function') {
            var customFactory = this.resolver.resolveComponentFactory(settings.content);
            customComponent = notificationRef.instance.container.createComponent(customFactory);
        }
        notificationRef.changeDetectorRef.detectChanges();
        this.notifications.push(notificationRef.instance);
        if (settings.appendTo) {
            this.applyAbsolutePosition(settings.appendTo);
        }
        this.applyPosition();
        this.applyContainerWrap();
        return {
            afterHide: notificationRef.instance.close,
            hide: function () { return notificationRef.instance.hide(customComponent); },
            notification: notificationRef,
            content: customComponent || null
        };
    };
    NotificationContainerComponent.prototype.hide = function (notificationRef) {
        var instance = notificationRef.instance;
        var index = this.notifications.indexOf(instance);
        this.notifications.splice(index, 1);
        if (instance.closeClickSubscription) {
            instance.closeClickSubscription.unsubscribe();
        }
        instance.templateRef = null;
        instance.templateString = null;
        notificationRef.destroy();
    };
    NotificationContainerComponent.prototype.applyContainerWrap = function () {
        var value = this.position.horizontal === 'right' ? 'wrap-reverse' : 'wrap';
        this.renderer.setStyle(this.group.nativeElement, 'flex-wrap', value);
    };
    NotificationContainerComponent.prototype.applySettings = function (notificationRef, settings) {
        var _this = this;
        var notification = notificationRef.instance;
        var content = settings.content;
        var animation = settings.animation || null;
        notification.closeClickSubscription = notification.close
            .subscribe(function () { return _this.hide(notificationRef); });
        if (typeof content === 'string') {
            notification.templateString = content;
        }
        if (content instanceof TemplateRef) {
            notification.templateRef = content;
        }
        notification.animation = animation;
        var type = settings.type;
        if (type && type.style === undefined) {
            type.style = 'none';
        }
        if (type && type.icon === undefined) {
            type.icon = true;
        }
        notification.type = type;
        notification.closeTitle = settings.closeTitle;
        if (settings.cssClass) {
            notification.cssClass = settings.cssClass;
        }
        notification.closable = settings.closable;
        notification.hideAfter = settings.hideAfter;
        notification.width = settings.width;
        notification.height = settings.height;
    };
    NotificationContainerComponent.prototype.applyAbsolutePosition = function (appendToContainer) {
        var appendTo = appendToContainer.element.nativeElement;
        var el = this.element.nativeElement.children[0];
        if (window.getComputedStyle(appendTo).position === 'static') {
            this.renderer.setStyle(appendTo, 'position', 'relative');
        }
        this.renderer.setStyle(el, 'position', 'absolute');
    };
    NotificationContainerComponent.prototype.applyPosition = function () {
        var element = this.element.nativeElement.children[0];
        var elementHalfWidth = element.getBoundingClientRect().width / 2;
        var positionStyles = this.setContainerPosition(this.position, elementHalfWidth);
        Object.keys(positionStyles).forEach(function (cssStyle) {
            element.style[cssStyle] = positionStyles[cssStyle];
        });
    };
    NotificationContainerComponent.prototype.setContainerPosition = function (position, offsetMargin) {
        var positionLayout = {
            horizontal: {
                left: { left: 0, alignItems: 'flex-start' },
                right: { right: 0, alignItems: 'flex-start' },
                center: { left: '50%', marginLeft: -offsetMargin + "px", alignItems: 'center' }
            },
            vertical: {
                top: { top: 0 },
                bottom: { bottom: 0 }
            }
        };
        var horizontal = positionLayout.horizontal[position.horizontal];
        var vertical = positionLayout.vertical[position.vertical];
        return Object.assign({}, horizontal, vertical);
    };
    NotificationContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-notification-container',
                    template: "\n    <div #group class=\"k-notification-group\">\n        <ng-container #container></ng-container>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NotificationContainerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ComponentFactoryResolver }
    ]; };
    NotificationContainerComponent.propDecorators = {
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef, static: true },] }],
        group: [{ type: ViewChild, args: ['group', { static: true },] }],
        id: [{ type: Input }]
    };
    return NotificationContainerComponent;
}());

/**
 * Used to inject the Notification container. If not provided, the first root component of
 * the application is used.
 *
 * > The `NOTIFICATION_CONTAINER` can be used only with the [`NotificationService`]({% slug api_notification_notificationservice %}) class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Notification module
 * import { NotificationModule, NOTIFICATION_CONTAINER } from '@progress/kendo-angular-notification';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { ElementRef, NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, NotificationModule], // import Notification module
 *     bootstrap:    [AppComponent],
 *     providers: [{
 *       provide: NOTIFICATION_CONTAINER,
 *       useFactory: () => {
 *          //return the container ElementRef, where the notification will be injected
 *          return { nativeElement: document.body } as ElementRef;
 *       }
 *     }]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
var NOTIFICATION_CONTAINER = new InjectionToken('Notification Container');
/**
 * A service for opening Notification components dynamically
 * ([see example]({% slug overview_notification %})).
 *
 * @export
 * @class NotificationService
 */
var NotificationService = /** @class */ (function () {
    /**
     * @hidden
     */
    function NotificationService(resolver, injector, container) {
        this.resolver = resolver;
        this.injector = injector;
        this.container = container;
        this.notificationContainers = [];
        this.position = { horizontal: 'right', vertical: 'top' };
    }
    /**
     * Opens a Notification component. Created Notification are mounted
     * in the DOM directly in the root application component.
     *
     * @param {NotificationSettings} settings - The settings which define the Notification.
     *
     * @returns {NotificationRef} - A reference to the Notification object and the convenience properties.
     */
    NotificationService.prototype.show = function (settings) {
        if (!settings) {
            throw new Error('NotificationSettings settings are required');
        }
        var target = this.findGroupContainer(settings);
        var position = settings.position || this.position;
        var currentId = position.horizontal + " " + position.vertical;
        var container;
        var notificationRef;
        var notificationContainer = this.notificationContainers.find(function (c) { return target.nativeElement.contains(c.element.nativeElement) && c.id === currentId; });
        if (!notificationContainer) {
            container = this.resolver
                .resolveComponentFactory(NotificationContainerComponent)
                .create(this.injector);
            notificationContainer = container.instance;
            this.appRef.attachView(container.hostView);
            var hostViewElement = container.location.nativeElement;
            var groupContainer = this.findGroupContainer(settings);
            if (!groupContainer) {
                throw new Error("\n                    View Container not found! Inject the NOTIFICATION_CONTAINER or define a specific ViewContainerRef via\n                    the appendTo option. See http://www.telerik.com/kendo-angular-ui/components/notification/api/NOTIFICATION_CONTAINER/\n                    for more details.\n                ");
            }
            groupContainer.nativeElement.appendChild(hostViewElement);
            this.notificationContainers.push(notificationContainer);
        }
        settings.position = position;
        notificationRef = notificationContainer.addNotification(settings);
        return notificationRef;
    };
    Object.defineProperty(NotificationService.prototype, "appRef", {
        get: function () {
            if (!this.applicationRef) {
                this.applicationRef = this.injector.get(ApplicationRef);
            }
            return this.applicationRef;
        },
        enumerable: true,
        configurable: true
    });
    NotificationService.prototype.findGroupContainer = function (settings) {
        var container;
        if (settings.appendTo) {
            container = settings.appendTo.element;
        }
        else if (this.container) {
            container = this.container;
        }
        else {
            var appRoot = this.appRef.components && this.appRef.components[0];
            container = appRoot ? appRoot.location : null;
        }
        return container;
    };
    NotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ElementRef, decorators: [{ type: Inject, args: [NOTIFICATION_CONTAINER,] }, { type: Optional }] }
    ]; };
    return NotificationService;
}());

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: ComponentMessages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: "[kendoNotificationLocalizedMessages]"
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    LocalizedMessagesDirective.propDecorators = {
        closeTitle: [{ type: Input }]
    };
    return LocalizedMessagesDirective;
}(ComponentMessages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Notification component.
 *
 * The package exports:
 * - `NotificationService`&mdash;The Notification service class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Notification module
 * import { NotificationModule } from '@progress/kendo-angular-notification';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * _@NgModule{{
 *    declarations: [AppComponent], // declare app component
 *    imports:      [BrowserModule, NotificationModule], // import NotificationModule module
 *    bootstrap:    [AppComponent]
 * }}
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NotificationComponent, NotificationContainerComponent, LocalizedMessagesDirective],
                    entryComponents: [NotificationComponent, NotificationContainerComponent],
                    imports: [CommonModule],
                    exports: [NotificationComponent, NotificationContainerComponent],
                    providers: [NotificationService]
                },] },
    ];
    return NotificationModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { LocalizedMessagesDirective, NotificationContainerComponent, NotificationSettings, NotificationComponent, NotificationService, NOTIFICATION_CONTAINER, NotificationModule };
