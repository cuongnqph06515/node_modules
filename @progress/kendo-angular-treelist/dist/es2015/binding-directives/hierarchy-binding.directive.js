/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export class HierarchyBindingDirective extends BaseBindingDirective {
    constructor(treelist, localDataChanges) {
        super(treelist);
        this.treelist = treelist;
        this.childrenGetter = getter('items');
        this.childrenSetter = setter('items');
        treelist.localEditService = new HierarchyEditService(this, localDataChanges);
    }
    /**
     *  The name of the field which holds the child data items of the node.
     */
    set childrenField(value) {
        this.childrenGetter = getter(value);
        this.childrenSetter = setter(value);
    }
    /**
     * The array of data which will be used to populate the TreeList.
     */
    set data(value) {
        this.originalData = value || [];
        this.dataChanged = true;
    }
    getChildren(item) {
        return item ? this.childrenGetter(item) || [] : this.originalData;
    }
    itemKey(item) {
        return item;
    }
}
HierarchyBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListHierarchyBinding]'
            },] },
];
/** @nocollapse */
HierarchyBindingDirective.ctorParameters = () => [
    { type: TreeListComponent },
    { type: LocalDataChangesService }
];
HierarchyBindingDirective.propDecorators = {
    childrenField: [{ type: Input }],
    data: [{ type: Input, args: ["kendoTreeListHierarchyBinding",] }]
};
