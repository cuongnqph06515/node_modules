import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsCrosshairTooltipComponentGenerated } from '../axis-defaults/crosshair.tooltip.component.generated';
/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the [`axisDefaults.crosshair.tooltip.visible`]({% slug api_charts_axisdefaultscrosshairtooltipcomponent %}#toc-visible)
 * option is set to `true`.
 */
var AxisDefaultsCrosshairTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsCrosshairTooltipComponent, _super);
    // Place custom properties here
    function AxisDefaultsCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    AxisDefaultsCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsCrosshairTooltipComponent;
}(AxisDefaultsCrosshairTooltipComponentGenerated));
export { AxisDefaultsCrosshairTooltipComponent };
