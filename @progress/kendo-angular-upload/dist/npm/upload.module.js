/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var upload_component_1 = require("./upload.component");
var upload_action_buttons_component_1 = require("./rendering/upload-action-buttons.component");
var upload_status_total_component_1 = require("./rendering/upload-status-total.component");
var shared_module_1 = require("./shared.module");
var UPLOAD_DECLARATIONS = [
    upload_component_1.UploadComponent,
    upload_action_buttons_component_1.UploadActionButtonsComponent,
    upload_status_total_component_1.UploadStatusTotalComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the Upload component.
 */
var UploadModule = /** @class */ (function () {
    function UploadModule() {
    }
    UploadModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [UPLOAD_DECLARATIONS],
                    exports: [
                        shared_module_1.PUBLIC_DIRECTIVES,
                        UPLOAD_DECLARATIONS
                    ],
                    imports: [shared_module_1.SharedModule]
                },] },
    ];
    return UploadModule;
}());
exports.UploadModule = UploadModule;
