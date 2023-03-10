/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GridComponent } from "../grid.component";
/**
 * Arguments for the `cellClick` event.
 */
export interface CellClickEvent {
    /**
     * The column of the clicked cell.
     */
    column: any;
    /**
     * The column index of the clicked cell.
     */
    columnIndex: number;
    /**
     * The data item that is associated with the row in which the clicked cell is located.
     */
    dataItem: any;
    /**
     * Indicates if the cell is being edited.
     */
    isEdited: boolean;
    /**
     * The DOM event that triggered the `cellClick` event.
     */
    originalEvent: any;
    /**
     * The row index for the operation.
     */
    rowIndex: number;
    /**
     * The `GridComponent` instance.
     */
    sender: GridComponent;
    /**
     * The type of the event that triggered the `cellClick` event.
     */
    type: 'click' | 'contextmenu';
}
