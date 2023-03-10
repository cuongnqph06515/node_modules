import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IntlModule } from '@progress/kendo-angular-intl';
import { AgendaHeaderItemComponent } from './agenda-header-item.component';
import { AgendaHeaderComponent } from './agenda-header.component';
import { AgendaTaskItemComponent } from './agenda-task-item.component';
import { AgendaListComponent } from './agenda-view-list.component';
import { AgendaViewComponent } from './agenda-view.component';
import { AgendaViewInternalComponent } from './agenda-view-internal.component';
import { SharedModule } from '../../shared.module';
const COMPONENTS = [
    AgendaHeaderComponent,
    AgendaHeaderItemComponent,
    AgendaListComponent,
    AgendaTaskItemComponent,
    AgendaViewComponent,
    AgendaViewInternalComponent
];
/**
 * @hidden
 */
export class AgendaViewModule {
}
AgendaViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IntlModule, SharedModule],
                exports: [AgendaViewComponent],
                declarations: [COMPONENTS]
            },] },
];
