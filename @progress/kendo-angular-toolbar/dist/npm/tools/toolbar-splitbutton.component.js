/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var toolbar_tool_component_1 = require("./toolbar-tool.component");
var single_focusable_navigation_service_1 = require("../navigation/single-focusable-navigation.service");
var util_1 = require("../util");
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
        _this.buttonClick = new core_1.EventEmitter();
        /**
         * Fires each time the user clicks the drop-down list.
         * The event data contains the data item that is bound to the clicked list item.
         */
        _this.itemClick = new core_1.EventEmitter();
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
        _this.navigationService = new single_focusable_navigation_service_1.SingleFocusableNavigationService();
        return _this;
    }
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "text", {
        /**
         * Sets the text of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons).
         */
        set: function (text) {
            this.toolbarOptions.text = util_1.getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = util_1.getValueForLocation(text, this.showText, true);
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
            this.toolbarOptions.icon = util_1.getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = util_1.getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "iconClass", {
        /**
         * Defines an icon with a custom CSS class that will be rendered next to the button text.
         */
        set: function (iconClass) {
            this.toolbarOptions.iconClass = util_1.getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = util_1.getValueForLocation(iconClass, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarSplitButtonComponent.prototype, "imageUrl", {
        /**
         * Defines the location of an image that will be displayed next to the button text.
         */
        set: function (imageUrl) {
            this.toolbarOptions.imageUrl = util_1.getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = util_1.getValueForLocation(imageUrl, this.showIcon, true);
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
        { type: core_1.Component, args: [{
                    exportAs: 'kendoToolBarSplitButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: toolbar_tool_component_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return ToolBarSplitButtonComponent; }) }],
                    selector: 'kendo-toolbar-splitbutton',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-splitbutton\n                [data]=\"data\"\n                [text]=\"toolbarOptions.text\"\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"tabIndex\"\n                [textField]=\"textField\"\n                [popupSettings]=\"popupSettings\"\n                (buttonClick)=\"buttonClick.emit($event)\"\n                (itemClick)=\"itemClick.emit($event)\"\n            >\n            </kendo-splitbutton>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                type=\"button\"\n                tabindex=\"-1\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [disabled]=\"disabled\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n            <kendo-toolbar-buttonlist [data]=\"data\" [textField]=\"textField\" (itemClick)=\"itemClick.emit($event)\">\n            </kendo-toolbar-buttonlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarSplitButtonComponent.ctorParameters = function () { return []; };
    ToolBarSplitButtonComponent.propDecorators = {
        showText: [{ type: core_1.Input }],
        showIcon: [{ type: core_1.Input }],
        text: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        imageUrl: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        buttonClick: [{ type: core_1.Output }],
        itemClick: [{ type: core_1.Output }],
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        splitButton: [{ type: core_1.ViewChild, args: ['splitButton', { read: core_1.ElementRef },] }]
    };
    return ToolBarSplitButtonComponent;
}(toolbar_tool_component_1.ToolBarToolComponent));
exports.ToolBarSplitButtonComponent = ToolBarSplitButtonComponent;
