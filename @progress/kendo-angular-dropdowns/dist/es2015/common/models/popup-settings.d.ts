/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ViewContainerRef } from '@angular/core';
/**
 * Used for configuring the dimensions of the popup container.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownlist [data]="listItems" [popupSettings]="{ height: 300, width: 300 }">
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export interface PopupSettings {
    /**
     * Controls the popup animation. By default, the open and close animations are enabled.
     */
    animate?: boolean;
    /**
     * Controls the popup container. By default, the popup will be appended to the root component.
     */
    appendTo?: 'root' | 'component' | ViewContainerRef;
    /**
     * Specifies a list of CSS classes used for styling the popup.
     */
    popupClass?: string;
    /**
     * Sets the popup width. By default, it is equal to the width of the component. If set to `auto`, the component
     * automatically adjusts the width of the popup, so that the item labels are not wrapped.
     * The `auto` mode is not supported when virtual scrolling is enabled
     */
    width?: number | string;
    /**
     * Sets the maximum height of the popup.
     */
    height?: number;
}
