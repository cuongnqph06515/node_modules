/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, TemplateRef, Optional } from '@angular/core';
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
        Directive({
            selector: '[kendoExcelExportGroupHeaderTemplate]'
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [TemplateRef])
    ], GroupHeaderTemplateDirective);
    return GroupHeaderTemplateDirective;
}());
export { GroupHeaderTemplateDirective };
