"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../common/configuration.service");
var tooltip_component_generated_1 = require("./tooltip.component.generated");
var series_tooltip_template_directive_1 = require("./tooltip/series-tooltip-template.directive");
var shared_tooltip_template_directive_1 = require("./tooltip/shared-tooltip-template.directive");
var tooltip_template_service_1 = require("../common/tooltip-template.service");
/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
var TooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipComponent, _super);
    function TooltipComponent(configurationService, templateService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.templateService = templateService;
        _this.markAsVisible();
        return _this;
    }
    TooltipComponent.prototype.ngAfterContentChecked = function () {
        this.templateService.setTemplate(this.seriesTooltipTemplate ? this.seriesTooltipTemplate.templateRef : null);
        this.templateService.setSharedTemplate(this.sharedTooltipTemplate ? this.sharedTooltipTemplate.templateRef : null);
    };
    TooltipComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-chart-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    TooltipComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService },
        { type: tooltip_template_service_1.TooltipTemplateService }
    ]; };
    TooltipComponent.propDecorators = {
        seriesTooltipTemplate: [{ type: core_1.ContentChild, args: [series_tooltip_template_directive_1.SeriesTooltipTemplateDirective,] }],
        sharedTooltipTemplate: [{ type: core_1.ContentChild, args: [shared_tooltip_template_directive_1.SharedTooltipTemplateDirective,] }]
    };
    return TooltipComponent;
}(tooltip_component_generated_1.TooltipComponentGenerated));
exports.TooltipComponent = TooltipComponent;
