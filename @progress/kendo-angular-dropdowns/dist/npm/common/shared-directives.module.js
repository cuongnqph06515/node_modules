/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_template_directive_1 = require("./templates/item-template.directive");
var group_template_directive_1 = require("./templates/group-template.directive");
var fixed_group_template_directive_1 = require("./templates/fixed-group-template.directive");
var header_template_directive_1 = require("./templates/header-template.directive");
var footer_template_directive_1 = require("./templates/footer-template.directive");
var no_data_template_directive_1 = require("./templates/no-data-template.directive");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var filter_directive_1 = require("./filtering/filter.directive");
var SHARED_DIRECTIVES = [
    header_template_directive_1.HeaderTemplateDirective,
    footer_template_directive_1.FooterTemplateDirective,
    item_template_directive_1.ItemTemplateDirective,
    group_template_directive_1.GroupTemplateDirective,
    fixed_group_template_directive_1.FixedGroupTemplateDirective,
    no_data_template_directive_1.NoDataTemplateDirective,
    localized_messages_directive_1.LocalizedMessagesDirective,
    custom_messages_component_1.CustomMessagesComponent,
    filter_directive_1.FilterDirective
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 * - `NoDataTemplateDirective`&mdash;The noData template directive.
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
