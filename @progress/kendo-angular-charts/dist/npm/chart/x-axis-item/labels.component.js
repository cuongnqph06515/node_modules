"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../x-axis-item/labels.component.generated");
/**
 * The axis labels configuration.
 */
var XAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisLabelsComponent, _super);
    // Place custom properties here
    function XAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return XAxisLabelsComponent;
}(labels_component_generated_1.XAxisLabelsComponentGenerated));
exports.XAxisLabelsComponent = XAxisLabelsComponent;
