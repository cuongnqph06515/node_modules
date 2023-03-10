"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var crosshair_tooltip_component_1 = require("../../../chart/category-axis-item/crosshair.tooltip.component");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorCategoryAxisCrosshairTooltipComponent;
}(crosshair_tooltip_component_1.CategoryAxisCrosshairTooltipComponent));
exports.NavigatorCategoryAxisCrosshairTooltipComponent = NavigatorCategoryAxisCrosshairTooltipComponent;
