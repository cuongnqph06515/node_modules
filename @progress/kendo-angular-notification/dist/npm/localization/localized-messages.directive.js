/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        { type: core_1.Directive, args: [{
                    providers: [
                        {
                            provide: kendo_angular_l10n_1.ComponentMessages,
                            useExisting: core_1.forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: "[kendoNotificationLocalizedMessages]"
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    LocalizedMessagesDirective.propDecorators = {
        closeTitle: [{ type: core_1.Input }]
    };
    return LocalizedMessagesDirective;
}(kendo_angular_l10n_1.ComponentMessages));
exports.LocalizedMessagesDirective = LocalizedMessagesDirective;
