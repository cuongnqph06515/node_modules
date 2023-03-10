import * as tslib_1 from "tslib";
import { Injectable, Inject, InjectionToken, NgZone } from '@angular/core';
import { ConfigurationService, Change } from './configuration.service';
import { RootConfigurationService } from './root-configuration.service';
/**
 * @hidden
 */
export var PREFIX = new InjectionToken('configuration prefix');
/**
 * @hidden
 */
var PrefixConfigurationService = /** @class */ (function (_super) {
    tslib_1.__extends(PrefixConfigurationService, _super);
    function PrefixConfigurationService(rootService, prefix, ngZone) {
        var _this = _super.call(this, ngZone) || this;
        _this.rootService = rootService;
        _this.prefix = prefix;
        return _this;
    }
    PrefixConfigurationService.prototype.push = function (store) {
        this.rootService.notify(new Change(this.prefix, store));
    };
    PrefixConfigurationService.prototype.notify = function (change) {
        change.key = this.prefix + (change.key ? "." + change.key : '');
        this.rootService.notify(change);
    };
    PrefixConfigurationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PrefixConfigurationService.ctorParameters = function () { return [
        { type: RootConfigurationService, decorators: [{ type: Inject, args: [RootConfigurationService,] }] },
        { type: String, decorators: [{ type: Inject, args: [PREFIX,] }] },
        { type: NgZone }
    ]; };
    return PrefixConfigurationService;
}(ConfigurationService));
export { PrefixConfigurationService };
