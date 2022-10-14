/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var group_header_template_directive_1 = require("./group-header-template.directive");
var group_header_column_template_directive_1 = require("./group-header-column-template.directive");
var group_footer_template_directive_1 = require("./group-footer-template.directive");
var footer_template_directive_1 = require("./footer-template.directive");
var column_base_1 = require("./column-base");
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
var ColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        return _super.call(this, parent) || this;
    }
    ColumnComponent_1 = ColumnComponent;
    var ColumnComponent_1;
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], ColumnComponent.prototype, "field", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ColumnComponent.prototype, "cellOptions", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ColumnComponent.prototype, "groupHeaderCellOptions", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ColumnComponent.prototype, "groupFooterCellOptions", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ColumnComponent.prototype, "footerCellOptions", void 0);
    tslib_1.__decorate([
        core_1.ContentChild(group_header_template_directive_1.GroupHeaderTemplateDirective, { static: false }),
        tslib_1.__metadata("design:type", group_header_template_directive_1.GroupHeaderTemplateDirective)
    ], ColumnComponent.prototype, "groupHeaderTemplate", void 0);
    tslib_1.__decorate([
        core_1.ContentChild(group_header_column_template_directive_1.GroupHeaderColumnTemplateDirective, { static: false }),
        tslib_1.__metadata("design:type", group_header_column_template_directive_1.GroupHeaderColumnTemplateDirective)
    ], ColumnComponent.prototype, "groupHeaderColumnTemplate", void 0);
    tslib_1.__decorate([
        core_1.ContentChild(group_footer_template_directive_1.GroupFooterTemplateDirective, { static: false }),
        tslib_1.__metadata("design:type", group_footer_template_directive_1.GroupFooterTemplateDirective)
    ], ColumnComponent.prototype, "groupFooterTemplate", void 0);
    tslib_1.__decorate([
        core_1.ContentChild(footer_template_directive_1.FooterTemplateDirective, { static: false }),
        tslib_1.__metadata("design:type", footer_template_directive_1.FooterTemplateDirective)
    ], ColumnComponent.prototype, "footerTemplate", void 0);
    ColumnComponent = ColumnComponent_1 = tslib_1.__decorate([
        core_1.Component({
            providers: [
                {
                    provide: column_base_1.ColumnBase,
                    useExisting: core_1.forwardRef(function () { return ColumnComponent_1; }) // tslint:disable-line:no-forward-ref
                }
            ],
            selector: 'kendo-excelexport-column',
            template: ""
        }),
        tslib_1.__param(0, core_1.SkipSelf()), tslib_1.__param(0, core_1.Host()), tslib_1.__param(0, core_1.Optional()),
        tslib_1.__metadata("design:paramtypes", [column_base_1.ColumnBase])
    ], ColumnComponent);
    return ColumnComponent;
}(column_base_1.ColumnBase));
exports.ColumnComponent = ColumnComponent;
