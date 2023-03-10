import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesLabelsToComponent } from '../../../chart/series-item/labels.to.component';
/**
 * The `to` label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsToComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesLabelsToComponent, _super);
    function NavigatorSeriesLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsToComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsToComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsToComponent;
}(SeriesLabelsToComponent));
export { NavigatorSeriesLabelsToComponent };
