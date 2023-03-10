/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
/**
 * Base class that acts as a component messages container.
 *
 * For internal use.
 * @hidden
 */
var ComponentMessages = /** @class */ (function () {
    function ComponentMessages() {
    }
    Object.defineProperty(ComponentMessages.prototype, "override", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ComponentMessages.prototype.ngOnChanges = function (changes) {
        this.register(changes);
        if (Object.keys(changes).some(function (field) { return !changes[field].isFirstChange(); })) {
            this.service.notifyChanges();
        }
    };
    ComponentMessages.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.service.changes.pipe(operators_1.skip(1)).subscribe(function () { return _this.register(_this); });
    };
    ComponentMessages.prototype.register = function (changes) {
        var _this = this;
        var keys = Object.keys(changes);
        keys.forEach(function (key) { return _this.service.register(key, _this[key], _this.override); });
    };
    ComponentMessages.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    return ComponentMessages;
}());
exports.ComponentMessages = ComponentMessages;
