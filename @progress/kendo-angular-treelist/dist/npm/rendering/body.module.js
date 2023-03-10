/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var command_column_component_1 = require("../columns/command-column.component");
var cell_template_directive_1 = require("./cell-template.directive");
var no_records_template_directive_1 = require("./no-records-template.directive");
var edit_template_directive_1 = require("../editing/edit-template.directive");
var table_body_component_1 = require("./table-body.component");
var cell_component_1 = require("./cell.component");
var base_command_directive_1 = require("../editing/base-command.directive");
var edit_command_directive_1 = require("../editing/edit-command.directive");
var cancel_command_directive_1 = require("../editing/cancel-command.directive");
var save_command_directive_1 = require("../editing/save-command.directive");
var remove_command_directive_1 = require("../editing/remove-command.directive");
var add_command_directive_1 = require("../editing/add-command.directive");
var shared_module_1 = require("../shared.module");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var level_items_pipe_1 = require("./common/level-items.pipe");
var footer_template_directive_1 = require("./footer-template.directive");
var exported = [
    command_column_component_1.CommandColumnComponent,
    cell_template_directive_1.CellTemplateDirective,
    edit_template_directive_1.EditTemplateDirective,
    table_body_component_1.TableBodyComponent,
    no_records_template_directive_1.NoRecordsTemplateDirective,
    cell_component_1.CellComponent,
    base_command_directive_1.BaseCommandDirective,
    edit_command_directive_1.EditCommandDirective,
    cancel_command_directive_1.CancelCommandDirective,
    save_command_directive_1.SaveCommandDirective,
    remove_command_directive_1.RemoveCommandDirective,
    add_command_directive_1.AddCommandDirective,
    level_items_pipe_1.LevelItemsPipe,
    footer_template_directive_1.FooterTemplateDirective
];
var importedModules = [
    common_1.CommonModule,
    forms_1.ReactiveFormsModule,
    forms_1.FormsModule,
    shared_module_1.SharedModule,
    kendo_angular_inputs_1.NumericTextBoxModule,
    kendo_angular_dateinputs_1.DatePickerModule
];
/**
 * @hidden
 */
var BodyModule = /** @class */ (function () {
    function BodyModule() {
    }
    BodyModule.exports = function () {
        return [
            command_column_component_1.CommandColumnComponent,
            cell_template_directive_1.CellTemplateDirective,
            no_records_template_directive_1.NoRecordsTemplateDirective,
            edit_template_directive_1.EditTemplateDirective,
            edit_command_directive_1.EditCommandDirective,
            cancel_command_directive_1.CancelCommandDirective,
            save_command_directive_1.SaveCommandDirective,
            remove_command_directive_1.RemoveCommandDirective,
            add_command_directive_1.AddCommandDirective,
            footer_template_directive_1.FooterTemplateDirective
        ];
    };
    BodyModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exported],
                    exports: [exported],
                    imports: importedModules.slice()
                },] },
    ];
    return BodyModule;
}());
exports.BodyModule = BodyModule;
