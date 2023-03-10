/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grid_component_1 = require("../../grid.component");
/**
 * @hidden
 */
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(grid) {
        this.grid = grid;
        this.context = {};
    }
    Object.defineProperty(ToolbarComponent.prototype, "classNames", {
        get: function () {
            return 'k-header k-grid-toolbar';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarComponent.prototype, "position", {
        set: function (value) {
            this.context.position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarComponent.prototype, "toolbarTemplateRef", {
        get: function () {
            return this.grid.toolbarTemplate ? this.grid.toolbarTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-toolbar',
                    template: "\n        <ng-template\n            *ngIf=\"toolbarTemplateRef\"\n            [ngTemplateOutlet]=\"toolbarTemplateRef\"\n            [ngTemplateOutletContext]=\"context\"\n            >\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return [
        { type: grid_component_1.GridComponent }
    ]; };
    ToolbarComponent.propDecorators = {
        classNames: [{ type: core_1.HostBinding, args: ['class',] }],
        position: [{ type: core_1.Input }]
    };
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
