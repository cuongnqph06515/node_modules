/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("../common/preventable-event");
/**
 * Arguments for the `excelExport` event.
 */
var ExcelExportEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ExcelExportEvent, _super);
    function ExcelExportEvent(workbook) {
        var _this = _super.call(this) || this;
        _this.workbook = workbook;
        return _this;
    }
    return ExcelExportEvent;
}(preventable_event_1.PreventableEvent));
exports.ExcelExportEvent = ExcelExportEvent;
