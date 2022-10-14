/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentRef } from '@angular/core';
import { NotificationComponent } from '../main';
import { Observable } from 'rxjs';
/**
 * Holds references to the object instance of the Notification.
 * Controls the Notifications which are opened through `NotificationService`.
 * For an example on sample usage, refer to the
 * [`NotificationService.show`]({% slug api_notification_notificationservice %}#toc-show) method.
 */
export interface NotificationRef {
    /**
     * Notifies when the Notification instance is hidden and the hiding animation ends.
     */
    afterHide?: Observable<any>;
    /**
     * A reference to the Notification instance.
     */
    notification?: ComponentRef<NotificationComponent>;
    /**
     * A reference to the child component of the Notification.
     * Available when the Notification is shown with
     * [`content`]({% slug content_notification %}#toc-rendering-a-component).
     */
    content?: ComponentRef<any>;
    /**
     * Hides and destroys the Notification.
     */
    hide: Function;
}
