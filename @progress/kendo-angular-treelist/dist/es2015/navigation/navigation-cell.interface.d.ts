/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FocusGroup } from './focus-group';
/**
 * The metadata for a focusable TreeList cell.
 * Focusable TreeList cells include headers, group headers and footers, and data cells.
 */
export interface NavigationCell {
    /**
     * @hidden
     */
    uid: number;
    /**
     * The column index of the cell.
     */
    colIndex: number;
    /**
     * The index of the row which contains this cell.
     * The row indexing is absolute and does not change with paging.
     */
    rowIndex: number;
    /**
     * The column span for this cell (if set).
     */
    colSpan?: number;
    /**
     * The row span for this cell (if set).
     */
    rowSpan?: number;
    /**
     * The data item index for the parent row of this cell.
     */
    dataRowIndex: number;
    /**
     * The data item for the parent row of this cell.
     */
    dataItem: any;
    /**
     * @hidden
     */
    parent?: NavigationCell;
    /**
     * @hidden
     */
    focusGroup?: FocusGroup;
}
