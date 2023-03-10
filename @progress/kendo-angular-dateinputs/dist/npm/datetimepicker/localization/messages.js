/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        toggle: [{ type: core_1.Input }],
        dateTab: [{ type: core_1.Input }],
        dateTabLabel: [{ type: core_1.Input }],
        timeTab: [{ type: core_1.Input }],
        timeTabLabel: [{ type: core_1.Input }],
        accept: [{ type: core_1.Input }],
        acceptLabel: [{ type: core_1.Input }],
        cancel: [{ type: core_1.Input }],
        cancelLabel: [{ type: core_1.Input }],
        today: [{ type: core_1.Input }],
        now: [{ type: core_1.Input }],
        nowLabel: [{ type: core_1.Input }]
    };
    return Messages;
}(kendo_angular_l10n_1.ComponentMessages));
exports.Messages = Messages;
