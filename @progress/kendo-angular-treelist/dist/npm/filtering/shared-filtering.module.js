/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var shared_module_1 = require("../shared.module");
var filter_cell_operators_component_1 = require("./cell/filter-cell-operators.component");
var filter_input_directive_1 = require("./filter-input.directive");
var contains_filter_operator_component_1 = require("./operators/contains-filter-operator.component");
var not_contains_filter_operator_component_1 = require("./operators/not-contains-filter-operator.component");
var ends_with_filter_operator_component_1 = require("./operators/ends-with-filter-operator.component");
var eq_filter_operator_component_1 = require("./operators/eq-filter-operator.component");
var is_empty_filter_operator_component_1 = require("./operators/is-empty-filter-operator.component");
var is_not_empty_filter_operator_component_1 = require("./operators/is-not-empty-filter-operator.component");
var is_not_null_filter_operator_component_1 = require("./operators/is-not-null-filter-operator.component");
var isnull_filter_operator_component_1 = require("./operators/isnull-filter-operator.component");
var neq_filter_operator_component_1 = require("./operators/neq-filter-operator.component");
var starts_with_filter_operator_component_1 = require("./operators/starts-with-filter-operator.component");
var gt_filter_operator_component_1 = require("./operators/gt-filter-operator.component");
var gte_filter_operator_component_1 = require("./operators/gte-filter-operator.component");
var lt_filter_operator_component_1 = require("./operators/lt-filter-operator.component");
var lte_filter_operator_component_1 = require("./operators/lte-filter-operator.component");
var after_filter_operator_component_1 = require("./operators/after-filter-operator.component");
var after_eq_filter_operator_component_1 = require("./operators/after-eq-filter-operator.component");
var before_eq_filter_operator_component_1 = require("./operators/before-eq-filter-operator.component");
var before_filter_operator_component_1 = require("./operators/before-filter-operator.component");
var FILTER_OPERATORS = [
    filter_cell_operators_component_1.FilterCellOperatorsComponent,
    contains_filter_operator_component_1.ContainsFilterOperatorComponent,
    not_contains_filter_operator_component_1.DoesNotContainFilterOperatorComponent,
    ends_with_filter_operator_component_1.EndsWithFilterOperatorComponent,
    eq_filter_operator_component_1.EqualFilterOperatorComponent,
    is_empty_filter_operator_component_1.IsEmptyFilterOperatorComponent,
    is_not_empty_filter_operator_component_1.IsNotEmptyFilterOperatorComponent,
    is_not_null_filter_operator_component_1.IsNotNullFilterOperatorComponent,
    isnull_filter_operator_component_1.IsNullFilterOperatorComponent,
    neq_filter_operator_component_1.NotEqualFilterOperatorComponent,
    starts_with_filter_operator_component_1.StartsWithFilterOperatorComponent,
    gt_filter_operator_component_1.GreaterFilterOperatorComponent,
    gte_filter_operator_component_1.GreaterOrEqualToFilterOperatorComponent,
    lt_filter_operator_component_1.LessFilterOperatorComponent,
    lte_filter_operator_component_1.LessOrEqualToFilterOperatorComponent,
    after_filter_operator_component_1.AfterFilterOperatorComponent,
    after_eq_filter_operator_component_1.AfterEqFilterOperatorComponent,
    before_eq_filter_operator_component_1.BeforeEqFilterOperatorComponent,
    before_filter_operator_component_1.BeforeFilterOperatorComponent
];
var importedModules = [
    common_1.CommonModule,
    forms_1.ReactiveFormsModule,
    forms_1.FormsModule,
    kendo_angular_dropdowns_1.DropDownListModule,
    kendo_angular_dropdowns_1.AutoCompleteModule,
    kendo_angular_inputs_1.InputsModule,
    kendo_angular_dateinputs_1.DatePickerModule,
    kendo_angular_popup_1.PopupModule,
    shared_module_1.SharedModule
];
var COMPONENTS = [
    filter_input_directive_1.FilterInputDirective
];
/**
 * @hidden
 */
var SharedFilterModule = /** @class */ (function () {
    function SharedFilterModule() {
    }
    SharedFilterModule.exports = function () {
        return FILTER_OPERATORS.slice();
    };
    SharedFilterModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [FILTER_OPERATORS, COMPONENTS],
                    exports: [FILTER_OPERATORS, importedModules, COMPONENTS],
                    imports: importedModules.slice()
                },] },
    ];
    return SharedFilterModule;
}());
exports.SharedFilterModule = SharedFilterModule;
