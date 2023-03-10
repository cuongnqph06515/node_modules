"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var treeview_component_1 = require("./treeview.component");
var shared_module_1 = require("./shared.module");
var node_template_directive_1 = require("./node-template.directive");
var check_directive_1 = require("./check.directive");
var disable_directive_1 = require("./disable.directive");
var expand_directive_1 = require("./expand.directive");
var select_directive_1 = require("./selection/select.directive");
var hierarchy_binding_directive_1 = require("./hierarchy-binding.directive");
var flat_binding_directive_1 = require("./flat-binding.directive");
var EXPORTS = [
    treeview_component_1.TreeViewComponent,
    node_template_directive_1.NodeTemplateDirective,
    check_directive_1.CheckDirective,
    disable_directive_1.DisableDirective,
    expand_directive_1.ExpandDirective,
    select_directive_1.SelectDirective,
    hierarchy_binding_directive_1.HierarchyBindingDirective,
    flat_binding_directive_1.FlatDataBindingDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the TreeView component.
 */
var TreeViewModule = /** @class */ (function () {
    function TreeViewModule() {
    }
    TreeViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [EXPORTS],
                    imports: [shared_module_1.SharedModule]
                },] },
    ];
    return TreeViewModule;
}());
exports.TreeViewModule = TreeViewModule;
