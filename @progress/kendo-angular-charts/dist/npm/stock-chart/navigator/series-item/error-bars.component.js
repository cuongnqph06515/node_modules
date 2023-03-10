"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var error_bars_component_1 = require("../../../chart/series-item/error-bars.component");
/**
 * The error bars of the StockChart navigator series.
 */
var NavigatorSeriesErrorBarsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesErrorBarsComponent, _super);
    function NavigatorSeriesErrorBarsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesErrorBarsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-error-bars',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesErrorBarsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesErrorBarsComponent;
}(error_bars_component_1.SeriesErrorBarsComponent));
exports.NavigatorSeriesErrorBarsComponent = NavigatorSeriesErrorBarsComponent;
