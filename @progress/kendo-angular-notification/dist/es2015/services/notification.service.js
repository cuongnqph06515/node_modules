/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, InjectionToken, ElementRef, Inject, Optional } from '@angular/core';
import { NotificationContainerComponent } from '../notification.container.component';
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
export const NOTIFICATION_CONTAINER = new InjectionToken('Notification Container');
/**
 * A service for opening Notification components dynamically
 * ([see example]({% slug overview_notification %})).
 *
 * @export
 * @class NotificationService
 */
export class NotificationService {
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
