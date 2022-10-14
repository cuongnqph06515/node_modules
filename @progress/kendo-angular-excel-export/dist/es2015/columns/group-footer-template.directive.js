/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-footer-template)).
 * Enables you to customize the group footer cell of the column.
 */
let GroupFooterTemplateDirective = class GroupFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
GroupFooterTemplateDirective = tslib_1.__decorate([
    Directive({
        selector: '[kendoExcelExportGroupFooterTemplate]'
    }),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [TemplateRef])
], GroupFooterTemplateDirective);
export { GroupFooterTemplateDirective };
