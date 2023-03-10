/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@progress/kendo-angular-intl";
import { CalendarCommonModule } from "./calendar-common.module";
import { TemplatesModule } from "./templates.module";
import { CalendarComponent } from "./calendar.component";
import { NavigationComponent } from "./navigation.component";
import { ViewListComponent } from "./view-list.component";
import { CalendarDOMService } from "./services/dom.service";
import { CenturyViewService } from "./services/century-view.service";
import { DecadeViewService } from "./services/decade-view.service";
import { MonthViewService } from "./services/month-view.service";
import { YearViewService } from "./services/year-view.service";
import { WeekNamesService } from "./services/weeknames.service";
import { CalendarLocalizedMessagesDirective } from "./localization/calendar-localized-messages.directive";
import { CalendarCustomMessagesComponent } from "./localization/calendar-custom-messages.component";
import { VirtualizationModule } from "../virtualization/virtualization.module";
import { EventsModule, ResizeSensorModule } from "@progress/kendo-angular-common";
/**
 * The exported package module.
 *
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 * - `NavigationItemTemplateDirective`&mdash;The navigation item template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Calendar module
 * import { CalendarModule } from '@progress/kendo-angular-dateinputs';
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
 *     imports:      [BrowserModule, CalendarModule], // import Calendar module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CalendarComponent,
                        NavigationComponent,
                        CalendarCustomMessagesComponent,
                        CalendarLocalizedMessagesDirective,
                        ViewListComponent
                    ],
                    exports: [
                        CalendarComponent,
                        NavigationComponent,
                        CalendarCustomMessagesComponent,
                        CalendarLocalizedMessagesDirective,
                        ViewListComponent,
                        CalendarCommonModule,
                        TemplatesModule
                    ],
                    imports: [
                        CommonModule,
                        CalendarCommonModule,
                        IntlModule,
                        TemplatesModule,
                        VirtualizationModule,
                        EventsModule,
                        ResizeSensorModule
                    ],
                    providers: [
                        CalendarDOMService,
                        CenturyViewService,
                        DecadeViewService,
                        MonthViewService,
                        YearViewService,
                        WeekNamesService
                    ]
                },] },
    ];
    return CalendarModule;
}());
export { CalendarModule };
