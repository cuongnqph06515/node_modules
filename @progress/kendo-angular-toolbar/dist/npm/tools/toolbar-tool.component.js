/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tool_navigation_service_1 = require("../navigation/tool-navigation.service");
/**
 * Represents the Base ToolBar Tool component for Angular.
 * Extend this class to create custom tools.
 */
var ToolBarToolComponent = /** @class */ (function () {
    function ToolBarToolComponent() {
        this.tabIndex = -1; //Focus movement inside the toolbar is managed using roving tabindex.
        this.overflows = true;
        // this should be replaced with showTool: DisplayMode = 'both';
        /**
         * @hidden
         */
        this.responsive = true;
        if (!this.navigationService) {
            this.navigationService = new tool_navigation_service_1.ToolNavigationService();
        }
    }
    Object.defineProperty(ToolBarToolComponent.prototype, "toolbarDisplay", {
        get: function () {
            return this.overflows ? 'none' : 'inline-block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarToolComponent.prototype, "overflowDisplay", {
        get: function () {
            return this.overflows ? 'block' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    ToolBarToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'toolbar-tool',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ToolBarToolComponent.ctorParameters = function () { return []; };
    ToolBarToolComponent.propDecorators = {
        responsive: [{ type: core_1.Input }]
    };
    return ToolBarToolComponent;
}());
exports.ToolBarToolComponent = ToolBarToolComponent;
