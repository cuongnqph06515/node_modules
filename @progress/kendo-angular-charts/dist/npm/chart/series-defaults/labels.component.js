"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../series-defaults/labels.component.generated");
/**
 * The configuration of the Chart series label.
 */
var SeriesDefaultsLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsLabelsComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsComponent;
}(labels_component_generated_1.SeriesDefaultsLabelsComponentGenerated));
exports.SeriesDefaultsLabelsComponent = SeriesDefaultsLabelsComponent;
