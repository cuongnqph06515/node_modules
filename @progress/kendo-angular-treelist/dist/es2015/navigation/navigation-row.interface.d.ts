/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NavigationCell } from './navigation-cell.interface';
/**
 * The metadata for a focusable TreeList row. Focusable rows include
 * headers, group headers and footers, and data rows.
 */
export interface NavigationRow {
    /**
     * @hidden
     */
    uid: number;
    /**
     * The index of the focusable row. The row index is absolute and
     * does not change with paging. Typically, the first header row is at index `0`.
     */
    index: number;
    /**
     * The data item index for this row.
     */
    dataRowIndex: number;
    /**
     * The data item for this row.
     */
    dataItem: any;
    /**
     * An array of focusable cells which are associated with this row.
     */
    cells: NavigationCell[];
}
