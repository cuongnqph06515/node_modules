/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var dropzone_internal_directive_1 = require("./dropzone-internal.directive");
var file_list_component_1 = require("./rendering/file-list.component");
var file_list_item_1 = require("./rendering/file-list-item");
var file_list_item_action_button_component_1 = require("./rendering/file-list-item-action-button.component");
var file_list_multiple_items_component_1 = require("./rendering/file-list-multiple-items.component");
var file_list_single_item_component_1 = require("./rendering/file-list-single-item.component");
var file_select_directive_1 = require("./file-select.directive");
var file_template_directive_1 = require("./templates/file-template.directive");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var template_context_directive_1 = require("./templates/template-context.directive");
var dropzone_external_directive_1 = require("./dropzone-external.directive");
var dropzone_component_1 = require("./dropzone.component");
/**
 * @hidden
 */
exports.SHARED_DECLARATIONS = [
    dropzone_internal_directive_1.DropZoneInternalDirective,
    file_list_component_1.FileListComponent,
    file_list_item_1.FileListItemDirective,
    file_list_item_action_button_component_1.FileListItemActionButtonComponent,
    file_list_multiple_items_component_1.FileListMultipleItemsComponent,
    file_list_single_item_component_1.FileListSingleItemComponent,
    file_select_directive_1.FileSelectDirective,
    localized_messages_directive_1.LocalizedMessagesDirective,
    template_context_directive_1.TemplateContextDirective
];
/**
 * @hidden
 */
exports.PUBLIC_DIRECTIVES = [
    file_template_directive_1.FileTemplateDirective,
    custom_messages_component_1.CustomMessagesComponent,
    dropzone_external_directive_1.UploadDropZoneDirective,
    dropzone_component_1.UploadDropZoneComponent
];
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        exports.PUBLIC_DIRECTIVES,
                        exports.SHARED_DECLARATIONS
                    ],
                    exports: [
                        exports.PUBLIC_DIRECTIVES,
                        exports.SHARED_DECLARATIONS,
                        common_1.CommonModule
                    ],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return SharedModule;
}());
exports.SharedModule = SharedModule;
