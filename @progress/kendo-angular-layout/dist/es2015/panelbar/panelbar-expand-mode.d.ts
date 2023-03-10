/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the expand modes of the PanelBar.
 * By default, the expand mode is set to `multiple`.
 */
export declare enum PanelBarExpandMode {
    /**
     * Allows you to expand only one item at a time.
     * When you expand an item, the item that was previously expanded is coll.
     */
    Single = 0,
    /**
     * Allows you to expand only one item at a time and requires you to set the `height` property.
     * The expanded area occupies the entire height of the PanelBar.
     */
    Full = 1,
    /**
     * The default mode of the PanelBar.
     * Allows you to expand more than one item at a time. Items can also be toggled.
     */
    Multiple = 2,
    /**
     * By default, the expand mode is set to `multiple`.
     */
    Default = 2
}
