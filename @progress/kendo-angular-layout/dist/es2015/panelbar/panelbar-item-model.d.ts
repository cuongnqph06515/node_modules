/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the items model of the PanelBar. These are the interface fields that the PanelBar items use.
 */
export interface PanelBarItemModel {
    /**
     * Sets the title of the PanelBar item.
     */
    title: string;
    /**
     * Allows the component to set the `"id"` property of each item.
     */
    id: string;
    /**
     * Defines the icon that will be rendered next to the title.
     */
    icon: string;
    /**
     * Defines the icon that will be rendered next to the title by using a custom CSS class.
     */
    iconClass: string;
    /**
     * Defines the location of the image that will be displayed next to the title.
     */
    imageUrl: string;
    /**
     * When set to `true`, disables a PanelBar item.
     */
    disabled: boolean;
    /**
     * When set to `true`, expands the PanelBar item.
     */
    expanded: boolean;
    /**
     * Sets the focused state of a PanelBar item.
     */
    focused: boolean;
    /**
     * Sets the selected state of a PanelBar item.
     */
    selected: boolean;
    /**
     * Specifies if the item will be hidden.
     */
    hidden?: boolean;
    /**
     * Defines the child items as an array.
     */
    children: Array<PanelBarItemModel>;
    /**
     * Sets the content of the PanelBar item.
     */
    content: any;
}
