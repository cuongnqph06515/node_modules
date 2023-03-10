"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var title_component_generated_1 = require("../axis-defaults/title.component.generated");
/**
 * The configuration of the axis title ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsTitleComponent, _super);
    // Place custom properties here
    function AxisDefaultsTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsTitleComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return AxisDefaultsTitleComponent;
}(title_component_generated_1.AxisDefaultsTitleComponentGenerated));
exports.AxisDefaultsTitleComponent = AxisDefaultsTitleComponent;
