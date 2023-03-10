import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesExtremesComponentGenerated } from '../series-item/extremes.component.generated';
/**
 * The configuration of the Chart series extremes.
 * Applies to extreme outliers.
 * For more information, refer to [`series.outliers`]({% slug api_charts_seriesitemcomponent %}#toc-outliers).
 */
export class SeriesExtremesComponent extends SeriesExtremesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesExtremesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-extremes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesExtremesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
