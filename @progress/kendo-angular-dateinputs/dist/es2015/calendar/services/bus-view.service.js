/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, Injector } from '@angular/core';
import { CenturyViewService } from '../services/century-view.service';
import { DecadeViewService } from '../services/decade-view.service';
import { MonthViewService } from '../services/month-view.service';
import { YearViewService } from '../services/year-view.service';
import { CalendarViewEnum } from '../models/view.enum';
const services = {
    [CalendarViewEnum.month]: MonthViewService,
    [CalendarViewEnum.year]: YearViewService,
    [CalendarViewEnum.decade]: DecadeViewService,
    [CalendarViewEnum.century]: CenturyViewService
};
const viewOffset = (view, offset) => {
    const candidate = CalendarViewEnum[CalendarViewEnum[view + offset]];
    return candidate !== undefined ? candidate : view;
};
const ɵ0 = viewOffset;
/**
 * @hidden
 */
export class BusViewService {
    constructor(injector) {
        this.injector = injector;
        this.viewChanged = new EventEmitter();
        this.bottom = CalendarViewEnum.month;
        this.top = CalendarViewEnum.century;
    }
    configure(bottom, top) {
        this.bottom = bottom;
        this.top = top;
    }
    service(view) {
        const serviceType = services[view];
        return serviceType ? this.injector.get(serviceType) : null;
    }
    moveDown(view) {
        this.move(view, -1);
    }
    moveUp(view) {
        this.move(view, 1);
    }
    moveToBottom(activeView) {
        if (activeView === this.bottom) {
            return;
        }
        this.viewChanged.emit({ view: this.bottom });
    }
    canMoveDown(view) {
        return this.bottom < view;
    }
    canMoveUp(view) {
        return view < this.top;
    }
    clamp(view) {
        if (view < this.bottom) {
            return this.bottom;
        }
        if (view > this.top) {
            return this.top;
        }
        return view;
    }
    move(view, offset) {
        const candidate = this.clamp(viewOffset(view, offset));
        if (candidate === view) {
            return;
        }
        this.viewChanged.emit({ view: candidate });
    }
}
BusViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BusViewService.ctorParameters = () => [
    { type: Injector }
];
export { ɵ0 };
