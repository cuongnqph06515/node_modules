"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var data_binding_directive_1 = require("./data-binding.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var scheduler_component_1 = require("./scheduler.component");
var toolbar_module_1 = require("./toolbar/toolbar.module");
var agenda_view_component_1 = require("./views/agenda/agenda-view.component");
var agenda_view_module_1 = require("./views/agenda/agenda-view.module");
var month_view_module_1 = require("./views/month/month-view.module");
var multi_day_view_module_1 = require("./views/multi-day/multi-day-view.module");
var scheduler_view_directive_1 = require("./views/scheduler-view.directive");
var agenda_date_template_directive_1 = require("./views/templates/agenda-date-template.directive");
var agenda_time_template_directive_1 = require("./views/templates/agenda-time-template.directive");
var all_day_event_template_directive_1 = require("./views/templates/all-day-event-template.directive");
var all_day_slot_template_directive_1 = require("./views/templates/all-day-slot-template.directive");
var date_header_template_directive_1 = require("./views/templates/date-header-template.directive");
var event_template_directive_1 = require("./views/templates/event-template.directive");
var group_header_template_directive_1 = require("./views/templates/group-header-template.directive");
var major_time_header_template_directive_1 = require("./views/templates/major-time-header-template.directive");
var minor_time_header_template_directive_1 = require("./views/templates/minor-time-header-template.directive");
var month_day_slot_template_directive_1 = require("./views/templates/month-day-slot-template.directive");
var time_slot_template_directive_1 = require("./views/templates/time-slot-template.directive");
var timeline_view_module_1 = require("./views/timeline/timeline-view.module");
var reactive_editing_directive_1 = require("./editing-directives/reactive-editing.directive");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var edit_dialog_component_1 = require("./editing/edit-dialog.component");
var forms_1 = require("@angular/forms");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var date_time_picker_component_1 = require("./editing/date-time-picker.component");
var recurrence_editor_component_1 = require("./editing/recurrence/recurrence-editor.component");
var recurrence_frequency_editor_component_1 = require("./editing/recurrence/recurrence-frequency-editor.component");
var recurrence_end_rule_editor_component_1 = require("./editing/recurrence/recurrence-end-rule-editor.component");
var recurrence_interval_editor_component_1 = require("./editing/recurrence/recurrence-interval-editor.component");
var recurrence_monthly_yearly_editor_component_1 = require("./editing/recurrence/recurrence-monthly-yearly-editor.component");
var recurrence_weekday_rule_editor_component_1 = require("./editing/recurrence/recurrence-weekday-rule-editor.component");
var custom_messages_component_2 = require("./editing/recurrence/localization/custom-messages.component");
var localized_messages_directive_2 = require("./editing/recurrence/localization/localized-messages.directive");
var end_rule_radio_button_directive_1 = require("./editing/recurrence/end-rule-radio-button.directive");
var repeat_on_radio_button_directive_1 = require("./editing/recurrence/repeat-on-radio-button.directive");
var resource_multiple_editor_component_1 = require("./editing/resource-multiple-editor.component");
var resource_single_editor_component_1 = require("./editing/resource-single-editor.component");
var timezone_editor_component_1 = require("./editing/timezone-editor.component");
var edit_dialog_template_directive_1 = require("./editing/edit-dialog-template.directive");
var loading_component_1 = require("./loading.component");
var shared_module_1 = require("./shared.module");
var shortcuts_directive_1 = require("./navigation/shortcuts.directive");
var TEMPLATES = [
    agenda_date_template_directive_1.AgendaDateTemplateDirective,
    agenda_time_template_directive_1.AgendaTimeTemplateDirective,
    all_day_event_template_directive_1.AllDayEventTemplateDirective,
    all_day_slot_template_directive_1.AllDaySlotTemplateDirective,
    date_header_template_directive_1.DateHeaderTemplateDirective,
    event_template_directive_1.EventTemplateDirective,
    edit_dialog_template_directive_1.EditDialogTemplateDirective,
    group_header_template_directive_1.GroupHeaderTemplateDirective,
    major_time_header_template_directive_1.MajorTimeHeaderTemplateDirective,
    minor_time_header_template_directive_1.MinorTimeHeaderTemplateDirective,
    month_day_slot_template_directive_1.MonthDaySlotTemplateDirective,
    time_slot_template_directive_1.TimeSlotTemplateDirective
];
var declarations = [
    scheduler_component_1.SchedulerComponent,
    scheduler_view_directive_1.SchedulerViewDirective,
    data_binding_directive_1.DataBindingDirective,
    shortcuts_directive_1.ShortcutsDirective,
    reactive_editing_directive_1.ReactiveEditingDirective,
    date_time_picker_component_1.SchedulerDateTimePickerComponent,
    recurrence_editor_component_1.RecurrenceEditorComponent,
    recurrence_end_rule_editor_component_1.RecurrenceEndRuleEditorComponent,
    recurrence_frequency_editor_component_1.RecurrenceFrequencyEditorComponent,
    recurrence_interval_editor_component_1.RecurrenceIntervalEditorComponent,
    recurrence_monthly_yearly_editor_component_1.RecurrenceMonthlyYearlyEditorComponent,
    recurrence_weekday_rule_editor_component_1.RecurrenceWeekdayRuleEditorComponent,
    end_rule_radio_button_directive_1.EndRuleRadioButtonDirective,
    repeat_on_radio_button_directive_1.RepeatOnRadioButtonDirective,
    resource_multiple_editor_component_1.MultipleResourceEditorComponent,
    resource_single_editor_component_1.SingleResourceEditorComponent,
    timezone_editor_component_1.TimeZoneEditorComponent,
    edit_dialog_component_1.EditDialogComponent,
    custom_messages_component_1.SchedulerCustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective,
    custom_messages_component_2.RecurrenceEditorCustomMessagesComponent,
    localized_messages_directive_2.RecurrenceEditorLocalizedMessagesDirective,
    loading_component_1.LoadingComponent
].concat(TEMPLATES);
var publicDirectives = [
    agenda_view_component_1.AgendaViewComponent,
    month_view_module_1.MonthViewModule,
    multi_day_view_module_1.MultiDayViewModule,
    reactive_editing_directive_1.ReactiveEditingDirective,
    timeline_view_module_1.TimelineViewModule,
    toolbar_module_1.publicDirectives
].concat(declarations);
var importedKendoModules = [
    kendo_angular_buttons_1.ButtonsModule,
    kendo_angular_dateinputs_1.DateInputsModule,
    kendo_angular_dialog_1.DialogModule,
    kendo_angular_inputs_1.NumericTextBoxModule,
    kendo_angular_inputs_1.TextBoxModule,
    kendo_angular_dropdowns_1.DropDownsModule,
    forms_1.ReactiveFormsModule,
    shared_module_1.SharedModule
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Scheduler component.
 *
 * @example
 * ```ts-no-run
 * import { BrowserModule } from '@angular/platform-browser';
 * import { NgModule } from '@angular/core';
 *
 * // Import the Scheduler module
 * import { SchedulerModule } from '@progress/kendo-angular-scheduler';
 *
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     declarations: [
 *         AppComponent
 *     ],
 *     imports: [
 *         BrowserModule,
 *
 *         // Import the Scheduler module
 *         SchedulerModule
 *     ],
 *     bootstrap: [
 *         AppComponent
 *     ]
 * })
 * export class AppModule { }
 * ```
 */
var SchedulerModule = /** @class */ (function () {
    function SchedulerModule() {
    }
    SchedulerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        toolbar_module_1.ToolbarModule,
                        agenda_view_module_1.AgendaViewModule,
                        multi_day_view_module_1.MultiDayViewModule,
                        kendo_angular_common_1.ResizeSensorModule,
                        month_view_module_1.MonthViewModule,
                        timeline_view_module_1.TimelineViewModule
                    ].concat(importedKendoModules),
                    declarations: declarations,
                    exports: publicDirectives,
                    providers: [{
                            provide: kendo_angular_intl_1.IntlService,
                            useClass: kendo_angular_intl_1.CldrIntlService
                        }]
                },] },
    ];
    return SchedulerModule;
}());
exports.SchedulerModule = SchedulerModule;
