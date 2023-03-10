import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { PlotAreaComponentGenerated } from './plot-area.component.generated';
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-plot-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PlotAreaComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return PlotAreaComponent;
}(PlotAreaComponentGenerated));
export { PlotAreaComponent };
