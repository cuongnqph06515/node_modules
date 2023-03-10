/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropDownListModule, AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { PopupModule } from "@progress/kendo-angular-popup";
import { SharedModule } from '../shared.module';
import { FilterCellOperatorsComponent } from './cell/filter-cell-operators.component';
import { FilterInputDirective } from './filter-input.directive';
import { ContainsFilterOperatorComponent } from './operators/contains-filter-operator.component';
import { DoesNotContainFilterOperatorComponent } from './operators/not-contains-filter-operator.component';
import { EndsWithFilterOperatorComponent } from './operators/ends-with-filter-operator.component';
import { EqualFilterOperatorComponent } from './operators/eq-filter-operator.component';
import { IsEmptyFilterOperatorComponent } from './operators/is-empty-filter-operator.component';
import { IsNotEmptyFilterOperatorComponent } from './operators/is-not-empty-filter-operator.component';
import { IsNotNullFilterOperatorComponent } from './operators/is-not-null-filter-operator.component';
import { IsNullFilterOperatorComponent } from './operators/isnull-filter-operator.component';
import { NotEqualFilterOperatorComponent } from './operators/neq-filter-operator.component';
import { StartsWithFilterOperatorComponent } from './operators/starts-with-filter-operator.component';
import { GreaterFilterOperatorComponent } from './operators/gt-filter-operator.component';
import { GreaterOrEqualToFilterOperatorComponent } from './operators/gte-filter-operator.component';
import { LessFilterOperatorComponent } from './operators/lt-filter-operator.component';
import { LessOrEqualToFilterOperatorComponent } from './operators/lte-filter-operator.component';
import { AfterFilterOperatorComponent } from './operators/after-filter-operator.component';
import { AfterEqFilterOperatorComponent } from './operators/after-eq-filter-operator.component';
import { BeforeEqFilterOperatorComponent } from './operators/before-eq-filter-operator.component';
import { BeforeFilterOperatorComponent } from './operators/before-filter-operator.component';
const FILTER_OPERATORS = [
    FilterCellOperatorsComponent,
    ContainsFilterOperatorComponent,
    DoesNotContainFilterOperatorComponent,
    EndsWithFilterOperatorComponent,
    EqualFilterOperatorComponent,
    IsEmptyFilterOperatorComponent,
    IsNotEmptyFilterOperatorComponent,
    IsNotNullFilterOperatorComponent,
    IsNullFilterOperatorComponent,
    NotEqualFilterOperatorComponent,
    StartsWithFilterOperatorComponent,
    GreaterFilterOperatorComponent,
    GreaterOrEqualToFilterOperatorComponent,
    LessFilterOperatorComponent,
    LessOrEqualToFilterOperatorComponent,
    AfterFilterOperatorComponent,
    AfterEqFilterOperatorComponent,
    BeforeEqFilterOperatorComponent,
    BeforeFilterOperatorComponent
];
const importedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownListModule,
    AutoCompleteModule,
    InputsModule,
    DatePickerModule,
    PopupModule,
    SharedModule
];
const COMPONENTS = [
    FilterInputDirective
];
/**
 * @hidden
 */
export class SharedFilterModule {
    static exports() {
        return [
            ...FILTER_OPERATORS
        ];
    }
}
SharedFilterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FILTER_OPERATORS, COMPONENTS],
                exports: [FILTER_OPERATORS, importedModules, COMPONENTS],
                imports: [...importedModules]
            },] },
];
