import { NgModule } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
import { TreeViewGroupComponent } from './treeview-group.component';
import { CommonModule } from '@angular/common';
import { NodeTemplateDirective } from './node-template.directive';
import { CheckDirective } from './check.directive';
import { DisableDirective } from './disable.directive';
import { ExpandDirective } from './expand.directive';
import { SelectDirective } from './selection/select.directive';
import { HierarchyBindingDirective } from './hierarchy-binding.directive';
import { LoadingIndicatorDirective } from './loading-indicator.directive';
import { FlatDataBindingDirective } from './flat-binding.directive';
import { TreeViewItemDirective } from './treeview-item.directive';
import { TreeViewItemContentDirective } from './treeview-item-content.directive';
import { CheckBoxModule } from './checkbox/checkbox.module';
const COMPONENT_DIRECTIVES = [
    TreeViewComponent,
    TreeViewGroupComponent,
    TreeViewItemDirective,
    TreeViewItemContentDirective,
    NodeTemplateDirective,
    CheckDirective,
    DisableDirective,
    ExpandDirective,
    SelectDirective,
    HierarchyBindingDirective,
    LoadingIndicatorDirective,
    FlatDataBindingDirective
];
/**
 * @hidden
 */
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES],
                imports: [CommonModule, CheckBoxModule]
            },] },
];
