/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, forwardRef, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { SingleFocusableNavigationService } from '../navigation/single-focusable-navigation.service';
import { getValueForLocation } from '../util';
/**
 * Represents the [Kendo UI ToolBar SplitButton for Angular]({% slug controltypes_toolbar %}#toc-splitbuttons).
 */
var ToolBarSplitButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarSplitButtonComponent, _super);
    function ToolBarSplitButtonComponent() {
        var _this = _super.call(this) || this;
        // showText and showIcon showIcon should be declared first
        /**
         * Specifies where button text should be displayed
         */
        _this.showText = 'both';
        /**
         * Specifies where button icon should be displayed
         */
        _this.showIcon = 'both';
        /**
         * Configures the text field of the button-list popup.
         */
        _this.textField = 'text';
        /**
         * Fires each time the user clicks the main button.
         */
        _this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks the drop-down list.
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
        _this.navigationService = new SingleFocusableNavigationService();
        return _this;
    }
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "text", {
        /**
         * Sets the text of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons).
         */
        set: function (text) {
            this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "icon", {
        /**
         * Defines the icon that will be rendered next to the button text
         * ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
         */
        set: function (icon) {
            this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "iconClass", {
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
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "imageUrl", {
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
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "popupSettings", {
        get: function () {
            if (!this._popupSettings) {
                this._popupSettings = { animate: true, popupClass: '' };
            }
            return this._popupSettings;
        },
        /**
         * Configures the popup of the SplitButton.
         *
         * The available options are:
         * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (value) {
            this._popupSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.data = [];
            }
            return this._data;
        },
        /**
         * Sets the data of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    ToolBarSplitButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarSplitButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarSplitButtonComponent; }) }],
                    selector: 'kendo-toolbar-splitbutton',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-splitbutton\n                [data]=\"data\"\n                [text]=\"toolbarOptions.text\"\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"tabIndex\"\n                [textField]=\"textField\"\n                [popupSettings]=\"popupSettings\"\n                (buttonClick)=\"buttonClick.emit($event)\"\n                (itemClick)=\"itemClick.emit($event)\"\n            >\n            </kendo-splitbutton>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                type=\"button\"\n                tabindex=\"-1\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [disabled]=\"disabled\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n            <kendo-toolbar-buttonlist [data]=\"data\" [textField]=\"textField\" (itemClick)=\"itemClick.emit($event)\">\n            </kendo-toolbar-buttonlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarSplitButtonComponent.ctorParameters = function () { return []; };
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
    return ToolBarSplitButtonComponent;
}(ToolBarToolComponent));
export { ToolBarSplitButtonComponent };
