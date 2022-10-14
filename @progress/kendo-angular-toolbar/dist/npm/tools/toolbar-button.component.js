/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var toolbar_tool_component_1 = require("./toolbar-tool.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var single_focusable_navigation_service_1 = require("../navigation/single-focusable-navigation.service");
var util_1 = require("../util");
/**
 * Represents the [Kendo UI ToolBar Button tool for Angular]({% slug controltypes_toolbar %}#toc-buttons).
 */
var ToolBarButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarButtonComponent, _super);
    function ToolBarButtonComponent() {
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
         * Provides visual styling that indicates if the Button is active
         * ([see example]({% slug controltypes_toolbar %}#toc-toggle-buttons)).
         * By default, `toggleable` is set to `false`.
         */
        _this.toggleable = false;
        /**
         * Adds visual weight to the Button and makes it primary
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        _this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        /**
         * Sets the selected state of the Button.
         */
        _this.selected = false;
        /**
         * Fires each time the Button is clicked.
         */
        _this.click = new core_1.EventEmitter();
        /**
         * Fires each time the selected state of a Toggle Button is changed.
         * The event argument is the new selected state (Boolean).
         */
        _this.selectedChange = new core_1.EventEmitter();
        _this.internalState = { selected: undefined };
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
        _this.navigationService = new single_focusable_navigation_service_1.SingleFocusableNavigationService();
        return _this;
    }
    Object.defineProperty(ToolBarButtonComponent.prototype, "text", {
        /**
         * Specifies the text of the Button ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        set: function (text) {
            this.toolbarOptions.text = util_1.getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = util_1.getValueForLocation(text, this.showText, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "togglable", {
        /**
         * @hidden
         */
        get: function () {
            return this.toggleable;
        },
        set: function (value) {
            this.toggleable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "icon", {
        /**
         * Defines the name for an existing icon in a Kendo UI theme
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         * The icon is rendered inside the Button by a `span.k-icon` element.
         */
        set: function (icon) {
            this.toolbarOptions.icon = util_1.getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = util_1.getValueForLocation(icon, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "iconClass", {
        /**
         * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
         * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
         */
        set: function (iconClass) {
            this.toolbarOptions.iconClass = util_1.getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = util_1.getValueForLocation(iconClass, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarButtonComponent.prototype, "imageUrl", {
        /**
         * Defines a URL which is used for an `img` element inside the Button.
         * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
         */
        set: function (imageUrl) {
            this.toolbarOptions.imageUrl = util_1.getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = util_1.getValueForLocation(imageUrl, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    ToolBarButtonComponent.prototype.ngOnChanges = function (changes) {
        if (kendo_angular_common_1.isChanged('selected', changes)) {
            this.internalState.selected = this.selected;
        }
    };
    ToolBarButtonComponent.prototype.selectedChangeHandler = function (state) {
        this.internalState.selected = state;
        this.selectedChange.emit(state);
    };
    ToolBarButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoToolBarButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: toolbar_tool_component_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return ToolBarButtonComponent; }) }],
                    selector: 'kendo-toolbar-button',
                    template: "\n        <ng-template #toolbarTemplate>\n            <button\n                #toolbarButton\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                [ngStyle]=\"style\"\n                [ngClass]=\"className\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [toggleable]=\"toggleable\"\n                [primary]=\"primary\"\n                [selected]=\"internalState.selected\"\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [look]=\"look\"\n                (click)=\"click.emit($event)\"\n                (selectedChange)=\"selectedChangeHandler($event)\"\n            >\n                {{ toolbarOptions.text }}\n            </button>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                #overflowButton\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [ngStyle]=\"style\"\n                [ngClass]=\"className\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [toggleable]=\"toggleable\"\n                [primary]=\"primary\"\n                [selected]=\"internalState.selected\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n                [look]=\"look\"\n                (click)=\"click.emit($event)\"\n                (selectedChange)=\"selectedChangeHandler($event)\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarButtonComponent.ctorParameters = function () { return []; };
    ToolBarButtonComponent.propDecorators = {
        showText: [{ type: core_1.Input }],
        showIcon: [{ type: core_1.Input }],
        text: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        className: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        toggleable: [{ type: core_1.Input }],
        togglable: [{ type: core_1.Input }],
        primary: [{ type: core_1.Input }],
        look: [{ type: core_1.Input }],
        selected: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        imageUrl: [{ type: core_1.Input }],
        click: [{ type: core_1.Output }],
        selectedChange: [{ type: core_1.Output }],
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        button: [{ type: core_1.ViewChild, args: ['toolbarButton', { read: kendo_angular_buttons_1.Button },] }]
    };
    return ToolBarButtonComponent;
}(toolbar_tool_component_1.ToolBarToolComponent));
exports.ToolBarButtonComponent = ToolBarButtonComponent;
