/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification.container.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
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
export class NotificationModule {
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
