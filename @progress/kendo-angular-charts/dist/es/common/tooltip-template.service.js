import { Injectable } from '@angular/core';
/**
 * @hidden
 */
var TooltipTemplateService = /** @class */ (function () {
    function TooltipTemplateService() {
    }
    TooltipTemplateService.prototype.setTemplate = function (template) {
        this.template = template;
    };
    TooltipTemplateService.prototype.getTemplate = function (seriesIndex) {
        if (this.seriesTemplates && this.seriesTemplates[seriesIndex]) {
            return this.seriesTemplates[seriesIndex];
        }
        return this.template;
    };
    TooltipTemplateService.prototype.setSeriesTemplates = function (seriesTemplates) {
        this.seriesTemplates = seriesTemplates;
    };
    TooltipTemplateService.prototype.setSharedTemplate = function (sharedTemplate) {
        this.sharedTemplate = sharedTemplate;
    };
    TooltipTemplateService.prototype.getSharedTemplate = function () {
        return this.sharedTemplate;
    };
    TooltipTemplateService.decorators = [
        { type: Injectable },
    ];
    return TooltipTemplateService;
}());
export { TooltipTemplateService };
