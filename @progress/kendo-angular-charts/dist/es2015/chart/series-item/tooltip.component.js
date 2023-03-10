import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesTooltipComponentGenerated } from '../series-item/tooltip.component.generated';
/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
export class SeriesTooltipComponent extends SeriesTooltipComponentGenerated {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
    get seriesTooltipTemplateRef() {
        return this.seriesTooltipTemplate;
    }
}
SeriesTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
SeriesTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
SeriesTooltipComponent.propDecorators = {
    seriesTooltipTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};
