/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabStripComponent } from './tabstrip/tabstrip.component';
import { TabStripTabComponent } from './tabstrip/tabstrip-tab.component';
import { TabContentDirective } from './tabstrip/tab-content.directive';
import { TabTitleDirective } from './tabstrip/tab-title.directive';
var exportedModules = [
    TabStripComponent,
    TabStripTabComponent,
    TabContentDirective,
    TabTitleDirective
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
        { type: NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [CommonModule]
                },] },
    ];
    return TabStripModule;
}());
export { TabStripModule };
