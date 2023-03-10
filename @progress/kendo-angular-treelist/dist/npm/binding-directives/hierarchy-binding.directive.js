/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var treelist_component_1 = require("../treelist.component");
var kendo_common_1 = require("@progress/kendo-common");
var base_binding_directive_1 = require("./base-binding.directive");
var hierarchy_edit_service_1 = require("../editing-directives/hierarchy-edit.service");
var local_data_changes_service_1 = require("../editing/local-data-changes.service");
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_treelist %}),
 * [sorting]({% slug sorting_treelist %}), and [filtering]({% slug filtering_treelist %})
 * ([more information and examples]({% slug databinding_treelist %})).
 */
var HierarchyBindingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(HierarchyBindingDirective, _super);
    function HierarchyBindingDirective(treelist, localDataChanges) {
        var _this = _super.call(this, treelist) || this;
        _this.treelist = treelist;
        _this.childrenGetter = kendo_common_1.getter('items');
        _this.childrenSetter = kendo_common_1.setter('items');
        treelist.localEditService = new hierarchy_edit_service_1.HierarchyEditService(_this, localDataChanges);
        return _this;
    }
    Object.defineProperty(HierarchyBindingDirective.prototype, "childrenField", {
        /**
         *  The name of the field which holds the child data items of the node.
         */
        set: function (value) {
            this.childrenGetter = kendo_common_1.getter(value);
            this.childrenSetter = kendo_common_1.setter(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HierarchyBindingDirective.prototype, "data", {
        /**
         * The array of data which will be used to populate the TreeList.
         */
        set: function (value) {
            this.originalData = value || [];
            this.dataChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    HierarchyBindingDirective.prototype.getChildren = function (item) {
        return item ? this.childrenGetter(item) || [] : this.originalData;
    };
    HierarchyBindingDirective.prototype.itemKey = function (item) {
        return item;
    };
    HierarchyBindingDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListHierarchyBinding]'
                },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: treelist_component_1.TreeListComponent },
        { type: local_data_changes_service_1.LocalDataChangesService }
    ]; };
    HierarchyBindingDirective.propDecorators = {
        childrenField: [{ type: core_1.Input }],
        data: [{ type: core_1.Input, args: ["kendoTreeListHierarchyBinding",] }]
    };
    return HierarchyBindingDirective;
}(base_binding_directive_1.BaseBindingDirective));
exports.HierarchyBindingDirective = HierarchyBindingDirective;
