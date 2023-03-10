import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesHighlightComponent } from '../../../chart/series-item/highlight.component';
/**
 * The configuration options of the StockChart series highlight.
 */
var NavigatorSeriesHighlightComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesHighlightComponent, _super);
    function NavigatorSeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesHighlightComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-highlight',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesHighlightComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesHighlightComponent;
}(SeriesHighlightComponent));
export { NavigatorSeriesHighlightComponent };
