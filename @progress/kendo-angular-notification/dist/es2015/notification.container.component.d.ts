/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, ComponentFactoryResolver, ViewContainerRef, OnDestroy, Renderer2, ComponentRef } from '@angular/core';
import { NotificationSettings } from './models/notification-settings';
import { NotificationComponent } from './notification.component';
import { NotificationRef } from './models/notification-ref';
/**
 * @hidden
 *
 */
export declare class NotificationContainerComponent implements OnDestroy {
    element: ElementRef;
    renderer: Renderer2;
    private resolver;
    container: ViewContainerRef;
    group: ElementRef;
    id: string;
    notifications: NotificationComponent[];
    private position;
    constructor(element: ElementRef, renderer: Renderer2, resolver: ComponentFactoryResolver);
    ngOnDestroy(): void;
    addNotification(settings: NotificationSettings): NotificationRef;
    hide(notificationRef: ComponentRef<NotificationComponent>): void;
    private applyContainerWrap;
    private applySettings;
    private applyAbsolutePosition;
    private applyPosition;
    private setContainerPosition;
}
