/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var NotificationSettings = /** @class */ (function () {
    function NotificationSettings() {
        /**
         * Specifies the time in milliseconds after which the
         * Notification will hide
         * ([see example]({% slug hiding_notifications %}#toc-definig-a-delay-before-hiding)).
         * Defaults to `5000`.
         */
        this.hideAfter = 5000;
        /**
         * Defines the position of the Notification
         * ([see example]({% slug positioning_notification %})).
         *
         * The possible values are:
         * * `horizontal: 'left'|'center'|'right'`
         * * `vertical: 'top'|'bottom'`
         */
        this.position = { horizontal: 'right', vertical: 'top' };
        /**
         * Specifies the animation settings of the Notification
         * ([see example]({% slug animations_notification %})).
         *
         * The possible values are:
         * * `duration`&mdash;Accepts a number in milliseconds. Defaults to `500ms`.
         * * `type?: 'slide'| (Default) 'fade'`
         */
        this.animation = { type: 'fade', duration: 500 };
        /**
         * Specifies if the Notification will require a user action to hide.
         * If the property is set to `true`, the Notification renders a **Close** button
         * ([see example]({% slug hiding_notifications %}#toc-defining-a-closable-notification)).
         *
         * The possible values are:
         * * (Default) `false`
         * * `true`
         */
        this.closable = false;
        /**
         * Specifies the type of the Notification
         * ([see example]({% slug types_notification %})).
         *
         * The possible values are:
         * * `style: (Default) 'none'|'success'|'error'|'warning'|'info'`
         * * `icon: 'true'|'false'`
         */
        this.type = { style: 'none', icon: true };
    }
    return NotificationSettings;
}());
export { NotificationSettings };
