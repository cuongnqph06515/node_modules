/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Position } from './position';
import { Animation } from './animation';
import { Type } from './type';
export declare class NotificationSettings {
    /**
     * Defines the content of the Notification.
     */
    content: string | TemplateRef<any> | Function;
    /**
     * Specifies the time in milliseconds after which the
     * Notification will hide
     * ([see example]({% slug hiding_notifications %}#toc-definig-a-delay-before-hiding)).
     * Defaults to `5000`.
     */
    hideAfter?: number;
    /**
     * Defines the position of the Notification
     * ([see example]({% slug positioning_notification %})).
     *
     * The possible values are:
     * * `horizontal: 'left'|'center'|'right'`
     * * `vertical: 'top'|'bottom'`
     */
    position?: Position;
    /**
     * Specifies the animation settings of the Notification
     * ([see example]({% slug animations_notification %})).
     *
     * The possible values are:
     * * `duration`&mdash;Accepts a number in milliseconds. Defaults to `500ms`.
     * * `type?: 'slide'| (Default) 'fade'`
     */
    animation?: Animation;
    /**
     * Specifies if the Notification will require a user action to hide.
     * If the property is set to `true`, the Notification renders a **Close** button
     * ([see example]({% slug hiding_notifications %}#toc-defining-a-closable-notification)).
     *
     * The possible values are:
     * * (Default) `false`
     * * `true`
     */
    closable?: boolean;
    /**
     * Specifies the title of the close button.
     */
    closeTitle?: string;
    /**
     * Specifies the type of the Notification
     * ([see example]({% slug types_notification %})).
     *
     * The possible values are:
     * * `style: (Default) 'none'|'success'|'error'|'warning'|'info'`
     * * `icon: 'true'|'false'`
     */
    type?: Type;
    /**
     * Specifies the width of the Notification.
     */
    width?: number;
    /**
     * Specifies the height of the Notification.
     */
    height?: number;
    /**
     * Specifies a list of CSS classes that will be added to the Notification.
     * To apply CSS rules to the component, set `encapsulation` to `ViewEncapsulation.None`
     * ([see example]({% slug overview_notification %}#-toc-basic-example)).
     *
     * > To style the content of the Notification, use the `cssClass` property binding.
     */
    cssClass?: string | Array<string> | Object;
    /**
     * Defines the container to which the Notification will be appended
     * ([see example]({% slug dynamic_containers %})).
     *
     * If not provided, the Notification will be placed in the root component
     * of the application or in the `body` element of the document.
     */
    appendTo?: ViewContainerRef;
}
