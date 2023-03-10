/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export const DRAWER_LINK_SELECTOR = '.k-drawer-link';
/**
 * @hidden
 */
export const ACTIVE_NESTED_LINK_SELECTOR = ':focus:not(.k-state-disabled) .k-drawer-link';
/**
 * @hidden
 */
export const nestedLink = (element, selector) => element.querySelector(selector);
