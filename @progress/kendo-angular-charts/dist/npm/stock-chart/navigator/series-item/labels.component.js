"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var labels_component_1 = require("../../../chart/series-item/labels.component");
/**
 * The label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesLabelsComponent, _super);
    function NavigatorSeriesLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsComponent;
}(labels_component_1.SeriesLabelsComponent));
exports.NavigatorSeriesLabelsComponent = NavigatorSeriesLabelsComponent;
