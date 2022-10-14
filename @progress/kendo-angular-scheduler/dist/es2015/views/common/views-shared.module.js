import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ViewFooterComponent } from './view-footer.component';
import { WorkHoursFooterDirective } from './work-hours-footer.directive';
import { RepeatPipe } from './repeat.pipe';
import { ResourceIteratorPipe } from './resource-iterator.pipe';
import { HintContainerComponent } from './hint-container.component';
import { ResizeHintComponent } from './resize-hint.component';
import { SharedModule } from '../../shared.module';
const DECLARATIONS = [
    ViewFooterComponent,
    WorkHoursFooterDirective,
    RepeatPipe,
    ResourceIteratorPipe,
    HintContainerComponent,
    ResizeHintComponent
];
/**
 * @hidden
 */
export class ViewsSharedModule {
}
ViewsSharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IntlModule, SharedModule],
                exports: [
                    DECLARATIONS,
                    IntlModule,
                    CommonModule,
                    SharedModule
                ],
                declarations: [
                    DECLARATIONS
                ]
            },] },
];
