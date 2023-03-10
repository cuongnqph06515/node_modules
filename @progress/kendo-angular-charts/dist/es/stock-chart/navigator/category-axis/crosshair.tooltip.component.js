import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisCrosshairTooltipComponent } from '../../../chart/category-axis-item/crosshair.tooltip.component';
/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var NavigatorCategoryAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisCrosshairTooltipComponent, _super);
    function NavigatorCategoryAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisCrosshairTooltipComponent;
}(CategoryAxisCrosshairTooltipComponent));
export { NavigatorCategoryAxisCrosshairTooltipComponent };
