/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var list_module_1 = require("../listbutton/list.module");
var button_module_1 = require("../button/button.module");
var dropdownbutton_component_1 = require("./dropdownbutton.component");
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `DropDownButtonComponent`&mdash;The DropDownButtonComponent component class.
 */
var DropDownButtonModule = /** @class */ (function () {
    function DropDownButtonModule() {
    }
    DropDownButtonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [dropdownbutton_component_1.DropDownButtonComponent],
                    exports: [dropdownbutton_component_1.DropDownButtonComponent, list_module_1.ListModule],
                    imports: [common_1.CommonModule, kendo_angular_popup_1.PopupModule, list_module_1.ListModule, button_module_1.ButtonModule]
                },] },
    ];
    return DropDownButtonModule;
}());
exports.DropDownButtonModule = DropDownButtonModule;
