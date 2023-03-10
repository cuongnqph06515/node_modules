import { Injectable } from '@angular/core';
/**
 * @hidden
 */
var IndexBuilderService = /** @class */ (function () {
    function IndexBuilderService() {
        this.INDEX_SEPARATOR = '_';
    }
    IndexBuilderService.prototype.nodeIndex = function (index, parentIndex) {
        if (index === void 0) { index = ''; }
        if (parentIndex === void 0) { parentIndex = ''; }
        return "" + parentIndex + (parentIndex ? this.INDEX_SEPARATOR : '') + index;
    };
    IndexBuilderService.prototype.indexForLevel = function (index, level) {
        return index.split(this.INDEX_SEPARATOR).slice(0, level).join(this.INDEX_SEPARATOR);
    };
    IndexBuilderService.prototype.lastLevelIndex = function (index) {
        if (index === void 0) { index = ''; }
        var parts = index.split(this.INDEX_SEPARATOR);
        if (!parts.length) {
            return NaN;
        }
        return parseInt(parts[parts.length - 1], 10);
    };
    IndexBuilderService.prototype.level = function (index) {
        return index.split(this.INDEX_SEPARATOR).length;
    };
    IndexBuilderService.decorators = [
        { type: Injectable },
    ];
    return IndexBuilderService;
}());
export { IndexBuilderService };
