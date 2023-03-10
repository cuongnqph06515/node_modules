/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var splitter_component_1 = require("./splitter/splitter.component");
var splitter_bar_component_1 = require("./splitter/splitter-bar.component");
var splitter_pane_component_1 = require("./splitter/splitter-pane.component");
var exportedModules = [
    splitter_component_1.SplitterComponent,
    splitter_pane_component_1.SplitterPaneComponent
];
var declarations = [
    splitter_bar_component_1.SplitterBarComponent
].concat(exportedModules);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Splitter component.
 *
 * The module registers:
 * - `SplitterComponent`&mdash;The `Splitter` component class.
 * - `SplitterPaneComponent`&mdash;The `SplitterPane` component class.
 */
var SplitterModule = /** @class */ (function () {
    function SplitterModule() {
    }
    SplitterModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [
                        common_1.CommonModule,
                        kendo_angular_common_1.DraggableModule
                    ]
                },] },
    ];
    return SplitterModule;
}());
exports.SplitterModule = SplitterModule;
