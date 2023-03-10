/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, forwardRef, Input } from '@angular/core';
import { ComponentMessages, LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    tslib_1.__extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: ComponentMessages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: "[kendoNotificationLocalizedMessages]"
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    LocalizedMessagesDirective.propDecorators = {
        closeTitle: [{ type: Input }]
    };
    return LocalizedMessagesDirective;
}(ComponentMessages));
export { LocalizedMessagesDirective };
