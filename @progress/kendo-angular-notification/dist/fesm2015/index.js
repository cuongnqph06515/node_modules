/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Component, ChangeDetectorRef, ElementRef, Renderer2, ViewChild, ViewContainerRef, Input, HostBinding, TemplateRef, ComponentFactoryResolver, InjectionToken, ApplicationRef, Injectable, Injector, Inject, Optional, Directive, forwardRef, NgModule } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { take } from 'rxjs/operators';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';

class NotificationSettings {
    constructor() {
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
}

/**
 * @hidden
 */
function slideAnimation(height, duration) {
    return [
        style({ overflow: 'hidden', height: 0 }),
        animate(`${duration}ms ease-in`, style({ height: `${height}px` }))
    ];
}
/**
 * @hidden
 */
function slideCloseAnimation(height, duration) {
    return [
        style({ height: `${height}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', height: 0 }))
    ];
}
/**
 * @hidden
 */
function fadeAnimation(duration) {
    return [
        style({ opacity: 0 }),
        animate(`${duration}ms ease-in`, style({ opacity: 1 }))
    ];
}
/**
 * @hidden
 */
function fadeCloseAnimation(duration) {
    return [
        style({ opacity: 1 }),
        animate(`${duration}ms ease-in`, style({ opacity: 0 }))
    ];
}

/**
 * @hidden
 *
 */
class NotificationComponent {
    constructor(cdr, element, renderer, builder, localizationService) {
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
        this.dynamicRTLSubscription = localizationService.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
    }
    get containerClass() {
        return true;
    }
    get closeButtonTitle() {
        return this.closeTitle || this.localizationService.get('closeTitle');
    }
    notificationClasses() {
        return `${this.type ? this.typeClass() : ''}
            ${this.closable ? 'k-notification-closable' : ''}`;
    }
    ngOnInit() {
        clearTimeout(this.hideTimeout);
    }
    ngOnDestroy() {
        clearTimeout(this.hideTimeout);
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    ngAfterViewInit() {
        if (!this.closable && !this.animation) {
            this.setHideTimeout();
        }
        if (!this.closable && this.animation) {
            this.animationEnd.pipe(take(1))
                .subscribe(() => this.setHideTimeout());
        }
        if (this.animation) {
            this.animate(this.animation);
        }
    }
    typeClass() {
        return {
            'none': '',
            'success': 'k-notification-success',
            'warning': 'k-notification-warning',
            'error': 'k-notification-error',
            'info': 'k-notification-info'
        }[this.type.style];
    }
    typeIconClass() {
        return {
            'none': '',
            'success': 'k-i-success',
            'warning': 'k-i-warning',
            'error': 'k-i-error',
            'info': 'k-i-info'
        }[this.type.style];
    }
    onCloseClick() {
        clearTimeout(this.hideTimeout);
        this.hide();
    }
    hide(customComponent) {
        const elementHeight = getComputedStyle(this.element.nativeElement).height;
        if (this.animation && elementHeight) {
            this.animate(this.animation, true);
            this.animationEnd.subscribe(() => {
                this.emitClose(customComponent);
            });
            return;
        }
        this.emitClose(customComponent);
    }
    setHideTimeout() {
        const hideAfter = this.hideAfter || this.defaultHideAfter;
        this.hideTimeout = window.setTimeout(() => this.onCloseClick(), hideAfter);
    }
    emitClose(customComponent) {
        if (customComponent) {
            customComponent.destroy();
        }
        this.close.emit();
    }
    play(animation, animatedElement) {
        const factory = this.builder.build(animation);
        const element = this.element.nativeElement;
        this.renderer.addClass(element, 'k-notification-container-animating');
        let player = factory.create(animatedElement);
        player.onDone(() => {
            this.renderer.removeClass(element, 'k-notification-container-animating');
            this.animationEnd.emit();
            if (player) {
                player.destroy();
                player = null;
            }
        });
        player.play();
    }
    animate(animation, onclose) {
        const element = this.element.nativeElement;
        const duration = animation.duration;
        const height = element.offsetHeight;
        const generatedAnimation = animation.type === 'slide' ?
            this.slideAnimation(height, duration, onclose) :
            this.fadeAnimation(duration, onclose);
        this.play(generatedAnimation, element);
    }
    slideAnimation(height, duration, onclose) {
        return onclose ? slideCloseAnimation(height, duration) : slideAnimation(height, duration);
    }
    fadeAnimation(duration, onclose) {
        return onclose ? fadeCloseAnimation(duration) : fadeAnimation(duration);
    }
}
NotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-notification',
                template: `
    <ng-container kendoNotificationLocalizedMessages
        i18n-closeTitle="kendo.notification.closeTitle|The title of the close button"
        closeTitle="Close"
    >
    </ng-container>
    <div class="k-widget k-notification {{ notificationClasses() }}"
        [ngClass]="cssClass"
        [style.height.px]="height"
        [style.width.px]="width">
        <div class="k-notification-wrap">
            <span *ngIf="type && type.icon && type.style !== 'none'" class="k-icon" [ngClass]="typeIconClass()"></span>

            <div class="k-notification-content">
                <ng-template
                    [ngIf]="templateRef"
                    [ngTemplateOutlet]="templateRef">
                </ng-template>
                <ng-template
                    [ngIf]="templateString">
                    {{ templateString }}
                </ng-template>
                <ng-container #container></ng-container>
            </div>

            <a *ngIf="closable" class="k-icon k-i-close" [attr.title]="closeButtonTitle" (click)="onCloseClick()"></a>
        </div>
    </div>
  `,
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
NotificationComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: AnimationBuilder },
    { type: LocalizationService }
];
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

/**
 * @hidden
 *
 */
class NotificationContainerComponent {
    constructor(element, renderer, resolver) {
        this.element = element;
        this.renderer = renderer;
        this.resolver = resolver;
        this.id = '';
        this.notifications = [];
    }
    ngOnDestroy() {
        this.notifications.forEach((notification) => {
            if (notification.closeClickSubscription) {
                notification.closeClickSubscription.unsubscribe();
            }
        });
        this.notifications = [];
    }
    addNotification(settings) {
        this.position = settings.position;
        this.id = `${this.position.horizontal} ${this.position.vertical}`;
        const factory = this.resolver.resolveComponentFactory(NotificationComponent);
        const notificationRef = this.container.createComponent(factory);
        this.applySettings(notificationRef, settings);
        let customComponent = null;
        if (typeof settings.content === 'function') {
            const customFactory = this.resolver.resolveComponentFactory(settings.content);
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
            hide: () => notificationRef.instance.hide(customComponent),
            notification: notificationRef,
            content: customComponent || null
        };
    }
    hide(notificationRef) {
        const instance = notificationRef.instance;
        const index = this.notifications.indexOf(instance);
        this.notifications.splice(index, 1);
        if (instance.closeClickSubscription) {
            instance.closeClickSubscription.unsubscribe();
        }
        instance.templateRef = null;
        instance.templateString = null;
        notificationRef.destroy();
    }
    applyContainerWrap() {
        const value = this.position.horizontal === 'right' ? 'wrap-reverse' : 'wrap';
        this.renderer.setStyle(this.group.nativeElement, 'flex-wrap', value);
    }
    applySettings(notificationRef, settings) {
        const notification = notificationRef.instance;
        const content = settings.content;
        const animation = settings.animation || null;
        notification.closeClickSubscription = notification.close
            .subscribe(() => this.hide(notificationRef));
        if (typeof content === 'string') {
            notification.templateString = content;
        }
        if (content instanceof TemplateRef) {
            notification.templateRef = content;
        }
        notification.animation = animation;
        let type = settings.type;
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
    }
    applyAbsolutePosition(appendToContainer) {
        const appendTo = appendToContainer.element.nativeElement;
        const el = this.element.nativeElement.children[0];
        if (window.getComputedStyle(appendTo).position === 'static') {
            this.renderer.setStyle(appendTo, 'position', 'relative');
        }
        this.renderer.setStyle(el, 'position', 'absolute');
    }
    applyPosition() {
        const element = this.element.nativeElement.children[0];
        const elementHalfWidth = element.getBoundingClientRect().width / 2;
        const positionStyles = this.setContainerPosition(this.position, elementHalfWidth);
        Object.keys(positionStyles).forEach((cssStyle) => {
            element.style[cssStyle] = positionStyles[cssStyle];
        });
    }
    setContainerPosition(position, offsetMargin) {
        const positionLayout = {
            horizontal: {
                left: { left: 0, alignItems: 'flex-start' },
                right: { right: 0, alignItems: 'flex-start' },
                center: { left: '50%', marginLeft: `${-offsetMargin}px`, alignItems: 'center' }
            },
            vertical: {
                top: { top: 0 },
                bottom: { bottom: 0 }
            }
        };
        const horizontal = positionLayout.horizontal[position.horizontal];
        const vertical = positionLayout.vertical[position.vertical];
        return Object.assign({}, horizontal, vertical);
    }
}
NotificationContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-notification-container',
                template: `
    <div #group class="k-notification-group">
        <ng-container #container></ng-container>
    </div>
  `
            },] },
];
/** @nocollapse */
NotificationContainerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ComponentFactoryResolver }
];
NotificationContainerComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef, static: true },] }],
    group: [{ type: ViewChild, args: ['group', { static: true },] }],
    id: [{ type: Input }]
};

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
const NOTIFICATION_CONTAINER = new InjectionToken('Notification Container');
/**
 * A service for opening Notification components dynamically
 * ([see example]({% slug overview_notification %})).
 *
 * @export
 * @class NotificationService
 */
class NotificationService {
    /**
     * @hidden
     */
    constructor(resolver, injector, container) {
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
    show(settings) {
        if (!settings) {
            throw new Error('NotificationSettings settings are required');
        }
        let target = this.findGroupContainer(settings);
        const position = settings.position || this.position;
        const currentId = `${position.horizontal} ${position.vertical}`;
        let container;
        let notificationRef;
        let notificationContainer = this.notificationContainers.find(c => target.nativeElement.contains(c.element.nativeElement) && c.id === currentId);
        if (!notificationContainer) {
            container = this.resolver
                .resolveComponentFactory(NotificationContainerComponent)
                .create(this.injector);
            notificationContainer = container.instance;
            this.appRef.attachView(container.hostView);
            const hostViewElement = container.location.nativeElement;
            let groupContainer = this.findGroupContainer(settings);
            if (!groupContainer) {
                throw new Error(`
                    View Container not found! Inject the NOTIFICATION_CONTAINER or define a specific ViewContainerRef via
                    the appendTo option. See http://www.telerik.com/kendo-angular-ui/components/notification/api/NOTIFICATION_CONTAINER/
                    for more details.
                `);
            }
            groupContainer.nativeElement.appendChild(hostViewElement);
            this.notificationContainers.push(notificationContainer);
        }
        settings.position = position;
        notificationRef = notificationContainer.addNotification(settings);
        return notificationRef;
    }
    get appRef() {
        if (!this.applicationRef) {
            this.applicationRef = this.injector.get(ApplicationRef);
        }
        return this.applicationRef;
    }
    findGroupContainer(settings) {
        let container;
        if (settings.appendTo) {
            container = settings.appendTo.element;
        }
        else if (this.container) {
            container = this.container;
        }
        else {
            const appRoot = this.appRef.components && this.appRef.components[0];
            container = appRoot ? appRoot.location : null;
        }
        return container;
    }
}
NotificationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NotificationService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ElementRef, decorators: [{ type: Inject, args: [NOTIFICATION_CONTAINER,] }, { type: Optional }] }
];

/**
 * @hidden
 */
class LocalizedMessagesDirective extends ComponentMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: ComponentMessages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: `[kendoNotificationLocalizedMessages]`
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
LocalizedMessagesDirective.propDecorators = {
    closeTitle: [{ type: Input }]
};

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
class NotificationModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { LocalizedMessagesDirective, NotificationContainerComponent, NotificationSettings, NotificationComponent, NotificationService, NOTIFICATION_CONTAINER, NotificationModule };
