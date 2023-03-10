"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var agenda_header_item_component_1 = require("./agenda-header-item.component");
var agenda_header_component_1 = require("./agenda-header.component");
var agenda_task_item_component_1 = require("./agenda-task-item.component");
var agenda_view_list_component_1 = require("./agenda-view-list.component");
var agenda_view_component_1 = require("./agenda-view.component");
var agenda_view_internal_component_1 = require("./agenda-view-internal.component");
var shared_module_1 = require("../../shared.module");
var COMPONENTS = [
    agenda_header_component_1.AgendaHeaderComponent,
    agenda_header_item_component_1.AgendaHeaderItemComponent,
    agenda_view_list_component_1.AgendaListComponent,
    agenda_task_item_component_1.AgendaTaskItemComponent,
    agenda_view_component_1.AgendaViewComponent,
    agenda_view_internal_component_1.AgendaViewInternalComponent
];
/**
 * @hidden
 */
var AgendaViewModule = /** @class */ (function () {
    function AgendaViewModule() {
    }
    AgendaViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, kendo_angular_intl_1.IntlModule, shared_module_1.SharedModule],
                    exports: [agenda_view_component_1.AgendaViewComponent],
                    declarations: [COMPONENTS]
                },] },
    ];
    return AgendaViewModule;
}());
exports.AgendaViewModule = AgendaViewModule;
