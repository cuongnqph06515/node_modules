import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesExtremesComponentGenerated } from '../series-item/extremes.component.generated';
/**
 * The configuration of the Chart series extremes.
 * Applies to extreme outliers.
 * For more information, refer to [`series.outliers`]({% slug api_charts_seriesitemcomponent %}#toc-outliers).
 */
var SeriesExtremesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesExtremesComponent, _super);
    // Place custom properties here
    function SeriesExtremesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesExtremesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-extremes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesExtremesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesExtremesComponent;
}(SeriesExtremesComponentGenerated));
export { SeriesExtremesComponent };
