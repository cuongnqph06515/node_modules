/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Specifies the animation settings of the Notification
 * ([see example]({% slug animations_notification %})).
 *
 * The possible values are:
 * `duration`&mdash;Accepts a number in milliseconds (default: 500ms).
 * `type?: 'slide'|'fade' (default)`
 */
export declare type Animation = {
    duration: number;
    type?: 'slide' | 'fade';
};
