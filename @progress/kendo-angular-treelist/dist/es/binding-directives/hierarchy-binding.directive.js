/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { TreeListComponent } from '../treelist.component';
import { getter, setter } from '@progress/kendo-common';
import { BaseBindingDirective } from './base-binding.directive';
import { HierarchyEditService } from '../editing-directives/hierarchy-edit.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
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
        _this.childrenGetter = getter('items');
        _this.childrenSetter = setter('items');
        treelist.localEditService = new HierarchyEditService(_this, localDataChanges);
        return _this;
    }
    Object.defineProperty(HierarchyBindingDirective.prototype, "childrenField", {
        /**
         *  The name of the field which holds the child data items of the node.
         */
        set: function (value) {
            this.childrenGetter = getter(value);
            this.childrenSetter = setter(value);
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
        { type: Directive, args: [{
                    selector: '[kendoTreeListHierarchyBinding]'
                },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: TreeListComponent },
        { type: LocalDataChangesService }
    ]; };
    HierarchyBindingDirective.propDecorators = {
        childrenField: [{ type: Input }],
        data: [{ type: Input, args: ["kendoTreeListHierarchyBinding",] }]
    };
    return HierarchyBindingDirective;
}(BaseBindingDirective));
export { HierarchyBindingDirective };
