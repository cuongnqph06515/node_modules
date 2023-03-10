import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesHighlightComponent } from '../../../chart/series-item/highlight.component';
/**
 * The configuration options of the StockChart series highlight.
 */
export class NavigatorSeriesHighlightComponent extends SeriesHighlightComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesHighlightComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-highlight',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesHighlightComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
