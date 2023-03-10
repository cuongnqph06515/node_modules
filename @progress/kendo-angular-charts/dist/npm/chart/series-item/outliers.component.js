"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var outliers_component_generated_1 = require("../series-item/outliers.component.generated");
/**
 * The configuration of the Chart series outliers.
 * Applies to mild outliers.
 * For more information, refer to the [`series.extremes`]({% slug api_charts_seriesitemcomponent %}#toc-extremes) option.
 */
var SeriesOutliersComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesOutliersComponent, _super);
    // Place custom properties here
    function SeriesOutliersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesOutliersComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-outliers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesOutliersComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesOutliersComponent;
}(outliers_component_generated_1.SeriesOutliersComponentGenerated));
exports.SeriesOutliersComponent = SeriesOutliersComponent;
