/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, forwardRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { isChanged } from '@progress/kendo-angular-common';
import { Button } from '@progress/kendo-angular-buttons';
import { SingleFocusableNavigationService } from '../navigation/single-focusable-navigation.service';
import { getValueForLocation } from '../util';
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
        _this.click = new EventEmitter();
        /**
         * Fires each time the selected state of a Toggle Button is changed.
         * The event argument is the new selected state (Boolean).
         */
        _this.selectedChange = new EventEmitter();
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
        _this.navigationService = new SingleFocusableNavigationService();
        return _this;
    }
    Object.defineProperty(ToolBarButtonComponent.prototype, "text", {
        /**
         * Specifies the text of the Button ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        set: function (text) {
            this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
            this.overflowOptions.text = getValueForLocation(text, this.showText, true);
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
            this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
            this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
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
            this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
            this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
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
            this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
            this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
        },
        enumerable: true,
        configurable: true
    });
    ToolBarButtonComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('selected', changes)) {
            this.internalState.selected = this.selected;
        }
    };
    ToolBarButtonComponent.prototype.selectedChangeHandler = function (state) {
        this.internalState.selected = state;
        this.selectedChange.emit(state);
    };
    ToolBarButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarButton',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return ToolBarButtonComponent; }) }],
                    selector: 'kendo-toolbar-button',
                    template: "\n        <ng-template #toolbarTemplate>\n            <button\n                #toolbarButton\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                [ngStyle]=\"style\"\n                [ngClass]=\"className\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [toggleable]=\"toggleable\"\n                [primary]=\"primary\"\n                [selected]=\"internalState.selected\"\n                [icon]=\"toolbarOptions.icon\"\n                [iconClass]=\"toolbarOptions.iconClass\"\n                [imageUrl]=\"toolbarOptions.imageUrl\"\n                [look]=\"look\"\n                (click)=\"click.emit($event)\"\n                (selectedChange)=\"selectedChangeHandler($event)\"\n            >\n                {{ toolbarOptions.text }}\n            </button>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                #overflowButton\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [ngStyle]=\"style\"\n                [ngClass]=\"className\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [toggleable]=\"toggleable\"\n                [primary]=\"primary\"\n                [selected]=\"internalState.selected\"\n                [icon]=\"overflowOptions.icon\"\n                [iconClass]=\"overflowOptions.iconClass\"\n                [imageUrl]=\"overflowOptions.imageUrl\"\n                [look]=\"look\"\n                (click)=\"click.emit($event)\"\n                (selectedChange)=\"selectedChangeHandler($event)\"\n            >\n                {{ overflowOptions.text }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarButtonComponent.ctorParameters = function () { return []; };
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
    return ToolBarButtonComponent;
}(ToolBarToolComponent));
export { ToolBarButtonComponent };
