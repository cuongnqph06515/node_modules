/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommandColumnComponent } from '../columns/command-column.component';
import { CheckboxColumnComponent } from '../columns/checkbox-column.component';
import { SelectionCheckboxDirective } from '../selection/selection-checkbox.directive';
import { CellTemplateDirective } from './cell-template.directive';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { TableBodyComponent } from './table-body.component';
import { CellComponent } from './cell.component';
import { EditCommandDirective } from '../editing/edit-command.directive';
import { CancelCommandDirective } from '../editing/cancel-command.directive';
import { SaveCommandDirective } from '../editing/save-command.directive';
import { RemoveCommandDirective } from '../editing/remove-command.directive';
import { AddCommandDirective } from '../editing/add-command.directive';
import { SharedModule } from "../shared.module";
import { GroupModule } from "../grouping/group.module";
import { NumericTextBoxModule } from "@progress/kendo-angular-inputs";
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
const exported = [
    CommandColumnComponent,
    CheckboxColumnComponent,
    SelectionCheckboxDirective,
    CellTemplateDirective,
    EditTemplateDirective,
    TableBodyComponent,
    NoRecordsTemplateDirective,
    CellComponent,
    EditCommandDirective,
    CancelCommandDirective,
    SaveCommandDirective,
    RemoveCommandDirective,
    AddCommandDirective
];
const importedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GroupModule,
    NumericTextBoxModule,
    DatePickerModule
];
/**
 * @hidden
 */
export class BodyModule {
    static exports() {
        return [
            CommandColumnComponent,
            CheckboxColumnComponent,
            SelectionCheckboxDirective,
            CellTemplateDirective,
            NoRecordsTemplateDirective,
            EditTemplateDirective,
            EditCommandDirective,
            CancelCommandDirective,
            SaveCommandDirective,
            RemoveCommandDirective,
            AddCommandDirective
        ];
    }
}
BodyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exported],
                exports: [exported],
                imports: [...importedModules]
            },] },
];
