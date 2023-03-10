/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var button_module_1 = require("./../button/button.module");
var list_module_1 = require("./../listbutton/list.module");
var splitbutton_component_1 = require("./splitbutton.component");
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `SplitButtonComponent`&mdash;The SplitButtonComponent component class.
 */
var SplitButtonModule = /** @class */ (function () {
    function SplitButtonModule() {
    }
    SplitButtonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [splitbutton_component_1.SplitButtonComponent],
                    exports: [splitbutton_component_1.SplitButtonComponent, list_module_1.ListModule],
                    imports: [common_1.CommonModule, kendo_angular_popup_1.PopupModule, button_module_1.ButtonModule, list_module_1.ListModule]
                },] },
    ];
    return SplitButtonModule;
}());
exports.SplitButtonModule = SplitButtonModule;
