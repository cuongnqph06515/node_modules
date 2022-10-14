/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var messages_1 = require("./messages");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Custom component messages override default component messages ([more information and example]({% slug globalization_upload %})).
 *
 * @example
 * ```html-no-run
 * <kendo-fileselect>
 *     <kendo-fileselect-messages
 *         [dropFilesHere]="'Drop your file here'"
 *         [select]="'Upload file'">
 *     </kendo-fileselect-messages>
 * </kendo-fileselect>
 * ```
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
                            useExisting: core_1.forwardRef(function () { return CustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-upload-messages, kendo-fileselect-messages, kendo-uploaddropzone-messages',
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
