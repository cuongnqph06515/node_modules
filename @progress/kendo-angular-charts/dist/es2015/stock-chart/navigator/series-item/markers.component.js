import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesMarkersComponent } from '../../../chart/series-item/markers.component';
/**
 * The marker configuration of the StockChart navigator series.
 */
export class NavigatorSeriesMarkersComponent extends SeriesMarkersComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesMarkersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-markers',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesMarkersComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
