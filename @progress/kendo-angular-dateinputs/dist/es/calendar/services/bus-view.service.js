/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a;
import { EventEmitter, Injectable, Injector } from '@angular/core';
import { CenturyViewService } from '../services/century-view.service';
import { DecadeViewService } from '../services/decade-view.service';
import { MonthViewService } from '../services/month-view.service';
import { YearViewService } from '../services/year-view.service';
import { CalendarViewEnum } from '../models/view.enum';
var services = (_a = {},
    _a[CalendarViewEnum.month] = MonthViewService,
    _a[CalendarViewEnum.year] = YearViewService,
    _a[CalendarViewEnum.decade] = DecadeViewService,
    _a[CalendarViewEnum.century] = CenturyViewService,
    _a);
var viewOffset = function (view, offset) {
    var candidate = CalendarViewEnum[CalendarViewEnum[view + offset]];
    return candidate !== undefined ? candidate : view;
};
var ɵ0 = viewOffset;
/**
 * @hidden
 */
var BusViewService = /** @class */ (function () {
    function BusViewService(injector) {
        this.injector = injector;
        this.viewChanged = new EventEmitter();
        this.bottom = CalendarViewEnum.month;
        this.top = CalendarViewEnum.century;
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
        { type: Injectable },
    ];
    /** @nocollapse */
    BusViewService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return BusViewService;
}());
export { BusViewService };
export { ɵ0 };
