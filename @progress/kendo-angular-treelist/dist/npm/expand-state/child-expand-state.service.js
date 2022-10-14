/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var expand_state_service_1 = require("../common/expand-state.service");
var expand_event_1 = require("./expand-event");
/**
 * @hidden
 */
var ChildExpandStateService = /** @class */ (function (_super) {
    tslib_1.__extends(ChildExpandStateService, _super);
    function ChildExpandStateService() {
        return _super.call(this, true) || this;
    }
    ChildExpandStateService.prototype.emitEvent = function (args) {
        var expandArgs = new expand_event_1.ExpandEvent(args);
        this.changes.next(expandArgs);
        return expandArgs.isDefaultPrevented();
    };
    ChildExpandStateService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ChildExpandStateService.ctorParameters = function () { return []; };
    return ChildExpandStateService;
}(expand_state_service_1.ExpandStateService));
exports.ChildExpandStateService = ChildExpandStateService;
