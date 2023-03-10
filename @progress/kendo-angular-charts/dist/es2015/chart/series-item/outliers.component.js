import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesOutliersComponentGenerated } from '../series-item/outliers.component.generated';
/**
 * The configuration of the Chart series outliers.
 * Applies to mild outliers.
 * For more information, refer to the [`series.extremes`]({% slug api_charts_seriesitemcomponent %}#toc-extremes) option.
 */
export class SeriesOutliersComponent extends SeriesOutliersComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesOutliersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-outliers',
                template: ''
            },] },
];
/** @nocollapse */
SeriesOutliersComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
