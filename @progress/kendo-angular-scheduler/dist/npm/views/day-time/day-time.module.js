"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("../../shared.module");
var event_slot_directive_1 = require("./event-slot.directive");
var day_time_view_item_component_1 = require("./day-time-view-item.component");
var DIRECTIVES = [event_slot_directive_1.TimeSlotDirective, event_slot_directive_1.DaySlotDirective, day_time_view_item_component_1.DayTimeViewItemComponent];
/**
 * @hidden
 */
var DayTimeModule = /** @class */ (function () {
    function DayTimeModule() {
    }
    DayTimeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, shared_module_1.SharedModule],
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
exports.DayTimeModule = DayTimeModule;
