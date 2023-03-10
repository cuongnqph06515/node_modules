import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisCrosshairTooltipComponentGenerated } from '../x-axis-item/crosshair.tooltip.component.generated';
/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var XAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisCrosshairTooltipComponent, _super);
    // Place custom properties here.
    function XAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    XAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisCrosshairTooltipComponent;
}(XAxisCrosshairTooltipComponentGenerated));
export { XAxisCrosshairTooltipComponent };
