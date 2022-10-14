/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { TreeListComponent } from '../treelist.component';
import { getter, setter } from '@progress/kendo-common';
import { BaseBindingDirective } from './base-binding.directive';
import { FlatEditService } from '../editing-directives/flat-edit.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { isPresent } from '../utils';
const ROOT_ID = null;
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_treelist %}),
 * [sorting]({% slug sorting_treelist %}), and [filtering]({% slug filtering_treelist %})
 * ([more information and examples]({% slug databinding_treelist %})).
 */
export class FlatBindingDirective extends BaseBindingDirective {
    constructor(treelist, localDataChanges) {
        super(treelist);
        this.treelist = treelist;
        this.idGetter = getter('id');
        this.idSetter = setter('id');
        this.parentIdGetter = getter('parentId');
        this.parentIdSetter = setter('parentId');
        treelist.localEditService = new FlatEditService(this, localDataChanges);
    }
    /**
     * The name of the field which contains the identifier of the parent node.
     */
    set parentIdField(value) {
        this.parentIdGetter = getter(value);
        this.parentIdSetter = setter(value);
    }
    /**
     * The name of the field which contains the unique identifier of the node.
     */
    set idField(value) {
        this.idGetter = getter(value);
        this.idSetter = setter(value);
    }
    /**
     * The array of data which will be used to populate the TreeList.
     */
    set data(value) {
        this.originalData = value || [];
        this.dataChanged = true;
    }
    getChildren(item) {
        const id = this.itemKey(item);
        const children = id === ROOT_ID ?
            this.originalData.filter(o => !isPresent(this.parentIdGetter(o))) :
            this.originalData.filter(o => this.parentIdGetter(o) === id);
        return children;
    }
    itemKey(item) {
        return item ? this.idGetter(item) : ROOT_ID;
    }
}
FlatBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListFlatBinding]'
            },] },
];
/** @nocollapse */
FlatBindingDirective.ctorParameters = () => [
    { type: TreeListComponent },
    { type: LocalDataChangesService }
];
FlatBindingDirective.propDecorators = {
    parentIdField: [{ type: Input }],
    idField: [{ type: Input }],
    data: [{ type: Input, args: ["kendoTreeListFlatBinding",] }]
};
