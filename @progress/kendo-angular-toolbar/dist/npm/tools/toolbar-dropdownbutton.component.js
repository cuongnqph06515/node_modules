/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var toolbar_tool_component_1 = require("./toolbar-tool.component");
var dropdown_button_navigation_service_1 = require("../navigation/dropdown-button-navigation.service");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var util_1 = require("../util");
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
        return _this;
    }
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "text", {
        /**
         * Sets the text of the DropDownButton
         * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
         */
        set: function (text) {
            this.toolbarOptions.text = util_1.getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = util_1.getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "icon", {
        /**
         * Defines an icon that will be rendered next to the button text.
         */
        set: function (icon) {
            this.toolbarOptions.icon = util_1.getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = util_1.getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "iconClass", {
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
    Object.defineProperty(ToolBarDropDownButtonComponent.prototype, "imageUrl", {
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
        this.navigationService = new dropdown_button_navigation_service_1.DropdownButtonNavigationService(this.dropdwonButtonComponent);
    };
    ToolBarDropDownButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoToolBarDropDownButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: toolbar_tool_component_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return ToolBarDropDownButtonComponent; }) }],
                    selector: 'kendo-toolbar-dropdownbutton',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-dropdownbutton\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [disabled]=\"disabled\"\n                [tabIndex]=\"tabIndex\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [popupSettings]=\"popupSettings\"\n                (itemClick)=\"itemClick.emit($event)\"\n            >\n                {{ toolbarOptions.text }}\n            </kendo-dropdownbutton>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                type=\"button\"\n                tabindex=\"-1\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [disabled]=\"true\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n                (click)=\"itemClick.emit($event)\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n            <kendo-toolbar-buttonlist [data]=\"data\" [textField]=\"textField\" (itemClick)=\"itemClick.emit($event)\">\n            </kendo-toolbar-buttonlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarDropDownButtonComponent.ctorParameters = function () { return []; };
    ToolBarDropDownButtonComponent.propDecorators = {
        showText: [{ type: core_1.Input }],
        showIcon: [{ type: core_1.Input }],
        text: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        imageUrl: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        itemClick: [{ type: core_1.Output }],
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        dropdownButton: [{ type: core_1.ViewChild, args: ['dropdownButton', { read: core_1.ElementRef },] }],
        dropdwonButtonComponent: [{ type: core_1.ViewChild, args: [kendo_angular_buttons_1.DropDownButtonComponent,] }]
    };
    return ToolBarDropDownButtonComponent;
}(toolbar_tool_component_1.ToolBarToolComponent));
exports.ToolBarDropDownButtonComponent = ToolBarDropDownButtonComponent;
