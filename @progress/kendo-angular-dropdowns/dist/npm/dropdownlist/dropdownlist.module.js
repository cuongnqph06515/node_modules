/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dropdownlist_component_1 = require("./dropdownlist.component");
var value_template_directive_1 = require("../common/templates/value-template.directive");
var filter_input_directive_1 = require("./filter-input.directive");
var shared_module_1 = require("../common/shared.module");
var shared_directives_module_1 = require("../common/shared-directives.module");
var DROPDOWNLIST_DIRECTIVES = [
    dropdownlist_component_1.DropDownListComponent,
    value_template_directive_1.ValueTemplateDirective,
    filter_input_directive_1.FilterInputDirective
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `DropDownListComponent`&mdash;The DropDownList component class.
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `ValueTemplateDirective`&mdash;The value template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 */
var DropDownListModule = /** @class */ (function () {
    function DropDownListModule() {
    }
    DropDownListModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [DROPDOWNLIST_DIRECTIVES],
                    exports: [DROPDOWNLIST_DIRECTIVES, shared_directives_module_1.SharedDirectivesModule],
                    imports: [shared_module_1.SharedModule]
                },] },
    ];
    return DropDownListModule;
}());
exports.DropDownListModule = DropDownListModule;
