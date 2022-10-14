/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Specifies the Notification type
 * ([see example]({% slug types_notification %})).
 *
 * The possible values are:
 * * `style: (Default) 'none'|'success'|'error'|'warning'|'info'`
 * * `icon?: (Default) 'true'|'false'`
 */
export declare type Type = {
    style?: 'none' | 'success' | 'warning' | 'error' | 'info';
    icon?: boolean;
};
