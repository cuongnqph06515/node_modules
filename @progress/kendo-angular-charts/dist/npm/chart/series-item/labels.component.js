"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../series-item/labels.component.generated");
/**
 * The configuration of the Chart series label
 * ([see example]({% slug labels_chart_charts %})).
 */
var SeriesLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsComponent, _super);
    // Place custom properties here
    function SeriesLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesLabelsComponent;
}(labels_component_generated_1.SeriesLabelsComponentGenerated));
exports.SeriesLabelsComponent = SeriesLabelsComponent;
