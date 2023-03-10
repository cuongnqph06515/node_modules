/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var calendar_common_module_1 = require("./calendar-common.module");
var templates_module_1 = require("./templates.module");
var horizontal_view_list_component_1 = require("./horizontal-view-list.component");
var multiview_calendar_component_1 = require("./multiview-calendar.component");
var multiview_calendar_localized_messages_directive_1 = require("./localization/multiview-calendar-localized-messages.directive");
var multiview_calendar_custom_messages_component_1 = require("./localization/multiview-calendar-custom-messages.component");
var navigation_service_1 = require("./services/navigation.service");
var century_view_service_1 = require("./services/century-view.service");
var decade_view_service_1 = require("./services/decade-view.service");
var month_view_service_1 = require("./services/month-view.service");
var year_view_service_1 = require("./services/year-view.service");
var weeknames_service_1 = require("./services/weeknames.service");
/**
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the MultiViewCalendar module
 * import { MultiViewCalendarModule } from '@progress/kendo-angular-dateinputs';
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
 *     imports:      [BrowserModule, MultiViewCalendarModule], // import MultiViewCalendar module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 */
var MultiViewCalendarModule = /** @class */ (function () {
    function MultiViewCalendarModule() {
    }
    MultiViewCalendarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        horizontal_view_list_component_1.HorizontalViewListComponent,
                        multiview_calendar_localized_messages_directive_1.MultiViewCalendarLocalizedMessagesDirective,
                        multiview_calendar_custom_messages_component_1.MultiViewCalendarCustomMessagesComponent,
                        multiview_calendar_component_1.MultiViewCalendarComponent
                    ],
                    exports: [
                        horizontal_view_list_component_1.HorizontalViewListComponent,
                        multiview_calendar_localized_messages_directive_1.MultiViewCalendarLocalizedMessagesDirective,
                        multiview_calendar_custom_messages_component_1.MultiViewCalendarCustomMessagesComponent,
                        multiview_calendar_component_1.MultiViewCalendarComponent,
                        calendar_common_module_1.CalendarCommonModule,
                        templates_module_1.TemplatesModule
                    ],
                    imports: [common_1.CommonModule, calendar_common_module_1.CalendarCommonModule, kendo_angular_intl_1.IntlModule, templates_module_1.TemplatesModule, kendo_angular_popup_1.PopupModule],
                    providers: [
                        navigation_service_1.NavigationService,
                        century_view_service_1.CenturyViewService,
                        decade_view_service_1.DecadeViewService,
                        month_view_service_1.MonthViewService,
                        year_view_service_1.YearViewService,
                        weeknames_service_1.WeekNamesService
                    ]
                },] },
    ];
    return MultiViewCalendarModule;
}());
exports.MultiViewCalendarModule = MultiViewCalendarModule;
