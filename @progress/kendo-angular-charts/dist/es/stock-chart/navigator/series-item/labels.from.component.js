import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesLabelsFromComponent } from '../../../chart/series-item/labels.from.component';
/**
 * The `from` label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsFromComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesLabelsFromComponent, _super);
    function NavigatorSeriesLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsFromComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsFromComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsFromComponent;
}(SeriesLabelsFromComponent));
export { NavigatorSeriesLabelsFromComponent };
