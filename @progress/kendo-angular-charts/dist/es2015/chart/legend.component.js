import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { LegendComponentGenerated } from './legend.component.generated';
/**
 * The configuration options of the Chart legend
 * ([see example]({% slug legend_chart_charts %})).
 */
export class LegendComponent extends LegendComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
LegendComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-legend',
                template: ''
            },] },
];
/** @nocollapse */
LegendComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
