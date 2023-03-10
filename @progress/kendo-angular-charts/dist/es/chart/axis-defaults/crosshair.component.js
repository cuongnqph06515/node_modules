import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsCrosshairComponentGenerated } from '../axis-defaults/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsCrosshairComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsCrosshairComponent, _super);
    // Place custom properties here
    function AxisDefaultsCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    AxisDefaultsCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsCrosshairComponent;
}(AxisDefaultsCrosshairComponentGenerated));
export { AxisDefaultsCrosshairComponent };
