/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var notification_service_1 = require("./services/notification.service");
var notification_component_1 = require("./notification.component");
var notification_container_component_1 = require("./notification.container.component");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
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
        { type: core_1.NgModule, args: [{
                    declarations: [notification_component_1.NotificationComponent, notification_container_component_1.NotificationContainerComponent, localized_messages_directive_1.LocalizedMessagesDirective],
                    entryComponents: [notification_component_1.NotificationComponent, notification_container_component_1.NotificationContainerComponent],
                    imports: [common_1.CommonModule],
                    exports: [notification_component_1.NotificationComponent, notification_container_component_1.NotificationContainerComponent],
                    providers: [notification_service_1.NotificationService]
                },] },
    ];
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
