/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var core_1 = require("@angular/core");
var century_view_service_1 = require("../services/century-view.service");
var decade_view_service_1 = require("../services/decade-view.service");
var month_view_service_1 = require("../services/month-view.service");
var year_view_service_1 = require("../services/year-view.service");
var view_enum_1 = require("../models/view.enum");
var services = (_a = {},
    _a[view_enum_1.CalendarViewEnum.month] = month_view_service_1.MonthViewService,
    _a[view_enum_1.CalendarViewEnum.year] = year_view_service_1.YearViewService,
    _a[view_enum_1.CalendarViewEnum.decade] = decade_view_service_1.DecadeViewService,
    _a[view_enum_1.CalendarViewEnum.century] = century_view_service_1.CenturyViewService,
    _a);
var viewOffset = function (view, offset) {
    var candidate = view_enum_1.CalendarViewEnum[view_enum_1.CalendarViewEnum[view + offset]];
    return candidate !== undefined ? candidate : view;
};
var ɵ0 = viewOffset;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var BusViewService = /** @class */ (function () {
    function BusViewService(injector) {
        this.injector = injector;
        this.viewChanged = new core_1.EventEmitter();
        this.bottom = view_enum_1.CalendarViewEnum.month;
        this.top = view_enum_1.CalendarViewEnum.century;
    }
    BusViewService.prototype.configure = function (bottom, top) {
        this.bottom = bottom;
        this.top = top;
    };
    BusViewService.prototype.service = function (view) {
        var serviceType = services[view];
        return serviceType ? this.injector.get(serviceType) : null;
    };
    BusViewService.prototype.moveDown = function (view) {
        this.move(view, -1);
    };
    BusViewService.prototype.moveUp = function (view) {
        this.move(view, 1);
    };
    BusViewService.prototype.moveToBottom = function (activeView) {
        if (activeView === this.bottom) {
            return;
        }
        this.viewChanged.emit({ view: this.bottom });
    };
    BusViewService.prototype.canMoveDown = function (view) {
        return this.bottom < view;
    };
    BusViewService.prototype.canMoveUp = function (view) {
        return view < this.top;
    };
    BusViewService.prototype.clamp = function (view) {
        if (view < this.bottom) {
            return this.bottom;
        }
        if (view > this.top) {
            return this.top;
        }
        return view;
    };
    BusViewService.prototype.move = function (view, offset) {
        var candidate = this.clamp(viewOffset(view, offset));
        if (candidate === view) {
            return;
        }
        this.viewChanged.emit({ view: candidate });
    };
    BusViewService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BusViewService.ctorParameters = function () { return [
        { type: core_1.Injector }
    ]; };
    return BusViewService;
}());
exports.BusViewService = BusViewService;
