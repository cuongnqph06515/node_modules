/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
var ExpandStateService = /** @class */ (function () {
    function ExpandStateService(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Map();
    }
    ExpandStateService.prototype.toggleRow = function (id, dataItem) {
        var isExpanded = this.isExpanded(id);
        if (!this.emitEvent({ dataItem: dataItem, expand: !isExpanded })) {
            this.rowState.set(id, !isExpanded);
        }
    };
    ExpandStateService.prototype.isExpanded = function (id) {
        return this.rowState.has(id) ? this.rowState.get(id) : !this.isInitiallyCollapsed;
    };
    ExpandStateService.prototype.reset = function () {
        this.rowState.clear();
    };
    ExpandStateService.prototype.emitEvent = function (args) {
        this.changes.next(args);
        return false;
    };
    return ExpandStateService;
}());
export { ExpandStateService };
