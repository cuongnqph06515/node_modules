"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var crosshair_component_generated_1 = require("../x-axis-item/crosshair.component.generated");
/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
var XAxisCrosshairComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisCrosshairComponent, _super);
    // Place custom properties here
    function XAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    XAxisCrosshairComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisCrosshairComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return XAxisCrosshairComponent;
}(crosshair_component_generated_1.XAxisCrosshairComponentGenerated));
exports.XAxisCrosshairComponent = XAxisCrosshairComponent;
