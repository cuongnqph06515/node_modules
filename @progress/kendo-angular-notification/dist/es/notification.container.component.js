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
export { NotificationContainerComponent };
