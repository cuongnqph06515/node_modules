"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var labels_to_component_1 = require("../../../chart/series-item/labels.to.component");
/**
 * The `to` label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsToComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesLabelsToComponent, _super);
    function NavigatorSeriesLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsToComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsToComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsToComponent;
}(labels_to_component_1.SeriesLabelsToComponent));
exports.NavigatorSeriesLabelsToComponent = NavigatorSeriesLabelsToComponent;
