"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var extremes_component_generated_1 = require("../series-item/extremes.component.generated");
/**
 * The configuration of the Chart series extremes.
 * Applies to extreme outliers.
 * For more information, refer to [`series.outliers`]({% slug api_charts_seriesitemcomponent %}#toc-outliers).
 */
var SeriesExtremesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesExtremesComponent, _super);
    // Place custom properties here
    function SeriesExtremesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesExtremesComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-extremes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesExtremesComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesExtremesComponent;
}(extremes_component_generated_1.SeriesExtremesComponentGenerated));
exports.SeriesExtremesComponent = SeriesExtremesComponent;
