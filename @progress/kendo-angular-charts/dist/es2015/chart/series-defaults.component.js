import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { SeriesDefaultsComponentGenerated } from './series-defaults.component.generated';
/**
 * The default options for all series
 * ([see example]({% slug series_chart_charts %}#toc-default-series-configuration)).
 */
export class SeriesDefaultsComponent extends SeriesDefaultsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
