"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var markers_component_1 = require("../../../chart/series-item/markers.component");
/**
 * The marker configuration of the StockChart navigator series.
 */
var NavigatorSeriesMarkersComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesMarkersComponent, _super);
    function NavigatorSeriesMarkersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesMarkersComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-markers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesMarkersComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesMarkersComponent;
}(markers_component_1.SeriesMarkersComponent));
exports.NavigatorSeriesMarkersComponent = NavigatorSeriesMarkersComponent;
