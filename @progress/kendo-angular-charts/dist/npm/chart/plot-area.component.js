"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../common/configuration.service");
var plot_area_component_generated_1 = require("./plot-area.component.generated");
/**
 * The configuration options of the plot area
 * ([see example]({% slug plotarea_chart_charts %})).
 * The plot area is the area which displays the series.
 */
var PlotAreaComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PlotAreaComponent, _super);
    // Place custom properties here
    function PlotAreaComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PlotAreaComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-plot-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PlotAreaComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return PlotAreaComponent;
}(plot_area_component_generated_1.PlotAreaComponentGenerated));
exports.PlotAreaComponent = PlotAreaComponent;
