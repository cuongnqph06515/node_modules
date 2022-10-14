/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fileselect_component_1 = require("./fileselect.component");
var shared_module_1 = require("./shared.module");
var FILESELECT_DECLARATIONS = [
    fileselect_component_1.FileSelectComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the FileSelect component.
 */
var FileSelectModule = /** @class */ (function () {
    function FileSelectModule() {
    }
    FileSelectModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [FILESELECT_DECLARATIONS],
                    exports: [
                        shared_module_1.PUBLIC_DIRECTIVES,
                        FILESELECT_DECLARATIONS
                    ],
                    imports: [shared_module_1.SharedModule]
                },] },
    ];
    return FileSelectModule;
}());
exports.FileSelectModule = FileSelectModule;
