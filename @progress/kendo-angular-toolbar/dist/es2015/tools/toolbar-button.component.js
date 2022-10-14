/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, forwardRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { isChanged } from '@progress/kendo-angular-common';
import { Button } from '@progress/kendo-angular-buttons';
import { SingleFocusableNavigationService } from '../navigation/single-focusable-navigation.service';
import { getValueForLocation } from '../util';
/**
 * Represents the [Kendo UI ToolBar Button tool for Angular]({% slug controltypes_toolbar %}#toc-buttons).
 */
export class ToolBarButtonComponent extends ToolBarToolComponent {
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
         * Provides visual styling that indicates if the Button is active
         * ([see example]({% slug controltypes_toolbar %}#toc-toggle-buttons)).
         * By default, `toggleable` is set to `false`.
         */
        this.toggleable = false;
        /**
         * Adds visual weight to the Button and makes it primary
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Sets the selected state of the Button.
         */
        this.selected = false;
        /**
         * Fires each time the Button is clicked.
         */
        this.click = new EventEmitter();
        /**
         * Fires each time the selected state of a Toggle Button is changed.
         * The event argument is the new selected state (Boolean).
         */
        this.selectedChange = new EventEmitter();
        this.internalState = { selected: undefined };
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
        this.navigationService = new SingleFocusableNavigationService();
    }
    /**
     * Specifies the text of the Button ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     */
    set text(text) {
        this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
        this.overflowOptions.text = getValueForLocation(text, this.showText, true);
    }
    /**
     * @hidden
     */
    get togglable() {
        return this.toggleable;
    }
    set togglable(value) {
        this.toggleable = value;
    }
    /**
     * Defines the name for an existing icon in a Kendo UI theme
     * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    set icon(icon) {
        this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
        this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
    }
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    set iconClass(iconClass) {
        this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
        this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
    }
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    set imageUrl(imageUrl) {
        this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
        this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
    }
    ngOnChanges(changes) {
        if (isChanged('selected', changes)) {
            this.internalState.selected = this.selected;
        }
    }
    selectedChangeHandler(state) {
        this.internalState.selected = state;
        this.selectedChange.emit(state);
    }
}
ToolBarButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarButton',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarButtonComponent) }],
                selector: 'kendo-toolbar-button',
                template: `
        <ng-template #toolbarTemplate>
            <button
                #toolbarButton
                tabindex="-1"
                type="button"
                kendoButton
                [ngStyle]="style"
                [ngClass]="className"
                [attr.title]="title"
                [disabled]="disabled"
                [toggleable]="toggleable"
                [primary]="primary"
                [selected]="internalState.selected"
                [icon]="toolbarOptions.icon"
                [iconClass]="toolbarOptions.iconClass"
                [imageUrl]="toolbarOptions.imageUrl"
                [look]="look"
                (click)="click.emit($event)"
                (selectedChange)="selectedChangeHandler($event)"
            >
                {{ toolbarOptions.text }}
            </button>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                #overflowButton
                tabindex="-1"
                type="button"
                kendoButton
                class="k-overflow-button"
                [ngStyle]="style"
                [ngClass]="className"
                [attr.title]="title"
                [disabled]="disabled"
                [toggleable]="toggleable"
                [primary]="primary"
                [selected]="internalState.selected"
                [icon]="overflowOptions.icon"
                [iconClass]="overflowOptions.iconClass"
                [imageUrl]="overflowOptions.imageUrl"
                [look]="look"
                (click)="click.emit($event)"
                (selectedChange)="selectedChangeHandler($event)"
            >
                {{ overflowOptions.text }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarButtonComponent.ctorParameters = () => [];
ToolBarButtonComponent.propDecorators = {
    showText: [{ type: Input }],
    showIcon: [{ type: Input }],
    text: [{ type: Input }],
    style: [{ type: Input }],
    className: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    toggleable: [{ type: Input }],
    togglable: [{ type: Input }],
    primary: [{ type: Input }],
    look: [{ type: Input }],
    selected: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    click: [{ type: Output }],
    selectedChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    button: [{ type: ViewChild, args: ['toolbarButton', { read: Button },] }]
};
