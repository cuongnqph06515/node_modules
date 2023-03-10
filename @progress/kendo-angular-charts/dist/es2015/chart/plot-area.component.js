import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { PlotAreaComponentGenerated } from './plot-area.component.generated';
/**
 * The configuration options of the plot area
 * ([see example]({% slug plotarea_chart_charts %})).
 * The plot area is the area which displays the series.
 */
export class PlotAreaComponent extends PlotAreaComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
PlotAreaComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-plot-area',
                template: ''
            },] },
];
/** @nocollapse */
PlotAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
