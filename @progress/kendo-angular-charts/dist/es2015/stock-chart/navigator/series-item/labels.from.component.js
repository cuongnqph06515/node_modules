import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesLabelsFromComponent } from '../../../chart/series-item/labels.from.component';
/**
 * The `from` label configuration of the StockChart navigator series.
 */
export class NavigatorSeriesLabelsFromComponent extends SeriesLabelsFromComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
NavigatorSeriesLabelsFromComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-labels-from',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesLabelsFromComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
