"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var crosshair_component_generated_1 = require("../category-axis-item/crosshair.component.generated");
/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
var CategoryAxisCrosshairComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisCrosshairComponent, _super);
    // Place custom properties here
    function CategoryAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    CategoryAxisCrosshairComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisCrosshairComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return CategoryAxisCrosshairComponent;
}(crosshair_component_generated_1.CategoryAxisCrosshairComponentGenerated));
exports.CategoryAxisCrosshairComponent = CategoryAxisCrosshairComponent;
