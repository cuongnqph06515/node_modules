/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
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
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return SwitchCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-switch-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SwitchCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return SwitchCustomMessagesComponent;
}(Messages));
export { SwitchCustomMessagesComponent };
