/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
export class ExpandStateService {
    constructor(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Map();
    }
    toggleRow(id, dataItem) {
        const isExpanded = this.isExpanded(id);
        if (!this.emitEvent({ dataItem: dataItem, expand: !isExpanded })) {
            this.rowState.set(id, !isExpanded);
        }
    }
    isExpanded(id) {
        return this.rowState.has(id) ? this.rowState.get(id) : !this.isInitiallyCollapsed;
    }
    reset() {
        this.rowState.clear();
    }
    emitEvent(args) {
        this.changes.next(args);
        return false;
    }
}
