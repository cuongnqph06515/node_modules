/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Output, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var PopupTableGridComponent = /** @class */ (function () {
    function PopupTableGridComponent() {
        this.cellClick = new EventEmitter();
        this.tableWizardClick = new EventEmitter();
        this.state = { rows: -1, cols: -1 };
        this.rows = 6;
        this.cols = 8;
    }
    Object.defineProperty(PopupTableGridComponent.prototype, "message", {
        get: function () {
            var _a = this.state, rows = _a.rows, cols = _a.cols;
            return "Create a " + (rows > -1 ? rows + 1 : '') + " " + (cols > -1 ? 'x' : '') + " " + (cols > -1 ? cols + 1 : '') + " table";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupTableGridComponent.prototype, "cells", {
        get: function () {
            return Array.from(Array(this.rows * this.cols).keys());
        },
        enumerable: true,
        configurable: true
    });
    PopupTableGridComponent.prototype.selected = function (index) {
        var _a = this.state, rows = _a.rows, cols = _a.cols;
        var cellRow = Math.floor(index / this.cols);
        var cellCol = index % this.cols;
        return cellRow <= rows && cellCol <= cols;
    };
    PopupTableGridComponent.prototype.setState = function (index) {
        var rows = Math.floor(index / this.cols);
        var cols = index % this.cols;
        this.state = { rows: rows, cols: cols };
    };
    PopupTableGridComponent.prototype.resetState = function () {
        this.state = { rows: -1, cols: -1 };
    };
    PopupTableGridComponent.prototype.insertTable = function () {
        this.cellClick.emit(this.state);
    };
    PopupTableGridComponent.prototype.openTableWizard = function () {
        this.tableWizardClick.emit();
    };
    PopupTableGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-popup-table-grid',
                    template: "\n        <div style=\"border-color: inherit;\" (mouseleave)=\"resetState()\" (click)=\"insertTable()\">\n            <span *ngFor=\"let i of cells\"\n                class=\"k-ct-cell\"\n                [class.k-state-selected]=\"selected(i)\"\n                [class.k-state-disabled]=\"!selected(i)\"\n                (mouseenter)=\"setState(i)\">\n            </span>\n        </div>\n        <div class=\"k-status\" unselectable=\"on\">{{ message }}</div>\n        <!-- uncomment when TableWizard is completed\n        <div class=\"k-editor-toolbar\" unselectable=\"on\">\n            <button type=\"button\" kendoButton class=\"k-tool\" [icon]=\"'table-wizard'\" (click)=\"openTableWizard()\" title=\"Table Wizard\">Table Wizard</button>\n        </div>\n        -->\n    "
                },] },
    ];
    PopupTableGridComponent.propDecorators = {
        cellClick: [{ type: Output }],
        tableWizardClick: [{ type: Output }]
    };
    return PopupTableGridComponent;
}());
export { PopupTableGridComponent };
