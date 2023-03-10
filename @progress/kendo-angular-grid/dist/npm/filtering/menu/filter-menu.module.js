/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var filter_menu_component_1 = require("./filter-menu.component");
var filter_menu_container_component_1 = require("./filter-menu-container.component");
var filter_menu_input_wrapper_component_1 = require("./filter-menu-input-wrapper.component");
var string_filter_menu_input_component_1 = require("./string-filter-menu-input.component");
var string_filter_menu_component_1 = require("./string-filter-menu.component");
var shared_filtering_module_1 = require("../shared-filtering.module");
var filter_menu_template_directive_1 = require("./filter-menu-template.directive");
var numeric_filter_menu_component_1 = require("./numeric-filter-menu.component");
var numeric_filter_menu_input_component_1 = require("./numeric-filter-menu-input.component");
var filter_menu_host_directive_1 = require("./filter-menu-host.directive");
var date_filter_menu_input_component_1 = require("./date-filter-menu-input.component");
var date_filter_menu_component_1 = require("./date-filter-menu.component");
var boolean_filter_menu_component_1 = require("./boolean-filter-menu.component");
var INTERNAL_COMPONENTS = [
    filter_menu_component_1.FilterMenuComponent,
    filter_menu_container_component_1.FilterMenuContainerComponent,
    filter_menu_input_wrapper_component_1.FilterMenuInputWrapperComponent,
    string_filter_menu_input_component_1.StringFilterMenuInputComponent,
    string_filter_menu_component_1.StringFilterMenuComponent,
    filter_menu_template_directive_1.FilterMenuTemplateDirective,
    numeric_filter_menu_component_1.NumericFilterMenuComponent,
    numeric_filter_menu_input_component_1.NumericFilterMenuInputComponent,
    date_filter_menu_input_component_1.DateFilterMenuInputComponent,
    date_filter_menu_component_1.DateFilterMenuComponent,
    filter_menu_host_directive_1.FilterMenuHostDirective,
    boolean_filter_menu_component_1.BooleanFilterMenuComponent
];
var ENTRY_COMPONENTS = [
    string_filter_menu_component_1.StringFilterMenuComponent,
    numeric_filter_menu_component_1.NumericFilterMenuComponent,
    date_filter_menu_component_1.DateFilterMenuComponent,
    boolean_filter_menu_component_1.BooleanFilterMenuComponent
];
/**
 * @hidden
 */
var FilterMenuModule = /** @class */ (function () {
    function FilterMenuModule() {
    }
    FilterMenuModule.exports = function () {
        return [
            string_filter_menu_component_1.StringFilterMenuComponent,
            filter_menu_template_directive_1.FilterMenuTemplateDirective,
            numeric_filter_menu_component_1.NumericFilterMenuComponent,
            date_filter_menu_component_1.DateFilterMenuComponent,
            boolean_filter_menu_component_1.BooleanFilterMenuComponent,
            shared_filtering_module_1.SharedFilterModule.exports()
        ];
    };
    FilterMenuModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS],
                    entryComponents: ENTRY_COMPONENTS,
                    exports: [INTERNAL_COMPONENTS, shared_filtering_module_1.SharedFilterModule],
                    imports: [shared_filtering_module_1.SharedFilterModule]
                },] },
    ];
    return FilterMenuModule;
}());
exports.FilterMenuModule = FilterMenuModule;
