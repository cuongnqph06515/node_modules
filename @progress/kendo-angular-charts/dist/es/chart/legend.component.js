import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { LegendComponentGenerated } from './legend.component.generated';
/**
 * The configuration options of the Chart legend
 * ([see example]({% slug legend_chart_charts %})).
 */
var LegendComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendComponent, _super);
    // Place custom properties here
    function LegendComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    LegendComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LegendComponent;
}(LegendComponentGenerated));
export { LegendComponent };
