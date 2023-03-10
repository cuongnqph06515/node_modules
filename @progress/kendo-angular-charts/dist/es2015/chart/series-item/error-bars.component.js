import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesErrorBarsComponentGenerated } from '../series-item/error-bars.component.generated';
/**
 * The error bars of the Chart series
 * ([see example]({% slug errorbars_chart_charts %})).
 */
export class SeriesErrorBarsComponent extends SeriesErrorBarsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesErrorBarsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-error-bars',
                template: ''
            },] },
];
/** @nocollapse */
SeriesErrorBarsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
