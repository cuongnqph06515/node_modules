/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { FilterRowComponent } from '../filter-row.component';
import { FilterCellComponent } from './filter-cell.component';
import { FilterCellTemplateDirective } from './filter-cell-template.directive';
import { NumericFilterCellComponent } from './numeric-filter-cell.component';
import { FilterCellWrapperComponent } from './filter-cell-wrapper.component';
import { StringFilterCellComponent } from './string-filter-cell.component';
import { FilterCellOperatorsComponent } from './filter-cell-operators.component';
import { AutoCompleteFilterCellComponent } from './autocomplete-filter-cell.component';
import { BooleanFilterCellComponent } from './boolean-filter-cell.component';
import { DateFilterCellComponent } from './date-filter-cell.component';
import { SharedFilterModule } from '../shared-filtering.module';
import { FilterCellHostDirective } from './filter-cell-host.directive';
const INTERNAL_COMPONENTS = [
    FilterRowComponent,
    FilterCellComponent,
    FilterCellTemplateDirective,
    StringFilterCellComponent,
    NumericFilterCellComponent,
    AutoCompleteFilterCellComponent,
    BooleanFilterCellComponent,
    FilterCellHostDirective,
    FilterCellWrapperComponent,
    DateFilterCellComponent
];
const ENTRY_COMPONENTS = [
    StringFilterCellComponent,
    NumericFilterCellComponent,
    BooleanFilterCellComponent,
    DateFilterCellComponent
];
/**
 * @hidden
 */
export class RowFilterModule {
    static exports() {
        return [
            FilterRowComponent,
            FilterCellComponent,
            FilterCellTemplateDirective,
            FilterCellOperatorsComponent,
            StringFilterCellComponent,
            NumericFilterCellComponent,
            AutoCompleteFilterCellComponent,
            BooleanFilterCellComponent,
            DateFilterCellComponent,
            SharedFilterModule.exports()
        ];
    }
}
RowFilterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [INTERNAL_COMPONENTS],
                entryComponents: ENTRY_COMPONENTS,
                exports: [INTERNAL_COMPONENTS, SharedFilterModule],
                imports: [SharedFilterModule]
            },] },
];
