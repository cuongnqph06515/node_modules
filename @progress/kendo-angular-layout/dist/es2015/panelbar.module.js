/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBarComponent } from './panelbar/panelbar.component';
import { PanelBarItemComponent } from './panelbar/panelbar-item.component';
import { PanelBarContentDirective } from './panelbar/panelbar-content.directive';
import { PanelBarItemTemplateDirective } from './panelbar/panelbar-item-template.directive';
import { PanelBarItemTitleDirective } from './panelbar/panelbar-item-title.directive';
const exportedModules = [
    PanelBarComponent,
    PanelBarItemComponent,
    PanelBarContentDirective,
    PanelBarItemTemplateDirective,
    PanelBarItemTitleDirective
];
const declarations = [
    ...exportedModules
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the PanelBar component.
 *
 * The module registers:
 * - `PanelBarComponent`&mdash;The `PanelBar` component class.
 * - `PanelBarItemComponent`&mdash;The `PanelBarItem` component class.
 * - `PanelBarContentComponent`&mdash;The `PanelBarContent` component class.
 * - `PanelBarItemTemplateDirective&mdash;The `PanelBarItemTemplate` directive.
 * - `PanelBarItemTitleDirective&mdash;The `PanelBarItemTitle` directive.
 */
export class PanelBarModule {
}
PanelBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [CommonModule]
            },] },
];
