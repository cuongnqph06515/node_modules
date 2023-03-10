import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesLabelsComponent } from '../../../chart/series-item/labels.component';
/**
 * The label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesLabelsComponent, _super);
    function NavigatorSeriesLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsComponent;
}(SeriesLabelsComponent));
export { NavigatorSeriesLabelsComponent };
