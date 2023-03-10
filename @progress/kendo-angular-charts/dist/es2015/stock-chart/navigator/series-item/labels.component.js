import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesLabelsComponent } from '../../../chart/series-item/labels.component';
/**
 * The label configuration of the StockChart navigator series.
 */
export class NavigatorSeriesLabelsComponent extends SeriesLabelsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
NavigatorSeriesLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
