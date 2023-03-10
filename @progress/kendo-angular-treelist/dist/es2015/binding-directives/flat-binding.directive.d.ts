/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TreeListComponent } from '../treelist.component';
import { BaseBindingDirective } from './base-binding.directive';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_treelist %}),
 * [sorting]({% slug sorting_treelist %}), and [filtering]({% slug filtering_treelist %})
 * ([more information and examples]({% slug databinding_treelist %})).
 */
export declare class FlatBindingDirective extends BaseBindingDirective {
    protected treelist: TreeListComponent;
    /**
     * The name of the field which contains the identifier of the parent node.
     */
    parentIdField: string;
    /**
     * The name of the field which contains the unique identifier of the node.
     */
    idField: string;
    /**
     * The array of data which will be used to populate the TreeList.
     */
    data: any[];
    idGetter: any;
    idSetter: any;
    parentIdGetter: any;
    parentIdSetter: any;
    constructor(treelist: TreeListComponent, localDataChanges: LocalDataChangesService);
    protected getChildren(item?: any): any;
    protected itemKey(item: any): void;
}
