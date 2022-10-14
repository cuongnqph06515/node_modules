/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { PopupSettings } from '../popup-settings';
import { DisplayMode } from '../display-mode';
import { ToolOptions } from '../tool-options';
/**
 * Represents the [Kendo UI ToolBar SplitButton for Angular]({% slug controltypes_toolbar %}#toc-splitbuttons).
 */
export declare class ToolBarSplitButtonComponent extends ToolBarToolComponent {
    /**
     * Specifies where button text should be displayed
     */
    showText: DisplayMode;
    /**
     * Specifies where button icon should be displayed
     */
    showIcon: DisplayMode;
    /**
     * Sets the text of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons).
     */
    text: string;
    /**
     * Defines the icon that will be rendered next to the button text
     * ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
     */
    icon: string;
    /**
     * Defines an icon with a custom CSS class that will be rendered next to the button text.
     */
    iconClass: string;
    /**
     * Defines the location of an image that will be displayed next to the button text.
     */
    imageUrl: string;
    /**
     * When set to `true`, disables a SplitButton item.
     */
    disabled: boolean;
    /**
     * Configures the popup of the SplitButton.
     *
     * The available options are:
     * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Configures the text field of the button-list popup.
     */
    textField: string;
    /**
     * Sets the data of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
     *
     * > The data has to be provided in an array-like list.
     */
    data: any[];
    /**
     * Fires each time the user clicks the main button.
     */
    buttonClick: EventEmitter<any>;
    /**
     * Fires each time the user clicks the drop-down list.
     * The event data contains the data item that is bound to the clicked list item.
     */
    itemClick: EventEmitter<any>;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    splitButton: ElementRef;
    toolbarOptions: ToolOptions;
    overflowOptions: ToolOptions;
    private _data;
    private _popupSettings;
    constructor();
}
