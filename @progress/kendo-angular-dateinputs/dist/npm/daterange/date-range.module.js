/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var multiview_calendar_module_1 = require("../calendar/multiview-calendar.module");
var dateinput_module_1 = require("../dateinput/dateinput.module");
var date_range_end_input_directive_1 = require("./date-range-end-input.directive");
var date_range_start_input_directive_1 = require("./date-range-start-input.directive");
var date_range_component_1 = require("./date-range.component");
var date_range_popup_component_1 = require("./date-range-popup.component");
var date_range_popup_template_directive_1 = require("./date-range-popup-template.directive");
var date_range_selection_directive_1 = require("./date-range-selection.directive");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var COMPONENT_DIRECTIVES = [
    date_range_component_1.DateRangeComponent,
    date_range_popup_component_1.DateRangePopupComponent,
    date_range_popup_template_directive_1.DateRangePopupTemplateDirective,
    date_range_selection_directive_1.DateRangeSelectionDirective,
    date_range_start_input_directive_1.DateRangeStartInputDirective,
    date_range_end_input_directive_1.DateRangeEndInputDirective
];
var COMPONENT_MODULES = [
    multiview_calendar_module_1.MultiViewCalendarModule,
    dateinput_module_1.DateInputModule,
    kendo_angular_popup_1.PopupModule,
    kendo_angular_common_1.EventsModule
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `DateRangeComponent`&mdash;The DateRange component class.
 * - `DateRangePopupComponent`&mdash;The DateRangePopup component class.
 * - `DateRangeSelectionDirective`&mdash;The MultiviewCalendar date range selection directive.
 * - `DateRangeEndInputDirective`&mdash;The end DateInput date range selection directive.
 * - `DateRangeStartInputDirective`&mdash;The start DateInput date range selection directive.
 * - `DateRangePopupTemplateDirective`&mdash;The DateRangePopup content template directive.
 * - `MultiViewCalendarModule`&mdash;The MultiViewCalendar module.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the DateRange module
 * import { DateRangeModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, DateRangeModule], // import DateRange module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var DateRangeModule = /** @class */ (function () {
    function DateRangeModule() {
    }
    DateRangeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [common_1.CommonModule, COMPONENT_MODULES]
                },] },
    ];
    return DateRangeModule;
}());
exports.DateRangeModule = DateRangeModule;
