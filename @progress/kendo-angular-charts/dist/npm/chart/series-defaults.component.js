"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../common/configuration.service");
var series_defaults_component_generated_1 = require("./series-defaults.component.generated");
/**
 * The default options for all series
 * ([see example]({% slug series_chart_charts %}#toc-default-series-configuration)).
 */
var SeriesDefaultsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsComponent, _super);
    // Place custom properties here
    function SeriesDefaultsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesDefaultsComponent;
}(series_defaults_component_generated_1.SeriesDefaultsComponentGenerated));
exports.SeriesDefaultsComponent = SeriesDefaultsComponent;
