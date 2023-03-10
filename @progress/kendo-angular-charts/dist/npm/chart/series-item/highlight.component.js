"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var highlight_component_generated_1 = require("../series-item/highlight.component.generated");
/**
 * The Chart series highlighting configuration options.
 */
var SeriesHighlightComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesHighlightComponent, _super);
    function SeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesHighlightComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-highlight',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesHighlightComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesHighlightComponent;
}(highlight_component_generated_1.SeriesHighlightComponentGenerated));
exports.SeriesHighlightComponent = SeriesHighlightComponent;
