/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_filter_menu_component_1 = require("./string-filter-menu.component");
var numeric_filter_menu_component_1 = require("./numeric-filter-menu.component");
var date_filter_menu_component_1 = require("./date-filter-menu.component");
var boolean_filter_menu_component_1 = require("./boolean-filter-menu.component");
/**
 * @hidden
 *
 * > List the following components as `entryComponents` in the GridModule.
 */
exports.filterMenuComponentFactory = function (type) { return ({
    "boolean": boolean_filter_menu_component_1.BooleanFilterMenuComponent,
    "date": date_filter_menu_component_1.DateFilterMenuComponent,
    "numeric": numeric_filter_menu_component_1.NumericFilterMenuComponent,
    "text": string_filter_menu_component_1.StringFilterMenuComponent
}[type]); };
