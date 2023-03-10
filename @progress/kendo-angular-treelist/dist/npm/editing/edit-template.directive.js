/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the column edit-cell template of the TreeList ([see example]({% slug editing_template_forms_treelist %})).
 * Helps to customize the content of the edited cells. To define the cell template, nest an `<ng-template>`
 * tag with the `kendoTreeListEditTemplate` directive inside a `<kendo-treelist-column>` tag.
 *
 * The template context contains the following fields:
 * - `formGroup`&mdash;The current [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}).
 * If you use the TreeList inside [Template-Driven Forms]({{ site.data.urls.angular['forms'] }}), it will be `undefined`.
 * - `rowIndex`&mdash;The current row index. If inside a new item row, `rowIndex` is `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 */
var EditTemplateDirective = /** @class */ (function () {
    function EditTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    EditTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListEditTemplate]'
                },] },
    ];
    /** @nocollapse */
    EditTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return EditTemplateDirective;
}());
exports.EditTemplateDirective = EditTemplateDirective;
