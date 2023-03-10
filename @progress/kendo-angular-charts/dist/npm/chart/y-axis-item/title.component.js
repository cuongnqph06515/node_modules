"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var title_component_generated_1 = require("../y-axis-item/title.component.generated");
/**
 * The title configuration of the Scatter Chart Y axis.
 */
var YAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisTitleComponent, _super);
    // Place custom properties here
    function YAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisTitleComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return YAxisTitleComponent;
}(title_component_generated_1.YAxisTitleComponentGenerated));
exports.YAxisTitleComponent = YAxisTitleComponent;
