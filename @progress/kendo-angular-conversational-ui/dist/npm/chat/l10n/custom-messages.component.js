"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
// tslint:disable:no-forward-ref
/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_chat %}#toc-custom-messages)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-chat-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(messages_1.Messages));
exports.CustomMessagesComponent = CustomMessagesComponent;
