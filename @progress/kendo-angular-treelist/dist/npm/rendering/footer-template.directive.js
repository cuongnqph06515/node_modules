/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the column footer cell template of the TreeList
 * ([more information and example]({% slug templates_columns_treelist %}#toc-footer-template)).
 * Helps to customize the table footer cell for the column.
 * To define a footer template, nest an `<ng-template>` tag with the
 * [`kendoTreeListFooterTemplate`]({% slug api_treelist_footertemplatedirective %}) directive inside the `<kendo-treelist-column>` tag.
 *
 * The template context is set to the current column and the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_treelist_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 * * `aggregates`&mdash;The aggregates for the level items.
 *
 *
 * {% meta height:500 %}
 * {% embed_file configuration/footer-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var FooterTemplateDirective = /** @class */ (function () {
    function FooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FooterTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    FooterTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return FooterTemplateDirective;
}());
exports.FooterTemplateDirective = FooterTemplateDirective;
