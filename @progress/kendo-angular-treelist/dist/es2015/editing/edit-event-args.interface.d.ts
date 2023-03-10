/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TreeListComponent } from "../treelist.component";
/**
 * Arguments for the `remove` event.
 */
export interface EditEvent {
    /**
     * The data item.
     */
    dataItem: any;
    /**
     * Indicates if the data item is new or existing.
     */
    isNew: boolean;
    /**
     * The row index for the operation.
     */
    rowIndex: number;
    /**
     * The `TreeListComponent` instance.
     */
    sender: TreeListComponent;
}
