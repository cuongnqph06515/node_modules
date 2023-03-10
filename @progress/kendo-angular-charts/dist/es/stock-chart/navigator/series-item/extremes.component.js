import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesExtremesComponent } from '../../../chart/series-item/extremes.component';
/**
 * The extremes configuration of the StockChart navigator series. Applies to extreme outliers.
 */
var NavigatorSeriesExtremesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesExtremesComponent, _super);
    function NavigatorSeriesExtremesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesExtremesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-extremes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesExtremesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesExtremesComponent;
}(SeriesExtremesComponent));
export { NavigatorSeriesExtremesComponent };
