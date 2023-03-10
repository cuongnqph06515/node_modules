/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { SearchBarComponent } from './searchbar.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ResizeSensorModule, EventsModule } from '@progress/kendo-angular-common';
import { SharedDirectivesModule } from './shared-directives.module';
import { ListItemDirective } from './list-item.directive';
import { SelectableDirective } from './selection/selectable.directive';
import { TemplateContextDirective } from './templates/template-context.directive';
const INTERNAL_DIRECTIVES = [
    ListComponent,
    ListItemDirective,
    SelectableDirective,
    SearchBarComponent,
    TemplateContextDirective
];
/**
 * @hidden
 */
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [INTERNAL_DIRECTIVES],
                exports: [INTERNAL_DIRECTIVES, CommonModule, FormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule],
                imports: [CommonModule, FormsModule, PopupModule, ResizeSensorModule, SharedDirectivesModule, EventsModule]
            },] },
];
