/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MultiViewCalendarModule } from '../calendar/multiview-calendar.module';
import { DateInputModule } from '../dateinput/dateinput.module';
import { DateRangeEndInputDirective } from './date-range-end-input.directive';
import { DateRangeStartInputDirective } from './date-range-start-input.directive';
import { DateRangeComponent } from './date-range.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { DateRangePopupTemplateDirective } from './date-range-popup-template.directive';
import { DateRangeSelectionDirective } from './date-range-selection.directive';
import { EventsModule } from '@progress/kendo-angular-common';
var COMPONENT_DIRECTIVES = [
    DateRangeComponent,
    DateRangePopupComponent,
    DateRangePopupTemplateDirective,
    DateRangeSelectionDirective,
    DateRangeStartInputDirective,
    DateRangeEndInputDirective
];
var COMPONENT_MODULES = [
    MultiViewCalendarModule,
    DateInputModule,
    PopupModule,
    EventsModule
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
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [CommonModule, COMPONENT_MODULES]
                },] },
    ];
    return DateRangeModule;
}());
export { DateRangeModule };
