"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
/**
 * @hidden
 */
var RecurrenceEditorLocalizedMessagesDirective = /** @class */ (function (_super) {
    tslib_1.__extends(RecurrenceEditorLocalizedMessagesDirective, _super);
    function RecurrenceEditorLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    RecurrenceEditorLocalizedMessagesDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [
                        {
                            provide: messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return RecurrenceEditorLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoRecurrenceEditorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return RecurrenceEditorLocalizedMessagesDirective;
}(messages_1.Messages));
exports.RecurrenceEditorLocalizedMessagesDirective = RecurrenceEditorLocalizedMessagesDirective;
