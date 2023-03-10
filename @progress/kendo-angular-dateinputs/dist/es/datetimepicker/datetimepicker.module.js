/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { EventsModule } from '@progress/kendo-angular-common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputModule } from '../dateinput/dateinput.module';
import { CalendarModule } from '../calendar/calendar.module';
import { TimePickerModule } from '../timepicker/timepicker.module';
import { TemplatesModule } from '../calendar/templates.module';
import { touchEnabled } from '@progress/kendo-common';
import { TOUCH_ENABLED } from '../touch-enabled';
import { DateTimePickerComponent } from './datetimepicker.component';
import { DateTimePickerCustomMessagesComponent } from './localization/datetimepicker-custom-messages.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
var COMPONENT_DIRECTIVES = [
    DateTimePickerComponent,
    DateTimePickerCustomMessagesComponent,
    LocalizedMessagesDirective
];
var ɵ0 = touchEnabled;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DateTimePicker component.
 */
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES.slice(),
                    exports: COMPONENT_DIRECTIVES.concat([
                        TemplatesModule
                    ]),
                    imports: [
                        CommonModule,
                        IntlModule,
                        DateInputModule,
                        CalendarModule,
                        TimePickerModule,
                        PopupModule,
                        EventsModule,
                        TemplatesModule
                    ],
                    providers: [
                        { provide: TOUCH_ENABLED, useValue: ɵ0 }
                    ]
                },] },
    ];
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
export { ɵ0 };
