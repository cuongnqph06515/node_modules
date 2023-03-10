"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var outliers_component_1 = require("../../../chart/series-item/outliers.component");
/**
 * The outliers configuration of the StockChart navigator series. Applies to mild outliers.
 */
var NavigatorSeriesOutliersComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesOutliersComponent, _super);
    function NavigatorSeriesOutliersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesOutliersComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-outliers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesOutliersComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesOutliersComponent;
}(outliers_component_1.SeriesOutliersComponent));
exports.NavigatorSeriesOutliersComponent = NavigatorSeriesOutliersComponent;
