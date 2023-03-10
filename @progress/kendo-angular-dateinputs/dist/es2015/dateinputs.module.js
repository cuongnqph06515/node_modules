/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CalendarsModule } from './calendar/calendars.module';
import { DateInputModule } from './dateinput/dateinput.module';
import { DatePickerModule } from './datepicker/datepicker.module';
import { DateRangeModule } from './daterange/date-range.module';
import { TimePickerModule } from './timepicker/timepicker.module';
import { DateTimePickerModule } from './datetimepicker/datetimepicker.module';
const COMPONENT_MODULES = [
    CalendarsModule,
    DateInputModule,
    DatePickerModule,
    TimePickerModule,
    DateRangeModule,
    DateTimePickerModule
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Date Inputs components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Date Inputs module
 * import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
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
 *     declarations: [AppComponent], // declare the app component
 *     imports:      [BrowserModule, DateInputsModule], // import the Date Inputs module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class DateInputsModule {
}
DateInputsModule.decorators = [
    { type: NgModule, args: [{
                exports: COMPONENT_MODULES,
                imports: COMPONENT_MODULES
            },] },
];
