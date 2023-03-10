"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_from_component_generated_1 = require("../series-item/labels.from.component.generated");
/**
 * The `from` label configuration of the Chart series.
 */
var SeriesLabelsFromComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsFromComponent, _super);
    // Place custom properties here
    function SeriesLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsFromComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsFromComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesLabelsFromComponent;
}(labels_from_component_generated_1.SeriesLabelsFromComponentGenerated));
exports.SeriesLabelsFromComponent = SeriesLabelsFromComponent;
