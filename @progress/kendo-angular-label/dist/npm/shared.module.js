/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var SHARED_DIRECTIVES = [
    localized_messages_directive_1.LocalizedMessagesDirective,
    custom_messages_component_1.CustomMessagesComponent
];
/**
 * @hidden
 */
var SharedDirectivesModule = /** @class */ (function () {
    function SharedDirectivesModule() {
    }
    SharedDirectivesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [SHARED_DIRECTIVES],
                    exports: [SHARED_DIRECTIVES]
                },] },
    ];
    return SharedDirectivesModule;
}());
exports.SharedDirectivesModule = SharedDirectivesModule;
