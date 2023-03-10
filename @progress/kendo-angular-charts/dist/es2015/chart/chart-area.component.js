import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { ChartAreaComponentGenerated } from './chart-area.component.generated';
/**
 * The configuration options of the Chart area.
 * Represents the entire visible area of the Chart
 * ([see example]({% slug chartarea_chart_charts %})).
 */
export class ChartAreaComponent extends ChartAreaComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ChartAreaComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-area',
                template: ''
            },] },
];
/** @nocollapse */
ChartAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
