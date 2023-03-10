"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var labels_from_component_1 = require("../../../chart/series-item/labels.from.component");
/**
 * The `from` label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsFromComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesLabelsFromComponent, _super);
    function NavigatorSeriesLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsFromComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsFromComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsFromComponent;
}(labels_from_component_1.SeriesLabelsFromComponent));
exports.NavigatorSeriesLabelsFromComponent = NavigatorSeriesLabelsFromComponent;
