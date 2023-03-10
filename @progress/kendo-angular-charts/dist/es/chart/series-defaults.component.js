import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { SeriesDefaultsComponentGenerated } from './series-defaults.component.generated';
/**
 * The default options for all series
 * ([see example]({% slug series_chart_charts %}#toc-default-series-configuration)).
 */
var SeriesDefaultsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsComponent, _super);
    // Place custom properties here
    function SeriesDefaultsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsComponent;
}(SeriesDefaultsComponentGenerated));
export { SeriesDefaultsComponent };
