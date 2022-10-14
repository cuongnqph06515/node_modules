/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, forwardRef, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { SingleFocusableNavigationService } from '../navigation/single-focusable-navigation.service';
import { getValueForLocation } from '../util';
/**
 * Represents the [Kendo UI ToolBar SplitButton for Angular]({% slug controltypes_toolbar %}#toc-splitbuttons).
 */
export class ToolBarSplitButtonComponent extends ToolBarToolComponent {
    constructor() {
        super();
        // showText and showIcon showIcon should be declared first
        /**
         * Specifies where button text should be displayed
         */
        this.showText = 'both';
        /**
         * Specifies where button icon should be displayed
         */
        this.showIcon = 'both';
        /**
         * Configures the text field of the button-list popup.
         */
        this.textField = 'text';
        /**
         * Fires each time the user clicks the main button.
         */
        this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks the drop-down list.
         * The event data contains the data item that is bound to the clicked list item.
         */
        this.itemClick = new EventEmitter();
        this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this._popupSettings = { animate: true, popupClass: '' };
        this.navigationService = new SingleFocusableNavigationService();
    }
    /**
     * Sets the text of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons).
     */
    set text(text) {
        this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
        this.overflowOptions.text = getValueForLocation(text, this.showText, true);
    }
    /**
     * Defines the icon that will be rendered next to the button text
     * ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
     */
    set icon(icon) {
        this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
        this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
    }
    /**
     * Defines an icon with a custom CSS class that will be rendered next to the button text.
     */
    set iconClass(iconClass) {
        this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
        this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
    }
    /**
     * Defines the location of an image that will be displayed next to the button text.
     */
    set imageUrl(imageUrl) {
        this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
        this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
    }
    /**
     * Configures the popup of the SplitButton.
     *
     * The available options are:
     * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(value) {
        this._popupSettings = value;
    }
    get popupSettings() {
        if (!this._popupSettings) {
            this._popupSettings = { animate: true, popupClass: '' };
        }
        return this._popupSettings;
    }
    /**
     * Sets the data of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        if (!this._data) {
            this.data = [];
        }
        return this._data;
    }
}
ToolBarSplitButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarSplitButton',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarSplitButtonComponent) }],
                selector: 'kendo-toolbar-splitbutton',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-splitbutton
                [data]="data"
                [text]="toolbarOptions.text"
                [icon]="toolbarOptions.icon"
                [iconClass]="toolbarOptions.iconClass"
                [imageUrl]="toolbarOptions.imageUrl"
                [disabled]="disabled"
                [tabIndex]="tabIndex"
                [textField]="textField"
                [popupSettings]="popupSettings"
                (buttonClick)="buttonClick.emit($event)"
                (itemClick)="itemClick.emit($event)"
            >
            </kendo-splitbutton>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                type="button"
                tabindex="-1"
                kendoButton
                class="k-overflow-button"
                [disabled]="disabled"
                [icon]="overflowOptions.icon"
                [iconClass]="overflowOptions.iconClass"
                [imageUrl]="overflowOptions.imageUrl"
            >
                {{ overflowOptions.text }}
            </button>
            <kendo-toolbar-buttonlist [data]="data" [textField]="textField" (itemClick)="itemClick.emit($event)">
            </kendo-toolbar-buttonlist>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarSplitButtonComponent.ctorParameters = () => [];
ToolBarSplitButtonComponent.propDecorators = {
    showText: [{ type: Input }],
    showIcon: [{ type: Input }],
    text: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    disabled: [{ type: Input }],
    popupSettings: [{ type: Input }],
    textField: [{ type: Input }],
    data: [{ type: Input }],
    buttonClick: [{ type: Output }],
    itemClick: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    splitButton: [{ type: ViewChild, args: ['splitButton', { read: ElementRef },] }]
};
