/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var ZoneAwareEventEmitter = /** @class */ (function (_super) {
    tslib_1.__extends(ZoneAwareEventEmitter, _super);
    function ZoneAwareEventEmitter(ngZone, isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        var _this = _super.call(this, isAsync) || this;
        _this.ngZone = ngZone;
        return _this;
    }
    ZoneAwareEventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var _this = this;
        var schedulerFn;
        var errorFn = function (_) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = function (value) { _this.ngZone.run(function () { return generatorOrNext.next(value); }); };
            if (generatorOrNext.error) {
                errorFn = function (err) { _this.ngZone.run(function () { return generatorOrNext.error(err); }); };
            }
            if (generatorOrNext.complete) {
                completeFn = function () { _this.ngZone.run(function () { return generatorOrNext.complete(); }); };
            }
        }
        else {
            schedulerFn = function (value) { _this.ngZone.run(function () { return generatorOrNext(value); }); };
            if (error) {
                errorFn = function (err) { _this.ngZone.run(function () { return error(err); }); };
            }
            if (complete) {
                completeFn = function () { _this.ngZone.run(function () { return complete(); }); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return ZoneAwareEventEmitter;
}(core_1.EventEmitter));
exports.ZoneAwareEventEmitter = ZoneAwareEventEmitter;
