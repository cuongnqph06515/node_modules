"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_to_component_generated_1 = require("../series-item/labels.to.component.generated");
/**
 * The `to` label configuration of the Chart series.
 */
var SeriesLabelsToComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsToComponent, _super);
    // Place custom properties here
    function SeriesLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsToComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsToComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesLabelsToComponent;
}(labels_to_component_generated_1.SeriesLabelsToComponentGenerated));
exports.SeriesLabelsToComponent = SeriesLabelsToComponent;
