import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesLabelsToComponent } from '../../../chart/series-item/labels.to.component';
/**
 * The `to` label configuration of the StockChart navigator series.
 */
export class NavigatorSeriesLabelsToComponent extends SeriesLabelsToComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
NavigatorSeriesLabelsToComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-labels-to',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesLabelsToComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
