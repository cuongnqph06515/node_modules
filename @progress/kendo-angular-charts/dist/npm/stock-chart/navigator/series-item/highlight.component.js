"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var highlight_component_1 = require("../../../chart/series-item/highlight.component");
/**
 * The configuration options of the StockChart series highlight.
 */
var NavigatorSeriesHighlightComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesHighlightComponent, _super);
    function NavigatorSeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesHighlightComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-highlight',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesHighlightComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesHighlightComponent;
}(highlight_component_1.SeriesHighlightComponent));
exports.NavigatorSeriesHighlightComponent = NavigatorSeriesHighlightComponent;
