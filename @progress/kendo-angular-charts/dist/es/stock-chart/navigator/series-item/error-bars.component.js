import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesErrorBarsComponent } from '../../../chart/series-item/error-bars.component';
/**
 * The error bars of the StockChart navigator series.
 */
var NavigatorSeriesErrorBarsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesErrorBarsComponent, _super);
    function NavigatorSeriesErrorBarsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesErrorBarsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-error-bars',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesErrorBarsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesErrorBarsComponent;
}(SeriesErrorBarsComponent));
export { NavigatorSeriesErrorBarsComponent };
