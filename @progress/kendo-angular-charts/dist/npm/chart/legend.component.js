"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../common/configuration.service");
var legend_component_generated_1 = require("./legend.component.generated");
/**
 * The configuration options of the Chart legend
 * ([see example]({% slug legend_chart_charts %})).
 */
var LegendComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendComponent, _super);
    // Place custom properties here
    function LegendComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    LegendComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return LegendComponent;
}(legend_component_generated_1.LegendComponentGenerated));
exports.LegendComponent = LegendComponent;
