import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesMarkersComponent } from '../../../chart/series-item/markers.component';
/**
 * The marker configuration of the StockChart navigator series.
 */
var NavigatorSeriesMarkersComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesMarkersComponent, _super);
    function NavigatorSeriesMarkersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesMarkersComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-markers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesMarkersComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesMarkersComponent;
}(SeriesMarkersComponent));
export { NavigatorSeriesMarkersComponent };
