"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var title_component_1 = require("../../../chart/category-axis-item/title.component");
/**
 * The title configuration of the navigator category axis.
 */
var NavigatorCategoryAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisTitleComponent, _super);
    function NavigatorCategoryAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisTitleComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorCategoryAxisTitleComponent;
}(title_component_1.CategoryAxisTitleComponent));
exports.NavigatorCategoryAxisTitleComponent = NavigatorCategoryAxisTitleComponent;
