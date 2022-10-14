/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { PopupSettings } from '../popup-settings';
import { DropDownButtonComponent } from '@progress/kendo-angular-buttons';
import { DisplayMode } from '../display-mode';
import { ToolOptions } from '../tool-options';
/**
 * Represents the [Kendo UI ToolBar DropDownButton for Angular]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
 */
export declare class ToolBarDropDownButtonComponent extends ToolBarToolComponent {
    /**
     * Defines the location of the button text that will be displayed.
     */
    showText: DisplayMode;
    /**
     * Defines the location of the button icon that will be displayed.
     */
    showIcon: DisplayMode;
    /**
     * Sets the text of the DropDownButton
     * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
     */
    text: string;
    /**
     * Defines an icon that will be rendered next to the button text.
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
     * Configures the popup of the DropDownButton.
     *
     * The available options are:
     * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets the data item field that represents the item text.
     * If the data contains only primitive values, do not define it.
     */
    textField: string;
    /**
     * Sets the disabled state of the DropDownButton.
     */
    disabled: boolean;
    /**
     * Sets the data of the DropDownButton
     * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons)).
     *
     * > The data has to be provided in an array-like list.
     */
    data: any[];
    /**
     * Fires each time the user clicks a DropDownButton item.
     * The event data contains the data item that is bound to the clicked list item.
     */
    itemClick: EventEmitter<any>;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    dropdownButton: ElementRef;
    dropdwonButtonComponent: DropDownButtonComponent;
    toolbarOptions: ToolOptions;
    overflowOptions: ToolOptions;
    private _data;
    private _popupSettings;
    constructor();
    ngAfterViewInit(): void;
}
