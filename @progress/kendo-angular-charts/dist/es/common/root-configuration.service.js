import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
/**
 * @hidden
 */
var RootConfigurationService = /** @class */ (function (_super) {
    tslib_1.__extends(RootConfigurationService, _super);
    function RootConfigurationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootConfigurationService.decorators = [
        { type: Injectable },
    ];
    return RootConfigurationService;
}(ConfigurationService));
export { RootConfigurationService };
