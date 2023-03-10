import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class TooltipTemplateService {
    setTemplate(template) {
        this.template = template;
    }
    getTemplate(seriesIndex) {
        if (this.seriesTemplates && this.seriesTemplates[seriesIndex]) {
            return this.seriesTemplates[seriesIndex];
        }
        return this.template;
    }
    setSeriesTemplates(seriesTemplates) {
        this.seriesTemplates = seriesTemplates;
    }
    setSharedTemplate(sharedTemplate) {
        this.sharedTemplate = sharedTemplate;
    }
    getSharedTemplate() {
        return this.sharedTemplate;
    }
}
TooltipTemplateService.decorators = [
    { type: Injectable },
];
