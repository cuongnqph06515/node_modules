import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { TimeSlotDirective, DaySlotDirective } from './event-slot.directive';
import { DayTimeViewItemComponent } from './day-time-view-item.component';
const DIRECTIVES = [TimeSlotDirective, DaySlotDirective, DayTimeViewItemComponent];
/**
 * @hidden
 */
export class DayTimeModule {
}
DayTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule],
                exports: [
                    DIRECTIVES
                ],
                declarations: [
                    DIRECTIVES
                ]
            },] },
];
