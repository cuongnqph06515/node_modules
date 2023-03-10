/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var NavigationMetadata = /** @class */ (function () {
    function NavigationMetadata(view, headerRows, isVirtual, hasPager, treelistElement, virtualColumns, columns) {
        this.view = view;
        this.headerRows = headerRows;
        this.isVirtual = isVirtual;
        this.hasPager = hasPager;
        this.treelistElement = treelistElement;
        this.virtualColumns = virtualColumns;
        this.columns = columns;
    }
    Object.defineProperty(NavigationMetadata.prototype, "maxLogicalRowIndex", {
        get: function () {
            return this.headerRows + this.dataRows - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationMetadata.prototype, "dataRows", {
        get: function () {
            return this.isVirtual ? this.view.total : this.view.data.length;
        },
        enumerable: true,
        configurable: true
    });
    return NavigationMetadata;
}());
export { NavigationMetadata };
