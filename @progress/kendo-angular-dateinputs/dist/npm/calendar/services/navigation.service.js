/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var navigation_action_enum_1 = require("../models/navigation-action.enum");
var bus_view_service_1 = require("../services/bus-view.service");
var KEY_TO_ACTION = {
    '33': navigation_action_enum_1.Action.PrevView,
    '34': navigation_action_enum_1.Action.NextView,
    '35': navigation_action_enum_1.Action.LastInView,
    '36': navigation_action_enum_1.Action.FirstInView,
    '37': navigation_action_enum_1.Action.Left,
    '38': navigation_action_enum_1.Action.Up,
    '39': navigation_action_enum_1.Action.Right,
    '40': navigation_action_enum_1.Action.Down,
    'meta+38': navigation_action_enum_1.Action.UpperView,
    'meta+40': navigation_action_enum_1.Action.LowerView
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
        if (action === navigation_action_enum_1.Action.UpperView && this.bus.canMoveUp(activeView)) {
            this.bus.moveUp(activeView);
            return value;
        }
        if (action === navigation_action_enum_1.Action.LowerView && this.bus.canMoveDown(activeView)) {
            this.bus.moveDown(activeView);
            return value;
        }
        return service.move(value, action);
    };
    NavigationService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService }
    ]; };
    return NavigationService;
}());
exports.NavigationService = NavigationService;
