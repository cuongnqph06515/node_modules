/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
var ColumnComponent_1;
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { GroupHeaderTemplateDirective } from './group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from './group-header-column-template.directive';
import { GroupFooterTemplateDirective } from './group-footer-template.directive';
import { FooterTemplateDirective } from './footer-template.directive';
import { ColumnBase } from './column-base';
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
let ColumnComponent = ColumnComponent_1 = class ColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ColumnComponent.prototype, "field", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ColumnComponent.prototype, "cellOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ColumnComponent.prototype, "groupHeaderCellOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ColumnComponent.prototype, "groupFooterCellOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ColumnComponent.prototype, "footerCellOptions", void 0);
tslib_1.__decorate([
    ContentChild(GroupHeaderTemplateDirective, { static: false }),
    tslib_1.__metadata("design:type", GroupHeaderTemplateDirective)
], ColumnComponent.prototype, "groupHeaderTemplate", void 0);
tslib_1.__decorate([
    ContentChild(GroupHeaderColumnTemplateDirective, { static: false }),
    tslib_1.__metadata("design:type", GroupHeaderColumnTemplateDirective)
], ColumnComponent.prototype, "groupHeaderColumnTemplate", void 0);
tslib_1.__decorate([
    ContentChild(GroupFooterTemplateDirective, { static: false }),
    tslib_1.__metadata("design:type", GroupFooterTemplateDirective)
], ColumnComponent.prototype, "groupFooterTemplate", void 0);
tslib_1.__decorate([
    ContentChild(FooterTemplateDirective, { static: false }),
    tslib_1.__metadata("design:type", FooterTemplateDirective)
], ColumnComponent.prototype, "footerTemplate", void 0);
ColumnComponent = ColumnComponent_1 = tslib_1.__decorate([
    Component({
        providers: [
            {
                provide: ColumnBase,
                useExisting: forwardRef(() => ColumnComponent_1) // tslint:disable-line:no-forward-ref
            }
        ],
        selector: 'kendo-excelexport-column',
        template: ``
    }),
    tslib_1.__param(0, SkipSelf()), tslib_1.__param(0, Host()), tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ColumnBase])
], ColumnComponent);
export { ColumnComponent };
