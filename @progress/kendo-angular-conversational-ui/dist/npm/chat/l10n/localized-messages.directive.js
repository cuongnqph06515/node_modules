"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
// tslint:disable:no-forward-ref
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
                            provide: messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: '[kendoChatLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(messages_1.Messages));
exports.LocalizedMessagesDirective = LocalizedMessagesDirective;
