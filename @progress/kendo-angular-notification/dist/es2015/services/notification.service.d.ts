/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentFactoryResolver, Injector, InjectionToken, ElementRef } from '@angular/core';
import { NotificationSettings } from '../models/notification-settings';
import { NotificationRef } from '../models/notification-ref';
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
export declare const NOTIFICATION_CONTAINER: InjectionToken<ElementRef<any>>;
/**
 * A service for opening Notification components dynamically
 * ([see example]({% slug overview_notification %})).
 *
 * @export
 * @class NotificationService
 */
export declare class NotificationService {
    private resolver;
    private injector;
    private container;
    private notificationContainers;
    private position;
    private applicationRef;
    /**
     * @hidden
     */
    constructor(resolver: ComponentFactoryResolver, injector: Injector, container: ElementRef);
    /**
     * Opens a Notification component. Created Notification are mounted
     * in the DOM directly in the root application component.
     *
     * @param {NotificationSettings} settings - The settings which define the Notification.
     *
     * @returns {NotificationRef} - A reference to the Notification object and the convenience properties.
     */
    show(settings: NotificationSettings): NotificationRef;
    private readonly appRef;
    private findGroupContainer;
}
