import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisCrosshairTooltipComponentGenerated } from '../category-axis-item/crosshair.tooltip.component.generated';
/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var CategoryAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisCrosshairTooltipComponent, _super);
    // Place custom properties here
    function CategoryAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    CategoryAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisCrosshairTooltipComponent;
}(CategoryAxisCrosshairTooltipComponentGenerated));
export { CategoryAxisCrosshairTooltipComponent };
