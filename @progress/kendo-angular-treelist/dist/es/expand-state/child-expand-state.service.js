/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpandStateService } from '../common/expand-state.service';
import { ExpandEvent } from './expand-event';
/**
 * @hidden
 */
var ChildExpandStateService = /** @class */ (function (_super) {
    tslib_1.__extends(ChildExpandStateService, _super);
    function ChildExpandStateService() {
        return _super.call(this, true) || this;
    }
    ChildExpandStateService.prototype.emitEvent = function (args) {
        var expandArgs = new ExpandEvent(args);
        this.changes.next(expandArgs);
        return expandArgs.isDefaultPrevented();
    };
    ChildExpandStateService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChildExpandStateService.ctorParameters = function () { return []; };
    return ChildExpandStateService;
}(ExpandStateService));
export { ChildExpandStateService };
