/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, forwardRef, ViewChild, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { DropdownButtonNavigationService } from '../navigation/dropdown-button-navigation.service';
import { DropDownButtonComponent } from '@progress/kendo-angular-buttons';
import { getValueForLocation } from '../util';
/**
 * Represents the [Kendo UI ToolBar DropDownButton for Angular]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
 */
var ToolBarDropDownButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarDropDownButtonComponent, _super);
    function ToolBarDropDownButtonComponent() {
        var _this = _super.call(this) || this;
        // showText and showIcon showIcon should be declared first
        /**
         * Defines the location of the button text that will be displayed.
         */
        _this.showText = 'both';
        /**
         * Defines the location of the button icon that will be displayed.
         */
        _this.showIcon = 'both';
        /**
         * Fires each time the user clicks a DropDownButton item.
         * The event data contains the data item that is bound to the clicked list item.
         */
        _this.itemClick = new EventEmitter();
        _this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        _this._popupSettings = { animate: true, popupClass: '' };
        return _this;
    }
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "text", {
        /**
         * Sets the text of the DropDownButton
         * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
         */
        set: function (text) {
            this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "icon", {
        /**
         * Defines an icon that will be rendered next to the button text.
         */
        set: function (icon) {
            this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "iconClass", {
        /**
         * Defines an icon with a custom CSS class that will be rendered next to the button text.
         */
        set: function (iconClass) {
            this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "imageUrl", {
        /**
         * Defines the location of an image that will be displayed next to the button text.
         */
        set: function (imageUrl) {
            this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownButton.
         *
         * The available options are:
         * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.data = [];
            }
            return this._data;
        },
        /**
         * Sets the data of the DropDownButton
         * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons)).
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    ToolBarDropDownButtonComponent.prototype.ngAfterViewInit = function () {
        this.navigationService = new DropdownButtonNavigationService(this.dropdwonButtonComponent);
    };
    ToolBarDropDownButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarDropDownButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarDropDownButtonComponent; }) }],
                    selector: 'kendo-toolbar-dropdownbutton',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-dropdownbutton\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"tabIndex\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [popupSettings]=\"popupSettings\"\n                (itemClick)=\"itemClick.emit($event)\"\n            >\n                {{ toolbarOptions.text }}\n            </kendo-dropdownbutton>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                type=\"button\"\n                tabindex=\"-1\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [disabled]=\"true\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n                (click)=\"itemClick.emit($event)\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n            <kendo-toolbar-buttonlist [data]=\"data\" [textField]=\"textField\" (itemClick)=\"itemClick.emit($event)\">\n            </kendo-toolbar-buttonlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarDropDownButtonComponent.ctorParameters = function () { return []; };
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
    return ToolBarDropDownButtonComponent;
}(ToolBarToolComponent));
export { ToolBarDropDownButtonComponent };
