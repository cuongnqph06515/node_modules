import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { DataBindingDirective } from './data-binding.directive';
import { SchedulerCustomMessagesComponent } from './localization/custom-messages.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { SchedulerComponent } from './scheduler.component';
import { publicDirectives as toolbarDirectives, ToolbarModule } from './toolbar/toolbar.module';
import { AgendaViewComponent } from './views/agenda/agenda-view.component';
import { AgendaViewModule } from './views/agenda/agenda-view.module';
import { MonthViewModule } from './views/month/month-view.module';
import { MultiDayViewModule } from './views/multi-day/multi-day-view.module';
import { SchedulerViewDirective } from './views/scheduler-view.directive';
import { AgendaDateTemplateDirective } from './views/templates/agenda-date-template.directive';
import { AgendaTimeTemplateDirective } from './views/templates/agenda-time-template.directive';
import { AllDayEventTemplateDirective } from './views/templates/all-day-event-template.directive';
import { AllDaySlotTemplateDirective } from './views/templates/all-day-slot-template.directive';
import { DateHeaderTemplateDirective } from './views/templates/date-header-template.directive';
import { EventTemplateDirective } from './views/templates/event-template.directive';
import { GroupHeaderTemplateDirective } from './views/templates/group-header-template.directive';
import { MajorTimeHeaderTemplateDirective } from './views/templates/major-time-header-template.directive';
import { MinorTimeHeaderTemplateDirective } from './views/templates/minor-time-header-template.directive';
import { MonthDaySlotTemplateDirective } from './views/templates/month-day-slot-template.directive';
import { TimeSlotTemplateDirective } from './views/templates/time-slot-template.directive';
import { TimelineViewModule } from './views/timeline/timeline-view.module';
import { ReactiveEditingDirective } from './editing-directives/reactive-editing.directive';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { EditDialogComponent } from './editing/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { NumericTextBoxModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SchedulerDateTimePickerComponent } from './editing/date-time-picker.component';
import { RecurrenceEditorComponent } from './editing/recurrence/recurrence-editor.component';
import { RecurrenceFrequencyEditorComponent } from './editing/recurrence/recurrence-frequency-editor.component';
import { RecurrenceEndRuleEditorComponent } from './editing/recurrence/recurrence-end-rule-editor.component';
import { RecurrenceIntervalEditorComponent } from './editing/recurrence/recurrence-interval-editor.component';
import { RecurrenceMonthlyYearlyEditorComponent } from './editing/recurrence/recurrence-monthly-yearly-editor.component';
import { RecurrenceWeekdayRuleEditorComponent } from './editing/recurrence/recurrence-weekday-rule-editor.component';
import { RecurrenceEditorCustomMessagesComponent } from './editing/recurrence/localization/custom-messages.component';
import { RecurrenceEditorLocalizedMessagesDirective } from './editing/recurrence/localization/localized-messages.directive';
import { EndRuleRadioButtonDirective } from './editing/recurrence/end-rule-radio-button.directive';
import { RepeatOnRadioButtonDirective } from './editing/recurrence/repeat-on-radio-button.directive';
import { MultipleResourceEditorComponent } from './editing/resource-multiple-editor.component';
import { SingleResourceEditorComponent } from './editing/resource-single-editor.component';
import { TimeZoneEditorComponent } from './editing/timezone-editor.component';
import { EditDialogTemplateDirective } from './editing/edit-dialog-template.directive';
import { LoadingComponent } from './loading.component';
import { SharedModule } from './shared.module';
import { ShortcutsDirective } from './navigation/shortcuts.directive';
var TEMPLATES = [
    AgendaDateTemplateDirective,
    AgendaTimeTemplateDirective,
    AllDayEventTemplateDirective,
    AllDaySlotTemplateDirective,
    DateHeaderTemplateDirective,
    EventTemplateDirective,
    EditDialogTemplateDirective,
    GroupHeaderTemplateDirective,
    MajorTimeHeaderTemplateDirective,
    MinorTimeHeaderTemplateDirective,
    MonthDaySlotTemplateDirective,
    TimeSlotTemplateDirective
];
var declarations = [
    SchedulerComponent,
    SchedulerViewDirective,
    DataBindingDirective,
    ShortcutsDirective,
    ReactiveEditingDirective,
    SchedulerDateTimePickerComponent,
    RecurrenceEditorComponent,
    RecurrenceEndRuleEditorComponent,
    RecurrenceFrequencyEditorComponent,
    RecurrenceIntervalEditorComponent,
    RecurrenceMonthlyYearlyEditorComponent,
    RecurrenceWeekdayRuleEditorComponent,
    EndRuleRadioButtonDirective,
    RepeatOnRadioButtonDirective,
    MultipleResourceEditorComponent,
    SingleResourceEditorComponent,
    TimeZoneEditorComponent,
    EditDialogComponent,
    SchedulerCustomMessagesComponent,
    LocalizedMessagesDirective,
    RecurrenceEditorCustomMessagesComponent,
    RecurrenceEditorLocalizedMessagesDirective,
    LoadingComponent
].concat(TEMPLATES);
var publicDirectives = [
    AgendaViewComponent,
    MonthViewModule,
    MultiDayViewModule,
    ReactiveEditingDirective,
    TimelineViewModule,
    toolbarDirectives
].concat(declarations);
var importedKendoModules = [
    ButtonsModule,
    DateInputsModule,
    DialogModule,
    NumericTextBoxModule,
    TextBoxModule,
    DropDownsModule,
    ReactiveFormsModule,
    SharedModule
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ToolbarModule,
                        AgendaViewModule,
                        MultiDayViewModule,
                        ResizeSensorModule,
                        MonthViewModule,
                        TimelineViewModule
                    ].concat(importedKendoModules),
                    declarations: declarations,
                    exports: publicDirectives,
                    providers: [{
                            provide: IntlService,
                            useClass: CldrIntlService
                        }]
                },] },
    ];
    return SchedulerModule;
}());
export { SchedulerModule };
