/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Action } from '../models/navigation-action.enum';
import { BusViewService } from '../services/bus-view.service';
var KEY_TO_ACTION = {
    '33': Action.PrevView,
    '34': Action.NextView,
    '35': Action.LastInView,
    '36': Action.FirstInView,
    '37': Action.Left,
    '38': Action.Up,
    '39': Action.Right,
    '40': Action.Down,
    'meta+38': Action.UpperView,
    'meta+40': Action.LowerView
};
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(bus) {
        this.bus = bus;
    }
    NavigationService.prototype.action = function (event) {
        var action = "" + (event.ctrlKey || event.metaKey ? 'meta+' : '') + event.keyCode;
        return KEY_TO_ACTION[action];
    };
    NavigationService.prototype.move = function (value, action, activeView) {
        var service = this.bus.service(activeView);
        if (!service) {
            return value;
        }
        if (action === Action.UpperView && this.bus.canMoveUp(activeView)) {
            this.bus.moveUp(activeView);
            return value;
        }
        if (action === Action.LowerView && this.bus.canMoveDown(activeView)) {
            this.bus.moveDown(activeView);
            return value;
        }
        return service.move(value, action);
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: BusViewService }
    ]; };
    return NavigationService;
}());
export { NavigationService };
