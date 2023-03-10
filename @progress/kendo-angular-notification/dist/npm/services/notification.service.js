/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var notification_container_component_1 = require("../notification.container.component");
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
exports.NOTIFICATION_CONTAINER = new core_1.InjectionToken('Notification Container');
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
                .resolveComponentFactory(notification_container_component_1.NotificationContainerComponent)
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
                this.applicationRef = this.injector.get(core_1.ApplicationRef);
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver },
        { type: core_1.Injector },
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [exports.NOTIFICATION_CONTAINER,] }, { type: core_1.Optional }] }
    ]; };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
