/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableModule } from '@progress/kendo-angular-common';
import { SplitterComponent } from './splitter/splitter.component';
import { SplitterBarComponent } from './splitter/splitter-bar.component';
import { SplitterPaneComponent } from './splitter/splitter-pane.component';
var exportedModules = [
    SplitterComponent,
    SplitterPaneComponent
];
var declarations = [
    SplitterBarComponent
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
        { type: NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [
                        CommonModule,
                        DraggableModule
                    ]
                },] },
    ];
    return SplitterModule;
}());
export { SplitterModule };
