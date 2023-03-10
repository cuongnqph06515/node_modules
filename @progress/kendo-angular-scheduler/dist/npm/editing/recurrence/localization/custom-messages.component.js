"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
/**
 * @hidden
 * Custom component messages override default component messages.
 */
var RecurrenceEditorCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RecurrenceEditorCustomMessagesComponent, _super);
    function RecurrenceEditorCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(RecurrenceEditorCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceEditorCustomMessagesComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return RecurrenceEditorCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-recurrence-editor-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorCustomMessagesComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return RecurrenceEditorCustomMessagesComponent;
}(messages_1.Messages));
exports.RecurrenceEditorCustomMessagesComponent = RecurrenceEditorCustomMessagesComponent;
