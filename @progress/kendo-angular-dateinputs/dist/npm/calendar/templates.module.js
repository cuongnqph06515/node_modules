/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cell_template_directive_1 = require("./templates/cell-template.directive");
var month_cell_template_directive_1 = require("./templates/month-cell-template.directive");
var year_cell_template_directive_1 = require("./templates/year-cell-template.directive");
var decade_cell_template_directive_1 = require("./templates/decade-cell-template.directive");
var century_cell_template_directive_1 = require("./templates/century-cell-template.directive");
var weeknumber_cell_template_directive_1 = require("./templates/weeknumber-cell-template.directive");
var header_title_template_directive_1 = require("./templates/header-title-template.directive");
var navigation_item_template_directive_1 = require("./templates/navigation-item-template.directive");
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 * - `NavigationItemTemplateDirective`&mdash;The navigation item template directive.
 */
var TemplatesModule = /** @class */ (function () {
    function TemplatesModule() {
    }
    TemplatesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        cell_template_directive_1.CellTemplateDirective,
                        month_cell_template_directive_1.MonthCellTemplateDirective,
                        year_cell_template_directive_1.YearCellTemplateDirective,
                        decade_cell_template_directive_1.DecadeCellTemplateDirective,
                        century_cell_template_directive_1.CenturyCellTemplateDirective,
                        weeknumber_cell_template_directive_1.WeekNumberCellTemplateDirective,
                        header_title_template_directive_1.HeaderTitleTemplateDirective,
                        navigation_item_template_directive_1.NavigationItemTemplateDirective
                    ],
                    exports: [
                        cell_template_directive_1.CellTemplateDirective,
                        month_cell_template_directive_1.MonthCellTemplateDirective,
                        year_cell_template_directive_1.YearCellTemplateDirective,
                        decade_cell_template_directive_1.DecadeCellTemplateDirective,
                        century_cell_template_directive_1.CenturyCellTemplateDirective,
                        weeknumber_cell_template_directive_1.WeekNumberCellTemplateDirective,
                        header_title_template_directive_1.HeaderTitleTemplateDirective,
                        navigation_item_template_directive_1.NavigationItemTemplateDirective
                    ]
                },] },
    ];
    return TemplatesModule;
}());
exports.TemplatesModule = TemplatesModule;
