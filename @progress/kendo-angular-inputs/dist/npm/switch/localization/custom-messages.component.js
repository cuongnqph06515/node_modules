/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
/**
 * Custom component messages override default component messages.
 */
var SwitchCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SwitchCustomMessagesComponent, _super);
    function SwitchCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(SwitchCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SwitchCustomMessagesComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return SwitchCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-switch-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SwitchCustomMessagesComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return SwitchCustomMessagesComponent;
}(messages_1.Messages));
exports.SwitchCustomMessagesComponent = SwitchCustomMessagesComponent;
