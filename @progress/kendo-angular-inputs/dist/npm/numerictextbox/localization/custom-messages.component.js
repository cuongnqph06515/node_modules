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
var NumericTextBoxCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NumericTextBoxCustomMessagesComponent, _super);
    function NumericTextBoxCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(NumericTextBoxCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxCustomMessagesComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: messages_1.NumericTextBoxMessages,
                            useExisting: core_1.forwardRef(function () { return NumericTextBoxCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-numerictextbox-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    NumericTextBoxCustomMessagesComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return NumericTextBoxCustomMessagesComponent;
}(messages_1.NumericTextBoxMessages));
exports.NumericTextBoxCustomMessagesComponent = NumericTextBoxCustomMessagesComponent;
