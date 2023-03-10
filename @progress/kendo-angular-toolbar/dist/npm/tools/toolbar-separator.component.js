/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var toolbar_tool_component_1 = require("./toolbar-tool.component");
var tool_navigation_service_1 = require("../navigation/tool-navigation.service");
/**
 * Represents the [Kendo UI ToolBar Separator for Angular]({% slug controltypes_toolbar %}#toc-separators).
 */
var ToolBarSeparatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarSeparatorComponent, _super);
    function ToolBarSeparatorComponent() {
        var _this = _super.call(this) || this;
        _this.navigationService = new tool_navigation_service_1.ToolNavigationService();
        return _this;
    }
    ToolBarSeparatorComponent.prototype.ngAfterViewInit = function () {
        if (!this.popupTemplate) {
            this.popupTemplate = this.toolbarTemplate;
        }
    };
    ToolBarSeparatorComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoToolBarSeparator',
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: toolbar_tool_component_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return ToolBarSeparatorComponent; }) }],
                    selector: 'kendo-toolbar-separator',
                    template: "\n        <ng-template #toolbarTemplate>\n            <div class=\"k-separator\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarSeparatorComponent.ctorParameters = function () { return []; };
    ToolBarSeparatorComponent.propDecorators = {
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        separator: [{ type: core_1.ViewChild, args: ['separator',] }]
    };
    return ToolBarSeparatorComponent;
}(toolbar_tool_component_1.ToolBarToolComponent));
exports.ToolBarSeparatorComponent = ToolBarSeparatorComponent;
