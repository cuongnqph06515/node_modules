/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var multiview_calendar_messages_1 = require("./multiview-calendar-messages");
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
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: multiview_calendar_messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return MultiViewCalendarCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-multiviewcalendar-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarCustomMessagesComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return MultiViewCalendarCustomMessagesComponent;
}(multiview_calendar_messages_1.Messages));
exports.MultiViewCalendarCustomMessagesComponent = MultiViewCalendarCustomMessagesComponent;
