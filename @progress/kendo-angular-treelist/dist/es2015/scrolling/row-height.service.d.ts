/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export declare class RowHeightService {
    private total;
    private rowHeight;
    private offsets;
    private heights;
    constructor(total: number, rowHeight: number);
    height(rowIndex: number): number;
    isExpanded(rowIndex: number): boolean;
    index(position: number): number;
    offset(rowIndex: number): number;
    totalHeight(): number;
}
