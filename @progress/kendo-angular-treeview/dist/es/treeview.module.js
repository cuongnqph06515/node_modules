import { NgModule } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
import { SharedModule } from './shared.module';
import { NodeTemplateDirective } from './node-template.directive';
import { CheckDirective } from './check.directive';
import { DisableDirective } from './disable.directive';
import { ExpandDirective } from './expand.directive';
import { SelectDirective } from './selection/select.directive';
import { HierarchyBindingDirective } from './hierarchy-binding.directive';
import { FlatDataBindingDirective } from './flat-binding.directive';
var EXPORTS = [
    TreeViewComponent,
    NodeTemplateDirective,
    CheckDirective,
    DisableDirective,
    ExpandDirective,
    SelectDirective,
    HierarchyBindingDirective,
    FlatDataBindingDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the TreeView component.
 */
var TreeViewModule = /** @class */ (function () {
    function TreeViewModule() {
    }
    TreeViewModule.decorators = [
        { type: NgModule, args: [{
                    exports: [EXPORTS],
                    imports: [SharedModule]
                },] },
    ];
    return TreeViewModule;
}());
export { TreeViewModule };
