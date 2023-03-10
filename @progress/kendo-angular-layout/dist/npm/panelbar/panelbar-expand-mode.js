/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the expand modes of the PanelBar.
 * By default, the expand mode is set to `multiple`.
 */
var PanelBarExpandMode;
(function (PanelBarExpandMode) {
    /**
     * Allows you to expand only one item at a time.
     * When you expand an item, the item that was previously expanded is coll.
     */
    PanelBarExpandMode[PanelBarExpandMode["Single"] = 0] = "Single";
    /**
     * Allows you to expand only one item at a time and requires you to set the `height` property.
     * The expanded area occupies the entire height of the PanelBar.
     */
    PanelBarExpandMode[PanelBarExpandMode["Full"] = 1] = "Full";
    /**
     * The default mode of the PanelBar.
     * Allows you to expand more than one item at a time. Items can also be toggled.
     */
    PanelBarExpandMode[PanelBarExpandMode["Multiple"] = 2] = "Multiple";
    /**
     * By default, the expand mode is set to `multiple`.
     */
    PanelBarExpandMode[PanelBarExpandMode["Default"] = 2] = "Default";
})(PanelBarExpandMode = exports.PanelBarExpandMode || (exports.PanelBarExpandMode = {}));
