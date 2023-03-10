"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("./configuration.service");
/**
 * @hidden
 */
var RootConfigurationService = /** @class */ (function (_super) {
    tslib_1.__extends(RootConfigurationService, _super);
    function RootConfigurationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootConfigurationService.decorators = [
        { type: core_1.Injectable },
    ];
    return RootConfigurationService;
}(configuration_service_1.ConfigurationService));
exports.RootConfigurationService = RootConfigurationService;
