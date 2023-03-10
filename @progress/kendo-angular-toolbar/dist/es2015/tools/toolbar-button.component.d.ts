/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, EventEmitter, OnChanges } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { ButtonLook, Button } from '@progress/kendo-angular-buttons';
import { DisplayMode } from '../display-mode';
import { ToolNavigation } from '../navigation/tool-navigation.interface';
import { ToolOptions } from '../tool-options';
/**
 * Represents the [Kendo UI ToolBar Button tool for Angular]({% slug controltypes_toolbar %}#toc-buttons).
 */
export declare class ToolBarButtonComponent extends ToolBarToolComponent implements OnChanges {
    /**
     * Specifies where button text should be displayed
     */
    showText: DisplayMode;
    /**
     * Specifies where button icon should be displayed
     */
    showIcon: DisplayMode;
    /**
     * Specifies the text of the Button ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     */
    text: string;
    /**
     * Specifies custom inline CSS styles of the Button.
     */
    style: {
        [key: string]: string | number;
    };
    /**
     * Specifies custom CSS class names that will be added to the Button.
     */
    className: string | Array<string> | {
        [key: string]: boolean;
    };
    /**
     * Specifies the title of the Button.
     */
    title: string;
    /**
     * If `disabled` is set to `true`, the Button is disabled
     * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     */
    disabled: boolean;
    /**
     * Provides visual styling that indicates if the Button is active
     * ([see example]({% slug controltypes_toolbar %}#toc-toggle-buttons)).
     * By default, `toggleable` is set to `false`.
     */
    toggleable: boolean;
    /**
     * @hidden
     */
    togglable: boolean;
    /**
     * Adds visual weight to the Button and makes it primary
     * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     */
    primary: boolean;
    /**
     * Changes the visual appearance by using alternative styling options
     * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     *
     * The available values are:
     * * `bare`
     * * `flat`
     * * `outline`
     */
    look: ButtonLook;
    /**
     * Sets the selected state of the Button.
     */
    selected: boolean;
    /**
     * Defines the name for an existing icon in a Kendo UI theme
     * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    icon: string;
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    iconClass: string;
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    imageUrl: string;
    /**
     * Fires each time the Button is clicked.
     */
    click: EventEmitter<any>;
    /**
     * Fires each time the selected state of a Toggle Button is changed.
     * The event argument is the new selected state (Boolean).
     */
    selectedChange: EventEmitter<any>;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    button: Button;
    internalState: {
        selected: boolean;
    };
    navigationService: ToolNavigation;
    toolbarOptions: ToolOptions;
    overflowOptions: ToolOptions;
    constructor();
    ngOnChanges(changes: any): void;
    selectedChangeHandler(state: boolean): void;
}
