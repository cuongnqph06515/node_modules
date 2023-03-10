"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var tooltip_component_generated_1 = require("../series-item/tooltip.component.generated");
/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
var SeriesTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesTooltipComponent, _super);
    function SeriesTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    Object.defineProperty(SeriesTooltipComponent.prototype, "seriesTooltipTemplateRef", {
        get: function () {
            return this.seriesTooltipTemplate;
        },
        enumerable: true,
        configurable: true
    });
    SeriesTooltipComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesTooltipComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    SeriesTooltipComponent.propDecorators = {
        seriesTooltipTemplate: [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] }]
    };
    return SeriesTooltipComponent;
}(tooltip_component_generated_1.SeriesTooltipComponentGenerated));
exports.SeriesTooltipComponent = SeriesTooltipComponent;
