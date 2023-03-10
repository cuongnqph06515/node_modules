/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { FilterMenuComponent } from "./filter-menu.component";
import { FilterMenuContainerComponent } from "./filter-menu-container.component";
import { FilterMenuInputWrapperComponent } from "./filter-menu-input-wrapper.component";
import { StringFilterMenuInputComponent } from "./string-filter-menu-input.component";
import { StringFilterMenuComponent } from './string-filter-menu.component';
import { SharedFilterModule } from '../shared-filtering.module';
import { FilterMenuTemplateDirective } from './filter-menu-template.directive';
import { NumericFilterMenuComponent } from './numeric-filter-menu.component';
import { NumericFilterMenuInputComponent } from './numeric-filter-menu-input.component';
import { FilterMenuHostDirective } from './filter-menu-host.directive';
import { DateFilterMenuInputComponent } from './date-filter-menu-input.component';
import { DateFilterMenuComponent } from './date-filter-menu.component';
import { BooleanFilterMenuComponent } from './boolean-filter-menu.component';
var INTERNAL_COMPONENTS = [
    FilterMenuComponent,
    FilterMenuContainerComponent,
    FilterMenuInputWrapperComponent,
    StringFilterMenuInputComponent,
    StringFilterMenuComponent,
    FilterMenuTemplateDirective,
    NumericFilterMenuComponent,
    NumericFilterMenuInputComponent,
    DateFilterMenuInputComponent,
    DateFilterMenuComponent,
    FilterMenuHostDirective,
    BooleanFilterMenuComponent
];
var ENTRY_COMPONENTS = [
    StringFilterMenuComponent,
    NumericFilterMenuComponent,
    DateFilterMenuComponent,
    BooleanFilterMenuComponent
];
/**
 * @hidden
 */
var FilterMenuModule = /** @class */ (function () {
    function FilterMenuModule() {
    }
    FilterMenuModule.exports = function () {
        return [
            StringFilterMenuComponent,
            FilterMenuTemplateDirective,
            NumericFilterMenuComponent,
            DateFilterMenuComponent,
            BooleanFilterMenuComponent,
            SharedFilterModule.exports()
        ];
    };
    FilterMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS],
                    entryComponents: ENTRY_COMPONENTS,
                    exports: [INTERNAL_COMPONENTS, SharedFilterModule],
                    imports: [SharedFilterModule]
                },] },
    ];
    return FilterMenuModule;
}());
export { FilterMenuModule };
