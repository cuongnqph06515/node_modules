/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export class NavigationMetadata {
    constructor(view, headerRows, isVirtual, hasPager, treelistElement, virtualColumns, columns) {
        this.view = view;
        this.headerRows = headerRows;
        this.isVirtual = isVirtual;
        this.hasPager = hasPager;
        this.treelistElement = treelistElement;
        this.virtualColumns = virtualColumns;
        this.columns = columns;
    }
    get maxLogicalRowIndex() {
        return this.headerRows + this.dataRows - 1;
    }
    get dataRows() {
        return this.isVirtual ? this.view.total : this.view.data.length;
    }
}
