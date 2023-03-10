/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { MessageService } from './message.service';
import { RTL } from './rtl';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
/**
 * Localization prefix for the component messages.
 *
 * For internal use.
 * @hidden
 */
export var L10N_PREFIX = new InjectionToken('Localization key prefix');
/**
 * Component localization service.
 *
 * For internal use.
 * @hidden
 */
var LocalizationService = /** @class */ (function () {
    function LocalizationService(prefix, messageService, _rtl) {
        var _this = this;
        this.prefix = prefix;
        this.messageService = messageService;
        this._rtl = _rtl;
        this.changes = new BehaviorSubject({ rtl: this._rtl });
        this.dictionary = {};
        if (messageService) {
            this.subscription = messageService.changes
                .pipe(map(function (_a) {
                var rtl = _a.rtl;
                return rtl !== undefined ? rtl : _this._rtl;
            }), tap(function (rtl) { return _this._rtl = rtl; }))
                .subscribe(function (rtl) {
                _this.dictionary = {};
                _this.changes.next({ rtl: rtl });
            });
        }
    }
    Object.defineProperty(LocalizationService.prototype, "rtl", {
        get: function () {
            return this._rtl;
        },
        enumerable: true,
        configurable: true
    });
    LocalizationService.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    LocalizationService.prototype.get = function (shortKey) {
        var key = this.key(shortKey);
        return this.dictionary[key];
    };
    LocalizationService.prototype.register = function (shortKey, value, override) {
        if (override === void 0) { override = false; }
        var key = this.key(shortKey);
        var message = value;
        if (!override) {
            if (this.dictionary.hasOwnProperty(key)) {
                return;
            }
            message = this.defaultValue(key, value);
        }
        this.dictionary[key] = message;
    };
    LocalizationService.prototype.notifyChanges = function () {
        this.changes.next({ rtl: this.rtl });
    };
    LocalizationService.prototype.key = function (shortKey) {
        return this.prefix + '.' + shortKey;
    };
    LocalizationService.prototype.defaultValue = function (key, value) {
        if (!this.messageService) {
            return value;
        }
        var alt = this.messageService.get(key);
        return (alt === undefined) ? value : alt;
    };
    LocalizationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    return LocalizationService;
}());
export { LocalizationService };
