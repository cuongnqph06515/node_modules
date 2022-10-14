/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ViewContainerRef } from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';
/**
 * Used for configuring the options of the popup container.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-toolbar [popupSettings]="{ animate: false }">
 *      <kendo-toolbar-button [text]="'my button'"></kendo-toolbar-button>
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent { }
 *
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
     * Specifies a list of CSS classes that are used for styling the popup.
     */
    popupClass?: string;
    /**
     * Specifies the anchor pivot point.
     */
    anchorAlign?: Align;
    /**
     * Specifies the pivot point of the popup.
     */
    popupAlign?: Align;
}
