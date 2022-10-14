/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var toolbar_tool_component_1 = require("./toolbar-tool.component");
/**
 * @hidden
 */
var ToolBarButtonListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolBarButtonListComponent, _super);
    function ToolBarButtonListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemClick = new core_1.EventEmitter();
        return _this;
    }
    ToolBarButtonListComponent.prototype.getText = function (dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    };
    ToolBarButtonListComponent.prototype.onClick = function (item) {
        var dataItem = this.data[this.data.indexOf(item)];
        if (item.click) {
            item.click(dataItem);
        }
        this.itemClick.emit(dataItem);
    };
    ToolBarButtonListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-toolbar-buttonlist',
                    template: "\n        <button\n            type=\"button\"\n            tabindex=\"-1\"\n            kendoButton\n            style=\"padding-left: 16px\"\n            class=\"k-overflow-button\"\n            *ngFor=\"let item of data\"\n            [disabled]=\"item.disabled\"\n            [icon]=\"item.icon\"\n            [iconClass]=\"item.iconClass\"\n            [imageUrl]=\"item.imageUrl\"\n            (click)=\"onClick(item)\"\n        >\n            {{ getText(item) }}\n        </button>\n    "
                },] },
    ];
    ToolBarButtonListComponent.propDecorators = {
        data: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        itemClick: [{ type: core_1.Output }]
    };
    return ToolBarButtonListComponent;
}(toolbar_tool_component_1.ToolBarToolComponent));
exports.ToolBarButtonListComponent = ToolBarButtonListComponent;
