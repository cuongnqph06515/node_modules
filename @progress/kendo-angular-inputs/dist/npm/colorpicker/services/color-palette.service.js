/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../common/utils");
/**
 * @hidden
 */
var ColorPaletteService = /** @class */ (function () {
    function ColorPaletteService() {
        this.colorRows = [];
    }
    ColorPaletteService.prototype.setColorMatrix = function (palette, columns) {
        this.colorRows = [];
        if (!(utils_1.isPresent(palette) && palette.length)) {
            return;
        }
        columns = columns || palette.length;
        for (var start = 0; start < palette.length; start += columns) {
            var row = palette.slice(start, columns + start);
            this.colorRows.push(row);
        }
    };
    ColorPaletteService.prototype.getCellCoordsFor = function (color) {
        if (!utils_1.isPresent(color)) {
            return;
        }
        for (var row = 0; row < this.colorRows.length; row++) {
            for (var col = 0; col < this.colorRows[row].length; col++) {
                if (this.colorRows[row][col] === color) {
                    return { row: row, col: col };
                }
            }
        }
    };
    ColorPaletteService.prototype.getColorAt = function (cellCoords) {
        if (!(utils_1.isPresent(cellCoords) && utils_1.isPresent(this.colorRows[cellCoords.row]))) {
            return;
        }
        return this.colorRows[cellCoords.row][cellCoords.col];
    };
    ColorPaletteService.prototype.getNextCell = function (current, horizontalStep, verticalStep) {
        if (!(utils_1.isPresent(current) && utils_1.isPresent(current.row) && utils_1.isPresent(current.col))) {
            return { row: 0, col: 0 };
        }
        var row = this.clampIndex(current.row + verticalStep, this.colorRows.length - 1);
        var col = this.clampIndex(current.col + horizontalStep, this.colorRows[row].length - 1);
        return { row: row, col: col };
    };
    ColorPaletteService.prototype.clampIndex = function (index, max) {
        var minArrayIndex = 0;
        if (index < minArrayIndex) {
            return minArrayIndex;
        }
        if (index > max) {
            return max;
        }
        return index;
    };
    ColorPaletteService.decorators = [
        { type: core_1.Injectable },
    ];
    return ColorPaletteService;
}());
exports.ColorPaletteService = ColorPaletteService;
