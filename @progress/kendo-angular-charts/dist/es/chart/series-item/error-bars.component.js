import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesErrorBarsComponentGenerated } from '../series-item/error-bars.component.generated';
/**
 * The error bars of the Chart series
 * ([see example]({% slug errorbars_chart_charts %})).
 */
var SeriesErrorBarsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesErrorBarsComponent, _super);
    // Place custom properties here
    function SeriesErrorBarsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesErrorBarsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-error-bars',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesErrorBarsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesErrorBarsComponent;
}(SeriesErrorBarsComponentGenerated));
export { SeriesErrorBarsComponent };
