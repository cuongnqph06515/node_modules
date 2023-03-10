"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("./configuration.service");
var root_configuration_service_1 = require("./root-configuration.service");
/**
 * @hidden
 */
exports.PREFIX = new core_1.InjectionToken('configuration prefix');
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
        this.rootService.notify(new configuration_service_1.Change(this.prefix, store));
    };
    PrefixConfigurationService.prototype.notify = function (change) {
        change.key = this.prefix + (change.key ? "." + change.key : '');
        this.rootService.notify(change);
    };
    PrefixConfigurationService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PrefixConfigurationService.ctorParameters = function () { return [
        { type: root_configuration_service_1.RootConfigurationService, decorators: [{ type: core_1.Inject, args: [root_configuration_service_1.RootConfigurationService,] }] },
        { type: String, decorators: [{ type: core_1.Inject, args: [exports.PREFIX,] }] },
        { type: core_1.NgZone }
    ]; };
    return PrefixConfigurationService;
}(configuration_service_1.ConfigurationService));
exports.PrefixConfigurationService = PrefixConfigurationService;
