/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, Renderer2, ViewChild, TemplateRef } from '@angular/core';
import { NotificationComponent } from './notification.component';
/**
 * @hidden
 *
 */
export class NotificationContainerComponent {
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
