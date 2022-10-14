import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { TimeSlotDirective, DaySlotDirective } from './event-slot.directive';
import { DayTimeViewItemComponent } from './day-time-view-item.component';
var DIRECTIVES = [TimeSlotDirective, DaySlotDirective, DayTimeViewItemComponent];
/**
 * @hidden
 */
var DayTimeModule = /** @class */ (function () {
    function DayTimeModule() {
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
    return DayTimeModule;
}());
export { DayTimeModule };
