/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './multiview-calendar-messages';
/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var MultiViewCalendarCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MultiViewCalendarCustomMessagesComponent, _super);
    function MultiViewCalendarCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(MultiViewCalendarCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    MultiViewCalendarCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return MultiViewCalendarCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-multiviewcalendar-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return MultiViewCalendarCustomMessagesComponent;
}(Messages));
export { MultiViewCalendarCustomMessagesComponent };
