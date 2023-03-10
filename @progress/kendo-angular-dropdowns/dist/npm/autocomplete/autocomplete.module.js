/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var autocomplete_component_1 = require("./autocomplete.component");
var shared_module_1 = require("../common/shared.module");
var shared_directives_module_1 = require("../common/shared-directives.module");
var AUTOCOMPLETE_DIRECTIVES = [
    autocomplete_component_1.AutoCompleteComponent
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `AutoCompleteComponent`&mdash;The AutoComplete component class.
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 */
var AutoCompleteModule = /** @class */ (function () {
    function AutoCompleteModule() {
    }
    AutoCompleteModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [AUTOCOMPLETE_DIRECTIVES],
                    exports: [AUTOCOMPLETE_DIRECTIVES, shared_directives_module_1.SharedDirectivesModule],
                    imports: [shared_module_1.SharedModule]
                },] },
    ];
    return AutoCompleteModule;
}());
exports.AutoCompleteModule = AutoCompleteModule;
