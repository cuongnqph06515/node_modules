"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var crosshair_tooltip_component_generated_1 = require("../category-axis-item/crosshair.tooltip.component.generated");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return CategoryAxisCrosshairTooltipComponent;
}(crosshair_tooltip_component_generated_1.CategoryAxisCrosshairTooltipComponentGenerated));
exports.CategoryAxisCrosshairTooltipComponent = CategoryAxisCrosshairTooltipComponent;
