"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../y-axis-item/labels.component.generated");
/**
 * The axis labels configuration.
 */
var YAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisLabelsComponent, _super);
    // Place custom properties here
    function YAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return YAxisLabelsComponent;
}(labels_component_generated_1.YAxisLabelsComponentGenerated));
exports.YAxisLabelsComponent = YAxisLabelsComponent;
