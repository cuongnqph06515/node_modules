/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var list_component_1 = require("./list.component");
var focusable_directive_1 = require("./../focusable/focusable.directive");
var button_item_template_directive_1 = require("./button-item-template.directive");
var template_context_directive_1 = require("./template-context.directive");
var EXPORTED_DIRECTIVES = [
    list_component_1.ListComponent,
    focusable_directive_1.FocusableDirective,
    button_item_template_directive_1.ButtonItemTemplateDirective,
    template_context_directive_1.TemplateContextDirective
];
/**
 * @hidden
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [EXPORTED_DIRECTIVES],
                    exports: [EXPORTED_DIRECTIVES],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return ListModule;
}());
exports.ListModule = ListModule;
