/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group header column template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-column-template)).
 */
var GroupHeaderColumnTemplateDirective = /** @class */ (function () {
    function GroupHeaderColumnTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderColumnTemplateDirective = tslib_1.__decorate([
        Directive({
            selector: '[kendoExcelExportGroupHeaderColumnTemplate]'
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [TemplateRef])
    ], GroupHeaderColumnTemplateDirective);
    return GroupHeaderColumnTemplateDirective;
}());
export { GroupHeaderColumnTemplateDirective };
