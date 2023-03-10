"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../category-axis-item/labels.component.generated");
/**
 * The configuration of the axis labels ([see example]({% slug labels_chart_charts %})).
 */
var CategoryAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisLabelsComponent, _super);
    // Place custom properties here
    function CategoryAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return CategoryAxisLabelsComponent;
}(labels_component_generated_1.CategoryAxisLabelsComponentGenerated));
exports.CategoryAxisLabelsComponent = CategoryAxisLabelsComponent;
