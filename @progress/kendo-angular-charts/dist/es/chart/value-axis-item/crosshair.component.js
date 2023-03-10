import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisCrosshairComponentGenerated } from '../value-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
var ValueAxisCrosshairComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisCrosshairComponent, _super);
    // Place custom properties here
    function ValueAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    ValueAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisCrosshairComponent;
}(ValueAxisCrosshairComponentGenerated));
export { ValueAxisCrosshairComponent };
