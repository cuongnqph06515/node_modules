/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, forwardRef, ViewChild, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { DropdownButtonNavigationService } from '../navigation/dropdown-button-navigation.service';
import { DropDownButtonComponent } from '@progress/kendo-angular-buttons';
import { getValueForLocation } from '../util';
/**
 * Represents the [Kendo UI ToolBar DropDownButton for Angular]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
 */
export class ToolBarDropDownButtonComponent extends ToolBarToolComponent {
    constructor() {
        super();
        // showText and showIcon showIcon should be declared first
        /**
         * Defines the location of the button text that will be displayed.
         */
        this.showText = 'both';
        /**
         * Defines the location of the button icon that will be displayed.
         */
        this.showIcon = 'both';
        /**
         * Fires each time the user clicks a DropDownButton item.
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
    }
    /**
     * Sets the text of the DropDownButton
     * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
     */
    set text(text) {
        this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
        this.overflowOptions.text = getValueForLocation(text, this.showText, true);
    }
    /**
     * Defines an icon that will be rendered next to the button text.
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
     * Configures the popup of the DropDownButton.
     *
     * The available options are:
     * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Sets the data of the DropDownButton
     * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons)).
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
    ngAfterViewInit() {
        this.navigationService = new DropdownButtonNavigationService(this.dropdwonButtonComponent);
    }
}
ToolBarDropDownButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarDropDownButton',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarDropDownButtonComponent) }],
                selector: 'kendo-toolbar-dropdownbutton',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-dropdownbutton
                [icon]="toolbarOptions.icon"
                [iconClass]="toolbarOptions.iconClass"
                [imageUrl]="toolbarOptions.imageUrl"
                [disabled]="disabled"
                [tabIndex]="tabIndex"
                [data]="data"
                [textField]="textField"
                [popupSettings]="popupSettings"
                (itemClick)="itemClick.emit($event)"
            >
                {{ toolbarOptions.text }}
            </kendo-dropdownbutton>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                type="button"
                tabindex="-1"
                kendoButton
                class="k-overflow-button"
                [disabled]="true"
                [icon]="overflowOptions.icon"
                [iconClass]="overflowOptions.iconClass"
                [imageUrl]="overflowOptions.imageUrl"
                (click)="itemClick.emit($event)"
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
ToolBarDropDownButtonComponent.ctorParameters = () => [];
ToolBarDropDownButtonComponent.propDecorators = {
    showText: [{ type: Input }],
    showIcon: [{ type: Input }],
    text: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    popupSettings: [{ type: Input }],
    textField: [{ type: Input }],
    disabled: [{ type: Input }],
    data: [{ type: Input }],
    itemClick: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    dropdownButton: [{ type: ViewChild, args: ['dropdownButton', { read: ElementRef },] }],
    dropdwonButtonComponent: [{ type: ViewChild, args: [DropDownButtonComponent,] }]
};
