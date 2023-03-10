"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../axis-defaults/labels.component.generated");
/**
 * The configuration of the axis labels ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsLabelsComponent, _super);
    // Place custom properties here
    function AxisDefaultsLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return AxisDefaultsLabelsComponent;
}(labels_component_generated_1.AxisDefaultsLabelsComponentGenerated));
exports.AxisDefaultsLabelsComponent = AxisDefaultsLabelsComponent;
