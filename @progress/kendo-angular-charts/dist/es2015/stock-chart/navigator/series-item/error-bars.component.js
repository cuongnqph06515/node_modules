import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesErrorBarsComponent } from '../../../chart/series-item/error-bars.component';
/**
 * The error bars of the StockChart navigator series.
 */
export class NavigatorSeriesErrorBarsComponent extends SeriesErrorBarsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesErrorBarsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-error-bars',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesErrorBarsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
