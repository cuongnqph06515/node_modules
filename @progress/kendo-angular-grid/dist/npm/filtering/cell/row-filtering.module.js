/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var filter_row_component_1 = require("../filter-row.component");
var filter_cell_component_1 = require("./filter-cell.component");
var filter_cell_template_directive_1 = require("./filter-cell-template.directive");
var numeric_filter_cell_component_1 = require("./numeric-filter-cell.component");
var filter_cell_wrapper_component_1 = require("./filter-cell-wrapper.component");
var string_filter_cell_component_1 = require("./string-filter-cell.component");
var filter_cell_operators_component_1 = require("./filter-cell-operators.component");
var autocomplete_filter_cell_component_1 = require("./autocomplete-filter-cell.component");
var boolean_filter_cell_component_1 = require("./boolean-filter-cell.component");
var date_filter_cell_component_1 = require("./date-filter-cell.component");
var shared_filtering_module_1 = require("../shared-filtering.module");
var filter_cell_host_directive_1 = require("./filter-cell-host.directive");
var INTERNAL_COMPONENTS = [
    filter_row_component_1.FilterRowComponent,
    filter_cell_component_1.FilterCellComponent,
    filter_cell_template_directive_1.FilterCellTemplateDirective,
    string_filter_cell_component_1.StringFilterCellComponent,
    numeric_filter_cell_component_1.NumericFilterCellComponent,
    autocomplete_filter_cell_component_1.AutoCompleteFilterCellComponent,
    boolean_filter_cell_component_1.BooleanFilterCellComponent,
    filter_cell_host_directive_1.FilterCellHostDirective,
    filter_cell_wrapper_component_1.FilterCellWrapperComponent,
    date_filter_cell_component_1.DateFilterCellComponent
];
var ENTRY_COMPONENTS = [
    string_filter_cell_component_1.StringFilterCellComponent,
    numeric_filter_cell_component_1.NumericFilterCellComponent,
    boolean_filter_cell_component_1.BooleanFilterCellComponent,
    date_filter_cell_component_1.DateFilterCellComponent
];
/**
 * @hidden
 */
var RowFilterModule = /** @class */ (function () {
    function RowFilterModule() {
    }
    RowFilterModule.exports = function () {
        return [
            filter_row_component_1.FilterRowComponent,
            filter_cell_component_1.FilterCellComponent,
            filter_cell_template_directive_1.FilterCellTemplateDirective,
            filter_cell_operators_component_1.FilterCellOperatorsComponent,
            string_filter_cell_component_1.StringFilterCellComponent,
            numeric_filter_cell_component_1.NumericFilterCellComponent,
            autocomplete_filter_cell_component_1.AutoCompleteFilterCellComponent,
            boolean_filter_cell_component_1.BooleanFilterCellComponent,
            date_filter_cell_component_1.DateFilterCellComponent,
            shared_filtering_module_1.SharedFilterModule.exports()
        ];
    };
    RowFilterModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS],
                    entryComponents: ENTRY_COMPONENTS,
                    exports: [INTERNAL_COMPONENTS, shared_filtering_module_1.SharedFilterModule],
                    imports: [shared_filtering_module_1.SharedFilterModule]
                },] },
    ];
    return RowFilterModule;
}());
exports.RowFilterModule = RowFilterModule;
