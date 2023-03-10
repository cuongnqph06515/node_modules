"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var treeview_component_1 = require("./treeview.component");
var treeview_group_component_1 = require("./treeview-group.component");
var common_1 = require("@angular/common");
var node_template_directive_1 = require("./node-template.directive");
var check_directive_1 = require("./check.directive");
var disable_directive_1 = require("./disable.directive");
var expand_directive_1 = require("./expand.directive");
var select_directive_1 = require("./selection/select.directive");
var hierarchy_binding_directive_1 = require("./hierarchy-binding.directive");
var loading_indicator_directive_1 = require("./loading-indicator.directive");
var flat_binding_directive_1 = require("./flat-binding.directive");
var treeview_item_directive_1 = require("./treeview-item.directive");
var treeview_item_content_directive_1 = require("./treeview-item-content.directive");
var checkbox_module_1 = require("./checkbox/checkbox.module");
var COMPONENT_DIRECTIVES = [
    treeview_component_1.TreeViewComponent,
    treeview_group_component_1.TreeViewGroupComponent,
    treeview_item_directive_1.TreeViewItemDirective,
    treeview_item_content_directive_1.TreeViewItemContentDirective,
    node_template_directive_1.NodeTemplateDirective,
    check_directive_1.CheckDirective,
    disable_directive_1.DisableDirective,
    expand_directive_1.ExpandDirective,
    select_directive_1.SelectDirective,
    hierarchy_binding_directive_1.HierarchyBindingDirective,
    loading_indicator_directive_1.LoadingIndicatorDirective,
    flat_binding_directive_1.FlatDataBindingDirective
];
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [common_1.CommonModule, checkbox_module_1.CheckBoxModule]
                },] },
    ];
    return SharedModule;
}());
exports.SharedModule = SharedModule;
