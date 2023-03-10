/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var button_module_1 = require("../button/button.module");
var buttongroup_component_1 = require("./buttongroup.component");
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ButtonGroupComponent`&mdash;The ButtonGroupComponent component class.
 */
var ButtonGroupModule = /** @class */ (function () {
    function ButtonGroupModule() {
    }
    ButtonGroupModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [buttongroup_component_1.ButtonGroupComponent],
                    exports: [buttongroup_component_1.ButtonGroupComponent],
                    imports: [common_1.CommonModule, button_module_1.ButtonModule]
                },] },
    ];
    return ButtonGroupModule;
}());
exports.ButtonGroupModule = ButtonGroupModule;
