/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tabstrip_component_1 = require("./tabstrip/tabstrip.component");
var tabstrip_tab_component_1 = require("./tabstrip/tabstrip-tab.component");
var tab_content_directive_1 = require("./tabstrip/tab-content.directive");
var tab_title_directive_1 = require("./tabstrip/tab-title.directive");
var exportedModules = [
    tabstrip_component_1.TabStripComponent,
    tabstrip_tab_component_1.TabStripTabComponent,
    tab_content_directive_1.TabContentDirective,
    tab_title_directive_1.TabTitleDirective
];
var declarations = exportedModules.slice();
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TabStrip component.
 *
 * The module registers:
 * - `TabStripComponent`&mdash;The `TabStrip` component class.
 * - `TabStripTabComponent`&mdash;The `TabStripTab` component class.
 * - `TabContentDirective`&mdash;The tab content directive used on the `<ng-template>` tag.
 * - `TabTitleDirective`&mdash;The tab title directive used on the `<ng-template>` tag.
 */
var TabStripModule = /** @class */ (function () {
    function TabStripModule() {
    }
    TabStripModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return TabStripModule;
}());
exports.TabStripModule = TabStripModule;
