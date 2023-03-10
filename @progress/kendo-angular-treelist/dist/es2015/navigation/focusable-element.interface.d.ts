/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export interface FocusableElement {
    /**
     * Focuses the element.
     */
    focus(): void;
    /**
     * Includes or excludes the element from the tab sequence.
     *
     * @param active If true, the element should receive a tabIndex of 0 (or greater). If false, the tabIndex should be set to -1.
     */
    toggle(active: boolean): void;
    /**
     * Returns true if the element can be focused at the moment, false otherwise.
     *
     * @returns true if the element can be focused at the moment, false otherwise.
     */
    canFocus(): boolean;
    /**
     * Focuses the element.
     */
    hasFocus(): boolean;
    /**
     * Returns true if the element can receive the focus during cursor navigation.
     *
     * For example, if a cell contains a single button, the focus should be placed directly on it.
     * This allows the user to activate the button directly with Enter.
     *
     * The focus will remain on the cell if it contains more than one navigable element.
     */
    isNavigable(): boolean;
}
