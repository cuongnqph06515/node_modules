/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
/**
 * Represents the group header cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-template)).
 * Enables you to customize the content of the group header item.
 */
var GroupHeaderTemplateDirective = /** @class */ (function () {
    function GroupHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderTemplateDirective = tslib_1.__decorate([
        core_1.Directive({
            selector: '[kendoExcelExportGroupHeaderTemplate]'
        }),
        tslib_1.__param(0, core_1.Optional()),
        tslib_1.__metadata("design:paramtypes", [core_1.TemplateRef])
    ], GroupHeaderTemplateDirective);
    return GroupHeaderTemplateDirective;
}());
exports.GroupHeaderTemplateDirective = GroupHeaderTemplateDirective;
