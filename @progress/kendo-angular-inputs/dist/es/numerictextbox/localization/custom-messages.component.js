/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NumericTextBoxMessages } from './messages';
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
        { type: Component, args: [{
                    providers: [
                        {
                            provide: NumericTextBoxMessages,
                            useExisting: forwardRef(function () { return NumericTextBoxCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-numerictextbox-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    NumericTextBoxCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return NumericTextBoxCustomMessagesComponent;
}(NumericTextBoxMessages));
export { NumericTextBoxCustomMessagesComponent };
